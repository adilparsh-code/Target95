"use client";

import QuestionTypeBadge from "./QuestionTypeBadge";
import StatusBadge from "./StatusBadge";

/**
 * Modal for previewing a question's full details.
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Object|null} props.question - Question data to preview
 * @param {Function} props.onClose - Close handler
 */
export default function QuestionPreview({ isOpen, question, onClose }) {
  if (!isOpen || !question) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-hidden="true"
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Question preview"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {question.id || "Question Preview"}
              </h2>
              <div className="flex items-center gap-2">
                <QuestionTypeBadge type={question.type} size="sm" />
                <StatusBadge status={question.status} size="sm" />
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close preview"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            {/* Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subject</p>
                <p className="text-sm font-medium text-gray-900">{question.subject || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Chapter</p>
                <p className="text-sm font-medium text-gray-900">{question.chapter || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Difficulty</p>
                <p className="text-sm font-medium text-gray-900">{question.difficulty || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Marks</p>
                <p className="text-sm font-medium text-gray-900">{question.marks ?? "—"}</p>
              </div>
            </div>

            {/* Question text */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Question</p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {question.question || question.text || "No question text available."}
                </p>
              </div>
            </div>

            {/* Options (for MCQ) */}
            {question.type?.toLowerCase() === "mcq" && question.options && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Options</p>
                <div className="space-y-2">
                  {question.options.map((option, idx) => {
                    const isCorrect = String(option).toLowerCase() === String(question.answer).toLowerCase();
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-white border-gray-200 text-gray-700"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCorrect
                            ? "bg-emerald-200 text-emerald-800"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                        {isCorrect && (
                          <svg className="w-4 h-4 ml-auto text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Answer */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Answer</p>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-wrap">
                  {question.answer || "No answer available."}
                </p>
              </div>
            </div>

            {/* Dates info */}
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-100">
              {question.createdDate && (
                <span>Created: {question.createdDate}</span>
              )}
              {question.updatedDate && (
                <span>Updated: {question.updatedDate}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}