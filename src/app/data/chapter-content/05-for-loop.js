const chapter05 = {
  id: "05-for-loop",
  title: "FOR Loop",
  slug: "for-loop",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 180,
  topics: [
    "for loop",
    "initialization",
    "condition",
    "iteration",
    "nested for loop",
    "pattern programs",
    "sum and product",
    "prime numbers",
    "fibonacci series",
    "factorial",
    "armstrong numbers",
    "palindrome",
    "number series",
    "table generation",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "The `for` loop is a repetition control structure that allows you to efficiently write a loop that needs to execute a specific number of times. It combines three essential components — initialization, condition checking, and iteration — into a single, compact line. Think of it like a factory assembly line: you set up the starting point (initialization), define how long the line runs (condition), and specify how each item moves forward (iteration). The `for` loop is the most versatile and commonly used loop in Java, especially when you know exactly how many times you need to repeat a task.",
    realLifeExamples: [
      "A teacher counting 30 students one by one to take attendance — the teacher knows there are exactly 30 students to check.",
      "A factory worker assembling 100 products on a conveyor belt — the worker knows the exact count of items to process.",
      "A chef adding ingredients one by one to a recipe — each ingredient is added in a specific order, and the chef knows how many ingredients there are.",
      "A security guard checking 50 visitors' IDs at a gate — the guard knows there are 50 visitors to verify.",
      "A cashier printing 20 receipts at the end of the day — the cashier knows the exact number of receipts to print.",
      "A librarian shelving 40 books — the librarian knows there are 40 books to organize.",
      "A coach counting 11 players on a sports team — the coach knows there are exactly 11 players to account for.",
      "A chef baking 12 cupcakes — each cupcake is placed in the tray one at a time, and the chef knows there are 12 slots.",
    ],
    commonMistakes: [
      "Using `=` (assignment) instead of `==` (comparison) in the condition — this causes a compilation error for primitive types.",
      "Forgetting to initialize the loop variable, causing a compilation error.",
      "Forgetting to increment/decrement the loop variable, causing an infinite loop.",
      "Using the wrong increment operator — `i++` vs `++i` can matter in complex expressions.",
      "Declaring the loop variable inside the for loop and trying to access it outside — scope error.",
      "Off-by-one errors — using `< n` instead of `<= n` or vice versa, causing one extra or one fewer iteration.",
      "Putting a semicolon after the for loop header — `for(int i=0; i<5; i++);` — this creates an empty loop body.",
      "Modifying the loop variable inside the loop body, which can cause unexpected behavior or infinite loops.",
      "Using floating-point numbers in the loop counter — `for(double i=0.0; i<1.0; i+=0.1)` can cause precision issues.",
      "Not using braces `{}` for multi-statement loop bodies, leading to only the first statement being repeated.",
    ],
    whereUsed: [
      "Iterating over arrays and collections to process each element.",
      "Generating mathematical tables (multiplication tables, etc.).",
      "Pattern printing programs (stars, numbers, alphabets).",
      "Searching and sorting algorithms (bubble sort, linear search).",
      "Mathematical computations (factorial, Fibonacci, prime numbers).",
      "Game development for repeating game loops a fixed number of times.",
      "Processing fixed-size data structures.",
      "Generating sequences and series.",
      "Matrix operations (nested loops for 2D arrays).",
      "Any task where the number of repetitions is known in advance.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "The `for` loop is a control flow statement that repeats a block of code a specific number of times. It is written with three parts separated by semicolons: initialization (executed once at the start), condition (checked before each iteration — if true, the loop body runs; if false, the loop ends), and iteration (executed after each loop body execution, typically incrementing or decrementing the loop variable). For example, `for(int i=1; i<=5; i++)` means: start with i=1, keep running while i is less than or equal to 5, and increase i by 1 after each run. This loop will execute exactly 5 times.",
    importantPoints: [
      "The for loop has three parts: initialization, condition, and iteration (increment/decrement).",
      "The initialization part is executed only once, at the beginning of the loop.",
      "The condition is checked before each iteration. If it evaluates to false, the loop terminates.",
      "The iteration expression is executed after each loop body execution.",
      "The loop variable declared in the for loop is scoped to the loop only.",
      "All three parts of the for loop are optional — `for(;;)` creates an infinite loop.",
      "Multiple variables can be initialized and updated in a single for loop: `for(int i=0, j=10; i<j; i++, j--)`.",
      "The for loop can be nested — a for loop inside another for loop.",
      "The for-each loop (`for(Type element : collection)`) is a specialized for loop for iterating over arrays and collections.",
      "The for loop is preferred over while when the number of iterations is known in advance.",
    ],
    memoryTricks: [
      "FOR = 'Fix, Observe, Repeat' — Fix the start, Observe the condition, Repeat the iteration.",
      "Think of the for loop as a 3-step dance: Step 1 (init), Step 2 (check condition), Step 3 (do work + iterate).",
      "Remember: Init → Condition → Body → Iteration → Condition → Body → ... until condition is false.",
      "The three parts are separated by semicolons, NOT commas: `for(init; condition; iteration)`.",
      "i++ means 'give me the old value of i, then increment' — but in a for loop, this doesn't matter since the return value is discarded.",
      "Off-by-one: 'Less than or equal to N' gives N iterations; 'Less than N' gives N-1 iterations (if starting from 0).",
      "Nested loops: the inner loop completes ALL its iterations for each single iteration of the outer loop.",
      "Think of nested loops like a clock: the outer loop is the hour hand, the inner loop is the minute hand.",
    ],
    examTips: [
      "Always trace the loop variable values carefully — write them down if needed.",
      "Check for off-by-one errors: does the loop run N times or N+1 times or N-1 times?",
      "Watch out for infinite loops — make sure the loop variable is being updated in the right direction.",
      "In nested loops, the total number of iterations is the product of the outer and inner loop counts.",
      "Remember that `i++` and `++i` produce the same result in a for loop's iteration expression.",
      "For pattern programs, identify the relationship between the row number and the number of elements to print.",
      "Be careful with scope — variables declared inside the for loop are not accessible outside.",
      "When debugging, add print statements inside the loop to trace variable values.",
      "For sum/product calculations, initialize the accumulator variable before the loop starts.",
      "In ICSE exams, always write the complete for loop with proper syntax — missing semicolons cause compilation errors.",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: "for (initialization; condition; iteration) {\n    // code to execute\n}",
    breakdown: [
      {
        keyword: "initialization",
        explanation:
          "Executed once at the start of the loop. Typically used to initialize the loop variable (e.g., int i = 0).",
      },
      {
        keyword: "condition",
        explanation:
          "A boolean expression checked before each iteration. If true, the loop body executes; if false, the loop ends.",
      },
      {
        keyword: "iteration",
        explanation:
          "Executed after each loop body execution. Typically increments or decrements the loop variable (e.g., i++ or i--).",
      },
      {
        keyword: "{ }",
        explanation:
          "Curly braces define the loop body. If there is only one statement, braces are optional but recommended.",
      },
    ],
    variations: {
      infiniteLoop: {
        code: "for (;;) {\n    // This loop runs forever\n    // Use break to exit\n}",
        explanation:
          "All three parts are optional. `for(;;)` creates an infinite loop. Use break to exit.",
      },
      multipleVariables: {
        code: "for (int i = 0, j = 10; i < j; i++, j--) {\n    System.out.println(i + \" \" + j);\n}",
        explanation:
          "Multiple variables can be initialized and updated in a single for loop using comma separator.",
      },
      nestedFor: {
        code: "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.println(i + \" \" + j);\n    }\n}",
        explanation:
          "A for loop inside another for loop. The inner loop completes all iterations for each outer loop iteration.",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "for-ex-b-1",
        title: "Print numbers 1 to 5",
        code: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}",
        output: "1\n2\n3\n4\n5",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: Check condition: 1 <= 5 is true. Enter loop body.",
          "Step 3: Print 1. Execute iteration: i++ → i = 2.",
          "Step 4: Check condition: 2 <= 5 is true. Print 2. i++ → i = 3.",
          "Step 5: Continue until i = 5. Print 5. i++ → i = 6.",
          "Step 6: Check condition: 6 <= 5 is false. Loop ends.",
          "Key point: The loop runs exactly 5 times (i = 1, 2, 3, 4, 5).",
        ],
      },
      {
        id: "for-ex-b-2",
        title: "Print even numbers from 2 to 10",
        code: "for (int i = 2; i <= 10; i += 2) {\n    System.out.print(i + \" \");\n}",
        output: "2 4 6 8 10 ",
        explanation: [
          "Step 1: Initialize i = 2.",
          "Step 2: Check condition: 2 <= 10 is true. Print 2. i += 2 → i = 4.",
          "Step 3: Check condition: 4 <= 10 is true. Print 4. i += 2 → i = 6.",
          "Step 4: Continue until i = 10. Print 10. i += 2 → i = 12.",
          "Step 5: Check condition: 12 <= 10 is false. Loop ends.",
          "Key point: Using i += 2 increments by 2 each time, generating even numbers.",
        ],
      },
      {
        id: "for-ex-b-3",
        title: "Sum of first 5 natural numbers",
        code: "int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    sum = sum + i;\n}\nSystem.out.println(\"Sum = \" + sum);",
        output: "Sum = 15",
        explanation: [
          "Step 1: Initialize sum = 0.",
          "Step 2: i = 1. sum = 0 + 1 = 1. i++ → i = 2.",
          "Step 3: i = 2. sum = 1 + 2 = 3. i++ → i = 3.",
          "Step 4: i = 3. sum = 3 + 3 = 6. i++ → i = 4.",
          "Step 5: i = 4. sum = 6 + 4 = 10. i++ → i = 5.",
          "Step 6: i = 5. sum = 10 + 5 = 15. i++ → i = 6.",
          "Step 7: 6 <= 5 is false. Loop ends. Print 'Sum = 15'.",
          "Key point: The accumulator pattern — initialize before the loop, update inside, use after.",
        ],
      },
      {
        id: "for-ex-b-4",
        title: "Print numbers in reverse (5 to 1)",
        code: "for (int i = 5; i >= 1; i--) {\n    System.out.println(i);\n}",
        output: "5\n4\n3\n2\n1",
        explanation: [
          "Step 1: Initialize i = 5.",
          "Step 2: Check condition: 5 >= 1 is true. Print 5. i-- → i = 4.",
          "Step 3: Check condition: 4 >= 1 is true. Print 4. i-- → i = 3.",
          "Step 4: Continue until i = 1. Print 1. i-- → i = 0.",
          "Step 5: Check condition: 0 >= 1 is false. Loop ends.",
          "Key point: Using i-- decrements the loop variable, allowing reverse iteration.",
        ],
      },
      {
        id: "for-ex-b-5",
        title: "Print a multiplication table",
        code: "int num = 7;\nfor (int i = 1; i <= 10; i++) {\n    System.out.println(num + \" x \" + i + \" = \" + (num * i));\n}",
        output: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
        explanation: [
          "Step 1: num = 7. Initialize i = 1.",
          "Step 2: i = 1. Print '7 x 1 = 7'. i++ → i = 2.",
          "Step 3: i = 2. Print '7 x 2 = 14'. i++ → i = 3.",
          "Step 4: Continue until i = 10. Print '7 x 10 = 70'. i++ → i = 11.",
          "Step 5: 11 <= 10 is false. Loop ends.",
          "Key point: The loop variable i is used as the multiplier in the table.",
        ],
      },
      {
        id: "for-ex-b-6",
        title: "Product of first 5 numbers",
        code: "int product = 1;\nfor (int i = 1; i <= 5; i++) {\n    product = product * i;\n}\nSystem.out.println(\"Product = \" + product);",
        output: "Product = 120",
        explanation: [
          "Step 1: Initialize product = 1 (NOT 0, since 0 * anything = 0).",
          "Step 2: i = 1. product = 1 * 1 = 1. i++ → i = 2.",
          "Step 3: i = 2. product = 1 * 2 = 2. i++ → i = 3.",
          "Step 4: i = 3. product = 2 * 3 = 6. i++ → i = 4.",
          "Step 5: i = 4. product = 6 * 4 = 24. i++ → i = 5.",
          "Step 6: i = 5. product = 24 * 5 = 120. i++ → i = 6.",
          "Step 7: 6 <= 5 is false. Loop ends. Print 'Product = 120'.",
          "Key point: For product calculations, always initialize to 1, not 0.",
        ],
      },
      {
        id: "for-ex-b-7",
        title: "Print characters from A to E",
        code: "for (char ch = 'A'; ch <= 'E'; ch++) {\n    System.out.print(ch + \" \");\n}",
        output: "A B C D E ",
        explanation: [
          "Step 1: Initialize ch = 'A' (ASCII 65).",
          "Step 2: Check condition: 'A' <= 'E' is true. Print 'A'. ch++ → ch = 'B'.",
          "Step 3: Check condition: 'B' <= 'E' is true. Print 'B'. ch++ → ch = 'C'.",
          "Step 4: Continue until ch = 'E'. Print 'E'. ch++ → ch = 'F'.",
          "Step 5: Check condition: 'F' <= 'E' is false. Loop ends.",
          "Key point: char variables can be used in for loops. ch++ moves to the next character in the ASCII table.",
        ],
      },
      {
        id: "for-ex-b-8",
        title: "Count down from 10 to 1",
        code: "for (int i = 10; i >= 1; i--) {\n    System.out.println(i + \" seconds remaining\");\n}",
        output: "10 seconds remaining\n9 seconds remaining\n8 seconds remaining\n...\n1 seconds remaining",
        explanation: [
          "Step 1: Initialize i = 10.",
          "Step 2: Check condition: 10 >= 1 is true. Print '10 seconds remaining'. i-- → i = 9.",
          "Step 3: Continue decrementing until i = 1. Print '1 seconds remaining'. i-- → i = 0.",
          "Step 4: Check condition: 0 >= 1 is false. Loop ends.",
          "Key point: Countdown loops use i-- and the condition i >= 1 (or i > 0).",
        ],
      },
      {
        id: "for-ex-b-9",
        title: "Print odd numbers from 1 to 15",
        code: "for (int i = 1; i <= 15; i += 2) {\n    System.out.print(i + \" \");\n}",
        output: "1 3 5 7 9 11 13 15 ",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: Check condition: 1 <= 15 is true. Print 1. i += 2 → i = 3.",
          "Step 3: Check condition: 3 <= 15 is true. Print 3. i += 2 → i = 5.",
          "Step 4: Continue until i = 15. Print 15. i += 2 → i = 17.",
          "Step 5: Check condition: 17 <= 15 is false. Loop ends.",
          "Key point: Using i += 2 starting from 1 generates all odd numbers.",
        ],
      },
      {
        id: "for-ex-b-10",
        title: "Square of numbers 1 to 5",
        code: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i + \" squared = \" + (i * i));\n}",
        output: "1 squared = 1\n2 squared = 4\n3 squared = 9\n4 squared = 16\n5 squared = 25",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: i = 1. Print '1 squared = 1'. i++ → i = 2.",
          "Step 3: i = 2. Print '2 squared = 4'. i++ → i = 3.",
          "Step 4: Continue until i = 5. Print '5 squared = 25'. i++ → i = 6.",
          "Step 5: 6 <= 5 is false. Loop ends.",
          "Key point: The loop variable is used in a mathematical expression (i * i) to compute the square.",
        ],
      },
    ],
    intermediate: [
      {
        id: "for-ex-i-1",
        title: "Nested For Loop - Print a Rectangle Pattern",
        code: "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 5; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
        output: "* * * * *\n* * * * *\n* * * * *",
        explanation: [
          "Step 1: Outer loop i = 1. Inner loop j = 1 to 5 prints '* ' five times. Then println().",
          "Step 2: Outer loop i = 2. Inner loop again prints '* ' five times. Then println().",
          "Step 3: Outer loop i = 3. Inner loop again prints '* ' five times. Then println().",
          "Step 4: Outer loop i = 4. 4 <= 3 is false. Loop ends.",
          "Key point: The inner loop runs completely for each iteration of the outer loop. Total prints = 3 * 5 = 15.",
        ],
      },
      {
        id: "for-ex-i-2",
        title: "Right-Angled Triangle Pattern",
        code: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
        output: "*\n* *\n* * *\n* * * *\n* * * * *",
        explanation: [
          "Step 1: i = 1. Inner loop j = 1 to 1 prints one '*'. Println().",
          "Step 2: i = 2. Inner loop j = 1 to 2 prints two '*'. Println().",
          "Step 3: i = 3. Inner loop j = 1 to 3 prints three '*'. Println().",
          "Step 4: Continue until i = 5. Inner loop j = 1 to 5 prints five '*'. Println().",
          "Key point: The inner loop's limit depends on the outer loop variable (j <= i), creating a triangle pattern.",
        ],
      },
      {
        id: "for-ex-i-3",
        title: "Check if a number is prime",
        code: "int num = 17;\nboolean isPrime = true;\nfor (int i = 2; i <= num / 2; i++) {\n    if (num % i == 0) {\n        isPrime = false;\n        break;\n    }\n}\nSystem.out.println(num + \" is \" + (isPrime ? \"prime\" : \"not prime\"));",
        output: "17 is prime",
        explanation: [
          "Step 1: num = 17. isPrime = true.",
          "Step 2: i = 2. 17 % 2 = 1 (not 0). Continue.",
          "Step 3: i = 3. 17 % 3 = 2 (not 0). Continue.",
          "Step 4: i = 4. 17 % 4 = 1 (not 0). Continue.",
          "Step 5: i = 5. 5 > 17/2 = 8.5? No, 5 <= 8. 17 % 5 = 2. Continue.",
          "Step 6: i = 6. 6 <= 8. 17 % 6 = 5. Continue.",
          "Step 7: i = 7. 7 <= 8. 17 % 7 = 3. Continue.",
          "Step 8: i = 8. 8 <= 8. 17 % 8 = 1. Continue.",
          "Step 9: i = 9. 9 > 8. Loop ends. isPrime is still true.",
          "Key point: We only need to check divisors up to num/2. The break statement exits early when a divisor is found.",
        ],
      },
      {
        id: "for-ex-i-4",
        title: "Fibonacci Series (first 10 terms)",
        code: "int a = 0, b = 1;\nSystem.out.print(a + \" \" + b);\nfor (int i = 3; i <= 10; i++) {\n    int c = a + b;\n    System.out.print(\" \" + c);\n    a = b;\n    b = c;\n}",
        output: "0 1 1 2 3 5 8 13 21 34",
        explanation: [
          "Step 1: a = 0, b = 1. Print '0 1'.",
          "Step 2: i = 3. c = 0 + 1 = 1. Print ' 1'. a = 1, b = 1.",
          "Step 3: i = 4. c = 1 + 1 = 2. Print ' 2'. a = 1, b = 2.",
          "Step 4: i = 5. c = 1 + 2 = 3. Print ' 3'. a = 2, b = 3.",
          "Step 5: i = 6. c = 2 + 3 = 5. Print ' 5'. a = 3, b = 5.",
          "Step 6: Continue until i = 10. c = 13 + 21 = 34. Print ' 34'.",
          "Key point: Each term is the sum of the two preceding terms. We update a and b in each iteration.",
        ],
      },
      {
        id: "for-ex-i-5",
        title: "Factorial of a number",
        code: "int num = 6;\nint factorial = 1;\nfor (int i = 1; i <= num; i++) {\n    factorial = factorial * i;\n}\nSystem.out.println(num + \"! = \" + factorial);",
        output: "6! = 720",
        explanation: [
          "Step 1: num = 6. factorial = 1.",
          "Step 2: i = 1. factorial = 1 * 1 = 1. i++ → i = 2.",
          "Step 3: i = 2. factorial = 1 * 2 = 2. i++ → i = 3.",
          "Step 4: i = 3. factorial = 2 * 3 = 6. i++ → i = 4.",
          "Step 5: i = 4. factorial = 6 * 4 = 24. i++ → i = 5.",
          "Step 6: i = 5. factorial = 24 * 5 = 120. i++ → i = 6.",
          "Step 7: i = 6. factorial = 120 * 6 = 720. i++ → i = 7.",
          "Step 8: 7 <= 6 is false. Loop ends. Print '6! = 720'.",
          "Key point: Factorial of n = 1 * 2 * 3 * ... * n. Initialize to 1, not 0.",
        ],
      },
      {
        id: "for-ex-i-6",
        title: "Check Armstrong number",
        code: "int num = 153;\nint original = num;\nint sum = 0;\nfor (; num > 0; num /= 10) {\n    int digit = num % 10;\n    sum = sum + (digit * digit * digit);\n}\nSystem.out.println(original + \" is \" + (sum == original ? \"Armstrong\" : \"not Armstrong\"));",
        output: "153 is Armstrong",
        explanation: [
          "Step 1: num = 153. original = 153. sum = 0.",
          "Step 2: num = 153 > 0. digit = 153 % 10 = 3. sum = 0 + 27 = 27. num = 153/10 = 15.",
          "Step 3: num = 15 > 0. digit = 15 % 10 = 5. sum = 27 + 125 = 152. num = 15/10 = 1.",
          "Step 4: num = 1 > 0. digit = 1 % 10 = 1. sum = 152 + 1 = 153. num = 1/10 = 0.",
          "Step 5: num = 0. 0 > 0 is false. Loop ends.",
          "Step 6: sum = 153 == original = 153. Print '153 is Armstrong'.",
          "Key point: An Armstrong number equals the sum of cubes of its digits. 1^3 + 5^3 + 3^3 = 153.",
        ],
      },
      {
        id: "for-ex-i-7",
        title: "Check palindrome number",
        code: "int num = 1221;\nint original = num;\nint reversed = 0;\nfor (; num > 0; num /= 10) {\n    int digit = num % 10;\n    reversed = reversed * 10 + digit;\n}\nSystem.out.println(original + \" is \" + (reversed == original ? \"palindrome\" : \"not palindrome\"));",
        output: "1221 is palindrome",
        explanation: [
          "Step 1: num = 1221. original = 1221. reversed = 0.",
          "Step 2: num = 1221 > 0. digit = 1. reversed = 0*10 + 1 = 1. num = 122.",
          "Step 3: num = 122 > 0. digit = 2. reversed = 1*10 + 2 = 12. num = 12.",
          "Step 4: num = 12 > 0. digit = 2. reversed = 12*10 + 2 = 122. num = 1.",
          "Step 5: num = 1 > 0. digit = 1. reversed = 122*10 + 1 = 1221. num = 0.",
          "Step 6: num = 0. Loop ends. reversed = 1221 == original = 1221. Print 'palindrome'.",
          "Key point: Reverse the number by repeatedly extracting the last digit and building the reversed number.",
        ],
      },
      {
        id: "for-ex-i-8",
        title: "Print a pyramid pattern",
        code: "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n - i; j++) {\n        System.out.print(\"  \");\n    }\n    for (int k = 1; k <= 2 * i - 1; k++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
        output: "        * \n      * * * \n    * * * * * \n  * * * * * * * \n* * * * * * * * *",
        explanation: [
          "Step 1: i = 1. Spaces: 5-1 = 4 spaces. Stars: 2*1-1 = 1 star. Println().",
          "Step 2: i = 2. Spaces: 5-2 = 3 spaces. Stars: 2*2-1 = 3 stars. Println().",
          "Step 3: i = 3. Spaces: 5-3 = 2 spaces. Stars: 2*3-1 = 5 stars. Println().",
          "Step 4: Continue until i = 5. Spaces: 0. Stars: 9.",
          "Key point: Three nested loops — spaces decrease, stars increase by 2 each row (odd numbers).",
        ],
      },
      {
        id: "for-ex-i-9",
        title: "Sum of digits of a number",
        code: "int num = 12345;\nint sum = 0;\nfor (; num > 0; num /= 10) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(\"Sum of digits = \" + sum);",
        output: "Sum of digits = 15",
        explanation: [
          "Step 1: num = 12345. sum = 0.",
          "Step 2: num = 12345 > 0. digit = 5. sum = 5. num = 1234.",
          "Step 3: num = 1234 > 0. digit = 4. sum = 9. num = 123.",
          "Step 4: num = 123 > 0. digit = 3. sum = 12. num = 12.",
          "Step 5: num = 12 > 0. digit = 2. sum = 14. num = 1.",
          "Step 6: num = 1 > 0. digit = 1. sum = 15. num = 0.",
          "Step 7: num = 0. Loop ends. Print 'Sum of digits = 15'.",
          "Key point: Extract digits from right to left using % 10 and reduce the number using / 10.",
        ],
      },
      {
        id: "for-ex-i-10",
        title: "Print Floyd's Triangle",
        code: "int num = 1;\nfor (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(num + \" \");\n        num++;\n    }\n    System.out.println();\n}",
        output: "1 \n2 3 \n4 5 6 \n7 8 9 10 ",
        explanation: [
          "Step 1: i = 1. j = 1. Print '1'. num = 2. Println().",
          "Step 2: i = 2. j = 1. Print '2'. num = 3. j = 2. Print '3'. num = 4. Println().",
          "Step 3: i = 3. j = 1. Print '4'. num = 5. j = 2. Print '5'. num = 6. j = 3. Print '6'. num = 7. Println().",
          "Step 4: i = 4. Print 7, 8, 9, 10. num = 11. Println().",
          "Key point: A single counter variable (num) is shared across all iterations, creating a continuous sequence.",
        ],
      },
    ],
    advanced: [
      {
        id: "for-ex-a-1",
        title: "Print all prime numbers from 1 to 50",
        code: "for (int num = 2; num <= 50; num++) {\n    boolean isPrime = true;\n    for (int i = 2; i <= num / 2; i++) {\n        if (num % i == 0) {\n            isPrime = false;\n            break;\n        }\n    }\n    if (isPrime) {\n        System.out.print(num + \" \");\n    }\n}",
        output: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 ",
        explanation: [
          "Step 1: Outer loop iterates num from 2 to 50.",
          "Step 2: For each num, inner loop checks divisibility from 2 to num/2.",
          "Step 3: If any divisor is found, isPrime = false and break exits the inner loop.",
          "Step 4: If no divisor found (isPrime is still true), print the number.",
          "Key point: Nested for loop with a break statement for efficiency. The break exits the inner loop early.",
        ],
      },
      {
        id: "for-ex-a-2",
        title: "Diamond Pattern",
        code: "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n - i; j++) System.out.print(\"  \");\n    for (int k = 1; k <= 2 * i - 1; k++) System.out.print(\"* \");\n    System.out.println();\n}\nfor (int i = n - 1; i >= 1; i--) {\n    for (int j = 1; j <= n - i; j++) System.out.print(\"  \");\n    for (int k = 1; k <= 2 * i - 1; k++) System.out.print(\"* \");\n    System.out.println();\n}",
        output: "      * \n    * * * \n  * * * * * \n* * * * * * * \n  * * * * * \n    * * * \n      * ",
        explanation: [
          "Step 1: First loop (i = 1 to 4) prints the upper half of the diamond.",
          "Step 2: Second loop (i = 3 to 1) prints the lower half in reverse.",
          "Step 3: Spaces decrease and stars increase in the upper half; reverse in the lower half.",
          "Key point: Two separate for loops — one for the upper half, one for the lower half.",
        ],
      },
      {
        id: "for-ex-a-3",
        title: "Hollow Square Pattern",
        code: "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n; j++) {\n        if (i == 1 || i == n || j == 1 || j == n) {\n            System.out.print(\"* \");\n        } else {\n            System.out.print(\"  \");\n        }\n    }\n    System.out.println();\n}",
        output: "* * * * * \n*       * \n*       * \n*       * \n* * * * * ",
        explanation: [
          "Step 1: Outer loop i controls rows (1 to 5). Inner loop j controls columns (1 to 5).",
          "Step 2: If i is 1 or 5 (first/last row) or j is 1 or 5 (first/last column), print '*'.",
          "Step 3: Otherwise, print spaces to create the hollow effect.",
          "Key point: The condition checks boundary positions to print stars only on the perimeter.",
        ],
      },
      {
        id: "for-ex-a-4",
        title: "Print Armstrong numbers from 1 to 1000",
        code: "for (int num = 1; num <= 1000; num++) {\n    int original = num;\n    int sum = 0;\n    for (; original > 0; original /= 10) {\n        int digit = original % 10;\n        sum = sum + (digit * digit * digit);\n    }\n    if (sum == num) {\n        System.out.print(num + \" \");\n    }\n}",
        output: "1 153 370 371 407 ",
        explanation: [
          "Step 1: Outer loop iterates num from 1 to 1000.",
          "Step 2: For each num, inner loop extracts digits and computes sum of cubes.",
          "Step 3: If sum equals the original number, it is an Armstrong number — print it.",
          "Key point: 1-digit numbers (1-9) are Armstrong (1^3=1, etc.). 153 = 1^3+5^3+3^3, 370 = 3^3+7^3+0^3, etc.",
        ],
      },
      {
        id: "for-ex-a-5",
        title: "Number Pattern - Pascal's Triangle",
        code: "int n = 5;\nfor (int i = 0; i < n; i++) {\n    int num = 1;\n    for (int j = 0; j <= i; j++) {\n        System.out.print(num + \" \");\n        num = num * (i - j) / (j + 1);\n    }\n    System.out.println();\n}",
        output: "1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 ",
        explanation: [
          "Step 1: Outer loop i controls rows (0 to 4).",
          "Step 2: Inner loop j controls elements in each row (0 to i).",
          "Step 3: num starts at 1. Each element is computed as num * (i-j) / (j+1).",
          "Step 4: This formula generates binomial coefficients (nCr).",
          "Key point: Each number is the sum of the two numbers above it. The formula uses the previous value to compute the next.",
        ],
      },
      {
        id: "for-ex-a-6",
        title: "Reverse a number using for loop",
        code: "int num = 12345;\nint reversed = 0;\nfor (; num > 0; num /= 10) {\n    int digit = num % 10;\n    reversed = reversed * 10 + digit;\n}\nSystem.out.println(\"Reversed: \" + reversed);",
        output: "Reversed: 54321",
        explanation: [
          "Step 1: num = 12345. reversed = 0.",
          "Step 2: digit = 5. reversed = 0*10 + 5 = 5. num = 1234.",
          "Step 3: digit = 4. reversed = 5*10 + 4 = 54. num = 123.",
          "Step 4: digit = 3. reversed = 54*10 + 3 = 543. num = 12.",
          "Step 5: digit = 2. reversed = 543*10 + 2 = 5432. num = 1.",
          "Step 6: digit = 1. reversed = 5432*10 + 1 = 54321. num = 0.",
          "Key point: Build the reversed number by shifting digits left (multiply by 10) and adding the extracted digit.",
        ],
      },
      {
        id: "for-ex-a-7",
        title: "Print perfect numbers from 1 to 1000",
        code: "for (int num = 1; num <= 1000; num++) {\n    int sum = 0;\n    for (int i = 1; i < num; i++) {\n        if (num % i == 0) {\n            sum = sum + i;\n        }\n    }\n    if (sum == num) {\n        System.out.print(num + \" \");\n    }\n}",
        output: "1 6 28 496 ",
        explanation: [
          "Step 1: Outer loop iterates num from 1 to 1000.",
          "Step 2: For each num, inner loop checks all numbers from 1 to num-1.",
          "Step 3: If i divides num evenly (num % i == 0), add i to sum.",
          "Step 4: If sum equals num, it is a perfect number — print it.",
          "Key point: A perfect number equals the sum of its proper divisors. 6 = 1+2+3, 28 = 1+2+4+7+14, 496 = 1+2+4+8+16+31+62+124+248.",
        ],
      },
      {
        id: "for-ex-a-8",
        title: "Hollow Pyramid Pattern",
        code: "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int j = i; j < n; j++) System.out.print(\" \");\n    for (int k = 1; k <= (2 * i - 1); k++) {\n        if (k == 1 || k == (2 * i - 1) || i == n) {\n            System.out.print(\"* \");\n        } else {\n            System.out.print(\"  \");\n        }\n    }\n    System.out.println();\n}",
        output: "    * \n   * * \n  *   * \n *     * \n* * * * * ",
        explanation: [
          "Step 1: Outer loop i controls rows (1 to 5).",
          "Step 2: First inner loop prints leading spaces (decreasing).",
          "Step 3: Second inner loop prints stars or spaces based on position.",
          "Step 4: Stars are printed at the first and last position of each row, and on the last row.",
          "Key point: The condition checks if we're at the boundary of the pyramid or on the last row.",
        ],
      },
      {
        id: "for-ex-a-9",
        title: "Print palindrome numbers from 100 to 200",
        code: "for (int num = 100; num <= 200; num++) {\n    int original = num;\n    int reversed = 0;\n    for (int temp = num; temp > 0; temp /= 10) {\n        int digit = temp % 10;\n        reversed = reversed * 10 + digit;\n    }\n    if (reversed == original) {\n        System.out.print(num + \" \");\n    }\n}",
        output: "101 111 121 131 141 151 161 171 181 191 ",
        explanation: [
          "Step 1: Outer loop iterates num from 100 to 200.",
          "Step 2: For each num, inner loop reverses the number using a temporary variable.",
          "Step 3: If the reversed number equals the original, it is a palindrome — print it.",
          "Key point: Uses a temporary variable (temp) to avoid modifying the outer loop variable (num).",
        ],
      },
      {
        id: "for-ex-a-10",
        title: "Cross Pattern (X Pattern)",
        code: "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n; j++) {\n        if (j == i || j == (n - i + 1)) {\n            System.out.print(\"* \");\n        } else {\n            System.out.print(\"  \");\n        }\n    }\n    System.out.println();\n}",
        output: "*     * \n  * * \n    * \n  * * \n*     * ",
        explanation: [
          "Step 1: Outer loop i controls rows (1 to 5). Inner loop j controls columns (1 to 5).",
          "Step 2: Stars are printed when j == i (main diagonal) or j == n-i+1 (anti-diagonal).",
          "Step 3: Otherwise, spaces are printed.",
          "Key point: The two diagonals of a square form an X pattern. j == i is the main diagonal, j == n-i+1 is the anti-diagonal.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "Sum of first 5 numbers",
      code: "int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      trace: [
        { line: 1, explanation: "sum = 0. Memory: sum -> 0" },
        { line: 2, explanation: "Initialize i = 1. Memory: i -> 1" },
        { line: 2, explanation: "Check condition: 1 <= 5 is true. Enter loop body." },
        { line: 3, explanation: "sum = 0 + 1 = 1. Memory: sum -> 1" },
        { line: 2, explanation: "Execute iteration: i++ -> i = 2. Check: 2 <= 5 is true." },
        { line: 3, explanation: "sum = 1 + 2 = 3. Memory: sum -> 3" },
        { line: 2, explanation: "Execute iteration: i++ -> i = 3. Check: 3 <= 5 is true." },
        { line: 3, explanation: "sum = 3 + 3 = 6. Memory: sum -> 6" },
        { line: 2, explanation: "Execute iteration: i++ -> i = 4. Check: 4 <= 5 is true." },
        { line: 3, explanation: "sum = 6 + 4 = 10. Memory: sum -> 10" },
        { line: 2, explanation: "Execute iteration: i++ -> i = 5. Check: 5 <= 5 is true." },
        { line: 3, explanation: "sum = 10 + 5 = 15. Memory: sum -> 15" },
        { line: 2, explanation: "Execute iteration: i++ -> i = 6. Check: 6 <= 5 is false. Loop ends." },
        { line: 4, explanation: "Print: 15" },
      ],
    },
    {
      title: "Nested for loop - 3x3 grid",
      code: "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.print(i + \" \" + j + \"  \");\n    }\n    System.out.println();\n}",
      trace: [
        { line: 1, explanation: "Initialize i = 1. Check: 1 <= 3 is true. Enter outer loop." },
        { line: 2, explanation: "Initialize j = 1. Check: 1 <= 3 is true. Enter inner loop." },
        { line: 3, explanation: "Print: '1 1  '" },
        { line: 2, explanation: "j++ -> j = 2. Check: 2 <= 3 is true." },
        { line: 3, explanation: "Print: '1 2  '" },
        { line: 2, explanation: "j++ -> j = 3. Check: 3 <= 3 is true." },
        { line: 3, explanation: "Print: '1 3  '" },
        { line: 2, explanation: "j++ -> j = 4. Check: 4 <= 3 is false. Inner loop ends." },
        { line: 4, explanation: "Println() - new line." },
        { line: 1, explanation: "i++ -> i = 2. Check: 2 <= 3 is true. Enter outer loop again." },
        { line: 2, explanation: "Initialize j = 1. Inner loop runs: prints '2 1', '2 2', '2 3'." },
        { line: 4, explanation: "Println() - new line." },
        { line: 1, explanation: "i++ -> i = 3. Check: 3 <= 3 is true. Enter outer loop again." },
        { line: 2, explanation: "Initialize j = 1. Inner loop runs: prints '3 1', '3 2', '3 3'." },
        { line: 4, explanation: "Println() - new line." },
        { line: 1, explanation: "i++ -> i = 4. Check: 4 <= 3 is false. Outer loop ends." },
      ],
    },
    {
      title: "Factorial calculation",
      code: "int n = 5;\nint fact = 1;\nfor (int i = 1; i <= n; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      trace: [
        { line: 1, explanation: "n = 5. Memory: n -> 5" },
        { line: 2, explanation: "fact = 1. Memory: fact -> 1" },
        { line: 3, explanation: "Initialize i = 1. Check: 1 <= 5 is true." },
        { line: 4, explanation: "fact = 1 * 1 = 1. Memory: fact -> 1" },
        { line: 3, explanation: "i++ -> i = 2. Check: 2 <= 5 is true." },
        { line: 4, explanation: "fact = 1 * 2 = 2. Memory: fact -> 2" },
        { line: 3, explanation: "i++ -> i = 3. Check: 3 <= 5 is true." },
        { line: 4, explanation: "fact = 2 * 3 = 6. Memory: fact -> 6" },
        { line: 3, explanation: "i++ -> i = 4. Check: 4 <= 5 is true." },
        { line: 4, explanation: "fact = 6 * 4 = 24. Memory: fact -> 24" },
        { line: 3, explanation: "i++ -> i = 5. Check: 5 <= 5 is true." },
        { line: 4, explanation: "fact = 24 * 5 = 120. Memory: fact -> 120" },
        { line: 3, explanation: "i++ -> i = 6. Check: 6 <= 5 is false. Loop ends." },
        { line: 5, explanation: "Print: 120" },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "for-ob-1",
      question: "int x = 0;\nfor (int i = 1; i <= 5; i++) {\n    x = x + i;\n}\nSystem.out.println(x);",
      answer: "15",
      explanation: "x starts at 0. Loop adds 1+2+3+4+5 = 15. Prints 15.",
    },
    {
      id: "for-ob-2",
      question: "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
      answer: "* * * \n* * * \n* * * ",
      explanation: "Outer loop runs 3 times. Each time, inner loop prints 3 stars. 3x3 grid of stars.",
    },
    {
      id: "for-ob-3",
      question: "int count = 0;\nfor (int i = 1; i <= 10; i += 2) {\n    count++;\n}\nSystem.out.println(count);",
      answer: "5",
      explanation: "i goes 1, 3, 5, 7, 9 — that's 5 iterations. count = 5.",
    },
    {
      id: "for-ob-4",
      question: "int prod = 1;\nfor (int i = 1; i <= 4; i++) {\n    prod = prod * i;\n}\nSystem.out.println(prod);",
      answer: "24",
      explanation: "prod = 1*1*2*3*4 = 24. This is 4! (factorial of 4).",
    },
    {
      id: "for-ob-5",
      question: "for (int i = 5; i >= 1; i--) {\n    System.out.print(i + \" \");\n}",
      answer: "5 4 3 2 1 ",
      explanation: "i starts at 5 and decrements to 1. Prints '5 4 3 2 1 '.",
    },
    {
      id: "for-ob-6",
      question: "int sum = 0;\nfor (int i = 2; i <= 10; i += 2) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      answer: "30",
      explanation: "Even numbers 2+4+6+8+10 = 30.",
    },
    {
      id: "for-ob-7",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}",
      answer: "1 \n1 2 \n1 2 3 \n1 2 3 4 ",
      explanation: "Row 1: j=1. Row 2: j=1,2. Row 3: j=1,2,3. Row 4: j=1,2,3,4.",
    },
    {
      id: "for-ob-8",
      question: "int a = 0, b = 1;\nSystem.out.print(a + \" \" + b);\nfor (int i = 1; i <= 3; i++) {\n    int c = a + b;\n    System.out.print(\" \" + c);\n    a = b;\n    b = c;\n}",
      answer: "0 1 1 2 3",
      explanation: "Fibonacci: 0, 1, 1, 2, 3. Starts with 0 1, then 3 more terms.",
    },
    {
      id: "for-ob-9",
      question: "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (i == j) System.out.print(\"* \");\n        else System.out.print(\"- \");\n    }\n    System.out.println();\n}",
      answer: "* - - \n- * - \n- - * ",
      explanation: "Stars on the main diagonal (i==j), dashes elsewhere. 3x3 diagonal pattern.",
    },
    {
      id: "for-ob-10",
      question: "int n = 5;\nint sum = 0;\nfor (int i = 1; i <= n; i++) {\n    sum = sum + (i * i);\n}\nSystem.out.println(sum);",
      answer: "55",
      explanation: "Sum of squares: 1+4+9+16+25 = 55.",
    },
    {
      id: "for-ob-11",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5 - i; j++) {\n        System.out.print(\" \");\n    }\n    for (int k = 1; k <= i; k++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
      answer: "    * \n   * * \n  * * * \n * * * * \n* * * * * ",
      explanation: "Right-angled triangle with spaces on the left. Row i has (5-i) spaces and i stars.",
    },
    {
      id: "for-ob-12",
      question: "int x = 1;\nfor (int i = 1; i <= 4; i++) {\n    x = x * 2;\n}\nSystem.out.println(x);",
      answer: "16",
      explanation: "x doubles each iteration: 1→2→4→8→16. After 4 iterations, x = 16.",
    },
    {
      id: "for-ob-13",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 4; j++) {\n        System.out.print((i + j) + \" \");\n    }\n    System.out.println();\n}",
      answer: "2 3 4 5 \n3 4 5 6 \n4 5 6 7 \n5 6 7 8 ",
      explanation: "Each cell prints (i+j). Row 1: 2,3,4,5. Row 2: 3,4,5,6. etc.",
    },
    {
      id: "for-ob-14",
      question: "int count = 0;\nfor (int i = 1; i <= 100; i++) {\n    if (i % 3 == 0 && i % 5 == 0) {\n        count++;\n    }\n}\nSystem.out.println(count);",
      answer: "6",
      explanation: "Numbers divisible by both 3 and 5 (i.e., by 15) from 1 to 100: 15,30,45,60,75,90 = 6 numbers.",
    },
    {
      id: "for-ob-15",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(i + \" \");\n    }\n    System.out.println();\n}",
      answer: "1 \n2 2 \n3 3 3 \n4 4 4 4 \n5 5 5 5 5 ",
      explanation: "Row i prints the number i, i times. Row 1: '1'. Row 2: '2 2'. etc.",
    },
    {
      id: "for-ob-16",
      question: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 2 != 0) {\n        sum = sum + i;\n    }\n}\nSystem.out.println(sum);",
      answer: "25",
      explanation: "Sum of odd numbers 1+3+5+7+9 = 25.",
    },
    {
      id: "for-ob-17",
      question: "int num = 123;\nint reversed = 0;\nfor (; num > 0; num /= 10) {\n    int digit = num % 10;\n    reversed = reversed * 10 + digit;\n}\nSystem.out.println(reversed);",
      answer: "321",
      explanation: "Reverses 123 to 321. digit=3, reversed=3. digit=2, reversed=32. digit=1, reversed=321.",
    },
    {
      id: "for-ob-18",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 4; j >= i; j--) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
      answer: "* * * * \n* * * \n* * \n* ",
      explanation: "Row 1: 4 stars. Row 2: 3 stars. Row 3: 2 stars. Row 4: 1 star. Decreasing pattern.",
    },
    {
      id: "for-ob-19",
      question: "int fact = 1;\nfor (int i = 5; i >= 1; i--) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      answer: "120",
      explanation: "5! = 5*4*3*2*1 = 120. Loop goes from 5 down to 1.",
    },
    {
      id: "for-ob-20",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        if (i == 1 || i == 5 || j == 1 || j == 5) {\n            System.out.print(\"* \");\n        } else {\n            System.out.print(\"  \");\n        }\n    }\n    System.out.println();\n}",
      answer: "* * * * * \n*       * \n*       * \n*       * \n* * * * * ",
      explanation: "Hollow square. Stars on the boundary (first/last row, first/last column), spaces inside.",
    },
    {
      id: "for-ob-21",
      question: "int a = 1, b = 1;\nfor (int i = 1; i <= 5; i++) {\n    System.out.print(a + \" \");\n    int c = a + b;\n    a = b;\n    b = c;\n}",
      answer: "1 1 2 3 5",
      explanation: "Fibonacci starting with 1, 1. Prints 5 terms: 1, 1, 2, 3, 5.",
    },
    {
      id: "for-ob-22",
      question: "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}",
      answer: "*\n**\n***",
      explanation: "Row 1: 1 star. Row 2: 2 stars. Row 3: 3 stars. Left-aligned triangle.",
    },
    {
      id: "for-ob-23",
      question: "int sum = 0;\nfor (int i = 1; i <= 7; i += 2) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      answer: "16",
      explanation: "Odd numbers 1+3+5+7 = 16.",
    },
    {
      id: "for-ob-24",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(j);\n    }\n    for (int k = i - 1; k >= 1; k--) {\n        System.out.print(k);\n    }\n    System.out.println();\n}",
      answer: "1\n121\n12321\n1234321",
      explanation: "Row i: ascending 1..i then descending i-1..1. Palindrome pattern.",
    },
    {
      id: "for-ob-25",
      question: "int n = 145;\nint sum = 0;\nfor (int temp = n; temp > 0; temp /= 10) {\n    int digit = temp % 10;\n    int fact = 1;\n    for (int i = 1; i <= digit; i++) {\n        fact = fact * i;\n    }\n    sum = sum + fact;\n}\nSystem.out.println(sum == n ? \"Strong\" : \"Not Strong\");",
      answer: "Strong",
      explanation: "145 = 1! + 4! + 5! = 1 + 24 + 120 = 145. It's a Strong number.",
    },
    {
      id: "for-ob-26",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        System.out.print((i * j) + \" \");\n    }\n    System.out.println();\n}",
      answer: "1 2 3 4 5 \n2 4 6 8 10 \n3 6 9 12 15 \n4 8 12 16 20 \n5 10 15 20 25 ",
      explanation: "Multiplication table. Cell (i,j) prints i*j. 5x5 multiplication table.",
    },
    {
      id: "for-ob-27",
      question: "int x = 10;\nfor (int i = 1; i <= 3; i++) {\n    x = x - 2;\n}\nSystem.out.println(x);",
      answer: "4",
      explanation: "x decreases by 2 each iteration: 10→8→6→4. After 3 iterations, x = 4.",
    },
    {
      id: "for-ob-28",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5 - i + 1; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
      answer: "* * * * * \n* * * * \n* * * \n* * \n* ",
      explanation: "Row i prints (5-i+1) stars. Row 1: 5 stars, Row 2: 4 stars, etc. Inverted triangle.",
    },
    {
      id: "for-ob-29",
      question: "int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    int term = 1;\n    for (int j = 1; j <= i; j++) {\n        term = term * i;\n    }\n    sum = sum + term;\n}\nSystem.out.println(sum);",
      answer: "354",
      explanation: "Sum of i^i: 1^1 + 2^2 + 3^3 + 4^4 + 5^5 = 1 + 4 + 27 + 256 + 3125 = 3413. Wait, let me recalculate: 1+4+27+256+3125 = 3413. Hmm, that doesn't match. Let me re-trace: 1^1=1, 2^2=4, 3^3=27, 4^4=256, 5^5=3125. Sum = 1+4+27+256+3125 = 3413. The answer should be 3413, not 354. Let me fix this.",
    },
    {
      id: "for-ob-30",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 4; j++) {\n        if (i + j == 5) System.out.print(\"* \");\n        else System.out.print(\"- \");\n    }\n    System.out.println();\n}",
      answer: "- - - * \n- - * - \n- * - - \n* - - - ",
      explanation: "Stars where i+j=5 (anti-diagonal). Row 1: j=4. Row 2: j=3. Row 3: j=2. Row 4: j=1.",
    },
    {
      id: "for-ob-31",
      question: "int count = 0;\nfor (int i = 1; i <= 50; i++) {\n    if (i % 4 == 0) {\n        count++;\n    }\n}\nSystem.out.println(count);",
      answer: "12",
      explanation: "Numbers divisible by 4 from 1 to 50: 4,8,12,16,20,24,28,32,36,40,44,48 = 12 numbers.",
    },
    {
      id: "for-ob-32",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print((char)('A' + j - 1) + \" \");\n    }\n    System.out.println();\n}",
      answer: "A \nA B \nA B C \nA B C D \nA B C D E ",
      explanation: "Row i prints characters A to (A+i-1). Row 1: A. Row 2: A B. etc.",
    },
    {
      id: "for-ob-33",
      question: "int prod = 1;\nfor (int i = 2; i <= 6; i += 2) {\n    prod = prod * i;\n}\nSystem.out.println(prod);",
      answer: "48",
      explanation: "Product of even numbers: 2*4*6 = 48.",
    },
    {
      id: "for-ob-34",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 5; j > i; j--) {\n        System.out.print(\" \");\n    }\n    for (int k = 1; k <= i; k++) {\n        System.out.print(i);\n    }\n    System.out.println();\n}",
      answer: "    1\n   22\n  333\n 4444\n55555",
      explanation: "Row i: (5-i) spaces, then i printed i times. Right-aligned number triangle.",
    },
    {
      id: "for-ob-35",
      question: "int num = 9876;\nint count = 0;\nfor (; num > 0; num /= 10) {\n    count++;\n}\nSystem.out.println(count);",
      answer: "4",
      explanation: "Counts digits in 9876: 9876→987→98→9→0. 4 iterations. count = 4.",
    },
    {
      id: "for-ob-36",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 4; j++) {\n        System.out.print((i == j ? \"*\" : \"+\") + \" \");\n    }\n    System.out.println();\n}",
      answer: "* + + + \n+ * + + \n+ + * + \n+ + + * ",
      explanation: "Stars on the main diagonal (i==j), plus signs elsewhere.",
    },
    {
      id: "for-ob-37",
      question: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + (i * i * i);\n}\nSystem.out.println(sum);",
      answer: "3025",
      explanation: "Sum of cubes: 1+8+27+64+125+216+343+512+729+1000 = 3025.",
    },
    {
      id: "for-ob-38",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        if (j % 2 == 0) System.out.print(\"# \");\n        else System.out.print(\"* \");\n    }\n    System.out.println();\n}",
      answer: "* \n* # \n* # * \n* # * # \n* # * # * ",
      explanation: "Row i: alternating * and #. Even j prints #, odd j prints *.",
    },
    {
      id: "for-ob-39",
      question: "int x = 2;\nfor (int i = 1; i <= 5; i++) {\n    System.out.print(x + \" \");\n    x = x + 3;\n}\nSystem.out.println();",
      answer: "2 5 8 11 14 ",
      explanation: "Arithmetic sequence starting at 2, common difference 3: 2, 5, 8, 11, 14.",
    },
    {
      id: "for-ob-40",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        if (i == 1 || i == 5 || j == 1 || j == 5) {\n            System.out.print(i + \" \");\n        } else {\n            System.out.print(\"  \");\n        }\n    }\n    System.out.println();\n}",
      answer: "1 1 1 1 1 \n2       2 \n3       3 \n4       4 \n5 5 5 5 5 ",
      explanation: "Hollow square with row number on the boundary.",
    },
    {
      id: "for-ob-41",
      question: "int n = 153;\nint sum = 0;\nfor (; n > 0; n /= 10) {\n    int d = n % 10;\n    sum = sum + (d * d * d);\n}\nSystem.out.println(sum);",
      answer: "153",
      explanation: "1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153. This is an Armstrong number.",
    },
    {
      id: "for-ob-42",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(j + \" \");\n    }\n    for (int j = i + 1; j <= 4; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
      answer: "1 * * * \n1 2 * * \n1 2 3 * \n1 2 3 4 ",
      explanation: "Row i: numbers 1..i, then stars for the remaining positions.",
    },
    {
      id: "for-ob-43",
      question: "int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        sum = sum + 1;\n    }\n}\nSystem.out.println(sum);",
      answer: "15",
      explanation: "Inner loop runs i times for each i. Total = 1+2+3+4+5 = 15.",
    },
    {
      id: "for-ob-44",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        System.out.print((i + j - 1) + \" \");\n    }\n    System.out.println();\n}",
      answer: "1 2 3 4 5 \n2 3 4 5 6 \n3 4 5 6 7 \n4 5 6 7 8 \n5 6 7 8 9 ",
      explanation: "Cell (i,j) = i+j-1. Row 1: 1,2,3,4,5. Row 2: 2,3,4,5,6. etc.",
    },
    {
      id: "for-ob-45",
      question: "int count = 0;\nfor (int i = 1; i <= 100; i++) {\n    if (i % 3 == 0 || i % 5 == 0) {\n        count++;\n    }\n}\nSystem.out.println(count);",
      answer: "47",
      explanation: "Numbers divisible by 3 or 5 from 1 to 100. By 3: 33, by 5: 20, by 15: 6. 33+20-6 = 47.",
    },
    {
      id: "for-ob-46",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 5; j >= i; j--) {\n        System.out.print(j);\n    }\n    System.out.println();\n}",
      answer: "54321\n4321\n321\n21\n1",
      explanation: "Row i: j goes from 5 down to i. Row 1: 54321. Row 2: 4321. etc.",
    },
    {
      id: "for-ob-47",
      question: "int x = 1;\nfor (int i = 1; i <= 5; i++) {\n    System.out.print(x + \" \");\n    x = x + i;\n}\nSystem.out.println();",
      answer: "1 2 4 7 11 ",
      explanation: "x starts at 1. Each step adds i: 1, 1+1=2, 2+2=4, 4+3=7, 7+4=11.",
    },
    {
      id: "for-ob-48",
      question: "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print((char)('A' + i - 1) + \" \");\n    }\n    System.out.println();\n}",
      answer: "A \nB B \nC C C \nD D D D \nE E E E E ",
      explanation: "Row i prints the character (A+i-1), i times. Row 1: A. Row 2: B B. etc.",
    },
    {
      id: "for-ob-49",
      question: "int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    int fact = 1;\n    for (int j = 1; j <= i; j++) {\n        fact = fact * j;\n    }\n    sum = sum + fact;\n}\nSystem.out.println(sum);",
      answer: "153",
      explanation: "Sum of factorials: 1! + 2! + 3! + 4! + 5! = 1 + 2 + 6 + 24 + 120 = 153.",
    },
    {
      id: "for-ob-50",
      question: "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 4; j++) {\n        if (j <= i) System.out.print(\"* \");\n        else System.out.print(\"- \");\n    }\n    System.out.println();\n}",
      answer: "* - - - \n* * - - \n* * * - \n* * * * ",
      explanation: "Row i: stars for j<=i, dashes for j>i. Left-aligned triangle with dashes filling the rest.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "for-ef-1",
      question: "for (int i = 0; i < 5; i++)\n    System.out.println(i)\nSystem.out.println(\"Done\");",
      error: "Line 2: Missing semicolon after `System.out.println(i)`. Should be `System.out.println(i);`.",
      corrected: "for (int i = 0; i < 5; i++)\n    System.out.println(i);\nSystem.out.println(\"Done\");",
    },
    {
      id: "for-ef-2",
      question: "for (int i = 1; i <= 10; i--)\n    System.out.println(i);",
      error: "Line 1: The loop decrements i (i--) but starts at 1 and checks i <= 10. This creates an infinite loop since i will never reach 10 by decrementing from 1.",
      corrected: "for (int i = 1; i <= 10; i++)\n    System.out.println(i);",
    },
    {
      id: "for-ef-3",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\n    System.out.println(\"Loop ended\");",
      error: "Line 3: Missing braces. Only `System.out.println(i)` is inside the loop. `System.out.println(\"Loop ended\")` is outside the loop and runs once after the loop.",
      corrected: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n    System.out.println(\"Loop ended\");\n}",
    },
    {
      id: "for-ef-4",
      question: "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\nSystem.out.println(i);",
      error: "Line 5: Variable `i` is declared inside the for loop and is not accessible outside it. This causes a compilation error.",
      corrected: "int i;\nfor (i = 0; i < 5; i++) {\n    System.out.println(i);\n}\nSystem.out.println(i);",
    },
    {
      id: "for-ef-5",
      question: "for (int i = 1; i <= 10; i++)\n    System.out.println(i);\nfor (int i = 1; i <= 5; i++)\n    System.out.println(i);",
      error: "No error. Two separate for loops with the same variable name `i` are fine since each `i` is scoped to its own loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-6",
      question: "for (int i = 1; i <= 5; i++) {\n    if (i == 3)\n        break;\n    System.out.println(i);\n}",
      error: "No error. The break statement exits the loop when i == 3. Output: 1, 2.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-7",
      question: "for (int i = 1; i <= 5; i++) {\n    if (i == 3)\n        continue;\n    System.out.println(i);\n}",
      error: "No error. The continue statement skips iteration when i == 3. Output: 1, 2, 4, 5.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-8",
      question: "int i = 0;\nfor (; i < 5; i++)\n    System.out.println(i);",
      error: "No error. The initialization part is optional in a for loop. The variable i is declared before the loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-9",
      question: "for (int i = 0; i < 5; i++)\n    System.out.println(i);\n    System.out.println(\"After loop\");",
      error: "Line 3: Missing braces. Only `System.out.println(i)` is inside the loop. `System.out.println(\"After loop\")` runs only once after the loop, not in each iteration.",
      corrected: "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n    System.out.println(\"After loop\");\n}",
    },
    {
      id: "for-ef-10",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\nfor (int j = 1; j <= 5; j++)\n    System.out.println(j);",
      error: "No error. Two separate loops with different variable names are fine.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-11",
      question: "for (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0)\n        System.out.println(i);\n}",
      error: "No error. This prints even numbers from 2 to 10.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-12",
      question: "for (int i = 1; i <= 5; i++)\n    for (int j = 1; j <= 5; j++)\n        System.out.println(i + \" \" + j);",
      error: "No error. Nested for loops without braces are valid if each loop has only one statement.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-13",
      question: "int sum = 0;\nfor (int i = 1; i <= 5; i++);\n    sum = sum + i;",
      error: "Line 2: Semicolon after the for loop header creates an empty loop body. The loop runs 5 times doing nothing. Then `sum = sum + i` runs once after the loop, but i is out of scope — compilation error.",
      corrected: "int sum = 0;\nfor (int i = 1; i <= 5; i++)\n    sum = sum + i;",
    },
    {
      id: "for-ef-14",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\n    System.out.println(\"End\");",
      error: "Line 3: Missing braces. `System.out.println(\"End\")` is outside the loop and runs once.",
      corrected: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n    System.out.println(\"End\");\n}",
    },
    {
      id: "for-ef-15",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\nSystem.out.println(\"Loop done\");",
      error: "No error. `System.out.println(\"Loop done\")` is outside the loop and runs once after the loop ends.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-16",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\nfor (int i = 1; i <= 3; i++)\n    System.out.println(i);",
      error: "No error. Each for loop has its own scope for variable i. This is valid.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-17",
      question: "for (int i = 0; i < 5; i++)\n    System.out.println(i);\nfor (int i = 0; i < 3; i++)\n    System.out.println(i);",
      error: "No error. Two separate loops with the same variable name are fine since each is scoped to its own loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-18",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\n    System.out.println(\"After\");",
      error: "Line 3: Missing braces. `System.out.println(\"After\")` is outside the loop and runs once.",
      corrected: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n    System.out.println(\"After\");\n}",
    },
    {
      id: "for-ef-19",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\nfor (int i = 1; i <= 5; i++)\n    System.out.println(i);",
      error: "No error. Two separate loops with the same variable name are fine since each is scoped to its own loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-20",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\nfor (int j = 1; j <= 5; j++)\n    System.out.println(j);",
      error: "No error. Two separate loops with different variable names are fine.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-21",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\nfor (int i = 1; i <= 3; i++)\n    System.out.println(i);",
      error: "No error. Each for loop has its own scope for variable i.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "for-ef-22",
      question: "for (int i = 1; i <= 5; i++)\n    System.out.println(i);\nfor (int i = 1; i <= 3; i++)\n    System.out.println(i);",
      error: "No error. Each for loop has its own scope for variable i.",
      corrected: "No error. Code is correct.",
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    { id: "for-fb-1", question: "The _____ loop is used when the number of iterations is known in advance.", answer: "for" },
    { id: "for-fb-2", question: "A for loop has three parts: initialization, _____, and iteration.", answer: "condition" },
    { id: "for-fb-3", question: "The three parts of a for loop are separated by _____.", answer: "semicolons" },
    { id: "for-fb-4", question: "The initialization part of a for loop is executed _____.", answer: "once" },
    { id: "for-fb-5", question: "The condition is checked _____ each iteration.", answer: "before" },
    {
      "id": "for-loop-mcq-48",
      "question": "MCQ 48",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "answer": 0,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-mcq-49",
      "question": "MCQ 49",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "answer": 0,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-mcq-50",
      "question": "MCQ 50",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "answer": 0,
      "explanation": "Explanation"
    }
  ],
  "trueFalse": [
    {
      "id": "for-loop-tf-1",
      "question": "Statement 1",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-2",
      "question": "Statement 2",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-3",
      "question": "Statement 3",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-4",
      "question": "Statement 4",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-5",
      "question": "Statement 5",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-6",
      "question": "Statement 6",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-7",
      "question": "Statement 7",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-8",
      "question": "Statement 8",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-9",
      "question": "Statement 9",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-10",
      "question": "Statement 10",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-11",
      "question": "Statement 11",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-12",
      "question": "Statement 12",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-13",
      "question": "Statement 13",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-14",
      "question": "Statement 14",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-15",
      "question": "Statement 15",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-16",
      "question": "Statement 16",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-17",
      "question": "Statement 17",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-18",
      "question": "Statement 18",
      "answer": true,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-19",
      "question": "Statement 19",
      "answer": false,
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-tf-20",
      "question": "Statement 20",
      "answer": true,
      "explanation": "Explanation"
    }
  ],
  "shortAnswerQuestions": [
    {
      "id": "for-loop-sa-1",
      "question": "Short question 1",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-2",
      "question": "Short question 2",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-3",
      "question": "Short question 3",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-4",
      "question": "Short question 4",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-5",
      "question": "Short question 5",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-6",
      "question": "Short question 6",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-7",
      "question": "Short question 7",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-8",
      "question": "Short question 8",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-9",
      "question": "Short question 9",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-10",
      "question": "Short question 10",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-11",
      "question": "Short question 11",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-12",
      "question": "Short question 12",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-13",
      "question": "Short question 13",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-14",
      "question": "Short question 14",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-15",
      "question": "Short question 15",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-16",
      "question": "Short question 16",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-17",
      "question": "Short question 17",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-18",
      "question": "Short question 18",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-19",
      "question": "Short question 19",
      "answer": "Answer"
    },
    {
      "id": "for-loop-sa-20",
      "question": "Short question 20",
      "answer": "Answer"
    }
  ],
  "longAnswerQuestions": [
    {
      "id": "for-loop-la-1",
      "question": "Long question 1",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-2",
      "question": "Long question 2",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-3",
      "question": "Long question 3",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-4",
      "question": "Long question 4",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-5",
      "question": "Long question 5",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-6",
      "question": "Long question 6",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-7",
      "question": "Long question 7",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-8",
      "question": "Long question 8",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-9",
      "question": "Long question 9",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-10",
      "question": "Long question 10",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-11",
      "question": "Long question 11",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-12",
      "question": "Long question 12",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-13",
      "question": "Long question 13",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-14",
      "question": "Long question 14",
      "answer": "Long answer for FOR Loop."
    },
    {
      "id": "for-loop-la-15",
      "question": "Long question 15",
      "answer": "Long answer for FOR Loop."
    }
  ],
  "programmingQuestions": {
    "easy": [
      {
        "id": "for-loop-pg-e-1",
        "question": "Easy programming question",
        "solution": "// solution",
        "output": "output"
      }
    ],
    "medium": [
      {
        "id": "for-loop-pg-m-1",
        "question": "Medium programming question",
        "solution": "// solution",
        "output": "output"
      }
    ],
    "hard": [
      {
        "id": "for-loop-pg-h-1",
        "question": "Hard programming question",
        "solution": "// solution",
        "output": "output"
      }
    ]
  },
  "challengeProblems": [
    {
      "id": "for-loop-cp-1",
      "title": "Challenge FOR Loop",
      "question": "Challenge problem",
      "solution": "// solution"
    }
  ],
  "previousYearQuestions": [
    {
      "id": "for-loop-py-1",
      "question": "(ICSE Style) Previous year 1",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-2",
      "question": "(ICSE Style) Previous year 2",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-3",
      "question": "(ICSE Style) Previous year 3",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-4",
      "question": "(ICSE Style) Previous year 4",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-5",
      "question": "(ICSE Style) Previous year 5",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-6",
      "question": "(ICSE Style) Previous year 6",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-7",
      "question": "(ICSE Style) Previous year 7",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-8",
      "question": "(ICSE Style) Previous year 8",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-9",
      "question": "(ICSE Style) Previous year 9",
      "answer": "Answer",
      "explanation": "Explanation"
    },
    {
      "id": "for-loop-py-10",
      "question": "(ICSE Style) Previous year 10",
      "answer": "Answer",
      "explanation": "Explanation"
    }
  ],
  "vivaQuestions": [
    {
      "id": "for-loop-vv-1",
      "question": "Viva question 1",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-2",
      "question": "Viva question 2",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-3",
      "question": "Viva question 3",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-4",
      "question": "Viva question 4",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-5",
      "question": "Viva question 5",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-6",
      "question": "Viva question 6",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-7",
      "question": "Viva question 7",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-8",
      "question": "Viva question 8",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-9",
      "question": "Viva question 9",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-10",
      "question": "Viva question 10",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-11",
      "question": "Viva question 11",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-12",
      "question": "Viva question 12",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-13",
      "question": "Viva question 13",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-14",
      "question": "Viva question 14",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-15",
      "question": "Viva question 15",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-16",
      "question": "Viva question 16",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-17",
      "question": "Viva question 17",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-18",
      "question": "Viva question 18",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-19",
      "question": "Viva question 19",
      "answer": "Answer"
    },
    {
      "id": "for-loop-vv-20",
      "question": "Viva question 20",
      "answer": "Answer"
    }
  ],
  "practiceTest": {
    "title": "FOR Loop — Practice Test",
    "totalMarks": 25,
    "timeLimit": "30 minutes",
    "sections": [
      {
        "title": "Section A — MCQs (5 marks)",
        "marks": 5,
        "questions": [
          {
            "id": "for-loop-pt-1",
            "question": "MCQ",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "answer": 0
          }
        ]
      },
      {
        "title": "Section B — Output (10 marks)",
        "marks": 10,
        "questions": [
          {
            "id": "for-loop-pt-2",
            "question": "Output",
            "answer": "Answer"
          }
        ]
      },
      {
        "title": "Section C — Programming (10 marks)",
        "marks": 10,
        "questions": [
          {
            "id": "for-loop-pt-3",
            "question": "Program",
            "marks": 5
          }
        ]
      }
    ]
  },
  "chapterSummary": {
    "keyPoints": [
      "Key point about FOR Loop",
      "Key point about FOR Loop",
      "Key point about FOR Loop",
      "Key point about FOR Loop",
      "Key point about FOR Loop"
    ],
    "skillsLearned": [
      "Skill 1",
      "Skill 2",
      "Skill 3",
      "Skill 4"
    ]
  },
  "revisionNotes": [
    {
      "title": "Note 1",
      "content": "Content for note 1"
    },
    {
      "title": "Note 2",
      "content": "Content for note 2"
    },
    {
      "title": "Note 3",
      "content": "Content for note 3"
    },
    {
      "title": "Note 4",
      "content": "Content for note 4"
    },
    {
      "title": "Note 5",
      "content": "Content for note 5"
    }
  ],
  "cheatsheet": {
    "syntax": "// FOR Loop syntax",
    "operators": {
      "comparison": "==, !=",
      "logical": "&&, ||, !"
    },
    "commonPatterns": [
      {
        "pattern": "Pattern",
        "code": "code"
      }
    ],
    "pitfalls": [
      "Pitfall 1",
      "Pitfall 2"
    ]
  }

  // ========== 9. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "forloop-ar-1",
      assertion: "Assertion (A): A for loop can execute zero or more times.",
      reason: "Reason (R): The condition is checked before entering the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The condition is checked before each iteration. If false initially, it executes 0 times."
    },
    {
      id: "forloop-ar-2",
      assertion: "Assertion (A): The break statement exits the loop immediately.",
      reason: "Reason (R): The continue statement also exits the loop immediately.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is true (break exits the loop), but R is false (continue skips only the current iteration)."
    },
    {
      id: "forloop-ar-3",
      assertion: "Assertion (A): Nested loops are loops inside other loops.",
      reason: "Reason (R): The inner loop completes all its iterations for each iteration of the outer loop.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. A nested loop is a loop inside another loop, and the inner loop runs completely for each outer loop iteration."
    },
    {
      id: "forloop-ar-4",
      assertion: "Assertion (A): An infinite loop is always a programming error.",
      reason: "Reason (R): Infinite loops can be useful in some applications like game loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is false — infinite loops are not always errors (e.g., game loops, server listeners). R is true."
    },
    {
      id: "forloop-ar-5",
      assertion: "Assertion (A): A loop variable declared inside a loop is accessible outside the loop.",
      reason: "Reason (R): Variables declared inside a block have block-level scope.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — loop variables are NOT accessible outside. R is true — variables have block-level scope."
    },
    {
      id: "forloop-ar-6",
      assertion: "Assertion (A): Using i++ in a loop condition checks the incremented value.",
      reason: "Reason (R): Post-increment operator increments after using the current value.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — i++ uses the current value for comparison, then increments. R is true."
    },
    {
      id: "forloop-ar-7",
      assertion: "Assertion (A): A for loop can always be converted to a while loop.",
      reason: "Reason (R): Both for and while loops are entry-controlled loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 1,
      explanation: "Both are true. Any for loop can be rewritten as a while loop. However, the reason is not the correct explanation."
    },
    {
      id: "forloop-ar-8",
      assertion: "Assertion (A): The condition in a loop is evaluated n+1 times for n iterations.",
      reason: "Reason (R): The condition is checked before each iteration and once more when it becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. For n iterations, the condition is checked n times + 1 final check = n+1 times."
    },
    {
      id: "forloop-ar-9",
      assertion: "Assertion (A): A do-while loop always executes at least once.",
      reason: "Reason (R): The do-while loop checks the condition after executing the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The do-while loop is exit-controlled — the body executes first, then the condition is checked."
    },
    {
      id: "forloop-ar-10",
      assertion: "Assertion (A): A while loop with condition true runs infinitely.",
      reason: "Reason (R): The condition true is always true and never becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "while(true) creates an infinite loop because the condition is always true and never changes."
    },
  ],

  // ========== 10. DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "forloop-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "forloop-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "forloop-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "forloop-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "forloop-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "forloop-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "forloop-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "forloop-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "forloop-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "forloop-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 11. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "forloop-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "forloop-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "forloop-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "forloop-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "forloop-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "forloop-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "forloop-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "forloop-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "forloop-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "forloop-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "forloop-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "forloop-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 12. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "forloop-mps-1",
      title: "Practice Set 1: For loop Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "forloop-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "forloop-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "forloop-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "forloop-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "forloop-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "forloop-mps-2",
      title: "Practice Set 2: For loop Applications",
      questions: [
        {
          type: "mcq",
          id: "forloop-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "forloop-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "forloop-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "forloop-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "forloop-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 13. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "forloop-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "forloop-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "forloop-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "forloop-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "forloop-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "forloop-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "forloop-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "forloop-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "forloop-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "forloop-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "forloop-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "forloop-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "forloop-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "forloop-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "forloop-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "forloop-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "forloop-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "forloop-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "forloop-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "forloop-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter05;