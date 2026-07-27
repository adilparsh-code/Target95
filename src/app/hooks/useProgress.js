"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs, getDoc, updateDoc, doc, serverTimestamp, getFirestore } from "firebase/firestore";
import { ProgressService } from "@/lib/firestore/database";
import useFirestore from "./useFirestore";
import { useFirestoreQuery } from "./useFirestore";

const PROGRESS_STORAGE_KEY = "target95-completed-questions";
const PROGRESS_UPDATED_EVENT = "target95-progress-updated";
const isQuestionId = (value) => typeof value === "string" || Number.isFinite(value);

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
            isQuestionId(item?.questionId)
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
      syncLocalProgress();
    }
  }, [userId, queryDocuments, syncLocalProgress]);

  // Update progress in Firestore
  const updateFirestoreProgress = useCallback(async (chapterId, updates) => {
    if (!userId) return;
    
    try {
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

    if (userId) {
      try {
        const savedItem = await addDocument("progress", newProgressItem);
        const updatedProgress = nextProgress.map(item => 
          getQuestionKey(item) === questionKey ? { ...item, id: savedItem.id } : item
        );
        completedQuestionsRef.current = updatedProgress;
        saveCompletedQuestions(updatedProgress);
        setCompletedQuestions(updatedProgress);
        return;
      } catch (err) {
        console.error("Error adding progress to Firestore:", err);
      }
    }

    completedQuestionsRef.current = nextProgress;
    saveCompletedQuestions(nextProgress);
    setCompletedQuestions(nextProgress);
  }, [userId, addDocument]);

  const resetProgress = useCallback(async (chapter) => {
    const chapterProgress = completedQuestionsRef.current.filter(
      (completedQuestion) => completedQuestion.chapter === chapter
    );
    
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
    fetchUserProgress: fetchFirestoreProgress,
  };
}

// Named export: useUserProgress (compatible with src/hooks/useProgress)
export function useUserProgress(userId) {
  const progressRef = collection(getFirestore(), "progress");
  const q = query(progressRef, where("userId", "==", userId));

  const { data, loading, error, refresh } = useFirestoreQuery(q);

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

// Named export: useChapterProgress
export function useChapterProgress(userId, chapterId) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      const q = query(
        collection(db, "progress"),
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

// Named export: updateProgress utility
export const updateProgress = async (progressId, updates) => {
  try {
    if (progressId) {
      await ProgressService.update(progressId, {
        ...updates,
        lastVisited: serverTimestamp(),
      });
    } else {
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

// Named export: recordQuestionAttempt utility
export const recordQuestionAttempt = async (progressId, isCorrect) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "progress", progressId);
    
    const updates = {
      questionsSolved: 1,
      lastVisited: serverTimestamp(),
    };

    if (isCorrect) {
      updates.correctAnswers = 1;
    }

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
