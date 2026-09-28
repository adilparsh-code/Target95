"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { usePersonalization } from "./hooks/usePersonalization";

const boards = [
  { id: "cisce", label: "CISCE", detail: "(ICSE/ISC)" },
  { id: "cbse", label: "CBSE", detail: "(IX - XII)" },
];

const classOptions = {
  cisce: [
    { id: "icse-class-9", label: "IX", title: "ICSE Class 9", href: "/icse/class-ix" },
    { id: "icse-class-10", label: "X", title: "ICSE Class 10", href: "/icse/class-x" },
    { id: "isc-class-11", label: "XI", title: "ISC Class 11", href: "/isc/class-xi" },
    { id: "isc-class-12", label: "XII", title: "ISC Class 12", href: "/isc/class-xii" },
  ],
  cbse: [
    { id: "cbse-class-9", label: "IX", title: "CBSE Class 9", href: "/cbse/class/9/subject/402" },
    { id: "cbse-class-10", label: "X", title: "CBSE Class 10", href: "/cbse/class/10/subject/402" },
    { id: "cbse-class-11", label: "XI", title: "CBSE Class 11", href: "/cbse/class/11/subject/083" },
    { id: "cbse-class-12", label: "XII", title: "CBSE Class 12", href: "/cbse/class/12/subject/083" },
  ],
};


const getSubjectsForClass = (classId) => {
  if (classId === "icse-class-9") return [
    { id: "java", label: "Java", detail: "Computer Applications", icon: "☕", href: "/Java" },
    { id: "artificial-intelligence", label: "Artificial Intelligence", detail: "Robotics & AI", icon: "✦", href: "/icse/robotics-ai" },
  ];
  if (classId === "icse-class-10") return [
    { id: "java", label: "Java", detail: "Computer Applications", icon: "☕", href: "/Java" },
    { id: "artificial-intelligence", label: "Artificial Intelligence", detail: "Robotics & AI", icon: "✦", href: "/icse/robotics-ai/class-x" },
  ];
  if (classId === "isc-class-11") return [
    { id: "java", label: "Java", detail: "Computer Science", icon: "☕", href: "/Java" },
    { id: "artificial-intelligence", label: "Artificial Intelligence", detail: "ISC AI 883", icon: "✦", href: "/isc/artificial-intelligence/11" },
  ];
  if (classId === "isc-class-12") return [
    { id: "java", label: "Java", detail: "Computer Science", icon: "☕", href: "/Java" },
    { id: "artificial-intelligence", label: "Artificial Intelligence", detail: "ISC AI 883", icon: "✦", href: "/isc/artificial-intelligence/12" },
  ];
  if (classId === "cbse-class-11") return [
    { id: "java", label: "Java", detail: "Computer Science", icon: "☕", href: "/cbse/class/11/subject/083" },
    { id: "artificial-intelligence", label: "Artificial Intelligence", detail: "CBSE AI 843", icon: "✦", href: "/cbse/class/11/subject/843" },
  ];
  if (classId === "cbse-class-12") return [
    { id: "java", label: "Java", detail: "Computer Science", icon: "☕", href: "/cbse/class/12/subject/083" },
    { id: "artificial-intelligence", label: "Artificial Intelligence", detail: "CBSE AI 843", icon: "✦", href: "/cbse/class/12/subject/843" },
  ];
  return [{ id: "java", label: "Java", detail: "Computer Science", icon: "☕", href: "/Java" }];
};

const chapters = [
  { no: "04", title: "Arrays: Single & Double Dimensional", status: "Active Unit", detail: "Indexing, binary search, bubble sort, selection sort, array manipulation algorithms.", href: "/Java/arrays-1d" },
  { no: "01", title: "Revision of Class IX Java Concepts", status: "Mastered (100%)", detail: "Tokens, data types, operator precedence, flow of control (if-else, switch, loops).", href: "/Java/introduction-to-java" },
  { no: "03", title: "Class as the Basis of All Computation", status: "Mastered (95%)", detail: "Objects as instances, abstraction, encapsulation, primitive vs composite types.", href: "/Java/classes-objects" },
  { no: "02", title: "User-Defined Methods & Constructors", status: "Practice in Progress (60%)", detail: "Parameters, return values, method overloading, default vs parameterized constructors.", href: "/Java/methods" },
  { no: "05", title: "String Handling & Library Classes", status: "Next Up", detail: "String methods, character class checks and common library operations.", href: "/Java/strings" },
];

function MiniIcon({ type }) {
  return <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">{type === "exam" ? "◷" : type === "ai" ? "✦" : "▣"}</span>;
}

export default function StitchHomeHub() {
  const { board, class: selectedClass, subject, setBoard, setClass, setSubject, isHydrated } = usePersonalization();
  const activeBoard = board || "cisce";
  const selected = selectedClass?.id || "icse-class-10";
  const currentClass = classOptions[activeBoard].find((item) => item.id === selected) || classOptions[activeBoard][0];
  const subjectOptions = getSubjectsForClass(currentClass.id);
  const selectedSubject = subject?.id && subjectOptions.some((item) => item.id === subject.id) ? subject.id : "java";
  const activeSubject = subjectOptions.find((item) => item.id === selectedSubject) || subjectOptions[0];

  const chooseBoard = (id) => {
    setBoard(id);
    setClass(null);
    setSubject(null);
  };

  return (
    <main id="main-content" className="stitch-home-hub min-h-screen bg-[#f8f8fc] text-slate-900">
      <Navbar />
      <ErrorBoundary>
        <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-5 sm:px-6 lg:px-8">
          <section className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-700 text-white">▶</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className="rounded-full bg-white px-2.5 py-1 text-teal-700">ICSE CLASS 10</span>
                    <span className="text-slate-400">•</span><span className="text-slate-700">Computer Applications</span>
                  </div>
                  <h1 className="mt-1 text-base font-bold sm:text-lg">Continue: Arrays & Searching</h1>
                  <p className="text-xs text-slate-500">Paused at Question 19 of 24 (Binary Search Logic Trace) • 78% syllabus completed</p>
                </div>
              </div>
              <Link href="/Java/arrays" className="stitch-btn stitch-btn-primary shrink-0">Resume Practice (Q19) →</Link>
            </div>
          </section>

          <section className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div><p className="stitch-eyebrow">Direct Study Launcher</p><h2 className="stitch-heading mt-1 text-xl">Select Your Curriculum Pathway</h2></div>
              <span className="hidden text-xs text-slate-400 md:block">Jump straight into verified board syllabus & practice</span>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-[1.05fr_1fr_1.15fr_.95fr]">
              <div className="rounded-lg border border-slate-200 p-3"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Step 1 • Board</p><div className="mt-2 grid grid-cols-2 gap-2">{boards.map((item) => <button key={item.id} onClick={() => chooseBoard(item.id)} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${activeBoard === item.id ? "border-teal-200 bg-teal-50 text-teal-700" : "border-slate-200 text-slate-600"}`}>{item.label}<span className="block text-[10px] font-normal opacity-70">{item.detail}</span></button>)}</div></div>
              <div className="rounded-lg border border-slate-200 p-3"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Step 2 • Class</p><div className="mt-2 grid grid-cols-4 gap-1.5">{classOptions[activeBoard].map((item) => <Link key={item.id} href={item.href} onClick={() => setClass({ id: item.id, title: item.title })} className={`flex h-9 items-center justify-center rounded-md text-xs font-bold ${currentClass.id === item.id ? "bg-blue-700 text-white" : "bg-slate-50 text-slate-600 hover:bg-blue-50"}`}>{item.label}</Link>)}</div></div>
              <div className="rounded-lg border border-slate-200 p-3"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Step 3 • Subject</p><div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{subjectOptions.map((item) => <button key={item.id} type="button" onClick={() => setSubject({ id: item.id, title: item.label })} className={`flex items-center gap-2 rounded-md border px-3 py-2 text-left transition ${selectedSubject === item.id ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50"}`}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white text-sm shadow-sm">{item.icon}</span><span><span className="block text-xs font-semibold">{item.label}</span><span className="block text-[9px] opacity-70">{item.detail}</span></span></button>)}</div></div>
              <div className="rounded-lg bg-blue-700 p-4 text-white"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Ready to Study</p><p className="mt-1 text-sm font-bold">{currentClass.title} · {activeSubject.label}</p><Link href={activeSubject.href} className="mt-3 flex h-8 items-center justify-center rounded-md bg-white text-[11px] font-bold text-blue-700">Open Syllabus Chapters →</Link></div>
            </div>
          </section>

          <section className="mt-5 border-y border-slate-200 bg-[#fafaff] py-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="stitch-eyebrow">Chapter-wise Syllabus Directory</p><h2 className="stitch-heading text-2xl sm:text-3xl">Direct Chapter Navigation</h2><p className="stitch-body text-sm">Select any topic to jump directly into concept notes, practice MCQs, or solved PYQs.</p></div>
              <div className="flex rounded-lg border bg-white p-1 text-[11px]"><span className="rounded-md bg-teal-50 px-3 py-1.5 font-bold text-teal-700">CISCE (ICSE/ISC)</span><span className="px-3 py-1.5 text-slate-500">CBSE (IX-XII)</span></div>
            </div>
            <div className="mt-4 space-y-2">{chapters.map((chapter) => <Link key={chapter.no} href={chapter.href} className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-blue-300 sm:flex-row sm:items-center">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-xs font-bold text-blue-600">{chapter.no}</span>
              <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-slate-900">{chapter.title}</h3><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">{chapter.status}</span></div><p className="mt-1 text-xs text-slate-500">{chapter.detail}</p></div>
              <div className="flex shrink-0 gap-2 text-[10px] font-semibold text-slate-500"><span className="rounded-md bg-slate-50 px-2.5 py-2">Practice</span><span className="rounded-md bg-slate-50 px-2.5 py-2">PYQs</span></div>
            </Link>)}</div>
          </section>

          <section className="mt-0 bg-slate-100/80 px-0 py-8">
            <p className="stitch-eyebrow">Exam Essentials</p><h2 className="stitch-heading mt-1 text-2xl">Core Practice & Mastery Tools</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                ["bank","830+ Board Question Bank","Organized topic-by-topic matching CISCE and CBSE exam formats.","Browse Question Bank","/question-bank"],
                ["exam","Timed Board Mock Exams","Full-length exam simulators matching official board time allocations.","Start Mock Exam","/practice/setup"],
                ["ai","AI Derivations & Tutor","Step-by-step algorithm breakdown and debugging help whenever you hit an obstacle.","Ask AI Study Partner","/ai-tutor"],
              ].map(([icon,title,desc,cta,href]) => <Link key={title} href={href} className="stitch-card stitch-card-hover p-4"><MiniIcon type={icon === "bank" ? "bank" : icon === "exam" ? "exam" : "ai"} /><h3 className="stitch-heading mt-3 text-base">{title}</h3><p className="stitch-body mt-1.5 text-xs leading-5">{desc}</p><span className="mt-3 block rounded-md bg-slate-100 px-3 py-2 text-[11px] font-semibold text-slate-700">{cta}<span className="float-right">→</span></span></Link>)}
            </div>
          </section>

          <section className="mt-7 rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div><p className="stitch-eyebrow">Question Trace #04</p><h2 className="stitch-heading mt-2 text-2xl">Deliberate practice with zero fluff</h2><p className="stitch-body mt-2 text-sm leading-6">Test your output prediction skills on authentic board patterns. Solve instantly and review the examiner’s step-by-step rubric.</p><div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-emerald-700"><span>✓ Output tracing</span><span>✓ Operator precedence</span><span>✓ Variable scope</span></div></div>
              <div className="rounded-xl bg-slate-950 p-4 text-white"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">2 Marks</p><pre className="mt-2 overflow-auto text-xs leading-5 text-slate-200"><code>{`int a = 5, b = 2;
int res = a + (b * 3);
System.out.println(res);`}</code></pre><div className="mt-3 grid grid-cols-2 gap-2 text-[11px]"><span className="rounded bg-white/10 px-3 py-2">A. 30</span><span className="rounded bg-white/10 px-3 py-2">B. 11</span><span className="rounded bg-white/10 px-3 py-2">C. 24</span><span className="rounded bg-white/10 px-3 py-2">D. 32</span></div></div>
            </div>
          </section>

          <section className="mx-auto mt-12 max-w-3xl text-center"><p className="stitch-eyebrow">Academic Clarifications</p><h2 className="stitch-heading mt-1 text-2xl">Frequently Asked Questions</h2><div className="mt-5 space-y-2 text-left">{[
            "How are the practice questions and mock tests aligned with ICSE & CBSE board papers?",
            "Can I switch between Class 10 (ICSE) and Class 12 (ISC / CBSE) freely?",
            "Are 10-year past papers (PYQs) fully solved with marking schemes?",
          ].map((q) => <details key={q} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"><summary className="cursor-pointer font-semibold text-slate-800">{q}</summary><p className="mt-2 text-xs leading-5 text-slate-500">Target95 keeps board, class and chapter pathways separate so practice can remain aligned with the selected curriculum.</p></details>)}</div></section>
        </div>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
