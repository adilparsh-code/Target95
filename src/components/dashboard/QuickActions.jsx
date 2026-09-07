"use client";

import { ArrowUpRight, BookOpen, FileQuestion, Bookmark, Bot, Trophy } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { id: 1, title: "Practice Questions", description: "Solve targeted questions", icon: FileQuestion, href: "/question-bank", color: "bg-blue-50 text-blue-700", comingSoon: false },
  { id: 2, title: "Mock Tests", description: "Take a timed exam", icon: BookOpen, href: "/mock-test", color: "bg-emerald-50 text-emerald-700", comingSoon: false },
  { id: 3, title: "Bookmarks", description: "Review saved questions", icon: Bookmark, href: "/bookmarks", color: "bg-violet-50 text-violet-700", comingSoon: false },
  { id: 4, title: "AI Tutor", description: "Get personalized help", icon: Bot, href: "#", color: "bg-amber-50 text-amber-700", comingSoon: true },
  { id: 5, title: "Leaderboard", description: "See your ranking", icon: Trophy, href: "#", color: "bg-rose-50 text-rose-700", comingSoon: true },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Shortcuts</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-950 dark:text-white">Quick actions</h3>
        </div>
        <span className="text-xs text-slate-400">Your workspace</span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              aria-disabled={action.comingSoon}
              className={`group flex items-center gap-3 py-3.5 first:pt-4 last:pb-1 ${action.comingSoon ? "cursor-not-allowed opacity-55" : "hover:bg-slate-50/70 dark:hover:bg-slate-800/40"}`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${action.color}`}><Icon className="h-4 w-4" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{action.title}</span>
                <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">{action.description}{action.comingSoon ? " · Coming soon" : ""}</span>
              </span>
              {!action.comingSoon && <ArrowUpRight className="h-4 w-4 text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
