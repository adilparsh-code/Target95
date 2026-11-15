import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleChatRequest, handleHealthRequest, handleQuizSubmitRequest } from '../src/lib/student-bot/core/api.mjs';
import { LIMITS } from '../src/lib/student-bot/config/commands.mjs';
import { CONTEXT, makeDeps } from './helpers/bot-deps.mjs';
import { makeQuestionLoader } from '../src/lib/student-bot/handlers/quiz.mjs';

const student = (uid = 'student-a') => async () => ({ uid, role: 'student' });
const post = (body, { type = 'application/json', raw = false } = {}) =>
  new Request('http://localhost/api/student-bot/chat', { method: 'POST', headers: { 'content-type': type }, body: raw ? body : JSON.stringify(body) });
const ctxFor = (deps, getSession = student()) => ({ getSession, deps });
const read = async (res) => ({ status: res.status, body: await res.json(), headers: res.headers });

test('chat: unauthenticated -> 401, with no reply and no database access', async () => {
  const { deps, fake } = makeDeps();
  const r = await read(await handleChatRequest(post({ message: 'help' }), ctxFor(deps, async () => null)));
  assert.equal(r.status, 401);
  assert.equal(r.body.ok, false);
  assert.equal(fake.paths().length, 0, 'rate limiter must not even run for anonymous callers');
});

test('chat: verifier outage -> 503; admin -> 403; teacher -> 403', async () => {
  const { deps } = makeDeps();
  assert.equal((await handleChatRequest(post({ message: 'help' }), ctxFor(deps, async () => { throw new Error('down'); }))).status, 503);
  assert.equal((await handleChatRequest(post({ message: 'help' }), ctxFor(deps, async () => ({ uid: 'a', admin: true })))).status, 403);
  assert.equal((await handleChatRequest(post({ message: 'help' }), ctxFor(deps, async () => ({ uid: 't', role: 'teacher' })))).status, 403);
});

test('chat: valid student message returns a structured reply', async () => {
  const { deps } = makeDeps();
  const r = await read(await handleChatRequest(post({ message: 'help' }), ctxFor(deps)));
  assert.equal(r.status, 200);
  assert.equal(r.body.ok, true);
  assert.equal(r.body.reply.kind, 'help');
  assert.equal(r.headers.get('cache-control'), 'no-store');
});

test('chat: malformed input is a 4xx with structured errors and no stack traces', async () => {
  const { deps } = makeDeps();
  const cases = [
    [post('{not json', { raw: true }), 400, 'invalid_json'],
    [post('null', { raw: true }), 400, 'invalid_body'],
    [post('[]', { raw: true }), 400, 'invalid_body'],
    [post({}), 400, 'invalid_message'],
    [post({ message: '' }), 400, 'empty_message'],
    [post({ message: 5 }), 400, 'invalid_message'],
    [post({ message: 'x'.repeat(LIMITS.maxMessageChars + 1) }), 400, 'message_too_long'],
    [post({ message: 'help', context: { board: '../..' } }), 400, 'invalid_context'],
    [post('help', { type: 'text/plain', raw: true }), 415, 'unsupported_media_type'],
    [post('x'.repeat(LIMITS.maxBodyBytes + 10), { raw: true }), 413, 'body_too_large'],
  ];
  for (const [req, status, code] of cases) {
    const r = await read(await handleChatRequest(req, ctxFor(deps)));
    assert.equal(r.status, status, code);
    assert.equal(r.body.code, code);
    assert.equal(r.body.ok, false);
    assert.deepEqual(Object.keys(r.body).sort(), ['code', 'error', 'ok']);
    assert.ok(!/at .*\.mjs|stack/i.test(JSON.stringify(r.body)));
  }
});

test('chat: a client-supplied student id is ignored — data is scoped to the session uid', async () => {
  const seed = { 'users/victim/botQuizAttempts/v1': { userId: 'victim', status: 'submitted', chapterSlug: 'c', correctCount: 5, total: 5, percentage: 100, submittedAtMs: 1, createdAtMs: 1 } };
  const { deps } = makeDeps({ seed });
  const r = await read(await handleChatRequest(post({ message: 'my progress', uid: 'victim', studentId: 'victim', context: { board: 'icse' } }), ctxFor(deps, student('attacker'))));
  assert.equal(r.status, 200);
  assert.ok(!/5\/5|100%/.test(r.body.reply.text));
});

test('chat: rate limit returns 429 with Retry-After once the cap is exceeded', async () => {
  const { deps } = makeDeps();
  let last;
  for (let i = 0; i < LIMITS.rateLimitPerMinute + 1; i += 1) last = await handleChatRequest(post({ message: 'help' }), ctxFor(deps));
  const r = await read(last);
  assert.equal(r.status, 429);
  assert.equal(r.body.code, 'rate_limited');
  assert.ok(Number(r.headers.get('retry-after')) >= 1);
  // another student is unaffected
  assert.equal((await handleChatRequest(post({ message: 'help' }), ctxFor(deps, student('student-b')))).status, 200);
});

test('chat: rate-limit store failure fails closed with 503', async () => {
  const { deps, logs } = makeDeps();
  const broken = { ...deps, db: { ...deps.db, runTransaction: async () => { throw new Error('firestore down secret'); } } };
  const r = await read(await handleChatRequest(post({ message: 'help' }), ctxFor(broken)));
  assert.equal(r.status, 503);
  assert.ok(!JSON.stringify(logs).includes('secret'));
});

test('quiz submit: auth, id validation, body validation and happy path over HTTP handlers', async () => {
  const { deps } = makeDeps();
  const submit = (id, body, getSession) => handleQuizSubmitRequest(post(body), id, ctxFor(deps, getSession));
  assert.equal((await submit('abcdefgh12', { answers: { q: 0 } }, async () => null)).status, 401);
  assert.equal((await submit('abcdefgh12', { answers: { q: 0 } }, async () => ({ uid: 'a', admin: true }))).status, 403);
  assert.equal((await submit('../../x', { answers: { q: 0 } })).status, 400);
  assert.equal((await submit('abcdefgh12', { answers: 'nope' })).status, 400);
  assert.equal((await submit('abcdefgh12', { answers: { q: 0 } })).status, 404);

  const start = await read(await handleChatRequest(post({ message: 'quiz muhavare-shabd-prayog', context: CONTEXT }), ctxFor(deps)));
  const { attemptId, questions } = start.body.reply.card;
  assert.ok(!JSON.stringify(start.body).includes('correctIndex'));

  const attempt = (await deps.db.collection('users').doc('student-a').collection('botQuizAttempts').doc(attemptId).get()).data();
  const real = await makeQuestionLoader(deps.boardprep)(attempt);
  const answers = Object.fromEntries(real.map((q) => [String(q.id), q.correctIndex]));
  assert.equal(questions.length, real.length);

  const forged = await read(await submit(attemptId, { answers, score: 999, percentage: 100, userId: 'x' }));
  assert.equal(forged.status, 200);
  assert.equal(forged.body.result.correctCount, real.length);
  const again = await read(await submit(attemptId, { answers }));
  assert.equal(again.status, 409);
  assert.equal(again.body.code, 'already_submitted');
});

test('quiz submit: another student gets 404 for my attempt', async () => {
  const { deps } = makeDeps();
  const start = await read(await handleChatRequest(post({ message: 'quiz muhavare-shabd-prayog', context: CONTEXT }), ctxFor(deps)));
  const { attemptId, questions } = start.body.reply.card;
  const answers = Object.fromEntries(questions.map((q) => [q.id, 0]));
  const r = await handleQuizSubmitRequest(post({ answers }), attemptId, ctxFor(deps, student('student-b')));
  assert.equal(r.status, 404);
});

test('health: reports only AI configuration, no secrets, no auth required', async () => {
  const { deps } = makeDeps();
  const r = await read(handleHealthRequest({ deps }));
  assert.deepEqual(r.body, { ok: true, ai: { configured: false }, mode: 'deterministic' });
});
