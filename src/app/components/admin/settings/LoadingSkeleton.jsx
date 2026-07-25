"use client";

export default function LoadingSkeleton({ rows = 4, type = "line" }) {
  if (type === "card") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3">
          <div className="space-y-2 flex-1 pr-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
          <div className="w-11 h-6 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}