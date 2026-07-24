"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getStudyChapterBySlug, getStudyChapters } from "../../../lib/studyCenter";
import { sanitizeText } from "../../../lib/mocktest";
import useStudyProgress from "../../hooks/useStudyProgress";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";

import { BeakerIcon, BookOpenIcon, LightBulbIcon, ListBulletIcon, SparklesIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import CollapsibleSection from "./CollapsibleSection";
import NoteCard from "./NoteCard";
import TipCard from "./TipCard";
import WarningCard from "./WarningCard";
import ExampleCard from "./ExampleCard";

export default function StudyChapter({ slug }) {
  const chapters = useMemo(() => getStudyChapters(), []);
  const chapter = useMemo(() => chapters.find(c => c.slug === slug), [chapters, slug]);
  const [search, setSearch] = useState("");
  const { progress, updateProgress } = useStudyProgress();
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (slug) {
      addRecentlyViewed(slug);
    }
  }, [slug, addRecentlyViewed]);

  if (!chapter) {
    return null;
  }

  const currentIndex = chapters.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const status = progress[slug] ?? "Not Started";
  const studyData = chapter.studyData;
  const searchableContent = useMemo(() => [
    studyData.intro,
    ...(studyData.learningObjectives || []),
    ...studyData.concepts,
    ...studyData.definitions,
    ...studyData.notes,
    ...studyData.mistakes,
    ...studyData.tips,
    studyData.summary,
  ]
    .join(" ")
    .toLowerCase(), [studyData]);

  const safeSearch = sanitizeText(search).toLowerCase();
  const filteredNotes = safeSearch
    ? [studyData.intro, ...studyData.notes, studyData.summary].filter((note) =>
        sanitizeText(note).toLowerCase().includes(safeSearch)
      )
    : [studyData.intro, ...studyData.notes, studyData.summary];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="study-chapter-heading">
      <div className="flex justify-between items-center">
        {prevChapter ? (
          <Link href={`/study/${prevChapter.slug}`} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400">
            &larr; {prevChapter.title}
          </Link>
        ) : <div />}
        {nextChapter ? (
          <Link href={`/study/${nextChapter.slug}`} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400">
            {nextChapter.title} &rarr;
          </Link>
        ) : <div />}
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Study Chapter</p>
            <div className="flex items-center gap-4">
              <h1 id="study-chapter-heading" className="mt-3 text-3xl font-bold text-gray-900">{chapter.title}</h1>
              <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-gray-900">{chapter.difficulty}</span>
            </div>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">{studyData.intro}</p>
            <p className="mt-2 text-sm text-gray-600">Estimated study time: {chapter.estimatedStudyTime}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Study Status</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{status}</p>
            <div className="mt-3 flex gap-2">
              {(["Not Started", "Studying", "Completed"]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateProgress(slug, option)}
                  className={`rounded-full px-3 py-1 text-sm font-semibold transition ${status === option ? "bg-blue-100 text-gray-900" : "bg-white text-gray-700"}`}
                  aria-label={`Set status to ${option}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {studyData.learningObjectives && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Learning Objectives</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
            {studyData.learningObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {studyData.prerequisites && studyData.prerequisites.length > 0 && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Prerequisites</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {studyData.prerequisites.map((prereq) => {
              const prereqChapter = chapters.find(c => c.slug === prereq);
              return prereqChapter ? (
                <Link key={prereq} href={`/study/${prereq}`} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800 transition hover:bg-gray-200">
                  {prereqChapter.title}
                </Link>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="text-sm font-semibold text-gray-900" htmlFor="chapter-search">
          <span className="mb-2 block">Search notes</span>
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
              placeholder="Search within notes"
            />
          </div>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <CollapsibleSection title="Key Concepts" icon={BeakerIcon}>
            <div className="grid gap-3">
              {studyData.concepts.map((concept) => (
                <div key={concept} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
                  {concept}
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Important Definitions" icon={BookOpenIcon}>
            <div className="grid gap-3">
              {studyData.definitions.map((definition) => (
                <div key={definition} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
                  {definition}
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Quick Revision" icon={ListBulletIcon}>
            <div className="grid gap-3 md:grid-cols-2">
              {studyData.notes.map((note) => (
                <NoteCard key={note}>{note}</NoteCard>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        <div className="space-y-6">
          <CollapsibleSection title="Common Mistakes" icon={LightBulbIcon}>
            <div className="space-y-3">
              {studyData.mistakes.map((mistake) => (
                <WarningCard key={mistake}>{mistake}</WarningCard>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Exam Tips" icon={SparklesIcon}>
            <div className="space-y-3">
              {studyData.tips.map((tip) => (
                <TipCard key={tip}>{tip}</TipCard>
              ))}
            </div>
          </CollapsibleSection>

          {studyData.examples && (
            <CollapsibleSection title="Examples" icon={BeakerIcon}>
              <div className="space-y-3">
                {studyData.examples.map((example) => (
                  <ExampleCard key={example.title} title={example.title}>
                    {example.code}
                  </ExampleCard>
                ))}
              </div>
            </CollapsibleSection>
          )}

          <CollapsibleSection title="Chapter Summary" icon={CheckCircleIcon}>
            <p className="mt-4 text-sm leading-7 text-gray-700">{studyData.summary}</p>
            <Link href={`/java/${chapter.slug}`} className="mt-5 inline-flex rounded-xl border border-blue-300 bg-blue-100 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200">
              Practice This Chapter
            </Link>
          </CollapsibleSection>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Search Notes Results</h2>
        <div className="mt-4 space-y-3">
          {filteredNotes.map((note) => (
            <div key={note} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}