"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code2,
  FileText,
  ScrollText,
  Brain,
  Zap,
  AlertTriangle,
  Lightbulb,
  History,
  FileQuestion,
  CheckCircle2,
  Circle,
  Menu,
  ArrowUp,
} from "lucide-react";

export const CHAPTER_SECTIONS = [
  { id: "overview", label: "Overview", icon: <BookOpen className="w-4 h-4" />, defaultTime: 5 },
  { id: "learning-objectives", label: "Learning Objectives", icon: <Zap className="w-4 h-4" />, defaultTime: 3 },
  { id: "prerequisites", label: "Prerequisites", icon: <Circle className="w-4 h-4" />, defaultTime: 2 },
  { id: "theory", label: "Theory", icon: <BookOpen className="w-4 h-4" />, defaultTime: 15 },
  { id: "definitions", label: "Definitions", icon: <FileText className="w-4 h-4" />, defaultTime: 5 },
  { id: "key-terms", label: "Key Terms", icon: <ScrollText className="w-4 h-4" />, defaultTime: 5 },
  { id: "examples", label: "Examples", icon: <Code2 className="w-4 h-4" />, defaultTime: 20 },
  { id: "diagrams", label: "Diagrams", icon: <FileText className="w-4 h-4" />, defaultTime: 10 },
  { id: "important-notes", label: "Important Notes", icon: <Lightbulb className="w-4 h-4" />, defaultTime: 8 },
  { id: "common-mistakes", label: "Common Mistakes", icon: <AlertTriangle className="w-4 h-4" />, defaultTime: 7 },
  { id: "practice", label: "Practice", icon: <CheckCircle2 className="w-4 h-4" />, defaultTime: 20 },
  { id: "mcqs", label: "MCQs", icon: <Circle className="w-4 h-4" />, defaultTime: 15 },
  { id: "programming", label: "Programming", icon: <Code2 className="w-4 h-4" />, defaultTime: 25 },
  { id: "previous-year-questions", label: "Previous Year Questions", icon: <History className="w-4 h-4" />, defaultTime: 20 },
  { id: "mock-test", label: "Mock Test", icon: <FileQuestion className="w-4 h-4" />, defaultTime: 30 },
  { id: "ai-tutor", label: "AI Tutor", icon: <Brain className="w-4 h-4" />, defaultTime: 15 },
];

export default function ChapterLayout({
  children,
  chapterTitle,
  chapterSlug,
  prevChapter,
  nextChapter,
  readingProgress,
  activeSection,
  onSectionChange,
  completedSections = [],
  sectionTimes = {},
  showBackToTop,
  onBackToTop,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef({});

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onSectionChange?.(sectionId);
    setSidebarOpen(false);
  };

  const completedCount = completedSections.length;
  const totalSections = CHAPTER_SECTIONS.length;
  const progressPercentage = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  const getSectionTime = (sectionId) => {
    const section = CHAPTER_SECTIONS.find((s) => s.id === sectionId);
    return section?.defaultTime || 5;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-1.5 bg-slate-200/80 dark:bg-gray-800/80 backdrop-blur-sm w-full">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/30"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sticky Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border-r border-white/30 dark:border-gray-800/50 shadow-2xl transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16">
          {/* Sidebar Header */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
              {chapterTitle}
            </h2>

            {/* Progress Overview */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {completedCount} of {totalSections} sections
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {CHAPTER_SECTIONS.map((section) => {
                const isCompleted = completedSections.includes(section.id);
                const sectionTime = sectionTimes[section.id] || getSectionTime(section.id);
                const isActive = activeSection === section.id;

                return (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:ring-offset-2 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium scale-[1.02]"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]"
                      }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                      </span>
                      <span className="flex-1">{section.icon}</span>
                      <span className="flex-1">{section.label}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {sectionTime}m
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Chapter Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
            {prevChapter && (
              <Link
                href={`/study/${prevChapter.slug}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/study/${nextChapter.slug}`}
                className="flex items-center justify-end gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Action Bar */}
        <div className="sticky top-1 z-30 bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl border-b border-white/40 dark:border-gray-800/50 px-4 py-3 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Progress indicator */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {progressPercentage}%
                </span>
              </div>
            </div>

            {/* Mobile progress text */}
            <div className="lg:hidden text-sm font-medium text-gray-700 dark:text-gray-300">
              {progressPercentage}% Complete
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/study" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Study Center
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
              <li className="text-gray-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-none">
                {chapterTitle}
              </li>
            </ol>
          </nav>

          {/* Section Navigation (Previous/Next Section) */}
          <div className="sticky top-16 z-40 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 shadow-lg mb-8">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = CHAPTER_SECTIONS.findIndex((s) => s.id === activeSection);
                  if (currentIndex > 0) {
                    scrollToSection(CHAPTER_SECTIONS[currentIndex - 1].id);
                  }
                }}
                disabled={CHAPTER_SECTIONS.findIndex((s) => s.id === activeSection) === 0}
                className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous Section</span>
                <span className="sm:hidden">Previous</span>
              </button>

              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {CHAPTER_SECTIONS.find((s) => s.id === activeSection)?.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Section {CHAPTER_SECTIONS.findIndex((s) => s.id === activeSection) + 1} of {CHAPTER_SECTIONS.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const currentIndex = CHAPTER_SECTIONS.findIndex((s) => s.id === activeSection);
                  if (currentIndex < CHAPTER_SECTIONS.length - 1) {
                    scrollToSection(CHAPTER_SECTIONS[currentIndex + 1].id);
                  }
                }}
                disabled={CHAPTER_SECTIONS.findIndex((s) => s.id === activeSection) === CHAPTER_SECTIONS.length - 1}
                className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              >
                <span className="hidden sm:inline">Next Section</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Render children with section refs */}
          <div>{children}</div>

          {/* Chapter Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-white/40 dark:border-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              {prevChapter ? (
                <Link
                  href={`/study/${prevChapter.slug}`}
                  className="flex items-center gap-2 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Previous</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{prevChapter.title}</span>
                  </div>
                </Link>
              ) : <div />}

              {nextChapter && (
                <Link
                  href={`/study/${nextChapter.slug}`}
                  className="flex items-center gap-2 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group ml-auto"
                >
                  <div className="text-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Next</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{nextChapter.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </Link>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 Target95+. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={onBackToTop}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-30 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
          title="Back to top"
          aria-label="Back to top of page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

