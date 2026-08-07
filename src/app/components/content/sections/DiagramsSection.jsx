"use client";

import ChapterSection from "../../ChapterSection";
import { FileText } from "lucide-react";

export default function DiagramsSection({ items, isCompleted }) {
  if (!items || items.length === 0) return null;

  return (
    <ChapterSection
      id="diagrams"
      title="Diagrams"
      icon={<FileText className="w-5 h-5" />}
      estimatedTime={10}
      isCompleted={isCompleted}
    >
      <div className="grid gap-4">
        {items.map((diagram, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:bg-gray-900/50 dark:border-gray-700"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">{diagram}</p>
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}