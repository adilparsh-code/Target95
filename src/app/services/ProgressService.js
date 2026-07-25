"use server";

import BaseService from "./BaseService";

class ProgressService extends BaseService {
  constructor() {
    super("progress");
  }

  // Get all progress for a specific user
  async getUserProgress(userId) {
    return this.query([
      { field: "userId", operator: "==", value: userId }
    ]);
  }

  // Get progress for a specific chapter
  async getUserChapterProgress(userId, chapterSlug) {
    return this.query([
      { field: "userId", operator: "==", value: userId },
      { field: "chapter", operator: "==", value: chapterSlug }
    ]);
  }

  // Calculate completion percentage for a chapter
  async getChapterCompletion(userId, chapterSlug, totalQuestions) {
    const chapterProgress = await this.getUserChapterProgress(userId, chapterSlug);
    if (totalQuestions === 0) return 0;
    return Math.round((chapterProgress.length / totalQuestions) * 100);
  }

  // Check if a question is completed by a user
  async isQuestionCompleted(userId, chapter, questionId) {
    const progress = await this.query([
      { field: "userId", operator: "==", value: userId },
      { field: "chapter", operator: "==", value: chapter },
      { field: "questionId", operator: "==", value: questionId }
    ]);
    return progress.length > 0;
  }

  // Get overall user stats
  async getUserStats(userId) {
    const allProgress = await this.getUserProgress(userId);
    const chapters = [...new Set(allProgress.map(p => p.chapter))];
    
    const chapterStats = await Promise.all(
      chapters.map(async (chapter) => {
        const chapterProgress = allProgress.filter(p => p.chapter === chapter);
        return {
          chapter,
          completed: chapterProgress.length,
          firstCompleted: chapterProgress.reduce((min, p) => 
            new Date(p.completedAt) < new Date(min.completedAt) ? p : min
          ).completedAt,
          lastCompleted: chapterProgress.reduce((max, p) => 
            new Date(p.completedAt) > new Date(max.completedAt) ? p : max
          ).completedAt
        };
      })
    );

    return {
      totalCompleted: allProgress.length,
      uniqueChapters: chapters.length,
      chapterStats,
      streak: this.calculateStreak(allProgress)
    };
  }

  // Calculate user's current streak (consecutive days with activity)
  calculateStreak(progressItems) {
    if (progressItems.length === 0) return 0;
    
    const completedDates = [...new Set(
      progressItems.map(item => 
        new Date(item.completedAt).toISOString().split('T')[0]
      )
    )].sort().reverse();

    let streak = 0;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    for (let i = 0; i < completedDates.length; i++) {
      const date = new Date(completedDates[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (date.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  // Reset progress for a chapter
  async resetChapterProgress(userId, chapterSlug) {
    const chapterProgress = await this.getUserChapterProgress(userId, chapterSlug);
    await Promise.all(
      chapterProgress.map(item => this.delete(item.id))
    );
    return true;
  }

  // Delete all progress for a user (on account deletion)
  async deleteAllUserProgress(userId) {
    const userProgress = await this.getUserProgress(userId);
    await Promise.all(
      userProgress.map(item => this.delete(item.id))
    );
    return true;
  }
}

export default new ProgressService();