/**
 * studyMaterialData.js — Professional notes library data.
 */

export const pdfCards = [
  { id: "java-basics-guide", title: "Java Basics Guide", type: "PDF", category: "Notes", pages: 24, size: "2.4 MB", downloads: 1250, icon: "📄" },
  { id: "oop-concepts", title: "OOP Concepts Explained", type: "PDF", category: "Notes", pages: 18, size: "1.8 MB", downloads: 980, icon: "📄" },
  { id: "data-types-cheatsheet", title: "Data Types Cheatsheet", type: "PDF", category: "Cheat Sheet", pages: 2, size: "0.3 MB", downloads: 2100, icon: "📋" },
  { id: "control-flow-guide", title: "Control Flow Guide", type: "PDF", category: "Notes", pages: 15, size: "1.2 MB", downloads: 780, icon: "📄" },
  { id: "loop-constructs", title: "Loop Constructs Reference", type: "PDF", category: "Reference", pages: 8, size: "0.6 MB", downloads: 650, icon: "📄" },
  { id: "methods-guide", title: "Methods & Functions Guide", type: "PDF", category: "Notes", pages: 20, size: "1.5 MB", downloads: 890, icon: "📄" },
];

export const cheatSheets = [
  { id: "java-syntax", title: "Java Syntax Cheatsheet", icon: "⚡", items: 45, difficulty: "Beginner" },
  { id: "data-types-cs", title: "Data Types & Variables", icon: "📊", items: 30, difficulty: "Beginner" },
  { id: "operators-cs", title: "Operators Cheatsheet", icon: "➕", items: 25, difficulty: "Beginner" },
  { id: "oop-cs", title: "OOP Cheatsheet", icon: "🏗️", items: 35, difficulty: "Intermediate" },
  { id: "collections-cs", title: "Collections Framework", icon: "📦", items: 28, difficulty: "Advanced" },
  { id: "exceptions-cs", title: "Exception Handling", icon: "⚠️", items: 20, difficulty: "Intermediate" },
];

export const revisionNotes = [
  { id: "rn-1", title: "Java Fundamentals Revision", topics: 8, time: "20 min", icon: "📝" },
  { id: "rn-2", title: "Variables & Data Types Recap", topics: 5, time: "10 min", icon: "📝" },
  { id: "rn-3", title: "Operators Quick Review", topics: 6, time: "15 min", icon: "📝" },
  { id: "rn-4", title: "Control Flow Summary", topics: 4, time: "10 min", icon: "📝" },
  { id: "rn-5", title: "Loops Quick Reference", topics: 3, time: "8 min", icon: "📝" },
  { id: "rn-6", title: "Methods At A Glance", topics: 5, time: "12 min", icon: "📝" },
];

export const formulaSheets = [
  { id: "fs-1", title: "Math Operators Formulas", formulas: 12, icon: "📐" },
  { id: "fs-2", title: "String Methods Reference", formulas: 15, icon: "🔤" },
  { id: "fs-3", title: "Array Operations", formulas: 10, icon: "📊" },
  { id: "fs-4", title: "Type Conversion Rules", formulas: 8, icon: "🔄" },
];

export const programmingNotes = [
  { id: "pn-1", title: "Basic Java Programs", examples: 15, icon: "💻", difficulty: "Beginner" },
  { id: "pn-2", title: "Pattern Programs", examples: 20, icon: "💻", difficulty: "Intermediate" },
  { id: "pn-3", title: "Number Based Programs", examples: 18, icon: "💻", difficulty: "Intermediate" },
  { id: "pn-4", title: "String Programs", examples: 12, icon: "💻", difficulty: "Advanced" },
  { id: "pn-5", title: "Array Programs", examples: 16, icon: "💻", difficulty: "Advanced" },
  { id: "pn-6", title: "Recursion Programs", examples: 10, icon: "💻", difficulty: "Advanced" },
];

export const studyCategories = ["All", "Notes", "Cheat Sheet", "Reference", "Programming"];
export const studyTags = ["Java", "OOP", "Beginner", "Intermediate", "Advanced", "Syntax", "Algorithms"];