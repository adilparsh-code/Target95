
"use client";

import { Children, forwardRef, isValidElement } from "react";

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
  // Convert children into a predictable array and remove null/undefined values.
  const childArray = Children.toArray(children);

  // Never render an empty learning card.
  if (childArray.length === 0) {
    return null;
  }

  // Defense-in-depth: legacy callers may still pass a placeholder paragraph.
  // Only inspect valid React elements before accessing props.
  const hasPlaceholder = childArray.some((child) => {
    if (!isValidElement(child)) {
      return false;
    }

    const childContent = child.props?.children;

    if (typeof childContent !== "string") {
      return false;
    }

    return PLACEHOLDER_TEXT.has(childContent.trim());
  });

  if (hasPlaceholder) {
    return null;
  }

  return (
    <section
      ref={ref}
      id={id}
      className={`mb-12 scroll-mt-24 ${className}`}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          {icon}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>

          {estimatedTime && (
            <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0"
                />
              </svg>

              {estimatedTime} min
            </p>
          )}
        </div>

        {isCompleted && (
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0"
              />
            </svg>

            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80 sm:p-8">
        {children}
      </div>
    </section>
  );
});

ChapterSection.displayName = "ChapterSection";

export default ChapterSection;

