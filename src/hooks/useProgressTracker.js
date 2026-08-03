"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { progressStorage } from "@/lib/progress/storage";
import { calculateAccuracy, calculateStreak, calculateProgress, calculateCompletion, LearningStatus } from "@/lib/progress/utils";
import { checkAchievements } from "@/lib/progress/achievements";

/**
 * Unified progress tracking hook
 * Combines Firebase and localStorage for backward compatibility
 * Designed for easy Firebase migration
 */
export default function useProgressTracker() {
  const { user } = useAuth();
  const [learningProgress, setLearningProgress] = useState(null);
  const [chapterProgress, setChapterProgress] = useState({});
  const [recentlyStudied, setRecentlyStudied] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load progress from storage
  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const progress = progressStorage.getLearningProgress(user.uid);
    const chapters = progressStorage.getAllChapterProgress(user.uid);
    const recent = progressStorage.getRecentlyStudied(user.uid);
    
    // Convert chapters array to object for easy lookup
    const chapterMap = {};
    chapters.forEach(ch => {
      chapterMap[ch.chapterId] = ch;
    });

    setLearningProgress(progress);
    setChapterProgress(chapterMap);
    setRecentlyStudied(recent);
    
    // Calculate achievements if progress exists
    if (progress) {
      const stats = {
        totalQuestionsSolved: progress.totalQuestionsSolved || 0,
        correctAnswers: progress.correctAnswers || 0,
        accuracy: progress.accuracy || 0,
        currentStreak: progress.currentStreak || 0,
      };
      setAchievements(checkAchievements(stats));
    }
    
    setLoading(false);
  }, [user]);

  // ==================== Learning Progress ====================

  /**
   * Record a question attempt
   * @param {boolean} isCorrect - Whether the answer was correct
   * @param {number} studyTime - Study time in minutes
   */
  const recordQuestionAttempt = useCallback((isCorrect, studyTime = 0) => {
    if (!user?.uid) return null;

    return progressStorage.updateLearningProgress(user.uid, (current) => {
      const newQuestionsSolved = (current.totalQuestionsSolved || 0) + 1;
      const newCorrectAnswers = (current.correctAnswers || 0) + (isCorrect ? 1 : 0);
      const newWrongAnswers = (current.wrongAnswers || 0) + (isCorrect ? 0 : 1);
      const newAccuracy = calculateAccuracy(newCorrectAnswers, newQuestionsSolved);
      const newStudyTime = (current.totalStudyTime || 0) + studyTime;
      
      // Record activity for streak
      progressStorage.recordActivity(user.uid);
      const activityDates = progressStorage.getActivityDates(user.uid);
      const newStreak = calculateStreak(activityDates);
      
      return {
        ...current,
        totalQuestionsSolved: newQuestionsSolved,
        correctAnswers: newCorrectAnswers,
        wrongAnswers: newWrongAnswers,
        accuracy: newAccuracy,
        totalStudyTime: newStudyTime,
        currentStreak: newStreak,
        bestStreak: Math.max(current.bestStreak || 0, newStreak),
        lastActivity: new Date().toISOString(),
      };
    });
  }, [user]);

  /**
   * Update study time
   * @param {number} minutes - Study time in minutes
   */
  const addStudyTime = useCallback((minutes) => {
    if (!user?.uid || !minutes) return null;

    return progressStorage.updateLearningProgress(user.uid, (current) => ({
      ...current,
      totalStudyTime: (current.totalStudyTime || 0) + minutes,
    }));
  }, [user]);

  /**
   * Mark a chapter as completed
   * @param {string} chapterId - Chapter ID
   */
  const completeChapter = useCallback((chapterId) => {
    if (!user?.uid) return null;

    // Update chapter progress
    const updatedChapter = progressStorage.updateChapterProgress(user.uid, chapterId, (current) => ({
      ...current,
      status: LearningStatus.COMPLETED,
      completedAt: new Date().toISOString(),
    }));

    // Update learning progress
    const updatedLearning = progressStorage.updateLearningProgress(user.uid, (current) => {
      const chapters = progressStorage.getAllChapterProgress(user.uid);
      const completedCount = chapters.filter(ch => ch.status === LearningStatus.COMPLETED).length;
      
      return {
        ...current,
        chaptersCompleted: completedCount,
      };
    });

    setChapterProgress(prev => ({
      ...prev,
      [chapterId]: updatedChapter,
    }));
    setLearningProgress(updatedLearning);

    return { chapter: updatedChapter, learning: updatedLearning };
  }, [user]);

  // ==================== Chapter Progress ====================

  /**
   * Update chapter progress
   * @param {string} chapterId - Chapter ID
   * @param {Function} updater - Update function
   */
  const updateChapterProgress = useCallback((chapterId, updater) => {
    if (!user?.uid) return null;

    const updated = progressStorage.updateChapterProgress(user.uid, chapterId, updater);
    setChapterProgress(prev => ({
      ...prev,
      [chapterId]: updated,
    }));

    return updated;
  }, [user]);

  /**
   * Record question attempt in chapter
   * @param {string} chapterId - Chapter ID
   * @param {boolean} isCorrect - Whether answer was correct
   */
  const recordChapterQuestion = useCallback((chapterId, isCorrect) => {
    if (!user?.uid) return null;

    return progressStorage.updateChapterProgress(user.uid, chapterId, (current) => {
      const newQuestionsSolved = (current.questionsSolved || 0) + 1;
      const newCorrectAnswers = (current.correctAnswers || 0) + (isCorrect ? 1 : 0);
      const newAccuracy = calculateAccuracy(newCorrectAnswers, newQuestionsSolved);
      const progress = calculateProgress(newQuestionsSolved, current.totalQuestions || 1);
      const status = calculateCompletion(progress);

      return {
        ...current,
        questionsSolved: newQuestionsSolved,
        correctAnswers: newCorrectAnswers,
        accuracy: newAccuracy,
        progress,
        status,
        lastVisited: new Date().toISOString(),
      };
    });
  }, [user]);

  // ==================== Recently Studied ====================

  /**
   * Update recently studied data
   * @param {Object} data - Recently studied data
   */
  const updateRecentlyStudied = useCallback((data) => {
    if (!user?.uid) return null;

    const updated = progressStorage.updateRecentlyStudied(user.uid, (current) => ({
      ...current,
      ...data,
      totalVisits: (current.totalVisits || 0) + 1,
      lastActivity: new Date().toISOString(),
    }));

    setRecentlyStudied(updated);
    return updated;
  }, [user]);

  /**
   * Set last visited chapter
   * @param {string} chapterId - Chapter ID
   * @param {string} chapterName - Chapter name
   * @param {string} subjectId - Subject ID
   */
  const setLastVisitedChapter = useCallback((chapterId, chapterName, subjectId) => {
    return updateRecentlyStudied({
      lastChapterId: chapterId,
      lastChapterName: chapterName,
      lastSubjectId: subjectId,
    });
  }, [updateRecentlyStudied]);

  /**
   * Set last visited question
   * @param {string} questionId - Question ID
   * @param {string} questionTitle - Question title
   */
  const setLastVisitedQuestion = useCallback((questionId, questionTitle) => {
    return updateRecentlyStudied({
      lastQuestionId: questionId,
      lastQuestionTitle: questionTitle,
    });
  }, [updateRecentlyStudied]);

  // ==================== Computed Values ====================

  const stats = useMemo(() => {
    if (!learningProgress) {
      return {
        totalQuestionsSolved: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        accuracy: 0,
        totalStudyTime: 0,
        chaptersCompleted: 0,
        currentStreak: 0,
        bestStreak: 0,
      };
    }

    return {
      totalQuestionsSolved: learningProgress.totalQuestionsSolved || 0,
      correctAnswers: learningProgress.correctAnswers || 0,
      wrongAnswers: learningProgress.wrongAnswers || 0,
      accuracy: learningProgress.accuracy || 0,
      totalStudyTime: learningProgress.totalStudyTime || 0,
      chaptersCompleted: learningProgress.chaptersCompleted || 0,
      currentStreak: learningProgress.currentStreak || 0,
      bestStreak: learningProgress.bestStreak || 0,
    };
  }, [learningProgress]);

  const resumeData = useMemo(() => {
    if (!recentlyStudied) {
      return {
        hasResumeData: false,
        chapterId: null,
        chapterName: null,
        questionId: null,
        questionTitle: null,
        subjectId: null,
        lastActivity: null,
      };
    }

    return {
      hasResumeData: !!(recentlyStudied.lastChapterId || recentlyStudied.lastQuestionId),
      chapterId: recentlyStudied.lastChapterId,
      chapterName: recentlyStudied.lastChapterName,
      questionId: recentlyStudied.lastQuestionId,
      questionTitle: recentlyStudied.lastQuestionTitle,
      subjectId: recentlyStudied.lastSubjectId,
      lastActivity: recentlyStudied.lastActivity,
    };
  }, [recentlyStudied]);

  // ==================== Return API ====================

  return {
    // State
    learningProgress,
    chapterProgress,
    recentlyStudied,
    achievements,
    loading,
    
    // Stats
    stats,
    resumeData,
    
    // Learning Progress Actions
    recordQuestionAttempt,
    addStudyTime,
    completeChapter,
    
    // Chapter Progress Actions
    updateChapterProgress,
    recordChapterQuestion,
    
    // Recently Studied Actions
    updateRecentlyStudied,
    setLastVisitedChapter,
    setLastVisitedQuestion,
    
    // Storage (for advanced use cases)
    storage: progressStorage,
  };
}