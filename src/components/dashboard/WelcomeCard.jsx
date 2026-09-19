"use client";

import Link from "next/link";
import { Flame, Target, ArrowRight } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function WelcomeCard({ user, stats, streak = 0, xp = null }) {
  const firstName = user?.fullName?.split(" ")[0] || "Student";
  const target = stats?.dailyGoal?.target || 10;
  const current = stats?.dailyGoal?.current || 0;
  const progress = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {getGreeting()}, {firstName}! 👋
          </h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            You&apos;re {Math.max(target - current, 0)} questions away from today&apos;s target. Keep it up!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
            <Flame className="h-4 w-4" aria-hidden="true" /> {streak} day streak
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/40">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-300">
            <Target className="h-3.5 w-3.5" aria-hidden="true" /> Today&apos;s target
          </p>
          <p className="mt-1 text-2xl font-bold text-blue-700 dark:text-blue-200">{current}/{target}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900">
            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Daily target progress" />
          </div>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">Current streak</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-200">{streak} days</p>
          <p className="mt-1 text-xs text-emerald-600/80 dark:text-emerald-400/80">Practice daily to grow it</p>
        </div>
        {xp ? (
          <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/40">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-300">Level {xp.level?.level} · {xp.level?.title}</p>
            <p className="mt-1 text-2xl font-bold text-amber-700 dark:text-amber-200">{xp.xp} XP</p>
            {xp.nextLevel && (
              <p className="mt-1 text-xs text-amber-600/80 dark:text-amber-400/80">{xp.nextLevel.xpRequired - xp.xp} XP to {xp.nextLevel.title}</p>
            )}
          </div>
        ) : (
          <Link href="/daily-challenge" className="flex items-center justify-center rounded-xl bg-violet-50 p-4 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-900/60">
            Try today&apos;s challenge <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
