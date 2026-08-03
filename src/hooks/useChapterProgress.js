"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { progressStorage } from "@/lib/progress/storage";
import { calculateAccuracy, calculateProgress, calculateCompletion, LearningStatus } from "@/lib/progress/utils";

/**
 * Hook for tracking chapter-level progress
 * Supports: Not Started, In Progress, Completed
 */
export default function useChapterProgress(userId, chapterId) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load chapter progress
  useEffect(() => {
    if (!userId || !chapterId) {
      setLoading(false);
      return;
    }

    try {
      const chapterProgress = progressStorage.getChapterProgress(userId, chapterId);
      setProgress(chapterProgress);
    } catch (err) {
      setError(err);
      console.error("Error loading chapter progress:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, chapterId]);

  // ==================== Computed Values ====================

  const status = useMemo(() => {
    if (!progress) return LearningStatus.NOT_STARTED;
    return progress.status || LearningStatus.NOT_STARTED;
  }, [progress]);

  const progressPercentage = useMemo(() => {
    if (!progress) return 0;
    return progress.progress || 0;
  }, [progress]);

  const isNotStarted = useMemo(() => status === LearningStatus.NOT_STARTED, [status]);
  const isInProgress = useMemo(() => status === LearningStatus.IN_PROGRESS, [status]);
  const isCompleted = useMemo(() => status === LearningStatus.COMPLETED, [status]);

  const stats = useMemo(() => {
    if (!progress) {
      return {
        questionsSolved: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        accuracy: 0,
        studyTime: 0,
      };
    }

    return {
      questionsSolved: progress.questionsSolved || 0,
      correctAnswers: progress.correctAnswers || 0,
      totalQuestions: progress.totalQuestions || 0,
      accuracy: progress.accuracy || 0,
      studyTime: progress.studyTime || 0,
    };
  }, [progress]);

  // ==================== Actions ====================

  /**
   * Initialize chapter progress
   * @param {number} totalQuestions - Total questions in chapter
   */
  const initialize = useCallback((totalQuestions = 0) => {
    if (!userId || !chapterId) return null;

    const updated = progressStorage.updateChapterProgress(userId, chapterId, (current) => {
      if (current && current.status !== LearningStatus.NOT_STARTED) {
        return current; // Already initialized
      }

      return {
        ...current,
        userId,
        chapterId,
        status: LearningStatus.NOT_STARTED,
        totalQuestions,
        questionsSolved: 0,
        correctAnswers: 0,
        accuracy: 0,
        studyTime: 0,
        lastVisited: new Date().toISOString(),
      };
    });

    setProgress(updated);
    return updated;
  }, [userId, chapterId]);

  /**
   * Start chapter (mark as in progress)
   */
  const startChapter = useCallback(() => {
    if (!userId || !chapterId) return null;

    const updated = progressStorage.updateChapterProgress(userId, chapterId, (current) => ({
      ...current,
      status: LearningStatus.IN_PROGRESS,
      lastVisited: new Date().toISOString(),
    }));

    setProgress(updated);
    return updated;
  }, [userId, chapterId]);

  /**
   * Record question attempt in chapter
   * @param {boolean} isCorrect - Whether answer was correct
   * @param {number} studyTime - Study time in minutes
   */
  const recordQuestion = useCallback((isCorrect, studyTime = 0) => {
    if (!userId || !chapterId) return null;

    const updated = progressStorage.updateChapterProgress(userId, chapterId, (current) => {
      const newQuestionsSolved = (current.questionsSolved || 0) + 1;
      const newCorrectAnswers = (current.correctAnswers || 0) + (isCorrect ? 1 : 0);
      const newAccuracy = calculateAccuracy(newCorrectAnswers, newQuestionsSolved);
      const newStudyTime = (current.studyTime || 0) + studyTime;
      const progressPercent = calculateProgress(newQuestionsSolved, current.totalQuestions || 1);
      const status = calculateCompletion(progressPercent);

      return {
        ...current,
        questionsSolved: newQuestionsSolved,
        correctAnswers: newCorrectAnswers,
        accuracy: newAccuracy,
        studyTime: newStudyTime,
        progress: progressPercent,
        status,
        lastVisited: new Date().toISOString(),
        completedAt: status === LearningStatus.COMPLETED ? new Date().toISOString() : current.completedAt,
      };
    });

    setProgress(updated);
    return updated;
  }, [userId, chapterId]);

  /**
   * Complete chapter
   */
  const complete = useCallback(() => {
    if (!userId || !chapterId) return null;

    const updated = progressStorage.updateChapterProgress(userId, chapterId, (current) => ({
      ...current,
      status: LearningStatus.COMPLETED,
      progress: 100,
      completedAt: new Date().toISOString(),
      lastVisited: new Date().toISOString(),
    }));

    setProgress(updated);
    return updated;
  }, [userId, chapterId]);

  /**
   * Reset chapter progress
   */
  const reset = useCallback(() => {
    if (!userId || !chapterId) return null;

    const updated = progressStorage.updateChapterProgress(userId, chapterId, (current) => ({
      ...current,
      status: LearningStatus.NOT_STARTED,
      questionsSolved: 0,
      correctAnswers: 0,
      accuracy: 0,
      studyTime: 0,
      progress: 0,
      completedAt: null,
      lastVisited: new Date().toISOString(),
    }));

    setProgress(updated);
    return updated;
  }, [userId, chapterId]);

  /**
   * Refresh progress from storage
   */
  const refresh = useCallback(() => {
    if (!userId || !chapterId) return;
    
    const chapterProgress = progressStorage.getChapterProgress(userId, chapterId);
    setProgress(chapterProgress);
  }, [userId, chapterId]);

  // ==================== Return API ====================

  return {
    // State
    progress,
    loading,
    error,
    
    // Computed
    status,
    progressPercentage,
    isNotStarted,
    isInProgress,
    isCompleted,
    stats,
    
    // Actions
    initialize,
    startChapter,
    recordQuestion,
    complete,
    reset,
    refresh,
  };
}