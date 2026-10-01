"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

const RECENTLY_VIEWED_KEY = 'target95-recently-viewed';
const MAX_RECENTLY_VIEWED = 5;

export default function useRecentlyViewed() {
  const { user } = useAuth();
  const storageKey = user?.uid ? `${RECENTLY_VIEWED_KEY}:${user.uid}` : RECENTLY_VIEWED_KEY;
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    }
  }, [storageKey]);

  // Stabilized via useCallback + functional state update so the
  // function identity never changes across renders. This prevents
  // consumers (e.g. StudyChapter useEffect) from re-running forever.
  const addRecentlyViewed = useCallback((slug) => {
    if (typeof window !== 'undefined') {
      setRecentlyViewed((prev) => {
        const updated = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX_RECENTLY_VIEWED);
        window.localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    }
  }, [storageKey]);

  return { recentlyViewed, addRecentlyViewed };
}
