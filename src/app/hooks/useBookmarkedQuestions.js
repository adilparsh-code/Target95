"use client";

import { useMemo } from "react";
import { resolveBookmarkedQuestion } from "@/lib/content";

/**
 * Join saved bookmarks with their questions from the unified content catalog.
 *
 * `items` keeps the original bookmark untouched (its chapter and questionId are
 * the storage key, so removal must use them as saved). `unavailableCount` is the
 * number of bookmarks whose question no longer resolves, so the page can say so
 * instead of hiding them silently.
 */
export default function useBookmarkedQuestions(bookmarks) {
  return useMemo(() => {
    const items = [];
    let unavailableCount = 0;
    for (const bookmark of bookmarks) {
      const { status, question, reason } = resolveBookmarkedQuestion(bookmark);
      if (question) items.push({ bookmark, question, held: status === "quarantined", reason });
      else unavailableCount += 1;
    }
    return { items, unavailableCount };
  }, [bookmarks]);
}
