const mockTeacherData = {
  totalStudents: 156,
  activeStudents: 89,
  todayAttendance: 92,
  assignmentSubmitted: 68,
  assignmentTotal: 85,

  testPerformance: [
    { name: "Mid-Term Exam", avgScore: 72, totalStudents: 156 },
    { name: "Weekly Test 4", avgScore: 65, totalStudents: 148 },
    { name: "Weekly Test 3", avgScore: 78, totalStudents: 152 },
    { name: "Weekly Test 2", avgScore: 70, totalStudents: 150 },
    { name: "Weekly Test 1", avgScore: 82, totalStudents: 155 },
  ],

  weakTopics: [
    { topic: "Constructor Overloading", avgScore: 45, studentsStruggling: 62 },
    { topic: "Binary Search", avgScore: 48, studentsStruggling: 55 },
    { topic: "String Manipulation", avgScore: 52, studentsStruggling: 48 },
    { topic: "2D Arrays", avgScore: 55, studentsStruggling: 42 },
    { topic: "Recursion", avgScore: 58, studentsStruggling: 38 },
  ],

  topPerformers: [
    { name: "Aanya Sharma", score: 98, class: "ISC 12" },
    { name: "Arjun Mehta", score: 96, class: "ICSE 10" },
    { name: "Priya Patel", score: 95, class: "ISC 12" },
    { name: "Rohit Singh", score: 94, class: "ICSE 10" },
    { name: "Sneha Reddy", score: 93, class: "ISC 11" },
  ],

  students: [
    { id: 1, name: "Aanya Sharma", class: "ISC 12", attendance: 95, avgScore: 98, assignmentsDone: 12, status: "Excellent" },
    { id: 2, name: "Arjun Mehta", class: "ICSE 10", attendance: 92, avgScore: 96, assignmentsDone: 11, status: "Excellent" },
    { id: 3, name: "Priya Patel", class: "ISC 12", attendance: 98, avgScore: 95, assignmentsDone: 12, status: "Excellent" },
    { id: 4, name: "Rohit Singh", class: "ICSE 10", attendance: 88, avgScore: 94, assignmentsDone: 10, status: "Good" },
    { id: 5, name: "Sneha Reddy", class: "ISC 11", attendance: 90, avgScore: 93, assignmentsDone: 11, status: "Good" },
    { id: 6, name: "Vikram Joshi", class: "ISC 12", attendance: 85, avgScore: 72, assignmentsDone: 8, status: "Average" },
    { id: 7, name: "Neha Kapoor", class: "ICSE 9", attendance: 78, avgScore: 45, assignmentsDone: 5, status: "Needs Help" },
    { id: 8, name: "Karan Verma", class: "ISC 11", attendance: 95, avgScore: 88, assignmentsDone: 10, status: "Good" },
    { id: 9, name: "Isha Gupta", class: "ICSE 10", attendance: 82, avgScore: 55, assignmentsDone: 6, status: "Needs Help" },
    { id: 10, name: "Ravi Desai", class: "ISC 12", attendance: 91, avgScore: 76, assignmentsDone: 9, status: "Average" },
  ],

  notifications: [
    { id: 1, message: "Neha Kapoor scored below 50% on weekly test", type: "alert", time: "2 hours ago" },
    { id: 2, message: "5 students submitted assignments late", type: "warning", time: "3 hours ago" },
    { id: 3, message: "Class 12 performance improved by 5% this week", type: "success", time: "1 day ago" },
    { id: 4, message: "New study material added for ICSE 10", type: "info", time: "2 days ago" },
    { id: 5, message: "Schedule parent-teacher meeting for next week", type: "reminder", time: "3 days ago" },
  ],

  upcomingTasks: [
    { id: 1, title: "Grade weekly test papers", due: "Tomorrow", priority: "High" },
    { id: 2, title: "Prepare ISC 12 revision notes", due: "In 2 days", priority: "Medium" },
    { id: 3, title: "Schedule doubt-clearing session", due: "This Friday", priority: "Medium" },
    { id: 4, title: "Upload practice questions for ICSE 9", due: "Next week", priority: "Low" },
  ],
};

export default mockTeacherData;