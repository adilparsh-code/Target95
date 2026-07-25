/**
 * roadmapData.js — Full curriculum data for ICSE Class 9/10 and ISC Class 11/12.
 */

export const roadmapClasses = [
  {
    id: "icse-class-9",
    label: "ICSE Class 9",
    icon: "📘",
    color: "border-purple-300 bg-purple-50",
    subjects: [
      {
        id: "computer-applications-9",
        name: "Computer Applications",
        chapters: [
          { id: "intro-to-java-9", title: "Introduction to Java", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "completed" },
          { id: "variables-9", title: "Variables & Data Types", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "completed" },
          { id: "operators-9", title: "Operators in Java", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "active" },
          { id: "if-else-9", title: "Conditional Statements", lessons: 3, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "loops-9", title: "Looping Constructs", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "methods-9", title: "Methods", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "arrays-9", title: "Arrays", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "strings-9", title: "String Handling", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
        ],
      },
    ],
  },
  {
    id: "icse-class-10",
    label: "ICSE Class 10",
    icon: "📗",
    color: "border-green-300 bg-green-50",
    subjects: [
      {
        id: "computer-applications-10",
        name: "Computer Applications",
        chapters: [
          { id: "revision-10", title: "Revision of Class 9", lessons: 2, practice: 2, revision: 1, mockTest: 1, status: "completed" },
          { id: "constructors-10", title: "Constructors", lessons: 3, practice: 3, revision: 1, mockTest: 1, status: "active" },
          { id: "library-classes-10", title: "Library Classes", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "encapsulation-10", title: "Encapsulation", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "inheritance-10", title: "Inheritance", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "polymorphism-10", title: "Polymorphism", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "recursion-10", title: "Recursion", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
        ],
      },
    ],
  },
  {
    id: "isc-class-11",
    label: "ISC Class 11",
    icon: "📙",
    color: "border-orange-300 bg-orange-50",
    subjects: [
      {
        id: "computer-science-11",
        name: "Computer Science",
        chapters: [
          { id: "number-systems-11", title: "Number Systems", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "encodings-11", title: "Encodings", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "propositional-logic-11", title: "Propositional Logic", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "hardware-11", title: "Computer Hardware", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "software-11", title: "Computer Software", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "boolean-algebra-11", title: "Boolean Algebra", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "oop-java-11", title: "OOP in Java", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "data-structures-11", title: "Data Structures", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
        ],
      },
    ],
  },
  {
    id: "isc-class-12",
    label: "ISC Class 12",
    icon: "📕",
    color: "border-pink-300 bg-pink-50",
    subjects: [
      {
        id: "computer-science-12",
        name: "Computer Science",
        chapters: [
          { id: "boolean-algebra-12", title: "Boolean Algebra", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "circuits-12", title: "Logic Circuits", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "inheritance-12", title: "Inheritance & Polymorphism", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "exception-12", title: "Exception Handling", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
          { id: "recursion-12", title: "Recursion", lessons: 3, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "data-structures-12", title: "Data Structures", lessons: 4, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "search-sort-12", title: "Searching & Sorting", lessons: 3, practice: 3, revision: 1, mockTest: 1, status: "locked" },
          { id: "computational-12", title: "Computational Thinking", lessons: 3, practice: 2, revision: 1, mockTest: 1, status: "locked" },
        ],
      },
    ],
  },
];

export function getRoadmapStats(classId) {
  const cls = roadmapClasses.find((c) => c.id === classId);
  if (!cls) return { total: 0, completed: 0, active: 0, locked: 0 };

  const allChapters = cls.subjects.flatMap((s) => s.chapters);
  return {
    total: allChapters.length,
    completed: allChapters.filter((ch) => ch.status === "completed").length,
    active: allChapters.filter((ch) => ch.status === "active").length,
    locked: allChapters.filter((ch) => ch.status === "locked").length,
  };
}