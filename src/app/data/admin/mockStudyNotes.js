/**
 * Mock data for Study Notes management.
 * All data is static placeholder content for UI development.
 */

export const notesStats = {
  totalNotes: 48,
  totalPDFs: 32,
  totalVideos: 12,
  totalDocuments: 4,
  publishedCount: 28,
  draftCount: 12,
  pendingCount: 5,
  archivedCount: 3,
  totalDownloads: 1248,
  totalViews: 3456,
};

export const placeholderNotes = [
  { id: "N001", title: "Java Fundamentals — Complete Guide", chapter: "Chapter 1 - Introduction to Java", subject: "Computer Science", class: "10", type: "PDF", pages: 24, fileSize: "2.4 MB", status: "published", downloads: 234, views: 567, uploaded: "2026-07-14", lastModified: "2026-07-14", author: "Admin" },
  { id: "N002", title: "Operators Quick Reference", chapter: "Chapter 2 - Operators", subject: "Computer Science", class: "10", type: "PDF", pages: 8, fileSize: "1.1 MB", status: "published", downloads: 189, views: 423, uploaded: "2026-07-12", lastModified: "2026-07-12", author: "Admin" },
  { id: "N003", title: "Conditional Statements Cheat Sheet", chapter: "Chapter 3 - Conditional Statements", subject: "Computer Science", class: "10", type: "PDF", pages: 6, fileSize: "0.8 MB", status: "published", downloads: 156, views: 345, uploaded: "2026-07-10", lastModified: "2026-07-10", author: "Admin" },
  { id: "N004", title: "Loops — For, While, Do-While", chapter: "Chapter 4 - Loops", subject: "Computer Science", class: "10", type: "Video", pages: null, fileSize: "45 MB", duration: "12:30", status: "published", downloads: 98, views: 289, uploaded: "2026-07-08", lastModified: "2026-07-08", author: "Admin" },
  { id: "N005", title: "Methods in Java — Deep Dive", chapter: "Chapter 5 - Methods", subject: "Computer Science", class: "10", type: "PDF", pages: 18, fileSize: "1.8 MB", status: "draft", downloads: 0, views: 0, uploaded: "2026-07-05", lastModified: "2026-07-06", author: "Admin" },
  { id: "N006", title: "Array Traversal Techniques", chapter: "Chapter 6 - Arrays", subject: "Computer Science", class: "10", type: "PDF", pages: 12, fileSize: "1.3 MB", status: "published", downloads: 134, views: 312, uploaded: "2026-07-01", lastModified: "2026-07-01", author: "Admin" },
  { id: "N007", title: "String Handling — All Methods", chapter: "Chapter 7 - Strings", subject: "Computer Science", class: "10", type: "Video", pages: null, fileSize: "52 MB", duration: "15:45", status: "pending", downloads: 0, views: 0, uploaded: "2026-06-28", lastModified: "2026-06-28", author: "Admin" },
  { id: "N008", title: "Constructor Overloading Examples", chapter: "Chapter 8 - Constructors", subject: "Computer Science", class: "10", type: "PDF", pages: 10, fileSize: "1.0 MB", status: "draft", downloads: 0, views: 0, uploaded: "2026-06-25", lastModified: "2026-06-26", author: "Admin" },
  { id: "N009", title: "Inheritance Basics", chapter: "Chapter 9 - Inheritance", subject: "Computer Science", class: "10", type: "PDF", pages: 15, fileSize: "1.5 MB", status: "published", downloads: 87, views: 198, uploaded: "2026-06-20", lastModified: "2026-06-20", author: "Admin" },
  { id: "N010", title: "Encapsulation & Polymorphism", chapter: "Chapter 9 - Inheritance", subject: "Computer Science", class: "10", type: "Document", pages: 20, fileSize: "2.1 MB", status: "published", downloads: 67, views: 145, uploaded: "2026-06-18", lastModified: "2026-06-18", author: "Admin" },
  { id: "N011", title: "Number System Conversions", chapter: "Chapter 1 - Number Systems", subject: "Computer Science", class: "11", type: "PDF", pages: 22, fileSize: "2.8 MB", status: "published", downloads: 112, views: 256, uploaded: "2026-06-15", lastModified: "2026-06-15", author: "Admin" },
  { id: "N012", title: "Boolean Algebra Notes", chapter: "Chapter 2 - Boolean Algebra", subject: "Computer Science", class: "11", type: "PDF", pages: 16, fileSize: "1.6 MB", status: "draft", downloads: 0, views: 0, uploaded: "2026-06-12", lastModified: "2026-06-13", author: "Admin" },
  { id: "N013", title: "Data Structures Overview", chapter: "Chapter 3 - Data Structures", subject: "Computer Science", class: "12", type: "Video", pages: null, fileSize: "68 MB", duration: "22:10", status: "published", downloads: 56, views: 134, uploaded: "2026-06-10", lastModified: "2026-06-10", author: "Admin" },
  { id: "N014", title: "Recursion Made Easy", chapter: "Chapter 4 - Recursion", subject: "Computer Science", class: "12", type: "PDF", pages: 14, fileSize: "1.4 MB", status: "pending", downloads: 0, views: 0, uploaded: "2026-06-08", lastModified: "2026-06-08", author: "Admin" },
  { id: "N015", title: "File Handling in Java", chapter: "Chapter 5 - File I/O", subject: "Computer Science", class: "12", type: "Document", pages: 18, fileSize: "1.9 MB", status: "archived", downloads: 45, views: 98, uploaded: "2026-06-05", lastModified: "2026-06-05", author: "Admin" },
];

export const notesFilterOptions = {
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
  chapters: [
    { value: "Chapter 1", label: "Chapter 1" },
    { value: "Chapter 2", label: "Chapter 2" },
    { value: "Chapter 3", label: "Chapter 3" },
    { value: "Chapter 4", label: "Chapter 4" },
    { value: "Chapter 5", label: "Chapter 5" },
    { value: "Chapter 6", label: "Chapter 6" },
    { value: "Chapter 7", label: "Chapter 7" },
    { value: "Chapter 8", label: "Chapter 8" },
    { value: "Chapter 9", label: "Chapter 9" },
  ],
  types: [
    { value: "PDF", label: "PDF" },
    { value: "Video", label: "Video" },
    { value: "Document", label: "Document" },
  ],
  statuses: [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending Review" },
    { value: "archived", label: "Archived" },
  ],
};