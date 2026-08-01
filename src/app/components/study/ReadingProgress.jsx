"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "target95-reading-progress";

function getSavedProgress() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    return JSON.parse(saved);
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage failures
  }
}

export default function ReadingProgress({ slug, sections = [] }) {
  const [progress, setProgress] = useState(0);

  const saveScrollProgress = useCallback((slug, percent) => {
    const all = getSavedProgress();
    all[slug] = percent;
    saveProgress(all);
  }, []);

  const loadScrollProgress = useCallback((slug) => {
    const all = getSavedProgress();
    return all[slug] ?? 0;
  }, []);

  useEffect(() => {
    const savedPercent = loadScrollProgress(slug);
    setProgress(savedPercent);

    const container = document.getElementById("study-chapter-content");
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const percent = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;

      setProgress(percent);
      saveScrollProgress(slug, percent);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [slug, loadScrollProgress, saveScrollProgress]);

  const completedSections = sections.length > 0
    ? Math.round((sections.filter((s) => s.completed).length / sections.length) * 100)
    : 0;

  return (
    <section
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
      aria-labelledby="reading-progress-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="reading-progress-heading" className="text-xl font-bold text-gray-900">
            Reading Progress
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {progress}% scrolled · {completedSections}% sections reviewed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{progress}%</span>
          <div className="h-2.5 w-32 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {sections.length > 0 && (
        <div className="mt-4 space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center gap-3 text-sm"
            >
              <div
                className={`h-2 flex-1 rounded-full ${
                  section.completed ? "bg-blue-600" : "bg-gray-200"
                }`}
                aria-hidden="true"
              />
              <span
                className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  section.completed
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } flex items-center justify-center`}
              >
                {section.completed ? "✓" : ""}
              </span>
              <span className="text-xs text-gray-600 max-w-[120px] truncate">
                {section.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
