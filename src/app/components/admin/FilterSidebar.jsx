"use client";

import FilterDropdown from "./FilterDropdown";

/**
 * Sidebar filter panel with collapsible filter groups.
 * @param {Object} props
 * @param {Object} props.filters - Current filter state { difficulty, class, subject, status, type }
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {boolean} props.isOpen - Sidebar open state
 * @param {Function} props.onClose - Close sidebar handler
 * @param {Function} props.onClear - Clear all filters handler
 */
export default function FilterSidebar({
  filters = {},
  onFilterChange,
  isOpen,
  onClose,
  onClear,
}) {
  const hasActiveFilters =
    filters.difficulty || filters.class || filters.subject ||
    filters.status || filters.type ||
    (filters.difficulty?.length || filters.class?.length || filters.subject?.length ||
     filters.status?.length || filters.type?.length);

  const difficultyOptions = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const classOptions = [
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ];

  const subjectOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Biology", label: "Biology" },
  ];

  const typeOptions = [
    { value: "Theory", label: "Theory" },
    { value: "MCQ", label: "MCQ" },
    { value: "Coding", label: "Coding" },
  ];

  const statusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending Review" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-4 left-0 z-40 h-full lg:h-auto w-72 lg:w-64 bg-white lg:bg-gray-50/50 border-r lg:border border-gray-200 rounded-none lg:rounded-xl shadow-lg lg:shadow-sm p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } overflow-y-auto`}
        aria-label="Filter panel"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 lg:hidden"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <FilterDropdown
            label="Subject"
            options={subjectOptions}
            value={filters.subject}
            onChange={(v) => onFilterChange?.("subject", v)}
          />

          <FilterDropdown
            label="Class"
            options={classOptions}
            value={filters.class}
            onChange={(v) => onFilterChange?.("class", v)}
          />

          <FilterDropdown
            label="Difficulty"
            options={difficultyOptions}
            value={filters.difficulty}
            onChange={(v) => onFilterChange?.("difficulty", v)}
          />

          <FilterDropdown
            label="Question Type"
            options={typeOptions}
            value={filters.type}
            onChange={(v) => onFilterChange?.("type", v)}
          />

          <FilterDropdown
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(v) => onFilterChange?.("status", v)}
          />
        </div>

        {/* Active filter summary */}
        {hasActiveFilters && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Active filters</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(filters).map(([key, val]) => {
                if (!val || (Array.isArray(val) && val.length === 0)) return null;
                const values = Array.isArray(val) ? val : [val];
                return values.map((v) => (
                  <span
                    key={`${key}-${v}`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                  >
                    {v}
                    <button
                      onClick={() => {
                        const current = Array.isArray(val) ? val : [val];
                        const next = current.filter((x) => x !== v);
                        onFilterChange?.(key, next.length === 0 ? (Array.isArray(val) ? [] : "") : next);
                      }}
                      className="hover:text-blue-900"
                      aria-label={`Remove ${v} filter`}
                    >
                      ×
                    </button>
                  </span>
                ));
              })}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}