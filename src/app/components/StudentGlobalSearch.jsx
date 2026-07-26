"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStudyChapters } from "../../lib/studyCenter";
import { questions as practiceQuestions } from "../data/questions";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const typeIcons = {
  topic: "📚",
  chapter: "📖",
  question: "❓",
  subject: "📘",
};

const typeColors = {
  topic: "text-blue-600 bg-blue-50",
  chapter: "text-emerald-600 bg-emerald-50",
  question: "text-amber-600 bg-amber-50",
  subject: "text-indigo-600 bg-indigo-50",
};

export default function StudentGlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const router = useRouter();
  const chapters = useMemo(() => getStudyChapters(), []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const term = query.toLowerCase();
    const matched = [];

    chapters.forEach((chapter) => {
      const searchText = [
        chapter.title,
        chapter.slug,
        chapter.studyData?.intro || "",
        ...(chapter.studyData?.concepts || []),
        ...(chapter.studyData?.definitions || []),
        ...(chapter.studyData?.notes || []),
      ]
        .join(" ")
        .toLowerCase();

      if (searchText.includes(term)) {
        matched.push({
          id: `chapter-${chapter.slug}`,
          title: chapter.title,
          description: chapter.studyData?.intro || "",
          href: `/study/${chapter.slug}`,
          type: "chapter",
          chapter: chapter.slug,
        });
      }

      if (chapter.studyData?.concepts) {
        chapter.studyData.concepts.forEach((concept, idx) => {
          if (concept.toLowerCase().includes(term)) {
            matched.push({
              id: `concept-${chapter.slug}-${idx}`,
              title: concept,
              description: `Concept in ${chapter.title}`,
              href: `/study/${chapter.slug}`,
              type: "topic",
              chapter: chapter.slug,
            });
          }
        });
      }
    });

    practiceQuestions.forEach((q, idx) => {
      const searchText = [
        q.title,
        q.question,
        q.chapter,
        q.subject,
        ...(q.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      if (searchText.includes(term)) {
        matched.push({
          id: `question-${q.slug || idx}`,
          title: q.title,
          description: `${q.chapter} · ${q.difficulty} · ${q.type}`,
          href: `/Java/${q.chapter.toLowerCase().replace(/\s+/g, "-")}`,
          type: "question",
          chapter: q.chapter,
          difficulty: q.difficulty,
        });
      }
    });

    setResults(matched.slice(0, 12));
    setSelectedIndex(-1);
  }, [query, chapters]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      router.push(results[selectedIndex].href);
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search topics, chapters, questions..."
            className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            aria-label="Search topics, chapters, and questions"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-50 rounded border border-gray-200">
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  index === selectedIndex
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                    typeColors[item.type] || "bg-gray-50 text-gray-600"
                  }`}
                >
                  {typeIcons[item.type] || "📄"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 truncate">{item.description}</p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-300 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm font-medium text-gray-900">No results found</p>
            <p className="text-xs text-gray-500 mt-1">Try searching for a topic, chapter, or keyword</p>
          </div>
        )}

        {!query.trim() && (
          <div className="p-6 text-center">
            <p className="text-2xl mb-2">🔎</p>
            <p className="text-sm text-gray-500">Start typing to search across topics, chapters, and questions</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Variables</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Loops</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Arrays</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Inheritance</span>
            </div>
          </div>
        )}

        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">↑↓</kbd> Navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">↵</kbd> Open
              </span>
            </div>
            {results.length > 0 && (
              <span className="text-xs text-gray-400">{results.length} result{results.length > 1 ? "s" : ""}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
