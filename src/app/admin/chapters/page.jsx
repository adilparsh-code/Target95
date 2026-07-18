"use client";

import { useState, useMemo, useCallback } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import DashboardCard from "@/app/components/admin/DashboardCard";
import StatusBadge from "@/app/components/admin/StatusBadge";
import SearchInput from "@/app/components/admin/SearchInput";
import EmptyState from "@/app/components/admin/EmptyState";
import ChapterCard from "@/app/components/admin/ChapterCard";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/admin/LoadingSkeleton";

const placeholderChapters = [
  { id: 1, title: "Chapter 1 — Fundamentals", questions: 48, completedQuestions: 42, theoryCount: 20, mcqCount: 28, codingCount: 0, topics: ["Data Types", "Variables", "Classes"], status: "published", lastUpdated: "2026-07-15" },
  { id: 2, title: "Chapter 2 — Operators", questions: 36, completedQuestions: 30, theoryCount: 14, mcqCount: 22, codingCount: 0, topics: ["Arithmetic", "Logical", "Relational", "Bitwise"], status: "published", lastUpdated: "2026-07-12" },
  { id: 3, title: "Chapter 3 — Conditionals", questions: 42, completedQuestions: 25, theoryCount: 18, mcqCount: 24, codingCount: 0, topics: ["if-else", "switch", "ternary"], status: "published", lastUpdated: "2026-07-10" },
  { id: 4, title: "Chapter 4 — Loops", questions: 38, completedQuestions: 18, theoryCount: 16, mcqCount: 22, codingCount: 0, topics: ["for", "while", "do-while", "nested loops"], status: "published", lastUpdated: "2026-07-08" },
  { id: 5, title: "Chapter 5 — Methods", questions: 44, completedQuestions: 10, theoryCount: 20, mcqCount: 24, codingCount: 0, topics: ["definition", "parameters", "return", "overloading"], status: "published", lastUpdated: "2026-07-05" },
  { id: 6, title: "Chapter 6 — Arrays", questions: 40, completedQuestions: 5, theoryCount: 18, mcqCount: 22, codingCount: 0, topics: ["1D arrays", "2D arrays", "traversal"], status: "published", lastUpdated: "2026-07-01" },
  { id: 7, title: "Chapter 7 — String Handling", questions: 35, completedQuestions: 0, theoryCount: 16, mcqCount: 19, codingCount: 0, topics: ["String methods", "StringBuilder", "charAt"], status: "draft", lastUpdated: "2026-06-28" },
  { id: 8, title: "Chapter 8 — Constructors", questions: 30, completedQuestions: 0, theoryCount: 14, mcqCount: 16, codingCount: 0, topics: ["default", "parameterized", "overloading"], status: "draft", lastUpdated: "2026-06-25" },
  { id: 9, title: "Chapter 9 — Inheritance", questions: 28, completedQuestions: 0, theoryCount: 12, mcqCount: 16, codingCount: 0, topics: ["extends", "super", "polymorphism"], status: "pending", lastUpdated: "2026-06-20" },
];

const statusOptions = ["all", "published", "draft", "pending"];

export default function AdminChaptersPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ── Filtered Chapters ─────────────────────────────────────────────────
  const filteredChapters = useMemo(() => {
    let result = [...placeholderChapters];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (ch) =>
          ch.title.toLowerCase().includes(q) ||
          ch.topics.some((t) => t.toLowerCase().includes(q)) ||
          ch.status.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((ch) => ch.status === statusFilter);
    }

    return result;
  }, [search, statusFilter]);

  const stats = useMemo(() => {
    const total = placeholderChapters.length;
    const published = placeholderChapters.filter((c) => c.status === "published").length;
    const draft = placeholderChapters.filter((c) => c.status === "draft").length;
    const pending = placeholderChapters.filter((c) => c.status === "pending").length;
    const totalQuestions = placeholderChapters.reduce((sum, ch) => sum + ch.questions, 0);
    const totalCompleted = placeholderChapters.reduce((sum, ch) => sum + (ch.completedQuestions || 0), 0);
    return { total, published, draft, pending, totalQuestions, totalCompleted };
  }, []);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleEdit = useCallback((chapter) => {
    console.log("Edit chapter:", chapter.id);
  }, []);

  const handleViewQuestions = useCallback((chapter) => {
    console.log("View questions for chapter:", chapter.id);
  }, []);

  const handleArchive = useCallback((chapter) => {
    console.log("Archive chapter:", chapter.id);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {isLoading ? (
        <StatsCardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Chapters" value={stats.total} icon="📚" color="indigo" />
          <DashboardCard title="Total Questions" value={stats.totalQuestions} icon="❓" color="blue" />
          <DashboardCard title="Published" value={stats.published} icon="✅" color="emerald" />
          <DashboardCard title="In Progress" value={stats.draft + stats.pending} icon="🔄" color="amber" />
        </div>
      )}

      {/* Overall Progress Bar */}
      <AdminCard className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">Overall Chapter Progress</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {stats.totalCompleted} of {stats.totalQuestions} questions completed across {stats.total} chapters
            </p>
          </div>
          <div className="w-full sm:w-48">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-white/80 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${Math.round((stats.totalCompleted / stats.totalQuestions) * 100)}%` }}
                  role="progressbar"
                  aria-valuenow={Math.round((stats.totalCompleted / stats.totalQuestions) * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span className="text-sm font-bold text-indigo-600 whitespace-nowrap">
                {Math.round((stats.totalCompleted / stats.totalQuestions) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle
          title="Chapters"
          subtitle={`${filteredChapters.length} of ${stats.total} chapters`}
        />
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Status filter tabs */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {statusOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setStatusFilter(opt)}
                className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  statusFilter === opt ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt === "all" ? "All" : opt}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            + Add Chapter
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="w-full sm:w-80">
        <SearchInput
          placeholder="Search chapters, topics, or status..."
          value={search}
          onChange={(v) => setSearch(v)}
          onClear={() => setSearch("")}
        />
      </div>

      {/* Chapter List */}
      {isLoading ? (
        <CardGridSkeleton count={6} />
      ) : filteredChapters.length === 0 ? (
        <AdminCard>
          <EmptyState
            icon="📚"
            title="No chapters found"
            description={
              search || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No chapters have been created yet."
            }
            action={
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                + Add First Chapter
              </button>
            }
          />
        </AdminCard>
      ) : (
        <div className="space-y-3">
          {filteredChapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              expanded={expandedId === chapter.id}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onViewQuestions={handleViewQuestions}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}

      {/* Results summary */}
      {filteredChapters.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          Showing {filteredChapters.length} of {stats.total} chapters
        </p>
      )}
    </div>
  );
}
