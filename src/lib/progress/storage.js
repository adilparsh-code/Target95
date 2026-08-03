// Storage Service - Abstraction layer for persistence
// Currently uses localStorage, can be swapped for Firebase with minimal changes

import { LearningStatus } from "./models";

const STORAGE_KEY = "target95-progress-system";

/**
 * Storage Service - Abstraction for progress data persistence
 * Designed to be easily replaceable with Firebase
 */
class ProgressStorage {
  constructor() {
    this.storageKey = STORAGE_KEY;
    this.data = this._read();
  }

  /**
   * Read all progress data from storage
   * @private
   */
  _read() {
    try {
      if (typeof window === "undefined") {
        return this._getDefaultData();
      }
      const raw = window.localStorage.getItem(this.storageKey);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (error) {
      console.error("Error reading progress from storage:", error);
    }
    return this._getDefaultData();
  }

  /**
   * Get default data structure
   * @private
   */
  _getDefaultData() {
    return {
      learningProgress: {},
      chapterProgress: {},
      recentlyStudied: {},
      activityDates: [],
    };
  }

  /**
   * Write data to storage
   * @private
   */
  _write() {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    } catch (error) {
      console.error("Error writing progress to storage:", error);
    }
  }

  // ==================== Learning Progress ====================

  /**
   * Get learning progress for a user
   * @param {string} userId - User ID
   * @returns {Object} Learning progress object
   */
  getLearningProgress(userId) {
    return this.data.learningProgress[userId] || null;
  }

  /**
   * Save learning progress for a user
   * @param {string} userId - User ID
   * @param {Object} progress - Learning progress object
   */
  saveLearningProgress(userId, progress) {
    this.data.learningProgress[userId] = {
      ...progress,
      updatedAt: new Date().toISOString(),
    };
    this._write();
  }

  /**
   * Update learning progress for a user
   * @param {string} userId - User ID
   * @param {Function} updater - Function to update progress
   */
  updateLearningProgress(userId, updater) {
    const current = this.getLearningProgress(userId) || {
      userId,
      totalQuestionsSolved: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      accuracy: 0,
      totalStudyTime: 0,
      chaptersCompleted: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastActivity: null,
    };
    
    const updated = updater(current);
    this.saveLearningProgress(userId, updated);
    return updated;
  }

  // ==================== Chapter Progress ====================

  /**
   * Get chapter progress for a user
   * @param {string} userId - User ID
   * @param {string} chapterId - Chapter ID
   * @returns {Object} Chapter progress object
   */
  getChapterProgress(userId, chapterId) {
    const key = `${userId}:${chapterId}`;
    return this.data.chapterProgress[key] || null;
  }

  /**
   * Get all chapter progress for a user
   * @param {string} userId - User ID
   * @returns {Array} Array of chapter progress objects
   */
  getAllChapterProgress(userId) {
    return Object.entries(this.data.chapterProgress)
      .filter(([key]) => key.startsWith(`${userId}:`))
      .map(([, value]) => value);
  }

  /**
   * Save chapter progress for a user
   * @param {string} userId - User ID
   * @param {string} chapterId - Chapter ID
   * @param {Object} progress - Chapter progress object
   */
  saveChapterProgress(userId, chapterId, progress) {
    const key = `${userId}:${chapterId}`;
    this.data.chapterProgress[key] = {
      ...progress,
      updatedAt: new Date().toISOString(),
    };
    this._write();
  }

  /**
   * Update chapter progress for a user
   * @param {string} userId - User ID
   * @param {string} chapterId - Chapter ID
   * @param {Function} updater - Function to update progress
   */
  updateChapterProgress(userId, chapterId, updater) {
    const current = this.getChapterProgress(userId, chapterId) || {
      userId,
      chapterId,
      status: LearningStatus.NOT_STARTED,
      questionsSolved: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      accuracy: 0,
      studyTime: 0,
      lastVisited: null,
      completedAt: null,
    };
    
    const updated = updater(current);
    this.saveChapterProgress(userId, chapterId, updated);
    return updated;
  }

  // ==================== Recently Studied ====================

  /**
   * Get recently studied data for a user
   * @param {string} userId - User ID
   * @returns {Object} Recently studied object
   */
  getRecentlyStudied(userId) {
    return this.data.recentlyStudied[userId] || null;
  }

  /**
   * Save recently studied data for a user
   * @param {string} userId - User ID
   * @param {Object} recentlyStudied - Recently studied object
   */
  saveRecentlyStudied(userId, recentlyStudied) {
    this.data.recentlyStudied[userId] = {
      ...recentlyStudied,
      lastActivity: new Date().toISOString(),
    };
    this._write();
  }

  /**
   * Update recently studied data for a user
   * @param {string} userId - User ID
   * @param {Function} updater - Function to update recently studied
   */
  updateRecentlyStudied(userId, updater) {
    const current = this.getRecentlyStudied(userId) || {
      userId,
      lastChapterId: null,
      lastChapterName: null,
      lastQuestionId: null,
      lastQuestionTitle: null,
      lastSubjectId: null,
      totalVisits: 0,
    };
    
    const updated = updater(current);
    this.saveRecentlyStudied(userId, updated);
    return updated;
  }

  // ==================== Activity Tracking ====================

  /**
   * Record activity for streak calculation
   * @param {string} userId - User ID
   */
  recordActivity(userId) {
    const today = new Date().toISOString().split('T')[0];
    const key = `${userId}:${today}`;
    
    if (!this.data.activityDates.includes(key)) {
      this.data.activityDates.push(key);
      this._write();
    }
  }

  /**
   * Get activity dates for a user
   * @param {string} userId - User ID
   * @returns {Array} Array of activity date strings
   */
  getActivityDates(userId) {
    const prefix = `${userId}:`;
    return this.data.activityDates
      .filter(key => key.startsWith(prefix))
      .map(key => key.replace(prefix, ""));
  }

  // ==================== Utility Methods ====================

  /**
   * Clear all progress data for a user
   * @param {string} userId - User ID
   */
  clearUserData(userId) {
    delete this.data.learningProgress[userId];
    delete this.data.recentlyStudied[userId];
    
    // Clear chapter progress for user
    Object.keys(this.data.chapterProgress)
      .filter(key => key.startsWith(`${userId}:`))
      .forEach(key => delete this.data.chapterProgress[key]);
    
    // Clear activity dates for user
    this.data.activityDates = this.data.activityDates.filter(
      key => !key.startsWith(`${userId}:`)
    );
    
    this._write();
  }

  /**
   * Clear all progress data
   */
  clearAll() {
    this.data = this._getDefaultData();
    this._write();
  }

  /**
   * Export all data (for backup/migration)
   * @returns {Object} All progress data
   */
  exportData() {
    return JSON.parse(JSON.stringify(this.data));
  }

  /**
   * Import data (for backup/migration)
   * @param {Object} data - Progress data to import
   */
  importData(data) {
    this.data = data;
    this._write();
  }
}

// Export singleton instance
export const progressStorage = new ProgressStorage();

// Export class for testing
export default ProgressStorage;