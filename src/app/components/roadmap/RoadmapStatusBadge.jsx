const statusConfig = {
  completed: {
    label: "Completed",
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotClasses: "bg-emerald-500",
  },
  active: {
    label: "Active",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
    dotClasses: "bg-blue-500",
  },
  locked: {
    label: "Locked",
    classes: "bg-gray-50 text-gray-500 border-gray-200",
    dotClasses: "bg-gray-400",
  },
};

export default function RoadmapStatusBadge({ status, size = "sm" }) {
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
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClasses}`} />
      {config.label}
    </span>
  );
}
