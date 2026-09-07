"use client";

import ProgressRing from "@/app/components/ui/ProgressRing";

const items = [
  { key: "chapter", title: "Chapter completion", caption: (stats) => `${stats.chapterCompletion}% of your chapters`, value: (stats) => stats.chapterCompletion, color: "stroke-blue-600" },
  { key: "daily", title: "Daily goal", caption: (stats) => `${stats.dailyGoal.current}/${stats.dailyGoal.target} questions`, value: (stats) => stats.dailyGoal.progress, color: "stroke-emerald-600" },
  { key: "weekly", title: "Weekly goal", caption: (stats) => `${stats.weeklyGoal.current}/${stats.weeklyGoal.target} days`, value: (stats) => stats.weeklyGoal.progress, color: "stroke-violet-600" },
];

export default function ProgressOverview({ stats }) {
  if (!stats) {
    return <section className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950" aria-label="Loading progress" />;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Goals</p>
        <h3 className="mt-1 text-base font-bold tracking-tight text-slate-950 dark:text-white">Progress overview</h3>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-slate-800">
        {items.map((item) => {
          const progress = Math.max(0, Math.min(100, Number(item.value(stats)) || 0));
          return (
            <div key={item.key} className="flex items-center gap-5 px-5 py-6">
              <ProgressRing progress={progress} size={88} strokeWidth={7} color={item.color} label={`${progress}%`} />
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.caption(stats)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
