"use client";

import { useState, useRef } from "react";
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
  Clock,
} from "lucide-react";
import Navbar from "./Navbar";

export const CHAPTER_SECTIONS = [
  { id: "overview", label: "Overview", icon: <BookOpen className="h-4 w-4" />, defaultTime: 5 },
  { id: "learning-objectives", label: "Learning Objectives", icon: <Zap className="h-4 w-4" />, defaultTime: 3 },
  { id: "prerequisites", label: "Prerequisites", icon: <Circle className="h-4 w-4" />, defaultTime: 2 },
  { id: "theory", label: "Theory", icon: <BookOpen className="h-4 w-4" />, defaultTime: 15 },
  { id: "definitions", label: "Definitions", icon: <FileText className="h-4 w-4" />, defaultTime: 5 },
  { id: "key-terms", label: "Key Terms", icon: <ScrollText className="h-4 w-4" />, defaultTime: 5 },
  { id: "examples", label: "Examples", icon: <Code2 className="h-4 w-4" />, defaultTime: 20 },
  { id: "diagrams", label: "Diagrams", icon: <FileText className="h-4 w-4" />, defaultTime: 10 },
  { id: "important-notes", label: "Important Notes", icon: <Lightbulb className="h-4 w-4" />, defaultTime: 8 },
  { id: "common-mistakes", label: "Common Mistakes", icon: <AlertTriangle className="h-4 w-4" />, defaultTime: 7 },
  { id: "practice", label: "Practice", icon: <CheckCircle2 className="h-4 w-4" />, defaultTime: 20 },
  { id: "mcqs", label: "MCQs", icon: <Circle className="h-4 w-4" />, defaultTime: 15 },
  { id: "programming", label: "Programming", icon: <Code2 className="h-4 w-4" />, defaultTime: 25 },
  { id: "previous-year-questions", label: "Previous Year Questions", icon: <History className="h-4 w-4" />, defaultTime: 20 },
  { id: "mock-test", label: "Mock Test", icon: <FileQuestion className="h-4 w-4" />, defaultTime: 30 },
  { id: "ai-tutor", label: "AI Tutor", icon: <Brain className="h-4 w-4" />, defaultTime: 15 },
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
    const element = document.getElementById(`section-${sectionId}`) || sectionRefs.current[sectionId];
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    onSectionChange?.(sectionId);
    setSidebarOpen(false);
  };

  const completedCount = completedSections.length;
  const totalSections = CHAPTER_SECTIONS.length;
  const progressPercentage = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  const getSectionTime = (sectionId) => {
    const section = CHAPTER_SECTIONS.find((item) => item.id === sectionId);
    return section?.defaultTime || 5;
  };

  return (
    <div className="chapter-workspace min-h-screen bg-[#f6f7fb] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <div className="fixed inset-x-0 top-[68px] z-40 h-1 bg-slate-200/70 dark:bg-slate-800/70">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-[width] duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close chapter navigation"
          className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-[69px] z-50 h-[calc(100vh-69px)] w-[276px] border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800">
            <Link href="/Java" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
              <ChevronLeft className="h-4 w-4" />
              Back to Computer Science
            </Link>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Java</p>
                <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">{chapterTitle}</h2>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Chapter progress</span>
                <span className="text-slate-900 dark:text-white">{progressPercentage}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-blue-600 transition-[width] duration-300" style={{ width: `${progressPercentage}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-400">{completedCount} of {totalSections} topics viewed</p>
            </div>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4" aria-label="Chapter topics">
            <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Topics</p>
            <ul className="space-y-1">
              {CHAPTER_SECTIONS.map((section) => {
                const isCompleted = completedSections.includes(section.id);
                const isActive = activeSection === section.id;
                const sectionTime = sectionTimes[section.id] || getSectionTime(section.id);

                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                        isActive
                          ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                      }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : isActive ? (
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 dark:border-blue-400"><span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" /></span>
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-700" />
                      )}
                      <span className={`shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>{section.icon}</span>
                      <span className="min-w-0 flex-1 truncate">{section.label}</span>
                      <span className="text-[10px] font-medium text-slate-400">{sectionTime}m</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-slate-200 p-3 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <Link href={prevChapter ? `/study/${prevChapter.slug}` : "#"} className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${prevChapter ? "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300" : "pointer-events-none border-slate-100 text-slate-300 dark:border-slate-900 dark:text-slate-700"}`}>
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </Link>
              <Link href={nextChapter ? `/study/${nextChapter.slug}` : "#"} className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${nextChapter ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300" : "pointer-events-none border-slate-100 text-slate-300 dark:border-slate-900 dark:text-slate-700"}`}>
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[276px]">
        <div className="sticky top-[69px] z-30 border-b border-slate-200/80 bg-white/95 px-4 py-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <button type="button" onClick={() => setSidebarOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <Menu className="h-4 w-4" /> Topics
            </button>
            <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 lg:flex dark:text-slate-400">
              <span className="text-blue-600 dark:text-blue-400">Computer Science</span>
              <span>/</span>
              <span>{chapterTitle}</span>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{Math.round(readingProgress)}% read</span>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
          <nav className="mb-5" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/Java" className="font-medium transition hover:text-blue-600 dark:hover:text-blue-400">Computer Science</Link></li>
              <li aria-hidden="true" className="text-slate-300">›</li>
              <li className="font-semibold text-slate-900 dark:text-white">{chapterTitle}</li>
            </ol>
          </nav>

          <div className="sticky top-[116px] z-20 mb-7 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  const index = CHAPTER_SECTIONS.findIndex((item) => item.id === activeSection);
                  if (index > 0) scrollToSection(CHAPTER_SECTIONS[index - 1].id);
                }}
                disabled={CHAPTER_SECTIONS.findIndex((item) => item.id === activeSection) === 0}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30 sm:px-4 sm:text-sm dark:text-slate-300 dark:hover:bg-slate-900"
              >
                <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Previous topic</span><span className="sm:hidden">Prev</span>
              </button>
              <div className="min-w-0 text-center">
                <p className="truncate text-xs font-bold text-slate-900 sm:text-sm dark:text-white">{CHAPTER_SECTIONS.find((item) => item.id === activeSection)?.label}</p>
                <p className="text-[10px] text-slate-400 sm:text-xs">Topic {CHAPTER_SECTIONS.findIndex((item) => item.id === activeSection) + 1} of {CHAPTER_SECTIONS.length}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const index = CHAPTER_SECTIONS.findIndex((item) => item.id === activeSection);
                  if (index < CHAPTER_SECTIONS.length - 1) scrollToSection(CHAPTER_SECTIONS[index + 1].id);
                }}
                disabled={CHAPTER_SECTIONS.findIndex((item) => item.id === activeSection) === CHAPTER_SECTIONS.length - 1}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-30 sm:px-4 sm:text-sm dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <span className="hidden sm:inline">Next topic</span><span className="sm:hidden">Next</span> <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="chapter-content">{children}</div>

          <div className="mt-14 border-t border-slate-200 pt-8 dark:border-slate-800">
            <div className="grid gap-3 sm:grid-cols-2">
              {prevChapter ? (
                <Link href={`/study/${prevChapter.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-xs font-semibold text-slate-400">Previous chapter</span>
                  <span className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />{prevChapter.title}</span>
                </Link>
              ) : <div />}
              {nextChapter && (
                <Link href={`/study/${nextChapter.slug}`} className="group rounded-2xl border border-blue-200 bg-blue-50/70 p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:text-right dark:border-blue-900/70 dark:bg-blue-950/30">
                  <span className="text-xs font-semibold text-blue-600/70 dark:text-blue-400">Next chapter</span>
                  <span className="mt-1 flex items-center justify-end gap-2 text-sm font-bold text-blue-900 dark:text-blue-100">{nextChapter.title}<ChevronRight className="h-4 w-4 text-blue-500 group-hover:translate-x-0.5" /></span>
                </Link>
              )}
            </div>
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white py-7 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-5xl px-4 text-center text-xs text-slate-400 sm:px-6 lg:px-8">© 2024 Target95+. All rights reserved.</div>
        </footer>
      </div>

      {showBackToTop && (
        <button type="button" onClick={onBackToTop} className="fixed bottom-6 right-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" title="Back to top" aria-label="Back to top of page">
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
