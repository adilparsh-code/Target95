"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { listContent, saveContent, deleteContent } from "../../services/ContentService";
import QuestionForm from "../../components/admin/questions/QuestionForm";
import SearchBox from "../../components/admin/SearchBox";
import FilterDropdown from "../../components/admin/FilterDropdown";
import Pagination from "../../components/admin/Pagination";
import { CardGridSkeleton } from "../../components/ui/LoadingSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/admin/EmptyState";
import StatusBadge from "../../components/admin/StatusBadge";

const PAGE_SIZE = 10;

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];
const TYPE_OPTIONS = [
  { value: "mcq", label: "MCQ" },
  { value: "theory", label: "Theory" },
  { value: "programming", label: "Programming" },
  { value: "output", label: "Output / Dry Run" },
  { value: "assertion-reason", label: "Assertion-Reason" },
  { value: "case-study", label: "Case Study" },
  { value: "short-answer", label: "Short Answer" },
  { value: "long-answer", label: "Long Answer" },
  { value: "fill-in-the-blanks", label: "Fill in the Blanks" },
  { value: "true-false", label: "True / False" },
  { value: "match-the-following", label: "Match the Following" },
];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];
const BOARD_OPTIONS = [
  { value: "ICSE", label: "ICSE" },
  { value: "ISC", label: "ISC" },
  { value: "CBSE", label: "CBSE" },
];
const CLASS_OPTIONS = ["9", "10", "11", "12"].map((c) => ({ value: c, label: `Class ${c}` }));
const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "difficulty-asc", label: "Difficulty (low → high)" },
  { value: "difficulty-desc", label: "Difficulty (high → low)" },
];

function toOptions(values) {
  return values.map((v) => ({ value: v, label: v }));
}

function QuestionRow({ question, onEdit, onPreview, onDuplicate, onTogglePublish, onArchive, onDelete }) {
  const meta = [question.subject, question.chapter, question.topic, `Class ${question.class ?? "?"}`, question.board]
    .filter(Boolean)
    .join(" · ");
  const preview = String(question.question || "").slice(0, 160);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">{question.title || "Untitled question"}</h3>
            <StatusBadge status={question.status || "draft"} size="sm" />
            {question.type && (
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                {question.type}
              </span>
            )}
            {question.difficulty && (
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-amber-700">
                {question.difficulty}
              </span>
            )}
            {question.marks ? (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                {question.marks} {question.marks === 1 ? "mark" : "marks"}
              </span>
            ) : null}
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{preview}…</p>
          <p className="mt-2 text-xs text-gray-500">{meta}</p>
          {(question.tags || []).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {question.tags.slice(0, 6).map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Button variant="outline" size="sm" onClick={() => onPreview(question)}>Preview</Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(question)}>Edit</Button>
          <Button variant="outline" size="sm" onClick={() => onDuplicate(question)}>Duplicate</Button>
          <Button variant="outline" size="sm" onClick={() => onTogglePublish(question)}>
            {question.status === "published" ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onArchive(question)}>Archive</Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(question)}>Delete</Button>
        </div>
      </div>
    </article>
  );
}

function QuestionPreviewModal({ question, onClose }) {
  if (!question) return null;
  return (
    <Modal isOpen onClose={onClose} title={question.title || "Question preview"} size="2xl">
      <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
        <div className="flex flex-wrap gap-2">
          {[
            question.type,
            question.difficulty,
            question.board,
            question.class ? `Class ${question.class}` : "",
            question.topic,
            question.marks ? `${question.marks} marks` : "",
            question.estimatedTime ? `${question.estimatedTime} min` : "",
          ]
            .filter(Boolean)
            .map((chip) => (
              <span key={chip} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                {chip}
              </span>
            ))}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Question</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-800">{question.question}</p>
          {question.code && (
            <pre className="mt-3 overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs leading-5 text-gray-100">
              <code>{question.code}</code>
            </pre>
          )}
        </div>
        {Array.isArray(question.options) && question.options.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Options</p>
            <ul className="mt-1 space-y-1.5">
              {question.options.map((option, index) => (
                <li
                  key={`${index}-${option}`}
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    option === question.answer
                      ? "border-emerald-300 bg-emerald-50 font-medium text-emerald-800"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  {String.fromCharCode(65 + index)}. {option}
                  {option === question.answer && <span className="ml-2 text-xs">✓ correct</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Answer</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-800">{question.answer}</p>
        </div>
        {question.explanation && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Explanation</p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">{question.explanation}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [facets, setFacets] = useState({ subjects: [], chapters: [], topics: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [chapterFilter, setChapterFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [boardFilter, setBoardFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [page, setPage] = useState(0);

  const [formOpen, setFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [previewQuestion, setPreviewQuestion] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [refreshNonce, setRefreshNonce] = useState(0);
  /** Re-fetch in place (event-handler safe). */
  const refresh = useCallback(() => setRefreshNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const data = await listContent("questions");
        if (cancelled) return;
        setQuestions(data);
        setFacets({
          subjects: [...new Set(data.map((q) => q.subject).filter(Boolean))].sort(),
          chapters: [...new Set(data.map((q) => q.chapter).filter(Boolean))].sort(),
          topics: [...new Set(data.map((q) => q.topic).filter(Boolean))].sort(),
        });
        setError(null);
        // Support deep links like /admin/questions?chapter=Loops.
        const chapterParam = new URLSearchParams(window.location.search).get("chapter");
        if (chapterParam) setChapterFilter(chapterParam);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load questions.");
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

  const runAction = async (action, successMessage) => {
    setActionError(null);
    try {
      await action();
      refresh();
      if (successMessage) flashSuccess(successMessage);
    } catch (err) {
      setActionError(err.message || "Action failed. Please try again.");
    }
  };

  const filteredQuestions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const matchesDifficulty = (q) =>
      !difficultyFilter || String(q.difficulty || "").toLowerCase() === difficultyFilter;
    const matchesType = (q) => !typeFilter || String(q.type || "").toLowerCase() === typeFilter;

    return questions
      .filter((q) => !search || `${q.title || ""} ${q.question || ""} ${q.topic || ""}`.toLowerCase().includes(search))
      .filter((q) => !subjectFilter || q.subject === subjectFilter)
      .filter((q) => !chapterFilter || q.chapter === chapterFilter)
      .filter((q) => !topicFilter || q.topic === topicFilter)
      .filter(matchesDifficulty)
      .filter(matchesType)
      .filter((q) => !statusFilter || String(q.status || "draft").toLowerCase() === statusFilter)
      .filter((q) => !boardFilter || String(q.board || "").toUpperCase() === boardFilter)
      .filter((q) => !classFilter || String(q.class ?? "") === classFilter);
  }, [questions, searchTerm, subjectFilter, chapterFilter, topicFilter, difficultyFilter, typeFilter, statusFilter, boardFilter, classFilter]);

  const sortedQuestions = useMemo(() => {
    const difficultyRank = { easy: 0, medium: 1, hard: 2 };
    return [...filteredQuestions].sort((a, b) => {
      if (sortOrder === "oldest") return String(a.createdAt || "").localeCompare(String(b.createdAt || ""));
      if (sortOrder.startsWith("difficulty")) {
        const rankA = difficultyRank[String(a.difficulty || "").toLowerCase()] ?? 1;
        const rankB = difficultyRank[String(b.difficulty || "").toLowerCase()] ?? 1;
        return sortOrder === "difficulty-asc" ? rankA - rankB : rankB - rankA;
      }
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });
  }, [filteredQuestions, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedQuestions.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageQuestions = sortedQuestions.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const handleSave = async (question) => {
    await runAction(async () => {
      await saveContent("questions", question);
      setFormOpen(false);
      setEditingQuestion(null);
    }, editingQuestion ? "Question updated." : "Question created.");
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormOpen(true);
  };

  const handleDuplicate = (question) => {
    setConfirmDialog({
      title: "Duplicate Question",
      message: `Create a draft copy of "${question.title}"?`,
      confirmLabel: "Duplicate",
      variant: "primary",
      onConfirm: () => {
        setConfirmDialog(null);
        runAction(
          () =>
            saveContent("questions", {
              ...question,
              id: null,
              title: `${question.title} (Copy)`,
              status: "draft",
            }),
          "Question duplicated as draft."
        );
      },
    });
  };

  const handleTogglePublish = (question) => {
    const nextStatus = question.status === "published" ? "draft" : "published";
    runAction(
      () => saveContent("questions", { ...question, status: nextStatus }),
      nextStatus === "published" ? "Question published." : "Question unpublished."
    );
  };

  const handleArchive = (question) => {
    setConfirmDialog({
      title: "Archive Question",
      message: `Archive "${question.title}"? Archived questions stay in the bank and can be restored anytime.`,
      confirmLabel: "Archive",
      variant: "primary",
      onConfirm: () => {
        setConfirmDialog(null);
        runAction(() => saveContent("questions", { ...question, status: "archived" }), "Question archived.");
      },
    });
  };

  const handleDelete = (question) => {
    setConfirmDialog({
      title: "Delete Question",
      message: `Permanently delete "${question.title}"? This cannot be undone — prefer archiving to keep history.`,
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: () => {
        setConfirmDialog(null);
        runAction(() => deleteContent("questions", question.id), "Question deleted.");
      },
    });
  };

  const filtersActive =
    subjectFilter || chapterFilter || topicFilter || difficultyFilter || typeFilter || statusFilter || boardFilter || classFilter;

  const clearAllFilters = () => {
    setSubjectFilter("");
    setChapterFilter("");
    setTopicFilter("");
    setDifficultyFilter("");
    setTypeFilter("");
    setStatusFilter("");
    setBoardFilter("");
    setClassFilter("");
  };

  const renderBody = () => {
    if (loading) {
      return (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-white" />
          ))}
        </div>
      );
    }
    if (error) {
      return <ErrorState message={error} />;
    }
    if (pageQuestions.length === 0) {
      return (
        <div className="rounded-2xl border border-gray-200 bg-white">
          <EmptyState
            type="questions"
            title="No questions found"
            description={
              searchTerm || filtersActive
                ? "Try adjusting your search or filters."
                : "The question bank is empty. Create the first question."
            }
            primaryAction={
              () => {
                setEditingQuestion(null);
                setFormOpen(true);
              }
            }
            primaryActionLabel="Add Question"
          />
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {pageQuestions.map((question) => (
          <QuestionRow
            key={question.id}
            question={question}
            onEdit={handleEdit}
            onPreview={setPreviewQuestion}
            onDuplicate={handleDuplicate}
            onTogglePublish={handleTogglePublish}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Question bank</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Questions</h1>
          <p className="mt-1 text-sm text-gray-500">
            {sortedQuestions.length} of {questions.length} questions ·{" "}
            {questions.filter((q) => String(q.status || "").toLowerCase() === "published").length} published
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingQuestion(null);
            setFormOpen(true);
          }}
        >
          + Add Question
        </Button>
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

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SearchBox
            placeholder="Search title, content, topic…"
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value);
              setPage(0);
            }}
            onClear={() => setSearchTerm("")}
          />
          <FilterDropdown label="Subject" options={toOptions(facets.subjects)} value={subjectFilter} onChange={(v) => { setSubjectFilter(v); setPage(0); }} />
          <FilterDropdown label="Chapter" options={toOptions(facets.chapters)} value={chapterFilter} onChange={(v) => { setChapterFilter(v); setPage(0); }} />
          <FilterDropdown label="Difficulty" options={DIFFICULTY_OPTIONS} value={difficultyFilter} onChange={(v) => { setDifficultyFilter(v); setPage(0); }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowMoreFilters((prev) => !prev)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            aria-expanded={showMoreFilters}
          >
            {showMoreFilters ? "Hide filters" : "More filters"}
          </button>
          {(searchTerm || filtersActive) && (
            <button type="button" onClick={clearAllFilters} className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Clear all
            </button>
          )}
        </div>
        {showMoreFilters && (
          <div className="mt-4 grid gap-3 border-t border-gray-100 pt-4 md:grid-cols-2 xl:grid-cols-5">
            <FilterDropdown label="Topic" options={toOptions(facets.topics)} value={topicFilter} onChange={(v) => { setTopicFilter(v); setPage(0); }} />
            <FilterDropdown label="Type" options={TYPE_OPTIONS} value={typeFilter} onChange={(v) => { setTypeFilter(v); setPage(0); }} />
            <FilterDropdown label="Status" options={STATUS_OPTIONS} value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(0); }} />
            <FilterDropdown label="Board" options={BOARD_OPTIONS} value={boardFilter} onChange={(v) => { setBoardFilter(v); setPage(0); }} />
            <FilterDropdown label="Class" options={CLASS_OPTIONS} value={classFilter} onChange={(v) => { setClassFilter(v); setPage(0); }} />
          </div>
        )}
      </div>

      <div className="max-w-xs">
        <FilterDropdown label="Sort by" options={SORT_OPTIONS} value={sortOrder} onChange={(v) => v && setSortOrder(v)} />
      </div>

      {renderBody()}

      {!loading && !error && sortedQuestions.length > 0 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={sortedQuestions.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}

      <QuestionForm
        key={formOpen ? `open-${editingQuestion?.id ?? "new"}` : "closed"}
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSave}
        question={editingQuestion}
      />

      <QuestionPreviewModal question={previewQuestion} onClose={() => setPreviewQuestion(null)} />

      <ConfirmDialog
        isOpen={Boolean(confirmDialog)}
        onClose={() => setConfirmDialog(null)}
        onConfirm={confirmDialog?.onConfirm}
        title={confirmDialog?.title}
        message={confirmDialog?.message}
        confirmLabel={confirmDialog?.confirmLabel}
        variant={confirmDialog?.variant}
      />
    </div>
  );
}
