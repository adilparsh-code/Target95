"use client";

import ChapterSection from "../../ChapterSection";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function LearningObjectivesSection({ items, isCompleted }) {
  if (!items || items.length === 0) return null;

  return (
    <ChapterSection
      id="learning-objectives"
      title="Learning Objectives"
      icon={<AcademicCapIcon className="w-5 h-5" />}
      estimatedTime={3}
      isCompleted={isCompleted}
    >
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
        {items.map((objective, idx) => (
          <li key={idx}>{objective}</li>
        ))}
      </ul>
    </ChapterSection>
  );
}