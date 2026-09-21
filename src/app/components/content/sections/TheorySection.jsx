"use client";

import ChapterSection from "../../ChapterSection";
import { BeakerIcon, LightBulbIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const LIST_META = {
  "Important Points": {
    icon: BeakerIcon,
    label: "Core ideas",
    tone: "border-slate-200 bg-slate-50",
  },
  "Memory Tricks": {
    icon: LightBulbIcon,
    label: "Remember it",
    tone: "border-amber-200 bg-amber-50/60",
  },
  "Exam Tips": {
    icon: AcademicCapIcon,
    label: "Exam insight",
    tone: "border-blue-200 bg-blue-50/60",
  },
};

export default function TheorySection({ sections, isCompleted }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <ChapterSection
      id="theory"
      title="Understand the Concept"
      icon={<BeakerIcon className="w-5 h-5" />}
      estimatedTime={15}
      isCompleted={isCompleted}
    >
      <div className="space-y-8">
        {sections.map((section, idx) => {
          if (section.type === "paragraph") {
            return (
              <p
                key={`paragraph-${idx}`}
                className="max-w-3xl text-[15px] leading-7 text-slate-700 dark:text-slate-300"
              >
                {section.text}
              </p>
            );
          }

          if (section.type === "list") {
            const meta = LIST_META[section.title] || {
              icon: BeakerIcon,
              label: section.title || "Key points",
              tone: "border-slate-200 bg-white",
            };
            const Icon = meta.icon;

            return (
              <div
                key={`list-${idx}`}
                className={`rounded-2xl border p-5 sm:p-6 ${meta.tone}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl bg-white p-2 shadow-sm">
                    <Icon className="h-5 w-5 text-slate-700" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      {meta.label}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {section.title || "Key points"}
                    </h3>
                  </div>
                </div>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(section.items || []).map((item, itemIdx) => (
                    <li
                      key={`item-${itemIdx}`}
                      className="rounded-xl border border-white/80 bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm dark:bg-slate-900/30 dark:text-slate-300"
                    >
                      {item}
                    </li>
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
