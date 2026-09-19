"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

function accuracyTone(accuracy) {
  if (accuracy >= 80) return "bg-emerald-500";
  if (accuracy >= 60) return "bg-blue-500";
  if (accuracy >= 40) return "bg-amber-500";
  return "bg-rose-500";
}

function TopicList({ topics, emptyLabel }) {
  if (!topics.length) {
    return <p className="py-2 text-sm text-slate-400 dark:text-slate-500">{emptyLabel}</p>;
  }
  return (
    <ul className="space-y-2.5">
      {topics.map((topic) => (
        <li key={topic.title}>
          <Link href={topic.href} className="group block">
            <div className="flex items-center justify-between text-sm">
              <span className="truncate font-medium text-slate-800 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">{topic.title}</span>
              <span className="shrink-0 font-semibold text-slate-600 dark:text-slate-300">{topic.accuracy}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className={`h-full rounded-full ${accuracyTone(topic.accuracy)} transition-all duration-500`} style={{ width: `${topic.accuracy}%` }} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function PerformancePanel({ performance, isLoading }) {
  if (isLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950" aria-busy="true">
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        <div className="mt-4 space-y-3" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950" aria-label="Performance breakdown">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-600" aria-hidden="true" />
        <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">Performance</h3>
      </div>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> Strong topics
          </p>
          <div className="mt-2">
            <TopicList topics={performance.strongTopics} emptyLabel="Answer some questions to identify your strong topics." />
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
            <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" /> Needs work
          </p>
          <div className="mt-2">
            <TopicList topics={performance.weakTopics} emptyLabel="No weak topics identified yet — keep practicing!" />
          </div>
        </div>
      </div>
    </section>
  );
}
