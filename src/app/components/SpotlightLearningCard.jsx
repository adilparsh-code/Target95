"use client";

import React, { useState } from "react";

const ACTIONS = [
  {
    href: "/question-bank",
    label: "Practice Questions",
    description: "Build exam confidence with targeted question practice.",
  },
  {
    href: "/mock-tests",
    label: "Take a Mock Test",
    description: "Test yourself under realistic exam conditions.",
  },
  {
    href: "/study",
    label: "Study Smarter",
    description: "Review structured notes and strengthen weak topics.",
  },
];

export default function SpotlightLearningCard() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="px-4 pb-12 sm:pb-16" aria-labelledby="learning-actions-title">
      <div
        className="group relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-px shadow-xl dark:border-slate-700"
        onPointerMove={handlePointerMove}
      >
        <div
          className="pointer-events-none absolute -inset-32 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(59,130,246,0.32), transparent 38%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative rounded-[calc(1.5rem-1px)] bg-slate-950 px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1.4fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                YOUR NEXT STEP
              </div>
              <h2 id="learning-actions-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Turn preparation into progress.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Pick a focused action and keep your Target95 study session moving without getting lost in the platform.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {ACTIONS.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <span className="block text-sm font-semibold text-white">{action.label}</span>
                  <span className="mt-2 block text-xs leading-5 text-slate-400">{action.description}</span>
                  <span className="mt-4 block text-xs font-semibold text-blue-300">Open →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
