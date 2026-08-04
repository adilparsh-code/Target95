import { javaQuestions } from "@/app/data/javaCurriculum";

const QUESTION_TYPES = ["mcq", "programming", "output", "theory", "fill-blank", "true-false"];

export function normalizeQuestion(question) {
  const questionType = question.questionType || question.type || "theory";
  return {
    id: String(question.id),
    subject: question.subject || "Computer Science",
    chapter: question.chapter || "",
    topic: question.topic || "General",
    difficulty: question.difficulty || "Medium",
    questionType: QUESTION_TYPES.includes(questionType) ? questionType : "theory",
    marks: question.marks ?? 1,
    question: question.question || question.prompt || "",
    options: Array.isArray(question.options) ? question.options : [],
    correctAnswer: question.correctAnswer ?? question.answer ?? question.modelAnswer ?? question.javaSolution ?? "",
    explanation: question.explanation || "",
    codeSnippet: question.codeSnippet || question.javaSolution || "",
    tags: Array.isArray(question.tags) ? question.tags : [],
    estimatedTime: question.estimatedTime ?? 1,
    isBookmarked: Boolean(question.isBookmarked),
    isCompleted: Boolean(question.isCompleted),
    createdAt: question.createdAt || null,
    updatedAt: question.updatedAt || null,
    practiceHref: question.chapter ? `/Java/${question.chapter}/question/${question.id}` : "/practice/setup",
  };
}

export const questionBankQuestions = javaQuestions.map(normalizeQuestion);

export function getQuestionBankFilters(questions = questionBankQuestions) {
  const unique = (key) => [...new Set(questions.map((question) => question[key]).filter(Boolean))].sort();
  return { difficulties: unique("difficulty"), chapters: unique("chapter"), topics: unique("topic"), questionTypes: unique("questionType") };
}

export function filterQuestionBank(questions, filters) {
  const term = filters.search.trim().toLowerCase();
  return questions.filter((question) => {
    const searchable = [question.question, question.chapter, question.topic, ...question.tags].join(" ").toLowerCase();
    const matchesStatus = filters.status === "all" || (filters.status === "bookmarked" && question.isBookmarked) || (filters.status === "completed" && question.isCompleted) || (filters.status === "unsolved" && !question.isCompleted);
    return (!term || searchable.includes(term)) &&
      (filters.difficulty === "all" || question.difficulty.toLowerCase() === filters.difficulty) &&
      (filters.chapter === "all" || question.chapter === filters.chapter) &&
      (filters.topic === "all" || question.topic === filters.topic) &&
      (filters.questionType === "all" || question.questionType === filters.questionType) &&
      matchesStatus;
  });
}
