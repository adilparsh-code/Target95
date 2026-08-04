"use client";

import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";
import subjectsData from "../data/subjects";

const boards = [
  {
    id: "icse",
    title: "ICSE",
    subtitle: "Indian Certificate of Secondary Education",
    description: "Comprehensive study materials, practice questions, and AI-powered learning for ICSE Class 9/10 Computer Science.",
    icon: "🎓",
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "cbse",
    title: "CBSE",
    subtitle: "Central Board of Secondary Education",
    description: "Comprehensive study materials, practice questions, and AI-powered learning for CBSE Class 9-12 Computer Science.",
    icon: "🏫",
    color: "from-green-600 to-teal-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "isc",
    title: "ISC",
    subtitle: "Indian School Certificate",
    description: "Comprehensive study materials, practice questions, and AI-powered learning for ISC Class 11/12 Computer Science.",
    icon: "📚",
    color: "from-purple-600 to-pink-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

// Use subjects from data file - filter out coming soon subjects
const subjects = subjectsData
  .filter(subject => !subject.comingSoon)
  .map(subject => ({
    id: subject.id,
    title: subject.title,
    subtitle: subject.title,
    description: subject.description,
    icon: subject.icon,
    color: subject.color,
    bgColor: subject.bgColor,
    borderColor: subject.borderColor,
    href: subject.href,
  }));

export default function Hero({ onBoardSelect, onBackToBoards, showSubjects, selectedBoard, showStartLearning, onStartLearning }) {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 py-12 sm:py-16 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] lg:w-[900px] h-[500px] sm:h-[700px] lg:h-[900px] bg-gradient-to-br from-blue-100/50 to-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Hero Header */}
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
            Practice Previous Year Questions, Solve Java Programs, Learn with AI and Score Higher in your board exams.
          </p>
        </div>

        {/* Back Button */}
        {showSubjects && (
          <div className="relative mb-8 max-w-4xl mx-auto">
            <button 
              onClick={onBackToBoards}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              <span>←</span>
              <span>Back to Boards</span>
            </button>
          </div>
        )}

        {/* Board Selection Cards */}
        {!showSubjects && (
          <div className="relative mb-10 sm:mb-14 lg:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {boards.map((board) => (
                <BoardCard key={board.id} board={board} onBoardSelect={onBoardSelect} />
              ))}
            </div>
          </div>
        )}

        {/* Subject Selection Section */}
        {showSubjects && (
          <div className="relative mb-10 sm:mb-14 lg:mb-16">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-semibold border border-blue-200 shadow-sm mb-4">
                <span>📚</span>
                <span>Subjects for {selectedBoard}</span>
              </div>
              <h2
                id="subjects-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900"
              >
                Explore Subjects
              </h2>
              <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                Start learning chapter-wise with AI-powered explanations and practice questions.
              </p>
            </div>
            {subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {subjects.map((subject, index) => (
                  <SubjectCard key={subject.id} subject={subject} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No subjects available yet. Please check back soon!</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
          {showStartLearning && (
            <button
              type="button"
              onClick={onStartLearning}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus-visible:ring-blue-700 dark:focus-visible:ring-offset-gray-900 sm:w-auto animate-pulse"
            >
              Start Learning
            </button>
          )}
          <Link href="/question-bank" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:border-blue-400 transition-colors duration-300">
              Explore Questions
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function BoardCard({ board, onBoardSelect }) {
  const handleClick = () => {
    if (onBoardSelect) {
      onBoardSelect(board.title);
    }
  };

  const handleKeyDown = (e) => {
    if (onBoardSelect && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onBoardSelect(board.title);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={`group relative rounded-2xl sm:rounded-3xl border-2 ${board.borderColor} ${board.bgColor} p-6 sm:p-8 lg:p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${board.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      <div className="relative flex flex-col items-center text-center h-full">
        {/* Icon */}
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br ${board.color} flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-5 lg:mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ease-out`}
        >
          {board.icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
          {board.title}
        </h2>
        <p className="text-sm font-semibold text-gray-500 mb-3 sm:mb-4">
          {board.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 flex-1 max-w-sm">
          {board.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
          Explore {board.title}
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </div>
  );
}

function SubjectCard({ subject, index }) {
  const animationDelay = `${index * 150}ms`;

  return (
    <div
      className={`group relative rounded-2xl sm:rounded-3xl border-2 ${subject.borderColor} ${subject.bgColor} p-6 sm:p-8 lg:p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden`}
      style={{
        transitionDelay: animationDelay,
        transitionProperty: "transform, opacity, box-shadow",
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      <div className="relative flex flex-col items-center text-center h-full">
        {/* Icon */}
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-5 lg:mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ease-out`}
        >
          {subject.icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
          {subject.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 max-w-sm">
          {subject.description}
        </p>

        {/* Stats Row */}
        {!subject.comingSoon && (
          <div className="mb-5 grid w-full grid-cols-1 gap-2 text-sm text-gray-500 sm:grid-cols-3 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span>{subject.totalChapters} Chapters</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <span>{subject.totalQuestions} Questions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{subject.estimatedStudyTime}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={subject.href}
          className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Start Learning
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}