import { test, before } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { checkIdentityTable, canonicalIdFor, quarantineReasonFor } from "../src/content/identity.mjs";
import { hasErrors } from "../src/content/validate.mjs";

let api;
let catalog;

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "scripts/lib/alias-loader.mjs")));
  api = await import("../src/lib/content/index.js");
  ({ getCatalog: catalog } = await import("../src/lib/content/staticSource.js"));
});

test("identity table is structurally sound", () => {
  assert.deepEqual(checkIdentityTable(), []);
});

test("identity table ignores prototype keys such as 'constructor'", () => {
  assert.equal(canonicalIdFor("constructor"), "constructors");
  assert.equal(canonicalIdFor("toString"), null);
  assert.equal(quarantineReasonFor("hasOwnProperty"), null);
});

test("real catalog has zero validation errors", () => {
  const errors = api.getCatalogFindings().filter((finding) => finding.severity === "ERROR");
  assert.deepEqual(errors, []);
  assert.equal(hasErrors(api.getCatalogFindings()), false);
});

test("every question in the bank is kept: live + quarantined equals the source total", async () => {
  const { questionBankQuestions } = await import("../src/lib/questionBank.js");
  const { questions, quarantined } = catalog();
  assert.equal(questions.length + quarantined.length, questionBankQuestions.length);
  assert.deepEqual(
    quarantined.map((entry) => entry.question.id).sort(),
    ["icse-x-numbers-case-004", "icse-x-numbers-program-003"],
  );
  assert.ok(quarantined.every((entry) => entry.reason.length > 20));
});

test("slugs from all three namespaces resolve to a chapter", async () => {
  const curriculum = await import("../src/app/data/javaCurriculum.js");
  const legacy = (await import("../src/app/data/javaChapters.js")).default;
  const content = await import("../src/app/data/chapter-content/index.js");
  const bank = await import("../src/lib/javaChapterQuestionBank.js");
  const slugs = [
    ...curriculum.javaChapters.map((chapter) => chapter.slug),
    ...legacy.map((chapter) => chapter.slug),
    ...content.chapters.map((chapter) => chapter.slug),
    ...Object.keys(bank.chapterQuestionBankBySlug),
    "class-as-the-basis-of-computation",
  ];
  const unresolved = [...new Set(slugs)].filter((slug) => !api.getChapter(slug));
  assert.deepEqual(unresolved, []);
});

test("legacy and canonical slugs land on the same chapter", () => {
  assert.equal(api.getChapter("introduction").id, "introduction-to-java");
  assert.equal(api.getChapter("loops").id, "for-loop");
  assert.equal(api.getChapter("class-as-the-basis-of-computation").id, "classes-objects");
  assert.equal(api.getChapter("constructor").id, "constructors");
});

test("mock-test pool comes from real questions, not the dummy sample", () => {
  const pool = api.getMockTestQuestionPool({ board: "ICSE" });
  assert.ok(pool.length > 800);
  assert.ok(pool.every((question) => question.question && question.chapterId));
  assert.ok(!pool.some((question) => /linked list|two sum/i.test(question.question)));
  const loops = api.getMockTestQuestionPool({ board: "ICSE", chapter: "loops" });
  assert.ok(loops.length > 0 && loops.length < pool.length);
});

test("bookmarks resolve by id under canonical, legacy and title-style chapter keys", () => {
  const { questions } = catalog();
  const bank = questions.find((question) => question.chapterId === "for-loop");
  assert.ok(bank, "expected a for-loop question");

  for (const chapter of ["for-loop", "loops", bank.chapterSlug]) {
    const result = api.resolveBookmarkedQuestion({ chapter, questionId: bank.id });
    assert.equal(result.status, "found", `chapter key ${chapter}`);
    assert.equal(result.question.id, bank.id);
  }

  const icse = questions.find((question) => question.id.startsWith("icse-x-arrays-"));
  assert.equal(api.resolveBookmarkedQuestion({ chapter: "Arrays", questionId: icse.id }).status, "found");
});

test("bookmark ids stored as numbers still resolve when the id is numeric", () => {
  const { questions } = catalog();
  const numeric = questions.find((question) => /^\d+$/.test(question.id));
  if (!numeric) return; // bank currently uses string ids only
  const result = api.resolveBookmarkedQuestion({ chapter: numeric.chapterId, questionId: Number(numeric.id) });
  assert.equal(result.status, "found");
});

test("quarantined and missing bookmarks are handled without throwing", () => {
  const held = api.resolveBookmarkedQuestion({ chapter: "Number Systems", questionId: "icse-x-numbers-program-003" });
  assert.equal(held.status, "quarantined");
  assert.ok(held.question.question.includes("isArmstrong"));
  assert.ok(held.reason);

  assert.equal(api.resolveBookmarkedQuestion({ chapter: "loops", questionId: "no-such-id" }).status, "missing");
  assert.equal(api.resolveBookmarkedQuestion({ chapter: "totally-unknown", questionId: "icse-x-arrays-trace-001" }).status, "missing");
  assert.equal(api.resolveBookmarkedQuestion({}).status, "missing");
  assert.equal(api.resolveBookmarkedQuestion(undefined).status, "missing");
});

test("question stats snapshot matches the live catalog (run `npm run generate:content-stats` if this fails)", async () => {
  const { computeQuestionStats } = await import("../src/content/stats.mjs");
  const { QUESTION_STATS } = await import("../src/content/questionStats.mjs");
  assert.deepEqual(QUESTION_STATS, computeQuestionStats(catalog().questions));
});

test("study chapters report real, identity-resolved question counts", async () => {
  const { getStudyChapters, resolveStudyChapter } = await import("../src/lib/studyCenter.js");
  const { getQuestions } = api;
  const bySlug = Object.fromEntries(getStudyChapters().map((chapter) => [chapter.slug, chapter]));

  // Legacy study slugs resolve through the identity table to the same counts as the catalog.
  for (const [slug, id] of [["introduction", "introduction-to-java"], ["loops", "for-loop"], ["arrays", "arrays-1d"], ["constructor", "constructors"]]) {
    const live = getQuestions({ chapter: id });
    assert.ok(live.length > 0, `${id} should have questions`);
    const chapter = bySlug[slug];
    assert.equal(chapter.totalQuestions, live.length, slug);
    assert.equal(chapter.easyCount, live.filter((q) => q.difficulty === "Easy").length, slug);
    assert.equal(chapter.mediumCount, live.filter((q) => q.difficulty === "Medium").length, slug);
    assert.equal(chapter.hardCount, live.filter((q) => q.difficulty === "Hard").length, slug);
    assert.equal(chapter.easyCount + chapter.mediumCount + chapter.hardCount, chapter.totalQuestions, slug);
  }

  // No chapter ever reports more questions than exist, and empty chapters stay at 0 (nothing fabricated).
  assert.ok(getStudyChapters().every((chapter) => chapter.totalQuestions <= catalog().questions.length));
  assert.equal(bySlug["ethical-computing"].totalQuestions, 0);

  // The canonical route resolves counts the same way and no longer uses generated placeholder counts.
  assert.equal(resolveStudyChapter("for-loop").totalQuestions, getQuestions({ chapter: "for-loop" }).length);
  assert.equal(resolveStudyChapter("while-loop").totalQuestions, 0);
  assert.equal(resolveStudyChapter("introduction-to-oop-concepts").totalQuestions, 0);
});
