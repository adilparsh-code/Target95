import questionBank from "@/app/data/question-bank";
import { resolveChapterMetadata } from "@/lib/icseSyllabus";

/**
 * Canonical Java chapter question bank.
 *
 * The detailed, academically-authored question files live in
 * src/app/data/question-bank. This bridge normalises every real question
 * category into the shape consumed by the student-facing renderers and
 * maps the broad bank chapters to every supported Java route alias.
 */

// broad question-bank slug -> supported Java route slugs
const SLUG_MAP = {
  introduction: ["introduction-to-java", "introduction"],
  "variables-data-types": ["variables-data-types", "data-types-variables"],
  operators: ["operators"],
  "input-output": ["input-in-java"],
  "if-else": ["conditionals", "if", "if-else", "nested-if", "switch"],
  loops: ["loops", "for-loop", "while-loop", "do-while-loop"],
  methods: ["methods", "custom-methods"],
  arrays: ["arrays", "arrays-1d", "arrays-2d"],
  strings: ["strings", "string-handling"],
  "oop-concepts": ["class-as-basis-of-computation", "classes-objects"],
  encapsulation: ["encapsulation"],
  constructors: ["constructor", "constructors"],
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

function letterToIndex(letter) {
  const n = String(letter || "").trim().toUpperCase().charCodeAt(0) - 65;
  return Number.isFinite(n) && n >= 0 && n <= 25 ? n : null;
}

function stripOptionPrefix(option) {
  return String(option).replace(/^[A-Ea-e][).:]\s*/, "").trim();
}

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
  const answerValue = raw.correctAnswer ?? raw.answer ?? raw.sampleAnswer ?? "";
  const isTheoryLike = type === "theory" || type === "case-based" || type === "debugging";

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
        normalized.push(normalizeRealQuestion(item, TYPE_BY_CATEGORY[category], targetSlugs[0]));
      }
    }

    if (normalized.length === 0) continue;

    for (const targetSlug of targetSlugs) {
      bySlug[targetSlug] = normalized.map((q) => ({
        ...q,
        chapter: targetSlug,
      }));
    }
  }

  return bySlug;
}

export const chapterQuestionBankBySlug = buildChapterQuestionBank();

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