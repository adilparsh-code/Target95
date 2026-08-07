/**
 * programmingLibrary.js — Single source of truth for the Programming Library.
 *
 * Every category is defined here. Components render from this data only,
 * so future categories can be added without touching any component.
 */

export const programmingCategories = [
  {
    id: "numbers",
    slug: "numbers",
    name: "Numbers",
    description:
      "Solve number-based programs covering prime, Armstrong, palindrome, automorphic, and special number logic.",
    difficulty: "Easy",
    board: "ICSE",
    class: "10",
    estimatedPrograms: 25,
    learningOutcome:
      "Master digit extraction, number theory checks, and loop-based number processing.",
    icon: "🔢",
  },
  {
    id: "patterns",
    slug: "patterns",
    name: "Patterns",
    description:
      "Print star, number, and character patterns using nested loops and structured output formatting.",
    difficulty: "Medium",
    board: "ICSE",
    class: "10",
    estimatedPrograms: 20,
    learningOutcome:
      "Build confidence with nested loops, spacing logic, and pattern generation.",
    icon: "⭐",
  },
  {
    id: "arrays",
    slug: "arrays",
    name: "Arrays",
    description:
      "Work with one-dimensional and two-dimensional arrays for searching, sorting, and element processing.",
    difficulty: "Medium",
    board: "ICSE",
    class: "10",
    estimatedPrograms: 22,
    learningOutcome:
      "Understand indexing, traversal, and common array algorithms used in board exams.",
    icon: "📊",
  },
  {
    id: "strings",
    slug: "strings",
    name: "Strings",
    description:
      "Manipulate text using String methods, character processing, and word-level operations.",
    difficulty: "Medium",
    board: "ICSE",
    class: "10",
    estimatedPrograms: 20,
    learningOutcome:
      "Apply String methods and character traversal to solve text-based problems.",
    icon: "🔤",
  },
  {
    id: "methods",
    slug: "methods",
    name: "Methods",
    description:
      "Design reusable methods with parameters, return values, and method overloading.",
    difficulty: "Medium",
    board: "ICSE",
    class: "10",
    estimatedPrograms: 15,
    learningOutcome:
      "Break programs into clean, reusable methods and understand parameter passing.",
    icon: "🧩",
  },
  {
    id: "recursion",
    slug: "recursion",
    name: "Recursion",
    description:
      "Solve problems using recursive functions with base cases and recursive calls.",
    difficulty: "Hard",
    board: "ISC",
    class: "12",
    estimatedPrograms: 12,
    learningOutcome:
      "Understand recursion depth, base cases, and recursive problem decomposition.",
    icon: "🔄",
  },
  {
    id: "searching",
    slug: "searching",
    name: "Searching",
    description:
      "Implement linear and binary search algorithms on sorted and unsorted data.",
    difficulty: "Medium",
    board: "ISC",
    class: "11",
    estimatedPrograms: 8,
    learningOutcome:
      "Compare search strategies and apply the correct algorithm for a given dataset.",
    icon: "🔍",
  },
  {
    id: "sorting",
    slug: "sorting",
    name: "Sorting",
    description:
      "Implement bubble, selection, and insertion sort with step-by-step tracing.",
    difficulty: "Medium",
    board: "ISC",
    class: "11",
    estimatedPrograms: 10,
    learningOutcome:
      "Understand sorting algorithms, their complexity, and when to use each.",
    icon: "📈",
  },
  {
    id: "matrices",
    slug: "matrices",
    name: "Matrices",
    description:
      "Process two-dimensional arrays for row/column operations, diagonals, and matrix transformations.",
    difficulty: "Hard",
    board: "ISC",
    class: "12",
    estimatedPrograms: 12,
    learningOutcome:
      "Master 2D array traversal, diagonal logic, and matrix manipulation.",
    icon: "🧮",
  },
  {
    id: "objects",
    slug: "objects",
    name: "Objects",
    description:
      "Model real-world entities using classes, objects, constructors, and instance methods.",
    difficulty: "Hard",
    board: "ISC",
    class: "12",
    estimatedPrograms: 14,
    learningOutcome:
      "Apply object-oriented design to build complete, exam-ready Java programs.",
    icon: "🏗️",
  },
];

export default programmingCategories;