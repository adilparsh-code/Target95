"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
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
import useProgress from "@/app/hooks/useProgress";
import useMockTests from "@/app/hooks/useMockTests";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorBoundary from "../components/ui/ErrorBoundary";

export default function DashboardPage() {
  const { user } = useAuth();
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [mockTestError, setMockTestError] = useState(null);
  const { firestoreProgress: progress, loading: progressLoading, stats } = useProgress(user?.uid);
  const { fetchActiveMockTests } = useMockTests();

  // Calculate dashboard stats from Firestore data
  const totalSolved = stats?.totalQuestionsSolved || 0;
  const maxStreak = stats?.maxStreak || 0;
  const progressCount = Array.isArray(progress) ? progress.length : 0;
  const progressWithActivity = Array.isArray(progress) ? progress.filter(p => (p.questionsSolved || 0) > 0).length : 0;

  const dashboardStats = {
    questionsSolvedToday: totalSolved > 0 ? Math.min(totalSolved, 10) : 0,
    currentStreak: maxStreak || 0,
    chapterCompletion: progressCount > 0 
      ? Math.round((progressWithActivity / progressCount) * 100)
      : 0,
    dailyGoal: {
      current: totalSolved > 0 ? Math.min(totalSolved, 10) : 0,
      target: 10,
      progress: totalSolved > 0 ? Math.min(Math.round((totalSolved / 10) * 100), 100) : 0,
    },
    weeklyGoal: {
      current: progressWithActivity,
      target: progressCount || 7,
      progress: progressCount > 0 ? Math.round((progressWithActivity / progressCount) * 100) : 0,
    },
  };

  // Derive last accessed chapter from progress data
  const derivedLastChapter = Array.isArray(progress) && progress.length > 0
    ? (() => {
        const sorted = [...progress].sort((a, b) => {
          const aTime = a.lastVisited?.toDate ? a.lastVisited.toDate().getTime() : (a.lastVisited || 0);
          const bTime = b.lastVisited?.toDate ? b.lastVisited.toDate().getTime() : (b.lastVisited || 0);
          return new Date(bTime) - new Date(aTime);
        });
        if (sorted[0]) {
          return {
            name: sorted[0].chapterName || sorted[0].chapterId || "Recent Chapter",
            subject: sorted[0].subjectName || "Continuing Learning",
            progress: sorted[0].accuracy || 0,
          };
        }
        return null;
      })()
    : null;

  // Fetch upcoming mock tests
  useEffect(() => {
    let mounted = true;
    const fetchTests = async () => {
      try {
        const tests = await fetchActiveMockTests();
        if (mounted) {
          setUpcomingTests(Array.isArray(tests) ? tests : []);
          setMockTestError(null);
        }
      } catch (error) {
        console.error("Error fetching mock tests:", error);
        if (mounted) {
          setUpcomingTests([]);
          setMockTestError("Could not load upcoming tests");
        }
      }
    };
    fetchTests();
    return () => { mounted = false; };
  }, [fetchActiveMockTests]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="h-20 sm:h-24 lg:h-28"></div>
        <ErrorBoundary>
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <DashboardHeader user={user} isLoading={!user} />
            
            <div className="mt-6">
              <WelcomeCard user={user} stats={dashboardStats} />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ContinueLearning lastChapter={derivedLastChapter} isLoading={progressLoading} />
              <div className="lg:col-span-2">
                <QuickActions />
              </div>
            </div>

            <div className="mt-6">
              <ProgressOverview stats={dashboardStats} />
            </div>

            <div className="mt-6">
              <StatsCards stats={stats || { totalQuestionsSolved: 0, totalCorrectAnswers: 0, totalStudyTime: 0, maxStreak: 0, overallAccuracy: 0 }} />
            </div>

            <div className="mt-6">
              <SubjectGrid />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity />
              <UpcomingMockTests mockTests={Array.isArray(upcomingTests) ? upcomingTests : []} />
            </div>
          </div>
        </ErrorBoundary>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}