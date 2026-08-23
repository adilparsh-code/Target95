"use client";

import ChapterSection from "../../ChapterSection";
import { FileText } from "lucide-react";

export default function DiagramsSection({ items, isCompleted }) {
  if (!items || items.length === 0) return null;

  return (
    <ChapterSection
      id="diagrams"
      title="Diagrams & Visuals"
      icon={<FileText className="w-5 h-5" />}
      estimatedTime={10}
      isCompleted={isCompleted}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((diagram, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
                {idx + 1}
              </span>
              <span className="text-sm font-semibold text-slate-800">Visual note</span>
            </div>
            <p className="text-sm leading-6 text-slate-700 whitespace-pre-line">{diagram}</p>
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}
