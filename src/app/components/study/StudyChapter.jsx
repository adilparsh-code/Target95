"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { getStudyChapters } from "../../../lib/studyCenter";
import { sanitizeText } from "../../../lib/mocktest";
import useStudyProgress from "../../hooks/useStudyProgress";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import questionsData from "../../data/questions";
import ChapterLayout, { CHAPTER_SECTIONS } from "../ChapterLayout";
import ChapterSection from "../ChapterSection";
import ChapterContentEngine from "../content/ChapterContentEngine";

import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import SegmentedProgress from "./SegmentedProgress";
import QuestionSection from "./QuestionSection";

export default function StudyChapter({ slug }) {
  const chapters = useMemo(() => getStudyChapters(), []);
  const chapter = useMemo(() => chapters.find((c) => c.slug === slug), [chapters, slug]);
  const [search, setSearch] = useState("");
  const { progress, updateProgress } = useStudyProgress();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [completedSections, setCompletedSections] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("learning-objectives");
  const sectionRefs = useRef({});
  const contentRef = useRef(null);

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

  // Scoped questions from the questions data (must be before early return)
  const chapterQuestions = useMemo(() => {
    if (!questionsData) return [];
    const allQuestions = Array.isArray(questionsData) ? questionsData : [];
    return allQuestions.filter((q) => q.chapter === slug || q.chapter === chapter?.title);
  }, [slug, chapter]);

  useEffect(() => {
    if (slug) {
      addRecentlyViewed(slug);
    }
  }, [slug, addRecentlyViewed]);

  // Track which sections have been viewed (scrolled into view)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setCompletedSections((prev) => {
              if (prev.includes(sectionId)) return prev;
              const updated = [...prev, sectionId];
              // Auto-update study progress when enough sections are viewed
              if (updated.length >= 4 && progress[slug] === "Not Started") {
                updateProgress(slug, "Studying");
              }
              if (updated.length >= CHAPTER_SECTIONS.length) {
                updateProgress(slug, "Completed");
              }
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = CHAPTER_SECTIONS
      .map((s) => document.getElementById(`section-${s.id}`))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [slug, progress, updateProgress]);

  if (!chapter) {
    return (
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900">Chapter Not Found</h1>
          <p className="mt-3 text-base leading-7 text-gray-700">The chapter you are looking for does not exist.</p>
          <Link href="/study" className="mt-6 inline-block rounded-xl border border-blue-300 bg-blue-100 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200">
            Back to Study Center
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = chapters.findIndex((c) => c.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const status = progress[slug] ?? "Not Started";
  const studyData = chapter.studyData;

  // Rich content from chapter-content and question-bank
  const richContent = null;
  const questionBankChapter = null;

  const safeSearch = sanitizeText(search).toLowerCase();
  const hasSearchResults = safeSearch
    ? searchInContent(studyData, safeSearch)
    : true;

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!safeSearch) return CHAPTER_SECTIONS;
    return CHAPTER_SECTIONS.filter((s) => {
      const data = getSectionData(studyData, s.id);
      if (!data) return false;
      const dataString = Array.isArray(data) ? data.join(" ") : String(data);
      return dataString.toLowerCase().includes(safeSearch);
    });
  }, [safeSearch, studyData]);

  const readingSections = CHAPTER_SECTIONS
    .filter((s) => {
      const data = getSectionData(studyData, s.id);
      return data && (Array.isArray(data) ? data.length > 0 : data);
    })
    .map((s) => ({
      id: s.id,
      label: s.label,
      completed: completedSections.includes(`section-${s.id}`),
    }));

  const progressPercentage = readingSections.length > 0
    ? Math.round((readingSections.filter((s) => s.completed).length / readingSections.length) * 100)
    : 0;

  const sectionTimes = {};
  CHAPTER_SECTIONS.forEach((section) => {
    const data = getSectionData(studyData, section.id);
    if (data && (Array.isArray(data) ? data.length > 0 : data)) {
      sectionTimes[section.id] = section.defaultTime;
    }
  });

  return (
    <ChapterLayout
      chapterTitle={chapter.title}
      chapterSlug={slug}
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
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 mb-8" id="section-learning-objectives">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Study Chapter</p>
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="mt-3 text-3xl font-bold text-gray-900">
                  {chapter.title}
                </h1>
                <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-gray-900">
                  {chapter.difficulty}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">{studyData.intro}</p>
              <p className="mt-2 text-sm text-gray-600">
                Estimated study time: {chapter.estimatedStudyTime} &middot;{" "}
                {chapter.totalQuestions} question{chapter.totalQuestions !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 w-full lg:w-auto">
              <p className="text-sm font-semibold text-gray-700">Study Status</p>
              <div className="mt-2">
                <SegmentedProgress status={status} percentage={progressPercentage} />
              </div>
              <p className="mt-2 text-lg font-bold text-gray-900">{status}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Not Started", "Studying", "Completed"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateProgress(slug, option)}
                    className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                      status === option
                        ? "bg-blue-100 text-gray-900 shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label={`Set status to ${option}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Content Engine - Renders all sections from structured data */}
        <ChapterContentEngine
          chapter={chapter}
          content={richContent}
          questions={questionBankChapter}
          completedSections={completedSections}
        />

        {/* Prerequisites */}
        <ChapterSection
          id="prerequisites"
          title="Prerequisites"
          icon={<ChevronDoubleRightIcon className="w-5 h-5" />}
          estimatedTime={2}
          isCompleted={completedSections.includes("section-prerequisites")}
        >
          {studyData.prerequisites && studyData.prerequisites.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {studyData.prerequisites.map((prereq) => {
                const prereqChapter = chapters.find((c) => c.slug === prereq);
                return prereqChapter ? (
                  <Link
                    key={prereq}
                    href={`/study/${prereq}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800 transition hover:bg-gray-200"
                  >
                    {prereqChapter.title}
                  </Link>
                ) : null;
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">This section will be available soon.</p>
          )}
        </ChapterSection>

        {/* Search within notes */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm mb-8">
          <label className="text-sm font-semibold text-gray-900" htmlFor="chapter-search">
            <span className="mb-2 block">Search within notes</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="chapter-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 pl-11 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Search by keyword, concept, exam point..."
              />
            </div>
          </label>
          {search && !hasSearchResults && (
            <p className="mt-2 text-sm text-gray-500">
              No results found for &ldquo;{search}&rdquo;
            </p>
          )}
        </div>

        {/* Overview */}
        <ChapterSection
          id="overview"
          title="Overview"
          icon={<BookOpenIcon className="w-5 h-5" />}
          estimatedTime={5}
          isCompleted={completedSections.includes("section-overview")}
        >
          {studyData.intro ? (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{studyData.intro}</p>
          ) : (
            <p className="text-sm text-gray-500">This section will be available soon.</p>
          )}
        </ChapterSection>


        {/* Related Topics */}
        {studyData.relatedTopics && studyData.relatedTopics.length > 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Related Topics</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {studyData.relatedTopics.map((relatedSlug) => {
                const relatedChapter = chapters.find((c) => c.slug === relatedSlug);
                return relatedChapter ? (
                  <Link
                    key={relatedSlug}
                    href={`/study/${relatedSlug}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 transition hover:border-blue-400 hover:bg-blue-100"
                  >
                    {relatedChapter.title}
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Questions Section */}
        {chapterQuestions.length > 0 && (
          <QuestionSection chapter={slug} questions={chapterQuestions} />
        )}
      </div>
    </ChapterLayout>
  );
}

// Helper: check if search query exists in study data
function searchInContent(studyData, query) {
  if (!query) return true;
  const fields = [
    studyData.intro,
    studyData.summary,
    ...(studyData.concepts || []),
    ...(studyData.definitions || []),
    ...(studyData.notes || []),
    ...(studyData.tips || []),
    ...(studyData.mistakes || []),
    ...(studyData.learningObjectives || []),
    ...(studyData.importantExamPoints || []),
    ...(studyData.commonMistakes || []),
    ...(studyData.quickRevision || []),
    ...(studyData.faqs ? studyData.faqs.map((f) => f.question + " " + f.answer) : []),
    ...(studyData.syntax ? studyData.syntax.map((s) => s.title + " " + s.code) : []),
  ];
  return fields.some((f) => f && f.toLowerCase().includes(query));
}

// Helper: get relevant data for a section
function getSectionData(studyData, sectionId) {
  const map = {
    "overview": studyData.intro,
    "learning-objectives": studyData.learningObjectives,
    "prerequisites": studyData.prerequisites,
    "theory": studyData.concepts,
    "definitions": studyData.definitions,
    "key-terms": studyData.keyTerms,
    "examples": studyData.examples,
    "diagrams": studyData.diagrams,
    "important-notes": studyData.notes,
    "common-mistakes": studyData.mistakes,
    "practice": null,
    "mcqs": null,
    "programming": null,
    "previous-year-questions": null,
    "mock-test": null,
    "ai-tutor": null,
  };
  return map[sectionId];
}
