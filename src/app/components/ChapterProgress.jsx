"use client";

import { useMemo } from "react";
import Link from "next/link";
import useProgress from "../hooks/useProgress";

export default function ChapterProgress({ chapter, questions }) {
  const { isCompleted, resetProgress } = useProgress();
  const completedCount = useMemo(
    () =>
      questions.filter((question) =>
        isCompleted({ chapter, questionId: question.id })
      ).length,
    [chapter, isCompleted, questions]
  );
  const completionPercentage =
    questions.length > 0
      ? Math.round((completedCount / questions.length) * 100)
      : 0;
  const nextQuestion = questions.find(
    (question) => !isCompleted({ chapter, questionId: question.id })
  );
  const continueQuestion = nextQuestion ?? questions[0];

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-slate-50 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Learning Progress
          </h2>
          <p className="mt-2 text-gray-700">
            {completedCount} of {questions.length} questions completed
          </p>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {completionPercentage}%
        </p>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {continueQuestion ? (
          <Link
            href={`/java/${chapter}/question/${continueQuestion.id}`}
            className="inline-flex justify-center rounded-xl bg-blue-100 px-6 py-3 font-semibold text-gray-900 transition hover:bg-blue-200"
          >
            Continue Learning
          </Link>
        ) : (
          <p className="text-gray-700">Questions coming soon.</p>
        )}

        <button
          type="button"
          onClick={() => resetProgress(chapter)}
          disabled={completedCount === 0}
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset Progress
        </button>
      </div>
    </section>
  );
}
