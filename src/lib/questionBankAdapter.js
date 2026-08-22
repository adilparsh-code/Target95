/**
 * Question Bank Adapter
 * Normalizes structured question-bank data for the study content engine.
 */

import introductionChapter from "@/app/data/question-bank/01-introduction";
import variablesDataTypesChapter from "@/app/data/question-bank/02-variables-data-types";
import operatorsChapter from "@/app/data/question-bank/03-operators";
import ifElseChapter from "@/app/data/question-bank/04-if-else";
import loopsChapter from "@/app/data/question-bank/05-loops";
import methodsChapter from "@/app/data/question-bank/06-methods";
import arraysChapter from "@/app/data/question-bank/07-arrays";
import systemOfNumerationChapter from "@/app/data/question-bank/08-system-of-numeration";

const chapterBank = {
  introduction: introductionChapter,
  "introduction-to-java": introductionChapter,
  "variables-data-types": variablesDataTypesChapter,
  "data-types-variables": variablesDataTypesChapter,
  operators: operatorsChapter,
  "if-else": ifElseChapter,
  "conditional-statements": ifElseChapter,
  loops: loopsChapter,
  "iterative-statements": loopsChapter,
  methods: methodsChapter,
  arrays: arraysChapter,
  "system-of-numeration": systemOfNumerationChapter,
  "xi-system-of-numeration": systemOfNumerationChapter,
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

export function getQuestionBankChapter(slug) {
  if (!slug) return null;
  const rawChapter = chapterBank[slug];
  if (!rawChapter) return null;

  return {
    mcqs: normalizeMcqs(rawChapter.mcqs),
    outputQuestions: normalizeOutputQuestions(rawChapter.outputQuestions),
    programmingQuestions: normalizeProgrammingQuestions(rawChapter.programmingQuestions),
  };
}

export default getQuestionBankChapter;
