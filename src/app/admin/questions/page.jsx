"use client";

import { useState, useMemo, useCallback } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import StatusBadge from "@/app/components/admin/StatusBadge";
import AdminCard from "@/app/components/admin/AdminCard";
import DashboardCard from "@/app/components/admin/DashboardCard";
import EmptyState from "@/app/components/admin/EmptyState";
import SearchInput from "@/app/components/admin/SearchInput";
import FilterSidebar from "@/app/components/admin/FilterSidebar";
import Pagination from "@/app/components/admin/Pagination";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import QuestionPreview from "@/app/components/admin/QuestionPreview";
import QuestionCard from "@/app/components/admin/QuestionCard";
import ActionMenu from "@/app/components/admin/ActionMenu";
import QuestionTypeBadge from "@/app/components/admin/QuestionTypeBadge";
import { TableSkeleton, StatsCardSkeleton, CardGridSkeleton } from "@/app/components/admin/LoadingSkeleton";
import DifficultyBadge from "@/app/components/DifficultyBadge";

// ─── Placeholder Data ───────────────────────────────────────────────────────
const placeholderQuestions = [
  { id: "Q001", subject: "Computer Science", chapter: "Chapter 1 — Fundamentals", difficulty: "Easy", type: "Theory", marks: 5, status: "published", updatedDate: "2026-07-15" },
  { id: "Q002", subject: "Computer Science", chapter: "Chapter 1 — Fundamentals", difficulty: "Easy", type: "MCQ", marks: 2, status: "published", updatedDate: "2026-07-14" },
  { id: "Q003", subject: "Computer Science", chapter: "Chapter 2 — Operators", difficulty: "Medium", type: "Theory", marks: 5, status: "draft", updatedDate: "2026-07-10" },
  { id: "Q004", subject: "Computer Science", chapter: "Chapter 2 — Operators", difficulty: "Hard", type: "MCQ", marks: 2, status: "published", updatedDate: "2026-07-12" },
  { id: "Q005", subject: "Computer Science", chapter: "Chapter 3 — Conditionals", difficulty: "Medium", type: "Theory", marks: 5, status: "published", updatedDate: "2026-07-08" },
  { id: "Q006", subject: "Computer Science", chapter: "Chapter 3 — Conditionals", difficulty: "Easy", type: "MCQ", marks: 2, status: "archived", updatedDate: "2026-06-20" },
  { id: "Q007", subject: "Computer Science", chapter: "Chapter 4 — Loops", difficulty: "Hard", type: "Theory", marks: 5, status: "published", updatedDate: "2026-07-05" },
  { id: "Q008", subject: "Computer Science", chapter: "Chapter 4 — Loops", difficulty: "Medium", type: "MCQ", marks: 2, status: "draft", updatedDate: "2026-07-01" },
  { id: "Q009", subject: "Computer Science", chapter: "Chapter 5 — Methods", difficulty: "Medium", type: "Theory", marks: 5, status: "published", updatedDate: "2026-06-28" },
  { id: "Q010", subject: "Computer Science", chapter: "Chapter 5 — Methods", difficulty: "Hard", type: "MCQ", marks: 2, status: "published", updatedDate: "2026-06-25" },
  { id: "Q011", subject: "Computer Science", chapter: "Chapter 6 — Arrays", difficulty: "Easy", type: "Theory", marks: 5, status: "published", updatedDate: "2026-06-22" },
  { id: "Q012", subject: "Computer Science", chapter: "Chapter 6 — Arrays", difficulty: "Medium", type: "MCQ", marks: 2, status: "pending", updatedDate: "2026-07-16" },
  { id: "Q013", subject: "Computer Science", chapter: "Chapter 7 — Constructors", difficulty: "Hard", type: "Theory", marks: 5, status: "draft", updatedDate: "2026-07-18" },
  { id: "Q014", subject: "Computer Science", chapter: "Chapter 7 — Constructors", difficulty: "Easy", type: "MCQ", marks: 2, status: "published", updatedDate: "2026-07-17" },
  { id: "Q015", subject: "Computer Science", chapter: "Chapter 8 — Strings", difficulty: "Medium", type: "Theory", marks: 5, status: "published", updatedDate: "2026-07-13" },
  { id: "Q016", subject: "Computer Science", chapter: "Chapter 8 — Strings", difficulty: "Hard", type: "MCQ", marks: 2, status: "pending", updatedDate: "2026-07-11" },
  { id: "Q017", subject: "Computer Science", chapter: "Chapter 9 — Inheritance", difficulty: "Hard", type: "Theory", marks: 5, status: "published", updatedDate: "2026-07-09" },
  { id: "Q018", subject: "Computer Science", chapter: "Chapter 9 — Inheritance", difficulty: "Medium", type: "MCQ", marks: 2, status: "archived", updatedDate: "2026-06-15" },
  { id: "Q019", subject: "Computer Science", chapter: "Chapter 1 — Fundamentals", difficulty: "Easy", type: "Coding", marks: 10, status: "draft", updatedDate: "2026-07-18" },
  { id: "Q020", subject: "Computer Science", chapter: "Chapter 4 — Loops", difficulty: "Medium", type: "Coding", marks: 10, status: "published", updatedDate: "2026-07-16" },
  { id: "Q021", subject: "Computer Science", chapter: "Chapter 6 — Arrays", difficulty: "Hard", type: "Coding", marks: 10, status: "published", updatedDate: "2026-07-14" },
  { id: "Q022", subject: "Computer Science", chapter: "Chapter 5 — Methods", difficulty: "Easy", type: "Theory", marks: 3, status: "published", updatedDate: "2026-07-12" },
  { id: "Q023", subject: "Computer Science", chapter: "Chapter 3 — Conditionals", difficulty: "Hard", type: "MCQ", marks: 2, status: "draft", updatedDate: "2026-07-10" },
  { id: "Q024", subject: "Computer Science", chapter: "Chapter 2 — Operators", difficulty: "Easy", type: "Theory", marks: 3, status: "published", updatedDate: "2026-07-08" },
];

const PAGE_SIZE = 10;

// ─── Column Definitions ─────────────────────────────────────────────────────
const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "subject", label: "Subject", sortable: true },
  { key: "chapter", label: "Chapter", sortable: true },
  { key: "difficulty", label: "Difficulty", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "marks", label: "Marks", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "updatedDate", label: "Updated", sortable: true },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function matchesFilter(value, filter) {
  if (!filter || (Array.isArray(filter) && filter.length === 0)) return true;
  if (Array.isArray(filter)) return filter.includes(value);
  return value === filter;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function AdminQuestionsPage() {
  // View state
  const [view, setView] = useState("table");
  const [isLoading, setIsLoading] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    difficulty: "",
    class: "",
    subject: "",
    status: "",
    type: "",
  });

  // Sorting
  const [sortKey, setSortKey] = useState("updatedDate");
  const [sortDir, setSortDir] = useState("desc");

  // Pagination
  const [page, setPage] = useState(0);

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Action menu
  const [openMenuId, setOpenMenuId] = useState(null);

  // Preview modal
  const [previewQuestion, setPreviewQuestion] = useState(null);

  // Confirm dialog
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", message: "", variant: "primary", onConfirm: () => {} });

  // ── Filtered & Sorted Data ──────────────────────────────────────────────
  const filteredData = useMemo(() => {
    let result = [...placeholderQuestions];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (qItem) =>
          qItem.id.toLowerCase().includes(q) ||
          qItem.subject.toLowerCase().includes(q) ||
          qItem.chapter.toLowerCase().includes(q) ||
          qItem.type.toLowerCase().includes(q) ||
          qItem.difficulty.toLowerCase().includes(q) ||
          qItem.status.toLowerCase().includes(q)
      );
    }

    // Difficulty filter
    if (filters.difficulty) {
      result = result.filter((qItem) => matchesFilter(qItem.difficulty, filters.difficulty));
    }

    // Subject filter
    if (filters.subject) {
      result = result.filter((qItem) => matchesFilter(qItem.subject, filters.subject));
    }

    // Type filter
    if (filters.type) {
      result = result.filter((qItem) => matchesFilter(qItem.type, filters.type));
    }

    // Status filter
    if (filters.status) {
      result = result.filter((qItem) => matchesFilter(qItem.status, filters.status));
    }

    return result;
  }, [search, filters]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredData, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pagedData = sortedData.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  // ── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: placeholderQuestions.length,
    published: placeholderQuestions.filter((q) => q.status === "published").length,
    draft: placeholderQuestions.filter((q) => q.status === "draft").length,
    pending: placeholderQuestions.filter((q) => q.status === "pending").length,
    filtered: filteredData.length,
  }), [filteredData]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleSort = useCallback((key) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return prev;
      }
      setSortDir("asc");
      return key;
    });
    setPage(0);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ difficulty: "", class: "", subject: "", status: "", type: "" });
    setSearch("");
    setPage(0);
  }, []);

  const handleSelectAll = useCallback((checked) => {
    if (checked) {
      setSelectedIds(new Set(pagedData.map((q) => q.id)));
    } else {
      setSelectedIds(new Set());
    }
  }, [pagedData]);

  const handleSelectOne = useCallback((id, checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const handleBulkDelete = useCallback(() => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Questions",
      message: `Are you sure you want to delete ${selectedIds.size} question(s)? This action cannot be undone.`,
      variant: "danger",
      onConfirm: () => {
        console.log("Bulk delete:", Array.from(selectedIds));
        setSelectedIds(new Set());
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  }, [selectedIds]);

  const handleRowAction = useCallback((action, row) => {
    setOpenMenuId(null);
    switch (action) {
      case "view":
        setPreviewQuestion(row);
        break;
      case "edit":
        console.log("Edit question:", row.id);
        break;
      case "delete":
        setConfirmDialog({
          isOpen: true,
          title: "Delete Question",
          message: `Are you sure you want to delete question ${row.id}? This action cannot be undone.`,
          variant: "danger",
          onConfirm: () => {
            console.log("Delete question:", row.id);
            setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          },
        });
        break;
      default:
        break;
    }
  }, []);

  // ── Render Helpers ──────────────────────────────────────────────────────
  const renderDifficulty = (val) => <DifficultyBadge difficulty={val} />;
  const renderStatus = (val) => <StatusBadge status={val} />;
  const renderMarks = (val) => (
    <span className="font-mono text-sm font-medium text-gray-700">{val}</span>
  );
  const renderType = (val) => (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
      val === "Theory" ? "bg-purple-50 text-purple-700 ring-1 ring-purple-200" :
      val === "MCQ" ? "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200" :
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
    }`}>
      {val}
    </span>
  );
  const renderDate = (val) => (
    <span className="text-sm text-gray-500">{val}</span>
  );

  const renderActions = (row) => (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(openMenuId === row.id ? null : row.id);
        }}
        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={`Actions for ${row.id}`}
        aria-haspopup="true"
        aria-expanded={openMenuId === row.id}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
        </svg>
      </button>

      {openMenuId === row.id && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
          <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-white rounded-xl border border-gray-200 shadow-lg py-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <button
              onClick={() => handleRowAction("view", row)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </button>
            <button
              onClick={() => handleRowAction("edit", row)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => handleRowAction("delete", row)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderCheckbox = (row) => (
    <input
      type="checkbox"
      checked={selectedIds.has(row.id)}
      onChange={(e) => handleSelectOne(row.id, e.target.checked)}
      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      aria-label={`Select ${row.id}`}
    />
  );

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {isLoading ? (
        <StatsCardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Questions" value={stats.total} icon="❓" color="blue" />
          <DashboardCard title="Published" value={stats.published} icon="✅" color="emerald" />
          <DashboardCard title="Drafts" value={stats.draft} icon="✏️" color="amber" />
          <DashboardCard title="Pending Review" value={stats.pending} icon="⏳" color="violet" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle
          title="All Questions"
          subtitle={`${stats.filtered} of ${stats.total} questions`}
        />
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Filter toggle */}
          <button
            onClick={() => setFilterSidebarOpen((prev) => !prev)}
            className={`p-2 rounded-lg border transition-colors ${
              filterSidebarOpen
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
            aria-label="Toggle filters"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>

          {/* View toggle */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setView("table")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                view === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                view === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Grid
            </button>
          </div>

          {/* Add button */}
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            + Add Question
          </button>
        </div>
      </div>

      {/* Search + Bulk Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search by ID, subject, chapter, type..."
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(0);
            }}
            onClear={() => {
              setSearch("");
              setPage(0);
            }}
          />
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <span className="text-blue-700 font-medium">{selectedIds.size} selected</span>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-blue-500 hover:text-blue-700 ml-1"
            >
              Deselect
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleBulkDelete}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          isOpen={filterSidebarOpen}
          onClose={() => setFilterSidebarOpen(false)}
          onClear={handleClearFilters}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <TableSkeleton rows={5} columns={columns.length + 2} />
          ) : sortedData.length === 0 ? (
            <AdminCard>
              <EmptyState
                icon="🔍"
                title="No questions found"
                description={
                  search || Object.values(filters).some((v) => v)
                    ? "Try adjusting your search or filters."
                    : "No questions have been added yet."
                }
                action={
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    + Add Your First Question
                  </button>
                }
              />
            </AdminCard>
          ) : view === "table" ? (
            <>
              {/* Table View */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={pagedData.length > 0 && pagedData.every((q) => selectedIds.has(q.id))}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          aria-label="Select all"
                        />
                      </th>
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                            col.sortable !== false ? "cursor-pointer select-none hover:text-gray-700" : ""
                          }`}
                          onClick={() => col.sortable !== false && handleSort(col.key)}
                          scope="col"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {col.label}
                            {sortKey === col.key && (
                              <span className="text-blue-600 text-xs">
                                {sortDir === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </span>
                        </th>
                      ))}
                      <th className="px-4 py-3 w-16">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pagedData.map((row) => (
                      <tr
                        key={row.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          selectedIds.has(row.id) ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">{renderCheckbox(row)}</td>
                        <td className="px-4 py-3 font-mono text-xs font-medium text-gray-500">
                          {row.id}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{row.subject}</td>
                        <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate" title={row.chapter}>
                          {row.chapter}
                        </td>
                        <td className="px-4 py-3">{renderDifficulty(row.difficulty)}</td>
                        <td className="px-4 py-3">{renderType(row.type)}</td>
                        <td className="px-4 py-3">{renderMarks(row.marks)}</td>
                        <td className="px-4 py-3">{renderStatus(row.status)}</td>
                        <td className="px-4 py-3">{renderDate(row.updatedDate)}</td>
                        <td className="px-4 py-3">{renderActions(row)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={sortedData.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            </>
          ) : (
            <>
              {/* Grid View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pagedData.map((q) => (
                  <AdminCard key={q.id}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(q.id)}
                            onChange={(e) => handleSelectOne(q.id, e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            aria-label={`Select ${q.id}`}
                          />
                          <span className="text-xs font-mono text-gray-400">{q.id}</span>
                        </div>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === q.id ? null : q.id);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={`Actions for ${q.id}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                            </svg>
                          </button>
                          {openMenuId === q.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                              <div className="absolute right-0 top-full mt-1 z-20 w-40 bg-white rounded-xl border border-gray-200 shadow-lg py-1">
                                <button onClick={() => handleRowAction("view", q)} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">View</button>
                                <button onClick={() => handleRowAction("edit", q)} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                                <div className="border-t border-gray-100 my-1" />
                                <button onClick={() => handleRowAction("delete", q)} className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">{q.subject}</p>
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{q.chapter}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {renderDifficulty(q.difficulty)}
                        {renderType(q.type)}
                        <span className="text-xs text-gray-400 font-mono">{q.marks} marks</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {renderStatus(q.status)}
                        <span className="text-xs text-gray-400">{q.updatedDate}</span>
                      </div>
                    </div>
                  </AdminCard>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={sortedData.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Question Preview Modal */}
      <QuestionPreview
        isOpen={!!previewQuestion}
        question={previewQuestion}
        onClose={() => setPreviewQuestion(null)}
      />
    </div>
  );
}