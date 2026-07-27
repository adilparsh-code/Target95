const chapter5 = {
  id: 5,
  title: "Looping Constructs",
  slug: "loops",
  description: "Master loops in Java — for, while, do-while, and nested loops with real-world examples.",
  topics: ["For Loop", "While Loop", "Do-While Loop", "Nested Loops", "Loop Control", "Infinite Loops"],

  mcqs: [
    {
      id: "CH05-MCQ-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "How many times will the following loop execute?\n\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}",
      options: [
        "A) 4 times",
        "B) 5 times",
        "C) 6 times",
        "D) Infinite times"
      ],
      correctAnswer: "B",
      explanation: "The loop runs while i < 5. i starts at 0 and goes up to 4 (5 iterations: 0, 1, 2, 3, 4). When i becomes 5, the condition i < 5 is false.",
      hint: "Count from 0 to 4 — how many numbers is that?",
      estimatedTime: 15,
      marks: 1,
      tags: ["for loop", "iteration", "counter"]
    },
    {
      id: "CH05-MCQ-002",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "While Loop",
      question: "What will be the output?\n\nint i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
      options: [
        "A) 1 2 3",
        "B) 1 2 3 4",
        "C) 0 1 2 3",
        "D) 1 2"
      ],
      correctAnswer: "A",
      explanation: "The loop prints i and increments it while i <= 3. i = 1: print 1, i=2. i=2: print 2, i=3. i=3: print 3, i=4. i=4: condition 4 <= 3 is false, loop ends.",
      hint: "Trace the values of i from start to end.",
      estimatedTime: 20,
      marks: 1,
      tags: ["while loop", "iteration"]
    },
    {
      id: "CH05-MCQ-003",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Do-While Loop",
      question: "What is the key difference between a while loop and a do-while loop?",
      options: [
        "A) while loop is faster",
        "B) do-while executes at least once, while may execute zero times",
        "C) while loop can only count upward",
        "D) There is no difference"
      ],
      correctAnswer: "B",
      explanation: "A do-while loop checks the condition AFTER executing the body, so it always executes at least once. A while loop checks the condition BEFORE execution, so it may execute zero times if the condition is initially false.",
      hint: "Which one checks the condition before vs after the body?",
      estimatedTime: 20,
      marks: 1,
      tags: ["while", "do-while", "comparison"]
    },
    {
      id: "CH05-MCQ-004",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "What will be the output?\n\nint sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    sum += i;\n}\nSystem.out.println(sum);",
      options: [
        "A) 4",
        "B) 10",
        "C) 16",
        "D) 24"
      ],
      correctAnswer: "B",
      explanation: "The loop adds i to sum for i = 1, 2, 3, 4. sum = 0 + 1 + 2 + 3 + 4 = 10.",
      hint: "Add 1 + 2 + 3 + 4.",
      estimatedTime: 20,
      marks: 1,
      tags: ["for loop", "sum", "accumulation"]
    },
    {
      id: "CH05-MCQ-005",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "How many times will 'Hello' be printed?\n\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) {\n        System.out.println(\"Hello\");\n    }\n}",
      options: [
        "A) 3",
        "B) 5",
        "C) 6",
        "D) 9"
      ],
      correctAnswer: "C",
      explanation: "The outer loop runs 3 times (i = 0, 1, 2). For each outer iteration, the inner loop runs 2 times (j = 0, 1). Total = 3 × 2 = 6 iterations.",
      hint: "Multiply the number of outer iterations by inner iterations.",
      estimatedTime: 25,
      marks: 1,
      tags: ["nested loops", "iteration count"]
    },
    {
      id: "CH05-MCQ-006",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Loop Control",
      question: "What will be the output?\n\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) {\n        break;\n    }\n    System.out.print(i + \" \");\n}",
      options: [
        "A) 1 2 3",
        "B) 1 2",
        "C) 1 2 3 4 5",
        "D) 1 2 4 5"
      ],
      correctAnswer: "B",
      explanation: "When i = 3, the break statement executes, immediately terminating the loop. So only 1 and 2 are printed.",
      hint: "What does break do inside a loop?",
      estimatedTime: 20,
      marks: 1,
      tags: ["break", "loop control"]
    },
    {
      id: "CH05-MCQ-007",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Loop Control",
      question: "What will be the output?\n\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) {\n        continue;\n    }\n    System.out.print(i + \" \");\n}",
      options: [
        "A) 1 2 3",
        "B) 1 2",
        "C) 1 2 4 5",
        "D) 1 2 3 4 5"
      ],
      correctAnswer: "C",
      explanation: "When i = 3, the continue statement skips the rest of the current iteration and moves to i = 4. So 3 is not printed, but 1, 2, 4, 5 are printed.",
      hint: "What does continue do inside a loop?",
      estimatedTime: 20,
      marks: 1,
      tags: ["continue", "loop control", "skip"]
    },
    {
      id: "CH05-MCQ-008",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Infinite Loops",
      question: "Which of the following creates an infinite loop?",
      options: [
        "A) for (int i = 0; i < 10; i++)",
        "B) while (true)",
        "C) for (int i = 10; i > 0; i--)",
        "D) do { i++; } while (i < 10);"
      ],
      correctAnswer: "B",
      explanation: "while (true) creates an infinite loop because the condition is always true. It will run forever unless a break statement is used inside.",
      hint: "Which condition can never become false?",
      estimatedTime: 15,
      marks: 1,
      tags: ["infinite loop", "while true"]
    }
  ],

  assertionReasons: [
    {
      id: "CH05-AR-001",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Do-While",
      question: "Assertion (A): A do-while loop will always execute at least once.\nReason (R): In a do-while loop, the condition is checked after executing the loop body.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "The do-while loop executes the body first, then checks the condition. This guarantees at least one execution regardless of the condition.",
      hint: "What is the order of execution and condition check in do-while?",
      estimatedTime: 20,
      marks: 2,
      tags: ["do-while", "execution guarantee"]
    },
    {
      id: "CH05-AR-002",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "Assertion (A): The initialization part of a for loop is executed only once.\nReason (R): The initialization, condition, and update expressions in a for loop have specific execution order.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "B",
      explanation: "Both statements are true, but R does not explain A. The initialization runs once because that's how the for loop is designed — it runs before the first iteration. The execution order is: init → condition → body → update → condition → body → update...",
      hint: "Think about the sequence of events in a for loop.",
      estimatedTime: 25,
      marks: 2,
      tags: ["for loop", "initialization", "execution order"]
    },
    {
      id: "CH05-AR-003",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Break vs Continue",
      question: "Assertion (A): The break statement terminates the entire loop immediately.\nReason (R): The continue statement skips the current iteration and moves to the next iteration.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "B",
      explanation: "Both statements are true but they describe different concepts. Break exits the loop entirely, while continue only skips the rest of the current iteration. They are different control statements.",
      hint: "Do break and continue do the same thing?",
      estimatedTime: 20,
      marks: 2,
      tags: ["break", "continue", "comparison"]
    },
    {
      id: "CH05-AR-004",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "While Loop",
      question: "Assertion (A): A while loop may execute zero times.\nReason (R): The condition in a while loop is checked before the body executes.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Since the condition is checked first, if it's initially false, the body never executes. For example: while (false) { ... } executes zero times.",
      hint: "What happens if the while condition is false from the start?",
      estimatedTime: 15,
      marks: 2,
      tags: ["while", "zero execution", "pre-check"]
    }
  ],

  trueFalse: [
    {
      id: "CH05-TF-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "The three parts of a for loop (initialization, condition, update) are all optional.",
      correctAnswer: "True",
      explanation: "All three parts are optional. For example: for (;;) is an infinite loop. You can omit any or all parts, but the semicolons are required.",
      hint: "Can you write a for loop without the initialization part?",
      estimatedTime: 20,
      marks: 1,
      tags: ["for loop", "optional parts", "syntax"]
    },
    {
      id: "CH05-TF-002",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Do-While",
      question: "A do-while loop ends with a semicolon.",
      correctAnswer: "True",
      explanation: "The do-while loop syntax requires a semicolon after the while condition: do { ... } while (condition);",
      hint: "Look at the syntax of do-while — what comes at the end?",
      estimatedTime: 10,
      marks: 1,
      tags: ["do-while", "syntax", "semicolon"]
    },
    {
      id: "CH05-TF-003",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "In nested loops, the inner loop completes all its iterations for each iteration of the outer loop.",
      correctAnswer: "True",
      explanation: "For each iteration of the outer loop, the inner loop runs completely from start to finish. This is why total iterations = outer × inner.",
      hint: "Does the inner loop restart each time the outer loop iterates?",
      estimatedTime: 15,
      marks: 1,
      tags: ["nested loops", "execution pattern"]
    },
    {
      id: "CH05-TF-004",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Loop Control",
      question: "The break statement can only be used inside loops.",
      correctAnswer: "False",
      explanation: "break can be used inside loops (for, while, do-while) AND inside switch statements. In both cases, it terminates the enclosing block.",
      hint: "Where else can break be used besides loops?",
      estimatedTime: 15,
      marks: 1,
      tags: ["break", "switch", "usage"]
    },
    {
      id: "CH05-TF-005",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Infinite Loops",
      question: "An infinite loop always causes a program to crash.",
      correctAnswer: "False",
      explanation: "An infinite loop does not necessarily crash a program. It will run forever unless interrupted, but the program may still respond to external events. However, it's usually a logical error that makes the program unresponsive.",
      hint: "Does an infinite loop always cause an error or crash?",
      estimatedTime: 15,
      marks: 1,
      tags: ["infinite loop", "behavior"]
    }
  ],

  fillBlanks: [
    {
      id: "CH05-FIB-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "The three parts of a for loop are initialization, ________, and update.",
      correctAnswer: "condition",
      explanation: "The for loop syntax is: for (initialization; condition; update). The condition is checked before each iteration.",
      hint: "It determines whether the loop continues or stops.",
      estimatedTime: 10,
      marks: 1,
      tags: ["for loop", "parts"]
    },
    {
      id: "CH05-FIB-002",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "While Loop",
      question: "A ________ loop checks the condition before executing the loop body.",
      correctAnswer: "while",
      explanation: "The while loop is a pre-test loop — it checks the condition first. If the condition is false initially, the body never executes.",
      hint: "It's the loop that may execute zero times.",
      estimatedTime: 10,
      marks: 1,
      tags: ["while", "pre-test"]
    },
    {
      id: "CH05-FIB-003",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Loop Control",
      question: "The ________ statement is used to skip the current iteration and move to the next iteration of a loop.",
      correctAnswer: "continue",
      explanation: "continue skips the remaining code in the current iteration and jumps to the next iteration (update and condition check).",
      hint: "It 'continues' with the next iteration.",
      estimatedTime: 10,
      marks: 1,
      tags: ["continue", "skip"]
    },
    {
      id: "CH05-FIB-004",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "A loop inside another loop is called a ________ loop.",
      correctAnswer: "nested",
      explanation: "Nested loops are loops placed inside other loops. The inner loop completes all its iterations for each iteration of the outer loop.",
      hint: "It means 'one inside another'.",
      estimatedTime: 10,
      marks: 1,
      tags: ["nested", "inner loop"]
    },
    {
      id: "CH05-FIB-005",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Loop Control",
      question: "A loop that never terminates is called an ________ loop.",
      correctAnswer: "infinite",
      explanation: "An infinite loop runs forever because its termination condition is never met. Common causes: missing update, wrong condition, or while (true).",
      hint: "It has no end.",
      estimatedTime: 10,
      marks: 1,
      tags: ["infinite", "endless"]
    }
  ],

  outputQuestions: [
    {
      id: "CH05-OUT-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            System.out.print(i + \" \");\n        }\n    }\n}",
      correctAnswer: "1 2 3",
      explanation: "The loop runs for i = 1, 2, 3. Each value is printed followed by a space.",
      hint: "Trace i from 1 to 3.",
      estimatedTime: 15,
      marks: 1,
      tags: ["for loop", "output"]
    },
    {
      id: "CH05-OUT-002",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "While Loop",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int i = 5;\n        while (i > 0) {\n            System.out.print(i + \" \");\n            i -= 2;\n        }\n    }\n}",
      correctAnswer: "5 3 1",
      explanation: "i starts at 5. Loop: print 5, i=3. Print 3, i=1. Print 1, i=-1. Condition -1 > 0 is false, loop ends.",
      hint: "Decrease i by 2 each time and check if it's still positive.",
      estimatedTime: 25,
      marks: 2,
      tags: ["while loop", "decrement"]
    },
    {
      id: "CH05-OUT-003",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Do-While",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int i = 1;\n        do {\n            System.out.print(i + \" \");\n            i++;\n        } while (i <= 0);\n    }\n}",
      correctAnswer: "1",
      explanation: "The do-while executes the body first: print 1, i=2. Then checks condition: 2 <= 0 is false. So the loop executes only once, printing 1.",
      hint: "Does the do-while execute at least once even if the condition is false?",
      estimatedTime: 20,
      marks: 2,
      tags: ["do-while", "one execution"]
    },
    {
      id: "CH05-OUT-004",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(\"*\");\n            }\n            System.out.println();\n        }\n    }\n}",
      correctAnswer: "*\n**\n***",
      explanation: "i=1: inner loop runs 1 time (j=1), prints 1 star. i=2: inner loop runs 2 times (j=1,2), prints 2 stars. i=3: inner loop runs 3 times, prints 3 stars.",
      hint: "The inner loop runs i times for each outer iteration.",
      estimatedTime: 30,
      marks: 3,
      tags: ["nested loops", "pattern", "star"]
    },
    {
      id: "CH05-OUT-005",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Break",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 10; i++) {\n            if (sum > 10) {\n                break;\n            }\n            sum += i;\n        }\n        System.out.println(sum);\n    }\n}",
      correctAnswer: "15",
      explanation: "i=1: sum=1. i=2: sum=3. i=3: sum=6. i=4: sum=10. i=5: sum=15, then check sum > 10 (15 > 10) is true, break. Final sum = 15.",
      hint: "Add numbers until the sum exceeds 10, then stop.",
      estimatedTime: 30,
      marks: 3,
      tags: ["break", "sum", "conditional exit"]
    }
  ],

  errorFinding: [
    {
      id: "CH05-ERR-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++)\n            System.out.println(\"Hello\");\n            System.out.println(\"World\");\n    }\n}",
      correctAnswer: "Without braces, only the first println is part of the loop. 'World' prints only once after the loop ends.",
      explanation: "Without braces, only the first statement after the for loop is considered the loop body. The second println is outside the loop and executes once. Use braces to include both statements in the loop.",
      hint: "How many statements are controlled by the for loop without braces?",
      estimatedTime: 15,
      marks: 1,
      tags: ["for loop", "braces", "block"]
    },
    {
      id: "CH05-ERR-002",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Infinite Loop",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 5) {\n            System.out.println(i);\n        }\n    }\n}",
      correctAnswer: "Missing increment statement. i never changes, so the condition i <= 5 is always true, creating an infinite loop.",
      explanation: "The loop body doesn't modify i. Since i starts at 1 and never changes, i <= 5 is always true. Add i++; inside the loop.",
      hint: "Does the value of i ever change inside the loop?",
      estimatedTime: 15,
      marks: 1,
      tags: ["infinite loop", "missing increment"]
    },
    {
      id: "CH05-ERR-003",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Off-by-One",
      question: "Find the logical error in the following Java code (intended to print numbers 1 to 10):\n\npublic class Test {\n    public static void main(String[] args) {\n        for (int i = 1; i < 10; i++) {\n            System.out.println(i);\n        }\n    }\n}",
      correctAnswer: "The condition should be i <= 10, not i < 10. Currently it prints 1 to 9, missing 10.",
      explanation: "i < 10 means the loop runs while i is 1 through 9. To include 10, use i <= 10. This is a common off-by-one error.",
      hint: "What values of i satisfy i < 10? Does it include 10?",
      estimatedTime: 15,
      marks: 2,
      tags: ["off-by-one", "logical error", "boundary"]
    },
    {
      id: "CH05-ERR-004",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Do-While",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int i = 0;\n        do {\n            System.out.println(i);\n            i++;\n        } while (i < 5)\n    }\n}",
      correctAnswer: "Missing semicolon after the while condition. The do-while loop requires a semicolon at the end.",
      explanation: "The do-while loop syntax is: do { ... } while (condition); The semicolon after the while condition is mandatory.",
      hint: "What punctuation is required at the end of a do-while loop?",
      estimatedTime: 15,
      marks: 1,
      tags: ["do-while", "semicolon", "syntax"]
    },
    {
      id: "CH05-ERR-005",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "Find the logical error in the following Java code (intended to print a 3x3 grid of numbers):\n\npublic class Test {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            for (int j = 1; j <= 3; j++) {\n                System.out.print(i + \" \");\n            }\n            System.out.println();\n        }\n    }\n}",
      correctAnswer: "The inner loop prints i instead of j. It will print the same number (1, 2, 3) in each row instead of different numbers. Change i to j in the print statement.",
      explanation: "The code prints i (the row number) three times per row. To print a grid with different values, use j: System.out.print(j + \" \"); This would print: 1 2 3 / 1 2 3 / 1 2 3.",
      hint: "Which variable represents the column position — i or j?",
      estimatedTime: 20,
      marks: 2,
      tags: ["nested loops", "logical error", "i vs j"]
    }
  ],

  programmingQuestions: [
    {
      id: "CH05-PRQ-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      problemStatement: "Write a Java program to calculate the sum of all even numbers from 1 to 20 using a for loop.",
      input: "No input required.",
      output: "Sum of even numbers from 1 to 20: 110",
      constraints: "Use a for loop. Only add even numbers.",
      logic: "Loop from 1 to 20. Check if each number is even (i % 2 == 0). If yes, add to sum.",
      solution: `public class SumEvenNumbers {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 20; i++) {
            if (i % 2 == 0) {
                sum += i;
            }
        }
        System.out.println("Sum of even numbers from 1 to 20: " + sum);
    }
}`,
      solutionExplanation: "1. Initialize sum = 0.\n2. Loop i from 1 to 20.\n3. Check if i is even using i % 2 == 0.\n4. If even, add i to sum.\n5. After loop, print the sum. (2+4+6+...+20 = 110)",
      sampleTestCases: [
        { input: "No input", output: "Sum of even numbers from 1 to 20: 110" }
      ],
      estimatedTime: 240,
      marks: 4,
      tags: ["for loop", "even numbers", "sum"]
    },
    {
      id: "CH05-PRQ-002",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "While Loop",
      problemStatement: "Write a Java program to find the factorial of a number using a while loop. Test with n = 6.",
      input: "No input required (n = 6).",
      output: "Factorial of 6 is: 720",
      constraints: "Use a while loop. n is a positive integer.",
      logic: "Factorial of n = n × (n-1) × (n-2) × ... × 1. Multiply numbers from n down to 1.",
      solution: `public class Factorial {
    public static void main(String[] args) {
        int n = 6;
        int fact = 1;
        int i = 1;
        while (i <= n) {
            fact *= i;
            i++;
        }
        System.out.println("Factorial of " + n + " is: " + fact);
    }
}`,
      solutionExplanation: "1. Initialize fact = 1, i = 1.\n2. While i <= n, multiply fact by i and increment i.\n3. fact = 1×1×2×3×4×5×6 = 720.\n4. Print the result.",
      sampleTestCases: [
        { input: "6", output: "Factorial of 6 is: 720" },
        { input: "5", output: "Factorial of 5 is: 120" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["while loop", "factorial", "multiplication"]
    },
    {
      id: "CH05-PRQ-003",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      problemStatement: "Write a Java program to print the following pattern using nested loops:\n\n1\n12\n123\n1234\n12345",
      input: "No input required.",
      output: "1\n12\n123\n1234\n12345",
      constraints: "Use nested for loops. The pattern has 5 rows.",
      logic: "Outer loop controls rows (1 to 5). Inner loop prints numbers from 1 to the current row number.",
      solution: `public class NumberPattern {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
      solutionExplanation: "1. Outer loop i runs from 1 to 5 (rows).\n2. Inner loop j runs from 1 to i (columns).\n3. Print j without newline.\n4. After inner loop, print newline to move to next row.\n5. Row 1: 1, Row 2: 12, Row 3: 123, etc.",
      sampleTestCases: [
        { input: "No input", output: "1\n12\n123\n1234\n12345" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["nested loops", "pattern", "number pattern"]
    }
  ],

  debuggingQuestions: [
    {
      id: "CH05-DBG-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "The following code intends to print numbers from 1 to 5. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i--)\n            System.out.println(i);\n    }\n}",
      correctAnswer: "Change i-- to i++. The loop is decrementing instead of incrementing, creating an infinite loop (or running in the wrong direction).",
      explanation: "i-- decreases i, so i will never reach 5 (it goes 1, 0, -1, ...). The condition i <= 5 remains true forever. Change to i++ to count upward.",
      hint: "Is the loop variable moving toward or away from the termination condition?",
      estimatedTime: 15,
      marks: 2,
      tags: ["debugging", "increment", "infinite loop"]
    },
    {
      id: "CH05-DBG-002",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "While Loop",
      question: "The following code intends to calculate the sum of numbers from 1 to 5. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int sum = 0;\n        int i = 1;\n        while (i <= 5) {\n            sum += i;\n        }\n        System.out.println(sum);\n    }\n}",
      correctAnswer: "Add i++; inside the while loop to increment i. Without it, i always equals 1, creating an infinite loop.",
      explanation: "The loop body doesn't change i, so i <= 5 is always true. Add i++; after sum += i; to make the loop progress toward termination.",
      hint: "Does the value of i ever change inside the loop?",
      estimatedTime: 15,
      marks: 2,
      tags: ["debugging", "while loop", "infinite loop"]
    },
    {
      id: "CH05-DBG-003",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "The following code intends to print a 3x3 multiplication table. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            for (int j = 1; j <= 3; j++) {\n                System.out.print(i * j + \" \");\n            }\n            System.out.println();\n        }\n    }\n}",
      correctAnswer: "There is no error. The code correctly prints a 3x3 multiplication table:\n1 2 3\n2 4 6\n3 6 9",
      explanation: "The nested loops correctly multiply i (row) by j (column). For i=1: 1×1=1, 1×2=2, 1×3=3. For i=2: 2×1=2, 2×2=4, 2×3=6. For i=3: 3×1=3, 3×2=6, 3×3=9.",
      hint: "Is there actually an error? Check the output carefully.",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "nested loops", "multiplication table"]
    }
  ],

  caseBasedQuestions: [
    {
      id: "CH05-CBQ-001",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "A teacher wants to calculate the average marks of 10 students. She writes the following code:\n\nint sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum += marks;\n}\ndouble avg = sum / 10;\n\na) What is wrong with this code?\nb) How should she fix it?\nc) If the marks are: 85, 90, 78, 92, 88, 76, 95, 89, 84, 91, what should the average be?\nd) Why should avg be double instead of int?",
      correctAnswer: "a) The variable 'marks' is not defined or initialized. She needs an array or user input to store individual marks.\nb) Use an array: int[] marks = {85, 90, 78, ...}; and access marks[i-1] inside the loop.\nc) Sum = 868, Average = 868/10 = 86.8.\nd) int would truncate the decimal part. double preserves precision.",
      explanation: "The code references 'marks' without declaring it. For multiple values, use an array. Also, sum/10 performs integer division — use sum/10.0 for precise average.",
      hint: "Where does the value of 'marks' come from in the loop?",
      estimatedTime: 60,
      marks: 5,
      tags: ["for loop", "average", "array", "integer division"]
    },
    {
      id: "CH05-CBQ-002",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "Rohan is creating a seating arrangement for his classroom. There are 4 rows and 5 columns. He wants to assign seat numbers starting from 1.\n\na) Write nested loops to print the seating arrangement.\nb) What will be the output for row 3, column 2?\nc) If he wants even-numbered seats on the left and odd on the right, how would he modify the code?\nd) Write the code to calculate the total number of seats.",
      correctAnswer: "a) for (int row = 1; row <= 4; row++) { for (int col = 1; col <= 5; col++) { int seat = (row-1)*5 + col; System.out.print(seat + \" \"); } System.out.println(); }\nb) Row 3, Column 2: (3-1)*5 + 2 = 10 + 2 = 12.\nc) if (seat % 2 == 0) print on left side; else print on right side.\nd) Total seats = rows × columns = 4 × 5 = 20.",
      explanation: "The formula (row-1)*columns + col converts 2D coordinates to a 1D seat number. Row 1: 1-5, Row 2: 6-10, Row 3: 11-15, Row 4: 16-20.",
      hint: "How do you convert row and column numbers to a sequential seat number?",
      estimatedTime: 75,
      marks: 5,
      tags: ["nested loops", "seating", "2D to 1D"]
    }
  ],

  vivaQuestions: [
    {
      id: "CH05-VIV-001",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "For Loop",
      question: "What are the three types of loops in Java? Explain each briefly.",
      sampleAnswer: "1. For loop: Used when the number of iterations is known. Syntax: for (init; condition; update) { body }.\n2. While loop: Used when the number of iterations is unknown but depends on a condition. Checks condition before execution.\n3. Do-while loop: Similar to while but checks condition after execution, guaranteeing at least one execution.",
      estimatedTime: 25,
      marks: 2,
      tags: ["loop types", "for", "while", "do-while"]
    },
    {
      id: "CH05-VIV-002",
      difficulty: "easy",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Loop Control",
      question: "What is the difference between break and continue?",
      sampleAnswer: "break immediately terminates the entire loop, and execution continues with the statement after the loop. continue skips the rest of the current iteration and moves to the next iteration (update and condition check). break exits the loop; continue skips one iteration.",
      estimatedTime: 20,
      marks: 2,
      tags: ["break", "continue", "difference"]
    },
    {
      id: "CH05-VIV-003",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Nested Loops",
      question: "What are nested loops? How do you calculate the total number of iterations?",
      sampleAnswer: "Nested loops are loops inside other loops. The inner loop completes all its iterations for each iteration of the outer loop. Total iterations = (outer loop count) × (inner loop count). For example, if outer runs 3 times and inner runs 4 times, total = 12 iterations.",
      estimatedTime: 20,
      marks: 2,
      tags: ["nested loops", "iteration count"]
    },
    {
      id: "CH05-VIV-004",
      difficulty: "medium",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Infinite Loops",
      question: "What is an infinite loop? How can you create one intentionally?",
      sampleAnswer: "An infinite loop is a loop that never terminates because the condition never becomes false. You can create one intentionally using: while (true) { ... } or for (;;) { ... }. These are useful in server programs, game loops, or event listeners that need to run continuously until explicitly stopped with a break statement.",
      estimatedTime: 20,
      marks: 2,
      tags: ["infinite loop", "while true"]
    },
    {
      id: "CH05-VIV-005",
      difficulty: "hard",
      chapter: "Looping Constructs",
      chapterId: 5,
      topic: "Comparison",
      question: "When would you choose a for loop over a while loop, and vice versa?",
      sampleAnswer: "Use a for loop when the number of iterations is known in advance, especially when iterating over a range (e.g., 1 to 10) or an array. The initialization, condition, and update are conveniently in one line. Use a while loop when the number of iterations depends on a dynamic condition that may change inside the loop (e.g., reading input until a sentinel value, or processing until a certain state is reached). While loops are more flexible for conditions that don't involve a simple counter.",
      estimatedTime: 30,
      marks: 3,
      tags: ["for vs while", "selection criteria"]
    }
  ]
};

export default chapter5;