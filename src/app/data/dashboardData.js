/**
 * dashboardData.js — Realistic educational data for the learning dashboard.
 * All data is static/mock for frontend-only display.
 */

export const dailyGoalOptions = [5, 10, 15, 20, 25, 30];

export const weeklyGoalOptions = [25, 50, 75, 100, 150, 200];

export const monthlyGoalOptions = [100, 200, 300, 500, 750, 1000];

export const subjectCards = [
  { id: "java-intro", name: "Java Basics", icon: "☕", color: "bg-blue-50 border-blue-200", progress: 85, totalChapters: 5, completedChapters: 4 },
  { id: "variables", name: "Variables & Data Types", icon: "🔤", color: "bg-green-50 border-green-200", progress: 70, totalChapters: 3, completedChapters: 2 },
  { id: "operators", name: "Operators", icon: "➕", color: "bg-yellow-50 border-yellow-200", progress: 60, totalChapters: 4, completedChapters: 2 },
  { id: "control-flow", name: "Control Flow", icon: "🔄", color: "bg-purple-50 border-purple-200", progress: 45, totalChapters: 4, completedChapters: 1 },
  { id: "loops", name: "Loops", icon: "🔁", color: "bg-pink-50 border-pink-200", progress: 30, totalChapters: 3, completedChapters: 1 },
  { id: "methods", name: "Methods", icon: "⚙️", color: "bg-orange-50 border-orange-200", progress: 55, totalChapters: 4, completedChapters: 2 },
  { id: "arrays", name: "Arrays", icon: "📊", color: "bg-teal-50 border-teal-200", progress: 40, totalChapters: 5, completedChapters: 2 },
  { id: "strings", name: "Strings", icon: "📝", color: "bg-indigo-50 border-indigo-200", progress: 50, totalChapters: 4, completedChapters: 2 },
  { id: "constructors", name: "Constructors", icon: "🏗️", color: "bg-red-50 border-red-200", progress: 25, totalChapters: 3, completedChapters: 1 },
];

export const achievements = [
  { id: "first-question", icon: "🎯", title: "First Step", description: "Answered your first question", xp: 50 },
  { id: "streak-3", icon: "🔥", title: "On Fire", description: "3-day learning streak", xp: 100 },
  { id: "streak-7", icon: "💪", title: "Week Warrior", description: "7-day learning streak", xp: 250 },
  { id: "ten-questions", icon: "📚", title: "Getting Started", description: "Answered 10 questions", xp: 75 },
  { id: "fifty-questions", icon: "⭐", title: "Dedicated Learner", description: "Answered 50 questions", xp: 200 },
  { id: "hundred-questions", icon: "👑", title: "Century", description: "Answered 100 questions", xp: 500 },
  { id: "perfect-test", icon: "💯", title: "Perfect Score", description: "100% on a mock test", xp: 300 },
  { id: "all-chapters", icon: "🏆", title: "Completionist", description: "Completed all chapters", xp: 1000 },
  { id: "bookmark-10", icon: "🔖", title: "Curator", description: "Bookmarked 10 questions", xp: 100 },
  { id: "mock-test-5", icon: "📝", title: "Test Taker", description: "Completed 5 mock tests", xp: 200 },
];

export const recentActivity = [
  { id: 1, type: "completed", title: "What is Java?", subject: "Java Basics", time: "2 min ago" },
  { id: 2, type: "completed", title: "Variable declaration syntax", subject: "Variables & Data Types", time: "15 min ago" },
  { id: 3, type: "bookmarked", title: "Difference between int and float", subject: "Variables & Data Types", time: "1 hour ago" },
  { id: 4, type: "test", title: "ICSE Class 10 Mock Test", subject: "Mixed", time: "2 hours ago", score: "8/10" },
  { id: 5, type: "completed", title: "What is an operator?", subject: "Operators", time: "Yesterday" },
  { id: 6, type: "completed", title: "Understanding if-else", subject: "Control Flow", time: "Yesterday" },
  { id: 7, type: "started", title: "Arrays chapter", subject: "Arrays", time: "2 days ago" },
];

export const recommendedTopics = [
  { id: 1, title: "Nested Loops", subject: "Loops", difficulty: "Medium", reason: "Next in your learning path" },
  { id: 2, title: "Method Overloading", subject: "Methods", difficulty: "Hard", reason: "Weak area identified" },
  { id: 3, title: "Array Indexing", subject: "Arrays", difficulty: "Easy", reason: "Quick revision recommended" },
  { id: 4, title: "String Methods", subject: "Strings", difficulty: "Medium", reason: "Popular topic" },
];

export const smartSuggestions = [
  { id: 1, icon: "⚡", title: "Quick Practice", description: "5 random questions to warm up", action: "Start" },
  { id: 2, icon: "📖", title: "Daily Revision", description: "Review yesterday's mistakes", action: "Review" },
  { id: 3, icon: "🎯", title: "Chapter Challenge", description: "Complete the current chapter", action: "Continue" },
  { id: 4, icon: "🏅", title: "Weekly Goal", description: "You're 60% to your weekly goal", action: "View" },
];

export const heatmapData = (() => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.random() > 0.6 ? Math.floor(Math.random() * 15) : 0;
    data.push({
      date: date.toISOString().split("T")[0],
      count,
    });
  }
  return data;
})();

export const xpLevels = [
  { level: 1, xpRequired: 0, title: "Beginner" },
  { level: 2, xpRequired: 200, title: "Apprentice" },
  { level: 3, xpRequired: 500, title: "Scholar" },
  { level: 4, xpRequired: 1000, title: "Learner" },
  { level: 5, xpRequired: 2000, title: "Achiever" },
  { level: 6, xpRequired: 3500, title: "Expert" },
  { level: 7, xpRequired: 5000, title: "Master" },
  { level: 8, xpRequired: 7500, title: "Genius" },
  { level: 9, xpRequired: 10000, title: "Legend" },
  { level: 10, xpRequired: 15000, title: "Grandmaster" },
];