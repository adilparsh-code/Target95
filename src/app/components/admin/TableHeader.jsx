"use client";

/**
 * Reusable table column header with sort indicators.
 * @param {Object} props
 * @param {string} props.label - Display label
 * @param {string} props.sortKey - Column key for sorting
 * @param {string|null} props.activeSortKey - Currently active sort key
 * @param {'asc'|'desc'} props.sortDir - Current sort direction
 * @param {Function} props.onSort - Sort handler
 * @param {boolean} props.sortable - Whether column is sortable (default true)
 * @param {string} props.className - Additional classes
 */
export default function TableHeader({
  label,
  sortKey,
  activeSortKey,
  sortDir,
  onSort,
  sortable = true,
  className = "",
}) {
  const isActive = activeSortKey === sortKey;

  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
        sortable ? "cursor-pointer select-none hover:text-gray-700" : ""
      } ${className}`}
      onClick={() => sortable && onSort?.(sortKey)}
      scope="col"
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        {sortable && (
          <span className={`inline-flex flex-col leading-none transition-colors ${
            isActive ? "text-blue-600" : "text-gray-300"
          }`}>
            <svg className={`w-3 h-1.5 ${isActive && sortDir === "asc" ? "text-blue-600" : ""}`} viewBox="0 0 10 6" fill="currentColor">
              <path d="M5 0L10 6H0z" />
            </svg>
            <svg className={`w-3 h-1.5 ${isActive && sortDir === "desc" ? "text-blue-600" : ""}`} viewBox="0 0 10 6" fill="currentColor">
              <path d="M5 6L0 0h10z" />
            </svg>
          </span>
        )}
      </span>
    </th>
  );
}