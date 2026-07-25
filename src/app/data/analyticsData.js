/**
 * analyticsData.js — Mock analytics data for performance analytics.
 */

export const subjectPerformance = [
  { name: "Java Basics", score: 85, total: 100, color: "bg-blue-500" },
  { name: "Variables", score: 70, total: 100, color: "bg-green-500" },
  { name: "Operators", score: 60, total: 100, color: "bg-yellow-500" },
  { name: "Control Flow", score: 45, total: 100, color: "bg-purple-500" },
  { name: "Loops", score: 30, total: 100, color: "bg-pink-500" },
  { name: "Methods", score: 55, total: 100, color: "bg-orange-500" },
  { name: "Arrays", score: 40, total: 100, color: "bg-teal-500" },
  { name: "Strings", score: 50, total: 100, color: "bg-indigo-500" },
  { name: "Constructors", score: 25, total: 100, color: "bg-red-500" },
];

export const weeklyPerformance = [
  { week: "Week 1", score: 65, accuracy: 70, questions: 20 },
  { week: "Week 2", score: 72, accuracy: 75, questions: 25 },
  { week: "Week 3", score: 58, accuracy: 60, questions: 18 },
  { week: "Week 4", score: 80, accuracy: 82, questions: 30 },
  { week: "Week 5", score: 75, accuracy: 78, questions: 28 },
  { week: "Week 6", score: 88, accuracy: 90, questions: 35 },
  { week: "Week 7", score: 82, accuracy: 85, questions: 32 },
  { week: "Week 8", score: 90, accuracy: 92, questions: 40 },
];

export const monthlyPerformance = [
  { month: "Jan", score: 60, questions: 50 },
  { month: "Feb", score: 68, questions: 65 },
  { month: "Mar", score: 72, questions: 80 },
  { month: "Apr", score: 78, questions: 95 },
  { month: "May", score: 70, questions: 70 },
  { month: "Jun", score: 85, questions: 110 },
  { month: "Jul", score: 82, questions: 100 },
];

export const questionDistribution = [
  { type: "MCQ", count: 45, color: "bg-blue-500" },
  { type: "Theory", count: 30, color: "bg-green-500" },
  { type: "Programming", count: 20, color: "bg-yellow-500" },
  { type: "Output", count: 15, color: "bg-purple-500" },
  { type: "True/False", count: 10, color: "bg-pink-500" },
];

export const weakAreas = [
  { topic: "Constructors", proficiency: 25, color: "bg-red-500" },
  { topic: "Loops", proficiency: 30, color: "bg-red-400" },
  { topic: "Arrays", proficiency: 40, color: "bg-orange-400" },
  { topic: "Control Flow", proficiency: 45, color: "bg-yellow-400" },
];

export const strongAreas = [
  { topic: "Java Basics", proficiency: 85, color: "bg-green-500" },
  { topic: "Variables", proficiency: 70, color: "bg-green-400" },
  { topic: "Operators", proficiency: 60, color: "bg-blue-400" },
];

export const leaderboardData = [
  { rank: 1, name: "Priya S.", xp: 12500, level: 8, avatar: "👩‍🎓" },
  { rank: 2, name: "Arjun K.", xp: 11200, level: 7, avatar: "👨‍🎓" },
  { rank: 3, name: "Ananya M.", xp: 9800, level: 7, avatar: "👩‍🎓" },
  { rank: 4, name: "Rahul V.", xp: 8500, level: 6, avatar: "👨‍🎓" },
  { rank: 5, name: "Sneha P.", xp: 7200, level: 6, avatar: "👩‍🎓" },
  { rank: 6, name: "Vikram J.", xp: 6500, level: 5, avatar: "👨‍🎓" },
  { rank: 7, name: "Neha G.", xp: 5800, level: 5, avatar: "👩‍🎓" },
  { rank: 8, name: "Karan D.", xp: 4200, level: 4, avatar: "👨‍🎓" },
  { rank: 9, name: "Isha T.", xp: 3500, level: 4, avatar: "👩‍🎓" },
  { rank: 10, name: "Rohit S.", xp: 2800, level: 3, avatar: "👨‍🎓" },
];

export const practiceHistory = [
  { date: "2026-07-20", type: "Quick Practice", score: 8, total: 10, time: "12m", subject: "Mixed" },
  { date: "2026-07-19", type: "Chapter Practice", score: 6, total: 8, time: "15m", subject: "Operators" },
  { date: "2026-07-18", type: "Mock Test", score: 14, total: 20, time: "30m", subject: "ICSE Class 10" },
  { date: "2026-07-17", type: "Timed Practice", score: 7, total: 10, time: "10m", subject: "Variables" },
  { date: "2026-07-16", type: "Mixed Practice", score: 12, total: 15, time: "20m", subject: "Mixed" },
  { date: "2026-07-15", type: "Quick Practice", score: 9, total: 10, time: "8m", subject: "Java Basics" },
];