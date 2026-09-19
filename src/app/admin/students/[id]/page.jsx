"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import AdminCard from "@/app/components/admin/AdminCard";
import SectionTitle from "@/app/components/admin/SectionTitle";
import StatusBadge from "@/app/components/admin/StatusBadge";
import EmptyState from "@/app/components/admin/EmptyState";
import DashboardCard from "@/app/components/admin/DashboardCard";
import { TableSkeleton } from "@/app/components/ui/LoadingSkeleton";
import useAdminData from "@/app/hooks/useAdminData";

function formatRelative(ms) {
  if (!ms) return "Never";
  const minutes = Math.floor((Date.now() - ms) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ms).toLocaleDateString();
}

function formatDate(ms) {
  return ms ? new Date(ms).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";
}

function scoreTone(score) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-blue-600";
  if (score >= 40) return "text-amber-600";
  return "text-rose-600";
}

function barTone(score) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-rose-500";
}

export default function StudentProfilePage() {
  const { id } = useParams();
  const { data, loading, error, refresh } = useAdminData(`/api/admin/students/${id}`);
  const student = data?.student;
  const progress = data?.progress;

  if (error) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon="👨‍🎓"
          title={error.includes("not found") ? "Student not found" : "Couldn't load student"}
          description={error}
          primaryAction={() => window.history.back()}
          primaryActionLabel="Go back"
        />
      </div>
    );
  }

  if (loading || !student) {
    return (
      <div className="space-y-6">
        <div className="h-32 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
        <TableSkeleton rows={4} columns={4} />
      </div>
    );
  }

  const initials = (student.fullName || student.email || "S")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const tabs = [
    { id: "progress", label: "Chapter Progress" },
    { id: "tests", label: "Test History" },
  ];

  return (
    <div className="space-y-6">
      <Link href="/admin/students" className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Students
      </Link>

      <AdminCard>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{student.fullName || "Unnamed student"}</h1>
              <StatusBadge status={student.disabled ? "inactive" : student.status} size="md" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {[student.grade, student.class && `Class ${student.class}`, student.school].filter(Boolean).join(" · ") || "—"}
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Joined {formatDate(student.createdAt)}</span>
              <span>Last active {formatRelative(student.lastActiveAt)}</span>
            </div>
          </div>
        </div>
      </AdminCard>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DashboardCard title="Questions Solved" value={progress?.questionsSolved ?? 0} icon="❓" color="blue" />
        <DashboardCard title="Accuracy" value={`${progress?.accuracy ?? 0}%`} icon="🎯" color="emerald" />
        <DashboardCard title="Best Score" value={progress?.bestScore ? `${progress.bestScore}%` : "—"} icon="🏆" color="amber" />
        <DashboardCard title="Chapters Visited" value={progress?.chaptersVisited ?? 0} icon="📖" color="violet" />
      </div>

      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <span
            key={tab.id}
            className="-mb-px border-b-2 border-blue-600 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            {tab.label}
          </span>
        ))}
      </div>

      <AdminCard>
        <SectionTitle title="Chapter Progress" subtitle="Per-chapter questions and accuracy (most recent first)" />
        {!progress?.perChapter?.length ? (
          <EmptyState
            icon="📖"
            title="No progress yet"
            description="This student hasn't started any chapters yet."
          />
        ) : (
          <div className="mt-4 space-y-3">
            {progress.perChapter.map((chapter) => (
              <div key={chapter.chapterId} className="flex items-center gap-3">
                <span className="w-40 truncate text-sm text-gray-600 dark:text-gray-300 sm:w-64" title={chapter.chapterName}>
                  {chapter.chapterName}
                </span>
                <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className={`h-full rounded-full ${barTone(chapter.accuracy)}`}
                    style={{ width: `${chapter.accuracy}%` }}
                    role="progressbar"
                    aria-valuenow={chapter.accuracy}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${chapter.chapterName} accuracy`}
                  />
                </div>
                <span className="w-28 shrink-0 text-right text-xs text-gray-500 dark:text-gray-400">
                  {chapter.questionsSolved} solved · {chapter.accuracy}%
                </span>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <AdminCard>
        <SectionTitle title="Test History" subtitle="Recent mock test attempts" />
        {!data?.mockResults?.length ? (
          <EmptyState
            icon="📋"
            title="No tests attempted"
            description="This student hasn't attempted any mock tests yet."
          />
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Test</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Score</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Time</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.mockResults.map((test, index) => (
                  <tr key={test.id || index} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{test.title}</td>
                    <td className={`px-4 py-3 font-medium ${scoreTone(test.percentage)}`}>
                      {test.percentage}%{test.totalQuestions ? ` (${test.correctCount}/${test.totalQuestions})` : ""}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {test.timeTaken ? `${Math.round(test.timeTaken / 60)} min` : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{formatDate(test.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
