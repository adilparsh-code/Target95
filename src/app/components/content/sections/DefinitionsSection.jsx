"use client";

import ChapterSection from "../../ChapterSection";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function DefinitionsSection({ items, isCompleted }) {
  if (!items || items.length === 0) return null;

  return (
    <ChapterSection
      id="definitions"
      title="Definitions"
      icon={<BookOpenIcon className="w-5 h-5" />}
      estimatedTime={5}
      isCompleted={isCompleted}
    >
      <div className="grid gap-3">
        {items.map((definition, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700 dark:bg-gray-900/50 dark:border-gray-700 dark:text-gray-300"
          >
            {definition}
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}