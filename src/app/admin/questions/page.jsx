"use client";
import { useState, useEffect } from "react";
import { mockQuestions } from "../../data/mockQuestions";
import QuestionCard from "../../components/admin/QuestionCard";
import QuestionForm from "../../components/admin/questions/QuestionForm";
import SearchBox from "../../components/admin/SearchBox";
import FilterDropdown from "../../components/admin/FilterDropdown";
import Pagination from "../../components/admin/Pagination";
import LoadingSkeleton from "../../components/admin/LoadingSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { PlusCircle, Copy, CheckCircle, Archive, Trash2 } from "lucide-react";
import Button from "@/app/components/ui/Button";
import EmptyState from "@/app/components/admin/EmptyState";

const ITEMS_PER_PAGE = 10;

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [chapterFilter, setChapterFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setQuestions(mockQuestions);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSave = (question) => {
    if (editingQuestion) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === question.id ? { ...q, ...question } : q))
      );
    } else {
      setQuestions((prev) => [question, ...prev]);
    }
    setFormOpen(false);
    setEditingQuestion(null);
  };

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setFormOpen(true);
  };

  const handleDuplicate = (q) => {
    const newQuestion = {
      ...q,
      id: Date.now(),
      title: `${q.title} (Copy)`,
      slug: `${q.slug}-copy-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "draft",
    };
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const handleTogglePublish = (q) => {
    const newStatus = q.status === "published" ? "draft" : "published";
    setQuestions((prev) =>
      prev.map((item) =>
        item.id === q.id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleArchive = (q) => {
    setConfirmDialog({
      title: "Archive Question",
      message: `Are you sure you want to archive "${q.title}"? Archived questions can be restored later.`,
      confirmLabel: "Archive",
      variant: "danger",
      onConfirm: () => {
        setQuestions((prev) =>
          prev.map((item) =>
            item.id === q.id ? { ...item, status: "archived" } : item
          )
        );
        setConfirmDialog(null);
      },
    });
  };

  const handleDelete = (q) => {
    setConfirmDialog({
      title: "Delete Question",
      message: `Are you sure you want to permanently delete "${q.title}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: () => {
        setQuestions((prev) => prev.filter((item) => item.id !== q.id));
        setConfirmDialog(null);
      },
    });
  };

  const filteredQuestions = questions
    .filter((q) => q.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((q) => subjectFilter === "all" || q.subject === subjectFilter)
    .filter((q) => chapterFilter === "all" || q.chapter === chapterFilter)
    .filter(
      (q) => difficultyFilter === "all" || q.difficulty === difficultyFilter
    )
    .filter((q) => typeFilter === "all" || q.questionType === typeFilter);

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortOrder === "newest") return (b.id || 0) - (a.id || 0);
    if (sortOrder === "oldest") return (a.id || 0) - (b.id || 0);
    if (sortOrder === "difficulty-asc")
      return (
        ["Easy", "Medium", "Hard"].indexOf(a.difficulty) -
        ["Easy", "Medium", "Hard"].indexOf(b.difficulty)
      );
    if (sortOrder === "difficulty-desc")
      return (
        ["Easy", "Medium", "Hard"].indexOf(b.difficulty) -
        ["Easy", "Medium", "Hard"].indexOf(a.difficulty)
      );
    return 0;
  });

  const paginatedQuestions = sortedQuestions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedQuestions.length / ITEMS_PER_PAGE);

  const subjects = ["all", ...new Set(mockQuestions.map((q) => q.subject))];
  const chapters = ["all", ...new Set(mockQuestions.map((q) => q.chapter))];
  const difficulties = ["all", "Easy", "Medium", "Hard"];
  const types = ["all", ...new Set(mockQuestions.map((q) => q.questionType))];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-6 mt-6">
          {[...Array(5)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return <ErrorState message={error} />;
    }

    if (paginatedQuestions.length === 0) {
      return (
        <div className="mt-6">
          <EmptyState
            icon="❓"
            title="No questions found"
            description={
              searchTerm || subjectFilter !== "all" || chapterFilter !== "all" || difficultyFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No questions have been created yet."
            }
            action={
              <Button onClick={() => { setEditingQuestion(null); setFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add First Question
              </Button>
            }
          />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 mt-6">
        {paginatedQuestions.map((question) => (
          <div key={question.id} className="relative group">
            <QuestionCard question={question} />
            {/* Admin Actions Overlay */}
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(question)}
                className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-amber-600 hover:bg-amber-50 transition-colors"
                title="Edit question"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button
                onClick={() => handleDuplicate(question)}
                className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors"
                title="Duplicate question"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleTogglePublish(question)}
                className={`p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 transition-colors ${question.status === "published" ? "text-emerald-600 hover:bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}
                title={question.status === "published" ? "Unpublish" : "Publish"}
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleArchive(question)}
                className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                title="Archive question"
              >
                <Archive className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(question)}
                className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-red-600 hover:bg-red-50 transition-colors"
                title="Delete question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {/* Status badge */}
            {question.status && question.status !== "published" && (
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                  question.status === "draft" ? "bg-amber-100 text-amber-700" :
                  question.status === "archived" ? "bg-gray-100 text-gray-600" :
                  "bg-blue-100 text-blue-700"
                }`}>
                  {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-sm text-gray-500 mt-1">
            {sortedQuestions.length} questions · {questions.filter((q) => q.status === "published").length} published
          </p>
        </div>
        <Button onClick={() => { setEditingQuestion(null); setFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Question
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <SearchBox onSearch={handleSearch} />
          <FilterDropdown
            options={subjects}
            value={subjectFilter}
            onChange={(e) => { setSubjectFilter(e.target.value); setCurrentPage(1); }}
            title="Subject"
          />
          <FilterDropdown
            options={chapters}
            value={chapterFilter}
            onChange={(e) => { setChapterFilter(e.target.value); setCurrentPage(1); }}
            title="Chapter"
          />
          <FilterDropdown
            options={difficulties}
            value={difficultyFilter}
            onChange={(e) => { setDifficultyFilter(e.target.value); setCurrentPage(1); }}
            title="Difficulty"
          />
          <FilterDropdown
            options={types}
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            title="Type"
          />
        </div>
        <div className="flex justify-end mb-4">
          <FilterDropdown
            options={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
              { value: "difficulty-asc", label: "Difficulty (Asc)" },
              { value: "difficulty-desc", label: "Difficulty (Desc)" },
            ]}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            title="Sort by"
          />
        </div>
      </div>

      {renderContent()}

      {!loading && !error && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Question Form Modal */}
      <QuestionForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingQuestion(null); }}
        onSave={handleSave}
        question={editingQuestion}
      />

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