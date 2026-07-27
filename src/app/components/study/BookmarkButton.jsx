"use client";

import { useState, useCallback } from "react";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";

const BOOKMARKS_STORAGE_KEY = "target95-bookmarks";

function getSavedBookmarks() {
  try {
    const saved = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks) {
  try {
    window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // Ignore storage failures
  }
}

export default function BookmarkButton({ questionId, chapter }) {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    return getSavedBookmarks().some((b) => b.questionId === questionId);
  });

  const toggleBookmark = useCallback(() => {
    const bookmarks = getSavedBookmarks();
    if (isBookmarked) {
      const updated = bookmarks.filter((b) => b.questionId !== questionId);
      saveBookmarks(updated);
      setIsBookmarked(false);
    } else {
      const updated = [...bookmarks, { questionId, chapter, bookmarkedAt: Date.now() }];
      saveBookmarks(updated);
      setIsBookmarked(true);
    }
  }, [questionId, chapter, isBookmarked]);

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className={`rounded-xl p-2 transition ${
        isBookmarked
          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
    >
      {isBookmarked ? (
        <BookmarkSolid className="h-5 w-5" />
      ) : (
        <BookmarkOutline className="h-5 w-5" />
      )}
    </button>
  );
}