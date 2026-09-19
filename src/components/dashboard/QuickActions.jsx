"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, FileQuestion, Bookmark, Bot, Target } from "lucide-react";

const quickActions = [
  { id: 1, title: "Practice questions", description: "Solve targeted questions", icon: FileQuestion, href: "/question-bank", color: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" },
  { id: 2, title: "Mock tests", description: "Take a timed board-style exam", icon: BookOpen, href: "/mock-test", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" },
  { id: 3, title: "Bookmarks", description: "Review saved questions", icon: Bookmark, href: "/bookmarks", color: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300" },
  { id: 4, title: "Ask AI tutor", description: "Get explanations and hints", icon: Bot, href: "/ai-tutor", color: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" },
  { id: 5, title: "Progress", description: "See your performance analytics", icon: Target, href: "/analytics", color: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300" },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6" aria-label="Quick actions">
      <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Shortcuts</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-950 dark:text-white">Quick actions</h3>
        </div>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <li key={action.id}>
              <Link
                href={action.href}
                className="group flex items-center gap-3 py-3.5 transition-colors first:pt-4 last:pb-1 hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${action.color}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{action.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">{action.description}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
