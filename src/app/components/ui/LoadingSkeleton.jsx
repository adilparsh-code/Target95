/**
 * A collection of loading skeleton components for displaying placeholder content.
 * These components show animated placeholder shapes while the actual content is loading.
 * They are built using primitive components `SkeletonLine` and `SkeletonBlock`.
 */

// Primitive Components

/**
 * A single-line skeleton placeholder.
 */
function SkeletonLine({ width = "100%", className = "" }) {
  return (
    <div
      className={`h-4 bg-muted rounded animate-pulse ${className}`}
      style={{ width }}
      aria-hidden="true"
    />
  );
}

/**
 * A block-level skeleton placeholder.
 */
function SkeletonBlock({ width = "100%", height = "1rem", className = "" }) {
  return (
    <div
      className={`bg-muted rounded animate-pulse ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

// Composite Skeletons

/**
 * A skeleton placeholder for a card component.
 */
export function CardSkeleton({ rows = 1 }) {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="mt-3 h-8 w-2/3 rounded bg-muted" />
          <div className="mt-2 h-4 w-full rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

/**
 * A skeleton placeholder for a simple statistics card.
 */
export function StatsCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="h-3 w-1/2 rounded bg-muted" />
      <div className="mt-3 h-8 w-1/3 rounded bg-muted" />
    </div>
  );
}

/**
 * A skeleton placeholder for a list of items.
 */
export function ListSkeleton({ rows = 3 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-muted" />
      ))}
    </div>
  );
}

/**
 * A skeleton placeholder for a grid of cards, typically used in admin dashboards.
 */
export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Loading cards">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-4 shadow-sm">
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

/**
 * A skeleton placeholder for a grid of statistics cards.
 */
export function StatsGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Loading stats">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-4 shadow-sm">
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
 * A skeleton placeholder for a table row.
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
 * A skeleton placeholder for a full data table.
 */
export function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm" aria-label="Loading table">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <SkeletonLine width="70px" className="h-3" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Chapter Card skeleton - for chapter catalog cards
 */
export function ChapterCardSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading chapters">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm animate-pulse">
          {/* Image placeholder */}
          <div className="h-40 bg-muted" />
          <div className="p-5">
            <SkeletonBlock width="70%" height="1.25rem" className="mb-3" />
            <SkeletonBlock width="100%" height="0.875rem" className="mb-2" />
            <SkeletonBlock width="85%" height="0.875rem" className="mb-4" />
            <div className="flex items-center justify-between">
              <SkeletonBlock width="60px" height="1.5rem" className="rounded-full" />
              <SkeletonBlock width="100px" height="0.75rem" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Question Card skeleton - for question list/grid cards
 */
export function QuestionCardSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4" aria-label="Loading questions">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-5 shadow-sm animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <SkeletonBlock width="40px" height="40px" className="rounded-lg" />
              <div>
                <SkeletonBlock width="250px" height="1rem" className="mb-2" />
                <SkeletonBlock width="120px" height="0.75rem" />
              </div>
            </div>
            <SkeletonBlock width="60px" height="1.5rem" className="rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[1,2,3,4].map((j) => (
              <SkeletonBlock key={j} width="100%" height="2.5rem" className="rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Dashboard Cards skeleton - for main dashboard overview cards
 */
export function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Loading dashboard">
      {[1,2,3,4].map((i) => (
        <div key={i} className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border p-6 shadow-sm animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <SkeletonBlock width="50px" height="50px" className="rounded-xl" />
            <SkeletonBlock width="40px" height="20px" className="rounded-full" />
          </div>
          <SkeletonBlock width="70%" height="1.75rem" className="mb-2" />
          <SkeletonBlock width="85%" height="0.875rem" />
        </div>
      ))}
    </div>
  );
}

/**
 * Search Results skeleton - for search result list items
 */
export function SearchResultsSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3" aria-label="Loading search results">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card animate-pulse">
          <SkeletonBlock width="48px" height="48px" className="rounded-xl" />
          <div className="flex-1">
            <SkeletonBlock width="60%" height="1rem" className="mb-2" />
            <SkeletonBlock width="40%" height="0.75rem" />
          </div>
          <SkeletonBlock width="80px" height="2rem" className="rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export { SkeletonLine, SkeletonBlock, TableRowSkeleton };