/**
 * Question Bank Adapter
 * Normalizes structured question-bank data for the study content engine.
 */

import questionBank from "@/app/data/question-bank";
import { ICSE_CLASS_X_CONTENT_MAP } from "@/app/data/icseClassXContent";

const chapterBankAliases = {
  introduction: "introduction-to-java",
  "variables-data-types": "variables-data-types",
  "data-types-variables": "variables-data-types",
  operators: "operators",
  "if-else": "if-else",
  "conditional-statements": "if-else",
  loops: "loops",
  "iterative-statements": "loops",
  methods: "methods",
  arrays: "arrays",
  strings: "strings",
  "string-handling": "strings",
  constructors: "constructors",
  "x-constructors": "constructors",
  "custom-methods": "methods",
  "x-custom-methods": "methods",
  "library-classes": "library-classes",
  "x-library-classes": "library-classes",
  "disruptive-technologies": "disruptive-technologies",
  "x-disruptive-technologies": "disruptive-technologies",
  "xi-system-of-numeration": "system-of-numeration",
};

const letterToIndex = (letter) => {
  if (typeof letter === "number") return letter;
  if (typeof letter !== "string") return 0;
  const upper = letter.toUpperCase().trim();
  const index = upper.charCodeAt(0) - 65;
  return index >= 0 && index <= 4 ? index : 0;
};

const stripOptionPrefix = (option) => {
  if (typeof option !== "string") return option;
  return option
    .replace(/^[-*]\s+[A-E]\)\s*/, "")
    .replace(/^\([A-E]\)\s*/, "")
    .replace(/^[A-E]\)\s*/, "")
    .trim();
};

function normalizeMcqs(mcqs) {
  if (!Array.isArray(mcqs) || mcqs.length === 0) return null;
  return mcqs.map((q) => ({
    id: q.id,
    question: q.question,
    options: Array.isArray(q.options) ? q.options.map(stripOptionPrefix) : [],
    answer: letterToIndex(q.correctAnswer ?? q.answer),
    explanation: q.explanation || "",
    difficulty: q.difficulty,
    marks: q.marks,
  }));
}

function normalizeOutputQuestions(outputQuestions) {
  if (!Array.isArray(outputQuestions) || outputQuestions.length === 0) return null;
  return outputQuestions.map((q) => ({
    id: q.id,
    question: q.question || q.prompt,
    answer: q.correctAnswer !== undefined ? q.correctAnswer : q.answer,
    explanation: q.explanation || "",
    difficulty: q.difficulty,
    marks: q.marks,
    estimatedTime: q.estimatedTime,
  }));
}

function normalizeProgrammingQuestions(programmingQuestions) {
  if (!Array.isArray(programmingQuestions) || programmingQuestions.length === 0) return null;
  return programmingQuestions.map((q) => ({
    id: q.id,
    question: q.problemStatement || q.question,
    solution: q.solution,
    explanation: q.solutionExplanation || q.explanation,
    output: q.output,
    difficulty: q.difficulty,
    marks: q.marks,
    input: q.input,
    constraints: q.constraints,
    logic: q.logic,
  }));
}

function normalizePracticeQuestions(practiceQuestions) {
  if (!Array.isArray(practiceQuestions) || practiceQuestions.length === 0) return null;
  return practiceQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer || q.correctAnswer || "",
    type: q.type || "practice",
    difficulty: q.difficulty,
    marks: q.marks,
  }));
}

function resolveRawChapter(slug) {
  if (!slug) return null;

  const direct = questionBank.getChapterBySlug(slug);
  if (direct) return direct;

  const alias = chapterBankAliases[slug];
  if (alias) return questionBank.getChapterBySlug(alias);

  const classXContent = ICSE_CLASS_X_CONTENT_MAP[slug];
  if (classXContent) return classXContent;

  return null;
}

export function getQuestionBankChapter(slug) {
  const rawChapter = resolveRawChapter(slug);
  if (!rawChapter) return null;

  return {
    mcqs: normalizeMcqs(rawChapter.mcqs),
    outputQuestions: normalizeOutputQuestions(rawChapter.outputQuestions),
    programmingQuestions: normalizeProgrammingQuestions(rawChapter.programmingQuestions),
    practiceQuestions: normalizePracticeQuestions(rawChapter.practice || rawChapter.practiceQuestions),
    practicalTasks: Array.isArray(rawChapter.practicalTasks) ? rawChapter.practicalTasks : null,
  };
}

export default getQuestionBankChapter;
