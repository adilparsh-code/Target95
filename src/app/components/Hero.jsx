"use client";

import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";

const boards = [
  {
    id: "icse",
    title: "ICSE",
    subtitle: "ICSE / ISC",
    description: "Comprehensive study materials, practice questions, and AI-powered learning for ICSE Class 9/10 and ISC Class 11/12 Computer Science.",
    icon: "🎓",
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "cbse",
    title: "CBSE",
    subtitle: "Central Board of Secondary Education",
    description: "CBSE Computer Science study materials, practice questions, and mock tests.",
    icon: "📚",
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
];

const subjects = [
  {
    id: "java-programming",
    title: "Java Programming",
    subtitle: "Core Java Fundamentals",
    description: "Master Java programming with comprehensive chapter-wise learning, practice questions, and AI-powered explanations.",
    icon: "☕",
    color: "from-orange-600 to-red-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    href: "/study/introduction",
  }
];

export default function Hero({ onBoardSelect, onBackToBoards, showSubjects, selectedBoard }) {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {subjects.map((subject, index) => (
                <SubjectCard key={subject.id} subject={subject} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/study" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow duration-300">
              Start Learning
            </Button>
          </Link>
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