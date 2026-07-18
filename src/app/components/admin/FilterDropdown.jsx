"use client";

/**
 * Reusable filter dropdown for the filter sidebar.
 * @param {Object} props
 * @param {string} props.label - Filter group label
 * @param {Array} props.options - Array of { value, label }
 * @param {string|string[]} props.value - Currently selected value(s)
 * @param {Function} props.onChange - Change handler (receives value)
 * @param {boolean} props.multi - Allow multiple selections (default false)
 * @param {string} props.className - Additional classes
 */
export default function FilterDropdown({
  label,
  options = [],
  value,
  onChange,
  multi = false,
  className = "",
}) {
  const handleToggle = (optValue) => {
    if (multi) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(optValue)
        ? current.filter((v) => v !== optValue)
        : [...current, optValue];
      onChange?.(next);
    } else {
      onChange?.(value === optValue ? "" : optValue);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="space-y-1">
        {options.map((opt) => {
          const isSelected = multi
            ? Array.isArray(value) && value.includes(opt.value)
            : value === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => handleToggle(opt.value)}
              className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                isSelected
                  ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              aria-pressed={isSelected}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}