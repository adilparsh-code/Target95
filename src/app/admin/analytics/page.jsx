"use client";

import { useState } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import DashboardCard from "@/app/components/admin/DashboardCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsCardSkeleton } from "@/app/components/ui/LoadingSkeleton";
import useAdminData from "@/app/hooks/useAdminData";

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

export default function AdminAnalyticsPage() {
  const { data, loading, error, refresh } = useAdminData("/api/admin/analytics");
  const analytics = data?.analytics;

  if (error) {
    return (
      <div className="space-y-6">
        <SectionTitle title="Analytics" subtitle="Platform performance and learner insights" />
        <EmptyState
          type="analytics"
          title="Couldn't load analytics"
          description={error}
          primaryAction={refresh}
          primaryActionLabel="Retry"
        />
      </div>
    );
  }

  if (loading || !analytics) {
    return (
      <div className="space-y-6">
        <SectionTitle title="Analytics" subtitle="Platform performance and learner insights" />
        <StatsCardSkeleton count={4} />
        <div className="h-64 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
      </div>
    );
  }

  const maxTrendAccuracy = Math.max(...analytics.weeklyTrend.map((w) => w.accuracy), 100);

  return (
    <div className="space-y-6">
      <SectionTitle title="Analytics Dashboard" subtitle="Comprehensive platform performance and learner insights" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DashboardCard title="Total Attempts" value={analytics.totalAttempts} icon="📋" color="blue" />
        <DashboardCard title="Average Score" value={`${analytics.averageScore}%`} icon="📊" color="emerald" />
        <DashboardCard title="Mock Test Average" value={analytics.mockTestAttempts ? `${analytics.mockTestAverage}%` : "—"} icon="🧪" color="violet" />
        <DashboardCard title="Mock Test Attempts" value={analytics.mockTestAttempts} icon="📝" color="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard>
          <SectionTitle title="Strong Chapters" subtitle="Highest accuracy across all learners" />
          {analytics.strongChapters.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No chapter data yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {analytics.strongChapters.map((chapter) => (
                <div key={chapter.chapterId} className="flex items-center gap-3">
                  <span className="w-32 truncate text-sm text-gray-700 dark:text-gray-200 sm:w-48" title={chapter.chapterName}>
                    {chapter.chapterName}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className={`h-full rounded-full ${getBarColor(chapter.accuracy)}`} style={{ width: `${chapter.accuracy}%` }} />
                  </div>
                  <span className={`w-20 shrink-0 text-right text-sm font-medium ${getScoreColor(chapter.accuracy)}`}>
                    {chapter.accuracy}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </AdminCard>

        <AdminCard>
          <SectionTitle title="Needs Improvement" subtitle="Chapters with the lowest accuracy" />
          {analytics.weakChapters.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No chapter data yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {analytics.weakChapters.map((chapter) => (
                <div key={chapter.chapterId} className="flex items-center gap-3">
                  <span className="w-32 truncate text-sm text-gray-700 dark:text-gray-200 sm:w-48" title={chapter.chapterName}>
                    {chapter.chapterName}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className={`h-full rounded-full ${getBarColor(chapter.accuracy)}`} style={{ width: `${chapter.accuracy}%` }} />
                  </div>
                  <span className={`w-20 shrink-0 text-right text-sm font-medium ${getScoreColor(chapter.accuracy)}`}>
                    {chapter.accuracy}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      </div>

      <AdminCard>
        <SectionTitle title="Weekly Accuracy Trend" subtitle="Average test accuracy over the last 8 weeks" />
        <div className="mt-6 flex h-40 items-end gap-3" role="img" aria-label="Weekly accuracy trend chart">
          {analytics.weeklyTrend.map((week) => (
            <div key={week.label} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{week.accuracy}%</span>
              <div className="flex h-28 w-full items-end rounded-lg bg-gray-100 dark:bg-gray-800">
                <div
                  className="w-full rounded-lg bg-blue-500 transition-all duration-500"
                  style={{ height: `${Math.round((week.accuracy / maxTrendAccuracy) * 100)}%` }}
                />
              </div>
              <span className="text-center text-[10px] leading-tight text-gray-400">{week.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">
          {analytics.totalAttempts === 0
            ? "No test attempts recorded yet — trends will appear once students complete tests."
            : `Based on ${analytics.totalAttempts} total test attempts.`}
        </p>
      </AdminCard>
    </div>
  );
}
