"use client";

import ChapterSection from "../../ChapterSection";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PracticeSection({ practice, isCompleted }) {
  if (!practice) return null;

  return (
    <ChapterSection
      id="practice"
      title="Practice"
      icon={<CheckCircleIcon className="w-5 h-5" />}
      estimatedTime={20}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {practice.totalMarks && (
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              Total Marks: {practice.totalMarks}
            </span>
          )}
          {practice.timeLimit && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              Time: {practice.timeLimit}
            </span>
          )}
        </div>

        {practice.sections && practice.sections.length > 0 && (
          <div className="space-y-4">
            {practice.sections.map((section, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:bg-gray-900/50 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {section.marks} marks
                  </span>
                </div>
                <div className="space-y-2">
                  {section.questions?.map((q, qIdx) => (
                    <div
                      key={q.id || qIdx}
                      className="rounded-xl bg-white p-3 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <p className="whitespace-pre-line">{q.question}</p>
                      {q.options && (
                        <div className="mt-2 space-y-1">
                          {q.options.map((opt, optIdx) => (
                            <p key={optIdx} className="text-xs text-gray-600 dark:text-gray-400">
                              {opt}
                            </p>
                          ))}
                        </div>
                      )}
                      {q.answer && (
                        <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Answer: {q.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ChapterSection>
  );
}