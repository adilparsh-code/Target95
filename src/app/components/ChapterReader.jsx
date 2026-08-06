"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Code2,
  BookOpen,
  FileQuestion,
  FileText,
  ScrollText,
  Circle,
  CheckCircle2,
  Brain,
  Zap,
  AlertTriangle,
  Lightbulb,
  History,
} from "lucide-react";

import ChapterLayout, { CHAPTER_SECTIONS } from "./ChapterLayout";

export default function ChapterReader({ chapter, chapterData, chapterQuestions, prevChapter, nextChapter }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [completedSections, setCompletedSections] = useState([]);
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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveSection(sectionId);
  }, []);

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

  // Track which sections have been viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setCompletedSections((prev) => {
              if (prev.includes(sectionId)) return prev;
              return [...prev, sectionId];
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = Object.values(sectionRefs.current).filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Extract code blocks from chapter data
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

  const sectionTimes = {};
  CHAPTER_SECTIONS.forEach((section) => {
    sectionTimes[section.id] = section.defaultTime;
  });

  return (
    <ChapterLayout
      chapterTitle={chapterData.title}
      chapterSlug={chapter}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      readingProgress={readingProgress}
      activeSection={activeSection}
      onSectionChange={scrollToSection}
      completedSections={completedSections}
      sectionTimes={sectionTimes}
      showBackToTop={showBackToTop}
      onBackToTop={scrollToTop}
    >
      <div ref={contentRef}>
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

        {/* Quick Action Cards - Learning Flow */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12" aria-label="Learning Flow">
          {/* Theory - Scroll to introduction */}
          <Link
            href="#introduction"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/40 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
            aria-label="Theory and Definitions"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <BookOpen className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold">Theory</span>
            </div>
          </Link>

          {/* Examples */}
          <Link
            href="#examples"
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-700"
            aria-label="Examples"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <FileText className="w-8 h-8 mb-2 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Examples</span>
            </div>
          </Link>

          {/* Important Notes */}
          <Link
            href="#theoryNotes"
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
            aria-label="Important Notes"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <ScrollText className="w-8 h-8 mb-2 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Notes</span>
            </div>
          </Link>

          {/* Practice - Goes to questions */}
          <Link
            href={`/Java/${chapter}/question/${chapterQuestions[0]?.id || '#'}`}
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700"
            aria-label="Practice Questions"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <FileQuestion className="w-8 h-8 mb-2 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Practice</span>
            </div>
          </Link>

          {/* MCQs */}
          <Link
            href={`/Java/${chapter}/mcqs`}
            className="col-span-2 md:col-span-1 group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-700"
            aria-label="Multiple Choice Questions"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <Circle className="w-8 h-8 mb-2 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">MCQs</span>
            </div>
          </Link>

          {/* Programming */}
          <Link
            href={`/Java/${chapter}/question/${chapterQuestions.find(q => q.type === 'programming')?.id || chapterQuestions[0]?.id || '#'}`}
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700"
            aria-label="Programming Questions"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <Code2 className="w-8 h-8 mb-2 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Programming</span>
            </div>
          </Link>

          {/* Previous Year Questions */}
          <Link
            href="#previous-year-questions"
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-700"
            aria-label="Previous Year Questions"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <History className="w-8 h-8 mb-2 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">PYQs</span>
            </div>
          </Link>

          {/* Mock Test */}
          <Link
            href="/mock-test"
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700"
            aria-label="Mock Test"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <FileText className="w-8 h-8 mb-2 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Mock Test</span>
            </div>
          </Link>

          {/* AI Tutor */}
          <Link
            href="/ai-tutor"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-5 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-700"
            aria-label="AI Tutor"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <Brain className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold">AI Tutor</span>
            </div>
          </Link>
        </section>

        {/* Chapter Sections */}
        <div className="prose prose-blue max-w-none dark:prose-invert">
          {/* Overview Section */}
          <section 
            ref={(el) => (sectionRefs.current.overview = el)}
            id="overview"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {chapterData.description || "This chapter covers fundamental concepts in " + chapterData.title + "."}
              </p>
            </div>
          </section>

          {/* Learning Objectives */}
          <section 
            ref={(el) => (sectionRefs.current.learningObjectives = el)}
            id="learningObjectives"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Objectives</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Understand the core concepts of {chapterData.title}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Apply these concepts in practical programming scenarios</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Solve problems using the techniques learned in this chapter</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Prerequisites */}
          <section 
            ref={(el) => (sectionRefs.current.prerequisites = el)}
            id="prerequisites"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prerequisites</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Basic understanding of Java syntax and programming fundamentals.
              </p>
            </div>
          </section>

          {/* Theory Section */}
          <section 
            ref={(el) => (sectionRefs.current.theory = el)}
            id="theory"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Theory</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {chapterData.theoryNotes?.decisionMaking || "This section covers the theoretical foundations of " + chapterData.title + "."}
              </p>
            </div>
          </section>

          {/* Definitions Section */}
          <section 
            ref={(el) => (sectionRefs.current.definitions = el)}
            id="definitions"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Definitions</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Key Concept</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">A fundamental definition related to this chapter.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Terms Section */}
          <section 
            ref={(el) => (sectionRefs.current.keyTerms = el)}
            id="keyTerms"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Terms</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Term 1</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Definition of the term.</p>
                </div>
              </div>
            </div>
          </section>

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

          {/* Diagrams Section */}
          <section 
            ref={(el) => (sectionRefs.current.diagrams = el)}
            id="diagrams"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Diagrams</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Diagrams will be added soon.
              </p>
            </div>
          </section>

          {/* Important Notes Section */}
          {chapterData.theoryNotes && (
            <section 
              ref={(el) => (sectionRefs.current.importantNotes = el)}
              id="importantNotes"
              className="mb-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Important Notes</h2>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
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

          {/* Common Mistakes Section */}
          <section 
            ref={(el) => (sectionRefs.current.commonMistakes = el)}
            id="commonMistakes"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Mistakes</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Forgetting to initialize variables before use.</p>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Confusing assignment (=) with equality (==) operators.</p>
                </li>
              </ul>
            </div>
          </section>

          {/* Practice Section */}
          <section 
            ref={(el) => (sectionRefs.current.practice = el)}
            id="practice"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Practice</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Practice exercises will be added soon.
              </p>
            </div>
          </section>

          {/* MCQs Section */}
          <section 
            ref={(el) => (sectionRefs.current.mcqs = el)}
            id="mcqs"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">MCQs</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                MCQs will be displayed here.
              </p>
            </div>
          </section>

          {/* Programming Section */}
          <section 
            ref={(el) => (sectionRefs.current.programming = el)}
            id="programming"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Programming</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Programming questions will be displayed here.
              </p>
            </div>
          </section>

          {/* Previous Year Questions */}
          <section 
            ref={(el) => (sectionRefs.current.previousYearQuestions = el)}
            id="previousYearQuestions"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Previous Year Questions</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Previous year questions will be added soon.
              </p>
            </div>
          </section>

          {/* Mock Test */}
          <section 
            ref={(el) => (sectionRefs.current.mockTest = el)}
            id="mockTest"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Mock Test</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Mock test will be available here.
              </p>
            </div>
          </section>

          {/* AI Tutor */}
          <section 
            ref={(el) => (sectionRefs.current.aiTutor = el)}
            id="aiTutor"
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AI Tutor</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                AI Tutor will be integrated here.
              </p>
            </div>
          </section>
        </div>

        {/* Chapter Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-white/40 dark:border-gray-800/50">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {prevChapter ? (
              <Link
                href={`/Java/${prevChapter.slug}`}
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
                href={`/Java/${nextChapter.slug}`}
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
      </div>
    </ChapterLayout>
  );
}