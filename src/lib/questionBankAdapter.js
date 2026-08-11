/**
 * Question Bank Adapter
 * Normalizes the structured question-bank data format into the shape
 * expected by getChapterContent (the `questions` parameter of
 * ChapterContentEngine).
 *
 * The question-bank stores MCQ answers as letters ("B") and options with
 * prefixed labels ("A) Text"). The Content Engine renderers expect numeric
 * answer indices and plain option strings. This adapter bridges that gap
 * generically so any chapter slug can be wired in.
 *
 * Only verified-clean chapter files are statically imported to avoid
 * build-time parse errors from corrupted files in the question-bank
 * directory. Add new entries as chapters are verified.
 */

import introductionChapter from "@/app/data/question-bank/01-introduction";

/**
 * Selectively-imported question-bank chapters.
 * Extend this map as additional chapter files are verified clean.
 */
const chapterBank = {
  introduction: introductionChapter,
  "introduction-to-java": introductionChapter,
};

/**
 * Map a letter answer (e.g. "B") to a zero-based numeric index.
 * Falls back to 0 if the letter cannot be resolved.
 */
const letterToIndex = (letter) => {
  if (typeof letter === "number") return letter;
  if (typeof letter !== "string") return 0;
  const upper = letter.toUpperCase().trim();
  return upper.charCodeAt(0) - 65; // "A" → 0, "B" → 1, …
};

/**
 * Strip the leading option prefix (e.g. "A) ", "(A) ") from a single option
 * string. Returns the cleaned text.
 */
const stripOptionPrefix = (option) => {
  if (typeof option !== "string") return option;
  return option
    .replace(/^[-*]\s+[A-E]\)\s*/, "")
    .replace(/^\([A-E]\)\s*/, "")
    .replace(/^[A-E]\)\s*/, "")
    .trim();
};

/**
 * Normalize MCQ question-bank items into the engine's MCQ shape.
 */
function normalizeMcqs(mcqs) {
  if (!Array.isArray(mcqs) || mcqs.length === 0) return null;
  return mcqs.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options ? q.options.map(stripOptionPrefix) : [],
    answer: letterToIndex(q.correctAnswer),
    explanation: q.explanation || "",
    difficulty: q.difficulty,
    marks: q.marks,
  }));
}

/**
 * Normalize output questions from the question-bank into the engine's
 * output-question shape. The question-bank uses `correctAnswer` for the
 * expected output; the engine expects `answer`.
 */
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

/**
 * Normalize programming questions from the question-bank.
 * The field names already align with what normalizeProgramming expects,
 * so we pass them through with light normalization for safety.
 */
function normalizeProgrammingQuestions(programmingQuestions) {
  if (!Array.isArray(programmingQuestions) || programmingQuestions.length === 0) return null;
  return programmingQuestions.map((q) => ({
    id: q.id,
    question: q.problemStatement,
    solution: q.solution,
    explanation: q.solutionExplanation,
    output: q.output,
    difficulty: q.difficulty,
    marks: q.marks,
    input: q.input,
    constraints: q.constraints,
    logic: q.logic,
  }));
}

/**
 * Get normalized question-bank data for a chapter slug.
 *
 * Returns an object with `mcqs`, `outputQuestions`, and
 * `programmingQuestions` fields suitable for the `questions` parameter of
 * `getChapterContent` in `chapterContent.js`. Returns `null` when the slug
 * has no question-bank entry.
 *
 * @param {string} slug - Chapter slug (e.g. "introduction")
 * @returns {{ mcqs: Array|null, outputQuestions: Array|null, programmingQuestions: Array|null } | null}
 */
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
