import questionBank from "@/app/data/question-bank";
import { resolveChapterMetadata } from "@/lib/icseSyllabus";
import { resolveBankMcqAnswer } from "@/lib/study/mcqAnswers.mjs";

/**
 * Canonical Java chapter question bank.
 *
 * The detailed, academically-authored question files live in
 * src/app/data/question-bank. This bridge normalises every real question
 * category into the shape consumed by the student-facing renderers and
 * maps the broad bank chapters to every supported Java route alias.
 */

// broad question-bank slug -> supported Java route slugs
// (the key MUST equal the bank chapter's own slug; the values are the
// routable chapter slugs the questions should surface under)
const SLUG_MAP = {
  introduction: ["introduction-to-java", "introduction"],
  "variables-data-types": ["variables-data-types", "data-types-variables"],
  operators: ["operators"],
  "input-output": ["input-in-java"],
  "if-else": ["if-else", "if", "nested-if", "switch"],
  loops: ["loops", "for-loop", "while-loop", "do-while-loop"],
  methods: ["methods", "custom-methods"],
  arrays: ["arrays", "arrays-1d", "arrays-2d"],
  strings: ["strings", "string-handling"],
  "oop-concepts": ["class-as-basis-of-computation", "classes-objects"],
  encapsulation: ["encapsulation"],
  // The bank chapter slug is "constructor" (not "constructors"); keep both
  // routable aliases so the authored constructor questions are reachable.
  constructor: ["constructor", "constructors"],
  inheritance: ["inheritance"],
  // Authored Class X chapters that have no canonical javaCurriculum twin but do
  // have a real study chapter route, so their questions and chapter pages stay
  // reachable instead of being silently dropped.
  polymorphism: ["polymorphism"],
  "library-classes": ["library-classes"],
  recursion: ["recursion"],
  "searching-sorting": ["searching-sorting"],
  "exception-handling": ["exception-handling"],
  "packages-access-modifiers": ["packages-access-modifiers"],
  "disruptive-technologies": ["disruptive-technologies"],
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

function stripOptionPrefix(option) {
  return String(option).replace(/^[A-Ea-e][).:]\s*/, "").trim();
}

// MCQs whose answer key cannot be resolved. They are withheld from every
// student-facing list and reported here (and by `npm run validate:mcqs`).
export const invalidBankQuestions = [];

export function normalizeRealQuestion(raw, type, targetSlug, onInvalid) {
  const meta = resolveChapterMetadata(targetSlug);
  const isMcq = type === "mcq";
  const options = Array.isArray(raw.options)
    ? raw.options.map(stripOptionPrefix)
    : [];

  let answerIndex = null;
  if (isMcq) {
    const resolved = resolveBankMcqAnswer(raw, options.length);
    if (!resolved.valid) {
      // Never substitute option A for an unresolvable key: drop and report.
      if (typeof onInvalid === "function") onInvalid({ id: String(raw.id), reason: resolved.reason });
      return null;
    }
    answerIndex = resolved.index;
  }

  // Programming/other authored categories use different field names than the
  // MCQ/QA categories; fall back across all of them so no item is blanked.
  const questionText = raw.question || raw.problemStatement || raw.prompt || raw.text || "";
  const answerValue = raw.correctAnswer ?? raw.answer ?? raw.sampleAnswer ?? raw.modelAnswer ?? raw.solution ?? raw.logic ?? raw.expectedOutput ?? "";
  const correctText =
    isMcq && answerIndex != null && options[answerIndex]
      ? options[answerIndex]
      : answerValue;
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
    answer: isMcq ? answerIndex : answerValue,
    correctAnswer: isMcq ? correctText : answerValue,
    modelAnswer: isTheoryLike ? answerValue : undefined,
    explanation: raw.explanation || raw.logic || "",
    hint: raw.hint || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    codeSnippet: raw.code || (type === "programming" ? (raw.solution || "") : ""),
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
        const question = normalizeRealQuestion(item, TYPE_BY_CATEGORY[category], targetSlugs[0], (problem) =>
          invalidBankQuestions.push({ ...problem, bankSlug, category })
        );
        if (question) normalized.push(question);
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