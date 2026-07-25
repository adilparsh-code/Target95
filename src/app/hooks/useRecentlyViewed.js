"use client";

import { useState, useEffect } from 'react';

const RECENTLY_VIEWED_KEY = 'target95-recently-viewed';
const MAX_RECENTLY_VIEWED = 5;

export default function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    }
  }, []);

  const addRecentlyViewed = (slug) => {
    if (typeof window !== 'undefined') {
      const updated = [slug, ...recentlyViewed.filter((s) => s !== slug)].slice(0, MAX_RECENTLY_VIEWED);
      setRecentlyViewed(updated);
      window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    }
  };

  return { recentlyViewed, addRecentlyViewed };
}