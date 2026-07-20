"use client";

export default function EmptyState({ icon = "📭", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
      {description && <p className="text-sm text-gray-500 text-center max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}