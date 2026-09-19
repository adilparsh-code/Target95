"use client";

import Link from "next/link";
import { Trophy, ClipboardList, Award } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { formatRelativeDate } from "@/lib/learningRoadmap";

function scoreTone(percentage) {
  if (percentage >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (percentage >= 60) return "text-blue-600 dark:text-blue-400";
  if (percentage >= 40) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

export default function UpcomingMockTests({ mockTests = [], bestScore = 0, isLoading }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-950" aria-label="Mock tests">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">Mock tests</h3>
        {bestScore > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            <Award className="h-3.5 w-3.5" aria-hidden="true" /> Best {bestScore}%
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="mt-4 space-y-3" aria-hidden="true">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />
          ))}
        </div>
      ) : mockTests.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <ClipboardList className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" aria-hidden="true" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No mock tests attempted yet. Simulate a real board exam to gauge readiness.</p>
          <Link href="/mock-test" className="mt-3 inline-block">
            <Button size="sm">Start your first test</Button>
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {mockTests.slice(0, 5).map((test, index) => {
            const percentage = Number(test.percentage) || 0;
            return (
              <li key={test.id || index} className="rounded-xl border border-slate-100 p-4 transition-colors hover:border-blue-200 dark:border-slate-800 dark:hover:border-blue-900">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900 dark:text-white">{test.title || "Mock test"}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {test.correctCount != null && test.totalQuestions != null
                        ? `${test.correctCount}/${test.totalQuestions} correct · `
                        : ""}
                      {formatRelativeDate(test.completedAt)}
                    </p>
                  </div>
                  <span className={`shrink-0 text-sm font-bold ${scoreTone(percentage)}`}>{percentage}%</span>
                </div>
              </li>
            );
          })}
          <li>
            <Link href="/mock-test" className="mt-1 block">
              <Button variant="secondary" className="w-full">
                <Trophy className="h-4 w-4" aria-hidden="true" /> Start a new test
              </Button>
            </Link>
          </li>
        </ul>
      )}
    </section>
  );
}
