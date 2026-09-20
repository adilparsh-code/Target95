"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import FilterPanel from "../../components/admin/ai-generator/FilterPanel";
import ExportPanel from "../../components/admin/ai-generator/ExportPanel";
import GeneratedQuestionCard from "../../components/admin/ai-generator/GeneratedQuestionCard";
import EmptyState from "../../components/admin/ai-generator/EmptyState";
import { QuestionGeneratorService } from "../../services/QuestionGeneratorService";

export default function GeneratedQuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: "",
    chapter: "",
    difficulty: "",
    type: "",
    board: "",
  });

  const [refreshNonce, setRefreshNonce] = useState(0);
  /** Re-fetch in place (event-handler safe). */
  const refresh = useCallback(() => setRefreshNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const data = await QuestionGeneratorService.getAllQuestions();
        if (!cancelled) setQuestions(data);
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [refreshNonce]);

  // Derived filter state — recomputed on questions/filters change without effects.
  const filteredQuestions = useMemo(() => {
    let filtered = [...questions];

    if (filters.subject) {
      filtered = filtered.filter(q => q.subject === filters.subject);
    }
    if (filters.chapter) {
      filtered = filtered.filter(q => q.chapter === filters.chapter);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(q => q.difficulty === filters.difficulty);
    }
    if (filters.type) {
      filtered = filtered.filter(q => (q.questionType || q.type) === filters.type);
    }
    if (filters.board) {
      filtered = filtered.filter(q => q.board === filters.board);
    }

    return filtered;
  }, [questions, filters]);

  const handleDelete = async (id) => {
    try {
      await QuestionGeneratorService.deleteQuestion(id);
      refresh();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      await QuestionGeneratorService.updateQuestion(id, updates);
      refresh();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (questions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Generated Questions</h1>
        <ExportPanel questions={filteredQuestions} />
      </div>
      
      <FilterPanel filters={filters} onFilterChange={setFilters} questions={questions} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((question) => (
          <GeneratedQuestionCard
            key={question.id}
            question={question}
            onDelete={() => handleDelete(question.id)}
            onUpdate={(updates) => handleUpdate(question.id, updates)}
          />
        ))}
      </div>
      
      {filteredQuestions.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No questions match the selected filters.
        </div>
      )}
    </div>
  );
}