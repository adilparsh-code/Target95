/**
 * Loading skeleton components for data table and cards.
 * Shows animated placeholder shapes while content loads.
 */

function SkeletonLine({ width = "100%", className = "" }) {
  return (
    <div
      className={`h-4 bg-gray-200 rounded animate-pulse ${className}`}
      style={{ width }}
      aria-hidden="true"
    />
  );
}

function SkeletonBlock({ width = "100%", height = "1rem", className = "" }) {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

/**
 * Table row skeleton for loading state.
 * @param {Object} props
 * @param {number} props.columns - Number of columns (default 6)
 */
function TableRowSkeleton({ columns = 6 }) {
  return (
    <tr aria-hidden="true">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <SkeletonLine width={i === 0 ? "60px" : i === 1 ? "180px" : "80px"} />
        </td>
      ))}
    </tr>
  );
}

/**
 * Full table loading skeleton.
 * @param {Object} props
 * @param {number} props.rows - Number of skeleton rows (default 5)
 * @param {number} props.columns - Number of columns (default 6)
 */
export function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm" aria-label="Loading table">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <SkeletonLine width="70px" className="h-3" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Stats card skeleton.
 * @param {Object} props
 * @param {number} props.count - Number of stat cards (default 4)
 */
export function StatsCardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Loading stats">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <SkeletonBlock width="80px" height="1rem" />
            <SkeletonBlock width="2.5rem" height="2.5rem" className="rounded-lg" />
          </div>
          <SkeletonBlock width="60px" height="1.75rem" className="mb-2" />
          <SkeletonBlock width="100px" height="0.75rem" />
        </div>
      ))}
    </div>
  );
}

/**
 * Card grid skeleton.
 * @param {Object} props
 * @param {number} props.count - Number of skeleton cards (default 6)
 */
export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Loading cards">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <SkeletonBlock width="60px" height="0.75rem" />
            <SkeletonBlock width="70px" height="1.25rem" className="rounded-full" />
          </div>
          <SkeletonBlock width="100%" height="1rem" className="mb-2" />
          <SkeletonBlock width="80%" height="0.75rem" className="mb-3" />
          <div className="flex gap-2">
            <SkeletonBlock width="50px" height="1.25rem" className="rounded" />
            <SkeletonBlock width="50px" height="1.25rem" className="rounded" />
          </div>
          <SkeletonBlock width="100px" height="0.75rem" className="mt-3" />
        </div>
      ))}
    </div>
  );
}

export { SkeletonLine, SkeletonBlock, TableRowSkeleton };