"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculateMockTestResult, formatTime, sanitizeText } from "../../../lib/mocktest";

function getInitialTimeLeft(questionCount) {
  return questionCount > 0 ? questionCount * 45 : 600;
}

export default function MockTestPlayer({ questions, config, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(() => getInitialTimeLeft(questions.length));
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
    if (hasSubmittedRef.current) {
      return;
    }

    hasSubmittedRef.current = true;
    const result = calculateMockTestResult(questions, answers, markedForReview);
    onSubmit({
      ...result,
      title: `${config.chapter === "all" ? "All Chapters" : config.chapter} • ${config.difficulty === "all" ? "Mixed Difficulty" : config.difficulty}`,
      config,
    });
  }, [answers, config, markedForReview, onSubmit, questions]);

  useEffect(() => {
    if (!questions.length) {
      return;
    }

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
    const safeQuestionId = Number(questionId) || 0;
    const safeValue = sanitizeText(value ?? "");

    setAnswers((previousAnswers) => ({ ...previousAnswers, [safeQuestionId]: safeValue }));
  };

  const toggleReview = (questionId) => {
    const safeQuestionId = Number(questionId) || 0;

    setMarkedForReview((previousReview) => ({
      ...previousReview,
      [safeQuestionId]: !previousReview[safeQuestionId],
    }));
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700 dark:text-gray-300">Mock Test</p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Timed Practice Session</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
              Time Left: {formatTime(timeLeft)}
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
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
            <button
              type="button"
              onClick={() => setCurrentIndex((previousIndex) => Math.max(previousIndex - 1, 0))}
              disabled={currentIndex === 0}
              aria-disabled={currentIndex === 0}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition hover:border-gray-400 dark:hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((previousIndex) => Math.min(previousIndex + 1, questions.length - 1))}
              disabled={currentIndex === questions.length - 1}
              aria-disabled={currentIndex === questions.length - 1}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition hover:border-gray-400 dark:hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700 dark:text-gray-300">{currentQuestion.type.toUpperCase()}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{currentQuestion.question}</h2>
            </div>
            <button
              type="button"
              onClick={() => toggleReview(currentQuestion.id)}
              aria-pressed={markedForReview[currentQuestion.id]}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${markedForReview[currentQuestion.id] ? "border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 text-gray-900 dark:text-white" : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-600"}`}
            >
              {markedForReview[currentQuestion.id] ? "Marked for Review" : "Mark for Review"}
            </button>
          </div>

          {currentQuestion.type.toLowerCase() === "mcq" ? (
            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateAnswer(currentQuestion.id, option)}
                    aria-pressed={isSelected}
                    className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition ${isSelected ? "border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-gray-900 dark:text-white" : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-600"}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-900 dark:text-white" htmlFor="theory-answer">
                Write your answer
              </label>
              <textarea
                id="theory-answer"
                value={answers[currentQuestion.id] ?? ""}
                onChange={(event) => updateAnswer(currentQuestion.id, event.target.value)}
                rows={6}
                className="mt-3 w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
                placeholder="Type your response here..."
                aria-describedby="theory-answer-description"
              />
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Jump Palette</h2>
          <p id="jump-palette-description" className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Click on any question number to jump to that question
          </p>
          <div className="mt-6 grid grid-cols-5 gap-3">
            {questions.map((question, index) => {
              const isCurrent = index === currentIndex;
              const isAnswered = Boolean(answers[question.id]);
              const isReview = Boolean(markedForReview[question.id]);

              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-current={isCurrent ? "true" : "false"}
                  aria-label={`Jump to question ${index + 1}`}
                  className={`flex h-12 items-center justify-center rounded-full border text-sm font-semibold transition-all ${isCurrent ? "border-blue-500 dark:border-blue-600 bg-blue-100 dark:bg-blue-900/50 text-gray-900 dark:text-white ring-2 ring-blue-200 dark:ring-blue-800" : isReview ? "border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 text-gray-900 dark:text-white" : isAnswered ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/30 text-gray-900 dark:text-white" : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-600"}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-100 dark:bg-blue-900/30 px-5 py-3 font-semibold text-gray-900 dark:text-white transition hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-200 dark:hover:bg-blue-900/50"
          >
            Submit Mock Test
          </button>
        </div>
      </div>
    </div>
  );
}