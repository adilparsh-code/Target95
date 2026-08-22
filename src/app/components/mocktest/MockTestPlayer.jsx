"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculateMockTestResult, formatTime, sanitizeText, getMockTestTitle } from "../../../lib/mocktest";

function getInitialTimeLeft(questionCount, config = {}) {
  const configuredSeconds = Number(config.durationSeconds);
  if (Number.isFinite(configuredSeconds) && configuredSeconds > 0) return configuredSeconds;
  const configuredMinutes = Number(config.durationMinutes);
  if (Number.isFinite(configuredMinutes) && configuredMinutes > 0) return configuredMinutes * 60;
  return questionCount > 0 ? questionCount * 45 : 600;
}

function getOptionValues(question) {
  if (Array.isArray(question?.options)) return question.options;
  return [];
}

export default function MockTestPlayer({ questions = [], config = {}, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(() => getInitialTimeLeft(questions.length, config));
  const hasSubmittedRef = useRef(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = useMemo(() => {
    return Object.keys(answers).filter((answerId) => {
      const response = answers[answerId];
      return response !== undefined && response !== null && response !== "";
    }).length;
  }, [answers]);
  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  const handleSubmit = useCallback(() => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const result = calculateMockTestResult(questions, answers, markedForReview, config);
    onSubmit({
      ...result,
      title: getMockTestTitle(config),
      config,
    });
  }, [answers, config, markedForReview, onSubmit, questions]);

  useEffect(() => {
    if (!questions.length) return undefined;

    const timer = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          window.clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return previousTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [handleSubmit, questions.length]);

  const updateAnswer = (questionId, value) => {
    const safeValue = sanitizeText(value ?? "");
    setAnswers((previousAnswers) => ({ ...previousAnswers, [questionId]: safeValue }));
  };

  const toggleReview = (questionId) => {
    setMarkedForReview((previousReview) => ({
      ...previousReview,
      [questionId]: !previousReview[questionId],
    }));
  };

  if (!currentQuestion) return null;

  const questionType = String(currentQuestion.type || "short-answer").toLowerCase();
  const options = getOptionValues(currentQuestion);
  const isChoiceQuestion = ["mcq", "true-false", "assertion-reason"].includes(questionType) && options.length > 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700 dark:text-gray-300">
              {config.board || "Board"} {config.subjectCode ? `• ${config.subjectCode}` : ""} Mock Test
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Timed Practice Session</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              Time Left: {formatTime(timeLeft)}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              {answeredCount}/{questions.length} Answered
            </div>
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <div className="flex gap-3">
            <button type="button" onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))} disabled={currentIndex === 0} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              Previous
            </button>
            <button type="button" onClick={() => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))} disabled={currentIndex === questions.length - 1} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700 dark:text-gray-300">{questionType}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{currentQuestion.question || currentQuestion.prompt}</h2>
            </div>
            <button type="button" onClick={() => toggleReview(currentQuestion.id)} aria-pressed={markedForReview[currentQuestion.id]} className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${markedForReview[currentQuestion.id] ? "border-yellow-400 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/30" : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"}`}>
              {markedForReview[currentQuestion.id] ? "Marked for Review" : "Mark for Review"}
            </button>
          </div>

          {isChoiceQuestion ? (
            <div className="mt-6 space-y-3">
              {options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <button key={option} type="button" onClick={() => updateAnswer(currentQuestion.id, option)} aria-pressed={isSelected} className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition ${isSelected ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/30" : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"}`}>
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-900 dark:text-white" htmlFor="mock-test-answer">Write your answer</label>
              <textarea id="mock-test-answer" value={answers[currentQuestion.id] ?? ""} onChange={(event) => updateAnswer(currentQuestion.id, event.target.value)} rows={6} className="mt-3 w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Type your response here..." />
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Jump Palette</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Click any question number to jump.</p>
          <div className="mt-6 grid grid-cols-5 gap-3">
            {questions.map((question, index) => {
              const isCurrent = index === currentIndex;
              const isAnswered = Boolean(answers[question.id]);
              const isReview = Boolean(markedForReview[question.id]);
              return (
                <button key={question.id} type="button" onClick={() => setCurrentIndex(index)} aria-current={isCurrent ? "true" : "false"} className={`flex h-12 items-center justify-center rounded-full border text-sm font-semibold transition-all ${isCurrent ? "border-blue-500 bg-blue-100 dark:border-blue-600 dark:bg-blue-900/50" : isReview ? "border-yellow-400 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/30" : isAnswered ? "border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-900/30" : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"}`}>
                  {index + 1}
                </button>
              );
            })}
          </div>

          <button type="button" onClick={handleSubmit} className="mt-6 w-full rounded-xl border border-blue-300 bg-blue-100 px-5 py-3 font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200 dark:border-blue-700 dark:bg-blue-900/30 dark:text-white">
            Submit Mock Test
          </button>
        </div>
      </div>
    </div>
  );
}
