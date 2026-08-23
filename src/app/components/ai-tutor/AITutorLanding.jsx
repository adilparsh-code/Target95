"use client";

import Link from "next/link";
import { usePersonalization } from "../../hooks/usePersonalization";

export default function AITutorLanding() {
  const { board, class: selectedClass, subject } = usePersonalization();

  const context = [board, selectedClass, subject].filter(Boolean).join(" • ");

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 px-6 py-10 text-white sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
            <span>✨</span>
            <span>Target95 AI Tutor</span>
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Learn it. Understand it. Then solve it yourself.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
            Ask doubts, get hints, trace code, break down Boolean Algebra, or turn a wrong answer into a step-by-step learning session.
          </p>
          {context && (
            <div className="mt-5 inline-flex rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Current context: {context}
            </div>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/ai-tutor?mode=hint"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Get a Hint
            </Link>
            <Link
              href="/ai-tutor?mode=explain"
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explain a Concept
            </Link>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
          {[
            ["🧠", "Explain", "Start from your current level instead of dumping the final answer."],
            ["💡", "Hint", "Get the next useful step without spoiling the whole solution."],
            ["🔍", "Debug", "Trace code and identify where your logic went wrong."],
            ["🎯", "Practice", "Turn one doubt into a short targeted practice session."],
          ].map(([icon, title, text]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="text-2xl">{icon}</div>
              <h2 className="mt-3 font-bold text-slate-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
            </article>
          ))}
        </div>

        <div className="border-t border-slate-200 px-6 py-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-8">
          AI Tutor uses your selected learning context when available. Keep using Target95 practice pages for final answer verification.
        </div>
      </div>
    </section>
  );
}
