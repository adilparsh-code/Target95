"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firestore/database";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { useFirestore, useFirestoreQuery } from "./useFirestore";

export function useQuestions(filters = {}) {
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

export function useQuestionsBySubject(subjectId, options = {}) {
  const questionsRef = collection(db, COLLECTIONS.QUESTIONS);
  const { limit: limitCount = 50 } = options;

  const { data, loading, error, hasMore, loadMore, refresh } = useFirestore(
    query(questionsRef, where("subjectId", "==", subjectId)),
    { limit: limitCount }
  );

  return { questions: data, loading, error, hasMore, loadMore, refresh };
}

export function useRandomQuestions(subjectId, chapterId, count = 10) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomQuestions = useCallback(async () => {
    try {
      setLoading(true);
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