"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { getStudyChapters, resolveStudyChapter } from "../../../lib/studyCenter";
import { sanitizeText } from "../../../lib/mocktest";
import useStudyProgress from "../../hooks/useStudyProgress";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import ChapterLayout, { CHAPTER_SECTIONS } from "../ChapterLayout";
import {
  OBSERVER_THRESHOLDS,
  createAutoProgressTracker,
  findRenderedSections,
  isSectionCompleted,
  isSectionViewed,
  normalizeSectionId,
  pickActiveSectionId,
  sectionsAtReadingLine,
} from "../../../lib/study/chapterSections.mjs";
import ChapterSection from "../ChapterSection";
import ChapterContentEngine from "../content/ChapterContentEngine";
import { classIXJavaChapters } from "../../data/javaCurriculum";

import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import SegmentedProgress from "./SegmentedProgress";
import QuestionSection from "./QuestionSection";

export default function StudyChapter({ slug, markdownContent = null, questionBank = null, className = null }) {
  const chapters = useMemo(() => {
    if (className === "ICSE IX") {
      return classIXJavaChapters.map((item) => resolveStudyChapter(item.slug)).filter(Boolean);
    }
    return getStudyChapters() || [];
  }, [className]);
  const chapter = useMemo(() => resolveStudyChapter(slug), [slug]);

  const [search, setSearch] = useState("");
  const { progress, updateProgress } = useStudyProgress();
  const { addRecentlyViewed } = useRecentlyViewed();
  
  // Section state is tagged with the slug it was measured for, so viewed
  // sections from a previous chapter can never leak into the next one when the
  // route param changes without a remount.
  const [sectionState, setSectionState] = useState({ slug: null, available: null, viewed: [] });
  const completedSections = useMemo(
    () => (sectionState.slug === slug ? sectionState.viewed : []),
    [sectionState, slug]
  );
  const availableSectionIds = sectionState.slug === slug ? sectionState.available : null;
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const renderedSectionsRef = useRef([]);
  const renderedSlugRef = useRef(null);
  const [autoProgress] = useState(createAutoProgressTracker);
  const contentRef = useRef(null);

  // Safely parse markdownContent if passed as JSON string
  const richContent = useMemo(() => {
    if (!markdownContent) return null;
    if (typeof markdownContent === "string") {
      try {
        return JSON.parse(markdownContent);
      } catch {
        return null;
      }
    }
    return markdownContent;
  }, [markdownContent]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ChapterLayout already scrolls to the element; this only records the active
  // section. Canonical ids are the bare rendered ids ("theory"); legacy
  // "section-theory" values are normalised.
  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(normalizeSectionId(sectionId));
  }, []);

  // Track scroll position for progress bar and active section
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const total = scrollHeight - clientHeight;
        const currentProgress = total > 0 ? (scrollTop / total) * 100 : 0;
        setReadingProgress(Math.min(currentProgress, 100));
      }

      const rendered = renderedSectionsRef.current;
      if (rendered.length > 0) {
        const activeId = pickActiveSectionId(
          rendered.map(({ id, element }) => ({ id, top: element.getBoundingClientRect().top }))
        );
        if (activeId) setActiveSection(activeId);

        // Very tall sections never cross another IntersectionObserver threshold,
        // so also count a section as viewed once it covers the reading line.
        const atLine = sectionsAtReadingLine(
          rendered.map(({ id, element }) => {
            const rect = element.getBoundingClientRect();
            return { id, top: rect.top, bottom: rect.bottom };
          }),
          window.innerHeight
        );
        if (atLine.length > 0) {
          setSectionState((previous) => {
            if (previous.slug !== renderedSlugRef.current) return previous;
            const added = atLine.filter((id) => !previous.viewed.includes(id));
            return added.length ? { ...previous, viewed: [...previous.viewed, ...added] } : previous;
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Practice questions come from the real chapter question bank (already scoped to
  // this chapter on the server). The old placeholder data file held unrelated
  // algorithm questions whose "Solve" links led to 404 pages.
  const chapterQuestions = useMemo(() => {
    if (!questionBank) return [];
    if (Array.isArray(questionBank)) return questionBank;
    try {
      const parsed = JSON.parse(questionBank);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [questionBank]);

  // Track recently viewed once when slug changes (fixed dependency loop)
  useEffect(() => {
    if (slug && typeof addRecentlyViewed === "function") {
      addRecentlyViewed(slug);
    }
  }, [slug]);

  // Discover the sections that are really rendered (canonical bare ids), then
  // observe exactly those elements. Missing optional sections are simply absent.
  useEffect(() => {
    if (!slug || !chapter) return undefined;

    autoProgress.reset(); // new chapter visit: drop applied status and any manual override
    const rendered = findRenderedSections((id) => document.getElementById(id));
    renderedSectionsRef.current = rendered;
    renderedSlugRef.current = slug;
    setSectionState({ slug, available: rendered.map((item) => item.id), viewed: [] });
    setActiveSection((previous) =>
      rendered.some((item) => item.id === previous) ? previous : rendered[0]?.id ?? null
    );

    // Legacy deep links (#section-theory) resolve to the canonical id.
    const hashId = normalizeSectionId(window.location.hash);
    if (hashId) {
      const target = document.getElementById(hashId);
      if (target) target.scrollIntoView({ block: "start" });
    }

    if (typeof IntersectionObserver === "undefined" || rendered.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter(isSectionViewed).map((entry) => normalizeSectionId(entry.target.id));
        if (seen.length === 0) return;
        setSectionState((previous) => {
          if (previous.slug !== slug) return previous;
          const added = seen.filter((id, index) => !previous.viewed.includes(id) && seen.indexOf(id) === index);
          return added.length ? { ...previous, viewed: [...previous.viewed, ...added] } : previous;
        });
      },
      { threshold: OBSERVER_THRESHOLDS }
    );
    rendered.forEach((item) => observer.observe(item.element));

    return () => {
      observer.disconnect();
      renderedSectionsRef.current = [];
      renderedSlugRef.current = null;
    };
  }, [slug, chapter, markdownContent, questionBank, autoProgress]);

  // Reading can advance the stored status (never downgrade, never repeat, never
  // override a manual choice). Rules live in decideAutoProgress().
  useEffect(() => {
    if (!slug || !availableSectionIds) return;
    const next = autoProgress.evaluate({
      renderedIds: availableSectionIds,
      viewedIds: completedSections,
      currentStatus: progress[slug] ?? "Not Started",
    });
    if (!next) return;
    updateProgress(slug, next);
  }, [availableSectionIds, completedSections, slug, progress, updateProgress, autoProgress]);

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
  const studyData = chapter.studyData || {};

  const safeSearch = sanitizeText(search).toLowerCase();
  const hasSearchResults = safeSearch ? searchInContent(studyData, safeSearch) : true;

  const readingSections = CHAPTER_SECTIONS
    .filter((s) => {
      const data = getSectionData(studyData, s.id);
      return data && (Array.isArray(data) ? data.length > 0 : data);
    })
    .map((s) => ({
      id: s.id,
      label: s.label,
      completed: isSectionCompleted(completedSections, s.id),
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
      availableSectionIds={availableSectionIds}
      onSectionChange={scrollToSection}
      completedSections={completedSections}
      sectionTimes={sectionTimes}
      showBackToTop={showBackToTop}
      onBackToTop={scrollToTop}
      catalogHref={className === "ICSE IX" ? "/Java?class=IX" : "/Java"}
      chapterQuery={className === "ICSE IX" ? "?class=IX" : ""}
    >
      <div ref={contentRef}>
        {/* Chapter Header / Hero Section */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 mb-8" id="chapter-header">
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
              {studyData.intro && (
                <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">{studyData.intro}</p>
              )}
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
                    onClick={() => { autoProgress.markManual(); updateProgress(slug, option); }}
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

        {/* Chapter Content Engine */}
        <ChapterContentEngine
          chapter={chapter}
          content={richContent}
          questions={questionBank}
          completedSections={completedSections}
        />

        {/* Prerequisites: render only when the chapter has real prerequisite links. */}
        {studyData.prerequisites && studyData.prerequisites.length > 0 && (
          <ChapterSection
            id="prerequisites"
            title="Prerequisites"
            icon={<ChevronDoubleRightIcon className="w-5 h-5" />}
            estimatedTime={2}
            isCompleted={isSectionCompleted(completedSections, "prerequisites")}
          >
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
          </ChapterSection>
        )}

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

        {/* Overview: render only when genuine introductory content exists. */}
        {studyData.intro && (
          <ChapterSection
            id="overview"
            title="Overview"
            icon={<BookOpenIcon className="w-5 h-5" />}
            estimatedTime={5}
            isCompleted={isSectionCompleted(completedSections, "overview")}
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{studyData.intro}</p>
          </ChapterSection>
        )}

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

function searchInContent(studyData, query) {
  if (!query || !studyData) return true;
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
    ...(studyData.faqs ? studyData.faqs.map((f) => `${f.question} ${f.answer}`) : []),
    ...(studyData.syntax ? studyData.syntax.map((s) => `${s.title} ${s.code}`) : []),
  ];
  return fields.some((f) => f && f.toLowerCase().includes(query));
}

function getSectionData(studyData, sectionId) {
  if (!studyData) return null;
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
