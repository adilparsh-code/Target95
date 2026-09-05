"use client";

import React from "react";
import { ArrowRight, BookOpenCheck, Brain, ClipboardCheck } from "lucide-react";

const ACTIONS = [
  { href: "/question-bank", label: "Practice Questions", description: "Targeted questions to build exam confidence.", icon: BookOpenCheck },
  { href: "/mock-test", label: "Take a Mock Test", description: "Simulate the pressure of the real exam.", icon: ClipboardCheck },
  { href: "/study", label: "Study Smarter", description: "Review notes and strengthen weak topics.", icon: Brain },
];

export default function SpotlightLearningCard() {
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return <section className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-14" aria-labelledby="learning-actions-title"><div className="mx-auto max-w-6xl"><div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-px shadow-sm" onPointerMove={handlePointerMove}><div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(320px_circle_at_var(--spot-x)_var(--spot-y),rgba(59,130,246,0.16),transparent_70%)]" aria-hidden="true" /><div className="relative rounded-[calc(2rem-1px)] bg-white px-6 py-8 sm:px-9 sm:py-9"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.5fr] lg:items-center"><div><div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Your next step</div><h2 id="learning-actions-title" className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Keep your preparation moving.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">Jump straight into the activity that matches what you need to do next.</p></div><div className="grid gap-3 sm:grid-cols-3">{ACTIONS.map((action) => { const Icon = action.icon; return <a key={action.href} href={action.href} className="group/action rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white"><Icon className="h-4 w-4" /></div><span className="mt-4 block text-sm font-bold text-slate-950">{action.label}</span><span className="mt-1.5 block text-xs leading-5 text-slate-500">{action.description}</span><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-700">Open <ArrowRight className="h-3 w-3 transition group-hover/action:translate-x-1" /></span></a>; })}</div></div></div></div></div></section>;
}
