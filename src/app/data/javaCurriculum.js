import { resolveChapterMetadata } from "@/lib/icseSyllabus";

/**
 * Resolve the canonical ICSE syllabus metadata (board, class, subject,
 * syllabusUnit, topic) for a chapter. Falls back gracefully so existing
 * chapters are enriched, never broken.
 */
const metaFor = (chapter) =>
  resolveChapterMetadata(chapter.slug, {
    topic: chapter.title,
    difficulty: chapter.difficulty,
  });

const chapterDefinitions = [
  { slug: "introduction-to-java", title: "Introduction to Java", difficulty: "Beginner", estimatedTime: 45, description: "Understand Java, the JVM, program structure, and execution.", topics: ["JVM", "Program Structure", "Compilation"] },
  { slug: "data-types-variables", title: "Data Types & Variables", difficulty: "Beginner", estimatedTime: 60, description: "Primitive types, variables, constants, and type conversion.", topics: ["Primitive Types", "Variables", "Type Casting"] },
  { slug: "operators", title: "Operators", difficulty: "Beginner", estimatedTime: 50, description: "Arithmetic, relational, logical, assignment, and conditional operators.", topics: ["Arithmetic", "Comparison", "Logic"] },
  { slug: "input-in-java", title: "Input in Java", difficulty: "Beginner", estimatedTime: 45, description: "Keyboard input using Scanner for Java programs.", topics: ["Scanner", "nextInt", "nextLine"] },
  
  // Granular Conditionals (matching chapter-content files)
  { slug: "if", title: "If Statement", difficulty: "Intermediate", estimatedTime: 30, description: "Simple decision making using single if blocks.", topics: ["if Syntax", "Boolean Conditions"] },
  { slug: "if-else", title: "If-Else Statement", difficulty: "Intermediate", estimatedTime: 35, description: "Two-way decision paths using if-else.", topics: ["if-else Syntax", "Flow of Control"] },
  { slug: "nested-if", title: "Nested If", difficulty: "Intermediate", estimatedTime: 40, description: "Hierarchical conditions using nested if statements.", topics: ["Nested Conditions", "Logic Cascades"] },
  { slug: "switch", title: "Switch Statement", difficulty: "Intermediate", estimatedTime: 40, description: "Multi-way branching using switch, case, and break.", topics: ["switch", "case", "break", "default"] },
  
  // Granular Iteration (matching chapter-content files)
  { slug: "for-loop", title: "For Loop", difficulty: "Intermediate", estimatedTime: 40, description: "Counter-controlled iteration using for loops.", topics: ["Initialization", "Condition", "Update"] },
  { slug: "while-loop", title: "While Loop", difficulty: "Intermediate", estimatedTime: 35, description: "Pre-tested condition iteration using while loops.", topics: ["Entry-controlled", "Loop Conditions"] },
  { slug: "do-while-loop", title: "Do-While Loop", difficulty: "Intermediate", estimatedTime: 35, description: "Post-tested condition iteration using do-while loops.", topics: ["Exit-controlled", "Post-condition Execution"] },

  { slug: "methods", title: "Methods", difficulty: "Intermediate", estimatedTime: 60, description: "Reusable methods with parameters and return values.", topics: ["Parameters", "Return Values", "Overloading"] },
  
  // Granular Arrays (matching chapter-content files)
  { slug: "arrays-1d", title: "1D Arrays", difficulty: "Intermediate", estimatedTime: 60, description: "Single-dimensional array indexing, traversal, and processing.", topics: ["Indexing", "Traversal", "Array Length"] },
  { slug: "arrays-2d", title: "2D Arrays", difficulty: "Advanced", estimatedTime: 70, description: "Multi-dimensional array grid operations and matrix manipulation.", topics: ["Row-Column Indexing", "Matrix Traversal", "Nested Loops"] },

  { slug: "strings", title: "Strings", difficulty: "Intermediate", estimatedTime: 65, description: "String methods, comparison, and character operations.", topics: ["length", "equals", "String Methods"] },
  { slug: "classes-objects", title: "Classes & Objects", difficulty: "Advanced", estimatedTime: 75, description: "Classes, objects, fields, and instance methods.", topics: ["Class", "Object", "Instance Members"] },
  { slug: "encapsulation", title: "Encapsulation", difficulty: "Advanced", estimatedTime: 60, description: "Data hiding, access specifiers, getters, and setters.", topics: ["Access Specifiers", "Getters and Setters", "Data Hiding"] },
  { slug: "constructors", title: "Constructors", difficulty: "Advanced", estimatedTime: 55, description: "Default and parameterized constructors.", topics: ["Initialization", "this", "Overloading"] },
  { slug: "inheritance", title: "Inheritance", difficulty: "Advanced", estimatedTime: 70, description: "Reusing behavior via superclasses and method overriding.", topics: ["extends", "Superclass", "Overriding"] },
];
const questionMetadata = (chapter, type, index) => {
  const meta = metaFor(chapter);
  return {
    id: `${chapter.slug}-${type}-${index}`,
    subject: meta.subject,
    board: meta.board,
    class: meta.class,
    syllabusUnit: meta.syllabusUnit,
    chapter: chapter.slug,
    chapterTitle: chapter.title,
    topic: chapter.topics[(index - 1) % chapter.topics.length],
    difficulty: index <= 3 ? "Easy" : index <= 7 ? "Medium" : "Hard",
    type,
    marks: type === "mcq" ? 1 : type === "output" ? 2 : type === "theory" ? 3 : 5,
    estimatedTime: type === "mcq" ? 1 : type === "output" ? 2 : type === "theory" ? 4 : 8,
  };
};

function createMcqs(chapter) {
  return Array.from({ length: 10 }, (_, offset) => {
    const index = offset + 1;
    const topic = chapter.topics[offset % chapter.topics.length];
    return {
      ...questionMetadata(chapter, "mcq", index),
      prompt: `Which statement best describes ${topic} when learning ${chapter.title}?`,
      options: [
        `It is an important Java concept used in ${chapter.title}.`,
        "It is only used to style web pages.",
        "It is a database command.",
        "It cannot be used in Java programs.",
      ],
      answer: 0,
      explanation: `${topic} is a core part of ${chapter.title}; identify its purpose before applying it in a program.`,
    };
  });
}

function createOutputQuestions(chapter) {
  return Array.from({ length: 5 }, (_, offset) => {
    const index = offset + 1;
    const topic = chapter.topics[offset % chapter.topics.length];
    return {
      ...questionMetadata(chapter, "output", index),
      prompt: `Predict the output of a short Java program that demonstrates ${topic} in ${chapter.title}.`,
      answer: `The program prints the value produced after applying ${topic}.`,
      explanation: "Trace the statements from top to bottom, recording each variable value before the final print statement.",
    };
  });
}

function createProgrammingQuestions(chapter) {
  return Array.from({ length: 5 }, (_, offset) => {
    const index = offset + 1;
    const topic = chapter.topics[offset % chapter.topics.length];
    return {
      ...questionMetadata(chapter, "programming", index),
      prompt: `Write a Java program that uses ${topic} to process a student-record scenario.`,
      constraints: "Use clear variable names, valid Java syntax, and labelled output.",
      javaSolution: `public class Main {\n  public static void main(String[] args) {\n    // Apply ${topic} for ${chapter.title}.\n    System.out.println("Student record processed");\n  }\n}`,
      explanation: `Start by identifying the input and output, then use ${topic} in the smallest correct Java program.`,
    };
  });
}

function createTheoryQuestions(chapter) {
  return Array.from({ length: 5 }, (_, offset) => {
    const index = offset + 1;
    const topic = chapter.topics[offset % chapter.topics.length];
    return {
      ...questionMetadata(chapter, "theory", index),
      prompt: `Explain ${topic} in ${chapter.title} with one suitable Java example.`,
      modelAnswer: `${topic} is an important part of ${chapter.title}. A complete answer should define it, state its purpose, and show a small Java example.`,
      explanation: "For board-style answers, give a precise definition first and then connect it to a relevant program scenario.",
    };
  });
}

export const javaChapters = chapterDefinitions.map((chapter, index) => {
  const questions = [
    ...createTheoryQuestions(chapter),      // Theory first
    ...createProgrammingQuestions(chapter), // Then Programming Questions
    ...createOutputQuestions(chapter),      // Then Output Questions
    ...createMcqs(chapter),                 // Then MCQs
  ];

  return { ...chapter, ...metaFor(chapter), id: index + 1, questions, questionCount: questions.length };
});

export const javaQuestions = javaChapters.flatMap((chapter) => chapter.questions);

export const javaSubject = {
  id: "java",
  title: "Java Programming",
  description: "A structured CISCE Java learning journey with practice, explanations, and progress tracking.",
  estimatedStudyTime: javaChapters.reduce((total, chapter) => total + chapter.estimatedTime, 0),
  chapters: javaChapters,
};