import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import mockTestQuestions from "../src/app/data/mock-test/mockTestQuestions.js";
import { buildMockTestPool, gradeAttempt, normalizeAttemptConfig, selectAttemptQuestionIds } from "../src/lib/mocktestAttempts.js";

// Golden snapshot captured from the grading code BEFORE the content-engine integration
// (test/fixtures/mocktest-legacy-golden.json). Legacy grades must never change.
const golden = JSON.parse(fs.readFileSync(new URL("./fixtures/mocktest-legacy-golden.json", import.meta.url), "utf8"));

test("all 28 legacy ids are unchanged: numeric, unique, 1001-4008", () => {
  assert.equal(mockTestQuestions.length, 28);
  assert.equal(new Set(mockTestQuestions.map((q) => q.id)).size, 28);
  assert.deepEqual(golden.questions.map((row) => row.id), mockTestQuestions.map((q) => String(q.id)));
  assert.ok(mockTestQuestions.every((q) => Number.isInteger(q.id) && q.id >= 1001 && q.id <= 4008));
});

test("legacy pools per category are still 8 / 6 / 6 / 8", () => {
  const sizes = Object.fromEntries(["icse-class-9", "icse-class-10", "isc-class-11", "isc-class-12"].map((category) => [
    category,
    buildMockTestPool(normalizeAttemptConfig({ category, difficulty: "all", type: "mixed", chapter: "all", count: 100 })).length,
  ]));
  assert.deepEqual(sizes, { "icse-class-9": 8, "icse-class-10": 6, "isc-class-11": 6, "isc-class-12": 8 });
});

test("every legacy question grades exactly as before (correct, wrong, unanswered)", () => {
  for (const row of golden.questions) {
    const question = mockTestQuestions.find((q) => String(q.id) === row.id);
    const config = normalizeAttemptConfig({ category: row.category, difficulty: "all", type: "mixed", chapter: "all", count: 100 });
    const attempt = { config, questionIds: [row.id], startedAtMs: golden.attempts[0].nowMs - 60_000 };
    const nowMs = golden.attempts[0].nowMs;
    const cases = { correct: { [row.id]: String(question.answer) }, wrong: { [row.id]: "zzz wrong answer" }, empty: {} };
    for (const [label, answers] of Object.entries(cases)) {
      const graded = gradeAttempt(attempt, answers, { nowMs });
      const expected = row[label];
      assert.deepEqual(graded.review, expected.review, `${row.id} ${label} review`);
      for (const key of ["score", "marksObtained", "totalMarks", "percentage", "accuracy", "wrongCount", "unansweredCount"]) {
        assert.equal(graded[key], expected[key], `${row.id} ${label} ${key}`);
      }
    }
  }
});

test("attempts created before the change (numeric ids only) still grade identically", () => {
  for (const fixture of golden.attempts) {
    const graded = gradeAttempt(fixture.attempt, fixture.answers, { nowMs: fixture.nowMs });
    const { reveal, ...stable } = graded;
    assert.deepEqual(stable, fixture.expected);
  }
});

test("server selection from the legacy pool is unchanged for a fixed random source", () => {
  for (const fixture of golden.attempts) {
    const ids = selectAttemptQuestionIds(fixture.attempt.config, () => 0.25);
    assert.deepEqual(ids, fixture.attempt.questionIds);
  }
});
