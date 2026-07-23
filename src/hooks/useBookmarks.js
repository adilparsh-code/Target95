"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, BookmarkService } from "@/lib/firestore/database";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { useFirestoreQuery } from "./useFirestore";

export function useUserBookmarks(userId) {
  const bookmarksRef = collection(db, COLLECTIONS.BOOKMARKS);
  const q = query(bookmarksRef, where("userId", "==", userId));

  const { data, loading, error, refresh } = useFirestoreQuery(q);

  return { bookmarks: data, loading, error, refresh };
}

export function isQuestionBookmarked = async (userId, questionId) => {
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
};

export function toggleBookmark = async (userId, questionId) => {
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
};