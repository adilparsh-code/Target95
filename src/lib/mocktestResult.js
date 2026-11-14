/**
 * Builds the result object the result page renders.
 *
 * Server-graded attempts: every score comes from the server response; this module only joins
 * it with the question text the student already saw and the post-grading reveal (correct
 * answers and explanations). Nothing is recomputed in the browser.
 * Local (unsaved) attempts: scored in the browser with the same evaluator, and marked
 * `source: "local"` so the result page can say the result was not saved.
 */

import { evaluateMockTestAnswer } from "./mocktest.js";

export function buildServerResult({ serverResult, reveal = [], questions, bookmarkedCount = 0 }) {
  const questionsById = new Map(questions.map((question) => [String(question.id), question]));
  const revealById = new Map(reveal.map((item) => [String(item.questionId), item]));
  const review = (serverResult.review || []).map((item) => {
    const revealed = revealById.get(String(item.questionId));
    return {
      question: questionsById.get(String(item.questionId)) || { id: item.questionId, question: "", type: "question" },
      userAnswer: item.userAnswer,
      correctAnswer: revealed?.correctAnswer ?? "",
      isCorrect: item.isCorrect,
      explanation: revealed?.explanation || "",
      marks: item.marks,
    };
  });
  return { ...serverResult, source: "server-graded", bookmarkedCount, review };
}

export function buildLocalResult({ questions, answers, config, bookmarkedCount = 0, timeTaken, userId = null, now = new Date() }) {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  const review = questions.map((question) => {
    const userAnswer = answers[question.id] || "";
    const answered = Boolean(userAnswer.trim());
    const isCorrect = answered && evaluateMockTestAnswer(question, userAnswer);
    if (!answered) unanswered += 1;
    else if (isCorrect) correct += 1;
    else wrong += 1;
    return { question, userAnswer: userAnswer || "No answer", correctAnswer: question.answer, isCorrect, explanation: question.explanation, marks: question.marks || 1 };
  });
  const totalQuestions = questions.length;
  const attempted = totalQuestions - unanswered;
  const iso = now.toISOString();
  return {
    id: `${now.getTime().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    userId,
    completedAt: iso,
    date: iso,
    ...config,
    source: "local",
    score: correct,
    totalQuestions,
    correctAnswers: correct,
    correctCount: correct,
    wrongCount: wrong,
    unansweredCount: unanswered,
    percentage: totalQuestions ? Math.round((correct / totalQuestions) * 100) : 0,
    accuracy: attempted ? Math.round((correct / attempted) * 100) : 0,
    timeTaken,
    totalTime: config.duration * 60,
    bookmarkedCount,
    review,
  };
}
