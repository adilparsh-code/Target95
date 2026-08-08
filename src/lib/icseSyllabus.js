/**
 * ICSE Syllabus Registry (Source of Truth)
 * ====================================================================
 * Canonical metadata for the official CISCE ICSE 2028
 * "Computer Applications" syllabus (Class IX & Class X).
 *
 * This module is the SINGLE SOURCE OF TRUTH for:
 *   - board / class / subject identification of every chapter
 *   - the explicit Class IX vs Class X distinction
 *     (replaces the old `index % 2` alternating-class pattern)
 *   - syllabusUnit, topic, slug, difficulty mapping
 *
 * It contains NO academic content (no theory, no questions, no solutions).
 * It only describes the structure so the rest of the data model can
 * identify and separate chapters unambiguously.
 */

/* ------------------------------------------------------------------ *
 * Board / Class / Subject constants
 * ------------------------------------------------------------------ */
export const ICSE_BOARD = "ICSE";
export const ISC_BOARD = "ISC";

export const ICSE_CLASS_IX = {
  board: ICSE_BOARD,
  class: "ICSE IX",
  subject: "Computer Applications",
};

export const ICSE_CLASS_X = {
  board: ICSE_BOARD,
  class: "ICSE X",
  subject: "Computer Applications",
};

// Legacy ISC content that exists in the repo but is NOT part of the
// official ICSE IX/X syllabus. Classified explicitly (never via an
// alternating pattern) so it is preserved but correctly identified.
export const ISC_CLASS_XI = {
  board: ISC_BOARD,
  class: "ISC XI",
  subject: "Computer Science",
};

/* ------------------------------------------------------------------ *
 * Official syllabus topics — Class IX (11 topics)
 * SyllabusUnit is the ICSE Computer Applications topic cluster.
 * ------------------------------------------------------------------ */
export const CLASS_IX_TOPICS = [
  {
    topicId: "ix-oop-concepts",
    topic: "Introduction to Object Oriented Programming Concepts",
    title: "Introduction to Object Oriented Programming Concepts",
    slug: "ix-oop-concepts",
    syllabusUnit: "Object-oriented Programming Concepts",
    difficulty: "Beginner",
    estimatedTime: 75,
    description:
      "Evolution of Java, OOP principles (objects, classes, inheritance, polymorphism, encapsulation), Java environment setup, BlueJ introduction, program compilation & execution.",
    isProject: false,
    references: ["introduction_to_java_class9_theory"],
  },
  {
    topicId: "ix-objects-classes",
    topic: "Elementary Concept of Objects and Classes",
    title: "Elementary Concept of Objects and Classes",
    slug: "ix-objects-classes",
    syllabusUnit: "Object-oriented Programming Concepts",
    difficulty: "Beginner",
    estimatedTime: 80,
    description:
      "Objects & classes as blueprints, attributes and methods, creating objects in Java, new keyword, accessing members, this keyword basics, declaring simple classes.",
    isProject: false,
  },
  {
    topicId: "ix-identifiers-literals",
    topic: "Identifiers and Literals",
    title: "Identifiers and Literals",
    slug: "ix-identifiers-literals",
    syllabusUnit: "Language Fundamentals",
    difficulty: "Beginner",
    estimatedTime: 60,
    description:
      "Tokens in Java, identifiers (naming rules), keywords, variables, constants, literals (integer, floating-point, character, string, boolean), primitive data types, type conversion/casting.",
    isProject: false,
  },
  {
    topicId: "ix-operators",
    topic: "Operators in Java",
    title: "Operators in Java",
    slug: "ix-operators",
    syllabusUnit: "Language Fundamentals",
    difficulty: "Beginner",
    estimatedTime: 65,
    description:
      "Arithmetic operators, relational operators, logical operators, assignment operators, increment/decrement, conditional (ternary) operator, operator precedence, type compatibility in expressions.",
    isProject: false,
  },
  {
    topicId: "ix-basic-structure",
    topic: "Basic Structure of a Class in Java",
    title: "Basic Structure of a Class in Java",
    slug: "ix-basic-structure",
    syllabusUnit: "Language Fundamentals",
    difficulty: "Beginner",
    estimatedTime: 70,
    description:
      "Class declaration, main method signature, System.out.println(), comments (single/multi-line), compilation process in BlueJ, bytecode, .class file, executing programs, error types (syntax vs logical).",
    isProject: false,
  },
  {
    topicId: "ix-data-processing",
    topic: "Data Processing in Java",
    title: "Data Processing in Java",
    slug: "ix-data-processing",
    syllabusUnit: "Language Fundamentals",
    difficulty: "Intermediate",
    estimatedTime: 60,
    description:
      "Input using Scanner class, reading different data types, nextInt(), nextDouble(), nextLine(), storing input in variables, simple data processing programs, input validation basics.",
    isProject: false,
  },
  {
    topicId: "ix-math-library",
    topic: "Mathematical Library Methods",
    title: "Mathematical Library Methods",
    slug: "ix-math-library",
    syllabusUnit: "Language Fundamentals",
    difficulty: "Intermediate",
    estimatedTime: 55,
    description:
      "Math class in java.lang, Math.random(), Math.abs(), Math.pow(), Math.sqrt(), Math.ceil(), Math.floor(), Math.round(), using these methods in programs.",
    isProject: false,
  },
  {
    topicId: "ix-conditionals",
    topic: "Conditional Statements in Java",
    title: "Conditional Statements in Java",
    slug: "ix-conditionals",
    syllabusUnit: "Control Flow",
    difficulty: "Intermediate",
    estimatedTime: 75,
    description:
      "if statement, if-else, else-if ladder, nested if, switch statement, case default, break in switch, conditional execution flow, use cases for each statement type.",
    isProject: false,
  },
  {
    topicId: "ix-iterative",
    topic: "Looping / Iterative Statements in Java",
    title: "Looping / Iterative Statements in Java",
    slug: "ix-iterative",
    syllabusUnit: "Control Flow",
    difficulty: "Intermediate",
    estimatedTime: 85,
    description:
      "for loop, while loop, do-while loop, loop control flow, initialization, condition, update, break and continue statements, difference between entry-controlled and exit-controlled loops.",
    isProject: false,
  },
  {
    topicId: "ix-nested-loops",
    topic: "Nested for Loops",
    title: "Nested for Loops",
    slug: "ix-nested-loops",
    syllabusUnit: "Control Flow",
    difficulty: "Intermediate",
    estimatedTime: 90,
    description:
      "Nested loop concept, using nested for loops for patterns, star patterns, number patterns, loop execution in nested scenarios, debugging nested loops.",
    isProject: false,
  },
  {
    topicId: "ix-ethical-computing",
    topic: "Ethical Computing",
    title: "Ethical Computing",
    slug: "ix-ethical-computing",
    syllabusUnit: "Ethical & Social Computing",
    difficulty: "Beginner",
    estimatedTime: 60,
    description:
      "Intellectual property rights, plagiarism, digital citizenship, cyber safety basics, ethical use of technology, social media responsibility, data privacy, licensing basics (open source vs proprietary).",
    isProject: true,
  },
];

/* ------------------------------------------------------------------ *
 * Official syllabus topics — Class X (8 topics)
 * ------------------------------------------------------------------ */
export const CLASS_X_TOPICS = [
  {
    topicId: "x-revision",
    topic: "Revision of Class IX Syllabus",
    title: "Revision of Class IX Syllabus",
    slug: "x-revision",
    syllabusUnit: "Revision & Integration",
    difficulty: "Beginner",
    estimatedTime: 90,
    description:
      "Comprehensive revision of all Class 9 topics, advanced problem-solving using Class 9 concepts, integration of multiple Class 9 topics in single programs, previous year question practice for Class 9 topics.",
    isProject: false,
  },
  {
    topicId: "x-library-classes",
    topic: "Library Classes",
    title: "Library Classes",
    slug: "x-library-classes",
    syllabusUnit: "Core Java APIs & Libraries",
    difficulty: "Intermediate",
    estimatedTime: 70,
    description:
      "Concept of libraries, java.lang package, wrapper classes (Integer, Double, Character), autoboxing/unboxing, java.util package basics, use of library classes, String class fundamentals.",
    isProject: false,
  },
  {
    topicId: "x-arrays",
    topic: "Arrays",
    title: "Arrays",
    slug: "x-arrays",
    syllabusUnit: "Data Structures",
    difficulty: "Intermediate",
    estimatedTime: 95,
    description:
      "Array concept, one-dimensional arrays, declaration, creation, initialization, traversal, array operations (sum, average, max/min), two-dimensional arrays, matrix addition, matrix multiplication basics, passing arrays to methods.",
    isProject: false,
  },
  {
    topicId: "x-strings",
    topic: "String Handling",
    title: "String Handling",
    slug: "x-strings",
    syllabusUnit: "Data Structures",
    difficulty: "Intermediate",
    estimatedTime: 80,
    description:
      "String as an object, immutable String, String methods: length(), charAt(), substring(), equals(), compareTo(), toUpperCase(), toLowerCase(), indexOf(), replace(), String classification problems, StringBuilder basics.",
    isProject: false,
  },
  {
    topicId: "x-class-computation",
    topic: "Class as the Basis of all Computation",
    title: "Class as the Basis of all Computation",
    slug: "x-class-computation",
    syllabusUnit: "Object-oriented Programming",
    difficulty: "Advanced",
    estimatedTime: 90,
    description:
      "Advanced class concepts, user-defined methods, return types, parameters, method overloading, static keyword, static members, access modifiers (public, private, protected), encapsulation, this keyword, association between classes (has-a).",
    isProject: false,
  },
  {
    topicId: "x-constructors",
    topic: "Constructors",
    title: "Constructors",
    slug: "x-constructors",
    syllabusUnit: "Object-oriented Programming",
    difficulty: "Advanced",
    estimatedTime: 65,
    description:
      "Constructor definition, default constructor, parameterized constructor, constructor overloading, this() to call other constructors, constructor chaining, difference between constructors and normal methods.",
    isProject: false,
  },
  {
    topicId: "x-custom-methods",
    topic: "Custom Methods",
    title: "Custom Methods",
    slug: "x-custom-methods",
    syllabusUnit: "Object-oriented Programming",
    difficulty: "Advanced",
    estimatedTime: 85,
    description:
      "Method declaration, parameter types (pass-by-value), return types, method overloading, recursion basics (simple recursion only - factorial, Fibonacci), scope of variables, memory allocation, static vs instance methods.",
    isProject: false,
  },
  {
    topicId: "x-disruptive-technologies",
    topic: "Disruptive Technologies",
    title: "Disruptive Technologies",
    slug: "x-disruptive-technologies",
    syllabusUnit: "Emerging Technologies",
    difficulty: "Beginner",
    estimatedTime: 60,
    description:
      "Introduction to AI, machine learning basics, cloud computing, IoT (Internet of Things), big data, cybersecurity basics, impact of these technologies on society, ethical considerations, real-world applications.",
    isProject: true,
  },
];

export const OFFICIAL_SYLLABUS = [...CLASS_IX_TOPICS, ...CLASS_X_TOPICS];

/* ------------------------------------------------------------------ *
 * Official syllabus projects (theory-only, assessed as project work)
 * ------------------------------------------------------------------ */
export const ICSE_PROJECTS = [
  {
    projectId: "ix-ethical-computing-project",
    title: "Ethical Computing Project",
    slug: "ix-ethical-computing-project",
    topic: "Ethical Computing",
    topicId: "ix-ethical-computing",
    board: ICSE_BOARD,
    class: "ICSE IX",
    subject: "Computer Applications",
    syllabusUnit: "Ethical & Social Computing",
    assignmentType: "project",
    difficulty: "Beginner",
    estimatedTime: 120,
    description:
      "A research/presentation project on digital citizenship, intellectual property rights, plagiarism, cyber safety, and the ethical use of technology.",
    isProject: true,
  },
  {
    projectId: "x-disruptive-technologies-project",
    title: "Disruptive Technologies Project",
    slug: "x-disruptive-technologies-project",
    topic: "Disruptive Technologies",
    topicId: "x-disruptive-technologies",
    board: ICSE_BOARD,
    class: "ICSE X",
    subject: "Computer Applications",
    syllabusUnit: "Emerging Technologies",
    assignmentType: "project",
    difficulty: "Beginner",
    estimatedTime: 120,
    description:
      "An investigative project on emerging technologies (AI, ML, Cloud, IoT, Big Data, Cybersecurity) and their societal impact and ethical considerations.",
    isProject: true,
  },
];

/* ------------------------------------------------------------------ *
 * Lab-assignment type catalog.
 *
 * A "laboratory assignment" is the practical program students must
 * write, compile, and run in BlueJ for the ICSE practical exam.
 * This array is intentionally metadata-only: it does NOT contain
 * program statements / solutions / expected outputs (that is
 * academic content) — see practicals.js for the full registry whose
 * academic fields are placeholders.
 * ------------------------------------------------------------------ */
export const ASSIGNMENT_TYPES = ["lab", "project"];

export const LAB_ASSIGNMENT_DIFFICULTIES = ["Easy", "Medium", "Hard"];

/* ------------------------------------------------------------------ *
 * Existing chapter slug -> explicit ICSE/ISC classification.
 *
 * This is the lookup that replaces the `index % 2 === 0` alternating
 * pattern. Every chapter is classified explicitly by its slug so
 * Class IX is always distinguished from Class X, never by parity.
 * ------------------------------------------------------------------ */
const BASE_METADATA = {
  subject: "Computer Applications",
};

const IX_BASE = { ...BASE_METADATA, board: ICSE_BOARD, class: "ICSE IX" };
const X_BASE = { ...BASE_METADATA, board: ICSE_BOARD, class: "ICSE X" };
const ISC_XI_BASE = { board: ISC_BOARD, class: "ISC XI", subject: "Computer Science" };

export const ICSE_CLASSIFICATIONS = {
  // ---- javaChapters.js (study path) slugs ----
  introduction: {
    ...IX_BASE,
    syllabusUnit: "Language Fundamentals",
    topic: "Basic Structure of a Class in Java",
    difficulty: "Beginner",
  },
  "variables-data-types": {
    ...IX_BASE,
    syllabusUnit: "Language Fundamentals",
    topic: "Identifiers and Literals",
    difficulty: "Beginner",
  },
  operators: {
    ...IX_BASE,
    syllabusUnit: "Language Fundamentals",
    topic: "Operators in Java",
    difficulty: "Beginner",
  },
  "if-else": {
    ...IX_BASE,
    syllabusUnit: "Control Flow",
    topic: "Conditional Statements in Java",
    difficulty: "Intermediate",
  },
  loops: {
    ...IX_BASE,
    syllabusUnit: "Control Flow",
    topic: "Looping / Iterative Statements in Java",
    difficulty: "Intermediate",
  },
  methods: {
    ...X_BASE,
    syllabusUnit: "Object-oriented Programming",
    topic: "Custom Methods",
    difficulty: "Advanced",
  },
  arrays: {
    ...X_BASE,
    syllabusUnit: "Data Structures",
    topic: "Arrays",
    difficulty: "Intermediate",
  },
  strings: {
    ...X_BASE,
    syllabusUnit: "Data Structures",
    topic: "String Handling",
    difficulty: "Intermediate",
  },
  constructor: {
    ...X_BASE,
    syllabusUnit: "Object-oriented Programming",
    topic: "Constructors",
    difficulty: "Advanced",
  },

  // ---- javaCurriculum.js slugs ----
  "introduction-to-java": {
    ...IX_BASE,
    syllabusUnit: "Language Fundamentals",
    topic: "Basic Structure of a Class in Java",
    difficulty: "Beginner",
  },
  "data-types-variables": {
    ...IX_BASE,
    syllabusUnit: "Language Fundamentals",
    topic: "Identifiers and Literals",
    difficulty: "Beginner",
  },
  "input-in-java": {
    ...IX_BASE,
    syllabusUnit: "Language Fundamentals",
    topic: "Data Processing in Java",
    difficulty: "Beginner",
  },
  "conditional-statements": {
    ...IX_BASE,
    syllabusUnit: "Control Flow",
    topic: "Conditional Statements in Java",
    difficulty: "Intermediate",
  },
  "iterative-statements": {
    ...IX_BASE,
    syllabusUnit: "Control Flow",
    topic: "Looping / Iterative Statements in Java",
    difficulty: "Intermediate",
  },
  "classes-objects": {
    ...X_BASE,
    syllabusUnit: "Object-oriented Programming",
    topic: "Class as the Basis of all Computation",
    difficulty: "Advanced",
  },
  // "constructors" + "operators" + "methods" + "arrays" + "strings"
  // are already covered above and reused across both data sources.

  // ISC-only content (preserved, classified explicitly — NOT alternating):
  inheritance: {
    ...ISC_XI_BASE,
    syllabusUnit: "Object-oriented Programming",
    topic: "Inheritance",
    difficulty: "Advanced",
  },
};

/**
 * Resolve canonical board/class/subject/syllabusUnit/topic/difficulty
 * for a chapter identified by its slug. Falls back to a safe ICSE X
 * default so existing chapters never break, but every known chapter
 * is classified explicitly above.
 *
 * @param {string} slug
 * @param {{topic?:string, difficulty?:string}} [fallback]
 * @returns {{board:string, class:string, subject:string, syllabusUnit:string, topic:string, difficulty:string}}
 */
export function resolveChapterMetadata(slug, fallback) {
  const match = ICSE_CLASSIFICATIONS[slug];
  if (match) return { ...match };
  return {
    ...X_BASE,
    syllabusUnit: "General",
    topic: fallback?.topic || slug,
    difficulty: fallback?.difficulty || "Beginner",
  };
}

/** Alias for getSyllabusTopicsForClass (kept for naming familiarity). */
export function getClassSyllabusTopics(className) {
  return getSyllabusTopicsForClass(className);
}

/** @returns {Array} official topics for a class ("ICSE IX" | "ICSE X") */
export function getSyllabusTopicsForClass(className) {
  if (className === "ICSE IX") return CLASS_IX_TOPICS;
  if (className === "ICSE X") return CLASS_X_TOPICS;
  return OFFICIAL_SYLLABUS;
}

/** @returns {object|undefined} official syllabus topic by slug */
export function getSyllabusTopic(slug) {
  return OFFICIAL_SYLLABUS.find((t) => t.slug === slug);
}

/** @returns {Array} ICSE projects, optionally filtered by class */
export function getProjects(className = null) {
  if (!className) return ICSE_PROJECTS;
  return ICSE_PROJECTS.filter((p) => p.class === className);
}

/** @returns {object|undefined} ICSE project by class ("ICSE IX"|"ICSE X") */
export function getProjectForClass(className) {
  return ICSE_PROJECTS.find((p) => p.class === className);
}

/**
 * Default practical-assignment schema template.
 * Describes the data model fields prepared for Task 4 (lab assignments).
 * Academic fields (programStatement/solution/expectedOutput) are NOT
 * populated here — they are authored separately as academic content.
 */
export const PRACTICAL_ASSIGNMENT_SCHEMA = {
  id: "string (stable, e.g. prac-ix-01)",
  slug: "string (url-safe)",
  title: "string",
  assignmentType: '"lab" | "project"',
  topic: "string (official ICSE topic name)",
  syllabusUnit: "string (syllabus unit name)",
  board: '"ICSE" | "ISC"',
  class: '"ICSE IX" | "ICSE X" | "ISC XI"',
  subject: '"Computer Applications" | "Computer Science"',
  difficulty: '"Easy" | "Medium" | "Hard"',
  programStatement: "string|null (ACADEMIC CONTENT — not authored here)",
  solution: "string|null (ACADEMIC CONTENT — not authored here)",
  expectedOutput: "string|null (ACADEMIC CONTENT — not authored here)",
  estimatedTime: "number (minutes)",
};
