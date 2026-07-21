"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import questions from "../data/questions";
import useBookmarks from "../hooks/useBookmarks";
import useProgress from "../hooks/useProgress";
import { getMockTestHistory } from "../../lib/mocktest";

function formatChapterName(chapter) {
  return chapter.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getQuestionById(chapter, questionId) {
  return questions.find((q) => q.chapter === chapter && q.id === questionId);
}

const STREAK_KEY = "target95-streak";
const TODAYS_GOAL_KEY = "target95-todays-goal";

function getStreak() {
  try {
    const data = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const today = new Date().toDateString();
    if (data.lastDate === today) return data.count || 0;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (data.lastDate === yesterday) return data.count || 0;
    return 0;
  } catch {
    return 0;
  }
}

function updateStreak() {
  try {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    if (data.lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newCount = data.lastDate === yesterday ? (data.count || 0) + 1 : 1;
    localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newCount, lastDate: today }));
  } catch {
    // Silently fail
  }
}

export default function StudentDashboard() {
  const { completedQuestions } = useProgress();
  const { bookmarks } = useBookmarks();
  const [streak, setStreak] = useState(0);
  const [todaysGoal, setTodaysGoal] = useState(5);
  const [todaysCompleted, setTodaysCompleted] = useState(0);

  useEffect(() => {
    setStreak(getStreak());
    try {
      const saved = localStorage.getItem(TODAYS_GOAL_KEY);
      if (saved) setTodaysGoal(parseInt(saved, 10) || 5);
    } catch {}
    // Count today's completed questions
    const today = new Date().toDateString();
    const todayCount = completedQuestions.filter((cq) => {
      // Approximate by checking if it was completed recently
      return cq.timestamp && new Date(cq.timestamp).toDateString() === today;
    }).length;
    setTodaysCompleted(todayCount);
  }, [completedQuestions]);

  const totalQuestions = questions.length;
  const completedCount = completedQuestions.length;
  const bookmarkedCount = bookmarks.length;
  const progressPercent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  const continueQuestion = useMemo(() => {
    const next = questions.find((q) => {
      return !completedQuestions.some(
        (cq) => cq.chapter === q.chapter && cq.questionId === q.id
      );
    });
    return next || questions[0];
  }, [completedQuestions]);

  const recentActivity = useMemo(() => {
    const completed = completedQuestions.slice(-3).map((item) => {
      const q = getQuestionById(item.chapter, item.questionId);
      if (!q) return null;
      return { type: "Completed", title: `Completed: ${q.question}`, subtitle: `${formatChapterName(q.chapter)} • Q${q.id}` };
    }).filter(Boolean);

    const bm = bookmarks.slice(-3).map((item) => {
      const q = getQuestionById(item.chapter, item.questionId);
      if (!q) return null;
      return { type: "Bookmarked", title: `Bookmarked: ${q.question}`, subtitle: `${formatChapterName(q.chapter)} • Q${q.id}` };
    }).filter(Boolean);

    return [...completed, ...bm].slice(0, 5);
  }, [bookmarks, completedQuestions]);

  const mockTestHistory = useMemo(() => getMockTestHistory().slice(0, 3), []);
  const avgScore = mockTestHistory.length > 0
    ? Math.round(mockTestHistory.reduce((s, h) => s + h.percentage, 0) / mockTestHistory.length)
    : 0;

  const subjectProgress = useMemo(() => {
    const subjects = [
      { name: "Java Basics", icon: "☕", chapter: "introduction" },
      { name: "Variables", icon: "🔤", chapter: "variables-data-types" },
      { name: "Operators", icon: "➕", chapter: "operators" },
      { name: "Control Flow", icon: "🔄", chapter: "if-else" },
      { name: "Loops", icon: "🔁", chapter: "loops" },
      { name: "Methods", icon: "⚙️", chapter: "methods" },
      { name: "Arrays", icon: "📊", chapter: "arrays" },
      { name: "Strings", icon: "📝", chapter: "strings" },
      { name: "Constructors", icon: "🏗️", chapter: "constructor" },
    ];
    return subjects.map((s) => {
      const total = questions.filter((q) => q.chapter === s.chapter).length;
      const done = completedQuestions.filter((cq) => cq.chapter === s.chapter).length;
      return { ...s, total, done, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
    });
  }, [completedQuestions]);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Student Dashboard</p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Welcome back, learner. 👋</h1>
            <p className="mt-3 text-base leading-7 text-gray-700">
              Track your progress, review bookmarked questions, and continue your Java practice.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-center">
              <p className="text-sm font-semibold text-yellow-700">🔥 Streak</p>
              <p className="mt-1 text-3xl font-bold text-yellow-700">{streak} days</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-center">
              <p className="text-sm font-semibold text-gray-700">Overall</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{progressPercent}%</p>
              <p className="mt-1 text-xs text-gray-500">{completedCount}/{totalQuestions}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Goal */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700">🎯 Today's Goal</h3>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${Math.min((todaysCompleted / todaysGoal) * 100, 100)}%` }} />
            </div>
            <span className="text-sm font-bold text-gray-900">{todaysCompleted}/{todaysGoal}</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Questions completed today</p>
        </div>

        {/* Continue Learning */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700">📖 Continue Learning</h3>
          <p className="mt-2 text-sm font-semibold text-gray-900 truncate">
            {continueQuestion ? continueQuestion.question : "No questions available"}
          </p>
          <Link
            href={continueQuestion ? `/java/${continueQuestion.chapter}/question/${continueQuestion.id}` : "/java"}
            className="mt-3 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Continue →
          </Link>
        </div>

        {/* AI Recommendation Card */}
        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-purple-700">🤖 AI Recommendation</h3>
          <p className="mt-2 text-sm text-purple-900 font-medium">
            {avgScore > 0
              ? `Based on your mock tests (avg ${avgScore}%), focus on ${
                  subjectProgress.filter((s) => s.percent < 50).map((s) => s.name).slice(0, 2).join(" and ") || "your weak areas"
                }.`
              : "Complete a mock test to get personalized recommendations."}
          </p>
        </div>
      </div>

      {/* Second Row: Progress + Subject Progress */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Subject Progress */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Subject Progress</h2>
          <div className="mt-4 space-y-4">
            {subjectProgress.map((s) => (
              <div key={s.chapter} className="flex items-center gap-4">
                <span className="text-lg">{s.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-900">{s.name}</span>
                    <span className="text-gray-700">{s.done}/{s.total}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full transition-all ${
                        s.percent === 100 ? "bg-green-500" : s.percent >= 50 ? "bg-blue-500" : "bg-yellow-500"
                      }`}
                      style={{ width: `${s.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weekly / Recent Activity */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <div className="mt-4 space-y-3">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-gray-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                      <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-700">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-center text-sm text-gray-700">
                Start practicing to build your activity feed.
              </div>
            )}
          </div>

          {/* Upcoming Tests */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tests</h2>
            {mockTestHistory.length > 0 ? (
              <div className="mt-4 space-y-3">
                {mockTestHistory.map((h) => (
                  <div key={h.id} className="rounded-2xl border border-gray-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {h.category?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Test"}
                    </p>
                    <p className="mt-1 text-xs text-gray-700">Score: {h.score}/{h.totalQuestions} ({h.percentage}%)</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-center text-sm text-gray-700">
                Take a mock test to see recent results here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">🏆 Achievements</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: "🔥", label: `${streak} Day Streak`, earned: streak > 0 },
            { icon: "📘", label: `${completedCount} Questions Done`, earned: completedCount > 0 },
            { icon: "⭐", label: `${bookmarkedCount} Bookmarks`, earned: bookmarkedCount > 0 },
            { icon: "🎯", label: `${mockTestHistory.length} Tests Taken`, earned: mockTestHistory.length > 0 },
          ].map((ach, idx) => (
            <div key={idx} className={`rounded-2xl border p-4 text-center ${ach.earned ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50 opacity-50"}`}>
              <p className="text-2xl">{ach.icon}</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">{ach.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}