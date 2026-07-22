"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabs from "../components/ui/Tabs";
import ProgressRing from "../components/ui/ProgressRing";
import {
  subjectPerformance,
  weeklyPerformance,
  monthlyPerformance,
  questionDistribution,
  weakAreas,
  strongAreas,
  leaderboardData,
  practiceHistory,
} from "../data/analyticsData";

function BarChart({ data, valueKey, labelKey, colorKey, height = 200, showLabels = true }) {
  const maxValue = Math.max(...data.map((d) => d[valueKey] || 0));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((item, idx) => {
        const val = item[valueKey] || 0;
        const pct = maxValue > 0 ? (val / maxValue) * 100 : 0;
        return (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-lg relative" style={{ height: `${pct}%`, minHeight: "4px" }}>
              <div className={`w-full h-full rounded-t-lg ${item[colorKey] || "bg-blue-500"} transition-all duration-500`} />
            </div>
            {showLabels && (
              <span className="text-xs text-gray-700 text-center truncate w-full">
                {item[labelKey]}
              </span>
            )}
            <span className="text-xs font-bold text-gray-900">{val}%</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const overallAccuracy = useMemo(() => {
    const scores = weeklyPerformance.map((w) => w.accuracy);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, []);

  const totalQuestions = useMemo(
    () => weeklyPerformance.reduce((s, w) => s + w.questions, 0),
    []
  );

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "subjects", label: "Subject Performance" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "leaderboard", label: "Leaderboard" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Performance Analytics</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Track Your Progress 📈</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
            Detailed analytics on your learning performance, accuracy, and progress across all subjects.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-center">
            <p className="text-2xl mb-1">🎯</p>
            <p className="text-2xl font-bold text-gray-900">{overallAccuracy}%</p>
            <p className="text-xs text-gray-700">Overall Accuracy</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-center">
            <p className="text-2xl mb-1">📊</p>
            <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
            <p className="text-xs text-gray-700">Questions Done</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-center">
            <p className="text-2xl mb-1">⏱️</p>
            <p className="text-2xl font-bold text-gray-900">12m</p>
            <p className="text-xs text-gray-700">Avg. Speed</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-center">
            <p className="text-2xl mb-1">🏆</p>
            <p className="text-2xl font-bold text-gray-900">#6</p>
            <p className="text-xs text-gray-700">Your Rank</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} defaultTab="overview" onChange={setActiveTab} />

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Subject Performance */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Subject Performance</h2>
              <div className="space-y-3">
                {subjectPerformance.map((subj) => (
                  <div key={subj.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-900">{subj.name}</span>
                      <span className="text-gray-700">{subj.score}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${subj.color}`}
                        style={{ width: `${subj.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak & Strong Areas */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-red-800 mb-4">🔴 Weak Areas</h2>
                <div className="space-y-3">
                  {weakAreas.map((area) => (
                    <div key={area.topic}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-semibold text-gray-900">{area.topic}</span>
                        <span className="text-gray-700">{area.proficiency}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div className={`h-full rounded-full ${area.color}`} style={{ width: `${area.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-green-800 mb-4">🟢 Strong Areas</h2>
                <div className="space-y-3">
                  {strongAreas.map((area) => (
                    <div key={area.topic}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-semibold text-gray-900">{area.topic}</span>
                        <span className="text-gray-700">{area.proficiency}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div className={`h-full rounded-full ${area.color}`} style={{ width: `${area.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Distribution */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Question Distribution</h2>
              <div className="space-y-3">
                {questionDistribution.map((item) => {
                  const total = questionDistribution.reduce((s, i) => s + i.count, 0);
                  const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                  return (
                    <div key={item.type}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-semibold text-gray-900">{item.type}</span>
                        <span className="text-gray-700">{item.count} ({pct}%)</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practice History */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📋 Practice History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-gray-700">
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold">Type</th>
                      <th className="pb-3 font-semibold">Subject</th>
                      <th className="pb-3 font-semibold">Score</th>
                      <th className="pb-3 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practiceHistory.map((h, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">{h.date}</td>
                        <td className="py-3 text-gray-700">{h.type}</td>
                        <td className="py-3 text-gray-700">{h.subject}</td>
                        <td className="py-3">
                          <span className={`font-semibold ${h.score / h.total >= 0.7 ? "text-green-600" : "text-yellow-600"}`}>
                            {h.score}/{h.total}
                          </span>
                        </td>
                        <td className="py-3 text-gray-700">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Score Predictor */}
            <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-purple-800 mb-2">🎯 Target Score Prediction</h2>
              <p className="text-sm text-purple-700">
                Based on your current performance trend, your projected score is <strong className="text-purple-900">85%</strong> in the next mock test.
                Focus on <strong className="text-purple-900">Constructors</strong> and <strong className="text-purple-900">Loops</strong> to improve further.
              </p>
              <div className="mt-4 h-3 rounded-full bg-purple-200 overflow-hidden">
                <div className="h-full rounded-full bg-purple-600" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === "subjects" && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Subject Performance Breakdown</h2>
            <BarChart data={subjectPerformance} valueKey="score" labelKey="name" colorKey="color" height={250} />
          </div>
        )}

        {/* Weekly Tab */}
        {activeTab === "weekly" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Weekly Performance (Score)</h2>
              <BarChart data={weeklyPerformance} valueKey="score" labelKey="week" colorKey={() => "bg-blue-500"} height={250} />
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Weekly Accuracy</h2>
              <BarChart data={weeklyPerformance} valueKey="accuracy" labelKey="week" colorKey={() => "bg-green-500"} height={250} />
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Weekly Questions Answered</h2>
              <BarChart data={weeklyPerformance} valueKey="questions" labelKey="week" colorKey={() => "bg-purple-500"} height={250} />
            </div>
          </div>
        )}

        {/* Monthly Tab */}
        {activeTab === "monthly" && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Monthly Performance</h2>
            <BarChart data={monthlyPerformance} valueKey="score" labelKey="month" colorKey={() => "bg-teal-500"} height={250} />
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🏆 Leaderboard</h2>
            <div className="space-y-2">
              {leaderboardData.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center gap-4 rounded-2xl p-4 ${
                    player.rank === 1 ? "bg-yellow-50 border border-yellow-200" :
                    player.rank <= 3 ? "bg-gray-50 border border-gray-200" :
                    "border border-gray-100"
                  }`}
                >
                  <span className="text-lg font-bold text-gray-900 w-8 text-center">
                    {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : `#${player.rank}`}
                  </span>
                  <span className="text-2xl">{player.avatar}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{player.name}</p>
                    <p className="text-xs text-gray-700">Level {player.level}</p>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">{player.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}