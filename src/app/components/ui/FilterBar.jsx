"use client";

/**
 * FilterBar — Reusable filter bar with select dropdowns.
 * @param {Array} filters - Array of { id, label, options: [{ value, label }], value, onChange }
 */

export default function FilterBar({ filters = [], className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {filters.map((filter) => (
        <div key={filter.id} className="flex items-center gap-2">
          {filter.label && (
            <label htmlFor={filter.id} className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {filter.label}
            </label>
          )}
          <select
            id={filter.id}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-blue-600"
            aria-label={filter.label || filter.id}
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      aria-label={placeholder}
    />
  );
}