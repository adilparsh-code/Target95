"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import SubjectGrid from "@/components/dashboard/SubjectGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import StatsCards from "@/components/dashboard/StatsCards";
import UpcomingMockTests from "@/components/dashboard/UpcomingMockTests";
import { useUserProgress } from "@/hooks/useProgress";
import { getUpcomingMockTests } from "@/hooks/useMockTests";

export const metadata = {
  title: "Student Dashboard | Target95+",
  description: "Track your progress, bookmarks, and next learning steps on Target95+.",
};

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [lastChapter, setLastChapter] = useState(null);
  const [upcomingTests, setUpcomingTests] = useState([]);
  const { progress, loading: progressLoading, stats } = useUserProgress(user?.uid);

  // Calculate dashboard stats from Firestore data
  const dashboardStats = {
    questionsSolvedToday: stats.totalQuestionsSolved > 0 ? Math.min(stats.totalQuestionsSolved, 10) : 0,
    currentStreak: stats.maxStreak || 0,
    chapterCompletion: progress.length > 0 
      ? Math.round((progress.filter(p => (p.questionsSolved || 0) > 0).length / progress.length) * 100)
      : 0,
    dailyGoal: {
      current: stats.totalQuestionsSolved > 0 ? Math.min(stats.totalQuestionsSolved, 10) : 0,
      target: 10,
      progress: stats.totalQuestionsSolved > 0 ? Math.min(Math.round((stats.totalQuestionsSolved / 10) * 100), 100) : 0,
    },
    weeklyGoal: {
      current: 5,
      target: 7,
      progress: 71,
    },
  };

  // Get last accessed chapter
  useEffect(() => {
    if (progress && progress.length > 0) {
      const sorted = [...progress].sort((a, b) => {
        return new Date(b.lastVisited?.toDate() || 0) - new Date(a.lastVisited?.toDate() || 0);
      });
      if (sorted[0]) {
        setLastChapter({
          name: "Recent Chapter",
          subject: "Continuing Learning",
          progress: sorted[0].accuracy || 0,
        });
      }
    }
  }, [progress]);

  // Fetch upcoming mock tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const tests = await getUpcomingMockTests();
        setUpcomingTests(tests);
      } catch (error) {
        console.error("Error fetching mock tests:", error);
        setUpcomingTests([]);
      }
    };
    fetchTests();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader user={user} isLoading={!user} />
        
        <div className="mt-6">
          <WelcomeCard user={user} stats={dashboardStats} />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ContinueLearning lastChapter={lastChapter} isLoading={progressLoading} />
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
        </div>

        <div className="mt-6">
          <ProgressOverview stats={dashboardStats} />
        </div>

        <div className="mt-6">
          <StatsCards stats={stats} />
        </div>

        <div className="mt-6">
          <SubjectGrid />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <UpcomingMockTests mockTests={upcomingTests} />
        </div>
      </div>
      <Footer />
    </main>
  );
}