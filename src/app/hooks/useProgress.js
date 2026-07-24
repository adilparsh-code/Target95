"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { ProgressService } from "@/lib/firestore/database";
import useFirestore from "./useFirestore";

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
  const completedQuestionsRef = useRef([]);
  const { loading, error, queryDocuments, addDocument, deleteDocument, subscribeToCollection } = useFirestore();

  // Sync from localStorage
  const syncLocalProgress = useCallback(() => {
    const savedProgress = readCompletedQuestions();
    completedQuestionsRef.current = savedProgress;
    setCompletedQuestions(savedProgress);
  }, []);

  // Fetch from Firestore if user is authenticated
  const fetchFirestoreProgress = useCallback(async () => {
    if (!userId) {
      syncLocalProgress();
      return;
    }

    try {
      const progress = await queryDocuments("progress", [
        { field: "userId", operator: "==", value: userId }
      ]);
      setFirestoreProgress(progress);
    } catch (error) {
      console.error("Error fetching Firestore progress:", error);
      // Fallback to localStorage
      syncLocalProgress();
    }
  }, [userId, queryDocuments, syncLocalProgress]);

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
    if (!userId) {
      syncLocalProgress();
      return;
    }

    const fetchAndSyncProgress = async () => {
      try {
        const progress = await queryDocuments("progress", [
          { field: "userId", operator: "==", value: userId },
        ]);
        completedQuestionsRef.current = progress;
        setCompletedQuestions(progress);
        saveCompletedQuestions(progress);
      } catch (err) {
        console.error("Error fetching progress from Firestore:", err);
        // Fallback to localStorage
        syncLocalProgress();
      }
    };

    fetchAndSyncProgress();

    const unsubscribe = subscribeToCollection("progress", (data) => {
      const userProgress = data.filter((item) => item.userId === userId);
      completedQuestionsRef.current = userProgress;
      setCompletedQuestions(userProgress);
      saveCompletedQuestions(userProgress);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId, queryDocuments, subscribeToCollection, syncLocalProgress]);

  const isCompleted = useCallback(
    (question) =>
      completedQuestions.some(
        (completedQuestion) =>
          getQuestionKey(completedQuestion) === getQuestionKey(question)
      ),
    [completedQuestions]
  );

  const markCompleted = useCallback(async (question) => {
    const questionKey = getQuestionKey(question);

    if (
      completedQuestionsRef.current.some(
        (completedQuestion) => getQuestionKey(completedQuestion) === questionKey
      )
    ) {
      return;
    }

    const newProgressItem = { ...question, userId, completedAt: new Date().toISOString() };
    const nextProgress = [...completedQuestionsRef.current, newProgressItem];

    // If we have userId, also add to Firestore
    if (userId) {
      try {
        const savedItem = await addDocument("progress", newProgressItem);
        // Update with Firestore ID
        const updatedProgress = nextProgress.map(item => 
          getQuestionKey(item) === questionKey ? { ...item, id: savedItem.id } : item
        );
        completedQuestionsRef.current = updatedProgress;
        saveCompletedQuestions(updatedProgress);
        setCompletedQuestions(updatedProgress);
        return;
      } catch (err) {
        console.error("Error adding progress to Firestore:", err);
        // Continue with local save
      }
    }

    completedQuestionsRef.current = nextProgress;
    saveCompletedQuestions(nextProgress);
    setCompletedQuestions(nextProgress);
  }, [userId, addDocument]);

  const resetProgress = useCallback(async (chapter) => {
    // Get all progress items for this chapter to delete from Firestore
    const chapterProgress = completedQuestionsRef.current.filter(
      (completedQuestion) => completedQuestion.chapter === chapter
    );
    
    // If we have userId, delete from Firestore
    if (userId && chapterProgress.length > 0) {
      try {
        await Promise.all(
          chapterProgress.map(async (item) => {
            if (item.id) {
              await deleteDocument("progress", item.id);
            }
          })
        );
      } catch (err) {
        console.error("Error resetting progress in Firestore:", err);
      }
    }

    const nextProgress = completedQuestionsRef.current.filter(
      (completedQuestion) => completedQuestion.chapter !== chapter
    );

    completedQuestionsRef.current = nextProgress;
    saveCompletedQuestions(nextProgress);
    setCompletedQuestions(nextProgress);
  }, [userId, deleteDocument]);

  const stats = getStats();
  const overallAccuracy = stats.totalQuestionsSolved > 0 
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsSolved) * 100) 
    : 0;

  return {
    completedQuestions,
    loading,
    error,
    isCompleted,
    markCompleted,
    resetProgress,
    firestoreProgress,
    updateFirestoreProgress,
    recordQuestionAttempt,
    refresh: fetchFirestoreProgress,
    stats: { ...stats, overallAccuracy },
    fetchUserProgress: fetchFirestoreProgress, // Added for compatibility
  };
}