// Pure utility functions for Student Learning Progress System
// All functions are pure - no side effects, easy to test and reuse

import { LearningStatus } from "./models";

/**
 * Calculate accuracy percentage
 * @param {number} correct - Number of correct answers
 * @param {number} total - Total questions attempted
 * @returns {number} Accuracy percentage (0-100)
 */
export function calculateAccuracy(correct, total) {
  if (!total || total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Calculate progress percentage
 * @param {number} completed - Number of completed items
 * @param {number} total - Total items
 * @returns {number} Progress percentage (0-100)
 */
export function calculateProgress(completed, total) {
  if (!total || total <= 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Calculate completion status based on progress
 * @param {number} progress - Progress percentage (0-100)
 * @returns {string} LearningStatus enum value
 */
export function calculateCompletion(progress) {
  if (progress >= 100) return LearningStatus.COMPLETED;
  if (progress > 0) return LearningStatus.IN_PROGRESS;
  return LearningStatus.NOT_STARTED;
}

/**
 * Get the next question to study based on progress
 * @param {Object} progress - Chapter progress object
 * @param {Array} questions - Array of available questions
 * @returns {Object|null} Next question to study or null
 */
export function getNextQuestion(progress, questions) {
  if (!questions || questions.length === 0) return null;
  
  // If no progress yet, return first question
  if (!progress || progress.questionsSolved === 0) {
    return questions[0];
  }
  
  // Find first unsolved question
  const solvedIds = progress.solvedQuestionIds || [];
  return questions.find(q => !solvedIds.includes(q.id)) || null;
}

/**
 * Get the next chapter to study
 * @param {Array} chapters - Array of chapters
 * @param {Object} currentProgress - Current chapter progress
 * @returns {Object|null} Next chapter to study or null
 */
export function getNextChapter(chapters, currentProgress) {
  if (!chapters || chapters.length === 0) return null;
  
  // If no current progress, return first not-started chapter
  if (!currentProgress) {
    return chapters.find(ch => ch.status === LearningStatus.NOT_STARTED) || chapters[0];
  }
  
  // If current chapter is completed, find next not-started chapter
  if (currentProgress.status === LearningStatus.COMPLETED) {
    const currentIndex = chapters.findIndex(ch => ch.id === currentProgress.chapterId);
    return chapters[currentIndex + 1] || null;
  }
  
  // Return current chapter if in progress
  return chapters.find(ch => ch.id === currentProgress.chapterId) || chapters[0];
}

/**
 * Get resume data for continuing learning
 * @param {Object} recentlyStudied - Recently studied data
 * @returns {Object} Resume data with chapter and question info
 */
export function getResumeData(recentlyStudied) {
  if (!recentlyStudied) {
    return {
      hasResumeData: false,
      chapterId: null,
      chapterName: null,
      questionId: null,
      questionTitle: null,
      subjectId: null,
      lastActivity: null,
    };
  }
  
  return {
    hasResumeData: !!(recentlyStudied.lastChapterId || recentlyStudied.lastQuestionId),
    chapterId: recentlyStudied.lastChapterId,
    chapterName: recentlyStudied.lastChapterName,
    questionId: recentlyStudied.lastQuestionId,
    questionTitle: recentlyStudied.lastQuestionTitle,
    subjectId: recentlyStudied.lastSubjectId,
    lastActivity: recentlyStudied.lastActivity,
  };
}

/**
 * Calculate study time in human-readable format
 * @param {number} minutes - Study time in minutes
 * @returns {string} Formatted time string (e.g., "2h 30m")
 */
export function formatStudyTime(minutes) {
  if (!minutes || minutes <= 0) return "0m";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${mins}m`;
  }
}

/**
 * Calculate streak based on activity dates
 * @param {Array} activityDates - Array of ISO date strings
 * @returns {number} Current streak in days
 */
export function calculateStreak(activityDates) {
  if (!activityDates || activityDates.length === 0) return 0;
  
  const dates = activityDates
    .map(d => new Date(d).toISOString().split('T')[0])
    .filter(d => d && d !== 'Invalid Date')
    .sort()
    .reverse();
  
  if (dates.length === 0) return 0;
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // Check if streak is current (today or yesterday)
  if (dates[0] !== today && dates[0] !== yesterday) {
    return 0;
  }
  
  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i]);
    const next = new Date(dates[i + 1]);
    const diffDays = Math.floor((current - next) / 86400000);
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

/**
 * Check if two dates are on the same day
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @returns {boolean} True if same day
 */
export function isSameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toISOString().split('T')[0] === d2.toISOString().split('T')[0];
}

/**
 * Get date string in ISO format (YYYY-MM-DD)
 * @param {Date} date - Date object
 * @returns {string} ISO date string
 */
export function getISODateString(date = new Date()) {
  return new Date(date).toISOString().split('T')[0];
}