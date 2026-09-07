"use client";

import { Children, forwardRef } from "react";

const PLACEHOLDER_TEXT = new Set([
  "This section will be available soon.",
  "This section will be added soon.",
]);

const ChapterSection = forwardRef(function ChapterSection(
  {
    id,
    title,
    icon,
    children,
    estimatedTime,
    isCompleted = false,
    className = "",
  },
  ref
) {
  // Never render an empty learning card. Missing academic content should be
  // omitted by the caller rather than replaced with filler text.
  if (!children) return null;

  // Defense-in-depth: legacy callers may still pass a placeholder paragraph.
  // Do not let those placeholders become visible academic sections.
  const hasPlaceholder = Children.toArray(children).some((child) => {
    const value = child?.props?.children;
    return typeof value === "string" && PLACEHOLDER_TEXT.has(value.trim());
  });
  if (hasPlaceholder) return null;

  return (
    <section
      ref={ref}
      id={id}
      className={`mb-12 scroll-mt-24 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {estimatedTime && (
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0" />
              </svg>
              {estimatedTime} min
            </p>
          )}
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0" />
            </svg>
            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
        {children}
      </div>
    </section>
  );
});

export default ChapterSection;
