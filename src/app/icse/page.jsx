"use client";

import Link from "next/link";
import { BookOpen, BrainCircuit, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ICSE hub: users landing on /icse (bookmarks, search engines) get a real
// overview of every ICSE track instead of a 404. In-app links go directly to
// the class pages (/icse/class-ix, /icse/class-x), so this page only needs to
// stay consistent with the sections that exist.
const sections = [
  {
    title: "ICSE Class IX · Robotics & AI",
    description: "Robotics and Artificial Intelligence foundation modules for Class IX.",
    href: "/icse/class-ix",
    badge: "ICSE IX",
    icon: BookOpen,
    label: "Foundation",
  },
  {
    title: "ICSE Class X · Robotics & AI",
    description: "Board-year Artificial Intelligence syllabus coverage with practice.",
    href: "/icse/class-x",
    badge: "ICSE X",
    icon: Sparkles,
    label: "Board year",
  },
  {
    title: "ICSE Robotics & AI Track",
    description: "Theory, Python and board-style practice across both ICSE classes.",
    href: "/icse/robotics-ai",
    badge: "ICSE AI",
    icon: BrainCircuit,
    label: "AI track",
  },
];

export default function ICSEHubPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--primary)]"
          >
            <span aria-hidden="true">←</span> Target95 Home
          </Link>

          <section className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
              <span className="rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-[var(--primary)]">ICSE</span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[var(--muted-foreground)]">
                Classes IX &amp; X
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl">ICSE learning tracks</h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)]">
              Choose your class to continue — Computer Applications, Robotics &amp; AI syllabus coverage,
              programs and projects.
            </p>
          </section>

          <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)] dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
                      {section.badge}
                    </span>
                  </div>
                  <h2 className="mt-5 text-lg font-black tracking-tight">{section.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted-foreground)]">{section.description}</p>
                  <span className="mt-4 text-sm font-bold text-[var(--primary)]">
                    {section.label}
                    <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
