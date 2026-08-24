"use client";

import React, { memo } from "react";
import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";
import subjectsData from "../data/subjects";
import { boardClassSubjectMap } from "../ClientHome";

const boards = [
  {
    id: "cisce",
    title: "CISCE",
    subtitle: "Council for the Indian School Certificate Examinations",
    description: "Comprehensive study materials, previous year questions, AI-powered learning, and mock tests for ICSE (Classes 9–10) and ISC (Classes 11–12) Computer Science.",
    icon: "🎓",
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "cbse",
    title: "CBSE",
    subtitle: "Central Board of Secondary Education",
    description: "Comprehensive study materials, practice questions, and AI-powered learning for CBSE Computer Science (Python) for Classes 11–12.",
    icon: "🏫",
    color: "from-green-600 to-teal-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
];

export default function Hero({
  onBoardSelect,
  onBackToBoards,
  onClassSelect,
  onBackToClasses,
  onSubjectSelect,
  showSubjects,
  showClasses,
  selectedBoard,
  selectedClass,
  showStartLearning,
  onStartLearning,
  personalization,
}) {
  const availableClasses = selectedBoard && boardClassSubjectMap[selectedBoard.toLowerCase()]
    ? boardClassSubjectMap[selectedBoard.toLowerCase()].classes
    : [];

  const availableSubjects = selectedClass && selectedClass.subjects
    ? subjectsData.filter((subject) => selectedClass.subjects.includes(subject.id) && !subject.comingSoon)
    : [];

  const subjects = availableSubjects.map((subject) => ({
    id: subject.id,
    title: subject.title,
    subtitle: subject.title,
    description: subject.description,
    icon: subject.icon,
    color: subject.color,
    bgColor: subject.bgColor,
    borderColor: subject.borderColor,
    href: subject.href,
    totalChapters: subject.totalChapters,
    totalQuestions: subject.totalQuestions,
    estimatedStudyTime: subject.estimatedStudyTime,
    comingSoon: subject.comingSoon,
  }));

  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] lg:w-[900px] h-[500px] sm:h-[700px] lg:h-[900px] bg-gradient-to-br from-blue-100/50 to-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="relative text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/90 rounded-full text-blue-700 text-sm font-semibold border border-blue-200 shadow-sm mb-6 sm:mb-8">
            <span className="text-xl">🎯</span>
            <span>Target95+</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5 sm:mb-6">
            Learn Computer Science
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Smarter with AI
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            Practice Previous Year Questions, Solve Python Programs, Learn with AI and Score Higher in your board exams.
          </p>
        </div>

        {(showSubjects || showClasses) && (
          <div className="relative mb-8 max-w-4xl mx-auto">
            <button
              type="button"
              onClick={showClasses ? onBackToBoards : onBackToClasses}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              <span>←</span>
              <span>Back to {showClasses ? "Boards" : "Classes"}</span>
            </button>
          </div>
        )}

        {!showClasses && !showSubjects && personalization?.board && personalization?.class && personalization?.subject && (
          <div className="relative mb-10 sm:mb-14 lg:mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-10 shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-semibold border border-blue-200 shadow-sm mb-4">
                    <span>📚</span>
                    <span>Continue Learning</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                  <p className="text-gray-600">You're currently studying:</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-gray-500 mb-1">Board</p>
                      <p className="text-lg font-bold text-gray-900">{personalization.board.toUpperCase()}</p>
                    </div>
                    <div className="hidden sm:block text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-gray-500 mb-1">Class</p>
                      <p className="text-lg font-bold text-gray-900">{personalization.class.title}</p>
                    </div>
                    <div className="hidden sm:block text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-gray-500 mb-1">Subject</p>
                      <p className="text-lg font-bold text-gray-900 capitalize">
                        {personalization.subject === "java" ? "Java Programming" : personalization.subject === "python" ? "Python Programming" : personalization.subject}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button type="button" onClick={onStartLearning} className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg">
                    Continue Learning
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                  <button type="button" onClick={onBackToBoards} className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                    Change Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showClasses && !showSubjects && (!personalization?.board || !personalization?.class) && (
          <div className="relative mb-10 sm:mb-14 lg:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {boards.map((board) => (
                <BoardCard key={board.id} board={board} onBoardSelect={onBoardSelect} />
              ))}
            </div>
          </div>
        )}

        {showClasses && (
          <div className="relative mb-10 sm:mb-14 lg:mb-16">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-semibold border border-blue-200 shadow-sm mb-4">
                <span>🎓</span>
                <span>Select your class for {selectedBoard}</span>
              </div>
              <h2 id="classes-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">Choose Your Class</h2>
              <p className="mt-3 text-gray-600 max-w-xl mx-auto">Select your class to see relevant subjects for your curriculum.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {availableClasses.map((classItem, index) => (
                <ClassCard key={classItem.id} classItem={classItem} onClassSelect={onClassSelect} index={index} />
              ))}
            </div>
          </div>
        )}

        {showSubjects && (
          <div className="relative mb-10 sm:mb-14 lg:mb-16">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-semibold border border-blue-200 shadow-sm mb-4">
                <span>📚</span>
                <span>Subjects for {selectedClass?.title}</span>
              </div>
              <h2 id="subjects-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">Explore Subjects</h2>
              <p className="mt-3 text-gray-600 max-w-xl mx-auto">Start learning chapter-wise with AI-powered explanations and practice questions.</p>
            </div>
            {subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {subjects.map((subject, index) => (
                  <SubjectCard key={subject.id} subject={subject} index={index} onSubjectSelect={onSubjectSelect} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12"><p className="text-gray-600">No subjects available yet. Please check back soon!</p></div>
            )}
          </div>
        )}

        <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/question-bank" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:border-blue-400 transition-colors duration-300">Explore Questions</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

const BoardCard = memo(function BoardCard({ board, onBoardSelect }) {
  const handleActivate = () => onBoardSelect?.(board.id);
  return (
    <button type="button" onClick={handleActivate} className={`group relative w-full rounded-2xl sm:rounded-3xl border-2 ${board.borderColor} ${board.bgColor} p-6 sm:p-8 lg:p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${board.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} aria-hidden="true" />
      <div className="relative flex flex-col items-center text-center h-full">
        <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br ${board.color} flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-5 lg:mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ease-out`}>{board.icon}</div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{board.title}</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-3 font-medium">{board.subtitle}</p>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 max-w-sm">{board.description}</p>
        <span className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
          Select Board <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
  );
});

const ClassCard = memo(function ClassCard({ classItem, onClassSelect, index }) {
  const animationDelay = `${index * 150}ms`;
  const handleActivate = () => onClassSelect?.(classItem);
  return (
    <button type="button" onClick={handleActivate} className="group relative w-full rounded-2xl sm:rounded-3xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" style={{ transitionDelay: animationDelay }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-5 transition-opacity duration-500" aria-hidden="true" />
      <div className="relative flex flex-col items-center text-center h-full">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-5 lg:mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ease-out">📖</div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{classItem.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 max-w-sm">Access all the relevant study material and practice questions for {classItem.title}.</p>
        <span className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">Select Class <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span></span>
      </div>
    </button>
  );
});

const SubjectCard = memo(function SubjectCard({ subject, index, onSubjectSelect }) {
  const animationDelay = `${index * 150}ms`;
  const handleActivate = () => {
    if (!subject.comingSoon) onSubjectSelect?.(subject.id);
  };

  return (
    <div className={`group relative rounded-2xl sm:rounded-3xl border-2 ${subject.borderColor} ${subject.bgColor} p-6 sm:p-8 lg:p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden`} style={{ transitionDelay: animationDelay }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} aria-hidden="true" />
      <div className="relative flex flex-col items-center text-center h-full">
        <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-5 lg:mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ease-out`}>{subject.icon}</div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{subject.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 max-w-sm">{subject.description}</p>
        {!subject.comingSoon && (
          <div className="mb-5 grid w-full grid-cols-1 gap-2 text-sm text-gray-500 sm:grid-cols-3 sm:gap-3">
            <span>{subject.totalChapters} Chapters</span>
            <span>{subject.totalQuestions} Questions</span>
            <span>{subject.estimatedStudyTime}</span>
          </div>
        )}
        {subject.comingSoon ? (
          <span className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gray-200 text-gray-600 rounded-xl font-semibold text-sm sm:text-base">Coming Soon</span>
        ) : (
          <button type="button" onClick={handleActivate} className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Start Learning <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        )}
      </div>
    </div>
  );
});