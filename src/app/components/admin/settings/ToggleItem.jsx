"use client";

export default function ToggleItem({ label, description, enabled, onChange, id, color = "emerald" }) {
  const colorClasses = {
    emerald: enabled ? "bg-emerald-500" : "bg-gray-200",
    blue: enabled ? "bg-blue-500" : "bg-gray-200",
    red: enabled ? "bg-red-500" : "bg-gray-200",
    amber: enabled ? "bg-amber-500" : "bg-gray-200",
  };

  const toggleId = id || `toggle-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex items-center justify-between py-3 group">
      <div className="flex-1 pr-4">
        <label htmlFor={toggleId} className="text-sm font-medium text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors">
          {label}
        </label>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        id={toggleId}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange?.(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shrink-0 ${colorClasses[color] || colorClasses.emerald}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}