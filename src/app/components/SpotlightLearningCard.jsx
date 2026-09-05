"use client";

import React from "react";

const ACTIONS = [
  { href: "/question-bank", label: "Practice Questions", description: "Targeted questions to build exam confidence." },
  { href: "/mock-tests", label: "Take a Mock Test", description: "Simulate the pressure of the real exam." },
  { href: "/study", label: "Study Smarter", description: "Review notes and strengthen weak topics." },
];

export default function SpotlightLearningCard() {
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section className="px-4 pb-12 sm:pb-16" aria-labelledby="learning-actions-title">
      <div
        className="group relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-950 p-px shadow-2xl"
        onPointerMove={handlePointerMove}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(320px_circle_at_var(--spot-x)_var(--spot-y),rgba(96,165,250,0.25),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative rounded-[calc(2rem-1px)] bg-slate-950 px-6 py-8 sm:px-10 sm:py-9">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                Keep learning
              </div>
              <h2 id="learning-actions-title" className="text-2xl font-black tracking-tight text-white sm:text-3xl">What do you want to do next?</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">Jump straight into the part of Target95 that moves your preparation forward.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {ACTIONS.map((action) => (
                <a key={action.href} href={action.href} className="group/action rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <span className="block text-sm font-bold text-white">{action.label}</span>
                  <span className="mt-2 block text-xs leading-5 text-slate-400">{action.description}</span>
                  <span className="mt-4 block text-xs font-bold text-blue-300 transition group-hover/action:translate-x-1">Open →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
