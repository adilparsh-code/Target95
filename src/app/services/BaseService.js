"use server";

// Since this is a server component, we need to import firebase properly for server-side use
import { initializeApp, cert, getApps } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from "firebase/firestore";

// Server-side Firebase initialization
const getServerFirebaseInstance = () => {
  if (getApps().length === 0) {
    // In production, you would use service account credentials here
    // For demo purposes, we'll return null to avoid errors during build
    return { db: null };
  }
  
  const app = getApps()[0];
  return { db: getFirestore(app) };
};

export default class BaseService {
  constructor(collectionName) {
    const { db } = getServerFirebaseInstance();
    this.db = db;
    this.collectionName = collectionName;
    this.collectionRef = db ? collection(db, collectionName) : null;
  }

  // Get all documents
  async getAll() {
    // Return empty array if no db connection (demo mode)
    if (!this.db || !this.collectionRef) {
      return [];
    }
    
    try {
      const snapshot = await getDocs(this.collectionRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting all ${this.collectionName}:`, error);
      return [];
    }
  }

  // Get a single document by ID
  async getById(id) {
    // Return null if no db connection (demo mode)
    if (!this.db || !this.collectionRef) {
      return null;
    }
    
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
      return null;
    }
  }

  // Query documents with conditions
  async query(conditions = []) {
    // Return empty array if no db connection (demo mode)
    if (!this.db || !this.collectionRef) {
      return [];
    }
    
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
      return [];
    }
  }

  // Add a new document
  async add(data) {
    // Return null if no db connection (demo mode)
    if (!this.db || !this.collectionRef) {
      return null;
    }
    
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
      return null;
    }
  }

  // Update an existing document
  async update(id, data) {
    // Return null if no db connection (demo mode)
    if (!this.db || !this.collectionRef) {
      return null;
    }
    
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
      return null;
    }
  }

  // Delete a document
  async delete(id) {
    // Return false if no db connection (demo mode)
    if (!this.db || !this.collectionRef) {
      return false;
    }
    
    try {
      const docRef = doc(this.db, this.collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      return false;
    }
  }

  // Subscribe to realtime updates (server components don't support realtime, return no-op)
  subscribe(callback) {
    // Return no-op unsubscribe if no db connection
    return () => {};
  }
}