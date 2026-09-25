"use client";

import ChapterSection from "../../ChapterSection";
import { BookOpenIcon } from "@heroicons/react/24/outline";

function splitDefinition(value) {
  if (typeof value !== "string") return { term: "", meaning: String(value ?? "") };
  const match = value.match(/^([^:]{2,60}):\\s*(.+)$/);
  return match
    ? { term: match[1].trim(), meaning: match[2].trim() }
    : { term: "", meaning: value.trim() };
}

export default function DefinitionsSection({ items, isCompleted }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <ChapterSection
      id="definitions"
      title="Key Definitions"
      icon={<BookOpenIcon className="w-5 h-5" />}
      estimatedTime={5}
      isCompleted={isCompleted}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((definition, idx) => {
          const { term, meaning } = splitDefinition(definition);
          return (
            <div
              key={`definition-${idx}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              {term && (
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  {term}
                </p>
              )}
              <p className={term ? "mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300" : "text-sm leading-6 text-slate-700 dark:text-slate-300"}>
                {meaning}
              </p>
            </div>
          );
        })}
      </div>
    </ChapterSection>
  );
}
