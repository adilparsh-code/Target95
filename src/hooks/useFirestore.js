"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getDocs, query, limit, orderBy, startAfter } from "firebase/firestore";

export function useFirestore(collectionRef, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { limit: limitCount = 50, orderByField = "createdAt" } = options;
  const loadingRef = useRef(false);

  const fetchData = useCallback(async (isLoadMore = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      setLoading(true);
      let q;
      if (isLoadMore && lastDoc) {
        q = query(collectionRef, orderBy(orderByField, "desc"), startAfter(lastDoc), limit(limitCount));
      } else {
        q = query(collectionRef, orderBy(orderByField, "desc"), limit(limitCount));
      }

      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (isLoadMore) {
        setData((prev) => [...prev, ...newData]);
      } else {
        setData(newData);
      }

      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === limitCount);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [collectionRef, limitCount, orderByField, lastDoc]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchData(true);
    }
  }, [fetchData, hasMore, loading]);

  const refresh = useCallback(() => {
    setLastDoc(null);
    setHasMore(true);
    fetchData(false);
  }, [fetchData]);

  useEffect(() => {
    fetchData(false);
  }, []);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}

export function useFirestoreQuery(queryRef) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(queryRef);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(results);
    } catch (err) {
      setError(err);
      console.error("Error querying data:", err);
    } finally {
      setLoading(false);
    }
  }, [queryRef]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}