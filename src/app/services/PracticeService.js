"use client";

import { getFirebaseInstance } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
  startAfter
} from "firebase/firestore";

export class PracticeService {
  constructor() {
    const { db, auth } = getFirebaseInstance();
    this.db = db;
    this.auth = auth;
  }

  // Get questions based on filters
  async getQuestions(filters = {}) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const { subject, chapter, difficulty, count = 20 } = filters;
      const questionsRef = collection(this.db, "questions");
      
      // Build query based on filters
      let q = questionsRef;
      const conditions = [];
      
      if (subject) conditions.push(where("subject", "==", subject));
      if (chapter) conditions.push(where("chapter", "==", chapter));
      if (difficulty) conditions.push(where("difficulty", "==", difficulty));
      
      // Add conditions to query
      if (conditions.length > 0) {
        q = query(questionsRef, ...conditions, limit(count));
      } else {
        q = query(questionsRef, limit(count));
      }

      const querySnapshot = await getDocs(q);
      let questions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Shuffle questions to randomize order
      questions = this.shuffleArray(questions);
      
      // Mix difficulty if multiple difficulties are requested
      if (!difficulty && questions.length > 0) {
        questions = this.balanceDifficulty(questions);
      }

      return questions.slice(0, count);
    } catch (error) {
      console.error("Error getting questions:", error);
      throw new Error("Failed to load practice questions. Please refresh the page.");
    }
  }

  // Save practice session to Firestore
  async saveSession(sessionData) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/practiceSessions`);
      
      const docRef = await addDoc(sessionsRef, {
        ...sessionData,
        completedAt: serverTimestamp()
      });

      return { id: docRef.id, ...sessionData };
    } catch (error) {
      console.error("Error saving practice session:", error);
      throw new Error("Failed to save practice session. Please try again.");
    }
  }

  // Save practice answers
  async saveAnswers(answers, sessionId) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const answersRef = collection(this.db, `users/${uid}/practiceAnswers`);
      
      const answersWithSession = answers.map(answer => ({
        ...answer,
        sessionId,
        createdAt: serverTimestamp()
      }));

      // Save all answers
      const savedAnswers = [];
      for (const answer of answersWithSession) {
        const docRef = await addDoc(answersRef, answer);
        savedAnswers.push({ id: docRef.id, ...answer });
      }

      return savedAnswers;
    } catch (error) {
      console.error("Error saving practice answers:", error);
      throw new Error("Failed to save practice answers. Please try again.");
    }
  }

  // Get user's practice history
  async getSessionHistory(limitCount = 10) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/practiceSessions`);
      const q = query(sessionsRef, orderBy("completedAt", "desc"), limit(limitCount));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting session history:", error);
      throw new Error("Failed to load session history. Please refresh the page.");
    }
  }

  // Update user statistics
  async updateStatistics(stats) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const statsRef = doc(this.db, `users/${uid}/practiceStatistics/current`);
      
      await updateDoc(statsRef, {
        ...stats,
        updatedAt: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      // If document doesn't exist, create it
      if (error.code === 'not-found') {
        const uid = this.auth.currentUser.uid;
        const statsRef = collection(this.db, `users/${uid}/practiceStatistics`);
        await addDoc(statsRef, {
          ...stats,
          createdAt: serverTimestamp()
        });
        return { success: true };
      }
      console.error("Error updating statistics:", error);
      throw new Error("Failed to update practice statistics.");
    }
  }

  // Helper: Shuffle array using Fisher-Yates algorithm
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Helper: Balance difficulty distribution in questions
  balanceDifficulty(questions) {
    const easy = questions.filter(q => q.difficulty === "Easy");
    const medium = questions.filter(q => q.difficulty === "Medium");
    const hard = questions.filter(q => q.difficulty === "Hard");
    
    const result = [];
    let e = 0, m = 0, h = 0;
    
    // Interleave questions from different difficulty levels
    while (e < easy.length || m < medium.length || h < hard.length) {
      if (m < medium.length) result.push(medium[m++]); // Prioritize medium
      if (e < easy.length) result.push(easy[e++]);
      if (h < hard.length) result.push(hard[h++]);
    }
    
    return result;
  }
}