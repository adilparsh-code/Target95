"use client";

import Link from "next/link";
import { useMemo } from "react";
import subjectsData from "../data/subjects";

const boardClassSubjectMap = {
  cisce: {
    title: "CISCE",
    description: "ICSE Classes 9–10 and ISC Classes 11–12 Computer Science.",
    accent: "from-blue-600 to-indigo-600",
    classes: [
      { id: "icse-class-9", title: "ICSE Class 9", subjects: ["java"] },
      { id: "icse-class-10", title: "ICSE Class 10", subjects: ["java"] },
      { id: "isc-class-11", title: "ISC Class 11", subjects: ["java"] },
      { id: "isc-class-12", title: "ISC Class 12", subjects: ["java"] },
    ],
  },
  cbse: {
    title: "CBSE",
    description: "CBSE Computer Science with Python for Classes 9–12.",
    accent: "from-emerald-600 to-teal-600",
    classes: [
      { id: "cbse-class-9", title: "Class 9", subjects: ["python"] },
      { id: "cbse-class-10", title: "Class 10", subjects: ["python"] },
      { id: "cbse-class-11", title: "Class 11", subjects: ["python"] },
      { id: "cbse-class-12", title: "Class 12", subjects: ["python"] },
    ],
  },
};

export default function RedesignedHero({
  onBoardSelect,
  onBackToBoards,
  onClassSelect,
  onBackToClasses,
  showSubjects,
  showClasses,
  selectedBoard,
  selectedClass,
  showStartLearning,
  onStartLearning,
  personalization,
}) {
  const board = selectedBoard ? boardClassSubjectMap[selectedBoard] : null;
  const availableClasses = board?.classes || [];
  const availableSubjects = useMemo(() => {
    if (!selectedClass?.subjects) return [];
    return subjectsData.filter(
      (subject) => selectedClass.subjects.includes(subject.id) && !subject.comingSoon
    );
  }, [selectedClass]);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(20,184,166,0.10),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-24">
        {!showClasses && !showSubjects && !personalization?.board && (
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                🎯 Target95+ · Board-focused Computer Science
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                Learn smarter.
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Practice better.
                </span>
                <span className="block">Score higher.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                A focused Computer Science learning platform with chapter-wise learning, board-aligned practice, mock tests and AI-assisted study.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#boards"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-6 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-slate-950"
                >
                  Choose Your Board →
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800" href="/mock-test">
                  Try a Mock Test
                </Link>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
                {["Board-focused", "Chapter-wise", "AI-assisted"].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-white/80 p-3 text-center font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div id="boards" className="scroll-mt-24">
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Start here
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl dark:text-white">
                  Choose your board
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {Object.entries(boardClassSubjectMap).map(([id, item]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onBoardSelect?.(id)}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-2xl text-white shadow-md`}
                    >
                      {id === "cisce" ? "🎓" : "🏫"}
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                    <span className="mt-6 inline-flex items-center font-bold text-blue-600 dark:text-blue-400">
                      Select Board{" "}
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {(showClasses || showSubjects) && (
          <div className="mx-auto max-w-5xl">
            <button
              type="button"
              onClick={showClasses ? onBackToBoards : onBackToClasses}
              className="mb-8 inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              ← Back to {showClasses ? "boards" : "classes"}
            </button>

            {showClasses && (
              <div>
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    {board?.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl dark:text-white">
                    Choose your class
                  </h2>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">
                    Pick your class to continue into the relevant Computer Science subject.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {availableClasses.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onClassSelect?.(item)}
                      className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                        {board?.title}
                      </span>
                      <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                        {item.title}
                      </h3>
                      <span className="mt-4 inline-flex font-semibold text-blue-600 dark:text-blue-400">
                        Continue →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showSubjects && (
              <div>
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    {selectedClass?.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl dark:text-white">
                    Choose your subject
                  </h2>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">
                    Start with the subject mapped to your selected curriculum.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {availableSubjects.map((subject) => (
                    <Link className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900" href="{subject.href}" key="{subject.id}">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl dark:bg-slate-800">
                        {subject.icon}
                      </div>
                      <h3 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
                        {subject.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {subject.description}
                      </p>
                      <span className="mt-5 inline-flex font-bold text-blue-600 dark:text-blue-400">
                        Open subject{" "}
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                {showStartLearning && personalization?.subject && (
                  <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/40">
                    <h3 className="text-xl font-black text-slate-950 dark:text-white">
                      Continue your current path
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Your saved learning path is ready.
                    </p>
                    <button
                      type="button"
                      onClick={onStartLearning}
                      className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
                    >
                      Continue Learning →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!showClasses &&
          !showSubjects &&
          personalization?.board &&
          personalization?.class &&
          personalization?.subject && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-900 dark:bg-blue-950/40">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                Welcome back
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                Continue where you left off
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                {personalization.board.toUpperCase()} · {personalization.class.title}
              </p>
              <button
                type="button"
                onClick={onStartLearning}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
              >
                Continue Learning →
              </button>
            </div>
          )}

        {!showClasses && !showSubjects && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white" href="/question-bank">
              Explore Question Bank
            </Link>
            <Link className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white" href="/ai-tutor">
              Ask AI Tutor
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
