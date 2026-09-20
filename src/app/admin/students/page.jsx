"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import SearchInput from "@/app/components/admin/SearchInput";
import { StatsCardSkeleton } from "@/app/components/ui/LoadingSkeleton";
import StudentTable from "@/app/components/admin/students/StudentTable";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import DashboardCard from "@/app/components/admin/DashboardCard";
import useAdminData from "@/app/hooks/useAdminData";

export default function AdminStudentsPage() {
  const router = useRouter();
  const { data, loading, error, refresh } = useAdminData("/api/admin/students?limit=500");
  const students = useMemo(() => data?.students || [], [data]);

  const [viewMode, setViewMode] = useState("table");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ class: "", grade: "", status: "" });
  const [statusConfirm, setStatusConfirm] = useState(null);
  const [statusError, setStatusError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const flashSuccess = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(null), 2500);
  };

  const handleToggleStatus = (student) => {
    const nextStatus = student.disabled || student.status === "inactive" ? "active" : "inactive";
    setStatusConfirm({
      student,
      nextStatus,
    });
  };

  const confirmToggleStatus = async () => {
    const { student, nextStatus } = statusConfirm || {};
    setStatusConfirm(null);
    setStatusError(null);
    try {
      const res = await fetch(`/api/admin/students/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error || "Unable to update the student status.");
      }
      refresh();
      flashSuccess(`Student account ${nextStatus === "active" ? "reactivated" : "deactivated"}.`);
    } catch (err) {
      setStatusError(err.message || "Unable to update the student status.");
    }
  };

  // Local, instant search on top of the server directory.
  const filteredStudents = useMemo(() => {
    let result = [...students];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.school.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }
    if (filters.class) result = result.filter((s) => String(s.class) === filters.class);
    if (filters.grade) result = result.filter((s) => s.grade === filters.grade);
    if (filters.status) result = result.filter((s) => s.status === filters.status || (filters.status === "inactive" && s.disabled));
    return result;
  }, [students, searchQuery, filters]);

  const stats = useMemo(() => ({
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.isActiveStudent).length,
    totalQuestionsSolved: students.reduce((sum, s) => sum + (Number(s.questionsSolved) || 0), 0),
    averageScore: students.length
      ? Math.round(students.reduce((sum, s) => sum + (Number(s.averageScore) || 0), 0) / students.length)
      : 0,
  }), [students]);

  const handleViewProfile = (student) => {
    router.push(`/admin/students/${student.id}`);
  };

  const classes = useMemo(
    () => Array.from(new Set(students.map((s) => String(s.class)).filter(Boolean))).sort(),
    [students]
  );

  if (error) {
    return (
      <div className="space-y-6">
        <SectionTitle title="Students" subtitle="Platform student directory" />
        <EmptyState
          title="Couldn't load students"
          description={error}
          primaryAction={refresh}
          primaryActionLabel="Retry"
        />
      </div>
    );
  }

  const statusToggleError = statusError || successMessage;

  if (loading) {
    return (
      <div className="space-y-6">
        <StatsCardSkeleton count={4} />
        <div className="h-72 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DashboardCard title="Total Students" value={stats.totalStudents} icon="👨‍🎓" color="violet" />
        <DashboardCard title="Active (7d)" value={stats.activeStudents} icon="✅" color="emerald" />
        <DashboardCard title="Questions Solved" value={stats.totalQuestionsSolved} icon="❓" color="blue" />
        <DashboardCard title="Average Score" value={`${stats.averageScore}%`} icon="📊" color="amber" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-96">
          <SearchInput
            placeholder="Search by name, email, school or ID…"
            value={searchQuery}
            onChange={(v) => setSearchQuery(v)}
            onClear={() => setSearchQuery("")}
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-expanded={showFilters}
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {showFilters && (
        <AdminCard>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Class</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilters((p) => ({ ...p, class: "" }))}
                  className={`rounded-lg px-3 py-1.5 text-sm ${!filters.class ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                >
                  All
                </button>
                {classes.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilters((p) => ({ ...p, class: p.class === c ? "" : c }))}
                    className={`rounded-lg px-3 py-1.5 text-sm ${filters.class === c ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Board</p>
              <div className="flex flex-wrap gap-1.5">
                {["", "ICSE", "ISC", "CBSE"].map((g) => (
                  <button
                    key={g || "all"}
                    onClick={() => setFilters((p) => ({ ...p, grade: g }))}
                    className={`rounded-lg px-3 py-1.5 text-sm ${filters.grade === g ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                  >
                    {g || "All"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</p>
              <div className="flex flex-wrap gap-1.5">
                {[["", "All"], ["active", "Active"], ["inactive", "Inactive"]].map(([val, label]) => (
                  <button
                    key={val || "all"}
                    onClick={() => setFilters((p) => ({ ...p, status: val }))}
                    className={`rounded-lg px-3 py-1.5 text-sm ${filters.status === val ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AdminCard>
      )}

      <SectionTitle
        title="Students"
        subtitle={`${filteredStudents.length} of ${students.length} students · ${stats.activeStudents} active this week`}
      />

      {statusToggleError && (
        <div
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm ${
            statusError ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {statusToggleError}
        </div>
      )}

      <div className="flex gap-6">
        <div className="min-w-0 flex-1">
          {filteredStudents.length === 0 ? (
            <AdminCard>
              <EmptyState
                icon="👨‍🎓"
                title="No students found"
                description={
                  searchQuery || Object.values(filters).some(Boolean)
                    ? "Try adjusting your search or filters."
                    : "No students have registered yet."
                }
              />
            </AdminCard>
          ) : (
            <StudentTable
              students={filteredStudents}
              onViewProfile={handleViewProfile}
              onToggleStatus={handleToggleStatus}
              pageSize={10}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={Boolean(statusConfirm)}
        onClose={() => setStatusConfirm(null)}
        onConfirm={confirmToggleStatus}
        title={statusConfirm?.nextStatus === "active" ? "Reactivate Student" : "Deactivate Student"}
        message={
          statusConfirm?.nextStatus === "active"
            ? `Reactivate "${statusConfirm?.student?.fullName}"? They will be able to sign in and resume learning.`
            : `Deactivate "${statusConfirm?.student?.fullName}"? They will lose access until reactivated. Their data is preserved.`
        }
        confirmLabel={statusConfirm?.nextStatus === "active" ? "Reactivate" : "Deactivate"}
        variant={statusConfirm?.nextStatus === "active" ? "primary" : "danger"}
      />
    </div>
  );
}
