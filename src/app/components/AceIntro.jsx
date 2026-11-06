"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AceIntro() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !mounted || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll("[data-ace-card]");
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 80}ms`;
      requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
    });
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="ace-heading"
    >
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 p-6 sm:p-8 lg:p-10 shadow-xl">
        {/* Decorative background blobs */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 right-10 h-6 w-6 rounded-full bg-white/5" />
          <div className="absolute bottom-20 left-20 h-4 w-4 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/3 h-3 w-3 rounded-full bg-white/5" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-300 shadow-[0_0_8px_rgba(129,140,248,0.8)]" aria-hidden="true" />
              AI Study Partner
            </span>
            <h2 id="ace-heading" className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Stuck on a concept?
              <span className="block bg-gradient-to-r from-indigo-200 via-white to-indigo-200 bg-clip-text text-transparent sm:block">
                Ask Ace.
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-200 sm:text-left">
              Ace explains board concepts step by step, traces Java and Python code, and walks you through exam-style questions when you hit a wall.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "◷",
                title: "Step-by-step explanations",
                description:
                  "Break down any ICSE or CBSE Computer Science topic into plain steps with board-style examples.",
                href: "/ai-tutor",
                color: "from-indigo-500 to-blue-600",
                bg: "bg-indigo-500/10",
                badge: "Open explanations",
              },
              {
                icon: "✦",
                title: "Code tracing & debugging",
                description:
                  "Paste a Java or Python snippet and get a line-by-line walkthrough of what it actually does.",
                href: "/ai-tutor",
                color: "from-purple-500 to-pink-600",
                bg: "bg-purple-500/10",
                badge: "Open code tracing",
              },
              {
                icon: "▣",
                title: "Practice when you are ready",
                description:
                  "Turn a tricky concept into a quick practice question so you can check your understanding immediately.",
                href: "/question-bank",
                color: "from-emerald-500 to-teal-600",
                bg: "bg-emerald-500/10",
                badge: "Open practice",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                data-ace-card
                className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] sm:p-6 ${!mounted ? "opacity-0 translate-y-4" : ""}`}
                style={
                  mounted
                    ? { transitionProperty: "opacity, transform", transitionDuration: "400ms", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }
                    : undefined
                }
              >
                {/* Gradient accent */}
                <div
                  className={`absolute right-0 top-0 h-16 w-16 rounded-full bg-gradient-to-br ${card.color} opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-60`}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Icon */}
                  <span
                    className={`inline-flex grid h-10 w-10 place-items-center rounded-xl text-lg shadow-sm transition-transform duration-300 group-hover:scale-110 ${card.bg}`}
                    aria-hidden="true"
                  >
                    {card.icon}
                  </span>

                  <h3 className="mt-4 text-base font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-indigo-200">{card.description}</p>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-300">
                    {card.badge}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
              <span className="rounded-full bg-white/10 px-2.5 py-1">No account needed</span>
              <span className="text-indigo-300/60">·</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1">Board-aligned responses</span>
            </div>
            <Link
              href="/ai-tutor"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-white px-5 py-2 text-xs font-bold text-indigo-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:text-sm"
            >
              Start chatting with Ace
            </Link>
          </div>
        </div>
      </div>

      {/* Accessible label for screen readers describing the Ace section */}
      <p className="sr-only">
        Ace is the Target95 AI study partner. It helps explain concepts, trace code, and guide practice for ICSE and CBSE Computer Science.
      </p>
    </section>
  );
}
