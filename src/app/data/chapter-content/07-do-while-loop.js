const chapter07 = {
  id: "07-do-while-loop",
  title: "DO-WHILE Loop",
  slug: "do-while-loop",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 180,
  topics: [
    "do-while loop",
    "exit-controlled loop",
    "post-test loop",
    "at least one execution",
    "menu-driven programs",
    "do-while vs while",
    "nested do-while",
    "loop control",
    "iteration",
    "sentinel value",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "The `do-while` loop is a repetition control structure that executes a block of code at least once, and then repeatedly as long as a given condition is `true`. Unlike the `while` loop which is entry-controlled (checks condition before execution), the `do-while` loop is exit-controlled — the condition is checked AFTER each iteration. This guarantees that the loop body executes at least once, even if the condition is false initially. Think of it like a roller coaster: you must ride it at least once before you can decide whether to ride again. The safety check happens AFTER the ride, not before.",
    realLifeExamples: [
      "A roller coaster ride — you must ride at least once before deciding to ride again (exit check).",
      "A teacher taking attendance — calls out each student's name at least once, then checks if more students remain.",
      "A cashier processing the first customer — serves at least one customer before checking if more are in line.",
      "A doctor seeing patients — sees the first patient, then checks if more patients are waiting.",
      "A vending machine — dispenses at least one item before checking if more selections are made.",
      "A waiter taking the first order — takes at least one order before checking for more customers.",
      "A security guard doing a final check — checks the premises at least once before deciding to continue.",
      "A lifeguard doing an initial sweep — checks the pool at least once before deciding to continue monitoring.",
    ],
    commonMistakes: [
      "Forgetting the semicolon after while(condition) — causes compilation error. The syntax is do { } while(condition); with a semicolon.",
      "Using do-while when a while loop would be more appropriate — do-while is only needed when you need at least one execution.",
      "Creating infinite loops by not updating the loop variable inside the loop body.",
      "Using the wrong condition direction — using i++ with i > 0 instead of i >= 0.",
      "Off-by-one errors in the condition — using i <= n when you need i < n, or vice versa.",
      "Not using braces {} for multi-statement loop bodies, leading to only the first statement being repeated.",
      "Using assignment = instead of comparison == in the condition.",
      "Confusing do-while with while — do-while always executes at least once, while may not execute at all.",
    ],
    whereUsed: [
      "Menu-driven programs where the menu must display at least once.",
      "Input validation where you need to get at least one input before validating.",
      "Processing data where the first item must be processed before checking for more.",
      "Games where the game must start at least once before checking if the player wants to continue.",
      "Any situation where the loop body must execute at least once regardless of the condition.",
      "User input scenarios where you need to prompt the user at least once.",
      "Initialization scenarios where you need to perform an action before checking a condition.",
      "Confirmation dialogs where you need to show the dialog at least once.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "The `do-while` loop is similar to the `while` loop but with one key difference: it is exit-controlled. This means the loop body executes FIRST, and THEN the condition is checked. Because of this, the loop body is guaranteed to execute at least once, even if the condition is false initially. The syntax includes a semicolon after the while(condition) — this is mandatory and a common source of errors. The do-while loop is perfect for menu-driven programs where you want the menu to display at least once before checking if the user wants to continue.",
    importantPoints: [
      "The do-while loop is exit-controlled — the condition is checked AFTER each iteration.",
      "The loop body ALWAYS executes at least once, even if the condition is false initially.",
      "The loop variable must be initialized BEFORE the do-while loop.",
      "The loop variable must be updated INSIDE the do-while loop body.",
      "Forgetting to update the loop variable causes an infinite loop.",
      "The condition must eventually become false, otherwise the loop runs forever.",
      "The semicolon (;) after while(condition) is MANDATORY — missing it causes a compilation error.",
      "Do-while loops are best when you need at least one execution guaranteed.",
      "While loops are best when the number of iterations is unknown and may be zero.",
      "A do-while loop can be converted to a while loop and vice versa (with some restructuring).",
      "The body of a do-while loop can contain any valid Java statements, including nested loops and conditionals.",
      "Do-while loops are commonly used for menu-driven programs.",
    ],
    memoryTricks: [
      "DO-WHILE = 'Do First, Check Later' — execute first, check condition after.",
      "Think of do-while as a trial: 'Do it once, then decide if you want to continue.'",
      "Remember: Execute FIRST, Check AFTER, Update INSIDE.",
      "Semicolon mnemonic: 'Don't forget the semicolon — it's the exit door!'",
      "Do-while vs While: 'Do-while does it first, While waits and checks first.'",
      "Exit-controlled = 'Try before you buy' — you experience it before deciding.",
      "At least once: 'Do-while always says yes at least once!'",
    ],
    examTips: [
      "Always check for the semicolon after while(condition) — missing it is a common compilation error in exams.",
      "In ICSE exams, do-while questions often involve menu-driven programs where the menu must display at least once.",
      "Trace the loop variable carefully — remember the body executes at least once before the first condition check.",
      "Remember: do-while guarantees at least one execution, while loop may have zero iterations.",
      "For pattern printing with do-while loops, you'll typically need nested do-while loops.",
      "Be careful with do-while(true) — this creates an infinite loop unless there's a break statement inside.",
      "In output questions, count the iterations starting from the first execution (which always happens).",
      "The condition in do-while is checked n times for n iterations (no extra check like while loop).",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `// Initialization (before loop)
int i = 1;

// Do-while loop
do {
    // code to execute
    // update statement
} while (condition);  // Note: semicolon is mandatory`,
    breakdown: [
      {
        keyword: "do",
        explanation:
          "Java keyword that starts the do-while loop. Marks the beginning of the loop body.",
      },
      {
        keyword: "loop body",
        explanation:
          "The block of code (inside {}) that executes at least once. Must contain the update statement.",
      },
      {
        keyword: "while",
        explanation:
          "Java keyword that ends the do-while loop. Must be followed by a boolean condition in parentheses.",
      },
      {
        keyword: "condition",
        explanation:
          "A boolean expression checked AFTER each iteration. If true, the loop body executes again. If false, the loop terminates. Example: i <= 5",
      },
      {
        keyword: "semicolon (;)",
        explanation:
          "MANDATORY after while(condition). Missing it causes a compilation error. This is the most common mistake with do-while loops.",
      },
    ],
    variations: {
      infiniteLoop: {
        code: `do {
    // This runs at least once, then forever
    // Use break to exit
} while (true);`,
        explanation:
          "do-while(true) executes the body once, then creates an infinite loop. Must use break statement to exit.",
      },
      doWhileTrue: {
        code: `boolean running = true;
do {
    // code
    if (someCondition) {
        running = false;  // Exit condition
    }
} while (running);`,
        explanation:
          "Using a boolean flag to control the loop. The flag is set to false when you want to exit. Body executes at least once.",
      },
      nestedDoWhile: {
        code: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print(i + " " + j + "  ");
        j++;
    } while (j <= 3);
    System.out.println();
    i++;
} while (i <= 3);`,
        explanation:
          "A do-while loop inside another do-while loop. The inner loop completes all iterations for each outer loop iteration.",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "dwhile-ex-b-1",
        title: "Print numbers 1 to 5",
        code: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);`,
        output: "1\n2\n3\n4\n5",
        explanation: [
          "Step 1: Initialize i = 1 BEFORE the loop.",
          "Step 2: Enter loop body (executes at least once). Print 1. Update: i++ → i = 2.",
          "Step 3: Check: 2 <= 5 is true. Execute body again. Print 2. i++ → i = 3.",
          "Step 4: Continue until i = 5. Print 5. i++ → i = 6.",
          "Step 5: Check: 6 <= 5 is false. Loop ends.",
          "Key point: The body executes at least once before the first condition check.",
        ],
      },
      {
        id: "dwhile-ex-b-2",
        title: "Print even numbers from 2 to 10",
        code: `int i = 2;
do {
    System.out.print(i + " ");
    i += 2;
} while (i <= 10);`,
        output: "2 4 6 8 10 ",
        explanation: [
          "Step 1: Initialize i = 2.",
          "Step 2: Execute body. Print 2. i += 2 → i = 4.",
          "Step 3: Check: 4 <= 10 is true. Execute body. Print 4. i += 2 → i = 6.",
          "Step 4: Continue until i = 10. Print 10. i += 2 → i = 12.",
          "Step 5: Check: 12 <= 10 is false. Loop ends.",
          "Key point: Using i += 2 increments by 2, generating even numbers.",
        ],
      },
      {
        id: "dwhile-ex-b-3",
        title: "Sum of first 5 natural numbers",
        code: `int i = 1;
int sum = 0;
do {
    sum = sum + i;
    i++;
} while (i <= 5);
System.out.println("Sum = " + sum);`,
        output: "Sum = 15",
        explanation: [
          "Step 1: Initialize i = 1, sum = 0.",
          "Step 2: Execute body. sum = 0 + 1 = 1. i++ → i = 2.",
          "Step 3: Check: 2 <= 5 is true. Execute body. sum = 1 + 2 = 3. i++ → i = 3.",
          "Step 4: Continue until i = 5. sum = 10 + 5 = 15. i++ → i = 6.",
          "Step 5: Check: 6 <= 5 is false. Loop ends. Print 'Sum = 15'.",
          "Key point: The accumulator pattern — initialize before loop, update inside, use after.",
        ],
      },
      {
        id: "dwhile-ex-b-4",
        title: "Print numbers in reverse (5 to 1)",
        code: `int i = 5;
do {
    System.out.println(i);
    i--;
} while (i >= 1);`,
        output: "5\n4\n3\n2\n1",
        explanation: [
          "Step 1: Initialize i = 5.",
          "Step 2: Execute body. Print 5. i-- → i = 4.",
          "Step 3: Check: 4 >= 1 is true. Execute body. Print 4. i-- → i = 3.",
          "Step 4: Continue until i = 1. Print 1. i-- → i = 0.",
          "Step 5: Check: 0 >= 1 is false. Loop ends.",
          "Key point: Using i-- decrements the loop variable, allowing reverse iteration.",
        ],
      },
      {
        id: "dwhile-ex-b-5",
        title: "Print multiplication table of 7",
        code: `int i = 1;
do {
    System.out.println("7 x " + i + " = " + (7 * i));
    i++;
} while (i <= 10);`,
        output: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: Execute body. Print '7 x 1 = 7'. i++ → i = 2.",
          "Step 3: Check: 2 <= 10 is true. Execute body. Print '7 x 2 = 14'. i++ → i = 3.",
          "Step 4: Continue until i = 10. Print '7 x 10 = 70'. i++ → i = 11.",
          "Step 5: Check: 11 <= 10 is false. Loop ends.",
          "Key point: The loop variable i is used as the multiplier in the table.",
        ],
      },
      {
        id: "dwhile-ex-b-6",
        title: "Product of first 5 numbers",
        code: `int i = 1;
int product = 1;
do {
    product = product * i;
    i++;
} while (i <= 5);
System.out.println("Product = " + product);`,
        output: "Product = 120",
        explanation: [
          "Step 1: Initialize i = 1, product = 1 (NOT 0, since 0 * anything = 0).",
          "Step 2: Execute body. product = 1 * 1 = 1. i++ → i = 2.",
          "Step 3: Check: 2 <= 5 is true. Execute body. product = 1 * 2 = 2. i++ → i = 3.",
          "Step 4: Continue until i = 5. product = 24 * 5 = 120. i++ → i = 6.",
          "Step 5: Check: 6 <= 5 is false. Loop ends. Print 'Product = 120'.",
          "Key point: For product calculations, always initialize to 1, not 0.",
        ],
      },
      {
        id: "dwhile-ex-b-7",
        title: "Print characters from A to E",
        code: `char ch = 'A';
do {
    System.out.print(ch + " ");
    ch++;
} while (ch <= 'E');`,
        output: "A B C D E ",
        explanation: [
          "Step 1: Initialize ch = 'A' (ASCII 65).",
          "Step 2: Execute body. Print 'A'. ch++ → ch = 'B'.",
          "Step 3: Check: 'B' <= 'E' is true. Execute body. Print 'B'. ch++ → ch = 'C'.",
          "Step 4: Continue until ch = 'E'. Print 'E'. ch++ → ch = 'F'.",
          "Step 5: Check: 'F' <= 'E' is false. Loop ends.",
          "Key point: char variables can be used in do-while loops. ch++ moves to the next character.",
        ],
      },
      {
        id: "dwhile-ex-b-8",
        title: "Count down from 10 to 1",
        code: `int i = 10;
do {
    System.out.println(i + " seconds remaining");
    i--;
} while (i >= 1);`,
        output: "10 seconds remaining\n9 seconds remaining\n8 seconds remaining\n...\n1 seconds remaining",
        explanation: [
          "Step 1: Initialize i = 10.",
          "Step 2: Execute body. Print '10 seconds remaining'. i-- → i = 9.",
          "Step 3: Check: 9 >= 1 is true. Execute body. Print '9 seconds remaining'. i-- → i = 8.",
          "Step 4: Continue decrementing until i = 1. Print '1 seconds remaining'. i-- → i = 0.",
          "Step 5: Check: 0 >= 1 is false. Loop ends.",
          "Key point: Countdown loops use i-- and condition i >= 1 (or i > 0).",
        ],
      },
      {
        id: "dwhile-ex-b-9",
        title: "Print odd numbers from 1 to 15",
        code: `int i = 1;
do {
    System.out.print(i + " ");
    i += 2;
} while (i <= 15);`,
        output: "1 3 5 7 9 11 13 15 ",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: Execute body. Print 1. i += 2 → i = 3.",
          "Step 3: Check: 3 <= 15 is true. Execute body. Print 3. i += 2 → i = 5.",
          "Step 4: Continue until i = 15. Print 15. i += 2 → i = 17.",
          "Step 5: Check: 17 <= 15 is false. Loop ends.",
          "Key point: Using i += 2 starting from 1 generates all odd numbers.",
        ],
      },
      {
        id: "dwhile-ex-b-10",
        title: "Square of numbers 1 to 5",
        code: `int i = 1;
do {
    System.out.println(i + " squared = " + (i * i));
    i++;
} while (i <= 5);`,
        output: "1 squared = 1\n2 squared = 4\n3 squared = 9\n4 squared = 16\n5 squared = 25",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: Execute body. Print '1 squared = 1'. i++ → i = 2.",
          "Step 3: Check: 2 <= 5 is true. Execute body. Print '2 squared = 4'. i++ → i = 3.",
          "Step 4: Continue until i = 5. Print '5 squared = 25'. i++ → i = 6.",
          "Step 5: Check: 6 <= 5 is false. Loop ends.",
          "Key point: The loop variable is used in a mathematical expression (i * i).",
        ],
      },
    ],
    intermediate: [
      {
        id: "dwhile-ex-i-1",
        title: "Nested Do-While Loop - Print a Rectangle Pattern",
        code: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print("* ");
        j++;
    } while (j <= 5);
    System.out.println();
    i++;
} while (i <= 3);`,
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
        id: "dwhile-ex-i-2",
        title: "Right-Angled Triangle Pattern",
        code: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print("* ");
        j++;
    } while (j <= i);
    System.out.println();
    i++;
} while (i <= 5);`,
        output: "*\n* *\n* * *\n* * * *\n* * * * *",
        explanation: [
          "Step 1: i = 1. Inner loop j = 1 to 1 prints one '*'. Println().",
          "Step 2: i = 2. Inner loop j = 1 to 2 prints two '*'. Println().",
          "Step 3: i = 3. Inner loop j = 1 to 3 prints three '*'. Println().",
          "Step 4: Continue until i = 5. Inner loop j = 1 to 5 prints five '*'. Println().",
          "Key point: The inner loop's limit depends on the outer loop variable (j <= i).",
        ],
      },
      {
        id: "dwhile-ex-i-3",
        title: "Check if a number is prime",
        code: `int num = 17;
boolean isPrime = true;
int i = 2;
do {
    if (num % i == 0) {
        isPrime = false;
        break;
    }
    i++;
} while (i <= num / 2);
System.out.println(num + " is " + (isPrime ? "prime" : "not prime"));`,
        output: "17 is prime",
        explanation: [
          "Step 1: num = 17. isPrime = true. i = 2.",
          "Step 2: Execute body. 17 % 2 = 1 (not 0). Continue. i++ → i = 3.",
          "Step 3: Check: 3 <= 8.5? Yes. Execute body. 17 % 3 = 2. Continue. i++ → i = 4.",
          "Step 4: Continue checking until i = 8. 17 % 8 = 1. Continue. i++ → i = 9.",
          "Step 5: Check: 9 <= 8 is false. Loop ends. isPrime is still true.",
          "Key point: We only need to check divisors up to num/2. The break exits early when a divisor is found.",
        ],
      },
      {
        id: "dwhile-ex-i-4",
        title: "Fibonacci Series (first 10 terms)",
        code: `int a = 0, b = 1;
System.out.print(a + " " + b);
int i = 3;
do {
    int c = a + b;
    System.out.print(" " + c);
    a = b;
    b = c;
    i++;
} while (i <= 10);`,
        output: "0 1 1 2 3 5 8 13 21 34",
        explanation: [
          "Step 1: a = 0, b = 1. Print '0 1'.",
          "Step 2: Execute body. c = 0 + 1 = 1. Print ' 1'. a = 1, b = 1. i++ → i = 4.",
          "Step 3: Check: 4 <= 10 is true. Execute body. c = 1 + 1 = 2. Print ' 2'. a = 1, b = 2. i++ → i = 5.",
          "Step 4: Continue until i = 10. c = 13 + 21 = 34. Print ' 34'.",
          "Key point: Each term is the sum of the two preceding terms.",
        ],
      },
      {
        id: "dwhile-ex-i-5",
        title: "Factorial of a number",
        code: `int num = 6;
int factorial = 1;
int i = 1;
do {
    factorial = factorial * i;
    i++;
} while (i <= num);
System.out.println(num + "! = " + factorial);`,
        output: "6! = 720",
        explanation: [
          "Step 1: num = 6. factorial = 1. i = 1.",
          "Step 2: Execute body. factorial = 1 * 1 = 1. i++ → i = 2.",
          "Step 3: Check: 2 <= 6 is true. Execute body. factorial = 1 * 2 = 2. i++ → i = 3.",
          "Step 4: Continue until i = 6. factorial = 120 * 6 = 720. i++ → i = 7.",
          "Step 5: Check: 7 <= 6 is false. Loop ends. Print '6! = 720'.",
          "Key point: Factorial of n = 1 * 2 * 3 * ... * n. Initialize to 1, not 0.",
        ],
      },
      {
        id: "dwhile-ex-i-6",
        title: "Check Armstrong number",
        code: `int num = 153;
int original = num;
int sum = 0;
do {
    int digit = num % 10;
    sum = sum + (digit * digit * digit);
    num = num / 10;
} while (num > 0);
System.out.println(original + " is " + (sum == original ? "Armstrong" : "not Armstrong"));`,
        output: "153 is Armstrong",
        explanation: [
          "Step 1: num = 153. original = 153. sum = 0.",
          "Step 2: Execute body. digit = 3. sum = 27. num = 15.",
          "Step 3: Check: 15 > 0 is true. Execute body. digit = 5. sum = 152. num = 1.",
          "Step 4: Check: 1 > 0 is true. Execute body. digit = 1. sum = 153. num = 0.",
          "Step 5: Check: 0 > 0 is false. Loop ends. sum = 153 == original = 153. Print 'Armstrong'.",
          "Key point: An Armstrong number equals the sum of cubes of its digits.",
        ],
      },
      {
        id: "dwhile-ex-i-7",
        title: "Check palindrome number",
        code: `int num = 1221;
int original = num;
int reversed = 0;
do {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
} while (num > 0);
System.out.println(original + " is " + (reversed == original ? "palindrome" : "not palindrome"));`,
        output: "1221 is palindrome",
        explanation: [
          "Step 1: num = 1221. original = 1221. reversed = 0.",
          "Step 2: Execute body. digit = 1. reversed = 1. num = 122.",
          "Step 3: Check: 122 > 0 is true. Execute body. digit = 2. reversed = 12. num = 12.",
          "Step 4: Check: 12 > 0 is true. Execute body. digit = 2. reversed = 122. num = 1.",
          "Step 5: Check: 1 > 0 is true. Execute body. digit = 1. reversed = 1221. num = 0.",
          "Step 6: Check: 0 > 0 is false. Loop ends. reversed = 1221 == original. Print 'palindrome'.",
          "Key point: Reverse the number by repeatedly extracting the last digit.",
        ],
      },
      {
        id: "dwhile-ex-i-8",
        title: "Sum of digits of a number",
        code: `int num = 12345;
int sum = 0;
do {
    int digit = num % 10;
    sum = sum + digit;
    num = num / 10;
} while (num > 0);
System.out.println("Sum of digits = " + sum);`,
        output: "Sum of digits = 15",
        explanation: [
          "Step 1: num = 12345. sum = 0.",
          "Step 2: Execute body. digit = 5. sum = 5. num = 1234.",
          "Step 3: Check: 1234 > 0 is true. Execute body. digit = 4. sum = 9. num = 123.",
          "Step 4: Continue until num = 1. digit = 1. sum = 15. num = 0.",
          "Step 5: Check: 0 > 0 is false. Loop ends. Print 'Sum of digits = 15'.",
          "Key point: Extract digits from right to left using % 10 and / 10.",
        ],
      },
      {
        id: "dwhile-ex-i-9",
        title: "Menu-driven program (simplified)",
        code: `int choice = 1;
do {
    System.out.println("1. Tea");
    System.out.println("2. Coffee");
    System.out.println("3. Juice");
    System.out.println("4. Exit");
    System.out.print("Enter choice: ");
    // Assume choice is read from user
    // For this example, we'll just show the loop structure
    choice++;  // This would normally be: choice = sc.nextInt();
} while (choice != 4);
System.out.println("Thank you!");`,
        output: "Menu displays 3 times, then exits",
        explanation: [
          "Step 1: choice = 1.",
          "Step 2: Execute body. Display menu. choice++ → choice = 2.",
          "Step 3: Check: 2 != 4 is true. Execute body. Display menu. choice++ → choice = 3.",
          "Step 4: Check: 3 != 4 is true. Execute body. Display menu. choice++ → choice = 4.",
          "Step 5: Check: 4 != 4 is false. Loop ends. Print 'Thank you!'.",
          "Key point: Do-while is perfect for menu-driven programs — menu displays at least once.",
        ],
      },
      {
        id: "dwhile-ex-i-10",
        title: "Reverse a number",
        code: `int num = 12345;
int reversed = 0;
do {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
} while (num > 0);
System.out.println("Reversed: " + reversed);`,
        output: "Reversed: 54321",
        explanation: [
          "Step 1: num = 12345. reversed = 0.",
          "Step 2: Execute body. digit = 5. reversed = 5. num = 1234.",
          "Step 3: Check: 1234 > 0 is true. Execute body. digit = 4. reversed = 54. num = 123.",
          "Step 4: Continue until num = 1. digit = 1. reversed = 54321. num = 0.",
          "Step 5: Check: 0 > 0 is false. Loop ends. Print 'Reversed: 54321'.",
          "Key point: Build the reversed number by shifting digits left (multiply by 10) and adding the extracted digit.",
        ],
      },
    ],
    advanced: [
      {
        id: "dwhile-ex-a-1",
        title: "Print all prime numbers from 1 to 50",
        code: `int num = 2;
do {
    boolean isPrime = true;
    int i = 2;
    do {
        if (num % i == 0) {
            isPrime = false;
            break;
        }
        i++;
    } while (i <= num / 2);
    if (isPrime) {
        System.out.print(num + " ");
    }
    num++;
} while (num <= 50);`,
        output: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 ",
        explanation: [
          "Step 1: Outer loop iterates num from 2 to 50.",
          "Step 2: For each num, inner loop checks divisibility from 2 to num/2.",
          "Step 3: If any divisor is found, isPrime = false and break exits the inner loop.",
          "Step 4: If no divisor found (isPrime is still true), print the number.",
          "Key point: Nested do-while loop with a break statement for efficiency.",
        ],
      },
      {
        id: "dwhile-ex-a-2",
        title: "Diamond Pattern",
        code: `int n = 4;
int i = 1;
// Upper half
do {
    int j = 1;
    do {
        System.out.print("  ");
        j++;
    } while (j <= n - i);
    int k = 1;
    do {
        System.out.print("* ");
        k++;
    } while (k <= 2 * i - 1);
    System.out.println();
    i++;
} while (i <= n);
// Lower half
i = n - 1;
do {
    int j = 1;
    do {
        System.out.print("  ");
        j++;
    } while (j <= n - i);
    int k = 1;
    do {
        System.out.print("* ");
        k++;
    } while (k <= 2 * i - 1);
    System.out.println();
    i--;
} while (i >= 1);`,
        output: "      * \n    * * * \n  * * * * * \n* * * * * * * \n  * * * * * \n    * * * \n      * ",
        explanation: [
          "Step 1: First loop (i = 1 to 4) prints the upper half of the diamond.",
          "Step 2: Second loop (i = 3 to 1) prints the lower half in reverse.",
          "Step 3: Spaces decrease and stars increase in the upper half; reverse in the lower half.",
          "Key point: Three nested do-while loops for each half — spaces, then stars.",
        ],
      },
      {
        id: "dwhile-ex-a-3",
        title: "Hollow Square Pattern",
        code: `int n = 5;
int i = 1;
do {
    int j = 1;
    do {
        if (i == 1 || i == n || j == 1 || j == n) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        j++;
    } while (j <= n);
    System.out.println();
    i++;
} while (i <= n);`,
        output: "* * * * * \n*       * \n*       * \n*       * \n* * * * * ",
        explanation: [
          "Step 1: Outer loop i controls rows (1 to 5). Inner loop j controls columns (1 to 5).",
          "Step 2: If i is 1 or 5 (first/last row) or j is 1 or 5 (first/last column), print '*'.",
          "Step 3: Otherwise, print spaces to create the hollow effect.",
          "Key point: The condition checks boundary positions to print stars only on the perimeter.",
        ],
      },
      {
        id: "dwhile-ex-a-4",
        title: "Print Armstrong numbers from 1 to 1000",
        code: `int num = 1;
do {
    int original = num;
    int sum = 0;
    int temp = num;
    do {
        int digit = temp % 10;
        sum = sum + (digit * digit * digit);
        temp = temp / 10;
    } while (temp > 0);
    if (sum == num) {
        System.out.print(num + " ");
    }
    num++;
} while (num <= 1000);`,
        output: "1 153 370 371 407 ",
        explanation: [
          "Step 1: Outer loop iterates num from 1 to 1000.",
          "Step 2: For each num, inner loop extracts digits and computes sum of cubes.",
          "Step 3: If sum equals the original number, it is an Armstrong number — print it.",
          "Key point: 1-digit numbers (1-9) are Armstrong. 153 = 1^3+5^3+3^3, etc.",
        ],
      },
      {
        id: "dwhile-ex-a-5",
        title: "Number Pattern - Pascal's Triangle",
        code: `int n = 5;
int i = 0;
do {
    int num = 1;
    int j = 0;
    do {
        System.out.print(num + " ");
        num = num * (i - j) / (j + 1);
        j++;
    } while (j <= i);
    System.out.println();
    i++;
} while (i < n);`,
        output: "1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 ",
        explanation: [
          "Step 1: Outer loop i controls rows (0 to 4).",
          "Step 2: Inner loop j controls elements in each row (0 to i).",
          "Step 3: num starts at 1. Each element is computed as num * (i-j) / (j+1).",
          "Step 4: This formula generates binomial coefficients (nCr).",
          "Key point: Each number is the sum of the two numbers above it.",
        ],
      },
      {
        id: "dwhile-ex-a-6",
        title: "Reverse a number using do-while loop",
        code: `int num = 12345;
int reversed = 0;
do {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
} while (num > 0);
System.out.println("Reversed: " + reversed);`,
        output: "Reversed: 54321",
        explanation: [
          "Step 1: num = 12345. reversed = 0.",
          "Step 2: Execute body. digit = 5. reversed = 5. num = 1234.",
          "Step 3: Check: 1234 > 0 is true. Execute body. digit = 4. reversed = 54. num = 123.",
          "Step 4: Continue until num = 1. digit = 1. reversed = 54321. num = 0.",
          "Step 5: Check: 0 > 0 is false. Loop ends. Print 'Reversed: 54321'.",
          "Key point: Build the reversed number by shifting digits left and adding the extracted digit.",
        ],
      },
      {
        id: "dwhile-ex-a-7",
        title: "Print perfect numbers from 1 to 1000",
        code: `int num = 1;
do {
    int sum = 0;
    int i = 1;
    do {
        if (num % i == 0) {
            sum = sum + i;
        }
        i++;
    } while (i < num);
    if (sum == num) {
        System.out.print(num + " ");
    }
    num++;
} while (num <= 1000);`,
        output: "1 6 28 496 ",
        explanation: [
          "Step 1: Outer loop iterates num from 1 to 1000.",
          "Step 2: For each num, inner loop checks all numbers from 1 to num-1.",
          "Step 3: If i divides num evenly, add i to sum.",
          "Step 4: If sum equals num, it is a perfect number — print it.",
          "Key point: A perfect number equals the sum of its proper divisors.",
        ],
      },
      {
        id: "dwhile-ex-a-8",
        title: "Hollow Pyramid Pattern",
        code: `int n = 5;
int i = 1;
do {
    int j = i;
    do {
        System.out.print(" ");
        j++;
    } while (j < n);
    int k = 1;
    do {
        if (k == 1 || k == (2 * i - 1) || i == n) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        k++;
    } while (k <= (2 * i - 1));
    System.out.println();
    i++;
} while (i <= n);`,
        output: "    * \n   * * \n  *   * \n *     * \n* * * * * ",
        explanation: [
          "Step 1: Outer loop i controls rows (1 to 5).",
          "Step 2: First inner loop prints leading spaces (decreasing).",
          "Step 3: Second inner loop prints stars or spaces based on position.",
          "Step 4: Stars are printed at the first and last position of each row, and on the last row.",
          "Key point: The condition checks if we're at the boundary of the pyramid.",
        ],
      },
      {
        id: "dwhile-ex-a-9",
        title: "Print palindrome numbers from 100 to 200",
        code: `int num = 100;
do {
    int original = num;
    int reversed = 0;
    int temp = num;
    do {
        int digit = temp % 10;
        reversed = reversed * 10 + digit;
        temp = temp / 10;
    } while (temp > 0);
    if (reversed == original) {
        System.out.print(num + " ");
    }
    num++;
} while (num <= 200);`,
        output: "101 111 121 131 141 151 161 171 181 191 ",
        explanation: [
          "Step 1: Outer loop iterates num from 100 to 200.",
          "Step 2: For each num, inner loop reverses the number using a temporary variable.",
          "Step 3: If the reversed number equals the original, it is a palindrome — print it.",
          "Key point: Uses a temporary variable (temp) to avoid modifying the outer loop variable.",
        ],
      },
      {
        id: "dwhile-ex-a-10",
        title: "Cross Pattern (X Pattern)",
        code: `int n = 5;
int i = 1;
do {
    int j = 1;
    do {
        if (j == i || j == (n - i + 1)) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        j++;
    } while (j <= n);
    System.out.println();
    i++;
} while (i <= n);`,
        output: "*     * \n  * * \n    * \n  * * \n*     * ",
        explanation: [
          "Step 1: Outer loop i controls rows (1 to 5). Inner loop j controls columns (1 to 5).",
          "Step 2: Stars are printed when j == i (main diagonal) or j == n-i+1 (anti-diagonal).",
          "Step 3: Otherwise, spaces are printed.",
          "Key point: The two diagonals of a square form an X pattern.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "Sum of first 5 numbers",
      code: `int sum = 0;
int i = 1;
do {
    sum = sum + i;
    i++;
} while (i <= 5);
System.out.println(sum);`,
      trace: [
        { line: 1, explanation: "sum = 0. Memory: sum → 0" },
        { line: 2, explanation: "i = 1. Memory: i → 1" },
        { line: 3, explanation: "Execute body (do-while always executes at least once). sum = 0 + 1 = 1. Memory: sum → 1" },
        { line: 4, explanation: "i++ → i = 2. Check: 2 <= 5 is true." },
        { line: 3, explanation: "Execute body. sum = 1 + 2 = 3. Memory: sum → 3" },
        { line: 4, explanation: "i++ → i = 3. Check: 3 <= 5 is true." },
        { line: 3, explanation: "Execute body. sum = 3 + 3 = 6. Memory: sum → 6" },
        { line: 4, explanation: "i++ → i = 4. Check: 4 <= 5 is true." },
        { line: 3, explanation: "Execute body. sum = 6 + 4 = 10. Memory: sum → 10" },
        { line: 4, explanation: "i++ → i = 5. Check: 5 <= 5 is true." },
        { line: 3, explanation: "Execute body. sum = 10 + 5 = 15. Memory: sum → 15" },
        { line: 4, explanation: "i++ → i = 6. Check: 6 <= 5 is false. Loop ends." },
        { line: 6, explanation: "Print: 15" },
      ],
    },
    {
      title: "Nested do-while loop - 3x3 grid",
      code: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print(i + " " + j + "  ");
        j++;
    } while (j <= 3);
    System.out.println();
    i++;
} while (i <= 3);`,
      trace: [
        { line: 1, explanation: "Initialize i = 1. Enter outer loop (do-while executes at least once)." },
        { line: 2, explanation: "Initialize j = 1. Enter inner loop." },
        { line: 3, explanation: "Print: '1 1  '" },
        { line: 4, explanation: "j++ → j = 2. Check: 2 <= 3 is true." },
        { line: 3, explanation: "Print: '1 2  '" },
        { line: 4, explanation: "j++ → j = 3. Check: 3 <= 3 is true." },
        { line: 3, explanation: "Print: '1 3  '" },
        { line: 4, explanation: "j++ → j = 4. Check: 4 <= 3 is false. Inner loop ends." },
        { line: 5, explanation: "Println() - new line." },
        { line: 6, explanation: "i++ → i = 2. Check: 2 <= 3 is true. Enter outer loop again." },
        { line: 2, explanation: "Initialize j = 1. Inner loop runs: prints '2 1', '2 2', '2 3'." },
        { line: 5, explanation: "Println() - new line." },
        { line: 6, explanation: "i++ → i = 3. Check: 3 <= 3 is true. Enter outer loop again." },
        { line: 2, explanation: "Initialize j = 1. Inner loop runs: prints '3 1', '3 2', '3 3'." },
        { line: 5, explanation: "Println() - new line." },
        { line: 6, explanation: "i++ → i = 4. Check: 4 <= 3 is false. Outer loop ends." },
      ],
    },
    {
      title: "Factorial calculation",
      code: `int n = 5;
int fact = 1;
int i = 1;
do {
    fact = fact * i;
    i++;
} while (i <= n);
System.out.println(fact);`,
      trace: [
        { line: 1, explanation: "n = 5. Memory: n → 5" },
        { line: 2, explanation: "fact = 1. Memory: fact → 1" },
        { line: 3, explanation: "i = 1. Execute body (do-while always executes at least once)." },
        { line: 4, explanation: "fact = 1 * 1 = 1. Memory: fact → 1" },
        { line: 5, explanation: "i++ → i = 2. Check: 2 <= 5 is true." },
        { line: 4, explanation: "fact = 1 * 2 = 2. Memory: fact → 2" },
        { line: 5, explanation: "i++ → i = 3. Check: 3 <= 5 is true." },
        { line: 4, explanation: "fact = 2 * 3 = 6. Memory: fact → 6" },
        { line: 5, explanation: "i++ → i = 4. Check: 4 <= 5 is true." },
        { line: 4, explanation: "fact = 6 * 4 = 24. Memory: fact → 24" },
        { line: 5, explanation: "i++ → i = 5. Check: 5 <= 5 is true." },
        { line: 4, explanation: "fact = 24 * 5 = 120. Memory: fact → 120" },
        { line: 5, explanation: "i++ → i = 6. Check: 6 <= 5 is false. Loop ends." },
        { line: 7, explanation: "Print: 120" },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "dwhile-ob-1",
      question: `int x = 0;
int i = 1;
do {
    x = x + i;
    i++;
} while (i <= 5);
System.out.println(x);`,
      answer: "15",
      explanation: "x starts at 0. Loop adds 1+2+3+4+5 = 15. Prints 15.",
    },
    {
      id: "dwhile-ob-2",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print("* ");
        j++;
    } while (j <= 3);
    System.out.println();
    i++;
} while (i <= 3);`,
      answer: "* * * \n* * * \n* * * ",
      explanation: "Outer loop runs 3 times. Each time, inner loop prints 3 stars. 3x3 grid of stars.",
    },
    {
      id: "dwhile-ob-3",
      question: `int count = 0;
int i = 1;
do {
    i += 2;
    count++;
} while (i <= 10);
System.out.println(count);`,
      answer: "5",
      explanation: "i goes 1, 3, 5, 7, 9 — that's 5 iterations. count = 5.",
    },
    {
      id: "dwhile-ob-4",
      question: `int prod = 1;
int i = 1;
do {
    prod = prod * i;
    i++;
} while (i <= 4);
System.out.println(prod);`,
      answer: "24",
      explanation: "prod = 1*1*2*3*4 = 24. This is 4! (factorial of 4).",
    },
    {
      id: "dwhile-ob-5",
      question: `int i = 5;
do {
    System.out.print(i + " ");
    i--;
} while (i >= 1);`,
      answer: "5 4 3 2 1 ",
      explanation: "i starts at 5 and decrements to 1. Prints '5 4 3 2 1 '.",
    },
    {
      id: "dwhile-ob-6",
      question: `int sum = 0;
int i = 2;
do {
    sum = sum + i;
    i += 2;
} while (i <= 10);
System.out.println(sum);`,
      answer: "30",
      explanation: "Even numbers 2+4+6+8+10 = 30.",
    },
    {
      id: "dwhile-ob-7",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print(j + " ");
        j++;
    } while (j <= i);
    System.out.println();
    i++;
} while (i <= 4);`,
      answer: "1 \n1 2 \n1 2 3 \n1 2 3 4 ",
      explanation: "Row 1: j=1. Row 2: j=1,2. Row 3: j=1,2,3. Row 4: j=1,2,3,4.",
    },
    {
      id: "dwhile-ob-8",
      question: `int a = 0, b = 1;
System.out.print(a + " " + b);
int i = 1;
do {
    int c = a + b;
    System.out.print(" " + c);
    a = b;
    b = c;
    i++;
} while (i <= 3);`,
      answer: "0 1 1 2 3",
      explanation: "Fibonacci: 0, 1, 1, 2, 3. Starts with 0 1, then 3 more terms.",
    },
    {
      id: "dwhile-ob-9",
      question: `int i = 1;
do {
    int j = 1;
    do {
        if (i == j) System.out.print("* ");
        else System.out.print("- ");
        j++;
    } while (j <= 3);
    System.out.println();
    i++;
} while (i <= 3);`,
      answer: "* - - \n- * - \n- - * ",
      explanation: "Stars on the main diagonal (i==j), dashes elsewhere. 3x3 diagonal pattern.",
    },
    {
      id: "dwhile-ob-10",
      question: `int n = 5;
int sum = 0;
int i = 1;
do {
    sum = sum + (i * i);
    i++;
} while (i <= n);
System.out.println(sum);`,
      answer: "55",
      explanation: "Sum of squares: 1+4+9+16+25 = 55.",
    },
    {
      id: "dwhile-ob-11",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print(" ");
        j++;
    } while (j <= 5 - i);
    int k = 1;
    do {
        System.out.print("* ");
        k++;
    } while (k <= i);
    System.out.println();
    i++;
} while (i <= 5);`,
      answer: "    * \n   * * \n  * * * \n * * * * \n* * * * * ",
      explanation: "Right-angled triangle with spaces on the left. Row i has (5-i) spaces and i stars.",
    },
    {
      id: "dwhile-ob-12",
      question: `int x = 1;
int i = 1;
do {
    x = x * 2;
    i++;
} while (i <= 4);
System.out.println(x);`,
      answer: "16",
      explanation: "x doubles each iteration: 1→2→4→8→16. After 4 iterations, x = 16.",
    },
    {
      id: "dwhile-ob-13",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print((i + j) + " ");
        j++;
    } while (j <= 4);
    System.out.println();
    i++;
} while (i <= 4);`,
      answer: "2 3 4 5 \n3 4 5 6 \n4 5 6 7 \n5 6 7 8 ",
      explanation: "Each cell prints (i+j). Row 1: 2,3,4,5. Row 2: 3,4,5,6. etc.",
    },
    {
      id: "dwhile-ob-14",
      question: `int count = 0;
int i = 1;
do {
    if (i % 3 == 0 && i % 5 == 0) {
        count++;
    }
    i++;
} while (i <= 100);
System.out.println(count);`,
      answer: "6",
      explanation: "Numbers divisible by both 3 and 5 (i.e., by 15) from 1 to 100: 15,30,45,60,75,90 = 6 numbers.",
    },
    {
      id: "dwhile-ob-15",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print(i + " ");
        j++;
    } while (j <= i);
    System.out.println();
    i++;
} while (i <= 5);`,
      answer: "1 \n2 2 \n3 3 3 \n4 4 4 4 \n5 5 5 5 5 ",
      explanation: "Row i prints the number i, i times. Row 1: '1'. Row 2: '2 2'. etc.",
    },
    {
      id: "dwhile-ob-16",
      question: `int sum = 0;
int i = 1;
do {
    if (i % 2 != 0) {
        sum = sum + i;
    }
    i++;
} while (i <= 10);
System.out.println(sum);`,
      answer: "25",
      explanation: "Sum of odd numbers 1+3+5+7+9 = 25.",
    },
    {
      id: "dwhile-ob-17",
      question: `int num = 123;
int reversed = 0;
do {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
} while (num > 0);
System.out.println(reversed);`,
      answer: "321",
      explanation: "Reverses 123 to 321. digit=3, reversed=3. digit=2, reversed=32. digit=1, reversed=321.",
    },
    {
      id: "dwhile-ob-18",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print("* ");
        j++;
    } while (j <= 4 - i + 1);
    System.out.println();
    i++;
} while (i <= 4);`,
      answer: "* * * * \n* * * \n* * \n* ",
      explanation: "Row i prints (5-i) stars. Row 1: 5 stars, Row 2: 4 stars, etc. Inverted triangle.",
    },
    {
      id: "dwhile-ob-19",
      question: `int fact = 1;
int i = 5;
do {
    fact = fact * i;
    i--;
} while (i >= 1);
System.out.println(fact);`,
      answer: "120",
      explanation: "5! = 5*4*3*2*1 = 120. Loop goes from 5 down to 1.",
    },
    {
      id: "dwhile-ob-20",
      question: `int i = 1;
do {
    int j = 1;
    do {
        if (i == 1 || i == 5 || j == 1 || j == 5) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        j++;
    } while (j <= 5);
    System.out.println();
    i++;
} while (i <= 5);`,
      answer: "* * * * * \n*       * \n*       * \n*       * \n* * * * * ",
      explanation: "Hollow square. Stars on the boundary (first/last row, first/last column), spaces inside.",
    },
    {
      id: "dwhile-ob-21",
      question: `int a = 1, b = 1;
int i = 1;
do {
    System.out.print(a + " ");
    int c = a + b;
    a = b;
    b = c;
    i++;
} while (i <= 5);`,
      answer: "1 1 2 3 5",
      explanation: "Fibonacci starting with 1, 1. Prints 5 terms: 1, 1, 2, 3, 5.",
    },
    {
      id: "dwhile-ob-22",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print("*");
        j++;
    } while (j <= i);
    System.out.println();
    i++;
} while (i <= 3);`,
      answer: "*\n**\n***",
      explanation: "Row 1: 1 star. Row 2: 2 stars. Row 3: 3 stars. Left-aligned triangle.",
    },
    {
      id: "dwhile-ob-23",
      question: `int sum = 0;
int i = 1;
do {
    sum = sum + i;
    i += 2;
} while (i <= 7);
System.out.println(sum);`,
      answer: "16",
      explanation: "Odd numbers 1+3+5+7 = 16.",
    },
    {
      id: "dwhile-ob-24",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print(j);
        j++;
    } while (j <= i);
    int k = i - 1;
    do {
        System.out.print(k);
        k--;
    } while (k >= 1);
    System.out.println();
    i++;
} while (i <= 4);`,
      answer: "1\n121\n12321\n1234321",
      explanation: "Row i: ascending 1..i then descending i-1..1. Palindrome pattern.",
    },
    {
      id: "dwhile-ob-25",
      question: `int n = 145;
int sum = 0;
int temp = n;
do {
    int d = temp % 10;
    int fact = 1;
    int i = 1;
    do {
        fact = fact * i;
        i++;
    } while (i <= d);
    sum = sum + fact;
    temp = temp / 10;
} while (temp > 0);
System.out.println(sum == n ? "Strong" : "Not Strong");`,
      answer: "Strong",
      explanation: "145 = 1! + 4! + 5! = 1 + 24 + 120 = 145. It's a Strong number.",
    },
    {
      id: "dwhile-ob-26",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print((i * j) + " ");
        j++;
    } while (j <= 5);
    System.out.println();
    i++;
} while (i <= 5);`,
      answer: "1 2 3 4 5 \n2 4 6 8 10 \n3 6 9 12 15 \n4 8 12 16 20 \n5 10 15 20 25 ",
      explanation: "Multiplication table. Cell (i,j) prints i*j. 5x5 multiplication table.",
    },
    {
      id: "dwhile-ob-27",
      question: `int x = 10;
int i = 1;
do {
    x = x - 2;
    i++;
} while (i <= 3);
System.out.println(x);`,
      answer: "4",
      explanation: "x decreases by 2 each iteration: 10→8→6→4. After 3 iterations, x = 4.",
    },
    {
      id: "dwhile-ob-28",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print("* ");
        j++;
    } while (j <= i);
    System.out.println();
    i++;
} while (i <= 5);`,
      answer: "* \n* * \n* * * \n* * * * \n* * * * * ",
      explanation: "Row i prints i stars. Row 1: 1 star. Row 2: 2 stars. etc.",
    },
    {
      id: "dwhile-ob-29",
      question: `int sum = 0;
int i = 1;
do {
    int term = 1;
    int j = 1;
    do {
        term = term * i;
        j++;
    } while (j <= i);
    sum = sum + term;
    i++;
} while (i <= 5);
System.out.println(sum);`,
      answer: "3413",
      explanation: "Sum of i^i: 1^1 + 2^2 + 3^3 + 4^4 + 5^5 = 1 + 4 + 27 + 256 + 3125 = 3413.",
    },
    {
      id: "dwhile-ob-30",
      question: `int i = 1;
do {
    int j = 1;
    do {
        if (i + j == 5) System.out.print("* ");
        else System.out.print("- ");
        j++;
    } while (j <= 4);
    System.out.println();
    i++;
} while (i <= 4);`,
      answer: "- - - * \n- - * - \n- * - - \n* - - - ",
      explanation: "Stars where i+j=5 (anti-diagonal). Row 1: j=4. Row 2: j=3. Row 3: j=2. Row 4: j=1.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "dwhile-ef-1",
      question: `int i = 0;
do {
    System.out.println(i);
} while (i < 5);`,
      error: "Missing update statement (i++) inside the loop. This creates an infinite loop because i never changes.",
      corrected: `int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 5);`,
    },
    {
      id: "dwhile-ef-2",
      question: `int i = 1;
do {
    i--;
    System.out.println(i);
} while (i <= 10);`,
      error: "The loop decrements i (i--) but checks i <= 10. This creates an infinite loop since i will never reach 10 by decrementing from 1.",
      corrected: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 10);`,
    },
    {
      id: "dwhile-ef-3",
      question: `int i = 1;
do
    System.out.println(i);
while (i <= 5);`,
      error: "Missing braces. Only `System.out.println(i)` is inside the loop. The do-while requires braces for multiple statements or proper syntax.",
      corrected: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);`,
    },
    {
      id: "dwhile-ef-4",
      question: `int i = 0;
do {
    System.out.println(i);
} while (i < 5);
System.out.println(i);`,
      error: "Variable `i` is declared inside the do-while loop and is not accessible outside it. This causes a compilation error.",
      corrected: `int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 5);
System.out.println(i);`,
    },
    {
      id: "dwhile-ef-5",
      question: `int i = 1;
do {
    System.out.println(i);
} while (i <= 10);
int i = 1;
do {
    System.out.println(i);
} while (i <= 5);`,
      error: "No error. Two separate do-while loops with the same variable name `i` are fine since each `i` is scoped to its own loop (if declared inside).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-6",
      question: `int i = 1;
do {
    if (i == 3)
        break;
    System.out.println(i);
    i++;
} while (i <= 5);`,
      error: "No error. The break statement exits the loop when i == 3. Output: 1, 2.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-7",
      question: `int i = 1;
do {
    if (i == 3)
        continue;
    System.out.println(i);
    i++;
} while (i <= 5);`,
      error: "No error. The continue statement skips iteration when i == 3. Output: 1, 2, 4, 5.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-8",
      question: `int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 5);`,
      error: "No error. This is a correct do-while loop that prints 0, 1, 2, 3, 4.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-9",
      question: `int i = 1;
do {
    System.out.println(i);
} while (i <= 5);`,
      error: "Missing update statement (i++) inside the loop. This creates an infinite loop because i never changes.",
      corrected: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);`,
    },
    {
      id: "dwhile-ef-10",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
System.out.println("After loop");`,
      error: "No error. `System.out.println(\"After loop\")` is outside the loop and runs once after the loop ends.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-11",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
do {
    System.out.println(i);
    i++;
} while (i <= 3);`,
      error: "No error. Two separate do-while loops. The second loop uses the final value of i from the first loop (i = 6), so the second loop never executes.",
      corrected: "No error, but the second loop won't execute because i = 6 after the first loop.",
    },
    {
      id: "dwhile-ef-12",
      question: `int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 5);
do {
    System.out.println(i);
    i++;
} while (i < 3);`,
      error: "No error. Two separate do-while loops with the same variable name are fine. The second loop won't execute because i = 5 after the first loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-13",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
System.out.println(i);`,
      error: "No error. The last println is outside the loop and prints the final value of i (which is 6).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-14",
      question: `int i = 1;
do {
    System.out.println(i);
}
i++;`,
      error: "Missing update statement inside the loop. The loop runs infinitely because i is never updated inside the do-while block.",
      corrected: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);`,
    },
    {
      id: "dwhile-ef-15",
      question: `int i = 5;
do {
    System.out.println(i);
} while (i >= 1);`,
      error: "Missing update statement (i--). This creates an infinite loop because i never changes.",
      corrected: `int i = 5;
do {
    System.out.println(i);
    i--;
} while (i >= 1);`,
    },
    {
      id: "dwhile-ef-16",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
int i = 10;
System.out.println(i);`,
      error: "No error. The second declaration of i is after the first do-while loop, so it's a new variable in a new scope.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-17",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
do {
    System.out.println(i);
    i++;
} while (i <= 3);`,
      error: "No error. Two separate do-while loops are fine. The second loop won't execute because i = 6 after the first loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-18",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
do {
    System.out.println(i);
    i--;
} while (i >= 1);`,
      error: "No error. Two separate do-while loops. The second loop prints 6, 5, 4, 3, 2, 1 (countdown from 6).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-19",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
System.out.println("Done");`,
      error: "No error. `System.out.println(\"Done\")` is outside the loop and runs once after the loop ends.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-20",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
System.out.println(i);`,
      error: "No error. The last println is outside the loop and prints the final value of i (6).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-21",
      question: `int i = 1;
do {
    int j = 1;
    do {
        System.out.print("* ");
        j++;
    } while (j <= 5);
    System.out.println();
    i++;
} while (i <= 5);`,
      error: "No error. This is a correct nested do-while loop that prints a 5x5 grid of stars.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "dwhile-ef-22",
      question: `int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
int j = 1;
do {
    System.out.println(j);
    j++;
} while (j <= 3);`,
      error: "No error. Two separate do-while loops with different variables are fine.",
      corrected: "No error. Code is correct.",
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    { id: "dwhile-fb-1", question: "The _____ loop checks the condition after each iteration.", answer: "do-while" },
    { id: "dwhile-fb-2", question: "A do-while loop is an _____ controlled loop.", answer: "exit" },
    { id: "dwhile-fb-3", question: "The do-while loop body executes _____ times at minimum.", answer: "one" },
    { id: "dwhile-fb-4", question: "The loop variable must be initialized _____ the do-while loop.", answer: "before" },
    { id: "dwhile-fb-5", question: "The loop variable must be updated _____ the do-while loop body.", answer: "inside" },
    { id: "dwhile-fb-6", question: "Forgetting to update the loop variable causes an _____ loop.", answer: "infinite" },
    { id: "dwhile-fb-7", question: "The condition in a do-while loop is checked _____ each iteration.", answer: "after" },
    { id: "dwhile-fb-8", question: "The _____ after while(condition) is mandatory in do-while loop.", answer: "semicolon" },
    { id: "dwhile-fb-9", question: "Do-while loops are best when you need _____ execution guaranteed.", answer: "at least one" },
    { id: "dwhile-fb-10", question: "The do-while loop continues as long as the condition is _____ .", answer: "true" },
    { id: "dwhile-fb-11", question: "The do-while loop stops when the condition becomes _____ .", answer: "false" },
    { id: "dwhile-fb-12", question: "A do-while loop can be converted to a _____ loop.", answer: "while" },
    { id: "dwhile-fb-13", question: "The do-while loop is also called a _____ loop.", answer: "post-test" },
    { id: "dwhile-fb-14", question: "In do-while loop, the body executes _____ the condition is checked.", answer: "before" },
    { id: "dwhile-fb-15", question: "If the condition is false initially, the do-while loop body executes _____ time(s).", answer: "1" },
    { id: "dwhile-fb-16", question: "The _____ statement exits the loop immediately in do-while.", answer: "break" },
    { id: "dwhile-fb-17", question: "The _____ statement skips the current iteration in do-while.", answer: "continue" },
    { id: "dwhile-fb-18", question: "In a nested do-while loop, the inner loop completes all iterations for each _____ loop iteration.", answer: "outer" },
    { id: "dwhile-fb-19", question: "Do-while loops are commonly used for _____ programs.", answer: "menu-driven" },
    { id: "dwhile-fb-20", question: "The condition in do-while is checked _____ times for n iterations.", answer: "n" },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "dwhile-mcq-1",
      question: "What type of loop is a do-while loop?",
      options: ["Entry-controlled", "Exit-controlled", "Both", "Neither"],
      answer: 1,
      explanation: "The do-while loop is exit-controlled because the condition is checked after executing the loop body.",
    },
    {
      id: "dwhile-mcq-2",
      question: "How many times does a do-while loop check the condition?",
      options: ["Once", "Twice", "Before each iteration", "After each iteration"],
      answer: 3,
      explanation: "The condition is checked after each iteration, including after the first execution.",
    },
    {
      id: "dwhile-mcq-3",
      question: "What happens if the condition is false initially in a do-while loop?",
      options: ["Loop executes once", "Loop executes infinitely", "Loop body never executes", "Compilation error"],
      answer: 0,
      explanation: "In a do-while loop, the body always executes at least once, even if the condition is false initially.",
    },
    {
      id: "dwhile-mcq-4",
      question: "What is mandatory after while(condition) in do-while loop?",
      options: ["Comma", "Period", "Semicolon", "Colon"],
      answer: 2,
      explanation: "A semicolon (;) is mandatory after while(condition) in a do-while loop. Missing it causes a compilation error.",
    },
    {
      id: "dwhile-mcq-5",
      question: "Where should the loop variable be updated in a do-while loop?",
      options: ["Before the loop", "After the loop", "Inside the loop body", "In the condition"],
      answer: 2,
      explanation: "The loop variable must be updated inside the do-while loop body.",
    },
    {
      id: "dwhile-mcq-6",
      question: "What happens if you forget to update the loop variable?",
      options: ["Compilation error", "Infinite loop", "Loop executes once", "Nothing happens"],
      answer: 1,
      explanation: "Forgetting to update the loop variable causes an infinite loop because the condition never changes.",
    },
    {
      id: "dwhile-mcq-7",
      question: "Which loop is best when you need at least one execution guaranteed?",
      options: ["for", "while", "do-while", "All are same"],
      answer: 2,
      explanation: "The do-while loop is best when you need at least one execution guaranteed, such as menu-driven programs.",
    },
    {
      id: "dwhile-mcq-8",
      question: "What is the output?\nint i = 1;\ndo {\n    System.out.print(i++);\n} while (i <= 3);",
      options: ["123", "012", "1234", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, then 2, then 3. i++ is post-increment, so it prints the current value then increments.",
    },
    {
      id: "dwhile-mcq-9",
      question: "What is the output?\nint i = 0;\ndo {\n    System.out.println(++i);\n} while (i < 3);",
      options: ["012", "123", "0123", "Compilation error"],
      answer: 1,
      explanation: "Pre-increment: i becomes 1, 2, 3 before printing. Prints 1, 2, 3.",
    },
    {
      id: "dwhile-mcq-10",
      question: "Which statement exits the loop immediately?",
      options: ["continue", "break", "return", "exit"],
      answer: 1,
      explanation: "The break statement exits the loop immediately and continues execution after the loop.",
    },
    {
      id: "dwhile-mcq-11",
      question: "Which statement skips the current iteration?",
      options: ["break", "continue", "return", "exit"],
      answer: 1,
      explanation: "The continue statement skips the current iteration and moves to the next iteration.",
    },
    {
      id: "dwhile-mcq-12",
      question: "What is the output?\nint i = 5;\ndo {\n    System.out.print(i--);\n} while (i > 0);",
      options: ["54321", "543210", "4321", "Compilation error"],
      answer: 0,
      explanation: "Prints 5, 4, 3, 2, 1. Post-decrement prints current value then decrements.",
    },
    {
      id: "dwhile-mcq-13",
      question: "What is the output?\nint i = 1;\ndo {\n    System.out.print(i++);\n} while (i <= 5);",
      options: ["12345", "01234", "1234", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, 2, 3, 4, 5. The loop runs 5 times with i = 1, 2, 3, 4, 5.",
    },
    {
      id: "dwhile-mcq-14",
      question: "Which is an exit-controlled loop?",
      options: ["while", "do-while", "Both", "Neither"],
      answer: 1,
      explanation: "The do-while loop is exit-controlled (condition checked after). while is entry-controlled.",
    },
    {
      id: "dwhile-mcq-15",
      question: "What is the output?\nint i = 0;\ndo {\n    System.out.print(i++);\n} while (i < 3);",
      options: ["012", "123", "0123", "Compilation error"],
      answer: 0,
      explanation: "Post-increment: prints 0, then 1, then 2. Loop runs while i < 3.",
    },
    {
      id: "dwhile-mcq-16",
      question: "How many times does this loop execute?\nint i = 1;\ndo {\n    i++;\n} while (i <= 10);",
      options: ["9", "10", "11", "Infinite"],
      answer: 1,
      explanation: "The loop runs 10 times with i = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. When i becomes 11, the condition fails.",
    },
    {
      id: "dwhile-mcq-17",
      question: "What is the output?\nint i = 10;\ndo {\n    System.out.print(i--);\n} while (i >= 7);",
      options: ["1098", "987", "9876", "Compilation error"],
      answer: 0,
      explanation: "Prints 10, 9, 8. Post-decrement: prints current value then decrements. Loop runs while i >= 7.",
    },
    {
      id: "dwhile-mcq-18",
      question: "Which loop guarantees at least one execution?",
      options: ["for", "while", "do-while", "All loops"],
      answer: 2,
      explanation: "The do-while loop is exit-controlled and guarantees at least one execution.",
    },
    {
      id: "dwhile-mcq-19",
      question: "What is the output?\nint i = 1;\ndo {\n    if (i == 3) break;\n    System.out.print(i);\n    i++;\n} while (i <= 5);",
      options: ["12", "12 4 5", "12345", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, 2. When i == 3, break exits the loop. 4 and 5 are never printed.",
    },
    {
      id: "dwhile-mcq-20",
      question: "What is the output?\nint i = 1;\ndo {\n    if (i == 3) continue;\n    System.out.print(i);\n    i++;\n} while (i <= 5);",
      options: ["1245", "12345", "12 45", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, 2. When i == 3, continue skips the rest. But i is never incremented, so infinite loop! This is a trick question.",
    },
    {
      id: "dwhile-mcq-21",
      question: "In a do-while loop, if the condition is always true, the loop is called:",
      options: ["Finite loop", "Infinite loop", "Conditional loop", "Empty loop"],
      answer: 1,
      explanation: "If the condition is always true and there's no break, the loop runs infinitely.",
    },
    {
      id: "dwhile-mcq-22",
      question: "What is the output?\nint i = 0;\ndo {\n    i++;\n} while (i++ < 3);\nSystem.out.println(i);",
      options: ["3", "4", "5", "Compilation error"],
      answer: 2,
      explanation: "i increments in body and in condition. After loop: i = 5. Prints 5.",
    },
    {
      id: "dwhile-mcq-23",
      question: "Which is NOT a valid loop control statement?",
      options: ["break", "continue", "exit", "return"],
      answer: 2,
      explanation: "exit is not a Java keyword. break, continue, and return are valid loop control statements.",
    },
    {
      id: "dwhile-mcq-24",
      question: "What is the output?\nint i = 5;\ndo {\n    System.out.print(i--);\n} while (i > 0);",
      options: ["54321", "543210", "4321", "Compilation error"],
      answer: 0,
      explanation: "Prints 5, 4, 3, 2, 1. Post-decrement prints current value then decrements.",
    },
    {
      id: "dwhile-mcq-25",
      question: "What is the output?\nint i = 1;\ndo {\n    System.out.print(i++);\n} while (i <= 3);",
      options: ["123", "012", "1234", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, 2, 3. The loop runs 3 times with i = 1, 2, 3.",
    },
    {
      id: "dwhile-mcq-26",
      question: "Which loop is more suitable for menu-driven programs?",
      options: ["for", "while", "do-while", "All are equal"],
      answer: 2,
      explanation: "Do-while loops are commonly used for menu-driven programs because the menu must display at least once.",
    },
    {
      id: "dwhile-mcq-27",
      question: "What is the output?\nint i = 1;\ndo {\n    System.out.println(i);\n    i += 2;\n} while (i <= 5);",
      options: ["12345", "135", "1357", "Compilation error"],
      answer: 1,
      explanation: "i starts at 1, increments by 2: 1, 3, 5. When i becomes 7, 7 <= 5 is false. Loop ends.",
    },
    {
      id: "dwhile-mcq-28",
      question: "What is the output?\nint i = 10;\ndo {\n    System.out.print(i--);\n} while (i >= 7);",
      options: ["1098", "9876", "10987", "Compilation error"],
      answer: 0,
      explanation: "Prints 10, 9, 8. Post-decrement: prints current value then decrements. Loop runs while i >= 7.",
    },
    {
      id: "dwhile-mcq-29",
      question: "In do-while loop, the condition is evaluated _____ time(s) for n iterations.",
      options: ["1", "n", "n+1", "n-1"],
      answer: 1,
      explanation: "The condition is evaluated n times: once after each iteration. Unlike while loop which evaluates n+1 times.",
    },
    {
      id: "dwhile-mcq-30",
      question: "What is the output?\nint i = 1;\ndo {\n    int j = 1;\n    do {\n        System.out.print(i * j + \" \");\n        j++;\n    } while (j <= 2);\n    i++;\n} while (i <= 3);",
      options: ["1 2 2 4 3 6", "1 2 3 4 5 6", "1 2 2 4", "Compilation error"],
      answer: 0,
      explanation: "Outer loop runs 3 times (i=1,2,3). Inner loop runs 2 times each (j=1,2). Prints: 1*1=1, 1*2=2, 2*1=2, 2*2=4, 3*1=3, 3*2=6.",
    },
  ],

  // ========== 10. TRUE/FALSE ==========
  trueFalse: [
    { id: "dwhile-tf-1", question: "The do-while loop is an exit-controlled loop.", answer: true, explanation: "The condition is checked after executing the loop body." },
    { id: "dwhile-tf-2", question: "If the condition is false initially, the do-while loop body never executes.", answer: false, explanation: "The do-while loop body always executes at least once, even if the condition is false initially." },
    { id: "dwhile-tf-3", question: "The loop variable must be initialized inside the do-while loop.", answer: false, explanation: "The loop variable must be initialized BEFORE the do-while loop." },
    { id: "dwhile-tf-4", question: "The loop variable must be updated inside the do-while loop body.", answer: true, explanation: "If not updated inside the loop, it creates an infinite loop." },
    { id: "dwhile-tf-5", question: "Forgetting to update the loop variable causes a compilation error.", answer: false, explanation: "It causes an infinite loop, not a compilation error." },
    { id: "dwhile-tf-6", question: "A do-while loop can be converted to a while loop.", answer: true, explanation: "Any do-while loop can be rewritten as a while loop (with some restructuring to ensure at least one execution)." },
    { id: "dwhile-tf-7", question: "The do-while loop is best when the number of iterations is known.", answer: false, explanation: "The for loop is best when the number of iterations is known. Do-while is best when you need at least one execution." },
    { id: "dwhile-tf-8", question: "do-while(true) creates an infinite loop.", answer: true, explanation: "do-while(true) always executes the body at least once, then continues infinitely unless there's a break inside." },
    { id: "dwhile-tf-9", question: "The break statement exits the innermost loop.", answer: true, explanation: "break exits only the innermost loop in case of nested loops." },
    { id: "dwhile-tf-10", question: "The continue statement skips the rest of the current iteration.", answer: true, explanation: "continue skips the remaining code in the current iteration and moves to the next iteration." },
    { id: "dwhile-tf-11", question: "A do-while loop can have multiple conditions using logical operators.", answer: true, explanation: "You can use && and || in the do-while condition: while(x > 0 && x < 10)." },
    { id: "dwhile-tf-12", question: "The semicolon after while(condition) is optional in do-while loop.", answer: false, explanation: "The semicolon is MANDATORY in do-while loop. Missing it causes a compilation error." },
    { id: "dwhile-tf-13", question: "Do-while loops cannot be nested.", answer: false, explanation: "Do-while loops can be nested just like while loops and for loops." },
    { id: "dwhile-tf-14", question: "The do-while loop body can contain any valid Java statements.", answer: true, explanation: "The do-while loop body can contain any valid Java code including nested loops, conditionals, etc." },
    { id: "dwhile-tf-15", question: "In a do-while loop, the update statement is part of the loop syntax.", answer: false, explanation: "Unlike for loops, the update statement is NOT part of do-while loop syntax — it must be inside the loop body." },
    { id: "dwhile-tf-16", question: "The do-while loop is also called a post-test loop.", answer: true, explanation: "The condition is tested after executing the loop body (post-test)." },
    { id: "dwhile-tf-17", question: "A do-while loop can have an empty body.", answer: true, explanation: "do {} while(true); is valid but creates an infinite loop. The braces create an empty body." },
    { id: "dwhile-tf-18", question: "The do-while loop condition is evaluated before the loop body executes.", answer: false, explanation: "The do-while loop condition is evaluated AFTER the loop body (exit-controlled)." },
    { id: "dwhile-tf-19", question: "Do-while loops are commonly used for menu-driven programs.", answer: true, explanation: "Do-while loops are perfect for menu-driven programs where the menu must display at least once." },
    { id: "dwhile-tf-20", question: "The do-while loop can only iterate forward (incrementing).", answer: false, explanation: "Do-while loops can iterate in any direction — forward (i++), backward (i--), or any custom update." },
  ],

  // ========== 11. SHORT ANSWER QUESTIONS ==========
  shortAnswerQuestions: [
    { id: "dwhile-sa-1", question: "What is a do-while loop?", answer: "A do-while loop is a repetition control structure that executes a block of code at least once, and then repeatedly as long as a given condition is true. It is exit-controlled, meaning the condition is checked after each iteration." },
    { id: "dwhile-sa-2", question: "What is an exit-controlled loop?", answer: "An exit-controlled loop checks the condition after executing the loop body. This means the loop body always executes at least once, even if the condition is initially false. The do-while loop is an example of an exit-controlled loop." },
    { id: "dwhile-sa-3", question: "What is an entry-controlled loop?", answer: "An entry-controlled loop checks the condition before entering the loop body. If the condition is false initially, the loop body never executes. The while loop is an example of an entry-controlled loop." },
    { id: "dwhile-sa-4", question: "What is the difference between while and do-while loops?", answer: "The while loop is entry-controlled (condition checked before), so it may not execute at all if the condition is false initially. The do-while loop is exit-controlled (condition checked after), so it always executes at least once." },
    { id: "dwhile-sa-5", question: "What happens if the condition is false initially in a do-while loop?", answer: "If the condition is false initially, the loop body still executes exactly once. After the first execution, the condition is checked and found false, so the loop ends." },
    { id: "dwhile-sa-6", question: "What is an infinite loop? How can it occur in a do-while loop?", answer: "An infinite loop is a loop that never terminates. In a do-while loop, this occurs when the condition is always true (e.g., do-while(true)) or when the loop variable is never updated so the condition never becomes false." },
    { id: "dwhile-sa-7", question: "What is the purpose of the break statement?", answer: "The break statement exits the loop immediately, regardless of the loop condition. Execution continues with the statement after the loop. It is commonly used to exit loops when a specific condition is met." },
    { id: "dwhile-sa-8", question: "What is the purpose of the continue statement?", answer: "The continue statement skips the current iteration of the loop. The remaining code in the loop body is not executed, and the loop moves to the next iteration (re-evaluating the condition)." },
    { id: "dwhile-sa-9", question: "Can a do-while loop be nested?", answer: "Yes, a do-while loop can be nested inside another do-while loop. This is called a nested do-while loop. The inner loop completes all its iterations for each single iteration of the outer loop." },
    { id: "dwhile-sa-10", question: "Why is the semicolon mandatory after while(condition) in do-while?", answer: "The semicolon is mandatory because it marks the end of the do-while statement. Without it, the compiler cannot determine where the loop ends, resulting in a compilation error." },
    { id: "dwhile-sa-11", question: "Why is the do-while loop called a post-test loop?", answer: "The do-while loop is called a post-test loop because it checks the condition AFTER executing the loop body. The body executes first, then the condition is tested." },
    { id: "dwhile-sa-12", question: "What is the output of: int i = 1; do { System.out.println(i); i++; } while(i <= 3);", answer: "The output is:\n1\n2\n3\nThe loop runs 3 times with i = 1, 2, 3. When i becomes 4, the condition 4 <= 3 is false, and the loop ends." },
    { id: "dwhile-sa-13", question: "What is the difference between break and continue?", answer: "break exits the loop completely — execution continues after the loop. continue skips only the current iteration — the loop continues with the next iteration." },
    { id: "dwhile-sa-14", question: "When should you use a do-while loop instead of a while loop?", answer: "Use a do-while loop when you need the loop body to execute at least once, such as menu-driven programs, input validation, or any situation where the first execution is mandatory regardless of the condition." },
    { id: "dwhile-sa-15", question: "What is a loop variable?", answer: "A loop variable is a variable that controls the execution of a loop. It is initialized before the loop, its value is checked in the loop condition, and it is updated inside the loop body. In a do-while loop, the loop variable must be managed manually." },
    { id: "dwhile-sa-16", question: "What is the output of: int i = 5; do { System.out.print(i--); } while(i > 0);", answer: "The output is: 54321. The loop prints the current value of i, then decrements it. It runs while i > 0, so it prints 5, 4, 3, 2, 1." },
    { id: "dwhile-sa-17", question: "Can a do-while loop have multiple conditions?", answer: "Yes, a do-while loop can have multiple conditions combined using logical operators (&&, ||). For example: while(x > 0 && x < 10) checks both conditions." },
    { id: "dwhile-sa-18", question: "What happens if you use do-while(true) without a break?", answer: "The loop runs infinitely because the condition is always true. The program will never exit the loop unless there's a break statement or the program is forcibly terminated." },
    { id: "dwhile-sa-19", question: "What is the output of: int i = 0; do { System.out.print(i++); } while(i < 3);", answer: "The output is: 012. Post-increment: prints 0, then 1, then 2. Loop runs while i < 3." },
    { id: "dwhile-sa-20", question: "Why is it important to update the loop variable in the correct direction?", answer: "The loop variable must be updated in the direction that makes the condition eventually false. If you're counting up (i <= 10), you must increment (i++). If you're counting down (i >= 1), you must decrement (i--). Updating in the wrong direction causes an infinite loop." },
  ],

  // ========== 12. LONG ANSWER QUESTIONS ==========
  longAnswerQuestions: [
    {
      id: "dwhile-la-1",
      question: "Explain the do-while loop in Java with syntax and a complete example.",
      answer: "The do-while loop is a repetition control structure that executes a block of code at least once, and then repeatedly as long as a condition is true.\n\nSyntax:\n// Initialization (before loop)\ni = initialValue;\ndo {\n    // code to execute\n    // update statement\n} while (condition);  // Note: semicolon is mandatory\n\nExample:\nint i = 1;\ndo {\n    System.out.println(i);\n    i++;\n} while (i <= 5);\nOutput: 1 2 3 4 5\n\nExecution flow:\n1. Initialize i = 1 before the loop.\n2. Execute loop body (do-while always executes at least once). Print 1. Update: i++ → i = 2.\n3. Check condition: 2 <= 5 is true. Execute body again. Print 2. i++ → i = 3.\n4. Continue until i = 5. Print 5. i++ → i = 6.\n5. Check: 6 <= 5 is false. Loop ends.\n\nKey points:\n- Exit-controlled: condition checked after each iteration.\n- Loop body always executes at least once.\n- Semicolon after while(condition) is mandatory.\n- Loop variable must be initialized before and updated inside the loop.",
    },
    {
      id: "dwhile-la-2",
      question: "What is an infinite loop? How can it occur in a do-while loop? How can you prevent it?",
      answer: "An infinite loop is a loop that never terminates because the loop condition is always true or the loop variable is never updated in the correct direction.\n\nHow it occurs in do-while loops:\n1. Using do-while(true) without a break statement.\n2. Forgetting to update the loop variable inside the loop.\n3. Updating the loop variable in the wrong direction (e.g., i++ when condition is i >= 10).\n4. Using a condition that's always true (e.g., while(5 > 3)).\n\nExample of infinite loop:\nint i = 1;\ndo {\n    System.out.println(i);\n    // Missing i++ causes infinite loop\n} while (i <= 10);\n\nHow to prevent:\n1. Always update the loop variable inside the loop body.\n2. Ensure the update is in the correct direction (increment for i <= n, decrement for i >= n).\n3. Use a boolean flag to control the loop: do { ... } while(running);\n4. Add a safety counter in development to detect infinite loops.\n5. Use break statements to exit when a specific condition is met.",
    },
    {
      id: "dwhile-la-3",
      question: "Compare and contrast while loop and do-while loop.",
      answer: "WHILE LOOP:\n- Entry-controlled: condition checked BEFORE loop body.\n- If condition is false initially, loop body never executes (0 iterations possible).\n- Syntax: while(condition) { ... }\n- Use when: number of iterations is unknown, may be zero.\n- Condition checked: n+1 times for n iterations.\n\nDO-WHILE LOOP:\n- Exit-controlled: condition checked AFTER loop body.\n- Loop body always executes at least once (minimum 1 iteration).\n- Syntax: do { ... } while(condition);\n- Use when: you need at least one execution, like menus.\n- Condition checked: n times for n iterations.\n- Semicolon after while(condition) is mandatory.\n\nExample comparison:\n// While loop\nint i = 6;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}\n// Output: (nothing - 0 iterations)\n\n// Do-while loop\nint i = 6;\ndo {\n    System.out.println(i);\n    i++;\n} while (i <= 5);\n// Output: 6 (executes once even though condition is false)\n\nKey difference: while checks first, do-while executes first then checks.",
    },
    {
      id: "dwhile-la-4",
      question: "Explain nested do-while loops with an example to print a pattern.",
      answer: "Nested do-while loops are do-while loops inside other do-while loops. The inner loop completes all its iterations for each single iteration of the outer loop.\n\nExample: Print a 3x3 grid of stars\n\nint i = 1;\ndo {  // Outer loop: controls rows\n    int j = 1;\n    do {  // Inner loop: controls columns\n        System.out.print('* ');\n        j++;\n    } while (j <= 3);\n    System.out.println();  // New line after each row\n    i++;\n} while (i <= 3);\n\nOutput:\n* * *\n* * *\n* * *\n\nExecution trace:\n- i = 1: Inner loop prints '* ' three times. New line.\n- i = 2: Inner loop prints '* ' three times. New line.\n- i = 3: Inner loop prints '* ' three times. New line.\n- i = 4: Outer loop ends.\n\nKey points:\n- The inner loop variable (j) must be re-initialized for each outer loop iteration.\n- Total iterations = outer iterations × inner iterations = 3 × 3 = 9.\n- For pattern printing, the inner loop's limit often depends on the outer loop variable.",
    },
    {
      id: "dwhile-la-5",
      question: "Write a program using do-while loop to check if a number is prime.",
      answer: "A prime number is a number greater than 1 that has no divisors other than 1 and itself.\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter a number: ');\n        int num = sc.nextInt();\n        \n        boolean isPrime = true;\n        int i = 2;\n        do {\n            if (num % i == 0) {\n                isPrime = false;\n                break;  // Exit early if divisor found\n            }\n            i++;\n        } while (i <= num / 2);\n        \n        if (isPrime && num > 1) {\n            System.out.println(num + ' is prime.');\n        } else {\n            System.out.println(num + ' is not prime.');\n        }\n        sc.close();\n    }\n}\n\nExplanation:\n1. We only need to check divisors up to num/2.\n2. If any divisor is found, isPrime = false and break exits the loop early.\n3. If no divisor found, the number is prime.\n4. Special case: 1 is not prime, 2 is the only even prime.\n\nExample: num = 17\n- Check: 17 % 2 = 1 (not 0), 17 % 3 = 2, ..., 17 % 8 = 1\n- No divisors found. isPrime remains true. Output: '17 is prime.'",
    },
    {
      id: "dwhile-la-6",
      question: "Write a program using do-while loop to reverse a number.",
      answer: "To reverse a number, we extract digits from right to left and build the reversed number.\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter a number: ');\n        int num = sc.nextInt();\n        int original = num;\n        int reversed = 0;\n        \n        do {\n            int digit = num % 10;  // Extract last digit\n            reversed = reversed * 10 + digit;  // Build reversed number\n            num = num / 10;  // Remove last digit\n        } while (num > 0);\n        \n        System.out.println('Original: ' + original);\n        System.out.println('Reversed: ' + reversed);\n        sc.close();\n    }\n}\n\nExample: num = 12345\n- Iteration 1: digit = 5, reversed = 5, num = 1234\n- Iteration 2: digit = 4, reversed = 54, num = 123\n- Iteration 3: digit = 3, reversed = 543, num = 12\n- Iteration 4: digit = 2, reversed = 5432, num = 1\n- Iteration 5: digit = 1, reversed = 54321, num = 0\n- Loop ends. Output: Reversed: 54321\n\nKey insight: reversed * 10 shifts digits left, then + digit adds the new digit.",
    },
    {
      id: "dwhile-la-7",
      question: "Write a program using do-while loop to calculate the sum of digits of a number.",
      answer: "To calculate the sum of digits, we extract each digit using % 10 and add it to a sum variable.\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter a number: ');\n        int num = sc.nextInt();\n        int sum = 0;\n        \n        do {\n            int digit = num % 10;  // Extract last digit\n            sum = sum + digit;  // Add to sum\n            num = num / 10;  // Remove last digit\n        } while (num > 0);\n        \n        System.out.println('Sum of digits: ' + sum);\n        sc.close();\n    }\n}\n\nExample: num = 12345\n- Iteration 1: digit = 5, sum = 5, num = 1234\n- Iteration 2: digit = 4, sum = 9, num = 123\n- Iteration 3: digit = 3, sum = 12, num = 12\n- Iteration 4: digit = 2, sum = 14, num = 1\n- Iteration 5: digit = 1, sum = 15, num = 0\n- Loop ends. Output: Sum of digits: 15",
    },
    {
      id: "dwhile-la-8",
      question: "Explain how to use a do-while loop for a menu-driven program.",
      answer: "A menu-driven program displays a menu at least once, then repeatedly until the user chooses to exit. A do-while loop is perfect for this because it guarantees the menu displays at least once.\n\nStructure:\n1. Initialize choice variable.\n2. do {\n3.     Display the menu.\n4.     Read user choice.\n5.     Process the choice.\n6. } while (choice != exitOption);\n7. Display exit message.\n\nExample:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int choice;\n        \n        do {\n            System.out.println('\\n--- MENU ---');\n            System.out.println('1. Add');\n            System.out.println('2. Subtract');\n            System.out.println('3. Multiply');\n            System.out.println('4. Exit');\n            System.out.print('Enter choice: ');\n            choice = sc.nextInt();\n            \n            switch (choice) {\n                case 1: System.out.println('Addition selected'); break;\n                case 2: System.out.println('Subtraction selected'); break;\n                case 3: System.out.println('Multiplication selected'); break;\n                case 4: System.out.println('Exiting...'); break;\n                default: System.out.println('Invalid choice');\n            }\n        } while (choice != 4);\n        \n        System.out.println('Thank you!');\n        sc.close();\n    }\n}\n\nKey advantage: The menu displays at least once, even if the user immediately chooses to exit.",
    },
    {
      id: "dwhile-la-9",
      question: "What is the output of the following code? Trace it step by step.\nint i = 1;\ndo {\n    int j = 1;\n    do {\n        System.out.print(i * j + ' ');\n        j++;\n    } while (j <= 2);\n    System.out.println();\n    i++;\n} while (i <= 3);",
      answer: "Output:\n1 2\n2 4\n3 6\n\nTrace:\n- i = 1: Inner loop j=1 prints '1*1=1 ', j=2 prints '1*2=2 '. New line. i becomes 2.\n- i = 2: Inner loop j=1 prints '2*1=2 ', j=2 prints '2*2=4 '. New line. i becomes 3.\n- i = 3: Inner loop j=1 prints '3*1=3 ', j=2 prints '3*2=6 '. New line. i becomes 4.\n- i = 4: Outer loop condition 4 <= 3 is false. Loop ends.\n\nKey insight: The inner loop runs completely for each outer loop iteration. Total: 3 outer × 2 inner = 6 prints.",
    },
    {
      id: "dwhile-la-10",
      question: "Write a program using do-while loop to print the Fibonacci series up to n terms.",
      answer: "The Fibonacci series is a sequence where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, ...\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter number of terms: ');\n        int n = sc.nextInt();\n        \n        int a = 0, b = 1;\n        System.out.print(a + ' ' + b);  // Print first two terms\n        \n        int i = 3;  // Start from 3rd term\n        do {\n            int c = a + b;\n            System.out.print(' ' + c);\n            a = b;\n            b = c;\n            i++;\n        } while (i <= n);\n        \n        sc.close();\n    }\n}\n\nExample: n = 10\nOutput: 0 1 1 2 3 5 8 13 21 34\n\nExplanation:\n- Start with a = 0, b = 1.\n- Each new term c = a + b.\n- Update: a = b, b = c.\n- Repeat until we have n terms.\n\nTrace for first few terms:\n- i = 3: c = 0+1 = 1. Print 1. a=1, b=1.\n- i = 4: c = 1+1 = 2. Print 2. a=1, b=2.\n- i = 5: c = 1+2 = 3. Print 3. a=2, b=3.",
    },
    {
      id: "dwhile-la-11",
      question: "What is a sentinel value? Give an example of a sentinel-controlled do-while loop.",
      answer: "A sentinel value is a special value that signals the end of input. It is a value that would not normally be part of the data. The loop continues reading input until the sentinel value is encountered.\n\nCommon sentinel values:\n- -1 for positive numbers\n- 0 for positive numbers\n- 'quit' or 'exit' for strings\n- 999 for test scores\n\nExample: Read integers until -1 is entered, then calculate the sum.\n\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int sum = 0;\n        int num;\n        \n        do {\n            System.out.print('Enter a number (-1 to stop): ');\n            num = sc.nextInt();\n            \n            if (num != -1) {\n                sum = sum + num;\n            }\n        } while (num != -1);\n        \n        System.out.println('Sum: ' + sum);\n        sc.close();\n    }\n}\n\nHow it works:\n1. Read a number.\n2. While the number is not -1 (sentinel), add it to sum and read the next number.\n3. When -1 is entered, the loop ends and the sum is displayed.\n\nExample run:\nEnter a number: 5\nEnter a number: 10\nEnter a number: 3\nEnter a number: -1\nSum: 18",
    },
    {
      id: "dwhile-la-12",
      question: "Explain the difference between while(i++ < 3) and while(++i < 3) with examples in do-while context.",
      answer: "The difference is between post-increment (i++) and pre-increment (++i).\n\nPost-increment (i++):\n- Uses the current value of i for the comparison.\n- Then increments i.\n\nPre-increment (++i):\n- Increments i first.\n- Then uses the new value for the comparison.\n\nExample 1: do { ... } while(i++ < 3) with i starting at 0\n- Iteration 1: Execute body. Compare 0<3 (true, i becomes 1)\n- Iteration 2: Execute body. Compare 1<3 (true, i becomes 2)\n- Iteration 3: Execute body. Compare 2<3 (true, i becomes 3)\n- Iteration 4: Execute body. Compare 3<3 (false, i becomes 4)\n- Loop ends\n\nExample 2: do { ... } while(++i < 3) with i starting at 0\n- Iteration 1: Execute body. i becomes 1. Compare 1<3 (true)\n- Iteration 2: Execute body. i becomes 2. Compare 2<3 (true)\n- Iteration 3: Execute body. i becomes 3. Compare 3<3 (false)\n- Loop ends\n\nKey difference:\n- i++ < 3: runs 4 times (i = 0, 1, 2, 3)\n- ++i < 3: runs 3 times (i = 0, 1, 2)\n\nThe increment happens at different times, affecting when the condition becomes false.",
    },
    {
      id: "dwhile-la-13",
      question: "Write a program using nested do-while loops to print a hollow square pattern.",
      answer: "A hollow square prints stars on the border and spaces inside.\n\nProgram:\npublic class Main {\n    public static void main(String[] args) {\n        int n = 5;  // Size of square\n        int i = 1;\n        \n        do {\n            int j = 1;\n            do {\n                // Print star on border, space inside\n                if (i == 1 || i == n || j == 1 || j == n) {\n                    System.out.print('* ');\n                } else {\n                    System.out.print('  ');\n                }\n                j++;\n            } while (j <= n);\n            System.out.println();\n            i++;\n        } while (i <= n);\n    }\n}\n\nOutput for n = 5:\n* * * * *\n*       *\n*       *\n*       *\n* * * * *\n\nExplanation:\n- Outer loop (i) controls rows from 1 to 5.\n- Inner loop (j) controls columns from 1 to 5.\n- Condition: if i is 1 or 5 (first/last row) OR j is 1 or 5 (first/last column), print star.\n- Otherwise, print spaces to create the hollow effect.\n\nKey insight: The condition checks if we're on the boundary of the square.",
    },
    {
      id: "dwhile-la-14",
      question: "What is the output? Trace the code.\nint i = 1;\ndo {\n    int j = 1;\n    do {\n        System.out.print(j + ' ');\n        j++;\n    } while (j <= i);\n    System.out.println();\n    i++;\n} while (i <= 5);",
      answer: "Output:\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n\nTrace:\n- i = 1: j goes 1 to 1. Prints '1 '. New line. i becomes 2.\n- i = 2: j goes 1 to 2. Prints '1 2 '. New line. i becomes 3.\n- i = 3: j goes 1 to 3. Prints '1 2 3 '. New line. i becomes 4.\n- i = 4: j goes 1 to 4. Prints '1 2 3 4 '. New line. i becomes 5.\n- i = 5: j goes 1 to 5. Prints '1 2 3 4 5 '. New line. i becomes 6.\n- i = 6: Outer loop condition 6 <= 5 is false. Loop ends.\n\nKey pattern: Row i prints numbers from 1 to i. This creates a right-angled triangle of numbers.",
    },
    {
      id: "dwhile-la-15",
      question: "Write a program using do-while loop to find the sum of first n natural numbers.",
      answer: "A program to calculate the sum of the first n natural numbers (1 + 2 + 3 + ... + n).\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter n: ');\n        int n = sc.nextInt();\n        \n        int sum = 0;\n        int i = 1;\n        do {\n            sum = sum + i;\n            i++;\n        } while (i <= n);\n        \n        System.out.println('Sum of first ' + n + ' natural numbers = ' + sum);\n        sc.close();\n    }\n}\n\nExample: n = 10\nOutput: Sum of first 10 natural numbers = 55\n\nTrace:\n- i = 1: sum = 0 + 1 = 1\n- i = 2: sum = 1 + 2 = 3\n- i = 3: sum = 3 + 3 = 6\n- i = 4: sum = 6 + 4 = 10\n- ...\n- i = 10: sum = 45 + 10 = 55\n- i = 11: Loop ends\n\nFormula verification: Sum = n(n+1)/2 = 10(11)/2 = 55 ✓",
    },
  ],

  // ========== 13. PROGRAMMING QUESTIONS ==========
  programmingQuestions: {
    easy: [
      {
        id: "dwhile-pg-e-1",
        question: "Write a program using do-while loop to print numbers from 1 to n.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = 1;
        do {
            System.out.println(i);
            i++;
        } while (i <= n);
        sc.close();
    }
}`,
        output: "Enter n: 5\n1\n2\n3\n4\n5",
      },
      {
        id: "dwhile-pg-e-2",
        question: "Write a program using do-while loop to print even numbers from 1 to n.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = 2;
        do {
            System.out.println(i);
            i += 2;
        } while (i <= n);
        sc.close();
    }
}`,
        output: "Enter n: 10\n2\n4\n6\n8\n10",
      },
      {
        id: "dwhile-pg-e-3",
        question: "Write a program using do-while loop to calculate the sum of first n natural numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int sum = 0;
        int i = 1;
        do {
            sum = sum + i;
            i++;
        } while (i <= n);
        System.out.println("Sum = " + sum);
        sc.close();
    }
}`,
        output: "Enter n: 10\nSum = 55",
      },
      {
        id: "dwhile-pg-e-4",
        question: "Write a program using do-while loop to print the multiplication table of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        int i = 1;
        do {
            System.out.println(num + " x " + i + " = " + (num * i));
            i++;
        } while (i <= 10);
        sc.close();
    }
}`,
        output: "Enter number: 7\n7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70",
      },
      {
        id: "dwhile-pg-e-5",
        question: "Write a program using do-while loop to print numbers in reverse from n to 1.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = n;
        do {
            System.out.println(i);
            i--;
        } while (i >= 1);
        sc.close();
    }
}`,
        output: "Enter n: 5\n5\n4\n3\n2\n1",
      },
      {
        id: "dwhile-pg-e-6",
        question: "Write a program using do-while loop to calculate the factorial of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int factorial = 1;
        int i = 1;
        do {
            factorial = factorial * i;
            i++;
        } while (i <= num);
        System.out.println(num + "! = " + factorial);
        sc.close();
    }
}`,
        output: "Enter a number: 6\n6! = 720",
      },
      {
        id: "dwhile-pg-e-7",
        question: "Write a program using do-while loop to print odd numbers from 1 to n.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = 1;
        do {
            System.out.println(i);
            i += 2;
        } while (i <= n);
        sc.close();
    }
}`,
        output: "Enter n: 10\n1\n3\n5\n7\n9",
      },
      {
        id: "dwhile-pg-e-8",
        question: "Write a program using do-while loop to count the number of digits in a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int count = 0;
        do {
            count++;
            num = num / 10;
        } while (num > 0);
        System.out.println("Number of digits: " + count);
        sc.close();
    }
}`,
        output: "Enter a number: 12345\nNumber of digits: 5",
      },
      {
        id: "dwhile-pg-e-9",
        question: "Write a program using do-while loop to print the reverse of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int reversed = 0;
        do {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num = num / 10;
        } while (num > 0);
        System.out.println("Reversed: " + reversed);
        sc.close();
    }
}`,
        output: "Enter a number: 12345\nReversed: 54321",
      },
      {
        id: "dwhile-pg-e-10",
        question: "Write a program using do-while loop to display a menu until the user chooses to exit.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        
        do {
            System.out.println("\\n=== MENU ===");
            System.out.println("1. Option 1");
            System.out.println("2. Option 2");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            
            switch (choice) {
                case 1: System.out.println("Option 1 selected"); break;
                case 2: System.out.println("Option 2 selected"); break;
                case 3: System.out.println("Exiting..."); break;
                default: System.out.println("Invalid choice");
            }
        } while (choice != 3);
        
        sc.close();
    }
}`,
        output: "Menu displays until user chooses 3",
      },
    ],
    medium: [
      {
        id: "dwhile-pg-m-1",
        question: "Write a program using do-while loop to check if a number is prime.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        boolean isPrime = true;
        int i = 2;
        do {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
            i++;
        } while (i <= num / 2);
        if (isPrime && num > 1) {
            System.out.println(num + " is prime.");
        } else {
            System.out.println(num + " is not prime.");
        }
        sc.close();
    }
}`,
        output: "Enter a number: 17\n17 is prime.",
      },
      {
        id: "dwhile-pg-m-2",
        question: "Write a program using do-while loop to generate the Fibonacci series up to n terms.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int a = 0, b = 1;
        System.out.print(a + " " + b);
        int i = 3;
        do {
            int c = a + b;
            System.out.print(" " + c);
            a = b;
            b = c;
            i++;
        } while (i <= n);
        sc.close();
    }
}`,
        output: "Enter n: 10\n0 1 1 2 3 5 8 13 21 34",
      },
      {
        id: "dwhile-pg-m-3",
        question: "Write a program using do-while loop to check if a number is an Armstrong number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num;
        int sum = 0;
        do {
            int digit = num % 10;
            sum = sum + (digit * digit * digit);
            num = num / 10;
        } while (num > 0);
        if (sum == original) {
            System.out.println(original + " is Armstrong.");
        } else {
            System.out.println(original + " is not Armstrong.");
        }
        sc.close();
    }
}`,
        output: "Enter a number: 153\n153 is Armstrong.",
      },
      {
        id: "dwhile-pg-m-4",
        question: "Write a program using do-while loop to check if a number is a palindrome.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num;
        int reversed = 0;
        do {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num = num / 10;
        } while (num > 0);
        if (reversed == original) {
            System.out.println(original + " is palindrome.");
        } else {
            System.out.println(original + " is not palindrome.");
        }
        sc.close();
    }
}`,
        output: "Enter a number: 1221\n1221 is palindrome.",
      },
      {
        id: "dwhile-pg-m-5",
        question: "Write a program using do-while loop to calculate the sum of digits of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int sum = 0;
        do {
            int digit = num % 10;
            sum = sum + digit;
            num = num / 10;
        } while (num > 0);
        System.out.println("Sum of digits = " + sum);
        sc.close();
    }
}`,
        output: "Enter a number: 12345\nSum of digits = 15",
      },
      {
        id: "dwhile-pg-m-6",
        question: "Write a program using do-while loop to print all Armstrong numbers from 1 to 1000.",
        solution: `public class Main {
    public static void main(String[] args) {
        int num = 1;
        do {
            int original = num;
            int sum = 0;
            int temp = num;
            do {
                int digit = temp % 10;
                sum = sum + (digit * digit * digit);
                temp = temp / 10;
            } while (temp > 0);
            if (sum == num) {
                System.out.print(num + " ");
            }
            num++;
        } while (num <= 1000);
    }
}`,
        output: "1 153 370 371 407 ",
      },
      {
        id: "dwhile-pg-m-7",
        question: "Write a program using do-while loop to print all palindrome numbers from 100 to 200.",
        solution: `public class Main {
    public static void main(String[] args) {
        int num = 100;
        do {
            int original = num;
            int reversed = 0;
            int temp = num;
            do {
                int digit = temp % 10;
                reversed = reversed * 10 + digit;
                temp = temp / 10;
            } while (temp > 0);
            if (reversed == original) {
                System.out.print(num + " ");
            }
            num++;
        } while (num <= 200);
    }
}`,
        output: "101 111 121 131 141 151 161 171 181 191 ",
      },
      {
        id: "dwhile-pg-m-8",
        question: "Write a program using do-while loop to implement a simple menu-driven calculator.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        
        do {
            System.out.println("\\n=== CALCULATOR ===");
            System.out.println("1. Add");
            System.out.println("2. Subtract");
            System.out.println("3. Multiply");
            System.out.println("4. Divide");
            System.out.println("5. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            
            if (choice >= 1 && choice <= 4) {
                System.out.print("Enter two numbers: ");
                double a = sc.nextDouble();
                double b = sc.nextDouble();
                
                switch (choice) {
                    case 1: System.out.println("Result: " + (a + b)); break;
                    case 2: System.out.println("Result: " + (a - b)); break;
                    case 3: System.out.println("Result: " + (a * b)); break;
                    case 4: 
                        if (b != 0) System.out.println("Result: " + (a / b));
                        else System.out.println("Error: Division by zero");
                        break;
                }
            } else if (choice != 5) {
                System.out.println("Invalid choice");
            }
        } while (choice != 5);
        
        System.out.println("Thank you!");
        sc.close();
    }
}`,
        output: "Menu displays repeatedly until user chooses 5",
      },
      {
        id: "dwhile-pg-m-9",
        question: "Write a program using do-while loop to calculate the sum of first n odd numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int sum = 0;
        int i = 1;
        int count = 0;
        do {
            sum = sum + i;
            count++;
            i += 2;
        } while (count < n);
        System.out.println("Sum of first " + n + " odd numbers = " + sum);
        sc.close();
    }
}`,
        output: "Enter n: 5\nSum of first 5 odd numbers = 25",
      },
      {
        id: "dwhile-pg-m-10",
        question: "Write a program using do-while loop to find the GCD (Greatest Common Divisor) of two numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int originalA = a;
        int originalB = b;
        
        do {
            int temp = b;
            b = a % b;
            a = temp;
        } while (b != 0);
        
        System.out.println("GCD of " + originalA + " and " + originalB + " = " + a);
        sc.close();
    }
}`,
        output: "Enter two numbers: 48 36\nGCD of 48 and 36 = 12",
      },
    ],
    hard: [
      {
        id: "dwhile-pg-h-1",
        question: "Write a program using do-while loop to implement a complete ATM system with balance inquiry, withdrawal, deposit, and exit options.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double balance = 50000;
        int choice;
        
        do {
            System.out.println("\\n=== ATM MENU ===");
            System.out.println("1. Balance Inquiry");
            System.out.println("2. Withdrawal");
            System.out.println("3. Deposit");
            System.out.println("4. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            
            switch (choice) {
                case 1:
                    System.out.println("Balance: Rs " + balance);
                    break;
                case 2:
                    System.out.print("Enter amount: ");
                    double withdraw = sc.nextDouble();
                    if (withdraw > 0 && withdraw <= balance) {
                        if (withdraw % 100 == 0) {
                            balance = balance - withdraw;
                            System.out.println("Withdrawn: Rs " + withdraw);
                            System.out.println("Remaining: Rs " + balance);
                        } else {
                            System.out.println("Amount must be multiple of 100");
                        }
                    } else {
                        System.out.println("Insufficient balance or invalid amount");
                    }
                    break;
                case 3:
                    System.out.print("Enter amount: ");
                    double deposit = sc.nextDouble();
                    if (deposit > 0) {
                        balance = balance + deposit;
                        System.out.println("Deposited: Rs " + deposit);
                        System.out.println("New Balance: Rs " + balance);
                    } else {
                        System.out.println("Invalid amount");
                    }
                    break;
                case 4:
                    System.out.println("Thank you for using ATM!");
                    break;
                default:
                    System.out.println("Invalid choice");
            }
        } while (choice != 4);
        
        sc.close();
    }
}`,
        output: "ATM menu with balance inquiry, withdrawal, deposit, and exit",
      },
      {
        id: "dwhile-pg-h-2",
        question: "Write a program using do-while loop to print all perfect numbers from 1 to 1000.",
        solution: `public class Main {
    public static void main(String[] args) {
        int num = 1;
        do {
            int sum = 0;
            int i = 1;
            do {
                if (num % i == 0) {
                    sum = sum + i;
                }
                i++;
            } while (i < num);
            if (sum == num) {
                System.out.print(num + " ");
            }
            num++;
        } while (num <= 1000);
    }
}`,
        output: "1 6 28 496 ",
      },
      {
        id: "dwhile-pg-h-3",
        question: "Write a program using do-while loop to implement a number guessing game.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int secretNumber = 42;
        int guess;
        int attempts = 0;
        
        System.out.println("Guess the number (1-100):");
        guess = sc.nextInt();
        attempts++;
        
        do {
            if (guess < secretNumber) {
                System.out.println("Too low! Try again:");
            } else if (guess > secretNumber) {
                System.out.println("Too high! Try again:");
            } else {
                break;
            }
            guess = sc.nextInt();
            attempts++;
        } while (guess != secretNumber);
        
        System.out.println("Correct! You guessed it in " + attempts + " attempts.");
        sc.close();
    }
}`,
        output: "Guess the number: 50\nToo high! Try again: 30\nToo low! Try again: 42\nCorrect! You guessed it in 3 attempts.",
      },
      {
        id: "dwhile-pg-h-4",
        question: "Write a program using do-while loop to print the pattern:\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
        solution: `public class Main {
    public static void main(String[] args) {
        int i = 1;
        do {
            int j = 1;
            do {
                System.out.print(j + " ");
                j++;
            } while (j <= i);
            System.out.println();
            i++;
        } while (i <= 5);
    }
}`,
        output: "1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 ",
      },
      {
        id: "dwhile-pg-h-5",
        question: "Write a program using do-while loop to calculate the sum of squares of first n natural numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int sum = 0;
        int i = 1;
        do {
            sum = sum + (i * i);
            i++;
        } while (i <= n);
        System.out.println("Sum of squares = " + sum);
        sc.close();
    }
}`,
        output: "Enter n: 5\nSum of squares = 55",
      },
      {
        id: "dwhile-pg-h-6",
        question: "Write a program using do-while loop to check if a number is a Strong number (sum of factorials of digits equals the number).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num;
        int sum = 0;
        
        do {
            int digit = num % 10;
            int fact = 1;
            int i = 1;
            do {
                fact = fact * i;
                i++;
            } while (i <= digit);
            sum = sum + fact;
            num = num / 10;
        } while (num > 0);
        
        if (sum == original) {
            System.out.println(original + " is a Strong number.");
        } else {
            System.out.println(original + " is not a Strong number.");
        }
        sc.close();
    }
}`,
        output: "Enter a number: 145\n145 is a Strong number.",
      },
      {
        id: "dwhile-pg-h-7",
        question: "Write a program using do-while loop to print the pattern:\n* * * * *\n*       *\n*       *\n*       *\n* * * * *",
        solution: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int i = 1;
        do {
            int j = 1;
            do {
                if (i == 1 || i == n || j == 1 || j == n) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
                j++;
            } while (j <= n);
            System.out.println();
            i++;
        } while (i <= n);
    }
}`,
        output: "* * * * *\n*       *\n*       *\n*       *\n* * * * *",
      },
      {
        id: "dwhile-pg-h-8",
        question: "Write a program using do-while loop to find the LCM (Least Common Multiple) of two numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int lcm = (a > b) ? a : b;
        
        do {
            if (lcm % a == 0 && lcm % b == 0) {
                System.out.println("LCM of " + a + " and " + b + " = " + lcm);
                break;
            }
            lcm++;
        } while (true);
        
        sc.close();
    }
}`,
        output: "Enter two numbers: 12 18\nLCM of 12 and 18 = 36",
      },
      {
        id: "dwhile-pg-h-9",
        question: "Write a program using do-while loop to print the pattern:\n    *\n   * *\n  * * *\n * * * *\n* * * * *",
        solution: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int i = 1;
        do {
            int j = 1;
            do {
                System.out.print("  ");
                j++;
            } while (j <= n - i);
            int k = 1;
            do {
                System.out.print("* ");
                k++;
            } while (k <= i);
            System.out.println();
            i++;
        } while (i <= n);
    }
}`,
        output: "    * \n   * * \n  * * * \n * * * * \n* * * * * ",
      },
      {
        id: "dwhile-pg-h-10",
        question: "Write a program using do-while loop to read integers until a negative number is entered, then find the maximum and minimum.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter numbers (negative to stop): ");
        int num = sc.nextInt();
        int max = num;
        int min = num;
        int count = 0;
        
        do {
            if (num > max) max = num;
            if (num < min) min = num;
            count++;
            num = sc.nextInt();
        } while (num >= 0);
        
        if (count > 0) {
            System.out.println("\\n=== ANALYSIS ===");
            System.out.println("Count: " + count);
            System.out.println("Maximum: " + max);
            System.out.println("Minimum: " + min);
        }
        sc.close();
    }
}`,
        output: "Enter numbers: 5 10 3 8 -1\nMaximum: 10\nMinimum: 3\nCount: 4",
      },
    ],
  },

  // ========== 14. CHALLENGE PROBLEMS ==========
  challengeProblems: [
    {
      id: "dwhile-cp-1",
      title: "Number Guessing Game",
      question: "Create a number guessing game where the computer generates a random number between 1 and 100, and the player has to guess it. Provide hints (too high/too low) and count the number of attempts.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int secretNumber = 42;  // In real game, use: (int)(Math.random() * 100) + 1;
        int guess;
        int attempts = 0;
        
        System.out.println("Guess the number (1-100):");
        guess = sc.nextInt();
        attempts++;
        
        do {
            if (guess < secretNumber) {
                System.out.println("Too low! Try again:");
            } else if (guess > secretNumber) {
                System.out.println("Too high! Try again:");
            }
            guess = sc.nextInt();
            attempts++;
        } while (guess != secretNumber);
        
        System.out.println("Correct! You guessed it in " + attempts + " attempts.");
        sc.close();
    }
}`,
      output: "Guess: 50\nToo high! Try again: 25\nToo low! Try again: 37\nToo low! Try again: 42\nCorrect! You guessed it in 4 attempts.",
    },
    {
      id: "dwhile-cp-2",
      title: "Complete Banking System",
      question: "Implement a banking system with do-while loop that allows users to check balance, deposit, withdraw, and exit. Validate all inputs and maintain the balance.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double balance = 10000;
        int choice;
        
        do {
            System.out.println("\\n=== BANKING ===");
            System.out.println("1. Check Balance");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Exit");
            System.out.print("Choice: ");
            choice = sc.nextInt();
            
            switch (choice) {
                case 1:
                    System.out.println("Balance: Rs " + balance);
                    break;
                case 2:
                    System.out.print("Amount: ");
                    double dep = sc.nextDouble();
                    if (dep > 0) {
                        balance += dep;
                        System.out.println("Deposited: Rs " + dep);
                    } else {
                        System.out.println("Invalid amount");
                    }
                    break;
                case 3:
                    System.out.print("Amount: ");
                    double wit = sc.nextDouble();
                    if (wit > 0 && wit <= balance) {
                        balance -= wit;
                        System.out.println("Withdrawn: Rs " + wit);
                    } else {
                        System.out.println("Insufficient balance");
                    }
                    break;
                case 4:
                    System.out.println("Thank you!");
                    break;
                default:
                    System.out.println("Invalid choice");
            }
        } while (choice != 4);
        
        sc.close();
    }
}`,
      output: "Banking menu with balance, deposit, withdraw, and exit",
    },
    {
      id: "dwhile-cp-3",
      title: "Password Validator",
      question: "Create a program that asks the user to enter a password. The password must be at least 8 characters long and contain at least one digit. Keep asking until a valid password is entered.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String password;
        
        do {
            System.out.print("Enter password (min 8 chars, at least 1 digit): ");
            password = sc.next();
            
            boolean hasDigit = false;
            int i = 0;
            do {
                if (Character.isDigit(password.charAt(i))) {
                    hasDigit = true;
                    break;
                }
                i++;
            } while (i < password.length());
            
            if (password.length() < 8) {
                System.out.println("Password must be at least 8 characters.");
            } else if (!hasDigit) {
                System.out.println("Password must contain at least one digit.");
            } else {
                System.out.println("Password accepted!");
            }
        } while (password.length() < 8 || !hasDigit);
        
        sc.close();
    }
}`,
      output: "Prompts until valid password is entered",
    },
    {
      id: "dwhile-cp-4",
      title: "Number System Converter",
      question: "Create a menu-driven program that converts numbers between decimal, binary, octal, and hexadecimal systems. Continue until the user chooses to exit.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        
        do {
            System.out.println("\\n=== NUMBER SYSTEM CONVERTER ===");
            System.out.println("1. Decimal to Binary");
            System.out.println("2. Decimal to Octal");
            System.out.println("3. Decimal to Hexadecimal");
            System.out.println("4. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            
            if (choice >= 1 && choice <= 3) {
                System.out.print("Enter decimal number: ");
                int num = sc.nextInt();
                
                switch (choice) {
                    case 1:
                        System.out.print("Binary: ");
                        int temp = num;
                        String binary = "";
                        do {
                            binary = (temp % 2) + binary;
                            temp = temp / 2;
                        } while (temp > 0);
                        System.out.println(binary);
                        break;
                    case 2:
                        System.out.print("Octal: ");
                        temp = num;
                        String octal = "";
                        do {
                            octal = (temp % 8) + octal;
                            temp = temp / 8;
                        } while (temp > 0);
                        System.out.println(octal);
                        break;
                    case 3:
                        System.out.print("Hexadecimal: ");
                        temp = num;
                        String hex = "";
                        do {
                            int rem = temp % 16;
                            hex = (rem < 10 ? rem : (char)(rem + 55)) + hex;
                            temp = temp / 16;
                        } while (temp > 0);
                        System.out.println(hex);
                        break;
                }
            } else if (choice != 4) {
                System.out.println("Invalid choice");
            }
        } while (choice != 4);
        
        System.out.println("Thank you!");
        sc.close();
    }
}`,
      output: "Menu-driven converter with decimal to binary/octal/hex",
    },
    {
      id: "dwhile-cp-5",
      title: "Student Grade Management System",
      question: "Create a program that allows a teacher to enter marks for multiple students. For each student, calculate the grade and average. Continue until the teacher enters -1 for student ID.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int studentId;
        int totalStudents = 0;
        double totalMarks = 0;
        
        System.out.println("Enter student marks (-1 to stop):");
        System.out.print("Student ID: ");
        studentId = sc.nextInt();
        
        do {
            System.out.print("Marks: ");
            double marks = sc.nextDouble();
            totalMarks += marks;
            totalStudents++;
            
            String grade;
            if (marks >= 90) grade = "A+";
            else if (marks >= 80) grade = "A";
            else if (marks >= 70) grade = "B";
            else if (marks >= 60) grade = "C";
            else if (marks >= 50) grade = "D";
            else grade = "F";
            
            System.out.println("Grade: " + grade);
            System.out.print("\\nStudent ID: ");
            studentId = sc.nextInt();
        } while (studentId != -1);
        
        if (totalStudents > 0) {
            System.out.println("\\nClass Average: " + (totalMarks / totalStudents));
            System.out.println("Total Students: " + totalStudents);
        }
        sc.close();
    }
}`,
      output: "Enter student data until -1, then show class average",
    },
    {
      id: "dwhile-cp-6",
      title: "Electricity Bill Calculator",
      question: "Create a program that calculates electricity bills based on units consumed. The program should continue calculating for multiple customers until the user chooses to exit.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        
        do {
            System.out.print("\\nEnter units consumed: ");
            int units = sc.nextInt();
            double bill = 0;
            
            if (units <= 100) {
                bill = units * 4.0;
            } else if (units <= 300) {
                bill = 100 * 4.0 + (units - 100) * 6.0;
            } else if (units <= 500) {
                bill = 100 * 4.0 + 200 * 6.0 + (units - 300) * 8.0;
            } else {
                bill = 100 * 4.0 + 200 * 6.0 + 200 * 8.0 + (units - 500) * 10.0;
            }
            
            double surcharge = (bill > 1000) ? bill * 0.15 : 0;
            double total = bill + surcharge;
            
            System.out.println("Bill: Rs " + bill);
            System.out.println("Surcharge: Rs " + surcharge);
            System.out.println("Total: Rs " + total);
            
            System.out.print("\\nCalculate for another customer? (1=Yes/0=No): ");
            choice = sc.nextInt();
        } while (choice == 1);
        
        System.out.println("Thank you!");
        sc.close();
    }
}`,
      output: "Calculate electricity bill with slabs and surcharge",
    },
    {
      id: "dwhile-cp-7",
      title: "Pattern Printer",
      question: "Create a program that prints various patterns (pyramid, diamond, hollow square) based on user choice. Use nested do-while loops.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        
        do {
            System.out.println("\\n=== PATTERN MENU ===");
            System.out.println("1. Pyramid");
            System.out.println("2. Diamond");
            System.out.println("3. Hollow Square");
            System.out.println("4. Exit");
            System.out.print("Choice: ");
            choice = sc.nextInt();
            
            if (choice >= 1 && choice <= 3) {
                System.out.print("Enter size: ");
                int n = sc.nextInt();
                
                switch (choice) {
                    case 1:  // Pyramid
                        int i = 1;
                        do {
                            int j = 1;
                            do {
                                System.out.print("  ");
                                j++;
                            } while (j <= n - i);
                            int k = 1;
                            do {
                                System.out.print("* ");
                                k++;
                            } while (k <= 2 * i - 1);
                            System.out.println();
                            i++;
                        } while (i <= n);
                        break;
                    case 2:  // Diamond
                        i = 1;
                        do {
                            int j = 1;
                            do {
                                System.out.print("  ");
                                j++;
                            } while (j <= n - i);
                            int k = 1;
                            do {
                                System.out.print("* ");
                                k++;
                            } while (k <= 2 * i - 1);
                            System.out.println();
                            i++;
                        } while (i <= n);
                        i = n - 1;
                        do {
                            int j = 1;
                            do {
                                System.out.print("  ");
                                j++;
                            } while (j <= n - i);
                            int k = 1;
                            do {
                                System.out.print("* ");
                                k++;
                            } while (k <= 2 * i - 1);
                            System.out.println();
                            i--;
                        } while (i >= 1);
                        break;
                    case 3:  // Hollow Square
                        i = 1;
                        do {
                            int j = 1;
                            do {
                                if (i == 1 || i == n || j == 1 || j == n) {
                                    System.out.print("* ");
                                } else {
                                    System.out.print("  ");
                                }
                                j++;
                            } while (j <= n);
                            System.out.println();
                            i++;
                        } while (i <= n);
                        break;
                }
            } else if (choice != 4) {
                System.out.println("Invalid choice");
            }
        } while (choice != 4);
        
        System.out.println("Thank you!");
        sc.close();
    }
}`,
      output: "Menu-driven pattern printer with pyramid, diamond, and hollow square",
    },
    {
      id: "dwhile-cp-8",
      title: "Student Marks Analysis",
      question: "Create a program that reads marks for multiple students and calculates class average, highest marks, lowest marks, and number of students who passed/failed. Continue until -1 is entered.",
      solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks;
        int count = 0;
        int passed = 0;
        int failed = 0;
        int total = 0;
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        
        System.out.print("Enter marks (-1 to stop): ");
        marks = sc.nextInt();
        
        do {
            total += marks;
            count++;
            
            if (marks >= 40) passed++;
            else failed++;
            
            if (marks > max) max = marks;
            if (marks < min) min = marks;
            
            System.out.print("Enter marks (-1 to stop): ");
            marks = sc.nextInt();
        } while (marks != -1);
        
        if (count > 0) {
            System.out.println("\\n=== ANALYSIS ===");
            System.out.println("Total students: " + count);
            System.out.println("Average: " + (total / count));
            System.out.println("Highest: " + max);
            System.out.println("Lowest: " + min);
            System.out.println("Passed: " + passed);
            System.out.println("Failed: " + failed);
        }
        sc.close();
    }
}`,
      output: "Enter marks until -1, then show analysis",
    },
  ],

  // ========== 15. PREVIOUS YEAR QUESTIONS ==========
  previousYearQuestions: [
    {
      id: "dwhile-py-1",
      question: "(ICSE 2023) Write a program using do-while loop to display a menu until the user chooses to exit.",
      answer: "int choice;\ndo {\n    System.out.println('1. Add');\n    System.out.println('2. Subtract');\n    System.out.println('3. Exit');\n    System.out.print('Enter choice: ');\n    choice = sc.nextInt();\n    // Process choice\n} while (choice != 3);",
      explanation: "Do-while is perfect for menus because it guarantees the menu displays at least once.",
    },
    {
      id: "dwhile-py-2",
      question: "(ICSE 2023) Write a program using do-while loop to calculate the sum of first n natural numbers.",
      answer: "int sum = 0, i = 1;\ndo {\n    sum = sum + i;\n    i++;\n} while (i <= n);\nSystem.out.println(sum);",
      explanation: "Accumulator pattern: initialize sum = 0, add each number, increment i.",
    },
    {
      id: "dwhile-py-3",
      question: "(ICSE 2022) Write a program using do-while loop to check if a number is prime.",
      answer: "boolean isPrime = true;\nint i = 2;\ndo {\n    if (num % i == 0) {\n        isPrime = false;\n        break;\n    }\n    i++;\n} while (i <= num/2);",
      explanation: "Check divisors from 2 to num/2. If any divisor found, not prime.",
    },
    {
      id: "dwhile-py-4",
      question: "(ICSE 2022) Write a program using do-while loop to reverse a number.",
      answer: "int reversed = 0;\ndo {\n    int digit = num % 10;\n    reversed = reversed * 10 + digit;\n    num = num / 10;\n} while (num > 0);",
      explanation: "Extract digits from right to left and build reversed number.",
    },
    {
      id: "dwhile-py-5",
      question: "(ICSE 2021) Write a program using do-while loop to print the Fibonacci series up to n terms.",
      answer: "int a = 0, b = 1;\nSystem.out.print(a + ' ' + b);\nint i = 3;\ndo {\n    int c = a + b;\n    System.out.print(' ' + c);\n    a = b;\n    b = c;\n    i++;\n} while (i <= n);",
      explanation: "Each term is sum of two preceding terms. Start with 0, 1.",
    },
    {
      id: "dwhile-py-6",
      question: "(ICSE 2021) Write a program using do-while loop to calculate the factorial of a number.",
      answer: "int fact = 1, i = 1;\ndo {\n    fact = fact * i;\n    i++;\n} while (i <= num);\nSystem.out.println(fact);",
      explanation: "Multiply all numbers from 1 to num. Initialize fact = 1.",
    },
  ],

  // ========== 16. AI VIVA QUESTIONS ==========
  aiVivaQuestions: [
    {
      id: "dwhile-av-1",
      question: "What is a do-while loop in Java?",
      answer: "A do-while loop is a repetition control structure that executes a block of code at least once, and then repeatedly as long as a condition is true. It is exit-controlled, meaning the condition is checked after each iteration.",
    },
    {
      id: "dwhile-av-2",
      question: "What is the difference between while and do-while loops?",
      answer: "The while loop is entry-controlled (condition checked before, may not execute at all). The do-while loop is exit-controlled (condition checked after, always executes at least once).",
    },
    {
      id: "dwhile-av-3",
      question: "What happens if the condition in a do-while loop is always true?",
      answer: "The loop becomes an infinite loop and runs forever unless there's a break statement or the program is forcibly terminated. This is generally a bug.",
    },
    {
      id: "dwhile-av-4",
      question: "Can you convert a do-while loop to a while loop?",
      answer: "Yes, any do-while loop can be converted to a while loop. You need to ensure the loop body executes at least once before the while loop, or use a flag variable.",
    },
    {
      id: "dwhile-av-5",
      question: "What is an exit-controlled loop?",
      answer: "An exit-controlled loop checks the condition after executing the loop body. If the condition is false, the body has already executed once. The do-while loop is an example.",
    },
    {
      id: "dwhile-av-6",
      question: "What is a sentinel value?",
      answer: "A sentinel value is a special value that signals the end of input. For example, -1 is often used as a sentinel for positive numbers. The loop continues until the sentinel is encountered.",
    },
    {
      id: "dwhile-av-7",
      question: "What is the output of: int i = 0; do { System.out.print(i++); } while(i < 3);",
      answer: "The output is 012. Post-increment: prints 0, then 1, then 2. Loop runs while i < 3.",
    },
    {
      id: "dwhile-av-8",
      question: "Why is the do-while loop called a post-test loop?",
      answer: "Because the condition is tested AFTER executing the loop body. If the condition is false, the body has already executed once. This is also called exit-controlled.",
    },
    {
      id: "dwhile-av-9",
      question: "What is the difference between break and continue?",
      answer: "break exits the loop completely - execution continues after the loop. continue skips only the current iteration - the loop continues with the next iteration.",
    },
    {
      id: "dwhile-av-10",
      question: "When should you use a do-while loop instead of a while loop?",
      answer: "Use do-while when you need the loop body to execute at least once, such as menu-driven programs, input validation, or any situation where the first execution is mandatory.",
    },
    {
      id: "dwhile-av-11",
      question: "What is an infinite loop? How can you prevent it?",
      answer: "An infinite loop never terminates. Prevent it by: (1) always updating the loop variable, (2) ensuring the update direction matches the condition, (3) using break statements when needed, (4) avoiding do-while(true) without exit logic.",
    },
    {
      id: "dwhile-av-12",
      question: "Can a do-while loop have multiple conditions?",
      answer: "Yes, using logical operators. For example: while(x > 0 && x < 10) checks both conditions. Both must be true for the loop to continue.",
    },
    {
      id: "dwhile-av-13",
      question: "What is the output of: int i = 5; do { System.out.print(i--); } while(i > 0);",
      answer: "The output is 54321. Post-decrement: prints 5, 4, 3, 2, 1. Loop runs while i > 0.",
    },
    {
      id: "dwhile-av-14",
      question: "What is a nested do-while loop?",
      answer: "A do-while loop inside another do-while loop. The inner loop completes all its iterations for each single iteration of the outer loop. Commonly used for pattern printing.",
    },
    {
      id: "dwhile-av-15",
      question: "What is the time complexity of a do-while loop?",
      answer: "It depends on the condition. If the loop runs n times, it's O(n). If it's nested (two loops), it's O(n²). If it divides the problem size each time, it could be O(log n).",
    },
    {
      id: "dwhile-av-16",
      question: "What happens if you forget to update the loop variable?",
      answer: "The loop becomes infinite because the condition never changes. For example, if i starts at 1 and the condition is i <= 10, but i is never incremented, the loop runs forever.",
    },
    {
      id: "dwhile-av-17",
      question: "Can you use do-while(true) in Java?",
      answer: "Yes, but it creates an infinite loop. You must have a break statement inside to exit. Commonly used in menu-driven programs: do { ... } while(true); with if(choice == 4) break;",
    },
    {
      id: "dwhile-av-18",
      question: "What is the scope of a variable declared inside a do-while loop?",
      answer: "A variable declared inside the do-while loop (like int j = 1) is only accessible within that loop. It cannot be accessed outside the loop.",
    },
    {
      id: "dwhile-av-19",
      question: "What is the output of: int i = 1; do { System.out.println(i); i += 2; } while(i <= 5);",
      answer: "The output is 1, 3, 5. i starts at 1, increments by 2 each time: 1, 3, 5. When i becomes 7, 7 <= 5 is false, so the loop ends.",
    },
    {
      id: "dwhile-av-20",
      question: "Explain the difference between i++ and ++i in do-while loop conditions.",
      answer: "i++ (post-increment) uses the current value for comparison, then increments. ++i (pre-increment) increments first, then uses the new value. This affects how many times the loop executes.",
    },
    {
      id: "dwhile-av-21",
      question: "What is a loop variable?",
      answer: "A loop variable is a variable that controls the execution of a loop. It is initialized before the loop, checked in the condition, and updated inside the loop body. In do-while loops, it must be managed manually.",
    },
    {
      id: "dwhile-av-22",
      question: "Why is initialization important in a do-while loop?",
      answer: "If the loop variable is not initialized, it has a default value (0 for int) which may cause unexpected behavior. Always initialize before the loop to ensure predictable execution.",
    },
    {
      id: "dwhile-av-23",
      question: "What is the output of: int i = 0; do { i++; } while(i++ < 3); System.out.println(i);",
      answer: "The output is 5. i increments in body and in condition. After loop: i = 5. Prints 5.",
    },
    {
      id: "dwhile-av-24",
      question: "Can you have multiple conditions in a do-while loop?",
      answer: "Yes, using logical operators && and ||. For example: while(x > 0 && x < 10) continues while both conditions are true.",
    },
    {
      id: "dwhile-av-25",
      question: "What is the output of: int i = 1; do { int j = 1; do { System.out.print(i*j + ' '); j++; } while (j <= 2); i++; } while (i <= 3);",
      answer: "The output is: 1 2 2 4 3 6. Outer loop runs 3 times (i=1,2,3). Inner loop runs 2 times each (j=1,2). Multiplies i*j each time.",
    },
    {
      id: "dwhile-av-26",
      question: "What is the purpose of the continue statement?",
      answer: "The continue statement skips the current iteration and moves to the next iteration. The remaining code in the loop body is not executed for that iteration.",
    },
    {
      id: "dwhile-av-27",
      question: "What is the purpose of the break statement?",
      answer: "The break statement exits the loop immediately, regardless of the condition. Execution continues with the statement after the loop.",
    },
    {
      id: "dwhile-av-28",
      question: "Can a do-while loop run backwards?",
      answer: "Yes, by using decrement (i--) instead of increment. For example: int i = 10; do { System.out.println(i); i--; } while(i >= 1); prints 10 down to 1.",
    },
    {
      id: "dwhile-av-29",
      question: "What is the output of: int i = 1; do { if(i == 3) continue; System.out.print(i); i++; } while(i <= 5);",
      answer: "This is a trick question. It prints 1, 2, then when i == 3, continue skips the rest. But i is never incremented, so it stays 3 forever - infinite loop!",
    },
    {
      id: "dwhile-av-30",
      question: "What are the three main components of a do-while loop?",
      answer: "(1) Initialization - done before the loop, (2) Loop body - executes at least once, (3) Condition - checked after each iteration. Unlike for loops, these are separate in do-while loops. The semicolon after while(condition) is mandatory.",
    },
  ],

  // ========== 17. PRACTICE TEST ==========
  practiceTest: {
    title: "DO-WHILE Loop - Practice Test",
    duration: "45 minutes",
    totalMarks: 50,
    instructions: "Attempt all questions. Write programs with proper indentation and comments.",
    sections: [
      {
        name: "Section A: Objective Questions",
        marks: 10,
        questions: [
          { id: "pt-1", question: "The do-while loop is _____ controlled.", options: ["entry", "exit", "both", "none"], answer: 1 },
          { id: "pt-2", question: "If condition is false initially, do-while loop executes _____ times.", options: ["0", "1", "infinite", "compilation error"], answer: 1 },
          { id: "pt-3", question: "The loop variable must be updated _____ the do-while loop.", options: ["before", "after", "inside", "in condition"], answer: 2 },
          { id: "pt-4", question: "Forgetting to update loop variable causes _____ .", options: ["error", "infinite loop", "no output", "wrong output"], answer: 1 },
          { id: "pt-5", question: "Which loop is best for menu-driven programs?", options: ["for", "while", "do-while", "all"], answer: 2 },
        ],
      },
      {
        name: "Section B: Output Questions",
        marks: 10,
        questions: [
          { id: "pt-6", question: "What is the output?\nint i = 1;\ndo {\n    System.out.print(i + \" \");\n    i++;\n} while (i <= 3);", answer: "1 2 3" },
          { id: "pt-7", question: "What is the output?\nint i = 5;\ndo {\n    System.out.print(i--);\n} while (i > 0);", answer: "54321" },
          { id: "pt-8", question: "What is the output?\nint i = 1;\ndo {\n    int j = 1;\n    do {\n        System.out.print(i * j + \" \");\n        j++;\n    } while (j <= 2);\n    i++;\n} while (i <= 3);", answer: "1 2 2 4 3 6" },
        ],
      },
      {
        name: "Section C: Programming Questions",
        marks: 20,
        questions: [
          { id: "pt-9", question: "Write a program using do-while loop to print numbers from 1 to n.", answer: "int i = 1;\ndo {\n    System.out.println(i);\n    i++;\n} while (i <= n);" },
          { id: "pt-10", question: "Write a program using do-while loop to calculate the sum of first n natural numbers.", answer: "int sum = 0, i = 1;\ndo {\n    sum = sum + i;\n    i++;\n} while (i <= n);\nSystem.out.println(sum);" },
          { id: "pt-11", question: "Write a program using do-while loop to check if a number is prime.", answer: "boolean isPrime = true;\nint i = 2;\ndo {\n    if (num % i == 0) {\n        isPrime = false;\n        break;\n    }\n    i++;\n} while (i <= num/2);" },
        ],
      },
      {
        name: "Section D: HOTS (Higher Order Thinking Skills)",
        marks: 10,
        questions: [
          { id: "pt-12", question: "What is the output?\nint i = 0;\ndo {\n    System.out.print(i++);\n} while (i < 3);", answer: "012", explanation: "Post-increment: prints 0, then 1, then 2. Loop runs while i < 3." },
          { id: "pt-13", question: "Trace the output:\nint i = 1;\ndo {\n    int j = 1;\n    do {\n        System.out.print(j + \" \");\n        j++;\n    } while (j <= i);\n    System.out.println();\n    i++;\n} while (i <= 5);", answer: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5" },
        ],
      },
    ],
  },

  // ========== 18. REVISION NOTES ==========
  revisionNotes: [
    "The do-while loop is exit-controlled — condition checked AFTER each iteration.",
    "The loop body ALWAYS executes at least once, even if the condition is false initially.",
    "Loop variable must be initialized BEFORE the do-while loop.",
    "Loop variable must be updated INSIDE the do-while loop body.",
    "Forgetting to update the loop variable causes an infinite loop.",
    "Do-while loops are best when you need at least one execution guaranteed.",
    "While loops are best when the number of iterations is unknown and may be zero.",
    "The semicolon (;) after while(condition) is MANDATORY — missing it causes a compilation error.",
    "do-while(true) creates an infinite loop — use break to exit.",
    "The break statement exits the loop immediately.",
    "The continue statement skips the current iteration.",
    "Do-while loops can be nested — inner loop completes for each outer iteration.",
    "A do-while loop can be converted to a while loop and vice versa.",
    "The condition must eventually become false, otherwise infinite loop.",
    "Do-while loops are commonly used for menu-driven programs.",
    "Do-while loops are commonly used for input validation.",
    "The condition is checked n times for n iterations (no extra check like while loop).",
  ],

  // ========== 19. CHEATSHEET ==========
  cheatsheet: {
    title: "DO-WHILE Loop - Quick Reference",
    syntax: "do { // code; update; } while (condition);",
    keyPoints: [
      "Exit-controlled: condition checked after each iteration",
      "Loop body ALWAYS executes at least once",
      "Initialize loop variable BEFORE the loop",
      "Update loop variable INSIDE the loop body",
      "Semicolon after while(condition) is MANDATORY",
      "If condition false initially → 1 iteration (not 0)",
      "Forgetting update → infinite loop",
      "Best for menu-driven programs and input validation",
    ],
    commonPatterns: [
      { pattern: "Count 1 to n", code: "int i = 1;\ndo { ... i++; } while (i <= n);" },
      { pattern: "Count n to 1", code: "int i = n;\ndo { ... i--; } while (i >= 1);" },
      { pattern: "Even numbers", code: "int i = 2;\ndo { ... i += 2; } while (i <= n);" },
      { pattern: "Odd numbers", code: "int i = 1;\ndo { ... i += 2; } while (i <= n);" },
      { pattern: "Menu-driven", code: "do { display menu; } while (choice != 4);" },
      { pattern: "Sentinel", code: "do { read num; } while (num != -1);" },
    ],
    loopControl: [
      { statement: "break", purpose: "Exits the loop immediately" },
      { statement: "continue", purpose: "Skips current iteration, moves to next" },
    ],
  },

  // ========== 20. INTERVIEW QUESTIONS ==========
  interviewQuestions: [
    {
      id: "dwhile-iq-1",
      question: "What is a do-while loop?",
      answer: "A do-while loop is a repetition control structure that executes a block of code at least once, and then repeatedly as long as a condition is true. It is exit-controlled, meaning the condition is checked after each iteration.",
    },
    {
      id: "dwhile-iq-2",
      question: "What is the difference between while and do-while?",
      answer: "While is entry-controlled (condition checked before, may not execute at all). Do-while is exit-controlled (condition checked after, always executes at least once).",
    },
    {
      id: "dwhile-iq-3",
      question: "What is an infinite loop?",
      answer: "An infinite loop never terminates because the condition is always true or the loop variable is never updated. Example: do-while(true) without break, or do-while(i <= 10) without i++.",
    },
    {
      id: "dwhile-iq-4",
      question: "Can you explain nested do-while loops?",
      answer: "Nested do-while loops are do-while loops inside other do-while loops. The inner loop completes all its iterations for each iteration of the outer loop. Commonly used for pattern printing.",
    },
    {
      id: "dwhile-iq-5",
      question: "What is the time complexity of a do-while loop?",
      answer: "It depends on the number of iterations. A simple do-while loop that runs n times has O(n) complexity. Nested do-while loops have O(n²).",
    },
    {
      id: "dwhile-iq-6",
      question: "What is a sentinel-controlled loop?",
      answer: "A sentinel-controlled loop continues reading input until a special value (sentinel) is encountered. For example: do { num = sc.nextInt(); } while (num != -1);",
    },
    {
      id: "dwhile-iq-7",
      question: "What is the output of: int i = 0; do { System.out.print(i++); } while(i < 3);",
      answer: "The output is 012. Post-increment: prints 0, then 1, then 2. Loop runs while i < 3.",
    },
    {
      id: "dwhile-iq-8",
      question: "When would you use a do-while loop over a while loop?",
      answer: "Use do-while when you need the loop body to execute at least once, such as menu-driven programs, input validation, or any situation where the first execution is mandatory.",
    },
    {
      id: "dwhile-iq-9",
      question: "What is the scope of a variable declared inside a do-while loop?",
      answer: "A variable declared inside the do-while loop is only accessible within that loop. It cannot be accessed outside the loop.",
    },
    {
      id: "dwhile-iq-10",
      question: "What is the difference between break and continue?",
      answer: "break exits the loop completely - execution continues after the loop. continue skips only the current iteration - the loop continues with the next iteration.",
    },
    {
      id: "dwhile-iq-11",
      question: "Can a do-while loop have an empty body?",
      answer: "Yes, using braces: do {} while(true); This creates an infinite loop with an empty body. It's valid but almost always a bug.",
    },
    {
      id: "dwhile-iq-12",
      question: "What is the output of: int i = 5; do { System.out.print(i--); } while(i > 0);",
      answer: "The output is 54321. Post-decrement: prints 5, 4, 3, 2, 1. Loop runs while i > 0.",
    },
    {
      id: "dwhile-iq-13",
      question: "How do you prevent infinite loops in do-while loops?",
      answer: "Always update the loop variable inside the loop, ensure the update direction matches the condition, use break statements when needed, and avoid do-while(true) without exit logic.",
    },
    {
      id: "dwhile-iq-14",
      question: "What is a post-test loop?",
      answer: "A post-test loop checks the condition after executing the loop body. The do-while loop is a post-test loop (exit-controlled). The while loop is a pre-test loop (entry-controlled).",
    },
    {
      id: "dwhile-iq-15",
      question: "Can you have multiple conditions in a do-while loop?",
      answer: "Yes, using logical operators && and ||. For example: while(x > 0 && x < 10) continues while both conditions are true.",
    },
  ],

  // ========== 21. EXAM TRICKS ==========
  examTricks: [
    "Always check for the semicolon after while(condition) — missing it is a common compilation error in exams.",
    "In ICSE exams, do-while questions often involve menu-driven programs where the menu must display at least once.",
    "Trace the loop variable carefully — remember the body executes at least once before the first condition check.",
    "Remember: do-while guarantees at least one execution, while loop may have zero iterations.",
    "For pattern printing with do-while loops, you'll typically need nested do-while loops.",
    "Be careful with do-while(true) — this creates an infinite loop unless there's a break statement inside.",
    "In output questions, count the iterations starting from the first execution (which always happens).",
    "The condition in do-while is checked n times for n iterations (no extra check like while loop).",
    "Post-increment (i++) in condition: uses current value, then increments. Pre-increment (++i): increments first, then uses new value.",
    "When converting do-while to while: ensure the body executes at least once before the while loop.",
    "Nested do-while loops: inner loop must be re-initialized for each outer loop iteration.",
    "Common mistake: forgetting semicolon — do-while is the only loop that requires a semicolon.",
    "Common mistake: forgetting braces — only the first statement is inside the loop without braces.",
    "Do-while loops are perfect for: menu-driven programs, input validation, processing until condition met.",
    "The key advantage of do-while: body executes before condition is checked — useful for initialization.",
  ],

  // ========== 22. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "dowhileloop-ar-1",
      assertion: "Assertion (A): A do-while loop can execute zero or more times.",
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
      id: "dowhileloop-ar-2",
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
      id: "dowhileloop-ar-3",
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
      id: "dowhileloop-ar-4",
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
      id: "dowhileloop-ar-5",
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
      id: "dowhileloop-ar-6",
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
      id: "dowhileloop-ar-7",
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
      id: "dowhileloop-ar-8",
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
      id: "dowhileloop-ar-9",
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
      id: "dowhileloop-ar-10",
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

  // ========== 23. DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "dowhileloop-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "dowhileloop-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "dowhileloop-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "dowhileloop-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "dowhileloop-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "dowhileloop-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "dowhileloop-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "dowhileloop-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "dowhileloop-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "dowhileloop-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 24. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "dowhileloop-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "dowhileloop-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "dowhileloop-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "dowhileloop-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "dowhileloop-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "dowhileloop-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "dowhileloop-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "dowhileloop-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "dowhileloop-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "dowhileloop-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "dowhileloop-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "dowhileloop-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 25. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "dowhileloop-mps-1",
      title: "Practice Set 1: Do-while loop Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "dowhileloop-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "dowhileloop-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "dowhileloop-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "dowhileloop-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "dowhileloop-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "dowhileloop-mps-2",
      title: "Practice Set 2: Do-while loop Applications",
      questions: [
        {
          type: "mcq",
          id: "dowhileloop-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "dowhileloop-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "dowhileloop-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "dowhileloop-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "dowhileloop-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 26. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "dowhileloop-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "dowhileloop-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "dowhileloop-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "dowhileloop-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "dowhileloop-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "dowhileloop-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "dowhileloop-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "dowhileloop-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "dowhileloop-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "dowhileloop-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "dowhileloop-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "dowhileloop-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "dowhileloop-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "dowhileloop-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "dowhileloop-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "dowhileloop-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "dowhileloop-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "dowhileloop-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "dowhileloop-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "dowhileloop-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter07;