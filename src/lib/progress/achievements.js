// Achievement Engine - Reusable logic only, no UI
// Pure functions for checking and managing achievements

import { AchievementType } from "./models";

/**
 * Achievement definitions with conditions
 */
export const ACHIEVEMENTS = [
  {
    id: AchievementType.FIRST_QUESTION,
    title: "First Question",
    description: "Solve your first question",
    icon: "🎯",
    check: (stats) => stats.totalQuestionsSolved >= 1,
  },
  {
    id: AchievementType.QUESTIONS_10,
    title: "10 Questions",
    description: "Solve 10 questions",
    icon: "📝",
    check: (stats) => stats.totalQuestionsSolved >= 10,
  },
  {
    id: AchievementType.QUESTIONS_50,
    title: "50 Questions",
    description: "Solve 50 questions",
    icon: "✍️",
    check: (stats) => stats.totalQuestionsSolved >= 50,
  },
  {
    id: AchievementType.QUESTIONS_100,
    title: "100 Questions",
    description: "Solve 100 questions",
    icon: "🏆",
    check: (stats) => stats.totalQuestionsSolved >= 100,
  },
  {
    id: AchievementType.ACCURACY_95,
    title: "95% Accuracy",
    description: "Achieve 95% or higher accuracy",
    icon: "🎯",
    check: (stats) => stats.totalQuestionsSolved >= 10 && stats.accuracy >= 95,
  },
  {
    id: AchievementType.STREAK_7,
    title: "7-Day Streak",
    description: "Study for 7 consecutive days",
    icon: "🔥",
    check: (stats) => stats.currentStreak >= 7,
  },
];

/**
 * Check which achievements are unlocked based on stats
 * @param {Object} stats - Learning statistics
 * @returns {Array} Array of achievement objects with unlocked status
 */
export function checkAchievements(stats) {
  if (!stats) return [];
  
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: achievement.check(stats),
    unlockedAt: achievement.check(stats) ? new Date().toISOString() : null,
  }));
}

/**
 * Get unlocked achievements only
 * @param {Object} stats - Learning statistics
 * @returns {Array} Array of unlocked achievements
 */
export function getUnlockedAchievements(stats) {
  return checkAchievements(stats).filter(a => a.unlocked);
}

/**
 * Get locked achievements only
 * @param {Object} stats - Learning statistics
 * @returns {Array} Array of locked achievements
 */
export function getLockedAchievements(stats) {
  return checkAchievements(stats).filter(a => !a.unlocked);
}

/**
 * Calculate achievement progress percentage
 * @param {Object} achievement - Achievement object
 * @param {Object} stats - Learning statistics
 * @returns {number} Progress percentage (0-100)
 */
export function getAchievementProgress(achievement, stats) {
  if (!achievement || !stats) return 0;
  
  switch (achievement.id) {
    case AchievementType.FIRST_QUESTION:
      return Math.min(100, Math.round((stats.totalQuestionsSolved / 1) * 100));
    
    case AchievementType.QUESTIONS_10:
      return Math.min(100, Math.round((stats.totalQuestionsSolved / 10) * 100));
    
    case AchievementType.QUESTIONS_50:
      return Math.min(100, Math.round((stats.totalQuestionsSolved / 50) * 100));
    
    case AchievementType.QUESTIONS_100:
      return Math.min(100, Math.round((stats.totalQuestionsSolved / 100) * 100));
    
    case AchievementType.ACCURACY_95:
      if (stats.totalQuestionsSolved < 10) return 0;
      return Math.min(100, Math.round((stats.accuracy / 95) * 100));
    
    case AchievementType.STREAK_7:
      return Math.min(100, Math.round((stats.currentStreak / 7) * 100));
    
    default:
      return 0;
  }
}

/**
 * Get next achievement to unlock
 * @param {Object} stats - Learning statistics
 * @returns {Object|null} Next achievement to unlock or null
 */
export function getNextAchievement(stats) {
  if (!stats) return null;
  
  const achievements = checkAchievements(stats);
  const locked = achievements.filter(a => !a.unlocked);
  
  if (locked.length === 0) return null;
  
  // Return the first locked achievement (ordered by difficulty)
  return locked[0];
}

/**
 * Get achievement by ID
 * @param {string} achievementId - Achievement ID
 * @returns {Object} Achievement definition
 */
export function getAchievementById(achievementId) {
  return ACHIEVEMENTS.find(a => a.id === achievementId) || null;
}

/**
 * Check if a specific achievement is unlocked
 * @param {string} achievementId - Achievement ID
 * @param {Object} stats - Learning statistics
 * @returns {boolean} True if unlocked
 */
export function isAchievementUnlocked(achievementId, stats) {
  const achievement = getAchievementById(achievementId);
  if (!achievement) return false;
  return achievement.check(stats);
}

/**
 * Get total achievements count
 * @returns {number} Total number of achievements
 */
export function getTotalAchievementsCount() {
  return ACHIEVEMENTS.length;
}

/**
 * Get unlocked achievements count
 * @param {Object} stats - Learning statistics
 * @returns {number} Number of unlocked achievements
 */
export function getUnlockedAchievementsCount(stats) {
  return getUnlockedAchievements(stats).length;
}