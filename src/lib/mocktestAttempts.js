/**
 * Server-trusted mock test attempts and grading.
 *
 * Scores are never accepted from the client. The server picks the questions
 * for an attempt, stores their ids, and later grades the student's raw answers
 * against the bundled question bank. Every score field in a saved result is
 * computed here.
 *
 * This module is pure (no Firebase, no browser APIs) so the same pool logic is
 * shared by the mock test player and the API routes, and it can be unit tested
 * with `node --test`.
 */

import mockTestQuestions from "../app/data/mock-test/mockTestQuestions.js";
import { getCBSEMockQuestions } from "../app/data/cbse/mock-tests-2026-27.js";
import { evaluateMockTestAnswer, sanitizeText } from "./mocktest.js";
import { canonicalIdFor } from "../content/identity.mjs";

export const MAX_ATTEMPT_QUESTIONS = 100;
export const MAX_ATTEMPT_DURATION_MINUTES = 300;
export const MAX_ANSWER_CHARS = 5000;
/** Grace period for network latency when checking the time limit. */
export const SUBMIT_GRACE_SECONDS = 120;

/**
 * Content-engine questions enter an attempt under a namespaced id so they can never
 * collide with the 28 legacy numeric ids (or CBSE ids). Legacy ids are never prefixed.
 */
export const CONTENT_ID_PREFIX = "ce:";
export const isContentQuestionId = (id) => String(id).startsWith(CONTENT_ID_PREFIX);

const VALID_BOARDS = new Set(["ICSE", "ISC", "CBSE"]);
const VALID_MODES = new Set(["exam", "practice"]);
const SAFE_SLUG = /^[a-z0-9][a-z0-9-]{0,63}$/i;

export function normalizeCBSEQuestion(question) {
  if (!question || typeof question !== "object") return null;
  const questionText = String(question.question || "").trim();
  const correctAnswer = question.correctAnswer ?? question.answer;
  if (!questionText || correctAnswer === null || correctAnswer === undefined) return null;
  const rawType = question.questionType || question.type || "mcq";
  const type = rawType === "output-tracing" ? "output" : rawType === "case-based" ? "case-study" : rawType;
  return {
    ...question,
    category: `cbse-class-${question.classNumber}`,
    type,
    chapter: question.topicId || question.chapter || "all-topics",
    answer: correctAnswer,
    correctAnswer,
    difficulty: question.difficulty || "medium",
    options: Array.isArray(question.options) ? question.options : [],
  };
}

function slugOr(value, fallback) {
  const raw = String(value ?? "").trim();
  return SAFE_SLUG.test(raw) ? raw : fallback;
}

function clampInt(value, min, max, fallback) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

/**
 * Validate and normalise a mock test configuration from an untrusted source.
 * Mirrors the defaults the player derives from its URL parameters.
 */
export function normalizeAttemptConfig(raw = {}) {
  const category = slugOr(raw.category, "icse-class-10").toLowerCase();
  const inferredBoard = category.startsWith("cbse-") ? "CBSE" : category.startsWith("isc-") ? "ISC" : "ICSE";
  const boardInput = String(raw.board || inferredBoard).toUpperCase();
  const board = VALID_BOARDS.has(boardInput) ? boardInput : inferredBoard;
  const classFromCategory = Number(category.split("-").pop());
  const classNumber = clampInt(raw.classNumber ?? classFromCategory, 1, 12, 10);
  const subjectCode = /^[0-9a-z-]{0,16}$/i.test(String(raw.subjectCode || "")) ? String(raw.subjectCode || "") : "";
  const subject = String(raw.subject || "").slice(0, 120);
  const difficulty = slugOr(raw.difficulty, "medium").toLowerCase();
  const type = slugOr(raw.type, "mixed").toLowerCase();
  const chapter = slugOr(raw.chapter, "all");
  const modeInput = String(raw.mode || "exam").toLowerCase();
  const mode = VALID_MODES.has(modeInput) ? modeInput : "exam";
  const count = clampInt(raw.count, 1, MAX_ATTEMPT_QUESTIONS, 10);
  const duration = clampInt(raw.duration, 1, MAX_ATTEMPT_DURATION_MINUTES, 30);
  return { board, category, classNumber, subjectCode, subject, difficulty, type, chapter, mode, count, duration };
}

/**
 * A legacy question matches a chapter filter when the slugs are equal or name the same
 * canonical chapter ("arrays" and "arrays-1d"). Strictly wider than the old equality test,
 * so every filter that matched before still matches the same questions.
 */
function chapterMatches(questionChapter, selectedChapter) {
  if (questionChapter === selectedChapter) return true;
  const canonical = canonicalIdFor(selectedChapter);
  return Boolean(canonical) && canonicalIdFor(questionChapter) === canonical;
}

/** The filtered question pool for a configuration (same rules as the player). */
export function buildMockTestPool(config) {
  const { board, classNumber, subjectCode, category, difficulty, type, chapter } = config;
  let pool;
  if (board === "CBSE") {
    pool = subjectCode
      ? getCBSEMockQuestions(classNumber, subjectCode, 1000).map(normalizeCBSEQuestion).filter(Boolean)
      : [];
    if (difficulty !== "all") pool = pool.filter((q) => q.difficulty === difficulty);
    if (type !== "mixed") pool = pool.filter((q) => q.type === type);
    if (chapter !== "all" && chapter !== "all-topics") pool = pool.filter((q) => q.chapter === chapter);
  } else {
    pool = mockTestQuestions.filter(
      (q) =>
        q.category === category &&
        (difficulty === "all" || q.difficulty === difficulty) &&
        (type === "mixed" || q.type === type) &&
        (chapter === "all" || chapterMatches(q.chapter, chapter))
    );
  }
  return pool;
}

function chapterLabel(slug) {
  return String(slug).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/**
 * Chapters that actually have questions for a non-CBSE category, with counts.
 * The setup screen uses this so students can only pick chapters that have content.
 */
export function getMockTestChapterOptions(category) {
  const counts = new Map();
  for (const question of mockTestQuestions) {
    if (question.category !== category || !question.chapter) continue;
    counts.set(question.chapter, (counts.get(question.chapter) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([id, count]) => ({ id, label: chapterLabel(id), count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Pick the question ids for a new attempt. `random` is injectable for tests.
 * `extraPool` adds server-built content-engine questions (already namespaced);
 * without it the behaviour is exactly the legacy one.
 */
export function selectAttemptQuestionIds(config, random = Math.random, { extraPool = [] } = {}) {
  const pool = extraPool.length ? [...buildMockTestPool(config), ...extraPool] : buildMockTestPool(config);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(config.count, shuffled.length)).map((q) => String(q.id));
}

/**
 * Keep only string answers for questions that belong to the attempt.
 * Anything else the client sends (scores, marks, ids of other questions,
 * identity or role fields) is dropped.
 */
export function sanitizeAnswers(questionIds, rawAnswers) {
  const allowed = new Set(questionIds.map(String));
  const answers = {};
  if (!rawAnswers || typeof rawAnswers !== "object" || Array.isArray(rawAnswers)) return answers;
  for (const [id, value] of Object.entries(rawAnswers)) {
    if (!allowed.has(String(id))) continue;
    if (typeof value !== "string") continue;
    answers[String(id)] = value.slice(0, MAX_ANSWER_CHARS);
  }
  return answers;
}

const legacyQuestionsById = new Map(mockTestQuestions.map((question) => [String(question.id), question]));

/**
 * Fields a student may see before submitting. Everything else (answer, answerIndex,
 * correctAnswer, explanation, hint, tags) stays on the server. Used for every
 * pre-submission payload, legacy and content-engine alike.
 */
export function toClientQuestion(question) {
  return {
    id: String(question.id),
    type: String(question.type || "mcq"),
    difficulty: String(question.difficulty || ""),
    question: String(question.question || question.prompt || ""),
    options: Array.isArray(question.options) ? question.options.map(String) : [],
    marks: Number(question.marks) > 0 ? Number(question.marks) : 1,
    topic: String(question.topic || ""),
    chapter: String(question.chapter || ""),
  };
}

/** Post-submission reveal: what the student sees after the server has graded. */
export function buildReveal(questions) {
  return questions.map((question) => ({
    questionId: String(question.id),
    correctAnswer: String(question.answer ?? question.correctAnswer ?? ""),
    explanation: String(question.explanation || ""),
  }));
}

/**
 * Resolve the stored question ids of an attempt to full (server-side) questions.
 * Legacy ids resolve directly from the bundled bank, falling back to the config pool
 * (CBSE). Namespaced ids resolve through `resolveContentQuestion`, which only the
 * server supplies. Returns undefined entries for anything that cannot be resolved.
 */
export function resolveAttemptQuestions(config, questionIds, { resolveContentQuestion } = {}) {
  let configPool = null;
  return questionIds.map((id) => {
    if (isContentQuestionId(id)) return resolveContentQuestion ? resolveContentQuestion(id) : undefined;
    const legacy = legacyQuestionsById.get(id);
    if (legacy) return legacy;
    configPool ||= new Map(buildMockTestPool(config).map((q) => [String(q.id), q]));
    return configPool.get(id);
  });
}

/**
 * Grade an attempt. `attempt` must be the server-stored record
 * ({ config, questionIds, startedAtMs }); answers are the raw client answers.
 * Throws when the stored questions no longer resolve, so a result is never
 * saved against an incomplete question set. Returns `reveal` separately from the
 * stored fields: it is sent to the student after grading and is never persisted.
 */
export function gradeAttempt(attempt, rawAnswers, { nowMs = Date.now(), resolveContentQuestion } = {}) {
  const config = normalizeAttemptConfig(attempt?.config);
  const questionIds = Array.isArray(attempt?.questionIds) ? attempt.questionIds.map(String) : [];
  if (!questionIds.length || questionIds.length > MAX_ATTEMPT_QUESTIONS || new Set(questionIds).size !== questionIds.length) {
    throw new Error("Invalid attempt question set.");
  }

  const questions = resolveAttemptQuestions(config, questionIds, { resolveContentQuestion });
  if (questions.some((q) => !q)) throw new Error("Attempt questions could not be resolved.");

  const answers = sanitizeAnswers(questionIds, rawAnswers);
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  let marksObtained = 0;
  let totalMarks = 0;

  const review = questions.map((q, index) => {
    const id = questionIds[index];
    const userAnswer = answers[id] || "";
    const answered = Boolean(sanitizeText(userAnswer));
    const isCorrect = answered && evaluateMockTestAnswer(q, userAnswer);
    const marks = Number(q.marks) > 0 ? Number(q.marks) : 1;
    totalMarks += marks;
    if (!answered) unanswered += 1;
    else if (isCorrect) {
      correct += 1;
      marksObtained += marks;
    } else wrong += 1;
    const entry = { questionId: id, userAnswer: userAnswer || "No answer", isCorrect, marks };
    return isContentQuestionId(id) ? { ...entry, source: "content-engine" } : entry;
  });

  const totalQuestions = questions.length;
  const attempted = totalQuestions - unanswered;
  const startedAtMs = Number(attempt?.startedAtMs) || nowMs;
  const totalTime = config.duration * 60;
  const elapsed = Math.max(0, Math.round((nowMs - startedAtMs) / 1000));

  return {
    config,
    review,
    score: correct,
    correctAnswers: correct,
    correctCount: correct,
    wrongCount: wrong,
    unansweredCount: unanswered,
    totalQuestions,
    marksObtained,
    totalMarks,
    percentage: totalQuestions ? Math.round((correct / totalQuestions) * 100) : 0,
    accuracy: attempted ? Math.round((correct / attempted) * 100) : 0,
    timeTaken: Math.min(elapsed, totalTime),
    totalTime,
    // Late submissions are graded and flagged, never rejected: the flag is for display and
    // analytics. The recorded time is capped at the test duration.
    lateSubmission: elapsed > totalTime + SUBMIT_GRACE_SECONDS,
    reveal: buildReveal(questions),
  };
}

/**
 * Build the Firestore `results` document. `uid` comes from the verified
 * session only; nothing identity-related is read from the request.
 */
export function buildResultDocument({ uid, attemptId, graded, nowIso = new Date().toISOString() }) {
  if (!uid || typeof uid !== "string") throw new Error("A verified user id is required.");
  // `reveal` carries answer keys: it goes to the student, never into the stored result.
  const { config, reveal: _reveal, ...scores } = graded;
  return {
    userId: uid,
    attemptId: String(attemptId),
    testId: String(attemptId),
    source: "server-graded",
    board: config.board,
    classNumber: config.classNumber,
    subjectCode: config.subjectCode,
    subject: config.subject,
    category: config.category,
    difficulty: config.difficulty,
    type: config.type,
    chapter: config.chapter,
    mode: config.mode,
    ...scores,
    completedAt: nowIso,
    date: nowIso,
  };
}
