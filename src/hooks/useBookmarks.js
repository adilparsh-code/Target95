"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, BookmarkService } from "@/lib/firestore/database";
import { COLLECTIONS } from "@/lib/firestore/collections";

export function useUserBookmarks(userId) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, COLLECTIONS.BOOKMARKS), where("userId", "==", userId));
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
    const q = query(
      collection(db, COLLECTIONS.BOOKMARKS),
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
    const { isBookmarked, bookmarkId } = await isQuestionBookmarked(userId, questionId);

    if (isBookmarked) {
      // Remove bookmark
      await BookmarkService.delete(bookmarkId);
      return { action: "removed", bookmarkId: null };
    } else {
      // Add bookmark
      const newBookmark = await BookmarkService.create({
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