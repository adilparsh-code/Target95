"use client";

import { useCallback, useState } from "react";
import useFirestore from "./useFirestore";

export default function useQuestions() {
  const { loading, error, getCollection, getDocument, queryDocuments, addDocument, updateDocument, deleteDocument } = useFirestore();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Fetch all questions
  const fetchAllQuestions = useCallback(async () => {
    try {
      const data = await getCollection("questions");
      setQuestions(data);
      return data;
    } catch (err) {
      console.error("Error fetching questions:", err);
      throw err;
    }
  }, [getCollection]);

  // Fetch questions by chapter
  const fetchQuestionsByChapter = useCallback(async (chapterSlug) => {
    try {
      const data = await queryDocuments("questions", [
        { field: "chapter", operator: "==", value: chapterSlug }
      ]);
      setQuestions(data);
      return data;
    } catch (err) {
      console.error("Error fetching questions by chapter:", err);
      throw err;
    }
  }, [queryDocuments]);

  // Fetch a single question by ID
  const fetchQuestionById = useCallback(async (questionId) => {
    try {
      const data = await getDocument("questions", questionId);
      setCurrentQuestion(data);
      return data;
    } catch (err) {
      console.error("Error fetching question:", err);
      throw err;
    }
  }, [getDocument]);

  // Add a new question
  const addQuestion = useCallback(async (questionData) => {
    try {
      const newQuestion = await addDocument("questions", {
        ...questionData,
        createdAt: new Date().toISOString()
      });
      setQuestions(prev => [...prev, newQuestion]);
      return newQuestion;
    } catch (err) {
      console.error("Error adding question:", err);
      throw err;
    }
  }, [addDocument]);

  // Update an existing question
  const updateQuestion = useCallback(async (questionId, questionData) => {
    try {
      const updatedQuestion = await updateDocument("questions", questionId, questionData);
      setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, ...questionData } : q));
      return updatedQuestion;
    } catch (err) {
      console.error("Error updating question:", err);
      throw err;
    }
  }, [updateDocument]);

  // Delete a question
  const deleteQuestion = useCallback(async (questionId) => {
    try {
      await deleteDocument("questions", questionId);
      setQuestions(prev => prev.filter(q => q.id !== questionId));
      return true;
    } catch (err) {
      console.error("Error deleting question:", err);
      throw err;
    }
  }, [deleteDocument]);

  return {
    loading,
    error,
    questions,
    currentQuestion,
    fetchAllQuestions,
    fetchQuestionsByChapter,
    fetchQuestionById,
    addQuestion,
    updateQuestion,
    deleteQuestion
  };
}