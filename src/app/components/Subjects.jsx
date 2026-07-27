"use client";

import Link from "next/link";
import subjects from "../data/subjects";

export default function Subjects({ isVisible }) {
  return (
    <section
      className={`relative transition-all duration-700 ease-in-out overflow-hidden ${
        isVisible
          ? "max-h-[1200px] opacity-100 mt-0"
          : "max-h-0 opacity-0 mt-0"
      }`}
      aria-labelledby="subjects-heading"
    >
      <div className="relative bg-gradient-to-b from-blue-50/30 via-white to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-semibold border border-blue-200 shadow-sm mb-4">
              <span>📚</span>
              <span>Subjects</span>
            </div>
            <h2
              id="subjects-heading"
              className="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              Explore Subjects
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Start learning chapter-wise with AI-powered explanations and
              practice questions.
            </p>
          </div>

          {/* Subject Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.title}
                subject={subject}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SubjectCard({ subject, index, isVisible }) {
  const animationDelay = `${index * 150}ms`;

  return (
    <div
      className={`group relative rounded-2xl sm:rounded-3xl border-2 ${subject.borderColor} ${subject.bgColor} p-6 sm:p-8 lg:p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
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
        {subject.comingSoon ? (
          <div className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold text-sm cursor-not-allowed">
            Coming Soon
          </div>
        ) : (
          <Link
            href={subject.href}
            className="mt-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Start Learning
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
