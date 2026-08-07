"use client";

import ChapterSection from "../../ChapterSection";
import { ScrollText } from "lucide-react";

export default function KeyTermsSection({ items, isCompleted }) {
  if (!items || items.length === 0) return null;

  return (
    <ChapterSection
      id="key-terms"
      title="Key Terms"
      icon={<ScrollText className="w-5 h-5" />}
      estimatedTime={5}
      isCompleted={isCompleted}
    >
      <div className="grid gap-3">
        {items.map((term, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700 dark:bg-gray-900/50 dark:border-gray-700 dark:text-gray-300"
          >
            {term}
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}