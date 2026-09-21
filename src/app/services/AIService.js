"use client";

import { getFirebaseInstance } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export class AIService {
  constructor() {
    const { db, auth } = getFirebaseInstance();
    this.db = db;
    this.auth = auth;
  }

  // Send prompt to the AI Tutor API and get a structured response.
  // The request goes through /api/ai-tutor, which verifies the student's
  // session, rate-limits per user, and keeps the provider key server-side.
  async sendPrompt(prompt, context = {}) {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Empty prompt is not allowed");
    }

    let response;
    try {
      response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: prompt,
          subject: context.subject || "",
          chapter: context.chapter || "",
          difficulty: context.difficulty || "",
          questionType: context.questionType || "",
        }),
      });
    } catch {
      throw new Error("Network error. Please check your internet connection and try again.");
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.error || "The AI Tutor could not answer right now. Please try again in a moment.");
    }

    return payload.response;
  }

  // Save chat to Firestore
  async saveChat(chatData) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const chatsRef = collection(this.db, `users/${uid}/aiChats`);
      
      const docRef = await addDoc(chatsRef, {
        ...chatData,
        createdAt: serverTimestamp()
      });

      return { id: docRef.id, ...chatData };
    } catch (error) {
      console.error("Error saving chat to Firestore:", error);
      throw new Error("Failed to save chat. Please try again.");
    }
  }

  // Get chat history from Firestore
  async getHistory() {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const chatsRef = collection(this.db, `users/${uid}/aiChats`);
      const q = query(chatsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting chat history from Firestore:", error);
      throw new Error("Failed to load chat history. Please refresh the page.");
    }
  }

  // Delete a conversation
  async deleteConversation(chatId) {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const chatRef = doc(this.db, `users/${uid}/aiChats/${chatId}`);
      await deleteDoc(chatRef);
    } catch (error) {
      console.error("Error deleting conversation:", error);
      throw new Error("Failed to delete conversation. Please try again.");
    }
  }
}

export const aiService = new AIService();