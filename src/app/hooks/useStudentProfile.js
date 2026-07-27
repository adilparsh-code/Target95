"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useBookmarks from "./useBookmarks";
import useProgress from "./useProgress";
import { getMockTestHistory } from "@/lib/mocktest";

function getJoinDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

export default function useStudentProfile() {
  const { user } = useAuth();
  const { completedQuestions, stats } = useProgress(user?.uid);
  const { bookmarks } = useBookmarks(user?.uid);
  const [mockTests, setMockTests] = useState([]);

  useEffect(() => {
    setMockTests(getMockTestHistory());
  }, []);

  return useMemo(() => ({
    user,
    joinDate: getJoinDate(user?.createdAt),
    completedQuestions,
    bookmarks,
    mockTests,
    stats: {
      currentStreak: stats?.maxStreak || 0,
      totalQuestionsSolved: completedQuestions.length || stats?.totalQuestionsSolved || 0,
      accuracy: stats?.overallAccuracy || 0,
      mockTestsAttempted: mockTests.length,
      bookmarkedQuestions: bookmarks.length,
    },
  }), [bookmarks, completedQuestions, mockTests, stats, user]);
}
