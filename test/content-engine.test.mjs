import { test } from "node:test";
import assert from "node:assert/strict";
import {
  classifyContentStatus,
  hasErrors,
  validateCatalog,
  validateQuestion,
} from "../src/content/validate.mjs";
import {
  buildQuestionChapterAssociations,
  normalizeDifficulty,
  questionBelongsToChapter,
  toUnifiedChapter,
  toUnifiedQuestion,
} from "../src/content/normalize.mjs";

const mcq = (overrides = {}) => ({
  ...toUnifiedQuestion(
    { id: "q1", type: "mcq", question: "2 + 2?", options: ["3", "4"], answer: 1, difficulty: "easy" },
    { chapterId: "ch" },
  ),
  ...overrides,
});

test("normalizeDifficulty maps legacy labels onto the shared scale", () => {
  assert.equal(normalizeDifficulty("easy"), "Easy");
  assert.equal(normalizeDifficulty("Beginner"), "Easy");
  assert.equal(normalizeDifficulty("Intermediate"), "Medium");
  assert.equal(normalizeDifficulty("Advanced"), "Hard");
  assert.equal(normalizeDifficulty(""), "Medium");
});

test("toUnifiedQuestion resolves MCQ answers from an index or from answer text", () => {
  const byIndex = toUnifiedQuestion({ id: 1, type: "mcq", question: "q", options: ["a", "b"], answer: 1 }, { chapterId: "c" });
  assert.equal(byIndex.answerIndex, 1);
  assert.equal(byIndex.answer, "b");
  assert.equal(byIndex.id, "1");

  const byText = toUnifiedQuestion({ id: 2, questionType: "mcq", question: "q", options: ["a", "b"], correctAnswer: "a" }, { chapterId: "c" });
  assert.equal(byText.answerIndex, 0);
});

test("validateQuestion accepts a valid MCQ and rejects a broken answer key", () => {
  assert.equal(hasErrors(validateQuestion(mcq())), false);
  assert.ok(validateQuestion(mcq({ answerIndex: 7 })).some((f) => f.code === "mcq.answer"));
  assert.ok(validateQuestion(mcq({ options: ["only"] })).some((f) => f.code === "mcq.options"));
  assert.ok(validateQuestion(mcq({ type: "essay" })).some((f) => f.code === "question.type"));
});

test("classifyContentStatus separates authored, stub and missing chapters", () => {
  assert.equal(classifyContentStatus({}), "missing");
  assert.equal(classifyContentStatus({ intro: "Description only", concepts: ["Topic"] }), "stub");
  assert.equal(classifyContentStatus({ definitions: ["Definition 1", "Definition 2"] }), "stub");
  assert.equal(classifyContentStatus({ theory: "Real explanation" }), "authored");
});

test("validateCatalog flags orphans, duplicate ids, slug collisions and shared content", () => {
  const chapter = (id, extra = {}) =>
    toUnifiedChapter({ id, slug: id, title: id }, { theory: "text" }, extra);
  const chapters = [
    chapter("a", { aliases: ["x"], contentSlug: "shared" }),
    chapter("b", { aliases: ["x"], contentSlug: "shared" }),
  ];
  const questions = [
    { ...mcq(), id: "1", chapterId: "a" },
    { ...mcq(), id: "1", chapterId: "a" },
    { ...mcq(), id: "2", chapterId: "ghost" },
  ];
  const codes = validateCatalog({ chapters, questions }).map((f) => f.code);
  for (const expected of ["chapter.slug-collision", "chapter.shared-content", "question.duplicate-id", "question.orphan", "chapter.no-questions"]) {
    assert.ok(codes.includes(expected), `missing ${expected}`);
  }
});


test("broad question-bank questions remain available to every granular sibling chapter", () => {
  const aliasIndex = new Map([
    ["loops", "for-loop"],
    ["for-loop", "for-loop"],
    ["while-loop", "while-loop"],
    ["do-while-loop", "do-while-loop"],
    ["arrays", "arrays-1d"],
    ["arrays-1d", "arrays-1d"],
    ["arrays-2d", "arrays-2d"],
  ]);
  const questionBankBySlug = {
    loops: [{ id: "loop-q1" }],
    "for-loop": [{ id: "loop-q1" }],
    "while-loop": [{ id: "loop-q1" }],
    "do-while-loop": [{ id: "loop-q1" }],
    arrays: [{ id: "array-q1" }],
    "arrays-1d": [{ id: "array-q1" }],
    "arrays-2d": [{ id: "array-q1" }],
  };

  const associations = buildQuestionChapterAssociations(questionBankBySlug, aliasIndex);
  assert.deepEqual(associations.get("loop-q1"), ["for-loop", "while-loop", "do-while-loop"]);
  assert.deepEqual(associations.get("array-q1"), ["arrays-1d", "arrays-2d"]);

  const loopQuestion = toUnifiedQuestion(
    { id: "loop-q1", type: "theory", question: "Explain loop control.", modelAnswer: "A loop repeats statements." },
    { chapterId: "for-loop", chapterIds: associations.get("loop-q1") },
  );
  for (const chapterId of ["for-loop", "while-loop", "do-while-loop"]) {
    assert.equal(questionBelongsToChapter(loopQuestion, chapterId), true);
  }
  assert.equal(questionBelongsToChapter(loopQuestion, "arrays-2d"), false);

  const chapters = ["for-loop", "while-loop", "do-while-loop"].map((id) =>
    toUnifiedChapter({ id, slug: id, title: id }, { theory: "Loop theory" }),
  );
  const findings = validateCatalog({ chapters, questions: [loopQuestion] });
  assert.equal(findings.some((finding) => finding.code === "chapter.no-questions"), false);
  assert.equal(findings.some((finding) => finding.code === "question.orphan"), false);
});
