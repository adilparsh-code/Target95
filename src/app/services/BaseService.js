"use server";

import { getFirebaseInstance } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";

export default class BaseService {
  constructor(collectionName) {
    const { db } = getFirebaseInstance();
    this.db = db;
    this.collectionName = collectionName;
    this.collectionRef = collection(this.db, collectionName);
  }

  // Get all documents
  async getAll() {
    try {
      const snapshot = await getDocs(this.collectionRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting all ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Get a single document by ID
  async getById(id) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data()
        };
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${this.collectionName} by ID:`, error);
      throw error;
    }
  }

  // Query documents with conditions
  async query(conditions = []) {
    try {
      let q = this.collectionRef;
      
      if (conditions.length > 0) {
        const queryConditions = conditions.map(cond => 
          where(cond.field, cond.operator, cond.value)
        );
        q = query(this.collectionRef, ...queryConditions);
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error querying ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Add a new document
  async add(data) {
    try {
      const docRef = await addDoc(this.collectionRef, {
        ...data,
        createdAt: new Date().toISOString()
      });
      return {
        id: docRef.id,
        ...data
      };
    } catch (error) {
      console.error(`Error adding ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update an existing document
  async update(id, data) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return {
        id,
        ...data
      };
    } catch (error) {
      console.error(`Error updating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete a document
  async delete(id) {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Subscribe to realtime updates
  subscribe(callback) {
    try {
      return onSnapshot(this.collectionRef, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(data);
      });
    } catch (error) {
      console.error(`Error subscribing to ${this.collectionName}:`, error);
      throw error;
    }
  }
}