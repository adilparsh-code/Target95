const chapter3 = {
  id: 3,
  title: "Operators",
  slug: "operators",
  description: "Master Java operators including arithmetic, relational, logical, and bitwise operators.",
  topics: ["Arithmetic Operators", "Relational Operators", "Logical Operators", "Bitwise Operators", "Assignment Operators", "Ternary Operator", "Operator Precedence"],

  mcqs: [
    {
      id: "CH03-MCQ-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Arithmetic Operators",
      question: "What will be the result of the expression 15 % 4?",
      options: [
        "A) 3",
        "B) 4",
        "C) 2",
        "D) 1"
      ],
      correctAnswer: "A",
      explanation: "The modulus operator (%) returns the remainder of division. 15 / 4 = 3 with remainder 3.",
      hint: "The % operator gives remainder, not quotient.",
      estimatedTime: 15,
      marks: 1,
      tags: ["modulus", "remainder", "arithmetic"]
    },
    {
      id: "CH03-MCQ-002",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Relational Operators",
      question: "Which operator is used to check if two values are equal in Java?",
      options: [
        "A) =",
        "B) ==",
        "C) .equals()",
        "D) !="
      ],
      correctAnswer: "B",
      explanation: "== is the equality operator for primitives and reference comparison. = is assignment. .equals() compares object content.",
      hint: "It's two equal signs, not one.",
      estimatedTime: 15,
      marks: 1,
      tags: ["equality operator", "comparison", "=="]
    },
    {
      id: "CH03-MCQ-003",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Logical Operators",
      question: "What will be the result of: true && false?",
      options: [
        "A) true",
        "B) false",
        "C) 0",
        "D) 1"
      ],
      correctAnswer: "B",
      explanation: "The logical AND (&&) operator returns true only if both operands are true. Since false is one operand, the result is false.",
      hint: "Both conditions must be true for && to return true.",
      estimatedTime: 10,
      marks: 1,
      tags: ["logical AND", "boolean", "truth table"]
    },
    {
      id: "CH03-MCQ-004",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Unary Operators",
      question: "What is the value of x after executing: int x = 5; int y = x++;?",
      options: [
        "A) x = 5, y = 5",
        "B) x = 6, y = 5",
        "C) x = 6, y = 6",
        "D) x = 5, y = 6"
      ],
      correctAnswer: "B",
      explanation: "x++ is post-increment. It first assigns the current value of x (5) to y, then increments x to 6.",
      hint: "Post-increment uses the value first, then increments.",
      estimatedTime: 25,
      marks: 1,
      tags: ["post-increment", "unary", "assignment"]
    },
    {
      id: "CH03-MCQ-005",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Unary Operators",
      question: "What is the value of y after executing: int x = 5; int y = ++x;?",
      options: [
        "A) 5",
        "B) 6",
        "C) 7",
        "D) 4"
      ],
      correctAnswer: "B",
      explanation: "++x is pre-increment. It first increments x to 6, then assigns the new value (6) to y.",
      hint: "Pre-increment increments first, then assigns.",
      estimatedTime: 20,
      marks: 1,
      tags: ["pre-increment", "unary"]
    },
    {
      id: "CH03-MCQ-006",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Ternary Operator",
      question: "What will be the output of: int a = 10; int b = 20; int result = (a > b) ? a : b; System.out.println(result);",
      options: [
        "A) 10",
        "B) 20",
        "C) true",
        "D) false"
      ],
      correctAnswer: "B",
      explanation: "The ternary operator evaluates the condition (a > b). Since 10 > 20 is false, the expression returns the value after colon, which is b = 20.",
      hint: "The ternary returns the first value if true, second if false.",
      estimatedTime: 20,
      marks: 1,
      tags: ["ternary", "conditional operator"]
    },
    {
      id: "CH03-MCQ-007",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Bitwise Operators",
      question: "What will be the result of the expression: 5 & 3?",
      options: [
        "A) 7",
        "B) 1",
        "C) 6",
        "D) 0"
      ],
      correctAnswer: "B",
      explanation: "Bitwise AND: 5 = 101, 3 = 011. 101 & 011 = 001 = 1.",
      hint: "Convert to binary and apply AND bit by bit.",
      estimatedTime: 30,
      marks: 2,
      tags: ["bitwise AND", "binary"]
    },
    {
      id: "CH03-MCQ-008",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Shift Operators",
      question: "What will be the result of: 8 >> 2?",
      options: [
        "A) 16",
        "B) 4",
        "C) 2",
        "D) 32"
      ],
      correctAnswer: "C",
      explanation: "Right shift (>>) divides by 2 for each shift. 8 >> 2 = 8 / (2^2) = 8 / 4 = 2. Binary: 1000 >> 2 = 0010 = 2.",
      hint: "Right shifting by n is equivalent to dividing by 2^n.",
      estimatedTime: 25,
      marks: 2,
      tags: ["right shift", "bitwise", "division"]
    }
  ],

  assertionReasons: [
    {
      id: "CH03-AR-001",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Logical Operators",
      question: "Assertion (A): The expression (5 > 3) && (10 < 20) evaluates to true.\nReason (R): The && operator returns true only when both conditions are true.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "5 > 3 is true and 10 < 20 is true. Since && requires both operands to be true, the result is true.",
      hint: "Check each condition separately, then apply the AND rule.",
      estimatedTime: 20,
      marks: 2,
      tags: ["logical AND", "compound condition"]
    },
    {
      id: "CH03-AR-002",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Short-circuit",
      question: "Assertion (A): In the expression (false && someMethod()), the someMethod() is not called.\nReason (R): The && operator short-circuits — if the left operand is false, the right operand is not evaluated.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Short-circuit evaluation: with &&, if the left operand is false, the result is false regardless of the right operand, so Java skips evaluating the right operand for efficiency.",
      hint: "In false && anything, does Java bother checking the second condition?",
      estimatedTime: 30,
      marks: 2,
      tags: ["short-circuit", "evaluation", "&&"]
    },
    {
      id: "CH03-AR-003",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Operator Precedence",
      question: "Assertion (A): The expression 5 + 3 * 2 evaluates to 16.\nReason (R): Multiplication has higher precedence than addition in Java.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "D",
      explanation: "A is false because 5 + 3 * 2 = 5 + 6 = 11 (not 16). R is true — multiplication has higher precedence than addition.",
      hint: "Apply operator precedence rules: which operation comes first?",
      estimatedTime: 20,
      marks: 2,
      tags: ["precedence", "BODMAS", "arithmetic"]
    },
    {
      id: "CH03-AR-004",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Assignment",
      question: "Assertion (A): The expression a += 5 is equivalent to a = a + 5.\nReason (R): The += operator is a compound assignment operator that adds the right operand to the left operand and assigns the result.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Compound assignment operators like +=, -=, *=, etc. combine an operation with assignment. a += 5 is shorthand for a = a + 5.",
      hint: "Compound operators are shorthand forms.",
      estimatedTime: 15,
      marks: 2,
      tags: ["compound assignment", "+=", "shorthand"]
    }
  ],

  trueFalse: [
    {
      id: "CH03-TF-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Arithmetic Operators",
      question: "The expression 10 / 4 in Java gives 2.5.",
      correctAnswer: "False",
      explanation: "Since both 10 and 4 are integers, integer division is performed, giving 2 (truncated). To get 2.5, at least one operand must be a floating-point type.",
      hint: "What type of division occurs when both operands are integers?",
      estimatedTime: 15,
      marks: 1,
      tags: ["integer division", "truncation"]
    },
    {
      id: "CH03-TF-002",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Assignment",
      question: "In Java, the = operator is used for assignment, not equality checking.",
      correctAnswer: "True",
      explanation: "= is the assignment operator that assigns the right value to the left variable. == is used for equality comparison.",
      hint: "One equals sign does something different from two equals signs.",
      estimatedTime: 10,
      marks: 1,
      tags: ["assignment", "equality"]
    },
    {
      id: "CH03-TF-003",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Logical Operators",
      question: "The || operator returns true only if both operands are true.",
      correctAnswer: "False",
      explanation: "The || (logical OR) operator returns true if at least one operand is true. It returns false only when both operands are false.",
      hint: "How many operands need to be true for OR to return true?",
      estimatedTime: 10,
      marks: 1,
      tags: ["logical OR", "||"]
    },
    {
      id: "CH03-TF-004",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Ternary Operator",
      question: "The ternary operator (? :) can only be used with numeric values.",
      correctAnswer: "False",
      explanation: "The ternary operator can return any data type — numbers, strings, booleans, etc. For example: String result = (age >= 18) ? \"Adult\" : \"Minor\";",
      hint: "What data types can the ternary operator return?",
      estimatedTime: 15,
      marks: 1,
      tags: ["ternary", "data types"]
    },
    {
      id: "CH03-TF-005",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Bitwise Operators",
      question: "The expression 4 << 1 is equal to 8.",
      correctAnswer: "True",
      explanation: "Left shift (<<) multiplies by 2 for each shift. 4 << 1 = 4 * 2^1 = 8. Binary: 0100 << 1 = 1000 = 8.",
      hint: "Left shifting by 1 is the same as multiplying by 2.",
      estimatedTime: 20,
      marks: 1,
      tags: ["left shift", "bitwise", "multiplication"]
    }
  ],

  fillBlanks: [
    {
      id: "CH03-FIB-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Arithmetic Operators",
      question: "The ________ operator in Java returns the remainder of a division operation.",
      correctAnswer: "modulus (%)",
      explanation: "The modulus operator (%) returns the remainder after division. For example, 7 % 3 = 1.",
      hint: "It is often called the 'remainder' operator.",
      estimatedTime: 10,
      marks: 1,
      tags: ["modulus", "remainder"]
    },
    {
      id: "CH03-FIB-002",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Unary Operators",
      question: "The operator that increases a variable's value by 1 is called the ________ operator.",
      correctAnswer: "increment (++)",
      explanation: "The increment operator (++) adds 1 to its operand. It can be used in prefix (++x) or postfix (x++) form.",
      hint: "It's represented by two plus signs.",
      estimatedTime: 10,
      marks: 1,
      tags: ["increment", "unary"]
    },
    {
      id: "CH03-FIB-003",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Logical Operators",
      question: "The ________ operator is used to reverse the logical state of a boolean value.",
      correctAnswer: "logical NOT (!)",
      explanation: "The ! operator negates a boolean value: !true = false and !false = true.",
      hint: "It's a single symbol that means 'not'.",
      estimatedTime: 10,
      marks: 1,
      tags: ["NOT", "negation", "!"]
    },
    {
      id: "CH03-FIB-004",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Short-circuit",
      question: "The feature where Java stops evaluating a logical expression once the result is determined is called ________ evaluation.",
      correctAnswer: "short-circuit",
      explanation: "Short-circuit evaluation stops evaluating remaining operands once the result is guaranteed. Example: In false && anything, Java doesn't evaluate 'anything'.",
      hint: "It means taking a shortcut in evaluation.",
      estimatedTime: 20,
      marks: 1,
      tags: ["short-circuit", "lazy evaluation"]
    },
    {
      id: "CH03-FIB-005",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Instanceof",
      question: "The ________ operator is used to check whether an object is an instance of a specific class.",
      correctAnswer: "instanceof",
      explanation: "instanceof returns true if the object is an instance of the specified class (or any subclass/implementing class). Example: \"Hello\" instanceof String returns true.",
      hint: "It's a single word — used for type checking at runtime.",
      estimatedTime: 20,
      marks: 1,
      tags: ["instanceof", "type checking"]
    }
  ],

  outputQuestions: [
    {
      id: "CH03-OUT-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Arithmetic",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 3;\n        System.out.println(\"Quotient: \" + (a / b));\n        System.out.println(\"Remainder: \" + (a % b));\n    }\n}",
      correctAnswer: "Quotient: 3\nRemainder: 1",
      explanation: "10 / 3 = 3 (integer division truncates). 10 % 3 = 1 (remainder).",
      hint: "One operator gives quotient, the other gives remainder.",
      estimatedTime: 20,
      marks: 2,
      tags: ["division", "modulus"]
    },
    {
      id: "CH03-OUT-002",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Logical Operators",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 5, y = 10;\n        boolean result = (x < y) && (y > 15);\n        System.out.println(result);\n    }\n}",
      correctAnswer: "false",
      explanation: "x < y is true (5 < 10), but y > 15 is false (10 > 15 is false). true && false = false.",
      hint: "Evaluate each condition separately, then apply AND.",
      estimatedTime: 20,
      marks: 2,
      tags: ["logical AND", "boolean"]
    },
    {
      id: "CH03-OUT-003",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Ternary",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int num = 7;\n        String result = (num % 2 == 0) ? \"Even\" : \"Odd\";\n        System.out.println(result);\n    }\n}",
      correctAnswer: "Odd",
      explanation: "7 % 2 = 1, so 7 % 2 == 0 is false. The ternary returns the second expression \"Odd\".",
      hint: "Is 7 divisible by 2?",
      estimatedTime: 20,
      marks: 2,
      tags: ["ternary", "even-odd"]
    },
    {
      id: "CH03-OUT-004",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Precedence",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 2 + 3 * 4 - 1;\n        System.out.println(a);\n    }\n}",
      correctAnswer: "13",
      explanation: "Operator precedence: * has highest. 3 * 4 = 12. Then left to right: 2 + 12 = 14, 14 - 1 = 13.",
      hint: "Multiplication has higher precedence than addition and subtraction.",
      estimatedTime: 25,
      marks: 2,
      tags: ["precedence", "BODMAS"]
    },
    {
      id: "CH03-OUT-005",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Compound Assignment",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 10;\n        x += 5;\n        x *= 2;\n        x -= 3;\n        System.out.println(x);\n    }\n}",
      correctAnswer: "27",
      explanation: "Start: x = 10. x += 5 => x = 15. x *= 2 => x = 30. x -= 3 => x = 27.",
      hint: "Apply each compound operation step by step.",
      estimatedTime: 25,
      marks: 2,
      tags: ["compound assignment", "shorthand"]
    }
  ],

  errorFinding: [
    {
      id: "CH03-ERR-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Assignment vs Equality",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 5;\n        if (a = 10) {\n            System.out.println(\"Equal\");\n        }\n    }\n}",
      correctAnswer: "Using = (assignment) instead of == (equality) in the if condition. a = 10 assigns 10 to a, not compares.",
      explanation: "In Java, = is assignment and returns the assigned value. Since a is int, a = 10 returns 10 (int), not a boolean. The if condition requires a boolean expression.",
      hint: "What is the difference between = and ==?",
      estimatedTime: 20,
      marks: 2,
      tags: ["assignment", "equality", "if condition"]
    },
    {
      id: "CH03-ERR-002",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Modulus",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        double d = 10.5 % 3;\n        System.out.println(d);\n    }\n}",
      correctAnswer: "No error. The modulus operator works with double as well.",
      explanation: "The % operator in Java works with both integer and floating-point types. 10.5 % 3 = 1.5. The code is valid and will compile and run.",
      hint: "Is there actually an error? Check if % works with doubles in Java.",
      estimatedTime: 15,
      marks: 1,
      tags: ["modulus", "double", "valid code"]
    },
    {
      id: "CH03-ERR-003",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Incompatible Types",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 5;\n        boolean b = (a > 3);\n        int c = a + b;\n        System.out.println(c);\n    }\n}",
      correctAnswer: "Cannot add int and boolean. a + b where b is boolean causes a compilation error.",
      explanation: "Java does not allow arithmetic operations on boolean values. boolean cannot be converted to int implicitly or explicitly.",
      hint: "What happens when you try to add an int and a boolean?",
      estimatedTime: 20,
      marks: 2,
      tags: ["type mismatch", "boolean", "arithmetic"]
    },
    {
      id: "CH03-ERR-004",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Bitwise",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = a << 2.5;\n        System.out.println(b);\n    }\n}",
      correctAnswer: "Shift operators require integer operands. 2.5 is a double, causing compilation error.",
      explanation: "The shift operators (<<, >>, >>>) require integer values on both sides. Using a floating-point value as the shift distance causes a compilation error.",
      hint: "What type of value can be on the right side of a shift operator?",
      estimatedTime: 20,
      marks: 2,
      tags: ["shift", "type error", "integer operand"]
    },
    {
      id: "CH03-ERR-005",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Short-circuit",
      question: "Find the logical error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 5;\n        if (x > 0 || x / 0 > 1) {\n            System.out.println(\"Safe\");\n        }\n    }\n}",
      correctAnswer: "No error. Due to short-circuit evaluation, x / 0 is never evaluated because x > 0 is true.",
      explanation: "In || (OR), if the left operand is true, the right operand is not evaluated. Since x > 0 is true, x / 0 is skipped, preventing division by zero.",
      hint: "Does Java evaluate the second condition if the first is true in OR?",
      estimatedTime: 25,
      marks: 3,
      tags: ["short-circuit", "division by zero", "logical OR"]
    }
  ],

  programmingQuestions: [
    {
      id: "CH03-PRQ-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Arithmetic",
      problemStatement: "Write a Java program to swap two numbers without using a third variable. Use arithmetic operators. Use a = 15 and b = 27.",
      input: "No input required (hardcoded values).",
      output: "Before swap: a = 15, b = 27\nAfter swap: a = 27, b = 15",
      constraints: "Do NOT use a third variable. Use only + and - operators.",
      logic: "Add both numbers, subtract alternately to get swapped values: a = a + b; b = a - b; a = a - b;",
      solution: `public class SwapWithoutTemp {
    public static void main(String[] args) {
        int a = 15, b = 27;
        System.out.println("Before swap: a = " + a + ", b = " + b);
        
        a = a + b;
        b = a - b;
        a = a - b;
        
        System.out.println("After swap: a = " + a + ", b = " + b);
    }
}`,
      solutionExplanation: "1. a = a + b => a = 15 + 27 = 42.\n2. b = a - b => b = 42 - 27 = 15 (now b has original a).\n3. a = a - b => a = 42 - 15 = 27 (now a has original b).",
      sampleTestCases: [
        { input: "No input", output: "Before swap: a = 15, b = 27\nAfter swap: a = 27, b = 15" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["swap", "arithmetic", "no temp variable"]
    },
    {
      id: "CH03-PRQ-002",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Ternary Operator",
      problemStatement: "Write a Java program to find the largest of three numbers using the ternary operator. Use a = 45, b = 78, c = 23.",
      input: "No input required (hardcoded values).",
      output: "The largest number is: 78",
      constraints: "Use the ternary operator (? :). Do NOT use if-else.",
      logic: "Use nested ternary: largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);",
      solution: `public class LargestOfThree {
    public static void main(String[] args) {
        int a = 45, b = 78, c = 23;
        int largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
        System.out.println("The largest number is: " + largest);
    }
}`,
      solutionExplanation: "1. First compare a and b.\n2. If a > b, then compare a with c — larger of the two is the answer.\n3. If b > a, then compare b with c — larger of the two is the answer.\n4. Display the result.",
      sampleTestCases: [
        { input: "45, 78, 23", output: "The largest number is: 78" },
        { input: "10, 20, 30", output: "The largest number is: 30" },
        { input: "50, 30, 40", output: "The largest number is: 50" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["ternary", "largest of three", "nested"]
    },
    {
      id: "CH03-PRQ-003",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Bitwise",
      problemStatement: "Write a Java program to check if a number is even or odd using the bitwise AND operator. Test with num = 15.",
      input: "No input required (num = 15).",
      output: "15 is odd",
      constraints: "Do NOT use the modulus operator (%). Use the bitwise AND operator (&).",
      logic: "A number is odd if its last bit (LSB) is 1. So, (num & 1) == 1 means the number is odd, otherwise even.",
      solution: `public class EvenOddBitwise {
    public static void main(String[] args) {
        int num = 15;
        if ((num & 1) == 1) {
            System.out.println(num + " is odd");
        } else {
            System.out.println(num + " is even");
        }
    }
}`,
      solutionExplanation: "1. In binary, even numbers end with 0, odd numbers end with 1.\n2. num & 1 gives 1 if LSB is 1 (odd), 0 if LSB is 0 (even).\n3. 15 in binary is 1111. 1111 & 0001 = 0001 = 1, so 15 is odd.",
      sampleTestCases: [
        { input: "15", output: "15 is odd" },
        { input: "10", output: "10 is even (if num=10)" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["bitwise", "even-odd", "AND"]
    }
  ],

  debuggingQuestions: [
    {
      id: "CH03-DBG-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Modulus",
      question: "The following code checks if a number is divisible by 5. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int num = 15;\n        if (num / 5 == 0) {\n            System.out.println(\"Divisible by 5\");\n        }\n    }\n}",
      correctAnswer: "Use the modulus operator instead of division: if (num % 5 == 0)",
      explanation: "num / 5 gives the quotient (3), not the remainder. To check divisibility, use % operator which gives the remainder. If remainder is 0, the number is divisible.",
      hint: "Which operator gives the remainder of division?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "modulus", "divisibility"]
    },
    {
      id: "CH03-DBG-002",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Pre-increment",
      question: "The following code intends to increment x before printing. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 5;\n        System.out.println(x++);\n    }\n}",
      correctAnswer: "Use pre-increment (++x) instead of post-increment (x++) if the intent is to print the incremented value: System.out.println(++x);",
      explanation: "x++ (post-increment) prints 5 first, then increments to 6. ++x (pre-increment) increments first to 6, then prints 6.",
      hint: "Which version of increment changes the value before using it?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "pre-increment", "post-increment"]
    },
    {
      id: "CH03-DBG-003",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Operator Precedence",
      question: "The following code intends to calculate the average of three numbers. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 10, b = 20, c = 30;\n        double avg = a + b + c / 3;\n        System.out.println(avg);\n    }\n}",
      correctAnswer: "Add parentheses: double avg = (a + b + c) / 3.0;",
      explanation: "Without parentheses, c / 3 is evaluated first due to precedence, giving 10. Then a + b + 10 = 40. With parentheses, sum is computed first (60), then divided by 3.0 = 20.0.",
      hint: "Which operator has higher precedence — + or /?",
      estimatedTime: 25,
      marks: 3,
      tags: ["debugging", "precedence", "average"]
    }
  ],

  caseBasedQuestions: [
    {
      id: "CH03-CBQ-001",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Logical Operators",
      question: "A school has the following rules for awarding a scholarship:\n- Student must have marks >= 90 in at least one subject.\n- Student must NOT have any marks below 40.\n- Student must have attendance >= 75%.\n\nStudent details: Math = 95, Science = 38, English = 82, Attendance = 80%.\n\na) Write a Java expression using logical operators to determine if the student qualifies.\nb) What is the result? Does the student qualify?\nc) If the school changes the rule to 'marks >= 90 in at least one subject OR attendance >= 90%', how would the expression change?",
      correctAnswer: "a) (math >= 90 || science >= 90 || english >= 90) && (math >= 40 && science >= 40 && english >= 40) && attendance >= 75\nb) false. The student does NOT qualify because Science = 38 is below 40.\nc) ((math >= 90 || science >= 90 || english >= 90) || attendance >= 90) && (math >= 40 && science >= 40 && english >= 40)",
      explanation: "The student meets the marks >= 90 condition (Math = 95) and attendance (80 >= 75), but fails the 'no marks below 40' rule (Science = 38). All conditions must be true with AND (&&).",
      hint: "Evaluate each condition separately first.",
      estimatedTime: 60,
      marks: 5,
      tags: ["logical operators", "compound conditions", "real-world"]
    },
    {
      id: "CH03-CBQ-002",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Operator Precedence",
      question: "Ravi wrote the following code to calculate his total bill:\n\nint pizza = 250;\nint burger = 120;\nint drinks = 80;\nint discount = 50;\nint total = pizza + burger + drinks - discount * 2;\nSystem.out.println(\"Total: \" + total);\n\na) What value will be printed? Show your calculation.\nb) Ravi expected (250 + 120 + 80 - 50) * 2 = 800. What is wrong with his code?\nc) Rewrite the expression correctly using parentheses.\nd) Explain why Ravi's version and the corrected version give different results.",
      correctAnswer: "a) 450. Calculation: discount * 2 = 100. Then 250 + 120 + 80 - 100 = 450.\nb) Multiplication (*) has higher precedence than addition (+) and subtraction (-), so discount * 2 is evaluated first.\nc) int total = (pizza + burger + drinks - discount) * 2;\nd) Without parentheses, discount * 2 is computed first (100), then the rest. With parentheses, the sum is computed first (400), then multiplied by 2 (800).",
      explanation: "Operator precedence: * and / have higher precedence than + and -. Parentheses override the default precedence. Ravi forgot that * would be evaluated before - and +.",
      hint: "What is the order of evaluation of +, -, and *?",
      estimatedTime: 50,
      marks: 4,
      tags: ["precedence", "parentheses", "real-world calculation"]
    }
  ],

  vivaQuestions: [
    {
      id: "CH03-VIV-001",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Arithmetic Operators",
      question: "What are the different arithmetic operators in Java?",
      sampleAnswer: "The arithmetic operators in Java are: + (addition), - (subtraction), * (multiplication), / (division), and % (modulus/remainder). These work on numeric primitive types (int, long, float, double, byte, short).",
      estimatedTime: 20,
      marks: 2,
      tags: ["arithmetic operators"]
    },
    {
      id: "CH03-VIV-002",
      difficulty: "easy",
      chapter: "Operators",
      chapterId: 3,
      topic: "Relational Operators",
      question: "List all the relational operators in Java and explain what they do.",
      sampleAnswer: "Relational operators compare two values and return a boolean result:\n== (equal to), != (not equal to), > (greater than), < (less than), >= (greater than or equal to), <= (less than or equal to).",
      estimatedTime: 20,
      marks: 2,
      tags: ["relational operators", "comparison"]
    },
    {
      id: "CH03-VIV-003",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Logical Operators",
      question: "What is the difference between && and & in Java?",
      sampleAnswer: "&& is the short-circuit logical AND, while & is the bitwise AND operator. With &&, if the left operand is false, the right operand is NOT evaluated (short-circuit). With &, both operands are always evaluated. Also, && works only with boolean operands, while & works with both boolean and integer types.",
      estimatedTime: 30,
      marks: 2,
      tags: ["short-circuit", "bitwise AND", "logical AND"]
    },
    {
      id: "CH03-VIV-004",
      difficulty: "medium",
      chapter: "Operators",
      chapterId: 3,
      topic: "Ternary",
      question: "What is the ternary operator? Give an example.",
      sampleAnswer: "The ternary operator (? :) is a shorthand for if-else. Syntax: condition ? expression1 : expression2. If condition is true, expression1 is returned; otherwise expression2 is returned. Example: String result = (marks >= 40) ? \"Pass\" : \"Fail\";",
      estimatedTime: 20,
      marks: 2,
      tags: ["ternary", "conditional operator"]
    },
    {
      id: "CH03-VIV-005",
      difficulty: "hard",
      chapter: "Operators",
      chapterId: 3,
      topic: "Precedence",
      question: "Explain operator precedence in Java. Why is it important?",
      sampleAnswer: "Operator precedence determines the order in which operators are evaluated in an expression. For example, * and / have higher precedence than + and -. So 2 + 3 * 4 = 14 (not 20). It's important because incorrect assumptions about precedence lead to bugs. When in doubt, use parentheses () to make the evaluation order explicit.",
      estimatedTime: 30,
      marks: 3,
      tags: ["precedence", "evaluation order"]
    }
  ]
};

export default chapter3;