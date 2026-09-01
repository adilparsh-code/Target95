"use client";

import React, { useEffect, useMemo, useState } from "react";

const CISCE_CLASSES = [
  { id: "icse-class-9", title: "ICSE Class 9", subjects: ["java"] },
  { id: "icse-class-10", title: "ICSE Class 10", subjects: ["java"] },
  { id: "isc-class-11", title: "ISC Class 11", subjects: ["java"] },
  { id: "isc-class-12", title: "ISC Class 12", subjects: ["java"] },
];

const CBSE_CLASSES = [
  { id: "class-9", title: "CBSE Class 9", subjects: ["python"] },
  { id: "class-10", title: "CBSE Class 10", subjects: ["python"] },
  { id: "class-11", title: "CBSE Class 11", subjects: ["python"] },
  { id: "class-12", title: "CBSE Class 12", subjects: ["python"] },
];

const SUBJECTS = {
  java: {
    title: "Java Programming",
    icon: "☕",
    description: "CISCE Java programming content, theory, practicals and questions.",
  },
  ai: {
    title: "Artificial Intelligence",
    icon: "🤖",
    description: "CISCE Robotics & Artificial Intelligence learning content and practice.",
  },
  python: {
    title: "Python Programming",
    icon: "🐍",
    description: "CBSE Python programming content, practicals, questions and mocks.",
  },
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
  showStartLearning,
  onStartLearning,
  personalization,
}) {
  const [cisceSubject, setCisceSubject] = useState(null);

  useEffect(() => {
    if (selectedBoard !== "cisce") setCisceSubject(null);
  }, [selectedBoard]);

  const classes = selectedBoard === "cisce" ? CISCE_CLASSES : CBSE_CLASSES;
  const isCisceSubjectStep = selectedBoard === "cisce" && !selectedClass && !cisceSubject;
  const visibleClasses = useMemo(
    () => (cisceSubject ? classes.filter((item) => item.subjects.includes(cisceSubject)) : classes),
    [cisceSubject, classes]
  );

  const chooseBoard = (board) => {
    setCisceSubject(null);
    onBoardSelect?.(board);
  };

  const chooseCisceSubject = (subject) => {
    if (subject === "ai") {
      window.location.assign("/isc/robotics-ai/class-x");
      return;
    }
    setCisceSubject(subject);
  };

  const chooseClass = (item) => {
    onClassSelect?.({
      ...item,
      subjects: cisceSubject ? [cisceSubject] : item.subjects,
    });
  };

  const back = () => {
    if (cisceSubject) {
      setCisceSubject(null);
      return;
    }
    if (showSubjects) {
      onBackToClasses?.();
      return;
    }
    if (showClasses || selectedBoard) {
      onBackToBoards?.();
      return;
    }
    onBackToBoards?.();
  };

  const boardCards = [
    {
      id: "cisce",
      title: "CISCE",
      icon: "🎓",
      description: "ICSE & ISC Computer Science, Java Programming and Robotics & AI.",
    },
    {
      id: "cbse",
      title: "CBSE",
      icon: "🏫",
      description: "CBSE Computer Science and Informatics Practices learning paths.",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white pointer-events-none" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            🎯 Target95+
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Learn Computer Science
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smarter with AI
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-gray-600 sm:text-lg">
            Select the board first. The platform then shows only the relevant learning path.
          </p>
        </div>

        {(selectedBoard || showClasses || showSubjects) && (
          <button
            type="button"
            onClick={back}
            className="mb-8 rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            ← Back
          </button>
        )}

        {!selectedBoard && (
          <div className="grid gap-6 md:grid-cols-2">
            {boardCards.map((board) => (
              <button
                key={board.id}
                type="button"
                onClick={() => chooseBoard(board.id)}
                className="rounded-3xl border-2 border-blue-100 bg-white p-8 text-left shadow-lg transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              >
                <div className="text-5xl">{board.icon}</div>
                <h2 className="mt-5 text-3xl font-bold text-gray-900">{board.title}</h2>
                <p className="mt-3 leading-7 text-gray-600">{board.description}</p>
                <span className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
                  Select {board.title} →
                </span>
              </button>
            ))}
          </div>
        )}

        {selectedBoard === "cisce" && isCisceSubjectStep && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">CISCE selected</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                What do you want to study?
              </h2>
              <p className="mt-3 text-gray-600">
                Choose the subject first so the correct CISCE content is loaded.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {["java", "ai"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => chooseCisceSubject(id)}
                  className="rounded-3xl border-2 border-blue-100 bg-white p-8 text-center shadow-lg transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                >
                  <div className="text-6xl">{SUBJECTS[id].icon}</div>
                  <h3 className="mt-5 text-2xl font-bold text-gray-900">{SUBJECTS[id].title}</h3>
                  <p className="mt-3 text-gray-600">{SUBJECTS[id].description}</p>
                  <span className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
                    Continue →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedBoard && !isCisceSubjectStep && !selectedClass && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                {selectedBoard.toUpperCase()}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Choose Your Class</h2>
              <p className="mt-3 text-gray-600">
                {cisceSubject === "java" ? "Java Programming" : "Select the class to load its exact curriculum."}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {visibleClasses.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseClass(item)}
                  className="rounded-2xl border-2 border-gray-200 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600">
                    {cisceSubject === "java" ? "Java Programming" : "Python Programming"}
                  </p>
                  <span className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">
                    Open →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedClass && (
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-blue-100 bg-white p-8 text-center shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              {personalization?.board || selectedBoard}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">{selectedClass.title}</h2>
            <p className="mt-3 text-gray-600">
              {selectedClass.subjects?.includes("java")
                ? SUBJECTS.java.title
                : SUBJECTS.python.title}
            </p>
            <button
              type="button"
              onClick={onStartLearning}
              className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Learning →
            </button>
          </div>
        )}

        {!selectedBoard && (
          <div className="mt-10 text-center">
            <a href="/question-bank" className="font-semibold text-blue-700 hover:underline">
              Explore Question Bank
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
