"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getFirebaseInstance } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  serverTimestamp,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";

export default function useFirestore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { db: firestoreDb } = getFirebaseInstance();

  // Get all documents from a collection
  const getCollection = useCallback(async (collectionName, opts = {}) => {
    // Return empty array if running on server or no db connection
    if (!firestoreDb) {
      return [];
    }
    
    setLoading(true);
    setError(null);
    try {
      let q = collection(firestoreDb, collectionName);
      const limitCount = opts.limit || 50;
      const orderByField = opts.orderByField || "createdAt";
      const lastDoc = opts.lastDoc || null;

      if (lastDoc) {
        q = query(q, orderBy(orderByField, "desc"), startAfter(lastDoc), limit(limitCount));
      } else {
        q = query(q, orderBy(orderByField, "desc"), limit(limitCount));
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoading(false);
      return { data, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null, hasMore: querySnapshot.docs.length === limitCount };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [firestoreDb]);

  // Get a single document by ID
  const getDocument = useCallback(async (collectionName, docId) => {
    // Return null if running on server or no db connection
    if (!firestoreDb) {
      return null;
    }
    
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(firestoreDb, collectionName, docId);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [firestoreDb]);

  // Add a new document
  const addDocument = useCallback(async (collectionName, data) => {
    // Return null if running on server or no db connection
    if (!firestoreDb) {
      return null;
    }
    
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(firestoreDb, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setLoading(false);
      return { id: docRef.id, ...data };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [firestoreDb]);

  // Update an existing document
  const updateDocument = useCallback(async (collectionName, docId, data) => {
    // Return null if running on server or no db connection
    if (!firestoreDb) {
      return null;
    }
    
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(firestoreDb, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      setLoading(false);
      return { id: docId, ...data };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [firestoreDb]);

  // Delete a document
  const deleteDocument = useCallback(async (collectionName, docId) => {
    // Return false if running on server or no db connection
    if (!firestoreDb) {
      return false;
    }
    
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(firestoreDb, collectionName, docId);
      await deleteDoc(docRef);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [firestoreDb]);

  // Query documents with conditions
  const queryDocuments = useCallback(async (collectionName, conditions, opts = {}) => {
    // Return empty array if running on server or no db connection
    if (!firestoreDb) {
      return [];
    }
    
    setLoading(true);
    setError(null);
    try {
      let q = collection(firestoreDb, collectionName);
      
      // Build query conditions
      if (conditions && conditions.length > 0) {
        const queryConstraints = conditions.map(condition => 
          where(condition.field, condition.operator, condition.value)
        );
        q = query(q, ...queryConstraints);
      }

      // Apply ordering and limit only if specified
      const orderByField = opts.orderByField || null;
      const limitCount = opts.limit || null;
      const lastDoc = opts.lastDoc || null;

      if (orderByField && lastDoc) {
        q = query(q, orderBy(orderByField, "desc"), startAfter(lastDoc), limit(limitCount || 50));
      } else if (orderByField) {
        q = query(q, orderBy(orderByField, "desc"), limit(limitCount || 50));
      } else if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [firestoreDb]);

  // Subscribe to realtime updates
  const subscribeToCollection = useCallback((collectionName, callback) => {
    // Return no-op unsubscribe if running on server or no db connection
    if (!firestoreDb) {
      return () => {};
    }
    
    try {
      const q = collection(firestoreDb, collectionName);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(data);
      });
      return unsubscribe;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [firestoreDb]);

  return {
    loading,
    error,
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    queryDocuments,
    subscribeToCollection
  };
}

// Named hook for ad-hoc Firestore queries (replaces src/hooks/useFirestoreQuery)
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
    } finally {
      setLoading(false);
    }
  }, [queryRef]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}

// Hook for paginated Firestore queries
export function usePaginatedFirestore(collectionRef, options = {}) {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}