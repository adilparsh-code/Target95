import javaChapters from "../app/data/javaChapters";
import questions from "../app/data/questions";

export const STUDY_PROGRESS_STORAGE_KEY = "target95-study-progress";

const chapterStudyData = {
  introduction: {
    intro: "Java is a high-level, object-oriented language that focuses on portability, readability, and strong programming fundamentals.",
    learningObjectives: [
      "Understand the basic principles of object-oriented programming.",
      "Learn about the Java Virtual Machine (JVM) and its role in platform independence.",
      "Write, compile, and run a simple Java program.",
    ],
    concepts: ["Object-oriented programming", "Platform independence", "Java Virtual Machine"],
    definitions: ["Class: a blueprint for objects", "Object: an instance of a class", "JVM: runs Java bytecode"],
    notes: ["Java programs are compiled into bytecode before execution.", "The language is known for its strong memory safety and reusable design."],
    formulaBox: null,
    mistakes: ["Confusing Java with JavaScript", "Forgetting that Java is case-sensitive"],
    tips: ["Practice the language syntax daily", "Focus on core concepts before moving to advanced topics"],
    summary: "Build a strong base in Java fundamentals before attempting more advanced chapters.",
    prerequisites: [],
    examples: [
      {
        title: "Hello World",
        code: `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
      },
    ],
  },
  "variables-data-types": {
    intro: "Variables store data, while data types define the kind of values that can be stored.",
    concepts: ["Primitive data types", "Variable declaration", "Type assignment"],
    definitions: ["Variable: a named storage location", "int: stores whole numbers", "float: stores decimal values"],
    notes: ["Always initialize variables before use where possible.", "Use meaningful names for better readability."],
    formulaBox: null,
    mistakes: ["Using the wrong data type for a value", "Forgetting that Java is strongly typed"],
    tips: ["Practice converting values between types", "Remember integer division behavior"],
    summary: "Use the right variable type to keep code reliable and easy to read.",
    prerequisites: ["introduction"],
    examples: [
      {
        title: "Declaring Variables",
        code: `int age = 25;
String name = "John";
boolean isStudent = true;`,
      },
    ],
  },
  operators: {
    intro: "Operators help you manipulate values and make decisions in programs.",
    concepts: ["Arithmetic operators", "Relational operators", "Logical operators"],
    definitions: ["+ adds values", "== compares values", "% returns the remainder"],
    notes: ["Be careful with operator precedence.", "Use parentheses to make expressions clearer."],
    formulaBox: null,
    mistakes: ["Mixing assignment and equality", "Ignoring operator precedence"],
    tips: ["Practice short expressions by hand", "Test compound conditions step by step"],
    summary: "Understanding operator behavior makes condition and loop logic easier.",
    prerequisites: ["variables-data-types"],
    examples: [
      {
        title: "Arithmetic Operators",
        code: `int sum = 5 + 3; // 8
int difference = 5 - 3; // 2
int product = 5 * 3; // 15
int quotient = 5 / 3; // 1
int remainder = 5 % 3; // 2`,
      },
    ],
  },
  "if-else": {
    intro: "Conditional statements let the program choose what to do based on logical conditions.",
    concepts: ["if statements", "else blocks", "else if chains"],
    definitions: ["Condition: a boolean expression", "Branching: choosing one path over another"],
    notes: ["Boolean logic is central to decision-making in Java."],
    formulaBox: null,
    mistakes: ["Using assignment instead of comparison", "Missing braces in nested conditions"],
    tips: ["Trace condition values manually before coding", "Keep branches simple and readable"],
    summary: "Good conditional logic is essential for writing dependable programs.",
    prerequisites: ["operators"],
    examples: [
      {
        title: "If-Else Statement",
        code: `int score = 85;
if (score >= 90) {
  System.out.println("A");
} else if (score >= 80) {
  System.out.println("B");
} else {
  System.out.println("C");
}`,
      },
    ],
  },
  loops: {
    intro: "Loops repeat a block of code until a stopping condition is reached.",
    concepts: ["for loop", "while loop", "do-while loop"],
    definitions: ["Iteration: one pass through a loop", "Loop variable: controls the repetitions"],
    notes: ["Make sure the loop condition eventually becomes false.", "Avoid infinite loops by checking updates carefully."],
    formulaBox: null,
    mistakes: ["Forgetting to update the loop control variable", "Using the wrong loop for the situation"],
    tips: ["Dry-run loops with a small example", "Choose the loop that clearly matches the task"],
    summary: "Loops are powerful when you understand how they terminate.",
    prerequisites: ["if-else"],
    examples: [
      {
        title: "For Loop",
        code: `for (int i = 0; i < 5; i++) {
  System.out.println(i);
}`,
      },
      {
        title: "While Loop",
        code: `int i = 0;
while (i < 5) {
  System.out.println(i);
  i++;
}`,
      },
    ],
  },
  methods: {
    intro: "Methods make code reusable and easier to manage.",
    concepts: ["Method definition", "Parameters", "Return values"],
    definitions: ["Method: a reusable block of code", "Parameter: input to a method"],
    notes: ["Methods should each solve one clear task."],
    formulaBox: null,
    mistakes: ["Writing methods that do too much", "Ignoring the return type"],
    tips: ["Name methods clearly", "Break large tasks into smaller units"],
    summary: "Use methods to keep code organized and manageable.",
    prerequisites: ["loops"],
    examples: [
      {
        title: "Method Definition",
        code: `public int add(int a, int b) {
  return a + b;
}`,
      },
    ],
  },
  arrays: {
    intro: "Arrays store multiple values in one container.",
    concepts: ["Array declaration", "Indexing", "Traversal"],
    definitions: ["Index: position of an item in the array", "Element: one item in an array"],
    notes: ["Array indexes begin at 0 in Java."],
    formulaBox: null,
    mistakes: ["Using an invalid index", "Forgetting array length"],
    tips: ["Practice loops that traverse arrays", "Double-check index boundaries"],
    summary: "Arrays are a core data structure in Java programming.",
    prerequisites: ["methods"],
    examples: [
      {
        title: "Array Declaration",
        code: `int[] numbers = new int[5];
numbers[0] = 10;
numbers[1] = 20;`,
      },
    ],
  },
  strings: {
    intro: "Strings represent text in Java and are commonly used in programs.",
    concepts: ["String declaration", "String methods", "Concatenation"],
    definitions: ["String: a sequence of characters", "Concatenation: joining two strings"],
    notes: ["String operations are often easier when you think in terms of characters and positions."],
    formulaBox: null,
    mistakes: ["Confusing string values with character values", "Forgetting string immutability"],
    tips: ["Practice common string methods", "Test edge cases such as empty strings"],
    summary: "Good string handling improves both correctness and readability.",
    prerequisites: ["arrays"],
    examples: [
      {
        title: "String Concatenation",
        code: `String firstName = "John";
String lastName = "Doe";
String fullName = firstName + " " + lastName;`,
      },
    ],
  },
  constructor: {
    intro: "Constructors initialize objects when they are created.",
    concepts: ["Constructor definition", "Default constructor", "Parameterized constructor"],
    definitions: ["Constructor: initializes an object", "Object creation: calling the constructor"],
    notes: ["A constructor has no return type and shares its name with the class."],
    formulaBox: null,
    mistakes: ["Returning a value from a constructor", "Forgetting to initialize required fields"],
    tips: ["Compare constructors with methods carefully", "Practice object initialization with examples"],
    summary: "Constructors are a practical tool for creating well-formed objects.",
    prerequisites: ["strings"],
    examples: [
      {
        title: "Constructor Definition",
        code: `public class Dog {
  String name;

  public Dog(String name) {
    this.name = name;
  }
}`,
      },
    ],
  },
};

export function getStudyChapters() {
  return javaChapters.map((chapter) => {
    const chapterQuestions = questions.filter((item) => item.chapter === chapter.slug);
    const easyCount = chapterQuestions.filter((item) => item.difficulty.toLowerCase() === "easy").length;
    const mediumCount = chapterQuestions.filter((item) => item.difficulty.toLowerCase() === "medium").length;
    const hardCount = chapterQuestions.filter((item) => item.difficulty.toLowerCase() === "hard").length;

    let difficulty;
    if (hardCount > easyCount && hardCount > mediumCount) {
      difficulty = "Hard";
    } else if (mediumCount > easyCount) {
      difficulty = "Medium";
    } else {
      difficulty = "Easy";
    }

    return {
      ...chapter,
      totalQuestions: chapterQuestions.length,
      easyCount,
      mediumCount,
      hardCount,
      difficulty,
      estimatedStudyTime: `${Math.max(10, chapterQuestions.length * 2)} min`,
      studyData: chapterStudyData[chapter.slug] ?? {
        intro: `Learn the core ideas for ${chapter.title}.`,
        concepts: ["Core concepts", "Practice questions", "Revision"],
        definitions: ["Definition 1", "Definition 2"],
        notes: ["Keep reviewing the material until it feels familiar."],
        formulaBox: null,
        mistakes: ["Skipping the basics", "Avoiding repeated revision"],
        tips: ["Break the chapter into small study sessions"],
        summary: "Review the chapter steadily and test yourself with practice questions.",
      },
    };
  });
}

export function getStudyChapterBySlug(slug) {
  return getStudyChapters().find((chapter) => chapter.slug === slug);
}

export function getStudyProgressState() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const savedProgress = window.localStorage.getItem(STUDY_PROGRESS_STORAGE_KEY);

    if (!savedProgress) {
      return {};
    }

    return JSON.parse(savedProgress);
  } catch {
    return {};
  }
}

export function saveStudyProgressState(progress) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STUDY_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage failures.
  }
}