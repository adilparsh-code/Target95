"use client";

import Link from "next/link";
import { BookOpen, Target, Clock3, Flame, Award, Trophy } from "lucide-react";

const toneClasses = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/60",
  violet: "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900/60",
  orange: "bg-orange-50 text-orange-700 ring-orange-100 dark:bg-orange-950/40 dark:text-orange-300 dark:ring-orange-900/60",
  amber: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-300 dark:ring-cyan-900/60",
};

export default function StatsCards({ stats, isLoading }) {
  const cards = [
    { label: "Questions solved", value: stats.questionsSolved, icon: BookOpen, tone: "blue" },
    { label: "Accuracy", value: `${stats.accuracy}%`, icon: Target, tone: "emerald" },
    { label: "Mock tests", value: stats.mockTestsAttempted, icon: Trophy, tone: "cyan" },
    { label: "Average score", value: stats.averageScore ? `${stats.averageScore}%` : "—", icon: Award, tone: "amber" },
    { label: "Study streak", value: stats.studyStreak, icon: Flame, tone: "orange" },
    { label: "Study time", value: stats.studyTimeMinutes >= 60 ? `${Math.round(stats.studyTimeMinutes / 60)}h` : `${stats.studyTimeMinutes}m`, icon: Clock3, tone: "violet" },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950" aria-label="Learning statistics">
      <div className="flex items-end justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Performance</p>
          <h3 className="mt-1 text-base font-bold tracking-tight text-slate-950 dark:text-white">Your statistics</h3>
        </div>
        <span className="hidden text-xs text-slate-400 sm:block">From your learning activity</span>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 lg:grid-cols-6" aria-hidden="true">
          {cards.map((card) => (
            <div key={card.label} className="animate-pulse">
              <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800" />
              <div className="mt-4 h-7 w-16 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="mt-2 h-3 w-20 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0 dark:divide-slate-800">
          {cards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="group px-4 py-5 transition-colors hover:bg-slate-50/80 sm:px-5 dark:hover:bg-slate-900/60">
                <span className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${toneClasses[stat.tone]}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-4 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
