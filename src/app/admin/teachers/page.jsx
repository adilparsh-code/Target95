"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import { teacherStats, placeholderTeachers } from "@/app/data/admin/mockTeachers";
import TeacherStats from "@/app/components/admin/teachers/TeacherStats";
import TeacherCard from "@/app/components/admin/teachers/TeacherCard";
import TeacherTable from "@/app/components/admin/teachers/TeacherTable";
import TeacherToolbar from "@/app/components/admin/teachers/TeacherToolbar";
import TeacherFilters from "@/app/components/admin/teachers/TeacherFilters";

export default function AdminTeachersPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ status: "", subject: "", experience: "", school: "" });
  const [isLoading, setIsLoading] = useState(false);

  const filteredTeachers = useMemo(() => {
    return placeholderTeachers.filter((t) => {
      if (filters.status && t.status !== filters.status) return false;
      if (filters.subject && !t.subjects.includes(filters.subject)) return false;
      if (filters.experience) {
        const [min, max] = filters.experience.split("-").map(Number);
        if (filters.experience === "10+") {
          if (t.experience < 10) return false;
        } else {
          if (t.experience < min || t.experience > max) return false;
        }
      }
      if (filters.school && t.school !== filters.school) return false;
      return true;
    });
  }, [filters]);

  const handleViewProfile = (teacher) => {
    router.push(`/admin/teachers/${teacher.id}`);
  };

  const handleAddTeacher = () => console.log("Add teacher");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: "", subject: "", experience: "", school: "" });
  };

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
      <TeacherStats stats={teacherStats} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle title="Teachers" subtitle="Manage teacher accounts and assignments" />
      </div>

      {/* Toolbar */}
      <TeacherToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddTeacher={handleAddTeacher}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
      />

      {/* Main content */}
      <div className="flex gap-6">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-full lg:w-64 shrink-0">
            <AdminCard>
              <TeacherFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
              />
            </AdminCard>
          </div>
        )}

        {/* Teachers content */}
        <div className="flex-1 min-w-0">
          {filteredTeachers.length === 0 ? (
            <AdminCard>
              <EmptyState
                icon="👩‍🏫"
                title="No teachers found"
                description={
                  Object.values(filters).some(Boolean)
                    ? "Try adjusting your filters or search terms."
                    : "No teachers have been added yet."
                }
                action={
                  <button onClick={handleAddTeacher} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    + Add Teacher
                  </button>
                }
              />
            </AdminCard>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          ) : (
            <TeacherTable
              teachers={filteredTeachers}
              onViewProfile={handleViewProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}