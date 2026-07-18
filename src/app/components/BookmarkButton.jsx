"use client";

import useBookmarks from "../hooks/useBookmarks";

export default function BookmarkButton({ chapter, questionId, className = "" }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmark = { chapter, questionId };
  const bookmarked = isBookmarked(bookmark);
  const label = bookmarked ? "Remove bookmark" : "Bookmark question";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleBookmark(bookmark);
      }}
      aria-label={label}
      aria-pressed={bookmarked}
      title={label}
      className={`rounded-full border p-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        bookmarked
          ? "border-blue-200 bg-blue-100 text-gray-900 hover:bg-blue-200"
          : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-gray-900"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M6 3h12v18l-6-4-6 4V3Z" />
      </svg>
    </button>
  );
}
