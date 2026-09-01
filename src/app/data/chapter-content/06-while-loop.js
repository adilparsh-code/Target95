const chapter06 = {
  id: "06-while-loop",
  title: "WHILE Loop",
  slug: "while-loop",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 180,
  topics: [
    "while loop",
    "entry-controlled loop",
    "pre-test loop",
    "condition checking",
    "loop initialization",
    "infinite loops",
    "while vs for",
    "nested while",
    "loop control",
    "iteration",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "The `while` loop is a repetition control structure that executes a block of code repeatedly as long as a given condition is `true`. Unlike the `for` loop which is best when you know the exact number of iterations, the `while` loop is ideal when the number of iterations is unknown or depends on a condition. It is an entry-controlled loop — the condition is checked BEFORE each iteration. Think of it like a security guard checking IDs at a door: the guard keeps checking until there are no more people in line. The guard doesn't know in advance how many people there are — the loop continues as long as there are people to check.",
    realLifeExamples: [
      "A security guard checking IDs at a club entrance — keeps checking until the line ends (unknown number of people).",
      "A teacher collecting test papers — keeps collecting until all students have submitted (depends on when students finish).",
      "A cashier scanning items at a supermarket — continues until all items in the cart are scanned.",
      "A lifeguard watching swimmers — continues monitoring as long as swimmers are in the pool.",
      "A customer service representative answering calls — continues as long as there are calls in the queue.",
      "A waiter taking orders — continues until all customers at the table have ordered.",
      "A librarian checking out books — continues until all books are processed.",
      "A toll booth operator collecting tolls — continues as long as vehicles are approaching.",
    ],
    commonMistakes: [
      "Forgetting to initialize the loop variable before the while loop — causes compilation error or infinite loop.",
      "Forgetting to update the loop variable inside the loop — causes an infinite loop.",
      "Using the wrong condition direction — using `i++` with `i > 0` instead of `i >= 0` or using `i--` with `i < 10`.",
      "Off-by-one errors in the condition — using `i <= n` when you need `i < n`, or vice versa.",
      "Writing a while loop when a for loop would be clearer — while loops are best for unknown iterations.",
      "Not using braces `{}` for multi-statement loop bodies, leading to only the first statement being repeated.",
      "Using assignment `=` instead of comparison `==` in the condition.",
      "Creating infinite loops by not updating the loop variable or using a condition that's always true.",
    ],
    whereUsed: [
      "Reading input until the user enters a specific value (e.g., 'quit' or -1).",
      "Processing data until a sentinel value is encountered.",
      "Menu-driven programs that continue until the user chooses to exit.",
      "Searching through data structures when the end is not predetermined.",
      "Waiting for a specific condition to become true (polling).",
      "Processing files line by line when the number of lines is unknown.",
      "Game loops that continue until a game-over condition is met.",
      "Any situation where the number of iterations depends on runtime conditions.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "The `while` loop is one of the simplest looping constructs in Java. It has three main components: (1) initialization (done before the loop), (2) condition (checked before each iteration), and (3) update (done inside the loop body). The loop continues executing as long as the condition is `true`. The moment the condition becomes `false`, the loop stops. The key difference from the `for` loop is that in a `while` loop, the initialization and update are NOT part of the loop syntax — they must be handled separately. This makes `while` loops more flexible for situations where you don't know in advance how many times you need to loop.",
    importantPoints: [
      "The while loop is entry-controlled — the condition is checked BEFORE each iteration.",
      "If the condition is false initially, the loop body never executes (zero iterations).",
      "The loop variable must be initialized BEFORE the while loop.",
      "The loop variable must be updated INSIDE the while loop body.",
      "Forgetting to update the loop variable causes an infinite loop.",
      "The condition must eventually become false, otherwise the loop runs forever.",
      "While loops are best when the number of iterations is unknown.",
      "For loops are best when the number of iterations is known in advance.",
      "A while loop can be converted to a for loop and vice versa.",
      "The body of a while loop can contain any valid Java statements, including nested loops and conditionals.",
    ],
    memoryTricks: [
      "WHILE = 'When Has It, Loop Endlessly' — loop continues WHILE condition is true.",
      "Think of while as a gatekeeper: 'While you're eligible, keep going.'",
      "Remember: Initialize BEFORE, Check BEFORE each iteration, Update INSIDE.",
      "Infinite loop mnemonic: 'While true, loop forever — unless you break!'",
      "While vs For: 'For knows the count, While waits and sees.'",
      "Entry-controlled = 'Check before you leap' — condition checked before entering the loop body.",
    ],
    examTips: [
      "Always check for infinite loop traps: is the loop variable being updated? Does the condition eventually become false?",
      "In ICSE exams, while loop questions often involve reading input until a sentinel value (like -1 or 0).",
      "Trace the loop variable carefully — write down its value at each iteration.",
      "Remember: if the condition is false initially, the loop body never executes (0 iterations).",
      "While loops are commonly used for menu-driven programs: while(choice != 4) { ... }",
      "For pattern printing with while loops, you'll typically need nested while loops.",
      "Be careful with while(true) — this creates an infinite loop unless there's a break statement inside.",
      "In output questions, count the number of iterations carefully — the loop runs WHILE the condition is true.",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `// Initialization (before loop)
int i = 1;

// While loop
while (condition) {
    // code to execute
    // update statement
}`,
    breakdown: [
      {
        keyword: "initialization",
        explanation:
          "Done BEFORE the while loop. Sets the starting value of the loop variable. Example: int i = 1;",
      },
      {
        keyword: "while",
        explanation:
          "Java keyword that starts the while loop. Must be followed by a boolean condition in parentheses.",
      },
      {
        keyword: "condition",
        explanation:
          "A boolean expression checked BEFORE each iteration. If true, the loop body executes. If false, the loop terminates. Example: i <= 5",
      },
      {
        keyword: "loop body",
        explanation:
          "The block of code (inside {}) that executes repeatedly. Must contain the update statement.",
      },
      {
        keyword: "update statement",
        explanation:
          "Changes the loop variable (usually increment or decrement). Must be INSIDE the loop body. Example: i++",
      },
    ],
    variations: {
      infiniteLoop: {
        code: `while (true) {
    // This runs forever
    // Use break to exit
}`,
        explanation:
          "while(true) creates an infinite loop. Must use break statement to exit. Useful for menus and games.",
      },
      whileTrue: {
        code: `boolean running = true;
while (running) {
    // code
    if (someCondition) {
        running = false;  // Exit condition
    }
}`,
        explanation:
          "Using a boolean flag to control the loop. The flag is set to false when you want to exit.",
      },
      nestedWhile: {
        code: `int i = 1;
while (i <= 3) {
    int j = 1;
    while (j <= 3) {
        System.out.print(i + " " + j + "  ");
        j++;
    }
    System.out.println();
    i++;
}`,
        explanation:
          "A while loop inside another while loop. The inner loop completes all iterations for each outer loop iteration.",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "while-ex-b-1",
        title: "Print numbers 1 to 5",
        code: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}`,
        output: "1\n2\n3\n4\n5",
        explanation: [
          "Step 1: Initialize i = 1 BEFORE the loop.",
          "Step 2: Check condition: 1 <= 5 is true. Enter loop body.",
          "Step 3: Print 1. Update: i++ → i = 2.",
          "Step 4: Check: 2 <= 5 is true. Print 2. i++ → i = 3.",
          "Step 5: Continue until i = 5. Print 5. i++ → i = 6.",
          "Step 6: Check: 6 <= 5 is false. Loop ends.",
          "Key point: The loop runs exactly 5 times (i = 1, 2, 3, 4, 5).",
        ],
      },
      {
        id: "while-ex-b-2",
        title: "Print even numbers from 2 to 10",
        code: `int i = 2;
while (i <= 10) {
    System.out.print(i + " ");
    i += 2;
}`,
        output: "2 4 6 8 10 ",
        explanation: [
          "Step 1: Initialize i = 2.",
          "Step 2: Check: 2 <= 10 is true. Print 2. i += 2 → i = 4.",
          "Step 3: Check: 4 <= 10 is true. Print 4. i += 2 → i = 6.",
          "Step 4: Continue until i = 10. Print 10. i += 2 → i = 12.",
          "Step 5: Check: 12 <= 10 is false. Loop ends.",
          "Key point: Using i += 2 increments by 2, generating even numbers.",
        ],
      },
      {
        id: "while-ex-b-3",
        title: "Sum of first 5 natural numbers",
        code: `int i = 1;
int sum = 0;
while (i <= 5) {
    sum = sum + i;
    i++;
}
System.out.println("Sum = " + sum);`,
        output: "Sum = 15",
        explanation: [
          "Step 1: Initialize i = 1, sum = 0.",
          "Step 2: i = 1. sum = 0 + 1 = 1. i++ → i = 2.",
          "Step 3: i = 2. sum = 1 + 2 = 3. i++ → i = 3.",
          "Step 4: i = 3. sum = 3 + 3 = 6. i++ → i = 4.",
          "Step 5: i = 4. sum = 6 + 4 = 10. i++ → i = 5.",
          "Step 6: i = 5. sum = 10 + 5 = 15. i++ → i = 6.",
          "Step 7: 6 <= 5 is false. Loop ends. Print 'Sum = 15'.",
          "Key point: The accumulator pattern — initialize before loop, update inside, use after.",
        ],
      },
      {
        id: "while-ex-b-4",
        title: "Print numbers in reverse (5 to 1)",
        code: `int i = 5;
while (i >= 1) {
    System.out.println(i);
    i--;
}`,
        output: "5\n4\n3\n2\n1",
        explanation: [
          "Step 1: Initialize i = 5.",
          "Step 2: Check: 5 >= 1 is true. Print 5. i-- → i = 4.",
          "Step 3: Check: 4 >= 1 is true. Print 4. i-- → i = 3.",
          "Step 4: Continue until i = 1. Print 1. i-- → i = 0.",
          "Step 5: Check: 0 >= 1 is false. Loop ends.",
          "Key point: Using i-- decrements the loop variable, allowing reverse iteration.",
        ],
      },
      {
        id: "while-ex-b-5",
        title: "Print multiplication table of 7",
        code: `int i = 1;
while (i <= 10) {
    System.out.println("7 x " + i + " = " + (7 * i));
    i++;
}`,
        output: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: i = 1. Print '7 x 1 = 7'. i++ → i = 2.",
          "Step 3: i = 2. Print '7 x 2 = 14'. i++ → i = 3.",
          "Step 4: Continue until i = 10. Print '7 x 10 = 70'. i++ → i = 11.",
          "Step 5: 11 <= 10 is false. Loop ends.",
          "Key point: The loop variable i is used as the multiplier in the table.",
        ],
      },
      {
        id: "while-ex-b-6",
        title: "Product of first 5 numbers",
        code: `int i = 1;
int product = 1;
while (i <= 5) {
    product = product * i;
    i++;
}
System.out.println("Product = " + product);`,
        output: "Product = 120",
        explanation: [
          "Step 1: Initialize i = 1, product = 1 (NOT 0, since 0 * anything = 0).",
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
        id: "while-ex-b-7",
        title: "Print characters from A to E",
        code: `char ch = 'A';
while (ch <= 'E') {
    System.out.print(ch + " ");
    ch++;
}`,
        output: "A B C D E ",
        explanation: [
          "Step 1: Initialize ch = 'A' (ASCII 65).",
          "Step 2: Check: 'A' <= 'E' is true. Print 'A'. ch++ → ch = 'B'.",
          "Step 3: Check: 'B' <= 'E' is true. Print 'B'. ch++ → ch = 'C'.",
          "Step 4: Continue until ch = 'E'. Print 'E'. ch++ → ch = 'F'.",
          "Step 5: Check: 'F' <= 'E' is false. Loop ends.",
          "Key point: char variables can be used in while loops. ch++ moves to the next character.",
        ],
      },
      {
        id: "while-ex-b-8",
        title: "Count down from 10 to 1",
        code: `int i = 10;
while (i >= 1) {
    System.out.println(i + " seconds remaining");
    i--;
}`,
        output: "10 seconds remaining\n9 seconds remaining\n8 seconds remaining\n...\n1 seconds remaining",
        explanation: [
          "Step 1: Initialize i = 10.",
          "Step 2: Check: 10 >= 1 is true. Print '10 seconds remaining'. i-- → i = 9.",
          "Step 3: Continue decrementing until i = 1. Print '1 seconds remaining'. i-- → i = 0.",
          "Step 4: Check: 0 >= 1 is false. Loop ends.",
          "Key point: Countdown loops use i-- and condition i >= 1 (or i > 0).",
        ],
      },
      {
        id: "while-ex-b-9",
        title: "Print odd numbers from 1 to 15",
        code: `int i = 1;
while (i <= 15) {
    System.out.print(i + " ");
    i += 2;
}`,
        output: "1 3 5 7 9 11 13 15 ",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: Check: 1 <= 15 is true. Print 1. i += 2 → i = 3.",
          "Step 3: Check: 3 <= 15 is true. Print 3. i += 2 → i = 5.",
          "Step 4: Continue until i = 15. Print 15. i += 2 → i = 17.",
          "Step 5: Check: 17 <= 15 is false. Loop ends.",
          "Key point: Using i += 2 starting from 1 generates all odd numbers.",
        ],
      },
      {
        id: "while-ex-b-10",
        title: "Square of numbers 1 to 5",
        code: `int i = 1;
while (i <= 5) {
    System.out.println(i + " squared = " + (i * i));
    i++;
}`,
        output: "1 squared = 1\n2 squared = 4\n3 squared = 9\n4 squared = 16\n5 squared = 25",
        explanation: [
          "Step 1: Initialize i = 1.",
          "Step 2: i = 1. Print '1 squared = 1'. i++ → i = 2.",
          "Step 3: i = 2. Print '2 squared = 4'. i++ → i = 3.",
          "Step 4: Continue until i = 5. Print '5 squared = 25'. i++ → i = 6.",
          "Step 5: 6 <= 5 is false. Loop ends.",
          "Key point: The loop variable is used in a mathematical expression (i * i).",
        ],
      },
    ],
    intermediate: [
      {
        id: "while-ex-i-1",
        title: "Nested While Loop - Print a Rectangle Pattern",
        code: `int i = 1;
while (i <= 3) {
    int j = 1;
    while (j <= 5) {
        System.out.print("* ");
        j++;
    }
    System.out.println();
    i++;
}`,
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
        id: "while-ex-i-2",
        title: "Right-Angled Triangle Pattern",
        code: `int i = 1;
while (i <= 5) {
    int j = 1;
    while (j <= i) {
        System.out.print("* ");
        j++;
    }
    System.out.println();
    i++;
}`,
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
        id: "while-ex-i-3",
        title: "Check if a number is prime",
        code: `int num = 17;
boolean isPrime = true;
int i = 2;
while (i <= num / 2) {
    if (num % i == 0) {
        isPrime = false;
        break;
    }
    i++;
}
System.out.println(num + " is " + (isPrime ? "prime" : "not prime"));`,
        output: "17 is prime",
        explanation: [
          "Step 1: num = 17. isPrime = true. i = 2.",
          "Step 2: i = 2. 17 % 2 = 1 (not 0). Continue. i++ → i = 3.",
          "Step 3: i = 3. 17 % 3 = 2. Continue. i++ → i = 4.",
          "Step 4: i = 4. 17 % 4 = 1. Continue. i++ → i = 5.",
          "Step 5: i = 5. 5 <= 8.5? Yes. 17 % 5 = 2. Continue. i++ → i = 6.",
          "Step 6: i = 6. 6 <= 8. 17 % 6 = 5. Continue. i++ → i = 7.",
          "Step 7: i = 7. 7 <= 8. 17 % 7 = 3. Continue. i++ → i = 8.",
          "Step 8: i = 8. 8 <= 8. 17 % 8 = 1. Continue. i++ → i = 9.",
          "Step 9: i = 9. 9 > 8. Loop ends. isPrime is still true.",
          "Key point: We only need to check divisors up to num/2. The break exits early when a divisor is found.",
        ],
      },
      {
        id: "while-ex-i-4",
        title: "Fibonacci Series (first 10 terms)",
        code: `int a = 0, b = 1;
System.out.print(a + " " + b);
int i = 3;
while (i <= 10) {
    int c = a + b;
    System.out.print(" " + c);
    a = b;
    b = c;
    i++;
}`,
        output: "0 1 1 2 3 5 8 13 21 34",
        explanation: [
          "Step 1: a = 0, b = 1. Print '0 1'.",
          "Step 2: i = 3. c = 0 + 1 = 1. Print ' 1'. a = 1, b = 1. i++ → i = 4.",
          "Step 3: i = 4. c = 1 + 1 = 2. Print ' 2'. a = 1, b = 2. i++ → i = 5.",
          "Step 4: i = 5. c = 1 + 2 = 3. Print ' 3'. a = 2, b = 3. i++ → i = 6.",
          "Step 5: Continue until i = 10. c = 13 + 21 = 34. Print ' 34'.",
          "Key point: Each term is the sum of the two preceding terms.",
        ],
      },
      {
        id: "while-ex-i-5",
        title: "Factorial of a number",
        code: `int num = 6;
int factorial = 1;
int i = 1;
while (i <= num) {
    factorial = factorial * i;
    i++;
}
System.out.println(num + "! = " + factorial);`,
        output: "6! = 720",
        explanation: [
          "Step 1: num = 6. factorial = 1. i = 1.",
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
        id: "while-ex-i-6",
        title: "Check Armstrong number",
        code: `int num = 153;
int original = num;
int sum = 0;
while (num > 0) {
    int digit = num % 10;
    sum = sum + (digit * digit * digit);
    num = num / 10;
}
System.out.println(original + " is " + (sum == original ? "Armstrong" : "not Armstrong"));`,
        output: "153 is Armstrong",
        explanation: [
          "Step 1: num = 153. original = 153. sum = 0.",
          "Step 2: num = 153 > 0. digit = 3. sum = 27. num = 15.",
          "Step 3: num = 15 > 0. digit = 5. sum = 152. num = 1.",
          "Step 4: num = 1 > 0. digit = 1. sum = 153. num = 0.",
          "Step 5: num = 0. Loop ends. sum = 153 == original = 153. Print 'Armstrong'.",
          "Key point: An Armstrong number equals the sum of cubes of its digits.",
        ],
      },
      {
        id: "while-ex-i-7",
        title: "Check palindrome number",
        code: `int num = 1221;
int original = num;
int reversed = 0;
while (num > 0) {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
}
System.out.println(original + " is " + (reversed == original ? "palindrome" : "not palindrome"));`,
        output: "1221 is palindrome",
        explanation: [
          "Step 1: num = 1221. original = 1221. reversed = 0.",
          "Step 2: num = 1221 > 0. digit = 1. reversed = 1. num = 122.",
          "Step 3: num = 122 > 0. digit = 2. reversed = 12. num = 12.",
          "Step 4: num = 12 > 0. digit = 2. reversed = 122. num = 1.",
          "Step 5: num = 1 > 0. digit = 1. reversed = 1221. num = 0.",
          "Step 6: num = 0. Loop ends. reversed = 1221 == original. Print 'palindrome'.",
          "Key point: Reverse the number by repeatedly extracting the last digit.",
        ],
      },
      {
        id: "while-ex-i-8",
        title: "Sum of digits of a number",
        code: `int num = 12345;
int sum = 0;
while (num > 0) {
    int digit = num % 10;
    sum = sum + digit;
    num = num / 10;
}
System.out.println("Sum of digits = " + sum);`,
        output: "Sum of digits = 15",
        explanation: [
          "Step 1: num = 12345. sum = 0.",
          "Step 2: num = 12345 > 0. digit = 5. sum = 5. num = 1234.",
          "Step 3: num = 1234 > 0. digit = 4. sum = 9. num = 123.",
          "Step 4: num = 123 > 0. digit = 3. sum = 12. num = 12.",
          "Step 5: num = 12 > 0. digit = 2. sum = 14. num = 1.",
          "Step 6: num = 1 > 0. digit = 1. sum = 15. num = 0.",
          "Step 7: num = 0. Loop ends. Print 'Sum of digits = 15'.",
          "Key point: Extract digits from right to left using % 10 and / 10.",
        ],
      },
      {
        id: "while-ex-i-9",
        title: "Menu-driven program (simplified)",
        code: `int choice = 1;
while (choice != 4) {
    System.out.println("1. Tea");
    System.out.println("2. Coffee");
    System.out.println("3. Juice");
    System.out.println("4. Exit");
    System.out.print("Enter choice: ");
    // Assume choice is read from user
    // For this example, we'll just show the loop structure
    choice++;  // This would normally be: choice = sc.nextInt();
}
System.out.println("Thank you!");`,
        output: "Menu displays 3 times, then exits",
        explanation: [
          "Step 1: choice = 1.",
          "Step 2: 1 != 4 is true. Display menu. choice++ → choice = 2.",
          "Step 3: 2 != 4 is true. Display menu. choice++ → choice = 3.",
          "Step 4: 3 != 4 is true. Display menu. choice++ → choice = 4.",
          "Step 5: 4 != 4 is false. Loop ends. Print 'Thank you!'.",
          "Key point: While loops are perfect for menu-driven programs.",
        ],
      },
      {
        id: "while-ex-i-10",
        title: "Reverse a number",
        code: `int num = 12345;
int reversed = 0;
while (num > 0) {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
}
System.out.println("Reversed: " + reversed);`,
        output: "Reversed: 54321",
        explanation: [
          "Step 1: num = 12345. reversed = 0.",
          "Step 2: digit = 5. reversed = 5. num = 1234.",
          "Step 3: digit = 4. reversed = 54. num = 123.",
          "Step 4: digit = 3. reversed = 543. num = 12.",
          "Step 5: digit = 2. reversed = 5432. num = 1.",
          "Step 6: digit = 1. reversed = 54321. num = 0.",
          "Step 7: Loop ends. Print 'Reversed: 54321'.",
          "Key point: Build the reversed number by shifting digits left (multiply by 10) and adding the extracted digit.",
        ],
      },
    ],
    advanced: [
      {
        id: "while-ex-a-1",
        title: "Print all prime numbers from 1 to 50",
        code: `int num = 2;
while (num <= 50) {
    boolean isPrime = true;
    int i = 2;
    while (i <= num / 2) {
        if (num % i == 0) {
            isPrime = false;
            break;
        }
        i++;
    }
    if (isPrime) {
        System.out.print(num + " ");
    }
    num++;
}`,
        output: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 ",
        explanation: [
          "Step 1: Outer loop iterates num from 2 to 50.",
          "Step 2: For each num, inner loop checks divisibility from 2 to num/2.",
          "Step 3: If any divisor is found, isPrime = false and break exits the inner loop.",
          "Step 4: If no divisor found (isPrime is still true), print the number.",
          "Key point: Nested while loop with a break statement for efficiency.",
        ],
      },
      {
        id: "while-ex-a-2",
        title: "Diamond Pattern",
        code: `int n = 4;
int i = 1;
// Upper half
while (i <= n) {
    int j = 1;
    while (j <= n - i) {
        System.out.print("  ");
        j++;
    }
    int k = 1;
    while (k <= 2 * i - 1) {
        System.out.print("* ");
        k++;
    }
    System.out.println();
    i++;
}
// Lower half
i = n - 1;
while (i >= 1) {
    int j = 1;
    while (j <= n - i) {
        System.out.print("  ");
        j++;
    }
    int k = 1;
    while (k <= 2 * i - 1) {
        System.out.print("* ");
        k++;
    }
    System.out.println();
    i--;
}`,
        output: "      * \n    * * * \n  * * * * * \n* * * * * * * \n  * * * * * \n    * * * \n      * ",
        explanation: [
          "Step 1: First loop (i = 1 to 4) prints the upper half of the diamond.",
          "Step 2: Second loop (i = 3 to 1) prints the lower half in reverse.",
          "Step 3: Spaces decrease and stars increase in the upper half; reverse in the lower half.",
          "Key point: Three nested while loops for each half — spaces, then stars.",
        ],
      },
      {
        id: "while-ex-a-3",
        title: "Hollow Square Pattern",
        code: `int n = 5;
int i = 1;
while (i <= n) {
    int j = 1;
    while (j <= n) {
        if (i == 1 || i == n || j == 1 || j == n) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        j++;
    }
    System.out.println();
    i++;
}`,
        output: "* * * * * \n*       * \n*       * \n*       * \n* * * * * ",
        explanation: [
          "Step 1: Outer loop i controls rows (1 to 5). Inner loop j controls columns (1 to 5).",
          "Step 2: If i is 1 or 5 (first/last row) or j is 1 or 5 (first/last column), print '*'.",
          "Step 3: Otherwise, print spaces to create the hollow effect.",
          "Key point: The condition checks boundary positions to print stars only on the perimeter.",
        ],
      },
      {
        id: "while-ex-a-4",
        title: "Print Armstrong numbers from 1 to 1000",
        code: `int num = 1;
while (num <= 1000) {
    int original = num;
    int sum = 0;
    int temp = num;
    while (temp > 0) {
        int digit = temp % 10;
        sum = sum + (digit * digit * digit);
        temp = temp / 10;
    }
    if (sum == num) {
        System.out.print(num + " ");
    }
    num++;
}`,
        output: "1 153 370 371 407 ",
        explanation: [
          "Step 1: Outer loop iterates num from 1 to 1000.",
          "Step 2: For each num, inner loop extracts digits and computes sum of cubes.",
          "Step 3: If sum equals the original number, it is an Armstrong number — print it.",
          "Key point: 1-digit numbers (1-9) are Armstrong. 153 = 1^3+5^3+3^3, etc.",
        ],
      },
      {
        id: "while-ex-a-5",
        title: "Number Pattern - Pascal's Triangle",
        code: `int n = 5;
int i = 0;
while (i < n) {
    int num = 1;
    int j = 0;
    while (j <= i) {
        System.out.print(num + " ");
        num = num * (i - j) / (j + 1);
        j++;
    }
    System.out.println();
    i++;
}`,
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
        id: "while-ex-a-6",
        title: "Reverse a number using while loop",
        code: `int num = 12345;
int reversed = 0;
while (num > 0) {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
}
System.out.println("Reversed: " + reversed);`,
        output: "Reversed: 54321",
        explanation: [
          "Step 1: num = 12345. reversed = 0.",
          "Step 2: digit = 5. reversed = 5. num = 1234.",
          "Step 3: digit = 4. reversed = 54. num = 123.",
          "Step 4: digit = 3. reversed = 543. num = 12.",
          "Step 5: digit = 2. reversed = 5432. num = 1.",
          "Step 6: digit = 1. reversed = 54321. num = 0.",
          "Key point: Build the reversed number by shifting digits left and adding the extracted digit.",
        ],
      },
      {
        id: "while-ex-a-7",
        title: "Print perfect numbers from 1 to 1000",
        code: `int num = 1;
while (num <= 1000) {
    int sum = 0;
    int i = 1;
    while (i < num) {
        if (num % i == 0) {
            sum = sum + i;
        }
        i++;
    }
    if (sum == num) {
        System.out.print(num + " ");
    }
    num++;
}`,
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
        id: "while-ex-a-8",
        title: "Hollow Pyramid Pattern",
        code: `int n = 5;
int i = 1;
while (i <= n) {
    int j = i;
    while (j < n) {
        System.out.print(" ");
        j++;
    }
    int k = 1;
    while (k <= (2 * i - 1)) {
        if (k == 1 || k == (2 * i - 1) || i == n) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        k++;
    }
    System.out.println();
    i++;
}`,
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
        id: "while-ex-a-9",
        title: "Print palindrome numbers from 100 to 200",
        code: `int num = 100;
while (num <= 200) {
    int original = num;
    int reversed = 0;
    int temp = num;
    while (temp > 0) {
        int digit = temp % 10;
        reversed = reversed * 10 + digit;
        temp = temp / 10;
    }
    if (reversed == original) {
        System.out.print(num + " ");
    }
    num++;
}`,
        output: "101 111 121 131 141 151 161 171 181 191 ",
        explanation: [
          "Step 1: Outer loop iterates num from 100 to 200.",
          "Step 2: For each num, inner loop reverses the number using a temporary variable.",
          "Step 3: If the reversed number equals the original, it is a palindrome — print it.",
          "Key point: Uses a temporary variable (temp) to avoid modifying the outer loop variable.",
        ],
      },
      {
        id: "while-ex-a-10",
        title: "Cross Pattern (X Pattern)",
        code: `int n = 5;
int i = 1;
while (i <= n) {
    int j = 1;
    while (j <= n) {
        if (j == i || j == (n - i + 1)) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        j++;
    }
    System.out.println();
    i++;
}`,
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
while (i <= 5) {
    sum = sum + i;
    i++;
}
System.out.println(sum);`,
      trace: [
        { line: 1, explanation: "sum = 0. Memory: sum → 0" },
        { line: 2, explanation: "i = 1. Memory: i → 1" },
        { line: 3, explanation: "Check: 1 <= 5 is true. Enter loop body." },
        { line: 4, explanation: "sum = 0 + 1 = 1. Memory: sum → 1" },
        { line: 5, explanation: "i++ → i = 2. Check: 2 <= 5 is true." },
        { line: 4, explanation: "sum = 1 + 2 = 3. Memory: sum → 3" },
        { line: 5, explanation: "i++ → i = 3. Check: 3 <= 5 is true." },
        { line: 4, explanation: "sum = 3 + 3 = 6. Memory: sum → 6" },
        { line: 5, explanation: "i++ → i = 4. Check: 4 <= 5 is true." },
        { line: 4, explanation: "sum = 6 + 4 = 10. Memory: sum → 10" },
        { line: 5, explanation: "i++ → i = 5. Check: 5 <= 5 is true." },
        { line: 4, explanation: "sum = 10 + 5 = 15. Memory: sum → 15" },
        { line: 5, explanation: "i++ → i = 6. Check: 6 <= 5 is false. Loop ends." },
        { line: 7, explanation: "Print: 15" },
      ],
    },
    {
      title: "Nested while loop - 3x3 grid",
      code: `int i = 1;
while (i <= 3) {
    int j = 1;
    while (j <= 3) {
        System.out.print(i + " " + j + "  ");
        j++;
    }
    System.out.println();
    i++;
}`,
      trace: [
        { line: 1, explanation: "Initialize i = 1. Check: 1 <= 3 is true. Enter outer loop." },
        { line: 2, explanation: "Initialize j = 1. Check: 1 <= 3 is true. Enter inner loop." },
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
while (i <= n) {
    fact = fact * i;
    i++;
}
System.out.println(fact);`,
      trace: [
        { line: 1, explanation: "n = 5. Memory: n → 5" },
        { line: 2, explanation: "fact = 1. Memory: fact → 1" },
        { line: 3, explanation: "i = 1. Check: 1 <= 5 is true." },
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
      id: "while-ob-1",
      question: `int x = 0;
int i = 1;
while (i <= 5) {
    x = x + i;
    i++;
}
System.out.println(x);`,
      answer: "15",
      explanation: "x starts at 0. Loop adds 1+2+3+4+5 = 15. Prints 15.",
    },
    {
      id: "while-ob-2",
      question: `int i = 1;
while (i <= 3) {
    int j = 1;
    while (j <= 3) {
        System.out.print("* ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "* * * \n* * * \n* * * ",
      explanation: "Outer loop runs 3 times. Each time, inner loop prints 3 stars. 3x3 grid of stars.",
    },
    {
      id: "while-ob-3",
      question: `int count = 0;
int i = 1;
while (i <= 10) {
    i += 2;
    count++;
}
System.out.println(count);`,
      answer: "5",
      explanation: "i goes 1, 3, 5, 7, 9 — that's 5 iterations. count = 5.",
    },
    {
      id: "while-ob-4",
      question: `int prod = 1;
int i = 1;
while (i <= 4) {
    prod = prod * i;
    i++;
}
System.out.println(prod);`,
      answer: "24",
      explanation: "prod = 1*1*2*3*4 = 24. This is 4! (factorial of 4).",
    },
    {
      id: "while-ob-5",
      question: `int i = 5;
while (i >= 1) {
    System.out.print(i + " ");
    i--;
}`,
      answer: "5 4 3 2 1 ",
      explanation: "i starts at 5 and decrements to 1. Prints '5 4 3 2 1 '.",
    },
    {
      id: "while-ob-6",
      question: `int sum = 0;
int i = 2;
while (i <= 10) {
    sum = sum + i;
    i += 2;
}
System.out.println(sum);`,
      answer: "30",
      explanation: "Even numbers 2+4+6+8+10 = 30.",
    },
    {
      id: "while-ob-7",
      question: `int i = 1;
while (i <= 4) {
    int j = 1;
    while (j <= i) {
        System.out.print(j + " ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "1 \n1 2 \n1 2 3 \n1 2 3 4 ",
      explanation: "Row 1: j=1. Row 2: j=1,2. Row 3: j=1,2,3. Row 4: j=1,2,3,4.",
    },
    {
      id: "while-ob-8",
      question: `int a = 0, b = 1;
System.out.print(a + " " + b);
int i = 1;
while (i <= 3) {
    int c = a + b;
    System.out.print(" " + c);
    a = b;
    b = c;
    i++;
}`,
      answer: "0 1 1 2 3",
      explanation: "Fibonacci: 0, 1, 1, 2, 3. Starts with 0 1, then 3 more terms.",
    },
    {
      id: "while-ob-9",
      question: `int i = 1;
while (i <= 3) {
    int j = 1;
    while (j <= 3) {
        if (i == j) System.out.print("* ");
        else System.out.print("- ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "* - - \n- * - \n- - * ",
      explanation: "Stars on the main diagonal (i==j), dashes elsewhere. 3x3 diagonal pattern.",
    },
    {
      id: "while-ob-10",
      question: `int n = 5;
int sum = 0;
int i = 1;
while (i <= n) {
    sum = sum + (i * i);
    i++;
}
System.out.println(sum);`,
      answer: "55",
      explanation: "Sum of squares: 1+4+9+16+25 = 55.",
    },
    {
      id: "while-ob-11",
      question: `int i = 1;
while (i <= 5) {
    int j = 1;
    while (j <= 5 - i) {
        System.out.print(" ");
        j++;
    }
    int k = 1;
    while (k <= i) {
        System.out.print("* ");
        k++;
    }
    System.out.println();
    i++;
}`,
      answer: "    * \n   * * \n  * * * \n * * * * \n* * * * * ",
      explanation: "Right-angled triangle with spaces on the left. Row i has (5-i) spaces and i stars.",
    },
    {
      id: "while-ob-12",
      question: `int x = 1;
int i = 1;
while (i <= 4) {
    x = x * 2;
    i++;
}
System.out.println(x);`,
      answer: "16",
      explanation: "x doubles each iteration: 1→2→4→8→16. After 4 iterations, x = 16.",
    },
    {
      id: "while-ob-13",
      question: `int i = 1;
while (i <= 4) {
    int j = 1;
    while (j <= 4) {
        System.out.print((i + j) + " ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "2 3 4 5 \n3 4 5 6 \n4 5 6 7 \n5 6 7 8 ",
      explanation: "Each cell prints (i+j). Row 1: 2,3,4,5. Row 2: 3,4,5,6. etc.",
    },
    {
      id: "while-ob-14",
      question: `int count = 0;
int i = 1;
while (i <= 100) {
    if (i % 3 == 0 && i % 5 == 0) {
        count++;
    }
    i++;
}
System.out.println(count);`,
      answer: "6",
      explanation: "Numbers divisible by both 3 and 5 (i.e., by 15) from 1 to 100: 15,30,45,60,75,90 = 6 numbers.",
    },
    {
      id: "while-ob-15",
      question: `int i = 1;
while (i <= 5) {
    int j = 1;
    while (j <= i) {
        System.out.print(i + " ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "1 \n2 2 \n3 3 3 \n4 4 4 4 \n5 5 5 5 5 ",
      explanation: "Row i prints the number i, i times. Row 1: '1'. Row 2: '2 2'. etc.",
    },
    {
      id: "while-ob-16",
      question: `int sum = 0;
int i = 1;
while (i <= 10) {
    if (i % 2 != 0) {
        sum = sum + i;
    }
    i++;
}
System.out.println(sum);`,
      answer: "25",
      explanation: "Sum of odd numbers 1+3+5+7+9 = 25.",
    },
    {
      id: "while-ob-17",
      question: `int num = 123;
int reversed = 0;
while (num > 0) {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num = num / 10;
}
System.out.println(reversed);`,
      answer: "321",
      explanation: "Reverses 123 to 321. digit=3, reversed=3. digit=2, reversed=32. digit=1, reversed=321.",
    },
    {
      id: "while-ob-18",
      question: `int i = 1;
while (i <= 4) {
    int j = 1;
    while (j <= 4 - i + 1) {
        System.out.print("* ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "* * * * \n* * * \n* * \n* ",
      explanation: "Row i prints (5-i) stars. Row 1: 5 stars, Row 2: 4 stars, etc. Inverted triangle.",
    },
    {
      id: "while-ob-19",
      question: `int fact = 1;
int i = 5;
while (i >= 1) {
    fact = fact * i;
    i--;
}
System.out.println(fact);`,
      answer: "120",
      explanation: "5! = 5*4*3*2*1 = 120. Loop goes from 5 down to 1.",
    },
    {
      id: "while-ob-20",
      question: `int i = 1;
while (i <= 5) {
    int j = 1;
    while (j <= 5) {
        if (i == 1 || i == 5 || j == 1 || j == 5) {
            System.out.print("* ");
        } else {
            System.out.print("  ");
        }
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "* * * * * \n*       * \n*       * \n*       * \n* * * * * ",
      explanation: "Hollow square. Stars on the boundary (first/last row, first/last column), spaces inside.",
    },
    {
      id: "while-ob-21",
      question: `int a = 1, b = 1;
int i = 1;
while (i <= 5) {
    System.out.print(a + " ");
    int c = a + b;
    a = b;
    b = c;
    i++;
}`,
      answer: "1 1 2 3 5",
      explanation: "Fibonacci starting with 1, 1. Prints 5 terms: 1, 1, 2, 3, 5.",
    },
    {
      id: "while-ob-22",
      question: `int i = 1;
while (i <= 3) {
    int j = 1;
    while (j <= i) {
        System.out.print("*");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "*\n**\n***",
      explanation: "Row 1: 1 star. Row 2: 2 stars. Row 3: 3 stars. Left-aligned triangle.",
    },
    {
      id: "while-ob-23",
      question: `int sum = 0;
int i = 1;
while (i <= 7) {
    sum = sum + i;
    i += 2;
}
System.out.println(sum);`,
      answer: "16",
      explanation: "Odd numbers 1+3+5+7 = 16.",
    },
    {
      id: "while-ob-24",
      question: `int i = 1;
while (i <= 4) {
    int j = 1;
    while (j <= i) {
        System.out.print(j);
        j++;
    }
    int k = i - 1;
    while (k >= 1) {
        System.out.print(k);
        k--;
    }
    System.out.println();
    i++;
}`,
      answer: "1\n121\n12321\n1234321",
      explanation: "Row i: ascending 1..i then descending i-1..1. Palindrome pattern.",
    },
    {
      id: "while-ob-25",
      question: `int n = 145;
int sum = 0;
int temp = n;
while (temp > 0) {
    int d = temp % 10;
    int fact = 1;
    int i = 1;
    while (i <= d) {
        fact = fact * i;
        i++;
    }
    sum = sum + fact;
    temp = temp / 10;
}
System.out.println(sum == n ? "Strong" : "Not Strong");`,
      answer: "Strong",
      explanation: "145 = 1! + 4! + 5! = 1 + 24 + 120 = 145. It's a Strong number.",
    },
    {
      id: "while-ob-26",
      question: `int i = 1;
while (i <= 5) {
    int j = 1;
    while (j <= 5) {
        System.out.print((i * j) + " ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "1 2 3 4 5 \n2 4 6 8 10 \n3 6 9 12 15 \n4 8 12 16 20 \n5 10 15 20 25 ",
      explanation: "Multiplication table. Cell (i,j) prints i*j. 5x5 multiplication table.",
    },
    {
      id: "while-ob-27",
      question: `int x = 10;
int i = 1;
while (i <= 3) {
    x = x - 2;
    i++;
}
System.out.println(x);`,
      answer: "4",
      explanation: "x decreases by 2 each iteration: 10→8→6→4. After 3 iterations, x = 4.",
    },
    {
      id: "while-ob-28",
      question: `int i = 1;
while (i <= 5) {
    int j = 1;
    while (j <= i) {
        System.out.print("* ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "* \n* * \n* * * \n* * * * \n* * * * * ",
      explanation: "Row i prints i stars. Row 1: 1 star. Row 2: 2 stars. etc.",
    },
    {
      id: "while-ob-29",
      question: `int sum = 0;
int i = 1;
while (i <= 5) {
    int term = 1;
    int j = 1;
    while (j <= i) {
        term = term * i;
        j++;
    }
    sum = sum + term;
    i++;
}
System.out.println(sum);`,
      answer: "3413",
      explanation: "Sum of i^i: 1^1 + 2^2 + 3^3 + 4^4 + 5^5 = 1 + 4 + 27 + 256 + 3125 = 3413.",
    },
    {
      id: "while-ob-30",
      question: `int i = 1;
while (i <= 4) {
    int j = 1;
    while (j <= 4) {
        if (i + j == 5) System.out.print("* ");
        else System.out.print("- ");
        j++;
    }
    System.out.println();
    i++;
}`,
      answer: "- - - * \n- - * - \n- * - - \n* - - - ",
      explanation: "Stars where i+j=5 (anti-diagonal). Row 1: j=4. Row 2: j=3. Row 3: j=2. Row 4: j=1.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "while-ef-1",
      question: `int i = 0;
while (i < 5)
    System.out.println(i);`,
      error: "Missing update statement (i++) inside the loop. This creates an infinite loop because i never changes.",
      corrected: `int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}`,
    },
    {
      id: "while-ef-2",
      question: `int i = 1;
while (i <= 10)
    i--;
    System.out.println(i);`,
      error: "The loop decrements i (i--) but starts at 1 and checks i <= 10. This creates an infinite loop since i will never reach 10 by decrementing from 1.",
      corrected: `int i = 1;
while (i <= 10) {
    System.out.println(i);
    i++;
}`,
    },
    {
      id: "while-ef-3",
      question: `int i = 1;
while (i <= 5)
    System.out.println(i);
System.out.println("Loop ended");`,
      error: "Missing braces. Only `System.out.println(i)` is inside the loop. `System.out.println(\"Loop ended\")` is outside the loop and runs once after the loop.",
      corrected: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    System.out.println("Loop ended");
}`,
    },
    {
      id: "while-ef-4",
      question: `int i = 0;
while (i < 5) {
    System.out.println(i);
}
System.out.println(i);`,
      error: "Variable `i` is declared inside the while loop and is not accessible outside it. This causes a compilation error.",
      corrected: `int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}
System.out.println(i);`,
    },
    {
      id: "while-ef-5",
      question: `int i = 1;
while (i <= 10)
    System.out.println(i);
int i = 1;
while (i <= 5)
    System.out.println(i);`,
      error: "No error. Two separate while loops with the same variable name `i` are fine since each `i` is scoped to its own loop (if declared inside).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-6",
      question: `int i = 1;
while (i <= 5) {
    if (i == 3)
        break;
    System.out.println(i);
}`,
      error: "No error. The break statement exits the loop when i == 3. Output: 1, 2.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-7",
      question: `int i = 1;
while (i <= 5) {
    if (i == 3)
        continue;
    System.out.println(i);
}`,
      error: "No error. The continue statement skips iteration when i == 3. Output: 1, 2, 4, 5.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-8",
      question: `int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}`,
      error: "No error. This is a correct while loop that prints 0, 1, 2, 3, 4.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-9",
      question: `int i = 1;
while (i <= 5);
    System.out.println(i);`,
      error: "Line 2: Semicolon after the while condition creates an empty loop body. The loop runs 5 times doing nothing. Then `System.out.println(i)` runs once after the loop, but i is out of scope — compilation error.",
      corrected: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}`,
    },
    {
      id: "while-ef-10",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
}
System.out.println("After loop");`,
      error: "No error. `System.out.println(\"After loop\")` is outside the loop and runs once after the loop ends.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-11",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
while (i <= 3) {
    System.out.println(i);
    i++;
}`,
      error: "No error. Two separate while loops. The second loop uses the final value of i from the first loop (i = 6), so the second loop never executes.",
      corrected: "No error, but the second loop won't execute because i = 6 after the first loop.",
    },
    {
      id: "while-ef-12",
      question: `int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}
while (i < 3) {
    System.out.println(i);
    i++;
}`,
      error: "No error. Two separate while loops with the same variable name are fine. The second loop won't execute because i = 5 after the first loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-13",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
System.out.println(i);`,
      error: "No error. The last println is outside the loop and prints the final value of i (which is 6).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-14",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
}
i++;`,
      error: "Missing update statement inside the loop. The loop runs infinitely because i is never updated inside the while block.",
      corrected: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}`,
    },
    {
      id: "while-ef-15",
      question: `int i = 5;
while (i >= 1) {
    System.out.println(i);
}`,
      error: "Missing update statement (i--). This creates an infinite loop because i never changes.",
      corrected: `int i = 5;
while (i >= 1) {
    System.out.println(i);
    i--;
}`,
    },
    {
      id: "while-ef-16",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
int i = 10;
System.out.println(i);`,
      error: "No error. The second declaration of i is after the first while loop, so it's a new variable in a new scope.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-17",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
while (i <= 3) {
    System.out.println(i);
    i++;
}`,
      error: "No error. Two separate while loops are fine. The second loop won't execute because i = 6 after the first loop.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-18",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
while (i >= 1) {
    System.out.println(i);
    i--;
}`,
      error: "No error. Two separate while loops. The second loop prints 6, 5, 4, 3, 2, 1 (countdown from 6).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-19",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
System.out.println("Done");`,
      error: "No error. `System.out.println(\"Done\")` is outside the loop and runs once after the loop ends.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-20",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
System.out.println(i);`,
      error: "No error. The last println is outside the loop and prints the final value of i (6).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-21",
      question: `int i = 1;
while (i <= 5) {
    int j = 1;
    while (j <= 5) {
        System.out.print("* ");
        j++;
    }
    System.out.println();
    i++;
}`,
      error: "No error. This is a correct nested while loop that prints a 5x5 grid of stars.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "while-ef-22",
      question: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
int j = 1;
while (j <= 3) {
    System.out.println(j);
    j++;
}`,
      error: "No error. Two separate while loops with different variables are fine.",
      corrected: "No error. Code is correct.",
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    { id: "while-fb-1", question: "The _____ loop checks the condition before each iteration.", answer: "while" },
    { id: "while-fb-2", question: "A while loop is an _____ controlled loop.", answer: "entry" },
    { id: "while-fb-3", question: "If the condition is false initially, the while loop body executes _____ times.", answer: "zero" },
    { id: "while-fb-4", question: "The loop variable must be initialized _____ the while loop.", answer: "before" },
    { id: "while-fb-5", question: "The loop variable must be updated _____ the while loop body.", answer: "inside" },
    { id: "while-fb-6", question: "Forgetting to update the loop variable causes an _____ loop.", answer: "infinite" },
    { id: "while-fb-7", question: "The condition in a while loop is checked _____ each iteration.", answer: "before" },
    { id: "while-fb-8", question: "While loops are best when the number of iterations is _____.", answer: "unknown" },
    { id: "while-fb-9", question: "For loops are best when the number of iterations is _____.", answer: "known" },
    { id: "while-fb-10", question: "The while loop continues as long as the condition is _____ .", answer: "true" },
    { id: "while-fb-11", question: "The while loop stops when the condition becomes _____ .", answer: "false" },
    { id: "while-fb-12", question: "A while loop can be converted to a _____ loop.", answer: "for" },
    { id: "while-fb-13", question: "The keyword _____ creates an infinite loop when used as the condition.", answer: "true" },
    { id: "while-fb-14", question: "To exit an infinite loop, use the _____ statement.", answer: "break" },
    { id: "while-fb-15", question: "The _____ statement skips the current iteration and moves to the next.", answer: "continue" },
    { id: "while-fb-16", question: "In a nested while loop, the inner loop completes all its iterations for each _____ loop iteration.", answer: "outer" },
    { id: "while-fb-17", question: "The condition in while(condition) must evaluate to a _____ value.", answer: "boolean" },
    { id: "while-fb-18", question: "Using _____ in the condition causes an infinite loop if not handled properly.", answer: "true" },
    { id: "while-fb-19", question: "The while loop is also called a _____ loop.", answer: "pre-test" },
    { id: "while-fb-20", question: "In while loop, if the condition is false initially, the loop body executes _____ times.", answer: "0" },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "while-mcq-1",
      question: "What type of loop is a while loop?",
      options: ["Entry-controlled", "Exit-controlled", "Both", "Neither"],
      answer: 0,
      explanation: "The while loop is entry-controlled because the condition is checked before entering the loop body.",
    },
    {
      id: "while-mcq-2",
      question: "How many times does a while loop check the condition?",
      options: ["Once", "Twice", "Before each iteration", "After each iteration"],
      answer: 2,
      explanation: "The condition is checked before each iteration, including the first one.",
    },
    {
      id: "while-mcq-3",
      question: "What happens if the condition is false initially?",
      options: ["Loop executes once", "Loop executes infinitely", "Loop body never executes", "Compilation error"],
      answer: 2,
      explanation: "If the condition is false initially, the loop body never executes (0 iterations).",
    },
    {
      id: "while-mcq-4",
      question: "Where should the loop variable be updated in a while loop?",
      options: ["Before the loop", "After the loop", "Inside the loop body", "In the condition"],
      answer: 2,
      explanation: "The loop variable must be updated inside the while loop body.",
    },
    {
      id: "while-mcq-5",
      question: "What happens if you forget to update the loop variable?",
      options: ["Compilation error", "Infinite loop", "Loop executes once", "Nothing happens"],
      answer: 1,
      explanation: "Forgetting to update the loop variable causes an infinite loop because the condition never changes.",
    },
    {
      id: "while-mcq-6",
      question: "Which loop is best when the number of iterations is unknown?",
      options: ["for", "while", "do-while", "All are same"],
      answer: 1,
      explanation: "The while loop is best when the number of iterations is unknown or depends on a condition.",
    },
    {
      id: "while-mcq-7",
      question: "Which loop is best when the number of iterations is known?",
      options: ["for", "while", "do-while", "All are same"],
      answer: 0,
      explanation: "The for loop is best when the number of iterations is known in advance.",
    },
    {
      id: "while-mcq-8",
      question: "What is the output?\nint i = 1;\nwhile (i <= 3)\n    System.out.print(i++);",
      options: ["123", "012", "Infinite", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, then 2, then 3. i++ is post-increment, so it prints the current value then increments.",
    },
    {
      id: "while-mcq-9",
      question: "What is the output?\nint i = 0;\nwhile (i < 3)\n    System.out.println(++i);",
      options: ["012", "123", "0123", "Compilation error"],
      answer: 1,
      explanation: "Pre-increment: i becomes 1, 2, 3 before printing. Prints 1, 2, 3.",
    },
    {
      id: "while-mcq-10",
      question: "Which statement exits the loop immediately?",
      options: ["continue", "break", "return", "exit"],
      answer: 1,
      explanation: "The break statement exits the loop immediately and continues execution after the loop.",
    },
    {
      id: "while-mcq-11",
      question: "Which statement skips the current iteration?",
      options: ["break", "continue", "return", "exit"],
      answer: 1,
      explanation: "The continue statement skips the current iteration and moves to the next iteration.",
    },
    {
      id: "while-mcq-12",
      question: "What is the output?\nint i = 5;\nwhile (i > 0) {\n    System.out.print(i--);\n}",
      options: ["54321", "543210", "4321", "Compilation error"],
      answer: 0,
      explanation: "Prints 5, 4, 3, 2, 1. Post-decrement prints current value then decrements.",
    },
    {
      id: "while-mcq-13",
      question: "What is the output?\nint i = 1;\nwhile (i <= 5)\n    System.out.print(i++);",
      options: ["12345", "01234", "1234", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, 2, 3, 4, 5. The loop runs 5 times with i = 1, 2, 3, 4, 5.",
    },
    {
      id: "while-mcq-14",
      question: "Which is an entry-controlled loop?",
      options: ["while", "do-while", "Both", "Neither"],
      answer: 0,
      explanation: "The while loop is entry-controlled (condition checked before). do-while is exit-controlled.",
    },
    {
      id: "while-mcq-15",
      question: "What is the output?\nint i = 0;\nwhile (i++ < 3)\n    System.out.print(i);",
      options: ["012", "123", "0123", "Compilation error"],
      answer: 1,
      explanation: "Post-increment in condition: compares 0<3 (true, prints 1), 1<3 (true, prints 2), 2<3 (true, prints 3), 3<3 (false).",
    },
    {
      id: "while-mcq-16",
      question: "How many times does this loop execute?\nint i = 1;\nwhile (i <= 10) {\n    i++;\n}",
      options: ["9", "10", "11", "Infinite"],
      answer: 1,
      explanation: "The loop runs 10 times with i = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. When i becomes 11, the condition fails.",
    },
    {
      id: "while-mcq-17",
      question: "What is the output?\nint i = 10;\nwhile (i >= 7)\n    System.out.print(i--);",
      options: ["1098", "987", "9876", "Compilation error"],
      answer: 0,
      explanation: "Prints 10, 9, 8. Post-decrement: prints current value then decrements. Loop runs while i >= 7.",
    },
    {
      id: "while-mcq-18",
      question: "Which loop guarantees at least one execution?",
      options: ["for", "while", "do-while", "All loops"],
      answer: 2,
      explanation: "The do-while loop is exit-controlled and guarantees at least one execution.",
    },
    {
      id: "while-mcq-19",
      question: "What is the output?\nint i = 1;\nwhile (i <= 5) {\n    if (i == 3) break;\n    System.out.print(i);\n    i++;\n}",
      options: ["12", "12 4 5", "12345", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, 2. When i == 3, break exits the loop. 4 and 5 are never printed.",
    },
    {
      id: "while-mcq-20",
      question: "What is the output?\nint i = 1;\nwhile (i <= 5) {\n    if (i == 3) continue;\n    System.out.print(i);\n    i++;\n}",
      options: ["1245", "12345", "12 45", "Compilation error"],
      answer: 0,
      explanation: "Prints 1, 2. When i == 3, continue skips the rest. But i is never incremented, so infinite loop! This is a trick question.",
    },
    {
      id: "while-mcq-21",
      question: "In a while loop, if the condition is always true, the loop is called:",
      options: ["Finite loop", "Infinite loop", "Conditional loop", "Empty loop"],
      answer: 1,
      explanation: "If the condition is always true and there's no break, the loop runs infinitely.",
    },
    {
      id: "while-mcq-22",
      question: "What is the output?\nint i = 0;\nwhile (i++ < 3);\nSystem.out.println(i);",
      options: ["3", "4", "2", "Compilation error"],
      answer: 1,
      explanation: "The semicolon creates an empty loop. i increments to 4 (0<3, 1<3, 2<3, then 3<3 is false). Prints 4.",
    },
    {
      id: "while-mcq-23",
      question: "Which is NOT a valid loop control statement?",
      options: ["break", "continue", "exit", "return"],
      answer: 2,
      explanation: "exit is not a Java keyword. break, continue, and return are valid loop control statements.",
    },
    {
      id: "while-mcq-24",
      question: "What is the output?\nint i = 5;\nwhile (i-- > 0)\n    System.out.print(i);",
      options: ["43210", "4321", "54321", "Compilation error"],
      answer: 1,
      explanation: "Post-decrement in condition: compares 5>0 (true, prints 4), 4>0 (true, prints 3), 3>0 (true, prints 2), 2>0 (true, prints 1), 1>0 (true, prints 0), 0>0 (false).",
    },
    {
      id: "while-mcq-25",
      question: "What is the output?\nint i = 1;\nwhile (i++ <= 3);\nSystem.out.println(i);",
      options: ["3", "4", "5", "Compilation error"],
      answer: 2,
      explanation: "Empty loop with semicolon. i increments: 1<=3 (true, i=2), 2<=3 (true, i=3), 3<=3 (true, i=4), 4<=3 (false, i=5). Prints 5.",
    },
    {
      id: "while-mcq-26",
      question: "Which loop is more suitable for menu-driven programs?",
      options: ["for", "while", "do-while", "All are equal"],
      answer: 1,
      explanation: "While loops are commonly used for menu-driven programs where the loop continues until the user chooses to exit.",
    },
    {
      id: "while-mcq-27",
      question: "What is the output?\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i += 2;\n}",
      options: ["12345", "135", "1357", "Compilation error"],
      answer: 1,
      explanation: "i starts at 1, increments by 2: 1, 3, 5. When i becomes 7, 7 <= 5 is false. Loop ends.",
    },
    {
      id: "while-mcq-28",
      question: "What is the output?\nint i = 10;\nwhile (i >= 7) {\n    System.out.print(i--);\n}",
      options: ["1098", "9876", "10987", "Compilation error"],
      answer: 0,
      explanation: "Prints 10, 9, 8. Post-decrement: prints current value then decrements. Loop runs while i >= 7.",
    },
    {
      id: "while-mcq-29",
      question: "In while loop, the condition is evaluated _____ time(s).",
      options: ["1", "n", "n+1", "n-1"],
      answer: 2,
      explanation: "The condition is evaluated n+1 times: once before each iteration (n times) plus one final time when the condition becomes false.",
    },
    {
      id: "while-mcq-30",
      question: "What is the output?\nint i = 1;\nwhile (i <= 3) {\n    int j = 1;\n    while (j <= 2) {\n        System.out.print(i * j + \" \");\n        j++;\n    }\n    i++;\n}",
      options: ["1 2 2 4 3 6", "1 2 3 4 5 6", "1 2 2 4", "Compilation error"],
      answer: 0,
      explanation: "Outer loop runs 3 times (i=1,2,3). Inner loop runs 2 times each (j=1,2). Prints: 1*1=1, 1*2=2, 2*1=2, 2*2=4, 3*1=3, 3*2=6.",
    },
  ],

  // ========== 10. TRUE/FALSE ==========
  trueFalse: [
    { id: "while-tf-1", question: "The while loop is an entry-controlled loop.", answer: true, explanation: "The condition is checked before entering the loop body." },
    { id: "while-tf-2", question: "If the condition is false initially, the while loop body executes at least once.", answer: false, explanation: "If the condition is false initially, the loop body never executes (0 iterations)." },
    { id: "while-tf-3", question: "The loop variable must be initialized inside the while loop.", answer: false, explanation: "The loop variable must be initialized BEFORE the while loop." },
    { id: "while-tf-4", question: "The loop variable must be updated inside the while loop body.", answer: true, explanation: "If not updated inside the loop, it creates an infinite loop." },
    { id: "while-tf-5", question: "Forgetting to update the loop variable causes a compilation error.", answer: false, explanation: "It causes an infinite loop, not a compilation error." },
    { id: "while-tf-6", question: "A while loop can be converted to a for loop.", answer: true, explanation: "Any while loop can be rewritten as a for loop and vice versa." },
    { id: "while-tf-7", question: "The while loop is best when the number of iterations is known.", answer: false, explanation: "The for loop is best when the number of iterations is known. While is best when unknown." },
    { id: "while-tf-8", question: "while(true) creates an infinite loop.", answer: true, explanation: "while(true) always evaluates to true, creating an infinite loop unless there's a break inside." },
    { id: "while-tf-9", question: "The break statement exits the innermost loop.", answer: true, explanation: "break exits only the innermost loop in case of nested loops." },
    { id: "while-tf-10", question: "The continue statement skips the rest of the current iteration.", answer: true, explanation: "continue skips the remaining code in the current iteration and moves to the next iteration." },
    { id: "while-tf-11", question: "A while loop can have multiple conditions using logical operators.", answer: true, explanation: "You can use && and || in the while condition: while(x > 0 && x < 10)." },
    { id: "while-tf-12", question: "The condition in while(condition) is optional.", answer: false, explanation: "The condition is mandatory. while() without a condition is a syntax error." },
    { id: "while-tf-13", question: "While loops cannot be nested.", answer: false, explanation: "While loops can be nested just like for loops." },
    { id: "while-tf-14", question: "The while loop body can contain any valid Java statements.", answer: true, explanation: "The while loop body can contain any valid Java code including nested loops, conditionals, etc." },
    { id: "while-tf-15", question: "In a while loop, the update statement is part of the loop syntax.", answer: false, explanation: "Unlike for loops, the update statement is NOT part of while loop syntax — it must be inside the loop body." },
    { id: "while-tf-16", question: "The while loop is also called a pre-test loop.", answer: true, explanation: "The condition is tested before entering the loop body (pre-test)." },
    { id: "while-tf-17", question: "A while loop can have an empty body.", answer: true, explanation: "while(true); is valid but creates an infinite loop. The semicolon is the empty body." },
    { id: "while-tf-18", question: "The while loop condition is evaluated after the loop body executes.", answer: false, explanation: "The while loop condition is evaluated BEFORE the loop body (entry-controlled)." },
    { id: "while-tf-19", question: "While loops are commonly used for reading input until a sentinel value.", answer: true, explanation: "While loops are perfect for situations where you don't know how many inputs there will be." },
    { id: "while-tf-20", question: "The while loop can only iterate forward (incrementing).", answer: false, explanation: "While loops can iterate in any direction — forward (i++), backward (i--), or any custom update." },
  ],

  // ========== 11. SHORT ANSWER QUESTIONS ==========
  shortAnswerQuestions: [
    { id: "while-sa-1", question: "What is a while loop?", answer: "A while loop is a repetition control structure that executes a block of code repeatedly as long as a given condition is true. It is an entry-controlled loop, meaning the condition is checked before each iteration." },
    { id: "while-sa-2", question: "What is an entry-controlled loop?", answer: "An entry-controlled loop checks the condition before entering the loop body. If the condition is false initially, the loop body never executes. The while loop is an example of an entry-controlled loop." },
    { id: "while-sa-3", question: "What is an exit-controlled loop?", answer: "An exit-controlled loop checks the condition after executing the loop body. This means the loop body executes at least once, even if the condition is initially false. The do-while loop is an example of an exit-controlled loop." },
    { id: "while-sa-4", question: "What is the difference between while and for loops?", answer: "The for loop is best when the number of iterations is known in advance — it has initialization, condition, and update in one line. The while loop is best when the number of iterations is unknown — initialization and update are separate from the loop syntax." },
    { id: "while-sa-5", question: "What happens if the condition is false initially in a while loop?", answer: "If the condition is false initially, the loop body never executes. The loop has 0 iterations, and execution continues with the statement after the while loop." },
    { id: "while-sa-6", question: "What is an infinite loop? How can it occur in a while loop?", answer: "An infinite loop is a loop that never terminates. In a while loop, this occurs when the condition is always true (e.g., while(true)) or when the loop variable is never updated so the condition never becomes false." },
    { id: "while-sa-7", question: "What is the purpose of the break statement?", answer: "The break statement exits the loop immediately, regardless of the loop condition. Execution continues with the statement after the loop. It is commonly used to exit loops when a specific condition is met." },
    { id: "while-sa-8", question: "What is the purpose of the continue statement?", answer: "The continue statement skips the current iteration of the loop. The remaining code in the loop body is not executed, and the loop moves to the next iteration (re-evaluating the condition)." },
    { id: "while-sa-9", question: "Can a while loop be nested?", answer: "Yes, a while loop can be nested inside another while loop. This is called a nested while loop. The inner loop completes all its iterations for each single iteration of the outer loop." },
    { id: "while-sa-10", question: "What is a sentinel-controlled loop?", answer: "A sentinel-controlled loop continues reading input until a special value (sentinel) is encountered. For example, reading integers until -1 is entered: while(num != -1) { // process num; num = sc.nextInt(); }" },
    { id: "while-sa-11", question: "Why is the while loop called a pre-test loop?", answer: "The while loop is called a pre-test loop because it checks the condition BEFORE executing the loop body. If the condition is false, the body never executes." },
    { id: "while-sa-12", question: "What is the output of: int i = 1; while(i <= 3) { System.out.println(i); i++; }", answer: "The output is:\n1\n2\n3\nThe loop runs 3 times with i = 1, 2, 3. When i becomes 4, the condition 4 <= 3 is false, and the loop ends." },
    { id: "while-sa-13", question: "What is the difference between break and continue?", answer: "break exits the loop completely — execution continues after the loop. continue skips only the current iteration — the loop continues with the next iteration." },
    { id: "while-sa-14", question: "When should you use a while loop instead of a for loop?", answer: "Use a while loop when the number of iterations is unknown or depends on runtime conditions, such as reading input until a sentinel value, waiting for a condition to become true, or processing data until the end is reached." },
    { id: "while-sa-15", question: "What is a loop variable?", answer: "A loop variable is a variable that controls the execution of a loop. It is initialized before the loop, its value is checked in the loop condition, and it is updated inside the loop body. In a while loop, the loop variable must be managed manually." },
    { id: "while-sa-16", question: "What is the output of: int i = 5; while(i > 0) { System.out.print(i--); }", answer: "The output is: 54321. The loop prints the current value of i, then decrements it. It runs while i > 0, so it prints 5, 4, 3, 2, 1." },
    { id: "while-sa-17", question: "Can a while loop have multiple conditions?", answer: "Yes, a while loop can have multiple conditions combined using logical operators (&&, ||). For example: while(x > 0 && x < 10) checks both conditions." },
    { id: "while-sa-18", question: "What happens if you use while(true) without a break?", answer: "The loop runs infinitely because the condition is always true. The program will never exit the loop unless there's a break statement or the program is forcibly terminated." },
    { id: "while-sa-19", question: "What is the output of: int i = 0; while(i++ < 3) System.out.print(i);", answer: "The output is: 123. Post-increment in the condition: compares 0<3 (true, prints 1), 1<3 (true, prints 2), 2<3 (true, prints 3), 3<3 (false, loop ends)." },
    { id: "while-sa-20", question: "Why is it important to update the loop variable in the correct direction?", answer: "The loop variable must be updated in the direction that makes the condition eventually false. If you're counting up (i <= 10), you must increment (i++). If you're counting down (i >= 1), you must decrement (i--). Updating in the wrong direction causes an infinite loop." },
  ],

  // ========== 12. LONG ANSWER QUESTIONS ==========
  longAnswerQuestions: [
    {
      id: "while-la-1",
      question: "Explain the while loop in Java with syntax and a complete example.",
      answer: "The while loop is a repetition control structure that executes a block of code repeatedly as long as a condition is true.\n\nSyntax:\n// Initialization (before loop)\ni = initialValue;\nwhile (condition) {\n    // code to execute\n    // update statement\n}\n\nExample:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}\nOutput: 1 2 3 4 5\n\nExecution flow:\n1. Initialize i = 1 before the loop.\n2. Check condition: 1 <= 5 is true. Enter loop body.\n3. Print 1. Update: i++ → i = 2.\n4. Check: 2 <= 5 is true. Print 2. i++ → i = 3.\n5. Continue until i = 5. Print 5. i++ → i = 6.\n6. Check: 6 <= 5 is false. Loop ends.\n\nKey points:\n- Entry-controlled: condition checked before each iteration.\n- If condition is false initially, loop body never executes.\n- Loop variable must be initialized before and updated inside the loop.",
    },
    {
      id: "while-la-2",
      question: "What is an infinite loop? How can it occur in a while loop? How can you prevent it?",
      answer: "An infinite loop is a loop that never terminates because the loop condition is always true or the loop variable is never updated in the correct direction.\n\nHow it occurs in while loops:\n1. Using while(true) without a break statement.\n2. Forgetting to update the loop variable inside the loop.\n3. Updating the loop variable in the wrong direction (e.g., i++ when condition is i >= 10).\n4. Using a condition that's always true (e.g., while(5 > 3)).\n\nExample of infinite loop:\nint i = 1;\nwhile (i <= 10) {\n    System.out.println(i);\n    // Missing i++ causes infinite loop\n}\n\nHow to prevent:\n1. Always update the loop variable inside the loop body.\n2. Ensure the update is in the correct direction (increment for i <= n, decrement for i >= n).\n3. Use a boolean flag to control the loop: while(running) { ... if(condition) running = false; }\n4. Add a safety counter in development to detect infinite loops.\n5. Use break statements to exit when a specific condition is met.",
    },
    {
      id: "while-la-3",
      question: "Compare and contrast while loop and do-while loop.",
      answer: "WHILE LOOP:\n- Entry-controlled: condition checked BEFORE loop body.\n- If condition is false initially, loop body never executes (0 iterations possible).\n- Syntax: while(condition) { ... }\n- Use when: number of iterations is unknown, menu-driven programs.\n\nDO-WHILE LOOP:\n- Exit-controlled: condition checked AFTER loop body.\n- Loop body always executes at least once (minimum 1 iteration).\n- Syntax: do { ... } while(condition);\n- Use when: you need at least one execution, like menus.\n\nExample comparison:\n// While loop\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}\n// Output: 1 2 3 4 5 (if i starts at 6, no output)\n\n// Do-while loop\nint i = 6;\ndo {\n    System.out.println(i);\n    i++;\n} while (i <= 5);\n// Output: 6 (executes once even though condition is false)\n\nKey difference: while checks first, do-while executes first then checks.",
    },
    {
      id: "while-la-4",
      question: "Explain nested while loops with an example to print a pattern.",
      answer: "Nested while loops are while loops inside other while loops. The inner loop completes all its iterations for each single iteration of the outer loop.\n\nExample: Print a 3x3 grid of stars\n\nint i = 1;\nwhile (i <= 3) {  // Outer loop: controls rows\n    int j = 1;\n    while (j <= 3) {  // Inner loop: controls columns\n        System.out.print('* ');\n        j++;\n    }\n    System.out.println();  // New line after each row\n    i++;\n}\n\nOutput:\n* * *\n* * *\n* * *\n\nExecution trace:\n- i = 1: Inner loop prints '* ' three times. New line.\n- i = 2: Inner loop prints '* ' three times. New line.\n- i = 3: Inner loop prints '* ' three times. New line.\n- i = 4: Outer loop ends.\n\nKey points:\n- The inner loop variable (j) must be re-initialized for each outer loop iteration.\n- Total iterations = outer iterations × inner iterations = 3 × 3 = 9.\n- For pattern printing, the inner loop's limit often depends on the outer loop variable.",
    },
    {
      id: "while-la-5",
      question: "Write a program using while loop to check if a number is prime.",
      answer: "A prime number is a number greater than 1 that has no divisors other than 1 and itself.\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter a number: ');\n        int num = sc.nextInt();\n        \n        boolean isPrime = true;\n        int i = 2;\n        while (i <= num / 2) {\n            if (num % i == 0) {\n                isPrime = false;\n                break;  // Exit early if divisor found\n            }\n            i++;\n        }\n        \n        if (isPrime && num > 1) {\n            System.out.println(num + ' is prime.');\n        } else {\n            System.out.println(num + ' is not prime.');\n        }\n        sc.close();\n    }\n}\n\nExplanation:\n1. We only need to check divisors up to num/2.\n2. If any divisor is found, isPrime = false and break exits the loop early.\n3. If no divisor is found, the number is prime.\n4. Special case: 1 is not prime, 2 is the only even prime.\n\nExample: num = 17\n- Check: 17 % 2 = 1 (not 0), 17 % 3 = 2, ..., 17 % 8 = 1\n- No divisors found. isPrime remains true. Output: '17 is prime.'",
    },
    {
      id: "while-la-6",
      question: "Write a program using while loop to reverse a number.",
      answer: "To reverse a number, we extract digits from right to left and build the reversed number.\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter a number: ');\n        int num = sc.nextInt();\n        int original = num;\n        int reversed = 0;\n        \n        while (num > 0) {\n            int digit = num % 10;  // Extract last digit\n            reversed = reversed * 10 + digit;  // Build reversed number\n            num = num / 10;  // Remove last digit\n        }\n        \n        System.out.println('Original: ' + original);\n        System.out.println('Reversed: ' + reversed);\n        sc.close();\n    }\n}\n\nExample: num = 12345\n- Iteration 1: digit = 5, reversed = 5, num = 1234\n- Iteration 2: digit = 4, reversed = 54, num = 123\n- Iteration 3: digit = 3, reversed = 543, num = 12\n- Iteration 4: digit = 2, reversed = 5432, num = 1\n- Iteration 5: digit = 1, reversed = 54321, num = 0\n- Loop ends. Output: Reversed: 54321\n\nKey insight: reversed * 10 shifts digits left, then + digit adds the new digit.",
    },
    {
      id: "while-la-7",
      question: "Write a program using while loop to calculate the sum of digits of a number.",
      answer: "To calculate the sum of digits, we extract each digit using % 10 and add it to a sum variable.\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter a number: ');\n        int num = sc.nextInt();\n        int sum = 0;\n        \n        while (num > 0) {\n            int digit = num % 10;  // Extract last digit\n            sum = sum + digit;  // Add to sum\n            num = num / 10;  // Remove last digit\n        }\n        \n        System.out.println('Sum of digits: ' + sum);\n        sc.close();\n    }\n}\n\nExample: num = 12345\n- Iteration 1: digit = 5, sum = 5, num = 1234\n- Iteration 2: digit = 4, sum = 9, num = 123\n- Iteration 3: digit = 3, sum = 12, num = 12\n- Iteration 4: digit = 2, sum = 14, num = 1\n- Iteration 5: digit = 1, sum = 15, num = 0\n- Loop ends. Output: Sum of digits: 15",
    },
    {
      id: "while-la-8",
      question: "Explain how to use a while loop for a menu-driven program.",
      answer: "A menu-driven program displays a menu repeatedly until the user chooses to exit. A while loop is perfect for this because the number of iterations depends on user input.\n\nStructure:\n1. Display the menu.\n2. Read user choice.\n3. while (choice != exitOption) {\n4.     Process the choice.\n5.     Display the menu again.\n6.     Read user choice.\n7. }\n8. Display exit message.\n\nExample:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int choice;\n        \n        do {\n            System.out.println('\\n--- MENU ---');\n            System.out.println('1. Add');\n            System.out.println('2. Subtract');\n            System.out.println('3. Multiply');\n            System.out.println('4. Exit');\n            System.out.print('Enter choice: ');\n            choice = sc.nextInt();\n            \n            if (choice == 1) {\n                System.out.println('Addition selected');\n            } else if (choice == 2) {\n                System.out.println('Subtraction selected');\n            } else if (choice == 3) {\n                System.out.println('Multiplication selected');\n            } else if (choice == 4) {\n                System.out.println('Exiting...');\n            } else {\n                System.out.println('Invalid choice');\n            }\n        } while (choice != 4);\n        \n        sc.close();\n    }\n}\n\nNote: This example uses do-while to ensure the menu displays at least once. A while loop can also be used with the menu displayed before the loop.",
    },
    {
      id: "while-la-9",
      question: "What is the output of the following code? Trace it step by step.\nint i = 1;\nwhile (i <= 3) {\n    int j = 1;\n    while (j <= 2) {\n        System.out.print(i * j + ' ');\n        j++;\n    }\n    System.out.println();\n    i++;\n}",
      answer: "Output:\n1 2\n2 4\n3 6\n\nTrace:\n- i = 1: Inner loop j=1 prints '1*1=1 ', j=2 prints '1*2=2 '. New line. i becomes 2.\n- i = 2: Inner loop j=1 prints '2*1=2 ', j=2 prints '2*2=4 '. New line. i becomes 3.\n- i = 3: Inner loop j=1 prints '3*1=3 ', j=2 prints '3*2=6 '. New line. i becomes 4.\n- i = 4: Outer loop condition 4 <= 3 is false. Loop ends.\n\nKey insight: The inner loop runs completely for each outer loop iteration. Total: 3 outer × 2 inner = 6 prints.",
    },
    {
      id: "while-la-10",
      question: "Write a program using while loop to print the Fibonacci series up to n terms.",
      answer: "The Fibonacci series is a sequence where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, ...\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter number of terms: ');\n        int n = sc.nextInt();\n        \n        int a = 0, b = 1;\n        System.out.print(a + ' ' + b);  // Print first two terms\n        \n        int i = 3;  // Start from 3rd term\n        while (i <= n) {\n            int c = a + b;\n            System.out.print(' ' + c);\n            a = b;\n            b = c;\n            i++;\n        }\n        sc.close();\n    }\n}\n\nExample: n = 10\nOutput: 0 1 1 2 3 5 8 13 21 34\n\nExplanation:\n- Start with a = 0, b = 1.\n- Each new term c = a + b.\n- Update: a = b, b = c.\n- Repeat until we have n terms.\n\nTrace for first few terms:\n- i = 3: c = 0+1 = 1. Print 1. a=1, b=1.\n- i = 4: c = 1+1 = 2. Print 2. a=1, b=2.\n- i = 5: c = 1+2 = 3. Print 3. a=2, b=3.",
    },
    {
      id: "while-la-11",
      question: "What is a sentinel value? Give an example of a sentinel-controlled while loop.",
      answer: "A sentinel value is a special value that signals the end of input. It is a value that would not normally be part of the data. The loop continues reading input until the sentinel value is encountered.\n\nCommon sentinel values:\n- -1 for positive numbers\n- 0 for positive numbers\n- 'quit' or 'exit' for strings\n- 999 for test scores\n\nExample: Read integers until -1 is entered, then calculate the sum.\n\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int sum = 0;\n        int num;\n        \n        System.out.print('Enter a number (-1 to stop): ');\n        num = sc.nextInt();\n        \n        while (num != -1) {\n            sum = sum + num;\n            System.out.print('Enter a number (-1 to stop): ');\n            num = sc.nextInt();\n        }\n        \n        System.out.println('Sum: ' + sum);\n        sc.close();\n    }\n}\n\nHow it works:\n1. Read the first number.\n2. While the number is not -1 (sentinel), add it to sum and read the next number.\n3. When -1 is entered, the loop ends and the sum is displayed.\n\nExample run:\nEnter a number: 5\nEnter a number: 10\nEnter a number: 3\nEnter a number: -1\nSum: 18",
    },
    {
      id: "while-la-12",
      question: "Explain the difference between while(i++ < 3) and while(++i < 3) with examples.",
      answer: "The difference is between post-increment (i++) and pre-increment (++i).\n\nPost-increment (i++):\n- Uses the current value of i for the comparison.\n- Then increments i.\n\nPre-increment (++i):\n- Increments i first.\n- Then uses the new value for the comparison.\n\nExample 1: while(i++ < 3) with i starting at 0\n- Iteration 1: Compare 0 < 3 (true), print 1, i becomes 1\n- Iteration 2: Compare 1 < 3 (true), print 2, i becomes 2\n- Iteration 3: Compare 2 < 3 (true), print 3, i becomes 3\n- Iteration 4: Compare 3 < 3 (false), loop ends\n- Output: 123\n\nExample 2: while(++i < 3) with i starting at 0\n- Iteration 1: i becomes 1. Compare 1 < 3 (true), print 1\n- Iteration 2: i becomes 2. Compare 2 < 3 (true), print 2\n- Iteration 3: i becomes 3. Compare 3 < 3 (false), loop ends\n- Output: 12\n\nKey difference:\n- i++ < 3: prints 1, 2, 3 (3 iterations)\n- ++i < 3: prints 1, 2 (2 iterations)\n\nThe increment happens at different times, affecting when the condition becomes false.",
    },
    {
      id: "while-la-13",
      question: "Write a program using nested while loops to print a hollow square pattern.",
      answer: "A hollow square prints stars on the border and spaces inside.\n\nProgram:\npublic class Main {\n    public static void main(String[] args) {\n        int n = 5;  // Size of square\n        int i = 1;\n        \n        while (i <= n) {\n            int j = 1;\n            while (j <= n) {\n                // Print star on border, space inside\n                if (i == 1 || i == n || j == 1 || j == n) {\n                    System.out.print('* ');\n                } else {\n                    System.out.print('  ');\n                }\n                j++;\n            }\n            System.out.println();\n            i++;\n        }\n    }\n}\n\nOutput for n = 5:\n* * * * *\n*       *\n*       *\n*       *\n* * * * *\n\nExplanation:\n- Outer loop (i) controls rows from 1 to 5.\n- Inner loop (j) controls columns from 1 to 5.\n- Condition: if i is 1 or 5 (first/last row) OR j is 1 or 5 (first/last column), print star.\n- Otherwise, print spaces to create the hollow effect.\n\nKey insight: The condition checks if we're on the boundary of the square.",
    },
    {
      id: "while-la-14",
      question: "What is the output? Trace the code.\nint i = 1;\nwhile (i <= 5) {\n    int j = 1;\n    while (j <= i) {\n        System.out.print(j + ' ');\n        j++;\n    }\n    System.out.println();\n    i++;\n}",
      answer: "Output:\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n\nTrace:\n- i = 1: j goes 1 to 1. Prints '1 '. New line. i becomes 2.\n- i = 2: j goes 1 to 2. Prints '1 2 '. New line. i becomes 3.\n- i = 3: j goes 1 to 3. Prints '1 2 3 '. New line. i becomes 4.\n- i = 4: j goes 1 to 4. Prints '1 2 3 4 '. New line. i becomes 5.\n- i = 5: j goes 1 to 5. Prints '1 2 3 4 5 '. New line. i becomes 6.\n- i = 6: Outer loop condition 6 <= 5 is false. Loop ends.\n\nKey pattern: Row i prints numbers from 1 to i. This creates a right-angled triangle of numbers.",
    },
    {
      id: "while-la-15",
      question: "Write a program using while loop to find the sum of first n natural numbers.",
      answer: "A program to calculate the sum of the first n natural numbers (1 + 2 + 3 + ... + n).\n\nProgram:\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print('Enter n: ');\n        int n = sc.nextInt();\n        \n        int sum = 0;\n        int i = 1;\n        while (i <= n) {\n            sum = sum + i;\n            i++;\n        }\n        \n        System.out.println('Sum of first ' + n + ' natural numbers = ' + sum);\n        sc.close();\n    }\n}\n\nExample: n = 10\nOutput: Sum of first 10 natural numbers = 55\n\nTrace:\n- i = 1: sum = 0 + 1 = 1\n- i = 2: sum = 1 + 2 = 3\n- i = 3: sum = 3 + 3 = 6\n- i = 4: sum = 6 + 4 = 10\n- ...\n- i = 10: sum = 45 + 10 = 55\n- i = 11: Loop ends\n\nFormula verification: Sum = n(n+1)/2 = 10(11)/2 = 55 ✓",
    },
  ],

  // ========== 13. PROGRAMMING QUESTIONS ==========
  programmingQuestions: {
    easy: [
      {
        id: "while-pg-e-1",
        question: "Write a program using while loop to print numbers from 1 to n.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = 1;
        while (i <= n) {
            System.out.println(i);
            i++;
        }
        sc.close();
    }
}`,
        output: "Enter n: 5\n1\n2\n3\n4\n5",
      },
      {
        id: "while-pg-e-2",
        question: "Write a program using while loop to print even numbers from 1 to n.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = 2;
        while (i <= n) {
            System.out.println(i);
            i += 2;
        }
        sc.close();
    }
}`,
        output: "Enter n: 10\n2\n4\n6\n8\n10",
      },
      {
        id: "while-pg-e-3",
        question: "Write a program using while loop to calculate the sum of first n natural numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int sum = 0;
        int i = 1;
        while (i <= n) {
            sum = sum + i;
            i++;
        }
        System.out.println("Sum = " + sum);
        sc.close();
    }
}`,
        output: "Enter n: 10\nSum = 55",
      },
      {
        id: "while-pg-e-4",
        question: "Write a program using while loop to print the multiplication table of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        int i = 1;
        while (i <= 10) {
            System.out.println(num + " x " + i + " = " + (num * i));
            i++;
        }
        sc.close();
    }
}`,
        output: "Enter number: 7\n7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70",
      },
      {
        id: "while-pg-e-5",
        question: "Write a program using while loop to print numbers in reverse from n to 1.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = n;
        while (i >= 1) {
            System.out.println(i);
            i--;
        }
        sc.close();
    }
}`,
        output: "Enter n: 5\n5\n4\n3\n2\n1",
      },
      {
        id: "while-pg-e-6",
        question: "Write a program using while loop to calculate the factorial of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int factorial = 1;
        int i = 1;
        while (i <= num) {
            factorial = factorial * i;
            i++;
        }
        System.out.println(num + "! = " + factorial);
        sc.close();
    }
}`,
        output: "Enter a number: 6\n6! = 720",
      },
      {
        id: "while-pg-e-7",
        question: "Write a program using while loop to print odd numbers from 1 to n.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int i = 1;
        while (i <= n) {
            System.out.println(i);
            i += 2;
        }
        sc.close();
    }
}`,
        output: "Enter n: 10\n1\n3\n5\n7\n9",
      },
      {
        id: "while-pg-e-8",
        question: "Write a program using while loop to count the number of digits in a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int count = 0;
        while (num > 0) {
            count++;
            num = num / 10;
        }
        System.out.println("Number of digits: " + count);
        sc.close();
    }
}`,
        output: "Enter a number: 12345\nNumber of digits: 5",
      },
      {
        id: "while-pg-e-9",
        question: "Write a program using while loop to print the reverse of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int reversed = 0;
        while (num > 0) {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num = num / 10;
        }
        System.out.println("Reversed: " + reversed);
        sc.close();
    }
}`,
        output: "Enter a number: 12345\nReversed: 54321",
      },
      {
        id: "while-pg-e-10",
        question: "Write a program using while loop to check if a number is positive, negative, or zero.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        if (num > 0) {
            System.out.println("Positive");
        } else if (num < 0) {
            System.out.println("Negative");
        } else {
            System.out.println("Zero");
        }
        sc.close();
    }
}`,
        output: "Enter a number: -5\nNegative",
      },
    ],
    medium: [
      {
        id: "while-pg-m-1",
        question: "Write a program using while loop to check if a number is prime.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        boolean isPrime = true;
        int i = 2;
        while (i <= num / 2) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
            i++;
        }
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
        id: "while-pg-m-2",
        question: "Write a program using while loop to generate the Fibonacci series up to n terms.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int a = 0, b = 1;
        System.out.print(a + " " + b);
        int i = 3;
        while (i <= n) {
            int c = a + b;
            System.out.print(" " + c);
            a = b;
            b = c;
            i++;
        }
        sc.close();
    }
}`,
        output: "Enter n: 10\n0 1 1 2 3 5 8 13 21 34",
      },
      {
        id: "while-pg-m-3",
        question: "Write a program using while loop to check if a number is an Armstrong number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num;
        int sum = 0;
        while (num > 0) {
            int digit = num % 10;
            sum = sum + (digit * digit * digit);
            num = num / 10;
        }
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
        id: "while-pg-m-4",
        question: "Write a program using while loop to check if a number is a palindrome.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num;
        int reversed = 0;
        while (num > 0) {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num = num / 10;
        }
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
        id: "while-pg-m-5",
        question: "Write a program using while loop to calculate the sum of digits of a number.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int sum = 0;
        while (num > 0) {
            int digit = num % 10;
            sum = sum + digit;
            num = num / 10;
        }
        System.out.println("Sum of digits = " + sum);
        sc.close();
    }
}`,
        output: "Enter a number: 12345\nSum of digits = 15",
      },
      {
        id: "while-pg-m-6",
        question: "Write a program using while loop to print all Armstrong numbers from 1 to 1000.",
        solution: `public class Main {
    public static void main(String[] args) {
        int num = 1;
        while (num <= 1000) {
            int original = num;
            int sum = 0;
            int temp = num;
            while (temp > 0) {
                int digit = temp % 10;
                sum = sum + (digit * digit * digit);
                temp = temp / 10;
            }
            if (sum == num) {
                System.out.print(num + " ");
            }
            num++;
        }
    }
}`,
        output: "1 153 370 371 407 ",
      },
      {
        id: "while-pg-m-7",
        question: "Write a program using while loop to print all palindrome numbers from 100 to 200.",
        solution: `public class Main {
    public static void main(String[] args) {
        int num = 100;
        while (num <= 200) {
            int original = num;
            int reversed = 0;
            int temp = num;
            while (temp > 0) {
                int digit = temp % 10;
                reversed = reversed * 10 + digit;
                temp = temp / 10;
            }
            if (reversed == original) {
                System.out.print(num + " ");
            }
            num++;
        }
    }
}`,
        output: "101 111 121 131 141 151 161 171 181 191 ",
      },
      {
        id: "while-pg-m-8",
        question: "Write a program using while loop to implement a simple menu-driven calculator.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        do {
            System.out.println("\\n--- CALCULATOR ---");
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
        id: "while-pg-m-9",
        question: "Write a program using while loop to calculate the sum of first n odd numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int sum = 0;
        int i = 1;
        int count = 0;
        while (count < n) {
            sum = sum + i;
            count++;
            i += 2;
        }
        System.out.println("Sum of first " + n + " odd numbers = " + sum);
        sc.close();
    }
}`,
        output: "Enter n: 5\nSum of first 5 odd numbers = 25",
      },
      {
        id: "while-pg-m-10",
        question: "Write a program using while loop to find the GCD (Greatest Common Divisor) of two numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int originalA = a;
        int originalB = b;
        
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        
        System.out.println("GCD of " + originalA + " and " + originalB + " = " + a);
        sc.close();
    }
}`,
        output: "Enter two numbers: 48 36\nGCD of 48 and 36 = 12",
      },
    ],
    hard: [
      {
        id: "while-pg-h-1",
        question: "Write a program using while loop to implement a complete ATM system with balance inquiry, withdrawal, deposit, and exit options.",
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
        id: "while-pg-h-2",
        question: "Write a program using while loop to print all perfect numbers from 1 to 1000.",
        solution: `public class Main {
    public static void main(String[] args) {
        int num = 1;
        while (num <= 1000) {
            int sum = 0;
            int i = 1;
            while (i < num) {
                if (num % i == 0) {
                    sum = sum + i;
                }
                i++;
            }
            if (sum == num) {
                System.out.print(num + " ");
            }
            num++;
        }
    }
}`,
        output: "1 6 28 496 ",
      },
      {
        id: "while-pg-h-3",
        question: "Write a program using while loop to implement a number guessing game.",
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
        
        while (guess != secretNumber) {
            if (guess < secretNumber) {
                System.out.println("Too low! Try again:");
            } else {
                System.out.println("Too high! Try again:");
            }
            guess = sc.nextInt();
            attempts++;
        }
        
        System.out.println("Correct! You guessed it in " + attempts + " attempts.");
        sc.close();
    }
}`,
        output: "Guess the number: 50\nToo high! Try again: 30\nToo low! Try again: 42\nCorrect! You guessed it in 3 attempts.",
      },
      {
        id: "while-pg-h-4",
        question: "Write a program using while loop to print the pattern:\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
        solution: `public class Main {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 5) {
            int j = 1;
            while (j <= i) {
                System.out.print(j + " ");
                j++;
            }
            System.out.println();
            i++;
        }
    }
}`,
        output: "1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 ",
      },
      {
        id: "while-pg-h-5",
        question: "Write a program using while loop to calculate the sum of squares of first n natural numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        int sum = 0;
        int i = 1;
        while (i <= n) {
            sum = sum + (i * i);
            i++;
        }
        System.out.println("Sum of squares = " + sum);
        sc.close();
    }
}`,
        output: "Enter n: 5\nSum of squares = 55",
      },
      {
        id: "while-pg-h-6",
        question: "Write a program using while loop to check if a number is a Strong number (sum of factorials of digits equals the number).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num;
        int sum = 0;
        
        while (num > 0) {
            int digit = num % 10;
            int fact = 1;
            int i = 1;
            while (i <= digit) {
                fact = fact * i;
                i++;
            }
            sum = sum + fact;
            num = num / 10;
        }
        
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
        id: "while-pg-h-7",
        question: "Write a program using while loop to print the pattern:\n* * * * *\n*       *\n*       *\n*       *\n* * * * *",
        solution: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int i = 1;
        while (i <= n) {
            int j = 1;
            while (j <= n) {
                if (i == 1 || i == n || j == 1 || j == n) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
                j++;
            }
            System.out.println();
            i++;
        }
    }
}`,
        output: "* * * * *\n*       *\n*       *\n*       *\n* * * * *",
      },
      {
        id: "while-pg-h-8",
        question: "Write a program using while loop to find the LCM (Least Common Multiple) of two numbers.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int lcm = (a > b) ? a : b;
        
        while (true) {
            if (lcm % a == 0 && lcm % b == 0) {
                System.out.println("LCM of " + a + " and " + b + " = " + lcm);
                break;
            }
            lcm++;
        }
        sc.close();
    }
}`,
        output: "Enter two numbers: 12 18\nLCM of 12 and 18 = 36",
      },
      {
        id: "while-pg-h-9",
        question: "Write a program using while loop to print the pattern:\n    *\n   * *\n  * * *\n * * * *\n* * * * *",
        solution: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int i = 1;
        while (i <= n) {
            int j = 1;
            while (j <= n - i) {
                System.out.print("  ");
                j++;
            }
            int k = 1;
            while (k <= i) {
                System.out.print("* ");
                k++;
            }
            System.out.println();
            i++;
        }
    }
}`,
        output: "    * \n   * * \n  * * * \n * * * * \n* * * * * ",
      },
      {
        id: "while-pg-h-10",
        question: "Write a program using while loop to read integers until a negative number is entered, then find the maximum and minimum.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter numbers (negative to stop): ");
        int num = sc.nextInt();
        int max = num;
        int min = num;
        int count = 0;
        
        while (num >= 0) {
            if (num > max) max = num;
            if (num < min) min = num;
            count++;
            num = sc.nextInt();
        }
        
        if (count > 0) {
            System.out.println("\n=== ANALYSIS ===");
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
      output: "Read marks until -1, then show analysis",
    },
  ],

  // ========== 15. PREVIOUS YEAR QUESTIONS ==========
  previousYearQuestions: [
    {
      id: "while-py-1",
      question: "(ICSE 2023) Write a program using while loop to print the first 10 natural numbers.",
      answer: "int i = 1;\nwhile (i <= 10) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Initialize i = 1. While i <= 10, print i and increment. Loop runs 10 times.",
    },
    {
      id: "while-py-2",
      question: "(ICSE 2023) Write a program using while loop to calculate the sum of first n natural numbers.",
      answer: "int sum = 0, i = 1;\nwhile (i <= n) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);",
      explanation: "Accumulator pattern: initialize sum = 0, add each number, increment i.",
    },
    {
      id: "while-py-3",
      question: "(ICSE 2022) Write a program using while loop to check if a number is prime.",
      answer: "boolean isPrime = true;\nint i = 2;\nwhile (i <= num/2) {\n    if (num % i == 0) {\n        isPrime = false;\n        break;\n    }\n    i++;\n}",
      explanation: "Check divisors from 2 to num/2. If any divisor found, not prime.",
    },
    {
      id: "while-py-4",
      question: "(ICSE 2022) Write a program using while loop to reverse a number.",
      answer: "int reversed = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    reversed = reversed * 10 + digit;\n    num = num / 10;\n}",
      explanation: "Extract digits from right to left and build reversed number.",
    },
    {
      id: "while-py-5",
      question: "(ICSE 2021) Write a program using while loop to print the Fibonacci series up to n terms.",
      answer: "int a = 0, b = 1;\nSystem.out.print(a + \" \" + b);\nint i = 3;\nwhile (i <= n) {\n    int c = a + b;\n    System.out.print(\" \" + c);\n    a = b;\n    b = c;\n    i++;\n}",
      explanation: "Each term is sum of two preceding terms. Start with 0, 1.",
    },
    {
      id: "while-py-6",
      question: "(ICSE 2021) Write a program using while loop to calculate the factorial of a number.",
      answer: "int fact = 1, i = 1;\nwhile (i <= num) {\n    fact = fact * i;\n    i++;\n}\nSystem.out.println(fact);",
      explanation: "Multiply all numbers from 1 to num. Initialize fact = 1.",
    },
  ],

  // ========== 16. AI VIVA QUESTIONS ==========
  aiVivaQuestions: [
    {
      id: "while-av-1",
      question: "What is a while loop in Java?",
      answer: "A while loop is a repetition control structure that executes a block of code repeatedly as long as a condition is true. It is entry-controlled, meaning the condition is checked before each iteration.",
    },
    {
      id: "while-av-2",
      question: "What is the difference between while and do-while loops?",
      answer: "The while loop is entry-controlled (condition checked before), so it may not execute at all if the condition is false initially. The do-while loop is exit-controlled (condition checked after), so it always executes at least once.",
    },
    {
      id: "while-av-3",
      question: "What happens if the condition in a while loop is always true?",
      answer: "The loop becomes an infinite loop and runs forever unless there's a break statement or the program is forcibly terminated. This is generally a bug.",
    },
    {
      id: "while-av-4",
      question: "Can you convert a while loop to a for loop?",
      answer: "Yes, any while loop can be converted to a for loop and vice versa. The for loop is just a more compact way to write the initialization, condition, and update in one line.",
    },
    {
      id: "while-av-5",
      question: "What is an entry-controlled loop?",
      answer: "An entry-controlled loop checks the condition before entering the loop body. If the condition is false, the body never executes. The while loop is an example.",
    },
    {
      id: "while-av-6",
      question: "What is a sentinel value?",
      answer: "A sentinel value is a special value that signals the end of input. For example, -1 is often used as a sentinel for positive numbers. The loop continues until the sentinel is encountered.",
    },
    {
      id: "while-av-7",
      question: "What is the output of: int i = 0; while(i++ < 3) System.out.print(i);",
      answer: "The output is 123. Post-increment in the condition: compares 0<3 (true, prints 1), 1<3 (true, prints 2), 2<3 (true, prints 3), 3<3 (false).",
    },
    {
      id: "while-av-8",
      question: "Why is the while loop called a pre-test loop?",
      answer: "Because the condition is tested BEFORE executing the loop body. If the condition is false, the body never executes. This is also called entry-controlled.",
    },
    {
      id: "while-av-9",
      question: "What is the difference between break and continue?",
      answer: "break exits the loop completely - execution continues after the loop. continue skips only the current iteration - the loop continues with the next iteration.",
    },
    {
      id: "while-av-10",
      question: "When should you use a while loop instead of a for loop?",
      answer: "Use while when the number of iterations is unknown or depends on runtime conditions, such as reading input until a sentinel value, waiting for a condition, or processing data until the end is reached.",
    },
    {
      id: "while-av-11",
      question: "What is an infinite loop? How can you prevent it?",
      answer: "An infinite loop never terminates. Prevent it by: (1) always updating the loop variable, (2) ensuring the update direction matches the condition, (3) using break statements when needed, (4) avoiding while(true) without exit logic.",
    },
    {
      id: "while-av-12",
      question: "Can a while loop have multiple conditions?",
      answer: "Yes, using logical operators. For example: while(x > 0 && x < 10) checks both conditions. Both must be true for the loop to continue.",
    },
    {
      id: "while-av-13",
      question: "What is the output of: int i = 5; while(i-- > 0) System.out.print(i);",
      answer: "The output is 43210. Post-decrement in condition: compares 5>0 (true, prints 4), 4>0 (true, prints 3), 3>0 (true, prints 2), 2>0 (true, prints 1), 1>0 (true, prints 0), 0>0 (false).",
    },
    {
      id: "while-av-14",
      question: "What is a nested while loop?",
      answer: "A while loop inside another while loop. The inner loop completes all its iterations for each single iteration of the outer loop. Commonly used for pattern printing.",
    },
    {
      id: "while-av-15",
      question: "What is the time complexity of a while loop?",
      answer: "It depends on the condition. If the loop runs n times, it's O(n). If it's nested (two loops), it's O(n²). If it divides the problem size each time (like binary search), it could be O(log n).",
    },
    {
      id: "while-av-16",
      question: "What happens if you forget to update the loop variable?",
      answer: "The loop becomes infinite because the condition never changes. For example, if i starts at 1 and the condition is i <= 10, but i is never incremented, the loop runs forever.",
    },
    {
      id: "while-av-17",
      question: "Can you use while(true) in Java?",
      answer: "Yes, but it creates an infinite loop. You must have a break statement inside to exit. Commonly used in menu-driven programs: while(true) { ... if(choice == 4) break; }",
    },
    {
      id: "while-av-18",
      question: "What is the scope of a variable declared inside a while loop?",
      answer: "A variable declared inside the while loop (like int j = 1) is only accessible within that loop. It cannot be accessed outside the loop.",
    },
    {
      id: "while-av-19",
      question: "What is the output of: int i = 1; while(i <= 5) { System.out.println(i); i += 2; }",
      answer: "The output is 1, 3, 5. i starts at 1, increments by 2 each time: 1, 3, 5. When i becomes 7, 7 <= 5 is false, so the loop ends.",
    },
    {
      id: "while-av-20",
      question: "Explain the difference between i++ and ++i in while loop conditions.",
      answer: "i++ (post-increment) uses the current value for comparison, then increments. ++i (pre-increment) increments first, then uses the new value. This affects how many times the loop executes. For example, while(i++ < 3) with i=0 runs 3 times, while(++i < 3) runs 2 times.",
    },
    {
      id: "while-av-21",
      question: "What is a loop variable?",
      answer: "A loop variable is a variable that controls the execution of a loop. It is initialized before the loop, checked in the condition, and updated inside the loop body. In while loops, it must be managed manually.",
    },
    {
      id: "while-av-22",
      question: "Why is initialization important in a while loop?",
      answer: "If the loop variable is not initialized, it has a default value (0 for int) which may cause unexpected behavior. Always initialize before the loop to ensure predictable execution.",
    },
    {
      id: "while-av-23",
      question: "What is the output of: int i = 0; while(i++ < 3); System.out.println(i);",
      answer: "The output is 4. The semicolon creates an empty loop. i increments: 0<3 (true, i=1), 1<3 (true, i=2), 2<3 (true, i=3), 3<3 (false, i=4). Then prints 4.",
    },
    {
      id: "while-av-24",
      question: "Can you have multiple conditions in a while loop?",
      answer: "Yes, using logical operators && and ||. For example: while(x > 0 && x < 10) continues while x is positive AND less than 10.",
    },
    {
      id: "while-av-25",
      question: "What is the output of: int i = 1; while(i <= 3) { int j = 1; while(j <= 2) { System.out.print(i*j + \" \"); j++; } i++; }",
      answer: "The output is: 1 2 2 4 3 6. Outer loop runs 3 times (i=1,2,3). Inner loop runs 2 times each (j=1,2). Multiplies i*j each time.",
    },
    {
      id: "while-av-26",
      question: "What is the purpose of the continue statement?",
      answer: "The continue statement skips the current iteration and moves to the next iteration. The remaining code in the loop body is not executed for that iteration.",
    },
    {
      id: "while-av-27",
      question: "What is the purpose of the break statement?",
      answer: "The break statement exits the loop immediately, regardless of the condition. Execution continues with the statement after the loop.",
    },
    {
      id: "while-av-28",
      question: "Can a while loop run backwards?",
      answer: "Yes, by using decrement (i--) instead of increment. For example: int i = 10; while(i >= 1) { System.out.println(i); i--; } prints 10 down to 1.",
    },
    {
      id: "while-av-29",
      question: "What is the output of: int i = 1; while(i <= 5) { if(i == 3) continue; System.out.print(i); i++; }",
      answer: "This is a trick question. It prints 1, 2, then when i == 3, continue skips the rest. But i is never incremented, so it stays 3 forever - infinite loop!",
    },
    {
      id: "while-av-30",
      question: "What are the three main components of a while loop?",
      answer: "(1) Initialization - done before the loop, (2) Condition - checked before each iteration, (3) Update - done inside the loop body. Unlike for loops, these are separate in while loops.",
    },
  ],

  // ========== 17. PRACTICE TEST ==========
  practiceTest: {
    title: "WHILE Loop - Practice Test",
    duration: "45 minutes",
    totalMarks: 50,
    instructions: "Attempt all questions. Write programs with proper indentation and comments.",
    sections: [
      {
        name: "Section A: Objective Questions",
        marks: 10,
        questions: [
          { id: "pt-1", question: "The while loop is _____ controlled.", options: ["entry", "exit", "both", "none"], answer: 0 },
          { id: "pt-2", question: "If condition is false initially, while loop executes _____ times.", options: ["1", "0", "infinite", "compilation error"], answer: 1 },
          { id: "pt-3", question: "The loop variable must be updated _____ the while loop.", options: ["before", "after", "inside", "in condition"], answer: 2 },
          { id: "pt-4", question: "Forgetting to update loop variable causes _____ .", options: ["error", "infinite loop", "no output", "wrong output"], answer: 1 },
          { id: "pt-5", question: "Which loop is best for unknown iterations?", options: ["for", "while", "do-while", "all"], answer: 1 },
        ],
      },
      {
        name: "Section B: Output Questions",
        marks: 10,
        questions: [
          { id: "pt-6", question: "What is the output?\nint i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}", answer: "1 2 3" },
          { id: "pt-7", question: "What is the output?\nint i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}", answer: "54321" },
          { id: "pt-8", question: "What is the output?\nint i = 1;\nwhile (i <= 3) {\n    int j = 1;\n    while (j <= 2) {\n        System.out.print(i * j + \" \");\n        j++;\n    }\n    i++;\n}", answer: "1 2 2 4 3 6" },
        ],
      },
      {
        name: "Section C: Programming Questions",
        marks: 20,
        questions: [
          { id: "pt-9", question: "Write a program using while loop to print numbers from 1 to n.", answer: "int i = 1;\nwhile (i <= n) {\n    System.out.println(i);\n    i++;\n}" },
          { id: "pt-10", question: "Write a program using while loop to calculate the sum of first n natural numbers.", answer: "int sum = 0, i = 1;\nwhile (i <= n) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);" },
          { id: "pt-11", question: "Write a program using while loop to check if a number is prime.", answer: "boolean isPrime = true;\nint i = 2;\nwhile (i <= num/2) {\n    if (num % i == 0) {\n        isPrime = false;\n        break;\n    }\n    i++;\n}" },
        ],
      },
      {
        name: "Section D: HOTS (Higher Order Thinking Skills)",
        marks: 10,
        questions: [
          { id: "pt-12", question: "What is the output?\nint i = 0;\nwhile (i++ < 3)\n    System.out.print(i);", answer: "123", explanation: "Post-increment: compares 0<3 (true, prints 1), 1<3 (true, prints 2), 2<3 (true, prints 3), 3<3 (false)." },
          { id: "pt-13", question: "Trace the output:\nint i = 1;\nwhile (i <= 5) {\n    int j = 1;\n    while (j <= i) {\n        System.out.print(j + \" \");\n        j++;\n    }\n    System.out.println();\n    i++;\n}", answer: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5" },
        ],
      },
    ],
  },

  // ========== 18. REVISION NOTES ==========
  revisionNotes: [
    "The while loop is entry-controlled — condition checked BEFORE each iteration.",
    "If condition is false initially, loop body never executes (0 iterations).",
    "Loop variable must be initialized BEFORE the while loop.",
    "Loop variable must be updated INSIDE the while loop body.",
    "Forgetting to update the loop variable causes an infinite loop.",
    "While loops are best when the number of iterations is UNKNOWN.",
    "For loops are best when the number of iterations is KNOWN.",
    "while(true) creates an infinite loop — use break to exit.",
    "The break statement exits the loop immediately.",
    "The continue statement skips the current iteration.",
    "While loops can be nested — inner loop completes for each outer iteration.",
    "A while loop can be converted to a for loop and vice versa.",
    "The condition must eventually become false, otherwise infinite loop.",
    "While loops are commonly used for menu-driven programs.",
    "While loops are commonly used for sentinel-controlled input.",
  ],

  // ========== 19. CHEATSHEET ==========
  cheatsheet: {
    title: "WHILE Loop - Quick Reference",
    syntax: "while (condition) { // code; update; }",
    keyPoints: [
      "Entry-controlled: condition checked before each iteration",
      "Initialize loop variable BEFORE the loop",
      "Update loop variable INSIDE the loop body",
      "If condition false initially → 0 iterations",
      "Forgetting update → infinite loop",
      "Best for unknown number of iterations",
    ],
    commonPatterns: [
      { pattern: "Count 1 to n", code: "int i = 1;\nwhile (i <= n) { ... i++; }" },
      { pattern: "Count n to 1", code: "int i = n;\nwhile (i >= 1) { ... i--; }" },
      { pattern: "Even numbers", code: "int i = 2;\nwhile (i <= n) { ... i += 2; }" },
      { pattern: "Odd numbers", code: "int i = 1;\nwhile (i <= n) { ... i += 2; }" },
      { pattern: "Menu-driven", code: "while (choice != 4) { ... }" },
      { pattern: "Sentinel", code: "while (num != -1) { ... }" },
    ],
    loopControl: [
      { statement: "break", purpose: "Exits the loop immediately" },
      { statement: "continue", purpose: "Skips current iteration, moves to next" },
    ],
  },

  // ========== 20. INTERVIEW QUESTIONS ==========
  interviewQuestions: [
    {
      id: "while-iq-1",
      question: "What is a while loop?",
      answer: "A while loop is a repetition control structure that executes a block of code repeatedly as long as a condition is true. It is entry-controlled, meaning the condition is checked before each iteration.",
    },
    {
      id: "while-iq-2",
      question: "What is the difference between while and do-while?",
      answer: "While is entry-controlled (condition checked before, may not execute at all). Do-while is exit-controlled (condition checked after, always executes at least once).",
    },
    {
      id: "while-iq-3",
      question: "What is an infinite loop?",
      answer: "An infinite loop never terminates because the condition is always true or the loop variable is never updated. Example: while(true) without break, or while(i <= 10) without i++.",
    },
    {
      id: "while-iq-4",
      question: "Can you explain nested while loops?",
      answer: "Nested while loops are while loops inside other while loops. The inner loop completes all its iterations for each iteration of the outer loop. Commonly used for pattern printing and matrix operations.",
    },
    {
      id: "while-iq-5",
      question: "What is the time complexity of a while loop?",
      answer: "It depends on the number of iterations. A simple while loop that runs n times has O(n) complexity. Nested while loops have O(n²). Loops that reduce the problem size (like binary search) have O(log n).",
    },
    {
      id: "while-iq-6",
      question: "What is a sentinel-controlled loop?",
      answer: "A sentinel-controlled loop continues reading input until a special value (sentinel) is encountered. For example, reading integers until -1 is entered: while(num != -1) { ... }",
    },
    {
      id: "while-iq-7",
      question: "What is the output of: int i = 0; while(i++ < 3) System.out.println(i);",
      answer: "The output is 1, 2, 3. Post-increment in condition: compares 0<3 (true, prints 1), 1<3 (true, prints 2), 2<3 (true, prints 3), 3<3 (false).",
    },
    {
      id: "while-iq-8",
      question: "When would you use a while loop over a for loop?",
      answer: "Use while when the number of iterations is unknown or depends on runtime conditions, such as reading input until a sentinel value, waiting for a condition, or processing data until the end is reached.",
    },
    {
      id: "while-iq-9",
      question: "What is the scope of a variable declared inside a while loop?",
      answer: "A variable declared inside the while loop is only accessible within that loop. It cannot be accessed outside the loop. Each iteration creates a new scope if the variable is declared inside.",
    },
    {
      id: "while-iq-10",
      question: "What is the difference between break and continue?",
      answer: "break exits the loop completely - execution continues after the loop. continue skips only the current iteration - the loop continues with the next iteration.",
    },
    {
      id: "while-iq-11",
      question: "Can a while loop have an empty body?",
      answer: "Yes, using a semicolon: while(true); This creates an infinite loop with an empty body. It's valid but almost always a bug.",
    },
    {
      id: "while-iq-12",
      question: "What is the output of: int i = 5; while(i-- > 0) System.out.print(i);",
      answer: "The output is 43210. Post-decrement in condition: compares 5>0 (true, prints 4), 4>0 (true, prints 3), 3>0 (true, prints 2), 2>0 (true, prints 1), 1>0 (true, prints 0), 0>0 (false).",
    },
    {
      id: "while-iq-13",
      question: "How do you prevent infinite loops in while loops?",
      answer: "Always update the loop variable inside the loop, ensure the update direction matches the condition (increment for i <= n, decrement for i >= n), use break statements when needed, and avoid while(true) without exit logic.",
    },
    {
      id: "while-iq-14",
      question: "What is a pre-test loop?",
      answer: "A pre-test loop checks the condition before executing the loop body. The while loop is a pre-test loop (entry-controlled). The do-while loop is a post-test loop (exit-controlled).",
    },
    {
      id: "while-iq-15",
      question: "Can you have multiple conditions in a while loop?",
      answer: "Yes, using logical operators && and ||. For example: while(x > 0 && x < 10) continues while both conditions are true. while(x < 0 || x > 100) continues while at least one condition is true.",
    },
  ],

  // ========== 21. EXAM TRICKS ==========
  examTricks: [
    "Always check for infinite loop traps: is the loop variable being updated? Does the condition eventually become false?",
    "In ICSE exams, while loop questions often involve reading input until a sentinel value (like -1 or 0).",
    "Trace the loop variable carefully — write down its value at each iteration.",
    "Remember: if the condition is false initially, the loop body never executes (0 iterations).",
    "While loops are commonly used for menu-driven programs: while(choice != 4) { ... }",
    "For pattern printing with while loops, you'll typically need nested while loops.",
    "Be careful with while(true) — this creates an infinite loop unless there's a break statement inside.",
    "In output questions, count the number of iterations carefully — the loop runs WHILE the condition is true.",
    "The condition in while loop is checked n+1 times for n iterations (one extra check when it becomes false).",
    "Post-increment (i++) in condition: uses current value, then increments. Pre-increment (++i): increments first, then uses new value.",
    "When converting while to for: initialization goes to first part, condition to second, update to third.",
    "Nested while loops: inner loop must be re-initialized for each outer loop iteration.",
    "Common mistake: forgetting braces — only the first statement is inside the loop without braces.",
    "Common mistake: semicolon after while condition creates empty loop body.",
    "While loops are perfect for: menu-driven programs, sentinel-controlled input, processing until condition met.",
  ],

  // ========== 22. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "whileloop-ar-1",
      assertion: "Assertion (A): A while loop can execute zero or more times.",
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
      id: "whileloop-ar-2",
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
      id: "whileloop-ar-3",
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
      id: "whileloop-ar-4",
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
      id: "whileloop-ar-5",
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
      id: "whileloop-ar-6",
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
      id: "whileloop-ar-7",
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
      id: "whileloop-ar-8",
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
      id: "whileloop-ar-9",
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
      id: "whileloop-ar-10",
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
      id: "whileloop-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "whileloop-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "whileloop-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "whileloop-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "whileloop-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "whileloop-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "whileloop-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "whileloop-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "whileloop-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "whileloop-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 24. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "whileloop-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "whileloop-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "whileloop-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "whileloop-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "whileloop-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "whileloop-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "whileloop-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "whileloop-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "whileloop-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "whileloop-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "whileloop-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "whileloop-cs-3-q3",
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
      id: "whileloop-mps-1",
      title: "Practice Set 1: While loop Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "whileloop-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "whileloop-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "whileloop-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "whileloop-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "whileloop-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "whileloop-mps-2",
      title: "Practice Set 2: While loop Applications",
      questions: [
        {
          type: "mcq",
          id: "whileloop-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "whileloop-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "whileloop-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "whileloop-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "whileloop-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 26. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "whileloop-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "whileloop-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "whileloop-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "whileloop-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "whileloop-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "whileloop-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "whileloop-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "whileloop-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "whileloop-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "whileloop-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "whileloop-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "whileloop-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "whileloop-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "whileloop-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "whileloop-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "whileloop-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "whileloop-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "whileloop-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "whileloop-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "whileloop-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

},
      `,
        output: "Enter numbers: 5 10 3 8 -1\nMaximum: 10\nMinimum: 3\nCount: 4",
      },
    ],
  },

  // ========== 14. CHALLENGE PROBLEMS ==========
  challengeProblems: [
    {
      id: "while-cp-1",
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
        
        while (guess != secretNumber) {
            if (guess < secretNumber) {
                System.out.println("Too low! Try again:");
            } else {
                System.out.println("Too high! Try again:");
            }
            guess = sc.nextInt();
            attempts++;
        }
        
        System.out.println("Correct! You guessed it in " + attempts + " attempts.");
        sc.close();
    }
}`,
      output: "Guess: 50\nToo high! Try again: 25\nToo low! Try again: 37\nToo low! Try again: 42\nCorrect! You guessed it in 4 attempts.",
    },
    {
      id: "while-cp-2",
      title: "Complete Banking System",
      question: "Implement a banking system with while loop that allows users to check balance, deposit, withdraw, and exit. Validate all inputs and maintain the balance.",
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
      id: "while-cp-3",
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
            while (i < password.length()) {
                if (Character.isDigit(password.charAt(i))) {
                    hasDigit = true;
                    break;
                }
                i++;
            }
            
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
      id: "while-cp-4",
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
                        while (temp > 0) {
                            binary = (temp % 2) + binary;
                            temp = temp / 2;
                        }
                        System.out.println(binary);
                        break;
                    case 2:
                        System.out.print("Octal: ");
                        temp = num;
                        String octal = "";
                        while (temp > 0) {
                            octal = (temp % 8) + octal;
                            temp = temp / 8;
                        }
                        System.out.println(octal);
                        break;
                    case 3:
                        System.out.print("Hexadecimal: ");
                        temp = num;
                        String hex = "";
                        while (temp > 0) {
                            int rem = temp % 16;
                            hex = (rem < 10 ? rem : (char)(rem + 55)) + hex;
                            temp = temp / 16;
                        }
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
      id: "while-cp-5",
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
        
        while (studentId != -1) {
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
        }
        
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
      id: "while-cp-6",
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
      id: "while-cp-7",
      title: "Pattern Printer",
      question: "Create a program that prints various patterns (pyramid, diamond, hollow square) based on user choice. Use nested while loops.",
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
                        while (i <= n) {
                            int j = 1;
                            while (j <= n - i) {
                                System.out.print("  ");
                                j++;
                            }
                            int k = 1;
                            while (k <= 2 * i - 1) {
                                System.out.print("* ");
                                k++;
                            }
                            System.out.println();
                            i++;
                        }
                        break;
                    case 2:  // Diamond
                        i = 1;
                        while (i <= n) {
                            int j = 1;
                            while (j <= n - i) {
                                System.out.print("  ");
                                j++;
                            }
                            int k = 1;
                            while (k <= 2 * i - 1) {
                                System.out.print("* ");
                                k++;
                            }
                            System.out.println();
                            i++;
                        }
                        i = n - 1;
                        while (i >= 1) {
                            int j = 1;
                            while (j <= n - i) {
                                System.out.print("  ");
                                j++;
                            }
                            int k = 1;
                            while (k <= 2 * i - 1) {
                                System.out.print("* ");
                                k++;
                            }
                            System.out.println();
                            i--;
                        }
                        break;
                    case 3:  // Hollow Square
                        i = 1;
                        while (i <= n) {
                            int j = 1;
                            while (j <= n) {
                                if (i == 1 || i == n || j == 1 || j == n) {
                                    System.out.print("* ");
                                } else {
                                    System.out.print("  ");
                                }
                                j++;
                            }
                            System.out.println();
                            i++;
                        }
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
      id: "while-cp-8",
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
        
        while (marks != -1) {
            total += marks;
            count++;
            
            if (marks >= 40) passed++;
            else failed++;
            
            if (marks > max) max = marks;
            if (marks < min) min = marks;
            
            System.out.print("Enter marks (-1 to stop): ");
            marks = sc.nextInt();
        }
        
        if (count > 0) {
            System.out.println("\\n=== ANALYSIS ===");
            System.out.println("Total students: " + count);
            System.out.println("Average: " + (total / count));
            System.out.println("Highest: " + max);
            System.out.println("Lowest: " + min);
            System.out.println("Passed: " + passed);
            System.out.println("Failed: " + failed);
        }