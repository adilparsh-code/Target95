"use client";

import QuestionSearch from "../../components/admin/ai-generator/QuestionSearch";
import QuestionFilters from "../../components/admin/ai-generator/QuestionFilters";
import QuestionToolbar from "../../components/admin/ai-generator/QuestionToolbar";
import ExportPanel from "../../components/admin/ai-generator/ExportPanel";
import LoadingState from "../../components/admin/ai-generator/LoadingState";
import EmptyState from "../../components/admin/ai-generator/EmptyState";
import GeneratedQuestionCard from "../../components/admin/ai-generator/GeneratedQuestionCard";
import { useQuestionLibrary } from "../../hooks/useQuestionLibrary";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function QuestionLibraryPage() {
  const {
    filteredQuestions,
    isLoading,
    error,
    selectedIds,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    toggleSelectAll,
    toggleSelect,
    bulkDelete,
    bulkPublish,
    bulkApprove,
    bulkExport
  } = useQuestionLibrary();

  const allSelected = filteredQuestions.length > 0 && selectedIds.length === filteredQuestions.length;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Question Library</h1>
        <div className="flex items-center gap-4">
          {selectedIds.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedIds.length} selected
            </span>
          )}
          <ExportPanel questions={filteredQuestions} />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={bulkApprove}>
              Bulk Approve
            </Button>
            <Button size="sm" onClick={bulkPublish}>
              Bulk Publish
            </Button>
            <Button size="sm" variant="danger" onClick={bulkDelete}>
              Bulk Delete
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <QuestionFilters 
            filters={filters} 
            onFilterChange={setFilters}
            questions={filteredQuestions}
          />
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          <QuestionSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <div className="flex items-center mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(question.id)}
                    onChange={() => toggleSelect(question.id)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                </div>
                <GeneratedQuestionCard 
                  question={question}
                  onDelete={() => {}}
                  onUpdate={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}