"use client";

import ChapterSection from "../../ChapterSection";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function OutputSection({ items, isCompleted }) {
  if (!items || items.length === 0) return null;

  return (
    <ChapterSection
      id="output"
      title="Output Questions"
      icon={<DocumentTextIcon className="w-5 h-5" />}
      estimatedTime={items.reduce((sum, q) => sum + (q.estimatedTime || 2), 0)}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        {items.map((q, idx) => (
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

            <div className="mt-3 rounded-xl bg-gray-900 p-3 text-sm text-green-300 dark:bg-gray-800">
              <span className="text-gray-400">Expected Output:</span>
              <pre className="mt-1 whitespace-pre-wrap font-mono text-green-300">{q.answer}</pre>
            </div>

            {q.explanation && (
              <div className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-blue-900 dark:bg-blue-900/20 dark:text-blue-200">
                <span className="font-semibold">Explanation:</span> {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}