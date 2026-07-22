"use client";

import ProgressRing from "../ui/ProgressRing";

export default function SubjectCards({ subjects = [] }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Subject Progress</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className={`rounded-2xl border p-4 ${subject.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl">{subject.icon}</p>
                <p className="mt-2 text-sm font-bold text-gray-900">
                  {subject.name}
                </p>
              </div>
              <ProgressRing
                progress={subject.progress}
                size={56}
                strokeWidth={5}
                label={`${subject.progress}%`}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-700">
              <span>
                {subject.completedChapters}/{subject.totalChapters} chapters
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}