"use client";

import { useCallback, useState, useEffect } from "react";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import useFirestore from "./useFirestore";
import { useFirestoreQuery, usePaginatedFirestore } from "./useFirestore";
import { COLLECTIONS } from "@/lib/firestore/collections";

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

// Named export: useQuestions (with filters)
export function useQuestionsByFilters(filters = {}) {
  const db = getFirestore();
  const questionsRef = collection(db, COLLECTIONS.QUESTIONS);
  const { subjectId, chapterId, difficulty, limit: limitCount = 50 } = filters;

  const buildQuery = () => {
    let q = questionsRef;
    const constraints = [];

    if (subjectId) constraints.push(where("subjectId", "==", subjectId));
    if (chapterId) constraints.push(where("chapterId", "==", chapterId));
    if (difficulty) constraints.push(where("difficulty", "==", difficulty));

    return query(q, ...constraints);
  };

  const { data, loading, error, refresh } = useFirestoreQuery(buildQuery());

  return { questions: data, loading, error, refresh };
}

// Named export: useQuestionsBySubject
export function useQuestionsBySubject(subjectId, options = {}) {
  const db = getFirestore();
  const questionsRef = collection(db, COLLECTIONS.QUESTIONS);
  const { limit: limitCount = 50 } = options;

  const { data, loading, error, hasMore, loadMore, refresh } = usePaginatedFirestore(
    query(questionsRef, where("subjectId", "==", subjectId)),
    { limit: limitCount }
  );

  return { questions: data, loading, error, hasMore, loadMore, refresh };
}

// Named export: useRandomQuestions
export function useRandomQuestions(subjectId, chapterId, count = 10) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      const q = query(
        collection(db, COLLECTIONS.QUESTIONS),
        where("subjectId", "==", subjectId),
        where("chapterId", "==", chapterId)
      );

      const snapshot = await getDocs(q);
      const allQuestions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Shuffle and take requested count
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, Math.min(count, shuffled.length)));
    } catch (err) {
      setError(err);
      console.error("Error fetching random questions:", err);
    } finally {
      setLoading(false);
    }
  }, [subjectId, chapterId, count]);

  useEffect(() => {
    if (subjectId && chapterId) {
      fetchRandomQuestions();
    }
  }, [subjectId, chapterId, fetchRandomQuestions]);

  return { questions, loading, error, refresh: fetchRandomQuestions };
}