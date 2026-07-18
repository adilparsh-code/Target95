"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BOOKMARKS_STORAGE_KEY = "target95-bookmarks";
const BOOKMARKS_UPDATED_EVENT = "target95-bookmarks-updated";

function getBookmarkKey({ chapter, questionId }) {
  return `${chapter}:${questionId}`;
}

function readBookmarks() {
  try {
    const savedBookmarks = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);

    if (!savedBookmarks) {
      return [];
    }

    const parsedBookmarks = JSON.parse(savedBookmarks);

    return Array.isArray(parsedBookmarks)
      ? parsedBookmarks.filter(
          (bookmark) =>
            typeof bookmark?.chapter === "string" &&
            Number.isFinite(bookmark?.questionId)
        )
      : [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks) {
  try {
    window.localStorage.setItem(
      BOOKMARKS_STORAGE_KEY,
      JSON.stringify(bookmarks)
    );
    window.dispatchEvent(new Event(BOOKMARKS_UPDATED_EVENT));
  } catch {
    // Keep the current session usable if browser storage is unavailable.
  }
}

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const bookmarksRef = useRef([]);

  const syncBookmarks = useCallback(() => {
    const savedBookmarks = readBookmarks();

    bookmarksRef.current = savedBookmarks;
    setBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === BOOKMARKS_STORAGE_KEY) {
        syncBookmarks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(BOOKMARKS_UPDATED_EVENT, syncBookmarks);
    const syncTimeout = window.setTimeout(syncBookmarks, 0);

    return () => {
      window.clearTimeout(syncTimeout);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(BOOKMARKS_UPDATED_EVENT, syncBookmarks);
    };
  }, [syncBookmarks]);

  const isBookmarked = useCallback(
    (bookmark) =>
      bookmarks.some(
        (savedBookmark) =>
          getBookmarkKey(savedBookmark) === getBookmarkKey(bookmark)
      ),
    [bookmarks]
  );

  const toggleBookmark = useCallback((bookmark) => {
    const bookmarkKey = getBookmarkKey(bookmark);
    const isSaved = bookmarksRef.current.some(
      (savedBookmark) => getBookmarkKey(savedBookmark) === bookmarkKey
    );
    const nextBookmarks = isSaved
      ? bookmarksRef.current.filter(
          (savedBookmark) => getBookmarkKey(savedBookmark) !== bookmarkKey
        )
      : [...bookmarksRef.current, bookmark];

    bookmarksRef.current = nextBookmarks;
    saveBookmarks(nextBookmarks);
    setBookmarks(nextBookmarks);
  }, []);

  const removeBookmark = useCallback((bookmark) => {
    const bookmarkKey = getBookmarkKey(bookmark);
    const nextBookmarks = bookmarksRef.current.filter(
      (savedBookmark) => getBookmarkKey(savedBookmark) !== bookmarkKey
    );

    bookmarksRef.current = nextBookmarks;
    saveBookmarks(nextBookmarks);
    setBookmarks(nextBookmarks);
  }, []);

  return { bookmarks, isBookmarked, removeBookmark, toggleBookmark };
}
