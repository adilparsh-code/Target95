"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useFirestore from "./useFirestore";

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

export default function useBookmarks(userId = null) {
  const [bookmarks, setBookmarks] = useState([]);
  const bookmarksRef = useRef([]);
  const { loading, error, queryDocuments, addDocument, deleteDocument, subscribeToCollection } = useFirestore();

  const syncLocalBookmarks = useCallback(() => {
    const savedBookmarks = readBookmarks();
    bookmarksRef.current = savedBookmarks;
    setBookmarks(savedBookmarks);
  }, []);

  // Fetch bookmarks from Firestore if userId is provided
  const fetchUserBookmarks = useCallback(async () => {
    if (!userId) {
      syncLocalBookmarks();
      return;
    }

    try {
      const firestoreBookmarks = await queryDocuments("bookmarks", [
        { field: "userId", operator: "==", value: userId }
      ]);
      bookmarksRef.current = firestoreBookmarks;
      setBookmarks(firestoreBookmarks);
      // Also save to localStorage for offline access
      saveBookmarks(firestoreBookmarks);
    } catch (err) {
      console.error("Error fetching bookmarks from Firestore:", err);
      // Fallback to localStorage
      syncLocalBookmarks();
    }
  }, [userId, queryDocuments, syncLocalBookmarks]);

  useEffect(() => {
    // If we have a userId, set up realtime subscription
    if (userId) {
      try {
        const unsubscribe = subscribeToCollection("bookmarks", (data) => {
          const userBookmarks = data.filter(bookmark => bookmark.userId === userId);
          bookmarksRef.current = userBookmarks;
          setBookmarks(userBookmarks);
          saveBookmarks(userBookmarks);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("Error subscribing to bookmarks:", err);
      }
    }

    // Always set up localStorage sync
    const handleStorageChange = (event) => {
      if (event.key === BOOKMARKS_STORAGE_KEY) {
        syncLocalBookmarks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(BOOKMARKS_UPDATED_EVENT, syncLocalBookmarks);
    const syncTimeout = window.setTimeout(syncLocalBookmarks, 0);

    return () => {
      window.clearTimeout(syncTimeout);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(BOOKMARKS_UPDATED_EVENT, syncLocalBookmarks);
    };
  }, [userId, subscribeToCollection, syncLocalBookmarks]);

  const isBookmarked = useCallback(
    (bookmark) =>
      bookmarks.some(
        (savedBookmark) =>
          getBookmarkKey(savedBookmark) === getBookmarkKey(bookmark)
      ),
    [bookmarks]
  );

  const toggleBookmark = useCallback(async (bookmark) => {
    const bookmarkKey = getBookmarkKey(bookmark);
    const isSaved = bookmarksRef.current.some(
      (savedBookmark) => getBookmarkKey(savedBookmark) === bookmarkKey
    );
    
    let nextBookmarks;
    if (isSaved) {
      // Remove from bookmarks
      nextBookmarks = bookmarksRef.current.filter(
        (savedBookmark) => getBookmarkKey(savedBookmark) !== bookmarkKey
      );
      
      // If we have userId, also delete from Firestore
      if (userId) {
        try {
          const existingBookmark = bookmarksRef.current.find(b => getBookmarkKey(b) === bookmarkKey);
          if (existingBookmark?.id) {
            await deleteDocument("bookmarks", existingBookmark.id);
          }
        } catch (err) {
          console.error("Error removing bookmark from Firestore:", err);
        }
      }
    } else {
      // Add to bookmarks
      const newBookmark = { ...bookmark, userId };
      nextBookmarks = [...bookmarksRef.current, newBookmark];
      
      // If we have userId, also add to Firestore
      if (userId) {
        try {
          const savedBookmark = await addDocument("bookmarks", newBookmark);
          // Replace temp bookmark with the one that has Firestore ID
          nextBookmarks = nextBookmarks.map(b => 
            getBookmarkKey(b) === bookmarkKey ? { ...b, id: savedBookmark.id } : b
          );
        } catch (err) {
          console.error("Error adding bookmark to Firestore:", err);
        }
      }
    }

    bookmarksRef.current = nextBookmarks;
    saveBookmarks(nextBookmarks);
    setBookmarks(nextBookmarks);
  }, [userId, addDocument, deleteDocument]);

  const removeBookmark = useCallback(async (bookmark) => {
    const bookmarkKey = getBookmarkKey(bookmark);
    const nextBookmarks = bookmarksRef.current.filter(
      (savedBookmark) => getBookmarkKey(savedBookmark) !== bookmarkKey
    );

    // If we have userId, also delete from Firestore
    if (userId) {
      try {
        const existingBookmark = bookmarksRef.current.find(b => getBookmarkKey(b) === bookmarkKey);
        if (existingBookmark?.id) {
          await deleteDocument("bookmarks", existingBookmark.id);
        }
      } catch (err) {
        console.error("Error removing bookmark from Firestore:", err);
      }
    }

    bookmarksRef.current = nextBookmarks;
    saveBookmarks(nextBookmarks);
    setBookmarks(nextBookmarks);
  }, [userId, deleteDocument]);

  return { 
    bookmarks, 
    loading, 
    error,
    isBookmarked, 
    removeBookmark, 
    toggleBookmark,
    fetchUserBookmarks
  };
}