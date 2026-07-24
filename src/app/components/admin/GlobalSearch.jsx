"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const searchableData = {
  questions: [
    { id: 1, title: "Binary Search Algorithm", href: "/admin/questions", type: "Question" },
    { id: 2, title: "Bubble Sort Algorithm", href: "/admin/questions", type: "Question" },
    { id: 3, title: "Linked List Implementation", href: "/admin/questions", type: "Question" },
    { id: 4, title: "Stack Using Arrays", href: "/admin/questions", type: "Question" },
    { id: 5, title: "Queue Using Linked List", href: "/admin/questions", type: "Question" },
    { id: 6, title: "Factorial using Recursion", href: "/admin/questions", type: "Question" },
    { id: 7, title: "Fibonacci Sequence", href: "/admin/questions", type: "Question" },
    { id: 8, title: "Binary Tree Traversal", href: "/admin/questions", type: "Question" },
    { id: 9, title: "Check for BST", href: "/admin/questions", type: "Question" },
    { id: 10, title: "Dijkstra's Algorithm", href: "/admin/questions", type: "Question" },
  ],
  subjects: [
    { id: 1, title: "Computer Science", href: "/admin/subjects", type: "Subject" },
    { id: 2, title: "Physics", href: "/admin/subjects", type: "Subject" },
    { id: 3, title: "Chemistry", href: "/admin/subjects", type: "Subject" },
    { id: 4, title: "Mathematics", href: "/admin/subjects", type: "Subject" },
    { id: 5, title: "Biology", href: "/admin/subjects", type: "Subject" },
    { id: 6, title: "English", href: "/admin/subjects", type: "Subject" },
  ],
  chapters: [
    { id: 1, title: "Chapter 1 — Fundamentals", href: "/admin/chapters", type: "Chapter" },
    { id: 2, title: "Chapter 2 — Operators", href: "/admin/chapters", type: "Chapter" },
    { id: 3, title: "Chapter 3 — Conditionals", href: "/admin/chapters", type: "Chapter" },
    { id: 4, title: "Chapter 4 — Loops", href: "/admin/chapters", type: "Chapter" },
    { id: 5, title: "Chapter 5 — Methods", href: "/admin/chapters", type: "Chapter" },
    { id: 6, title: "Chapter 6 — Arrays", href: "/admin/chapters", type: "Chapter" },
    { id: 7, title: "Chapter 7 — String Handling", href: "/admin/chapters", type: "Chapter" },
    { id: 8, title: "Chapter 8 — Constructors", href: "/admin/chapters", type: "Chapter" },
    { id: 9, title: "Chapter 9 — Inheritance", href: "/admin/chapters", type: "Chapter" },
  ],
  students: [
    { id: "S001", title: "Rahul Sharma", href: "/admin/students/S001", type: "Student" },
    { id: "S002", title: "Priya Patel", href: "/admin/students/S002", type: "Student" },
    { id: "S003", title: "Amit Singh", href: "/admin/students/S003", type: "Student" },
    { id: "S004", title: "Sneha Reddy", href: "/admin/students/S004", type: "Student" },
    { id: "S005", title: "Vikram Joshi", href: "/admin/students/S005", type: "Student" },
  ],
  pages: [
    { title: "Dashboard", href: "/admin", type: "Page" },
    { title: "Question Bank", href: "/admin/questions", type: "Page" },
    { title: "Subjects", href: "/admin/subjects", type: "Page" },
    { title: "AI Generator", href: "/admin/ai-generator", type: "Page" },
    { title: "Chapters", href: "/admin/chapters", type: "Page" },
    { title: "Study Notes", href: "/admin/study-notes", type: "Page" },
    { title: "Mock Tests", href: "/admin/mock-tests", type: "Page" },
    { title: "Students", href: "/admin/students", type: "Page" },
    { title: "Teachers", href: "/admin/teachers", type: "Page" },
    { title: "Analytics", href: "/admin/analytics", type: "Page" },
    { title: "Settings", href: "/admin/settings", type: "Page" },
  ],
};

const typeIcons = {
  Question: "❓",
  Subject: "📚",
  Chapter: "📖",
  Student: "👨‍🎓",
  Page: "📄",
};

const typeColors = {
  Question: "text-blue-600 bg-blue-50",
  Subject: "text-indigo-600 bg-indigo-50",
  Chapter: "text-emerald-600 bg-emerald-50",
  Student: "text-violet-600 bg-violet-50",
  Page: "text-gray-600 bg-gray-50",
};

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const router = useRouter();

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

  const performSearch = useCallback((q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const term = q.toLowerCase();
    const allItems = [
      ...searchableData.questions,
      ...searchableData.subjects,
      ...searchableData.chapters,
      ...searchableData.students,
      ...searchableData.pages,
    ];

    const filtered = allItems
      .filter((item) => item.title.toLowerCase().includes(term))
      .slice(0, 10);

    setResults(filtered);
    setSelectedIndex(-1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 150);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      {/* Search Panel */}
      <div
        className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search questions, subjects, chapters, students..."
            className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            aria-label="Global search"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-50 rounded border border-gray-200">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((item, index) => (
              <Link
                key={`${item.type}-${item.id || item.title}`}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  index === selectedIndex
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${typeColors[item.type] || "bg-gray-50 text-gray-600"}`}>
                  {typeIcons[item.type] || "📄"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.type}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.trim() && results.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm font-medium text-gray-900">No results found</p>
            <p className="text-xs text-gray-500 mt-1">Try a different search term</p>
          </div>
        )}

        {/* Hint */}
        {!query.trim() && (
          <div className="p-8 text-center">
            <p className="text-3xl mb-2">🔎</p>
            <p className="text-sm text-gray-500">Type to search across the admin panel</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">↵</kbd> Open</span>
            <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}