"use client";

import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import DifficultyBadge from "./DifficultyBadge";
import useBookmarks from "../hooks/useBookmarks";

export default function BookmarksList({ questions }) {
  const { bookmarks } = useBookmarks();
  const bookmarkedQuestions = bookmarks.flatMap((bookmark) => {
    const question = questions.find(
      (item) => item.chapter === bookmark.chapter && item.id === bookmark.questionId
    );
    return question ? [{ bookmark, question }] : [];
  });

  return (
    <main className="min-h-screen bg-slate-100 py-16">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-lg md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Bookmarked Questions</h1>
            <p className="mt-3 text-gray-700">Keep your important questions ready for revision. You have {bookmarkedQuestions.length} bookmarked {bookmarkedQuestions.length === 1 ? "question" : "questions"}.</p>
          </div>
        </div>

        {bookmarkedQuestions.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {bookmarkedQuestions.map(({ bookmark, question }) => (
              <article key={`${bookmark.chapter}-${bookmark.questionId}`} className="relative flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">📚 {bookmark.chapter.replaceAll("-", " ")}</span>
                    <DifficultyBadge difficulty={question.difficulty} />
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">{question.type}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Question {question.id}</h2>
                  <p className="mt-2 text-gray-700 line-clamp-2">{question.question}</p>
                </div>

                <div className="flex items-center justify-between p-6 pt-0 gap-4">
                  <Link
                    href={`/practice/setup?chapter=${encodeURIComponent(bookmark.chapter)}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-xl bg-blue-600 text-white font-medium transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Practice ${question.chapter} questions`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1.5 1.5 0 008 8v4a1.5 1.5 0 001.555.832l3-2a1.5 1.5 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    Practice Topic
                  </Link>
                  <BookmarkButton chapter={bookmark.chapter} questionId={question.id} className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl border border-gray-200 p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition" aria-label="Remove bookmark" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-3xl border-2 border-dashed border-gray-300 bg-gradient-to-b from-gray-50 to-white py-20 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6"><svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg></div>
            <h2 className="text-2xl font-bold text-gray-900">No Bookmarked Questions Yet</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">Start bookmarking questions you want to revisit for revision. They'll appear here for easy access.</p>
            <Link href="/practice/setup" className="mt-8 inline-flex items-center justify-center min-h-[44px] rounded-xl bg-blue-600 px-8 py-3 text-white font-medium transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 000 2h5v5a1 1 0 002 0v-5h5a1 1 0 000-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              Start Practice
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
