"use client";

import ChapterSection from "../../ChapterSection";
import { LightBulbIcon } from "@heroicons/react/24/outline";

export default function RevisionNotesSection({ items, isCompleted }) {
  if (!items || items.length === 0) return null;

  return (
    <ChapterSection
      id="revision-notes"
      title="Revision Notes"
      icon={<LightBulbIcon className="w-5 h-5" />}
      estimatedTime={8}
      isCompleted={isCompleted}
    >
      <div className="grid gap-3">
        {items.map((note, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:bg-gray-900/50 dark:border-gray-700"
          >
            {note.title && (
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {note.title}
              </h3>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {note.content}
            </p>
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}