const chapter = {
  id: "data-types-variables",
  title: "Data Types & Variables",
  slug: "data-types-variables",
  subject: "Java Programming",
  difficulty: "Beginner",
  estimatedTime: 60,
  topics: ["tokens", "identifiers", "keywords", "variables", "constants", "primitive data types", "literals", "type conversion", "casting"],
  introduction: {
    description: "Java variables store data in memory. Every variable has a name, a data type and a value, while literals are fixed values written directly in a program.",
    realLifeExamples: ["An age variable stores a whole number.", "A percentage variable can store a decimal value.", "A grade variable can store a character such as 'A'."]
  },
  theoryNotes: {
    beginnerExplanation: "Think of a variable as a labelled box in memory. The data type tells Java what kind of value the box can store and how that value should be interpreted.",
    importantPoints: [
      "Java primitive types include byte, short, int, long, float, double, char and boolean.",
      "An identifier is a programmer-defined name for a variable, method or class.",
      "Identifiers cannot contain spaces and cannot be Java keywords.",
      "Java is case-sensitive, so marks and Marks are different identifiers.",
      "A constant can be declared using final.",
      "An int literal such as 25 represents a whole-number value; 3.5 is a floating-point literal.",
      "Widening conversion is generally automatic, while narrowing conversion requires explicit casting.",
      "A char stores one character and a boolean stores true or false."
    ],
    syntax: ["int marks = 85;", "double average = 87.5;", "final double PI = 3.14159;", "int n = (int) 12.8;"]
  },
  examples: [
    { title: "Declaration and initialization", code: "int age;\nage = 15;\ndouble percentage = 92.5;\nchar grade = 'A';\nboolean passed = true;", explanation: "Each variable has a declared type and receives a compatible value." },
    { title: "Explicit casting", code: "double x = 12.8;\nint y = (int)x;\nSystem.out.println(y);", explanation: "The decimal part is discarded during the narrowing conversion, so y becomes 12." }
  ],
  commonMistakes: ["Using a keyword as an identifier.", "Forgetting that char uses single quotes.", "Assigning a decimal value to int without an appropriate conversion.", "Confusing declaration with initialization."],
  practiceQuestions: [
    { id: "DT-01", type: "conceptual", question: "What is the difference between a variable and a constant in Java?", answer: "A variable may be changed after initialization; a constant declared with final cannot be reassigned." },
    { id: "DT-02", type: "output", question: "Find the output: double x = 12.8; int y = (int)x; System.out.println(y);", answer: "12" },
    { id: "DT-03", type: "programming", question: "Declare suitable variables for a student's name, roll number, percentage and grade.", answer: "String name; int rollNo; double percentage; char grade;" }
  ],
  summary: "Choose the correct data type, use valid identifiers, initialize variables carefully, and understand widening and explicit narrowing conversions."
};

export default chapter;
