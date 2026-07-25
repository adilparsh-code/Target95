const variantStyles = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-300 text-gray-700",
};

export default function Badge({ className, variant = "default", ...props }) {
  const variantClass = variantStyles[variant] || variantStyles.default;

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${variantClass} ${className}`}
      {...props}
    />
  );
}

export function StatusBadge({ status, size = "default" }) {
  const statusStyles = {
    completed: "bg-green-100 text-green-700 border-green-200",
    active: "bg-blue-100 text-blue-700 border-blue-200",
    locked: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const sizeStyles = {
    default: "px-2.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-[10px]",
  };

  const styleClass = statusStyles[status] || statusStyles.locked;
  const sizeClass = sizeStyles[size] || sizeStyles.default;

  const labels = {
    completed: "Completed",
    active: "In Progress",
    locked: "Locked",
  };

  return (
    <span className={`rounded-full border font-semibold ${styleClass} ${sizeClass}`}>
      {labels[status] || "Unknown"}
    </span>
  );
}