"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getStudyChapterBySlug } from "../../../lib/studyCenter";
import { sanitizeText } from "../../../lib/mocktest";
import useStudyProgress from "../../hooks/useStudyProgress";

export default function StudyChapter({ slug }) {
  const chapter = useMemo(() => getStudyChapterBySlug(slug), [slug]);
  const [search, setSearch] = useState("");
  const { progress, updateProgress } = useStudyProgress();

  if (!chapter) {
    return null;
  }

  const status = progress[slug] ?? "Not Started";
  const studyData = chapter.studyData;
  const searchableContent = [
    studyData.intro,
    ...studyData.concepts,
    ...studyData.definitions,
    ...studyData.notes,
    ...studyData.mistakes,
    ...studyData.tips,
    studyData.summary,
  ]
    .join(" ")
    .toLowerCase();

  const safeSearch = sanitizeText(search).toLowerCase();
  const filteredNotes = safeSearch
    ? [studyData.intro, ...studyData.notes, studyData.summary].filter((note) =>
        sanitizeText(note).toLowerCase().includes(safeSearch)
      )
    : [studyData.intro, ...studyData.notes, studyData.summary];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Study Chapter</p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">{chapter.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">{studyData.intro}</p>
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
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="text-sm font-semibold text-gray-900" htmlFor="chapter-search">
          <span className="mb-2 block">Search notes</span>
          <input
            id="chapter-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="Search within notes"
          />
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Key Concepts</h2>
            <div className="mt-4 grid gap-3">
              {studyData.concepts.map((concept) => (
                <div key={concept} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
                  {concept}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Important Definitions</h2>
            <div className="mt-4 grid gap-3">
              {studyData.definitions.map((definition) => (
                <div key={definition} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
                  {definition}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Quick Revision</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {studyData.notes.map((note) => (
                <div key={note} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Important Points</h2>
            <div className="mt-4 space-y-3">
              {studyData.mistakes.map((mistake) => (
                <div key={mistake} className="rounded-2xl border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
                  {mistake}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Exam Tips</h2>
            <div className="mt-4 space-y-3">
              {studyData.tips.map((tip) => (
                <div key={tip} className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-gray-700">
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Chapter Summary</h2>
            <p className="mt-4 text-sm leading-7 text-gray-700">{studyData.summary}</p>
            <Link href={`/java/${chapter.slug}`} className="mt-5 inline-flex rounded-xl border border-blue-300 bg-blue-100 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200">
              Practice This Chapter
            </Link>
          </div>
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
