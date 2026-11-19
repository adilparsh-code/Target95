import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  createAutoProgressTracker,
  QUESTION_PREVIEW_LIMIT,
  SECTION_DEFINITIONS,
  decideAutoProgress,
  findRenderedSections,
  getAdjacentSectionId,
  getQuestionHref,
  getVisibleQuestions,
  isSectionCompleted,
  isSectionViewed,
  normalizeSectionId,
  pickActiveSectionId,
  sectionsAtReadingLine,
  statusRank,
} from "../src/lib/study/chapterSections.mjs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

// ---- Source-level checks: ids the page really renders -----------------------

const sectionsDir = new URL("../src/app/components/content/sections/", import.meta.url);
const renderedIdsFromSource = () => {
  const ids = [];
  for (const file of readdirSync(sectionsDir).filter((name) => name.endsWith("Section.jsx"))) {
    const source = readFileSync(join(sectionsDir.pathname, file), "utf8");
    for (const match of source.matchAll(/<ChapterSection[^>]*?\bid="([^"]+)"/gs)) ids.push(match[1]);
  }
  const study = read("src/app/components/study/StudyChapter.jsx");
  for (const match of study.matchAll(/<ChapterSection[^>]*?\bid="([^"]+)"/gs)) ids.push(match[1]);
  for (const match of study.matchAll(/\sid="(chapter-header|chapter-search)"/g)) ids.push(match[1]);
  return ids;
};

test("every rendered section id is a canonical navigation id and none is duplicated", () => {
  const ids = renderedIdsFromSource();
  assert.ok(ids.length >= 12, `expected the real section ids, got ${ids.join(",")}`);
  assert.equal(new Set(ids).size, ids.length, `duplicate DOM ids: ${ids.join(",")}`);
  const definitionIds = new Set(SECTION_DEFINITIONS.map((item) => item.id));
  for (const id of ids.filter((item) => !item.startsWith("chapter-"))) {
    assert.ok(definitionIds.has(id), `rendered section "${id}" is missing from SECTION_DEFINITIONS`);
  }
});

test("navigation and observer no longer look up the non-existent section- prefixed ids", () => {
  for (const file of [
    "src/app/components/ChapterLayout.jsx",
    "src/app/components/study/StudyChapter.jsx",
    "src/app/components/content/ChapterContentEngine.jsx",
  ]) {
    assert.doesNotMatch(read(file), /getElementById\(`section-/, `${file} still uses section-<id> lookups`);
    assert.doesNotMatch(read(file), /includes\(`section-/, `${file} still compares section-<id>`);
  }
  assert.doesNotMatch(read("src/app/components/study/StudyChapter.jsx"), /id="section-/);
});

test("SECTION_DEFINITIONS ids are unique and keep the original order", () => {
  const ids = SECTION_DEFINITIONS.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
  const original = ["overview","learning-objectives","prerequisites","theory","definitions","key-terms","examples","diagrams","important-notes","common-mistakes","practice","mcqs","programming","previous-year-questions","mock-test","ai-tutor"];
  assert.deepEqual(ids.filter((id) => original.includes(id)), original);
});

// ---- Navigation ------------------------------------------------------------

const fakeElement = (order) => ({
  order,
  compareDocumentPosition(other) {
    return other.order > order ? 4 : 2;
  },
});
const fakeDocument = (present) => (id) => (id in present ? present[id] : null);

test("findRenderedSections returns only sections that exist, in DOM order", () => {
  const dom = fakeDocument({
    theory: fakeElement(2),
    overview: fakeElement(9), // rendered after the engine, like the real page
    examples: fakeElement(3),
    "learning-objectives": fakeElement(1),
  });
  const rendered = findRenderedSections(dom);
  assert.deepEqual(rendered.map((item) => item.id), ["learning-objectives", "theory", "examples", "overview"]);
});

test("every navigation target resolves to an existing element", () => {
  const present = { theory: fakeElement(1), examples: fakeElement(2), mcqs: fakeElement(3) };
  const dom = fakeDocument(present);
  const ids = findRenderedSections(dom).map((item) => item.id);
  for (const id of ids) assert.ok(dom(normalizeSectionId(id)), `${id} has no element`);
  assert.equal(dom(normalizeSectionId("section-theory")), present.theory, "legacy section- ids still resolve");
});

test("Previous / Next topic walk the rendered list and stop at the ends", () => {
  const ids = ["theory", "examples", "mcqs"];
  assert.equal(getAdjacentSectionId(ids, "theory", "next"), "examples");
  assert.equal(getAdjacentSectionId(ids, "examples", "previous"), "theory");
  assert.equal(getAdjacentSectionId(ids, "mcqs", "next"), null);
  assert.equal(getAdjacentSectionId(ids, "theory", "previous"), null);
  assert.equal(getAdjacentSectionId(ids, "section-examples", "next"), "mcqs", "legacy id accepted");
});

test("missing sections never break navigation", () => {
  assert.equal(getAdjacentSectionId([], "theory", "next"), null);
  assert.equal(getAdjacentSectionId(["theory"], "mock-test", "next"), "theory"); // active not on page -> first
  assert.equal(getAdjacentSectionId(["theory"], "mock-test", "previous"), null);
  assert.deepEqual(findRenderedSections(fakeDocument({})), []);
});

test("pickActiveSectionId follows scroll position", () => {
  const entries = [{ id: "a", top: -900 }, { id: "b", top: -20 }, { id: "c", top: 400 }];
  assert.equal(pickActiveSectionId(entries, 180), "b");
  assert.equal(pickActiveSectionId([{ id: "a", top: 300 }], 180), "a");
  assert.equal(pickActiveSectionId([], 180), null);
});

// ---- Reading progress ------------------------------------------------------

test("isSectionViewed detects real intersections, including very tall sections", () => {
  const viewport = { height: 800 };
  assert.equal(isSectionViewed({ isIntersecting: false, intersectionRatio: 0 }), false);
  assert.equal(isSectionViewed({ isIntersecting: true, intersectionRatio: 0.35 }), true);
  assert.equal(isSectionViewed({ isIntersecting: true, intersectionRatio: 0.05, rootBounds: viewport, intersectionRect: { height: 800 } }), true, "5000px section filling the screen");
  assert.equal(isSectionViewed({ isIntersecting: true, intersectionRatio: 0.02, rootBounds: viewport, intersectionRect: { height: 40 } }), false, "barely scrolled past");
});

const ids = (n) => Array.from({ length: n }, (_, i) => `s${i}`);

test("progress reaches Studying at the threshold and Completed only when all rendered sections are viewed", () => {
  const rendered = ids(6);
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered.slice(0, 3), currentStatus: "Not Started" }), null);
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered.slice(0, 4), currentStatus: "Not Started" }), "Studying");
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered.slice(0, 5), currentStatus: "Studying" }), null);
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered, currentStatus: "Studying" }), "Completed");
});

test("a chapter with few rendered sections is not completed merely by being opened", () => {
  assert.equal(decideAutoProgress({ renderedIds: ["a"], viewedIds: ["a"], currentStatus: "Not Started" }), null);
  assert.equal(decideAutoProgress({ renderedIds: ["a", "b", "c"], viewedIds: ["a", "b", "c"], currentStatus: "Not Started" }), "Studying");
  assert.equal(decideAutoProgress({ renderedIds: [], viewedIds: [], currentStatus: "Not Started" }), null);
});

test("missing sections cannot falsely complete a chapter", () => {
  // 16 declared sections, only 5 rendered, 2 viewed -> nothing.
  const rendered = ids(5);
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: ["s0", "s1"], currentStatus: "Not Started" }), null);
  // Viewed ids that are not on the page are ignored.
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: ["x1", "x2", "x3", "x4", "x5"], currentStatus: "Not Started" }), null);
});

test("duplicate observer events do not create duplicate submissions", () => {
  const rendered = ids(6);
  let appliedRank = 0;
  const submissions = [];
  const tick = (viewed, current) => {
    const next = decideAutoProgress({ renderedIds: rendered, viewedIds: viewed, currentStatus: current, appliedRank });
    if (next) {
      appliedRank = statusRank(next);
      submissions.push(next);
    }
  };
  // Same state re-evaluated many times, even though stored status has not caught up yet.
  for (let i = 0; i < 5; i += 1) tick(rendered.slice(0, 4), "Not Started");
  assert.deepEqual(submissions, ["Studying"]);
  for (let i = 0; i < 5; i += 1) tick(rendered, "Not Started");
  assert.deepEqual(submissions, ["Studying", "Completed"]);
});

test("existing and manual progress is never downgraded or overridden", () => {
  const rendered = ids(6);
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered, currentStatus: "Completed" }), null);
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered.slice(0, 4), currentStatus: "Completed" }), null);
  // Student reset the chapter to "Not Started" manually after auto-tracking applied Studying.
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered.slice(0, 4), currentStatus: "Not Started", appliedRank: statusRank("Studying") }), null);
});

test("isSectionCompleted accepts canonical and legacy ids", () => {
  assert.equal(isSectionCompleted(["theory"], "theory"), true);
  assert.equal(isSectionCompleted(["section-theory"], "theory"), true);
  assert.equal(isSectionCompleted(["theory"], "section-theory"), true);
  assert.equal(isSectionCompleted([], "theory"), false);
});

test("manual Study Status controls and the Firebase-backed hook are untouched", () => {
  const source = read("src/app/components/study/StudyChapter.jsx");
  assert.match(source, /\["Not Started", "Studying", "Completed"\]\.map/);
  // Handler now also records the manual override; it must still persist via updateProgress(slug, option).
  assert.match(source, /onClick=\{\(\) => \{ autoProgress\.markManual\(\); updateProgress\(slug, option\); \}\}/);
  assert.match(source, /import useStudyProgress from/);
});

// ---- View All questions ----------------------------------------------------

const bank = (n) => Array.from({ length: n }, (_, i) => ({ id: `q${i + 1}`, question: `Question ${i + 1}` }));

test("first 10 questions display; View All exposes the complete set in the same order", () => {
  const questions = bank(25);
  const preview = getVisibleQuestions(questions, false);
  assert.equal(preview.length, QUESTION_PREVIEW_LIMIT);
  assert.deepEqual(preview.map((q) => q.id), questions.slice(0, 10).map((q) => q.id));
  const all = getVisibleQuestions(questions, true);
  assert.equal(all.length, 25);
  assert.deepEqual(all.map((q) => q.id), questions.map((q) => q.id));
  assert.equal(new Set(all.map((q) => q.id)).size, 25, "no duplicates introduced");
});

test("small and empty question banks work", () => {
  assert.equal(getVisibleQuestions(bank(3), false).length, 3);
  assert.equal(getVisibleQuestions(bank(10), false).length, 10);
  assert.deepEqual(getVisibleQuestions([], true), []);
  assert.deepEqual(getVisibleQuestions(null, false), []);
  assert.deepEqual(getVisibleQuestions(undefined, true), []);
});

test("question links keep ids and the ICSE practice routing", () => {
  assert.equal(getQuestionHref({ id: "q7" }, "loops"), "/Java/loops/question/q7");
  assert.equal(getQuestionHref({ id: "icse-1", board: "ICSE", practiceHref: "/question-bank" }, "loops"), "/question-bank");
  assert.equal(getQuestionHref({ id: "icse-1", board: "ICSE" }, "loops"), "/Java/loops/question/icse-1");
});

test("QuestionSection View All is in-page and no longer links back to the same chapter URL", () => {
  const source = read("src/app/components/study/QuestionSection.jsx");
  assert.doesNotMatch(source, /href=\{`\/Java\/\$\{chapter\}`\}/, "a link to the page you are already on");
  assert.match(source, /setShowAll/);
  assert.match(source, /getVisibleQuestions\(questions, showAll\)/);
  // Answer/explanation rules unchanged: explanation still hidden behind the existing toggle.
  assert.match(source, /expandedExplanations\[q\.id\] && q\.explanation/);
  // Server-side chapter filtering is untouched.
  assert.match(read("src/app/Java/[chapter]/page.jsx"), /getQuestionBankChapter\(slug\)/);
});

// ---- Manual Study Status override (current chapter visit) -------------------

// Simulates the page: `stored` is the persisted status, auto tracking submits via evaluate().
function visit(rendered = ids(6)) {
  const tracker = createAutoProgressTracker();
  const page = { stored: "Not Started", submissions: [], viewed: [] };
  page.view = (count) => {
    page.viewed = rendered.slice(0, count);
    const next = tracker.evaluate({ renderedIds: rendered, viewedIds: page.viewed, currentStatus: page.stored });
    if (next) {
      page.stored = next;
      page.submissions.push(next);
    }
  };
  page.manual = (status) => {
    tracker.markManual(); // what the Study Status button handler does
    page.stored = status;
  };
  page.tracker = tracker;
  return page;
}

test("manual 'Not Started' after auto 'Studying' is not overridden by viewing every section", () => {
  const page = visit();
  page.view(4);
  assert.equal(page.stored, "Studying");
  page.manual("Not Started");
  page.view(5);
  page.view(6); // every remaining section viewed
  assert.equal(page.stored, "Not Started");
  assert.deepEqual(page.submissions, ["Studying"], "no further automatic submission");
});

test("manual 'Studying' is never auto-promoted to 'Completed'", () => {
  const page = visit();
  page.manual("Studying");
  page.view(6);
  assert.equal(page.stored, "Studying");
  assert.deepEqual(page.submissions, []);
});

test("manual 'Completed' is kept, and a later manual reset is also kept", () => {
  const page = visit();
  page.view(4);
  page.manual("Completed");
  page.view(6);
  assert.equal(page.stored, "Completed");
  page.manual("Not Started");
  page.view(6);
  assert.equal(page.stored, "Not Started");
  assert.deepEqual(page.submissions, ["Studying"]);
});

test("manual choice before any reading also blocks auto progress", () => {
  const page = visit();
  page.manual("Not Started");
  page.view(4);
  page.view(6);
  assert.equal(page.stored, "Not Started");
  assert.deepEqual(page.submissions, []);
});

test("the override is cleared when navigating to a different chapter", () => {
  const tracker = createAutoProgressTracker();
  const rendered = ids(6);
  tracker.markManual();
  assert.equal(tracker.evaluate({ renderedIds: rendered, viewedIds: rendered, currentStatus: "Not Started" }), null);
  tracker.reset(); // StudyChapter calls this when the slug changes
  assert.equal(tracker.hasManualOverride, false);
  assert.equal(tracker.evaluate({ renderedIds: rendered, viewedIds: rendered.slice(0, 4), currentStatus: "Not Started" }), "Studying");
  assert.equal(tracker.evaluate({ renderedIds: rendered, viewedIds: rendered, currentStatus: "Studying" }), "Completed");
});

test("decideAutoProgress honours manualOverride directly", () => {
  const rendered = ids(6);
  assert.equal(decideAutoProgress({ renderedIds: rendered, viewedIds: rendered, currentStatus: "Not Started", manualOverride: true }), null);
});

test("StudyChapter wires the tracker: manual click marks override, slug change resets it", () => {
  const source = read("src/app/components/study/StudyChapter.jsx");
  assert.match(source, /autoProgress\.markManual\(\)/);
  assert.match(source, /autoProgress\.reset\(\)/);
  assert.match(source, /autoProgress\.evaluate\(/);
  // reset happens inside the effect keyed on slug
  assert.match(source, /useEffect\(\(\) => \{\n    if \(!slug \|\| !chapter\) return undefined;\n\n    autoProgress\.reset\(\)/);
});

// ---- Very tall sections ------------------------------------------------------

test("a section far taller than the screen counts as viewed once it covers the reading line", () => {
  const vh = 800;
  // 39,000px section, user is somewhere in its middle: only a few percent can ever be visible.
  const inside = [
    { id: "theory", top: -5000, bottom: -200 },
    { id: "examples", top: -12000, bottom: 27000 },
    { id: "diagrams", top: 27000, bottom: 29600 },
  ];
  assert.deepEqual(sectionsAtReadingLine(inside, vh), ["examples"]);
  // Not yet reached / already left behind -> not counted.
  assert.deepEqual(sectionsAtReadingLine([{ id: "a", top: 790, bottom: 900 }, { id: "b", top: -900, bottom: 100 }], vh), []);
  assert.deepEqual(sectionsAtReadingLine([], vh), []);
  assert.deepEqual(sectionsAtReadingLine(inside, 0), []);
});

test("StudyChapter also counts sections at the reading line from the scroll handler", () => {
  const source = read("src/app/components/study/StudyChapter.jsx");
  assert.match(source, /sectionsAtReadingLine\(/);
  assert.match(source, /previous\.slug !== renderedSlugRef\.current/);
});
