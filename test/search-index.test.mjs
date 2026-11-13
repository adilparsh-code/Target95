import { test, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

let projection;
let searchModule;
let api;
let catalog;
let content;
let SEARCH_INDEX;
const INDEX_FILE = path.join(process.cwd(), "src/content/searchIndex.mjs");

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "scripts/lib/alias-loader.mjs")));
  projection = await import("../src/content/searchProjection.mjs");
  ({ SEARCH_INDEX } = await import("../src/content/searchIndex.mjs"));
  searchModule = await import("../src/lib/content/searchIndex.js");
  api = await import("../src/lib/content/index.js");
  content = await import("../src/lib/mocktestContent.js");
  catalog = (await import("../src/lib/content/staticSource.js")).getCatalog();
});

const FORBIDDEN_FIELDS = ["answer", "answerIndex", "correctAnswer", "modelAnswer", "explanation", "options", "hint", "solution", "javaSolution", "codeSnippet", "flowExplanation"];

test("snapshot is fresh: regenerating from the catalog gives exactly the committed file", () => {
  const regenerated = projection.renderSearchIndexModule(projection.buildSearchIndex(catalog.questions, catalog.chapters));
  assert.equal(fs.readFileSync(INDEX_FILE, "utf8"), regenerated, "run `npm run generate:search-index`");
});

test("serialized payload: only the allow-listed columns exist, and no answer-bearing field name appears anywhere", () => {
  const text = fs.readFileSync(INDEX_FILE, "utf8");
  assert.deepEqual(SEARCH_INDEX.questionColumns, [...projection.SEARCH_QUESTION_COLUMNS]);
  assert.deepEqual(SEARCH_INDEX.chapterColumns, [...projection.SEARCH_CHAPTER_COLUMNS]);
  assert.deepEqual(Object.keys(SEARCH_INDEX).sort(), ["chapterColumns", "chapters", "questionColumns", "questions"]);
  for (const row of SEARCH_INDEX.questions) assert.equal(row.length, projection.SEARCH_QUESTION_COLUMNS.length);
  for (const field of FORBIDDEN_FIELDS) {
    assert.ok(!text.includes(`"${field}"`), `payload mentions "${field}"`);
    assert.ok(!SEARCH_INDEX.questionColumns.includes(field) && !SEARCH_INDEX.chapterColumns.includes(field));
  }
});

test("serialized payload carries none of the answer text or explanations of any live question", () => {
  const text = fs.readFileSync(INDEX_FILE, "utf8");
  const allQuestionText = catalog.questions.map((question) => question.question);
  const coincidences = [];
  let checked = 0;
  for (const question of catalog.questions) {
    if (question.explanation && question.explanation.length >= 25) {
      checked += 1;
      if (text.includes(JSON.stringify(question.explanation).slice(1, -1))) {
        // The payload has no explanation column, so the only way an explanation can appear is as
        // the ordinary question text of ANOTHER question that happens to contain the same sentence.
        const owners = catalog.questions.filter((other) => other.id !== question.id && other.question.includes(question.explanation));
        assert.ok(owners.length > 0 && allQuestionText.some((t) => t.includes(question.explanation)), `${question.id} explanation present in search payload and not explained by another question's text`);
        coincidences.push(question.id);
      }
    }
    // A long answer or model answer is never a whole value in the payload (short answers such as
    // "True" are ordinary words and cannot be told apart from question text).
    if (question.answer && question.answer.length >= 25) {
      assert.ok(!text.includes(JSON.stringify(question.answer)), `${question.id} answer present as a field value`);
    }
  }
  assert.ok(checked > 500, "audit actually inspected the bank");
  // Known, benign content coincidence: CH16-TF-003's explanation sentence is also the stem of CH16-AR-003.
  assert.deepEqual(coincidences, ["CH16-TF-003"]);
});

test("rows hold only text, ids and metadata: every value is a string or a list of strings", () => {
  for (const row of SEARCH_INDEX.questions) {
    row.forEach((value, i) => {
      if (SEARCH_INDEX.questionColumns[i] === "tags") assert.ok(Array.isArray(value) && value.every((tag) => typeof tag === "string"));
      else assert.equal(typeof value, "string");
    });
  }
});

test("all 325 mock-test questions stay searchable with their ids, chapters and links intact", () => {
  const eligible = content.getContentQuestions();
  assert.equal(eligible.length, 325);
  const indexed = new Map(SEARCH_INDEX.questions.map((row) => [row[0], row]));
  const chapterIds = new Set(SEARCH_INDEX.chapters.map((row) => row[0]));
  for (const mock of eligible) {
    const row = indexed.get(mock.sourceId);
    assert.ok(row, `${mock.sourceId} missing from the search index`);
    assert.equal(row[1], mock.question);
    assert.ok(chapterIds.has(row[2]), `${mock.sourceId} chapter ${row[2]} not in index`);
    const hits = searchModule.searchQuestions(mock.question.slice(0, 40));
    assert.ok(hits.some((hit) => hit.id === mock.sourceId), `${mock.sourceId} not found by its own text`);
  }
});

test("search results keep chapter identity and navigation (title, slug, /Java/<slug>)", () => {
  const [hit] = searchModule.searchQuestions("polymorphism");
  assert.ok(hit);
  const chapter = api.getChapter(hit.chapterId);
  assert.equal(hit.chapterTitle, chapter.title);
  assert.equal(hit.chapterSlugResolved, chapter.slug);
});

test("quarantined questions are not searchable (unchanged behaviour)", () => {
  const ids = new Set(SEARCH_INDEX.questions.map((row) => row[0]));
  for (const entry of catalog.quarantined) assert.ok(!ids.has(entry.question.id));
  assert.equal(catalog.quarantined.length, 2);
});

test("parity: the projection finds exactly what the catalog-based search found, in the same order", () => {
  // Reference implementation = the matching code the search box used before this change.
  const reference = (term) => {
    const needle = term.toLowerCase();
    return api.getQuestions().filter((q) => {
      const chapter = api.getChapter(q.chapterId);
      return [q.question, chapter?.title, q.chapterSlug, q.subject, ...q.tags].join(" ").toLowerCase().includes(needle);
    }).map((q) => ({ id: q.id, slug: api.getChapter(q.chapterId)?.slug || "", title: api.getChapter(q.chapterId)?.title || "", board: q.board || "", difficulty: q.difficulty, type: q.type }));
  };
  const terms = new Set(["java", "loop", "array", "string", "constructor", "inherit", "polymorphism", "scanner", "static", "output", "for", "while", "icse", "x", "zzzz-no-match", "Data Types"]);
  for (const q of api.getQuestions().slice(0, 400)) for (const tag of q.tags.slice(0, 2)) terms.add(tag);
  assert.ok(terms.size > 40);
  for (const term of terms) {
    const expected = reference(term);
    const actual = searchModule.searchQuestions(term).map((q) => ({ id: q.id, slug: q.chapterSlugResolved, title: q.chapterTitle, board: q.board, difficulty: q.difficulty, type: q.type }));
    assert.deepEqual(actual, expected, `term "${term}"`);
  }
});

test("bookmarks still resolve through the catalog (search change does not touch them)", () => {
  const first = api.getQuestions()[0];
  assert.equal(api.resolveBookmarkedQuestion({ chapter: first.chapterSlug, questionId: first.id }).status, "found");
});

test("the search component imports the projection, never the content catalog", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "src/app/components/StudentGlobalSearch.jsx"), "utf8");
  assert.match(source, /import\("@\/lib\/content\/searchIndex"\)/);
  assert.doesNotMatch(source, /@\/lib\/content["']/);
  assert.doesNotMatch(source, /questionBank|staticSource|javaChapterQuestionBank/);
  const wrapper = fs.readFileSync(path.join(process.cwd(), "src/lib/content/searchIndex.js"), "utf8");
  assert.doesNotMatch(wrapper, /staticSource|questionBank|lib\/content\/index/);
});

test("study-content search no longer throws for chapters whose examples are grouped by level (pre-existing bug on main)", async () => {
  const studyCenter = await import("../src/lib/studyCenter.js");
  const grouped = studyCenter.getStudyChapters().filter((chapter) => chapter.studyData?.examples && !Array.isArray(chapter.studyData.examples));
  assert.ok(grouped.length >= 6, "the grouped-examples chapters exist");
  for (const term of ["polymorphism", "loop", "array", "x", "zzzz-no-match"]) {
    assert.doesNotThrow(() => studyCenter.searchStudyContent(term, {}), term);
  }
  assert.ok(studyCenter.searchStudyContent("loop", {}).chapters.length > 0);
});
