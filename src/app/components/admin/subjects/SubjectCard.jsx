"use client";

import StatusBadge from "../StatusBadge";
import AdminCard from "../AdminCard";

const colorMap = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function SubjectCard({ subject, onEdit, onDelete, onView }) {
  const badgeColor = colorMap[subject.color] || colorMap.blue;

  return (
    <AdminCard className="hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${badgeColor}`}>
            {subject.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{subject.name}</h3>
            <p className="text-sm text-gray-500">
              {subject.code} · Class {subject.class} · {subject.grade}
            </p>
          </div>
        </div>
        <StatusBadge status={subject.status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{subject.chapters}</p>
          <p className="text-xs text-gray-500">Chapters</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{subject.questions}</p>
          <p className="text-xs text-gray-500">Questions</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{subject.students}</p>
          <p className="text-xs text-gray-500">Students</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>Updated {subject.updatedAt}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onView?.(subject)}
            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium"
          >
            View
          </button>
          <button
            onClick={() => onEdit?.(subject)}
            className="px-3 py-1 text-amber-600 hover:bg-amber-50 rounded-md transition-colors font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(subject)}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </AdminCard>
  );
}