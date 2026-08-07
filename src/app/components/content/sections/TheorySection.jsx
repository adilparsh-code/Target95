"use client";

import ChapterSection from "../../ChapterSection";
import { BeakerIcon } from "@heroicons/react/24/outline";

export default function TheorySection({ sections, isCompleted }) {
  if (!sections || sections.length === 0) return null;

  return (
    <ChapterSection
      id="theory"
      title="Theory"
      icon={<BeakerIcon className="w-5 h-5" />}
      estimatedTime={15}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        {sections.map((section, idx) => {
          if (section.type === "paragraph") {
            return (
              <p key={idx} className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                {section.text}
              </p>
            );
          }
          if (section.type === "list") {
            return (
              <div key={idx}>
                {section.title && (
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h3>
                )}
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    </ChapterSection>
  );
}