"use client";

import { getFirebaseInstance } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
  documentId
} from "firebase/firestore";
import { getCBSEPracticeQuestions } from "../data/cbse/question-bank-2026-27";

export class PracticeService {
  constructor() {
    const { db, auth } = getFirebaseInstance();
    this.db = db;
    this.auth = auth;
  }

  requireAuth() {
    if (!this.db || !this.auth?.currentUser) {
      throw new Error("Please sign in to access practice questions.");
    }
  }

  normalizeQuestion(question) {
    return {
      id: question.id,
      board: question.board || "CBSE",
      classNumber: question.classNumber ?? question.classLevel ?? null,
      subjectCode: question.subjectCode || null,
      subject: question.subject || null,
      chapter: question.chapter || question.topicId || question.topic || "all",
      chapterId: question.chapterId || question.topicId || question.topic || "all",
      topic: question.topic || question.topicId || null,
      type: question.type || question.questionType || "theory",
      question: question.question,
      options: question.options || [],
      answer: question.answer ?? question.correctAnswer ?? "",
      correctAnswer: question.correctAnswer ?? question.answer ?? "",
      explanation: question.explanation || "",
      difficulty: String(question.difficulty || "medium").toLowerCase(),
      marks: question.marks || 1,
      hint: question.hint || null,
    };
  }

  getCBSEQuestions(filters = {}) {
    const { classNumber, subjectCode, chapter, difficulty, count = 20 } = filters;
    let questions = getCBSEPracticeQuestions(classNumber, subjectCode).map((question) => this.normalizeQuestion(question));
    if (chapter && chapter !== "all") {
      questions = questions.filter((question) => question.chapter === chapter || question.chapterId === chapter);
    }
    const requestedDifficulty = difficulty ? String(difficulty).trim().toLowerCase() : "";
    if (requestedDifficulty && requestedDifficulty !== "mixed" && requestedDifficulty !== "all") {
      questions = questions.filter((question) => question.difficulty === requestedDifficulty);
    }
    questions = this.shuffleArray(questions);
    if (!requestedDifficulty || requestedDifficulty === "mixed" || requestedDifficulty === "all") {
      questions = this.balanceDifficulty(questions);
    }
    return questions.slice(0, Number(count) || 20);
  }

  async getQuestions(filters = {}) {
    this.requireAuth();

    try {
      const { board, classNumber, subjectCode, subject, chapter, difficulty, count = 20 } = filters;
      if (String(board || "").toUpperCase() === "CBSE" && classNumber && subjectCode) {
        return this.getCBSEQuestions(filters);
      }

      const questionsRef = collection(this.db, "questions");
      const conditions = [];
      if (subject) conditions.push(where("subject", "==", subject));
      if (chapter) conditions.push(where("chapter", "==", chapter));
      const requestedDifficulty = difficulty ? String(difficulty).trim().toLowerCase() : "";
      const fetchLimit = requestedDifficulty ? Math.max(count * 3, 50) : count;
      const q = conditions.length
        ? query(questionsRef, ...conditions, limit(fetchLimit))
        : query(questionsRef, limit(fetchLimit));

      let questions = (await getDocs(q)).docs.map(snapshot => ({ id: snapshot.id, ...snapshot.data() }));
      if (requestedDifficulty && requestedDifficulty !== "mixed" && requestedDifficulty !== "all") {
        questions = questions.filter(question => String(question.difficulty || "").trim().toLowerCase() === requestedDifficulty);
      }
      questions = this.shuffleArray(questions);
      if (!requestedDifficulty || requestedDifficulty === "mixed" || requestedDifficulty === "all") {
        questions = this.balanceDifficulty(questions);
      }
      return questions.slice(0, count);
    } catch (error) {
      console.error("Error getting questions:", error);
      throw new Error("Failed to load practice questions. Please refresh the page.");
    }
  }

  async getQuestionsByIds(ids = [], filters = {}) {
    this.requireAuth();
    if (!ids.length) return [];

    if (String(filters.board || "").toUpperCase() === "CBSE" && filters.classNumber && filters.subjectCode) {
      const byId = new Map(this.getCBSEQuestions({ ...filters, count: 1000 }).map((question) => [String(question.id), question]));
      return ids.map((id) => byId.get(String(id))).filter(Boolean);
    }

    const questionsRef = collection(this.db, "questions");
    const chunks = [];
    for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i + 10));
    const snapshots = await Promise.all(
      chunks.map(chunk => getDocs(query(questionsRef, where(documentId(), "in", chunk))))
    );
    const byId = new Map();
    snapshots.forEach(snapshot => snapshot.docs.forEach(item => byId.set(item.id, { id: item.id, ...item.data() })));
    return ids.map(id => byId.get(id)).filter(Boolean);
  }

  async saveSession(sessionData) {
    this.requireAuth();
    try {
      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/practiceSessions`);
      const docRef = await addDoc(sessionsRef, { ...sessionData, completedAt: serverTimestamp() });
      return { id: docRef.id, ...sessionData };
    } catch (error) {
      console.error("Error saving practice session:", error);
      throw new Error("Failed to save practice session. Please try again.");
    }
  }

  async saveAnswers(answers, sessionId) {
    this.requireAuth();
    const uid = this.auth.currentUser.uid;
    const answersRef = collection(this.db, `users/${uid}/practiceAnswers`);
    const savedAnswers = [];
    for (const answer of answers) {
      const docRef = await addDoc(answersRef, { ...answer, sessionId, createdAt: serverTimestamp() });
      savedAnswers.push({ id: docRef.id, ...answer });
    }
    return savedAnswers;
  }

  async getSessionHistory(limitCount = 10) {
    this.requireAuth();
    try {
      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/practiceSessions`);
      const q = query(sessionsRef, orderBy("completedAt", "desc"), limit(limitCount));
      return (await getDocs(q)).docs.map(snapshot => ({ id: snapshot.id, ...snapshot.data() }));
    } catch (error) {
      console.error("Error getting session history:", error);
      throw new Error("Failed to load practice history. Please refresh the page.");
    }
  }

  async updateStatistics(stats) {
    this.requireAuth();
    try {
      const uid = this.auth.currentUser.uid;
      const statsRef = doc(this.db, `users/${uid}/practiceStatistics/current`);
      await updateDoc(statsRef, { ...stats, updatedAt: serverTimestamp() });
      return { success: true };
    } catch (error) {
      if (error.code === "not-found") {
        const uid = this.auth.currentUser.uid;
        await updateDoc(doc(this.db, `users/${uid}/practiceStatistics/current`), { ...stats, updatedAt: serverTimestamp() });
        return { success: true };
      }
      console.error("Error updating statistics:", error);
      throw new Error("Failed to update practice statistics.");
    }
  }

  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  balanceDifficulty(questions) {
    const easy = questions.filter(q => String(q.difficulty || "").toLowerCase() === "easy");
    const medium = questions.filter(q => String(q.difficulty || "").toLowerCase() === "medium");
    const hard = questions.filter(q => String(q.difficulty || "").toLowerCase() === "hard");
    const result = [];
    let e = 0, m = 0, h = 0;
    while (e < easy.length || m < medium.length || h < hard.length) {
      if (m < medium.length) result.push(medium[m++]);
      if (e < easy.length) result.push(easy[e++]);
      if (h < hard.length) result.push(hard[h++]);
    }
    return result.length ? result : questions;
  }
}
