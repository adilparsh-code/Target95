export default function StatusBadge({ status, size = "sm" }) {
  const statusConfig = {
    active: { label: "Active", classes: "bg-emerald-50 text-emerald-700 border-emerald-200", dotClasses: "bg-emerald-500" },
    inactive: { label: "Inactive", classes: "bg-gray-50 text-gray-600 border-gray-200", dotClasses: "bg-gray-400" },
    pending: { label: "Pending", classes: "bg-amber-50 text-amber-700 border-amber-200", dotClasses: "bg-amber-500" },
    draft: { label: "Draft", classes: "bg-gray-50 text-gray-500 border-gray-200", dotClasses: "bg-gray-400" },
    published: { label: "Published", classes: "bg-blue-50 text-blue-700 border-blue-200", dotClasses: "bg-blue-500" },
    archived: { label: "Archived", classes: "bg-rose-50 text-rose-700 border-rose-200", dotClasses: "bg-rose-400" },
    error: { label: "Error", classes: "bg-red-50 text-red-700 border-red-200", dotClasses: "bg-red-500" },
    success: { label: "Success", classes: "bg-emerald-50 text-emerald-700 border-emerald-200", dotClasses: "bg-emerald-500" },
  };

  const config = statusConfig[status?.toLowerCase()] || {
    label: status || "Unknown",
    classes: "bg-gray-50 text-gray-600 border-gray-200",
    dotClasses: "bg-gray-400",
  };

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClasses} ${config.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClasses}`} />
      {config.label}
    </span>
  );
}