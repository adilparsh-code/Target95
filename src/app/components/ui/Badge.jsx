"use client";

/**
 * Badge — Reusable badge component for difficulty, category, status, etc.
 * Variants: default, success, warning, danger, info, purple, orange, pink
 */

const variants = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  pink: "bg-pink-100 text-pink-700",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon,
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${
        variants[variant] || variants.default
      } ${sizes[size] || sizes.md} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty, size = "md" }) {
  const map = {
    easy: { variant: "success", label: "Easy" },
    medium: { variant: "warning", label: "Medium" },
    hard: { variant: "danger", label: "Hard" },
  };
  const config = map[difficulty?.toLowerCase()] || map.easy;
  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
}

export function CategoryBadge({ category, size = "md" }) {
  const map = {
    "icse-class-9": { variant: "purple", label: "ICSE Class 9" },
    "icse-class-10": { variant: "info", label: "ICSE Class 10" },
    "isc-class-11": { variant: "orange", label: "ISC Class 11" },
    "isc-class-12": { variant: "pink", label: "ISC Class 12" },
  };
  const config = map[category] || { variant: "default", label: category };
  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
}

export function StatusBadge({ status, size = "md" }) {
  const map = {
    completed: { variant: "success", label: "Completed" },
    active: { variant: "info", label: "Active" },
    locked: { variant: "default", label: "Locked" },
    studying: { variant: "warning", label: "Studying" },
    "not started": { variant: "default", label: "Not Started" },
  };
  const config =
    map[status?.toLowerCase()] || { variant: "default", label: status };
  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
}