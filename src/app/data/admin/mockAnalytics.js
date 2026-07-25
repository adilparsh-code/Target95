/**
 * Mock data for Analytics Dashboard.
 * All data is static placeholder content for UI development.
 */

export const analyticsOverview = {
  activeUsers: 187,
  activeUsersTrend: 12,
  questionsAnswered: 2847,
  questionsAnsweredTrend: 8,
  avgSessionTime: "24m",
  avgSessionTimeTrend: 5,
  completionRate: 73,
  completionRateTrend: 3,
  totalStudents: 342,
  totalStudentsTrend: 18,
  totalTeachers: 12,
  totalTeachersTrend: 0,
  totalQuestions: 1248,
  totalQuestionsTrend: 15,
  totalTestsCompleted: 1124,
  totalTestsTrend: 22,
};

export const dailyActivity = [
  { day: "Mon", users: 45, answers: 320 },
  { day: "Tue", users: 52, answers: 410 },
  { day: "Wed", users: 48, answers: 385 },
  { day: "Thu", users: 61, answers: 456 },
  { day: "Fri", users: 55, answers: 420 },
  { day: "Sat", users: 72, answers: 520 },
  { day: "Sun", users: 68, answers: 336 },
];

export const chapterPerformance = [
  { chapter: "Chapter 1 — Fundamentals", avgScore: 82, attempts: 456, completionRate: 91 },
  { chapter: "Chapter 2 — Operators", avgScore: 78, attempts: 389, completionRate: 85 },
  { chapter: "Chapter 3 — Conditionals", avgScore: 75, attempts: 342, completionRate: 79 },
  { chapter: "Chapter 4 — Loops", avgScore: 71, attempts: 298, completionRate: 74 },
  { chapter: "Chapter 5 — Methods", avgScore: 68, attempts: 267, completionRate: 70 },
  { chapter: "Chapter 6 — Arrays", avgScore: 65, attempts: 234, completionRate: 66 },
  { chapter: "Chapter 7 — String Handling", avgScore: 62, attempts: 198, completionRate: 58 },
  { chapter: "Chapter 8 — Constructors", avgScore: 59, attempts: 167, completionRate: 52 },
  { chapter: "Chapter 9 — Inheritance", avgScore: 56, attempts: 145, completionRate: 47 },
];

export const questionStats = {
  total: 1248,
  byType: {
    Theory: 520,
    MCQ: 480,
    Coding: 248,
  },
  byDifficulty: {
    Easy: 420,
    Medium: 480,
    Hard: 348,
  },
  byStatus: {
    Published: 890,
    Draft: 210,
    Pending: 98,
    Archived: 50,
  },
};

export const subjectPerformance = [
  { subject: "Computer Science", students: 342, avgScore: 72, testsCompleted: 1124, improvement: 8 },
  { subject: "Java Programming", students: 280, avgScore: 75, testsCompleted: 890, improvement: 12 },
  { subject: "Python", students: 120, avgScore: 78, testsCompleted: 450, improvement: 15 },
  { subject: "Data Structures", students: 95, avgScore: 68, testsCompleted: 320, improvement: 5 },
  { subject: "Web Development", students: 60, avgScore: 70, testsCompleted: 180, improvement: 10 },
];

export const monthlyGrowth = [
  { month: "Jan", users: 120, questions: 800, tests: 60 },
  { month: "Feb", users: 145, questions: 920, tests: 75 },
  { month: "Mar", users: 160, questions: 1050, tests: 88 },
  { month: "Apr", users: 175, questions: 1100, tests: 95 },
  { month: "May", users: 168, questions: 1080, tests: 90 },
  { month: "Jun", users: 182, questions: 1180, tests: 102 },
  { month: "Jul", users: 195, questions: 1248, tests: 110 },
];

export const recentActivity = [
  { action: "New question added", detail: "Chapter 5 — Methods", user: "Admin", time: "2 minutes ago", type: "addition" },
  { action: "Student registered", detail: "Rahul Sharma — Class 10", user: "System", time: "15 minutes ago", type: "registration" },
  { action: "Study note updated", detail: "Chapter 3 — Arrays", user: "Admin", time: "1 hour ago", type: "update" },
  { action: "Mock test completed", detail: "Java Basics — 42 students", user: "System", time: "2 hours ago", type: "completion" },
  { action: "Chapter modified", detail: "Chapter 7 — Constructors", user: "Admin", time: "3 hours ago", type: "update" },
  { action: "Teacher account created", detail: "Mrs. Priya Singh", user: "Admin", time: "5 hours ago", type: "addition" },
  { action: "Question deleted", detail: "Q024 — Duplicate entry", user: "Admin", time: "6 hours ago", type: "deletion" },
  { action: "Student achieved 100%", detail: "Sneha Reddy — Chapter 1 Quiz", user: "System", time: "8 hours ago", type: "achievement" },
  { action: "New mock test published", detail: "ICSE 2025 Full Syllabus", user: "Admin", time: "1 day ago", type: "publication" },
  { action: "System backup completed", detail: "Daily backup — 2.4 GB", user: "System", time: "1 day ago", type: "system" },
];

export const topPerformers = [
  { name: "Sneha Reddy", score: 91, class: "10", grade: "ICSE" },
  { name: "Meera Iyer", score: 88, class: "9", grade: "ICSE" },
  { name: "Divya Sharma", score: 86, class: "10", grade: "ICSE" },
  { name: "Kavita Das", score: 85, class: "10", grade: "ICSE" },
  { name: "Priya Patel", score: 82, class: "10", grade: "ICSE" },
];