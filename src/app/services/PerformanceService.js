"use client";

import { getFirebaseInstance } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc
} from "firebase/firestore";

export class PerformanceService {
  constructor() {
    const { db, auth } = getFirebaseInstance();
    this.db = db;
    this.auth = auth;
  }

  // Get overall performance statistics
  async getOverallStats() {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/practiceSessions`);
      const q = query(sessionsRef, orderBy("completedAt", "desc"), limit(50));
      const querySnapshot = await getDocs(q);

      const sessions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Calculate aggregates
      const totalSessions = sessions.length;
      const totalQuestions = sessions.reduce((sum, s) => sum + (s.questionCount || 0), 0);
      const correctAnswers = sessions.reduce((sum, s) => sum + (s.results?.correct || 0), 0);
      const totalAnswered = sessions.reduce((sum, s) => sum + ((s.results?.correct || 0) + (s.results?.wrong || 0)), 0);
      const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

      // Calculate streak
      const streak = await this.calculateStreak(sessions);

      return {
        totalSessions,
        totalQuestions,
        correctAnswers,
        accuracy,
        streak,
        recentSessions: sessions.slice(0, 5)
      };
    } catch (error) {
      console.error("Error getting overall stats:", error);
      throw new Error("Failed to load performance statistics.");
    }
  }

  // Get performance by chapter
  async getChapterPerformance() {
    if (!this.db || !this.auth.currentUser) {
      throw new Error("Firestore not initialized or user not authenticated");
    }

    try {
      const uid = this.auth.currentUser.uid;
      const sessionsRef = collection(this.db, `users/${uid}/practiceSessions`);
      const querySnapshot = await getDocs(sessionsRef);
      
      const sessions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Group by chapter
      const chapterStats = {};
      sessions.forEach(session => {
        const chapter = session.chapter || "Unknown";
        if (!chapterStats[chapter]) {
          chapterStats[chapter] = {
            totalSessions: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            accuracy: 0
          };
        }
        chapterStats[chapter].totalSessions += 1;
        chapterStats[chapter].totalQuestions += session.questionCount || 0;
        chapterStats[chapter].correctAnswers += session.results?.correct || 0;
      });

      // Calculate accuracy for each chapter
      Object.keys(chapterStats).forEach(chapter => {
        const stats = chapterStats[chapter];
        const total = stats.correctAnswers + (stats.totalQuestions - stats.correctAnswers);
        stats.accuracy = total > 0 ? Math.round((stats.correctAnswers / total) * 100) : 0;
      });

      // Identify weak and strong chapters
      const chapters = Object.entries(chapterStats).map(([name, stats]) => ({
        name,
        ...stats
      }));

      const weakChapters = chapters
        .filter(c => c.accuracy < 60)
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 3);

      const strongChapters = chapters
        .filter(c => c.accuracy >= 80)
        .sort((a, b) => b.accuracy - a.accuracy)
        .slice(0, 3);

      return {
        chapterStats: chapterStats,
        weakChapters,
        strongChapters,
        recommendations: this.generateRecommendations(weakChapters)
      };
    } catch (error) {
      console.error("Error getting chapter performance:", error);
      throw new Error("Failed to load chapter performance.");
    }
  }

  // Calculate current streak
  async calculateStreak(sessions) {
    if (sessions.length === 0) return 0;

    // Get today's date and yesterday's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dates = sessions
      .map(s => s.completedAt?.toDate ? s.completedAt.toDate() : new Date(s.completedAt))
      .filter(d => !isNaN(d.getTime()))
      .map(d => {
        d.setHours(0, 0, 0, 0);
        return d;
      });

    if (dates.length === 0) return 0;

    // Remove duplicates (only one activity per day counts)
    const uniqueDates = [...new Set(dates.map(d => d.getTime()))]
      .map(t => new Date(t))
      .sort((a, b) => b - a);

    let streak = 0;
    let checkDate = today;

    for (const date of uniqueDates) {
      const diffTime = checkDate.getTime() - date.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        streak++;
        checkDate = new Date(date.getTime() - (1000 * 60 * 60 * 24)); // Move to previous day
      } else {
        break;
      }
    }

    return streak;
  }

  // Generate practice recommendations
  generateRecommendations(weakChapters) {
    const recommendations = [];

    weakChapters.forEach(chapter => {
      recommendations.push({
        type: "weak_area",
        title: `Practice ${chapter.name}`,
        description: `Your accuracy is ${chapter.accuracy}%. Review the material and practice more questions.`,
        chapter: chapter.name,
        priority: "high"
      });
    });

    // Add general recommendations if not enough weak areas
    if (recommendations.length < 3) {
      recommendations.push({
        type: "mixed",
        title: "Mixed Difficulty Practice",
        description: "Try a mixed practice session with questions from different chapters to improve overall performance.",
        priority: "medium"
      });
      recommendations.push({
        type: "timed",
        title: "Timed Challenge",
        description: "Test your speed with a timed practice session to simulate exam conditions.",
        priority: "medium"
      });
    }

    return recommendations;
  }

  // Get recent activity for dashboard
  async getRecentActivity(limitCount = 5) {
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
      console.error("Error getting recent activity:", error);
      throw new Error("Failed to load recent activity.");
    }
  }
}