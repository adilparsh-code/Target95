"use client";

import React, { useEffect, useMemo, useState } from "react";

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
  java: { title: "Java Programming", icon: "☕", description: "CISCE Java theory, practicals and exam-focused questions." },
  ai: { title: "Artificial Intelligence", icon: "🤖", description: "Robotics & AI learning content and targeted practice." },
  "402": { title: "Information Technology (402)", icon: "💻", description: "CBSE Information Technology learning path." },
  "083": { title: "Computer Science (083)", icon: "🐍", description: "CBSE Computer Science with Python, practicals and mocks." },
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

export default function RedesignedHero({
  onBoardSelect,
  onBackToBoards,
  onBackToClasses,
  onClassSelect,
  showSubjects,
  showClasses,
  selectedBoard,
  selectedClass,
  onStartLearning,
  personalization,
}) {
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
  const classList = useMemo(
    () => (selectedSubject ? classes.filter((item) => item.subjects.includes(selectedSubject)) : classes),
    [classes, selectedSubject]
  );

  const chooseBoard = (board) => {
    setSelectedCisceSubject(null);
    setSelectedCbseSubject(null);
    onBoardSelect?.(board);
  };

  const chooseSubject = (subject) => {
    if (selectedBoard === "cisce") setSelectedCisceSubject(subject);
    else setSelectedCbseSubject(subject);
  };

  const chooseClass = (item) => {
    onClassSelect?.({ ...item, subjects: selectedSubject ? [selectedSubject] : item.subjects });
  };

  const handleStartLearning = () => {
    const board = selectedBoard || personalization?.board;
    const classId = selectedClass?.id || personalization?.class?.id;
    const subjectId = selectedSubject || selectedClass?.subjects?.[0] || personalization?.subject;
    if (board && classId && subjectId) {
      window.location.assign(getSubjectRoute(board, classId, subjectId));
      return;
    }
    onStartLearning?.();
  };

  const back = () => {
    if (selectedSubject) {
      setSelectedCisceSubject(null);
      setSelectedCbseSubject(null);
      return;
    }
    if (selectedClass || showSubjects) {
      onBackToClasses?.();
      return;
    }
    onBackToBoards?.();
  };

  const boardCards = [
    { id: "cisce", title: "CISCE", subtitle: "ICSE & ISC", icon: "🎓", description: "Java Programming, Robotics & AI with board-focused practice." },
    { id: "cbse", title: "CBSE", subtitle: "Classes IX–XII", icon: "🏫", description: "The correct Python, IT and Informatics Practices paths for your class." },
  ];

  const chooserSubjects = selectedBoard === "cisce" ? ["java", "ai"] : ["402", "083", "065", "802"];

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 px-4 pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.16),transparent_42%),linear-gradient(to_bottom,#f8fafc,#ffffff)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
            AI-powered exam preparation
          </div>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            Prepare smarter.
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Score with confidence.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Board-aligned Computer Science learning, practice and mock tests in one focused study platform.
          </p>
        </div>

        {selectedBoard && (
          <button type="button" onClick={back} className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span aria-hidden="true">←</span> Back
          </button>
        )}

        {!selectedBoard && (
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {boardCards.map((board) => (
              <button key={board.id} type="button" onClick={() => chooseBoard(board.id)} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 text-left shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_55px_rgba(37,99,235,0.16)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-4 sm:p-9">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl transition duration-300 group-hover:bg-blue-500/10" />
                <div className="relative flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-3xl shadow-lg">{board.icon}</div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{board.subtitle}</span>
                </div>
                <h2 className="relative mt-7 text-3xl font-extrabold tracking-tight text-slate-950">{board.title}</h2>
                <p className="relative mt-3 max-w-md leading-7 text-slate-600">{board.description}</p>
                <span className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition group-hover:bg-blue-600">Explore {board.title} <span aria-hidden="true">→</span></span>
              </button>
            ))}
          </div>
        )}

        {selectedBoard && subjectStep && (
          <SubjectChooser title={`Choose Your ${selectedBoard === "cisce" ? "CISCE" : "CBSE"} Subject`} subjects={chooserSubjects.map((id) => [id, SUBJECTS[id]])} onSelect={chooseSubject} />
        )}

        {selectedBoard && !selectedClass && selectedSubject && (
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{selectedBoard.toUpperCase()} · {SUBJECTS[selectedSubject]?.title}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Choose your class</h2>
              <p className="mt-3 text-slate-600">We will take you directly to the matching learning path.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {classList.map((item) => (
                <button key={item.id} type="button" onClick={() => chooseClass(item)} className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{SUBJECTS[selectedSubject]?.title}</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedClass && (
          <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-blue-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(37,99,235,0.12)] sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">{SUBJECTS[selectedClass.subjects?.[0]]?.icon || "🎯"}</div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{personalization?.board || selectedBoard}</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{selectedClass.title}</h2>
            <p className="mt-2 text-slate-600">{SUBJECTS[selectedClass.subjects?.[0]]?.title || selectedClass.subjects?.[0]}</p>
            <button type="button" onClick={handleStartLearning} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Start Learning <span aria-hidden="true">→</span></button>
          </div>
        )}

        {!selectedBoard && (
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>✓ Board-aligned content</span>
            <span>✓ Practice + mocks</span>
            <span>✓ Progress tracking</span>
            <a href="/question-bank" className="font-bold text-blue-700 hover:underline">Explore Question Bank →</a>
          </div>
        )}
      </div>
    </section>
  );
}

function SubjectChooser({ title, subjects, onSelect }) {
  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Board selected</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
        <p className="mt-3 text-slate-600">Pick your subject to load the right curriculum.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map(([id, subject]) => (
          <button key={id} type="button" onClick={() => onSelect(id)} className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-2xl">{subject.icon}</div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover:bg-blue-600 group-hover:text-white">→</span>
            </div>
            <h3 className="mt-6 text-xl font-extrabold text-slate-950">{subject.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{subject.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
