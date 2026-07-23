"use client";

import { mockQuestions } from "../data/mockQuestions";
import DashboardCard from "../components/admin/DashboardCard";
import QuickActionCard from "../components/admin/QuickActionCard";
import SectionTitle from "../components/admin/SectionTitle";
import WelcomeBanner from "../components/admin/WelcomeBanner";
import RecentActivityCard from "../components/admin/RecentActivityCard";
import RecentUpdatesCard from "../components/admin/RecentUpdatesCard";

const AdminDashboard = () => {
  const totalQuestions = mockQuestions.length;
  const totalSubjects = [...new Set(mockQuestions.map(q => q.subject))].length;
  const totalChapters = [...new Set(mockQuestions.map(q => q.chapter))].length;
  const easyQuestions = mockQuestions.filter(q => q.difficulty === "Easy").length;
  const mediumQuestions = mockQuestions.filter(q => q.difficulty === "Medium").length;
  const hardQuestions = mockQuestions.filter(q => q.difficulty === "Hard").length;

  const stats = [
    { title: "Total Questions", value: totalQuestions, icon: "❓", color: "blue" },
    { title: "Total Subjects", value: totalSubjects, icon: "📚", color: "indigo" },
    { title: "Total Chapters", value: totalChapters, icon: "📖", color: "emerald" },
    { title: "Easy Questions", value: easyQuestions, icon: "😊", color: "green" },
    { title: "Medium Questions", value: mediumQuestions, icon: "😐", color: "amber" },
    { title: "Hard Questions", value: hardQuestions, icon: "🥵", color: "red" },
  ];

  const quickActions = [
    { title: "Add New Question", description: "Create a new question for any chapter", href: "/admin/questions/new", icon: "➕", color: "blue" },
    { title: "Manage Chapters", description: "Update chapter content and metadata", href: "/admin/chapters", icon: "📖", color: "indigo" },
    { title: "Upload Study Notes", description: "Add new study material for students", href: "/admin/study-notes/new", icon: "📄", color: "emerald" },
    { title: "Create Mock Test", description: "Design a new practice test", href: "/admin/mock-tests/new", icon: "📝", color: "amber" },
    { title: "View Analytics", description: "Check platform performance metrics", href: "/admin/analytics", icon: "📊", color: "violet" },
    { title: "Settings", description: "Configure platform preferences", href: "/admin/settings", icon: "⚙️", color: "rose" },
  ];

  const recentActivity = [
    { action: "New question added", detail: "Chapter 5 - Methods", user: "Admin", time: "2 minutes ago", status: "success" },
    { action: "Student registered", detail: "Rahul Sharma - Class 10", user: "System", time: "15 minutes ago", status: "active" },
    { action: "Study note updated", detail: "Chapter 3 - Arrays", user: "Admin", time: "1 hour ago", status: "published" },
    { action: "Mock test completed", detail: "Java Basics - 42 students", user: "System", time: "2 hours ago", status: "success" },
    { action: "Chapter modified", detail: "Chapter 7 - Constructors", user: "Admin", time: "3 hours ago", status: "published" },
    { action: "Teacher account created", detail: "Mrs. Priya Singh", user: "Admin", time: "5 hours ago", status: "pending" },
  ];

  const recentUpdates = [
    { title: "New Java Questions Added", description: "50 new questions added to Chapter 6 - Strings", date: "Today", type: "update" },
    { title: "Platform Performance Update", description: "Improved loading times for question pages", date: "Yesterday", type: "improvement" },
    { title: "Mock Test Results Available", description: "Java Basics test results are now live", date: "2 days ago", type: "announcement" },
    { title: "New Teacher Onboarding", description: "3 new teachers joined the platform", date: "3 days ago", type: "update" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Statistics Cards */}
      <div>
        <SectionTitle title="Overview" subtitle="Key metrics at a glance" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <DashboardCard key={stat.title} {...stat} />
          ))}
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
          <RecentActivityCard activities={recentActivity} />
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <SectionTitle title="Recent Updates" subtitle="Latest changes and announcements" />
        <RecentUpdatesCard updates={recentUpdates} />
      </div>
    </div>
  );
};

export default AdminDashboard;