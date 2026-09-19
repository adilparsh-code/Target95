"use client";

import Link from "next/link";
import DashboardCard from "../components/admin/DashboardCard";
import QuickActionCard from "../components/admin/QuickActionCard";
import SectionTitle from "../components/admin/SectionTitle";
import WelcomeBanner from "../components/admin/WelcomeBanner";
import RecentActivityCard from "../components/admin/RecentActivityCard";
import EmptyState from "../components/admin/EmptyState";
import useAdminData from "@/app/hooks/useAdminData";
import { StatsCardSkeleton } from "../components/ui/LoadingSkeleton";

const quickActions = [
  { title: "Add New Question", description: "Create a new question for any chapter", href: "/admin/questions", icon: "➕", color: "blue" },
  { title: "Manage Subjects", description: "Add or edit subjects", href: "/admin/subjects", icon: "📚", color: "indigo" },
  { title: "Manage Chapters", description: "Update chapter content and metadata", href: "/admin/chapters", icon: "📖", color: "emerald" },
  { title: "Upload Study Notes", description: "Add new study material for students", href: "/admin/study-notes", icon: "📄", color: "emerald" },
  { title: "Create Mock Test", description: "Design a new practice test", href: "/admin/mock-tests", icon: "📝", color: "amber" },
  { title: "View Analytics", description: "Check platform performance metrics", href: "/admin/analytics", icon: "📊", color: "violet" },
  { title: "Browse Students", description: "Inspect student progress and profiles", href: "/admin/students", icon: "👨‍🎓", color: "rose" },
  { title: "Settings", description: "Configure platform preferences", href: "/admin/settings", icon: "⚙️", color: "blue" },
];

function formatRelative(ms) {
  if (!ms) return "Unknown";
  const minutes = Math.floor((Date.now() - ms) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const { data, loading, error, refresh } = useAdminData("/api/admin/overview");
  const overview = data?.overview;

  if (error) {
    return (
      <div className="space-y-6">
        <WelcomeBanner />
        <EmptyState
          type="analytics"
          title="Couldn't load admin data"
          description={error}
          primaryAction={refresh}
          primaryActionLabel="Retry"
        />
      </div>
    );
  }

  if (loading || !overview) {
    return (
      <div className="space-y-6">
        <WelcomeBanner />
        <StatsCardSkeleton count={8} />
      </div>
    );
  }

  const activities = (overview.recentActivity || []).map((item, index) => ({
    action: `Test completed — scored ${item.score}/${item.totalQuestions}`,
    detail: "Student mock test result",
    time: formatRelative(item.completedAt),
    status: "success",
    key: index,
  }));

  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <div>
        <SectionTitle title="Overview" subtitle="Live platform metrics from Firestore" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <DashboardCard title="Total Students" value={overview.totalStudents} icon="👨‍🎓" color="violet" />
          <DashboardCard title="Active Students" value={overview.activeStudents} icon="✅" color="emerald" />
          <DashboardCard title="Questions Attempted" value={overview.questionsAnswered} icon="❓" color="blue" />
          <DashboardCard title="Average Performance" value={`${overview.averageScore}%`} icon="📊" color="amber" />
          <DashboardCard title="Tests Attempted" value={overview.testsAttempted} icon="📝" color="cyan" />
          <DashboardCard title="Total Questions" value={overview.content.questions} icon="📚" color="indigo" />
          <DashboardCard title="Chapters" value={overview.content.chapters} icon="📖" color="teal" />
          <DashboardCard title="Active Mock Tests" value={overview.content.mockTests} icon="🧪" color="rose" />
        </div>
      </div>

      <div>
        <SectionTitle title="Question Bank Breakdown" subtitle="Distribution by difficulty" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DashboardCard title="Easy Questions" value={overview.questionDifficulty.easy} icon="😊" color="green" />
          <DashboardCard title="Medium Questions" value={overview.questionDifficulty.medium} icon="😐" color="amber" />
          <DashboardCard title="Hard Questions" value={overview.questionDifficulty.hard} icon="🥵" color="red" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionTitle title="Quick Actions" subtitle="Common admin tasks" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle title="Recent Activity" subtitle="Latest completed tests" />
          {activities.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              No test activity yet.
            </div>
          ) : (
            <RecentActivityCard activities={activities} />
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Metrics update live from the platform database.{" "}
        <Link href="/admin/analytics" className="text-blue-600 hover:underline dark:text-blue-400">
          View detailed analytics →
        </Link>
      </p>
    </div>
  );
}
