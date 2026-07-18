"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { calculateMockTestResult, formatTime, sanitizeText } from "../../../lib/mocktest";

export default function MockTestPlayer({ questions, config, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const hasSubmittedRef = useRef(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).filter((answerId) => {
    const response = answers[answerId];
    return response !== undefined && response !== null && response !== "";
  }).length;
  const progressPercent = questions.length > 0 ? Math.round((currentIndex + 1 / questions.length) * 100) : 0;

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

  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(questions.length * 45);
    }
  }, [questions.length]);

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
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Mock Test</p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">Timed Practice Session</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-900">
              Time Left: {formatTime(timeLeft)}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-900">
              {answeredCount}/{questions.length} Answered
            </div>
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-gray-700">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentIndex((previousIndex) => Math.max(previousIndex - 1, 0))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((previousIndex) => Math.min(previousIndex + 1, questions.length - 1))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">{currentQuestion.type.toUpperCase()}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">{currentQuestion.question}</h2>
            </div>
            <button
              type="button"
              onClick={() => toggleReview(currentQuestion.id)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${markedForReview[currentQuestion.id] ? "border-yellow-400 bg-yellow-50 text-gray-900" : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"}`}
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
                    className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition ${isSelected ? "border-blue-500 bg-blue-50 text-gray-900" : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-900" htmlFor="theory-answer">
                Write your answer
              </label>
              <textarea
                id="theory-answer"
                value={answers[currentQuestion.id] ?? ""}
                onChange={(event) => updateAnswer(currentQuestion.id, event.target.value)}
                rows={6}
                className="mt-3 w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Type your response here..."
              />
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Jump Palette</h2>
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
                  className={`flex h-12 items-center justify-center rounded-full border text-sm font-semibold ${isCurrent ? "border-blue-500 bg-blue-100 text-gray-900" : isReview ? "border-yellow-400 bg-yellow-50 text-gray-900" : isAnswered ? "border-green-400 bg-green-50 text-gray-900" : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-xl border border-blue-300 bg-blue-100 px-5 py-3 font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200"
          >
            Submit Mock Test
          </button>
        </div>
      </div>
    </div>
  );
}
