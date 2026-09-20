"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import SearchInput from "@/app/components/admin/SearchInput";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import SubjectCard from "@/app/components/admin/subjects/SubjectCard";
import SubjectForm from "@/app/components/admin/subjects/SubjectForm";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import DashboardCard from "@/app/components/admin/DashboardCard";
import { listContent, saveContent, deleteContent } from "@/app/services/ContentService";

/** Firestore subject doc → SubjectCard/SubjectForm shape. */
function toCardSubject(doc, counts) {
  return {
    id: doc.id,
    name: doc.name,
    code: doc.slug || doc.code || "",
    grade: doc.board || "ICSE",
    class: doc.class || "10",
    color: doc.color || "blue",
    icon: doc.icon || "💻",
    status: doc.status || "draft",
    description: doc.description || "",
    chapters: counts.chapters || 0,
    questions: counts.questions || 0,
    students: counts.students,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : "—",
  };
}

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [refreshNonce, setRefreshNonce] = useState(0);
  /** Re-fetch in place (event-handler safe). */
  const refresh = useCallback(() => setRefreshNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const [docs, chapters, questions] = await Promise.all([
          listContent("subjects"),
          listContent("chapters"),
          listContent("questions"),
        ]);
        if (cancelled) return;
        const chapterCount = new Map();
        chapters.forEach((c) => {
          const key = c.subject || c.subjectId;
          if (!key) return;
          chapterCount.set(key, (chapterCount.get(key) || 0) + 1);
        });
        const questionCount = new Map();
        questions.forEach((q) => {
          const key = q.subject;
          if (!key) return;
          questionCount.set(key, (questionCount.get(key) || 0) + 1);
        });
        setSubjects(
          docs.map((doc) =>
            toCardSubject(doc, {
              chapters: chapterCount.get(doc.name) || 0,
              questions: questionCount.get(doc.name) || 0,
            })
          )
        );
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load subjects.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [refreshNonce]);

  const flashSuccess = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(null), 2500);
  };

  const handleSave = async (subject) => {
    setActionError(null);
    try {
      await saveContent("subjects", {
        ...subject,
        // The server stores canonical fields: slug + board.
        name: subject.name,
        slug: subject.code,
        board: subject.grade,
        status: subject.status === "active" ? "published" : subject.status,
      });
      setFormOpen(false);
      setEditingSubject(null);
      await refresh();
      flashSuccess(editingSubject ? "Subject updated." : "Subject created.");
    } catch (err) {
      setActionError(err.message || "Unable to save the subject.");
    }
  };

  const handleDelete = (subject) => {
    setDeleteConfirm(subject);
  };

  const confirmDelete = async () => {
    const target = deleteConfirm;
    setDeleteConfirm(null);
    setActionError(null);
    try {
      await deleteContent("subjects", target.id);
      await refresh();
      flashSuccess("Subject deleted.");
    } catch (err) {
      setActionError(err.message || "Unable to delete the subject.");
    }
  };

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
      result = result.filter((s) =>
        statusFilter === "active" ? s.status === "published" : s.status === statusFilter
      );
    }
    return result;
  }, [subjects, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: subjects.length,
      published: subjects.filter((s) => s.status === "published").length,
      chapters: subjects.reduce((sum, s) => sum + s.chapters, 0),
      questions: subjects.reduce((sum, s) => sum + s.questions, 0),
    }),
    [subjects]
  );

  const statusOptions = [
    ["all", "All"],
    ["active", "Active"],
    ["draft", "Draft"],
    ["archived", "Archived"],
  ];

  return (
    <div className="space-y-6">
      {loading ? (
        <StatsGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Subjects" value={stats.total} icon="📚" color="indigo" />
          <DashboardCard title="Published" value={stats.published} icon="✅" color="emerald" />
          <DashboardCard title="Total Chapters" value={stats.chapters} icon="📖" color="blue" />
          <DashboardCard title="Total Questions" value={stats.questions} icon="❓" color="amber" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle title="Subjects" subtitle={`${filteredSubjects.length} of ${subjects.length} subjects`} />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden" role="group" aria-label="Status filter">
            {statusOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  statusFilter === value ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                aria-pressed={statusFilter === value}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingSubject(null);
              setFormOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            + Add Subject
          </button>
        </div>
      </div>

      <div className="w-full sm:w-80">
        <SearchInput
          placeholder="Search subjects by name, code, or board..."
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />
      </div>

      {(actionError || successMessage) && (
        <div
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm ${
            actionError ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {actionError || successMessage}
        </div>
      )}

      {error ? (
        <AdminCard>
          <EmptyState
            title="Couldn't load subjects"
            description={error}
            primaryAction={refresh}
            primaryActionLabel="Retry"
          />
        </AdminCard>
      ) : !loading && filteredSubjects.length === 0 ? (
        <AdminCard>
          <EmptyState
            title="No subjects found"
            description={
              search || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No subjects have been created yet."
            }
            primaryAction={() => {
              setEditingSubject(null);
              setFormOpen(true);
            }}
            primaryActionLabel="Add Subject"
          />
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onEdit={(s) => {
                setEditingSubject(s);
                setFormOpen(true);
              }}
              onDelete={handleDelete}
              onView={(s) => setEditingSubject(s)}
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredSubjects.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          Showing {filteredSubjects.length} of {subjects.length} subjects
        </p>
      )}

      <SubjectForm
        key={formOpen ? `open-${editingSubject?.id ?? "new"}` : "closed"}
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingSubject(null);
        }}
        onSave={handleSave}
        subject={editingSubject}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteConfirm)}
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
