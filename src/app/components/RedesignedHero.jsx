"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Brain, Check, Code2, GraduationCap } from "lucide-react";

const CISCE_CLASSES = [
  { id: "icse-class-9", title: "ICSE Class 9", subjects: ["java", "ai"] },
  { id: "icse-class-10", title: "ICSE Class 10", subjects: ["java", "ai"] },
  { id: "isc-class-11", title: "ISC Class 11", subjects: ["java", "ai"] },
  { id: "isc-class-12", title: "ISC Class 12", subjects: ["java", "ai"] },
];

const CBSE_CLASSES = [
  { id: "class-9", title: "CBSE Class 9", subjects: ["402"] },
  { id: "class-10", title: "CBSE Class 10", subjects: ["402"] },
  { id: "class-11", title: "CBSE Class 11", subjects: ["083", "065", "802"] },
  { id: "class-12", title: "CBSE Class 12", subjects: ["083", "065", "802"] },
];

const SUBJECTS = {
  java: { title: "Java Programming", icon: "☕", description: "CISCE programming, theory, practicals and exam practice." },
  ai: { title: "Artificial Intelligence", icon: "🤖", description: "CISCE Robotics & AI learning content and practice." },
  "402": { title: "Information Technology (402)", icon: "💻", description: "CBSE Information Technology learning path." },
  "083": { title: "Computer Science (083)", icon: "🐍", description: "CBSE Computer Science with Python, theory and mocks." },
  "065": { title: "Informatics Practices (065)", icon: "📊", description: "Python, Pandas, Matplotlib and SQL practice." },
  "802": { title: "Information Technology (802)", icon: "🧑‍💻", description: "CBSE Information Technology skill-subject path." },
};

const getSubjectRoute = (board, classId, subjectId) => {
  if (board === "cisce") {
    if (subjectId === "ai") return "/isc/robotics-ai/class-x";
    return classId === "isc-class-11" ? "/isc/class-xi" : classId === "isc-class-12" ? "/isc/class-xii" : "/Java";
  }
  return `/cbse/class/${classId.replace("class-", "")}/subject/${subjectId}`;
};

export default function RedesignedHero({ onBoardSelect, onBackToBoards, onBackToClasses, onClassSelect, showSubjects, selectedBoard, selectedClass, onStartLearning, personalization }) {
  const [selectedCisceSubject, setSelectedCisceSubject] = useState(null);
  const [selectedCbseSubject, setSelectedCbseSubject] = useState(null);

  useEffect(() => {
    if (selectedBoard !== "cisce") setSelectedCisceSubject(null);
    if (selectedBoard !== "cbse") setSelectedCbseSubject(null);
  }, [selectedBoard]);

  useEffect(() => {
    if (selectedClass?.subjects?.length === 1) {
      const onlySubject = selectedClass.subjects[0];
      if (selectedBoard === "cisce") setSelectedCisceSubject(onlySubject);
      if (selectedBoard === "cbse") setSelectedCbseSubject(onlySubject);
    }
  }, [selectedBoard, selectedClass]);

  const selectedSubject = selectedCisceSubject || selectedCbseSubject;
  const classes = selectedBoard === "cisce" ? CISCE_CLASSES : CBSE_CLASSES;
  const subjectStep = Boolean(selectedBoard) && !selectedClass && !selectedSubject && !showSubjects;
  const classList = useMemo(() => (selectedSubject ? classes.filter((item) => item.subjects.includes(selectedSubject)) : classes), [classes, selectedSubject]);

  const chooseBoard = (board) => { setSelectedCisceSubject(null); setSelectedCbseSubject(null); onBoardSelect?.(board); };
  const chooseSubject = (subject) => selectedBoard === "cisce" ? setSelectedCisceSubject(subject) : setSelectedCbseSubject(subject);
  const chooseClass = (item) => onClassSelect?.({ ...item, subjects: selectedSubject ? [selectedSubject] : item.subjects });

  const handleStartLearning = () => {
    const board = selectedBoard || personalization?.board;
    const classId = selectedClass?.id || personalization?.class?.id;
    const subjectId = selectedSubject || selectedClass?.subjects?.[0] || personalization?.subject;
    if (board && classId && subjectId) { window.location.assign(getSubjectRoute(board, classId, subjectId)); return; }
    onStartLearning?.();
  };

  const back = () => {
    if (selectedSubject) { setSelectedCisceSubject(null); setSelectedCbseSubject(null); return; }
    if (selectedClass || showSubjects) { onBackToClasses?.(); return; }
    onBackToBoards?.();
  };

  const boardCards = [
    { id: "cisce", title: "CISCE", subtitle: "ICSE & ISC", icon: GraduationCap, description: "Java Programming, Robotics & AI with board-focused practice." },
    { id: "cbse", title: "CBSE", subtitle: "Classes IX–XII", icon: BookOpen, description: "The correct Python, IT and Informatics Practices paths for your class." },
  ];
  const chooserSubjects = selectedBoard === "cisce" ? ["java", "ai"] : ["402", "083", "065", "802"];

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 px-4 pb-16 pt-12 text-white sm:pb-20 sm:pt-16 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_5%,rgba(37,99,235,0.3),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.2),transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_80%,#f8fafc_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200"><span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,.9)]" /> AI-powered exam preparation</div>
          <h1 className="text-4xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">Prepare smarter.<span className="block bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-200 bg-clip-text text-transparent">Score with confidence.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Board-aligned Computer Science learning, practice and mock tests in one focused study platform.</p>
        </div>

        {selectedBoard && <button type="button" onClick={back} className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">← Back</button>}

        {!selectedBoard && (
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Choose your board</p><h2 className="mt-2 text-xl font-bold sm:text-2xl">Start with the curriculum you follow.</h2></div><a href="/question-bank" className="hidden items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white sm:inline-flex">Question Bank <ArrowRight className="h-4 w-4" /></a></div>
            <div className="grid gap-5 md:grid-cols-2">
              {boardCards.map((board) => { const Icon = board.icon; return <button key={board.id} type="button" onClick={() => chooseBoard(board.id)} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 text-left shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-blue-400 sm:p-9"><div className="absolute right-0 top-0 h-40 w-40 translate-x-1/4 -translate-y-1/4 rounded-full bg-blue-400/10 blur-3xl transition group-hover:bg-blue-400/20" /><div className="relative flex items-start justify-between gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10"><Icon className="h-7 w-7 text-blue-200" /></div><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-slate-300">{board.subtitle}</span></div><h2 className="relative mt-7 text-3xl font-black">{board.title}</h2><p className="relative mt-3 max-w-md leading-7 text-slate-300">{board.description}</p><span className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition group-hover:bg-blue-400">Explore {board.title} <ArrowRight className="h-4 w-4" /></span></button>; })}
            </div>
            <a href="/question-bank" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white sm:hidden">Explore Question Bank <ArrowRight className="h-4 w-4" /></a>
          </div>
        )}

        {selectedBoard && subjectStep && <SubjectChooser title={`Choose Your ${selectedBoard === "cisce" ? "CISCE" : "CBSE"} Subject`} subjects={chooserSubjects.map((id) => [id, SUBJECTS[id]])} onSelect={chooseSubject} />}

        {selectedBoard && !selectedClass && selectedSubject && (
          <div className="mx-auto mt-12 max-w-5xl"><div className="mb-8 text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">{selectedBoard.toUpperCase()} · {SUBJECTS[selectedSubject]?.title}</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Choose your class</h2><p className="mt-3 text-slate-300">We will take you directly to the matching learning path.</p></div><div className="grid gap-4 sm:grid-cols-2">{classList.map((item) => <button key={item.id} type="button" onClick={() => chooseClass(item)} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-blue-400"><div><h3 className="text-xl font-extrabold">{item.title}</h3><p className="mt-1 text-sm text-slate-400">{SUBJECTS[selectedSubject]?.title}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-blue-200 transition group-hover:bg-blue-500 group-hover:text-white"><ArrowRight className="h-4 w-4" /></span></button>)}</div></div>
        )}

        {selectedClass && <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-blue-100 bg-white p-8 text-center text-slate-950 shadow-2xl sm:p-10"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">{SUBJECTS[selectedClass.subjects?.[0]]?.icon || "🎯"}</div><p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Ready to learn</p><h2 className="mt-2 text-3xl font-black">{selectedClass.title}</h2><p className="mt-2 text-slate-500">{SUBJECTS[selectedClass.subjects?.[0]]?.title || selectedClass.subjects?.[0]}</p><button type="button" onClick={handleStartLearning} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Start Learning <ArrowRight className="h-4 w-4" /></button></div>}

        {!selectedBoard && <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400"><span>✓ Board-aligned content</span><span>✓ Practice + mocks</span><span>✓ Progress tracking</span></div>}
      </div>
    </section>
  );
}

function SubjectChooser({ title, subjects, onSelect }) {
  return <div className="mx-auto mt-12 max-w-5xl"><div className="mb-8 text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Board selected</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2><p className="mt-3 text-slate-300">Pick your subject to load the right curriculum.</p></div><div className="grid gap-4 sm:grid-cols-2">{subjects.map(([id, subject]) => <button key={id} type="button" onClick={() => onSelect(id)} className="group rounded-3xl border border-white/10 bg-white/[0.07] p-7 text-left backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-blue-400"><div className="flex items-start justify-between gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">{subject.icon}</div><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition group-hover:bg-blue-600 group-hover:text-white"><ArrowRight className="h-4 w-4" /></span></div><h3 className="mt-6 text-xl font-extrabold">{subject.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{subject.description}</p></button>)}</div></div>;
}
