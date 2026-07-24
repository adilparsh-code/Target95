"use client";

import { useState, useEffect } from "react";
import { mockQuestions } from "../data/mockQuestions";
import { mockSubjects, subjectStats } from "../data/admin/mockSubjects";
import DashboardCard from "../components/admin/DashboardCard";
import QuickActionCard from "../components/admin/QuickActionCard";
import SectionTitle from "../components/admin/SectionTitle";
import WelcomeBanner from "../components/admin/WelcomeBanner";
import RecentActivityCard from "../components/admin/RecentActivityCard";
import RecentUpdatesCard from "../components/admin/RecentUpdatesCard";
import { StatsCardSkeleton } from "../components/ui/LoadingSkeleton";

const generateRecentActivity = () => [
  { action: "New question added", detail: "Chapter 5 — Methods", user: "Admin", time: "2 minutes ago", status: "success" },
  { action: "Student registered", detail: "Rahul Sharma — Class 10", user: "System", time: "15 minutes ago", status: "active" },
  { action: "Study note updated", detail: "Chapter 3 — Arrays", user: "Admin", time: "1 hour ago", status: "published" },
  { action: "Mock test completed", detail: "Java Basics — 42 students", user: "System", time: "2 hours ago", status: "success" },
  { action: "Chapter modified", detail: "Chapter 7 — Constructors", user: "Admin", time: "3 hours ago", status: "published" },
  { action: "AI questions generated", detail: "50 questions for Chapter 6", user: "AI", time: "4 hours ago", status: "active" },
  { action: "Student suspended", detail: "Temporary account lock", user: "Admin", time: "6 hours ago", status: "pending" },
  { action: "Teacher account created", detail: "Mrs. Priya Singh", user: "Admin", time: "5 hours ago", status: "pending" },
];

const generateRecentUpdates = () => [
  { title: "New Java Questions Added", description: "50 new questions added to Chapter 6 — Strings", date: "Today", type: "update" },
  { title: "Platform Performance Update", description: "Improved loading times for question pages", date: "Yesterday", type: "improvement" },
  { title: "Mock Test Results Available", description: "Java Basics test results are now live", date: "2 days ago", type: "announcement" },
  { title: "New Teacher Onboarding", description: "3 new teachers joined the platform", date: "3 days ago", type: "update" },
  { title: "AI Generator Enhanced", description: "New question types supported in AI generator", date: "5 days ago", type: "improvement" },
];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 600));
      const totalQuestions = mockQuestions.length;
      const totalSubjects = subjectStats.totalSubjects;
      const totalChapters = subjectStats.totalChapters;
      const totalMockTests = 12;
      const totalStudents = 156;
      const totalTeachers = 8;
      const aiGeneratedQuestions = 320;
      const activeUsers = 89;

      setStats({
        totalQuestions,
        totalSubjects,
        totalChapters,
        totalMockTests,
        totalStudents,
        totalTeachers,
        aiGeneratedQuestions,
        activeUsers,
        easyQuestions: mockQuestions.filter((q) => q.difficulty === "Easy").length,
        mediumQuestions: mockQuestions.filter((q) => q.difficulty === "Medium").length,
        hardQuestions: mockQuestions.filter((q) => q.difficulty === "Hard").length,
      });
      setLoading(false);
    };
    loadData();
  }, []);

  const quickActions = [
    { title: "Add New Question", description: "Create a new question for any chapter", href: "/admin/questions/new", icon: "➕", color: "blue" },
    { title: "Manage Subjects", description: "Add or edit subjects", href: "/admin/subjects", icon: "📚", color: "indigo" },
    { title: "Manage Chapters", description: "Update chapter content and metadata", href: "/admin/chapters", icon: "📖", color: "emerald" },
    { title: "Upload Study Notes", description: "Add new study material for students", href: "/admin/study-notes/new", icon: "📄", color: "emerald" },
    { title: "Create Mock Test", description: "Design a new practice test", href: "/admin/mock-tests/new", icon: "📝", color: "amber" },
    { title: "View Analytics", description: "Check platform performance metrics", href: "/admin/analytics", icon: "📊", color: "violet" },
    { title: "Settings", description: "Configure platform preferences", href: "/admin/settings", icon: "⚙️", color: "rose" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
        <StatsCardSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Primary Stats */}
      <div>
        <SectionTitle title="Overview" subtitle="Key metrics at a glance" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Students" value={stats.totalStudents} icon="👨‍🎓" color="violet" />
          <DashboardCard title="Total Questions" value={stats.totalQuestions} icon="❓" color="blue" />
          <DashboardCard title="Total Chapters" value={stats.totalChapters} icon="📖" color="indigo" />
          <DashboardCard title="Total Mock Tests" value={stats.totalMockTests} icon="📝" color="amber" />
          <DashboardCard title="Total Subjects" value={stats.totalSubjects} icon="📚" color="emerald" />
          <DashboardCard title="AI Generated Questions" value={stats.aiGeneratedQuestions} icon="🤖" color="cyan" />
          <DashboardCard title="Active Users" value={stats.activeUsers} icon="👥" color="teal" />
          <DashboardCard title="Total Teachers" value={stats.totalTeachers} icon="👩‍🏫" color="rose" />
        </div>
      </div>

      {/* Secondary Stats - Question Breakdown */}
      <div>
        <SectionTitle title="Question Breakdown" subtitle="Distribution by difficulty" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DashboardCard title="Easy Questions" value={stats.easyQuestions} icon="😊" color="green" />
          <DashboardCard title="Medium Questions" value={stats.mediumQuestions} icon="😐" color="amber" />
          <DashboardCard title="Hard Questions" value={stats.hardQuestions} icon="🥵" color="red" />
        </div>
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <SectionTitle title="Quick Actions" subtitle="Common admin tasks" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <SectionTitle title="Recent Activity" subtitle="Latest platform events" />
          <RecentActivityCard activities={generateRecentActivity()} />
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <SectionTitle title="Recent Updates" subtitle="Latest changes and announcements" />
        <RecentUpdatesCard updates={generateRecentUpdates()} />
      </div>
    </div>
  );
};

export default AdminDashboard;