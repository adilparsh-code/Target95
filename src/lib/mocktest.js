import questions from "../app/data/questions";
import { getCBSEQuestionConfig } from "../app/data/cbse/question-config-2026-27";

const VALID_CHAPTERS = new Set(["all", "introduction", "variables-data-types", "operators", "if-else", "loops", "methods", "arrays", "strings", "constructor"]);
const VALID_DIFFICULTIES = new Set(["all", "easy", "medium", "hard"]);
const VALID_TYPES = new Set(["mixed", "theory", "mcq", "programming", "output", "assertion-reason", "case-study", "short-answer", "long-answer", "fill-in-the-blanks", "true-false", "match-the-following"]);
const VALID_STATUSES = new Set(["Not Started", "Studying", "Completed"]);
const DEFAULT_BOARD = "ICSE";

export function normalizeMockText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function sanitizeText(value) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim();
}

function getBoardKey(board) {
  return sanitizeText(board || DEFAULT_BOARD).toUpperCase();
}

function isCBSE(board) {
  return getBoardKey(board) === "CBSE";
}

function matchesType(question, safeType) {
  if (safeType === "mixed") return true;
  const questionType = normalizeMockText(question?.type).join("");
  const targetType = normalizeMockText(safeType).join("");
  return questionType === targetType;
}

export function getMockTestQuestionPool({ board = DEFAULT_BOARD, chapter = "all", difficulty = "all", type = "mixed", questions: providedQuestions } = {}) {
  const safeChapter = VALID_CHAPTERS.has(chapter) ? chapter : "all";
  const safeDifficulty = VALID_DIFFICULTIES.has(difficulty) ? difficulty : "all";
  const safeType = VALID_TYPES.has(type) ? type : "mixed";
  const pool = Array.isArray(providedQuestions) ? providedQuestions : questions;
  const boardKey = getBoardKey(board);

  return pool.filter((question) => {
    const questionBoard = getBoardKey(question?.board || question?.boardId || "ICSE");
    const matchesBoard = questionBoard === boardKey;
    const matchesChapter = safeChapter === "all" || question.chapter === safeChapter || question.chapterId === safeChapter;
    const matchesDifficulty =
      safeDifficulty === "all" ||
      normalizeMockText(question.difficulty).join("") === normalizeMockText(safeDifficulty).join("");
    const matchesQuestionType = matchesType(question, safeType);

    return matchesBoard && matchesChapter && matchesDifficulty && matchesQuestionType;
  });
}

export function generateMockTestQuestions({ board = DEFAULT_BOARD, chapter = "all", difficulty = "all", type = "mixed", count, questions: providedQuestions } = {}) {
  let pool = getMockTestQuestionPool({ board, chapter, difficulty, type, questions: providedQuestions });

  if (isCBSE(board) && pool.length === 0 && !providedQuestions) {
    // The CBSE engine is configuration-driven. An empty pool is returned instead of
    // falling back to ICSE content, preventing cross-board contamination.
    return [];
  }

  const safeCount = Math.min(Math.max(Number(count) || 5, 1), pool.length || 1);
  if (pool.length === 0) return [];
  return [...pool].sort(() => Math.random() - 0.5).slice(0, safeCount);
}

function scoreFreeTextAnswer(response, answer, type) {
  const inputTokens = normalizeMockText(response);
  const answerTokens = normalizeMockText(answer);
  if (!inputTokens.length || !answerTokens.length) return false;

  if (type === "programming") {
    const meaningfulAnswerTokens = answerTokens.filter((token) => token.length > 1);
    const meaningfulInputTokens = new Set(inputTokens.filter((token) => token.length > 1));
    if (!meaningfulAnswerTokens.length) return false;
    const matched = meaningfulAnswerTokens.filter((token) => meaningfulInputTokens.has(token)).length;
    return matched / meaningfulAnswerTokens.length >= 0.6;
  }

  const inputSet = new Set(inputTokens);
  const matched = answerTokens.filter((token) => inputSet.has(token)).length;
  const requiredMatches = Math.min(2, answerTokens.length);
  return matched >= requiredMatches && matched / answerTokens.length >= 0.45;
}

export function evaluateMockTestAnswer(question, response) {
  const safeResponse = sanitizeText(response ?? "");
  if (!safeResponse) return false;

  const type = String(question?.type ?? "").toLowerCase();
  if (["mcq", "output", "true-false", "assertion-reason"].includes(type)) {
    return safeResponse.toLowerCase() === sanitizeText(question?.answer || question?.correctAnswer).toLowerCase();
  }

  return scoreFreeTextAnswer(safeResponse, question?.answer || question?.correctAnswer, type);
}

export function calculateMockTestResult(questions, answers, markedForReview, config = {}) {
  let correctCount = 0;
  let wrongCount = 0;
  let reviewedCount = 0;

  const review = questions.map((question) => {
    const response = sanitizeText(answers[question.id] ?? "");
    const isMarkedForReview = Boolean(markedForReview[question.id]);
    const isCorrect = evaluateMockTestAnswer(question, response);

    if (isCorrect) correctCount += 1;
    else wrongCount += 1;
    if (isMarkedForReview) reviewedCount += 1;

    return {
      question,
      response,
      isCorrect,
      isMarkedForReview,
      correctAnswer: sanitizeText(question.correctAnswer || question.answer),
      selectedOption: ["mcq", "output", "true-false", "assertion-reason"].includes(String(question.type).toLowerCase()) ? response : null,
    };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const accuracy = percentage;

  return {
    score: correctCount,
    totalQuestions,
    correctCount,
    wrongCount,
    reviewedCount,
    percentage,
    accuracy,
    board: getBoardKey(config.board || DEFAULT_BOARD),
    subjectCode: config.subjectCode || null,
    review,
  };
}

export function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function getMockTestTitle(config) {
  const safeConfig = config ?? {};
  const boardLabel = safeConfig.board ? `${sanitizeText(safeConfig.board)} • ` : "";
  const subjectLabel = safeConfig.subjectCode ? `Code ${sanitizeText(safeConfig.subjectCode)} • ` : "";
  const chapterLabel = safeConfig.chapter === "all" ? "All Chapters" : sanitizeText(safeConfig.chapter || "All Chapters");
  const difficultyLabel = safeConfig.difficulty === "all" ? "Mixed Difficulty" : sanitizeText(safeConfig.difficulty || "Mixed Difficulty");
  const typeLabel = safeConfig.type === "mixed" ? "Mixed Types" : sanitizeText(safeConfig.type || "Mixed Types");
  return `${boardLabel}${subjectLabel}${chapterLabel} • ${difficultyLabel} • ${typeLabel}`;
}

export function sanitizeStudyStatus(value) {
  const safeValue = sanitizeText(value);
  return VALID_STATUSES.has(safeValue) ? safeValue : "Not Started";
}

const HISTORY_KEY = "target95-mock-test-results";

export function saveMockTestResult(result) {
  try {
    const stored = getMockTestHistory();
    stored.unshift(result);
    if (stored.length > 20) stored.length = 20;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(stored));
  } catch {}
}

export function getMockTestHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearMockTestHistory() {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

const DRAFT_PREFIX = "target95-mock-test-draft";

export function getMockTestDraftKey(config = {}) {
  const values = [config.board, config.subjectCode, config.category, config.chapter, config.difficulty, config.type, config.count, config.mode, config.duration]
    .map((value) => sanitizeText(value || "all").toLowerCase());
  return `${DRAFT_PREFIX}:${values.join(":")}`;
}

export function saveMockTestDraft(config, draft) {
  try { localStorage.setItem(getMockTestDraftKey(config), JSON.stringify({ ...draft, savedAt: new Date().toISOString() })); } catch {}
}

export function getMockTestDraft(config) {
  try {
    const draft = localStorage.getItem(getMockTestDraftKey(config));
    return draft ? JSON.parse(draft) : null;
  } catch { return null; }
}

export function clearMockTestDraft(config) {
  try { localStorage.removeItem(getMockTestDraftKey(config)); } catch {}
}

export function getTopicPerformance(review = []) {
  const topics = new Map();
  review.forEach((item) => {
    const topic = sanitizeText(item?.question?.topic || item?.question?.chapter || item?.question?.chapterId || "General concepts");
    const current = topics.get(topic) || { topic, correct: 0, total: 0 };
    current.total += 1;
    if (item.isCorrect) current.correct += 1;
    topics.set(topic, current);
  });
  return Array.from(topics.values())
    .map((item) => ({ ...item, accuracy: Math.round((item.correct / item.total) * 100) }))
    .sort((first, second) => first.accuracy - second.accuracy || second.total - first.total);
}

export const CATEGORIES = [
  { id: "icse-class-9", label: "ICSE Class 9", icon: "📘" },
  { id: "icse-class-10", label: "ICSE Class 10", icon: "📗" },
  { id: "isc-class-11", label: "ISC Class 11", icon: "📙" },
  { id: "isc-class-12", label: "ISC Class 12", icon: "📕" },
  { id: "cbse-class-9", label: "CBSE Class 9", icon: "📘" },
  { id: "cbse-class-10", label: "CBSE Class 10", icon: "📗" },
  { id: "cbse-class-11", label: "CBSE Class 11", icon: "📙" },
  { id: "cbse-class-12", label: "CBSE Class 12", icon: "📕" },
];

export const DIFFICULTIES = [
  { id: "easy", label: "Easy", icon: "🟢" },
  { id: "medium", label: "Medium", icon: "🟡" },
  { id: "hard", label: "Hard", icon: "🔴" },
];

export const QUESTION_TYPES = [
  { id: "mixed", label: "Mixed", icon: "📋" },
  { id: "mcq", label: "MCQ", icon: "💡" },
  { id: "theory", label: "Theory", icon: "📝" },
  { id: "programming", label: "Programming", icon: "💻" },
  { id: "output", label: "Output", icon: "🔍" },
  { id: "assertion-reason", label: "Assertion-Reason", icon: "🧠" },
  { id: "case-study", label: "Case Study", icon: "📚" },
  { id: "short-answer", label: "Short Answer", icon: "✍️" },
  { id: "long-answer", label: "Long Answer", icon: "📝" },
  { id: "fill-in-the-blanks", label: "Fill in the Blanks", icon: "🔤" },
  { id: "true-false", label: "True / False", icon: "✅" },
  { id: "match-the-following", label: "Match the Following", icon: "🔗" },
];

export const QUESTION_COUNTS = [5, 10, 15, 20];

export { getCBSEQuestionConfig };