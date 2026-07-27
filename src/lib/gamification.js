export const XP_REWARDS = { question: 10, chapter: 100, dailyLogin: 15, mockTest: 50, dailyChallenge: 75 };

export const BADGES = [
  { id: "first-question", title: "First Question", description: "Solve your first question", condition: (data) => data.solved >= 1 },
  { id: "correct-ten", title: "10 Correct Answers", description: "Answer 10 questions correctly", condition: (data) => data.solved >= 10 },
  { id: "questions-hundred", title: "100 Questions", description: "Solve 100 questions", condition: (data) => data.solved >= 100 },
  { id: "java-master", title: "Java Master", description: "Complete a Java chapter", condition: (data) => data.completedChapters >= 1 },
  { id: "streak-seven", title: "7-Day Streak", description: "Study for seven consecutive days", condition: (data) => data.streak >= 7 },
  { id: "perfect-mock", title: "Perfect Mock", description: "Score 100% in a mock test", condition: (data) => data.perfectMock },
  { id: "fast-solver", title: "Fast Solver", description: "Complete a daily challenge", condition: (data) => data.challengeComplete },
];

export function getDailyChallenge(date = new Date()) {
  const seed = date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDate();
  const challenges = [
    { title: "Java foundations sprint", questions: 5, difficulty: "Easy", estimatedTime: "10 min", topic: "Variables and data types" },
    { title: "Logic builder", questions: 5, difficulty: "Medium", estimatedTime: "15 min", topic: "Conditions and operators" },
    { title: "Trace and solve", questions: 4, difficulty: "Medium", estimatedTime: "15 min", topic: "Loops and output" },
  ];
  return { id: `daily-${date.toISOString().slice(0, 10)}`, ...challenges[seed % challenges.length], reward: XP_REWARDS.dailyChallenge };
}

export function getNextChallengeCountdown(now = new Date()) {
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  const remaining = Math.max(0, tomorrow.getTime() - now.getTime());
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

export const LEADERBOARD = [
  { rank: 1, student: "Aarav Mehta", xp: 2460, solved: 214, accuracy: 92 },
  { rank: 2, student: "Diya Sharma", xp: 2210, solved: 196, accuracy: 89 },
  { rank: 3, student: "Kabir Singh", xp: 1980, solved: 177, accuracy: 87 },
  { rank: 4, student: "Meera Iyer", xp: 1740, solved: 151, accuracy: 85 },
];

export function getMotivationMessages({ xpToNext, questionsToNext, challengeComplete, chapterRemaining }) {
  return [
    questionsToNext > 0 ? `You are only ${questionsToNext} questions away from your next milestone.` : "You reached a question milestone—keep building momentum.",
    challengeComplete ? "Today's challenge is complete. Return tomorrow for a fresh bonus." : "Complete today's challenge to earn bonus XP.",
    chapterRemaining > 0 ? `Finish ${chapterRemaining} more questions in this chapter to unlock new progress.` : "Start a new chapter to keep your streak moving.",
    xpToNext > 0 ? `${xpToNext} XP to your next level.` : "You have reached the highest available level.",
  ];
}
