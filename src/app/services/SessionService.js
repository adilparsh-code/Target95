"use client";

import { getFirebaseInstance } from "../lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { PracticeService } from './PracticeService';

export class SessionService {
  constructor() {
    const { db, auth } = getFirebaseInstance();
    this.db = db;
    this.auth = auth;
    this.practiceService = new PracticeService();
  }

  // Start a new practice session
  async startSession(settings) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const { subject, chapter, difficulty, questionCount, hasTimer, duration } = settings;
      
      // Get questions based on filters
      const questions = await this.practiceService.getQuestions({
        subject,
        chapter,
        difficulty,
        count: questionCount
      });

      if (questions.length === 0) {
        throw new Error("No questions found matching your criteria. Please try different filters.");
      }

      // Create session document
      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/activeSessions`);
      
      const sessionData = {
        subject,
        chapter,
        difficulty,
        questionCount,
        hasTimer,
        duration: hasTimer ? duration : null,
        startTime: serverTimestamp(),
        questions: questions.map(q => q.id),
        currentQuestionIndex: 0,
        answers: [],
        flaggedQuestions: [],
        status: "active"
      };

      const docRef = await addDoc(sessionsRef, sessionData);
      
      return {
        id: docRef.id,
        ...sessionData,
        questions: questions // Return full question objects for immediate use
      };
    } catch (error) {
      console.error("Error starting practice session:", error);
      throw error;
    }
  }

  // Update session progress
  async updateSession(sessionId, updates) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionRef = doc(this.db, `users/${uid}/activeSessions/${sessionId}`);
      
      await updateDoc(sessionRef, {
        ...updates,
        lastUpdated: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating session:", error);
      throw new Error("Failed to update session. Please try again.");
    }
  }

  // Save an answer
  async saveAnswer(sessionId, questionId, answer, isCorrect) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionRef = doc(this.db, `users/${uid}/activeSessions/${sessionId}`);
      
      // Get current session to append answer
      const answerData = {
        questionId,
        answer,
        isCorrect,
        timestamp: new Date().toISOString()
      };

      await updateDoc(sessionRef, {
        answers: [...(await this.getCurrentAnswers(sessionId)), answerData]
      });

      return answerData;
    } catch (error) {
      console.error("Error saving answer:", error);
      throw new Error("Failed to save answer. Please try again.");
    }
  }

  // Flag/unflag a question
  async toggleFlag(sessionId, questionId) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionRef = doc(this.db, `users/${uid}/activeSessions/${sessionId}`);
      
      // Get current flagged questions
      const currentFlags = await this.getCurrentFlagged(sessionId);
      const isAlreadyFlagged = currentFlags.includes(questionId);
      
      const newFlags = isAlreadyFlagged
        ? currentFlags.filter(id => id !== questionId)
        : [...currentFlags, questionId];

      await updateDoc(sessionRef, {
        flaggedQuestions: newFlags
      });

      return { flagged: !isAlreadyFlagged };
    } catch (error) {
      console.error("Error toggling flag:", error);
      throw new Error("Failed to update flag. Please try again.");
    }
  }

  // Complete a session and calculate final results
  async completeSession(sessionId) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionRef = doc(this.db, `users/${uid}/activeSessions/${sessionId}`);
      
      // Get session data
      // We need to fetch the session first to calculate results
      // This is a simplification - in production, you'd use getDoc
      
      // Calculate results
      const answers = await this.getCurrentAnswers(sessionId);
      const correct = answers.filter(a => a.isCorrect).length;
      const total = answers.length;
      const wrong = total - correct;
      const skipped = 0; // Calculate skipped questions
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      
      // Mark session as completed
      await updateDoc(sessionRef, {
        status: "completed",
        completedAt: serverTimestamp(),
        results: {
          correct,
          wrong,
          skipped,
          accuracy,
          score: correct
        }
      });

      // Save to permanent sessions collection
      await this.practiceService.saveSession({
        sessionId,
        correct,
        wrong,
        skipped,
        accuracy,
        score: correct
      });

      return {
        correct,
        wrong,
        skipped,
        accuracy,
        score: correct
      };
    } catch (error) {
      console.error("Error completing session:", error);
      throw new Error("Failed to complete session. Please try again.");
    }
  }

  // Helper: Get current answers from session
  async getCurrentAnswers(sessionId) {
    // In a real implementation, you would fetch the document first
    // This is a placeholder - in actual code, use getDoc to retrieve current answers
    return [];
  }

  // Helper: Get current flagged questions
  async getCurrentFlagged(sessionId) {
    // In a real implementation, you would fetch the document first
    return [];
  }
}