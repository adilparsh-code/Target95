"use client";

export default function TestToolbar({
  onAddNew,
  onToggleFilters,
  showFilters = false,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
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
      </div>

      <button
        onClick={onAddNew}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <span>+</span>
        <span>Create Test</span>
      </button>
    </div>
  );
}