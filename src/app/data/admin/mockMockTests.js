/**
 * Mock data for Mock Test management.
 * All data is static placeholder content for UI development.
 */

export const mockTestStats = {
  totalTests: 12,
  totalAttempts: 1124,
  publishedCount: 7,
  draftCount: 3,
  pendingCount: 2,
  averageScore: 67,
  averageDuration: 32,
  totalQuestions: 245,
};

export const placeholderMockTests = [
  { id: "MT001", title: "Java Basics — Full Syllabus", description: "Comprehensive test covering all Java fundamentals from Chapter 1-9", subject: "Computer Science", class: "10", questions: 50, duration: 60, durationUnit: "min", passingScore: 40, maxMarks: 100, attempts: 342, avgScore: 68, highestScore: 98, lowestScore: 22, status: "published", scheduledDate: "2026-07-20", created: "2026-07-01", lastModified: "2026-07-15", author: "Admin", instructions: "Read each question carefully. There is no negative marking for incorrect answers. Manage your time wisely." },
  { id: "MT002", title: "Chapter 1 — Fundamentals Quiz", description: "Quick assessment of Chapter 1 concepts", subject: "Computer Science", class: "10", questions: 15, duration: 15, durationUnit: "min", passingScore: 10, maxMarks: 30, attempts: 189, avgScore: 74, highestScore: 30, lowestScore: 8, status: "published", scheduledDate: "2026-07-18", created: "2026-06-28", lastModified: "2026-07-10", author: "Admin", instructions: "This is a short quiz on Java fundamentals. Answer all questions." },
  { id: "MT003", title: "Operators & Conditionals", description: "Test your understanding of operators and conditional statements", subject: "Computer Science", class: "10", questions: 20, duration: 20, durationUnit: "min", passingScore: 14, maxMarks: 40, attempts: 124, avgScore: 71, highestScore: 40, lowestScore: 10, status: "published", scheduledDate: "2026-07-22", created: "2026-06-25", lastModified: "2026-07-08", author: "Admin", instructions: "Focus on operator precedence and conditional logic." },
  { id: "MT004", title: "Loops & Arrays Practice", description: "Practice questions on loops and array manipulation", subject: "Computer Science", class: "10", questions: 25, duration: 30, durationUnit: "min", passingScore: 18, maxMarks: 50, attempts: 98, avgScore: 65, highestScore: 48, lowestScore: 12, status: "published", scheduledDate: "2026-07-25", created: "2026-06-20", lastModified: "2026-07-05", author: "Admin", instructions: "Write code snippets where required. Partial marks may be awarded." },
  { id: "MT005", title: "Methods & Constructors", description: "Assessment on methods and constructor overloading", subject: "Computer Science", class: "10", questions: 20, duration: 25, durationUnit: "min", passingScore: 14, maxMarks: 40, attempts: 56, avgScore: 72, highestScore: 40, lowestScore: 6, status: "draft", scheduledDate: "2026-08-01", created: "2026-06-15", lastModified: "2026-06-28", author: "Admin", instructions: "Ensure you understand method overloading and constructor chaining." },
  { id: "MT006", title: "ICSE 2025 Previous Year Paper", description: "Full previous year ICSE board paper for practice", subject: "Computer Science", class: "10", questions: 40, duration: 60, durationUnit: "min", passingScore: 28, maxMarks: 80, attempts: 278, avgScore: 61, highestScore: 76, lowestScore: 15, status: "published", scheduledDate: "2026-07-28", created: "2026-06-10", lastModified: "2026-07-01", author: "Admin", instructions: "This is a simulated board exam. Follow all ICSE exam guidelines." },
  { id: "MT007", title: "String Handling — Advanced", description: "Advanced questions on String class methods", subject: "Computer Science", class: "10", questions: 15, duration: 20, durationUnit: "min", passingScore: 10, maxMarks: 30, attempts: 34, avgScore: 58, highestScore: 28, lowestScore: 4, status: "pending", scheduledDate: "2026-08-05", created: "2026-06-05", lastModified: "2026-06-20", author: "Admin", instructions: "Focus on String methods like substring, indexOf, replace." },
  { id: "MT008", title: "ISC 2025 — Computer Science", description: "Full previous year ISC board paper", subject: "Computer Science", class: "12", questions: 40, duration: 90, durationUnit: "min", passingScore: 28, maxMarks: 80, attempts: 156, avgScore: 59, highestScore: 74, lowestScore: 18, status: "published", scheduledDate: "2026-07-26", created: "2026-06-01", lastModified: "2026-06-18", author: "Admin", instructions: "ISC board exam simulation. Answer all questions in the allotted time." },
  { id: "MT009", title: "Data Structures — Mock Test", description: "Test on arrays, linked lists, stacks and queues", subject: "Computer Science", class: "12", questions: 30, duration: 45, durationUnit: "min", passingScore: 21, maxMarks: 60, attempts: 45, avgScore: 63, highestScore: 56, lowestScore: 10, status: "published", scheduledDate: "2026-08-02", created: "2026-05-28", lastModified: "2026-06-10", author: "Admin", instructions: "Focus on algorithm complexity and data structure operations." },
  { id: "MT010", title: "Boolean Algebra — Revision", description: "Revision test on Boolean algebra concepts", subject: "Computer Science", class: "11", questions: 20, duration: 25, durationUnit: "min", passingScore: 14, maxMarks: 40, attempts: 78, avgScore: 70, highestScore: 40, lowestScore: 5, status: "draft", scheduledDate: "2026-08-10", created: "2026-05-20", lastModified: "2026-06-05", author: "Admin", instructions: "Focus on Boolean laws, De Morgan's theorem, and K-maps." },
  { id: "MT011", title: "Number Systems Practice", description: "Practice test on number system conversions", subject: "Computer Science", class: "11", questions: 15, duration: 20, durationUnit: "min", passingScore: 10, maxMarks: 30, attempts: 92, avgScore: 75, highestScore: 30, lowestScore: 3, status: "published", scheduledDate: "2026-07-30", created: "2026-05-15", lastModified: "2026-05-30", author: "Admin", instructions: "Binary, octal, hexadecimal conversions and arithmetic." },
  { id: "MT012", title: "Recursion & Algorithms", description: "Advanced test on recursion and algorithm design", subject: "Computer Science", class: "12", questions: 25, duration: 40, durationUnit: "min", passingScore: 18, maxMarks: 50, attempts: 23, avgScore: 55, highestScore: 42, lowestScore: 8, status: "pending", scheduledDate: "2026-08-15", created: "2026-05-10", lastModified: "2026-05-25", author: "Admin", instructions: "Trace recursive functions and analyze time complexity." },
];

export const mockTestFilterOptions = {
  subjects: [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Biology", label: "Biology" },
  ],
  classes: [
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ],
  statuses: [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending Review" },
    { value: "archived", label: "Archived" },
  ],
  durations: [
    { value: "15", label: "≤ 15 min" },
    { value: "30", label: "≤ 30 min" },
    { value: "60", label: "≤ 60 min" },
    { value: "90", label: "≤ 90 min" },
  ],
};