import { INTENTS } from '../config/commands.mjs';
import { formatReplyForWhatsApp, splitForWhatsApp } from '../adapters/whatsapp-format.mjs';
import { parseInboundMessages } from '../adapters/whatsapp-payload.mjs';
import { safeEqual, verifyMetaSignature } from '../adapters/whatsapp-signature.mjs';
import { checkRateLimit } from '../security/rate-limit.mjs';
import { validateChatBody } from '../security/input-validation.mjs';
import { handleMessage } from './orchestrator.mjs';
import { routeIntent } from './intent-router.mjs';

// Framework-neutral WhatsApp Cloud API webhook (standard Request/Response), the
// same pattern as core/api.mjs. The route file only wires real dependencies in.
//
// Fail-closed rules:
//  - no Meta config            -> 503, nothing is read or sent
//  - bad/missing signature     -> 401, body is never parsed
//  - phone number not linked   -> ignored silently (no outbound message to strangers)
//  - not an active student     -> ignored silently
// The uid is only ever the one a trusted identity store returns for the sender's
// phone number; nothing in the message text can choose or change it.
const MAX_BODY_BYTES = 64 * 1024;

const text = (status, body) => new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
const json = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export const WHATSAPP_NOTICES = Object.freeze({
  unsupported: 'I can only read text messages for now. Send HELP to see what I can do.',
  invalid: 'Please send a shorter text message. Send HELP to see what I can do.',
  rateLimited: 'You are sending messages too fast. Please wait a minute and try again.',
  quiz: 'Quizzes are not available on WhatsApp yet. Try EXPLAIN <chapter> or CHAPTERS, or take the quiz on the Target95 website.',
  failed: 'Something went wrong on my side. Please try again.',
});

const isReady = (ctx) =>
  Boolean(ctx?.identity?.resolveStudent && ctx.identity.getProfile && ctx.sessions?.getContext && ctx.sessions.setContext && ctx.dedupe?.claim && ctx.sendText);

const isActiveStudent = (profile) =>
  Boolean(profile) && profile.role === 'student' && profile.status === 'active' && profile.disabled !== true;

// GET: Meta's one-time subscription handshake.
export function handleWhatsappVerify(request, ctx) {
  const { verifyToken } = ctx.config ?? {};
  if (!verifyToken) return text(503, 'unavailable');
  const params = new URL(request.url).searchParams;
  if (params.get('hub.mode') === 'subscribe' && safeEqual(params.get('hub.verify_token'), verifyToken)) {
    const challenge = params.get('hub.challenge') ?? '';
    // Echo only a plain token-like challenge, never arbitrary markup.
    if (/^[A-Za-z0-9_-]{1,200}$/.test(challenge)) return text(200, challenge);
  }
  return text(403, 'forbidden');
}

async function replyTo(ctx, to, chunks) {
  for (const chunk of chunks) await ctx.sendText(to, chunk);
}

async function processMessage(message, ctx) {
  const { deps } = ctx;
  if (!(await ctx.dedupe.claim(message.id))) return;

  const link = await ctx.identity.resolveStudent(message.from);
  if (!link || typeof link.uid !== 'string' || !link.uid) {
    deps.logger?.error?.('student-bot whatsapp ignored', { code: 'unlinked_number' });
    return;
  }
  const uid = link.uid;
  if (!isActiveStudent(await ctx.identity.getProfile(uid))) {
    deps.logger?.error?.('student-bot whatsapp ignored', { code: 'not_active_student' });
    return;
  }

  const say = (notice) => replyTo(ctx, message.from, splitForWhatsApp(notice));

  if (message.kind !== 'text') return say(WHATSAPP_NOTICES.unsupported);

  const limit = await checkRateLimit({ db: deps.db, uid, now: deps.now() });
  if (!limit.allowed) return say(WHATSAPP_NOTICES.rateLimited);

  const context = await ctx.sessions.getContext(uid);
  const valid = validateChatBody({ message: message.text, context: context ?? undefined });
  if (!valid.ok) return say(WHATSAPP_NOTICES.invalid);

  // Quiz answers need multi-step conversation state that is not built yet. Do
  // not create an attempt the student cannot finish.
  if (routeIntent(valid.value.message).intent === INTENTS.QUIZ) return say(WHATSAPP_NOTICES.quiz);

  const result = await handleMessage({ message: valid.value.message, context: valid.value.context, uid, deps });
  if (result?.context) await ctx.sessions.setContext(uid, result.context);
  return replyTo(ctx, message.from, formatReplyForWhatsApp(result));
}

// POST: inbound messages.
export async function handleWhatsappWebhook(request, ctx) {
  const { appSecret, phoneNumberId } = ctx.config ?? {};
  if (!appSecret || !phoneNumberId) return json(503, { ok: false, code: 'unavailable' });

  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return json(413, { ok: false, code: 'body_too_large' });
  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return json(400, { ok: false, code: 'invalid_body' });
  }
  if (rawBody.length > MAX_BODY_BYTES) return json(413, { ok: false, code: 'body_too_large' });

  if (!verifyMetaSignature({ rawBody, signatureHeader: request.headers.get('x-hub-signature-256'), appSecret })) {
    return json(401, { ok: false, code: 'invalid_signature' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json(400, { ok: false, code: 'invalid_json' });
  }

  const messages = parseInboundMessages(payload, { phoneNumberId });
  if (!messages.length) return json(200, { ok: true }); // delivery/read receipts etc.

  // Not wired to a store yet: answer 503 so Meta retries later instead of the
  // message being silently lost.
  if (!isReady(ctx)) {
    ctx.deps?.logger?.error?.('student-bot whatsapp not ready', { code: 'identity_not_configured' });
    return json(503, { ok: false, code: 'not_ready' });
  }

  for (const message of messages) {
    try {
      await processMessage(message, ctx);
    } catch (error) {
      // One bad message must not block the rest, and Meta must still get a 200
      // (a non-200 makes it re-deliver the whole batch). Never log message text
      // or phone numbers.
      ctx.deps.logger?.error?.('student-bot whatsapp message failed', { name: error?.name });
    }
  }
  return json(200, { ok: true });
}
