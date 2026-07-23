"use client";

import { useState, useCallback, useEffect } from "react";
import { PerformanceService } from "../services/PerformanceService";

export function usePerformance() {
  const [stats, setStats] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performanceService = new PerformanceService();

  // Load all performance data
  const loadPerformanceData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Load in parallel for efficiency
      const [overallStats, chapterPerformance, activity] = await Promise.all([
        performanceService.getOverallStats(),
        performanceService.getChapterPerformance(),
        performanceService.getRecentActivity(5)
      ]);

      setStats(overallStats);
      setChapterData(chapterPerformance);
      setRecentActivity(activity);
    } catch (err) {
      console.error("Error loading performance data:", err);
      setError("Failed to load performance statistics. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [performanceService]);

  // Load data on mount
  useEffect(() => {
    loadPerformanceData();
  }, [loadPerformanceData]);

  // Refresh data
  const refresh = useCallback(() => {
    loadPerformanceData();
  }, [loadPerformanceData]);

  // Get weak chapters for recommendations
  const getWeakChapters = () => {
    return chapterData?.weakChapters || [];
  };

  // Get strong chapters
  const getStrongChapters = () => {
    return chapterData?.strongChapters || [];
  };

  // Get recommendations
  const getRecommendations = () => {
    return chapterData?.recommendations || [];
  };

  // Calculate improvement over time
  const getProgressOverTime = () => {
    if (!recentActivity || recentActivity.length < 2) return null;

    // Sort by date
    const sorted = [...recentActivity].sort((a, b) => {
      const dateA = a.completedAt?.toDate ? a.completedAt.toDate() : new Date(a.completedAt);
      const dateB = b.completedAt?.toDate ? b.completedAt.toDate() : new Date(b.completedAt);
      return dateA - dateB;
    });

    // Calculate accuracy trend
    return sorted.map(session => ({
      date: session.completedAt,
      accuracy: session.results?.accuracy || 0
    }));
  };

  return {
    stats,
    chapterData,
    recentActivity,
    loading,
    error,
    refresh,
    getWeakChapters,
    getStrongChapters,
    getRecommendations,
    getProgressOverTime
  };
}