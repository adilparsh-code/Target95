export function getAuthenticatedResumeProgress(progressStorage, userId) {
  if (!userId) return null;

  const recentlyStudied = progressStorage.getRecentlyStudied(userId);
  if (!recentlyStudied || recentlyStudied.userId !== userId) return null;

  const chapterId = recentlyStudied.lastChapterId || null;
  const questionId = recentlyStudied.lastQuestionId || null;
  if (!chapterId && !questionId) return null;

  const chapterProgress = chapterId
    ? progressStorage.getChapterProgress(userId, chapterId)
    : null;

  return {
    userId,
    chapterId,
    chapterName: recentlyStudied.lastChapterName || null,
    questionId,
    questionTitle: recentlyStudied.lastQuestionTitle || null,
    subjectId: recentlyStudied.lastSubjectId || null,
    chapterProgress,
  };
}

export function formatResumeQuestion(questionId) {
  if (questionId === null || questionId === undefined || questionId === "") return null;

  const value = String(questionId).trim();
  if (!value) return null;
  if (/^q\d+$/i.test(value)) return value.toUpperCase();
  if (/^\d+$/.test(value)) return `Q${value}`;
  return value;
}
