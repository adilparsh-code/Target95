"use client";

import AdminCard from "./AdminCard";
import DifficultyBadge from "../DifficultyBadge";
import QuestionTypeBadge from "./QuestionTypeBadge";
import StatusBadge from "./StatusBadge";

/**
 * Reusable question card for grid/card views.
 * @param {Object} props
 * @param {Object} props.question - Question data object
 * @param {boolean} props.selected - Whether the card is selected
 * @param {Function} props.onSelect - Selection toggle handler
 * @param {Function} props.onView - View/preview handler
 * @param {Function} props.onEdit - Edit handler
 * @param {Function} props.onDelete - Delete handler
 */
export default function QuestionCard({
  question,
  selected = false,
  onSelect,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <AdminCard>
      <div className="space-y-3">
        {/* Header: checkbox + ID + menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onSelect && (
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onSelect(question.id, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                aria-label={`Select ${question.id}`}
              />
            )}
            <span className="text-xs font-mono text-gray-400">{question.id}</span>
          </div>
          <span className="text-xs text-gray-400 font-mono">{question.marks} marks</span>
        </div>

        {/* Content */}
        <div>
          <p className="text-xs text-gray-400 mb-0.5 truncate">{question.subject}</p>
          <p className="text-sm font-medium text-gray-900 line-clamp-2" title={question.chapter}>
            {question.question || question.text || question.chapter}
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {question.difficulty && <DifficultyBadge difficulty={question.difficulty} />}
          {question.type && <QuestionTypeBadge type={question.type} size="sm" />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-50">
          <StatusBadge status={question.status} size="sm" />
          <div className="flex items-center gap-1">
            {onView && (
              <button
                onClick={() => onView(question)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label={`View ${question.id}`}
                title="View"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(question)}
                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                aria-label={`Edit ${question.id}`}
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(question)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label={`Delete ${question.id}`}
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Updated date */}
        {question.updatedDate && (
          <p className="text-xs text-gray-400 text-right">{question.updatedDate}</p>
        )}
      </div>
    </AdminCard>
  );
}