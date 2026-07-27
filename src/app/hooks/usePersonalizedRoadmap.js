"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { javaChapters } from "@/app/data/javaCurriculum";
import useLearningProgress from "./useLearningProgress";
import useProgress from "./useProgress";
import useRecentlyViewed from "./useRecentlyViewed";
import { getMockTestHistory } from "@/lib/mocktest";
import { createAchievements, createChapterRoadmap, createLearningRecommendations } from "@/lib/learningRoadmap";

export default function usePersonalizedRoadmap() {
  const { user } = useAuth();
  const { completedQuestions, stats } = useProgress(user?.uid);
  const { attempts } = useLearningProgress();
  const { recentlyViewed } = useRecentlyViewed();
  const [mockTests, setMockTests] = useState([]);
  useEffect(() => setMockTests(getMockTestHistory()), []);
  return useMemo(() => {
    const chapters = createChapterRoadmap(javaChapters, completedQuestions, attempts);
    const solved = completedQuestions.length;
    const completed = chapters.filter((chapter) => chapter.completion === 100).length;
    const lastQuestion = [...completedQuestions].sort((first, second) => String(second.completedAt || "").localeCompare(String(first.completedAt || "")))[0];
    const currentChapter = chapters.find((chapter) => chapter.slug === lastQuestion?.chapter) || chapters.find((chapter) => chapter.solved > 0 && chapter.remaining > 0) || chapters[0];
    return { chapters, recommendations: createLearningRecommendations(chapters, mockTests), achievements: createAchievements({ solved, streak: stats?.maxStreak || 0, mockTests, chapters }), currentChapter, recentlyViewed, mockTests, stats: { solved, completed, accuracy: stats?.overallAccuracy || 0, currentStreak: stats?.maxStreak || 0, bestStreak: stats?.maxStreak || 0, weeklyProgress: Math.min(solved, 35), monthlyProgress: Math.min(solved, 120), learningMinutes: solved * 2 } };
  }, [attempts, completedQuestions, mockTests, recentlyViewed, stats]);
}
