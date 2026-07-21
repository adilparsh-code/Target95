"use client";

export function CardSkeleton({ rows = 1 }) {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="mt-3 h-8 w-2/3 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-full rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="h-3 w-1/2 rounded bg-gray-200" />
      <div className="mt-3 h-8 w-1/3 rounded bg-gray-200" />
    </div>
  );
}

export function ListSkeleton({ rows = 3 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-gray-100" />
      ))}
    </div>
  );
}