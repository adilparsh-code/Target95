"use client";

import { useState } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import DashboardCard from "@/app/components/admin/DashboardCard";

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("7d");

  const overviewStats = [
    { title: "Active Users", value: 187, icon: "👥", color: "blue", trend: 12, trendUp: true },
    { title: "Questions Answered", value: 2847, icon: "❓", color: "indigo", trend: 8, trendUp: true },
    { title: "Avg. Session Time", value: "24m", icon: "⏱️", color: "emerald", trend: 5, trendUp: true },
    { title: "Completion Rate", value: "73%", icon: "🎯", color: "violet", trend: 3, trendUp: true },
  ];

  const chapterPerformance = [
    { chapter: "Chapter 1 — Fundamentals", avgScore: 82, attempts: 456, completionRate: 91 },
    { chapter: "Chapter 2 — Operators", avgScore: 78, attempts: 389, completionRate: 85 },
    { chapter: "Chapter 3 — Conditionals", avgScore: 75, attempts: 342, completionRate: 79 },
    { chapter: "Chapter 4 — Loops", avgScore: 71, attempts: 298, completionRate: 74 },
    { chapter: "Chapter 5 — Methods", avgScore: 68, attempts: 267, completionRate: 70 },
    { chapter: "Chapter 6 — Arrays", avgScore: 65, attempts: 234, completionRate: 66 },
    { chapter: "Chapter 7 — String Handling", avgScore: 62, attempts: 198, completionRate: 58 },
    { chapter: "Chapter 8 — Constructors", avgScore: 59, attempts: 167, completionRate: 52 },
    { chapter: "Chapter 9 — Inheritance", avgScore: 56, attempts: 145, completionRate: 47 },
  ];

  const recentTrends = [
    { day: "Mon", users: 45, answers: 320 },
    { day: "Tue", users: 52, answers: 410 },
    { day: "Wed", users: 48, answers: 385 },
    { day: "Thu", users: 61, answers: 456 },
    { day: "Fri", users: 55, answers: 420 },
    { day: "Sat", users: 72, answers: 520 },
    { day: "Sun", users: 68, answers: 336 },
  ];

  return (
    <div className="space-y-6">
      {/* Period Selector + Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle title="Analytics" subtitle="Platform performance and learner insights" />
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {["7d", "30d", "90d", "1y"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                period === p ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "1 Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Activity Trend Chart (simulated bar chart) */}
      <AdminCard>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Daily Activity</h3>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-500" /> Users
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-indigo-400" /> Answers
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {recentTrends.map((day) => {
              const userHeight = (day.users / 72) * 100;
              const answerHeight = (day.answers / 520) * 100;
              return (
                <div key={day.day} className="flex flex-col items-center gap-1 flex-1">
                  <div className="flex items-end gap-1 w-full h-24">
                    <div
                      className="flex-1 bg-blue-500 rounded-t transition-all duration-300"
                      style={{ height: `${userHeight}%` }}
                      title={`${day.users} users`}
                    />
                    <div
                      className="flex-1 bg-indigo-400 rounded-t transition-all duration-300"
                      style={{ height: `${answerHeight}%` }}
                      title={`${day.answers} answers`}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </AdminCard>

      {/* Chapter Performance */}
      <div>
        <SectionTitle title="Chapter Performance" subtitle="Average scores and completion rates by chapter" />
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Chapter</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Avg. Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Attempts</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {chapterPerformance.map((ch) => (
                <tr key={ch.chapter} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-900 font-medium">{ch.chapter}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            ch.avgScore >= 75 ? "bg-emerald-500" : ch.avgScore >= 60 ? "bg-amber-500" : "bg-rose-500"
                          }`}
                          style={{ width: `${ch.avgScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{ch.avgScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{ch.attempts}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            ch.completionRate >= 75 ? "bg-blue-500" : ch.completionRate >= 50 ? "bg-amber-500" : "bg-rose-500"
                          }`}
                          style={{ width: `${ch.completionRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{ch.completionRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminCard>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="text-lg">🏆</span>
              <h4 className="font-semibold text-sm text-gray-900">Top Performer</h4>
            </div>
            <p className="text-sm text-gray-600">Chapter 1 — Fundamentals</p>
            <p className="text-xs text-gray-400">82% average score across 456 attempts</p>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-600">
              <span className="text-lg">📈</span>
              <h4 className="font-semibold text-sm text-gray-900">Needs Improvement</h4>
            </div>
            <p className="text-sm text-gray-600">Chapter 9 — Inheritance</p>
            <p className="text-xs text-gray-400">56% average score — consider review</p>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-600">
              <span className="text-lg">🔥</span>
              <h4 className="font-semibold text-sm text-gray-900">Peak Activity</h4>
            </div>
            <p className="text-sm text-gray-600">Saturdays are most active</p>
            <p className="text-xs text-gray-400">72 active users on average</p>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}