"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import HomeResumeCard from "./components/HomeResumeCard";
import AceIntro from "./components/AceIntro";
import { usePersonalization } from "./hooks/usePersonalization";
import useProgress from "./hooks/useProgress";
import { useAuth } from "@/context/AuthContext";
import { curriculumClasses, getSubjectsForBoardClass } from "./lib/curriculumLauncher";

const boards = [
  { id: "cisce", label: "CISCE", detail: "(ICSE/ISC)" },
  { id: "cbse", label: "CBSE", detail: "(IX - XII)" },
];

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

const SUBJECT_CARDS = {
  "cisce": {
    "icse-class-9": [
      { id: "java", label: "Java", detail: "ICSE Class 9 Computer Applications", icon: "☕", href: "/Java?class=IX", bgColor: "#fff7ed", color: "#c2410c", chapters: 19, questions: 830 },
      { id: "ai", label: "Robotics & AI", detail: "ICSE Class 9 Robotics & AI", icon: "✦", href: "/icse/robotics-ai", bgColor: "#f3e8ff", color: "#7c3aed", chapters: 7, questions: 42 },
    ],
    "icse-class-10": [
      { id: "java", label: "Java", detail: "ICSE Class 10 Computer Applications", icon: "☕", href: "/Java", bgColor: "#fff7ed", color: "#c2410c", chapters: 19, questions: 830 },
      { id: "ai", label: "Artificial Intelligence", detail: "ICSE Class 10 AI", icon: "✦", href: "/icse/robotics-ai/class-x", bgColor: "#f3e8ff", color: "#7c3aed", chapters: 5, questions: 38 },
    ],
    "isc-class-11": [
      { id: "java", label: "Computer Science", detail: "ISC Class 11 Java", icon: "☕", href: "/isc/class-xi", bgColor: "#fff7ed", color: "#c2410c", chapters: 15, questions: 210 },
      { id: "ai", label: "Artificial Intelligence (883)", detail: "ISC Class 11 AI theory", icon: "✦", href: "/isc/artificial-intelligence/11", bgColor: "#f3e8ff", color: "#7c3aed", chapters: 6, questions: 22 },
    ],
    "isc-class-12": [
      { id: "java", label: "Computer Science", detail: "ISC Class 12 Java", icon: "☕", href: "/isc/class-xii", bgColor: "#fff7ed", color: "#c2410c", chapters: 13, questions: 180 },
      { id: "ai", label: "Artificial Intelligence (883)", detail: "ISC Class 12 AI theory", icon: "✦", href: "/isc/artificial-intelligence/12", bgColor: "#f3e8ff", color: "#7c3aed", chapters: 5, questions: 15 },
    ],
  },
  "cbse": {
    "class-9": [
      { id: "402", label: "Information Technology", detail: "CBSE Class 9 IT (402)", icon: "💻", href: "/cbse/class/9/subject/402", bgColor: "#fffbeb", color: "#d97706", chapters: 8, questions: 60 },
    ],
    "class-10": [
      { id: "402", label: "Information Technology", detail: "CBSE Class 10 IT (402)", icon: "💻", href: "/cbse/class/10/subject/402", bgColor: "#fffbeb", color: "#d97706", chapters: 8, questions: 60 },
    ],
    "class-11": [
      { id: "083", label: "Computer Science", detail: "CBSE Class 11 CS (083) with Python", icon: "🐍", href: "/cbse/class/11/subject/083", bgColor: "#ecfeff", color: "#0e7490", chapters: 3, questions: 90 },
      { id: "065", label: "Informatics Practices", detail: "CBSE Class 11 IP (065)", icon: "📊", href: "/cbse/class/11/subject/065", bgColor: "#fef3c7", color: "#b45309", chapters: 4, questions: 70 },
      { id: "802", label: "Information Technology", detail: "CBSE Class 11 IT (802)", icon: "🧑‍💻", href: "/cbse/class/11/subject/802", bgColor: "#fffbeb", color: "#d97706", chapters: 6, questions: 55 },
      { id: "843", label: "Artificial Intelligence", detail: "CBSE Class 11 AI (843)", icon: "🤖", href: "/cbse/class/11/subject/843", bgColor: "#f3e8ff", color: "#7c3aed", chapters: 4, questions: 28 },
    ],
    "class-12": [
      { id: "083", label: "Computer Science", detail: "CBSE Class 12 CS (083) with Python", icon: "🐍", href: "/cbse/class/12/subject/083", bgColor: "#ecfeff", color: "#0e7490", chapters: 3, questions: 90 },
      { id: "065", label: "Informatics Practices", detail: "CBSE Class 12 IP (065)", icon: "📊", href: "/cbse/class/12/subject/065", bgColor: "#fef3c7", color: "#b45309", chapters: 4, questions: 70 },
      { id: "802", label: "Information Technology", detail: "CBSE Class 12 IT (802)", icon: "🧑‍💻", href: "/cbse/class/12/subject/802", bgColor: "#fffbeb", color: "#d97706", chapters: 6, questions: 55 },
      { id: "843", label: "Artificial Intelligence", detail: "CBSE Class 12 AI (843)", icon: "🤖", href: "/cbse/class/12/subject/843", bgColor: "#f3e8ff", color: "#7c3aed", chapters: 4, questions: 28 },
    ],
  },
};

function subjectCards(board, classId) {
  const cards = SUBJECT_CARDS[board]?.[classId];
  if (!cards) {
    // No context selected — show a prompt to choose board/class first
    return [
      {
        id: "pick",
        label: "Choose your board and class",
        detail: "Select a board and class above to see your subjects",
        icon: "🎯",
        href: "#",
        bgColor: "#f1f5f9",
        color: "#475569",
        chapters: 0,
        questions: 0,
        isPrompt: true,
      },
    ];
  }
  return cards.map((card) => ({
    ...card,
    isPrompt: false,
  }));
}

export default function StitchHomeHub() {
  const { board, class: selectedClass, subject, setBoard, setClass, setSubject, isHydrated } = usePersonalization();
  const { user, loading: authLoading } = useAuth();
  const { firestoreProgress, loading: progressLoading } = useProgress(user?.uid || null);
  const showResumePractice = Boolean(user && !authLoading && !progressLoading && firestoreProgress.length > 0);
  const activeBoard = board || "cisce";
  const selected = selectedClass?.id || "icse-class-10";
  const currentClass = curriculumClasses[activeBoard].find((item) => item.id === selected) || curriculumClasses[activeBoard][0];
  const subjectOptions = getSubjectsForBoardClass(activeBoard, currentClass.id);
  const selectedSubject = subject && subjectOptions.some((item) => item.id === subject) ? subject : subjectOptions[0]?.id;
  const activeSubject = subjectOptions.find((item) => item.id === selectedSubject) || subjectOptions[0];

  const chooseBoard = (id) => {
    setBoard(id);
    setClass(null);
    setSubject(null);
  };

  const chooseClass = (classOption) => {
    setClass({ id: classOption.id, title: classOption.title });
    setSubject(null);
  };

  return (
    <main id="main-content" className="stitch-home-hub min-h-screen bg-[#f8f8fc] text-slate-900">
      <Navbar />
      <ErrorBoundary>
        <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-5 sm:px-6 lg:px-8">
          {showResumePractice && (
            <section className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 sm:p-5" aria-label="Continue learning">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-700 text-white">▶</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="rounded-full bg-white px-2.5 py-1 text-teal-700">CONTINUE LEARNING</span>
                      <span className="text-slate-400">•</span><span className="text-slate-700">Saved student progress</span>
                    </div>
                    <h1 className="mt-1 text-base font-bold sm:text-lg">Continue where you left off</h1>
                    <p className="text-xs text-slate-500">Your saved learning progress is ready to continue.</p>
                  </div>
                </div>
                <Link href="/Java" className="stitch-btn stitch-btn-primary shrink-0">Resume Learning →</Link>
              </div>
            </section>
          )}

          <section className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div><p className="stitch-eyebrow">Direct Study Launcher</p><h2 className="stitch-heading mt-1 text-xl">Select Your Curriculum Pathway</h2></div>
              <span className="hidden text-xs text-slate-400 md:block">Jump straight into verified board syllabus & practice</span>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-[1.05fr_1fr_1.15fr_.95fr]">
              <div className="rounded-lg border border-slate-200 p-3"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Step 1 • Board</p><div className="mt-2 grid grid-cols-2 gap-2">{boards.map((item) => <button key={item.id} type="button" onClick={() => chooseBoard(item.id)} aria-pressed={activeBoard === item.id} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${activeBoard === item.id ? "border-teal-200 bg-teal-50 text-teal-700" : "border-slate-200 text-slate-600"}`}>{item.label}<span className="block text-[10px] font-normal opacity-70">{item.detail}</span></button>)}</div></div>
              <div className="rounded-lg border border-slate-200 p-3"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Step 2 • Class</p><div className="mt-2 grid grid-cols-4 gap-1.5">{curriculumClasses[activeBoard].map((item) => <button key={item.id} type="button" onClick={() => chooseClass(item)} aria-pressed={currentClass.id === item.id} className={`flex h-9 items-center justify-center rounded-md text-xs font-bold ${currentClass.id === item.id ? "bg-blue-700 text-white" : "bg-slate-50 text-slate-600 hover:bg-blue-50"}`}>{item.label}</button>)}</div></div>
              <div className="rounded-lg border border-slate-200 p-3"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Step 3 • Subject</p><div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{subjectOptions.map((item) => <button key={item.id} type="button" onClick={() => setSubject(item.id)} aria-pressed={selectedSubject === item.id} className={`flex items-center gap-2 rounded-md border px-3 py-2 text-left transition ${selectedSubject === item.id ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50"}`}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white text-sm shadow-sm">{item.icon}</span><span><span className="block text-xs font-semibold">{item.label}</span><span className="block text-[9px] opacity-70">{item.detail}</span></span></button>)}</div></div>
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

          <AceIntro />

          <section className="mt-7 border-y border-slate-200 bg-[#fafaff] py-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="stitch-eyebrow">Explore All Subjects</p><h2 className="stitch-heading text-2xl sm:text-3xl">Every board, every subject, one place</h2><p className="stitch-body text-sm">Pick your board and class to see the subjects available for your curriculum.</p></div>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
              {subjectCards(activeBoard, currentClass.id).map((card) => (
                <Link key={card.href} href={card.href} className="stitch-card stitch-card-hover p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg shadow-sm" style={{ background: card.bgColor, color: card.color }}>
                      {card.icon}
                    </span>
                    <div>
                      <h3 className="stitch-heading mt-0.5 text-base">{card.label}</h3>
                      <p className="stitch-body mt-1 text-xs">{card.detail}</p>
                      <p className="mt-2 text-[11px] font-semibold text-blue-700">{card.chapters} chapters · {card.questions} questions</p>
                    </div>
                  </div>
                  <span className="mt-4 block text-[11px] font-semibold text-blue-700">Open {card.label}<span aria-hidden="true"> →</span></span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-7 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="office-learning-title">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="stitch-eyebrow">Practical digital skills</p>
                <h2 id="office-learning-title" className="stitch-heading mt-1 text-2xl">Build confidence with Microsoft Office</h2>
                <p className="stitch-body mt-2 max-w-2xl text-sm leading-6">Supplement your board learning with guided Word, Excel and PowerPoint lessons, practical checklists and knowledge checks.</p>
              </div>
              <Link href="/office" className="stitch-btn stitch-btn-primary shrink-0">Explore Office lessons <span aria-hidden="true">→</span></Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Word", "Create, format and refine professional documents.", "/office/word", "W", "bg-blue-50 text-blue-700"],
                ["Excel", "Work confidently with data, formulas, tables and charts.", "/office/excel", "X", "bg-emerald-50 text-emerald-700"],
                ["PowerPoint", "Design clear presentations with purposeful visuals.", "/office/powerpoint", "P", "bg-orange-50 text-orange-700"],
              ].map(([title, description, href, icon, color]) => <Link key={title} href={href} className="stitch-card stitch-card-hover group p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                <span aria-hidden="true" className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-black ${color}`}>{icon}</span>
                <h3 className="stitch-heading mt-3 text-base">{title}</h3>
                <p className="stitch-body mt-1.5 text-xs leading-5">{description}</p>
                <span className="mt-3 block text-[11px] font-semibold text-blue-700">View {title} lessons <span aria-hidden="true">→</span></span>
              </Link>)}
            </div>
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
