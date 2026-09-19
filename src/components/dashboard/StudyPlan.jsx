"use client";

import Link from "next/link";
import { CalendarCheck, BookMarked, Sparkles } from "lucide-react";
import { formatRelativeDate } from "@/lib/learningRoadmap";

export default function StudyPlan({ roadmap = [], recommendations = [], dailyGoal = 10, solvedToday = 0, isLoading }) {
  const pending = roadmap.filter((c) => c.remaining > 0).slice(0, 3);
  const target = Math.max(dailyGoal, 1);
  const progress = Math.min(Math.round((solvedToday / target) * 100), 100);

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950" aria-busy="true">
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        <div className="mt-4 space-y-2" aria-hidden="true">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950" aria-label="Study plan">
      <div className="flex items-center gap-2">
        <CalendarCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
        <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">Today&apos;s plan</h3>
      </div>

      <div className="mt-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/40">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-blue-800 dark:text-blue-200">Daily target: {target} questions</span>
          <span className="font-bold text-blue-700 dark:text-blue-300">{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900">
          <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Daily goal progress" />
        </div>
      </div>

      {pending.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending chapters</p>
          <ul className="mt-2 space-y-2">
            {pending.map((chapter) => (
              <li key={chapter.slug}>
                <Link href={`/Java/${chapter.slug}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                  <span className="flex min-w-0 items-center gap-2">
                    <BookMarked className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                    <span className="truncate font-medium text-slate-800 dark:text-slate-200">{chapter.title}</span>
                  </span>
                  <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">{chapter.remaining} left</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="mt-4">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Recommended next
          </p>
          <ul className="mt-2 space-y-2">
            {recommendations.slice(0, 3).map((rec) => (
              <li key={rec.id}>
                <Link href={rec.href} className="block rounded-lg border border-slate-100 px-3 py-2 transition-colors hover:border-blue-200 hover:bg-blue-50/40 dark:border-slate-800 dark:hover:border-blue-900 dark:hover:bg-blue-950/20">
                  <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">{rec.title}</span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{rec.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
