"use client";

import { useState, useEffect } from "react";
import { QuestionGeneratorService } from "../services/QuestionGeneratorService";

export function useQuestionLibrary() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    class: "",
    board: "",
    chapter: "",
    difficulty: "",
    questionType: "",
    status: "",
    createdDate: ""
  });

  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await QuestionGeneratorService.getAllQuestions();
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (err) {
      console.error("Error loading questions:", err);
      setError(err.message || "Failed to load questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...questions];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(query) ||
        q.subject.toLowerCase().includes(query) ||
        q.chapter.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.subject) {
      filtered = filtered.filter(q => q.subject === filters.subject);
    }
    if (filters.class) {
      filtered = filtered.filter(q => q.class === filters.class);
    }
    if (filters.board) {
      filtered = filtered.filter(q => q.board === filters.board);
    }
    if (filters.chapter) {
      filtered = filtered.filter(q => q.chapter === filters.chapter);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(q => q.difficulty === filters.difficulty);
    }
    if (filters.questionType) {
      filtered = filtered.filter(q => (q.type || q.questionType) === filters.questionType);
    }
    if (filters.status) {
      filtered = filtered.filter(q => q.status === filters.status);
    }

    setFilteredQuestions(filtered);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredQuestions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredQuestions.map(q => q.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const bulkDelete = async () => {
    try {
      for (const id of selectedIds) {
        await QuestionGeneratorService.deleteQuestion(id);
      }
      clearSelection();
      await loadQuestions();
    } catch (err) {
      console.error("Error bulk deleting questions:", err);
      setError(err.message || "Failed to delete questions. Please try again.");
    }
  };

  const bulkPublish = async () => {
    try {
      for (const id of selectedIds) {
        await QuestionGeneratorService.publishQuestion(id);
      }
      clearSelection();
      await loadQuestions();
    } catch (err) {
      console.error("Error bulk publishing questions:", err);
      setError(err.message || "Failed to publish questions. Please try again.");
    }
  };

  const bulkApprove = async () => {
    try {
      for (const id of selectedIds) {
        await QuestionGeneratorService.approveQuestion(id);
      }
      clearSelection();
      await loadQuestions();
    } catch (err) {
      console.error("Error bulk approving questions:", err);
      setError(err.message || "Failed to approve questions. Please try again.");
    }
  };

  const bulkExport = (format) => {
    const selectedQuestions = questions.filter(q => selectedIds.includes(q.id));
    QuestionGeneratorService.exportQuestions(selectedQuestions.length > 0 ? selectedQuestions : filteredQuestions, format);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchQuery, filters, questions]);

  return {
    questions,
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
    clearSelection,
    bulkDelete,
    bulkPublish,
    bulkApprove,
    bulkExport,
    loadQuestions
  };
}