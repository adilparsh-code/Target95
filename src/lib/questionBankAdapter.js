import { allJavaChapterQuestions, chapterQuestionBankBySlug } from "@/lib/javaChapterQuestionBank";
import { resolveChapterMetadata } from "@/lib/icseSyllabus";
import { ICSE_BOARD_PRACTICE_2026_27 } from "@/app/data/icse-board-practice-2026-27";

/**
 * Canonical adapter for the student-facing generic question bank.
 * Academic question content remains in dedicated data modules; this file
 * only merges and normalizes the sources used by the UI.
 */
const QUESTION_TYPES = [
  "mcq",
  "programming",
  "output",
  "output-tracing",
  "theory",
  "fill-blank",
  "true-false",
  "debugging",
  "case-based",
];

export function normalizeQuestion(question) {
  const questionType = question.questionType || question.type || "theory";
  const meta = resolveChapterMetadata(question.chapter || question.slug || "");

  return {
    id: String(question.id),
    subject: question.subject || meta.subject || "Computer Science",
    board: question.board || meta.board,
    class: question.class || meta.class,
    syllabusUnit: question.syllabusUnit || meta.syllabusUnit,
    chapter: question.chapter || "",
    topic: question.topic || meta.topic || "General",
    difficulty: question.difficulty || "Medium",
    questionType: QUESTION_TYPES.includes(questionType) ? questionType : "theory",
    marks: question.marks ?? 1,
    question: question.question || question.prompt || "",
    options: Array.isArray(question.options) ? question.options : [],
    correctAnswer:
      question.correctAnswer ??
      question.answer ??
      question.modelAnswer ??
      question.javaSolution ??
      "",
    explanation: question.explanation || "",
    codeSnippet: question.codeSnippet || question.javaSolution || "",
    tags: Array.isArray(question.tags) ? question.tags : [],
    estimatedTime: question.estimatedTime ?? 1,
    isBookmarked: Boolean(question.isBookmarked),
    isCompleted: Boolean(question.isCompleted),
    createdAt: question.createdAt || null,
    updatedAt: question.updatedAt || null,
    practiceHref:
      question.chapter && chapterQuestionBankBySlug[question.chapter]
        ? `/Java/${question.chapter}/question/${question.id}`
        : "/question-bank",
  };
}

export const questionBankQuestions = [
  ...allJavaChapterQuestions,
  ...ICSE_BOARD_PRACTICE_2026_27,
].map(normalizeQuestion);

export function getQuestionBankFilters(questions = questionBankQuestions) {
  const unique = (key) =>
    [...new Set(questions.map((question) => question[key]).filter(Boolean))].sort();

  return {
    difficulties: unique("difficulty"),
    chapters: unique("chapter"),
    topics: unique("topic"),
    questionTypes: unique("questionType"),
  };
}

export function filterQuestionBank(questions, filters) {
  const term = filters.search.trim().toLowerCase();

  return questions.filter((question) => {
    const searchable = [
      question.question,
      question.chapter,
      question.topic,
      ...question.tags,
    ]
      .join(" ")
      .toLowerCase();

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "bookmarked" && question.isBookmarked) ||
      (filters.status === "completed" && question.isCompleted) ||
      (filters.status === "unsolved" && !question.isCompleted);

    return (
      (!term || searchable.includes(term)) &&
      (filters.difficulty === "all" ||
        question.difficulty.toLowerCase() === filters.difficulty) &&
      (filters.chapter === "all" || question.chapter === filters.chapter) &&
      (filters.topic === "all" || question.topic === filters.topic) &&
      (filters.questionType === "all" ||
        question.questionType === filters.questionType) &&
      matchesStatus
    );
  });
}

export function getQuestionBankChapter(slug) {
  return questionBankQuestions.filter(q => 
    q.chapterSlug === slug || 
    q.chapter?.toLowerCase().replace(/\s+/g, '-') === slug
  );
}

export default getQuestionBankChapter;