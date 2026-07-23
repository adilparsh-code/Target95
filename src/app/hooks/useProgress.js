"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, ProgressService } from "@/lib/firestore/database";
import { COLLECTIONS } from "@/lib/firestore/collections";

const PROGRESS_STORAGE_KEY = "target95-completed-questions";
const PROGRESS_UPDATED_EVENT = "target95-progress-updated";

function getQuestionKey({ chapter, questionId }) {
  return `${chapter}:${questionId}`;
}

function readCompletedQuestions() {
  try {
    const savedProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);

    if (!savedProgress) {
      return [];
    }

    const parsedProgress = JSON.parse(savedProgress);

    return Array.isArray(parsedProgress)
      ? parsedProgress.filter(
          (item) =>
            typeof item?.chapter === "string" &&
            Number.isFinite(item?.questionId)
        )
      : [];
  } catch {
    return [];
  }
}

function saveCompletedQuestions(completedQuestions) {
  try {
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(completedQuestions)
    );
    window.dispatchEvent(new Event(PROGRESS_UPDATED_EVENT));
  } catch {
    // Keep the current session usable if browser storage is unavailable.
  }
}

// Main hook that supports both localStorage and Firestore
export default function useProgress(userId = null) {
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [firestoreProgress, setFirestoreProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const completedQuestionsRef = useRef([]);

  // Sync from localStorage
  const syncLocalProgress = useCallback(() => {
    const savedProgress = readCompletedQuestions();
    completedQuestionsRef.current = savedProgress;
    setCompletedQuestions(savedProgress);
  }, []);

  // Fetch from Firestore if user is authenticated
  const fetchFirestoreProgress = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const q = query(
        collection(db, COLLECTIONS.PROGRESS),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const progress = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirestoreProgress(progress);
    } catch (error) {
      console.error("Error fetching Firestore progress:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Update progress in Firestore
  const updateFirestoreProgress = useCallback(async (chapterId, updates) => {
    if (!userId) return;
    
    try {
      // Find existing progress document for this chapter
      const existingProgress = firestoreProgress.find(p => p.chapterId === chapterId);
      
      if (existingProgress) {
        await ProgressService.update(existingProgress.id, {
          ...updates,
          lastVisited: serverTimestamp(),
        });
      } else {
        await ProgressService.create({
          userId,
          chapterId,
          questionsSolved: 1,
          correctAnswers: 0,
          accuracy: 0,
          studyTime: 0,
          lastVisited: serverTimestamp(),
          streak: 1,
          ...updates,
        });
      }
      
      // Refresh progress after update
      await fetchFirestoreProgress();
    } catch (error) {
      console.error("Error updating Firestore progress:", error);
    }
  }, [userId, firestoreProgress, fetchFirestoreProgress]);

  // Record question attempt in Firestore
  const recordQuestionAttempt = useCallback(async (chapterId, isCorrect) => {
    if (!userId) return;
    
    try {
      const existingProgress = firestoreProgress.find(p => p.chapterId === chapterId);
      
      if (existingProgress) {
        const newQuestionsSolved = (existingProgress.questionsSolved || 0) + 1;
        const newCorrectAnswers = (existingProgress.correctAnswers || 0) + (isCorrect ? 1 : 0);
        const newAccuracy = Math.round((newCorrectAnswers / newQuestionsSolved) * 100);
        
        await ProgressService.update(existingProgress.id, {
          questionsSolved: newQuestionsSolved,
          correctAnswers: newCorrectAnswers,
          accuracy: newAccuracy,
          lastVisited: serverTimestamp(),
        });
      } else {
        await ProgressService.create({
          userId,
          chapterId,
          questionsSolved: 1,
          correctAnswers: isCorrect ? 1 : 0,
          accuracy: isCorrect ? 100 : 0,
          studyTime: 0,
          lastVisited: serverTimestamp(),
          streak: 1,
        });
      }
      
      await fetchFirestoreProgress();
    } catch (error) {
      console.error("Error recording question attempt:", error);
    }
  }, [userId, firestoreProgress, fetchFirestoreProgress]);

  // Calculate overall statistics from Firestore data
  const getStats = useCallback(() => {
    return firestoreProgress.reduce(
      (acc, item) => {
        acc.totalQuestionsSolved += item.questionsSolved || 0;
        acc.totalCorrectAnswers += item.correctAnswers || 0;
        acc.totalStudyTime += item.studyTime || 0;
        acc.maxStreak = Math.max(acc.maxStreak, item.streak || 0);
        return acc;
      },
      { totalQuestionsSolved: 0, totalCorrectAnswers: 0, totalStudyTime: 0, maxStreak: 0 }
    );
  }, [firestoreProgress]);

  useEffect(() => {
    syncLocalProgress();
    if (userId) {
      fetchFirestoreProgress();
    }
  }, [syncLocalProgress, userId, fetchFirestoreProgress]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === PROGRESS_STORAGE_KEY) {
        syncLocalProgress();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(PROGRESS_UPDATED_EVENT, syncLocalProgress);
    const syncTimeout = window.setTimeout(syncLocalProgress, 0);

    return () => {
      window.clearTimeout(syncTimeout);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(PROGRESS_UPDATED_EVENT, syncLocalProgress);
    };
  }, [syncLocalProgress]);

  const isCompleted = useCallback(
    (question) =>
      completedQuestions.some(
        (completedQuestion) =>
          getQuestionKey(completedQuestion) === getQuestionKey(question)
      ),
    [completedQuestions]
  );

  const markCompleted = useCallback((question) => {
    const questionKey = getQuestionKey(question);

    if (
      completedQuestionsRef.current.some(
        (completedQuestion) => getQuestionKey(completedQuestion) === questionKey
      )
    ) {
      return;
    }

    const nextProgress = [...completedQuestionsRef.current, question];

    completedQuestionsRef.current = nextProgress;
    saveCompletedQuestions(nextProgress);
    setCompletedQuestions(nextProgress);
  }, []);

  const resetProgress = useCallback((chapter) => {
    const nextProgress = completedQuestionsRef.current.filter(
      (completedQuestion) => completedQuestion.chapter !== chapter
    );

    completedQuestionsRef.current = nextProgress;
    saveCompletedQuestions(nextProgress);
    setCompletedQuestions(nextProgress);
  }, []);

  const stats = getStats();
  const overallAccuracy = stats.totalQuestionsSolved > 0 
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsSolved) * 100) 
    : 0;

  return {
    // localStorage functionality (backward compatible)
    completedQuestions,
    isCompleted,
    markCompleted,
    resetProgress,
    // Firestore functionality
    firestoreProgress,
    loading,
    updateFirestoreProgress,
    recordQuestionAttempt,
    refresh: fetchFirestoreProgress,
    stats: { ...stats, overallAccuracy },
  };
}

// Legacy export for backward compatibility
export { useUserProgress } from "@/hooks/useProgress";
export { useChapterProgress, updateProgress } from "@/hooks/useProgress";