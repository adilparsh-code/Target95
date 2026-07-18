"use client";

import AdminCard from "./AdminCard";
import StatusBadge from "./StatusBadge";

/**
 * Reusable chapter card with expandable details.
 * @param {Object} props
 * @param {Object} props.chapter - Chapter data object
 * @param {boolean} props.expanded - Whether details are expanded
 * @param {Function} props.onToggle - Expand/collapse handler
 * @param {Function} props.onEdit - Edit handler
 * @param {Function} props.onViewQuestions - View questions handler
 * @param {Function} props.onArchive - Archive handler
 */
export default function ChapterCard({
  chapter,
  expanded = false,
  onToggle,
  onEdit,
  onViewQuestions,
  onArchive,
}) {
  const progressPercent = chapter.questions
    ? Math.min(100, Math.round((chapter.completedQuestions || 0) / chapter.questions * 100))
    : 0;

  return (
    <AdminCard>
      <div>
        {/* Main row */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => onToggle?.(chapter.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle?.(chapter.id);
            }
          }}
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Chapter number icon */}
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold shrink-0">
              {chapter.id}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {chapter.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-gray-500">{chapter.questions} questions</p>
                {chapter.topics && (
                  <span className="text-xs text-gray-400">
                    · {chapter.topics.length} topics
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Progress bar (desktop) */}
            {chapter.completedQuestions !== undefined && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${progressPercent}% complete`}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">{progressPercent}%</span>
              </div>
            )}

            <StatusBadge status={chapter.status} size="sm" />
            <span className="text-xs text-gray-400 hidden sm:block">{chapter.lastUpdated}</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-4">
              {/* Topics */}
              {chapter.topics && chapter.topics.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Topics Covered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chapter.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile progress */}
              {chapter.completedQuestions !== undefined && (
                <div className="sm:hidden">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Progress
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {chapter.completedQuestions || 0}/{chapter.questions}
                    </span>
                  </div>
                </div>
              )}

              {/* Question count breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-900">{chapter.questions}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Theory</p>
                  <p className="text-lg font-bold text-indigo-600">{chapter.theoryCount ?? "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">MCQ</p>
                  <p className="text-lg font-bold text-cyan-600">{chapter.mcqCount ?? "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Coding</p>
                  <p className="text-lg font-bold text-amber-600">{chapter.codingCount ?? "—"}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-1">
                {onEdit && (
                  <button
                    onClick={() => onEdit(chapter)}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit Chapter
                  </button>
                )}
                {onViewQuestions && (
                  <button
                    onClick={() => onViewQuestions(chapter)}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    View Questions
                  </button>
                )}
                {onArchive && (
                  <button
                    onClick={() => onArchive(chapter)}
                    className="px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminCard>
  );
}