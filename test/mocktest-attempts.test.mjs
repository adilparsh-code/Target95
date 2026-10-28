import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildMockTestPool,
  buildResultDocument,
  gradeAttempt,
  normalizeAttemptConfig,
  sanitizeAnswers,
  selectAttemptQuestionIds,
} from "../src/lib/mocktestAttempts.js";

const config = normalizeAttemptConfig({ category: "icse-class-10", difficulty: "all", type: "mcq", count: 5, duration: 30 });
const pool = buildMockTestPool(config);
const questionIds = pool.slice(0, Math.min(3, pool.length)).map((q) => String(q.id));
const attempt = { config, questionIds, startedAtMs: Date.now() - 60_000 };
const correctAnswers = Object.fromEntries(pool.slice(0, questionIds.length).map((q) => [String(q.id), String(q.answer)]));

test("fixture: ICSE class 10 MCQ pool has questions", () => {
  assert.ok(questionIds.length >= 2, "expected at least two MCQ questions in the fixture pool");
});

test("legitimate submission with all correct answers scores full marks", () => {
  const graded = gradeAttempt(attempt, correctAnswers);
  assert.equal(graded.score, questionIds.length);
  assert.equal(graded.correctCount, questionIds.length);
  assert.equal(graded.wrongCount, 0);
  assert.equal(graded.percentage, 100);
});

test("legitimate submission with wrong and missing answers is scored honestly", () => {
  const [first, second] = questionIds;
  const graded = gradeAttempt(attempt, { [first]: correctAnswers[first], [second]: "definitely wrong" });
  assert.equal(graded.score, 1);
  assert.equal(graded.wrongCount, 1);
  assert.equal(graded.unansweredCount, questionIds.length - 2);
});

test("forged score fields in the submission are ignored", () => {
  const forged = { score: 999, percentage: 100, correctCount: 999, marksObtained: 999, [questionIds[0]]: "wrong" };
  const graded = gradeAttempt(attempt, forged);
  assert.equal(graded.score, 0);
  assert.equal(graded.percentage, 0);
  assert.equal(graded.marksObtained, 0);
});

test("answers for questions outside the attempt are dropped", () => {
  const outsider = pool.find((q) => !questionIds.includes(String(q.id)));
  const answers = sanitizeAnswers(questionIds, {
    ...(outsider ? { [String(outsider.id)]: String(outsider.answer) } : {}),
    [questionIds[0]]: correctAnswers[questionIds[0]],
    userId: "someone-else",
    role: "admin",
  });
  assert.deepEqual(Object.keys(answers), [questionIds[0]]);
});

test("non-string answers are rejected", () => {
  const answers = sanitizeAnswers(questionIds, { [questionIds[0]]: { $gt: "" }, [questionIds[1]]: 42 });
  assert.deepEqual(answers, {});
});

test("tampered attempt question sets are refused", () => {
  assert.throws(() => gradeAttempt({ ...attempt, questionIds: [] }, {}));
  assert.throws(() => gradeAttempt({ ...attempt, questionIds: [questionIds[0], questionIds[0]] }, {}));
  assert.throws(() => gradeAttempt({ ...attempt, questionIds: ["not-a-real-question"] }, {}));
});

test("time taken is computed from the server start time and capped", () => {
  const graded = gradeAttempt({ ...attempt, startedAtMs: Date.now() - 10 * 60 * 60 * 1000 }, {});
  assert.equal(graded.timeTaken, config.duration * 60);
  assert.equal(graded.lateSubmission, true);
});

test("result document identity comes from the verified uid only", () => {
  const graded = gradeAttempt(attempt, { ...correctAnswers, userId: "bob" });
  const doc = buildResultDocument({ uid: "alice", attemptId: "abc123def456", graded });
  assert.equal(doc.userId, "alice");
  assert.equal(doc.source, "server-graded");
  assert.equal(doc.attemptId, "abc123def456");
  assert.throws(() => buildResultDocument({ uid: "", attemptId: "x", graded }));
});

test("config normalisation clamps untrusted values", () => {
  const c = normalizeAttemptConfig({ count: 100000, duration: -5, board: "HACK", category: "../../etc", mode: "god" });
  assert.equal(c.count, 100);
  assert.equal(c.duration, 1);
  assert.equal(c.board, "ICSE");
  assert.equal(c.category, "icse-class-10");
  assert.equal(c.mode, "exam");
});

test("server-selected questions all come from the configured pool", () => {
  const ids = selectAttemptQuestionIds(config, () => 0.5);
  const poolIds = new Set(pool.map((q) => String(q.id)));
  assert.ok(ids.length > 0 && ids.length <= config.count);
  assert.ok(ids.every((id) => poolIds.has(id)));
  assert.equal(new Set(ids).size, ids.length);
});
