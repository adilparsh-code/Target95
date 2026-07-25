"use client";

import FilterDropdown from "../FilterDropdown";

export default function NotesFilters({ filters = {}, onFilterChange, onClear }) {
  const hasActiveFilters = Object.values(filters).some((v) => v && (Array.isArray(v) ? v.length > 0 : true));

  const subjectOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Biology", label: "Biology" },
  ];

  const classOptions = [
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ];

  const chapterOptions = [
    { value: "Chapter 1", label: "Chapter 1" },
    { value: "Chapter 2", label: "Chapter 2" },
    { value: "Chapter 3", label: "Chapter 3" },
    { value: "Chapter 4", label: "Chapter 4" },
    { value: "Chapter 5", label: "Chapter 5" },
    { value: "Chapter 6", label: "Chapter 6" },
    { value: "Chapter 7", label: "Chapter 7" },
    { value: "Chapter 8", label: "Chapter 8" },
    { value: "Chapter 9", label: "Chapter 9" },
  ];

  const typeOptions = [
    { value: "PDF", label: "PDF" },
    { value: "Video", label: "Video" },
    { value: "Document", label: "Document" },
  ];

  const statusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending Review" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button onClick={onClear} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Clear all
          </button>
        )}
      </div>

      <FilterDropdown label="Subject" options={subjectOptions} value={filters.subject} onChange={(v) => onFilterChange?.("subject", v)} />
      <FilterDropdown label="Class" options={classOptions} value={filters.class} onChange={(v) => onFilterChange?.("class", v)} />
      <FilterDropdown label="Chapter" options={chapterOptions} value={filters.chapter} onChange={(v) => onFilterChange?.("chapter", v)} />
      <FilterDropdown label="Type" options={typeOptions} value={filters.type} onChange={(v) => onFilterChange?.("type", v)} />
      <FilterDropdown label="Status" options={statusOptions} value={filters.status} onChange={(v) => onFilterChange?.("status", v)} />

      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">Active filters</p>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(filters).map(([key, val]) => {
              if (!val || (Array.isArray(val) && val.length === 0)) return null;
              const values = Array.isArray(val) ? val : [val];
              return values.map((v) => (
                <span key={`${key}-${v}`} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                  {v}
                  <button onClick={() => {
                    const current = Array.isArray(val) ? val : [val];
                    const next = current.filter((x) => x !== v);
                    onFilterChange?.(key, next.length === 0 ? (Array.isArray(val) ? [] : "") : next);
                  }} className="hover:text-blue-900" aria-label={`Remove ${v} filter`}>×</button>
                </span>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
}