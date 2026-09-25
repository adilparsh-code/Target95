import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, Code2, GraduationCap, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  {
    title: "ICSE Class IX · Robotics & AI",
    description: "Robotics and Artificial Intelligence learning modules for ICSE Class IX.",
    href: "/icse/robotics-ai",
    badge: "ICSE IX",
    icon: BrainCircuit,
    label: "Foundation",
  },
  {
    title: "ICSE Class X · AI",
    description: "Syllabus-aligned Class X Artificial Intelligence theory, Python and board-style practice.",
    href: "/icse/robotics-ai/class-x",
    badge: "ICSE X",
    icon: Sparkles,
    label: "Board year",
  },
  {
    title: "ISC Class XI · Computer Science",
    description: "Computer Science practicals, projects and senior-secondary programming coverage.",
    href: "/isc/class-xi",
    badge: "ISC XI · CS",
    icon: Code2,
    label: "Senior secondary",
  },
  {
    title: "ISC Class XII · Computer Science",
    description: "Boolean Algebra, hardware, Java, data structures, algorithms and board-focused problem solving.",
    href: "/isc/class-xii",
    badge: "ISC XII · CS",
    icon: BookOpen,
    label: "Board year",
  },
  {
    title: "ISC Class XI · Artificial Intelligence",
    description: "ISC AI 883 theory for Examination Year 2027, with syllabus units and separate project work.",
    href: "/isc/artificial-intelligence/11",
    badge: "ISC XI · AI",
    icon: BrainCircuit,
    label: "AI track",
  },
  {
    title: "ISC Class XII · Artificial Intelligence",
    description: "ISC AI 883 Class XII theory covering AI applications, neural networks, ML and computer vision.",
    href: "/isc/artificial-intelligence/12",
    badge: "ISC XII · AI",
    icon: Sparkles,
    label: "AI track",
  },
];

export default function ISCHubPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--primary)]">
            <span aria-hidden="true">←</span> Target95 Home
          </Link>

          <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-[var(--shadow-md)] dark:bg-slate-900">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.2fr_.8fr] lg:p-14">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
                  <span className="rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-[var(--primary)]">ICSE &amp; ISC</span>
                  <span className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[var(--muted-foreground)]">Computer Science &amp; AI</span>
                </div>
                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">Pick your path. Then get straight to learning.</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
                  A focused hub for ICSE and ISC Computer Science and Artificial Intelligence — organised by board, class and subject so CS and AI stay clearly separated.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm font-semibold text-[var(--muted-foreground)]">
                  <GraduationCap className="h-4 w-4 text-[var(--primary)]" /> Six learning tracks
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 self-end lg:pl-8">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-5"><p className="text-3xl font-black">2</p><p className="mt-1 text-sm text-[var(--muted-foreground)]">ICSE tracks</p></div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-5"><p className="text-3xl font-black">4</p><p className="mt-1 text-sm text-[var(--muted-foreground)]">ISC tracks</p></div>
                <div className="col-span-2 rounded-2xl border border-[var(--border)] bg-white p-5 dark:bg-slate-950">
                  <p className="text-sm font-bold">One consistent learning flow</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">Theory, examples, practical work and board-focused practice — while keeping Computer Science and Artificial Intelligence on separate learning paths.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-16" aria-label="ICSE and ISC classes">
            <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Learning tracks</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Choose your class and subject</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[var(--muted-foreground)]">Each card takes you directly to its learning area, with ISC Computer Science and AI kept separately addressable.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Link key={section.href} href={section.href} className="group rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] dark:bg-slate-900 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]"><Icon className="h-5 w-5" /></span>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted-foreground)]">{section.label}</span>
                          <h3 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">{section.title}</h3>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-bold text-[var(--muted-foreground)]">{section.badge}</span>
                    </div>
                    <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">{section.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm font-bold text-[var(--primary)]">
                      <span>Open learning area</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
