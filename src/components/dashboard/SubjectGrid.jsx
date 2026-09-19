"use client";

import Link from "next/link";
import { useMemo } from "react";
import Button from "@/app/components/ui/Button";

const FALLBACK_SUBJECTS = [
  { id: "java", name: "Java Programming", icon: "☕", href: "/Java" },
  { id: "boolean", name: "Boolean Algebra", icon: "🔢", href: "/study" },
  { id: "data-structures", name: "Data Structures", icon: "📊", href: "/Java" },
  { id: "strings", name: "Strings", icon: "🔤", href: "/Java" },
];

const GRADIENTS = [
  "from-orange-500 to-red-500",
  "from-violet-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-teal-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-green-500",
];

function subjectProgress(roadmap, subject) {
  if (subject.id === "java" && roadmap.length > 0) {
    const total = roadmap.reduce((sum, c) => sum + c.total, 0);
    const solved = roadmap.reduce((sum, c) => sum + c.solved, 0);
    const progress = total > 0 ? Math.round((solved / total) * 100) : 0;
    return { total, solved, progress };
  }
  return null;
}

export default function SubjectGrid({ roadmap = [], isLoading }) {
  const subjects = useMemo(() => {
    return FALLBACK_SUBJECTS.map((subject, index) => {
      const live = subjectProgress(roadmap, subject);
      return {
        ...subject,
        gradient: GRADIENTS[index % GRADIENTS.length],
        ...(live || { total: 0, solved: 0, progress: 0 }),
      };
    });
  }, [roadmap]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-950" aria-label="Your subjects">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Curriculum</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-950 dark:text-white">Your subjects</h3>
        </div>
        <Link href="/study" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
          Browse all
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
          {subjects.map((s) => (
            <div key={s.id} className="animate-pulse rounded-xl border border-slate-100 p-4 dark:border-slate-800">
              <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800" />
              <div className="mt-3 h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="mt-3 h-2 w-full rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="rounded-xl border border-slate-100 p-4 transition-shadow hover:shadow-md dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{subject.icon}</span>
                <h4 className="text-sm font-semibold leading-tight text-slate-900 dark:text-white">{subject.name}</h4>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{subject.solved}/{subject.total} solved</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{subject.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-500`}
                    style={{ width: `${Math.min(subject.progress, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={subject.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${subject.name} progress`}
                  />
                </div>
              </div>
              <Link href={subject.href} className="mt-3 block">
                <Button variant="secondary" size="sm" className="w-full">
                  Continue
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
