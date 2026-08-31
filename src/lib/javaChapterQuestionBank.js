import questionBank from "@/app/data/question-bank";
import { resolveChapterMetadata } from "@/lib/icseSyllabus";

/**
 * Canonical Java chapter question bank.
 *
 * The detailed, academically-authored question files live in
 * `src/app/data/question-bank/` (MCQs, output/tracing, debugging,
 * programming, case-based, true/false, fill-blanks, assertion-reason and
 * viva questions organised by broad chapter). The student chapter flow is
 * driven by the granular java chapter slugs defined in
 * `src/app/data/javaCurriculum` (for-loop, while-loop, if-else, ...).
 *
 * This module is the bridge between the two: it normalises every real
 * question category into the shape the student-facing renderers already
 * expect (`type`, `question`, `options`, `answer`, `modelAnswer`) and
 * attaches each real chapter to the java chapter slug(s) it covers.
 *
 * It REPLACES the generated placeholder questions for every java chapter
 * that has real content, so students never see filler questions.
 */

// real-bank chapter slug (from the question-bank index) -> java chapter slug(s)
const SLUG_MAP = {
  introduction: ["introduction-to-java"],
  "variables-data-types": ["data-types-variables"],
  operators: ["operators"],
  "input-output": ["input-in-java"],
  "if-else": ["if", "if-else", "nested-if", "switch"],
  loops: ["for-loop", "while-loop", "do-while-loop"],
  methods: ["methods"],
  arrays: ["arrays-1d", "arrays-2d"],
  strings: ["strings"],
  "oop-concepts": ["classes-objects"],
  encapsulation: ["encapsulation"],
  constructors: ["constructors"],
  inheritance: ["inheritance"],
};

const TYPE_BY_CATEGORY = {
  mcqs: "mcq",
  assertionReasons: "mcq",
  trueFalse: "true-false",
  fillBlanks: "fill-blank",
  outputQuestions: "output",
  errorFinding: "debugging",
  programmingQuestions: "programming",
  debuggingQuestions: "debugging",
  caseBasedQuestions: "case-based",
  vivaQuestions: "theory",
};

/**
 * Convert an option-prefix letter ("B") into a zero-based index.
 * @param {string} letter
 * @returns {number|null}
 */
function letterToIndex(letter) {
  const n =
    String(letter || "").trim().toUpperCase().charCodeAt(0) - 65;
  return Number.isFinite(n) && n >= 0 && n <= 25 ? n : null;
}

/** Strip a leading "A) ", "B. " style prefix from an MCQ option. */
function stripOptionPrefix(option) {
  return String(option).replace(/^[A-Ea-e][).:]\s*/, "").trim();
}

/**
 * Normalise one raw question-bank item into the field shape the existing
 * student-facing renderers consume.
 * @param {object} raw
 * @param {string} type
 * @param {string} targetSlug
 */
function normalizeRealQuestion(raw, type, targetSlug) {
  const meta = resolveChapterMetadata(targetSlug);

  const isMcq = type === "mcq";
  const options = Array.isArray(raw.options)
    ? raw.options.map(stripOptionPrefix)
    : [];

  let answerIndex = null;
  if (isMcq) {
    answerIndex = raw.correctAnswer
      ? letterToIndex(raw.correctAnswer)
      : typeof raw.answer === "number"
        ? raw.answer
        : null;
  }

  const questionText = raw.question || "";

  const correctText =
    isMcq && answerIndex != null && options[answerIndex]
      ? options[answerIndex]
      : (raw.correctAnswer ?? raw.answer ?? raw.sampleAnswer ?? "");

  const answerValue =
    raw.correctAnswer ?? raw.answer ?? raw.sampleAnswer ?? "";

  const isTheoryLike =
    type === "theory" || type === "case-based" || type === "debugging";

  return {
    id: String(raw.id),
    subject: meta.subject,
    board: meta.board,
    class: meta.class,
    syllabusUnit: meta.syllabusUnit,
    chapter: targetSlug,
    chapterTitle: raw.chapter || "",
    topic: raw.topic || meta.topic || "General",
    difficulty: raw.difficulty || meta.difficulty || "Medium",
    type,
    marks: raw.marks ?? 1,
    estimatedTime: raw.estimatedTime ?? 1,
    question: questionText,
    prompt: questionText,
    options: isMcq ? options : [],
    answer: isMcq ? (answerIndex ?? 0) : answerValue,
    correctAnswer: isMcq ? correctText : answerValue,
    modelAnswer: isTheoryLike ? answerValue : undefined,
    explanation: raw.explanation || raw.solution || "",
    hint: raw.hint || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    codeSnippet: raw.code || "",
  };
}

/** Flat list of every (normalised) real question, in a stable order. */
function buildChapterQuestionBank() {
  const bySlug = {};

  for (const [bankSlug, targetSlugs] of Object.entries(SLUG_MAP)) {
    const chapter = questionBank.getChapterBySlug
      ? questionBank.getChapterBySlug(bankSlug)
      : questionBank.chapters.find((ch) => ch.slug === bankSlug);
    if (!chapter) continue;

    const normalized = [];
    for (const category of Object.keys(TYPE_BY_CATEGORY)) {
      const items = chapter[category];
      if (!Array.isArray(items)) continue;
      for (const item of items) {
        normalized.push(
          normalizeRealQuestion(item, TYPE_BY_CATEGORY[category], targetSlugs[0])
        );
      }
    }

    if (normalized.length === 0) continue;

    for (const targetSlug of targetSlugs) {
      // Each granular chapter gets the full real set. IDs are unique within a
      // chapter (the real bank uses per-chapter prefixes like CH05-...).
      bySlug[targetSlug] = normalized.map((q) => ({
        ...q,
        chapter: targetSlug,
      }));
    }
  }

  return bySlug;
}

export const chapterQuestionBankBySlug = buildChapterQuestionBank();

/** Flat canonical list of all real java questions (used by the bank page). */
export const allJavaChapterQuestions = (() => {
  const seen = new Set();
  const out = [];
  for (const question of Object.values(chapterQuestionBankBySlug).flat()) {
    if (seen.has(question.id)) continue;
    seen.add(question.id);
    out.push(question);
  }
  return out;
})();