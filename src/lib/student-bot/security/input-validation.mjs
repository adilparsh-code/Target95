import { LIMITS } from '../config/commands.mjs';

const QUESTION_ID = /^[A-Za-z0-9_.-]{1,96}$/;
const SLUG = /^[a-z0-9][a-z0-9.-]{0,63}$/;
// Control characters except tab and newline.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const fail = (code, message) => ({ ok: false, code, message });

export function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function validateMessage(message) {
  if (typeof message !== 'string') return fail('invalid_message', 'Message must be text.');
  const value = message.normalize('NFC').trim();
  if (!value) return fail('empty_message', 'Message cannot be empty.');
  if (value.length > LIMITS.maxMessageChars) {
    return fail('message_too_long', `Message must be ${LIMITS.maxMessageChars} characters or fewer.`);
  }
  if (CONTROL.test(value)) return fail('invalid_message', 'Message contains unsupported characters.');
  return { ok: true, value };
}

export function validateContext(context) {
  if (context === undefined || context === null) return { ok: true, value: {} };
  if (!isPlainObject(context)) return fail('invalid_context', 'Context must be an object.');
  const value = {};
  for (const key of ['board', 'classSlug', 'subjectSlug']) {
    if (context[key] === undefined || context[key] === null || context[key] === '') continue;
    if (typeof context[key] !== 'string' || !SLUG.test(context[key])) {
      return fail('invalid_context', `Invalid ${key}.`);
    }
    value[key] = context[key];
  }
  return { ok: true, value };
}

export function validateChatBody(body) {
  if (!isPlainObject(body)) return fail('invalid_body', 'Request body must be a JSON object.');
  const message = validateMessage(body.message);
  if (!message.ok) return message;
  const context = validateContext(body.context);
  if (!context.ok) return context;
  return { ok: true, value: { message: message.value, context: context.value } };
}

export function validateSlug(value) {
  return typeof value === 'string' && SLUG.test(value);
}

// answers: { [questionId]: optionIndex } — exactly one integer per question id.
export function validateAnswers(answers) {
  if (!isPlainObject(answers)) return fail('invalid_answers', 'Answers must be an object.');
  const entries = Object.entries(answers);
  if (!entries.length || entries.length > LIMITS.quizSizes[LIMITS.quizSizes.length - 1]) {
    return fail('invalid_answers', 'Unexpected number of answers.');
  }
  const value = {};
  for (const [id, index] of entries) {
    if (!QUESTION_ID.test(id)) {
      return fail('invalid_answers', 'Invalid question id.');
    }
    if (!Number.isInteger(index) || index < 0 || index > 9) {
      return fail('invalid_answers', 'Each answer must be a single option number.');
    }
    value[id] = index;
  }
  return { ok: true, value };
}
