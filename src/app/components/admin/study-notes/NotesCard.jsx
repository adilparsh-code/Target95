import NotesStatusBadge from "./NotesStatusBadge";

export default function NotesCard({ note, onPreview, onEdit, onDelete }) {
  const typeColors = {
    PDF: "bg-rose-50 text-rose-600 border-rose-200",
    Video: "bg-blue-50 text-blue-600 border-blue-200",
    Document: "bg-amber-50 text-amber-600 border-amber-200",
  };

  const typeIcons = {
    PDF: "📄",
    Video: "🎥",
    Document: "📝",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 border ${typeColors[note.type] || "bg-gray-50 text-gray-600"}`}>
            {typeIcons[note.type] || "📄"}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
              {note.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{note.chapter}</p>
          </div>
        </div>
        <NotesStatusBadge status={note.status} size="sm" />
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{note.type === "Video" ? "Duration" : "Pages"}</p>
          <p className="text-sm font-bold text-gray-900">{note.type === "Video" ? note.duration || "—" : note.pages || "—"}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Class</p>
          <p className="text-sm font-bold text-gray-900">{note.class}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Views</p>
          <p className="text-sm font-bold text-gray-900">{note.views || 0}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span>{note.fileSize || "—"}</span>
        <span>{note.uploaded}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <button
          onClick={() => onPreview?.(note)}
          className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          aria-label={`Preview ${note.title}`}
        >
          Preview
        </button>
        <button
          onClick={() => onEdit?.(note)}
          className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={`Edit ${note.title}`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(note)}
          className="px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
          aria-label={`Delete ${note.title}`}
        >
          🗑
        </button>
      </div>
    </div>
  );
}