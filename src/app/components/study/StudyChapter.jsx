"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getStudyChapterBySlug, getStudyChapters } from "../../../lib/studyCenter";
import { sanitizeText } from "../../../lib/mocktest";
import useStudyProgress from "../../hooks/useStudyProgress";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import questionsData from "../../data/questions";

import {
  BeakerIcon,
  BookOpenIcon,
  LightBulbIcon,
  ListBulletIcon,
  SparklesIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import CollapsibleSection from "./CollapsibleSection";
import NoteCard from "./NoteCard";
import TipCard from "./TipCard";
import WarningCard from "./WarningCard";
import ExampleCard from "./ExampleCard";
import LoadingSpinner from "./LoadingSpinner";
import ReadingProgress from "./ReadingProgress";
import SegmentedProgress from "./SegmentedProgress";
import QuestionSection from "./QuestionSection";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Lazy load LearningContentEngine since it's heavy
const LearningContentEngine = dynamic(
  () => import("../learning/LearningContentEngine"),
  { loading: () => <LoadingSpinner /> }
);

const sectionIds = [
  { id: "learning-objectives", label: "Learning Objectives" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "key-concepts", label: "Key Concepts" },
  { id: "definitions", label: "Definitions" },
  { id: "syntax", label: "Syntax" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "exam-tips", label: "Exam Tips" },
  { id: "examples", label: "Examples" },
  { id: "important-exam-points", label: "Important Exam Points" },
  { id: "quick-revision", label: "Quick Revision" },
  { id: "faqs", label: "FAQs" },
  { id: "summary", label: "Summary" },
];

export default function StudyChapter({ slug }) {
  const chapters = useMemo(() => getStudyChapters(), []);
  const chapter = useMemo(() => chapters.find((c) => c.slug === slug), [chapters, slug]);
  const [search, setSearch] = useState("");
  const { progress, updateProgress } = useStudyProgress();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [completedSections, setCompletedSections] = useState([]);

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
              if (updated.length >= sectionIds.length) {
                updateProgress(slug, "Completed");
              }
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = sectionIds
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

  const safeSearch = sanitizeText(search).toLowerCase();
  const hasSearchResults = safeSearch
    ? searchInContent(studyData, safeSearch)
    : true;

  // Render section check helper for search highlighting
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? `<mark class="bg-yellow-200 rounded px-0.5">${part}</mark>`
        : part
    ).join("");
  };

  const readingSections = sectionIds
    .filter((s) => {
      const data = getSectionData(studyData, s.id);
      return data && (Array.isArray(data) ? data.length > 0 : data);
    })
    .map((s) => ({
      id: s.id,
      label: s.label,
      completed: completedSections.includes(`section-${s.id}`),
    }));

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="study-chapter-heading">
      {/* Previous / Next Chapter Navigation */}
      <div className="flex justify-between items-center">
        {prevChapter ? (
          <Link
            href={`/study/${prevChapter.slug}`}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            <span className="hidden sm:inline">{prevChapter.title}</span>
            <span className="sm:hidden">Previous</span>
          </Link>
        ) : (
          <div />
        )}
        {nextChapter ? (
          <Link
            href={`/study/${nextChapter.slug}`}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400"
          >
            <span className="hidden sm:inline">{nextChapter.title}</span>
            <span className="sm:hidden">Next</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Reading Progress */}
      <ReadingProgress slug={slug} sections={readingSections} />

      {/* Chapter Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8" id="section-learning-objectives">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Study Chapter</p>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 id="study-chapter-heading" className="mt-3 text-3xl font-bold text-gray-900">
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
              <SegmentedProgress status={status} />
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

      {/* Learning Objectives */}
      {studyData.learningObjectives && studyData.learningObjectives.length > 0 && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm" id="section-learning-objectives-content">
          <CollapsibleSection title="Learning Objectives" icon={AcademicCapIcon}>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
              {studyData.learningObjectives.map((objective, idx) => (
                <li key={idx}>{objective}</li>
              ))}
            </ul>
          </CollapsibleSection>
        </div>
      )}

      {/* Prerequisites */}
      {studyData.prerequisites && studyData.prerequisites.length > 0 && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm" id="section-prerequisites">
          <CollapsibleSection title="Prerequisites" icon={ChevronDoubleRightIcon}>
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
          </CollapsibleSection>
        </div>
      )}

      {/* Search within notes */}
      <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
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

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {/* Key Concepts */}
          {studyData.concepts && studyData.concepts.length > 0 && (
            <div id="section-key-concepts">
              <CollapsibleSection title="Key Concepts" icon={BeakerIcon}>
                <div className="grid gap-3">
                  {studyData.concepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700"
                    >
                      {concept}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Important Definitions */}
          {studyData.definitions && studyData.definitions.length > 0 && (
            <div id="section-definitions">
              <CollapsibleSection title="Important Definitions" icon={BookOpenIcon}>
                <div className="grid gap-3">
                  {studyData.definitions.map((definition, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700"
                    >
                      {definition}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Syntax */}
          {studyData.syntax && studyData.syntax.length > 0 && (
            <div id="section-syntax">
              <CollapsibleSection title="Syntax" icon={BookOpenIcon}>
                <div className="space-y-4">
                  {studyData.syntax.map((s, idx) => (
                    <div key={idx} className="rounded-2xl border border-gray-200 bg-gray-900 overflow-hidden">
                      {s.title && (
                        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <p className="text-xs font-semibold text-gray-300">{s.title}</p>
                        </div>
                      )}
                      <SyntaxHighlighter
                        language="java"
                        style={a11yDark}
                        showLineNumbers
                        customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.85rem" }}
                      >
                        {s.code}
                      </SyntaxHighlighter>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Quick Revision */}
          {studyData.quickRevision && studyData.quickRevision.length > 0 && (
            <div id="section-quick-revision">
              <CollapsibleSection title="Quick Revision" icon={ListBulletIcon}>
                <div className="grid gap-3 md:grid-cols-2">
                  {studyData.quickRevision.map((note, idx) => (
                    <NoteCard key={idx}>{note}</NoteCard>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* FAQs */}
          {studyData.faqs && studyData.faqs.length > 0 && (
            <div id="section-faqs">
              <CollapsibleSection title="Frequently Asked Questions" icon={QuestionMarkCircleIcon}>
                <div className="space-y-4">
                  {studyData.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="rounded-2xl border border-gray-200 bg-slate-50 overflow-hidden"
                    >
                      <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                        {faq.question}
                      </summary>
                      <div className="px-4 pb-3 text-sm text-gray-700 leading-relaxed border-t border-gray-200 pt-3 mt-0">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Common Mistakes */}
          {studyData.commonMistakes && studyData.commonMistakes.length > 0 && (
            <div id="section-common-mistakes">
              <CollapsibleSection title="Common Mistakes" icon={ExclamationTriangleIcon}>
                <div className="space-y-3">
                  {studyData.commonMistakes.map((mistake, idx) => (
                    <WarningCard key={idx}>{mistake}</WarningCard>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Exam Tips */}
          {studyData.tips && studyData.tips.length > 0 && (
            <div id="section-exam-tips">
              <CollapsibleSection title="Exam Tips" icon={SparklesIcon}>
                <div className="space-y-3">
                  {studyData.tips.map((tip, idx) => (
                    <TipCard key={idx}>{tip}</TipCard>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Mistakes (original) */}
          {studyData.mistakes && studyData.mistakes.length > 0 && (
            <div>
              <CollapsibleSection title="Common Pitfalls" icon={LightBulbIcon}>
                <div className="space-y-3">
                  {studyData.mistakes.map((mistake, idx) => (
                    <WarningCard key={idx}>{mistake}</WarningCard>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Examples */}
          {studyData.examples && studyData.examples.length > 0 && (
            <div id="section-examples">
              <CollapsibleSection title="Examples" icon={BeakerIcon}>
                <div className="space-y-3">
                  {studyData.examples.map((example, idx) => (
                    <ExampleCard key={idx} title={example.title}>
                      {example.code}
                    </ExampleCard>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Important Exam Points */}
          {studyData.importantExamPoints && studyData.importantExamPoints.length > 0 && (
            <div id="section-important-exam-points">
              <CollapsibleSection title="Important Exam Points" icon={AcademicCapIcon}>
                <div className="space-y-2">
                  {studyData.importantExamPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900"
                    >
                      <span className="font-bold">&#9733; </span>
                      {point}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Chapter Summary */}
          {studyData.summary && (
            <div id="section-summary">
              <CollapsibleSection title="Chapter Summary" icon={CheckCircleIcon}>
                <p className="mt-4 text-sm leading-7 text-gray-700">{studyData.summary}</p>
                <Link
                  href={`/java/${chapter.slug}`}
                  className="mt-5 inline-flex items-center gap-1 rounded-xl border border-blue-300 bg-blue-100 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200"
                >
                  Practice This Chapter
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </CollapsibleSection>
            </div>
          )}
        </div>
      </div>

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

      {/* Next / Previous Chapter Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        {prevChapter ? (
          <Link
            href={`/study/${prevChapter.slug}`}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-400"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            {prevChapter.title}
          </Link>
        ) : (
          <div />
        )}
        {nextChapter ? (
          <Link
            href={`/study/${nextChapter.slug}`}
            className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {nextChapter.title}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
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
    "learning-objectives": studyData.learningObjectives,
    "prerequisites": studyData.prerequisites,
    "key-concepts": studyData.concepts,
    "definitions": studyData.definitions,
    "syntax": studyData.syntax,
    "common-mistakes": studyData.commonMistakes || studyData.mistakes,
    "exam-tips": studyData.tips,
    "examples": studyData.examples,
    "important-exam-points": studyData.importantExamPoints,
    "quick-revision": studyData.quickRevision,
    "faqs": studyData.faqs,
    "summary": studyData.summary,
  };
  return map[sectionId];
}