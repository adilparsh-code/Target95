"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mockTestQuestions from "../data/mock-test/mockTestQuestions";
import { CATEGORIES, DIFFICULTIES } from "../../lib/mocktest";

const SUBJECTS = [
  { id: "all", label: "All Subjects" },
  { id: "Computer Science", label: "Computer Science" },
];

const CHAPTERS = [
  { id: "all", label: "All Chapters" },
  { id: "introduction", label: "Introduction" },
  { id: "variables-data-types", label: "Variables & Data Types" },
  { id: "operators", label: "Operators" },
  { id: "if-else", label: "If-Else" },
  { id: "loops", label: "Loops" },
  { id: "methods", label: "Methods" },
  { id: "arrays", label: "Arrays" },
  { id: "strings", label: "Strings" },
  { id: "constructor", label: "Constructor" },
];

export default function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [favourites, setFavourites] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const filteredQuestions = useMemo(() => {
    return mockTestQuestions.filter((q) => {
      if (search) {
        const s = search.toLowerCase();
        if (!q.question.toLowerCase().includes(s) && !q.topic?.toLowerCase().includes(s) && !q.chapter?.toLowerCase().includes(s)) return false;
      }
      if (selectedCategory !== "all" && q.category !== selectedCategory) return false;
      if (selectedSubject !== "all" && q.subject !== selectedSubject) return false;
      if (selectedChapter !== "all" && q.chapter !== selectedChapter) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      if (selectedType !== "all" && q.type !== selectedType) return false;
      return true;
    });
  }, [search, selectedCategory, selectedSubject, selectedChapter, selectedDifficulty, selectedType]);

  const toggleFavourite = (id) => {
    setFavourites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getDifficultyColor = (d) => {
    if (d === "easy") return "bg-green-100 text-green-700";
    if (d === "medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getCategoryColor = (c) => {
    const colors = {
      "icse-class-9": "bg-purple-100 text-purple-700",
      "icse-class-10": "bg-blue-100 text-blue-700",
      "isc-class-11": "bg-orange-100 text-orange-700",
      "isc-class-12": "bg-pink-100 text-pink-700",
    };
    return colors[c] || "bg-gray-100 text-gray-700";
  };

  const getTypeLabel = (t) => {
    const labels = { mcq: "MCQ", theory: "Theory", programming: "Programming", output: "Output" };
    return labels[t] || t;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Question Bank</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Browse & Search Questions</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
            Search through {mockTestQuestions.length} questions across all classes, subjects, and chapters.
          </p>
        </div>

        {/* Search */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions, topics, or keywords..."
                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 outline-none focus:border-blue-600"
              >
                <option value="all">All Classes</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 outline-none focus:border-blue-600"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-blue-600"
            >
              {CHAPTERS.map((ch) => (
                <option key={ch.id} value={ch.id}>{ch.label}</option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-blue-600"
            >
              <option value="all">All Difficulties</option>
              {DIFFICULTIES.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-blue-600"
            >
              <option value="all">All Types</option>
              <option value="mcq">MCQ</option>
              <option value="theory">Theory</option>
              <option value="programming">Programming</option>
              <option value="output">Output</option>
            </select>
            <p className="flex items-center text-sm text-gray-700 ml-auto">
              {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCategoryColor(q.category)}`}>
                      {CATEGORIES.find((c) => c.id === q.category)?.label || q.category}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                      {getTypeLabel(q.type)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavourite(q.id)}
                    className="text-lg hover:scale-110 transition-transform"
                  >
                    {favourites[q.id] ? "⭐" : "☆"}
                  </button>
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-900 line-clamp-2">
                  {q.question}
                </p>

                <div className="mt-3 flex items-center gap-4 text-xs text-gray-700">
                  <span>📂 {CHAPTERS.find((c) => c.id === q.chapter)?.label || q.chapter}</span>
                  <span>⏱️ {q.estimatedTime}s</span>
                  <span>📊 {q.marks} mark{q.marks > 1 ? "s" : ""}</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedQuestion(selectedQuestion?.id === q.id ? null : q)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:border-gray-400 transition"
                  >
                    {selectedQuestion?.id === q.id ? "Hide Details" : "View Details"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: "Question", text: q.question });
                      } else {
                        navigator.clipboard.writeText(q.question);
                      }
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:border-gray-400 transition"
                  >
                    📤 Share
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedQuestion?.id === q.id && (
                  <div className="mt-4 space-y-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                    <div>
                      <p className="text-xs font-semibold text-blue-700 uppercase">Explanation</p>
                      <p className="mt-1 text-sm text-gray-900">{q.explanation}</p>
                    </div>
                    {q.hint && (
                      <div>
                        <p className="text-xs font-semibold text-blue-700 uppercase">Hint</p>
                        <p className="mt-1 text-sm text-gray-700">{q.hint}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-blue-700 uppercase">Correct Answer</p>
                      <p className="mt-1 text-sm font-semibold text-green-700">{q.answer}</p>
                    </div>
                    {q.options && (
                      <div>
                        <p className="text-xs font-semibold text-blue-700 uppercase">Options</p>
                        <ul className="mt-1 space-y-1">
                          {q.options.map((opt, i) => (
                            <li key={i} className={`text-sm ${opt === q.answer ? "font-semibold text-green-700" : "text-gray-700"}`}>
                              {opt === q.answer ? "✅ " : ""}{opt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="pt-2 border-t border-blue-200">
                      <p className="text-xs text-gray-700">
                        Related: {q.subject} • {CHAPTERS.find((c) => c.id === q.chapter)?.label || q.chapter} • {q.topic}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
            <p className="text-4xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-gray-900">No questions found</h2>
            <p className="mt-2 text-gray-700">Try adjusting your search or filters to find questions.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}