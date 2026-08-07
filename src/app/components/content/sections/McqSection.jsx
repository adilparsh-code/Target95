"use client";

import { useState } from "react";
import ChapterSection from "../../ChapterSection";
import { ListBulletIcon } from "@heroicons/react/24/outline";

export default function McqSection({ items, isCompleted }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  if (!items || items.length === 0) return null;

  const selectAnswer = (id, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [id]: optionIndex }));
  };

  return (
    <ChapterSection
      id="mcqs"
      title="MCQs"
      icon={<ListBulletIcon className="w-5 h-5" />}
      estimatedTime={15}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        {items.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected !== undefined && selected === q.answer;

          return (
            <div
              key={q.id || idx}
              className="rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:bg-gray-900/50 dark:border-gray-700"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white whitespace-pre-line">
                  {idx + 1}. {q.question}
                </p>
                {q.difficulty && (
                  <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 uppercase">
                    {q.difficulty}
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-2">
                {q.options?.map((option, optIdx) => {
                  const isSelected = selected === optIdx;
                  const isAnswer = optIdx === q.answer;
                  let optionClass =
                    "rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300";
                  if (selected !== undefined) {
                    if (isAnswer) {
                      optionClass =
                        "rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-300";
                    } else if (isSelected && !isAnswer) {
                      optionClass =
                        "rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:bg-rose-900/30 dark:border-rose-700 dark:text-rose-300";
                    }
                  }
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => selectAnswer(q.id, optIdx)}
                      className={`${optionClass} w-full text-left transition`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {selected !== undefined && (
                <div
                  className={`mt-3 rounded-xl p-3 text-sm ${
                    isCorrect
                      ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                  }`}
                >
                  <span className="font-semibold">
                    {isCorrect ? "Correct! " : "Incorrect. "}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ChapterSection>
  );
}