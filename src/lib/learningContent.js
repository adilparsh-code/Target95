import javaChapters from "../app/data/javaChapters";
import { resolveChapterMetadata } from "@/lib/icseSyllabus";

// The UI consumes this stable shape whether content comes from fixtures or a future CMS.
const topicDetails = {
  introduction: { definition: "Java is a class-based, object-oriented programming language that is compiled to bytecode and executed by the JVM.", syntax: "public class Main { public static void main(String[] args) { } }", example: "A school fee application can model each student as an object created from a Student class.", keyTerms: ["JVM", "bytecode", "class", "object"], mistakes: ["Treating Java and JavaScript as the same language", "Using a class name that does not match the file name"], tips: ["Read compiler errors from top to bottom", "Keep one public class per source file"] },
  "variables-data-types": { definition: "A variable is a named memory location; its data type decides the values and operations it supports.", syntax: "int marks = 95;\nString name = \"Aarav\";\nboolean passed = true;", example: "A report-card program stores a student's name, marks, and pass status in variables.", keyTerms: ["variable", "primitive type", "declaration", "initialisation"], mistakes: ["Using a decimal value in an int", "Reading an uninitialised local variable"], tips: ["Choose meaningful names", "Use double only when decimal precision is needed"] },
  operators: { definition: "Operators perform arithmetic, comparison, assignment, and logical operations on values.", syntax: "boolean eligible = marks >= 35 && attendance >= 75;", example: "A scholarship rule combines marks and attendance using relational and logical operators.", keyTerms: ["operand", "precedence", "modulus", "logical operator"], mistakes: ["Writing = instead of == in a condition", "Forgetting integer division truncates a result"], tips: ["Use parentheses in long expressions", "Dry-run compound conditions"] },
  "if-else": { definition: "Selection statements choose one of several paths based on a boolean condition.", syntax: "if (marks >= 35) { result = \"Pass\"; } else { result = \"Needs improvement\"; }", example: "A library system issues a fine only when a book is returned late.", keyTerms: ["condition", "branch", "boolean", "nested if"], mistakes: ["Leaving a stray semicolon after if", "Ordering else-if conditions incorrectly"], tips: ["Handle the most specific condition first", "Use braces for every branch"] },
  loops: { definition: "A loop repeats instructions while a condition permits it or for a known number of iterations.", syntax: "for (int i = 1; i <= 10; i++) { System.out.println(i); }", example: "A teacher can use a loop to total marks for every student in a class.", keyTerms: ["iteration", "counter", "termination", "infinite loop"], mistakes: ["Not updating a while-loop counter", "Using <= when < is required"], tips: ["Trace the first three iterations", "Pick for when the count is known"] },
  methods: { definition: "A method is a named reusable block of code that can accept parameters and optionally return a value.", syntax: "static int square(int number) { return number * number; }", example: "A result system can call one calculatePercentage method for every subject.", keyTerms: ["parameter", "argument", "return type", "method signature"], mistakes: ["Calling a method with incompatible arguments", "Forgetting a return statement"], tips: ["Give methods a single responsibility", "Use verbs in method names"] },
  arrays: { definition: "An array stores a fixed-size sequence of values of one data type, indexed from zero.", syntax: "int[] marks = {78, 88, 91};\nSystem.out.println(marks[0]);", example: "A class register can keep the marks of 40 learners in a single array.", keyTerms: ["index", "element", "length", "traversal"], mistakes: ["Accessing index equal to length", "Assuming arrays grow automatically"], tips: ["Use array.length in loop conditions", "Check the first and last index"] },
  strings: { definition: "A String is an immutable sequence of characters used to store text.", syntax: "String greeting = \"Hello\";\nint size = greeting.length();", example: "A school portal stores student names, email addresses, and feedback as strings.", keyTerms: ["immutable", "char", "length", "equals"], mistakes: ["Comparing strings with ==", "Using char quotes for a String"], tips: ["Use equals for content comparison", "Test empty-string cases"] },
  constructor: { definition: "A constructor initializes a new object and has the same name as its class.", syntax: "Student(String name) { this.name = name; }", example: "When a new library member joins, a constructor can set their name and member ID.", keyTerms: ["constructor", "this", "instance", "initialisation"], mistakes: ["Adding a return type to a constructor", "Not assigning parameter values to fields"], tips: ["Keep constructor parameters meaningful", "Use this.field when names match"] },
};

const titleCase = (value) => value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const difficultyByIndex = ["Easy", "Medium", "Hard"];

function createQuestions(chapter, detail, index) {
  const base = `${chapter.slug}-${index}`;
  const curriculum = resolveChapterMetadata(chapter.slug, {
    topic: chapter.title,
    difficulty: difficultyByIndex[index % 3],
  });
  return [
    {
      id: `${base}-mcq`, type: "mcq", ...curriculum, chapter: chapter.title, topic: chapter.title,
      difficulty: difficultyByIndex[index % 3], tags: [chapter.slug, "java", "revision"], section: "MCQs", marks: 1, estimatedTime: 1,
      prompt: `Which statement best describes ${chapter.title.toLowerCase()} in Java?`,
      options: [detail.definition, "It is only used to style a webpage.", "It is a database command.", "It is not part of Java programming."], answer: 0,
      explanation: detail.definition,
    },
    {
      id: `${base}-theory`, type: "theory", ...curriculum, chapter: chapter.title, topic: chapter.title,
      difficulty: "Medium", tags: [chapter.slug, "theory", "board-exam"], section: "Theory questions", marks: 3, estimatedTime: 4,
      prompt: `Define ${chapter.title.toLowerCase()} and explain one practical use in a Java program.`,
      keywords: detail.keyTerms.slice(0, 3), modelAnswer: `${detail.definition} ${detail.example}`,
      markingPoints: ["Accurate definition", "Correct Java terminology", "One relevant real-life or program example"],
      explanation: "Use the definition first, then connect it to a small, relevant program scenario.",
    },
    {
      id: `${base}-programming`, type: "programming", ...curriculum, chapter: chapter.title, topic: chapter.title,
      difficulty: "Hard", tags: [chapter.slug, "java", "programming"], section: "Programming questions", marks: 5, estimatedTime: 10,
      prompt: `Write a Java program that demonstrates ${chapter.title.toLowerCase()} for a simple student-record scenario.`,
      constraints: "Use clear identifiers, standard Java syntax, and handle the stated sample data.", sampleInput: "Aarav\n95", sampleOutput: "Student: Aarav\nScore: 95",
      explanation: `Start with the smallest valid program, then apply the rules of ${chapter.title.toLowerCase()}.`,
      flowExplanation: `The program first prepares the required values, then applies ${chapter.title.toLowerCase()} and prints a labelled result.`,
      algorithm: ["Read or declare the sample values.", `Apply the required ${chapter.title.toLowerCase()} operation.`, "Display a clearly labelled result."],
      javaSolution: `public class Main {\n  public static void main(String[] args) {\n    String student = "Aarav";\n    int score = 95;\n    System.out.println("Student: " + student);\n    System.out.println("Score: " + score);\n  }\n}`,
      dryRun: ["student becomes Aarav", "score becomes 95", "Both labelled values are printed"], timeComplexity: "O(1)", spaceComplexity: "O(1)",
      outputExplanation: "The two output lines confirm that the values were processed and displayed in the required order.",
      commonMistakes: detail.mistakes, optimizationTips: ["Avoid repeated calculations inside loops.", "Use the simplest data type and control structure that fits the requirement."], relatedQuestions: [`${chapter.title} definition`, `${chapter.title} application`],
    },
    {
      id: `${base}-practice`, type: "theory", ...curriculum, chapter: chapter.title, topic: chapter.title,
      difficulty: "Easy", tags: [chapter.slug, "practice", "revision"], section: "Practice questions", marks: 2, estimatedTime: 3,
      prompt: `State two rules to remember while using ${chapter.title.toLowerCase()} in Java.`,
      keywords: detail.keyTerms.slice(0, 2), modelAnswer: `${detail.tips[0]} ${detail.mistakes[0]} should be avoided.`,
      markingPoints: ["Two distinct valid rules", "Correct Java vocabulary"], explanation: "This short-answer practice checks recall before you move to an application question.",
    },
    {
      id: `${base}-challenge`, type: "programming", ...curriculum, chapter: chapter.title, topic: chapter.title,
      difficulty: "Hard", tags: [chapter.slug, "challenge", "expected-question"], section: "Challenge questions", marks: 8, estimatedTime: 15,
      prompt: `Challenge: design, dry-run, and write a Java solution using ${chapter.title.toLowerCase()} to process three student scores and identify the required result.`,
      constraints: "Use only concepts introduced up to this chapter, meaningful identifiers, and no external libraries beyond standard Java.", sampleInput: "78\n88\n91", sampleOutput: "Highest score: 91",
      explanation: "Break the challenge into input, processing, and output before writing the final program.", flowExplanation: "Read each score, compare or process them using the chapter concept, then display the computed result.",
      algorithm: ["Store the three scores.", "Apply the chapter concept to process the scores.", "Print the final labelled answer."],
      javaSolution: `public class Main {\n  public static void main(String[] args) {\n    int first = 78, second = 88, third = 91;\n    int highest = Math.max(first, Math.max(second, third));\n    System.out.println("Highest score: " + highest);\n  }\n}`,
      dryRun: ["first = 78, second = 88, third = 91", "highest becomes 91", "The labelled result is displayed"], timeComplexity: "O(1)", spaceComplexity: "O(1)", outputExplanation: "The final line reports the computed highest score.", commonMistakes: detail.mistakes, optimizationTips: ["Write the dry run before coding.", "Keep intermediate calculations in named variables."], relatedQuestions: [`${chapter.title} timed practice`, `${chapter.title} previous year pattern`],
    },
  ];
}

export const learningTopics = javaChapters.map((chapter, index) => {
  const detail = topicDetails[chapter.slug] || topicDetails.introduction;
  const curriculum = resolveChapterMetadata(chapter.slug, {
    topic: chapter.title,
    difficulty: difficultyByIndex[index % 3],
  });
  return {
    slug: chapter.slug, title: chapter.title, ...curriculum, ...detail,
    introduction: `This topic builds the Java foundation required for ICSE Computer Applications. ${detail.definition}`,
    detailedExplanation: `Use ${chapter.title.toLowerCase()} as a sequence: identify the values involved, choose the correct Java rule, trace the result, and then explain why it works. This is the same reasoning expected in board answers and programming questions.`,
    importantPoints: [detail.definition, "Use precise Java terminology in written answers.", "Practice with small programs before attempting exam-length questions."],
    revisionNotes: ["Review the definition and syntax.", "Explain the topic with one example.", "Attempt easy, medium, and hard practice."],
    summary: `${chapter.title} is easier to retain when you can define it, trace it, and use it in a short Java program.`,
    faqs: [
      { question: `Why is ${chapter.title.toLowerCase()} important?`, answer: "It is a core building block used repeatedly in Java programs and ICSE examination questions." },
      { question: "How should I revise it?", answer: "Read the key terms, trace the example, then answer one question of each difficulty." },
    ],
    examTips: ["Underline command words such as define, explain, trace, and write.", "For programming answers, show a clear algorithm before the Java code.", "Reserve the final minute to verify syntax, output labels, and edge cases."],
    pyqs: [
      { year: "ICSE-style", prompt: `Explain ${chapter.title.toLowerCase()} with a suitable Java example.`, marks: 3 },
      { year: "ISC-style", prompt: `Trace the output of a program using ${chapter.title.toLowerCase()} and justify the result.`, marks: 4 },
    ],
    expectedQuestions: [
      `Differentiate the key terms related to ${chapter.title.toLowerCase()}.`,
      `Write a Java program that applies ${chapter.title.toLowerCase()} to student data.`,
    ],
    questions: createQuestions(chapter, detail, index),
  };
});

export const learningQuestions = learningTopics.flatMap((topic) => topic.questions);

export function getLearningTopic(slug) { return learningTopics.find((topic) => topic.slug === slug); }

export function searchLearningQuestions(questions, filters) {
  const query = filters.query.trim().toLowerCase();
  return questions.filter((question) => {
    const topic = learningTopics.find((item) => item.title === question.topic);
    const topicContent = topic ? [topic.definition, topic.detailedExplanation, topic.example, topic.syntax, ...topic.keyTerms, ...topic.importantPoints, ...topic.revisionNotes].join(" ") : "";
    const haystack = [question.prompt, question.chapter, question.topic, question.subject, question.difficulty, question.type, question.section, topicContent, ...question.tags].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) &&
      (!filters.subject || question.subject === filters.subject) &&
      (!filters.chapter || question.chapter === filters.chapter) &&
      (!filters.difficulty || question.difficulty === filters.difficulty) &&
      (!filters.type || question.type === filters.type);
  });
}

export function getLearningFilterOptions(questions = learningQuestions) {
  const unique = (key) => [...new Set(questions.map((question) => question[key]))].sort();
  return { subjects: unique("subject"), chapters: unique("chapter"), difficulties: unique("difficulty"), types: unique("type") };
}

export { titleCase };
