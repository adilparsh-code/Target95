"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import DashboardCard from "@/app/components/admin/DashboardCard";
import SearchInput from "@/app/components/admin/SearchInput";
import EmptyState from "@/app/components/admin/EmptyState";
import ChapterCard from "@/app/components/admin/ChapterCard";
import { StatsGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import ContentEditor from "@/app/components/admin/content/ContentEditor";
import { listContent, saveContent } from "@/app/services/ContentService";

/**
 * Firestore chapter doc + question-bank counts → ChapterCard shape.
 * completedQuestions is intentionally omitted (no real platform-wide
 * completion metric) so the card hides the progress bar instead of faking it.
 */
function toCardChapter(doc, order, questionStats) {
  return {
    id: doc.order ?? order + 1,
    docId: doc.id,
    title: doc.name || doc.title || "Untitled chapter",
    questions: questionStats.total,
    theoryCount: questionStats.theory,
    mcqCount: questionStats.mcq,
    codingCount: questionStats.programming,
    topics: Array.isArray(doc.topics) ? doc.topics : [],
    status: doc.status || "draft",
    lastUpdated: doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : "—",
    description: doc.description || "",
    slug: doc.slug || "",
    board: doc.board || "ICSE",
    class: doc.class || "10",
    order: doc.order ?? order,
    subject: doc.subject || doc.subjectId || "",
  };
}

export default function AdminChaptersPage() {
  const router = useRouter();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [archiveConfirm, setArchiveConfirm] = useState(null);

  const [refreshNonce, setRefreshNonce] = useState(0);
  /** Re-fetch in place (event-handler safe). */
  const refresh = useCallback(() => setRefreshNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const [docs, questions] = await Promise.all([listContent("chapters"), listContent("questions")]);
        if (cancelled) return;

        const statsByChapter = new Map();
        questions.forEach((q) => {
          const key = q.chapter || q.chapterId;
          if (!key) return;
          const entry = statsByChapter.get(key) || { total: 0, theory: 0, mcq: 0, programming: 0 };
          entry.total += 1;
          const type = String(q.type || "").toLowerCase();
          if (type === "theory" || type === "short-answer" || type === "long-answer") entry.theory += 1;
          else if (type === "mcq" || type === "true-false" || type === "assertion-reason") entry.mcq += 1;
          else if (type === "programming" || type === "output" || type === "case-study") entry.programming += 1;
          statsByChapter.set(key, entry);
        });

        setChapters(
          docs.map((doc, index) =>
            toCardChapter(doc, index, statsByChapter.get(doc.name) || statsByChapter.get(doc.id) || {
              total: 0,
              theory: 0,
              mcq: 0,
              programming: 0,
            })
          )
        );
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load chapters.");
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

  const handleEditorSave = async (chapter) => {
    setActionError(null);
    try {
      await saveContent("chapters", { ...chapter, title: chapter.name });
      setEditorOpen(false);
      setEditingChapter(null);
      await refresh();
      flashSuccess(editingChapter ? "Chapter updated." : "Chapter created.");
    } catch (err) {
      setActionError(err.message || "Unable to save the chapter.");
    }
  };

  const handleArchive = async (chapter) => {
    setArchiveConfirm(null);
    setActionError(null);
    try {
      await saveContent("chapters", { id: chapter.docId, name: chapter.title, status: "archived" });
      await refresh();
      flashSuccess("Chapter archived.");
    } catch (err) {
      setActionError(err.message || "Unable to archive the chapter.");
    }
  };

  const filteredChapters = useMemo(() => {
    let result = [...chapters];
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
  }, [chapters, search, statusFilter]);

  const stats = useMemo(() => {
    const published = chapters.filter((c) => c.status === "published").length;
    return {
      total: chapters.length,
      published,
      inProgress: chapters.filter((c) => c.status === "draft").length,
      totalQuestions: chapters.reduce((sum, ch) => sum + ch.questions, 0),
    };
  }, [chapters]);

  const statusOptions = ["all", "published", "draft", "archived"];

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="space-y-6">
      {loading ? (
        <StatsGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Chapters" value={stats.total} icon="📚" color="indigo" />
          <DashboardCard title="Total Questions" value={stats.totalQuestions} icon="❓" color="blue" />
          <DashboardCard title="Published" value={stats.published} icon="✅" color="emerald" />
          <DashboardCard title="Draft" value={stats.inProgress} icon="🔄" color="amber" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle title="Chapters" subtitle={`${filteredChapters.length} of ${stats.total} chapters`} />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden" role="group" aria-label="Status filter">
            {statusOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setStatusFilter(opt)}
                className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  statusFilter === opt ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                aria-pressed={statusFilter === opt}
              >
                {opt === "all" ? "All" : opt}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingChapter(null);
              setEditorOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            + Add Chapter
          </button>
        </div>
      </div>

      <div className="w-full sm:w-80">
        <SearchInput
          placeholder="Search chapters, topics, or status..."
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
            title="Couldn't load chapters"
            description={error}
            primaryAction={refresh}
            primaryActionLabel="Retry"
          />
        </AdminCard>
      ) : !loading && filteredChapters.length === 0 ? (
        <AdminCard>
          <EmptyState
            title="No chapters found"
            description={
              search || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No chapters have been created yet."
            }
            primaryAction={() => {
              setEditingChapter(null);
              setEditorOpen(true);
            }}
            primaryActionLabel="Add Chapter"
          />
        </AdminCard>
      ) : (
        <div className="space-y-3">
          {filteredChapters.map((chapter) => (
            <ChapterCard
              key={chapter.docId}
              chapter={chapter}
              expanded={expandedId === chapter.id}
              onToggle={handleToggle}
              onEdit={(ch) => {
                setEditingChapter({ id: ch.docId, name: ch.title, description: ch.description, status: ch.status, order: ch.order, slug: ch.slug, board: ch.board, class: ch.class, subject: ch.subject });
                setEditorOpen(true);
              }}
              onViewQuestions={() => {
                router.push(`/admin/questions?chapter=${encodeURIComponent(chapter.title)}`);
              }}
              onArchive={setArchiveConfirm}
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredChapters.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          Showing {filteredChapters.length} of {stats.total} chapters
        </p>
      )}

      <ContentEditor
        key={editorOpen ? `open-${editingChapter?.id ?? "new"}` : "closed"}
        entity="chapters"
        item={editingChapter}
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingChapter(null);
        }}
        onSave={handleEditorSave}
      />

      <ConfirmDialog
        isOpen={Boolean(archiveConfirm)}
        onClose={() => setArchiveConfirm(null)}
        onConfirm={() => handleArchive(archiveConfirm)}
        title="Archive Chapter"
        message={`Archive "${archiveConfirm?.title}"? Archived chapters can be restored later by editing their status.`}
        confirmLabel="Archive"
        variant="primary"
      />
    </div>
  );
}
