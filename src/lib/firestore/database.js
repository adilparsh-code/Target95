import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  increment,
  Timestamp,
} from "firebase/firestore";
import { COLLECTIONS } from "./collections";

// Firebase configuration - should be in environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Base CRUD class for all collections
class BaseService {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
    this.collectionName = collectionName;
  }

  // Create
  async create(data) {
    try {
      const docRef = await addDoc(this.collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error(`Error creating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Read by ID
  async getById(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Read all with pagination support
  async getAll(limitCount = 50, lastDoc = null) {
    try {
      let q = query(this.collectionRef, orderBy("createdAt", "desc"), limit(limitCount));
      if (lastDoc) {
        q = query(this.collectionRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(limitCount));
      }
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(`Error getting all ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update
  async update(id, data) {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return { id, ...data };
    } catch (error) {
      console.error(`Error updating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete
  async delete(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Query with filters
  async query(filters = [], orderByField = "createdAt", limitCount = 50) {
    try {
      let q = query(this.collectionRef, ...filters, orderBy(orderByField, "desc"), limit(limitCount));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(`Error querying ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Increment field
  async incrementField(id, field, value = 1) {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        [field]: increment(value),
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error(`Error incrementing ${field} in ${this.collectionName}:`, error);
      throw error;
    }
  }
}

// Initialize services for each collection
export const UserService = new BaseService(COLLECTIONS.USERS);
export const QuestionService = new BaseService(COLLECTIONS.QUESTIONS);
export const ProgressService = new BaseService(COLLECTIONS.PROGRESS);
export const BookmarkService = new BaseService(COLLECTIONS.BOOKMARKS);
export const MockTestService = new BaseService(COLLECTIONS.MOCK_TESTS);
export const ResultService = new BaseService(COLLECTIONS.RESULTS);
export const SubjectService = new BaseService(COLLECTIONS.SUBJECTS);
export const ChapterService = new BaseService(COLLECTIONS.CHAPTERS);
export const LeaderboardService = new BaseService(COLLECTIONS.LEADERBOARD);

// Export database instance and utilities
export { db, serverTimestamp, Timestamp, query, where, orderBy, limit, startAfter };