"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import SearchInput from "@/app/components/admin/SearchInput";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import { studentStats, placeholderStudents } from "@/app/data/admin/mockStudents";
import StudentCard from "@/app/components/admin/students/StudentCard";
import StudentTable from "@/app/components/admin/students/StudentTable";
import StudentToolbar from "@/app/components/admin/students/StudentToolbar";
import DashboardCard from "@/app/components/admin/DashboardCard";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";

export default function AdminStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState(placeholderStudents);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ class: "", grade: "", status: "", scoreRange: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const filteredStudentsFinal = useMemo(() => {
    let result = [...students];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.school.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    if (filters.class) result = result.filter((s) => s.class === filters.class);
    if (filters.grade) result = result.filter((s) => s.grade === filters.grade);
    if (filters.status) result = result.filter((s) => s.status === filters.status);
    if (filters.scoreRange) {
      const [min, max] = filters.scoreRange.split("-").map(Number);
      result = result.filter((s) => s.avgScore >= min && s.avgScore <= max);
    }

    return result;
  }, [students, searchQuery, filters]);

  const handleViewProfile = (student) => {
    router.push(`/admin/students/${student.id}`);
  };

  const handleToggleSuspend = (student) => {
    const isActive = student.status === "active";
    setConfirmDialog({
      title: isActive ? "Suspend Student" : "Activate Student",
      message: isActive
        ? `Are you sure you want to suspend "${student.name}"? They will lose access to the platform until reactivated.`
        : `Are you sure you want to activate "${student.name}"? They will regain access to the platform.`,
      confirmLabel: isActive ? "Suspend" : "Activate",
      variant: isActive ? "danger" : "primary",
      onConfirm: () => {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === student.id
              ? { ...s, status: isActive ? "inactive" : "active" }
              : s
          )
        );
        setConfirmDialog(null);
      },
    });
  };

  const handleInviteStudent = () => console.log("Invite student");

  // Stats derived from current student data
  const stats = useMemo(() => ({
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.status === "active").length,
    totalQuestionsSolved: students.reduce((sum, s) => sum + s.questionsSolved, 0),
    averageScore: Math.round(students.reduce((sum, s) => sum + s.avgScore, 0) / students.length),
  }), [students]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <StatsCardSkeleton count={4} />
        <CardGridSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Students" value={stats.totalStudents} icon="👨‍🎓" color="violet" />
        <DashboardCard title="Active Students" value={stats.activeStudents} icon="✅" color="emerald" />
        <DashboardCard title="Questions Solved" value={stats.totalQuestionsSolved} icon="❓" color="blue" />
        <DashboardCard title="Average Score" value={`${stats.averageScore}%`} icon="📊" color="amber" />
      </div>

      {/* Search */}
      <div className="w-full sm:w-96">
        <SearchInput
          placeholder="Search students by name, email, school, or city..."
          value={searchQuery}
          onChange={(v) => setSearchQuery(v)}
          onClear={() => setSearchQuery("")}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          title="Students"
          subtitle={`${filteredStudentsFinal.length} of ${students.length} students · ${stats.activeStudents} active`}
        />
      </div>

      {/* Toolbar */}
      <StudentToolbar
        onInviteStudent={handleInviteStudent}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main content */}
      <div className="flex gap-6">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-full lg:w-64 shrink-0">
            <AdminCard>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
                  {Object.values(filters).some(Boolean) && (
                    <button onClick={() => setFilters({ class: "", grade: "", status: "", scoreRange: "" })} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Clear all</button>
                  )}
                </div>
                {/* Class filter */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</label>
                  <div className="space-y-1">
                    {["9", "10", "11", "12"].map((c) => (
                      <button key={c} onClick={() => setFilters((p) => ({ ...p, class: p.class === c ? "" : c }))}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.class === c ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"}`}>
                        Class {c}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Grade filter */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</label>
                  <div className="space-y-1">
                    {[["ICSE", "ICSE"], ["ISC", "ISC"]].map(([val, label]) => (
                      <button key={val} onClick={() => setFilters((p) => ({ ...p, grade: p.grade === val ? "" : val }))}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.grade === val ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Status filter */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</label>
                  <div className="space-y-1">
                    {[["active", "Active"], ["inactive", "Inactive"], ["pending", "Pending"]].map(([val, label]) => (
                      <button key={val} onClick={() => setFilters((p) => ({ ...p, status: p.status === val ? "" : val }))}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.status === val ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Score range filter */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg. Score</label>
                  <div className="space-y-1">
                    {[["90-100", "90-100%"], ["75-89", "75-89%"], ["60-74", "60-74%"], ["40-59", "40-59%"], ["0-39", "Below 40%"]].map(([val, label]) => (
                      <button key={val} onClick={() => setFilters((p) => ({ ...p, scoreRange: p.scoreRange === val ? "" : val }))}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.scoreRange === val ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* Students content */}
        <div className="flex-1 min-w-0">
          {filteredStudentsFinal.length === 0 ? (
            <AdminCard>
              <EmptyState
                icon="👨‍🎓"
                title="No students found"
                description={
                  searchQuery || Object.values(filters).some(Boolean)
                    ? "Try adjusting your search or filters."
                    : "No students have joined yet."
                }
                action={
                  <button onClick={handleInviteStudent} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">+ Invite Student</button>
                }
              />
            </AdminCard>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredStudentsFinal.map((student) => (
                <div key={student.id} className="relative group">
                  <StudentCard
                    student={student}
                    onViewProfile={handleViewProfile}
                  />
                  {/* Suspend/Activate button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggleSuspend(student)}
                      className={`p-1.5 rounded-lg shadow-sm border text-xs font-medium transition-colors ${
                        student.status === "active"
                          ? "bg-white border-gray-200 text-red-600 hover:bg-red-50"
                          : "bg-white border-gray-200 text-emerald-600 hover:bg-emerald-50"
                      }`}
                      title={student.status === "active" ? "Suspend student" : "Activate student"}
                    >
                      {student.status === "active" ? "🔒 Suspend" : "✅ Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <StudentTable
              students={filteredStudentsFinal}
              onViewProfile={handleViewProfile}
              onToggleSuspend={handleToggleSuspend}
            />
          )}

          {/* Results summary */}
          {filteredStudentsFinal.length > 0 && (
            <p className="text-xs text-gray-400 text-center mt-4">
              Showing {filteredStudentsFinal.length} of {students.length} students
            </p>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setConfirmDialog(null)}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmLabel={confirmDialog.confirmLabel}
          variant={confirmDialog.variant}
        />
      )}
    </div>
  );
}