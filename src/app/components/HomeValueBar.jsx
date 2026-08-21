"use client";

import React from "react";
import Container from "./ui/Container";

const highlights = [
  { icon: "⚡", label: "AI-powered", detail: "Study smarter" },
  { icon: "🎯", label: "Board-focused", detail: "ICSE · ISC · CBSE" },
  { icon: "🧠", label: "Practice-first", detail: "Questions + programs" },
  { icon: "📈", label: "Score-focused", detail: "Track your progress" },
];

export default function HomeValueBar() {
  return (
    <section className="relative -mt-5 pb-8 sm:-mt-8 sm:pb-12" aria-label="Target95+ benefits">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 pointer-events-none" />
          <div className="relative grid grid-cols-2 divide-x divide-y divide-slate-200/70 md:grid-cols-4 md:divide-y-0">
            {highlights.map((item) => (
              <div key={item.label} className="group flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg shadow-sm ring-1 ring-slate-200/70 transition-transform duration-300 group-hover:scale-105">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">{item.label}</p>
                  <p className="truncate text-xs font-medium text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
