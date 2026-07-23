"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, ProgressService } from "@/lib/firestore/database";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { useFirestoreQuery } from "./useFirestore";

export function useUserProgress(userId) {
  const progressRef = collection(db, COLLECTIONS.PROGRESS);
  const q = query(progressRef, where("userId", "==", userId));

  const { data, loading, error, refresh } = useFirestoreQuery(q);

  // Calculate overall statistics
  const stats = data.reduce(
    (acc, item) => {
      acc.totalQuestionsSolved += item.questionsSolved || 0;
      acc.totalCorrectAnswers += item.correctAnswers || 0;
      acc.totalStudyTime += item.studyTime || 0;
      acc.maxStreak = Math.max(acc.maxStreak, item.streak || 0);
      return acc;
    },
    { totalQuestionsSolved: 0, totalCorrectAnswers: 0, totalStudyTime: 0, maxStreak: 0 }
  );

  const overallAccuracy = stats.totalQuestionsSolved > 0 
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsSolved) * 100) 
    : 0;

  return {
    progress: data,
    loading,
    error,
    refresh,
    stats: { ...stats, overallAccuracy },
  };
}

export function useChapterProgress(userId, chapterId) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, COLLECTIONS.PROGRESS),
        where("userId", "==", userId),
        where("chapterId", "==", chapterId)
      );

      const snapshot = await getDocs(q);
      if (snapshot.docs.length > 0) {
        setProgress({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      } else {
        setProgress(null);
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching chapter progress:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, chapterId]);

  useEffect(() => {
    if (userId && chapterId) {
      fetchProgress();
    }
  }, [userId, chapterId, fetchProgress]);

  return { progress, loading, error, refresh: fetchProgress };
}

export async function updateProgress(progressId, updates) => {
  try {
    if (progressId) {
      // Update existing progress document
      await ProgressService.update(progressId, {
        ...updates,
        lastVisited: serverTimestamp(),
      });
    } else {
      // Create new progress document
      const newProgress = await ProgressService.create({
        ...updates,
        lastVisited: serverTimestamp(),
      });
      return newProgress;
    }
    return true;
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
};

export function recordQuestionAttempt = async (progressId, isCorrect) => {
  try {
    const docRef = doc(db, COLLECTIONS.PROGRESS, progressId);
    
    const updates = {
      questionsSolved: 1,
      lastVisited: serverTimestamp(),
    };

    if (isCorrect) {
      updates.correctAnswers = 1;
    }

    // Recalculate accuracy
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      const newQuestionsSolved = (data.questionsSolved || 0) + 1;
      const newCorrectAnswers = (data.correctAnswers || 0) + (isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrectAnswers / newQuestionsSolved) * 100);
      
      await updateDoc(docRef, {
        questionsSolved: newQuestionsSolved,
        correctAnswers: newCorrectAnswers,
        accuracy: newAccuracy,
        ...updates,
      });
    }

    return true;
  } catch (error) {
    console.error("Error recording question attempt:", error);
    throw error;
  }
};