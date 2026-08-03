// Continue Learning Helpers
// Reusable functions for determining next steps in learning journey

import { LearningStatus } from "./models";
import { getNextQuestion, getNextChapter, getResumeData } from "./utils";

/**
 * Get the next question to study
 * @param {Object} chapterProgress - Current chapter progress
 * @param {Array} questions - Available questions array
 * @param {Array} solvedQuestionIds - Array of solved question IDs
 * @returns {Object|null} Next question object or null
 */
export function getNextQuestionToStudy(chapterProgress, questions, solvedQuestionIds = []) {
  if (!questions || questions.length === 0) {
    return null;
  }

  // If no progress yet, return first question
  if (!chapterProgress || chapterProgress.questionsSolved === 0) {
    return questions[0];
  }

  // Find first unsolved question
  const next = questions.find(q => !solvedQuestionIds.includes(q.id));
  return next || null;
}

/**
 * Get the next chapter to study
 * @param {Array} chapters - Array of all chapters
 * @param {Object} currentChapterProgress - Current chapter progress
 * @returns {Object|null} Next chapter object or null
 */
export function getNextChapterToStudy(chapters, currentChapterProgress) {
  if (!chapters || chapters.length === 0) {
    return null;
  }

  return getNextChapter(chapters, currentChapterProgress);
}

/**
 * Get resume position for continuing learning
 * @param {Object} recentlyStudied - Recently studied data
 * @returns {Object} Resume position data
 */
export function getResumePosition(recentlyStudied) {
  return getResumeData(recentlyStudied);
}

/**
 * Get learning path - what to study next
 * @param {Array} chapters - All chapters
 * @param {Object} chapterProgressMap - Map of chapterId to progress
 * @param {Object} recentlyStudied - Recently studied data
 * @returns {Object} Learning path with next chapter and question
 */
export function getLearningPath(chapters, chapterProgressMap, recentlyStudied) {
  if (!chapters || chapters.length === 0) {
    return {
      hasPath: false,
      nextChapter: null,
      nextQuestion: null,
      resumePosition: null,
    };
  }

  // Get resume position
  const resumePosition = getResumePosition(recentlyStudied);

  // Find current chapter
  let currentChapter = null;
  let currentProgress = null;

  // First check if there's a recently studied chapter
  if (resumePosition.hasResumeData && resumePosition.chapterId) {
    currentChapter = chapters.find(ch => ch.id === resumePosition.chapterId);
    currentProgress = chapterProgressMap[resumePosition.chapterId];
  }

  // If no resume data, find in-progress chapter
  if (!currentChapter) {
    currentChapter = chapters.find(ch => {
      const progress = chapterProgressMap[ch.id];
      return progress && progress.status === LearningStatus.IN_PROGRESS;
    });
    if (currentChapter) {
      currentProgress = chapterProgressMap[currentChapter.id];
    }
  }

  // If no in-progress chapter, find first not-started chapter
  if (!currentChapter) {
    currentChapter = chapters.find(ch => {
      const progress = chapterProgressMap[ch.id];
      return !progress || progress.status === LearningStatus.NOT_STARTED;
    });
  }

  // If still no chapter, use first chapter
  if (!currentChapter) {
    currentChapter = chapters[0];
  }

  // Get next question
  const nextQuestion = currentChapter?.questions 
    ? getNextQuestionToStudy(currentProgress, currentChapter.questions, currentProgress?.solvedQuestionIds)
    : null;

  return {
    hasPath: true,
    nextChapter: currentChapter,
    nextQuestion,
    resumePosition,
    currentProgress,
  };
}

/**
 * Get chapter completion status
 * @param {Object} chapterProgress - Chapter progress object
 * @returns {string} LearningStatus enum value
 */
export function getChapterCompletionStatus(chapterProgress) {
  if (!chapterProgress) {
    return LearningStatus.NOT_STARTED;
  }

  if (chapterProgress.status) {
    return chapterProgress.status;
  }

  // Calculate from progress
  if (chapterProgress.progress >= 100) {
    return LearningStatus.COMPLETED;
  } else if (chapterProgress.progress > 0 || chapterProgress.questionsSolved > 0) {
    return LearningStatus.IN_PROGRESS;
  }

  return LearningStatus.NOT_STARTED;
}

/**
 * Check if user can resume from a specific position
 * @param {Object} recentlyStudied - Recently studied data
 * @returns {boolean} True if user can resume
 */
export function canResume(recentlyStudied) {
  if (!recentlyStudied) {
    return false;
  }

  return !!(recentlyStudied.lastChapterId || recentlyStudied.lastQuestionId);
}

/**
 * Get study recommendation based on progress
 * @param {Array} chapters - All chapters
 * @param {Object} chapterProgressMap - Map of chapterId to progress
 * @param {Object} learningStats - Overall learning statistics
 * @returns {Object} Study recommendation
 */
export function getStudyRecommendation(chapters, chapterProgressMap, learningStats) {
  if (!chapters || chapters.length === 0) {
    return {
      type: "start",
      message: "Start your learning journey",
      chapter: null,
    };
  }

  // Check for incomplete chapters
  const incompleteChapters = chapters.filter(ch => {
    const progress = chapterProgressMap[ch.id];
    return !progress || progress.status !== LearningStatus.COMPLETED;
  });

  if (incompleteChapters.length === 0) {
    return {
      type: "completed",
      message: "Congratulations! You've completed all chapters",
      chapter: null,
    };
  }

  // Find next chapter to study
  const nextChapter = incompleteChapters[0];
  const progress = chapterProgressMap[nextChapter.id];
  
  if (!progress || progress.status === LearningStatus.NOT_STARTED) {
    return {
      type: "start_chapter",
      message: `Start chapter: ${nextChapter.name}`,
      chapter: nextChapter,
    };
  } else if (progress.status === LearningStatus.IN_PROGRESS) {
    const remaining = (progress.totalQuestions || 0) - (progress.questionsSolved || 0);
    return {
      type: "continue_chapter",
      message: `Continue ${nextChapter.name} - ${remaining} questions remaining`,
      chapter: nextChapter,
      remaining,
    };
  }

  return {
    type: "start",
    message: "Continue your learning",
    chapter: nextChapter,
  };
}

/**
 * Calculate estimated time to complete chapter
 * @param {Object} chapterProgress - Chapter progress
 * @param {number} avgTimePerQuestion - Average time per question in minutes
 * @returns {number} Estimated minutes remaining
 */
export function estimateTimeToComplete(chapterProgress, avgTimePerQuestion = 2) {
  if (!chapterProgress) {
    return 0;
  }

  const remaining = (chapterProgress.totalQuestions || 0) - (chapterProgress.questionsSolved || 0);
  return Math.max(0, remaining * avgTimePerQuestion);
}

/**
 * Get learning streak information
 * @param {Object} learningProgress - Learning progress
 * @returns {Object} Streak information
 */
export function getStreakInfo(learningProgress) {
  if (!learningProgress) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      isActive: false,
    };
  }

  const currentStreak = learningProgress.currentStreak || 0;
  const bestStreak = learningProgress.bestStreak || 0;

  return {
    currentStreak,
    bestStreak,
    isActive: currentStreak > 0,
    isPersonalBest: currentStreak >= bestStreak && currentStreak > 0,
  };
}