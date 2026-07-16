"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function ChapterQuestions({
  chapter,
  questions,
}) {

  const [search, setSearch] = useState("");

 const filteredQuestions = questions.filter((q) => {
  const keyword = search.toLowerCase();

  return (
    q.question.toLowerCase().includes(keyword) ||
    q.type.toLowerCase().includes(keyword) ||
    q.difficulty.toLowerCase().includes(keyword) ||
    String(q.id).includes(keyword)
  );
});

  return (    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="space-y-4">

        {filteredQuestions.length > 0 ? (

          filteredQuestions.map((q) => (

            <Link
              key={q.id}
              href={`/java/${chapter}/question/${q.id}`}
              className="block p-5 bg-slate-50 rounded-xl border hover:border-blue-500 hover:shadow-md transition"
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="font-bold text-lg text-gray-800">
                    Question {q.id}
                  </p>

                  <p className="text-gray-600 mt-1">
                    {q.question}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    q.type === "mcq"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {q.type.toUpperCase()}
                </span>

              </div>

            </Link>

          ))

        ) : (

          <div className="text-center py-10 text-gray-500">
            No questions found.
          </div>

        )}

      </div>
    </>
  );
}