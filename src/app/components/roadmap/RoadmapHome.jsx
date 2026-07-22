"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { roadmapClasses, getRoadmapStats } from "../../data/roadmapData";
import { StatusBadge } from "../ui/Badge";
import ProgressRing from "../ui/ProgressRing";

export default function RoadmapHome() {
  const [selectedClass, setSelectedClass] = useState(null);

  const classWithStats = useMemo(
    () =>
      roadmapClasses.map((cls) => ({
        ...cls,
        stats: getRoadmapStats(cls.id),
      })),
    []
  );

  if (!selectedClass) {
    return (
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">
            Study Roadmap
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Class 🗺️
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
            Select your class to view the complete chapter-by-chapter roadmap with progress tracking.
          </p>
        </div>

        {/* Class Selection Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {classWithStats.map((cls) => (
            <button
              key={cls.id}
              type="button"
              onClick={() => setSelectedClass(cls.id)}
              className={`rounded-3xl border-2 ${cls.color} p-6 text-left transition hover:shadow-md hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl">{cls.icon}</span>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">{cls.label}</h2>
                  <p className="mt-1 text-sm text-gray-700">{cls.subjects[0].name}</p>
                </div>
                <ProgressRing
                  progress={
                    cls.stats.total > 0
                      ? Math.round((cls.stats.completed / cls.stats.total) * 100)
                      : 0
                  }
                  size={70}
                  strokeWidth={6}
                  label={`${cls.stats.completed}/${cls.stats.total}`}
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <StatusBadge status="completed" />{" "}
                <span className="text-xs text-gray-500">{cls.stats.completed} chapters</span>
                <StatusBadge status="active" />{" "}
                <span className="text-xs text-gray-500">{cls.stats.active} chapter</span>
                <StatusBadge status="locked" />{" "}
                <span className="text-xs text-gray-500">{cls.stats.locked} chapters</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  const activeClass = classWithStats.find((c) => c.id === selectedClass);
  if (!activeClass) return null;

  const subject = activeClass.subjects[0];
  const totalChapters = subject.chapters.length;
  const completedCount = subject.chapters.filter((ch) => ch.status === "completed").length;
  const overallPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button + Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          onClick={() => setSelectedClass(null)}
          className="mb-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Classes
        </button>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">
              {activeClass.label}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              {subject.name}
            </h1>
          </div>
          <ProgressRing
            progress={overallPercent}
            size={80}
            strokeWidth={6}
            label={`${overallPercent}%`}
          />
        </div>
        <p className="mt-3 text-sm text-gray-700">
          {completedCount} of {totalChapters} chapters completed
        </p>
        <div className="mt-3 h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Roadmap Nodes */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />
        <div className="space-y-6">
          {subject.chapters.map((chapter, idx) => (
            <div key={chapter.id} className="relative flex gap-6">
              {/* Node indicator */}
              <div className="hidden sm:flex items-start pt-2">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg font-bold ${
                    chapter.status === "completed"
                      ? "border-green-500 bg-green-100 text-green-700"
                      : chapter.status === "active"
                      ? "border-blue-500 bg-blue-100 text-blue-700"
                      : "border-gray-300 bg-gray-100 text-gray-400"
                  }`}
                >
                  {chapter.status === "completed" ? "✓" : idx + 1}
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 rounded-3xl border-2 p-6 ${
                chapter.status === "completed"
                  ? "border-green-200 bg-green-50"
                  : chapter.status === "active"
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 bg-white opacity-70"
              }`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className={`text-lg font-bold ${
                      chapter.status === "locked" ? "text-gray-400" : "text-gray-900"
                    }`}>
                      {chapter.status === "locked" && "🔒 "}
                      {chapter.title}
                    </h3>
                    <StatusBadge status={chapter.status} size="sm" />
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-gray-200 bg-white p-2.5 text-center">
                    <p className="text-xs text-gray-700">📖 Lessons</p>
                    <p className="text-sm font-bold text-gray-900">{chapter.lessons}</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-2.5 text-center">
                    <p className="text-xs text-gray-700">✍️ Practice</p>
                    <p className="text-sm font-bold text-gray-900">{chapter.practice}</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-2.5 text-center">
                    <p className="text-xs text-gray-700">📝 Revision</p>
                    <p className="text-sm font-bold text-gray-900">{chapter.revision}</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-2.5 text-center">
                    <p className="text-xs text-gray-700">🧪 Mock Test</p>
                    <p className="text-sm font-bold text-gray-900">{chapter.mockTest}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {chapter.status !== "locked" && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href="/study"
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                    >
                      Start Studying
                    </Link>
                    <Link
                      href="/java"
                      className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-900 hover:border-gray-400 transition"
                    >
                      Practice Questions
                    </Link>
                    <Link
                      href="/mock-test"
                      className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-900 hover:border-gray-400 transition"
                    >
                      Take Test
                    </Link>
                  </div>
                )}
                {chapter.status === "locked" && (
                  <div className="mt-4 rounded-xl bg-gray-100 p-3 text-center">
                    <p className="text-xs font-semibold text-gray-500">
                      Complete previous chapters to unlock
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🏁 Milestones</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl mb-1">📚</p>
            <p className="text-lg font-bold text-gray-900">{subject.chapters.length}</p>
            <p className="text-xs text-gray-700">Total Chapters</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl mb-1">✅</p>
            <p className="text-lg font-bold text-green-600">{completedCount}</p>
            <p className="text-xs text-gray-700">Completed</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl mb-1">📊</p>
            <p className="text-lg font-bold text-blue-600">{overallPercent}%</p>
            <p className="text-xs text-gray-700">Overall Progress</p>
          </div>
        </div>
      </div>
    </section>
  );
}