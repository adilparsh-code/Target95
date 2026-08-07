"use client";

import { useState } from "react";
import ChapterSection from "../../ChapterSection";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function PyqSection({ items, isCompleted }) {
  const [expanded, setExpanded] = useState({});
  if (!items || items.length === 0) return null;

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ChapterSection
      id="previous-year-questions"
      title="Previous Year Questions"
      icon={<AcademicCapIcon className="w-5 h-5" />}
      estimatedTime={20}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        {items.map((q, idx) => {
          const isExpanded = expanded[q.id];
          return (
            <div
              key={q.id || idx}
              className="rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:bg-gray-900/50 dark:border-gray-700"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white whitespace-pre-line">
                {idx + 1}. {q.question}
              </p>

              <button
                type="button"
                onClick={() => toggleExpand(q.id)}
                className="mt-3 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                {isExpanded ? "Hide Answer" : "View Answer"}
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-2">
                  {q.answer && (
                    <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      <span className="font-semibold">Answer: </span>
                      <span className="whitespace-pre-line">{q.answer}</span>
                    </div>
                  )}
                  {q.explanation && (
                    <div className="rounded-xl bg-blue-50 p-3 text-sm text-gray-700 dark:bg-blue-900/30 dark:text-gray-300">
                      <span className="font-semibold text-blue-800 dark:text-blue-300">
                        Explanation:{" "}
                      </span>
                      <span className="whitespace-pre-line">{q.explanation}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ChapterSection>
  );
}