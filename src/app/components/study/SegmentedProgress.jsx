"use client";

export default function SegmentedProgress({ status, percentage }) {
  const segments = [
    { id: 1, status: "Not Started" },
    { id: 2, status: "Studying" },
    { id: 3, status: "Completed" },
  ];

  const getSegmentClass = (segmentStatus) => {
    if (status === "Completed" || (status === "Studying" && segmentStatus !== "Completed")) {
      return "bg-blue-600";
    }
    if (status === segmentStatus) {
      return "bg-blue-600";
    }
    return "bg-gray-200";
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex w-full space-x-1">
          {segments.map((segment) => (
            <div key={segment.id} className="h-2 flex-1 rounded-full">
              <div
                className={`h-full rounded-full ${getSegmentClass(segment.status)}`}
              />
            </div>
          ))}
        </div>
        <span className="ml-3 text-sm font-semibold text-gray-900">{percentage}%</span>
      </div>
    </div>
  );
}
