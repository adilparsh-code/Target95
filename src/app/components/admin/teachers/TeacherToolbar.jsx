"use client";

export default function TeacherToolbar({
  viewMode,
  onViewModeChange,
  onAddTeacher,
  onToggleFilters,
  showFilters = false,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {/* Filter toggle */}
        <button
          onClick={onToggleFilters}
          className={`p-2 border rounded-lg transition-colors ${
            showFilters
              ? "bg-blue-50 border-blue-200 text-blue-600"
              : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Toggle filters"
          aria-pressed={showFilters}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>

        {/* View toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => onViewModeChange?.("grid")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => onViewModeChange?.("table")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      <button
        onClick={onAddTeacher}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <span>+</span>
        <span>Add Teacher</span>
      </button>
    </div>
  );
}