
"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import useProgress from "../hooks/useProgress";

export default function ChapterProgress({
  chapter,
  questions = [],
}) {
  const { isCompleted, resetProgress } = useProgress();

  const {
    completedCount,
    completionPercentage,
    continueQuestion,
  } = useMemo(() => {
    if (!Array.isArray(questions) || questions.length === 0) {
      return {
        completedCount: 0,
        completionPercentage: 0,
        continueQuestion: null,
      };
    }

    let completed = 0;
    let nextQuestion = null;

    for (const question of questions) {
      if (!question?.id) {
        continue;
      }

      const completedForQuestion = isCompleted({
        chapter,
        questionId: question.id,
      });

      if (completedForQuestion) {
        completed += 1;
      } else if (!nextQuestion) {
        nextQuestion = question;
      }
    }

    const percentage = Math.round(
      (completed / questions.length) * 100
    );

    return {
      completedCount: completed,
      completionPercentage: percentage,
      continueQuestion: nextQuestion ?? questions[0] ?? null,
    };
  }, [chapter, isCompleted, questions]);

  const handleReset = useCallback(() => {
    if (completedCount === 0) {
      return;
    }

    resetProgress(chapter);
  }, [chapter, completedCount, resetProgress]);

  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-10 rounded-2xl border border-gray-200 bg-slate-50 p-6"
      aria-labelledby="chapter-progress-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="chapter-progress-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Learning Progress
          </h2>

          <p className="mt-2 text-gray-700">
            {completedCount} of {questions.length} questions completed
          </p>
        </div>

        <p
          className="text-3xl font-bold text-gray-900"
          aria-label={`${completionPercentage}% completed`}
        >
          {completionPercentage}%
        </p>
      </div>

      <div
        className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={completionPercentage}
        aria-label="Chapter learning progress"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${completionPercentage}%`,
          }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {continueQuestion?.id && (
          <Link
            href={`/Java/${encodeURIComponent(
              String(chapter)
            )}/question/${encodeURIComponent(
              String(continueQuestion.id)
            )}`}
            className="inline-flex justify-center rounded-xl bg-blue-100 px-6 py-3 font-semibold text-gray-900 transition hover:bg-blue-200"
          >
            Continue Learning
          </Link>
        )}

        <button
          type="button"
          onClick={handleReset}
          disabled={completedCount === 0}
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset Progress
        </button>
      </div>
    </section>
  );
}
