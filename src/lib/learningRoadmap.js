export function createChapterRoadmap(chapters, completedQuestions = [], attempts = {}) {
  const attemptList = Object.values(attempts);
  return chapters.map((chapter) => {
    const completed = completedQuestions.filter((item) => item.chapter === chapter.slug);
    const chapterAttempts = attemptList.filter((item) => item.chapter === chapter.slug);
    const total = chapter.questions.length;
    const solved = completed.length;
    const scored = chapterAttempts.filter((item) => typeof item.correct === "boolean");
    const correct = scored.filter((item) => item.correct).length;
    const accuracy = scored.length ? Math.round((correct / scored.length) * 100) : 0;
    const lastAttempt = [...completed, ...chapterAttempts].map((item) => item.completedAt || item.attemptedAt).filter(Boolean).sort().at(-1) || null;
    const remaining = Math.max(total - solved, 0);
    return { ...chapter, total, solved, remaining, accuracy, lastAttempt, completion: total ? Math.round((solved / total) * 100) : 0, estimatedCompletion: `${Math.max(remaining * 2, 0)} min` };
  });
}

export function createLearningRecommendations(chapters, mockTests = []) {
  const activeChapter = chapters.find((chapter) => chapter.solved > 0 && chapter.remaining > 0) || chapters.find((chapter) => chapter.remaining > 0);
  const weakChapter = [...chapters].filter((chapter) => chapter.solved > 0).sort((a, b) => a.accuracy - b.accuracy)[0];
  const recommendations = [];
  if (activeChapter) recommendations.push({ id: "continue", title: `Continue ${activeChapter.title}`, description: `${activeChapter.remaining} questions remain in this chapter.`, href: `/java/${activeChapter.slug}`, action: "Resume" });
  if (weakChapter && weakChapter.accuracy < 70) recommendations.push({ id: "revise", title: `Revise ${weakChapter.title}`, description: `Current accuracy is ${weakChapter.accuracy}%. Review the topic before progressing.`, href: `/java/${weakChapter.slug}`, action: "Revise" });
  recommendations.push({ id: "easy", title: "Build confidence with easy questions", description: "Use focused practice to reinforce fundamentals.", href: "/question-bank", action: "Practice" });
  recommendations.push({ id: "medium", title: "Try medium questions", description: "Move to application-based questions when you feel ready.", href: "/question-bank", action: "Explore" });
  if (!mockTests.length || mockTests.at(0)?.percentage >= 60) recommendations.push({ id: "mock", title: "Attempt a mock test", description: "Check your readiness across multiple chapters.", href: "/mock-test", action: "Start test" });
  return recommendations.slice(0, 5);
}

export function createAchievements({ solved = 0, streak = 0, mockTests = [], chapters = [] }) {
  const perfectScore = mockTests.some((test) => test.percentage === 100);
  const masteredChapter = chapters.some((chapter) => chapter.completion === 100 && chapter.accuracy >= 80);
  return [
    { id: "first", title: "First question", description: "Solve your first question", unlocked: solved >= 1 },
    { id: "ten", title: "10 questions", description: "Solve 10 questions", unlocked: solved >= 10 },
    { id: "hundred", title: "100 questions", description: "Solve 100 questions", unlocked: solved >= 100 },
    { id: "mock", title: "First mock test", description: "Complete one mock test", unlocked: mockTests.length >= 1 },
    { id: "streak", title: "7-day streak", description: "Study seven days in a row", unlocked: streak >= 7 },
    { id: "perfect", title: "Perfect score", description: "Score 100% in a test", unlocked: perfectScore },
    { id: "master", title: "Chapter master", description: "Master a completed chapter", unlocked: masteredChapter },
  ];
}

export function formatRelativeDate(value) {
  if (!value) return "Not attempted yet";
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
