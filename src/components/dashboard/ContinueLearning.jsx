"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";
import Button from "@/app/components/ui/Button";
import ProgressRing from "@/app/components/ui/ProgressRing";

export default function ContinueLearning({ lastChapter, isLoading }) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950" aria-busy="true">
        <div className="h-6 w-1/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        <div className="mt-6 h-10 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  if (!lastChapter) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Continue Learning</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Start your first chapter to track your progress and build your streak.
        </p>
        <Link href="/Java">
          <Button className="mt-4">Start Learning</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-2">
        <PlayCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Continue Learning</h3>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900 dark:text-white">{lastChapter.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lastChapter.remaining > 0 ? `${lastChapter.remaining} questions left` : "Chapter complete"}
            {lastChapter.accuracy > 0 && ` · ${lastChapter.accuracy}% accuracy`}
          </p>
        </div>
        <ProgressRing progress={lastChapter.progress} size={64} strokeWidth={6} label={`${lastChapter.progress}%`} />
      </div>
      <Link href={`/Java/${lastChapter.slug}`} className="mt-5 block">
        <Button className="w-full">Resume chapter</Button>
      </Link>
    </div>
  );
}
