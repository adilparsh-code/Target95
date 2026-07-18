/**
 * Mock data for Student management.
 * All data is static placeholder content for UI development.
 */

export const studentStats = {
  totalStudents: 342,
  activeStudents: 278,
  inactiveStudents: 48,
  pendingStudents: 16,
  totalQuestionsSolved: 12456,
  averageScore: 73,
  totalTestsAttempted: 1124,
  averageAttendance: 82,
  classDistribution: {
    "9": 45,
    "10": 156,
    "11": 78,
    "12": 63,
  },
  gradeDistribution: {
    ICSE: 201,
    ISC: 141,
  },
};

export const placeholderStudents = [
  { id: "S001", name: "Rahul Sharma", email: "rahul.sharma@example.com", phone: "+91-9876543210", class: "10", grade: "ICSE", school: "St. Xavier's School", city: "Mumbai", questionsSolved: 342, avgScore: 78, testsAttempted: 12, attendance: 85, lastActive: "2026-07-18", status: "active", joined: "2026-01-15", avatar: null },
  { id: "S002", name: "Priya Patel", email: "priya.patel@example.com", phone: "+91-9876543211", class: "10", grade: "ICSE", school: "Delhi Public School", city: "Delhi", questionsSolved: 289, avgScore: 82, testsAttempted: 10, attendance: 90, lastActive: "2026-07-18", status: "active", joined: "2026-02-20", avatar: null },
  { id: "S003", name: "Amit Singh", email: "amit.singh@example.com", phone: "+91-9876543212", class: "12", grade: "ISC", school: "St. Joseph's College", city: "Bangalore", questionsSolved: 156, avgScore: 65, testsAttempted: 6, attendance: 70, lastActive: "2026-07-15", status: "active", joined: "2026-03-05", avatar: null },
  { id: "S004", name: "Sneha Reddy", email: "sneha.reddy@example.com", phone: "+91-9876543213", class: "10", grade: "ICSE", school: "St. Francis School", city: "Hyderabad", questionsSolved: 412, avgScore: 91, testsAttempted: 15, attendance: 95, lastActive: "2026-07-18", status: "active", joined: "2026-01-10", avatar: null },
  { id: "S005", name: "Vikram Joshi", email: "vikram.joshi@example.com", phone: "+91-9876543214", class: "12", grade: "ISC", school: "St. Mary's Academy", city: "Pune", questionsSolved: 98, avgScore: 55, testsAttempted: 4, attendance: 45, lastActive: "2026-07-01", status: "inactive", joined: "2026-04-12", avatar: null },
  { id: "S006", name: "Ananya Gupta", email: "ananya.gupta@example.com", phone: "+91-9876543215", class: "10", grade: "ICSE", school: "St. Xavier's School", city: "Kolkata", questionsSolved: 267, avgScore: 76, testsAttempted: 9, attendance: 80, lastActive: "2026-07-17", status: "active", joined: "2026-02-28", avatar: null },
  { id: "S007", name: "Rohit Verma", email: "rohit.verma@example.com", phone: "+91-9876543216", class: "12", grade: "ISC", school: "St. Joseph's College", city: "Chennai", questionsSolved: 189, avgScore: 70, testsAttempted: 7, attendance: 75, lastActive: "2026-07-10", status: "pending", joined: "2026-05-01", avatar: null },
  { id: "S008", name: "Kavita Das", email: "kavita.das@example.com", phone: "+91-9876543217", class: "10", grade: "ICSE", school: "Delhi Public School", city: "Delhi", questionsSolved: 334, avgScore: 85, testsAttempted: 13, attendance: 92, lastActive: "2026-07-18", status: "active", joined: "2026-01-22", avatar: null },
  { id: "S009", name: "Arjun Nair", email: "arjun.nair@example.com", phone: "+91-9876543218", class: "12", grade: "ISC", school: "St. Mary's Academy", city: "Kochi", questionsSolved: 45, avgScore: 48, testsAttempted: 2, attendance: 30, lastActive: "2026-06-20", status: "inactive", joined: "2026-05-15", avatar: null },
  { id: "S010", name: "Neha Kapoor", email: "neha.kapoor@example.com", phone: "+91-9876543219", class: "10", grade: "ICSE", school: "St. Francis School", city: "Mumbai", questionsSolved: 278, avgScore: 80, testsAttempted: 11, attendance: 88, lastActive: "2026-07-17", status: "active", joined: "2026-03-18", avatar: null },
  { id: "S011", name: "Ravi Kumar", email: "ravi.kumar@example.com", phone: "+91-9876543220", class: "11", grade: "ISC", school: "St. Joseph's College", city: "Patna", questionsSolved: 134, avgScore: 62, testsAttempted: 5, attendance: 65, lastActive: "2026-07-14", status: "active", joined: "2026-04-01", avatar: null },
  { id: "S012", name: "Meera Iyer", email: "meera.iyer@example.com", phone: "+91-9876543221", class: "9", grade: "ICSE", school: "St. Xavier's School", city: "Mumbai", questionsSolved: 89, avgScore: 88, testsAttempted: 3, attendance: 78, lastActive: "2026-07-16", status: "active", joined: "2026-05-20", avatar: null },
  { id: "S013", name: "Karan Mehta", email: "karan.mehta@example.com", phone: "+91-9876543222", class: "11", grade: "ISC", school: "Delhi Public School", city: "Delhi", questionsSolved: 201, avgScore: 72, testsAttempted: 8, attendance: 82, lastActive: "2026-07-15", status: "active", joined: "2026-03-10", avatar: null },
  { id: "S014", name: "Divya Sharma", email: "divya.sharma@example.com", phone: "+91-9876543223", class: "10", grade: "ICSE", school: "St. Mary's Academy", city: "Jaipur", questionsSolved: 312, avgScore: 86, testsAttempted: 14, attendance: 91, lastActive: "2026-07-18", status: "active", joined: "2026-01-28", avatar: null },
  { id: "S015", name: "Pranav Desai", email: "pranav.desai@example.com", phone: "+91-9876543224", class: "12", grade: "ISC", school: "St. Joseph's College", city: "Ahmedabad", questionsSolved: 167, avgScore: 68, testsAttempted: 6, attendance: 72, lastActive: "2026-07-12", status: "pending", joined: "2026-04-15", avatar: null },
];

export const studentFilterOptions = {
  classes: [
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ],
  grades: [
    { value: "ICSE", label: "ICSE" },
    { value: "ISC", label: "ISC" },
  ],
  statuses: [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ],
  scoreRanges: [
    { value: "90-100", label: "90-100%" },
    { value: "75-89", label: "75-89%" },
    { value: "60-74", label: "60-74%" },
    { value: "40-59", label: "40-59%" },
    { value: "0-39", label: "Below 40%" },
  ],
};

export const studentPerformanceData = {
  monthlyScores: [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 68 },
    { month: "Apr", score: 75 },
    { month: "May", score: 72 },
    { month: "Jun", score: 78 },
    { month: "Jul", score: 82 },
  ],
  chapterProgress: [
    { chapter: "Ch 1 - Fundamentals", completed: 95 },
    { chapter: "Ch 2 - Operators", completed: 88 },
    { chapter: "Ch 3 - Conditionals", completed: 82 },
    { chapter: "Ch 4 - Loops", completed: 76 },
    { chapter: "Ch 5 - Methods", completed: 70 },
    { chapter: "Ch 6 - Arrays", completed: 65 },
    { chapter: "Ch 7 - Strings", completed: 58 },
    { chapter: "Ch 8 - Constructors", completed: 52 },
    { chapter: "Ch 9 - Inheritance", completed: 45 },
  ],
  testHistory: [
    { id: "MT001", title: "Java Basics — Full Syllabus", score: 78, maxMarks: 100, date: "2026-07-15", status: "completed" },
    { id: "MT002", title: "Chapter 1 — Fundamentals Quiz", score: 28, maxMarks: 30, date: "2026-07-10", status: "completed" },
    { id: "MT003", title: "Operators & Conditionals", score: 34, maxMarks: 40, date: "2026-07-05", status: "completed" },
    { id: "MT004", title: "Loops & Arrays Practice", score: 40, maxMarks: 50, date: "2026-06-28", status: "completed" },
    { id: "MT006", title: "ICSE 2025 Previous Year Paper", score: 62, maxMarks: 80, date: "2026-06-20", status: "completed" },
  ],
};