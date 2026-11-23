import test from "node:test";
import assert from "node:assert/strict";
import { createInternalSearchAdapter } from "../src/lib/web-engine/internalSearch.mjs";

test("internal adapter combines existing office, study, concept and answer-free question sources", () => {
  const search = createInternalSearchAdapter({
    searchOfficeContent: () => [{ id: "office-word-1", title: "Word Tables", description: "Create tables", href: "/office/word/tables", type: "chapter" }],
    searchStudyContent: () => ({ chapters: [{
      slug: "arrays", canonicalId: "arrays-1d", title: "Arrays", studyData: { intro: "Array basics", concepts: ["Array traversal", "Sorting"] },
    }] }),
    searchQuestions: () => [{
      id: "q-1", question: "How does array traversal work?", chapterTitle: "Arrays", chapterSlugResolved: "arrays",
      chapterId: "arrays-1d", board: "ICSE", difficulty: "easy", type: "mcq",
      answer: "MUST NEVER BE COPIED", explanation: "MUST NEVER BE COPIED",
    }],
  });

  const response = search("array", { board: "cisce", class: { id: "icse-class-10" } });
  assert.equal(response.ok, true);
  assert.deepEqual(response.internalResults.map((item) => item.id), [
    "chapter-arrays", "concept-arrays-0", "question-q-1", "office-word-1",
  ]);
  assert.equal(JSON.stringify(response).includes("MUST NEVER BE COPIED"), false);
  assert.equal(response.internalResults.find((item) => item.id === "question-q-1").href, "/Java/arrays");
});

test("CBSE adapter uses the selected class and subject and emits only safe DTO fields", () => {
  let received;
  const search = createInternalSearchAdapter({
    searchOfficeContent: () => [],
    getCBSEChapters: (classNumber, subjectCode) => {
      received = [classNumber, subjectCode];
      return [{ id: "cbse-10-402-u1", title: "Data Handling", unitTitle: "Data", unitId: "u1", learningObjectives: [] }];
    },
    getCBSEPracticeQuestions: (classNumber, subjectCode) => {
      received = [classNumber, subjectCode];
      return [{ id: "q-2", title: "Data tables", question: "Search data tables", chapter: "Data", answer: "SECRET" }];
    },
  });

  const response = search("data", { board: "cbse", class: "cbse-class-10", subject: "402" });
  assert.deepEqual(received, [10, "402"]);
  assert.equal(response.internalResults.length, 2);
  assert.equal(JSON.stringify(response).includes("SECRET"), false);
  assert.equal(response.internalResults[0].href, "/cbse/class/10/subject/402/unit/u1");
});

test("invalid query returns an empty, typed response without calling sources", () => {
  const search = createInternalSearchAdapter({
    searchOfficeContent: () => { throw new Error("must not run"); },
  });
  const response = search("   ");
  assert.equal(response.ok, false);
  assert.deepEqual(response.internalResults, []);
});
