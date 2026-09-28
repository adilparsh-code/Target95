"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { usePersonalization } from "./hooks/usePersonalization";

const pathways = [
  { id: "cisce", title: "CISCE (ICSE / ISC)", subtitle: "Java, Computer Applications & Computer Science", tone: "teal" },
  { id: "cbse", title: "CBSE", subtitle: "Computer Science & Artificial Intelligence", tone: "amber" },
];

const classes = {
  cisce: [
    { id: "icse-class-9", title: "IX", href: "/icse/class-ix" },
    { id: "icse-class-10", title: "X", href: "/icse/class-x" },
    { id: "isc-class-11", title: "XI", href: "/isc/class-xi" },
    { id: "isc-class-12", title: "XII", href: "/isc/class-xii" },
  ],
  cbse: [
    { id: "class-9", title: "IX", href: "/cbse/class/9/subject/402" },
    { id: "class-10", title: "X", href: "/cbse/class/10/subject/402" },
    { id: "class-11", title: "XI", href: "/cbse/class/11/subject/083" },
    { id: "class-12", title: "XII", href: "/cbse/class/12/subject/083" },
  ],
};

export default function StitchHomeHub() {
  const { board, class: selectedClass, setBoard, setClass, setSubject, isHydrated } = usePersonalization();
  const activeBoard = board || "cisce";
  const activeClass = selectedClass?.id || "";

  const selectBoard = (id) => {
    setBoard(id);
    setClass(null);
    setSubject(null);
  };

  return (
    <main id="main-content" className="stitch-home-hub min-h-screen bg-[var(--stitch-surface)] text-[var(--stitch-text-primary)]">
      <Navbar />
      <ErrorBoundary>
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
          <section className="stitch-hero-card relative overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] sm:p-8 lg:p-10">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
              <div>
                <p className="stitch-eyebrow">Target95+ • Board Preparation</p>
                <h1 className="stitch-display mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
                  Your focused path to <span className="text-[var(--stitch-primary)]">95+</span>.
                </h1>
                <p className="stitch-body mt-4 max-w-2xl text-base leading-7 sm:text-lg">
                  Learn chapter-by-chapter, practise board-style questions, and use AI support when you need an explanation.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/question-bank" className="stitch-btn stitch-btn-primary">Browse Question Bank <span aria-hidden="true">→</span></Link>
                  <Link href="/practice/setup" className="stitch-btn stitch-btn-secondary">Start Practice</Link>
                </div>
              </div>
              <div className="stitch-card relative p-5">
                <p className="stitch-eyebrow">Your curriculum</p>
                <p className="stitch-heading mt-2 text-xl">{isHydrated && selectedClass?.title ? selectedClass.title : "Choose your board and class"}</p>
                <p className="stitch-body mt-1 text-sm">Keep your learning path aligned with your current syllabus.</p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {pathways.map((item) => (
                    <button key={item.id} type="button" onClick={() => selectBoard(item.id)}
                      className={`rounded-xl border px-3 py-3 text-left transition ${activeBoard === item.id ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                      <span className="block text-sm font-bold">{item.title}</span>
                      <span className="mt-1 block text-xs opacity-70">{item.subtitle}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {classes[activeBoard].map((item) => (
                    <Link key={item.id} href={item.href} onClick={() => setClass({ id: item.id, title: item.title })}
                      className={`flex h-11 items-center justify-center rounded-lg border text-sm font-bold transition ${activeClass === item.id ? "border-blue-500 bg-blue-600 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"}`}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <div><p className="stitch-eyebrow">Curriculum navigation</p><h2 className="stitch-heading mt-1 text-2xl sm:text-3xl">Direct chapter navigation</h2></div>
              <Link href="/study" className="text-sm font-bold text-[var(--stitch-primary)]">Open syllabus →</Link>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Link href="/icse/class-x" className="stitch-card stitch-card-hover group p-5">
                <div className="flex items-center justify-between"><span className="stitch-board-icse rounded-full px-3 py-1 text-xs font-bold">CISCE</span><span className="text-slate-400 transition group-hover:translate-x-1">→</span></div>
                <h3 className="stitch-heading mt-4 text-xl">ICSE / ISC Computer Studies</h3>
                <p className="stitch-body mt-2 text-sm">Structured Java, programming, theory and board-practice pathways.</p>
              </Link>
              <Link href="/cbse/class/10/subject/402" className="stitch-card stitch-card-hover group p-5">
                <div className="flex items-center justify-between"><span className="stitch-board-cbse rounded-full px-3 py-1 text-xs font-bold">CBSE</span><span className="text-slate-400 transition group-hover:translate-x-1">→</span></div>
                <h3 className="stitch-heading mt-4 text-xl">CBSE Computer Science & AI</h3>
                <p className="stitch-body mt-2 text-sm">Class-wise learning paths, practicals, questions and AI-oriented content.</p>
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <p className="stitch-eyebrow">Core practice & mastery</p>
            <h2 className="stitch-heading mt-1 text-2xl sm:text-3xl">Everything you need to practise deliberately.</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                ["830+ Board Question Bank", "Browse and filter the full question bank.", "/question-bank"],
                ["Timed Practice & Mocks", "Build exam speed with focused sessions.", "/practice/setup"],
                ["AI Study Partner", "Get explanations when a concept is unclear.", "/ai-tutor"],
              ].map(([title, text, href]) => (
                <Link href={href} key={title} className="stitch-card stitch-card-hover p-5">
                  <div className="stitch-ai inline-flex rounded-lg px-2.5 py-1 text-xs font-bold">Target95+</div>
                  <h3 className="stitch-heading mt-4 text-lg">{title}</h3>
                  <p className="stitch-body mt-2 text-sm leading-6">{text}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-[var(--stitch-primary)]">Open →</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
