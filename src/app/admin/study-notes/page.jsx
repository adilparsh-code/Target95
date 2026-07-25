"use client";

import { useState, useMemo } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import { notesStats, placeholderNotes } from "@/app/data/admin/mockStudyNotes";
import NotesStats from "@/app/components/admin/study-notes/NotesStats";
import NotesToolbar from "@/app/components/admin/study-notes/NotesToolbar";
import NotesFilters from "@/app/components/admin/study-notes/NotesFilters";
import NotesCard from "@/app/components/admin/study-notes/NotesCard";
import NotesTable from "@/app/components/admin/study-notes/NotesTable";
import NotesPreview from "@/app/components/admin/study-notes/NotesPreview";

export default function AdminStudyNotesPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ subject: "", class: "", chapter: "", type: "", status: "" });
  const [previewNote, setPreviewNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredNotes = useMemo(() => {
    return placeholderNotes.filter((note) => {
      if (filters.subject && note.subject !== filters.subject) return false;
      if (filters.class && note.class !== filters.class) return false;
      if (filters.chapter && !note.chapter.startsWith(filters.chapter)) return false;
      if (filters.type && note.type !== filters.type) return false;
      if (filters.status && note.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ subject: "", class: "", chapter: "", type: "", status: "" });
  };

  const handlePreview = (note) => setPreviewNote(note);
  const handleEdit = (note) => console.log("Edit note:", note.id);
  const handleDelete = (note) => console.log("Delete note:", note.id);
  const handleAddNew = () => console.log("Add new note");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <StatsCardSkeleton count={6} />
        <CardGridSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <NotesStats stats={notesStats} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle title="Study Notes" subtitle="Manage study materials and resources" />
      </div>

      {/* Toolbar */}
      <NotesToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddNew={handleAddNew}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
      />

      {/* Main content area */}
      <div className="flex gap-6">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-full lg:w-64 shrink-0">
            <AdminCard>
              <NotesFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
              />
            </AdminCard>
          </div>
        )}

        {/* Notes content */}
        <div className="flex-1 min-w-0">
          {filteredNotes.length === 0 ? (
            <AdminCard>
              <EmptyState
                icon="📝"
                title="No notes found"
                description={Object.values(filters).some(Boolean) ? "Try adjusting your filters or search terms." : "No study notes available yet."}
                action={
                  <button onClick={handleAddNew} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    + Upload Note
                  </button>
                }
              />
            </AdminCard>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <NotesCard
                  key={note.id}
                  note={note}
                  onPreview={handlePreview}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <NotesTable
              notes={filteredNotes}
              onPreview={handlePreview}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Preview modal */}
      <NotesPreview
        isOpen={!!previewNote}
        note={previewNote}
        onClose={() => setPreviewNote(null)}
      />
    </div>
  );
}