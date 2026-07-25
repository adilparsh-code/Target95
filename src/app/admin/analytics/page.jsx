"use client";

import { useState } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import DashboardCard from "@/app/components/admin/DashboardCard";
import StatusBadge from "@/app/components/admin/StatusBadge";
import {
  analyticsOverview,
  dailyActivity,
  chapterPerformance,
  questionStats,
  subjectPerformance,
  monthlyGrowth,
  recentActivity,
  topPerformers,
} from "@/app/data/admin/mockAnalytics";

function getScoreColor(score) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-blue-600";
  if (score >= 40) return "text-amber-600";
  return "text-rose-600";
}

function getBarColor(score) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-rose-500";
}

function StatusIndicator({ type }) {
  const styles = {
    addition: "bg-blue-50 text-blue-700",
    registration: "bg-emerald-50 text-emerald-700",
    update: "bg-amber-50 text-amber-700",
    completion: "bg-violet-50 text-violet-700",
    deletion: "bg-rose-50 text-rose-700",
    achievement: "bg-cyan-50 text-cyan-700",
    publication: "bg-indigo-50 text-indigo-700",
    system: "bg-gray-50 text-gray-700",
  };

  const icons = {
    addition: "➕",
    registration: "👤",
    update: "📝",
    completion: "✅",
    deletion: "🗑️",
    achievement: "🏆",
    publication: "📢",
    system: "⚙️",
  };

  return (
    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${styles[type] || styles.system} shrink-0`}>
      {icons[type] || "📌"}
    </span>
  );
}

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Period Selector + Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle title="Analytics Dashboard" subtitle="Comprehensive platform performance and learner insights" />
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Active Users" value={analyticsOverview.activeUsers} icon="👥" color="blue" trend={analyticsOverview.activeUsersTrend} trendUp />
        <DashboardCard title="Questions Answered" value={analyticsOverview.questionsAnswered} icon="❓" color="indigo" trend={analyticsOverview.questionsAnsweredTrend} trendUp />
        <DashboardCard title="Avg. Session Time" value={analyticsOverview.avgSessionTime} icon="⏱️" color="emerald" trend={analyticsOverview.avgSessionTimeTrend} trendUp />
        <DashboardCard title="Completion Rate" value={`${analyticsOverview.completionRate}%`} icon="🎯" color="violet" trend={analyticsOverview.completionRateTrend} trendUp />
      </div>

      {/* Second row KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Students" value={analyticsOverview.totalStudents} icon="👨‍🎓" color="cyan" trend={analyticsOverview.totalStudentsTrend} trendUp />
        <DashboardCard title="Total Teachers" value={analyticsOverview.totalTeachers} icon="👩‍🏫" color="amber" trend={analyticsOverview.totalTeachersTrend} />
        <DashboardCard title="Total Questions" value={analyticsOverview.totalQuestions} icon="📚" color="rose" trend={analyticsOverview.totalQuestionsTrend} trendUp />
        <DashboardCard title="Tests Completed" value={analyticsOverview.totalTestsCompleted} icon="📋" color="teal" trend={analyticsOverview.totalTestsTrend} trendUp />
      </div>

      {/* Activity Trend + Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Trend Chart */}
        <div className="lg:col-span-2">
          <AdminCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Daily Activity</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Users</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-indigo-400" /> Answers</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {dailyActivity.map((day) => {
                  const userHeight = (day.users / 72) * 100;
                  const answerHeight = (day.answers / 520) * 100;
                  return (
                    <div key={day.day} className="flex flex-col items-center gap-1 flex-1">
                      <div className="flex items-end gap-1 w-full h-24">
                        <div className="flex-1 bg-blue-500 rounded-t transition-all duration-300" style={{ height: `${userHeight}%` }} title={`${day.users} users`} />
                        <div className="flex-1 bg-indigo-400 rounded-t transition-all duration-300" style={{ height: `${answerHeight}%` }} title={`${day.answers} answers`} />
                      </div>
                      <span className="text-xs text-gray-400">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Top Performers */}
        <div>
          <AdminCard>
            <SectionTitle title="Top Performers" subtitle="Highest scoring students" />
            <div className="mt-4 space-y-3">
              {topPerformers.map((student, index) => (
                <div key={student.name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                    index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-700" : "bg-blue-500"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                    <p className="text-xs text-gray-500">Class {student.class} · {student.grade}</p>
                  </div>
                  <span className={`text-sm font-bold ${getScoreColor(student.score)}`}>{student.score}%</span>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Monthly Growth */}
      <div>
        <SectionTitle title="Monthly Growth" subtitle="Platform growth metrics over time" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Users Growth */}
          <AdminCard>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">👥 Users</h4>
              <div className="space-y-1.5">
                {monthlyGrowth.map((m) => {
                  const maxUsers = Math.max(...monthlyGrowth.map((g) => g.users));
                  return (
                    <div key={m.month} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 w-6">{m.month}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(m.users / maxUsers) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-500 w-6 text-right">{m.users}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AdminCard>

          {/* Questions Growth */}
          <AdminCard>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">📚 Questions</h4>
              <div className="space-y-1.5">
                {monthlyGrowth.map((m) => {
                  const maxQ = Math.max(...monthlyGrowth.map((g) => g.questions));
                  return (
                    <div key={m.month} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 w-6">{m.month}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(m.questions / maxQ) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-500 w-9 text-right">{m.questions}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AdminCard>

          {/* Tests Growth */}
          <AdminCard>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">📋 Tests</h4>
              <div className="space-y-1.5">
                {monthlyGrowth.map((m) => {
                  const maxT = Math.max(...monthlyGrowth.map((g) => g.tests));
                  return (
                    <div key={m.month} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 w-6">{m.month}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(m.tests / maxT) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-500 w-9 text-right">{m.tests}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Question Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* By Type */}
        <AdminCard>
          <SectionTitle title="By Type" subtitle="Question distribution by type" />
          <div className="mt-4 space-y-3">
            {Object.entries(questionStats.byType).map(([type, count]) => {
              const pct = Math.round((count / questionStats.total) * 100);
              return (
                <div key={type} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{type}</span>
                    <span className="font-medium text-gray-900">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      type === "Theory" ? "bg-purple-500" : type === "MCQ" ? "bg-cyan-500" : "bg-amber-500"
                    }`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>

        {/* By Difficulty */}
        <AdminCard>
          <SectionTitle title="By Difficulty" subtitle="Question distribution by difficulty" />
          <div className="mt-4 space-y-3">
            {Object.entries(questionStats.byDifficulty).map(([difficulty, count]) => {
              const pct = Math.round((count / questionStats.total) * 100);
              return (
                <div key={difficulty} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{difficulty}</span>
                    <span className="font-medium text-gray-900">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      difficulty === "Easy" ? "bg-emerald-500" : difficulty === "Medium" ? "bg-amber-500" : "bg-rose-500"
                    }`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>

        {/* By Status */}
        <AdminCard>
          <SectionTitle title="By Status" subtitle="Question distribution by status" />
          <div className="mt-4 space-y-3">
            {Object.entries(questionStats.byStatus).map(([status, count]) => {
              const pct = Math.round((count / questionStats.total) * 100);
              return (
                <div key={status} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{status}</span>
                    <span className="font-medium text-gray-900">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      status === "Published" ? "bg-emerald-500" : status === "Draft" ? "bg-amber-500" : status === "Pending" ? "bg-violet-500" : "bg-gray-400"
                    }`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>
      </div>

      {/* Subject Performance */}
      <div>
        <SectionTitle title="Subject Performance" subtitle="Performance metrics across subjects" />
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Students</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Avg. Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tests Completed</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subjectPerformance.map((subject) => (
                <tr key={subject.subject} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{subject.subject}</td>
                  <td className="px-4 py-3 text-gray-700">{subject.students}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getBarColor(subject.avgScore)}`} style={{ width: `${subject.avgScore}%` }} />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(subject.avgScore)}`}>{subject.avgScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{subject.testsCompleted}</td>
                  <td className="px-4 py-3">
                    <span className={subject.improvement >= 10 ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                      {subject.improvement >= 0 ? "+" : ""}{subject.improvement}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                        <div className={`h-full rounded-full ${getBarColor(ch.avgScore)}`} style={{ width: `${ch.avgScore}%` }} />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(ch.avgScore)}`}>{ch.avgScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{ch.attempts}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${ch.completionRate >= 75 ? "bg-blue-500" : ch.completionRate >= 50 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${ch.completionRate}%` }} />
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard>
          <SectionTitle title="Recent Activity" subtitle="Latest platform events" />
          <div className="mt-4 divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
            {recentActivity.map((item, index) => (
              <div key={index} className="py-2.5 flex items-start gap-3">
                <StatusIndicator type={item.type} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Insights Cards */}
        <div className="space-y-4">
          <AdminCard className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className="font-semibold text-gray-900">Top Performer</h4>
                <p className="text-sm text-gray-600 mt-1">Chapter 1 — Fundamentals</p>
                <p className="text-xs text-gray-500 mt-0.5">82% average score across 456 attempts</p>
              </div>
            </div>
          </AdminCard>
          <AdminCard className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📈</span>
              <div>
                <h4 className="font-semibold text-gray-900">Needs Improvement</h4>
                <p className="text-sm text-gray-600 mt-1">Chapter 9 — Inheritance</p>
                <p className="text-xs text-gray-500 mt-0.5">56% average score — consider review</p>
              </div>
            </div>
          </AdminCard>
          <AdminCard className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🔥</span>
              <div>
                <h4 className="font-semibold text-gray-900">Peak Activity</h4>
                <p className="text-sm text-gray-600 mt-1">Saturdays are most active</p>
                <p className="text-xs text-gray-500 mt-0.5">72 active users on average</p>
              </div>
            </div>
          </AdminCard>
          <AdminCard className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📊</span>
              <div>
                <h4 className="font-semibold text-gray-900">Fastest Growing Subject</h4>
                <p className="text-sm text-gray-600 mt-1">Python</p>
                <p className="text-xs text-gray-500 mt-0.5">15% improvement this month</p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}