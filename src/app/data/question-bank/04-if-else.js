const chapter4 = {
  id: 4,
  title: "Conditional Constructs",
  slug: "if-else",
  description: "Practice conditional statements including if, if-else, nested if, and switch-case.",
  topics: ["if Statement", "if-else", "Nested if", "if-else if Ladder", "Switch Case", "Ternary"],

  mcqs: [
    {
      id: "CH04-MCQ-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if Statement",
      question: "What will be the output of the following code?\n\nint x = 10;\nif (x > 5)\n    System.out.println(\"A\");\n    System.out.println(\"B\");",
      options: [
        "A) A",
        "B) B",
        "C) A B",
        "D) Compilation error"
      ],
      correctAnswer: "C",
      explanation: "Without braces, only the first statement (println(\"A\")) is part of the if block. println(\"B\") is outside the if and always executes. So both A and B are printed.",
      hint: "How many statements are controlled by the if without braces?",
      estimatedTime: 25,
      marks: 1,
      tags: ["if", "braces", "block"]
    },
    {
      id: "CH04-MCQ-002",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "What will be the output?\n\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(\"Greater\");\nelse\n    System.out.println(\"Smaller\");",
      options: [
        "A) Greater",
        "B) Smaller",
        "C) No output",
        "D) Compilation error"
      ],
      correctAnswer: "B",
      explanation: "5 > 10 is false, so the if block is skipped and the else block executes, printing 'Smaller'.",
      hint: "Is 5 greater than 10?",
      estimatedTime: 15,
      marks: 1,
      tags: ["if-else", "condition"]
    },
    {
      id: "CH04-MCQ-003",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "What will be the output?\n\nint x = 15;\nif (x > 10) {\n    if (x > 20) {\n        System.out.println(\"A\");\n    } else {\n        System.out.println(\"B\");\n    }\n} else {\n    System.out.println(\"C\");\n}",
      options: [
        "A) A",
        "B) B",
        "C) C",
        "D) No output"
      ],
      correctAnswer: "B",
      explanation: "x > 10 is true (15 > 10), so we enter the outer if. Then x > 20 is false (15 > 20 is false), so the inner else executes, printing 'B'.",
      hint: "Trace through both conditions step by step.",
      estimatedTime: 25,
      marks: 1,
      tags: ["nested if", "conditional logic"]
    },
    {
      id: "CH04-MCQ-004",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else if Ladder",
      question: "What will be the output?\n\nint marks = 75;\nif (marks >= 90)\n    System.out.println(\"A\");\nelse if (marks >= 80)\n    System.out.println(\"B\");\nelse if (marks >= 70)\n    System.out.println(\"C\");\nelse\n    System.out.println(\"D\");",
      options: [
        "A) A",
        "B) B",
        "C) C",
        "D) D"
      ],
      correctAnswer: "C",
      explanation: "75 >= 90 is false. 75 >= 80 is false. 75 >= 70 is true, so 'C' is printed. The else-if ladder stops at the first true condition.",
      hint: "Which condition is the first one that evaluates to true?",
      estimatedTime: 20,
      marks: 1,
      tags: ["else-if ladder", "grading"]
    },
    {
      id: "CH04-MCQ-005",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch Case",
      question: "What will be the output?\n\nint day = 3;\nswitch (day) {\n    case 1: System.out.println(\"Mon\"); break;\n    case 2: System.out.println(\"Tue\"); break;\n    case 3: System.out.println(\"Wed\"); break;\n    default: System.out.println(\"Other\");\n}",
      options: [
        "A) Mon",
        "B) Tue",
        "C) Wed",
        "D) Other"
      ],
      correctAnswer: "C",
      explanation: "day = 3 matches case 3, so 'Wed' is printed. The break statement prevents fall-through to subsequent cases.",
      hint: "Which case matches the value 3?",
      estimatedTime: 15,
      marks: 1,
      tags: ["switch", "case", "break"]
    },
    {
      id: "CH04-MCQ-006",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch Case",
      question: "What will be the output?\n\nchar grade = 'B';\nswitch (grade) {\n    case 'A': System.out.print(\"Excellent \");\n    case 'B': System.out.print(\"Good \");\n    case 'C': System.out.print(\"Average \");\n    default: System.out.print(\"Invalid\");\n}",
      options: [
        "A) Good",
        "B) Good Average Invalid",
        "C) Excellent Good Average Invalid",
        "D) Good Average"
      ],
      correctAnswer: "B",
      explanation: "grade = 'B' matches case 'B'. Since there is no break statement, fall-through occurs — all subsequent cases execute. So 'Good Average Invalid' is printed.",
      hint: "What happens when there is no break in a switch case?",
      estimatedTime: 30,
      marks: 2,
      tags: ["switch", "fall-through", "break"]
    },
    {
      id: "CH04-MCQ-007",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch Case",
      question: "Which of the following data types CANNOT be used in a switch expression?",
      options: [
        "A) int",
        "B) char",
        "C) String",
        "D) double"
      ],
      correctAnswer: "D",
      explanation: "Switch works with int, char, byte, short, String (Java 7+), and enum. It does NOT work with double, float, or long.",
      hint: "Switch requires discrete, exact-match values.",
      estimatedTime: 20,
      marks: 1,
      tags: ["switch", "data types", "limitations"]
    },
    {
      id: "CH04-MCQ-008",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "What is the purpose of the else clause in an if-else statement?",
      options: [
        "A) To check another condition",
        "B) To execute code when the if condition is false",
        "C) To terminate the program",
        "D) To repeat a block of code"
      ],
      correctAnswer: "B",
      explanation: "The else clause executes a block of code when the if condition evaluates to false. It provides an alternative path of execution.",
      hint: "What happens when the if condition is not true?",
      estimatedTime: 10,
      marks: 1,
      tags: ["else", "alternative path"]
    }
  ],

  assertionReasons: [
    {
      id: "CH04-AR-001",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "Assertion (A): In an if-else statement, both the if block and else block can execute simultaneously.\nReason (R): The if-else statement provides two mutually exclusive paths of execution.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "D",
      explanation: "A is false — only one block (if or else) executes, never both. R is true — if-else provides two mutually exclusive paths.",
      hint: "Can both the if and else blocks run in the same execution?",
      estimatedTime: 20,
      marks: 2,
      tags: ["if-else", "mutually exclusive"]
    },
    {
      id: "CH04-AR-002",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "Assertion (A): The break statement in a switch case is optional.\nReason (R): Without break, execution falls through to the next case.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "break is optional in switch. Without it, execution continues into the next case (fall-through). This can be used intentionally to share code between cases.",
      hint: "What happens if you omit break in a case?",
      estimatedTime: 20,
      marks: 2,
      tags: ["switch", "break", "fall-through"]
    },
    {
      id: "CH04-AR-003",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "Assertion (A): Nested if statements can be replaced with logical operators (&&, ||) in many cases.\nReason (R): Logical operators combine multiple conditions into a single boolean expression.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Nested ifs like 'if (a > 0) { if (a < 100) { ... } }' can be written as 'if (a > 0 && a < 100) { ... }'. Logical operators combine conditions effectively.",
      hint: "Can you combine nested conditions into a single condition?",
      estimatedTime: 25,
      marks: 2,
      tags: ["nested if", "logical operators", "refactoring"]
    },
    {
      id: "CH04-AR-004",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else if",
      question: "Assertion (A): In an if-else if ladder, conditions are evaluated from top to bottom.\nReason (R): Once a condition is found to be true, the remaining conditions are skipped.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "The if-else if ladder evaluates conditions sequentially. The first true condition's block executes, and the rest are skipped due to the else-if chain.",
      hint: "Does Java check all conditions or stop at the first true one?",
      estimatedTime: 20,
      marks: 2,
      tags: ["else-if ladder", "evaluation order"]
    }
  ],

  trueFalse: [
    {
      id: "CH04-TF-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if Statement",
      question: "The condition in an if statement must be enclosed in parentheses ().",
      correctAnswer: "True",
      explanation: "In Java, the condition in an if statement must always be enclosed in parentheses. Example: if (x > 5) { ... }",
      hint: "What syntax is required around the condition?",
      estimatedTime: 10,
      marks: 1,
      tags: ["if", "syntax", "parentheses"]
    },
    {
      id: "CH04-TF-002",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "An if statement can exist without an else clause.",
      correctAnswer: "True",
      explanation: "The else clause is optional in Java. You can have just an if statement without an else.",
      hint: "Is else mandatory when using if?",
      estimatedTime: 10,
      marks: 1,
      tags: ["if", "else", "optional"]
    },
    {
      id: "CH04-TF-003",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "The default case in a switch statement is mandatory.",
      correctAnswer: "False",
      explanation: "The default case is optional. It executes when no other case matches. If there is no default and no case matches, the switch simply does nothing.",
      hint: "What happens if no case matches and there's no default?",
      estimatedTime: 15,
      marks: 1,
      tags: ["switch", "default", "optional"]
    },
    {
      id: "CH04-TF-004",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "A switch statement can have multiple case labels with the same value.",
      correctAnswer: "False",
      explanation: "Duplicate case values are not allowed in a switch statement. Each case value must be unique. The compiler will report a 'duplicate case' error.",
      hint: "Can two cases have the same value?",
      estimatedTime: 15,
      marks: 1,
      tags: ["switch", "duplicate case"]
    },
    {
      id: "CH04-TF-005",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "An else clause always belongs to the nearest if statement that doesn't already have an else.",
      correctAnswer: "True",
      explanation: "In nested if structures, an else is associated with the closest preceding if that doesn't already have an else. This is called the 'dangling else' rule.",
      hint: "Which if does an else belong to in nested structures?",
      estimatedTime: 20,
      marks: 1,
      tags: ["dangling else", "nested if", "association"]
    }
  ],

  fillBlanks: [
    {
      id: "CH04-FIB-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "The ________ statement is used to execute one block of code if a condition is true and another block if it is false.",
      correctAnswer: "if-else",
      explanation: "The if-else statement provides two-way branching. If the condition is true, the if block executes; otherwise, the else block executes.",
      hint: "It has two paths — one for true, one for false.",
      estimatedTime: 10,
      marks: 1,
      tags: ["if-else", "conditional"]
    },
    {
      id: "CH04-FIB-002",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "The ________ keyword in a switch statement prevents fall-through to the next case.",
      correctAnswer: "break",
      explanation: "The break statement exits the switch block. Without it, execution continues into the next case (fall-through).",
      hint: "It 'breaks' out of the switch.",
      estimatedTime: 10,
      marks: 1,
      tags: ["break", "switch", "fall-through"]
    },
    {
      id: "CH04-FIB-003",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "The ________ case in a switch statement executes when no other case matches.",
      correctAnswer: "default",
      explanation: "The default case is optional and acts as a catch-all. It executes when none of the specified case values match the switch expression.",
      hint: "It's the 'fallback' case.",
      estimatedTime: 10,
      marks: 1,
      tags: ["default", "switch", "catch-all"]
    },
    {
      id: "CH04-FIB-004",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "An if statement inside another if statement is called ________ if.",
      correctAnswer: "nested",
      explanation: "Nested if means placing one if-else construct inside another. This allows checking multiple conditions in a hierarchical manner.",
      hint: "It means 'one inside another'.",
      estimatedTime: 10,
      marks: 1,
      tags: ["nested", "if inside if"]
    },
    {
      id: "CH04-FIB-005",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else if",
      question: "A chain of if-else statements used to test multiple conditions is called an if-else if ________.",
      correctAnswer: "ladder",
      explanation: "The if-else if ladder is a series of conditions checked in sequence. It's also called an if-else if chain.",
      hint: "It's like climbing steps — checking one condition after another.",
      estimatedTime: 15,
      marks: 1,
      tags: ["ladder", "chain", "multiple conditions"]
    }
  ],

  outputQuestions: [
    {
      id: "CH04-OUT-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int num = -5;\n        if (num > 0) {\n            System.out.println(\"Positive\");\n        } else {\n            System.out.println(\"Non-positive\");\n        }\n    }\n}",
      correctAnswer: "Non-positive",
      explanation: "-5 > 0 is false, so the else block executes, printing 'Non-positive'.",
      hint: "Is -5 greater than 0?",
      estimatedTime: 15,
      marks: 1,
      tags: ["if-else", "positive", "negative"]
    },
    {
      id: "CH04-OUT-002",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int year = 2024;\n        if (year % 4 == 0) {\n            if (year % 100 == 0) {\n                if (year % 400 == 0) {\n                    System.out.println(\"Leap year\");\n                } else {\n                    System.out.println(\"Not a leap year\");\n                }\n            } else {\n                System.out.println(\"Leap year\");\n            }\n        } else {\n            System.out.println(\"Not a leap year\");\n        }\n    }\n}",
      correctAnswer: "Leap year",
      explanation: "2024 is divisible by 4 (true), not divisible by 100 (false), so the inner else-if branch executes: 'Leap year'.",
      hint: "Check divisibility by 4, 100, and 400.",
      estimatedTime: 35,
      marks: 3,
      tags: ["leap year", "nested if", "divisibility"]
    },
    {
      id: "CH04-OUT-003",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int option = 2;\n        switch (option) {\n            case 1: System.out.println(\"Option 1\");\n            case 2: System.out.println(\"Option 2\");\n            case 3: System.out.println(\"Option 3\"); break;\n            default: System.out.println(\"Default\");\n        }\n    }\n}",
      correctAnswer: "Option 2\nOption 3",
      explanation: "option = 2 matches case 2. There's no break after case 2, so fall-through occurs. Case 2 prints 'Option 2', then case 3 prints 'Option 3', then break exits the switch.",
      hint: "Look for break statements after each case.",
      estimatedTime: 25,
      marks: 2,
      tags: ["switch", "fall-through", "break"]
    },
    {
      id: "CH04-OUT-004",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else if",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 10, b = 20, c = 15;\n        if (a > b && a > c) {\n            System.out.println(\"a is largest\");\n        } else if (b > c) {\n            System.out.println(\"b is largest\");\n        } else {\n            System.out.println(\"c is largest\");\n        }\n    }\n}",
      correctAnswer: "b is largest",
      explanation: "a > b && a > c => 10 > 20 && 10 > 15 => false && false => false. b > c => 20 > 15 => true, so 'b is largest' is printed.",
      hint: "Evaluate each condition in the ladder sequentially.",
      estimatedTime: 25,
      marks: 2,
      tags: ["else-if ladder", "largest", "logical AND"]
    },
    {
      id: "CH04-OUT-005",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Ternary",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 5, y = 10, z = 15;\n        int result = (x > y) ? (x > z ? x : z) : (y > z ? y : z);\n        System.out.println(result);\n    }\n}",
      correctAnswer: "15",
      explanation: "x > y is false (5 > 10), so the expression after colon executes: (y > z ? y : z). y > z is false (10 > 15), so z = 15 is returned.",
      hint: "This is a nested ternary finding the maximum of three numbers.",
      estimatedTime: 30,
      marks: 3,
      tags: ["nested ternary", "maximum"]
    }
  ],

  errorFinding: [
    {
      id: "CH04-ERR-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if Syntax",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 10;\n        if x > 5 {\n            System.out.println(\"Greater\");\n        }\n    }\n}",
      correctAnswer: "The condition in if must be enclosed in parentheses: if (x > 5)",
      explanation: "In Java, the condition in an if statement must be inside parentheses (). The correct syntax is 'if (x > 5)'.",
      hint: "What is missing around the condition?",
      estimatedTime: 10,
      marks: 1,
      tags: ["syntax", "parentheses", "if"]
    },
    {
      id: "CH04-ERR-002",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 2;\n        switch (x) {\n            case 1: System.out.println(\"One\");\n            case 2: System.out.println(\"Two\");\n            case 1: System.out.println(\"One again\");\n        }\n    }\n}",
      correctAnswer: "Duplicate case value 1. Case values must be unique in a switch statement.",
      explanation: "The switch has two cases with value 1. Java does not allow duplicate case values. The compiler will report a 'duplicate case label' error.",
      hint: "Are all case values unique?",
      estimatedTime: 15,
      marks: 1,
      tags: ["switch", "duplicate case", "error"]
    },
    {
      id: "CH04-ERR-003",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 10;\n        if (a = 5) {\n            System.out.println(\"Five\");\n        }\n    }\n}",
      correctAnswer: "Using = (assignment) instead of == (equality). if (a = 5) assigns 5 to a and returns 5 (int), not a boolean.",
      explanation: "The condition in if must be a boolean expression. a = 5 is an assignment that returns 5 (int), which cannot be converted to boolean. Use a == 5 for comparison.",
      hint: "What is the difference between = and ==?",
      estimatedTime: 20,
      marks: 2,
      tags: ["assignment", "equality", "if condition"]
    },
    {
      id: "CH04-ERR-004",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        double value = 3.5;\n        switch (value) {\n            case 3.5: System.out.println(\"Three point five\");\n        }\n    }\n}",
      correctAnswer: "Switch does not support double or float types. Use int, char, byte, short, String, or enum.",
      explanation: "The switch expression must be of type int, char, byte, short, String, or an enum. double and float are not allowed.",
      hint: "What data types are allowed in a switch expression?",
      estimatedTime: 20,
      marks: 2,
      tags: ["switch", "double", "type restriction"]
    },
    {
      id: "CH04-ERR-005",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Dangling Else",
      question: "Find the error in the following Java code (logical error, not syntax):\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 10, y = 5;\n        if (x > 5)\n            if (y > 10)\n                System.out.println(\"Both conditions true\");\n        else\n            System.out.println(\"x is not greater than 5\");\n    }\n}",
      correctAnswer: "The else belongs to the inner if (y > 10), not the outer if (x > 5). This is the 'dangling else' problem. The message 'x is not greater than 5' will never print when x > 5 is true.",
      explanation: "In Java, an else is associated with the nearest if that doesn't have an else. Here, else belongs to 'if (y > 10)'. Since y > 10 is false, the else prints, but the message is misleading. Use braces to clarify: if (x > 5) { if (y > 10) { ... } } else { ... }",
      hint: "Which if does the else belong to?",
      estimatedTime: 30,
      marks: 3,
      tags: ["dangling else", "logical error", "braces"]
    }
  ],

  programmingQuestions: [
    {
      id: "CH04-PRQ-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      problemStatement: "Write a Java program to check whether a number is even or odd. Use the if-else statement. Test with num = 17.",
      input: "No input required (num = 17).",
      output: "17 is odd",
      constraints: "Use the modulus operator (%) and if-else.",
      logic: "If num % 2 == 0, the number is even; otherwise, it is odd.",
      solution: `public class EvenOdd {
    public static void main(String[] args) {
        int num = 17;
        if (num % 2 == 0) {
            System.out.println(num + " is even");
        } else {
            System.out.println(num + " is odd");
        }
    }
}`,
      solutionExplanation: "1. Declare and initialize num = 17.\n2. Check if num % 2 == 0 (remainder when divided by 2).\n3. If true, print 'even'.\n4. If false, print 'odd'.",
      sampleTestCases: [
        { input: "17", output: "17 is odd" },
        { input: "10", output: "10 is even" }
      ],
      estimatedTime: 180,
      marks: 3,
      tags: ["even-odd", "if-else", "modulus"]
    },
    {
      id: "CH04-PRQ-002",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else if",
      problemStatement: "Write a Java program to calculate the grade based on marks using the if-else if ladder:\n- 90 and above: A\n- 80 to 89: B\n- 70 to 79: C\n- 60 to 69: D\n- Below 60: F\nTest with marks = 85.",
      input: "No input required (marks = 85).",
      output: "Marks: 85\nGrade: B",
      constraints: "Use if-else if ladder. Marks are out of 100.",
      logic: "Check conditions from highest to lowest. The first true condition determines the grade.",
      solution: `public class GradeCalculator {
    public static void main(String[] args) {
        int marks = 85;
        char grade;
        
        if (marks >= 90) {\n            grade = 'A';\n        } else if (marks >= 80) {\n            grade = 'B';\n        } else if (marks >= 70) {\n            grade = 'C';\n        } else if (marks >= 60) {\n            grade = 'D';\n        } else {\n            grade = 'F';\n        }\n        \n        System.out.println("Marks: " + marks);\n        System.out.println("Grade: " + grade);\n    }\n}`,
      solutionExplanation: "1. Check marks >= 90 first (highest grade).\n2. If false, check marks >= 80, then 70, then 60.\n3. If none match, assign 'F'.\n4. The order matters — check from highest to lowest.",
      sampleTestCases: [
        { input: "85", output: "Marks: 85\nGrade: B" },
        { input: "92", output: "Marks: 92\nGrade: A" },
        { input: "45", output: "Marks: 45\nGrade: F" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["grade", "else-if ladder", "marks"]
    },
    {
      id: "CH04-PRQ-003",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      problemStatement: "Write a Java program using a switch statement that takes a number (1-7) and prints the corresponding day of the week. 1 = Monday, 2 = Tuesday, ..., 7 = Sunday. Test with day = 5.",
      input: "No input required (day = 5).",
      output: "Day 5: Friday",
      constraints: "Use a switch statement. Include a default case for invalid input.",
      logic: "Match the day number to the corresponding case and print the day name.",
      solution: `public class DayOfWeek {
    public static void main(String[] args) {
        int day = 5;
        String dayName;
        
        switch (day) {
            case 1: dayName = "Monday"; break;
            case 2: dayName = "Tuesday"; break;
            case 3: dayName = "Wednesday"; break;
            case 4: dayName = "Thursday"; break;
            case 5: dayName = "Friday"; break;
            case 6: dayName = "Saturday"; break;
            case 7: dayName = "Sunday"; break;
            default: dayName = "Invalid day";\n        }\n        \n        System.out.println("Day " + day + ": " + dayName);\n    }\n}`,
      solutionExplanation: "1. The switch expression (day) is evaluated.\n2. Execution jumps to the matching case.\n3. Each case assigns the day name and breaks out.\n4. If no case matches, default executes.\n5. The result is printed.",
      sampleTestCases: [
        { input: "5", output: "Day 5: Friday" },
        { input: "1", output: "Day 1: Monday" },
        { input: "8", output: "Day 8: Invalid day" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["switch", "days of week", "case"]
    }
  ],

  debuggingQuestions: [
    {
      id: "CH04-DBG-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "The following code intends to print 'Adult' if age >= 18. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int age = 20;\n        if (age >= 18); {\n            System.out.println(\"Adult\");\n        }\n    }\n}",
      correctAnswer: "Remove the semicolon after the if condition: if (age >= 18)",
      explanation: "The semicolon after the if condition terminates the if statement. The block { ... } is then treated as a regular block that always executes, regardless of the condition.",
      hint: "What does a semicolon do after a condition?",
      estimatedTime: 15,
      marks: 2,
      tags: ["debugging", "semicolon", "if"]
    },
    {
      id: "CH04-DBG-002",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "The following code intends to print the correct month name. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int month = 2;\n        switch (month) {\n            case 1: System.out.println(\"January\");\n            case 2: System.out.println(\"February\");\n            case 3: System.out.println(\"March\");\n        }\n    }\n}",
      correctAnswer: "Add break statements after each case to prevent fall-through.",
      explanation: "Without break, case 2 prints 'February', then falls through to case 3 and prints 'March'. Add 'break;' after each println to exit the switch.",
      hint: "What happens when a case doesn't have a break?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "switch", "fall-through", "break"]
    },
    {
      id: "CH04-DBG-003",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "The following code intends to check if a number is between 10 and 20 (inclusive). Identify and fix the logical error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int num = 25;\n        if (num >= 10) {\n            if (num <= 20) {\n                System.out.println(\"Between 10 and 20\");\n            }\n        } else {\n            System.out.println(\"Not between 10 and 20\");\n        }\n    }\n}",
      correctAnswer: "The else belongs to the inner if (num <= 20), not the outer if. For num = 25, the outer if is true, inner if is false, but the else doesn't execute because it's attached to the inner if. Fix: use proper braces or combine conditions with &&.",
      explanation: "The else is attached to the nearest if (num <= 20). When num = 25, outer if is true, inner if is false — but there's no else for the inner if, so nothing prints. Fix: if (num >= 10 && num <= 20) { ... } else { ... }",
      hint: "Which if does the else belong to?",
      estimatedTime: 30,
      marks: 3,
      tags: ["debugging", "dangling else", "range check"]
    }
  ],

  caseBasedQuestions: [
    {
      id: "CH04-CBQ-001",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else if",
      question: "A courier company charges based on package weight:\n- Up to 1 kg: Rs. 50\n- 1 to 5 kg: Rs. 100\n- 5 to 10 kg: Rs. 200\n- Above 10 kg: Rs. 500\n\nPriya wants to ship a package weighing 7 kg.\n\na) Write an if-else if ladder to calculate the shipping charge.\nb) What will be the charge for 7 kg?\nc) If the weight is 0.5 kg, what will be the charge?\nd) What happens if the weight is negative? How would you handle this?",
      correctAnswer: "a) if (weight <= 1) charge = 50; else if (weight <= 5) charge = 100; else if (weight <= 10) charge = 200; else charge = 500;\nb) Rs. 200 (since 7 kg falls in the 5-10 kg range).\nc) Rs. 50 (since 0.5 kg is up to 1 kg).\nd) Negative weight is invalid. Add a check: if (weight < 0) { System.out.println(\"Invalid weight\"); }",
      explanation: "The if-else if ladder checks conditions in order. For 7 kg: weight <= 1 is false, weight <= 5 is false, weight <= 10 is true, so charge = 200.",
      hint: "Check each condition in order from smallest to largest range.",
      estimatedTime: 60,
      marks: 5,
      tags: ["else-if ladder", "real-world", "shipping"]
    },
    {
      id: "CH04-CBQ-002",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "A school has the following rules for student promotion:\n- Must have attendance >= 75%\n- Must have average marks >= 40\n- If average marks >= 60, student gets a 'Merit' certificate\n- If average marks >= 40 but < 60, student is 'Pass'\n- If average marks < 40, student is 'Fail'\n\nStudent: Attendance = 80%, Marks = 72, 65, 58 (three subjects).\n\na) Write nested if-else logic to determine the result.\nb) What is the result for this student?\nc) If attendance was 70%, what would be the result?\nd) How would you modify the code to also check if any individual subject mark is below 35 (fail in that subject)?",
      correctAnswer: "a) if (attendance >= 75) { calculate average; if (avg >= 60) print 'Merit'; else if (avg >= 40) print 'Pass'; else print 'Fail'; } else { print 'Not eligible'; }\nb) Average = (72+65+58)/3 = 65. Attendance >= 75. 65 >= 60, so 'Merit'.\nc) If attendance = 70%, the outer if fails, so 'Not eligible'.\nd) Add: if (marks1 < 35 || marks2 < 35 || marks3 < 35) { print 'Fail in subject'; }",
      explanation: "Nested if allows checking primary condition (attendance) first, then secondary conditions (marks). The outer if acts as a gatekeeper.",
      hint: "What condition must be checked first — attendance or marks?",
      estimatedTime: 75,
      marks: 5,
      tags: ["nested if", "promotion", "real-world"]
    }
  ],

  vivaQuestions: [
    {
      id: "CH04-VIV-001",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "if-else",
      question: "What is the difference between if and if-else statements?",
      sampleAnswer: "An if statement executes a block only when the condition is true. If the condition is false, nothing happens. An if-else statement provides two paths: one block executes if the condition is true, and a different block executes if the condition is false.",
      estimatedTime: 20,
      marks: 2,
      tags: ["if", "if-else", "difference"]
    },
    {
      id: "CH04-VIV-002",
      difficulty: "easy",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "When would you use a switch statement instead of an if-else ladder?",
      sampleAnswer: "Switch is preferred when checking a single variable against multiple discrete, exact values (like menu options, day numbers, or character choices). It's more readable and often more efficient than a long if-else if ladder. However, switch cannot handle range conditions (like marks > 50) — for ranges, if-else if is better.",
      estimatedTime: 25,
      marks: 2,
      tags: ["switch", "if-else", "comparison"]
    },
    {
      id: "CH04-VIV-003",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Nested if",
      question: "What is a nested if statement? Give an example where it is useful.",
      sampleAnswer: "A nested if is an if statement inside another if statement. It's useful when you need to check a secondary condition only after a primary condition is met. Example: Checking if a person is eligible to vote — first check if age >= 18, then check if they are registered. The second check only matters if the first is true.",
      estimatedTime: 25,
      marks: 2,
      tags: ["nested if", "example"]
    },
    {
      id: "CH04-VIV-004",
      difficulty: "medium",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Switch",
      question: "What is fall-through in a switch statement? How can it be useful?",
      sampleAnswer: "Fall-through occurs when a case doesn't have a break statement, causing execution to continue into the next case. It can be useful when multiple cases should execute the same code. For example: case 'A': case 'B': case 'C': System.out.println(\"Pass\"); break; — all three grades produce the same output without duplicating code.",
      estimatedTime: 25,
      marks: 2,
      tags: ["fall-through", "switch", "intentional"]
    },
    {
      id: "CH04-VIV-005",
      difficulty: "hard",
      chapter: "Conditional Constructs",
      chapterId: 4,
      topic: "Ternary",
      question: "What is the ternary operator? How does it compare to if-else?",
      sampleAnswer: "The ternary operator (? :) is a shorthand for simple if-else. Syntax: condition ? value_if_true : value_if_false. It's an expression that returns a value, so it can be used inside assignments, print statements, etc. Example: int max = (a > b) ? a : b; It's more concise than if-else but should only be used for simple conditions — complex logic should use if-else for readability.",
      estimatedTime: 25,
      marks: 3,
      tags: ["ternary", "if-else", "comparison"]
    }
  ]
};

export default chapter4;