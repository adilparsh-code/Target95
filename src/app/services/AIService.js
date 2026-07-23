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

  // Send prompt to AI and get response
  async sendPrompt(prompt, context = {}) {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Empty prompt is not allowed");
    }

    try {
      // Simulate AI response generation - in production, this would call an actual AI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a structured AI response
      const response = this.generateAIResponse(prompt, context);
      return response;
    } catch (error) {
      console.error("Error sending prompt to AI:", error);
      if (error.message.includes("Failed to fetch") || error.name === "NetworkError") {
        throw new Error("Network error. Please check your internet connection and try again.");
      }
      throw error;
    }
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

  // Helper method to generate structured AI responses (simulation)
  generateAIResponse(prompt, context = {}) {
    const questionContext = context.question ? `Regarding your question: "${context.question}"` : "";
    
    return {
      explanation: `${questionContext} ${prompt} is a fundamental concept in computer science. Let me break it down for you. This concept forms the building block of many programming principles and is essential for understanding more advanced topics. When implemented correctly, it can significantly improve the efficiency and readability of your code.`,
      
      stepByStep: [
        "First, understand the basic definition and core principles behind the concept",
        "Look at simple examples to see how it works in practice",
        "Practice implementing it in small code snippets",
        "Gradually integrate it into more complex projects",
        "Review common pitfalls and how to avoid them"
      ],
      
      example: `// Example implementation
function example() {
  // Step 1: Initialize the necessary variables
  const data = [];
  
  // Step 2: Apply the concept
  data.forEach(item => {
    processItem(item);
  });
  
  return data;
}`,
      
      keyPoints: [
        "Fundamental concept in computer science",
        "Improves code efficiency and readability",
        "Essential for advanced programming topics",
        "Widely used across all major programming languages",
        "Can be implemented with minimal complexity"
      ],
      
      relatedTopics: [
        "Data Structures",
        "Algorithms",
        "Object-Oriented Programming",
        "Time Complexity Analysis",
        "Space Optimization"
      ]
    };
  }
}

export const aiService = new AIService();