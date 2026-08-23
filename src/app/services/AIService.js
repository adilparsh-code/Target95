"use client";

export class AIService {
  constructor() {
    this.db = null;
    this.auth = null;
    this.firebaseReady = false;

    try {
      // Firebase stays optional during local-first Tutor development.
      // This dynamic import avoids making the Tutor unavailable when Firebase
      // configuration is intentionally not connected yet.
      if (typeof window !== "undefined") {
        import("../lib/firebase")
          .then(({ getFirebaseInstance }) => {
            const instance = getFirebaseInstance();
            this.db = instance?.db ?? null;
            this.auth = instance?.auth ?? null;
            this.firebaseReady = Boolean(this.db && this.auth);
          })
          .catch(() => {
            this.firebaseReady = false;
          });
      }
    } catch {
      this.firebaseReady = false;
    }
  }

  async sendPrompt(prompt, context = {}) {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Empty prompt is not allowed");
    }

    // Local-first Tutor response. A real provider adapter can replace this
    // method later without changing the page or hook contract.
    return this.generateAIResponse(prompt, context);
  }

  async saveChat(chatData) {
    if (!this.firebaseReady || !this.db || !this.auth?.currentUser) {
      return { id: `local-${Date.now()}`, ...chatData, localOnly: true };
    }

    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const uid = this.auth.currentUser.uid;
      const chatsRef = collection(this.db, `users/${uid}/aiChats`);
      const docRef = await addDoc(chatsRef, {
        ...chatData,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, ...chatData };
    } catch (error) {
      console.error("Error saving chat to Firestore:", error);
      return { id: `local-${Date.now()}`, ...chatData, localOnly: true };
    }
  }

  async getHistory() {
    if (!this.firebaseReady || !this.db || !this.auth?.currentUser) {
      return [];
    }

    try {
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const uid = this.auth.currentUser.uid;
      const chatsRef = collection(this.db, `users/${uid}/aiChats`);
      const q = query(chatsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    } catch (error) {
      console.error("Error getting chat history from Firestore:", error);
      return [];
    }
  }

  async deleteConversation(chatId) {
    if (!this.firebaseReady || !this.db || !this.auth?.currentUser) return;

    try {
      const { deleteDoc, doc } = await import("firebase/firestore");
      const uid = this.auth.currentUser.uid;
      await deleteDoc(doc(this.db, `users/${uid}/aiChats/${chatId}`));
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  }

  generateAIResponse(prompt, context = {}) {
    const subject = context.subject || "Computer Science";
    const chapter = context.chapter || "the current topic";
    const questionContext = context.question ? `

Question context: ${context.question}` : "";

    return {
      explanation: `Let’s work through ${chapter} step by step. Your question is about ${subject}.${questionContext}`,
      stepByStep: [
        "Identify exactly what the question is asking.",
        "Recall the one core concept needed to solve it.",
        "Work through the smallest useful example.",
        "Check the result against the question.",
        "Try one similar practice question before moving on.",
      ],
      example: "Ask me for a worked example and I’ll structure it as: Given → Method → Steps → Answer → Quick Check.",
      keyPoints: [
        "Understand the concept before memorising the answer.",
        "Use the chapter context when solving board-style questions.",
        "For code, trace values before deciding the output.",
        "For Boolean Algebra, verify important identities with a truth table.",
        "For inheritance, separate constructor order from method overriding.",
      ],
      relatedTopics: [chapter, "Practice Questions", "Output Tracing", "Debugging", "Board Strategy"],
    };
  }
}

export const aiService = new AIService();
