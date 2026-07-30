const chapter01 = {
  id: "01-if",
  title: "IF Statement",
  slug: "if",
  subject: "Java Programming",
  difficulty: "Beginner",
  estimatedTime: 45,
  topics: ["if statement", "conditional execution", "boolean expressions"],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "The `if` statement is the most basic decision-making tool in Java. It lets your program make choices — execute a block of code only when a certain condition is true. Think of it like a traffic light: if the light is green, you go; otherwise, you stop. In programming, the `if` statement checks a condition (like a boolean expression) and runs code only when that condition is true.",
    realLifeExamples: [
      "If it rains, take an umbrella.",
      "If your score > 80, you get a certificate.",
      "If the light is red, stop the car.",
    ],
    commonMistakes: [
      "Using assignment `=` instead of comparison `==` inside the condition — this is the #1 bug!",
      "Putting a semicolon `;` right after `if(condition)` — this ends the statement, so the block always runs.",
      "Forgetting curly braces `{}` when there are multiple statements — only the first line will be conditional.",
    ],
    whereUsed: [
      "Validating user input (e.g., if age < 18, reject registration)",
      "Controlling access in apps (e.g., if user is admin, show settings)",
      "Game logic (e.g., if score > highScore, update leaderboard)",
      "Almost every real-world program uses if-statements in some form",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "The `if` statement checks a condition. If the condition is `true`, the code inside the block `{ }` runs. If the condition is `false`, that block is skipped entirely. The condition must be a boolean expression — something that evaluates to `true` or `false`.",
    importantPoints: [
      "The condition inside `if( )` must evaluate to a boolean (true/false).",
      "If you have only one statement inside the if block, curly braces are optional, but always use them — it prevents bugs.",
      "Indentation is not required by Java, but it makes code readable.",
      "An `if` statement can be nested inside another `if`.",
      "Comparison operators used: ==, !=, <, >, <=, >=",
      "Logical operators used: && (AND), || (OR), ! (NOT)",
    ],
    memoryTricks: [
      "IF = 'If Fact' — if the fact is true, do something.",
      "Think of `if` as a gatekeeper — only lets code through if condition is true.",
      "Remember: `=` is assignment (giving), `==` is comparison (asking). Double equals = double-check!",
    ],
    examTips: [
      "In ICSE exams, always check for the semicolon trap: `if(x>5);` — the semicolon ends the if, so the next block always runs.",
      "When a variable is compared with a constant, write the constant first to avoid assignment: `if(5 == x)` not `if(x = 5)`.",
      "For boolean variables, use `if(flag)` not `if(flag == true)` — cleaner code gets more marks.",
      "Empty if block with only a semicolon is valid but useless — examiners love to ask about this.",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `if (condition) {
    // code to execute if condition is true
}`,
    breakdown: [
      {
        keyword: "if",
        explanation: "Java keyword that starts the conditional statement.",
      },
      {
        keyword: "condition",
        explanation:
          "A boolean expression that evaluates to true or false. Must be enclosed in parentheses ().",
      },
      {
        keyword: "{ }",
        explanation:
          "Curly braces define the block of code that runs when the condition is true.",
      },
      {
        keyword: "// comment",
        explanation:
          "Comments are ignored by Java. Use them to explain your code.",
      },
    ],
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        title: "Check if a number is positive",
        code: `int num = 10;
if (num > 0) {
    System.out.println("The number is positive.");
}
System.out.println("This line always runs.");`,
        output: `The number is positive.
This line always runs.`,
        explanation: [
          "Line 1: Variable `num` is declared and assigned value 10.",
          "Line 2: The `if` checks if `num > 0`. Since 10 > 0 is true, execution enters the block.",
          "Line 3: Prints 'The number is positive.' to the console.",
          "Line 5: After the if-block, execution continues here. This line always executes.",
        ],
      },
      {
        title: "If condition is false",
        code: `int num = -5;
if (num > 0) {
    System.out.println("The number is positive.");
}
System.out.println("Done checking.");`,
        output: `Done checking.`,
        explanation: [
          "Line 1: Variable `num` is -5.",
          "Line 2: Condition `num > 0` is false (-5 is NOT greater than 0).",
          "Line 3-4: The if-block is SKIPPED entirely.",
          "Line 5: Execution resumes here. Only 'Done checking.' is printed.",
        ],
      },
      {
        title: "Using logical operators with if",
        code: `int age = 18;
boolean hasID = true;
if (age >= 18 && hasID) {
    System.out.println("You can enter the club.");
}`,
        output: `You can enter the club.`,
        explanation: [
          "Line 1-2: Two variables are declared.",
          "Line 3: The condition uses && (AND). BOTH conditions must be true.",
          " - `age >= 18` → 18 >= 18 → true",
          " - `hasID` → true",
          " - true && true → true",
          "Line 4: Since condition is true, the print statement runs.",
        ],
      },
    ],
    intermediate: [
      {
        title: "Check even or odd using if-only",
        code: `int num = 7;
if (num % 2 == 0) {
    System.out.println(num + " is even.");
}
if (num % 2 != 0) {
    System.out.println(num + " is odd.");
}`,
        output: `7 is odd.`,
        explanation: [
          "Line 1: num = 7.",
          "Line 2: Checks if 7 % 2 == 0. 7 % 2 = 1, so 1 == 0 is false. First if-block skipped.",
          "Line 5: Checks if 7 % 2 != 0. 1 != 0 is true. Enters this block.",
          "Line 6: Prints '7 is odd.'",
          "Note: Two separate if statements are used (not if-else).",
        ],
      },
      {
        title: "Grade evaluation with multiple if statements",
        code: `int marks = 85;
if (marks >= 90) {
    System.out.println("Grade: A+");
}
if (marks >= 80 && marks < 90) {
    System.out.println("Grade: A");
}
if (marks < 80) {
    System.out.println("Grade: B");
}`,
        output: `Grade: A`,
        explanation: [
          "Line 1: marks = 85.",
          "Line 2: 85 >= 90 → false. Skipped.",
          "Line 5: 85 >= 80 && 85 < 90 → true && true → true. Enters block.",
          "Line 6: Prints 'Grade: A'.",
          "Line 8: 85 < 80 → false. Skipped.",
          "Note: This works but is inefficient. If-else would be better.",
        ],
      },
    ],
    advanced: [
      {
        title: "Nested if for ticket pricing",
        code: `int age = 65;
boolean isWeekend = false;
double ticketPrice = 100.0;

if (age >= 60) {
    if (isWeekend) {
        ticketPrice = ticketPrice * 0.8;  // 20% discount
    } else {
        ticketPrice = ticketPrice * 0.5;  // 50% discount on weekdays
    }
}
System.out.println("Ticket price: Rs " + ticketPrice);`,
        output: `Ticket price: Rs 50.0`,
        explanation: [
          "Line 1-3: Variables declared.",
          "Line 5: Outer if checks if age >= 60 → 65 >= 60 → true.",
          "Line 6: Inner if checks isWeekend → false.",
          "Line 9: Since isWeekend is false, the else part runs: 100.0 * 0.5 = 50.0.",
          "Line 12: Prints the final price.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "Line-by-line execution of an if statement",
      code: `int x = 15;
int y = 10;
if (x + y > 20) {
    System.out.println("Sum is greater than 20");
}
System.out.println("Program ends.");`,
      trace: [
        { line: 1, explanation: "x = 15. Memory: x → 15" },
        { line: 2, explanation: "y = 10. Memory: x → 15, y → 10" },
        { line: 3, explanation: "Evaluate condition: x + y > 20 → 15 + 10 > 20 → 25 > 20 → true. Enter if-block." },
        { line: 4, explanation: "Print: 'Sum is greater than 20' to console." },
        { line: 5, explanation: "Exit if-block. Continue to next line." },
        { line: 6, explanation: "Print: 'Program ends.'" },
      ],
    },
    {
      title: "When condition is false",
      code: `int x = 5;
int y = 10;
if (x + y > 20) {
    System.out.println("Sum is greater than 20");
}
System.out.println("Program ends.");`,
      trace: [
        { line: 1, explanation: "x = 5. Memory: x → 5" },
        { line: 2, explanation: "y = 10. Memory: x → 5, y → 10" },
        { line: 3, explanation: "Evaluate condition: x + y > 20 → 5 + 10 > 20 → 15 > 20 → false. Skip block." },
        { line: 4, explanation: "Skipped — execution jumps directly to line 6." },
        { line: 6, explanation: "Print: 'Program ends.'" },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "if-ob-1",
      question: `int a = 5;
if (a < 10)
    System.out.print("Hi ");
System.out.print("Bye");`,
      answer: "Hi Bye",
      explanation: "a < 10 is true (5 < 10), so 'Hi ' prints, then 'Bye' prints.",
    },
    {
      id: "if-ob-2",
      question: `int a = 15;
if (a < 10)
    System.out.print("Hi ");
System.out.print("Bye");`,
      answer: "Bye",
      explanation: "a < 10 is false (15 < 10 is false), so 'Hi ' is skipped. Only 'Bye' prints.",
    },
    {
      id: "if-ob-3",
      question: `int x = 10;
if (x = 5)
    System.out.println("Equal");
System.out.println("Done");`,
      answer: "Compilation Error",
      explanation: "x = 5 is assignment, not comparison. The condition requires a boolean, but x = 5 returns int (5), not boolean. This causes compilation error in Java.",
    },
    {
      id: "if-ob-4",
      question: `int x = 10;
if (x == 10); {
    System.out.println("Hello");
}`,
      answer: "Hello",
      explanation: "There's a semicolon after if(x==10); which ends the if statement. The if checks if x==10 (true), then does nothing (the empty statement). The block { } is now a separate block that always executes. So 'Hello' prints regardless.",
    },
    {
      id: "if-ob-5",
      question: `boolean flag = true;
if (flag)
    System.out.print("True ");
System.out.println("Statement");`,
      answer: "True Statement",
      explanation: "flag is true, so 'True ' prints. Then 'Statement' prints on the same line (println).",
    },
    {
      id: "if-ob-6",
      question: `int a = 5, b = 10;
if (a * b > 50)
    System.out.println("Product is large");
System.out.println("a = " + a + ", b = " + b);`,
      answer: "a = 5, b = 10",
      explanation: "a * b = 5 * 10 = 50. Condition checks if 50 > 50, which is false. So first print is skipped. Only the second line prints.",
    },
    {
      id: "if-ob-7",
      question: `int num = 10;
if (num % 2 == 0)
    System.out.println(num + " is even");
if (num % 2 == 1)
    System.out.println(num + " is odd");`,
      answer: "10 is even",
      explanation: "10 % 2 == 0 → 0 == 0 → true. First if-block executes. Second condition 10 % 2 == 1 → 0 == 1 → false, skipped.",
    },
    {
      id: "if-ob-8",
      question: `int p = 3, q = 4;
if (p < q && p + q > 5)
    System.out.println("Both conditions true");
System.out.println("Checked");`,
      answer: "Both conditions true\nChecked",
      explanation: "p < q → 3 < 4 → true. p + q > 5 → 7 > 5 → true. true && true → true. Both lines print.",
    },
    {
      id: "if-ob-9",
      question: `int x = 7;
if (x > 10)
    x++;
System.out.println(x);`,
      answer: "7",
      explanation: "x > 10 → 7 > 10 → false. x++ is skipped. x remains 7.",
    },
    {
      id: "if-ob-10",
      question: `int x = 7, y = 3;
if (x % y == 1)
    System.out.println(x + y);
if (x / y == 2)
    System.out.println(x - y);`,
      answer: "10\n4",
      explanation: "First if: x % y = 7 % 3 = 1. 1 == 1 → true. Prints 7 + 3 = 10. Second if: x / y = 7 / 3 = 2 (integer division). 2 == 2 → true. Prints 7 - 3 = 4.",
    },
    {
      id: "if-ob-11",
      question: `int a = 0;
if (a == 0)
    a = 10;
if (a != 0)
    System.out.println("a is not zero");`,
      answer: "a is not zero",
      explanation: "First if: a == 0 → true. a becomes 10. Second if: a != 0 → 10 != 0 → true. Prints 'a is not zero'.",
    },
    {
      id: "if-ob-12",
      question: `int n = 5;
if (n > 0)
    if (n < 10)
        System.out.println("Single digit positive");`,
      answer: "Single digit positive",
      explanation: "n > 0 → true. Inside, n < 10 → 5 < 10 → true. Prints the message.",
    },
    {
      id: "if-ob-13",
      question: `int n = 15;
if (n > 0)
    if (n < 10)
        System.out.println("Single digit positive");
    else
        System.out.println("Multi-digit positive");`,
      answer: "Multi-digit positive",
      explanation: "n > 0 → true. n < 10 → false. Falls to else of inner if. Prints 'Multi-digit positive'. Note: else belongs to the INNER if.",
    },
    {
      id: "if-ob-14",
      question: `int x = 0;
if (x > 0)
    x = 100;
System.out.println(x);`,
      answer: "0",
      explanation: "x > 0 → 0 > 0 → false. x = 100 is skipped. x remains 0.",
    },
    {
      id: "if-ob-15",
      question: `int a = 3, b = 3;
if (a == b)
    a++;
    b++;
System.out.println(a + " " + b);`,
      answer: "4 4",
      explanation: "a == b → 3 == 3 → true. Only `a++` is inside the if (no braces!). a becomes 4. `b++` is outside the if and always runs. b becomes 4.",
    },
    {
      id: "if-ob-16",
      question: `boolean b = false;
if (b = true)
    System.out.println("Hello");
System.out.println("World");`,
      answer: "Hello\nWorld",
      explanation: "This is a TRICK! `b = true` is assignment, not comparison. b is assigned true. The assigned value (true) is used as condition. Since it's true, both 'Hello' and 'World' print. This compiles because the assignment result (true) is boolean.",
    },
    {
      id: "if-ob-17",
      question: `int x = 5;
if (!(x > 10))
    System.out.println("x is not greater than 10");`,
      answer: "x is not greater than 10",
      explanation: "x > 10 → 5 > 10 → false. !false → true. So the block executes.",
    },
    {
      id: "if-ob-18",
      question: `int marks = 45;
if (marks >= 40)
    System.out.println("Pass");
if (marks < 40)
    System.out.println("Fail");`,
      answer: "Pass",
      explanation: "marks >= 40 → 45 >= 40 → true. Prints 'Pass'. marks < 40 → false. Skipped.",
    },
    {
      id: "if-ob-19",
      question: `char ch = 'A';
if (ch >= 65)
    System.out.println("It's a letter");
System.out.println((int)ch);`,
      answer: "It's a letter\n65",
      explanation: "char 'A' has ASCII value 65. ch >= 65 → 65 >= 65 → true. Prints 'It's a letter'. Then prints 65 (ASCII value of 'A').",
    },
    {
      id: "if-ob-20",
      question: `int x = 10;
{
    int y = 20;
    if (x < y)
        System.out.println("x < y");
}
// System.out.println(y); // Would give error
System.out.println(x);`,
      answer: "x < y\n10",
      explanation: "x < y → 10 < 20 → true. Prints 'x < y'. The commented line would error because y is out of scope. x prints as 10.",
    },
    {
      id: "if-ob-21",
      question: `int a = 1, b = 2, c = 3;
if (a < b)
    if (b < c)
        if (a < c)
            System.out.println("Ordered");`,
      answer: "Ordered",
      explanation: "a < b → 1 < 2 → true. b < c → 2 < 3 → true. a < c → 1 < 3 → true. All nested conditions are true.",
    },
    {
      id: "if-ob-22",
      question: `int k = 1;
if (k > 0)
    System.out.print(k);
    k++;
    System.out.println(k);`,
      answer: "12",
      explanation: "k > 0 → true. Prints k (1). k++ (now 2) and println(k) are OUTSIDE the if (no braces). They always run. k is now 2, so prints 2.",
    },
    {
      id: "if-ob-23",
      question: `int x = 5;
if (x == 5) ;
    System.out.println("x is 5");
System.out.println("Done");`,
      answer: "x is 5\nDone",
      explanation: "The semicolon `;` after if(x==5) ends the if statement. The if checks true, does nothing (empty statement). The println is now a regular statement that always executes.",
    },
    {
      id: "if-ob-24",
      question: `int a = 100;
if (a > 50) {
    int b = 200;
    System.out.println(b);
}
// System.out.println(b); // Error`,
      answer: "200",
      explanation: "a > 50 → true. Inside block, b = 200 is declared and printed. b is block-scoped, so the commented line would error.",
    },
    {
      id: "if-ob-25",
      question: `float f = 5.5f;
if (f == 5.5)
    System.out.println("Equal");
System.out.println("Done");`,
      answer: "Done",
      explanation: "Comparing float with double literal 5.5. 5.5f is float, 5.5 is double (treated as double). They may not be exactly equal due to floating-point precision. The condition is false. Only 'Done' prints.",
    },
    {
      id: "if-ob-26",
      question: `int x = 3;
if (x++ > 3)
    System.out.println("x > 3");
System.out.println(x);`,
      answer: "4",
      explanation: "Post-increment: x++ uses current value (3) for comparison, then increments. 3 > 3 → false. So print doesn't execute. x becomes 4. Then '4' prints.",
    },
    {
      id: "if-ob-27",
      question: `int x = 3;
if (++x > 3)
    System.out.println("x > 3");
System.out.println(x);`,
      answer: "x > 3\n4",
      explanation: "Pre-increment: ++x increments x to 4 first, then compares. 4 > 3 → true. Prints 'x > 3'. Then '4' prints.",
    },
    {
      id: "if-ob-28",
      question: `int a = 10, b = 20;
boolean result = a > b;
if (result)
    System.out.println("a > b");
else
    System.out.println("NOT a > b");`,
      answer: "NOT a > b",
      explanation: "result = a > b → 10 > 20 → false. if(result) → false, so else part runs. Note: This question uses if-else which is technically next chapter, but tests basic if concept.",
    },
    {
      id: "if-ob-29",
      question: `int x = 0;
if (x)
    System.out.println("True");
System.out.println("Done");`,
      answer: "Compilation Error",
      explanation: "In Java, the condition must be a boolean. x is int (0), not boolean. This causes a compilation error. (Unlike C/C++ where 0 is treated as false.)",
    },
    {
      id: "if-ob-30",
      question: `System.out.println("Start");
if (true) {
    System.out.println("Middle");
}
System.out.println("End");`,
      answer: "Start\nMiddle\nEnd",
      explanation: "The condition is literally true. The block always executes. All three lines print in order.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "if-ef-1",
      question: `if (x = 10) {
    System.out.println("x is 10");
}`,
      error: "Line 1: `x = 10` is assignment, not comparison. Use `x == 10`. Also, if x is not declared, add declaration.",
      corrected: `int x = 10;
if (x == 10) {
    System.out.println("x is 10");
}`,
    },
    {
      id: "if-ef-2",
      question: `int a = 5;
if (a == 5); {
    System.out.println("Hello");
}`,
      error: "Line 2: Unnecessary semicolon after `if(a == 5)`. This ends the if statement, making the block independent.",
      corrected: `int a = 5;
if (a == 5) {
    System.out.println("Hello");
}`,
    },
    {
      id: "if-ef-3",
      question: `int n = 10;
if (n > 5)
    System.out.println("n > 5");
    System.out.println("Always prints");`,
      error: "Line 3-4: Missing braces. Only `System.out.println(\"n > 5\")` is inside the if. The second println always executes regardless of condition. If the intent is both lines inside if, add braces.",
      corrected: `int n = 10;
if (n > 5) {
    System.out.println("n > 5");
    System.out.println("Always prints");
}`,
    },
    {
      id: "if-ef-4",
      question: `int x = 0;
if (x == 0)
    int y = 5;
    System.out.println(y);`,
      error: "Line 3: Declaration `int y = 5;` cannot be a single statement after if without braces. Java doesn't allow variable declaration as a single statement after if. Also, y is out of scope on line 4.",
      corrected: `int x = 0;
if (x == 0) {
    int y = 5;
    System.out.println(y);
}`,
    },
    {
      id: "if-ef-5",
      question: `if (true) {
    System.out.println("Always");
}
else {
    System.out.println("Never");
}`,
      error: "Syntax error: else cannot have its own condition or block without an if. But there's no error here if the else is attached to the if. Actually, this code is syntactically correct. The else belongs to the if. But having else after `if(true)` is dead code — it never executes.",
      corrected: "No syntax error, but logically pointless. Remove the else block or change the condition.",
    },
    {
      id: "if-ef-6",
      question: `int a = 10;
int b = 20;
if (a > b) {
    System.out.println(a);
}`,
      error: "No error. Code is syntactically correct. The if-block will not execute because 10 > 20 is false.",
      corrected: "No error in syntax. If you want it to print, change condition to a < b.",
    },
    {
      id: "if-ef-7",
      question: `String s = "Hello";
if (s == "Hello") {
    System.out.println("Equal");
}`,
      error: "Using `==` compares reference equality, not string content. For strings, use `.equals()` method.",
      corrected: `String s = "Hello";
if (s.equals("Hello")) {
    System.out.println("Equal");
}`,
    },
    {
      id: "if-ef-8",
      question: `float f = 0.7;
if (f == 0.7) {
    System.out.println("Equal");
}`,
      error: "Line 1: `0.7` is double by default. To assign to float, use `0.7f`. Line 2: Comparing float with double may give unexpected results due to precision.",
      corrected: `double f = 0.7;
if (f == 0.7) {
    System.out.println("Equal");
}`,
    },
    {
      id: "if-ef-9",
      question: `int x = 10;
if (x == 10) {
    System.out.println("Ten");
}
if (x > 5) {
    System.out.println(">5");
}`,
      error: "No error. Both if statements are valid and will execute since 10 == 10 and 10 > 5 are both true.",
      corrected: "No error. Code works correctly.",
    },
    {
      id: "if-ef-10",
      question: `boolean flag = false;
if (flag = true) {
    System.out.println("True");
}`,
      error: "Line 2: `flag = true` is assignment, not comparison. flag is set to true, and condition evaluates to true. This is likely a bug; programmer probably meant `flag == true` or just `if (flag)`.",
      corrected: `boolean flag = false;
if (flag) {
    System.out.println("True");
}`,
    },
    {
      id: "if-ef-11",
      question: `int a = 5, b = 5;
if (a == b) {
    System.out.println("Equal");
    System.out.println("Numbers are same");
}`,
      error: "No error. Code is syntactically correct and will print both lines.",
      corrected: "No error.",
    },
    {
      id: "if-ef-12",
      question: `int value = 100;
if (value = 100) {
    System.out.println("Century");
}`,
      error: "Line 2: `value = 100` assigns 100 to value, but returns int (100), not boolean. Java requires boolean in if condition. Compilation error.",
      corrected: `int value = 100;
if (value == 100) {
    System.out.println("Century");
}`,
    },
    {
      id: "if-ef-13",
      question: `int n = 25;
if (n % 2 == 0) {
    System.out.println("Even");
}
if (n % 2 != 0) {
    System.out.println("Odd");
}`,
      error: "No error. Code correctly checks even and odd using two separate if statements.",
      corrected: "No error.",
    },
    {
      id: "if-ef-14",
      question: `int a = 10;
if (a > 5) 
    int b = 20;
    System.out.println(b);`,
      error: "Line 3: Variable declaration `int b = 20;` cannot be the single statement of an if block in Java. All variable declarations need braces. Also, b is out of scope on line 4.",
      corrected: `int a = 10;
if (a > 5) {
    int b = 20;
    System.out.println(b);
}`,
    },
    {
      id: "if-ef-15",
      question: `int x = 5;
if (x == 5) {
    System.out.println("x = 5");
}
else {
    System.out.println("x != 5");
}`,
      error: "No error. This is a valid if-else structure.",
      corrected: "No error.",
    },
    {
      id: "if-ef-16",
      question: `int a = 1, b = 2, c = 3;
if (a < b < c) {
    System.out.println("Increasing");
}`,
      error: "Line 2: `a < b < c` is invalid in Java. The expression `a < b` evaluates to boolean (true), then `true < c` tries to compare boolean with int, causing compilation error.",
      corrected: `int a = 1, b = 2, c = 3;
if (a < b && b < c) {
    System.out.println("Increasing");
}`,
    },
    {
      id: "if-ef-17",
      question: `char grade = 'A';
if (grade == 65) {
    System.out.println("Excellent");
}`,
      error: "No error. char can be compared with int (ASCII value). 'A' has ASCII 65, so condition is true. Prints 'Excellent'.",
      corrected: "No error. Code works correctly.",
    },
    {
      id: "if-ef-18",
      question: `int score = 75;
if (score >= 70) {
    System.out.println("Distinction");
if (score >= 90) {
    System.out.println("Outstanding");
}`,
      error: "Line 4: Missing closing brace for the outer if. The outer if block needs to be closed after the inner if block.",
      corrected: `int score = 75;
if (score >= 70) {
    System.out.println("Distinction");
    if (score >= 90) {
        System.out.println("Outstanding");
    }
}`,
    },
    {
      id: "if-ef-19",
      question: `int i = 0;
if (i) {
    System.out.println("Zero");
}`,
      error: "Line 2: Condition must be boolean. `i` is int, not boolean. Compilation error.",
      corrected: `int i = 0;
if (i == 0) {
    System.out.println("Zero");
}`,
    },
    {
      id: "if-ef-20",
      question: `int x = 10;
if (x ! = 5) {
    System.out.println("x is not 5");
}`,
      error: "Line 2: Space between `!` and `=`. The correct operator is `!=` without space.",
      corrected: `int x = 10;
if (x != 5) {
    System.out.println("x is not 5");
}`,
    },
    {
      id: "if-ef-21",
      question: `if (5 > 2) {
    System.out.println("5 > 2");
}`,
      error: "No error. This is a valid if statement with a constant condition.",
      corrected: "No error.",
    },
    {
      id: "if-ef-22",
      question: `int a = 10;
if (a == 10)
    System.out.println("a is 10")
System.out.println("Done");`,
      error: "Line 3: Missing semicolon after println statement.",
      corrected: `int a = 10;
if (a == 10)
    System.out.println("a is 10");
System.out.println("Done");`,
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    {
      id: "if-fb-1",
      question: "The _____ statement is used to make decisions in Java.",
      answer: "if",
    },
    {
      id: "if-fb-2",
      question: "The condition inside `if( )` must evaluate to a _____ value.",
      answer: "boolean",
    },
    {
      id: "if-fb-3",
      question: "The operator used for equality comparison is _____.",
      answer: "==",
    },
    {
      id: "if-fb-4",
      question: "The operator used for assignment is _____.",
      answer: "=",
    },
    {
      id: "if-fb-5",
      question: "If a semicolon `;` is placed after `if(condition)`, the if-block becomes _____.",
      answer: "empty (or does nothing)",
    },
    {
      id: "if-fb-6",
      question: "The curly braces `{ }` in an if statement define the _____ of code.",
      answer: "block",
    },
    {
      id: "if-fb-7",
      question: "If there is only _____ statement inside an if block, curly braces are optional.",
      answer: "one (or single)",
    },
    {
      id: "if-fb-8",
      question: "The logical AND operator in Java is _____.",
      answer: "&&",
    },
    {
      id: "if-fb-9",
      question: "The logical OR operator in Java is _____.",
      answer: "||",
    },
    {
      id: "if-fb-10",
      question: "The logical NOT operator in Java is _____.",
      answer: "!",
    },
    {
      id: "if-fb-11",
      question: "Putting an `if` statement inside another `if` statement is called _____ if.",
      answer: "nested",
    },
    {
      id: "if-fb-12",
      question: "When comparing two Strings in Java, use the _____ method instead of ==.",
      answer: "equals()",
    },
    {
      id: "if-fb-13",
      question: `int x = 5;
if (x __ 5) {
    System.out.println("Equal");
} // Fill the correct operator`,
      answer: "==",
    },
    {
      id: "if-fb-14",
      question: `int age = 18;
if (age __ 18) {
    System.out.println("Adult");
} // Fill the correct operator for "greater than or equal to"`,
      answer: ">=",
    },
    {
      id: "if-fb-15",
      question: `int num = 10;
if (num __ 2 == 0) {
    System.out.println("Even");
} // Fill the correct operator`,
      answer: "%",
    },
    {
      id: "if-fb-16",
      question: "If a condition is _____, the code inside the if-block is skipped.",
      answer: "false",
    },
    {
      id: "if-fb-17",
      question: `int a = 10, b = 20;
if (a < b __ b < 30) {
    System.out.println("Both conditions true");
} // Fill the logical operator`,
      answer: "&&",
    },
    {
      id: "if-fb-18",
      question: `boolean isRaining = false;
if (_____isRaining) {
    System.out.println("Not raining");
} // Complete the condition using NOT operator`,
      answer: "!",
    },
    {
      id: "if-fb-19",
      question: "In Java, the condition inside `if()` can be a _____ variable directly.",
      answer: "boolean",
    },
    {
      id: "if-fb-20",
      question: `int x = 5;
if (x > 0)
    System.out.println("Positive");
System.out.println("Done");
// How many statements are inside the if block? _____`,
      answer: "1 (one)",
    },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "if-mcq-1",
      question: "What does the `if` statement do?",
      options: [
        "Repeats code multiple times",
        "Executes code only if a condition is true",
        "Declares a variable",
        "Prints output to console",
      ],
      answer: 1,
      explanation: "The if statement executes its block only when the condition evaluates to true.",
    },
    {
      id: "if-mcq-2",
      question: "What type must the condition inside `if()` evaluate to?",
      options: ["int", "String", "boolean", "char"],
      answer: 2,
      explanation: "Java requires the condition to be a boolean (true or false).",
    },
    {
      id: "if-mcq-3",
      question: "What is the correct way to compare if x equals 5?",
      options: ["if (x = 5)", "if (x == 5)", "if (x != 5)", "if (x => 5)"],
      answer: 1,
      explanation: "`==` is the comparison operator in Java. `=` is assignment.",
    },
    {
      id: "if-mcq-4",
      question: `What is the output? 
int x = 10;
if (x > 5) 
    System.out.print("Yes");
System.out.print("No");`,
      options: ["Yes", "No", "YesNo", "NoYes"],
      answer: 2,
      explanation: "x > 5 is true (10 > 5), so 'Yes' prints. Then 'No' prints because it's outside the if.",
    },
    {
      id: "if-mcq-5",
      question: `What is the output?
int x = 2;
if (x > 5)
    System.out.print("Yes");
System.out.print("No");`,
      options: ["Yes", "No", "YesNo", "NoYes"],
      answer: 1,
      explanation: "x > 5 is false (2 > 5 is false). 'Yes' is skipped. Only 'No' prints.",
    },
    {
      id: "if-mcq-6",
      question: "What happens if there is a semicolon after `if(condition);`?",
      options: [
        "The if block becomes empty and the next block always executes",
        "It causes a compilation error",
        "The if condition is ignored",
        "The program crashes",
      ],
      answer: 0,
      explanation: "The semicolon ends the if statement with an empty body. The next block is just a regular block that always runs.",
    },
    {
      id: "if-mcq-7",
      question: "Which operator is used for logical AND?",
      options: ["&", "&&", "|", "||"],
      answer: 1,
      explanation: "`&&` is the logical AND operator. Both sides must be true for the result to be true.",
    },
    {
      id: "if-mcq-8",
      question: "What does `if (!flag)` mean when `flag` is a boolean?",
      options: [
        "If flag is true",
        "If flag is false",
        "If flag is null",
        "If flag is 0",
      ],
      answer: 1,
      explanation: "`!` is the logical NOT operator. `!flag` means 'NOT flag', i.e., if flag is false.",
    },
    {
      id: "if-mcq-9",
      question: `What is the output?
int a = 5, b = 10;
if (a > b)
    System.out.print("a > b");
System.out.print("Done");`,
      options: ["a > b", "Done", "a > bDone", "Nothing"],
      answer: 1,
      explanation: "a > b → 5 > 10 → false. If block skipped. 'Done' prints.",
    },
    {
      id: "if-mcq-10",
      question: `What is the output?
int x = 5;
if (x == 5) {
    int y = 10;
    System.out.println(y);
}`,
      options: ["5", "10", "Compilation error", "Runtime error"],
      answer: 1,
      explanation: "x == 5 → true. Inside block, y = 10 is declared and printed.",
    },
    {
      id: "if-mcq-11",
      question: "Can you nest an if statement inside another if statement?",
      options: [
        "Yes, always",
        "No, never",
        "Only in methods",
        "Only with loops",
      ],
      answer: 0,
      explanation: "Yes, if statements can be nested inside other if statements to any depth.",
    },
    {
      id: "if-mcq-12",
      question: `What is the output?
int x = 3;
if (x++ == 3)
    System.out.print(x);`,
      options: ["3", "4", "True", "Nothing"],
      answer: 1,
      explanation: "Post-increment: x++ uses current value (3) for comparison then increments. 3 == 3 → true. x becomes 4. Prints 4.",
    },
    {
      id: "if-mcq-13",
      question: `What is the output?
int x = 3;
if (++x == 3)
    System.out.print(x);
else
    System.out.print(x + 1);`,
      options: ["3", "4", "5", "Nothing"],
      answer: 2,
      explanation: "Pre-increment: ++x makes x = 4, then compares. 4 == 3 → false, so else runs. Prints 4 + 1 = 5.",
    },
    {
      id: "if-mcq-14",
      question: `What is the output?
boolean b = false;
if (b = true)
    System.out.println("Hello");`,
      options: ["Hello", "Nothing", "Compilation error", "true"],
      answer: 0,
      explanation: "`b = true` is assignment, not comparison. b becomes true. The assigned value (true) is used as condition. 'Hello' prints.",
    },
    {
      id: "if-mcq-15",
      question: "Which of the following is NOT a valid condition for an if statement?",
      options: [
        "if (x > 5)",
        "if (x == 5)",
        "if (x = 5)",
        "if (x != 5)",
      ],
      answer: 2,
      explanation: "`if (x = 5)` is assignment. If x is int, this returns int, not boolean, causing compilation error.",
    },
    {
      id: "if-mcq-16",
      question: `What is the output?
int x = 10;
if (x == 10);
    System.out.println("Hello");`,
      options: ["Hello", "Nothing", "Compilation error", "10"],
      answer: 0,
      explanation: "The semicolon ends the if statement. The if checks (true) but does nothing. The println is a separate statement that always executes.",
    },
    {
      id: "if-mcq-17",
      question: `int a = 1, b = 2, c = 3;
if (a < b && b < c)
    System.out.println("Ordered");
else
    System.out.println("Not ordered");`,
      options: ["Ordered", "Not ordered", "Compilation error", "Nothing"],
      answer: 0,
      explanation: "a < b → true. b < c → true. true && true → true. Prints 'Ordered'.",
    },
    {
      id: "if-mcq-18",
      question: "What is wrong with this code: `if (5 < x < 10)`?",
      options: [
        "Nothing, it's correct",
        "Java cannot chain comparisons like this",
        "Use && instead",
        "Both B and C",
      ],
      answer: 3,
      explanation: "Java doesn't support chained comparisons like `5 < x < 10`. Use `5 < x && x < 10`.",
    },
    {
      id: "if-mcq-19",
      question: "Are curly braces mandatory for an if block with a single statement?",
      options: [
        "Yes, always",
        "No, they are optional",
        "Only for primitive types",
        "Only inside methods",
      ],
      answer: 1,
      explanation: "For a single statement, curly braces are optional but highly recommended for clarity and to avoid bugs.",
    },
    {
      id: "if-mcq-20",
      question: `int x = 10;
if (x > 5)
    if (x > 8)
        System.out.println("Large");
    else
        System.out.println("Medium");`,
      options: ["Large", "Medium", "LargeMedium", "Nothing"],
      answer: 0,
      explanation: "x > 5 → true. x > 8 → true. Prints 'Large'. The else belongs to the inner if.",
    },
    {
      id: "if-mcq-21",
      question: `What is the output?
int x = 10;
if (x != 10)
    System.out.println("Not 10");
System.out.println("Done");`,
      options: ["Not 10", "Done", "Not 10Done", "Nothing"],
      answer: 1,
      explanation: "x != 10 → false. If block skipped. 'Done' prints.",
    },
    {
      id: "if-mcq-22",
      question: "What does `if (x % 2 == 0)` check?",
      options: [
        "If x is odd",
        "If x is even",
        "If x is divisible by 2 with remainder",
        "If x is prime",
      ],
      answer: 1,
      explanation: "If remainder when x is divided by 2 equals 0, then x is even.",
    },
    {
      id: "if-mcq-23",
      question: "What is the NOT operator in Java?",
      options: ["!", "~", "not", "NOT"],
      answer: 0,
      explanation: "`!` is the logical NOT operator. It inverts a boolean value.",
    },
    {
      id: "if-mcq-24",
      question: `int x = 10;
int y = 20;
if (x > y)
    System.out.println("x > y");
else
    System.out.println("x <= y");`,
      options: ["x > y", "x <= y", "Compilation error", "Nothing"],
      answer: 1,
      explanation: "10 > 20 → false. If block skipped, else runs. Prints 'x <= y'.",
    },
    {
      id: "if-mcq-25",
      question: `int a = 5;
if (a == 5) {
    a = a + 1;
}
System.out.println(a);`,
      options: ["5", "6", "Compilation error", "a = a + 1"],
      answer: 1,
      explanation: "a == 5 → true. a becomes 5 + 1 = 6. Prints 6.",
    },
    {
      id: "if-mcq-26",
      question: "Which of these correctly checks if a number is between 10 and 20?",
      options: [
        "if (x > 10 && x < 20)",
        "if (10 < x < 20)",
        "if (x > 10 || x < 20)",
        "if (x > 10 & x < 20)",
      ],
      answer: 0,
      explanation: "`x > 10 && x < 20` correctly uses AND to check if x is in the range (10, 20).",
    },
    {
      id: "if-mcq-27",
      question: `What is the output?
int x = 0;
if (x == 0) {
    x = 1;
}
if (x == 1) {
    System.out.println("One");
}`,
      options: ["One", "0", "Nothing", "Compilation error"],
      answer: 0,
      explanation: "First if: x == 0 → true, x becomes 1. Second if: x == 1 → true, prints 'One'.",
    },
    {
      id: "if-mcq-28",
      question: "What is wrong with: `if (x = y) { }` when x and y are ints?",
      options: [
        "Nothing",
        "Assignment instead of comparison",
        "Missing semicolon",
        "Missing braces",
      ],
      answer: 1,
      explanation: "`x = y` assigns y to x and returns int. Java requires boolean in if condition.",
    },
    {
      id: "if-mcq-29",
      question: "What does an empty if block do? `if (true) { }`",
      options: [
        "Does nothing",
        "Causes error",
        "Exits the program",
        "Creates infinite loop",
      ],
      answer: 0,
      explanation: "An empty if block does nothing. It's valid but useless.",
    },
    {
      id: "if-mcq-30",
      question: `What is the output?
int x = 5;
if (x > 0) 
    System.out.print("P");
    System.out.print("Q");`,
      options: ["P", "Q", "PQ", "Compilation error"],
      answer: 2,
      explanation: "x > 0 → true. 'P' prints (inside if). 'Q' is outside the if (no braces) and always prints.",
    },
    {
      id: "if-mcq-31",
      question: "What is short-circuit evaluation in &&?",
      options: [
        "Both sides are always evaluated",
        "If left side is false, right side is not evaluated",
        "If left side is true, right side is not evaluated",
        "Neither side is evaluated",
      ],
      answer: 1,
      explanation: "In &&, if the left condition is false, the right side is never evaluated (short-circuit) because the result is already false.",
    },
    {
      id: "if-mcq-32",
      question: `int x = 5;
if (x > 0 || x < 0)
    System.out.println("Non-zero");
else
    System.out.println("Zero");`,
      options: ["Non-zero", "Zero", "Compilation error", "Nothing"],
      answer: 0,
      explanation: "x > 0 → true. Short-circuit: true || anything → true. Prints 'Non-zero'.",
    },
    {
      id: "if-mcq-33",
      question: "Which of the following is true about `if (false) { ... }`?",
      options: [
        "The block never executes",
        "The block always executes",
        "It causes compilation error",
        "It executes once",
      ],
      answer: 0,
      explanation: "If the condition is literally false, the block never executes. This is dead code.",
    },
    {
      id: "if-mcq-34",
      question: "Can you use `if` without curly braces?",
      options: [
        "No, braces are mandatory",
        "Yes, but only for a single statement",
        "Yes, always",
        "Only in loops",
      ],
      answer: 1,
      explanation: "If there's only one statement, braces are optional. But always use them for clarity.",
    },
    {
      id: "if-mcq-35",
      question: `int x = 10;
if (x == 10)
    if (x > 5)
        System.out.println("Nested");
    else
        System.out.println("Inner else");
else
    System.out.println("Outer else");`,
      options: ["Nested", "Inner else", "Outer else", "Compilation error"],
      answer: 0,
      explanation: "x == 10 → true. Inside, x > 5 → true. Prints 'Nested'. The else belongs to inner if.",
    },
    {
      id: "if-mcq-36",
      question: `What is the output?
int a = 0;
if (a > 0)
    a++;
    a++;
System.out.println(a);`,
      options: ["0", "1", "2", "Compilation error"],
      answer: 1,
      explanation: "a > 0 → false. First a++ is inside if (skipped). Second a++ is outside if (runs). a becomes 1.",
    },
    {
      id: "if-mcq-37",
      question: "What is the correct way to check if a String s is empty?",
      options: [
        "if (s = \"\")",
        "if (s.length() == 0)",
        "if (s == \"\")",
        "Both B and C",
      ],
      answer: 1,
      explanation: "Best way is `s.length() == 0` or `s.isEmpty()`. Using == compares references, not content.",
    },
    {
      id: "if-mcq-38",
      question: "What does `if (5 > 3 && 5 < 10)` evaluate to?",
      options: ["true", "false", "Compilation error", "5"],
      answer: 0,
      explanation: "5 > 3 → true. 5 < 10 → true. true && true → true.",
    },
    {
      id: "if-mcq-39",
      question: "Can a method call be used as condition in an if statement?",
      options: [
        "No, only variables",
        "Yes, if it returns a boolean",
        "Only if it's void",
        "Only primitive types",
      ],
      answer: 1,
      explanation: "Any expression that returns a boolean can be used as condition, including method calls like `if (str.isEmpty())`.",
    },
    {
      id: "if-mcq-40",
      question: `int x = 1;
if (x > 0)
    x = x * 2;
if (x > 2)
    x = x * 2;
System.out.println(x);`,
      options: ["2", "4", "1", "6"],
      answer: 1,
      explanation: "First if: 1 > 0 → true, x = 2. Second if: 2 > 2 → false, skipped. x = 2. Wait, let me recalculate: x=1*2=2. 2>2? No. x=2. Answer is 2? Actually: first if true, x=2. second if false. So x=2. But wait, option A is 2. But looking again at my code: x = x * 2 → x = 1*2 = 2. So x=2. Option A says 2. But option B says 4. Hmm, x=1 first, x>0 true, x=2. x>2? 2>2 false. Answer is 2. But I wrote x=4 in my explanation. Let me be more careful: x starts at 1. if(1>0) true, x=1*2=2. if(2>2) false. x stays 2. Output is 2. Wait, but then option A is 2.",
      explanation: "x starts at 1. First if: true, x = 2. Second if: 2 > 2 is false, skipped. x remains 2. Output: 2.",
    },
    {
      id: "if-mcq-41",
      question: `What is the output?
int x = 5;
if (x % 2 == 1)
    System.out.println("Odd");
else
    System.out.println("Even");`,
      options: ["Odd", "Even", "Compilation error", "Nothing"],
      answer: 0,
      explanation: "5 % 2 = 1. 1 == 1 → true. Prints 'Odd'.",
    },
    {
      id: "if-mcq-42",
      question: "What happens in short-circuit evaluation with || ?",
      options: [
        "If left is true, right is not evaluated",
        "If left is false, right is not evaluated",
        "Both sides always evaluated",
        "Neither side evaluated",
      ],
      answer: 0,
      explanation: "In ||, if left is true, right is skipped because result is already true.",
    },
    {
      id: "if-mcq-43",
      question: `int a = 10, b = 5;
if (a = b)
    System.out.println("Equal");
else
    System.out.println("Not Equal");`,
      options: ["Equal", "Not Equal", "Compilation error", "Nothing"],
      answer: 2,
      explanation: "`a = b` is assignment (a becomes 5), returns int (5), not boolean. Compilation error.",
    },
    {
      id: "if-mcq-44",
      question: "What is the purpose of indentation in if statements?",
      options: [
        "It affects program execution",
        "It makes code more readable",
        "It is mandatory in Java",
        "It improves performance",
      ],
      answer: 1,
      explanation: "Indentation is for human readability. Java ignores it, but proper indentation is good practice and expected in exams.",
    },
    {
      id: "if-mcq-45",
      question: `int x = 7, y = 3;
if (x / y >= 2)
    System.out.println("Ratio ≥ 2");
System.out.println("Checked");`,
      options: [
        "Ratio ≥ 2\nChecked",
        "Checked",
        "Ratio ≥ 2",
        "Compilation error",
      ],
      answer: 0,
      explanation: "x / y = 7 / 3 = 2 (integer division). 2 >= 2 → true. Both lines print.",
    },
    {
      id: "if-mcq-46",
      question: "What does the 'dangling else' problem refer to?",
      options: [
        "An else without a matching if",
        "An else matching the wrong if in nested structures",
        "A missing semicolon",
        "An extra closing brace",
      ],
      answer: 1,
      explanation: "In nested ifs, an else attaches to the nearest if, which may not be what the programmer intended.",
    },
    {
      id: "if-mcq-47",
      question: `int x = 0;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else {
    System.out.println("Zero");
}`,
      options: ["Positive", "Negative", "Zero", "Compilation error"],
      answer: 2,
      explanation: "x > 0 → false. x < 0 → false. Falls to else. Prints 'Zero'.",
    },
    {
      id: "if-mcq-48",
      question: `What is the output?
int a = 1, b = 1;
if (a == b)
    if (a > 0)
        System.out.println("A");
    else
        System.out.println("B");
else
    System.out.println("C");`,
      options: ["A", "B", "C", "Compilation error"],
      answer: 0,
      explanation: "a == b → true. a > 0 → true. Prints 'A'. The second else belongs to inner if, first else to outer if.",
    },
    {
      id: "if-mcq-49",
      question: "Which is the correct way to write a conditional that returns early?",
      options: [
        "if (condition) return;",
        "If (condition) return;",
        "IF (condition) return;",
        "if [condition] return;",
      ],
      answer: 0,
      explanation: "Java is case-sensitive. 'if' is lowercase. Parentheses are required.",
    },
    {
      id: "if-mcq-50",
      question: `What is the output?
int x = 10;
if (x > 0) {
    System.out.print("A");
}
if (x > 5) {
    System.out.print("B");
}
if (x > 15) {
    System.out.print("C");
}`,
      options: ["A", "AB", "ABC", "A B"],
      answer: 1,
      explanation: "Check each if: x > 0 → true, prints A. x > 5 → true, prints B. x > 15 → false, skipped. Output: AB.",
    },
  ],

  // ========== 10. TRUE/FALSE ==========
  trueFalse: [
    {
      id: "if-tf-1",
      question: "The condition inside `if()` must be enclosed in curly braces.",
      answer: false,
      explanation: "The condition must be in parentheses (), not curly braces {}. Curly braces enclose the code block.",
    },
    {
      id: "if-tf-2",
      question: "An if statement can exist without an else statement.",
      answer: true,
      explanation: "if is standalone. else is optional.",
    },
    {
      id: "if-tf-3",
      question: "Using `=` instead of `==` in an if condition always causes a compilation error.",
      answer: false,
      explanation: "If the variable is boolean, `if(b = true)` compiles (though it's assignment, not comparison). For non-boolean types, it's a compilation error.",
    },
    {
      id: "if-tf-4",
      question: "The code inside an if block executes when the condition is true.",
      answer: true,
      explanation: "This is the fundamental behavior of the if statement.",
    },
    {
      id: "if-tf-5",
      question: "Curly braces are mandatory for all if statements in Java.",
      answer: false,
      explanation: "For a single statement, braces are optional. But it's best practice to always use them.",
    },
    {
      id: "if-tf-6",
      question: "An if condition can contain method calls.",
      answer: true,
      explanation: "Any boolean expression, including method calls that return boolean, can be used as condition.",
    },
    {
      id: "if-tf-7",
      question: "The else block is required when using an if statement.",
      answer: false,
      explanation: "else is always optional. An if can stand alone.",
    },
    {
      id: "if-tf-8",
      question: "Nested if statements are allowed in Java.",
      answer: true,
      explanation: "You can nest if statements inside other if statements to any depth.",
    },
    {
      id: "if-tf-9",
      question: "The expression `5 < x < 10` is valid in Java.",
      answer: false,
      explanation: "Java does not support chained comparisons. Use `5 < x && x < 10`.",
    },
    {
      id: "if-tf-10",
      question: "An empty if block `if(true) {}` will cause a compilation error.",
      answer: false,
      explanation: "Empty blocks are valid in Java. The if just does nothing.",
    },
    {
      id: "if-tf-11",
      question: "The `!` operator inverts a boolean value.",
      answer: true,
      explanation: "`!true` is false. `!false` is true.",
    },
    {
      id: "if-tf-12",
      question: "Indentation in Java affects how the if statement executes.",
      answer: false,
      explanation: "Indentation is for readability only. Java ignores it completely.",
    },
    {
      id: "if-tf-13",
      question: "The `&&` operator returns true if at least one condition is true.",
      answer: false,
      explanation: "`&&` returns true only if BOTH conditions are true. `||` returns true if at least one is true.",
    },
    {
      id: "if-tf-14",
      question: "In Java, if the condition is false, the program continues after the if block.",
      answer: true,
      explanation: "When false, the if block is skipped and execution continues from the next statement after the if block.",
    },
    {
      id: "if-tf-15",
      question: "You can only use primitive data types in if conditions.",
      answer: false,
      explanation: "You can use any expression that evaluates to boolean, including reference variables like `if(str.isEmpty())`.",
    },
    {
      id: "if-tf-16",
      question: "A semicolon after an if statement like `if(x>5);` creates an empty if body.",
      answer: true,
      explanation: "The semicolon acts as an empty statement, making the if body do nothing.",
    },
    {
      id: "if-tf-17",
      question: "The `||` operator uses short-circuit evaluation.",
      answer: true,
      explanation: "If the left operand is true, the right operand is not evaluated (short-circuit).",
    },
    {
      id: "if-tf-18",
      question: "If there are multiple statements after an if without braces, all of them are part of the if block.",
      answer: false,
      explanation: "Without braces, only the FIRST statement is part of the if block. The rest are outside.",
    },
    {
      id: "if-tf-19",
      question: "The condition `if (x = true)` is valid for boolean x.",
      answer: true,
      explanation: "For boolean x, `x = true` is assignment, and the assigned value (true) is used as condition. It compiles but is bad practice.",
    },
    {
      id: "if-tf-20",
      question: "An if statement can be placed inside a method but not inside another if statement.",
      answer: false,
      explanation: "If statements can be placed anywhere — inside methods, other if statements, loops, etc.",
    },
  ],

  // ========== 11. SHORT ANSWER QUESTIONS ==========
  shortAnswerQuestions: [
    {
      id: "if-sa-1",
      question: "What is the purpose of the if statement in Java?",
      answer: "The if statement is used for conditional execution. It allows a block of code to execute only when a specified condition evaluates to true.",
    },
    {
      id: "if-sa-2",
      question: "What is the difference between `=` and `==` in Java?",
      answer: "`=` is the assignment operator used to assign values to variables. `==` is the equality comparison operator used to check if two values are equal.",
    },
    {
      id: "if-sa-3",
      question: "What happens if we put a semicolon right after `if(condition)`?",
      answer: "The semicolon acts as an empty statement, ending the if statement. The if body becomes empty (does nothing). Any code block that follows will be treated as a regular block that always executes, regardless of the condition.",
    },
    {
      id: "if-sa-4",
      question: "Are curly braces mandatory in an if statement? Explain.",
      answer: "No, curly braces are not mandatory if there is only a single statement inside the if block. However, it is strongly recommended to always use curly braces to avoid bugs and improve code readability.",
    },
    {
      id: "if-sa-5",
      question: "What is a nested if statement?",
      answer: "A nested if statement is an if statement placed inside another if statement. It allows checking multiple conditions in a hierarchical manner.",
    },
    {
      id: "if-sa-6",
      question: "What is short-circuit evaluation in logical operators?",
      answer: "Short-circuit evaluation means the second operand of && or || is evaluated only if necessary. For &&, if the first operand is false, the second is skipped. For ||, if the first operand is true, the second is skipped.",
    },
    {
      id: "if-sa-7",
      question: "What is the 'dangling else' problem?",
      answer: "The dangling else problem occurs in nested if statements where an else clause can match with multiple if statements. In Java, an else always attaches to the nearest unmatched if statement.",
    },
    {
      id: "if-sa-8",
      question: "Can we use a boolean variable directly as the condition in an if statement?",
      answer: "Yes. If a variable is of boolean type, it can be used directly: `if (flag)` instead of `if (flag == true)`. This is considered cleaner code.",
    },
    {
      id: "if-sa-9",
      question: "What will `if (x = 5)` do when x is an int?",
      answer: "This will cause a compilation error because `x = 5` assigns 5 to x and returns the int value 5. Java requires a boolean expression in the if condition.",
    },
    {
      id: "if-sa-10",
      question: "What is the output of `if (true) { } System.out.println(\"Hi\");`?",
      answer: "The output is 'Hi'. The if block is empty (does nothing), and execution continues to the println statement.",
    },
    {
      id: "if-sa-11",
      question: "How do you check if a number is even using an if statement?",
      answer: "Use the modulus operator: `if (num % 2 == 0)`. If the remainder when divided by 2 is 0, the number is even.",
    },
    {
      id: "if-sa-12",
      question: "What is the difference between `if (x > 5 && x < 10)` and `if (x > 5 || x < 10)`?",
      answer: "The first (&&) requires x to be BOTH greater than 5 AND less than 10 (range check). The second (||) requires x to be EITHER greater than 5 OR less than 10, which is always true for any number.",
    },
    {
      id: "if-sa-13",
      question: "Can an if statement be used without a condition?",
      answer: "No. The parentheses after 'if' must contain a boolean expression. `if ()` without a condition causes a compilation error.",
    },
    {
      id: "if-sa-14",
      question: "What is the scope of a variable declared inside an if block?",
      answer: "A variable declared inside an if block has block scope — it is only accessible within that if block. Accessing it outside causes a compilation error.",
    },
    {
      id: "if-sa-15",
      question: "What does the following code print? `int x=5; if(x>5) x++; System.out.println(x);`",
      answer: "It prints 5. x > 5 is false (5 > 5), so x++ is skipped. x remains 5.",
    },
    {
      id: "if-sa-16",
      question: "What happens if the condition in an if statement is a constant like `if (true)`?",
      answer: "The code always executes. `if (true)` is valid but the condition never changes. Using constant conditions is generally considered dead code or poor practice unless used for debugging.",
    },
    {
      id: "if-sa-17",
      question: "Explain the NOT (!) operator with an example.",
      answer: "The NOT operator inverts a boolean value. Example: `boolean isRaining = false; if (!isRaining) { System.out.println(\"Go outside\"); }` — Here !isRaining is true, so the message prints.",
    },
    {
      id: "if-sa-18",
      question: "What is the difference between `if (x == 0)` and `if (x = 0)`?",
      answer: "`if (x == 0)` checks if x equals 0 (comparison). `if (x = 0)` assigns 0 to x (for non-boolean x, this causes compilation error in Java as it returns int, not boolean).",
    },
    {
      id: "if-sa-19",
      question: "How does Java handle integer division in conditions?",
      answer: "Java performs integer division when both operands are integers, truncating the decimal part. For example, `7 / 2` evaluates to 3, not 3.5. This is important in conditions: `if (7/2 == 3)` is true.",
    },
    {
      id: "if-sa-20",
      question: "What is the best practice for comparing floating-point numbers in if conditions?",
      answer: "Avoid direct comparison with == due to precision issues. Instead, check if the difference is within a small tolerance: `if (Math.abs(a - b) < 0.0001)`.",
    },
  ],

  // ========== 12. LONG ANSWER QUESTIONS ==========
  longAnswerQuestions: [
    {
      id: "if-la-1",
      question: "Explain the syntax and working of the if statement in Java with a suitable example.",
      answer: "The if statement syntax: `if (condition) { // code }`. The condition must be a boolean expression. If true, the code block executes; if false, it's skipped. Example:\n\n```java\nint temperature = 35;\nif (temperature > 30) {\n    System.out.println(\"It's a hot day.\");\n    System.out.println(\"Stay hydrated.\");\n}\nSystem.out.println(\"Program continues.\");\n```\n\nHere, temperature > 30 is true (35 > 30), so both lines inside the block print. Then 'Program continues.' prints.",
    },
    {
      id: "if-la-2",
      question: "Explain short-circuit evaluation in Java with examples using && and || operators.",
      answer: "Short-circuit evaluation means the second operand is evaluated only if necessary.\n\nFor && (AND): If the left operand is false, the result is false regardless of the right operand, so right side is NOT evaluated.\n```java\nint x = 5;\nif (x > 10 && ++x > 0) { } // x is still 5 because ++x is never evaluated\n```\n\nFor || (OR): If the left operand is true, the result is true regardless of the right operand, so right side is NOT evaluated.\n```java\nint y = 5;\nif (y > 0 || ++y > 0) { } // y is still 5 because ++y is never evaluated\n```\n\nThis is important for preventing errors: `if (str != null && str.length() > 0)` — if str is null, the second part is safely skipped without throwing NullPointerException.",
    },
    {
      id: "if-la-3",
      question: "What are the common mistakes students make when using if statements? Explain each with an example.",
      answer: "1. Using = instead of ==: `if (x = 5)` — assignment instead of comparison. For int, this causes compilation error.\n\n2. Extra semicolon: `if (x == 5);` — the semicolon ends the if statement, making the next block always execute.\n\n3. Missing braces for multiple statements: Only the first statement after if is conditional; remaining statements always execute.\n\n4. Using == for String comparison: Should use `.equals()` method instead.\n\n5. Chained comparisons: Writing `if (5 < x < 10)` instead of `if (5 < x && x < 10)`.\n\n6. Forgetting that integer division truncates: `if (7/2 == 3.5)` is false because 7/2 = 3 (integer division).",
    },
    {
      id: "if-la-4",
      question: "Write a Java program that uses nested if statements to find the largest of three numbers.",
      answer: "```java\nint a = 25, b = 18, c = 30;\nint largest = a;\n\nif (b > largest) {\n    largest = b;\n}\nif (c > largest) {\n    largest = c;\n}\nSystem.out.println(\"Largest number is: \" + largest);\n```\n\nAlternatively using nested if:\n```java\nif (a > b) {\n    if (a > c) {\n        System.out.println(\"Largest: \" + a);\n    } else {\n        System.out.println(\"Largest: \" + c);\n    }\n} else {\n    if (b > c) {\n        System.out.println(\"Largest: \" + b);\n    } else {\n        System.out.println(\"Largest: \" + c);\n    }\n}\n```\nOutput: Largest: 30",
    },
    {
      id: "if-la-5",
      question: "Explain the concept of block scope with respect to variables declared inside an if statement.",
      answer: "Variables declared inside an if block have block scope — they exist only within that block's curly braces {}. Once the block ends, the variable is destroyed and cannot be accessed.\n\n```java\nint x = 10;\nif (x > 5) {\n    int y = 20;\n    System.out.println(\"Inside if: x = \" + x + \", y = \" + y);\n}\n// System.out.println(y); // ERROR! y is out of scope\nSystem.out.println(\"Outside if: x = \" + x); // Works fine — x is in outer scope\n```\n\nThis means different if blocks can have variables with the same name without conflict:\n```java\nif (true) { int num = 10; }\nif (true) { int num = 20; } // OK — different scope\n```\n\nBut you cannot access a block-scoped variable outside its block.",
    },
    {
      id: "if-la-6",
      question: "Write a program using if statements to determine if a year is a leap year. A year is a leap year if it is divisible by 400, or divisible by 4 but not by 100.",
      answer: "```java\nint year = 2024;\nboolean isLeap = false;\n\nif (year % 400 == 0) {\n    isLeap = true;\n}\nif (year % 4 == 0 && year % 100 != 0) {\n    isLeap = true;\n}\n\nif (isLeap) {\n    System.out.println(year + \" is a leap year.\");\n} else {\n    System.out.println(year + \" is not a leap year.\");\n}\n```\n\nSingle condition approach:\n```java\nif ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n    System.out.println(year + \" is a leap year.\");\n} else {\n    System.out.println(year + \" is not a leap year.\");\n}\n```\nOutput for 2024: 2024 is a leap year.",
    },
    {
      id: "if-la-7",
      question: "Explain how the if statement works with boolean expressions and logical operators. Provide examples of each logical operator.",
      answer: "The if statement requires a boolean expression — something that evaluates to true or false. Logical operators combine multiple boolean expressions:\n\n1. AND (&&): Both conditions must be true.\n```java\nif (age >= 18 && hasLicense) {\n    System.out.println(\"Can drive\");\n}\n```\n\n2. OR (||): At least one condition must be true.\n```java\nif (isWeekend || isHoliday) {\n    System.out.println(\"No school\");\n}\n```\n\n3. NOT (!): Inverts the boolean value.\n```java\nif (!isRaining) {\n    System.out.println(\"Go for a walk\");\n}\n```\n\nThese can be combined:\n```java\nif ((age >= 18 && age <= 60) || (isSpecialCase && age > 60)) {\n    System.out.println(\"Eligible\");\n}\n```\n\nOperator precedence matters: ! has highest, then &&, then ||. Parentheses can override precedence.",
    },
    {
      id: "if-la-8",
      question: "Write a Java program that uses if statements to calculate electricity bill based on units consumed. Slabs: 0-100 units: Rs 5/unit, 101-200: Rs 7/unit, above 200: Rs 10/unit.",
      answer: "```java\nint units = 250;\ndouble bill = 0.0;\n\nif (units <= 100) {\n    bill = units * 5.0;\n}\nif (units > 100 && units <= 200) {\n    bill = 100 * 5.0 + (units - 100) * 7.0;\n}\nif (units > 200) {\n    bill = 100 * 5.0 + 100 * 7.0 + (units - 200) * 10.0;\n}\n\nSystem.out.println(\"Units consumed: \" + units);\nSystem.out.println(\"Bill amount: Rs \" + bill);\n```\n\nOutput for 250 units:\nUnits consumed: 250\nBill amount: Rs 1700.0\n(500 + 700 + 500 = 1700)",
    },
    {
      id: "if-la-9",
      question: "Explain the difference between pre-increment (++x) and post-increment (x++) when used inside an if condition.",
      answer: "Pre-increment (++x): Increments x first, then returns the new value for comparison.\nPost-increment (x++): Returns the current value for comparison first, then increments x.\n\n```java\nint x = 5;\nif (++x == 6) { // x becomes 6 first, then 6 == 6 → true\n    System.out.println(x); // prints 6\n}\n\nint y = 5;\nif (y++ == 6) { // compares 5 == 6 → false first, then y becomes 6\n    System.out.println(y); // doesn't execute\n}\nSystem.out.println(y); // prints 6\n```\n\nThis distinction is crucial in output-based questions. Pre-increment changes the value before comparison; post-increment changes it after.",
    },
    {
      id: "if-la-10",
      question: "Write a program that uses if statements to validate user input: age must be between 0 and 150, and marks must be between 0 and 100.",
      answer: "```java\nint age = 25;\nint marks = 85;\nboolean valid = true;\n\nif (age < 0 || age > 150) {\n    System.out.println(\"Invalid age! Age must be between 0 and 150.\");\n    valid = false;\n}\nif (marks < 0 || marks > 100) {\n    System.out.println(\"Invalid marks! Marks must be between 0 and 100.\");\n    valid = false;\n}\nif (valid) {\n    System.out.println(\"All inputs are valid.\");\n    System.out.println(\"Age: \" + age + \", Marks: \" + marks);\n}\n```\n\nOutput: All inputs are valid.\nAge: 25, Marks: 85",
    },
    {
      id: "if-la-11",
      question: "Explain the concept of 'dead code' in the context of if statements. Give examples.",
      answer: "Dead code refers to code that can never execute. With if statements, this happens when the condition can never be satisfied:\n\n```java\n// Example 1: Constant false condition\nif (false) {\n    System.out.println(\"This never prints\"); // Dead code\n}\n\n// Example 2: Impossible condition\nint x = 10;\nif (x > 10 && x < 5) {\n    System.out.println(\"Impossible!\"); // Dead code — no number can be >10 and <5\n}\n\n// Example 3: Redundant check after assignment\nint y = 100;\nif (y > 0) { y = -5; }\nif (y < 0) { y = -10; } // This always executes because y was set to -5\n```\n\nDead code is inefficient and confusing. Most IDEs will warn about it.",
    },
    {
      id: "if-la-12",
      question: "What is the output of the following program? Explain step by step.\n\n```java\nint a = 5;\nint b = 12;\nif (a > b) {\n    System.out.println(\"a > b\");\n} else {\n    System.out.println(\"a <= b\");\n}\nif (a % 2 == 0) {\n    System.out.println(\"a is even\");\n}\nif (b % 2 == 0) {\n    System.out.println(\"b is even\");\n}\n```",
      answer: "Step-by-step execution:\n1. a = 5, b = 12\n2. Check if(5 > 12) → false. If block skipped.\n3. Execute else block: prints 'a <= b'\n4. Check if(5 % 2 == 0) → 5 % 2 = 1, 1 == 0 → false. Skipped.\n5. Check if(12 % 2 == 0) → 12 % 2 = 0, 0 == 0 → true. Prints 'b is even'\n\nOutput:\na <= b\nb is even",
    },
    {
      id: "if-la-13",
      question: "Compare and contrast using multiple if statements vs using if-else if-else ladder. When would you use each?",
      answer: "Multiple if statements:\n- Each condition is evaluated independently\n- Multiple blocks can execute if multiple conditions are true\n- Less efficient when conditions are mutually exclusive\n\nIf-else if-else ladder:\n- Conditions are evaluated in order until one is found true\n- Only ONE block executes\n- More efficient for mutually exclusive conditions\n- Better logical structure for exclusive choices\n\nExample — use multiple ifs when independent checks are needed:\n```java\nif (isWeekend) applyWeekendRate();\nif (isHoliday) applyHolidayRate();\n```\n\nUse if-else-if for exclusive choices:\n```java\nif (marks >= 90) grade = 'A';\nelse if (marks >= 80) grade = 'B';\nelse if (marks >= 70) grade = 'C';\nelse grade = 'D';\n```\n\nThis is more efficient than four separate if statements because once a condition matches, remaining ones are skipped.",
    },
    {
      id: "if-la-14",
      question: "Write a program that uses if statements to categorize a person's BMI. BMI categories: Below 18.5 (Underweight), 18.5-24.9 (Normal), 25-29.9 (Overweight), 30+ (Obese).",
      answer: "```java\ndouble weight = 70.0; // in kg\ndouble height = 1.75; // in meters\ndouble bmi = weight / (height * height);\nString category = \"\";\n\nif (bmi < 18.5) {\n    category = \"Underweight\";\n}\nif (bmi >= 18.5 && bmi < 25) {\n    category = \"Normal\";\n}\nif (bmi >= 25 && bmi < 30) {\n    category = \"Overweight\";\n}\nif (bmi >= 30) {\n    category = \"Obese\";\n}\n\nSystem.out.println(\"BMI: \" + bmi);\nSystem.out.println(\"Category: \" + category);\n```\n\nOutput for weight=70, height=1.75:\nBMI: 22.857...\nCategory: Normal",
    },
    {
      id: "if-la-15",
      question: "Explain how the if statement handles boolean expressions with side effects. What is the output of this code and why?\n\n```java\nint x = 5;\nif (x++ > 5 && x++ < 10) {\n    System.out.println(\"Inside if\");\n}\nSystem.out.println(\"x = \" + x);\n```",
      answer: "Step-by-step:\n1. x = 5 initially.\n2. Condition evaluation: `x++ > 5` — post-increment: compares 5 > 5 → false. Then x becomes 6.\n3. Short-circuit: Since left side of && is false, the right side `x++ < 10` is NOT evaluated.\n4. x remains 6 (not incremented again).\n5. if-block is skipped (condition is false).\n6. Prints 'x = 6'\n\nOutput:\nx = 6\n\nThis demonstrates short-circuit evaluation — the second increment never happens because the first condition was false. Always be careful with side effects in conditions!",
    },
  ],

  // ========== 13. PROGRAMMING QUESTIONS ==========
  programmingQuestions: {
    easy: [
      {
        id: "if-pg-e-1",
        question: "Write a Java program to check if a number is positive, negative, or zero using if statements.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        if (num > 0)
            System.out.println(num + " is positive.");
        if (num < 0)
            System.out.println(num + " is negative.");
        if (num == 0)
            System.out.println("Number is zero.");
        
        sc.close();
    }
}`,
        output: "Enter a number: -5\n-5 is negative.",
      },
      {
        id: "if-pg-e-2",
        question: "Write a program to check if a person is eligible to vote. (Eligible if age >= 18)",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter age: ");
        int age = sc.nextInt();
        
        if (age >= 18)
            System.out.println("You are eligible to vote.");
        if (age < 18)
            System.out.println("You are not eligible to vote.");
        
        sc.close();
    }
}`,
        output: "Enter age: 20\nYou are eligible to vote.",
      },
      {
        id: "if-pg-e-3",
        question: "Write a program to check if a number is divisible by both 3 and 5.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        if (num % 3 == 0 && num % 5 == 0)
            System.out.println(num + " is divisible by both 3 and 5.");
        if (num % 3 != 0 || num % 5 != 0)
            System.out.println(num + " is NOT divisible by both 3 and 5.");
        
        sc.close();
    }
}`,
        output: "Enter a number: 15\n15 is divisible by both 3 and 5.",
      },
      {
        id: "if-pg-e-4",
        question: "Write a program to accept a character and check if it is a vowel (a, e, i, o, u).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);
        ch = Character.toLowerCase(ch);
        
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
            System.out.println(ch + " is a vowel.");
        else
            System.out.println(ch + " is a consonant.");
        
        sc.close();
    }
}`,
        output: "Enter a character: A\na is a vowel.",
      },
      {
        id: "if-pg-e-5",
        question: "Write a program to check if a given year is a leap year or not using if statements.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter year: ");
        int year = sc.nextInt();
        
        if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
            System.out.println(year + " is a leap year.");
        else
            System.out.println(year + " is not a leap year.");
        
        sc.close();
    }
}`,
        output: "Enter year: 2024\n2024 is a leap year.",
      },
    ],
    medium: [
      {
        id: "if-pg-m-1",
        question: "Write a program to calculate the discount based on purchase amount. Discount: > 10000 → 20%, 5000-10000 → 10%, < 5000 → 5%.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter purchase amount: ");
        double amount = sc.nextDouble();
        double discount = 0;
        
        if (amount > 10000)
            discount = amount * 0.2;
        if (amount >= 5000 && amount <= 10000)
            discount = amount * 0.1;
        if (amount < 5000)
            discount = amount * 0.05;
        
        double finalAmount = amount - discount;
        System.out.println("Original amount: Rs " + amount);
        System.out.println("Discount: Rs " + discount);
        System.out.println("Final amount: Rs " + finalAmount);
        
        sc.close();
    }
}`,
        output: "Enter purchase amount: 12000\nOriginal amount: Rs 12000.0\nDiscount: Rs 2400.0\nFinal amount: Rs 9600.0",
      },
      {
        id: "if-pg-m-2",
        question: "Write a program to find the largest among three numbers using nested if statements.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        
        if (a > b) {
            if (a > c) {
                System.out.println(a + " is the largest.");
            } else {
                System.out.println(c + " is the largest.");
            }
        } else {
            if (b > c) {
                System.out.println(b + " is the largest.");
            } else {
                System.out.println(c + " is the largest.");
            }
        }
        
        sc.close();
    }
}`,
        output: "Enter three numbers: 45 23 67\n67 is the largest.",
      },
      {
        id: "if-pg-m-3",
        question: "Write a program to calculate income tax. Slabs: < 2.5L → 0%, 2.5L-5L → 5%, 5L-10L → 20%, >10L → 30%.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter annual income (in lakhs): ");
        double income = sc.nextDouble() * 100000;
        double tax = 0;
        
        if (income <= 250000)
            tax = 0;
        if (income > 250000 && income <= 500000)
            tax = (income - 250000) * 0.05;
        if (income > 500000 && income <= 1000000)
            tax = 250000 * 0.05 + (income - 500000) * 0.2;
        if (income > 1000000)
            tax = 250000 * 0.05 + 500000 * 0.2 + (income - 1000000) * 0.3;
        
        System.out.println("Income: Rs " + income);
        System.out.println("Tax payable: Rs " + tax);
        
        sc.close();
    }
}`,
        output: "Enter annual income (in lakhs): 8\nIncome: Rs 800000.0\nTax payable: Rs 72500.0",
      },
    ],
    hard: [
      {
        id: "if-pg-h-1",
        question: "Write a program to determine the type of triangle based on side lengths. Classify as equilateral, isosceles, scalene, or invalid.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three sides of triangle: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        
        if (a + b > c && b + c > a && a + c > b) {
            if (a == b && b == c) {
                System.out.println("Equilateral Triangle");
            } else if (a == b || b == c || a == c) {
                System.out.println("Isosceles Triangle");
            } else {
                System.out.println("Scalene Triangle");
            }
        } else {
            System.out.println("Invalid triangle!");
        }
        
        sc.close();
    }
}`,
        output: "Enter three sides of triangle: 5 5 8\nIsosceles Triangle",
      },
      {
        id: "if-pg-h-2",
        question: "Write a program to calculate electricity bill with surcharge. Units: 0-100: Rs 4/unit, 101-300: Rs 6/unit, >300: Rs 8/unit. Add 15% surcharge if bill > Rs 1000.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter units consumed: ");
        int units = sc.nextInt();
        double bill = 0;
        
        if (units <= 100) {
            bill = units * 4.0;
        }
        if (units > 100 && units <= 300) {
            bill = 100 * 4.0 + (units - 100) * 6.0;
        }
        if (units > 300) {
            bill = 100 * 4.0 + 200 * 6.0 + (units - 300) * 8.0;
        }
        
        double surcharge = 0;
        if (bill > 1000) {
            surcharge = bill * 0.15;
        }
        
        double finalBill = bill + surcharge;
        System.out.println("Base bill: Rs " + bill);
        System.out.println("Surcharge: Rs " + surcharge);
        System.out.println("Final bill: Rs " + finalBill);
        
        sc.close();
    }
}`,
        output: "Enter units consumed: 250\nBase bill: Rs 1300.0\nSurcharge: Rs 195.0\nFinal bill: Rs 1495.0",
      },
    ],
  },

  // ========== 14. CHALLENGE PROBLEMS ==========
  challengeProblems: [
    {
      id: "if-cp-1",
      title: "Date Validator",
      question: "Write a program that accepts day, month, and year and validates if it's a correct date. Consider leap years for February. Use only if statements (no arrays, no switch).",
      solution: `import java.util.Scanner;
public class DateValidator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter day, month, year: ");
        int day = sc.nextInt();
        int month = sc.nextInt();
        int year = sc.nextInt();
        
        boolean valid = true;
        int maxDays = 31;
        
        if (month < 1 || month > 12) valid = false;
        if (year < 1) valid = false;
        
        if (month == 2) {
            if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
                maxDays = 29;
            else
                maxDays = 28;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11)
            maxDays = 30;
        
        if (day < 1 || day > maxDays) valid = false;
        
        if (valid)
            System.out.println(day + "/" + month + "/" + year + " is a valid date.");
        else
            System.out.println("Invalid date!");
        
        sc.close();
    }
}`,
    },
    {
      id: "if-cp-2",
      title: "Quadratic Equation Roots",
      question: "Write a program to find the nature of roots of a quadratic equation ax² + bx + c = 0 using if statements. Check discriminant D = b² - 4ac. If D > 0: real and distinct, D == 0: real and equal, D < 0: imaginary.",
      solution: `import java.util.Scanner;
public class QuadraticRoots {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a, b, c: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        
        if (a == 0) {
            System.out.println("Not a quadratic equation!");
        } else {
            int d = b * b - 4 * a * c;
            
            if (d > 0) {
                System.out.println("Roots are real and distinct.");
                double r1 = (-b + Math.sqrt(d)) / (2.0 * a);
                double r2 = (-b - Math.sqrt(d)) / (2.0 * a);
                System.out.println("Root 1: " + r1);
                System.out.println("Root 2: " + r2);
            } else if (d == 0) {
                System.out.println("Roots are real and equal.");
                double r = -b / (2.0 * a);
                System.out.println("Root: " + r);
            } else {
                System.out.println("Roots are imaginary.");
                double real = -b / (2.0 * a);
                double imag = Math.sqrt(-d) / (2.0 * a);
                System.out.println("Root 1: " + real + " + " + imag + "i");
                System.out.println("Root 2: " + real + " - " + imag + "i");
            }
        }
        
        sc.close();
    }
}`,
    },
    {
      id: "if-cp-3",
      title: "Number Properties Checker",
      question: "Write a program to check the following properties of a number using if statements (each in a separate block): (a) Palindrome, (b) Armstrong number, (c) Perfect number. Use only if statements.",
      solution: `import java.util.Scanner;
public class NumberProperties {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num;
        
        // Palindrome check
        int rev = 0, temp = num;
        while (temp > 0) {
            rev = rev * 10 + temp % 10;
            temp /= 10;
        }
        if (rev == original)
            System.out.println(num + " is a Palindrome.");
        else
            System.out.println(num + " is NOT a Palindrome.");
        
        // Armstrong check
        int sum = 0, temp2 = num;
        while (temp2 > 0) {
            int digit = temp2 % 10;
            sum += digit * digit * digit;
            temp2 /= 10;
        }
        if (sum == original)
            System.out.println(num + " is an Armstrong number.");
        else
            System.out.println(num + " is NOT an Armstrong number.");
        
        // Perfect number check
        int perfectSum = 0;
        for (int i = 1; i < num; i++) {
            if (num % i == 0) {
                perfectSum += i;
            }
        }
        if (perfectSum == original)
            System.out.println(num + " is a Perfect number.");
        else
            System.out.println(num + " is NOT a Perfect number.");
        
        sc.close();
    }
}`,
    },
  ],

  // ========== 15. PREVIOUS YEAR STYLE QUESTIONS ==========
  previousYearQuestions: [
    {
      id: "if-py-1",
      question: "(ICSE 2020 Style) Write the output of: \nint x = 10;\nif (x > 5)\n    if (x < 15)\n        System.out.println(\"A\");\n    else\n        System.out.println(\"B\");\nelse\n    System.out.println(\"C\");",
      answer: "A",
      explanation: "x > 5 → true. Inside: x < 15 → true. Prints 'A'. The else belongs to the inner if.",
    },
    {
      id: "if-py-2",
      question: "(ICSE 2019 Style) What is the value of x after execution?\nint x = 0;\nif (x = 0)\n    x = 10;\nelse\n    x = 20;",
      answer: "Compilation Error",
      explanation: "x = 0 is assignment (returns int 0), not boolean. Java requires boolean in if-condition.",
    },
    {
      id: "if-py-3",
      question: "(ISC 2021 Style) Analyze the code:\n\nint a = 5, b = 3;\nif (a > b) {\n    System.out.println(\"a > b\");\n    a = b + 5;\n}\nSystem.out.println(a);",
      answer: "a > b\n8",
      explanation: "a > b → true. Prints 'a > b'. a becomes 3 + 5 = 8. Prints 8.",
    },
    {
      id: "if-py-4",
      question: "(ICSE 2022 Style) Predict the output:\n\nint x = 3, y = 7;\nif (x > y)\n    x += y;\nelse\n    y += x;\nSystem.out.println(x + \", \" + y);",
      answer: "3, 10",
      explanation: "3 > 7 → false. Else runs: y = y + x = 7 + 3 = 10. x remains 3. Output: 3, 10.",
    },
    {
      id: "if-py-5",
      question: "(ISC 2020 Style) What will be the output?\n\nint p = 5, q = 5;\nif (p == q)\n    p = p + 2;\n    q = q + 3;\nSystem.out.println(p + \" \" + q);",
      answer: "7 8",
      explanation: "p == q → true. Only `p = p + 2` is inside the if (no braces). p = 7. `q = q + 3` is outside the if and always runs. q = 8.",
    },
    {
      id: "if-py-6",
      question: "(ICSE 2021 Style) Write a Java expression for: If x is greater than y and x is greater than z, print x, else print y if y > z else print z.",
      answer: "```java\nif (x > y && x > z)\n    System.out.println(x);\nelse if (y > z)\n    System.out.println(y);\nelse\n    System.out.println(z);\n```",
      explanation: "This finds the largest of three numbers.",
    },
    {
      id: "if-py-7",
      question: "(ISC 2019 Style) Rewrite the following using if-else:\n\ndouble discount = (amount > 10000) ? amount * 0.2 : amount * 0.05;",
      answer: "```java\ndouble discount;\nif (amount > 10000)\n    discount = amount * 0.2;\nelse\n    discount = amount * 0.05;\n```",
    },
    {
      id: "if-py-8",
      question: "(ICSE 2018 Style) What is the output?\n\nint a = 3, b = 4, c = 5;\nif (a < b && b < c)\n    System.out.println(\"Increasing\");\nelse\n    System.out.println(\"Not increasing\");",
      answer: "Increasing",
      explanation: "a < b → 3 < 4 → true. b < c → 4 < 5 → true. true && true → true. Prints 'Increasing'.",
    },
    {
      id: "if-py-9",
      question: "(ISC 2022 Style) Analyze the code:\n\nint m = 65;\nif (m >= 90)\n    System.out.println(\"A\");\nelse if (m >= 80)\n    System.out.println(\"B\");\nelse if (m >= 60)\n    System.out.println(\"C\");\nelse\n    System.out.println(\"D\");",
      answer: "C",
      explanation: "m >= 90 → false. m >= 80 → false. m >= 60 → true. Prints 'C'.",
    },
    {
      id: "if-py-10",
      question: "(ICSE 2023 Style) Give the output:\n\nint x = 1;\nif (x++ > 0)\n    System.out.println(++x);\nelse\n    System.out.println(x);",
      answer: "3",
      explanation: "x++: compares 1 > 0 → true, then x becomes 2. Inside if: ++x makes x = 3, then prints 3.",
    },
  ],

  // ========== 16. AI VIVA QUESTIONS ==========
  vivaQuestions: [
    {
      id: "if-vv-1",
      question: "What is the purpose of the if statement?",
      answer: "The if statement allows conditional execution of code. It evaluates a boolean condition and executes a block only if the condition is true.",
    },
    {
      id: "if-vv-2",
      question: "What is the difference between == and =?",
      answer: "== is the equality comparison operator (checks if values are equal). = is the assignment operator (assigns a value to a variable).",
    },
    {
      id: "if-vv-3",
      question: "What happens if you put a semicolon after if(condition)?",
      answer: "The semicolon acts as an empty statement, making the if body empty. The if condition is evaluated but nothing happens. Any subsequent code block is treated as a regular block, not controlled by the if.",
    },
    {
      id: "if-vv-4",
      question: "Are braces mandatory for if statements?",
      answer: "No. For a single statement, braces are optional. However, it's best practice to always use them to avoid bugs and improve readability.",
    },
    {
      id: "if-vv-5",
      question: "What type must the condition in an if statement be?",
      answer: "The condition must be a boolean expression — something that evaluates to true or false.",
    },
    {
      id: "if-vv-6",
      question: "What is short-circuit evaluation?",
      answer: "Short-circuit evaluation means that in && and || operations, the second operand is evaluated only if needed. For &&, if the first is false, the second is skipped. For ||, if the first is true, the second is skipped.",
    },
    {
      id: "if-vv-7",
      question: "Can you use an integer directly as a condition in Java if statement?",
      answer: "No. Unlike C/C++, Java requires a boolean condition. An integer cannot be used directly; you must use a comparison like `if (x != 0)`.",
    },
    {
      id: "if-vv-8",
      question: "What is a nested if statement?",
      answer: "A nested if is an if statement placed inside another if statement's block. It allows checking hierarchical conditions.",
    },
    {
      id: "if-vv-9",
      question: "What is the 'dangling else' problem?",
      answer: "It occurs when an else can match with multiple if statements in nested structures. Java resolves this by matching else with the nearest unmatched if.",
    },
    {
      id: "if-vv-10",
      question: "How do you correctly compare two Strings in an if condition?",
      answer: "Use the `.equals()` method: `if (str1.equals(str2))`. The == operator compares references, not content.",
    },
    {
      id: "if-vv-11",
      question: "What is block scope in the context of if statements?",
      answer: "Variables declared inside an if block are only accessible within that block. They go out of scope when the block ends.",
    },
    {
      id: "if-vv-12",
      question: "Explain the difference between if and if-else.",
      answer: "if runs code when condition is true and does nothing when false. if-else runs one block when true and a different block when false.",
    },
    {
      id: "if-vv-13",
      question: "What is the output of `if (true) {} System.out.println(\"Hi\");`?",
      answer: "Hi. The if block is empty and does nothing. Execution continues to the println.",
    },
    {
      id: "if-vv-14",
      question: "Why should you avoid comparing floating-point numbers with == in if conditions?",
      answer: "Floating-point arithmetic has precision issues. Numbers that should be equal may differ slightly. Use tolerance: `Math.abs(a - b) < 0.0001`.",
    },
    {
      id: "if-vv-15",
      question: "How do you check if a number is even using an if statement?",
      answer: "Use `if (num % 2 == 0)`. If the remainder when divided by 2 is 0, the number is even.",
    },
    {
      id: "if-vv-16",
      question: "What is the difference between nested if and if-else ladder?",
      answer: "Nested if places if statements inside if blocks for hierarchical checking. If-else ladder checks conditions in sequence and executes the first matching block.",
    },
    {
      id: "if-vv-17",
      question: "Can an if statement contain zero statements?",
      answer: "Yes. An if block can be empty: `if (true) {}`. This is valid but does nothing.",
    },
    {
      id: "if-vv-18",
      question: "What happens in if (x++ > 5) vs if (++x > 5)?",
      answer: "In `x++`, the current value is used for comparison, then x increments. In `++x`, x increments first, then the new value is used for comparison.",
    },
    {
      id: "if-vv-19",
      question: "How do you write a condition that checks if a character is uppercase?",
      answer: "Use `if (ch >= 'A' && ch <= 'Z')`. Alternatively, use `Character.isUpperCase(ch)`.",
    },
    {
      id: "if-vv-20",
      question: "Is `if (x = true)` valid for boolean x?",
      answer: "Yes, it compiles but is bad practice. It assigns true to x and uses the assigned value (true) as condition. Should be `if (x)` or `if (x == true)`.",
    },
  ],

  // ========== 17. PRACTICE TEST ==========
  practiceTest: {
    title: "IF Statement — Practice Test",
    totalMarks: 25,
    timeLimit: "30 minutes",
    sections: [
      {
        title: "Section A — Multiple Choice",
        marks: 5,
        questions: [
          {
            id: "if-pt-1",
            question: "What does the if statement do?",
            options: ["Loops code", "Makes decisions", "Declares variables", "Prints output"],
            answer: 1,
          },
          {
            id: "if-pt-2",
            question: "Which operator checks equality?",
            options: ["=", "==", "!=", "==="],
            answer: 1,
          },
          {
            id: "if-pt-3",
            question: `int x = 5;\nif (x > 10)\n    System.out.println(\"A\");\nSystem.out.println(\"B\");`,
            options: ["A", "B", "AB", "Nothing"],
            answer: 1,
          },
          {
            id: "if-pt-4",
            question: "Which is the logical AND operator?",
            options: ["&", "&&", "|", "||"],
            answer: 1,
          },
          {
            id: "if-pt-5",
            question: "What does `if (x%2==0)` check?",
            options: ["Odd", "Even", "Prime", "Negative"],
            answer: 1,
          },
        ],
      },
      {
        title: "Section B — Output Based",
        marks: 10,
        questions: [
          {
            id: "if-pt-6",
            question: "Find output:\nint a = 10, b = 20;\nif (a < b)\n    System.out.print(\"Less\");\nSystem.out.print(\"Than\");",
            answer: "LessThan",
          },
          {
            id: "if-pt-7",
            question: "Find output:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Yes\");\nelse\n    System.out.println(\"No\");",
            answer: "Compilation error",
          },
        ],
      },
      {
        title: "Section C — Programming",
        marks: 10,
        questions: [
          {
            id: "if-pt-8",
            question: "Write a program using if statements to find the smallest of three numbers.",
            marks: 5,
          },
          {
            id: "if-pt-9",
            question: "Write a program that checks if a character is a digit (0-9) or not, using if statements.",
            marks: 5,
          },
        ],
      },
    ],
  },

  // ========== 18. CHAPTER SUMMARY ==========
  chapterSummary: {
    keyPoints: [
      "`if` is a conditional statement that executes code only when its boolean condition is true.",
      "The condition must be enclosed in parentheses `()` and must evaluate to a boolean.",
      "Curly braces `{}` define the block of code to execute — use them even for single statements.",
      "Common operators: == (equals), != (not equals), && (AND), || (OR), ! (NOT).",
      "Never use = (assignment) where == (comparison) is needed.",
      "A semicolon after `if(condition)` creates an empty if body.",
      "Without braces, only the first statement is conditional.",
      "Short-circuit evaluation: && skips right side if left is false; || skips right side if left is true.",
      "Nested if statements allow hierarchical condition checking.",
      "The 'dangling else' attaches to the nearest unmatched if.",
    ],
    skillsLearned: [
      "Writing conditional logic using if statements",
      "Using comparison and logical operators correctly",
      "Tracing and debugging if-statement code",
      "Avoiding common pitfalls like = vs == and missing braces",
    ],
  },

  // ========== 19. REVISION NOTES ==========
  revisionNotes: [
    {
      title: "If Statement Syntax",
      content: "`if (condition) { // code }` — executes code block only when condition is true.",
    },
    {
      title: "Condition Requirements",
      content: "Must be a boolean expression — only true or false. Use comparison (==, !=, <, >, <=, >=) and logical (&&, ||, !) operators.",
    },
    {
      title: "Common Traps",
      content: "• `=` vs `==`: assignment vs comparison\n• Semicolon after if: `if(x>5);` creates empty body\n• Missing braces: only first statement is conditional\n• Integer division: 7/2 = 3, not 3.5",
    },
    {
      title: "Short-Circuit",
      content: "&& stops if left is false. || stops if left is true. Important when right side has side effects.",
    },
    {
      title: "Nested If",
      content: "If inside if. Used for hierarchical conditions. Else matches nearest if.",
    },
  ],

  // ========== 20. CHEATSHEET ==========
  cheatsheet: {
    syntax: "if (condition) {\n    // code\n}",
    operators: {
      comparison: "==, !=, <, >, <=, >=",
      logical: "&& (AND), || (OR), ! (NOT)",
    },
    commonPatterns: [
      { pattern: "Even/odd check", code: "if (num % 2 == 0)" },
      { pattern: "Range check", code: "if (x > 5 && x < 10)" },
      { pattern: "Not condition", code: "if (!flag)" },
      { pattern: "Null safe check", code: "if (str != null && str.isEmpty())" },
    ],
    pitfalls: [
      "Use == not = for comparison",
      "Don't put ; after if(condition)",
      "Use braces for blocks",
      "Use .equals() for Strings",
      "Java needs boolean, not int (unlike C/C++)",
    ],
  },

  // ========== 21. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    
  {
    "id": "if-ar-1",
    "assertion": "Assertion (A): An if statement checks a condition before executing its block.",
    "reason": "Reason (R): The condition in an if statement must evaluate to a boolean value.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 1,
    "explanation": "Both are true. The if statement does check a condition, and that condition must be boolean. However, R explains the requirement, not the checking mechanism."
  },
  {
    "id": "if-ar-2",
    "assertion": "Assertion (A): Using = instead of == in an if condition causes a compilation error for int types.",
    "reason": "Reason (R): The = operator is for assignment and returns the assigned value, not a boolean.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. Assignment returns int (not boolean), so Java gives a compilation error."
  },
  {
    "id": "if-ar-3",
    "assertion": "Assertion (A): A semicolon after if(condition) makes the if block always execute.",
    "reason": "Reason (R): The semicolon ends the if statement, creating an empty body.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 2,
    "explanation": "A is false — the semicolon creates an empty if body (the if does nothing). The next block is NOT part of the if. R is true."
  },
  {
    "id": "if-ar-4",
    "assertion": "Assertion (A): Without braces, only the first statement after if is conditional.",
    "reason": "Reason (R): Java treats only the immediate next statement as the if body when braces are absent.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. Without braces, only the first statement belongs to the if block."
  },
  {
    "id": "if-ar-5",
    "assertion": "Assertion (A): The condition if(x > 5 && x < 10) checks if x is between 5 and 10.",
    "reason": "Reason (R): The && operator returns true only when both conditions are true.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. x > 5 AND x < 10 means x is between 5 and 10 (exclusive)."
  },
  {
    "id": "if-ar-6",
    "assertion": "Assertion (A): The || operator short-circuits if the first condition is true.",
    "reason": "Reason (R): In OR operation, if the first operand is true, the result is always true regardless of the second.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. || short-circuits: if left is true, right is not evaluated."
  },
  {
    "id": "if-ar-7",
    "assertion": "Assertion (A): Nested if statements allow checking multiple conditions hierarchically.",
    "reason": "Reason (R): An if statement can be placed inside another if statement's block.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. Nested ifs allow hierarchical decision-making."
  },
  {
    "id": "if-ar-8",
    "assertion": "Assertion (A): The condition if(flag) is equivalent to if(flag == true) for boolean variables.",
    "reason": "Reason (R): A boolean variable can be used directly as a condition.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. if(flag) is cleaner and preferred over if(flag == true)."
  },
  {
    "id": "if-ar-9",
    "assertion": "Assertion (A): The ! operator reverses a boolean value.",
    "reason": "Reason (R): !true evaluates to false, and !false evaluates to true.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. The logical NOT operator (!) inverts the boolean value."
  },
  {
    "id": "if-ar-10",
    "assertion": "Assertion (A): An if statement can exist without an else block.",
    "reason": "Reason (R): The else block is optional in Java's if-else construct.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. The else part is optional — if can be used alone."
  }

  ]
      answer: 0,
      explanation: "Both are true. The condition is checked before each iteration. If false initially, it executes 0 times."
    },
    {
      id: "if-ar-2",
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
      id: "if-ar-3",
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
      id: "if-ar-4",
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
      id: "if-ar-5",
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
      id: "if-ar-6",
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
      id: "if-ar-7",
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
      id: "if-ar-8",
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
      id: "if-ar-9",
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
      id: "if-ar-10",
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

  // ========== 22. DEBUG THE CODE ==========
  debugTheCode: [
    
  {
    "id": "if-dc-1",
    "question": "Find and fix the bug:\nint x = 5;\nif (x = 10)\n    System.out.println(\"Equal\");",
    "bug": "Using = instead of ==. Causes compilation error.",
    "debuggedCode": "int x = 5;\nif (x == 10)\n    System.out.println(\"Equal\");",
    "explanation": "Use == for comparison. = is for assignment."
  },
  {
    "id": "if-dc-2",
    "question": "Find and fix the bug:\nint x = 5;\nif (x > 3); {\n    System.out.println(\"x is greater than 3\");\n}",
    "bug": "Semicolon after if creates empty body. Block always executes.",
    "debuggedCode": "int x = 5;\nif (x > 3) {\n    System.out.println(\"x is greater than 3\");\n}",
    "explanation": "Remove the semicolon after the if condition."
  },
  {
    "id": "if-dc-3",
    "question": "Find and fix the bug:\nint a = 10, b = 20;\nif (a > b)\n    System.out.println(\"a is greater\");\n    System.out.println(\"b is smaller\");",
    "bug": "Missing braces. Second println always runs.",
    "debuggedCode": "int a = 10, b = 20;\nif (a > b) {\n    System.out.println(\"a is greater\");\n    System.out.println(\"b is smaller\");\n}",
    "explanation": "Without braces, only the first statement is conditional."
  },
  {
    "id": "if-dc-4",
    "question": "Find and fix the bug:\nint marks = 75;\nif (marks >= 40)\n    System.out.println(\"Pass\");\nelse\n    System.out.println(\"Fail\");\n    System.out.println(\"Result declared\");",
    "bug": "No bug. Code is correct.",
    "debuggedCode": "int marks = 75;\nif (marks >= 40)\n    System.out.println(\"Pass\");\nelse\n    System.out.println(\"Fail\");\n    System.out.println(\"Result declared\");",
    "explanation": "The last println is outside if-else and always runs. This is correct."
  },
  {
    "id": "if-dc-5",
    "question": "Find and fix the bug:\nint age = 15;\nif (age >= 18);\n    System.out.println(\"Adult\");\nelse\n    System.out.println(\"Minor\");",
    "bug": "Semicolon after if causes compilation error because else is dangling.",
    "debuggedCode": "int age = 15;\nif (age >= 18)\n    System.out.println(\"Adult\");\nelse\n    System.out.println(\"Minor\");",
    "explanation": "Remove the semicolon. The semicolon ends the if, leaving else without a matching if."
  },
  {
    "id": "if-dc-6",
    "question": "Find and fix the bug:\nint num = 7;\nif (num % 2 = 0)\n    System.out.println(\"Even\");",
    "bug": "Using = instead of ==. Causes compilation error.",
    "debuggedCode": "int num = 7;\nif (num % 2 == 0)\n    System.out.println(\"Even\");",
    "explanation": "Use == for comparison. = is for assignment."
  },
  {
    "id": "if-dc-7",
    "question": "Find and fix the bug:\nboolean flag = true;\nif (flag == true)\n    System.out.println(\"True\");\nelse\n    System.out.println(\"False\");",
    "bug": "No bug, but code can be cleaner.",
    "debuggedCode": "boolean flag = true;\nif (flag)\n    System.out.println(\"True\");\nelse\n    System.out.println(\"False\");",
    "explanation": "if(flag) is cleaner than if(flag == true). Both work correctly."
  },
  {
    "id": "if-dc-8",
    "question": "Find and fix the bug:\nint x = 10;\nif (x > 5) {\n    int y = 20;\n}\nSystem.out.println(y);",
    "bug": "y is declared inside the if block and is not accessible outside.",
    "debuggedCode": "int x = 10;\nint y = 0;\nif (x > 5) {\n    y = 20;\n}\nSystem.out.println(y);",
    "explanation": "Variables declared inside a block are scoped to that block."
  },
  {
    "id": "if-dc-9",
    "question": "Find and fix the bug:\nint a = 5, b = 5;\nif (a = b)\n    System.out.println(\"Equal\");",
    "bug": "Using = instead of ==. Causes compilation error.",
    "debuggedCode": "int a = 5, b = 5;\nif (a == b)\n    System.out.println(\"Equal\");",
    "explanation": "Use == for comparison. = is for assignment."
  },
  {
    "id": "if-dc-10",
    "question": "Find and fix the bug:\nint score = 85;\nif (score >= 90)\n    System.out.println(\"A\");\nif (score >= 80)\n    System.out.println(\"B\");\nif (score >= 70)\n    System.out.println(\"C\");",
    "bug": "No bug, but using else-if would be more efficient.",
    "debuggedCode": "int score = 85;\nif (score >= 90)\n    System.out.println(\"A\");\nelse if (score >= 80)\n    System.out.println(\"B\");\nelse if (score >= 70)\n    System.out.println(\"C\");",
    "explanation": "Multiple ifs check all conditions. Else-if stops at first match."
  }

  ]

  // ========== 23. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "if-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "if-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "if-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "if-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "if-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "if-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "if-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "if-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "if-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "if-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "if-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "if-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 24. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "if-mps-1",
      title: "Practice Set 1: If statement Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "if-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "if-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "if-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "if-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "if-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "if-mps-2",
      title: "Practice Set 2: If statement Applications",
      questions: [
        {
          type: "mcq",
          id: "if-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "if-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "if-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "if-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "if-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 25. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "if-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "if-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "if-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "if-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "if-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "if-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "if-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "if-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "if-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "if-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "if-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "if-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "if-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "if-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "if-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "if-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "if-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "if-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "if-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "if-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter01;