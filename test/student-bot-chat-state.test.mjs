import { test } from 'node:test';
import assert from 'node:assert/strict';
import { apiErrorText, clearHistory, createMessage, formatQuizResult, historyKey, loadHistory, MAX_HISTORY_MESSAGES, saveHistory, toPersistable } from '../src/lib/student-bot/ui/chat-state.mjs';

const memoryStorage = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k), _m: m }; };

test('history round-trips per user and is isolated between accounts', () => {
  const s = memoryStorage();
  saveHistory(s, 'u1', { messages: [createMessage({ role: 'user', text: 'help', now: 5 })], context: { board: 'icse', classSlug: 'class-10', subjectSlug: 'hindi' } });
  assert.equal(loadHistory(s, 'u1').messages[0].text, 'help');
  assert.deepEqual(loadHistory(s, 'u1').context, { board: 'icse', classSlug: 'class-10', subjectSlug: 'hindi' });
  assert.deepEqual(loadHistory(s, 'u2'), { messages: [], context: {} });
  clearHistory(s, 'u1');
  assert.equal(loadHistory(s, 'u1').messages.length, 0);
});

test('quiz questions and attempt ids are never persisted', () => {
  const quiz = createMessage({ role: 'bot', kind: 'quiz', text: 'Quiz', card: { type: 'quiz', attemptId: 'SECRETATTEMPT1', chapterTitle: 'Light', questions: [{ id: 'q', prompt: 'p', options: ['a'] }] } });
  const out = JSON.stringify(toPersistable([quiz]));
  assert.ok(!out.includes('SECRETATTEMPT1') && !out.includes('"questions"'));
  assert.equal(toPersistable([quiz])[0].kind, 'quiz_archived');
});

test('history is capped and corrupt/hostile storage yields an empty chat, not a crash', () => {
  const many = Array.from({ length: MAX_HISTORY_MESSAGES + 25 }, (_, i) => createMessage({ role: 'user', text: String(i) }));
  assert.equal(toPersistable(many).length, MAX_HISTORY_MESSAGES);
  const s = memoryStorage();
  for (const junk of ['{not json', 'null', '[]', '{"v":99,"messages":[]}', '{"v":1,"messages":"x"}']) {
    s.setItem(historyKey('u'), junk);
    assert.deepEqual(loadHistory(s, 'u'), { messages: [], context: {} }, junk);
  }
  s.setItem(historyKey('u'), JSON.stringify({ v: 1, messages: [{ role: 'admin', text: 'x' }, { role: 'user', text: 5 }, { role: 'user', text: 'ok' }], context: { board: '../x', classSlug: 'class-10' } }));
  const loaded = loadHistory(s, 'u');
  assert.deepEqual(loaded.messages.map((m) => m.text), ['ok']);
  assert.deepEqual(loaded.context, { classSlug: 'class-10' });
});

test('storage failures (quota/private mode) do not throw', () => {
  const broken = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('quota'); }, removeItem: () => { throw new Error('denied'); } };
  assert.equal(saveHistory(broken, 'u', { messages: [], context: {} }), false);
  assert.deepEqual(loadHistory(broken, 'u'), { messages: [], context: {} });
  clearHistory(broken, 'u');
  assert.equal(saveHistory(null, 'u', { messages: [] }), false);
});

test('no auth material is ever written: only message fields', () => {
  const s = memoryStorage();
  saveHistory(s, 'u1', { messages: [createMessage({ role: 'bot', text: 'hi', card: null })], context: {} });
  const raw = [...s._m.values()].join('');
  assert.ok(!/token|cookie|session|password/i.test(raw));
});

test('quiz result text shows score, wrong answers and explanations as plain text', () => {
  const text = formatQuizResult({ correctCount: 1, total: 2, percentage: 50, unanswered: 0, review: [
    { correct: true, prompt: 'A?', correctIndex: 0, explanation: 'because' },
    { correct: false, prompt: '<img src=x onerror=alert(1)>', correctIndex: 2, explanation: '' },
  ] });
  assert.match(text, /Score: 1\/2 \(50%\)/);
  assert.match(text, /Correct option: 3/);
  assert.match(text, /<img src=x onerror=alert\(1\)>/, 'markup is kept verbatim as text; the UI renders it as text only');
});

test('api error text never echoes server internals for 5xx', () => {
  assert.match(apiErrorText(401, {}), /sign in/i);
  assert.match(apiErrorText(429, {}), /too quickly/);
  assert.equal(apiErrorText(500, { error: 'stack trace at foo.js:1' }), 'Something went wrong. Please try again.');
  assert.equal(apiErrorText(400, { error: 'Message cannot be empty.' }), 'Message cannot be empty.');
});
