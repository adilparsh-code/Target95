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
  { slug: "introduction-to-java", title: "Introduction to Java", difficulty: "Beginner", estimatedTime: 45, description: "Understand Java, the JVM, program structure, and how Java code is compiled and executed.", topics: ["JVM", "Program Structure", "Compilation"] },
  { slug: "data-types-variables", title: "Data Types & Variables", difficulty: "Beginner", estimatedTime: 60, description: "Work confidently with primitive data types, variables, constants, and type conversion.", topics: ["Primitive Types", "Variables", "Type Casting"] },
  { slug: "operators", title: "Operators", difficulty: "Beginner", estimatedTime: 50, description: "Apply arithmetic, relational, logical, assignment, and conditional operators in Java.", topics: ["Arithmetic", "Comparison", "Logic"] },
  { slug: "input-in-java", title: "Input in Java", difficulty: "Beginner", estimatedTime: 45, description: "Read and validate keyboard input using Scanner for practical Java programs.", topics: ["Scanner", "nextInt", "nextLine"] },
  { slug: "conditional-statements", title: "Conditional Statements", difficulty: "Intermediate", estimatedTime: 65, description: "Control program flow using if, else-if, nested conditions, and switch statements.", topics: ["if-else", "switch", "Nested Conditions"] },
  { slug: "iterative-statements", title: "Iterative Statements", difficulty: "Intermediate", estimatedTime: 75, description: "Use for, while, and do-while loops to solve repeated-processing problems.", topics: ["for Loop", "while Loop", "do-while"] },
  { slug: "methods", title: "Methods", difficulty: "Intermediate", estimatedTime: 60, description: "Create reusable methods with parameters, return values, and method overloading.", topics: ["Parameters", "Return Values", "Overloading"] },
  { slug: "arrays", title: "Arrays", difficulty: "Intermediate", estimatedTime: 80, description: "Store, access, traverse, and process one-dimensional and two-dimensional arrays.", topics: ["Indexing", "Traversal", "2D Arrays"] },
  { slug: "strings", title: "Strings", difficulty: "Intermediate", estimatedTime: 65, description: "Manipulate text safely with String methods, comparison, and character operations.", topics: ["length", "equals", "String Methods"] },
  { slug: "classes-objects", title: "Classes & Objects", difficulty: "Advanced", estimatedTime: 75, description: "Model real-world entities using classes, objects, fields, and instance methods.", topics: ["Class", "Object", "Instance Members"] },
  { slug: "constructors", title: "Constructors", difficulty: "Advanced", estimatedTime: 55, description: "Initialize objects using default and parameterized constructors.", topics: ["Initialization", "this", "Overloading"] },
  { slug: "inheritance", title: "Inheritance", difficulty: "Advanced", estimatedTime: 70, description: "Reuse and extend behaviour through parent classes, child classes, and method overriding.", topics: ["extends", "Superclass", "Overriding"] },
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