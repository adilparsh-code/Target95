"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
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
      nextBookmarks = bookmarksRef.current.filter(
        (savedBookmark) => getBookmarkKey(savedBookmark) !== bookmarkKey
      );
      
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
      const newBookmark = { ...bookmark, userId };
      nextBookmarks = [...bookmarksRef.current, newBookmark];
      
      if (userId) {
        try {
          const savedBookmark = await addDocument("bookmarks", newBookmark);
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

// Named export for backward compatibility with src/hooks/useBookmarks.js
export function useUserBookmarks(userId) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const db = getFirestore();
        const q = query(collection(db, "bookmarks"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        setBookmarks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError(err);
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId]);

  return { bookmarks, loading, error };
}

export async function isQuestionBookmarked(userId, questionId) {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, "bookmarks"),
      where("userId", "==", userId),
      where("questionId", "==", questionId)
    );

    const snapshot = await getDocs(q);
    return {
      isBookmarked: snapshot.docs.length > 0,
      bookmarkId: snapshot.docs.length > 0 ? snapshot.docs[0].id : null,
    };
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    throw error;
  }
}

export async function toggleBookmark(userId, questionId) {
  try {
    const { isBookmarked: alreadyBookmarked, bookmarkId } = await isQuestionBookmarked(userId, questionId);

    if (alreadyBookmarked) {
      const db = getFirestore();
      const { deleteDoc, doc } = await import("firebase/firestore");
      await deleteDoc(doc(db, "bookmarks", bookmarkId));
      return { action: "removed", bookmarkId: null };
    } else {
      const db = getFirestore();
      const { addDoc, collection } = await import("firebase/firestore");
      const newBookmark = await addDoc(collection(db, "bookmarks"), {
        userId,
        questionId,
        notes: "",
      });
      return { action: "added", bookmarkId: newBookmark.id };
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    throw error;
  }
}