"use client";

import NotesStatusBadge from "./NotesStatusBadge";

export default function NotesPreview({ isOpen, note, onClose }) {
  if (!isOpen || !note) return null;

  const typeIcons = {
    PDF: "📄",
    Video: "🎥",
    Document: "📝",
  };

  return (
    <>
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
          aria-label="Note preview"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{typeIcons[note.type] || "📄"}</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{note.title}</h2>
                <p className="text-xs text-gray-500">{note.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NotesStatusBadge status={note.status} size="sm" />
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
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            {/* Metadata grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subject</p>
                <p className="text-sm font-medium text-gray-900">{note.subject || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Chapter</p>
                <p className="text-sm font-medium text-gray-900">{note.chapter || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Class</p>
                <p className="text-sm font-medium text-gray-900">Class {note.class || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</p>
                <p className="text-sm font-medium text-gray-900">{note.type || "—"}</p>
              </div>
            </div>

            {/* File details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">File Size</p>
                <p className="text-sm font-medium text-gray-900">{note.fileSize || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{note.type === "Video" ? "Duration" : "Pages"}</p>
                <p className="text-sm font-medium text-gray-900">{note.type === "Video" ? note.duration || "—" : note.pages || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Downloads</p>
                <p className="text-sm font-medium text-gray-900">{note.downloads || 0}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Views</p>
                <p className="text-sm font-medium text-gray-900">{note.views || 0}</p>
              </div>
            </div>

            {/* Description placeholder */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {note.title} — This study material covers key concepts for {note.chapter}. 
                  Suitable for Class {note.class} {note.subject} students.
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-100">
              <span>Uploaded: {note.uploaded}</span>
              {note.lastModified && <span>Last modified: {note.lastModified}</span>}
              {note.author && <span>By: {note.author}</span>}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                📥 Download
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}