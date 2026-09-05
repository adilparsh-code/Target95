"use client";

import { getFirebaseInstance } from "../lib/firebase";
import { collection, addDoc, updateDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { PracticeService } from './PracticeService';

export class SessionService {
  constructor() {
    const { db, auth } = getFirebaseInstance();
    this.db = db;
    this.auth = auth;
    this.practiceService = new PracticeService();
  }

  requireAuth() {
    if (!this.db || !this.auth?.currentUser) throw new Error("Please sign in to access practice sessions.");
  }

  async startSession(settings) {
    this.requireAuth();
    try {
      const { board, classNumber, subjectCode, subject, chapter, difficulty, questionCount, hasTimer, duration } = settings;
      const questions = await this.practiceService.getQuestions({ board, classNumber, subjectCode, subject, chapter, difficulty, count: questionCount });
      if (questions.length === 0) throw new Error("No questions found matching your criteria. Please try different filters.");

      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/activeSessions`);
      const sessionData = {
        board: board || null,
        classNumber: classNumber || null,
        subjectCode: subjectCode || null,
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
      return { id: docRef.id, ...sessionData, questions };
    } catch (error) {
      console.error("Error starting practice session:", error);
      throw error;
    }
  }

  async getSession(sessionId) {
    this.requireAuth();
    if (!sessionId) throw new Error("Practice session ID is required.");
    try {
      const uid = this.auth.currentUser.uid;
      const snapshot = await getDoc(doc(this.db, `users/${uid}/activeSessions/${sessionId}`));
      if (!snapshot.exists()) throw new Error("Practice session not found. It may have expired or been removed.");
      return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
      console.error("Error loading practice session:", error);
      if (error.message?.includes("Practice session not found")) throw error;
      throw new Error("Failed to load practice session. Please try again.");
    }
  }

  async updateSession(sessionId, updates) {
    this.requireAuth();
    try {
      const uid = this.auth.currentUser.uid;
      await updateDoc(doc(this.db, `users/${uid}/activeSessions/${sessionId}`), { ...updates, lastUpdated: serverTimestamp() });
      return { success: true };
    } catch (error) {
      console.error("Error updating session:", error);
      throw new Error("Failed to update session. Please try again.");
    }
  }

  async saveAnswer(sessionId, questionId, answer, isCorrect) {
    this.requireAuth();
    try {
      const uid = this.auth.currentUser.uid;
      const sessionRef = doc(this.db, `users/${uid}/activeSessions/${sessionId}`);
      const answers = await this.getCurrentAnswers(sessionId);
      const answerData = { questionId, answer, isCorrect: Boolean(isCorrect), timestamp: new Date().toISOString() };
      await updateDoc(sessionRef, {
        answers: [...answers.filter(item => item.questionId !== questionId), answerData],
        lastUpdated: serverTimestamp()
      });
      return answerData;
    } catch (error) {
      console.error("Error saving answer:", error);
      throw new Error("Failed to save answer. Please try again.");
    }
  }

  async toggleFlag(sessionId, questionId) {
    this.requireAuth();
    try {
      const uid = this.auth.currentUser.uid;
      const sessionRef = doc(this.db, `users/${uid}/activeSessions/${sessionId}`);
      const currentFlags = await this.getCurrentFlagged(sessionId);
      const isAlreadyFlagged = currentFlags.includes(questionId);
      await updateDoc(sessionRef, {
        flaggedQuestions: isAlreadyFlagged ? currentFlags.filter(id => id !== questionId) : [...currentFlags, questionId],
        lastUpdated: serverTimestamp()
      });
      return { flagged: !isAlreadyFlagged };
    } catch (error) {
      console.error("Error toggling flag:", error);
      throw new Error("Failed to update flag. Please try again.");
    }
  }

  async completeSession(sessionId) {
    this.requireAuth();
    try {
      const session = await this.getSession(sessionId);
      if (session.status === "completed" && session.results) return session.results;
      const answers = Array.isArray(session.answers) ? session.answers : [];
      const total = Array.isArray(session.questions) ? session.questions.length : Number(session.questionCount) || 0;
      const correct = answers.filter(a => a.isCorrect).length;
      const attempted = answers.length;
      const wrong = Math.max(0, attempted - correct);
      const skipped = Math.max(0, total - attempted);
      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      const results = { correct, wrong, skipped, accuracy, score: correct, total };
      const uid = this.auth.currentUser.uid;
      await updateDoc(doc(this.db, `users/${uid}/activeSessions/${sessionId}`), { status: "completed", completedAt: serverTimestamp(), results });
      await this.practiceService.saveSession({
        sessionId,
        board: session.board || null,
        classNumber: session.classNumber || null,
        subjectCode: session.subjectCode || null,
        subject: session.subject,
        chapter: session.chapter,
        difficulty: session.difficulty,
        questionCount: total,
        correct,
        wrong,
        skipped,
        accuracy,
        score: correct
      });
      return results;
    } catch (error) {
      console.error("Error completing session:", error);
      if (error.message?.includes("Practice session not found")) throw error;
      throw new Error("Failed to complete session. Please try again.");
    }
  }

  async getCurrentAnswers(sessionId) {
    const session = await this.getSession(sessionId);
    return Array.isArray(session.answers) ? session.answers : [];
  }

  async getCurrentFlagged(sessionId) {
    const session = await this.getSession(sessionId);
    return Array.isArray(session.flaggedQuestions) ? session.flaggedQuestions : [];
  }
}
