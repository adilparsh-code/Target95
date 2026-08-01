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
    syntax: [
      {
        title: "Basic Java Program Structure",
        code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
      },
      {
        title: "Variable Declaration",
        code: `int number = 10;
double price = 99.99;
String message = "Hello";`,
      },
    ],
    notes: ["Java programs are compiled into bytecode before execution.", "The language is known for its strong memory safety and reusable design."],
    formulaBox: null,
    mistakes: ["Confusing Java with JavaScript", "Forgetting that Java is case-sensitive"],
    tips: ["Practice the language syntax daily", "Focus on core concepts before moving to advanced topics"],
    importantExamPoints: [
      "Java is platform independent due to JVM.",
      "main() method is the entry point of every Java program.",
      "System.out.println() is used for output.",
      "Java is case-sensitive — Main and main are different.",
    ],
    commonMistakes: [
      "Using main instead of main (case-sensitive error).",
      "Forgetting semicolons at end of statements.",
      "Confusing print, println, and printf.",
    ],
    quickRevision: [
      "Java → OOP language, platform independent.",
      "JVM → Runs bytecode, provides portability.",
      "JDK → Development kit with compiler + tools.",
      "JRE → Runtime environment for execution.",
    ],
    faqs: [
      { question: "Why is Java called platform independent?", answer: "Java code compiles to bytecode which runs on JVM. JVMs exist for all major platforms, so the same bytecode runs anywhere." },
      { question: "What is the difference between JDK and JRE?", answer: "JDK (Java Development Kit) includes JRE plus development tools like compiler and debugger. JRE (Java Runtime Environment) only runs Java programs." },
      { question: "Can we run a Java program without main()?", answer: "No, the main() method is the entry point required by JVM to start execution." },
    ],
    relatedTopics: ["variables-data-types", "operators"],
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
    learningObjectives: [
      "Identify and use primitive data types in Java.",
      "Declare and initialize variables correctly.",
      "Understand type conversion and casting.",
    ],
    concepts: ["Primitive data types", "Variable declaration", "Type assignment"],
    definitions: ["Variable: a named storage location", "int: stores whole numbers", "float: stores decimal values"],
    syntax: [
      {
        title: "Declaring Variables",
        code: `int age = 25;
double price = 19.99;
boolean isActive = true;
char grade = 'A';
String name = "John";`,
      },
      {
        title: "Type Casting",
        code: `int num = (int) 3.14;  // Explicit casting
double d = 10;             // Implicit casting`,
      },
    ],
    notes: ["Always initialize variables before use where possible.", "Use meaningful names for better readability."],
    formulaBox: null,
    mistakes: ["Using the wrong data type for a value", "Forgetting that Java is strongly typed"],
    tips: ["Practice converting values between types", "Remember integer division behavior"],
    importantExamPoints: [
      "Java has 8 primitive data types: byte, short, int, long, float, double, char, boolean.",
      "String is a class, not a primitive.",
      "Default values: int=0, double=0.0, boolean=false.",
      "Type casting can be implicit (widening) or explicit (narrowing).",
    ],
    commonMistakes: [
      "Using = instead of == for comparison.",
      "Forgetting that float literals need 'f' suffix.",
      "Integer division gives integer result (5/2 = 2).",
    ],
    quickRevision: [
      "int → 4 bytes, whole numbers.",
      "double → 8 bytes, decimal numbers.",
      "boolean → true/false.",
      "char → 2 bytes, single character.",
      "Casting: (type) variable.",
    ],
    faqs: [
      { question: "What is the default value of an int variable in Java?", answer: "0. For local variables you must initialize before use, but class-level variables get default values." },
      { question: "What is the difference between float and double?", answer: "float is 4 bytes (single precision), double is 8 bytes (double precision). Double is the default for decimal literals." },
      { question: "Can we store a double value in an int variable?", answer: "Not directly — you need explicit casting: int x = (int) 5.7; which truncates to 5." },
    ],
    relatedTopics: ["introduction", "operators"],
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
    learningObjectives: [
      "Understand arithmetic, relational, and logical operators.",
      "Learn operator precedence and associativity.",
      "Apply operators in expressions correctly.",
    ],
    concepts: ["Arithmetic operators", "Relational operators", "Logical operators"],
    definitions: ["+ adds values", "== compares values", "% returns the remainder"],
    syntax: [
      {
        title: "Arithmetic Operators",
        code: `int sum = 10 + 5;       // 15
int diff = 10 - 5;       // 5
int product = 10 * 5;    // 50
int quotient = 10 / 5;   // 2
int remainder = 10 % 3;  // 1`,
      },
      {
        title: "Logical Operators",
        code: `boolean result = (5 > 3) && (2 < 4);  // true
boolean orResult = (5 < 3) || (2 < 4); // true
boolean notResult = !(5 > 3);          // false`,
      },
    ],
    notes: ["Be careful with operator precedence.", "Use parentheses to make expressions clearer."],
    formulaBox: null,
    mistakes: ["Mixing assignment and equality", "Ignoring operator precedence"],
    tips: ["Practice short expressions by hand", "Test compound conditions step by step"],
    importantExamPoints: [
      "Arithmetic: +, -, *, /, %",
      "Relational: ==, !=, <, >, <=, >=",
      "Logical: &&, ||, !",
      "Precedence: Arithmetic > Relational > Logical",
      "% operator gives remainder, useful for even/odd checks.",
    ],
    commonMistakes: [
      "Using = (assignment) instead of == (comparison) in conditions.",
      "Forgetting that && and || short-circuit.",
      "Not using parentheses leading to unexpected results.",
    ],
    quickRevision: [
      "Arithmetic: + - * / %",
      "Relational: == != < > <= >=",
      "Logical: && || !",
      "Short-circuit: && stops if left is false.",
      "Precedence: () > ! > * / % > + - > < > <= >= > == != > && > ||",
    ],
    faqs: [
      { question: "What is the difference between && and &?", answer: "&& is short-circuit logical AND — if left operand is false, right is not evaluated. & is bitwise AND and always evaluates both operands." },
      { question: "What does the % operator do with negative numbers?", answer: "In Java, % preserves the sign of the dividend. Example: -7 % 3 = -1, 7 % -3 = 1." },
      { question: "What is the difference between ++i and i++?", answer: "++i increments then returns the value (pre-increment). i++ returns the value then increments (post-increment)." },
    ],
    relatedTopics: ["variables-data-types", "if-else"],
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
    learningObjectives: [
      "Write if, if-else, and else-if ladder statements.",
      "Use switch statements for multiple conditions.",
      "Apply logical conditions to control program flow.",
    ],
    concepts: ["if statements", "else blocks", "else if chains"],
    definitions: ["Condition: a boolean expression", "Branching: choosing one path over another"],
    syntax: [
      {
        title: "If-Else Statement",
        code: `int marks = 85;
if (marks >= 90) {
  System.out.println("A");
} else if (marks >= 80) {
  System.out.println("B");
} else {
  System.out.println("C");
}`,
      },
      {
        title: "Switch Statement",
        code: `int day = 3;
switch(day) {
  case 1: System.out.println("Monday"); break;
  case 2: System.out.println("Tuesday"); break;
  case 3: System.out.println("Wednesday"); break;
  default: System.out.println("Other day");
}`,
      },
    ],
    notes: ["Boolean logic is central to decision-making in Java."],
    formulaBox: null,
    mistakes: ["Using assignment instead of comparison", "Missing braces in nested conditions"],
    tips: ["Trace condition values manually before coding", "Keep branches simple and readable"],
    importantExamPoints: [
      "if, else if, else — only one block executes.",
      "switch works with byte, short, int, char, String, enum.",
      "break prevents fall-through in switch.",
      "Ternary: condition ? value1 : value2.",
    ],
    commonMistakes: [
      "Using = instead of == in conditions.",
      "Forgetting break in switch causes fall-through.",
      "Not using {} leads to only first statement in block.",
    ],
    quickRevision: [
      "if(condition) { } else { }",
      "switch(expr) { case val: }",
      "Ternary: cond ? a : b",
      "Nested ifs — indent properly.",
      "switch supports String since Java 7.",
    ],
    faqs: [
      { question: "Can we use strings in switch statements?", answer: "Yes, since Java 7, switch supports String expressions." },
      { question: "What happens if we omit break in switch?", answer: "Execution falls through to the next case (fall-through) until a break is encountered." },
      { question: "What is the ternary operator?", answer: "It's shorthand for if-else: condition ? valueIfTrue : valueIfFalse. Example: int max = (a > b) ? a : b;" },
    ],
    relatedTopics: ["operators", "loops"],
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
    learningObjectives: [
      "Use for, while, and do-while loops effectively.",
      "Control loop execution with break and continue.",
      "Avoid infinite loops and understand loop termination.",
    ],
    concepts: ["for loop", "while loop", "do-while loop"],
    definitions: ["Iteration: one pass through a loop", "Loop variable: controls the repetitions"],
    syntax: [
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
      {
        title: "Do-While Loop",
        code: `int i = 0;
do {
  System.out.println(i);
  i++;
} while (i < 5);`,
      },
    ],
    notes: ["Make sure the loop condition eventually becomes false.", "Avoid infinite loops by checking updates carefully."],
    formulaBox: null,
    mistakes: ["Forgetting to update the loop control variable", "Using the wrong loop for the situation"],
    tips: ["Dry-run loops with a small example", "Choose the loop that clearly matches the task"],
    importantExamPoints: [
      "for loop: initialization; condition; update.",
      "while loop: condition checked first (may run 0 times).",
      "do-while: runs at least once (condition at end).",
      "break exits the loop, continue skips to next iteration.",
      "Nested loops: loop inside another loop.",
    ],
    commonMistakes: [
      "Infinite loops due to missing update statement.",
      "Off-by-one errors in loop conditions.",
      "Using = instead of == in loop condition.",
    ],
    quickRevision: [
      "for(init; cond; update) { }",
      "while(cond) { }",
      "do { } while(cond);",
      "break → exit loop.",
      "continue → skip to next iteration.",
    ],
    faqs: [
      { question: "When should I use a for loop vs a while loop?", answer: "Use for when you know the number of iterations. Use while when the loop depends on a condition that may change during execution." },
      { question: "What is an infinite loop?", answer: "A loop that never terminates because the condition never becomes false. Example: for(;;) or while(true)." },
      { question: "Does do-while always execute at least once?", answer: "Yes, because the condition is checked after the loop body executes." },
    ],
    relatedTopics: ["if-else", "arrays"],
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
    learningObjectives: [
      "Define and call methods with parameters and return values.",
      "Understand method overloading.",
      "Use the static keyword appropriately.",
    ],
    concepts: ["Method definition", "Parameters", "Return values"],
    definitions: ["Method: a reusable block of code", "Parameter: input to a method"],
    syntax: [
      {
        title: "Method Definition",
        code: `public static int add(int a, int b) {
  return a + b;
}`,
      },
      {
        title: "Method Overloading",
        code: `public static int add(int a, int b) {
  return a + b;
}
public static double add(double a, double b) {
  return a + b;
}`,
      },
    ],
    notes: ["Methods should each solve one clear task."],
    formulaBox: null,
    mistakes: ["Writing methods that do too much", "Ignoring the return type"],
    tips: ["Name methods clearly", "Break large tasks into smaller units"],
    importantExamPoints: [
      "Method signature = method name + parameter list.",
      "Overloading: same name, different parameters.",
      "return statement exits method and sends value back.",
      "void methods don't return a value.",
      "static methods belong to class, not instance.",
    ],
    commonMistakes: [
      "Forgetting return statement in non-void method.",
      "Confusing pass-by-value with pass-by-reference.",
      "Method overloading depends on parameter count/type, not return type.",
    ],
    quickRevision: [
      "accessModifier returnType name(params) { }",
      "return value; sends back result.",
      "Overloading: same name, different params.",
      "void → no return.",
      "static → class-level access.",
    ],
    faqs: [
      { question: "Can we overload methods with same name and same parameters but different return type?", answer: "No, return type is not part of method signature. Overloading requires different parameter lists." },
      { question: "What is pass-by-value in Java?", answer: "Java passes arguments by value — a copy of the variable is passed to the method. Primitive values are copied; for objects, the reference is copied." },
      { question: "What is the difference between static and non-static methods?", answer: "Static methods belong to the class and can be called without creating an object. Non-static methods require an object instance." },
    ],
    relatedTopics: ["loops", "arrays"],
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
    learningObjectives: [
      "Declare, initialize, and access array elements.",
      "Traverse arrays using loops.",
      "Understand multi-dimensional arrays.",
    ],
    concepts: ["Array declaration", "Indexing", "Traversal"],
    definitions: ["Index: position of an item in the array", "Element: one item in an array"],
    syntax: [
      {
        title: "Array Declaration and Initialization",
        code: `int[] numbers = new int[5];
numbers[0] = 10;
numbers[1] = 20;

// Array literal
int[] values = {1, 2, 3, 4, 5};`,
      },
      {
        title: "2D Array",
        code: `int[][] matrix = {
  {1, 2, 3},
  {4, 5, 6}
};
System.out.println(matrix[0][1]); // 2`,
      },
    ],
    notes: ["Array indexes begin at 0 in Java."],
    formulaBox: null,
    mistakes: ["Using an invalid index", "Forgetting array length"],
    tips: ["Practice loops that traverse arrays", "Double-check index boundaries"],
    importantExamPoints: [
      "Array index starts at 0, ends at length-1.",
      "Array.length gives the number of elements.",
      "ArrayIndexOutOfBoundsException occurs for invalid index.",
      "Arrays are objects in Java.",
      "2D arrays: int[][] arr = new int[rows][cols];",
    ],
    commonMistakes: [
      "Accessing arr[length] instead of arr[length-1].",
      "Confusing length variable (no parentheses) with String's length().",
      "Forgetting to initialize array elements.",
    ],
    quickRevision: [
      "type[] name = new type[size];",
      "Index: 0 to length-1.",
      "length is a field, not method.",
      "foreach: for(int x : arr) { }",
      "2D: type[][] name = new type[r][c];",
    ],
    faqs: [
      { question: "What is the default value of array elements?", answer: "For numeric types, it's 0. For boolean, it's false. For objects (including String), it's null." },
      { question: "Can we change the size of an array after creation?", answer: "No, arrays are fixed-size. Use ArrayList for dynamic sizing." },
      { question: "What is the difference between length and length()?", answer: "length is a property of arrays (e.g., arr.length). length() is a method of String class (e.g., str.length())." },
    ],
    relatedTopics: ["methods", "strings"],
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
    learningObjectives: [
      "Create and manipulate strings using built-in methods.",
      "Understand string immutability.",
      "Compare strings correctly using equals() vs ==",
    ],
    concepts: ["String declaration", "String methods", "Concatenation"],
    definitions: ["String: a sequence of characters", "Concatenation: joining two strings"],
    syntax: [
      {
        title: "String Methods",
        code: `String str = "Hello World";
System.out.println(str.length());      // 11
System.out.println(str.charAt(0));     // H
System.out.println(str.substring(6));  // World
System.out.println(str.toUpperCase());// HELLO WORLD
System.out.println(str.contains("lo"));// true`,
      },
      {
        title: "String Comparison",
        code: `String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");

System.out.println(s1 == s2);        // true (same literal)
System.out.println(s1 == s3);        // false (different objects)
System.out.println(s1.equals(s3));   // true (same content)`,
      },
    ],
    notes: ["String operations are often easier when you think in terms of characters and positions."],
    formulaBox: null,
    mistakes: ["Confusing string values with character values", "Forgetting string immutability"],
    tips: ["Practice common string methods", "Test edge cases such as empty strings"],
    importantExamPoints: [
      "String is immutable — methods return new string.",
      "Use equals() for content comparison, == for reference.",
      "String methods: length(), charAt(), substring(), indexOf(), toUpperCase(), toLowerCase(), trim().",
      "String literals are stored in String pool.",
      "StringBuilder/StringBuffer for mutable strings.",
    ],
    commonMistakes: [
      "Using == for string comparison instead of equals().",
      "Forgetting that strings are immutable — methods return new strings.",
      "String concatenation in loops is inefficient.",
    ],
    quickRevision: [
      "String = sequence of chars.",
      "Immutable — cannot change after creation.",
      "equals() compares content.",
      "== compares references.",
      "String pool optimizes memory.",
      "StringBuilder for efficient concatenation.",
    ],
    faqs: [
      { question: "Why is String immutable in Java?", answer: "For security (strings used in class loading), caching (string pool), synchronization, and performance." },
      { question: "What is String pool?", answer: "A special memory area where string literals are stored. When you create a string literal, JVM checks the pool first — if exists, it reuses the reference." },
      { question: "What is the difference between StringBuilder and StringBuffer?", answer: "StringBuilder is faster but not thread-safe. StringBuffer is thread-safe (synchronized) but slower. Both are mutable." },
    ],
    relatedTopics: ["arrays", "constructor"],
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
    learningObjectives: [
      "Define constructors with and without parameters.",
      "Understand constructor overloading.",
      "Use the 'this' keyword in constructors.",
    ],
    concepts: ["Constructor definition", "Default constructor", "Parameterized constructor"],
    definitions: ["Constructor: initializes an object", "Object creation: calling the constructor"],
    syntax: [
      {
        title: "Constructor Definition",
        code: `public class Student {
  String name;
  int age;

  // Default constructor
  public Student() {
    name = "Unknown";
    age = 0;
  }

  // Parameterized constructor
  public Student(String name, int age) {
    this.name = name;
    this.age = age;
  }
}

// Usage
Student s1 = new Student();
Student s2 = new Student("Alice", 20);`,
      },
    ],
    notes: ["A constructor has no return type and shares its name with the class."],
    formulaBox: null,
    mistakes: ["Returning a value from a constructor", "Forgetting to initialize required fields"],
    tips: ["Compare constructors with methods carefully", "Practice object initialization with examples"],
    importantExamPoints: [
      "Constructor has same name as class and no return type.",
      "Default constructor is provided if no constructor is defined.",
      "Constructors can be overloaded (different parameters).",
      "this() calls another constructor in same class.",
      "super() calls parent class constructor.",
    ],
    commonMistakes: [
      "Adding return type to constructor (makes it a method).",
      "Forgetting to call super() in subclass constructor.",
      "Creating infinite recursive constructor calls.",
    ],
    quickRevision: [
      "Constructor = same name as class.",
      "No return type — not even void.",
      "Default constructor: provided by compiler if absent.",
      "Overloading: multiple constructors with different params.",
      "this() → same class constructor.",
      "super() → parent class constructor.",
    ],
    faqs: [
      { question: "What happens if we don't define any constructor?", answer: "Java automatically provides a default no-argument constructor that initializes fields to default values." },
      { question: "Can a constructor be private?", answer: "Yes, private constructors are used in singleton pattern and utility classes to prevent instantiation from outside." },
      { question: "Does constructor return any value?", answer: "No, constructors don't have return types. They initialize the object being created." },
    ],
    relatedTopics: ["strings", "methods"],
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

    const sd = chapterStudyData[chapter.slug] ?? {
      intro: `Learn the core ideas for ${chapter.title}.`,
      concepts: ["Core concepts", "Practice questions", "Revision"],
      definitions: ["Definition 1", "Definition 2"],
      notes: ["Keep reviewing the material until it feels familiar."],
      formulaBox: null,
      mistakes: ["Skipping the basics", "Avoiding repeated revision"],
      tips: ["Break the chapter into small study sessions"],
      summary: "Review the chapter steadily and test yourself with practice questions.",
      syntax: [],
      importantExamPoints: [],
      commonMistakes: [],
      quickRevision: [],
      faqs: [],
      relatedTopics: [],
      learningObjectives: [],
    };

    return {
      ...chapter,
      totalQuestions: chapterQuestions.length,
      easyCount,
      mediumCount,
      hardCount,
      difficulty,
      estimatedStudyTime: `${Math.max(10, chapterQuestions.length * 2)} min`,
      studyData: {
        ...sd,
        syntax: sd.syntax || [],
        importantExamPoints: sd.importantExamPoints || [],
        commonMistakes: sd.commonMistakes || [],
        quickRevision: sd.quickRevision || [],
        faqs: sd.faqs || [],
        relatedTopics: sd.relatedTopics || [],
        learningObjectives: sd.learningObjectives || [],
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

/**
 * Search across all study chapters, topics, questions, and keywords.
 * Supports: subject, chapter, topic, question, keywords, instant search.
 */
export function searchStudyContent(query) {
  if (!query || !query.trim()) {
    return { chapters: getStudyChapters(), results: [] };
  }

  const q = query.trim().toLowerCase();
  const chapters = getStudyChapters();

  const results = [];

  chapters.forEach((chapter) => {
    const sd = chapter.studyData;
    let matchReasons = [];

    // Search chapter title/slug
    if (chapter.title.toLowerCase().includes(q)) matchReasons.push("chapter-title");
    if (chapter.slug.toLowerCase().includes(q)) matchReasons.push("chapter-slug");
    if (chapter.difficulty.toLowerCase().includes(q)) matchReasons.push("difficulty");

    // Search study data fields
    if (sd.intro && sd.intro.toLowerCase().includes(q)) matchReasons.push("intro");
    if (sd.summary && sd.summary.toLowerCase().includes(q)) matchReasons.push("summary");

    // Concepts
    if (sd.concepts && sd.concepts.some((c) => c.toLowerCase().includes(q))) matchReasons.push("concepts");

    // Definitions
    if (sd.definitions && sd.definitions.some((d) => d.toLowerCase().includes(q))) matchReasons.push("definitions");

    // Notes
    if (sd.notes && sd.notes.some((n) => n.toLowerCase().includes(q))) matchReasons.push("notes");

    // Tips
    if (sd.tips && sd.tips.some((t) => t.toLowerCase().includes(q))) matchReasons.push("tips");

    // Mistakes
    if (sd.mistakes && sd.mistakes.some((m) => m.toLowerCase().includes(q))) matchReasons.push("mistakes");

    // Learning objectives
    if (sd.learningObjectives && sd.learningObjectives.some((lo) => lo.toLowerCase().includes(q))) matchReasons.push("learning-objectives");

    // Important exam points
    if (sd.importantExamPoints && sd.importantExamPoints.some((ep) => ep.toLowerCase().includes(q))) matchReasons.push("exam-points");

    // Common mistakes
    if (sd.commonMistakes && sd.commonMistakes.some((cm) => cm.toLowerCase().includes(q))) matchReasons.push("common-mistakes");

    // Quick revision
    if (sd.quickRevision && sd.quickRevision.some((qr) => qr.toLowerCase().includes(q))) matchReasons.push("quick-revision");

    // FAQs
    if (sd.faqs && sd.faqs.some((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))) matchReasons.push("faqs");

    // Related topics
    if (sd.relatedTopics && sd.relatedTopics.some((rt) => rt.toLowerCase().includes(q))) matchReasons.push("related-topics");

    // Examples
    if (sd.examples && sd.examples.some((e) => e.title.toLowerCase().includes(q) || e.code.toLowerCase().includes(q))) matchReasons.push("examples");

    if (matchReasons.length > 0) {
      results.push({
        chapter,
        reasons: matchReasons,
        score: matchReasons.length,
      });
    }
  });

  // Sort by relevance score (descending)
  results.sort((a, b) => b.score - a.score);

  return {
    chapters: results.map((r) => r.chapter),
    results,
    totalResults: results.length,
  };
}