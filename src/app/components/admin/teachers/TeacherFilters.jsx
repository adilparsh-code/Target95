"use client";

import { teacherFilterOptions } from "@/app/data/admin/mockTeachers";

export default function TeacherFilters({ filters, onFilterChange, onClear }) {
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
        {hasFilters && (
          <button onClick={onClear} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Status filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</label>
        <div className="space-y-1">
          {teacherFilterOptions.statuses.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange("status", filters.status === opt.value ? "" : opt.value)}
              className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.status === opt.value
                  ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subject filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</label>
        <div className="space-y-1">
          {teacherFilterOptions.subjects.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange("subject", filters.subject === opt.value ? "" : opt.value)}
              className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.subject === opt.value
                  ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Experience filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</label>
        <div className="space-y-1">
          {teacherFilterOptions.experienceRanges.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange("experience", filters.experience === opt.value ? "" : opt.value)}
              className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.experience === opt.value
                  ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* School filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">School</label>
        <div className="space-y-1">
          {teacherFilterOptions.schools.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange("school", filters.school === opt.value ? "" : opt.value)}
              className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.school === opt.value
                  ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}