import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateChatBody, validateMessage, validateContext, validateAnswers } from '../src/lib/student-bot/security/input-validation.mjs';
import { LIMITS } from '../src/lib/student-bot/config/commands.mjs';

test('valid message is trimmed and accepted', () => {
  assert.deepEqual(validateMessage('  hello  '), { ok: true, value: 'hello' });
});

test('empty, whitespace, non-string and oversized messages are rejected', () => {
  assert.equal(validateMessage('').code, 'empty_message');
  assert.equal(validateMessage('   ').code, 'empty_message');
  for (const bad of [null, undefined, 5, {}, []]) assert.equal(validateMessage(bad).code, 'invalid_message');
  assert.equal(validateMessage('a'.repeat(LIMITS.maxMessageChars + 1)).code, 'message_too_long');
  assert.equal(validateMessage('a'.repeat(LIMITS.maxMessageChars)).ok, true);
});

test('control characters are rejected but newlines are allowed', () => {
  assert.equal(validateMessage('a\u0000b').code, 'invalid_message');
  assert.equal(validateMessage('a\u0007b').code, 'invalid_message');
  assert.equal(validateMessage('a\nb').ok, true);
});

test('chat body must be a plain object', () => {
  for (const bad of [null, undefined, 'x', 7, [], [{ message: 'hi' }]]) {
    assert.equal(validateChatBody(bad).code, 'invalid_body');
  }
});

test('context accepts only well-formed slugs and drops unknown keys', () => {
  assert.deepEqual(validateContext({ board: 'icse', classSlug: 'class-10', subjectSlug: 'physics', uid: 'attacker' }).value,
    { board: 'icse', classSlug: 'class-10', subjectSlug: 'physics' });
  for (const bad of [{ board: '../etc' }, { board: 'ICSE' }, { classSlug: 5 }, { subjectSlug: 'a/b' }, 'x', []]) {
    assert.equal(validateContext(bad).code, 'invalid_context', JSON.stringify(bad));
  }
  assert.deepEqual(validateContext(undefined).value, {});
});

test('a client-supplied student id is never carried into the validated body', () => {
  const result = validateChatBody({ message: 'help', uid: 'someone-else', studentId: 'x', context: { board: 'icse' } });
  assert.equal(result.ok, true);
  assert.deepEqual(Object.keys(result.value).sort(), ['context', 'message']);
});

test('answers must be one integer option per question id', () => {
  assert.equal(validateAnswers({ q1: 0, q2: 3 }).ok, true);
  for (const bad of [null, [], {}, { q1: '1' }, { q1: 1.5 }, { q1: -1 }, { q1: [0, 1] }, { 'bad id!': 0 }, { q1: 99 }]) {
    assert.equal(validateAnswers(bad).code, 'invalid_answers', JSON.stringify(bad));
  }
  const tooMany = Object.fromEntries(Array.from({ length: 11 }, (_, i) => [`q${i}`, 0]));
  assert.equal(validateAnswers(tooMany).code, 'invalid_answers');
});
