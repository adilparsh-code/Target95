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
            <label htmlFor={filter.id} className="text-sm font-semibold text-foreground whitespace-nowrap">
              {filter.label}
            </label>
          )}
          <select
            id={filter.id}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="rounded-xl border border-border bg-card p-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
      className="w-full rounded-xl border border-border bg-card p-4 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      aria-label={placeholder}
    />
  );
}