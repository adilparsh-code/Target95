"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/admin/LoadingSkeleton";
import { studentStats, placeholderStudents } from "@/app/data/admin/mockStudents";
import StudentCard from "@/app/components/admin/students/StudentCard";
import StudentTable from "@/app/components/admin/students/StudentTable";
import StudentToolbar from "@/app/components/admin/students/StudentToolbar";
import DashboardCard from "@/app/components/admin/DashboardCard";

export default function AdminStudentsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ class: "", grade: "", status: "", scoreRange: "" });
  const [isLoading, setIsLoading] = useState(false);

  const filteredStudents = useMemo(() => {
    return placeholderStudents.filter((s) => {
      if (filters.class && s.class !== filters.class) return false;
      if (filters.grade && s.grade !== filters.grade) return false;
      if (filters.status && s.status !== filters.status) return false;
      if (filters.scoreRange) {
        const [min, max] = filters.scoreRange.split("-").map(Number);
        if (s.avgScore < min || s.avgScore > max) return false;
      }
      return true;
    });
  }, [filters]);

  const handleViewProfile = (student) => {
    router.push(`/admin/students/${student.id}`);
  };

  const handleInviteStudent = () => console.log("Invite student");

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
        <DashboardCard title="Total Students" value={studentStats.totalStudents} icon="👨‍🎓" color="violet" />
        <DashboardCard title="Active Students" value={studentStats.activeStudents} icon="✅" color="emerald" />
        <DashboardCard title="Questions Solved" value={studentStats.totalQuestionsSolved} icon="❓" color="blue" />
        <DashboardCard title="Average Score" value={`${studentStats.averageScore}%`} icon="📊" color="amber" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle title="Students" subtitle="Monitor student activity and progress" />
      </div>

      {/* Toolbar */}
      <StudentToolbar
        onInviteStudent={handleInviteStudent}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
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
          {filteredStudents.length === 0 ? (
            <AdminCard>
              <EmptyState
                icon="👨‍🎓"
                title="No students found"
                description="Try adjusting your filters or invite new students."
                action={
                  <button onClick={handleInviteStudent} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">+ Invite Student</button>
                }
              />
            </AdminCard>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          ) : (
            <StudentTable
              students={filteredStudents}
              onViewProfile={handleViewProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}