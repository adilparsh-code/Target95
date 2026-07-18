/**
 * Status badge specifically for study notes with note-specific statuses.
 * Reuses the existing StatusBadge component logic but adds note-specific statuses.
 */

export default function NotesStatusBadge({ status, size = "sm" }) {
  const statusConfig = {
    published: { label: "Published", classes: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500" },
    draft: { label: "Draft", classes: "bg-gray-50 text-gray-500 border-gray-200", dot: "bg-gray-400" },
    pending: { label: "Pending Review", classes: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    archived: { label: "Archived", classes: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
  };

  const config = statusConfig[status?.toLowerCase()] || {
    label: status || "Unknown",
    classes: "bg-gray-50 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  };

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClasses} ${config.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}