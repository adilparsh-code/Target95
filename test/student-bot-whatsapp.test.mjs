import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyMetaSignature, safeEqual } from '../src/lib/student-bot/adapters/whatsapp-signature.mjs';
import { MAX_MESSAGES_PER_PAYLOAD, parseInboundMessages } from '../src/lib/student-bot/adapters/whatsapp-payload.mjs';
import { MAX_CHUNK_CHARS, MAX_CHUNKS, formatReplyForWhatsApp, splitForWhatsApp } from '../src/lib/student-bot/adapters/whatsapp-format.mjs';
import { WhatsappSendError, createWhatsappSender } from '../src/lib/student-bot/adapters/whatsapp-sender.mjs';
import { WHATSAPP_NOTICES, handleWhatsappVerify, handleWhatsappWebhook } from '../src/lib/student-bot/core/whatsapp-api.mjs';
import { makeDeps } from './helpers/bot-deps.mjs';

const SECRET = 'test-app-secret';
const VERIFY = 'verify-token-123';
const PHONE_ID = '1234567890';
const sign = (body, secret = SECRET) => `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;

const inbound = (messages, phoneNumberId = PHONE_ID) => ({
  object: 'whatsapp_business_account',
  entry: [{ changes: [{ field: 'messages', value: { metadata: { phone_number_id: phoneNumberId }, messages } }] }],
});
const textMsg = (id, from, body) => ({ id, from, type: 'text', text: { body } });

// ---- signature -------------------------------------------------------------
test('signature: accepts only the exact HMAC of the raw body', () => {
  const body = '{"a":1}';
  assert.equal(verifyMetaSignature({ rawBody: body, signatureHeader: sign(body), appSecret: SECRET }), true);
  assert.equal(verifyMetaSignature({ rawBody: body, signatureHeader: sign(body).toUpperCase().replace('SHA256=', 'sha256='), appSecret: SECRET }), true);
  assert.equal(verifyMetaSignature({ rawBody: '{"a":2}', signatureHeader: sign(body), appSecret: SECRET }), false, 'tampered body');
  assert.equal(verifyMetaSignature({ rawBody: body, signatureHeader: sign(body, 'other'), appSecret: SECRET }), false, 'wrong secret');
  for (const bad of [undefined, null, '', 'sha256=', 'sha1=abc', `sha256=${'z'.repeat(64)}`, `sha256=${'a'.repeat(63)}`, sign(body).slice(7)]) {
    assert.equal(verifyMetaSignature({ rawBody: body, signatureHeader: bad, appSecret: SECRET }), false, String(bad));
  }
  assert.equal(verifyMetaSignature({ rawBody: body, signatureHeader: sign(body, ''), appSecret: '' }), false, 'empty secret never verifies');
  assert.equal(verifyMetaSignature({ rawBody: Buffer.from(body), signatureHeader: sign(body), appSecret: SECRET }), false, 'raw body must be a string');
});

test('safeEqual: equal strings only, never for empty or non-strings', () => {
  assert.equal(safeEqual('abc', 'abc'), true);
  assert.equal(safeEqual('abc', 'abd'), false);
  assert.equal(safeEqual('abc', 'abcd'), false);
  assert.equal(safeEqual('', ''), false);
  assert.equal(safeEqual(undefined, 'abc'), false);
  assert.equal(safeEqual(null, null), false);
});

// ---- payload parsing -------------------------------------------------------
test('payload: reads text messages sent to our number and nothing else', () => {
  const parsed = parseInboundMessages(inbound([textMsg('wamid.AAAA1111', '919876543210', 'HELP')]), { phoneNumberId: PHONE_ID });
  assert.deepEqual(parsed, [{ id: 'wamid.AAAA1111', from: '919876543210', kind: 'text', text: 'HELP' }]);
  assert.equal(parseInboundMessages(inbound([textMsg('wamid.AAAA1111', '919876543210', 'HELP')], '999'), { phoneNumberId: PHONE_ID }).length, 0, 'other phone number id');
});

test('payload: non-text is marked unsupported, receipts and junk give no messages', () => {
  const image = { id: 'wamid.BBBB2222', from: '919876543210', type: 'image', image: { id: 'x' } };
  assert.deepEqual(parseInboundMessages(inbound([image]), { phoneNumberId: PHONE_ID }), [{ id: 'wamid.BBBB2222', from: '919876543210', kind: 'unsupported', text: '' }]);
  const statusOnly = { object: 'whatsapp_business_account', entry: [{ changes: [{ field: 'messages', value: { metadata: { phone_number_id: PHONE_ID }, statuses: [{ id: 'x' }] } }] }] };
  for (const junk of [null, undefined, 'x', 42, [], {}, { object: 'page' }, { object: 'whatsapp_business_account' }, { object: 'whatsapp_business_account', entry: 'no' }, statusOnly]) {
    assert.deepEqual(parseInboundMessages(junk, { phoneNumberId: PHONE_ID }), []);
  }
});

test('payload: rejects malformed ids and numbers, and caps messages per payload', () => {
  const bad = [
    textMsg('short', '919876543210', 'hi'),
    textMsg('wamid.OK123456', '+919876543210', 'hi'),
    textMsg('wamid.OK123456', 'abc', 'hi'),
    { id: 'wamid.OK123456', from: '919876543210', type: 'text', text: { body: 42 } },
    null,
    'str',
  ];
  const parsed = parseInboundMessages(inbound(bad), { phoneNumberId: PHONE_ID });
  assert.deepEqual(parsed.map((m) => m.kind), ['unsupported'], 'only the non-string body survives, and as unsupported');
  const many = Array.from({ length: 50 }, (_, i) => textMsg(`wamid.MANY${String(i).padStart(4, '0')}`, '919876543210', 'hi'));
  assert.equal(parseInboundMessages(inbound(many), { phoneNumberId: PHONE_ID }).length, MAX_MESSAGES_PER_PAYLOAD);
});

// ---- formatting ------------------------------------------------------------
test('format: short text stays one message; empty gives none', () => {
  assert.deepEqual(splitForWhatsApp('hello'), ['hello']);
  assert.deepEqual(splitForWhatsApp('  \n '), []);
  assert.deepEqual(splitForWhatsApp(undefined), []);
});

test('format: long text is split on line boundaries within the chunk limit', () => {
  const lines = Array.from({ length: 40 }, (_, i) => `${i + 1}. ${'word '.repeat(10).trim()}`);
  const chunks = splitForWhatsApp(lines.join('\n'));
  assert.ok(chunks.length > 1);
  for (const chunk of chunks) assert.ok(chunk.length <= MAX_CHUNK_CHARS, `chunk ${chunk.length}`);
  assert.equal(chunks.join('\n'), lines.join('\n'), 'no text lost or reordered');
});

test('format: a single huge line is cut, and total output is capped with a note', () => {
  const huge = splitForWhatsApp('x'.repeat(MAX_CHUNK_CHARS * 3 + 5));
  assert.ok(huge.every((c) => c.length <= MAX_CHUNK_CHARS));
  const capped = splitForWhatsApp(Array.from({ length: 400 }, (_, i) => `line ${i} ${'y'.repeat(60)}`).join('\n'));
  assert.equal(capped.length, MAX_CHUNKS);
  assert.ok(capped.at(-1).includes('more specific'));
  assert.ok(capped.every((c) => c.length <= MAX_CHUNK_CHARS));
});

test('format: quick replies become a plain "Try:" line; no markup is generated', () => {
  const [out] = formatReplyForWhatsApp({ text: 'Okay.', quickReplies: ['CHAPTERS', 'QUIZ'] });
  assert.equal(out, 'Okay.\n\nTry: CHAPTERS | QUIZ');
  assert.deepEqual(formatReplyForWhatsApp({ text: '' }), []);
  assert.deepEqual(formatReplyForWhatsApp(null), []);
});

// ---- sender ----------------------------------------------------------------
test('sender: not created without a token or a valid phone number id', () => {
  assert.equal(createWhatsappSender({ phoneNumberId: PHONE_ID }), null);
  assert.equal(createWhatsappSender({ accessToken: 't' }), null);
  assert.equal(createWhatsappSender({ accessToken: 't', phoneNumberId: '../evil' }), null);
});

test('sender: posts one text message to the Graph API and never previews links', async () => {
  const calls = [];
  const send = createWhatsappSender({ accessToken: 'tok', phoneNumberId: PHONE_ID, graphVersion: 'v20.0', fetchImpl: async (url, init) => { calls.push({ url, init }); return { ok: true, status: 200 }; } });
  await send('919876543210', 'hello');
  assert.equal(calls[0].url, `https://graph.facebook.com/v20.0/${PHONE_ID}/messages`);
  assert.equal(calls[0].init.headers.Authorization, 'Bearer tok');
  const body = JSON.parse(calls[0].init.body);
  assert.deepEqual(body, { messaging_product: 'whatsapp', recipient_type: 'individual', to: '919876543210', type: 'text', text: { preview_url: false, body: 'hello' } });
  const fallback = createWhatsappSender({ accessToken: 'tok', phoneNumberId: PHONE_ID, graphVersion: 'latest; DROP', fetchImpl: async (url) => { calls.push({ url }); return { ok: true }; } });
  await fallback('919876543210', 'x');
  assert.match(calls.at(-1).url, /\/v21\.0\//, 'invalid version falls back to the default');
});

test('sender: a failed send throws with the status only, never the token, number or text', async () => {
  const send = createWhatsappSender({ accessToken: 'SECRET-TOKEN', phoneNumberId: PHONE_ID, fetchImpl: async () => ({ ok: false, status: 401 }) });
  await assert.rejects(() => send('919876543210', 'private text'), (error) => {
    assert.ok(error instanceof WhatsappSendError);
    assert.equal(error.status, 401);
    const shown = `${error.message} ${error.stack}`;
    for (const secret of ['SECRET-TOKEN', '919876543210', 'private text']) assert.ok(!shown.includes(secret), `leaked ${secret}`);
    return true;
  });
});

// ---- verify handshake ------------------------------------------------------
const verifyReq = (params) => new Request(`http://localhost/api/student-bot/whatsapp?${new URLSearchParams(params)}`);

test('verify: echoes the challenge only for subscribe + correct token', async () => {
  const ctx = { config: { verifyToken: VERIFY } };
  const ok = handleWhatsappVerify(verifyReq({ 'hub.mode': 'subscribe', 'hub.verify_token': VERIFY, 'hub.challenge': 'abc123' }), ctx);
  assert.equal(ok.status, 200);
  assert.equal(await ok.text(), 'abc123');
  assert.equal(handleWhatsappVerify(verifyReq({ 'hub.mode': 'subscribe', 'hub.verify_token': 'wrong', 'hub.challenge': 'abc123' }), ctx).status, 403);
  assert.equal(handleWhatsappVerify(verifyReq({ 'hub.mode': 'unsubscribe', 'hub.verify_token': VERIFY, 'hub.challenge': 'abc123' }), ctx).status, 403);
  assert.equal(handleWhatsappVerify(verifyReq({ 'hub.mode': 'subscribe', 'hub.verify_token': VERIFY, 'hub.challenge': '<script>alert(1)</script>' }), ctx).status, 403, 'no markup echoed');
  assert.equal(handleWhatsappVerify(verifyReq({ 'hub.mode': 'subscribe', 'hub.verify_token': VERIFY }), ctx).status, 403, 'missing challenge');
  assert.equal(handleWhatsappVerify(verifyReq({ 'hub.mode': 'subscribe', 'hub.verify_token': '', 'hub.challenge': 'abc123' }), { config: { verifyToken: '' } }).status, 503, 'unconfigured is unavailable, never open');
});

// ---- webhook ---------------------------------------------------------------
const STUDENT = { uid: 'student-a', phone: '919876543210' };

function makeCtx({ profile = { role: 'student', status: 'active' }, linked = true, ready = true, sendFails = false, seed } = {}) {
  const { deps, fake, logs } = makeDeps({ seed });
  const sent = [];
  const sessionData = new Map();
  const seen = new Set();
  const ctx = {
    config: { appSecret: SECRET, verifyToken: VERIFY, phoneNumberId: PHONE_ID },
    deps,
    sendText: async (to, text) => {
      if (sendFails) throw new Error('graph down');
      sent.push({ to, text });
    },
    identity: {
      resolveStudent: async (phone) => (linked && phone === STUDENT.phone ? { uid: STUDENT.uid } : null),
      getProfile: async () => profile,
    },
    sessions: { getContext: async (uid) => sessionData.get(uid) ?? null, setContext: async (uid, value) => { sessionData.set(uid, value); } },
    dedupe: { claim: async (id) => (seen.has(id) ? false : (seen.add(id), true)) },
  };
  if (!ready) { ctx.identity = undefined; ctx.sessions = undefined; ctx.dedupe = undefined; }
  return { ctx, sent, fake, logs, sessionData };
}

const post = (payload, { secret = SECRET, header, raw } = {}) => {
  const body = raw ?? JSON.stringify(payload);
  const headers = { 'content-type': 'application/json' };
  const signature = header === undefined ? sign(body, secret) : header;
  if (signature !== null) headers['x-hub-signature-256'] = signature;
  return new Request('http://localhost/api/student-bot/whatsapp', { method: 'POST', headers, body });
};
const say = (id, body) => inbound([textMsg(id, STUDENT.phone, body)]);

test('webhook: unconfigured Meta settings -> 503 and nothing happens', async () => {
  const { ctx, sent } = makeCtx();
  ctx.config = { appSecret: '', verifyToken: '', phoneNumberId: '' };
  assert.equal((await handleWhatsappWebhook(post(say('wamid.AAAA0001', 'HELP')), ctx)).status, 503);
  assert.equal(sent.length, 0);
});

test('webhook: missing or bad signature -> 401 before parsing, no database access, nothing sent', async () => {
  const { ctx, sent, fake } = makeCtx();
  for (const opts of [{ header: null }, { header: 'sha256=' + '0'.repeat(64) }, { secret: 'attacker-secret' }, { header: 'garbage' }]) {
    const res = await handleWhatsappWebhook(post(say('wamid.AAAA0002', 'HELP'), opts), ctx);
    assert.equal(res.status, 401);
  }
  const notJson = await handleWhatsappWebhook(post(null, { raw: '{not json' , header: 'sha256=' + '0'.repeat(64) }), ctx);
  assert.equal(notJson.status, 401, 'signature is checked before JSON is parsed');
  assert.equal(sent.length, 0);
  assert.equal(fake.paths().length, 0);
});

test('webhook: oversized body -> 413; signed but invalid JSON -> 400', async () => {
  const { ctx } = makeCtx();
  const big = 'x'.repeat(70 * 1024);
  assert.equal((await handleWhatsappWebhook(post(null, { raw: big, header: sign(big) }), ctx)).status, 413);
  const bad = '{oops';
  assert.equal((await handleWhatsappWebhook(post(null, { raw: bad }), ctx)).status, 400);
});

test('webhook: delivery receipts get 200 and are not processed', async () => {
  const { ctx, sent } = makeCtx();
  const receipt = { object: 'whatsapp_business_account', entry: [{ changes: [{ field: 'messages', value: { metadata: { phone_number_id: PHONE_ID }, statuses: [{ id: 'x', status: 'read' }] } }] }] };
  assert.equal((await handleWhatsappWebhook(post(receipt), ctx)).status, 200);
  assert.equal(sent.length, 0);
});

test('webhook: identity store not wired yet -> 503 (Meta retries), nothing sent', async () => {
  const { ctx, sent, logs } = makeCtx({ ready: false });
  const res = await handleWhatsappWebhook(post(say('wamid.AAAA0003', 'HELP')), ctx);
  assert.equal(res.status, 503);
  assert.deepEqual((await res.json()).code, 'not_ready');
  assert.equal(sent.length, 0);
  assert.equal(logs.length, 1);
});

test('webhook: a linked active student gets the bot reply on WhatsApp', async () => {
  const { ctx, sent } = makeCtx();
  const res = await handleWhatsappWebhook(post(say('wamid.AAAA0004', 'HELP')), ctx);
  assert.equal(res.status, 200);
  assert.ok(sent.length >= 1);
  assert.equal(sent[0].to, STUDENT.phone);
  assert.match(sent[0].text, /SET icse class 10/);
  assert.ok(sent.every((s) => s.text.length <= MAX_CHUNK_CHARS));
});

test('webhook: board/class/subject chosen with SET is remembered for the next message', async () => {
  const { ctx, sent, sessionData } = makeCtx();
  await handleWhatsappWebhook(post(say('wamid.AAAA0005', 'SET icse class 10 hindi')), ctx);
  assert.equal(sessionData.get(STUDENT.uid)?.subjectSlug, 'hindi');
  sent.length = 0;
  await handleWhatsappWebhook(post(say('wamid.AAAA0006', 'CHAPTERS')), ctx);
  assert.ok(sent.length >= 1);
  assert.ok(!/Which board, class and subject/.test(sent.map((s) => s.text).join('\n')), 'context was reused, not asked for again');
});

test('webhook: unlinked numbers get no reply and no data is touched', async () => {
  const { ctx, sent, fake } = makeCtx({ linked: false });
  assert.equal((await handleWhatsappWebhook(post(say('wamid.AAAA0007', 'HELP')), ctx)).status, 200);
  assert.equal(sent.length, 0, 'never message a number that is not a registered student');
  assert.equal(fake.paths().length, 0);
});

test('webhook: teacher, admin, inactive or disabled accounts are ignored', async () => {
  for (const profile of [
    { role: 'teacher', status: 'active' },
    { role: 'admin', status: 'active' },
    { role: 'student', status: 'inactive' },
    { role: 'student', status: 'active', disabled: true },
    { role: 'student' },
    null,
  ]) {
    const { ctx, sent } = makeCtx({ profile });
    assert.equal((await handleWhatsappWebhook(post(say('wamid.AAAA0008', 'HELP')), ctx)).status, 200);
    assert.equal(sent.length, 0, JSON.stringify(profile));
  }
});

test('webhook: QUIZ is declined without creating a quiz attempt', async () => {
  const { ctx, sent, fake } = makeCtx();
  await handleWhatsappWebhook(post(say('wamid.AAAA0009', 'QUIZ something 5')), ctx);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].text, WHATSAPP_NOTICES.quiz);
  assert.ok(!fake.paths().some((p) => p.includes('botQuizAttempts')), 'no attempt may be written');
});

test('webhook: non-text messages get a short notice; oversized text is declined', async () => {
  const { ctx, sent } = makeCtx();
  const image = inbound([{ id: 'wamid.AAAA0010', from: STUDENT.phone, type: 'image', image: { id: 'm' } }]);
  await handleWhatsappWebhook(post(image), ctx);
  assert.equal(sent.at(-1).text, WHATSAPP_NOTICES.unsupported);
  await handleWhatsappWebhook(post(say('wamid.AAAA0011', 'a'.repeat(600))), ctx);
  assert.equal(sent.at(-1).text, WHATSAPP_NOTICES.invalid);
});

test('webhook: a redelivered message id is processed once', async () => {
  const { ctx, sent } = makeCtx();
  await handleWhatsappWebhook(post(say('wamid.AAAA0012', 'HELP')), ctx);
  const first = sent.length;
  await handleWhatsappWebhook(post(say('wamid.AAAA0012', 'HELP')), ctx);
  assert.equal(sent.length, first);
});

test('webhook: the per-student rate limit applies on WhatsApp too', async () => {
  const now = 1_700_000_000_000;
  const { ctx, sent } = makeCtx({ seed: { [`users/${STUDENT.uid}/botUsage/chat`]: { minute: { start: now, count: 20 }, hour: { start: now, count: 20 } } } });
  await handleWhatsappWebhook(post(say('wamid.AAAA0013', 'HELP')), ctx);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].text, WHATSAPP_NOTICES.rateLimited);
});

test('webhook: one failing message does not stop the others; still 200; logs hold no phone or text', async () => {
  const { ctx, sent, logs } = makeCtx();
  let calls = 0;
  ctx.sendText = async (to, text) => {
    calls += 1;
    if (calls === 1) throw new Error('graph down');
    sent.push({ to, text });
  };
  const payload = inbound([textMsg('wamid.AAAA0014', STUDENT.phone, 'HELP'), textMsg('wamid.AAAA0015', STUDENT.phone, 'HELP')]);
  assert.equal((await handleWhatsappWebhook(post(payload), ctx)).status, 200);
  assert.ok(sent.length >= 1, 'second message still answered');
  const logged = JSON.stringify(logs);
  assert.ok(!logged.includes(STUDENT.phone) && !logged.includes('HELP'), 'no phone numbers or message text in logs');
});
