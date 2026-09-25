"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import useStudentDashboard from "@/app/hooks/useStudentDashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import SubjectGrid from "@/components/dashboard/SubjectGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import StatsCards from "@/components/dashboard/StatsCards";
import UpcomingMockTests from "@/components/dashboard/UpcomingMockTests";
import StudyPlan from "@/components/dashboard/StudyPlan";
import PerformancePanel from "@/components/dashboard/PerformancePanel";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    loading,
    overview,
    lastChapter,
    roadmap,
    mockTests,
    recentActivity,
    performance,
    recommendations,
    gamification,
  } = useStudentDashboard();

  const dashboardStats = {
    questionsSolvedToday: overview.questionsSolvedToday ?? 0,
    currentStreak: overview.studyStreak,
    chapterCompletion: overview.overallProgress,
    dailyGoal: {
      current: overview.questionsSolvedToday ?? 0,
      target: 10,
      progress: Math.min(Math.round(((overview.questionsSolvedToday ?? 0) / 10) * 100), 100),
    },
    weeklyGoal: {
      current: overview.chaptersStarted,
      target: overview.totalChapters || 1,
      progress: overview.totalChapters > 0 ? Math.round((overview.chaptersStarted / overview.totalChapters) * 100) : 0,
    },
  };

  return (
    <ProtectedRoute>
      <main className="internal-page internal-dashboard min-h-screen bg-transparent">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-8">
          <ErrorBoundary>
            <section className="rounded-[28px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/65">
              <DashboardHeader user={user} isLoading={authLoading || !user} />
            </section>

            <div className="mt-5">
              <WelcomeCard
                user={user}
                stats={dashboardStats}
                streak={overview.studyStreak}
                xp={gamification?.xp != null ? gamification : null}
              />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <ContinueLearning lastChapter={lastChapter} isLoading={loading} />
              <div className="lg:col-span-2">
                <QuickActions />
              </div>
            </div>

            <div className="mt-5">
              <ProgressOverview stats={dashboardStats} />
            </div>

            <div className="mt-5">
              <StatsCards stats={overview} isLoading={loading} />
            </div>

            <div className="mt-5">
              <SubjectGrid roadmap={roadmap} isLoading={loading} />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <StudyPlan
                roadmap={roadmap}
                recommendations={recommendations}
                solvedToday={overview.questionsSolvedToday ?? 0}
                isLoading={loading}
              />
              <div className="lg:col-span-2">
                <PerformancePanel performance={performance} isLoading={loading} />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <RecentActivity activities={recentActivity} isLoading={loading} />
              <UpcomingMockTests mockTests={mockTests} bestScore={overview.bestScore} isLoading={loading} />
            </div>
          </ErrorBoundary>
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
