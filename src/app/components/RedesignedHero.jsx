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
  java: { title: "Java Programming", icon: "☕", description: "CISCE Java programming content, theory, practicals and questions." },
  ai: { title: "Artificial Intelligence", icon: "🤖", description: "CISCE Robotics & Artificial Intelligence learning content and practice." },
  "402": { title: "Information Technology (402)", icon: "💻", description: "CBSE Information Technology learning path." },
  "083": { title: "Computer Science (083)", icon: "🐍", description: "CBSE Computer Science with Python, theory, practicals and mocks." },
  "065": { title: "Informatics Practices (065)", icon: "📊", description: "CBSE Informatics Practices with Python, Pandas, Matplotlib and SQL." },
  "802": { title: "Information Technology (802)", icon: "🧑‍💻", description: "CBSE Information Technology skill-subject learning path." },
};

const getSubjectRoute = (board, classId, subjectId) => {
  if (board === "cisce") {
    if (subjectId === "ai") return "/isc/robotics-ai/class-x";
    return "/Java";
  }
  const classNumber = classId.replace("class-", "");
  return `/cbse/class/${classNumber}/subject/${subjectId}`;
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

  const selectedSubject = selectedCisceSubject || selectedCbseSubject;
  const classes = selectedBoard === "cisce" ? CISCE_CLASSES : CBSE_CLASSES;
  const subjectStep = Boolean(selectedBoard) && !selectedClass && !showSubjects;
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
    { id: "cisce", title: "CISCE", icon: "🎓", description: "ICSE & ISC: Java Programming and Robotics & AI." },
    { id: "cbse", title: "CBSE", icon: "🏫", description: "Classes IX–XII with the correct subject path for each curriculum." },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white pointer-events-none" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">🎯 Target95+</div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Learn Computer Science
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Smarter with AI</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-gray-600 sm:text-lg">Select the board, then the correct subject and class. Target95 will load only the matching content.</p>
        </div>

        {selectedBoard && <button type="button" onClick={back} className="mb-8 rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50">← Back</button>}

        {!selectedBoard && (
          <div className="grid gap-6 md:grid-cols-2">
            {boardCards.map((board) => (
              <button key={board.id} type="button" onClick={() => chooseBoard(board.id)} className="rounded-3xl border-2 border-blue-100 bg-white p-8 text-left shadow-lg transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                <div className="text-5xl">{board.icon}</div>
                <h2 className="mt-5 text-3xl font-bold text-gray-900">{board.title}</h2>
                <p className="mt-3 leading-7 text-gray-600">{board.description}</p>
                <span className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Select {board.title} →</span>
              </button>
            ))}
          </div>
        )}

        {selectedBoard && subjectStep && (
          <SubjectChooser
            title={selectedBoard === "cisce" ? "Choose Your CISCE Subject" : "Choose Your CBSE Subject"}
            subjects={(selectedBoard === "cisce" ? ["java", "ai"] : ["402", "083", "065", "802"]).map((id) => [id, SUBJECTS[id]])}
            onSelect={chooseSubject}
          />
        )}

        {selectedBoard && !selectedClass && selectedSubject && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">{selectedBoard.toUpperCase()}</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Choose Your Class</h2>
              <p className="mt-3 text-gray-600">{SUBJECTS[selectedSubject]?.title || selectedSubject}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {classList.map((item) => (
                <button key={item.id} type="button" onClick={() => chooseClass(item)} className="rounded-2xl border-2 border-gray-200 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{SUBJECTS[selectedSubject]?.title || selectedSubject}</p>
                  <span className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Open →</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedClass && (
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-blue-100 bg-white p-8 text-center shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">{personalization?.board || selectedBoard}</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">{selectedClass.title}</h2>
            <p className="mt-3 text-gray-600">{SUBJECTS[selectedClass.subjects?.[0]]?.title || selectedClass.subjects?.[0]}</p>
            <button type="button" onClick={handleStartLearning} className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700">Start Learning →</button>
          </div>
        )}

        {!selectedBoard && <div className="mt-10 text-center"><a href="/question-bank" className="font-semibold text-blue-700 hover:underline">Explore Question Bank</a></div>}
      </div>
    </section>
  );
}

function SubjectChooser({ title, subjects, onSelect }) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Board selected</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
        <p className="mt-3 text-gray-600">This choice controls which curriculum and question bank will be shown.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {subjects.map(([id, subject]) => (
          <button key={id} type="button" onClick={() => onSelect(id)} className="rounded-3xl border-2 border-blue-100 bg-white p-8 text-center shadow-lg transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
            <div className="text-6xl">{subject.icon}</div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900">{subject.title}</h3>
            <p className="mt-3 text-gray-600">{subject.description}</p>
            <span className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Continue →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
