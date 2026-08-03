// Student Learning Progress System - Main Export
// Unified export for all progress-related modules

// Data Models
export {
  LearningStatus,
  AchievementType,
  LearningProgressSchema,
  ChapterProgressSchema,
  RecentlyStudiedSchema,
  AchievementSchema,
  createDefaultLearningProgress,
  createDefaultChapterProgress,
  createDefaultRecentlyStudied,
} from "./models";

// Utility Functions
export {
  calculateAccuracy,
  calculateProgress,
  calculateCompletion,
  getNextQuestion,
  getNextChapter,
  getResumeData,
  formatStudyTime,
  calculateStreak,
  isSameDay,
  getISODateString,
} from "./utils";

// Achievement Engine
export {
  ACHIEVEMENTS,
  AchievementType,
  checkAchievements,
  getUnlockedAchievements,
  getLockedAchievements,
  getAchievementProgress,
  getNextAchievement,
  getAchievementById,
  isAchievementUnlocked,
  getTotalAchievementsCount,
  getUnlockedAchievementsCount,
} from "./achievements";

// Continue Learning Helpers
export {
  getNextQuestionToStudy,
  getNextChapterToStudy,
  getResumePosition,
  getLearningPath,
  getChapterCompletionStatus,
  canResume,
  getStudyRecommendation,
  estimateTimeToComplete,
  getStreakInfo,
} from "./continueLearning";

// Storage Service
export { progressStorage, ProgressStorage } from "./storage";

// Hooks (re-exported for convenience)
export { default as useProgressTracker } from "@/hooks/useProgressTracker";
export { default as useChapterProgress } from "@/hooks/useChapterProgress";
export { default as useRecentlyStudied } from "@/hooks/useRecentlyStudied";