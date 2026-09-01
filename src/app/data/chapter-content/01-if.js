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
      question: `float f = 0.7f;
if (f == 0.7)
    System.out.println("Equal");
System.out.println("Done");`,
      answer: "Done",
      explanation: "Comparing float with double literal 0.7. 0.7 cannot be stored precisely in binary floating-point, so 0.7f (float precision) does not equal 0.7 (double precision). Condition is false. Only 'Done' prints.",
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
      question: `float f = 0.7f;
if (f == 0.7) {
    System.out.println("Equal");
}`,
      error: "Comparing float variable with double literal `0.7` will evaluate to false due to precision differences.",
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
      explanation: "The semicolon ends the if statement with an empty body. The next block is just a regular block that always executes.",
    },
    {
      id: "if-mcq-7",
      question: "Which operator represents logical AND in Java?",
      options: ["&", "&&", "AND", "and"],
      answer: 1,
      explanation: "`&&` is the conditional short-circuit logical AND operator in Java.",
    },
    {
      id: "if-mcq-8",
      question: `What will happen when compiling this snippet?
int a = 5;
if (a = 5) {
    System.out.println("Five");
}`,
      options: [
        "Prints Five",
        "Compilation error: incompatible types",
        "Runtime exception",
        "Prints nothing",
      ],
      answer: 1,
      explanation: "`a = 5` evaluates to an int (5), not a boolean, causing a compilation error.",
    },
    {
      id: "if-mcq-9",
      question: "How should you compare two String objects `s1` and `s2` for value equality?",
      options: ["s1 == s2", "s1.equals(s2)", "s1 = s2", "s1.compare(s2)"],
      answer: 1,
      explanation: "`.equals()` compares character sequence equality. `==` checks reference identity.",
    },
    {
      id: "if-mcq-10",
      question: `What is the output of the following code?
boolean a = true;
if (!a)
    System.out.print("A");
System.out.print("B");`,
      options: ["AB", "A", "B", "Nothing"],
      answer: 2,
      explanation: "`!true` evaluates to false, so 'A' is skipped. 'B' prints unconditionally.",
    },
  ],
};