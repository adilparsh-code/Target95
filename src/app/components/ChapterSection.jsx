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
  // Only suppress the card when ALL meaningful children are placeholders;
  // never hide real academic content just because a legacy fallback is also
  // present.
  const childList = Children.toArray(children);
  const meaningfulChildren = childList.filter((child) => {
    const value = child?.props?.children;
    return !(typeof value === "string" && PLACEHOLDER_TEXT.has(value.trim()));
  });
  if (childList.length > 0 && meaningfulChildren.length === 0) return null;

  return (
    <section
      ref={ref}
      id={id}
      className={`mb-10 scroll-mt-24 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
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

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-700 dark:bg-slate-900">
        {children}
      </div>
    </section>
  );
});

export default ChapterSection;
