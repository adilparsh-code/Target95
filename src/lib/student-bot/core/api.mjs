import { LIMITS } from '../config/commands.mjs';
import { authorizeStudent } from '../security/authorization.mjs';
import { checkRateLimit } from '../security/rate-limit.mjs';
import { validateAnswers, validateChatBody } from '../security/input-validation.mjs';
import { handleMessage } from './orchestrator.mjs';
import { submitQuizAttempt } from '../handlers/quiz.mjs';

// Framework-neutral request handlers (standard Request/Response) so the exact
// code that serves production is what the tests exercise. Route files only wire
// real dependencies in.
const ATTEMPT_ID = /^[A-Za-z0-9]{8,40}$/;

const json = (status, body, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
const fail = (status, code, error, headers) => json(status, { ok: false, code, error }, headers);

async function readJson(request) {
  const type = (request.headers.get('content-type') || '').toLowerCase();
  if (!type.includes('application/json')) return { error: fail(415, 'unsupported_media_type', 'Send JSON.') };
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > LIMITS.maxBodyBytes) return { error: fail(413, 'body_too_large', 'Request is too large.') };
  let text;
  try {
    text = await request.text();
  } catch {
    return { error: fail(400, 'invalid_body', 'Could not read the request.') };
  }
  if (text.length > LIMITS.maxBodyBytes) return { error: fail(413, 'body_too_large', 'Request is too large.') };
  try {
    return { value: JSON.parse(text) };
  } catch {
    return { error: fail(400, 'invalid_json', 'Invalid JSON body.') };
  }
}

// auth -> rate limit -> body. Failing closed at each step.
async function gate(request, { getSession, getProfileRole, deps }) {
  const auth = await authorizeStudent(request, { getSession, getProfileRole });
  if (!auth.ok) return { response: fail(auth.status, auth.code, auth.error) };
  try {
    const limit = await checkRateLimit({ db: deps.db, uid: auth.uid, now: deps.now() });
    if (!limit.allowed) {
      return { response: fail(429, 'rate_limited', 'Too many requests. Please slow down.', { 'Retry-After': String(limit.retryAfterSec) }) };
    }
  } catch (error) {
    deps.logger?.error?.('student-bot rate limit unavailable', { name: error?.name });
    return { response: fail(503, 'rate_limit_unavailable', 'The assistant is temporarily unavailable.') };
  }
  return { uid: auth.uid };
}

export async function handleChatRequest(request, ctx) {
  const gated = await gate(request, ctx);
  if (gated.response) return gated.response;
  const body = await readJson(request);
  if (body.error) return body.error;
  const valid = validateChatBody(body.value);
  if (!valid.ok) return fail(400, valid.code, valid.message);
  const result = await handleMessage({ message: valid.value.message, context: valid.value.context, uid: gated.uid, deps: ctx.deps });
  return json(200, { ok: true, reply: result });
}

export async function handleQuizSubmitRequest(request, attemptId, ctx) {
  const gated = await gate(request, ctx);
  if (gated.response) return gated.response;
  if (!ATTEMPT_ID.test(String(attemptId ?? ''))) return fail(400, 'invalid_attempt_id', 'Invalid quiz id.');
  const body = await readJson(request);
  if (body.error) return body.error;
  if (body.value === null || typeof body.value !== 'object' || Array.isArray(body.value)) return fail(400, 'invalid_body', 'Request body must be a JSON object.');
  const answers = validateAnswers(body.value.answers);
  if (!answers.ok) return fail(400, answers.code, answers.message);
  try {
    // Only `answers` is read; any score/userId in the body is ignored.
    const out = await submitQuizAttempt({ deps: ctx.deps, uid: gated.uid, attemptId, answers: answers.value });
    if (!out.ok) return fail(out.status, out.code, 'Could not submit this quiz.');
    return json(200, { ok: true, result: out.result });
  } catch (error) {
    ctx.deps.logger?.error?.('student-bot quiz submit failed', { name: error?.name });
    return fail(500, 'submit_failed', 'Unable to submit the quiz right now.');
  }
}

// Public, no secrets: only whether an AI provider is configured.
export function handleHealthRequest({ deps }) {
  return json(200, { ok: true, ai: { configured: deps.ai.isConfigured() }, mode: deps.ai.isConfigured() ? 'ai' : 'deterministic' });
}
