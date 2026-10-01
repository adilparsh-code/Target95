"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useProgress from "@/app/hooks/useProgress";
import useMockTests from "@/app/hooks/useMockTests";
import useRecentlyViewed from "@/app/hooks/useRecentlyViewed";
import { usePersonalization } from "@/app/hooks/usePersonalization";
import useGamification from "@/app/hooks/useGamification";
import { javaChapters } from "@/app/data/javaCurriculum";
import { createChapterRoadmap, createLearningRecommendations } from "@/lib/learningRoadmap";
import { getMockTestHistory, MOCK_HISTORY_UPDATED_EVENT } from "@/lib/mocktest";

const emptyMockTests = [];

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Central student dashboard data hook.
 * Aggregates the authenticated student's own data only:
 * - progress (Firestore, scoped to user.uid)
 * - mock test history (Firestore + local fallback)
 * - gamification state (XP / badges / challenge)
 * - curriculum-derived roadmap and recommendations
 */
export default function useStudentDashboard() {
  const { user } = useAuth();
  const uid = user?.uid || null;
  const { completedQuestions, firestoreProgress, loading: progressLoading, error: progressError, stats, refresh } = useProgress(uid);
  const { fetchUserTestHistory, testHistory: firestoreTestHistory, testHistoryLoaded, testHistoryError } = useMockTests();
  const { recentlyViewed } = useRecentlyViewed();
  const personalization = usePersonalization();
  const gamification = useGamification();
  const [localMockTests, setLocalMockTests] = useState(emptyMockTests);

  useEffect(() => {
    const syncLocalHistory = () => setLocalMockTests(uid ? getMockTestHistory(uid) : emptyMockTests);
    syncLocalHistory();
    window.addEventListener("storage", syncLocalHistory);
    window.addEventListener(MOCK_HISTORY_UPDATED_EVENT, syncLocalHistory);
    return () => {
      window.removeEventListener("storage", syncLocalHistory);
      window.removeEventListener(MOCK_HISTORY_UPDATED_EVENT, syncLocalHistory);
    };
  }, [uid]);

  useEffect(() => {
    if (uid) {
      fetchUserTestHistory(uid).catch(() => {});
    }
  }, [uid, fetchUserTestHistory]);

  const roadmap = useMemo(
    () => createChapterRoadmap(javaChapters, completedQuestions, {}),
    [completedQuestions]
  );

  const mockTests = useMemo(() => {
    // A successful Firestore read is authoritative, including an empty result.
    // The user-scoped local cache is used only when that read fails.
    const source = testHistoryLoaded && !testHistoryError ? firestoreTestHistory : localMockTests;
    const seen = new Set();
    const merged = [];
    for (const test of source) {
      const key = test.id || `${test.title}-${test.completedAt}`;
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(test);
    }
    return merged.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0));
  }, [firestoreTestHistory, localMockTests, testHistoryError, testHistoryLoaded]);

  const overview = useMemo(() => {
    const totalSolved = completedQuestions.length || stats?.totalQuestionsSolved || 0;
    const accuracy = stats?.overallAccuracy || 0;
    const chaptersCompleted = roadmap.filter((c) => c.completion === 100).length;
    const attempted = roadmap.filter((c) => c.solved > 0).length;
    const scores = mockTests.map((t) => Number(t.percentage) || 0).filter((n) => n > 0);
    const averageScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const bestScore = scores.length ? Math.max(...scores) : 0;
    // Real "solved today" count from recorded attempt timestamps (local day).
    const todayKey = getLocalDateKey(new Date());
    const solvedToday = completedQuestions.filter((question) => {
      if (typeof question.completedAt !== "string") return false;
      const parsed = new Date(question.completedAt);
      return !Number.isNaN(parsed.getTime()) && getLocalDateKey(parsed) === todayKey;
    }).length;

    return {
      overallProgress: roadmap.length ? Math.round(roadmap.reduce((sum, c) => sum + c.completion, 0) / roadmap.length) : 0,
      questionsSolved: totalSolved,
      questionsSolvedToday: solvedToday,
      accuracy,
      mockTestsAttempted: mockTests.length,
      averageScore,
      bestScore,
      studyStreak: stats?.maxStreak || 0,
      chaptersCompleted,
      chaptersStarted: attempted,
      totalChapters: roadmap.length,
      studyTimeMinutes: stats?.totalStudyTime || 0,
    };
  }, [completedQuestions, stats, roadmap, mockTests]);

  const lastChapter = useMemo(() => {
    const withActivity = [...roadmap]
      .filter((c) => c.lastAttempt || c.solved > 0)
      .sort((a, b) => new Date(b.lastAttempt || 0) - new Date(a.lastAttempt || 0));
    const chapter = withActivity[0] || (recentlyViewed.length ? roadmap.find((c) => recentlyViewed.includes(c.slug)) : null);
    if (!chapter) return null;
    return {
      slug: chapter.slug,
      name: chapter.title,
      progress: chapter.completion,
      remaining: chapter.remaining,
      accuracy: chapter.accuracy,
    };
  }, [roadmap, recentlyViewed]);

  const recentActivity = useMemo(() => {
    const items = [];
    for (const question of completedQuestions.slice(0, 8)) {
      items.push({
        id: `${question.chapter}-${question.questionId}`,
        type: "question",
        title: question.chapterTitle || question.chapter || "Chapter question",
        subtitle: question.subjectName || "Practice",
        correct: typeof question.correct === "boolean" ? question.correct : null,
        at: question.completedAt || question.lastVisited || null,
      });
    }
    for (const chapter of roadmap.filter((c) => c.completion === 100).slice(0, 4)) {
      items.push({
        id: `chapter-${chapter.slug}`,
        type: "chapter",
        title: `Completed ${chapter.title}`,
        subtitle: `${chapter.total} questions`,
        correct: null,
        at: chapter.lastAttempt,
      });
    }
    for (const test of mockTests.slice(0, 4)) {
      items.push({
        id: `test-${test.id || test.completedAt}`,
        type: "test",
        title: test.title || "Mock test",
        subtitle: test.percentage != null ? `Scored ${test.percentage}%` : "Attempted",
        correct: null,
        at: test.completedAt,
      });
    }
    return items
      .sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0))
      .slice(0, 10);
  }, [completedQuestions, roadmap, mockTests]);

  const performance = useMemo(() => {
    const active = roadmap.filter((c) => c.solved > 0);
    const sortedByAccuracy = [...active].sort((a, b) => b.accuracy - a.accuracy);
    return {
      strongTopics: sortedByAccuracy.slice(0, 4).map((c) => ({ title: c.title, accuracy: c.accuracy, href: `/Java/${c.slug}` })),
      weakTopics: [...sortedByAccuracy].reverse().slice(0, 4).map((c) => ({ title: c.title, accuracy: c.accuracy, href: `/Java/${c.slug}` })),
      chapterProgress: roadmap.map((c) => ({ title: c.title, completion: c.completion, href: `/Java/${c.slug}` })),
    };
  }, [roadmap]);

  const recommendations = useMemo(
    () => createLearningRecommendations(roadmap, mockTests),
    [roadmap, mockTests]
  );

  const refreshAll = useCallback(() => {
    refresh?.();
  }, [refresh]);

  return {
    user,
    uid,
    loading: progressLoading && uid !== undefined,
    error: progressError,
    overview,
    dashboardStats: overview,
    lastChapter,
    roadmap,
    mockTests,
    recentActivity,
    performance,
    recommendations,
    gamification,
    personalization,
    refreshAll,
  };
}
