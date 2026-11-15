import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleMessage } from '../src/lib/student-bot/core/orchestrator.mjs';
import { submitQuizAttempt, makeQuestionLoader } from '../src/lib/student-bot/handlers/quiz.mjs';
import { gradeQuiz, pickQuestions, toClientQuestions } from '../src/lib/student-bot/core/quiz-engine.mjs';
import { CONTEXT, makeDeps } from './helpers/bot-deps.mjs';

const UID = 'student-a';
const OTHER = 'student-b';

async function startQuiz(deps, uid = UID, text = 'quiz muhavare-shabd-prayog') {
  return handleMessage({ message: text, context: CONTEXT, uid, deps });
}
const answersFor = async (deps, attemptId, uid, pick) => {
  const snapDoc = await deps.db.collection('users').doc(uid).collection('botQuizAttempts').doc(attemptId).get();
  const att = snapDoc.data();
  const questions = await makeQuestionLoader(deps.boardprep)(att);
  return Object.fromEntries(questions.map((q) => [String(q.id), pick(q)]));
};

test('starting a quiz returns questions with NO answer key, explanation or hints', async () => {
  const { deps } = makeDeps();
  const res = await startQuiz(deps);
  assert.equal(res.kind, 'quiz');
  const wire = JSON.stringify(res);
  for (const forbidden of ['correctIndex', '"answer"', 'explanation', 'commonMistake']) assert.ok(!wire.includes(forbidden), `leaked ${forbidden}`);
  for (const q of res.card.questions) assert.deepEqual(Object.keys(q).sort(), ['id', 'options', 'prompt']);
  assert.ok(res.card.questions.length >= 3 && res.card.questions.length <= 5);
});

test('the persisted attempt stores issued ids only, never an answer key', async () => {
  const { deps, fake } = makeDeps();
  const res = await startQuiz(deps);
  const path = fake.paths().find((p) => p.includes('botQuizAttempts'));
  const stored = fake.read(path);
  assert.equal(stored.userId, UID);
  assert.equal(stored.status, 'in_progress');
  assert.equal(stored.questionIds.length, res.card.questions.length);
  assert.ok(!JSON.stringify(stored).match(/correctIndex|answer|explanation/));
});

test('server scores correct, wrong and unanswered questions', async () => {
  const { deps } = makeDeps();
  const { card } = await startQuiz(deps);
  const attempt = (await deps.db.collection('users').doc(UID).collection('botQuizAttempts').doc(card.attemptId).get()).data();
  const questions = await makeQuestionLoader(deps.boardprep)(attempt);
  const answers = Object.fromEntries(questions.map((q) => [String(q.id), q.correctIndex]));
  const [first, ...rest] = questions;
  answers[String(first.id)] = (first.correctIndex + 1) % first.options.length; // wrong
  delete answers[String(rest[rest.length - 1].id)]; // unanswered
  const out = await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers });
  assert.equal(out.ok, true);
  assert.equal(out.result.total, questions.length);
  assert.equal(out.result.unanswered, 1);
  assert.equal(out.result.correctCount, questions.length - 2);
  assert.equal(out.result.percentage, Math.round(((questions.length - 2) / questions.length) * 100));
  assert.ok(out.result.review.every((r) => 'correctIndex' in r), 'answer key is revealed only after submission');
});

test('duplicate submission is rejected with 409 and changes nothing', async () => {
  const { deps, fake } = makeDeps();
  const { card } = await startQuiz(deps);
  const answers = await answersFor(deps, card.attemptId, UID, (q) => q.correctIndex);
  assert.equal((await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers })).ok, true);
  const before = fake.mutations.length;
  const again = await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers });
  assert.equal(again.status, 409);
  assert.equal(again.code, 'already_submitted');
  assert.equal(fake.mutations.length, before);
});

test('concurrent double-submit grades exactly once', async () => {
  const { deps } = makeDeps();
  const { card } = await startQuiz(deps);
  const answers = await answersFor(deps, card.attemptId, UID, (q) => q.correctIndex);
  const results = await Promise.all([1, 2, 3].map(() => submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers })));
  assert.equal(results.filter((r) => r.ok).length, 1);
  assert.equal(results.filter((r) => r.status === 409).length, 2);
});

test('another student cannot submit or even see my attempt (404, not 403)', async () => {
  const { deps } = makeDeps();
  const { card } = await startQuiz(deps);
  const answers = await answersFor(deps, card.attemptId, UID, (q) => q.correctIndex);
  const stolen = await submitQuizAttempt({ deps, uid: OTHER, attemptId: card.attemptId, answers });
  assert.equal(stolen.status, 404);
  const mine = await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers });
  assert.equal(mine.ok, true, 'attacker attempt must not consume the owner attempt');
});

test('malformed answers are rejected: unknown id, out-of-range option, wrong type', async () => {
  const { deps } = makeDeps();
  const { card } = await startQuiz(deps);
  const id = card.questions[0].id;
  assert.equal((await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers: { 'not-a-question': 0 } })).code, 'unknown_question');
  assert.equal((await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers: { [id]: 99 } })).code, 'option_out_of_range');
  assert.equal((await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers: { [id]: '1' } })).code, 'option_out_of_range');
  assert.equal((await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers: { [id]: null } })).ok, false);
  // none of the rejected attempts consumed the quiz
  const okAnswers = await answersFor(deps, card.attemptId, UID, (q) => q.correctIndex);
  assert.equal((await submitQuizAttempt({ deps, uid: UID, attemptId: card.attemptId, answers: okAnswers })).ok, true);
});

test('invalid or missing attempt ids are 404', async () => {
  const { deps } = makeDeps();
  for (const id of ['', '../x', 'a', 'x'.repeat(80), null, undefined, 7, 'nonexistentattempt1']) {
    assert.equal((await submitQuizAttempt({ deps, uid: UID, attemptId: id, answers: { q: 0 } })).status, 404, String(id));
  }
});

test('expired attempts are rejected with 410', async () => {
  const { deps } = makeDeps({ now: 1_700_000_000_000 });
  const { card } = await startQuiz(deps);
  const late = { ...deps, now: () => 1_700_000_000_000 + 2 * 60 * 60 * 1000 };
  const answers = await answersFor(deps, card.attemptId, UID, (q) => q.correctIndex);
  assert.equal((await submitQuizAttempt({ deps: late, uid: UID, attemptId: card.attemptId, answers })).status, 410);
});

test('a retry creates a fresh attempt', async () => {
  const { deps, fake } = makeDeps();
  const a = await startQuiz(deps);
  const b = await startQuiz(deps);
  assert.notEqual(a.card.attemptId, b.card.attemptId);
  assert.equal(fake.paths().filter((p) => p.includes('botQuizAttempts')).length, 2);
});

test('unpublished or unknown chapters never start a quiz', async () => {
  const { deps, fake } = makeDeps();
  const res = await startQuiz(deps, UID, 'quiz definitely-not-a-chapter');
  assert.equal(res.kind, 'info');
  assert.equal(fake.paths().length, 0);
});

test('no context asks a follow-up and writes nothing', async () => {
  const { deps, fake } = makeDeps();
  const res = await handleMessage({ message: 'quiz muhavare-shabd-prayog', context: {}, uid: UID, deps });
  assert.equal(res.needs, 'context');
  assert.equal(fake.paths().length, 0);
});

test('invalid quiz size is refused; only 5 or 10 accepted', async () => {
  const { deps } = makeDeps();
  const res = await startQuiz(deps, UID, 'quiz muhavare-shabd-prayog 7');
  assert.equal(res.kind, 'follow_up');
});

test('empty question set: fewer than 3 validated MCQs refuses honestly', async () => {
  const { deps, fake } = makeDeps();
  const sparse = { ...deps, boardprep: { ...deps.boardprep, getMcqs: () => [] } };
  const res = await startQuiz(sparse);
  assert.equal(res.kind, 'info');
  assert.match(res.text, /not enough for a quiz/);
  assert.equal(fake.paths().length, 0);
});

test('engine: pickQuestions is deterministic with a seeded rng, deduplicates, and respects size', () => {
  const qs = Array.from({ length: 12 }, (_, i) => ({ id: `q${i}`, prompt: 'p', options: ['a', 'b'], correctIndex: 0 }));
  const seeded = () => { let s = 7; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; };
  assert.deepEqual(pickQuestions(qs, 5, seeded()).map((q) => q.id), pickQuestions(qs, 5, seeded()).map((q) => q.id));
  assert.equal(pickQuestions(qs, 10).length, 10);
  assert.equal(pickQuestions(qs, 7).length, 5, 'unsupported sizes fall back to the default');
  assert.equal(pickQuestions([...qs, qs[0]], 10).length, 10);
  assert.equal(pickQuestions([], 5).length, 0);
});

test('engine: grading ignores forged score fields and never mutates questions', () => {
  const qs = [{ id: 'a', prompt: 'p', options: ['x', 'y'], correctIndex: 1 }];
  const frozen = Object.freeze(qs.map((q) => Object.freeze({ ...q })));
  const out = gradeQuiz(frozen, { a: 0 });
  assert.equal(out.correctCount, 0);
  assert.deepEqual(Object.keys(toClientQuestions(frozen)[0]).sort(), ['id', 'options', 'prompt']);
});
