"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ArrowUp,
  Printer,
  Share2,
  X,
  Menu,
  Clock,
  BookOpen,
  Code2,
  PlayCircle,
  FileQuestion,
  FileText,
  ScrollText,
  Circle,
  CheckCircle2,
  Brain,
  Zap,
  AlertTriangle,
  Lightbulb,
  History
} from "lucide-react";

// Extract all sections from chapter data to build sidebar navigation
const extractSections = (chapterData) => {
  const sections = [];
  const sectionNames = {
    introduction: "Introduction",
    theoryNotes: "Theory Notes",
    syntax: "Syntax",
    examples: "Examples",
    commonMistakes: "Common Mistakes",
    practiceExercises: "Practice Exercises",
    summary: "Summary"
  };

  Object.keys(chapterData).forEach((key) => {
    if (sectionNames[key] && chapterData[key]) {
      sections.push({
        id: key,
        title: sectionNames[key],
        icon: key === "syntax" ? <Code2 className="w-4 h-4" /> : key === "examples" ? <BookOpen className="w-4 h-4" /> : null
      });
    }
  });

  return sections;
};

export default function ChapterReader({ chapter, chapterData, chapterQuestions, prevChapter, nextChapter }) {
  const [activeSection, setActiveSection] = useState("introduction");
  const [copiedCode, setCopiedCode] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const sectionRefs = useRef({});

  // Load bookmark status from localStorage on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("chapterBookmarks") || "{}");
    setIsBookmarked(!!bookmarks[chapter]);
  }, [chapter]);

  // Toggle bookmark
  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("chapterBookmarks") || "{}");
    if (isBookmarked) {
      delete bookmarks[chapter];
    } else {
      bookmarks[chapter] = {
        title: chapterData.title,
        timestamp: new Date().toISOString(),
        lastReadPosition: window.scrollY
      };
    }
    localStorage.setItem("chapterBookmarks", JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Copy code to clipboard
  const copyCode = async (code, id) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Print chapter
  const printChapter = () => {
    window.print();
  };

  // Share chapter
  const shareChapter = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${chapterData.title} | Target95+`,
          text: `Check out this chapter on ${chapterData.title} from Target95+!`,
          url: window.location.href
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareMenuOpen(false);
      alert("Link copied to clipboard!");
    }
  };

  // Track scroll position for progress bar and active section
  useEffect(() => {
    const handleScroll = () => {
      // Update back to top button visibility
      setShowBackToTop(window.scrollY > 300);

      // Calculate reading progress
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setReadingProgress(Math.min(progress, 100));
      }

      // Update active section based on scroll position
      const sectionEntries = Object.entries(sectionRefs.current);
      for (const [id, ref] of sectionEntries) {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSidebarOpen(false);
  };

  // Back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = extractSections(chapterData);

  // Find all code blocks in the chapter to render with syntax highlighting
  const extractCodeBlocks = (data) => {
    const codeBlocks = [];
    
    // Extract from examples
    if (data.examples?.basic) {
      data.examples.basic.forEach((ex, idx) => {
        if (ex.code) {
          codeBlocks.push({
            id: `basic-${idx}`,
            code: ex.code,
            title: ex.title
          });
        }
      });
    }
    if (data.examples?.intermediate) {
      data.examples.intermediate.forEach((ex, idx) => {
        if (ex.code) {
          codeBlocks.push({
            id: `intermediate-${idx}`,
            code: ex.code,
            title: ex.title
          });
        }
      });
    }
    
    // Extract from syntax
    if (data.syntax) {
      Object.entries(data.syntax).forEach(([key, value]) => {
        if (value.code) {
          codeBlocks.push({
            id: `syntax-${key}`,
            code: value.code,
            title: key.replace(/([A-Z])/g, " $1").trim()
          });
        }
      });
    }
    
    return codeBlocks;
  };

  const codeBlocks = extractCodeBlocks(chapterData);

  // Learning statistics - shown only if user has progress data
  const hasProgressData = false; // Progress tracking not yet implemented for chapter reader
  const completedQuestions = hasProgressData ? Math.floor(chapterQuestions.length * 0.3) : 0;
  const remainingQuestions = chapterQuestions.length - completedQuestions;
  const accuracy = hasProgressData && chapterQuestions.length > 0 ? Math.round((completedQuestions / chapterQuestions.length) * 100) : 0;
  const estimatedTimeLeft = hasProgressData ? Math.round(chapterData.estimatedTime * (remainingQuestions / chapterQuestions.length)) : chapterData.estimatedTime;

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
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border-r border-white/30 dark:border-gray-800/50 shadow-2xl transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full pt-16">
          {/* Sidebar Header */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{chapterData.estimatedTime} min read</span>
            </div>
            <h2 className="mt-2 font-semibold text-gray-900 dark:text-white truncate">
              {chapterData.title}
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:ring-offset-2 ${
                      activeSection === section.id
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium scale-[1.02]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]"
                    }`}
                    aria-current={activeSection === section.id ? "step" : undefined}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Chapter Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
            {prevChapter && (
              <Link
                href={`/java/${prevChapter.slug}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/java/${nextChapter.slug}`}
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

            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={toggleBookmark}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={isBookmarked ? "Remove bookmark" : "Bookmark chapter"}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={printChapter}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Print chapter"
              >
                <Printer className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="Share chapter"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                {shareMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                    <button
                      onClick={shareChapter}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Copy link / Share
                    </button>
                    <button
                      onClick={() => setShareMenuOpen(false)}
                      className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <main ref={contentRef} className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/java" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Java Programming
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
              <li className="text-gray-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-none">
                {chapterData.title}
              </li>
            </ol>
          </nav>

          {/* Back to Java chapters */}
          <Link
            href="/java"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Chapters
          </Link>

          {/* Chapter Header / Hero Section */}
          <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-12 mb-12 shadow-2xl shadow-blue-500/30">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="text-center sm:text-left">
                <p className="text-blue-100 uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-4">Java Programming Chapter</p>
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {chapterData.title}
                </h1>
                {chapterData.description && (
                  <p className="mt-3 text-blue-100 text-sm sm:text-lg max-w-3xl">
                    {chapterData.description}
                  </p>
                )}
                
                {/* Key metadata badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
                  {/* Difficulty badge */}
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white border border-white/30 shadow-lg">
                    <Zap className="w-4 h-4" />
                    {chapterData.difficulty}
                  </span>
                  {/* Study time */}
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white border border-white/30 shadow-lg">
                    <Clock className="w-4 h-4" />
                    {chapterData.estimatedTime} min read
                  </span>
                  {/* Total questions */}
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white border border-white/30 shadow-lg">
                    <FileQuestion className="w-4 h-4" />
                    {chapterQuestions.length} Questions
                  </span>
                  {/* Progress indicator */}
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/30 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white border border-emerald-400/50 shadow-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    {Math.round(readingProgress)}% Complete
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Quick Action Cards */}
          <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12" aria-label="Quick Actions">
            <Link
              href={`/java/${chapter}/question/${chapterQuestions[0]?.id || '#'}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/40 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
              aria-label="Start Learning this chapter"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <PlayCircle className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold">Start Learning</span>
              </div>
            </Link>

            <Link
              href={`/java/${chapter}/question/${chapterQuestions[0]?.id || '#'}`}
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-700"
              aria-label="Practice Questions"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <FileQuestion className="w-8 h-8 mb-2 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Practice Questions</span>
              </div>
            </Link>

            <Link
              href="#quick-revision"
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
              aria-label="Revision Notes"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <FileText className="w-8 h-8 mb-2 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Revision Notes</span>
              </div>
            </Link>

            <Link
              href="#previous-year-questions"
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700"
              aria-label="Previous Year Questions"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <ScrollText className="w-8 h-8 mb-2 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">PYQs</span>
              </div>
            </Link>

            <Link
              href={`/java/${chapter}/mcqs`}
              className="col-span-2 md:col-span-1 group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-700"
              aria-label="Multiple Choice Questions"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <Circle className="w-8 h-8 mb-2 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">MCQs</span>
              </div>
            </Link>
          </section>

          {/* Learning Statistics */}
          <section className="rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 p-6 sm:p-8 mb-12 shadow-xl" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Learning Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 mb-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedQuestions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions Completed</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 mb-3">
                  <FileQuestion className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{remainingQuestions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Questions</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/40 mb-3">
                  <Brain className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{accuracy}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 mb-3">
                  <Clock className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{estimatedTimeLeft}m</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Est. Time Left</p>
              </div>
            </div>
          </section>

          {/* Chapter Features */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12" aria-label="Chapter Features">
            <Link
              href="#quick-revision"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-700"
              aria-label="Concept Revision"
            >
              <History className="w-10 h-10 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Concept Revision</h3>
              <p className="text-sm text-cyan-100">Review all key concepts with concise summaries</p>
            </Link>

            <Link
              href="#memory-tricks"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
              aria-label="Memory Tricks"
            >
              <Brain className="w-10 h-10 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Memory Tricks</h3>
              <p className="text-sm text-violet-100">Mnemonics and tricks to remember concepts easily</p>
            </Link>

            <Link
              href="#common-mistakes"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-6 text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-700"
              aria-label="Common Mistakes"
            >
              <AlertTriangle className="w-10 h-10 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Common Mistakes</h3>
              <p className="text-sm text-rose-100">Avoid the most frequent errors students make</p>
            </Link>

            <Link
              href="#exam-tips"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-lg shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700"
              aria-label="Exam Tips"
            >
              <Lightbulb className="w-10 h-10 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Exam Tips</h3>
              <p className="text-sm text-amber-100">Expert tips to score maximum marks in exams</p>
            </Link>

            <Link
              href="#previous-year-questions"
              className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700"
              aria-label="Previous Year Questions"
            >
              <ScrollText className="w-10 h-10 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Previous Year Questions</h3>
              <p className="text-sm text-emerald-100">Practice with actual questions from past board exams</p>
            </Link>
          </section>

          {/* Chapter Sections */}
          <div className="prose prose-blue max-w-none dark:prose-invert">
            {/* Introduction Section */}
            {chapterData.introduction && (
              <section 
                ref={(el) => (sectionRefs.current.introduction = el)}
                id="introduction"
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Introduction</h2>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {chapterData.introduction.whatIsIfElse}
                  </p>
                  
                  {chapterData.introduction.realLifeExamples && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Real Life Examples</h3>
                      <ul className="space-y-2">
                        {chapterData.introduction.realLifeExamples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-blue-500 mt-1">•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Theory Notes Section */}
            {chapterData.theoryNotes && (
              <section 
                ref={(el) => (sectionRefs.current.theoryNotes = el)}
                id="theoryNotes"
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Theory Notes</h2>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {chapterData.theoryNotes.decisionMaking}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {chapterData.theoryNotes.booleanExpressions}
                  </p>

                  {chapterData.theoryNotes.relationalOperators && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Relational Operators</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Operator</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Example</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Description</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {chapterData.theoryNotes.relationalOperators.map((op, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-3 text-sm font-mono text-blue-600 dark:text-blue-400">{op.operator}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{op.name}</td>
                                <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{op.example}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{op.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Syntax Section with Code Highlighting */}
            {chapterData.syntax && (
              <section 
                ref={(el) => (sectionRefs.current.syntax = el)}
                id="syntax"
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Syntax</h2>
                
                {/* Render all syntax code blocks */}
                {Object.entries(chapterData.syntax).map(([key, syntaxBlock]) => (
                  <div key={key} className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => copyCode(syntaxBlock.code, `syntax-${key}`)}
                        className="absolute top-3 right-3 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors z-10"
                        title="Copy code"
                      >
                        {copiedCode === `syntax-${key}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <SyntaxHighlighter
                        language="java"
                        style={oneDark}
                        customStyle={{ margin: 0, padding: "1.5rem", background: "#0f172a" }}
                      >
                        {syntaxBlock.code}
                      </SyntaxHighlighter>
                    </div>
                    {syntaxBlock.breakdown && (
                      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Breakdown:</h4>
                        <ul className="space-y-2">
                          {syntaxBlock.breakdown.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <code className="text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded font-mono text-xs whitespace-nowrap">
                                {item.keyword}
                              </code>
                              <span>{item.explanation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Examples Section */}
            {chapterData.examples && (
              <section 
                ref={(el) => (sectionRefs.current.examples = el)}
                id="examples"
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Examples</h2>
                
                {chapterData.examples.basic?.map((example, idx) => (
                  <div key={example.id} className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {example.title}
                      </h3>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => copyCode(example.code, `basic-${idx}`)}
                        className="absolute top-3 right-3 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors z-10"
                        title="Copy code"
                      >
                        {copiedCode === `basic-${idx}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <SyntaxHighlighter
                        language="java"
                        style={oneDark}
                        customStyle={{ margin: 0, padding: "1.5rem", background: "#0f172a" }}
                      >
                        {example.code}
                      </SyntaxHighlighter>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                      <div className="mb-3">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Output:</span>
                        <code className="block mt-1 text-sm text-green-600 dark:text-green-400 font-mono bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded">
                          {example.output}
                        </code>
                      </div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Explanation:</h4>
                      <ol className="space-y-1.5">
                        {example.explanation.map((step, stepIdx) => (
                          <li key={stepIdx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-gray-400 dark:text-gray-500">{stepIdx + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Chapter Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-white/40 dark:border-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              {prevChapter ? (
                <Link
                  href={`/java/${prevChapter.slug}`}
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
                  href={`/java/${nextChapter.slug}`}
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
          onClick={scrollToTop}
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