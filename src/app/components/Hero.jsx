"use client";

import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";

const boards = [
  {
    id: "cisce",
    title: "CISCE",
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
    subtitle: "Coming Soon",
    description: "CBSE Computer Science study materials, practice questions, and mock tests are being prepared. Stay tuned for the launch!",
    icon: "📅",
    color: "from-gray-400 to-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    comingSoon: true,
  },
];

export default function Hero({ onExplore }) {
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

        {/* Board Selection Cards */}
        <div className="relative mb-10 sm:mb-14 lg:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} onExplore={onExplore} />
            ))}
          </div>
        </div>

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

function BoardCard({ board, onExplore }) {
  const handleClick = () => {
    if (board.id === "cisce" && onExplore) {
      onExplore();
    }
  };

  const handleKeyDown = (e) => {
    if (board.id === "cisce" && onExplore && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onExplore();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={board.id === "cisce" ? "button" : undefined}
      tabIndex={board.id === "cisce" ? 0 : undefined}
      className={`group relative rounded-2xl sm:rounded-3xl border-2 ${board.borderColor} ${board.bgColor} p-6 sm:p-8 lg:p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden ${
        board.id === "cisce" ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" : ""
      }`}
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
        {board.comingSoon ? (
          <div className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold text-sm cursor-not-allowed">
            Coming Soon
          </div>
        ) : (
          <div className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Explore {board.title}
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        )}
      </div>
    </div>
  );
}