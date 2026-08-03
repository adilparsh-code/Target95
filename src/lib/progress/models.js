// Data models for the Student Learning Progress System
// Designed for Firebase integration with localStorage fallback

export const LearningStatus = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export const AchievementType = {
  FIRST_QUESTION: "first_question",
  QUESTIONS_10: "questions_10",
  QUESTIONS_50: "questions_50",
  QUESTIONS_100: "questions_100",
  ACCURACY_95: "accuracy_95",
  STREAK_7: "streak_7",
};

// Overall learning progress for a user
export const LearningProgressSchema = {
  userId: "",
  totalQuestionsSolved: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  accuracy: 0,
  totalStudyTime: 0, // in minutes
  chaptersCompleted: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastActivity: null,
  createdAt: null,
  updatedAt: null,
};

// Chapter-level progress
export const ChapterProgressSchema = {
  userId: "",
  chapterId: "",
  subjectId: "",
  status: LearningStatus.NOT_STARTED,
  questionsSolved: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  accuracy: 0,
  studyTime: 0,
  lastVisited: null,
  completedAt: null,
  createdAt: null,
  updatedAt: null,
};

// Recently studied items for resume functionality
export const RecentlyStudiedSchema = {
  userId: "",
  lastChapterId: null,
  lastChapterName: null,
  lastQuestionId: null,
  lastQuestionTitle: null,
  lastSubjectId: null,
  lastActivity: null,
  totalVisits: 0,
};

// Achievement definition
export const AchievementSchema = {
  id: "",
  type: "",
  title: "",
  description: "",
  unlocked: false,
  unlockedAt: null,
  progress: 0,
  target: 0,
};

// Helper to create default learning progress
export function createDefaultLearningProgress(userId) {
  return {
    ...LearningProgressSchema,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Helper to create default chapter progress
export function createDefaultChapterProgress(userId, chapterId, subjectId) {
  return {
    ...ChapterProgressSchema,
    userId,
    chapterId,
    subjectId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Helper to create default recently studied
export function createDefaultRecentlyStudied(userId) {
  return {
    ...RecentlyStudiedSchema,
    userId,
    totalVisits: 0,
  };
}