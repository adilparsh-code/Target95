"use client";

import DashboardCard from "../components/admin/DashboardCard";
import QuickActionCard from "../components/admin/QuickActionCard";
import SectionTitle from "../components/admin/SectionTitle";
import AdminCard from "../components/admin/AdminCard";
import StatusBadge from "../components/admin/StatusBadge";

const stats = [
  { title: "Total Questions", value: 1248, icon: "❓", color: "blue", trend: 12, trendUp: true },
  { title: "Total Chapters", value: 9, icon: "📚", color: "indigo", trend: 0, trendUp: true },
  { title: "Study Notes", value: 48, icon: "📝", color: "emerald", trend: 8, trendUp: true },
  { title: "Mock Tests", value: 6, icon: "📋", color: "amber", trend: 25, trendUp: true },
  { title: "Students", value: 342, icon: "👨‍🎓", color: "violet", trend: 18, trendUp: true },
  { title: "Teachers", value: 12, icon: "👩‍🏫", color: "cyan", trend: 0, trendUp: false },
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

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <AdminCard className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome back, Admin! 👋</h2>
            <p className="text-blue-100 mt-1 text-sm">
              Here&apos;s what&apos;s happening with Target95 today.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              📅 {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </AdminCard>

      {/* Statistics Cards */}
      <div>
        <SectionTitle title="Overview" subtitle="Key metrics at a glance" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <SectionTitle title="Recent Activity" subtitle="Latest platform events" />
          <AdminCard padding={false}>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((item, index) => (
                <div key={index} className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <StatusBadge status={item.status} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{item.detail}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <SectionTitle title="Recent Updates" subtitle="Latest changes and announcements" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentUpdates.map((update, index) => (
            <AdminCard key={index}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    update.type === "update" ? "bg-blue-50 text-blue-700" :
                    update.type === "improvement" ? "bg-emerald-50 text-emerald-700" :
                    "bg-amber-50 text-amber-700"
                  }`}>
                    {update.type === "update" ? "📌 Update" : update.type === "improvement" ? "✨ Improvement" : "📢 Announcement"}
                  </span>
                  <span className="text-xs text-gray-400">{update.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{update.title}</h3>
                <p className="text-xs text-gray-500">{update.description}</p>
              </div>
            </AdminCard>
          ))}
        </div>
      </div>
    </div>
  );
}
