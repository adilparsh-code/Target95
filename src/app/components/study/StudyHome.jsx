"use client";

import React from "react";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import { getStudyChapters, searchStudyContent } from "../../../lib/studyCenter";
import { getChapterPracticeUrl } from "../../../lib/practiceUrls";
import useStudyProgress from "../../hooks/useStudyProgress";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

function StudyHomeSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-24 rounded-3xl bg-gray-200" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-40 rounded-3xl bg-gray-200" />
        <div className="h-40 rounded-3xl bg-gray-200" />
      </div>
      <div className="mt-6 h-16 rounded-3xl bg-gray-200" />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 rounded-3xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

export default function StudyHome() {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const { progress } = useStudyProgress();
  const { recentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    try {
      const studyChapters = getStudyChapters();
      setChapters(studyChapters);
    } catch (e) {
      setError("Failed to load study chapters. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const continueLearningChapter = useMemo(() => {
    const studying = chapters.find((c) => progress[c.slug] === "Studying");
    if (studying) return studying;
    const notStarted = chapters.find((c) => !progress[c.slug] || progress[c.slug] === "Not Started");
    return notStarted;
  }, [chapters, progress]);

  const recentlyViewedChapters = useMemo(() => {
    return recentlyViewed.map((slug) => chapters.find((c) => c.slug === slug)).filter(Boolean);
  }, [recentlyViewed, chapters]);

  const filteredChapters = chapters.filter((chapter) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      chapter.title.toLowerCase().includes(query) ||
      chapter.slug.toLowerCase().includes(query) ||
      chapter.difficulty.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <StudyHomeSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-red-900">An Error Occurred</h1>
          <p className="mt-3 text-base leading-7 text-red-700">{error}</p>
        </div>
      </section>
    );
  }

  if (chapters.length === 0) {
    return (
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900">No Chapters Available</h1>
          <p className="mt-3 text-base leading-7 text-gray-700">There are currently no study chapters available. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="study-home-heading">
      <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">Study Center</p>
        <h1 id="study-home-heading" className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Learn Before You Practice</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
          Explore chapter notes, key concepts, and revision points before attempting practice questions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {continueLearningChapter && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
            <div className="mt-4 rounded-2xl bg-gray-50 p-4">
              <h3 className="text-lg font-semibold text-gray-900">{continueLearningChapter.title}</h3>
              <p className="mt-1 text-sm text-gray-700 line-clamp-2">{continueLearningChapter.studyData.intro}</p>
              <Link
                href={`/study/${continueLearningChapter.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Jump Back In <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {recentlyViewedChapters.length > 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
            <div className="mt-4 space-y-3">
              {recentlyViewedChapters.slice(0, 3).map((chapter) => (
                <Link key={chapter.slug} href={`/study/${chapter.slug}`} className="block rounded-lg p-3 hover:bg-gray-100">
                  <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                  <p className="text-sm text-gray-500">{chapter.difficulty}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <label className="sr-only" htmlFor="study-search">Search notes</label>
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          id="study-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-2xl border border-gray-300 bg-white p-4 pl-11 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          placeholder="Search by chapter, topic, or difficulty"
        />
      </div>

      {filteredChapters.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2" role="list" aria-label="Study chapters">
          {filteredChapters.map((chapter) => {
            const status = progress[chapter.slug] ?? "Not Started";
            const percentComplete = status === "Completed" ? 100 : status === "Studying" ? 60 : 0;

            return (
              <article key={chapter.slug} className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg" role="listitem" aria-labelledby={`${chapter.slug}-heading`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <BookOpenIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 id={`${chapter.slug}-heading`} className="text-lg font-bold text-gray-900">{chapter.title}</h2>
                      <p className="mt-1 text-sm text-gray-600">{chapter.difficulty}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800">
                    {status}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-sm text-gray-600">Questions</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">{chapter.totalQuestions}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-sm text-gray-600">Study Time</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">{chapter.estimatedStudyTime}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">{chapter.easyCount} easy</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-600">
                    <span>Reading Progress</span>
                    <span>{percentComplete}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${percentComplete}%` }} />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/study/${chapter.slug}`}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    {status === "Not Started" ? "Start Studying" : "Continue Studying"}
                  </Link>
                  <Link
                    href={getChapterPracticeUrl(chapter)}
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                  >
                    Practice Questions
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">No Chapters Found</h2>
          <p className="mt-2 text-base text-gray-600">Your search for &ldquo;{search}&rdquo; did not match any chapters.</p>
        </div>
      )}
    </section>
  );
}