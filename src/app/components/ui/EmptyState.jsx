"use client";

/**
 * EmptyState — Standardized empty state component.
 */

export default function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description = "",
  action,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
      <p className="mb-4 text-4xl">{icon}</p>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-gray-700 max-w-md mx-auto">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}