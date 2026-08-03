"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { progressStorage } from "@/lib/progress/storage";
import { getResumeData } from "@/lib/progress/utils";

/**
 * Hook for tracking recently studied items
 * Maintains last visited chapter/question for resume functionality
 */
export default function useRecentlyStudied() {
  const { user } = useAuth();
  const [recentlyStudied, setRecentlyStudied] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load recently studied from storage
  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      const recent = progressStorage.getRecentlyStudied(user.uid);
      setRecentlyStudied(recent);
    } catch (err) {
      console.error("Error loading recently studied:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ==================== Computed Values ====================

  const resumeData = useMemo(() => {
    return getResumeData(recentlyStudied);
  }, [recentlyStudied]);

  const hasResumeData = useMemo(() => resumeData.hasResumeData, [resumeData]);
  const lastChapter = useMemo(() => ({
    id: recentlyStudied?.lastChapterId,
    name: recentlyStudied?.lastChapterName,
    subjectId: recentlyStudied?.lastSubjectId,
  }), [recentlyStudied]);

  const lastQuestion = useMemo(() => ({
    id: recentlyStudied?.lastQuestionId,
    title: recentlyStudied?.lastQuestionTitle,
  }), [recentlyStudied]);

  const totalVisits = useMemo(() => recentlyStudied?.totalVisits || 0, [recentlyStudied]);
  const lastActivity = useMemo(() => recentlyStudied?.lastActivity || null, [recentlyStudied]);

  // ==================== Actions ====================

  /**
   * Update recently studied with chapter visit
   * @param {Object} chapterData - Chapter information
   */
  const recordChapterVisit = useCallback((chapterData) => {
    if (!user?.uid) return null;

    const updated = progressStorage.updateRecentlyStudied(user.uid, (current) => ({
      ...current,
      lastChapterId: chapterData.chapterId || chapterData.id,
      lastChapterName: chapterData.name || chapterData.title,
      lastSubjectId: chapterData.subjectId,
      lastActivity: new Date().toISOString(),
    }));

    setRecentlyStudied(updated);
    return updated;
  }, [user]);

  /**
   * Update recently studied with question view
   * @param {Object} questionData - Question information
   */
  const recordQuestionView = useCallback((questionData) => {
    if (!user?.uid) return null;

    const updated = progressStorage.updateRecentlyStudied(user.uid, (current) => ({
      ...current,
      lastQuestionId: questionData.questionId || questionData.id,
      lastQuestionTitle: questionData.title || questionData.question,
      lastActivity: new Date().toISOString(),
    }));

    setRecentlyStudied(updated);
    return updated;
  }, [user]);

  /**
   * Set both chapter and question
   * @param {Object} chapterData - Chapter information
   * @param {Object} questionData - Question information
   */
  const recordActivity = useCallback((chapterData, questionData) => {
    if (!user?.uid) return null;

    const updated = progressStorage.updateRecentlyStudied(user.uid, (current) => ({
      ...current,
      lastChapterId: chapterData?.chapterId || chapterData?.id,
      lastChapterName: chapterData?.name || chapterData?.title,
      lastSubjectId: chapterData?.subjectId,
      lastQuestionId: questionData?.questionId || questionData?.id,
      lastQuestionTitle: questionData?.title || questionData?.question,
      lastActivity: new Date().toISOString(),
    }));

    setRecentlyStudied(updated);
    return updated;
  }, [user]);

  /**
   * Clear recently studied data
   */
  const clear = useCallback(() => {
    if (!user?.uid) return;

    const updated = progressStorage.updateRecentlyStudied(user.uid, (current) => ({
      ...current,
      lastChapterId: null,
      lastChapterName: null,
      lastQuestionId: null,
      lastQuestionTitle: null,
      lastSubjectId: null,
      lastActivity: null,
    }));

    setRecentlyStudied(updated);
    return updated;
  }, [user]);

  /**
   * Refresh from storage
   */
  const refresh = useCallback(() => {
    if (!user?.uid) return;
    
    const recent = progressStorage.getRecentlyStudied(user.uid);
    setRecentlyStudied(recent);
  }, [user]);

  // ==================== Return API ====================

  return {
    // State
    recentlyStudied,
    loading,
    
    // Computed
    resumeData,
    hasResumeData,
    lastChapter,
    lastQuestion,
    totalVisits,
    lastActivity,
    
    // Actions
    recordChapterVisit,
    recordQuestionView,
    recordActivity,
    clear,
    refresh,
  };
}