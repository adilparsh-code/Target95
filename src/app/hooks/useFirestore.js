"use client";

import { useState, useCallback } from "react";
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
  serverTimestamp
} from "firebase/firestore";

export default function useFirestore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { db: firestoreDb } = getFirebaseInstance();

  // Get all documents from a collection
  const getCollection = useCallback(async (collectionName) => {
    // Return empty array if running on server or no db connection
    if (!firestoreDb) {
      return [];
    }
    
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(firestoreDb, collectionName));
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
  const queryDocuments = useCallback(async (collectionName, conditions) => {
    // Return empty array if running on server or no db connection
    if (!firestoreDb) {
      return [];
    }
    
    setLoading(true);
    setError(null);
    try {
      let q = collection(firestoreDb, collectionName);
      
      // Build query conditions
      conditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value));
      });
      
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