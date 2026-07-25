"use client";

import { useState, useMemo } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import DashboardCard from "@/app/components/admin/DashboardCard";
import SearchInput from "@/app/components/admin/SearchInput";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import { mockSubjects, subjectStats } from "@/app/data/admin/mockSubjects";
import SubjectCard from "@/app/components/admin/subjects/SubjectCard";
import SubjectForm from "@/app/components/admin/subjects/SubjectForm";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";

const statusOptions = ["all", "active", "draft"];

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredSubjects = useMemo(() => {
    let result = [...subjects];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.grade.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((s) => s.status === statusFilter);
    }
    return result;
  }, [subjects, search, statusFilter]);

  const handleSave = (subject) => {
    if (editingSubject) {
      setSubjects((prev) => prev.map((s) => (s.id === subject.id ? subject : s)));
    } else {
      setSubjects((prev) => [subject, ...prev]);
    }
    setFormOpen(false);
    setEditingSubject(null);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormOpen(true);
  };

  const handleDelete = (subject) => {
    setDeleteConfirm(subject);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setSubjects((prev) => prev.filter((s) => s.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const handleView = (subject) => {
    console.log("View subject:", subject.id);
  };

  const handleAddNew = () => {
    setEditingSubject(null);
    setFormOpen(true);
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
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Subjects" value={subjectStats.totalSubjects} icon="📚" color="indigo" />
        <DashboardCard title="Active" value={subjectStats.activeSubjects} icon="✅" color="emerald" />
        <DashboardCard title="Total Chapters" value={subjectStats.totalChapters} icon="📖" color="blue" />
        <DashboardCard title="Total Questions" value={subjectStats.totalQuestions} icon="❓" color="amber" />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle
          title="Subjects"
          subtitle={`${filteredSubjects.length} of ${subjects.length} subjects`}
        />
        <div className="flex items-center gap-2 flex-shrink-0">
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
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            + Add Subject
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="w-full sm:w-80">
        <SearchInput
          placeholder="Search subjects by name, code, or grade..."
          value={search}
          onChange={(v) => setSearch(v)}
          onClear={() => setSearch("")}
        />
      </div>

      {/* Subjects Grid */}
      {filteredSubjects.length === 0 ? (
        <AdminCard>
          <EmptyState
            icon="📚"
            title="No subjects found"
            description={
              search || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No subjects have been created yet."
            }
            action={
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                + Add First Subject
              </button>
            }
          />
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* Results summary */}
      {filteredSubjects.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          Showing {filteredSubjects.length} of {subjects.length} subjects
        </p>
      )}

      {/* Subject Form Modal */}
      <SubjectForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingSubject(null); }}
        onSave={handleSave}
        subject={editingSubject}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="Delete Subject"
        message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}