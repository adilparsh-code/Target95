"use client";

import React from "react";

export default function HomeProductPreview() {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-5xl lg:mt-12">
      <div className="absolute inset-x-10 -bottom-8 h-24 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg text-white shadow-sm">🎯</div>
            <div>
              <p className="text-sm font-bold text-slate-900">Your Target95+ Path</p>
              <p className="text-xs font-medium text-slate-500">ICSE Class 10 · Java Programming</p>
            </div>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">78% ready</div>
        </div>

        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Current focus</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">Arrays & Searching</h3>
              </div>
              <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">12 min</span>
            </div>

            <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-xs text-slate-500">Concepts</p>
                <p className="mt-1 text-sm font-bold text-emerald-600">✓ Complete</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-xs text-slate-500">Practice</p>
                <p className="mt-1 text-sm font-bold text-slate-900">18 / 24</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-xs text-slate-500">PYQs</p>
                <p className="mt-1 text-sm font-bold text-slate-900">8 / 10</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 text-white shadow-xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
              <span>🤖</span>
              <span>AI Study Partner</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">Stuck on binary search?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Get a simple explanation, a board-style example, then solve a similar question with instant feedback.</p>
            <div className="mt-6 space-y-2 text-xs font-semibold">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Explain the concept →</div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Show one example →</div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Give me a challenge →</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-slate-200/80 sm:grid-cols-4">
          {[
            ["01", "Learn concepts"],
            ["02", "Practice questions"],
            ["03", "Solve PYQs"],
            ["04", "Take mock tests"],
          ].map(([step, label], index) => (
            <div key={step} className={`flex items-center gap-3 px-4 py-4 ${index < 3 ? "border-r border-slate-200/80" : ""}`}>
              <span className="text-xs font-black text-blue-600">{step}</span>
              <span className="text-xs font-semibold text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
