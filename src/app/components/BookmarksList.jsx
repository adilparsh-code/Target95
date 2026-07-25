"use client";

import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import useBookmarks from "../hooks/useBookmarks";

export default function BookmarksList({ questions }) {
  const { bookmarks } = useBookmarks();
  const bookmarkedQuestions = bookmarks.flatMap((bookmark) => {
    const question = questions.find(
      (item) =>
        item.chapter === bookmark.chapter && item.id === bookmark.questionId
    );

    return question ? [{ bookmark, question }] : [];
  });

  return (
    <main className="min-h-screen bg-slate-100 py-16">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-lg md:p-10">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          Bookmarked Questions
        </h1>
        <p className="mt-3 text-gray-700">
          Keep your important questions ready for revision.
        </p>

        {bookmarkedQuestions.length > 0 ? (
          <div className="mt-10 space-y-5">
            {bookmarkedQuestions.map(({ bookmark, question }) => (
              <div
                key={`${bookmark.chapter}-${bookmark.questionId}`}
                className="relative rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-blue-500 hover:shadow-lg"
              >
                <Link
                  href={`/java/${bookmark.chapter}/question/${question.id}`}
                  className="block p-5 pr-16"
                >
                  <p className="text-sm font-semibold uppercase text-gray-700">
                    {bookmark.chapter.replaceAll("-", " ")} · {question.type}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-gray-800">
                    Question {question.id}
                  </h2>
                  <p className="mt-2 text-gray-700">{question.question}</p>
                </Link>

                <BookmarkButton
                  chapter={bookmark.chapter}
                  questionId={question.id}
                  className="absolute right-5 top-5"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No Bookmarked Questions
            </h2>
            <p className="mt-2 text-gray-700">
              Bookmark a question to revisit it here.
            </p>
            <Link
              href="/java"
              className="mt-6 inline-block rounded-xl bg-blue-100 px-6 py-3 text-gray-900 transition hover:bg-blue-200"
            >
              Explore Java Questions
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
