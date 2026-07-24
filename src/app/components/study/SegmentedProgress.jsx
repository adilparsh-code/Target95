"use client";

export default function SegmentedProgress({ status }) {
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
    <div className="flex w-full space-x-1">
      {segments.map((segment) => (
        <div key={segment.id} className="h-2 flex-1 rounded-full">
          <div
            className={`h-full rounded-full ${getSegmentClass(segment.status)}`}
          />
        </div>
      ))}
    </div>
  );
}