/**
 * ICSE Practical / Laboratory Assignment Registry
 * ====================================================================
 * Data-model preparation for the ICSE practical (lab) component.
 *
 * Per the official CISCE requirement:
 *   - Class IX: minimum 15 laboratory assignments
 *   - Class X: minimum 15 laboratory assignments
 *
 * PLUS the two assessed projects:
 *   - Class IX: Ethical Computing project
 *   - Class X: Disruptive Technologies project
 *
 * IMPORTANT — this registry is schema/metadata only.
 * The fields `programStatement`, `solution` and `expectedOutput` are
 * intentionally left as `null` placeholders. Populating them is
 * ACADEMIC CONTENT and is explicitly out of scope ("Do NOT create
 * academic content"). Authors fill them separately; the model is
 * ready to hold them without any schema change.
 *
 * Student submission tracking is intentionally NOT implemented.
 */

import { ICSE_PROJECTS } from "@/lib/icseSyllabus";

/**
 * @typedef {Object} PracticalAssignment
 * @property {string} id               - stable identifier (e.g. "prac-ix-01")
 * @property {string} slug             - url-safe slug
 * @property {string} title            - assignment title
 * @property {("lab"|"project")} assignmentType
 * @property {string} topic            - official ICSE syllabus topic name
 * @property {string} topicId          - official topic id (from icseSyllabus)
 * @property {string} syllabusUnit     - ICSE syllabus unit / cluster
 * @property {("ICSE"|"ISC")} board
 * @property {("ICSE IX"|"ICSE X"|"ISC XI")} class
 * @property {string} subject          - "Computer Applications" | "Computer Science"
 * @property {("Easy"|"Medium"|"Hard")} difficulty
 * @property {number} estimatedTime    - minutes
 * @property {string|null} programStatement  - ACADEMIC (placeholder, not authored here)
 * @property {string|null} solution          - ACADEMIC (placeholder, not authored here)
 * @property {string|null} expectedOutput    - ACADEMIC (placeholder, not authored here)
 */

/** @type {PracticalAssignment[]} */
const labAssignments = [
  // ===== CLASS IX — 15 laboratory assignments =====
  { id: "prac-ix-01", slug: "prac-ix-01", title: "Write and run your first Java program in BlueJ", assignmentType: "lab", topic: "Basic Structure of a Class in Java", topicId: "ix-basic-structure", syllabusUnit: "Language Fundamentals", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 20, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-02", slug: "prac-ix-02", title: "Identify and fix syntax errors (missing semicolon, main casing)", assignmentType: "lab", topic: "Basic Structure of a Class in Java", topicId: "ix-basic-structure", syllabusUnit: "Language Fundamentals", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 20, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-03", slug: "prac-ix-03", title: "Read a student name and marks using Scanner and print a report", assignmentType: "lab", topic: "Data Processing in Java", topicId: "ix-data-processing", syllabusUnit: "Language Fundamentals", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 25, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-04", slug: "prac-ix-04", title: "Simple calculator using arithmetic operators", assignmentType: "lab", topic: "Operators in Java", topicId: "ix-operators", syllabusUnit: "Language Fundamentals", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 25, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-05", slug: "prac-ix-05", title: "Ternary operator to determine pass/fail", assignmentType: "lab", topic: "Operators in Java", topicId: "ix-operators", syllabusUnit: "Language Fundamentals", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 20, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-06", slug: "prac-ix-06", title: "Grade calculator using if-else / else-if ladder", assignmentType: "lab", topic: "Conditional Statements in Java", topicId: "ix-conditionals", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 30, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-07", slug: "prac-ix-07", title: "Vowel / consonant check using switch", assignmentType: "lab", topic: "Conditional Statements in Java", topicId: "ix-conditionals", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 25, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-08", slug: "prac-ix-08", title: "Print the multiplication table of a given number", assignmentType: "lab", topic: "Looping / Iterative Statements in Java", topicId: "ix-iterative", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 30, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-09", slug: "prac-ix-09", title: "Sum and average of N numbers using for loop", assignmentType: "lab", topic: "Looping / Iterative Statements in Java", topicId: "ix-iterative", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 30, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-10", slug: "prac-ix-10", title: "Factorial of a number using for loop", assignmentType: "lab", topic: "Looping / Iterative Statements in Java", topicId: "ix-iterative", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 25, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-11", slug: "prac-ix-11", title: "Print a right-angled star pattern using nested for", assignmentType: "lab", topic: "Nested for Loops", topicId: "ix-nested-loops", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 35, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-12", slug: "prac-ix-12", title: "Print Floyd's triangle using nested for", assignmentType: "lab", topic: "Nested for Loops", topicId: "ix-nested-loops", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 35, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-13", slug: "prac-ix-13", title: "Check whether a number is prime using for loop", assignmentType: "lab", topic: "Looping / Iterative Statements in Java", topicId: "ix-iterative", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Hard", estimatedTime: 40, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-14", slug: "prac-ix-14", title: "Compute sum of factorial series using Math and loops", assignmentType: "lab", topic: "Mathematical Library Methods", topicId: "ix-math-library", syllabusUnit: "Language Fundamentals", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 35, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-ix-15", slug: "prac-ix-15", title: "Predict the output of given loop programs (dry run)", assignmentType: "lab", topic: "Looping / Iterative Statements in Java", topicId: "ix-iterative", syllabusUnit: "Control Flow", board: "ICSE", class: "ICSE IX", subject: "Computer Applications", difficulty: "Hard", estimatedTime: 40, programStatement: null, solution: null, expectedOutput: null },

  // ===== CLASS X — 15 laboratory assignments =====
  { id: "prac-x-01", slug: "prac-x-01", title: "Reverse a number and check for palindrome", assignmentType: "lab", topic: "Arrays", topicId: "x-arrays", syllabusUnit: "Data Structures", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 30, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-02", slug: "prac-x-02", title: "Count frequency of characters in a string", assignmentType: "lab", topic: "String Handling", topicId: "x-strings", syllabusUnit: "Data Structures", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 35, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-03", slug: "prac-x-03", title: "Check if a string is a palindrome using equalsIgnoreCase", assignmentType: "lab", topic: "String Handling", topicId: "x-strings", syllabusUnit: "Data Structures", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 25, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-04", slug: "prac-x-04", title: "Store and process student marks using a 1-D array", assignmentType: "lab", topic: "Arrays", topicId: "x-arrays", syllabusUnit: "Data Structures", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 35, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-05", slug: "prac-x-05", title: "Find maximum and minimum in an array", assignmentType: "lab", topic: "Arrays", topicId: "x-arrays", syllabusUnit: "Data Structures", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Easy", estimatedTime: 30, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-06", slug: "prac-x-06", title: "Add two matrices using a 2-D array", assignmentType: "lab", topic: "Arrays", topicId: "x-arrays", syllabusUnit: "Data Structures", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 45, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-07", slug: "prac-x-07", title: "Search an element using linear search in an array", assignmentType: "lab", topic: "Arrays", topicId: "x-arrays", syllabusUnit: "Data Structures", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 35, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-08", slug: "prac-x-08", title: "Use wrapper class Integer to parse and compare values (autoboxing)", assignmentType: "lab", topic: "Library Classes", topicId: "x-library-classes", syllabusUnit: "Core Java APIs & Libraries", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 40, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-09", slug: "prac-x-09", title: "Sort an array using Arrays.sort()", assignmentType: "lab", topic: "Library Classes", topicId: "x-library-classes", syllabusUnit: "Core Java APIs & Libraries", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 30, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-10", slug: "prac-x-10", title: "Write a recursive method for factorial and Fibonacci", assignmentType: "lab", topic: "Custom Methods", topicId: "x-custom-methods", syllabusUnit: "Object-oriented Programming", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 40, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-11", slug: "prac-x-11", title: "Method overloading with same name different parameters", assignmentType: "lab", topic: "Custom Methods", topicId: "x-custom-methods", syllabusUnit: "Object-oriented Programming", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Medium", estimatedTime: 35, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-12", slug: "prac-x-12", title: "Design a Student class with fields, constructor, and display method", assignmentType: "lab", topic: "Class as the Basis of all Computation", topicId: "x-class-computation", syllabusUnit: "Object-oriented Programming", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Hard", estimatedTime: 55, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-13", slug: "prac-x-13", title: "Constructor overloading using this()", assignmentType: "lab", topic: "Constructors", topicId: "x-constructors", syllabusUnit: "Object-oriented Programming", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Hard", estimatedTime: 45, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-14", slug: "prac-x-14", title: "BankAccount class with deposit/withdraw methods (encapsulation)", assignmentType: "lab", topic: "Class as the Basis of all Computation", topicId: "x-class-computation", syllabusUnit: "Object-oriented Programming", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Hard", estimatedTime: 60, programStatement: null, solution: null, expectedOutput: null },
  { id: "prac-x-15", slug: "prac-x-15", title: "Predict the output and explain errors in given class programs", assignmentType: "lab", topic: "Constructors", topicId: "x-constructors", syllabusUnit: "Object-oriented Programming", board: "ICSE", class: "ICSE X", subject: "Computer Applications", difficulty: "Hard", estimatedTime: 40, programStatement: null, solution: null, expectedOutput: null },
];

// The two assessed syllabus projects (metadata re-exported from the
// canonical syllabus module for a single import surface).
const projects = ICSE_PROJECTS;

// Combined registry: 15 IX labs + 15 X labs + 2 projects = 32 items.
export const practicals = [...labAssignments, ...projects];

export const labAssignmentCount = {
  "ICSE IX": labAssignments.filter((a) => a.class === "ICSE IX").length,
  "ICSE X": labAssignments.filter((a) => a.class === "ICSE X").length,
};

export default practicals;
