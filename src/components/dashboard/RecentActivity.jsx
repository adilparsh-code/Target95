"use client";

import Link from "next/link";
import { CheckCircle, XCircle, Clock, BookOpen as ChapterIcon, Trophy } from "lucide-react";
import { formatRelativeDate } from "@/lib/learningRoadmap";

const TYPE_ICONS = {
  question: Clock,
  chapter: ChapterIcon,
  test: Trophy,
};

export default function RecentActivity({ activities = [], isLoading }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-950" aria-label="Recent activity">
      <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">Recent activity</h3>

      {isLoading ? (
        <div className="mt-4 space-y-3" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <Clock className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" aria-hidden="true" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No activity yet. Solve your first question to see it here.</p>
          <Link href="/question-bank" className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
            Start practicing →
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {activities.map((activity) => {
            const Icon = TYPE_ICONS[activity.type] || Clock;
            return (
              <li key={activity.id} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-900/70">
                <span className="shrink-0">
                  {activity.correct === true && <CheckCircle className="h-5 w-5 text-emerald-500" aria-hidden="true" />}
                  {activity.correct === false && <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />}
                  {activity.correct === null && <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{activity.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activity.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{formatRelativeDate(activity.at)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
