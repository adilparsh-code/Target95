"use client";

export default function SectionHeader({ icon, title, description, action }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}