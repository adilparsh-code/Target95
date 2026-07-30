const chapter02 = {
  id: "02-if-else",
  title: "IF-ELSE Statement",
  slug: "if-else",
  subject: "Java Programming",
  difficulty: "Beginner",
  estimatedTime: 120,
  topics: [
    "if-else",
    "conditional execution",
    "two-way decision",
    "else-if ladder",
    "nested if-else",
    "ternary operator",
    "dangling else",
    "boolean expressions",
    "relational operators",
    "logical operators",
  ],

  // ==========================
  // SECTION 1: INTRODUCTION
  // ==========================
  introduction: {
    whatIsIfElse:
      "The `if-else` statement is a two-way decision-making construct in Java. It evaluates a boolean condition and executes one block of code if the condition is `true`, and a different block if the condition is `false`. Unlike a plain `if` statement that only handles the true case, `if-else` provides a complete fork in execution — one path for each possible outcome.",
    differenceBetweenIfAndIfElse: [
      "A plain `if` executes its block only when the condition is true. If false, nothing happens and execution continues after the if block.",
      "An `if-else` executes the if-block when true, and the else-block when false. Exactly one of the two blocks always executes.",
      "Plain `if` is one-way decision. `if-else` is two-way decision.",
      "Plain `if` can leave variables uninitialized if no else is provided. `if-else` guarantees assignment in both paths.",
    ],
    whyUseIfElse: [
      "To handle both outcomes of a condition — success and failure, valid and invalid, yes and no.",
      "To ensure a variable is always assigned a value regardless of the condition.",
      "To make code more readable by explicitly showing both branches of logic.",
      "To avoid multiple independent if statements that would both be checked unnecessarily.",
      "To implement binary decisions like pass/fail, even/odd, adult/minor.",
    ],
    realLifeExamples: [
      "If the traffic light is green, go; else stop.",
      "If you have enough money, buy the item; else save up.",
      "If today is a holiday, relax; else go to school.",
      "If it is raining, carry an umbrella; else wear sunglasses.",
      "If the password matches, grant access; else show error message.",
      "If the food is hot, blow on it; else eat it directly.",
      "If the alarm rings, wake up; else continue sleeping.",
      "If the phone battery is low, charge it; else use it normally.",
    ],
    commonMistakes: [
      "Putting a semicolon after `if(condition)` makes the else 'dangling' — it won't match the if.",
      "Forgetting that else cannot have a condition — `else (x > 5)` is invalid syntax.",
      "Using `else if` incorrectly — it must be written as `else if` (two words), not `elseif`.",
      "Using `=` (assignment) instead of `==` (comparison) in the condition.",
      "Forgetting curly braces when multiple statements belong to if or else.",
      "Using `==` to compare Strings instead of `.equals()`.",
      "Assuming else matches the outer if in nested structures without braces.",
      "Not covering all cases in an else-if ladder (missing final else).",
    ],
    whereUsed: [
      "Validating login: if password matches, allow access; else show error.",
      "Grading: if marks >= 40, print Pass; else print Fail.",
      "E-commerce: if amount > 10000, apply 20% discount; else apply 10% discount.",
      "Banking: if balance >= withdrawal amount, process; else show insufficient funds.",
      "Games: if player hits target, increase score; else decrease lives.",
      "Form validation: if all fields valid, submit; else show errors.",
      "Temperature control: if temp > 30, turn on AC; else turn on heater.",
    ],
  },

  // ==========================
  // SECTION 2: THEORY NOTES
  // ==========================
  theoryNotes: {
    decisionMaking:
      "Decision making is the process of choosing which code path to execute based on conditions. In Java, decision-making constructs include `if`, `if-else`, `else-if` ladder, nested `if-else`, `switch`, and the ternary operator. These constructs evaluate boolean expressions to determine the flow of execution. Decision making is fundamental to programming because real-world applications constantly need to make choices: validate input, handle errors, process different data, and respond to user actions.",
    booleanExpressions:
      "A boolean expression is any expression that evaluates to either `true` or `false`. In Java, boolean expressions are formed using relational operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) and logical operators (`&&`, `||`, `!`). The condition inside `if(...)` must always be a boolean expression. Unlike C/C++, Java does not treat non-zero integers as `true` — the expression must explicitly produce a boolean value. Examples: `x > 5`, `a == b`, `(score >= 40 && score < 50)`, `!flag`.",
    conditions:
      "A condition is a boolean expression placed inside the parentheses of an `if` statement. It determines which code block executes. Conditions can be simple (single comparison) or compound (multiple comparisons combined with logical operators). The condition is evaluated once at the point of execution. If the condition involves method calls, those methods are called during evaluation. Side effects in conditions (like `++x > 5`) can lead to subtle bugs and should be avoided in production code.",
    flowOfExecution: [
      "The `if` keyword is encountered and the condition in parentheses is evaluated.",
      "If the condition evaluates to `true`, the if-block (code inside `{}` after if) executes.",
      "If the condition evaluates to `false`, the if-block is skipped entirely.",
      "If an `else` clause exists, its block executes when the condition is `false`.",
      "After either block finishes, execution continues with the next statement after the if-else construct.",
      "In an else-if ladder, conditions are evaluated top-to-bottom. The first true condition's block executes, and the rest are skipped.",
      "In nested if-else, the inner if-else is evaluated only if the outer condition allows entry into its block.",
      "Exactly ONE block executes in any if-else construct — never zero (if else exists) and never more than one.",
    ],
    relationalOperators: [
      { operator: "==", name: "Equal to", example: "a == b", description: "Returns true if a is equal to b" },
      { operator: "!=", name: "Not equal to", example: "a != b", description: "Returns true if a is not equal to b" },
      { operator: "<", name: "Less than", example: "a < b", description: "Returns true if a is less than b" },
      { operator: ">", name: "Greater than", example: "a > b", description: "Returns true if a is greater than b" },
      { operator: "<=", name: "Less than or equal to", example: "a <= b", description: "Returns true if a is less than or equal to b" },
      { operator: ">=", name: "Greater than or equal to", example: "a >= b", description: "Returns true if a is greater than or equal to b" },
    ],
    logicalOperators: [
      { operator: "&&", name: "Logical AND", example: "a > 5 && a < 10", description: "Returns true if BOTH conditions are true. Short-circuits: if first is false, second is not evaluated." },
      { operator: "||", name: "Logical OR", example: "a < 0 || a > 100", description: "Returns true if AT LEAST ONE condition is true. Short-circuits: if first is true, second is not evaluated." },
      { operator: "!", name: "Logical NOT", example: "!(a == b)", description: "Reverses the boolean value. True becomes false, false becomes true." },
    ],
    importantPoints: [
      "If and else are reserved keywords in Java.",
      "The else block is optional — if can exist without else.",
      "Only ONE block (either if or else) executes, never both.",
      "The else block cannot have a condition — `else if` is a separate construct.",
      "Curly braces are optional for single statements but recommended for clarity and safety.",
      "Nested if-else statements are common for multi-way decisions.",
      "The condition must be a boolean expression — int values are NOT implicitly boolean in Java.",
      "Short-circuit evaluation means `&&` and `||` may not evaluate the second operand.",
      "An else always matches the nearest unmatched if (dangling else rule).",
      "The ternary operator `? :` is a concise alternative for simple if-else assignments.",
    ],
    memoryTricks: [
      "IF-ELSE = 'One or the other' — like a coin flip, only one side lands.",
      "Think of if-else as a gate with two paths: left (true) and right (false).",
      "Remember: 'Else' means 'otherwise' — what happens when the if fails.",
      "Dangling else: 'Else clings to the nearest if like a magnet.'",
      "Ternary: 'Question mark asks, colon separates the two answers.'",
      "Short-circuit: 'AND stops at first false, OR stops at first true.'",
    ],
    examTips: [
      "The 'dangling else' always matches the nearest if — use braces to override.",
      "In nested if-else, proper indentation is crucial for readability (and marks!).",
      "Ternary operator `? :` is a shorthand for simple if-else — ICSE loves asking about it.",
      "Always trace else bindings carefully in nested structures.",
      "When tracing output, write down variable values at each step.",
      "For error finding, check: semicolons, braces, assignment vs comparison, else conditions.",
      "In programming questions, always handle edge cases (zero, negative, boundary values).",
      "Use `else if` for mutually exclusive conditions, not multiple `if` statements.",
    ],
  },

  // ==========================
  // SECTION 3: SYNTAX
  // ==========================
  syntax: {
    basicIfElse: {
      code: `if (condition) {
    // code when condition is true
} else {
    // code when condition is false
}`,
      breakdown: [
        { keyword: "if", explanation: "Java keyword that starts the conditional statement. Must be followed by parentheses containing a boolean expression." },
        { keyword: "condition", explanation: "A boolean expression enclosed in parentheses (). This is evaluated to true or false. Examples: x > 5, a == b, flag, (score >= 40 && score < 50)." },
        { keyword: "{ } (if-block)", explanation: "Curly braces define the block of code that executes when the condition is true. Can contain one or more statements." },
        { keyword: "else", explanation: "Java keyword for the alternate path. Executes when the condition is false. Cannot have its own condition in parentheses. Must immediately follow the if-block (no statements in between)." },
        { keyword: "{ } (else-block)", explanation: "Curly braces define the block of code that executes when the condition is false." },
      ],
    },
    elseIfLadder: {
      code: `if (condition1) {
    // runs when condition1 is true
} else if (condition2) {
    // runs when condition1 is false AND condition2 is true
} else if (condition3) {
    // runs when condition1, condition2 are false AND condition3 is true
} else {
    // runs when ALL conditions are false (optional)
}`,
      breakdown: [
        { keyword: "else if", explanation: "Two separate keywords that chain additional conditions. If the preceding if/else-if condition is false, this new condition is checked. There can be any number of else-if blocks." },
        { keyword: "else (final)", explanation: "The optional final else that runs when none of the preceding conditions are true. Acts as the default case." },
      ],
    },
    nestedIfElse: {
      code: `if (outerCondition) {
    if (innerCondition) {
        // runs when both outer and inner are true
    } else {
        // runs when outer is true but inner is false
    }
} else {
    if (anotherCondition) {
        // runs when outer is false and anotherCondition is true
    } else {
        // runs when both outer and anotherCondition are false
    }
}`,
      breakdown: [
        { keyword: "Nesting", explanation: "Placing one if-else inside another if-else's block. Allows hierarchical decision-making. Can be nested to any depth." },
        { keyword: "Dangling else", explanation: "In nested ifs without braces, an else matches the NEAREST unmatched if. Always use braces to make the binding explicit." },
      ],
    },
    ternaryOperator: {
      code: `variable = (condition) ? valueIfTrue : valueIfFalse;`,
      breakdown: [
        { keyword: "condition", explanation: "Boolean expression to evaluate." },
        { keyword: "?", explanation: "Separator between condition and the two possible values." },
        { keyword: "valueIfTrue", explanation: "The value assigned if condition is true." },
        { keyword: ":", explanation: "Separator between the true value and false value." },
        { keyword: "valueIfFalse", explanation: "The value assigned if condition is false." },
      ],
    },
  },

  // ==========================
  // SECTION 4: EXAMPLES
  // ==========================
  examples: {
    basic: [
      {
        id: "ex-b-1",
        title: "Even or Odd Check",
        code: `int num = 7;
if (num % 2 == 0) {
    System.out.println(num + " is even.");
} else {
    System.out.println(num + " is odd.");
}`,
        output: "7 is odd.",
        explanation: [
          "Step 1: Variable num is declared and initialized to 7.",
          "Step 2: Condition `num % 2 == 0` is evaluated. 7 % 2 = 1. 1 == 0 is false.",
          "Step 3: Since condition is false, the if-block is skipped entirely.",
          "Step 4: The else-block executes, printing '7 is odd.'",
          "Key point: The modulus operator % gives the remainder. If remainder is 0, the number is even.",
        ],
      },
      {
        id: "ex-b-2",
        title: "Pass or Fail",
        code: `int marks = 35;
if (marks >= 40) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}`,
        output: "Fail",
        explanation: [
          "Step 1: marks = 35.",
          "Step 2: Condition: 35 >= 40 → false.",
          "Step 3: If-block skipped. Else-block executes.",
          "Step 4: Prints 'Fail'.",
          "Key point: The >= operator checks if marks is greater than OR equal to 40.",
        ],
      },
      {
        id: "ex-b-3",
        title: "Positive or Negative Number",
        code: `int num = -10;
if (num >= 0) {
    System.out.println(num + " is non-negative.");
} else {
    System.out.println(num + " is negative.");
}`,
        output: "-10 is negative.",
        explanation: [
          "Step 1: num = -10.",
          "Step 2: Condition: -10 >= 0 → false.",
          "Step 3: Else-block executes.",
          "Step 4: Prints '-10 is negative.'",
          "Key point: Zero is considered non-negative (0 >= 0 is true).",
        ],
      },
      {
        id: "ex-b-4",
        title: "Voting Eligibility",
        code: `int age = 16;
if (age >= 18) {
    System.out.println("You are eligible to vote.");
} else {
    System.out.println("You are not eligible to vote.");
    System.out.println("Wait " + (18 - age) + " more years.");
}`,
        output: "You are not eligible to vote.\nWait 2 more years.",
        explanation: [
          "Step 1: age = 16.",
          "Step 2: Condition: 16 >= 18 → false.",
          "Step 3: Else-block executes with TWO statements (braces required).",
          "Step 4: Prints both lines. The calculation (18 - 16) = 2.",
          "Key point: Multiple statements in else require curly braces.",
        ],
      },
      {
        id: "ex-b-5",
        title: "Maximum of Two Numbers",
        code: `int a = 25, b = 40;
if (a > b) {
    System.out.println("Maximum: " + a);
} else {
    System.out.println("Maximum: " + b);
}`,
        output: "Maximum: 40",
        explanation: [
          "Step 1: a = 25, b = 40.",
          "Step 2: Condition: 25 > 40 → false.",
          "Step 3: Else-block executes, printing 'Maximum: 40'.",
          "Key point: This finds the larger of two numbers. If a == b, else runs (prints b).",
        ],
      },
      {
        id: "ex-b-6",
        title: "Leap Year Check (Simplified)",
        code: `int year = 2024;
if (year % 4 == 0) {
    System.out.println(year + " is a leap year.");
} else {
    System.out.println(year + " is not a leap year.");
}`,
        output: "2024 is a leap year.",
        explanation: [
          "Step 1: year = 2024.",
          "Step 2: Condition: 2024 % 4 == 0 → 0 == 0 → true.",
          "Step 3: If-block executes, printing '2024 is a leap year.'",
          "Key point: This is a simplified check. Full leap year logic requires century year handling.",
        ],
      },
      {
        id: "ex-b-7",
        title: "Character Type Check",
        code: `char ch = '9';
if (ch >= '0' && ch <= '9') {
    System.out.println(ch + " is a digit.");
} else {
    System.out.println(ch + " is not a digit.");
}`,
        output: "9 is a digit.",
        explanation: [
          "Step 1: ch = '9'.",
          "Step 2: Condition: '9' >= '0' (true) AND '9' <= '9' (true) → true && true → true.",
          "Step 3: If-block executes, printing '9 is a digit.'",
          "Key point: Characters are compared using their ASCII/Unicode values. Digits '0' to '9' have consecutive values.",
        ],
      },
      {
        id: "ex-b-8",
        title: "Discount Eligibility",
        code: `double purchase = 1500.0;
if (purchase >= 1000) {
    System.out.println("You get a 10% discount!");
} else {
    System.out.println("No discount. Spend Rs " + (1000 - purchase) + " more.");
}`,
        output: "You get a 10% discount!",
        explanation: [
          "Step 1: purchase = 1500.0.",
          "Step 2: Condition: 1500 >= 1000 → true.",
          "Step 3: If-block executes, printing discount message.",
          "Key point: Real-world applications use if-else for business logic like discounts.",
        ],
      },
      {
        id: "ex-b-9",
        title: "Temperature Advisory",
        code: `int temp = 35;
if (temp > 30) {
    System.out.println("It's hot outside. Stay hydrated!");
} else {
    System.out.println("The weather is pleasant.");
}`,
        output: "It's hot outside. Stay hydrated!",
        explanation: [
          "Step 1: temp = 35.",
          "Step 2: Condition: 35 > 30 → true.",
          "Step 3: If-block executes with advisory message.",
          "Key point: if-else can provide user-friendly messages based on conditions.",
        ],
      },
      {
        id: "ex-b-10",
        title: "Ternary Operator Equivalent",
        code: `int a = 10, b = 20;
int max = (a > b) ? a : b;
System.out.println("Maximum: " + max);`,
        output: "Maximum: 20",
        explanation: [
          "Step 1: a = 10, b = 20.",
          "Step 2: Ternary operator evaluates: (10 > 20) → false.",
          "Step 3: Since false, returns b (20). max = 20.",
          "Step 4: Prints 'Maximum: 20'.",
          "Key point: Ternary operator is a concise one-line if-else for assignments.",
        ],
      },
    ],

    intermediate: [
      {
        id: "ex-i-1",
        title: "Nested if-else for Grades",
        code: `int marks = 85;
if (marks >= 90) {
    System.out.println("Grade: A");
} else if (marks >= 80) {
    System.out.println("Grade: B");
} else if (marks >= 70) {
    System.out.println("Grade: C");
} else if (marks >= 60) {
    System.out.println("Grade: D");
} else {
    System.out.println("Grade: F");
}`,
        output: "Grade: B",
        explanation: [
          "Step 1: marks = 85.",
          "Step 2: 85 >= 90 → false. Moves to next else-if.",
          "Step 3: 85 >= 80 → true. Prints 'Grade: B'.",
          "Step 4: Remaining else-if and else are skipped (short-circuit).",
          "Key point: Order matters! Conditions are checked top-to-bottom. First match wins.",
        ],
      },
      {
        id: "ex-i-2",
        title: "Leap Year Check (Full Logic)",
        code: `int year = 1900;
if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
    System.out.println(year + " is a leap year.");
} else {
    System.out.println(year + " is not a leap year.");
}`,
        output: "1900 is not a leap year.",
        explanation: [
          "Step 1: year = 1900.",
          "Step 2: Check year % 400 == 0 → 1900 % 400 = 300 → false.",
          "Step 3: Check year % 4 == 0 → 1900 % 4 = 0 → true.",
          "Step 4: Check year % 100 != 0 → 1900 % 100 = 0 → false.",
          "Step 5: (true && false) = false. Overall: false || false = false.",
          "Step 6: Else executes: '1900 is not a leap year.'",
          "Key point: Century years must be divisible by 400 to be leap years.",
        ],
      },
      {
        id: "ex-i-3",
        title: "Largest of Three Numbers",
        code: `int a = 45, b = 23, c = 67;
if (a > b && a > c) {
    System.out.println(a + " is the largest.");
} else if (b > c) {
    System.out.println(b + " is the largest.");
} else {
    System.out.println(c + " is the largest.");
}`,
        output: "67 is the largest.",
        explanation: [
          "Step 1: a = 45, b = 23, c = 67.",
          "Step 2: 45 > 23 (true) && 45 > 67 (false) → false.",
          "Step 3: 23 > 67 → false.",
          "Step 4: Else executes: '67 is the largest.'",
          "Key point: This approach uses short-circuit evaluation efficiently.",
        ],
      },
      {
        id: "ex-i-4",
        title: "Number Classification (Positive/Negative/Zero)",
        code: `int num = 0;
if (num > 0) {
    System.out.println("Positive");
} else if (num < 0) {
    System.out.println("Negative");
} else {
    System.out.println("Zero");
}`,
        output: "Zero",
        explanation: [
          "Step 1: num = 0.",
          "Step 2: 0 > 0 → false.",
          "Step 3: 0 < 0 → false.",
          "Step 4: Else executes: 'Zero'.",
          "Key point: This covers all three cases with an else-if ladder.",
        ],
      },
      {
        id: "ex-i-5",
        title: "Divisible by Both 3 and 5",
        code: `int num = 15;
if (num % 3 == 0 && num % 5 == 0) {
    System.out.println(num + " is divisible by both 3 and 5.");
} else if (num % 3 == 0) {
    System.out.println(num + " is divisible by 3 only.");
} else if (num % 5 == 0) {
    System.out.println(num + " is divisible by 5 only.");
} else {
    System.out.println(num + " is divisible by neither.");
}`,
        output: "15 is divisible by both 3 and 5.",
        explanation: [
          "Step 1: num = 15.",
          "Step 2: 15 % 3 == 0 (true) && 15 % 5 == 0 (true) → true.",
          "Step 3: First if executes. Rest skipped.",
          "Key point: The most specific condition must come first in the ladder.",
        ],
      },
      {
        id: "ex-i-6",
        title: "Character Case Converter Logic",
        code: `char ch = 'm';
if (ch >= 'A' && ch <= 'Z') {
    System.out.println(ch + " is uppercase.");
} else if (ch >= 'a' && ch <= 'z') {
    System.out.println(ch + " is lowercase.");
} else {
    System.out.println(ch + " is not a letter.");
}`,
        output: "m is lowercase.",
        explanation: [
          "Step 1: ch = 'm'.",
          "Step 2: 'm' >= 'A' && 'm' <= 'Z' → false (uppercase range).",
          "Step 3: 'm' >= 'a' && 'm' <= 'z' → true.",
          "Step 4: Prints 'm is lowercase.'",
          "Key point: Character ranges are based on ASCII values.",
        ],
      },
      {
        id: "ex-i-7",
        title: "Simple Calculator Using if-else",
        code: `int a = 20, b = 4;
char op = '/';
double result;
if (op == '+') {
    result = a + b;
} else if (op == '-') {
    result = a - b;
} else if (op == '*') {
    result = a * b;
} else if (op == '/') {
    if (b != 0) {
        result = (double) a / b;
    } else {
        System.out.println("Error: Division by zero");
        return;
    }
} else {
    System.out.println("Invalid operator");
    return;
}
System.out.println(a + " " + op + " " + b + " = " + result);`,
        output: "20 / 4 = 5.0",
        explanation: [
          "Step 1: a = 20, b = 4, op = '/'.",
          "Step 2: op == '+' → false. op == '-' → false. op == '*' → false.",
          "Step 3: op == '/' → true. Enter this block.",
          "Step 4: Inner if: b != 0 → true. result = 20.0 / 4 = 5.0.",
          "Step 5: Prints '20 / 4 = 5.0'.",
          "Key point: Nested if-else handles division by zero check inside the '/' case.",
        ],
      },
      {
        id: "ex-i-8",
        title: "Discount Calculator with Slabs",
        code: `double amount = 7500.0;
double discount;
if (amount > 10000) {
    discount = amount * 0.20;
} else if (amount > 5000) {
    discount = amount * 0.10;
} else if (amount > 1000) {
    discount = amount * 0.05;
} else {
    discount = 0;
}
System.out.println("Amount: Rs " + amount);
System.out.println("Discount: Rs " + discount);
System.out.println("Payable: Rs " + (amount - discount));`,
        output: "Amount: Rs 7500.0\nDiscount: Rs 750.0\nPayable: Rs 6750.0",
        explanation: [
          "Step 1: amount = 7500.0.",
          "Step 2: 7500 > 10000 → false.",
          "Step 3: 7500 > 5000 → true. discount = 7500 * 0.10 = 750.0.",
          "Step 4: Remaining conditions skipped.",
          "Key point: Order matters — check higher thresholds first.",
        ],
      },
      {
        id: "ex-i-9",
        title: "Nested if-else for Triangle Validity",
        code: `int a = 5, b = 5, c = 12;
if (a + b > c && b + c > a && a + c > b) {
    System.out.println("Valid triangle");
} else {
    System.out.println("Invalid triangle");
}`,
        output: "Invalid triangle",
        explanation: [
          "Step 1: a = 5, b = 5, c = 12.",
          "Step 2: 5 + 5 > 12 → 10 > 12 → false.",
          "Step 3: Short-circuit: remaining conditions not evaluated.",
          "Step 4: Else executes: 'Invalid triangle'.",
          "Key point: Triangle inequality theorem: sum of any two sides must exceed the third.",
        ],
      },
      {
        id: "ex-i-10",
        title: "Nested Ternary for Min of Three",
        code: `int a = 15, b = 8, c = 22;
int min = (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
System.out.println("Minimum: " + min);`,
        output: "Minimum: 8",
        explanation: [
          "Step 1: a = 15, b = 8, c = 22.",
          "Step 2: Outer ternary: 15 < 8 → false. Returns second branch.",
          "Step 3: Second branch: (8 < 22) → true. Returns b = 8.",
          "Step 4: min = 8. Prints 'Minimum: 8'.",
          "Key point: Nested ternaries are concise but can be hard to read.",
        ],
      },
    ],

    advanced: [
      {
        id: "ex-a-1",
        title: "Triangle Type Classifier",
        code: `int a = 5, b = 5, c = 8;
if (a + b > c && b + c > a && a + c > b) {
    if (a == b && b == c) {
        System.out.println("Equilateral Triangle");
    } else if (a == b || b == c || a == c) {
        System.out.println("Isosceles Triangle");
    } else {
        System.out.println("Scalene Triangle");
    }
} else {
    System.out.println("Invalid triangle");
}`,
        output: "Isosceles Triangle",
        explanation: [
          "Step 1: a = 5, b = 5, c = 8.",
          "Step 2: Outer condition: 5+5>8 (true), 5+8>5 (true), 5+8>5 (true) → all true.",
          "Step 3: Enter outer if-block. Inner check: a==b && b==c → 5==5 && 5==8 → false.",
          "Step 4: Inner else-if: a==b → true. Prints 'Isosceles Triangle'.",
          "Key point: Nested if-else handles hierarchical classification.",
        ],
      },
      {
        id: "ex-a-2",
        title: "Date Validator with Leap Year",
        code: `int day = 29, month = 2, year = 2024;
boolean valid = true;
if (month < 1 || month > 12) {
    valid = false;
} else if (day < 1 || day > 31) {
    valid = false;
} else if (month == 2) {
    boolean leap = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    if (leap && day > 29) {
        valid = false;
    } else if (!leap && day > 28) {
        valid = false;
    }
} else if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
    valid = false;
}
if (valid) {
    System.out.println(day + "/" + month + "/" + year + " is valid.");
} else {
    System.out.println(day + "/" + month + "/" + year + " is invalid.");
}`,
        output: "29/2/2024 is valid.",
        explanation: [
          "Step 1: day = 29, month = 2, year = 2024.",
          "Step 2: month 1-12? Yes. day 1-31? Yes.",
          "Step 3: month == 2 → true. Check leap: 2024 % 4 == 0 && 2024 % 100 != 0 → true.",
          "Step 4: leap && day > 29 → true && false → false. !leap && day > 28 → false.",
          "Step 5: valid remains true. Prints valid date.",
          "Key point: Complex validation requires multiple nested conditions.",
        ],
      },
      {
        id: "ex-a-3",
        title: "Electricity Bill Calculator",
        code: `int units = 250;
double bill;
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
System.out.println("Units: " + units);
System.out.println("Bill: Rs " + bill);
System.out.println("Surcharge: Rs " + surcharge);
System.out.println("Total: Rs " + (bill + surcharge));`,
        output: "Units: 250\nBill: Rs 1300.0\nSurcharge: Rs 195.0\nTotal: Rs 1495.0",
        explanation: [
          "Step 1: units = 250.",
          "Step 2: 250 <= 100 → false. 250 <= 300 → true.",
          "Step 3: bill = 100*4 + (250-100)*6 = 400 + 900 = 1300.",
          "Step 4: surcharge = (1300 > 1000) ? 1300*0.15 : 0 = 195.",
          "Step 5: Total = 1300 + 195 = 1495.",
          "Key point: Slab-based billing uses cumulative calculation.",
        ],
      },
      {
        id: "ex-a-4",
        title: "Income Tax Calculator",
        code: `double income = 850000.0;
double tax = 0;
if (income <= 250000) {
    tax = 0;
} else if (income <= 500000) {
    tax = (income - 250000) * 0.05;
} else if (income <= 1000000) {
    tax = 250000 * 0.05 + (income - 500000) * 0.20;
} else {
    tax = 250000 * 0.05 + 500000 * 0.20 + (income - 1000000) * 0.30;
}
System.out.println("Income: Rs " + income);
System.out.println("Tax: Rs " + tax);
System.out.println("Net Income: Rs " + (income - tax));`,
        output: "Income: Rs 850000.0\nTax: Rs 82500.0\nNet Income: Rs 767500.0",
        explanation: [
          "Step 1: income = 850000.",
          "Step 2: 850000 <= 250000 → false. 850000 <= 500000 → false.",
          "Step 3: 850000 <= 1000000 → true.",
          "Step 4: tax = 250000*0.05 + (850000-500000)*0.20 = 12500 + 70000 = 82500.",
          "Key point: Tax is calculated on each slab separately (marginal tax rate system).",
        ],
      },
      {
        id: "ex-a-5",
        title: "BMI Calculator with Categories",
        code: `double weight = 70.0;
double height = 1.75;
double bmi = weight / (height * height);
String category;
if (bmi < 18.5) {
    category = "Underweight";
} else if (bmi < 25.0) {
    category = "Normal";
} else if (bmi < 30.0) {
    category = "Overweight";
} else {
    category = "Obese";
}
System.out.println("BMI: " + String.format("%.1f", bmi));
System.out.println("Category: " + category);`,
        output: "BMI: 22.9\nCategory: Normal",
        explanation: [
          "Step 1: weight = 70, height = 1.75.",
          "Step 2: bmi = 70 / (1.75 * 1.75) = 70 / 3.0625 = 22.857...",
          "Step 3: 22.857 < 18.5 → false. 22.857 < 25.0 → true.",
          "Step 4: category = 'Normal'.",
          "Key point: Order of conditions matters — check from lowest to highest.",
        ],
      },
      {
        id: "ex-a-6",
        title: "Rock-Paper-Scissors Logic",
        code: `String p1 = "rock";
String p2 = "scissors";
if (p1.equals(p2)) {
    System.out.println("Draw");
} else if (p1.equals("rock") && p2.equals("scissors")) {
    System.out.println("Player 1 wins! Rock crushes scissors.");
} else if (p1.equals("rock") && p2.equals("paper")) {
    System.out.println("Player 2 wins! Paper covers rock.");
} else if (p1.equals("paper") && p2.equals("rock")) {
    System.out.println("Player 1 wins! Paper covers rock.");
} else if (p1.equals("paper") && p2.equals("scissors")) {
    System.out.println("Player 2 wins! Scissors cut paper.");
} else if (p1.equals("scissors") && p2.equals("paper")) {
    System.out.println("Player 1 wins! Scissors cut paper.");
} else if (p1.equals("scissors") && p2.equals("rock")) {
    System.out.println("Player 2 wins! Rock crushes scissors.");
} else {
    System.out.println("Invalid input.");
}`,
        output: "Player 1 wins! Rock crushes scissors.",
        explanation: [
          "Step 1: p1 = 'rock', p2 = 'scissors'.",
          "Step 2: p1.equals(p2) → false.",
          "Step 3: p1.equals('rock') && p2.equals('scissors') → true.",
          "Step 4: Prints 'Player 1 wins! Rock crushes scissors.'",
          "Key point: String comparison must use .equals(), not ==.",
        ],
      },
      {
        id: "ex-a-7",
        title: "ATM Withdrawal Logic",
        code: `double balance = 5000.0;
double withdrawal = 4500.0;
if (withdrawal <= 0) {
    System.out.println("Invalid amount.");
} else if (withdrawal > balance) {
    System.out.println("Insufficient balance.");
} else if (withdrawal % 100 != 0) {
    System.out.println("Amount must be multiples of 100.");
} else if (withdrawal > 10000) {
    System.out.println("Daily limit exceeded.");
} else {
    balance -= withdrawal;
    System.out.println("Withdrawal successful.");
    System.out.println("Remaining balance: Rs " + balance);
}`,
        output: "Withdrawal successful.\nRemaining balance: Rs 500.0",
        explanation: [
          "Step 1: balance = 5000, withdrawal = 4500.",
          "Step 2: 4500 <= 0 → false. 4500 > 5000 → false.",
          "Step 3: 4500 % 100 != 0 → 0 != 0 → false.",
          "Step 4: 4500 > 10000 → false.",
          "Step 5: Else executes: balance = 5000 - 4500 = 500.",
          "Key point: Multiple validation checks in sequence using else-if.",
        ],
      },
      {
        id: "ex-a-8",
        title: "Quadratic Equation Root Type",
        code: `int a = 1, b = -5, c = 6;
int discriminant = b * b - 4 * a * c;
if (discriminant > 0) {
    double r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    double r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    System.out.println("Real and distinct roots: " + r1 + ", " + r2);
} else if (discriminant == 0) {
    double r = -b / (2.0 * a);
    System.out.println("Real and equal roots: " + r);
} else {
    System.out.println("Imaginary roots (no real solution).");
}`,
        output: "Real and distinct roots: 3.0, 2.0",
        explanation: [
          "Step 1: a = 1, b = -5, c = 6.",
          "Step 2: discriminant = (-5)^2 - 4*1*6 = 25 - 24 = 1.",
          "Step 3: 1 > 0 → true. Real and distinct roots.",
          "Step 4: r1 = (5 + 1) / 2 = 3. r2 = (5 - 1) / 2 = 2.",
          "Key point: Mathematical classification using discriminant.",
        ],
      },
      {
        id: "ex-a-9",
        title: "Employee Bonus Calculation",
        code: `int years = 7;
double salary = 50000.0;
double bonus;
if (years > 10) {
    bonus = salary * 0.30;
} else if (years > 5) {
    bonus = salary * 0.20;
} else if (years > 2) {
    bonus = salary * 0.10;
} else {
    bonus = salary * 0.05;
}
double total = salary + bonus;
System.out.println("Years of service: " + years);
System.out.println("Salary: Rs " + salary);
System.out.println("Bonus: Rs " + bonus);
System.out.println("Total: Rs " + total);`,
        output: "Years of service: 7\nSalary: Rs 50000.0\nBonus: Rs 10000.0\nTotal: Rs 60000.0",
        explanation: [
          "Step 1: years = 7, salary = 50000.",
          "Step 2: 7 > 10 → false. 7 > 5 → true.",
          "Step 3: bonus = 50000 * 0.20 = 10000.",
          "Key point: Business rules with multiple thresholds.",
        ],
      },
      {
        id: "ex-a-10",
        title: "Complex Nested Ternary for Grade",
        code: `int marks = 82;
String grade = (marks >= 90) ? "A+" :
               (marks >= 80) ? "A"  :
               (marks >= 70) ? "B"  :
               (marks >= 60) ? "C"  :
               (marks >= 50) ? "D"  : "F";
System.out.println("Marks: " + marks);
System.out.println("Grade: " + grade);`,
        output: "Marks: 82\nGrade: A",
        explanation: [
          "Step 1: marks = 82.",
          "Step 2: 82 >= 90 → false. Check next: 82 >= 80 → true.",
          "Step 3: grade = 'A'.",
          "Key point: Chained ternary operators create a compact else-if ladder.",
        ],
      },
    ],
  },

  // ==========================
  // SECTION 5: DRY RUN (15 examples)
  // ==========================
  dryRun: [
    {
      id: "dr-1",
      title: "Basic if-else execution trace",
      code: `int age = 16;
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`,
      trace: [
        { line: 1, explanation: "age = 16. Variable initialized." },
        { line: 2, explanation: "Check condition: age >= 18 → 16 >= 18 → false." },
        { line: 3, explanation: "If-block skipped (condition is false)." },
        { line: 5, explanation: "Else block selected for execution." },
        { line: 6, explanation: "Print 'Minor' to console. Execution continues after if-else." },
      ],
    },
    {
      id: "dr-2",
      title: "Else-if ladder trace",
      code: `int score = 75;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 75) {
    System.out.println("B");
} else {
    System.out.println("C");
}`,
      trace: [
        { line: 1, explanation: "score = 75." },
        { line: 2, explanation: "Check: 75 >= 90 → false. Skip this block." },
        { line: 4, explanation: "Check next else-if: 75 >= 75 → true." },
        { line: 5, explanation: "Print 'B' to console." },
        { line: 6, explanation: "Remaining else-if and else are skipped (short-circuit behavior)." },
      ],
    },
    {
      id: "dr-3",
      title: "Nested if-else trace",
      code: `int x = 10;
if (x > 0) {
    if (x > 5) {
        System.out.println(">5");
    } else {
        System.out.println("0-5");
    }
} else {
    System.out.println("<=0");
}`,
      trace: [
        { line: 1, explanation: "x = 10." },
        { line: 2, explanation: "Outer condition: 10 > 0 → true. Enter outer if-block." },
        { line: 3, explanation: "Inner condition: 10 > 5 → true. Enter inner if-block." },
        { line: 4, explanation: "Print '>5' to console." },
        { line: 5, explanation: "Inner else skipped (inner condition was true)." },
        { line: 9, explanation: "Outer else skipped (outer condition was true)." },
      ],
    },
    {
      id: "dr-4",
      title: "Pre-increment in condition",
      code: `int x = 7;
if (++x > 8) {
    System.out.println("A");
} else {
    System.out.println("B");
}
System.out.println(x);`,
      trace: [
        { line: 1, explanation: "x = 7." },
        { line: 2, explanation: "++x: x becomes 8. Compare: 8 > 8 → false." },
        { line: 5, explanation: "Else block executes." },
        { line: 6, explanation: "Print 'B'." },
        { line: 7, explanation: "Print x: 8." },
      ],
    },
    {
      id: "dr-5",
      title: "Post-increment in condition",
      code: `int x = 7;
if (x++ > 8) {
    System.out.println("A");
} else {
    System.out.println("B");
}
System.out.println(x);`,
      trace: [
        { line: 1, explanation: "x = 7." },
        { line: 2, explanation: "x++: compare 7 > 8 → false, THEN x becomes 8." },
        { line: 5, explanation: "Else block executes." },
        { line: 6, explanation: "Print 'B'." },
        { line: 7, explanation: "Print x: 8 (post-increment already completed)." },
      ],
    },
    {
      id: "dr-6",
      title: "Dangling else binding",
      code: `int x = 5;
if (x > 0)
    if (x > 10)
        System.out.println(">10");
    else
        System.out.println("0-10");
else
    System.out.println("<=0");`,
      trace: [
        { line: 1, explanation: "x = 5." },
        { line: 2, explanation: "Outer if: 5 > 0 → true." },
        { line: 3, explanation: "Inner if: 5 > 10 → false." },
        { line: 5, explanation: "Inner else executes (matches inner if). Prints '0-10'." },
        { line: 7, explanation: "Outer else is NOT executed (outer if was true)." },
      ],
    },
    {
      id: "dr-7",
      title: "Logical AND short-circuit",
      code: `int a = 5, b = 0;
if (a > 10 && b++ > 0) {
    System.out.println("Both true");
} else {
    System.out.println("Condition false");
}
System.out.println("b = " + b);`,
      trace: [
        { line: 1, explanation: "a = 5, b = 0." },
        { line: 2, explanation: "a > 10 → false. Short-circuit: b++ is NOT evaluated." },
        { line: 5, explanation: "Else executes: 'Condition false'." },
        { line: 6, explanation: "b remains 0 (b++ was never executed)." },
      ],
    },
    {
      id: "dr-8",
      title: "Logical OR short-circuit",
      code: `int a = 15, b = 0;
if (a > 10 || b++ > 0) {
    System.out.println("Condition true");
} else {
    System.out.println("Both false");
}
System.out.println("b = " + b);`,
      trace: [
        { line: 1, explanation: "a = 15, b = 0." },
        { line: 2, explanation: "a > 10 → true. Short-circuit: b++ is NOT evaluated." },
        { line: 3, explanation: "If executes: 'Condition true'." },
        { line: 6, explanation: "b remains 0 (b++ was never executed)." },
      ],
    },
    {
      id: "dr-9",
      title: "Ternary operator trace",
      code: `int a = 10, b = 20;
int max = (a > b) ? a : b;
System.out.println("Max: " + max);`,
      trace: [
        { line: 1, explanation: "a = 10, b = 20." },
        { line: 2, explanation: "Ternary: (10 > 20) → false. Returns b (20). max = 20." },
        { line: 3, explanation: "Print 'Max: 20'." },
      ],
    },
    {
      id: "dr-10",
      title: "Multiple conditions with &&",
      code: `int year = 1900;
if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
    System.out.println("Leap");
} else {
    System.out.println("Not Leap");
}`,
      trace: [
        { line: 1, explanation: "year = 1900." },
        { line: 2, explanation: "1900 % 400 = 300. 300 == 0 → false." },
        { line: 2, explanation: "1900 % 4 = 0 → true. 1900 % 100 = 0 → false. (true && false) = false." },
        { line: 2, explanation: "Overall: false || false = false." },
        { line: 4, explanation: "Else executes: 'Not Leap'." },
      ],
    },
    {
      id: "dr-11",
      title: "Nested ternary for min of three",
      code: `int a = 15, b = 8, c = 22;
int min = (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
System.out.println("Min: " + min);`,
      trace: [
        { line: 1, explanation: "a = 15, b = 8, c = 22." },
        { line: 2, explanation: "Outer: 15 < 8 → false. Go to second branch: (b < c) ? b : c." },
        { line: 2, explanation: "Inner: 8 < 22 → true. Return b = 8." },
        { line: 2, explanation: "min = 8." },
        { line: 3, explanation: "Print 'Min: 8'." },
      ],
    },
    {
      id: "dr-12",
      title: "Semicolon after if (empty if body)",
      code: `int x = 5;
if (x > 10);
else
    System.out.println("Else runs");
System.out.println("Done");`,
      trace: [
        { line: 1, explanation: "x = 5." },
        { line: 2, explanation: "if (5 > 10) → false. The semicolon creates an empty if body (but condition is false anyway)." },
        { line: 3, explanation: "Else executes (still attached to the if)." },
        { line: 4, explanation: "Print 'Else runs'." },
        { line: 5, explanation: "Print 'Done'." },
      ],
    },
    {
      id: "dr-13",
      title: "Assignment in condition (boolean)",
      code: `boolean flag = false;
if (flag = true) {
    System.out.println("True");
} else {
    System.out.println("False");
}`,
      trace: [
        { line: 1, explanation: "flag = false." },
        { line: 2, explanation: "flag = true: assigns true to flag. The assigned value (true) is used as condition." },
        { line: 3, explanation: "Condition is true. If-block executes." },
        { line: 4, explanation: "Print 'True'." },
      ],
    },
    {
      id: "dr-14",
      title: "Complex nested if-else for triangle type",
      code: `int a = 5, b = 5, c = 8;
if (a + b > c && b + c > a && a + c > b) {
    if (a == b && b == c) {
        System.out.println("Equilateral");
    } else if (a == b || b == c || a == c) {
        System.out.println("Isosceles");
    } else {
        System.out.println("Scalene");
    }
} else {
    System.out.println("Invalid");
}`,
      trace: [
        { line: 1, explanation: "a = 5, b = 5, c = 8." },
        { line: 2, explanation: "5+5>8 (10>8 → true), 5+8>5 (13>5 → true), 5+8>5 (true). All true." },
        { line: 3, explanation: "a==b && b==c → 5==5 && 5==8 → true && false → false." },
        { line: 5, explanation: "a==b → true. Prints 'Isosceles'." },
      ],
    },
    {
      id: "dr-15",
      title: "Else-if ladder with boundary values",
      code: `int marks = 50;
if (marks >= 90) {
    System.out.println("A");
} else if (marks >= 75) {
    System.out.println("B");
} else if (marks >= 50) {
    System.out.println("C");
} else if (marks >= 40) {
    System.out.println("D");
} else {
    System.out.println("F");
}`,
      trace: [
        { line: 1, explanation: "marks = 50." },
        { line: 2, explanation: "50 >= 90 → false." },
        { line: 4, explanation: "50 >= 75 → false." },
        { line: 6, explanation: "50 >= 50 → true. Print 'C'." },
        { line: 7, explanation: "Remaining else-if and else skipped." },
      ],
    },
  ],

  // ==========================
  // SECTION 6: OUTPUT BASED QUESTIONS (50)
  // ==========================
  outputBasedQuestions: [
    {
      id: "ob-1",
      question: `int x = 10;
if (x > 5)
    System.out.print(">5");
else
    System.out.print("<=5");
System.out.print(" Done");`,
      answer: ">5 Done",
      explanation: "10 > 5 → true. If-block prints '>5'. Else skipped. ' Done' prints after the if-else construct.",
    },
    {
      id: "ob-2",
      question: `int x = 3;
if (x > 5)
    System.out.print(">5");
else
    System.out.print("<=5");
System.out.print(" Done");`,
      answer: "<=5 Done",
      explanation: "3 > 5 → false. If skipped. Else prints '<=5'. Then ' Done' prints.",
    },
    {
      id: "ob-3",
      question: `int a = 5, b = 5;
if (a == b) {
    a++;
} else {
    b++;
}
System.out.println(a + " " + b);`,
      answer: "6 5",
      explanation: "a == b → true. a++ makes a = 6. Else skipped. b remains 5.",
    },
    {
      id: "ob-4",
      question: `int x = 0;
if (x = 0)
    System.out.println("Zero");
else
    System.out.println("Non-zero");`,
      answer: "Compilation Error",
      explanation: "x = 0 is assignment (returns int 0), not boolean. Java requires boolean in if condition. Compilation error.",
    },
    {
      id: "ob-5",
      question: `boolean flag = false;
if (flag = true)
    System.out.println("True");
else
    System.out.println("False");`,
      answer: "True",
      explanation: "flag = true assigns true. The assigned value (true) is used as condition. If-block runs. Note: this is bad practice.",
    },
    {
      id: "ob-6",
      question: `int a = 10;
if (a > 5)
    System.out.println("if");
    System.out.println("still if?");
else
    System.out.println("else");`,
      answer: "Compilation Error",
      explanation: "Missing braces! The second println is between if and else, so else has no matching if. Compilation error.",
    },
    {
      id: "ob-7",
      question: `int n = 25;
if (n % 2 == 0)
    System.out.println("Even");
else
    System.out.println("Odd");`,
      answer: "Odd",
      explanation: "25 % 2 = 1. 1 == 0 → false. Else prints 'Odd'.",
    },
    {
      id: "ob-8",
      question: `int x = 5;
if (x > 5)
    x = x + 10;
else
    x = x + 20;
System.out.println(x);`,
      answer: "25",
      explanation: "5 > 5 → false. Else runs: x = 5 + 20 = 25.",
    },
    {
      id: "ob-9",
      question: `int x = 1, y = 2;
if (x > y)
    System.out.println(x + y);
else
    System.out.println(x * y);`,
      answer: "2",
      explanation: "1 > 2 → false. Else runs: 1 * 2 = 2.",
    },
    {
      id: "ob-10",
      question: `int a = 5, b = 10, c = 15;
if (a > b)
    if (b > c)
        System.out.println("first");
    else
        System.out.println("second");
else
    System.out.println("third");`,
      answer: "third",
      explanation: "a > b → 5 > 10 → false. Outer else runs. Prints 'third'. Inner else belongs to inner if.",
    },
    {
      id: "ob-11",
      question: `int marks = 45;
if (marks >= 90)
    System.out.println("A");
else if (marks >= 75)
    System.out.println("B");
else if (marks >= 50)
    System.out.println("C");
else
    System.out.println("D");`,
      answer: "D",
      explanation: "45 >= 90 → false. 45 >= 75 → false. 45 >= 50 → false. Else runs: prints 'D'.",
    },
    {
      id: "ob-12",
      question: `int x = 7;
if (++x > 8)
    System.out.println("A");
else
    System.out.println("B");
System.out.println(x);`,
      answer: "B\n8",
      explanation: "++x: x becomes 8. 8 > 8 → false. Else prints 'B'. x is 8.",
    },
    {
      id: "ob-13",
      question: `int x = 7;
if (x++ > 8)
    System.out.println("A");
else
    System.out.println("B");
System.out.println(x);`,
      answer: "B\n8",
      explanation: "x++: compares 7 > 8 → false, then x becomes 8. Else prints 'B'. x is 8.",
    },
    {
      id: "ob-14",
      question: `int a = 10;
if (a >= 0) {
    if (a == 0)
        System.out.println("Zero");
    else
        System.out.println("Positive");
} else
    System.out.println("Negative");`,
      answer: "Positive",
      explanation: "10 >= 0 → true. Inner: 10 == 0 → false. Inner else prints 'Positive'.",
    },
    {
      id: "ob-15",
      question: `int x = 3, y = 3;
if (x != y)
    System.out.println("Different");
else
    System.out.println("Same");`,
      answer: "Same",
      explanation: "3 != 3 → false. Else prints 'Same'.",
    },
    {
      id: "ob-16",
      question: `int x = 0;
if (x == 0)
    if (x > 0)
        System.out.println("Positive");
    else
        System.out.println("Zero/Negative");
else
    System.out.println("Non-zero");`,
      answer: "Zero/Negative",
      explanation: "x == 0 → true. Inner: x > 0 → false. Inner else prints 'Zero/Negative'. Outer else is for outer if (not triggered).",
    },
    {
      id: "ob-17",
      question: `int a = 2, b = 3;
if (a++ > --b)
    System.out.println(a + b);
else
    System.out.println(a - b);`,
      answer: "1",
      explanation: "a++: compares 2 > ? --b makes b=2. 2 > 2 → false. a becomes 3. Else: 3 - 2 = 1.",
    },
    {
      id: "ob-18",
      question: `System.out.println("Start");
if (false)
    System.out.println("Middle");
else
    System.out.println("Else Middle");
System.out.println("End");`,
      answer: "Start\nElse Middle\nEnd",
      explanation: "Condition is false. If skipped. Else prints 'Else Middle'. All three lines print sequentially.",
    },
    {
      id: "ob-19",
      question: `int x = 50;
if (x > 100)
    System.out.println(">100");
else if (x > 50)
    System.out.println(">50");
else if (x == 50)
    System.out.println("=50");
else
    System.out.println("<50");`,
      answer: "=50",
      explanation: "50 > 100 → false. 50 > 50 → false. 50 == 50 → true. Prints '=50'.",
    },
    {
      id: "ob-20",
      question: `int year = 2000;
if (year % 400 == 0)
    System.out.println("Leap");
else if (year % 4 == 0 && year % 100 != 0)
    System.out.println("Leap");
else
    System.out.println("Not Leap");`,
      answer: "Leap",
      explanation: "2000 % 400 == 0 → true. Prints 'Leap'. Rest skipped.",
    },
    {
      id: "ob-21",
      question: `int a = 5;
if (a > 10);
else
    System.out.println("Else runs");`,
      answer: "Else runs",
      explanation: "The `;` after if(x>10) creates an empty if body. But the else still matches the if. Since 5>10 is false, else runs.",
    },
    {
      id: "ob-22",
      question: `int x = 5;
if (x == 5) {
    x = 10;
} else {
    x = 20;
}
x = x + 5;
System.out.println(x);`,
      answer: "15",
      explanation: "x == 5 → true. x = 10. Else skipped. x = 10 + 5 = 15.",
    },
    {
      id: "ob-23",
      question: `int a = 0, b = 0;
if (a > 0)
    if (b > 0)
        System.out.println("++");
    else
        System.out.println("+-");
else
    if (b > 0)
        System.out.println("-+");
    else
        System.out.println("--");`,
      answer: "--",
      explanation: "a > 0 → false. Outer else runs. Inner: b > 0 → false. Prints '--'.",
    },
    {
      id: "ob-24",
      question: `int x = 3;
if (x > 0) {
    System.out.print("P ");
} else if (x < 0) {
    System.out.print("N ");
} else {
    System.out.print("Z ");
}
System.out.print("Done");`,
      answer: "P Done",
      explanation: "3 > 0 → true. Prints 'P '. Else-if and else skipped. Prints 'Done'.",
    },
    {
      id: "ob-25",
      question: `int value = 10;
boolean result = (value > 5);
if (result)
    System.out.println("Yes");
else
    System.out.println("No");`,
      answer: "Yes",
      explanation: "value > 5 → true. result = true. if(result) → true. Prints 'Yes'.",
    },
    {
      id: "ob-26",
      question: `int a = 5;
int b = (a > 3) ? 100 : 200;
System.out.println(b);`,
      answer: "100",
      explanation: "Ternary: a > 3 → true. Returns 100. b = 100.",
    },
    {
      id: "ob-27",
      question: `int x = 10;
if (x == 10)
    System.out.println("A");
else if (x == 10)
    System.out.println("B");
else
    System.out.println("C");`,
      answer: "A",
      explanation: "x == 10 → true. Prints 'A'. Rest skipped. Note: the else-if condition would also be true, but it's never reached.",
    },
    {
      id: "ob-28",
      question: `int a = 0;
if (a > 0 && a < 10)
    System.out.println("1-9");
else if (a > 10 && a < 20)
    System.out.println("11-19");
else if (a == 0)
    System.out.println("Zero");
else
    System.out.println("Other");`,
      answer: "Zero",
      explanation: "a > 0 && a < 10 → false. a > 10 && a < 20 → false. a == 0 → true. Prints 'Zero'.",
    },
    {
      id: "ob-29",
      question: `int x = 5;
if (x % 2 == 0) {
    x *= 2;
} else {
    x += 2;
}
System.out.println(x);`,
      answer: "7",
      explanation: "5 % 2 = 1. 1 == 0 → false. Else runs: x = 5 + 2 = 7.",
    },
    {
      id: "ob-30",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else {
    System.out.println("Zero");
}`,
      answer: "Positive",
      explanation: "5 > 0 → true. Prints 'Positive'. Rest skipped.",
    },
    {
      id: "ob-31",
      question: `int a = 10, b = 20, c = 30;
if (a > b)
    if (a > c)
        System.out.println("a max");
    else
        System.out.println("c max");
else
    if (b > c)
        System.out.println("b max");
    else
        System.out.println("c max");`,
      answer: "c max",
      explanation: "a > b → 10 > 20 → false. Outer else: b > c → 20 > 30 → false. Inner else prints 'c max'.",
    },
    {
      id: "ob-32",
      question: `int x = 5;
if (x > 0) {
    System.out.print("A ");
} else {
    System.out.print("B ");
}
if (x < 10) {
    System.out.print("C ");
} else {
    System.out.print("D ");
}`,
      answer: "A C",
      explanation: "First if: 5 > 0 → true. Prints 'A '. Second if (independent): 5 < 10 → true. Prints 'C '.",
    },
    {
      id: "ob-33",
      question: `int x = 0;
if (x == 0) {
    x = 1;
} else if (x == 1) {
    x = 2;
} else {
    x = 3;
}
System.out.println(x);`,
      answer: "1",
      explanation: "x == 0 → true. x = 1. Else-if and else skipped.",
    },
    {
      id: "ob-34",
      question: `int a = 3, b = 3, c = 3;
if (a == b)
    if (b == c)
        System.out.println("All equal");
    else
        System.out.println("a=b != c");
else
    System.out.println("a != b");`,
      answer: "All equal",
      explanation: "a == b → true. Inner: b == c → true. Prints 'All equal'.",
    },
    {
      id: "ob-35",
      question: `int x = 10;
if (x > 5) {
    int y = 20;
    System.out.println(y);
} else {
    int y = 30;
    System.out.println(y);
}`,
      answer: "20",
      explanation: "10 > 5 → true. y = 20 (block-scoped). Prints '20'. The y in else is a different variable.",
    },
    {
      id: "ob-36",
      question: `int x = 5;
if (x < 10)
    if (x > 0)
        System.out.println("Positive < 10");
    else
        System.out.println("Negative");
else
    System.out.println(">= 10");`,
      answer: "Positive < 10",
      explanation: "5 < 10 → true. Inner: 5 > 0 → true. Prints 'Positive < 10'.",
    },
    {
      id: "ob-37",
      question: `int x = 3;
int y = (x > 5) ? 10 : (x > 0) ? 5 : 0;
System.out.println(y);`,
      answer: "5",
      explanation: "Outer ternary: 3 > 5 → false. Returns second branch: (3 > 0) ? 5 : 0. 3 > 0 → true. Returns 5.",
    },
    {
      id: "ob-38",
      question: `int a = 5, b = 10;
if (a < b) {
    System.out.println("a < b");
} else {
    System.out.println("a >= b");
}
System.out.println("Comparison done");`,
      answer: "a < b\nComparison done",
      explanation: "5 < 10 → true. Prints 'a < b'. Then 'Comparison done' prints after the if-else.",
    },
    {
      id: "ob-39",
      question: `int x = 1;
if (x > 0)
    if (x < 5)
        System.out.println("1-4");
    else if (x < 10)
        System.out.println("5-9");
    else
        System.out.println(">=10");
else
    System.out.println("<=0");`,
      answer: "1-4",
      explanation: "x > 0 → true. Inner: x < 5 → true. Prints '1-4'.",
    },
    {
      id: "ob-40",
      question: `int x = 5;
if (x == 5) {
    System.out.print("X ");
}
if (x > 0) {
    System.out.print("Y ");
} else {
    System.out.print("Z ");
}`,
      answer: "X Y",
      explanation: "First if (independent): 5 == 5 → true. Prints 'X '. Second if (independent): 5 > 0 → true. Prints 'Y '. Else skipped.",
    },
    {
      id: "ob-41",
      question: `int a = 10, b = 20;
String s = (a > b) ? "a larger" : "b larger";
System.out.println(s);`,
      answer: "b larger",
      explanation: "10 > 20 → false. Ternary returns 'b larger'.",
    },
    {
      id: "ob-42",
      question: `int x = 0;
if (x > 0)
    System.out.println("Positive");
else if (x < 0)
    System.out.println("Negative");
else
    System.out.println("Zero");`,
      answer: "Zero",
      explanation: "0 > 0 → false. 0 < 0 → false. Else prints 'Zero'.",
    },
    {
      id: "ob-43",
      question: `int x = 5;
if (x > 0) {
    System.out.print("A ");
    if (x > 10) {
        System.out.print("B ");
    } else {
        System.out.print("C ");
    }
}
System.out.print("D");`,
      answer: "A C D",
      explanation: "5 > 0 → true. Prints 'A '. Inner: 5 > 10 → false. Inner else prints 'C '. After outer if, prints 'D'.",
    },
    {
      id: "ob-44",
      question: `int x = 10;
if (x > 5)
    System.out.println(">5");
else if (x > 8)
    System.out.println(">8");
else
    System.out.println("Other");`,
      answer: ">5",
      explanation: "10 > 5 → true. Prints '>5'. Rest skipped even though 10 > 8 is also true.",
    },
    {
      id: "ob-45",
      question: `int a = 5, b = 5;
if (a++ > b)
    System.out.println("a > b");
else if (a == b)
    System.out.println("a == b");
else
    System.out.println("a < b");`,
      answer: "a == b",
      explanation: "a++: compares 5 > 5 → false, then a becomes 6. Else-if: 6 == 5 → false. Else: prints 'a < b'. Wait, let me re-trace. a++: compare 5 > 5 → false, a becomes 6. Else-if: 6 == 5 → false. Else prints 'a < b'. Actually answer is 'a < b'.",
      answer: "a < b",
      explanation: "a++: compares 5 > 5 → false, then a becomes 6. Else-if: 6 == 5 → false. Else prints 'a < b'.",
    },
    {
      id: "ob-46",
      question: `int x = 3;
if (x > 0)
    if (x > 5)
        System.out.println(">5");
    else
        System.out.println("0-5");
else
    System.out.println("<=0");`,
      answer: "0-5",
      explanation: "3 > 0 → true. Inner: 3 > 5 → false. Inner else prints '0-5'.",
    },
    {
      id: "ob-47",
      question: `int a = 10;
int b = 20;
int c = (a > b) ? a - b : b - a;
System.out.println(c);`,
      answer: "10",
      explanation: "10 > 20 → false. Ternary returns b - a = 20 - 10 = 10.",
    },
    {
      id: "ob-48",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else {
    System.out.println("Non-positive");
}
if (x % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}`,
      answer: "Positive\nOdd",
      explanation: "First if: 5 > 0 → true. Prints 'Positive'. Second if (independent): 5 % 2 = 1. 1 == 0 → false. Else prints 'Odd'.",
    },
    {
      id: "ob-49",
      question: `int x = 5;
if (x > 0 && x < 10) {
    System.out.println("Single digit positive");
} else if (x >= 10 && x < 100) {
    System.out.println("Double digit");
} else {
    System.out.println("Other");
}`,
      answer: "Single digit positive",
      explanation: "5 > 0 (true) && 5 < 10 (true) → true. Prints 'Single digit positive'.",
    },
    {
      id: "ob-50",
      question: `int a = 5, b = 10, c = 15;
int max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
System.out.println("Max: " + max);`,
      answer: "Max: 15",
      explanation: "Outer: 5 > 10 → false. Returns (b > c) ? b : c. 10 > 15 → false. Returns c = 15.",
    },
  ],

  // ==========================
  // SECTION 7: ERROR FINDING (30)
  // ==========================
  errorFindingQuestions: [
    {
      id: "ef-1",
      question: `int x = 10;
if (x > 5) {
    System.out.println(">5");
}
else
    System.out.println("<=5");
    System.out.println("Always");`,
      error: "Missing braces after else. Only the first println is in else. 'Always' always prints regardless of condition. Add braces for multiple statements.",
      corrected: `int x = 10;
if (x > 5) {
    System.out.println(">5");
} else {
    System.out.println("<=5");
    System.out.println("Always");
}`,
    },
    {
      id: "ef-2",
      question: `int a = 5;
if (a = 5)
    System.out.println("Equal");
else
    System.out.println("Not Equal");`,
      error: "a = 5 is assignment, not comparison. Returns int 5, not boolean. Java compilation error because condition must be boolean.",
      corrected: `int a = 5;
if (a == 5)
    System.out.println("Equal");
else
    System.out.println("Not Equal");`,
    },
    {
      id: "ef-3",
      question: `int x = 10;
if (x > 5) {
    System.out.println(">5");
} else (x <= 5) {
    System.out.println("<=5");
}`,
      error: "else cannot have a condition. Remove `(x <= 5)` or use `else if`.",
      corrected: `int x = 10;
if (x > 5) {
    System.out.println(">5");
} else {
    System.out.println("<=5");
}`,
    },
    {
      id: "ef-4",
      question: `int num = 7;
if (num % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
} else {
    System.out.println("Extra else");
}`,
      error: "Extra else block without matching if. An if can have only one else.",
      corrected: `int num = 7;
if (num % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}`,
    },
    {
      id: "ef-5",
      question: `int a = 10;
if (a > 5)
    int b = 20;
else
    System.out.println("Else");
System.out.println(b);`,
      error: "Cannot declare variable as single statement after if without braces. Also b is out of scope on last line.",
      corrected: `int a = 10;
if (a > 5) {
    int b = 20;
    System.out.println(b);
} else {
    System.out.println("Else");
}`,
    },
    {
      id: "ef-6",
      question: `int x = 15;
if (x > 10)
    System.out.print("A");
    System.out.print("B");
else
    System.out.print("C");`,
      error: "Missing braces. The else is separated from its if by the println, causing compilation error.",
      corrected: `int x = 15;
if (x > 10) {
    System.out.print("A");
    System.out.print("B");
} else {
    System.out.print("C");
}`,
    },
    {
      id: "ef-7",
      question: `int x = 5;
if x > 5 {
    System.out.println(">5");
} else {
    System.out.println("<=5");
}`,
      error: "Missing parentheses around condition. Must be `if (x > 5)`.",
      corrected: `int x = 5;
if (x > 5) {
    System.out.println(">5");
} else {
    System.out.println("<=5");
}`,
    },
    {
      id: "ef-8",
      question: `int score = 85;
if (score >= 90) {
    System.out.println("A");
} elseif (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}`,
      error: "`elseif` should be `else if` (two words with space).",
      corrected: `int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}`,
    },
    {
      id: "ef-9",
      question: `int x = 10;
if (x == 10); {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
      error: "Semicolon after `if(x==10)` terminates the if. Now the block after it is not attached, so else has no matching if. Compilation error.",
      corrected: `int x = 10;
if (x == 10) {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
    },
    {
      id: "ef-10",
      question: `int x = 0;
if (x) {
    System.out.println("True");
} else {
    System.out.println("False");
}`,
      error: "Condition must be boolean. x is int, not boolean. Java does not treat 0 as false like C/C++. Compilation error.",
      corrected: `int x = 0;
if (x == 0) {
    System.out.println("Zero");
} else {
    System.out.println("Non-zero");
}`,
    },
    {
      id: "ef-11",
      question: `int day = 3;
if (day == 1)
    System.out.println("Mon");
if (day == 2)
    System.out.println("Tue");
if (day == 3)
    System.out.println("Wed");
else
    System.out.println("Other");`,
      error: "The else matches the THIRD if (nearest unmatched). The first two ifs are independent. So if day=1, it prints 'Mon' and then else prints 'Other' (since third if fails). Logical bug.",
      corrected: `int day = 3;
if (day == 1)
    System.out.println("Mon");
else if (day == 2)
    System.out.println("Tue");
else if (day == 3)
    System.out.println("Wed");
else
    System.out.println("Other");`,
    },
    {
      id: "ef-12",
      question: `int a = 5;
if (a == 5) {
    System.out.println("Five");
}
else if (a == 5) {
    System.out.println("Also five");
}
else {
    System.out.println("Not five");
}`,
      error: "No syntax error, but logical issue: second condition is unreachable. If a==5, first if runs and else-if is skipped. If a!=5, else-if fails and else runs.",
      corrected: "Remove the unreachable else-if or change condition to something different.",
    },
    {
      id: "ef-13",
      question: `int x = 10;
if (x > 5) {
    System.out.println(">5");
} else {
    System.out.println("<=5");
}
else {
    System.out.println("Extra");
}`,
      error: "Cannot have two else blocks. Only one else per if.",
      corrected: `int x = 10;
if (x > 5) {
    System.out.println(">5");
} else {
    System.out.println("<=5");
}`,
    },
    {
      id: "ef-14",
      question: `int x = 10;
if (x > 5)
    System.out.println(">5");
else
    System.out.println("<=5");
    System.out.println("Done");`,
      error: "No syntax error, but 'Done' is outside the else and always prints. If intent was for else to print both, add braces.",
      corrected: `int x = 10;
if (x > 5) {
    System.out.println(">5");
} else {
    System.out.println("<=5");
    System.out.println("Done");
}`,
    },
    {
      id: "ef-15",
      question: `int a = 10;
if (a) {
    System.out.println("Non-zero");
} else {
    System.out.println("Zero");
}`,
      error: "int cannot be used as boolean in Java. Unlike C/C++, 0 and non-zero are not false/true.",
      corrected: `int a = 10;
if (a != 0) {
    System.out.println("Non-zero");
} else {
    System.out.println("Zero");
}`,
    },
    {
      id: "ef-16",
      question: `float f = 0.7;
if (f == 0.7) {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
      error: "Comparing float with double. 0.7 is double by default. Use 0.7f for float or declare f as double. Also floating-point precision issues may cause unexpected results.",
      corrected: `double f = 0.7;
if (f == 0.7) {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
    },
    {
      id: "ef-17",
      question: `String s = "Hello";
if (s == "Hello") {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
      error: "Using == for String comparison compares references, not content. May work with literals due to string interning but unreliable. Use .equals().",
      corrected: `String s = "Hello";
if (s.equals("Hello")) {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
    },
    {
      id: "ef-18",
      question: `int a = 10, b = 20;
if (a = b) {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
      error: "a = b assigns b to a (20). Returns int 20. Not boolean. Compilation error.",
      corrected: `int a = 10, b = 20;
if (a == b) {
    System.out.println("Equal");
} else {
    System.out.println("Not Equal");
}`,
    },
    {
      id: "ef-19",
      question: `int x = 5;
if (x > 0)
    if (x < 10)
        System.out.println("1-9");
    else
        System.out.println(">=10");
else
    System.out.println("<=0");`,
      error: "No error. Code correctly classifies numbers using nested if-else with proper indentation.",
      corrected: "No error. Correct nested structure.",
    },
    {
      id: "ef-20",
      question: `int x = 5;
if (x == 5) {
    System.out.println("x is 5");
}
else if (x > 5) {
    System.out.println("x > 5");
}`,
      error: "No error. Valid if-else-if without a final else (which is optional).",
      corrected: "No error.",
    },
    {
      id: "ef-21",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else if (x == 0) {
    System.out.println("Zero");
}`,
      error: "No error. Valid else-if ladder covering all cases.",
      corrected: "No error.",
    },
    {
      id: "ef-22",
      question: `int x = 5;
if (x > 0)
    System.out.println("Positive");
    System.out.println("Always prints");
else
    System.out.println("Negative");`,
      error: "The second println is between if and else. Since there are no braces, only the first println belongs to if. The second println breaks the if-else connection. Compilation error.",
      corrected: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
    System.out.println("Always prints");
} else {
    System.out.println("Negative");
}`,
    },
    {
      id: "ef-23",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else (x < 0) {
    System.out.println("Negative");
} else {
    System.out.println("Zero");
}`,
      error: "Two errors: 1) else cannot have condition `(x < 0)`. 2) Cannot have two else blocks.",
      corrected: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else {
    System.out.println("Zero");
}`,
    },
    {
      id: "ef-24",
      question: `int x = 5;
if (x > 0)
    int y = 10;
else
    int z = 20;`,
      error: "Cannot declare variables as single statements after if/else without braces. Variable declarations are statements, not expressions.",
      corrected: `int x = 5;
int y, z;
if (x > 0)
    y = 10;
else
    z = 20;`,
    },
    {
      id: "ef-25",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if {
    System.out.println("Not positive");
}`,
      error: "else if must have a condition in parentheses. `else if { }` is invalid.",
      corrected: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else {
    System.out.println("Not positive");
}`,
    },
    {
      id: "ef-26",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else (x == 0) {
    System.out.println("Zero");
}`,
      error: "The final else cannot have a condition. Use `else if (x == 0)` or just `else`.",
      corrected: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else {
    System.out.println("Zero");
}`,
    },
    {
      id: "ef-27",
      question: `int x = 5;
if (x > 0)
    System.out.println("Positive");
else if (x < 0)
    System.out.println("Negative");
else if (x == 0)
    System.out.println("Zero");
else
    System.out.println("Unknown");`,
      error: "No error. Valid else-if ladder. The final else is unreachable (all cases covered) but valid.",
      corrected: "No error. The final else is dead code but syntactically valid.",
    },
    {
      id: "ef-28",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else if (x == 0) {
    System.out.println("Zero");
} else {
    System.out.println("Impossible");
}`,
      error: "No syntax error. The final else is unreachable because all integer cases (positive, negative, zero) are covered. Dead code.",
      corrected: "Remove the unreachable else block.",
    },
    {
      id: "ef-29",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else if (x == 0) {
    System.out.println("Zero");
} else {
    System.out.println("Other");
}`,
      error: "No error. All cases covered. The else is dead code but valid Java.",
      corrected: "No error needed, but the else block is unreachable.",
    },
    {
      id: "ef-30",
      question: `int x = 5;
if (x > 0) {
    System.out.println("Positive");
} else if (x < 0) {
    System.out.println("Negative");
} else if (x == 0) {
    System.out.println("Zero");
} else {
    System.out.println("Other");
}`,
      error: "No error. The code is syntactically correct. The else block is unreachable but valid.",
      corrected: "No error. Code is correct.",
    },
  ],

  // ==========================
  // SECTION 8: FILL IN THE BLANKS (30)
  // ==========================
  fillInTheBlanks: [
    { id: "fb-1", question: "The _____ keyword provides the alternative path when an if condition is false.", answer: "else" },
    { id: "fb-2", question: "In an if-else statement, exactly _____ block(s) execute(s).", answer: "one" },
    { id: "fb-3", question: "The else block cannot have its own _____ in parentheses.", answer: "condition" },
    { id: "fb-4", question: "An else always matches the nearest unmatched _____ statement.", answer: "if" },
    { id: "fb-5", question: "To have an else-if construct, use the words _____ and _____ separately.", answer: "else if" },
    { id: "fb-6", question: "The ternary operator `? :` is a shorthand for simple _____ statements.", answer: "if-else" },
    { id: "fb-7", question: `int x = 5;\nif (x > 10)\n    System.out.println("A");\n_____\n    System.out.println("B");`, answer: "else" },
    { id: "fb-8", question: "Putting a semicolon after `if(condition)` causes the _____ to become 'dangling'.", answer: "else" },
    { id: "fb-9", question: `int score = 75;\nif (score >= 90)\n    System.out.println("A");\n_____ _____ (score >= 75)\n    System.out.println("B");`, answer: "else if" },
    { id: "fb-10", question: `int a = 10, b = 20;\nint max = (a > b) __ a __ b;\n// Fill ternary operator`, answer: "? :" },
    { id: "fb-11", question: "An if statement can have at most _____ else clause(s).", answer: "one" },
    { id: "fb-12", question: "When if and else have multiple statements, _____ are required.", answer: "curly braces (or {})" },
    { id: "fb-13", question: `int x = 5;\nif (x % 2 == 0)\n    System.out.println("Even");\n_____\n    System.out.println("Odd");`, answer: "else" },
    { id: "fb-14", question: "The else clause is _____ (optional/required) in an if statement.", answer: "optional" },
    { id: "fb-15", question: `int x = 3;\nString result = (x > 5) __ "Large" __ "Small";`, answer: "? :" },
    { id: "fb-16", question: "In nested if-else, an else attaches to the _____ if.", answer: "nearest" },
    { id: "fb-17", question: `int a = 5;\nif (a > 0)\n    System.out.println("Positive");\n_____ _____ (a < 0)\n    System.out.println("Negative");\n_____\n    System.out.println("Zero");`, answer: "else if / else" },
    { id: "fb-18", question: "The _____ operator can replace simple if-else in one line.", answer: "ternary (or ? :)" },
    { id: "fb-19", question: "When a semicolon appears after `if(condition)`, the if body is _____.", answer: "empty (or does nothing)" },
    { id: "fb-20", question: `int x = 10;\nif (x > 5) {\n    System.out.println(">5");\n} else {\n    System.out.println("<=5");\n}\n// How many blocks execute? _____`, answer: "one" },
    { id: "fb-21", question: "The _____ operator is used for logical AND in conditions.", answer: "&&" },
    { id: "fb-22", question: "The _____ operator is used for logical OR in conditions.", answer: "||" },
    { id: "fb-23", question: "The _____ operator is used for logical NOT in conditions.", answer: "!" },
    { id: "fb-24", question: `int x = 5;\nif (x > 0 __ x < 10) // Fill with logical AND`, answer: "&&" },
    { id: "fb-25", question: "Short-circuit evaluation means the second operand is _____ if the result is already determined.", answer: "not evaluated (or skipped)" },
    { id: "fb-26", question: "In `if (a > 0 && b++ > 0)`, if a > 0 is false, b++ is _____.", answer: "not evaluated (or skipped)" },
    { id: "fb-27", question: "The condition in an if statement must evaluate to a _____ value.", answer: "boolean" },
    { id: "fb-28", question: "An else-if ladder can have _____ number of else-if blocks.", answer: "any (or unlimited)" },
    { id: "fb-29", question: "The final else in an else-if ladder is _____ (optional/required).", answer: "optional" },
    { id: "fb-30", question: "Using `=` instead of `==` in a condition causes a _____ error in Java.", answer: "compilation" },
  ],

  // ==========================
  // SECTION 9: MCQs (50)
  // ==========================
  mcqs: [
    {
      id: "mcq-1",
      question: "What does the else keyword do?",
      options: ["Starts another condition", "Provides alternative code when if is false", "Ends the program", "Creates a loop"],
      answer: 1,
      explanation: "else provides code that runs when the if condition is false.",
    },
    {
      id: "mcq-2",
      question: `int x = 3;\nif (x > 5)\n    System.out.print("A");\nelse\n    System.out.print("B");`,
      options: ["A", "B", "AB", "Nothing"],
      answer: 1,
      explanation: "3 > 5 → false. Else runs, prints 'B'.",
    },
    {
      id: "mcq-3",
      question: "Can an if statement have multiple else blocks?",
      options: ["Yes, any number", "No, only one", "Yes, up to two", "Only if there are braces"],
      answer: 1,
      explanation: "Only one else per if. Use else if for multiple conditions.",
    },
    {
      id: "mcq-4",
      question: "What is 'dangling else'?",
      options: ["An else without if", "An else matching the wrong if in nesting", "Missing semicolon", "Extra parentheses"],
      answer: 1,
      explanation: "In nested ifs, else matches the nearest if by default, which may not be intended.",
    },
    {
      id: "mcq-5",
      question: `int x = 10;\nif (x > 5)\n    System.out.print(">5");\nelse;\n    System.out.print("done");`,
      options: [">5done", ">5", "done", "Compilation error"],
      answer: 0,
      explanation: "else; has empty body (does nothing). Then 'done' prints. if runs first printing '>5'.",
    },
    {
      id: "mcq-6",
      question: "How do you write else-if correctly?",
      options: ["elseif", "else if", "elseif()", "Else If"],
      answer: 1,
      explanation: "else and if are two separate keywords: `else if (condition)`.",
    },
    {
      id: "mcq-7",
      question: `int x = 5;\nif (x = 5)\n    System.out.println("Equal");\nelse\n    System.out.println("Not Equal");`,
      options: ["Equal", "Not Equal", "Compilation error", "Runtime error"],
      answer: 2,
      explanation: "x = 5 assigns and returns int. Not boolean. Compilation error.",
    },
    {
      id: "mcq-8",
      question: "What does `int max = (a > b) ? a : b;` do?",
      options: ["Compares a and b", "Assigns larger of a,b to max", "Creates a loop", "Throws error"],
      answer: 1,
      explanation: "Ternary: if a > b true, max = a; else max = b.",
    },
    {
      id: "mcq-9",
      question: `int a = 5;\nif (a > 0) {\n    a++;\n} else {\n    a--;\n}\nSystem.out.println(a);`,
      options: ["4", "5", "6", "Compilation error"],
      answer: 2,
      explanation: "5 > 0 → true. a++ makes a = 6.",
    },
    {
      id: "mcq-10",
      question: "Can else exist without a preceding if?",
      options: ["Yes", "No", "Only in methods", "Only with braces"],
      answer: 1,
      explanation: "else must always be paired with an if. Standalone else causes compilation error.",
    },
    {
      id: "mcq-11",
      question: `int x = 10;\nif (x > 10)\n    System.out.println("A");\nelse if (x == 10)\n    System.out.println("B");\nelse\n    System.out.println("C");`,
      options: ["A", "B", "C", "Nothing"],
      answer: 1,
      explanation: "10 > 10 → false. 10 == 10 → true. Prints 'B'.",
    },
    {
      id: "mcq-12",
      question: `int a = 1, b = 2, c = 3;\nif (a > b)\n    if (a > c)\n        System.out.println("a max");\n    else\n        System.out.println("c max");\nelse\n    if (b > c)\n        System.out.println("b max");\n    else\n        System.out.println("c max");`,
      options: ["a max", "b max", "c max", "Compilation error"],
      answer: 2,
      explanation: "a > b → false. Outer else: b > c → false. Inner else prints 'c max'.",
    },
    {
      id: "mcq-13",
      question: "Is the else block mandatory?",
      options: ["Yes", "No", "Only with nested if", "Only in loops"],
      answer: 1,
      explanation: "else is always optional. if can stand alone without else.",
    },
    {
      id: "mcq-14",
      question: `int marks = 75;\nString grade;\nif (marks >= 90)\n    grade = "A";\nelse if (marks >= 80)\n    grade = "B";\nelse if (marks >= 70)\n    grade = "C";\nelse\n    grade = "D";`,
      options: ["A", "B", "C", "D"],
      answer: 2,
      explanation: "75 >= 90 → false. 75 >= 80 → false. 75 >= 70 → true. grade = 'C'.",
    },
    {
      id: "mcq-15",
      question: "What is the range of values where `if (x > 5 && x < 10)` is true?",
      options: ["5 to 10", "6 to 9", "5 to 9", "6 to 10"],
      answer: 1,
      explanation: "x > 5 (strictly >5 means 6+) AND x < 10 (strictly <10 means up to 9).",
    },
    {
      id: "mcq-16",
      question: `int n = 7;\nif (n % 2 == 0)\n    System.out.println("A");\nelse\n    System.out.println("B");`,
      options: ["A", "B", "AB", "Nothing"],
      answer: 1,
      explanation: "7 % 2 = 1. 1 == 0 → false. Else prints 'B'.",
    },
    {
      id: "mcq-17",
      question: `int x = 5;\nif (x > 5)\n    x = 10;\nelse\n    x = 20;\nSystem.out.println(x);`,
      options: ["5", "10", "20", "Compilation error"],
      answer: 2,
      explanation: "5 > 5 → false. Else runs: x = 20.",
    },
    {
      id: "mcq-18",
      question: "How does Java resolve which else belongs to which if in nested structures?",
      options: ["Else matches farthest if", "Else matches nearest if", "Else matches outer if", "Else must be labeled"],
      answer: 1,
      explanation: "By default, else attaches to the nearest unmatched if. Use braces to control binding.",
    },
    {
      id: "mcq-19",
      question: `int x = 7;\nif (x > 5)\n    if (x < 10)\n        System.out.println("1-9");\n    else\n        System.out.println(">=10");\nelse\n    System.out.println("<=5");`,
      options: ["1-9", ">=10", "<=5", "Compilation error"],
      answer: 0,
      explanation: "7 > 5 → true. Inner: 7 < 10 → true. Prints '1-9'.",
    },
    {
      id: "mcq-20",
      question: "Which is NOT a valid use of else?",
      options: ["if-else", "if-else-if", "if-else without if", "nested if-else"],
      answer: 2,
      explanation: "else cannot exist without a preceding if.",
    },
    {
      id: "mcq-21",
      question: "What does the ternary operator `? :` return?",
      options: ["A boolean", "A value based on condition", "Always true", "Nothing"],
      answer: 1,
      explanation: "Returns the second operand if true, third operand if false.",
    },
    {
      id: "mcq-22",
      question: `int a = 5, b = 10;\nint min = (a < b) ? a : b;\nSystem.out.println(min);`,
      options: ["5", "10", "false", "Compilation error"],
      answer: 0,
      explanation: "a < b → true. Returns a = 5.",
    },
    {
      id: "mcq-23",
      question: "What happens if you omit braces in an if-else with multiple statements?",
      options: ["Compilation error", "Only first statement is conditional", "All statements are conditional", "Else runs always"],
      answer: 0,
      explanation: "With multiple statements in if/else and no braces, only the first statement belongs to if/else. The rest cause issues, especially with else.",
    },
    {
      id: "mcq-24",
      question: `int x = 0;\nif (x) {\n    System.out.println("True");\n} else {\n    System.out.println("False");\n}`,
      options: ["True", "False", "Compilation error", "Runtime error"],
      answer: 2,
      explanation: "Java requires boolean condition. x is int → compilation error.",
    },
    {
      id: "mcq-25",
      question: "Can you nest an if-else inside another if-else?",
      options: ["Yes", "No", "Only if depth ≤ 3", "Only with braces"],
      answer: 0,
      explanation: "Nesting if-else is allowed to any depth.",
    },
    {
      id: "mcq-26",
      question: `int x = 10;\nif (x > 5) {\n    System.out.println("A");\n} else if (x > 3) {\n    System.out.println("B");\n} else {\n    System.out.println("C");\n}`,
      options: ["A", "B", "C", "Compilation error"],
      answer: 0,
      explanation: "10 > 5 → true. Prints 'A'. Rest are skipped despite x > 3 also being true.",
    },
    {
      id: "mcq-27",
      question: "How many times can else-if appear?",
      options: ["At most once", "At most 5 times", "Any number of times", "Only twice"],
      answer: 2,
      explanation: "You can have as many else-if blocks as needed.",
    },
    {
      id: "mcq-28",
      question: "What is the result of `(5 > 3) ? 10 : 20`?",
      options: ["10", "20", "true", "false"],
      answer: 0,
      explanation: "5 > 3 → true. Returns 10.",
    },
    {
      id: "mcq-29",
      question: `int x = 5;\nif (x == 5);\n    System.out.println("Equal");\nelse\n    System.out.println("Not Equal");`,
      options: ["Equal", "Not Equal", "Compilation error", "Nothing"],
      answer: 2,
      explanation: "Semicolon after if terminates it. The println is between if and else → compilation error.",
    },
    {
      id: "mcq-30",
      question: "Which is the correct syntax for if-else?",
      options: [
        "if (condition) { } else { }",
        "if (condition) { } else (condition) { }",
        "if condition { } else { }",
        "if (condition) { } elseif { }"
      ],
      answer: 0,
      explanation: "Correct: `if (condition) { } else { }`. else cannot have its own condition.",
    },
    {
      id: "mcq-31",
      question: `int x = 15;\nif (x > 20)\n    System.out.println("A");\nelse if (x > 10)\n    System.out.println("B");\nelse if (x > 5)\n    System.out.println("C");\nelse\n    System.out.println("D");`,
      options: ["A", "B", "C", "D"],
      answer: 1,
      explanation: "15 > 20 → false. 15 > 10 → true. Prints 'B'. Rest skipped.",
    },
    {
      id: "mcq-32",
      question: "What happens if the condition in if is a boolean variable?",
      options: ["It's used directly", "Must compare with true", "Must convert to int", "Invalid syntax"],
      answer: 0,
      explanation: "A boolean variable can be used directly: `if (flag)` is valid.",
    },
    {
      id: "mcq-33",
      question: `int a = 10;\nif (a > 5)\n    a = a * 2;\n    a = a + 3;\nSystem.out.println(a);`,
      options: ["20", "23", "33", "Compilation error"],
      answer: 1,
      explanation: "a > 5 → true. Only `a = a * 2` is inside if. a = 20. Then `a = a + 3` runs (outside if). a = 23.",
    },
    {
      id: "mcq-34",
      question: `int x = -5;\nString s = (x >= 0) ? "Non-negative" : "Negative";\nSystem.out.println(s);`,
      options: ["Non-negative", "Negative", "Compilation error", "Nothing"],
      answer: 1,
      explanation: "-5 >= 0 → false. Ternary returns 'Negative'.",
    },
    {
      id: "mcq-35",
      question: "How do you write a nested if-else that checks three levels?",
      options: [
        "if {} else if {} else if {}",
        "if { if {} else {} } else { if {} else {} }",
        "if (if {}) else {}",
        "None of these"
      ],
      answer: 1,
      explanation: "Nested means if inside if's block: `if { if {} else {} } else { if {} else {} }`.",
    },
    {
      id: "mcq-36",
      question: `int year = 2000;\nif (year % 400 == 0)\n    System.out.println("Leap");\nelse if (year % 100 == 0)\n    System.out.println("Not Leap");\nelse if (year % 4 == 0)\n    System.out.println("Leap");\nelse\n    System.out.println("Not Leap");`,
      options: ["Leap", "Not Leap", "Compilation error", "Nothing"],
      answer: 0,
      explanation: "2000 % 400 == 0 → true. Prints 'Leap'. Correct.",
    },
    {
      id: "mcq-37",
      question: `int a = 3, b = 3;\nif (a == b)\n    a++;\n    b++;\nSystem.out.println(a + " " + b);`,
      options: ["3 3", "4 3", "4 4", "Compilation error"],
      answer: 2,
      explanation: "a == b → true. a++ runs (a=4). b++ is outside if (no braces) and always runs (b=4). Output: 4 4.",
    },
    {
      id: "mcq-38",
      question: "Can you use if-else inside a ternary operator?",
      options: ["Yes", "No", "Only nested ternary", "Only with braces"],
      answer: 2,
      explanation: "You can nest ternary: `(a>b) ? ((a>c) ? a : c) : ((b>c) ? b : c)`.",
    },
    {
      id: "mcq-39",
      question: `int x = 10;\nif (x > 10) {\n    System.out.println("A");\n} else if (x >= 10) {\n    System.out.println("B");\n}`,
      options: ["A", "B", "AB", "Nothing"],
      answer: 1,
      explanation: "10 > 10 → false. 10 >= 10 → true. Prints 'B'.",
    },
    {
      id: "mcq-40",
      question: `boolean flag = true;\nif (!flag)\n    System.out.println("Not flag");\nelse\n    System.out.println("Flag");`,
      options: ["Not flag", "Flag", "Nothing", "Compilation error"],
      answer: 1,
      explanation: "!flag → !true → false. Else prints 'Flag'.",
    },
    {
      id: "mcq-41",
      question: `int x = 3;\nif (x < 0)\n    System.out.println("Neg");\nelse if (x == 0)\n    System.out.println("Zero");\nelse if (x > 0 && x < 10)\n    System.out.println("Small Pos");\nelse\n    System.out.println("Large Pos");`,
      options: ["Neg", "Zero", "Small Pos", "Large Pos"],
      answer: 2,
      explanation: "3 < 0 → false. 3 == 0 → false. 3 > 0 && 3 < 10 → true. Prints 'Small Pos'.",
    },
    {
      id: "mcq-42",
      question: "What is the advantage of else-if over multiple ifs?",
      options: ["Faster execution", "Stops checking after a match", "Less code", "All of the above"],
      answer: 3,
      explanation: "else-if stops checking once a condition matches (short-circuit), making it more efficient than multiple ifs.",
    },
    {
      id: "mcq-43",
      question: `int a = 5, b = 5;\nif (a > b)\n    System.out.println(">");\nelse if (a < b)\n    System.out.println("<");\nelse\n    System.out.println("=");`,
      options: [">", "<", "=", "Compilation error"],
      answer: 2,
      explanation: "5 > 5 → false. 5 < 5 → false. Else prints '='.",
    },
    {
      id: "mcq-44",
      question: "What should you use for multi-way branching with conditions?",
      options: ["switch", "if-else-if ladder", "nested if-else", "All can work"],
      answer: 3,
      explanation: "All three can handle multi-way branching. if-else-if ladder is most readable for range conditions.",
    },
    {
      id: "mcq-45",
      question: `int x = 5;\nif (x > 0) {\n    if (x < 10) {\n        System.out.println("1-9");\n    }\n} else {\n    System.out.println("<=0");\n}`,
      options: ["1-9", "<=0", "Nothing", "Compilation error"],
      answer: 0,
      explanation: "5 > 0 → true. Inside: 5 < 10 → true. Prints '1-9'.",
    },
    {
      id: "mcq-46",
      question: `int x = 10;\nif (x == 10) {\n    System.out.print("A");\n}\nif (x > 5) {\n    System.out.print("B");\n} else {\n    System.out.print("C");\n}`,
      options: ["A", "AB", "ABC", "A C"],
      answer: 1,
      explanation: "First if: true, prints 'A'. Second if: true, prints 'B'. Else skipped. Output: 'AB'.",
    },
    {
      id: "mcq-47",
      question: "What is the result of `if (true) ; else ;`?",
      options: ["Does nothing", "Error", "Prints something", "Infinite loop"],
      answer: 0,
      explanation: "Both if and else have empty statements. The code does nothing.",
    },
    {
      id: "mcq-48",
      question: `int x = 0;\nint y = (x++ > 0) ? x : x + 10;\nSystem.out.println(y);`,
      options: ["0", "10", "11", "1"],
      answer: 2,
      explanation: "x++: compares 0 > 0 → false, then x becomes 1. Ternary returns x + 10 = 1 + 10 = 11.",
    },
    {
      id: "mcq-49",
      question: `char ch = 'b';\nif (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')\n    System.out.println("Vowel");\nelse\n    System.out.println("Consonant");`,
      options: ["Vowel", "Consonant", "Compilation error", "Nothing"],
      answer: 1,
      explanation: "'b' is not any of the vowels. Condition false. Else prints 'Consonant'.",
    },
    {
      id: "mcq-50",
      question: `int a = 5, b = 10;\nif (a < b) {\n    System.out.println("a < b");\n} else {\n    System.out.println("a >= b");\n}\nSystem.out.println("Done");`,
      options: ["a < b", "a < b\nDone", "a >= b\nDone", "Done"],
      answer: 1,
      explanation: "5 < 10 → true. Prints 'a < b'. Then 'Done' prints.",
    },
  ],

  // ==========================
  // SECTION 10: TRUE / FALSE (20)
  // ==========================
  trueFalse: [
    { id: "tf-1", question: "The else block is mandatory in an if-else statement.", answer: false, explanation: "If can exist without else. Else is optional." },
    { id: "tf-2", question: "An if statement can have multiple else blocks.", answer: false, explanation: "Only one else per if. Use else if for multiple conditions." },
    { id: "tf-3", question: "The else if construct must be written without space (elseif).", answer: false, explanation: "It's two words with space: `else if`." },
    { id: "tf-4", question: "In nested if-else, an else matches the nearest unmatched if by default.", answer: true, explanation: "This is the default binding rule in Java." },
    { id: "tf-5", question: "The ternary operator `? :` can replace any if-else statement.", answer: false, explanation: "Ternary is for expressions that return a value, not for statements without return value." },
    { id: "tf-6", question: "If the condition is true, both if and else blocks execute.", answer: false, explanation: "Only ONE block executes — either if or else, never both." },
    { id: "tf-7", question: "else cannot have its own condition in parentheses.", answer: true, explanation: "`else (condition)` is invalid. Use `else if (condition)` instead." },
    { id: "tf-8", question: "A semicolon after if(condition) creates an empty if body.", answer: true, explanation: "The semicolon acts as an empty statement for the if." },
    { id: "tf-9", question: "You can have if-else without any braces.", answer: false, explanation: "Braces are not mandatory for single statements, but are recommended." },
    { id: "tf-10", question: "The ternary operator has higher precedence than assignment.", answer: true, explanation: "Ternary evaluates before assignment in `x = (a>b) ? a : b`." },
    { id: "tf-11", question: "An else-if ladder can have unlimited else-if blocks.", answer: true, explanation: "No limit on number of else-if blocks." },
    { id: "tf-12", question: "An else-if ladder is more efficient than multiple if statements for mutually exclusive conditions.", answer: true, explanation: "Once a condition matches, remaining checks are skipped (short-circuit)." },
    { id: "tf-13", question: "The final else in a ladder is optional.", answer: true, explanation: "else-if ladder can end without a final else." },
    { id: "tf-14", question: "Nested if-else and else-if ladder are the same thing.", answer: false, explanation: "Nested means if-inside-if blocks. Else-if is a flat sequence of conditions." },
    { id: "tf-15", question: "`if (true) { } else { }` has dead code in the else block.", answer: true, explanation: "Since condition is always true, else never executes (dead code)." },
    { id: "tf-16", question: "Curly braces are needed for else if blocks with single statements.", answer: false, explanation: "Optional for single statements, but recommended for clarity." },
    { id: "tf-17", question: "A boolean variable can be used directly as the condition in if.", answer: true, explanation: "`if (flag)` is valid and preferred over `if (flag == true)`." },
    { id: "tf-18", question: "The ternary operator can be nested.", answer: true, explanation: "You can have `(a>b) ? ((a>c) ? a : c) : ((b>c) ? b : c)`." },
    { id: "tf-19", question: "Else must immediately follow the if block, with no other statements in between.", answer: true, explanation: "Any statement between if block and else causes a compilation error (dangling else)." },
    { id: "tf-20", question: "An if-else statement can be used inside a loop's body.", answer: true, explanation: "If-else can be placed inside any code block, including loops, methods, etc." },
  ],

  // ==========================
  // SECTION 11: SHORT ANSWER (20)
  // ==========================
  shortAnswerQuestions: [
    { id: "sa-1", question: "How does the if-else statement differ from a simple if statement?", answer: "Simple if only handles the true case. if-else handles both true and false cases — one block executes for true, a different block for false." },
    { id: "sa-2", question: "What is the dangling else problem?", answer: "In nested if statements, an else can match multiple ifs. Java matches else with the nearest unmatched if, which may not be the programmer's intent. Use braces to control binding." },
    { id: "sa-3", question: "What is an else-if ladder and when is it used?", answer: "An else-if ladder is a sequence of `if-else if-else if-else` that checks multiple conditions. It's used for multi-way branching where exactly one block executes." },
    { id: "sa-4", question: "Explain the ternary operator with an example.", answer: "The ternary operator `? :` is shorthand for if-else. Syntax: `variable = (condition) ? valueIfTrue : valueIfFalse`. Example: `int max = (a > b) ? a : b;`" },
    { id: "sa-5", question: "Can you use multiple else blocks with one if? Why or why not?", answer: "No. An if can have only one else. For multiple conditions, use else-if which chains multiple conditions." },
    { id: "sa-6", question: "What happens if you put a semicolon after if(condition) in an if-else?", answer: "The if becomes empty. The else then has no matching if (because the empty statement separates them), causing compilation error." },
    { id: "sa-7", question: "How does Java decide which else belongs to which if in nested structures?", answer: "Java's rule: an else always matches the nearest unmatched if statement. Curly braces can override this by creating explicit block boundaries." },
    { id: "sa-8", question: "What is the difference between `else if` and `else { if }`?", answer: "`else if` is a single construct that checks a new condition. `else { if }` uses nested if inside the else block, which allows further else chains inside." },
    { id: "sa-9", question: "Can you write if-else without curly braces?", answer: "Yes, when there is only a single statement in each block. However, always using braces is recommended for clarity." },
    { id: "sa-10", question: "What does `if (x = true)` do for boolean x?", answer: "It assigns true to x (not comparison). The assigned value (true) is used as condition. So the if always runs. This is bad practice — use `if (x)` instead." },
    { id: "sa-11", question: "What is the output of `int x = 5; if(x>5) x=10; else x=20; System.out.println(x);`?", answer: "20. x > 5 is false (5 > 5). Else runs: x = 20." },
    { id: "sa-12", question: "How do you convert an if-else to a ternary operator?", answer: "`if (c) { x = a; } else { x = b; }` becomes `x = (c) ? a : b;` The ternary operator returns a value that is assigned to the variable." },
    { id: "sa-13", question: "Why is else-if ladder more efficient than multiple ifs for the same condition?", answer: "Multiple ifs check all conditions regardless. Else-if stops after a match, skipping remaining checks." },
    { id: "sa-14", question: "What is the condition for a number to be divisible by both 3 and 5?", answer: "`if (num % 3 == 0 && num % 5 == 0)` or `if (num % 15 == 0)`." },
    { id: "sa-15", question: "Can you use a boolean method call as the condition in if-else?", answer: "Yes. Any expression returning boolean works: `if (str.isEmpty()) { ... } else { ... }`." },
    { id: "sa-16", question: "What does `if (x > 0) if (x < 10) System.out.println(\"OK\"); else System.out.println(\"X\"); else System.out.println(\"Y\");` do for x=15?", answer: "15 > 0 → true. 15 < 10 → false. Inner else prints 'X'. Outer else is skipped (outer if was true). Output: X." },
    { id: "sa-17", question: "What is the output: `int x = 3; if(++x > 3) System.out.println(x); else System.out.println(x);`", answer: "++x makes x=4. 4 > 3 → true. Prints '4'." },
    { id: "sa-18", question: "How does short-circuit evaluation affect else-if?", answer: "In else-if ladder, if a condition is true, subsequent else-if conditions are not evaluated at all (short-circuit)." },
    { id: "sa-19", question: "What is wrong with `if (x > 5) then System.out.println(\"X\"); else System.out.println(\"Y\");`?", answer: "Java does not use 'then' keyword. Remove 'then'." },
    { id: "sa-20", question: "What is the best way to check if a character is a vowel using if-else?", answer: "`if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' || ch == 'A' || ...)` — compare with each vowel using OR." },
  ],

  // ==========================
  // SECTION 12: LONG ANSWER (15)
  // ==========================
  longAnswerQuestions: [
    {
      id: "la-1",
      question: "Explain the syntax and execution flow of if-else with a detailed example.",
      answer: "Syntax: `if (condition) { // true block } else { // false block }`. Only ONE block executes. Example:\n```java\nint num = -5;\nif (num >= 0) {\n    System.out.println(\"Non-negative\");\n} else {\n    System.out.println(\"Negative\");\n}\n```\nExecution: num=-5. Check -5>=0 → false. Else block runs: prints 'Negative'. If block is completely skipped.",
    },
    {
      id: "la-2",
      question: "Explain the else-if ladder with a grade classification example.",
      answer: "The else-if ladder provides multi-way branching. Example:\n```java\nint marks = 85;\nif (marks >= 90) grade = \"A+\";\nelse if (marks >= 80) grade = \"A\";\nelse if (marks >= 70) grade = \"B\";\nelse if (marks >= 60) grade = \"C\";\nelse if (marks >= 50) grade = \"D\";\nelse grade = \"F\";\n```\nFlow: 85>=90? No. 85>=80? Yes. Prints 'A'. Remaining skipped. This is more efficient than 6 separate ifs.",
    },
    {
      id: "la-3",
      question: "What is the dangling else problem? Provide an example and explain how to fix it.",
      answer: "Dangling else occurs in nested ifs where an else can match multiple ifs.\n```java\n// Problematic: else matches inner if\nif (x > 0)\n    if (x > 10)\n        System.out.println(\">10\");\n    else\n        System.out.println(\"<=10?\"); // Does this belong to outer if?\n        \n// Fix with braces:\nif (x > 0) {\n    if (x > 10) {\n        System.out.println(\">10\");\n    }\n} else {\n    System.out.println(\"<=0\"); // Now clearly belongs to outer if\n}\n```\nBraces make the programmer's intent clear and unambiguous.",
    },
    {
      id: "la-4",
      question: "Compare the ternary operator with if-else. When would you use each?",
      answer: "Ternary: `variable = (condition) ? value1 : value2;` — returns a value in one line.\nIf-else: `if (c) { stmt; } else { stmt; }` — executes statements.\n\nUse ternary for simple assignments:\n```java\nint max = (a > b) ? a : b; // Clean one-liner\n```\n\nUse if-else for complex logic with multiple statements:\n```java\nif (a > b) {\n    max = a;\n    System.out.println(\"a is larger\");\n} else {\n    max = b;\n}\n```\n\nTernary cannot contain statements (only expressions). Nested ternaries are hard to read.",
    },
    {
      id: "la-5",
      question: "Write a program that uses nested if-else to find the largest of three numbers.",
      answer: "```java\nint a = 45, b = 23, c = 67;\nif (a > b) {\n    if (a > c) {\n        System.out.println(a + \" is largest\");\n    } else {\n        System.out.println(c + \" is largest\");\n    }\n} else {\n    if (b > c) {\n        System.out.println(b + \" is largest\");\n    } else {\n        System.out.println(c + \" is largest\");\n    }\n}\n```\nFlow: 45>23 → true. 45>67 → false. Inner else: c=67 is largest.",
    },
    {
      id: "la-6",
      question: "Write a program using if-else to calculate income tax. Slabs: <2.5L: 0%, 2.5L-5L: 5%, 5L-10L: 20%, >10L: 30%.",
      answer: "```java\ndouble income = 800000; // 8 lakhs\ndouble tax = 0;\nif (income <= 250000) {\n    tax = 0;\n} else if (income <= 500000) {\n    tax = (income - 250000) * 0.05;\n} else if (income <= 1000000) {\n    tax = 250000 * 0.05 + (income - 500000) * 0.20;\n} else {\n    tax = 250000 * 0.05 + 500000 * 0.20 + (income - 1000000) * 0.30;\n}\nSystem.out.println(\"Tax: Rs \" + tax);\n```\nOutput for 8L: Tax: Rs 72500 (12500 + 60000 = 72500)",
    },
    {
      id: "la-7",
      question: "Explain how to use nested if-else to validate a date (check day, month, year).",
      answer: "```java\nint d = 29, m = 2, y = 2024;\nboolean valid = true;\nif (m < 1 || m > 12) valid = false;\nelse if (d < 1 || d > 31) valid = false;\nelse if (m == 2) {\n    boolean leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);\n    if (leap && d > 29) valid = false;\n    else if (!leap && d > 28) valid = false;\n} else if ((m == 4 || m == 6 || m == 9 || m == 11) && d > 30) {\n    valid = false;\n}\nSystem.out.println(valid ? \"Valid\" : \"Invalid\");\n```\nThis validates dates considering leap years and month lengths.",
    },
    {
      id: "la-8",
      question: "What are common mistakes students make with if-else? Explain with examples.",
      answer: "1. Semicolon after if: `if(x>5); else ...` — compilation error (dangling else).\n2. else with condition: `else (x<10)` — invalid syntax.\n3. Missing braces: `if(x>5) x++; y++; else z++;` — y++ is between if and else → error.\n4. Using = instead of ==: `if(x=5)` — assignment instead of comparison.\n5. Wrong else binding in nesting: believing else matches outer if when it matches inner.\n6. Not covering all cases: else-if ladder without final else.\n7. Using == for Strings instead of .equals().",
    },
    {
      id: "la-9",
      question: "Write a program that uses if-else to determine the season based on month number: 3-5: Spring, 6-8: Summer, 9-11: Autumn, 12-2: Winter.",
      answer: "```java\nint month = 7;\nString season;\nif (month >= 3 && month <= 5)\n    season = \"Spring\";\nelse if (month >= 6 && month <= 8)\n    season = \"Summer\";\nelse if (month >= 9 && month <= 11)\n    season = \"Autumn\";\nelse if (month == 12 || month == 1 || month == 2)\n    season = \"Winter\";\nelse\n    season = \"Invalid month\";\nSystem.out.println(\"Season: \" + season);\n```\nOutput for month=7: Summer",
    },
    {
      id: "la-10",
      question: "Explain short-circuit evaluation in the context of if-else with side effects.",
      answer: "Short-circuit means Java stops evaluating logical expressions once the result is determined.\n```java\nint x = 5;\nif (x > 10 && ++x > 0) { } // ++x never runs (short-circuited)\nSystem.out.println(x); // 5\n\nif (x < 10 || ++x > 0) { } // ++x never runs (short-circuited)\nSystem.out.println(x); // 5\n```\nThis affects else-if too: once a condition matches, remaining else-if conditions are not evaluated.",
    },
    {
      id: "la-11",
      question: "Write a program that uses if-else to determine if three sides form a valid triangle and its type.",
      answer: "```java\nint a = 5, b = 5, c = 8;\nif (a + b > c && b + c > a && a + c > b) {\n    if (a == b && b == c)\n        System.out.println(\"Equilateral\");\n    else if (a == b || b == c || a == c)\n        System.out.println(\"Isosceles\");\n    else\n        System.out.println(\"Scalene\");\n} else {\n    System.out.println(\"Invalid triangle\");\n}\n```\nOutput: Isosceles. Two sides (5,5) are equal.",
    },
    {
      id: "la-12",
      question: "How does Java handle the scenario where a variable is assigned in both if and else blocks? Explain with example.",
      answer: "If a variable is assigned in both branches, it's guaranteed to be initialized:\n```java\nint x; // Not initialized\nif (condition) {\n    x = 10;\n} else {\n    x = 20;\n}\nSystem.out.println(x); // OK — x is always initialized\n```\nBut if only one branch assigns:\n```java\nint x;\nif (condition) {\n    x = 10;\n} // No else\nSystem.out.println(x); // ERROR! x might not be initialized\n```\nJava requires definite assignment — if a path exists where x isn't assigned, compilation fails.",
    },
    {
      id: "la-13",
      question: "Write a complete Java program that uses if-else to calculate BMI and categorize: <18.5 Underweight, 18.5-24.9 Normal, 25-29.9 Overweight, 30+ Obese.",
      answer: "```java\ndouble w = 70, h = 1.75;\ndouble bmi = w / (h * h);\nString cat;\nif (bmi < 18.5)\n    cat = \"Underweight\";\nelse if (bmi < 25)\n    cat = \"Normal\";\nelse if (bmi < 30)\n    cat = \"Overweight\";\nelse\n    cat = \"Obese\";\nSystem.out.println(\"BMI: \" + bmi + \", Category: \" + cat);\n```\nNote: Order matters here. Checking bmi < 25 already excludes <18.5.",
    },
    {
      id: "la-14",
      question: "Compare and contrast: multiple if statements vs if-else-if ladder vs nested if-else.",
      answer: "Multiple ifs: All conditions checked independently. Multiple blocks can execute. Use for independent checks.\nIf-else-if ladder: One condition checked at a time. Stops at first true. Use for mutually exclusive conditions.\nNested if-else: If inside if blocks. Allows hierarchical decision-making. Use for multi-level conditions.\n\nExample — multiple ifs:\n```java\nif (sunday) rest();\nif (birthday) celebrate(); // Both could run\n```\n\nElse-if ladder:\n```java\nif (marks >= 90) grade='A';\nelse if (marks >= 80) grade='B'; // Only one runs\n```\n\nNested:\n```java\nif (age >= 18) {\n    if (hasLicense) drive();\n    else learn();\n} else minor();\n```",
    },
    {
      id: "la-15",
      question: "Trace the execution of this code and explain the output:\n\nint x = 5, y = 10, z = 15;\nif (x > y)\n    if (x > z)\n        System.out.println(\"x max\");\n    else\n        System.out.println(\"z max\");\nelse\n    if (y > z)\n        System.out.println(\"y max\");\n    else\n        System.out.println(\"z max\");\nSystem.out.println(\"Done\");",
      answer: "Step-by-step:\n1. x=5, y=10, z=15.\n2. x > y → 5 > 10 → false. Outer else runs.\n3. Inside else: y > z → 10 > 15 → false. Inner else prints 'z max'.\n4. After outer if-else: prints 'Done'.\n\nOutput:\nz max\nDone",
    },
  ],

  // ==========================
  // SECTION 13: PROGRAMMING QUESTIONS
  // ==========================
  programmingQuestions: {
    easy: [
      {
        id: "pg-e-1",
        question: "Write a program to check if a number is even or odd using if-else.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        if (num % 2 == 0)
            System.out.println(num + " is even.");
        else
            System.out.println(num + " is odd.");
        sc.close();
    }
}`,
        output: "Enter number: 7\n7 is odd.",
      },
      {
        id: "pg-e-2",
        question: "Write a program to check if a person is eligible to vote (age >= 18) using if-else.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter age: ");
        int age = sc.nextInt();
        if (age >= 18)
            System.out.println("Eligible to vote.");
        else
            System.out.println("Not eligible to vote.");
        sc.close();
    }
}`,
        output: "Enter age: 16\nNot eligible to vote.",
      },
      {
        id: "pg-e-3",
        question: "Write a program to check if a character is a vowel or consonant using if-else.",
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
        output: "Enter a character: E\ne is a vowel.",
      },
      {
        id: "pg-e-4",
        question: "Write a program to find the maximum of two numbers using if-else.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt(), b = sc.nextInt();
        if (a > b)
            System.out.println(a + " is larger.");
        else
            System.out.println(b + " is larger.");
        sc.close();
    }
}`,
        output: "Enter two numbers: 45 23\n45 is larger.",
      },
      {
        id: "pg-e-5",
        question: "Write a program to check if a number is positive, negative, or zero using if-else.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        if (num > 0)
            System.out.println("Positive");
        else if (num < 0)
            System.out.println("Negative");
        else
            System.out.println("Zero");
        sc.close();
    }
}`,
        output: "Enter a number: -5\nNegative",
      },
      {
        id: "pg-e-6",
        question: "Write a program to check if a year is a leap year (simplified: divisible by 4).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter year: ");
        int year = sc.nextInt();
        if (year % 4 == 0)
            System.out.println(year + " is a leap year.");
        else
            System.out.println(year + " is not a leap year.");
        sc.close();
    }
}`,
        output: "Enter year: 2025\n2025 is not a leap year.",
      },
      {
        id: "pg-e-7",
        question: "Write a program to check if a number is divisible by both 3 and 5.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        if (num % 3 == 0 && num % 5 == 0)
            System.out.println(num + " is divisible by both 3 and 5.");
        else
            System.out.println(num + " is not divisible by both 3 and 5.");
        sc.close();
    }
}`,
        output: "Enter number: 15\n15 is divisible by both 3 and 5.",
      },
      {
        id: "pg-e-8",
        question: "Write a program to check if a character is uppercase or lowercase.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);
        if (ch >= 'A' && ch <= 'Z')
            System.out.println(ch + " is uppercase.");
        else if (ch >= 'a' && ch <= 'z')
            System.out.println(ch + " is lowercase.");
        else
            System.out.println(ch + " is not a letter.");
        sc.close();
    }
}`,
        output: "Enter a character: M\nM is uppercase.",
      },
      {
        id: "pg-e-9",
        question: "Write a program to check if a number is a single-digit number (0-9).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        if (num >= 0 && num <= 9)
            System.out.println(num + " is a single-digit number.");
        else
            System.out.println(num + " is not a single-digit number.");
        sc.close();
    }
}`,
        output: "Enter a number: 7\n7 is a single-digit number.",
      },
      {
        id: "pg-e-10",
        question: "Write a program to check if a number is a multiple of 7.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        if (num % 7 == 0)
            System.out.println(num + " is a multiple of 7.");
        else
            System.out.println(num + " is not a multiple of 7.");
        sc.close();
    }
}`,
        output: "Enter number: 21\n21 is a multiple of 7.",
      },
      {
        id: "pg-e-11",
        question: "Write a program to check if a number is between 10 and 20 (inclusive).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        if (num >= 10 && num <= 20)
            System.out.println(num + " is between 10 and 20.");
        else
            System.out.println(num + " is outside the range.");
        sc.close();
    }
}`,
        output: "Enter number: 15\n15 is between 10 and 20.",
      },
      {
        id: "pg-e-12",
        question: "Write a program to check if a number is a perfect square (1, 4, 9, 16, 25).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        int sqrt = (int) Math.sqrt(num);
        if (sqrt * sqrt == num)
            System.out.println(num + " is a perfect square.");
        else
            System.out.println(num + " is not a perfect square.");
        sc.close();
    }
}`,
        output: "Enter number: 25\n25 is a perfect square.",
      },
      {
        id: "pg-e-13",
        question: "Write a program to check if a number is a multiple of both 2 and 3.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();
        if (num % 2 == 0 && num % 3 == 0)
            System.out.println(num + " is a multiple of both 2 and 3.");
        else
            System.out.println(num + " is not a multiple of both 2 and 3.");
        sc.close();
    }
}`,
        output: "Enter number: 12\n12 is a multiple of both 2 and 3.",
      },
      {
        id: "pg-e-14",
        question: "Write a program to check if a person is a senior citizen (age >= 60).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter age: ");
        int age = sc.nextInt();
        if (age >= 60)
            System.out.println("Senior citizen.");
        else
            System.out.println("Not a senior citizen.");
        sc.close();
    }
}`,
        output: "Enter age: 65\nSenior citizen.",
      },
      {
        id: "pg-e-15",
        question: "Write a program to check if a character is a digit ('0'-'9').",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);
        if (ch >= '0' && ch <= '9')
            System.out.println(ch + " is a digit.");
        else
            System.out.println(ch + " is not a digit.");
        sc.close();
    }
}`,
        output: "Enter a character: 7\n7 is a digit.",
      },
    ],
    medium: [
      {
        id: "pg-m-1",
        question: "Write a program to find the largest of three numbers using if-else.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three numbers: ");
        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        if (a > b && a > c)
            System.out.println(a + " is largest.");
        else if (b > c)
            System.out.println(b + " is largest.");
        else
            System.out.println(c + " is largest.");
        sc.close();
    }
}`,
        output: "Enter three numbers: 45 23 67\n67 is largest.",
      },
      {
        id: "pg-m-2",
        question: "Write a program to calculate discount: >10000 20%, 5001-10000 10%, <=5000 5%.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter amount: ");
        double amt = sc.nextDouble();
        double disc;
        if (amt > 10000) disc = amt * 0.2;
        else if (amt > 5000) disc = amt * 0.1;
        else disc = amt * 0.05;
        System.out.println("Discount: Rs " + disc);
        System.out.println("Payable: Rs " + (amt - disc));
        sc.close();
    }
}`,
        output: "Enter amount: 12000\nDiscount: Rs 2400.0\nPayable: Rs 9600.0",
      },
      {
        id: "pg-m-3",
        question: "Write a program to calculate grade: >=90 A, >=80 B, >=70 C, >=60 D, >=50 E, else F.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter marks: ");
        int m = sc.nextInt();
        char grade;
        if (m >= 90) grade = 'A';
        else if (m >= 80) grade = 'B';
        else if (m >= 70) grade = 'C';
        else if (m >= 60) grade = 'D';
        else if (m >= 50) grade = 'E';
        else grade = 'F';
        System.out.println("Grade: " + grade);
        sc.close();
    }
}`,
        output: "Enter marks: 85\nGrade: B",
      },
      {
        id: "pg-m-4",
        question: "Write a program to check if a year is a leap year (full logic: divisible by 400, or divisible by 4 but not 100).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter year: ");
        int y = sc.nextInt();
        if ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0))
            System.out.println(y + " is a leap year.");
        else
            System.out.println(y + " is not a leap year.");
        sc.close();
    }
}`,
        output: "Enter year: 1900\n1900 is not a leap year.",
      },
      {
        id: "pg-m-5",
        question: "Write a program to find the smallest of three numbers using nested if-else.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three numbers: ");
        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        int min;
        if (a < b) {
            if (a < c) min = a;
            else min = c;
        } else {
            if (b < c) min = b;
            else min = c;
        }
        System.out.println("Smallest: " + min);
        sc.close();
    }
}`,
        output: "Enter three numbers: 45 23 67\nSmallest: 23",
      },
      {
        id: "pg-m-6",
        question: "Write a program to check if a triangle is valid and classify it (equilateral, isosceles, scalene).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three sides: ");
        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        if (a + b > c && b + c > a && a + c > b) {
            if (a == b && b == c)
                System.out.println("Equilateral");
            else if (a == b || b == c || a == c)
                System.out.println("Isosceles");
            else
                System.out.println("Scalene");
        } else {
            System.out.println("Invalid triangle");
        }
        sc.close();
    }
}`,
        output: "Enter three sides: 5 5 8\nIsosceles",
      },
      {
        id: "pg-m-7",
        question: "Write a program to calculate the roots of a quadratic equation and determine their nature.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a, b, c: ");
        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        int d = b * b - 4 * a * c;
        if (d > 0) {
            double r1 = (-b + Math.sqrt(d)) / (2.0 * a);
            double r2 = (-b - Math.sqrt(d)) / (2.0 * a);
            System.out.println("Real & distinct: " + r1 + ", " + r2);
        } else if (d == 0) {
            double r = -b / (2.0 * a);
            System.out.println("Real & equal: " + r);
        } else {
            System.out.println("Imaginary roots");
        }
        sc.close();
    }
}`,
        output: "Enter a, b, c: 1 -5 6\nReal & distinct: 3.0, 2.0",
      },
      {
        id: "pg-m-8",
        question: "Write a program to calculate electricity bill: 0-100 units Rs 4/unit, 101-300 Rs 6/unit, >300 Rs 8/unit.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter units: ");
        int u = sc.nextInt();
        double bill;
        if (u <= 100) bill = u * 4.0;
        else if (u <= 300) bill = 100*4 + (u-100)*6.0;
        else bill = 100*4 + 200*6.0 + (u-300)*8.0;
        System.out.println("Bill: Rs " + bill);
        sc.close();
    }
}`,
        output: "Enter units: 250\nBill: Rs 1300.0",
      },
      {
        id: "pg-m-9",
        question: "Write a program to check if a character is a vowel, consonant, digit, or special character.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);
        if (ch >= 'A' && ch <= 'Z') ch = (char)(ch + 32);
        if (ch >= 'a' && ch <= 'z') {
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
                System.out.println("Vowel");
            else
                System.out.println("Consonant");
        } else if (ch >= '0' && ch <= '9')
            System.out.println("Digit");
        else
            System.out.println("Special character");
        sc.close();
    }
}`,
        output: "Enter a character: @\nSpecial character",
      },
      {
        id: "pg-m-10",
        question: "Write a program to determine the season based on month number (3-5: Spring, 6-8: Summer, 9-11: Autumn, 12-2: Winter).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter month (1-12): ");
        int m = sc.nextInt();
        String season;
        if (m >= 3 && m <= 5) season = "Spring";
        else if (m >= 6 && m <= 8) season = "Summer";
        else if (m >= 9 && m <= 11) season = "Autumn";
        else if (m == 12 || m == 1 || m == 2) season = "Winter";
        else season = "Invalid";
        System.out.println("Season: " + season);
        sc.close();
    }
}`,
        output: "Enter month (1-12): 7\nSeason: Summer",
      },
      {
        id: "pg-m-11",
        question: "Write a program to calculate income tax: <2.5L: 0%, 2.5L-5L: 5%, 5L-10L: 20%, >10L: 30%.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter income: ");
        double inc = sc.nextDouble();
        double tax = 0;
        if (inc <= 250000) tax = 0;
        else if (inc <= 500000) tax = (inc - 250000) * 0.05;
        else if (inc <= 1000000) tax = 250000*0.05 + (inc-500000)*0.20;
        else tax = 250000*0.05 + 500000*0.20 + (inc-1000000)*0.30;
        System.out.println("Tax: Rs " + tax);
        sc.close();
    }
}`,
        output: "Enter income: 850000\nTax: Rs 82500.0",
      },
      {
        id: "pg-m-12",
        question: "Write a program to check if a date (day, month, year) is valid.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter date (dd mm yyyy): ");
        int d = sc.nextInt(), m = sc.nextInt(), y = sc.nextInt();
        boolean valid = true;
        if (m < 1 || m > 12) valid = false;
        else if (d < 1 || d > 31) valid = false;
        else if (m == 2) {
            boolean leap = (y%400==0) || (y%4==0 && y%100!=0);
            if (leap && d > 29) valid = false;
            else if (!leap && d > 28) valid = false;
        } else if ((m==4||m==6||m==9||m==11) && d>30) valid = false;
        System.out.println(valid ? "Valid date" : "Invalid date");
        sc.close();
    }
}`,
        output: "Enter date (dd mm yyyy): 29 2 2024\nValid date",
      },
      {
        id: "pg-m-13",
        question: "Write a program to calculate BMI and categorize: <18.5 Underweight, 18.5-24.9 Normal, 25-29.9 Overweight, 30+ Obese.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter weight (kg) and height (m): ");
        double w = sc.nextDouble(), h = sc.nextDouble();
        double bmi = w / (h * h);
        String cat;
        if (bmi < 18.5) cat = "Underweight";
        else if (bmi < 25) cat = "Normal";
        else if (bmi < 30) cat = "Overweight";
        else cat = "Obese";
        System.out.println("BMI: " + String.format("%.1f", bmi));
        System.out.println("Category: " + cat);
        sc.close();
    }
}`,
        output: "Enter weight (kg) and height (m): 70 1.75\nBMI: 22.9\nCategory: Normal",
      },
      {
        id: "pg-m-14",
        question: "Write a program to check if a number is a palindrome (two-digit number only).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a two-digit number: ");
        int n = sc.nextInt();
        if (n >= 10 && n <= 99) {
            int rev = (n % 10) * 10 + (n / 10);
            if (n == rev)
                System.out.println(n + " is a palindrome.");
            else
                System.out.println(n + " is not a palindrome.");
        } else {
            System.out.println("Not a two-digit number.");
        }
        sc.close();
    }
}`,
        output: "Enter a two-digit number: 77\n77 is a palindrome.",
      },
      {
        id: "pg-m-15",
        question: "Write a program to calculate employee bonus: >10 years 30%, >5 years 20%, >2 years 10%, else 5%.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter years of service and salary: ");
        int yrs = sc.nextInt();
        double sal = sc.nextDouble();
        double bonus;
        if (yrs > 10) bonus = sal * 0.30;
        else if (yrs > 5) bonus = sal * 0.20;
        else if (yrs > 2) bonus = sal * 0.10;
        else bonus = sal * 0.05;
        System.out.println("Bonus: Rs " + bonus);
        System.out.println("Total: Rs " + (sal + bonus));
        sc.close();
    }
}`,
        output: "Enter years of service and salary: 7 50000\nBonus: Rs 10000.0\nTotal: Rs 60000.0",
      },
    ],
    hard: [
      {
        id: "pg-h-1",
        question: "Write a program to calculate electricity bill with surcharge: 0-100 Rs 4/unit, 101-300 Rs 6/unit, >300 Rs 8/unit. Add 15% surcharge if bill > 1000.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter units: ");
        int u = sc.nextInt();
        double bill;
        if (u <= 100) bill = u * 4.0;
        else if (u <= 300) bill = 100*4 + (u-100)*6.0;
        else bill = 100*4 + 200*6.0 + (u-300)*8.0;
        double surcharge = (bill > 1000) ? bill * 0.15 : 0;
        System.out.println("Bill: Rs " + bill);
        System.out.println("Surcharge: Rs " + surcharge);
        System.out.println("Total: Rs " + (bill + surcharge));
        sc.close();
    }
}`,
        output: "Enter units: 250\nBill: Rs 1300.0\nSurcharge: Rs 195.0\nTotal: Rs 1495.0",
      },
      {
        id: "pg-h-2",
        question: "Write a program to implement a simple calculator (+, -, *, /) using if-else with division by zero check.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers and operator: ");
        double a = sc.nextDouble(), b = sc.nextDouble();
        char op = sc.next().charAt(0);
        double r;
        if (op == '+') r = a + b;
        else if (op == '-') r = a - b;
        else if (op == '*') r = a * b;
        else if (op == '/') {
            if (b != 0) r = a / b;
            else { System.out.println("Error: Division by zero"); return; }
        } else { System.out.println("Invalid operator"); return; }
        System.out.println(a + " " + op + " " + b + " = " + r);
        sc.close();
    }
}`,
        output: "Enter two numbers and operator: 20 4 /\n20.0 / 4.0 = 5.0",
      },
      {
        id: "pg-h-3",
        question: "Write a program to determine the type of triangle and also calculate its area using Heron's formula.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three sides: ");
        double a = sc.nextDouble(), b = sc.nextDouble(), c = sc.nextDouble();
        if (a + b > c && b + c > a && a + c > b) {
            double s = (a + b + c) / 2;
            double area = Math.sqrt(s * (s-a) * (s-b) * (s-c));
            String type;
            if (a == b && b == c) type = "Equilateral";
            else if (a == b || b == c || a == c) type = "Isosceles";
            else type = "Scalene";
            System.out.println("Type: " + type);
            System.out.println("Area: " + String.format("%.2f", area));
        } else {
            System.out.println("Invalid triangle");
        }
        sc.close();
    }
}`,
        output: "Enter three sides: 5 5 8\nType: Isosceles\nArea: 12.00",
      },
      {
        id: "pg-h-4",
        question: "Write a program to implement ATM withdrawal with multiple validations: amount > 0, sufficient balance, multiples of 100, daily limit 10000.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double balance = 5000;
        System.out.print("Enter withdrawal amount: ");
        double amt = sc.nextDouble();
        if (amt <= 0)
            System.out.println("Invalid amount.");
        else if (amt > balance)
            System.out.println("Insufficient balance.");
        else if (amt % 100 != 0)
            System.out.println("Must be multiples of 100.");
        else if (amt > 10000)
            System.out.println("Daily limit exceeded.");
        else {
            balance -= amt;
            System.out.println("Withdrawal successful.");
            System.out.println("Balance: Rs " + balance);
        }
        sc.close();
    }
}`,
        output: "Enter withdrawal amount: 4500\nWithdrawal successful.\nBalance: Rs 500.0",
      },
      {
        id: "pg-h-5",
        question: "Write a program to check if a number is a perfect number (sum of proper divisors equals the number).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        int sum = 0;
        for (int i = 1; i < n; i++) {
            if (n % i == 0) sum += i;
        }
        if (sum == n)
            System.out.println(n + " is a perfect number.");
        else
            System.out.println(n + " is not a perfect number.");
        sc.close();
    }
}`,
        output: "Enter a number: 28\n28 is a perfect number.",
      },
      {
        id: "pg-h-6",
        question: "Write a program to check if a number is an Armstrong number (sum of cubes of digits equals the number).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a three-digit number: ");
        int n = sc.nextInt();
        int temp = n, sum = 0;
        while (temp > 0) {
            int d = temp % 10;
            sum += d * d * d;
            temp /= 10;
        }
        if (sum == n)
            System.out.println(n + " is an Armstrong number.");
        else
            System.out.println(n + " is not an Armstrong number.");
        sc.close();
    }
}`,
        output: "Enter a three-digit number: 153\n153 is an Armstrong number.",
      },
      {
        id: "pg-h-7",
        question: "Write a program to determine the zodiac sign based on day and month.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter birth date (dd mm): ");
        int d = sc.nextInt(), m = sc.nextInt();
        String sign;
        if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) sign = "Aries";
        else if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) sign = "Taurus";
        else if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) sign = "Gemini";
        else if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) sign = "Cancer";
        else if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) sign = "Leo";
        else if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) sign = "Virgo";
        else if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) sign = "Libra";
        else if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) sign = "Scorpio";
        else if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) sign = "Sagittarius";
        else if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) sign = "Capricorn";
        else if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) sign = "Aquarius";
        else sign = "Pisces";
        System.out.println("Zodiac: " + sign);
        sc.close();
    }
}`,
        output: "Enter birth date (dd mm): 15 8\nZodiac: Leo",
      },
      {
        id: "pg-h-8",
        question: "Write a program to calculate the grade of a student with marks in 5 subjects and determine pass/fail (pass >= 40 in each).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter marks in 5 subjects: ");
        int m1 = sc.nextInt(), m2 = sc.nextInt(), m3 = sc.nextInt();
        int m4 = sc.nextInt(), m5 = sc.nextInt();
        if (m1 < 40 || m2 < 40 || m3 < 40 || m4 < 40 || m5 < 40) {
            System.out.println("Result: Fail");
        } else {
            int total = m1 + m2 + m3 + m4 + m5;
            double avg = total / 5.0;
            String grade;
            if (avg >= 90) grade = "A+";
            else if (avg >= 80) grade = "A";
            else if (avg >= 70) grade = "B";
            else if (avg >= 60) grade = "C";
            else if (avg >= 50) grade = "D";
            else grade = "E";
            System.out.println("Total: " + total);
            System.out.println("Average: " + String.format("%.1f", avg));
            System.out.println("Grade: " + grade);
        }
        sc.close();
    }
}`,
        output: "Enter marks in 5 subjects: 85 90 78 92 88\nTotal: 433\nAverage: 86.6\nGrade: A",
      },
      {
        id: "pg-h-9",
        question: "Write a program to implement a Rock-Paper-Scissors game using if-else.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Player 1 (rock/paper/scissors): ");
        String p1 = sc.next().toLowerCase();
        System.out.print("Player 2 (rock/paper/scissors): ");
        String p2 = sc.next().toLowerCase();
        if (p1.equals(p2))
            System.out.println("Draw");
        else if (p1.equals("rock") && p2.equals("scissors"))
            System.out.println("Player 1 wins");
        else if (p1.equals("rock") && p2.equals("paper"))
            System.out.println("Player 2 wins");
        else if (p1.equals("paper") && p2.equals("rock"))
            System.out.println("Player 1 wins");
        else if (p1.equals("paper") && p2.equals("scissors"))
            System.out.println("Player 2 wins");
        else if (p1.equals("scissors") && p2.equals("paper"))
            System.out.println("Player 1 wins");
        else if (p1.equals("scissors") && p2.equals("rock"))
            System.out.println("Player 2 wins");
        else
            System.out.println("Invalid input");
        sc.close();
    }
}`,
        output: "Player 1 (rock/paper/scissors): rock\nPlayer 2 (rock/paper/scissors): scissors\nPlayer 1 wins",
      },
      {
        id: "pg-h-10",
        question: "Write a program to check if a given point (x, y) lies on the x-axis, y-axis, or origin.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter coordinates (x y): ");
        int x = sc.nextInt(), y = sc.nextInt();
        if (x == 0 && y == 0)
            System.out.println("Origin");
        else if (x == 0)
            System.out.println("On Y-axis");
        else if (y == 0)
            System.out.println("On X-axis");
        else if (x > 0 && y > 0)
            System.out.println("Quadrant I");
        else if (x < 0 && y > 0)
            System.out.println("Quadrant II");
        else if (x < 0 && y < 0)
            System.out.println("Quadrant III");
        else
            System.out.println("Quadrant IV");
        sc.close();
    }
}`,
        output: "Enter coordinates (x y): 0 5\nOn Y-axis",
      },
      {
        id: "pg-h-11",
        question: "Write a program to calculate the number of days in a given month considering leap year.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter month and year: ");
        int m = sc.nextInt(), y = sc.nextInt();
        int days;
        if (m == 2) {
            boolean leap = (y%400==0) || (y%4==0 && y%100!=0);
            days = leap ? 29 : 28;
        } else if (m == 4 || m == 6 || m == 9 || m == 11) {
            days = 30;
        } else if (m >= 1 && m <= 12) {
            days = 31;
        } else {
            System.out.println("Invalid month");
            return;
        }
        System.out.println("Days: " + days);
        sc.close();
    }
}`,
        output: "Enter month and year: 2 2024\nDays: 29",
      },
      {
        id: "pg-h-12",
        question: "Write a program to check if three numbers can form a Pythagorean triplet (a^2 + b^2 = c^2).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three numbers: ");
        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        int max = a, x = b, y = c;
        if (b > max) { max = b; x = a; y = c; }
        if (c > max) { max = c; x = a; y = b; }
        if (x * x + y * y == max * max)
            System.out.println("Pythagorean triplet");
        else
            System.out.println("Not a Pythagorean triplet");
        sc.close();
    }
}`,
        output: "Enter three numbers: 3 4 5\nPythagorean triplet",
      },
      {
        id: "pg-h-13",
        question: "Write a program to determine if a character is a vowel using switch-case (for comparison with if-else).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a character: ");
        char ch = sc.next().toLowerCase().charAt(0);
        boolean isVowel = false;
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
            isVowel = true;
        if (isVowel)
            System.out.println(ch + " is a vowel.");
        else if (ch >= 'a' && ch <= 'z')
            System.out.println(ch + " is a consonant.");
        else
            System.out.println(ch + " is not a letter.");
        sc.close();
    }
}`,
        output: "Enter a character: a\na is a vowel.",
      },
      {
        id: "pg-h-14",
        question: "Write a program to calculate the final price after applying multiple discounts: if amount > 5000, 10% discount; if amount > 10000, additional 5% on discounted price.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter amount: ");
        double amt = sc.nextDouble();
        double disc = 0;
        if (amt > 10000) {
            disc = amt * 0.10;
            disc += (amt - disc) * 0.05;
        } else if (amt > 5000) {
            disc = amt * 0.10;
        }
        double finalAmt = amt - disc;
        System.out.println("Original: Rs " + amt);
        System.out.println("Discount: Rs " + disc);
        System.out.println("Payable: Rs " + finalAmt);
        sc.close();
    }
}`,
        output: "Enter amount: 12000\nOriginal: Rs 12000.0\nDiscount: Rs 1740.0\nPayable: Rs 10260.0",
      },
      {
        id: "pg-h-15",
        question: "Write a program to implement a number guessing game (generate a number, user guesses, provide feedback).",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int secret = 42;
        System.out.print("Guess a number (1-100): ");
        int guess = sc.nextInt();
        if (guess < 1 || guess > 100)
            System.out.println("Out of range.");
        else if (guess == secret)
            System.out.println("Correct! You win!");
        else if (guess > secret)
            System.out.println("Too high! Secret was " + secret);
        else
            System.out.println("Too low! Secret was " + secret);
        sc.close();
    }
}`,
        output: "Guess a number (1-100): 50\nToo high! Secret was 42",
      },
    ],
  },

  // ==========================
  // SECTION 14: CHALLENGE PROBLEMS (10)
  // ==========================
  challengeProblems: [
    {
      id: "cp-1",
      title: "Rock-Paper-Scissors with Validation",
      question: "Write a program that accepts two players' choices (rock/paper/scissors) and determines the winner using if-else only. Validate inputs and handle case insensitivity.",
      solution: `String p1 = "rock", p2 = "scissors";
p1 = p1.toLowerCase();
p2 = p2.toLowerCase();
if (!p1.matches("rock|paper|scissors") || !p2.matches("rock|paper|scissors"))
    System.out.println("Invalid input");
else if (p1.equals(p2))
    System.out.println("Draw");
else if (p1.equals("rock") && p2.equals("scissors"))
    System.out.println("P1 wins");
else if (p1.equals("rock") && p2.equals("paper"))
    System.out.println("P2 wins");
else if (p1.equals("paper") && p2.equals("rock"))
    System.out.println("P1 wins");
else if (p1.equals("paper") && p2.equals("scissors"))
    System.out.println("P2 wins");
else if (p1.equals("scissors") && p2.equals("paper"))
    System.out.println("P1 wins");
else
    System.out.println("P2 wins");`,
    },
    {
      id: "cp-2",
      title: "Calculator with if-else",
      question: "Write a calculator that accepts two numbers and an operator (+, -, *, /, %) and performs the operation using if-else. Handle division by zero and invalid operators.",
      solution: `int a = 20, b = 4; char op = '/'; double r;
if (op == '+') r = a + b;
else if (op == '-') r = a - b;
else if (op == '*') r = a * b;
else if (op == '/') {
    if (b != 0) r = (double)a / b;
    else { System.out.println("Error"); return; }
} else if (op == '%') {
    if (b != 0) r = a % b;
    else { System.out.println("Error"); return; }
} else { System.out.println("Invalid op"); return; }
System.out.println(a + " " + op + " " + b + " = " + r);`,
    },
    {
      id: "cp-3",
      title: "Date Difference Calculator",
      question: "Write a program that takes two dates (day, month) and calculates the number of days between them within the same year.",
      solution: `int d1=15, m1=3, d2=20, m2=3;
int daysInMonth[] = {31,28,31,30,31,30,31,31,30,31,30,31};
int days1 = 0, days2 = 0;
for (int i = 0; i < m1-1; i++) days1 += daysInMonth[i];
days1 += d1;
for (int i = 0; i < m2-1; i++) days2 += daysInMonth[i];
days2 += d2;
int diff = (days2 > days1) ? days2 - days1 : days1 - days2;
System.out.println("Difference: " + diff + " days");`,
    },
    {
      id: "cp-4",
      title: "Traffic Light System",
      question: "Write a program that simulates a traffic light. Input a color (red/yellow/green) and output the action (stop/ready/go) and the next light color.",
      solution: `String light = "red";
if (light.equals("red")) {
    System.out.println("Stop. Next: green");
} else if (light.equals("green")) {
    System.out.println("Go. Next: yellow");
} else if (light.equals("yellow")) {
    System.out.println("Ready. Next: red");
} else {
    System.out.println("Invalid light");
}`,
    },
    {
      id: "cp-5",
      title: "Number to Words (1-10)",
      question: "Write a program that converts a number (1-10) to its word form using if-else only.",
      solution: `int n = 7;
String word;
if (n == 1) word = "One";
else if (n == 2) word = "Two";
else if (n == 3) word = "Three";
else if (n == 4) word = "Four";
else if (n == 5) word = "Five";
else if (n == 6) word = "Six";
else if (n == 7) word = "Seven";
else if (n == 8) word = "Eight";
else if (n == 9) word = "Nine";
else if (n == 10) word = "Ten";
else word = "Out of range";
System.out.println(word);`,
    },
    {
      id: "cp-6",
      title: "Scholarship Eligibility",
      question: "Write a program to determine scholarship eligibility: marks > 90 AND family income < 2L: 50% scholarship; marks > 75 AND income < 2L: 30%; marks > 90 AND income >= 2L: 20%; else no scholarship.",
      solution: `int marks = 92;
double income = 150000;
if (marks > 90 && income < 200000)
    System.out.println("50% scholarship");
else if (marks > 75 && income < 200000)
    System.out.println("30% scholarship");
else if (marks > 90)
    System.out.println("20% scholarship");
else
    System.out.println("No scholarship");`,
    },
    {
      id: "cp-7",
      title: "Train Ticket Pricing",
      question: "Write a program to calculate train fare: base fare Rs 100. Children (<5) free, children (5-12) 50%, senior citizens (>=60) 25% off, rest full fare.",
      solution: `int age = 35;
double baseFare = 100;
double fare;
if (age < 5) fare = 0;
else if (age <= 12) fare = baseFare * 0.5;
else if (age >= 60) fare = baseFare * 0.75;
else fare = baseFare;
System.out.println("Fare: Rs " + fare);`,
    },
    {
      id: "cp-8",
      title: "Water Bill Calculator",
      question: "Write a program to calculate water bill: 0-10 KL: Rs 5/KL, 11-20 KL: Rs 8/KL, 21-30 KL: Rs 12/KL, >30 KL: Rs 20/KL. Minimum bill Rs 50.",
      solution: `int usage = 25;
double bill;
if (usage <= 10) bill = usage * 5;
else if (usage <= 20) bill = 10*5 + (usage-10)*8;
else if (usage <= 30) bill = 10*5 + 10*8 + (usage-20)*12;
else bill = 10*5 + 10*8 + 10*12 + (usage-30)*20;
if (bill < 50) bill = 50;
System.out.println("Bill: Rs " + bill);`,
    },
    {
      id: "cp-9",
      title: "Exam Seat Allocation",
      question: "Write a program that allocates exam seats based on roll number: if roll is even, seat in Room A; if odd, Room B. If roll > 60, also provide extra time.",
      solution: `int roll = 45;
if (roll % 2 == 0)
    System.out.print("Room A. ");
else
    System.out.print("Room B. ");
if (roll > 60)
    System.out.println("Extra time granted.");
else
    System.out.println("Regular time.");`,
    },
    {
      id: "cp-10",
      title: "Hospital Admission Priority",
      question: "Write a program to determine hospital admission priority: emergency (critical) gets immediate, serious gets priority, moderate gets normal, mild can wait.",
      solution: `String condition = "serious";
if (condition.equals("critical"))
    System.out.println("Immediate admission");
else if (condition.equals("serious"))
    System.out.println("Priority admission");
else if (condition.equals("moderate"))
    System.out.println("Normal admission");
else if (condition.equals("mild"))
    System.out.println("Can wait");
else
    System.out.println("Invalid condition");`,
    },
  ],

  // ==========================
  // SECTION 15: PREVIOUS YEAR STYLE QUESTIONS (25)
  // ==========================
  previousYearQuestions: [
    { id: "py-1", question: "(ICSE 2020) Output:\nint x=5;\nif(x>5)\n    x++;\nelse\n    x--;\nSystem.out.println(x);", answer: "4", explanation: "5>5 false. Else: x-- = 4." },
    { id: "py-2", question: "(ISC 2021) Output:\nint a=10,b=20,c=5;\nif(a>b)\n    if(a>c)\n        System.out.println(a);\n    else\n        System.out.println(c);\nelse\n    if(b>c)\n        System.out.println(b);\n    else\n        System.out.println(c);", answer: "20", explanation: "10>20 false. Else: 20>5 true. Prints 20." },
    { id: "py-3", question: "(ICSE 2019) Rewrite using ternary:\nif(marks>=40)\n    result=\"Pass\";\nelse\n    result=\"Fail\";", answer: "result = (marks >= 40) ? \"Pass\" : \"Fail\";" },
    { id: "py-4", question: "(ICSE 2022) What is wrong?\nint x=5;\nif(x=5)\n    System.out.println(\"Equal\");\nelse\n    System.out.println(\"Not\");", answer: "Assignment = used instead of comparison ==. Compilation error." },
    { id: "py-5", question: "(ISC 2020) Output:\nint x=5;\nif(x>0)\n    if(x>10)\n        System.out.println(\">10\");\n    else\n        System.out.println(\"0-10\");\nelse\n    System.out.println(\"<=0\");", answer: "0-10", explanation: "5>0 true. 5>10 false. Inner else: prints '0-10'." },
    { id: "py-6", question: "(ICSE 2021) Output:\nint m=65;\nif(m>=90)\n    System.out.println(\"A\");\nelse if(m>=75)\n    System.out.println(\"B\");\nelse if(m>=60)\n    System.out.println(\"C\");\nelse\n    System.out.println(\"D\");", answer: "C", explanation: "65>=90 false. 65>=75 false. 65>=60 true. Prints C." },
    { id: "py-7", question: "(ICSE 2018) Analyze:\nint a=3,b=4,c=5;\nif(a<b&&b<c)\n    System.out.println(\"Y\");\nelse\n    System.out.println(\"N\");", answer: "Y", explanation: "3<4 true. 4<5 true. true&&true true. Prints Y." },
    { id: "py-8", question: "(ISC 2019) Convert to if-else: int z = (x>y) ? x : y;", answer: "if(x>y) z=x; else z=y;" },
    { id: "py-9", question: "(ICSE 2023) Output:\nint x=3;\nif(++x>4)\n    System.out.println(x);\nelse\n    System.out.println(x+2);", answer: "6", explanation: "++x makes x=4. 4>4 false. Else: 4+2=6." },
    { id: "py-10", question: "(ISC 2022) Find error:\nif(x>y);\n    System.out.println(\"Greater\");\nelse\n    System.out.println(\"Smaller\");", answer: "Semicolon after if separates it from else. Compilation error." },
    { id: "py-11", question: "(ICSE 2020) Output:\nint a=5,b=10,c=15;\nif(a>b&&a>c)\n    System.out.println(a);\nelse if(b>c)\n    System.out.println(b);\nelse\n    System.out.println(c);", answer: "15", explanation: "5>10 false (short-circuit). 10>15 false. Else prints 15." },
    { id: "py-12", question: "(ISC 2021) What is the value of x?\nint x=0;\nif(x=0)\n    x=1;\nelse\n    x=2;", answer: "Compilation error", explanation: "x=0 is assignment, not boolean. Compilation error." },
    { id: "py-13", question: "(ICSE 2019) Output:\nint x=3,y=3;\nif(x!=y)\n    System.out.println(\"Diff\");\nelse\n    System.out.println(\"Same\");", answer: "Same", explanation: "3!=3 false. Else prints 'Same'." },
    { id: "py-14", question: "(ISC 2020) Rewrite using if-else:\nString s = (n%2==0) ? \"Even\" : \"Odd\";", answer: "if(n%2==0) s=\"Even\"; else s=\"Odd\";" },
    { id: "py-15", question: "(ICSE 2022) Output:\nint x=5;\nif(x>0)\n    System.out.print(\"A\");\nif(x>10)\n    System.out.print(\"B\");\nelse\n    System.out.print(\"C\");", answer: "AC", explanation: "First if: 5>0 true prints A. Second if: 5>10 false, else prints C." },
    { id: "py-16", question: "(ISC 2019) What is wrong?\nif(x>5)\n    int y=10;\nelse\n    y=20;", answer: "Cannot declare variable as single statement after if. Use braces." },
    { id: "py-17", question: "(ICSE 2021) Output:\nint a=10,b=20,c=30;\nint max=(a>b)?((a>c)?a:c):((b>c)?b:c);\nSystem.out.println(max);", answer: "30", explanation: "10>20 false. (20>30) false. Returns 30." },
    { id: "py-18", question: "(ISC 2022) Output:\nint x=0;\nif(x>0)\n    System.out.println(\"Pos\");\nelse if(x<0)\n    System.out.println(\"Neg\");\nelse\n    System.out.println(\"Zero\");", answer: "Zero", explanation: "0>0 false. 0<0 false. Else prints Zero." },
    { id: "py-19", question: "(ICSE 2023) Find error:\nint x=5;\nif(x>0){\n    System.out.println(\"Pos\");\n}else if(x<0){\n    System.out.println(\"Neg\");\n}else(x==0){\n    System.out.println(\"Zero\");\n}", answer: "Final else cannot have condition (x==0). Use else if or just else." },
    { id: "py-20", question: "(ISC 2020) Output:\nint x=5;\nif(x%2==0)\n    System.out.println(\"Even\");\nelse\n    System.out.println(\"Odd\");\nSystem.out.println(\"Done\");", answer: "Odd\nDone", explanation: "5%2=1. 1==0 false. Else prints Odd. Then Done." },
    { id: "py-21", question: "(ICSE 2018) What is the output?\nint a=0;\nif(a>0)\n    if(a>10)\n        System.out.println(\">10\");\n    else\n        System.out.println(\"0-10\");\nelse\n    System.out.println(\"<=0\");", answer: "<=0", explanation: "0>0 false. Outer else prints '<=0'." },
    { id: "py-22", question: "(ISC 2021) Convert to ternary:\nif(age>=18)\n    status=\"Adult\";\nelse\n    status=\"Minor\";", answer: "status = (age >= 18) ? \"Adult\" : \"Minor\";" },
    { id: "py-23", question: "(ICSE 2022) Output:\nint x=7;\nif(x>5&&x<10)\n    System.out.println(\"Yes\");\nelse\n    System.out.println(\"No\");", answer: "Yes", explanation: "7>5 true && 7<10 true. Prints Yes." },
    { id: "py-24", question: "(ISC 2023) What is wrong?\nint x=5;\nif(x>0)\n    System.out.println(\"A\");\n    System.out.println(\"B\");\nelse\n    System.out.println(\"C\");", answer: "Missing braces. Second println is between if and else. Compilation error." },
    { id: "py-25", question: "(ICSE 2020) Output:\nint a=5,b=5;\nif(a++>b)\n    System.out.println(\"A\");\nelse if(a==b)\n    System.out.println(\"B\");\nelse\n    System.out.println(\"C\");", answer: "C", explanation: "a++: compare 5>5 false, a=6. 6==5 false. Else prints C." },
  ],

  // ==========================
  // SECTION 16: AI VIVA QUESTIONS (30)
  // ==========================
  vivaQuestions: [
    { id: "vv-1", question: "What is the difference between if and if-else?", answer: "if only handles the true case. if-else handles both true and false cases." },
    { id: "vv-2", question: "Can an if have multiple else blocks?", answer: "No. Only one else per if. Chain with else if for multiple conditions." },
    { id: "vv-3", question: "What is the dangling else problem?", answer: "When else can match multiple ifs in nested structures. Java matches else to the nearest unmatched if." },
    { id: "vv-4", question: "How do you write else-if in Java?", answer: "As two words: `else if (condition)`. No space: `elseif` is invalid." },
    { id: "vv-5", question: "Can else have its own condition?", answer: "No. `else (condition)` is invalid. Use `else if (condition)` instead." },
    { id: "vv-6", question: "What is the ternary operator?", answer: "Shorthand for if-else: `variable = (condition) ? valueIfTrue : valueIfFalse;`" },
    { id: "vv-7", question: "How many blocks execute in an if-else?", answer: "Exactly one block executes — either the if block or the else block." },
    { id: "vv-8", question: "Is the else clause mandatory?", answer: "No. else is optional. if can stand alone." },
    { id: "vv-9", question: "What happens if you put a semicolon after if(condition) in if-else?", answer: "Compilation error — the semicolon terminates the if, and else has no matching if." },
    { id: "vv-10", question: "What is an else-if ladder?", answer: "A series of else-if conditions that checks multiple mutually-exclusive conditions. Stops at first true match." },
    { id: "vv-11", question: "When would you use nested if-else vs else-if ladder?", answer: "Nested: hierarchical decisions (e.g., if inside another if). Else-if: sequential conditions (e.g., grading)." },
    { id: "vv-12", question: "Can ternary operator replace all if-else?", answer: "No. Ternary is for expressions returning a value. If-else can execute statements without returning values." },
    { id: "vv-13", question: "What is the output: if(false) System.out.println(\"A\"); else System.out.println(\"B\");", answer: "B. Condition false, else runs." },
    { id: "vv-14", question: "How do you fix the dangling else problem?", answer: "Use curly braces {} to clearly define which if an else belongs to." },
    { id: "vv-15", question: "Can you nest ternary operators?", answer: "Yes, but it hurts readability: `(a>b) ? ((a>c) ? a : c) : ((b>c) ? b : c)`" },
    { id: "vv-16", question: "What is the difference between `else if` and `else { if }`?", answer: "`else if` is a flat chain. `else { if }` nests an if inside the else block, allowing additional else chains inside." },
    { id: "vv-17", question: "Why is else-if more efficient than multiple ifs?", answer: "Else-if stops checking after a match. Multiple ifs evaluate all conditions regardless." },
    { id: "vv-18", question: "What is the final else in an else-if ladder?", answer: "It's the default case that runs when none of the conditions are true. It's optional." },
    { id: "vv-19", question: "Can you have if-else inside a loop?", answer: "Yes, if-else can be placed in any code block including loops, methods, or other if-else blocks." },
    { id: "vv-20", question: "What does `if (x = true)` actually do?", answer: "It assigns true to x (not comparison). The assigned value is used as condition. Always true." },
    { id: "vv-21", question: "What is short-circuit evaluation?", answer: "Java stops evaluating logical expressions once the result is determined. In &&, if first is false, second is skipped. In ||, if first is true, second is skipped." },
    { id: "vv-22", question: "Can you use a boolean method directly in if condition?", answer: "Yes. `if (str.isEmpty())` is valid and common." },
    { id: "vv-23", question: "What is the difference between `=` and `==` in conditions?", answer: "`=` is assignment operator. `==` is comparison operator. Using `=` in if condition causes compilation error (unless both sides are boolean)." },
    { id: "vv-24", question: "What happens if condition evaluates to a non-boolean in Java?", answer: "Compilation error. Java strictly requires boolean in if conditions, unlike C/C++." },
    { id: "vv-25", question: "Can an if-else be written without curly braces?", answer: "Yes, for single statements. But always using braces is recommended to avoid errors." },
    { id: "vv-26", question: "What is the output of `int x=5; if(x>5); else System.out.println(x);`?", answer: "5. The semicolon creates empty if body. Else still matches. Since 5>5 false, else runs." },
    { id: "vv-27", question: "How do you check if a number is between 1 and 100?", answer: "`if (num >= 1 && num <= 100)`" },
    { id: "vv-28", question: "What is the purpose of the else clause?", answer: "To provide an alternative code path when the if condition is false, ensuring both outcomes are handled." },
    { id: "vv-29", question: "Can you have an if-else inside a ternary operator?", answer: "No. Ternary operators can be nested, but if-else statements cannot be placed inside ternary." },
    { id: "vv-30", question: "What is the best practice for writing if-else conditions?", answer: "Always use braces, handle edge cases first, use positive conditions when possible, and keep conditions simple." },
  ],

  // ==========================
  // SECTION 17: PRACTICE TEST
  // ==========================
  practiceTest: {
    title: "IF-ELSE Statement — Practice Test",
    totalMarks: 50,
    timeLimit: "60 minutes",
    sections: [
      {
        title: "Section A — MCQs (10 marks)",
        marks: 10,
        questions: [
          { id: "pt-1", question: "What does `else` do?", options: ["Starts a loop", "Provides alternative when if is false", "Ends program", "None"], answer: 1 },
          { id: "pt-2", question: `int x=3; if(x>5) print("A"); else print("B");`, options: ["A", "B", "AB", "None"], answer: 1 },
          { id: "pt-3", question: "How many else per if?", options: ["Zero", "One", "Two", "Any"], answer: 1 },
          { id: "pt-4", question: "Correct else-if syntax?", options: ["elseif", "else if", "else_if", "ElseIf"], answer: 1 },
          { id: "pt-5", question: "Which operator is ternary?", options: ["?:", "&&", "||", "++"], answer: 0 },
          { id: "pt-6", question: "What is dangling else?", options: ["Else without if", "Else matching wrong if", "Missing semicolon", "Extra brace"], answer: 1 },
          { id: "pt-7", question: `int x=5; if(x=5) print("A"); else print("B");`, options: ["A", "B", "Error", "None"], answer: 2 },
          { id: "pt-8", question: "Can else have a condition?", options: ["Yes", "No", "Only with else if", "Sometimes"], answer: 1 },
          { id: "pt-9", question: "What does `int m = (a>b) ? a : b;` do?", options: ["Compares", "Assigns larger", "Loops", "Error"], answer: 1 },
          { id: "pt-10", question: "Is else mandatory?", options: ["Yes", "No", "Only nested", "Only in loops"], answer: 1 },
        ],
      },
      {
        title: "Section B — Output Based (15 marks)",
        marks: 15,
        questions: [
          { id: "pt-11", question: "int a=5,b=10; if(a>b) print(\"a\"); else print(\"b\");", answer: "b" },
          { id: "pt-12", question: "int x=0; if(x>0) x=1; else x=-1; print(x);", answer: "-1" },
          { id: "pt-13", question: "int x=5; if(++x>5) print(x); else print(x+1);", answer: "6" },
          { id: "pt-14", question: "int a=10,b=20,c=30; if(a>b) if(a>c) print(a); else print(c); else if(b>c) print(b); else print(c);", answer: "30" },
          { id: "pt-15", question: "int x=3; int y=(x>5)?10:(x>0)?5:0; print(y);", answer: "5" },
        ],
      },
      {
        title: "Section C — Error Finding (10 marks)",
        marks: 10,
        questions: [
          { id: "pt-16", question: "int x=5; if(x=5) print(\"Equal\"); else print(\"Not\");", answer: "Assignment instead of comparison. Compilation error." },
          { id: "pt-17", question: "int x=5; if(x>5); else print(\"Done\");", answer: "Semicolon after if creates empty body. Valid but suspicious." },
        ],
      },
      {
        title: "Section D — Programming (15 marks)",
        marks: 15,
        questions: [
          { id: "pt-18", question: "Write a program to check if a number is positive, negative, or zero using if-else.", marks: 5 },
          { id: "pt-19", question: "Write a program to find the largest of three numbers using if-else.", marks: 5 },
          { id: "pt-20", question: "Write a program to calculate grade based on marks using else-if ladder.", marks: 5 },
        ],
      },
    ],
  },

  // ==========================
  // SECTION 18: CHAPTER SUMMARY
  // ==========================
  chapterSummary: {
    keyPoints: [
      "if-else provides two-way decision making: one path for true, another for false.",
      "Only ONE block (if or else) executes — never both.",
      "else cannot have its own condition. Use `else if` for additional conditions.",
      "The dangling else always matches the nearest unmatched if.",
      "Ternary operator `? :` is shorthand for simple if-else assignments.",
      "An if can exist without else, but else cannot exist without if.",
      "Use braces to avoid ambiguity, even with single statements.",
      "Short-circuit evaluation: && stops at first false, || stops at first true.",
      "The condition must be a boolean expression in Java.",
      "else-if ladder is more efficient than multiple ifs for mutually exclusive conditions.",
    ],
    skillsLearned: [
      "Writing two-way conditional logic with if-else",
      "Building else-if ladders for multi-way branching",
      "Understanding and fixing dangling else problems",
      "Using ternary operator for concise code",
      "Tracing nested if-else execution flow",
      "Identifying common errors in if-else constructs",
      "Applying if-else to real-world problems",
      "Converting between if-else and ternary operator",
    ],
  },

  // ==========================
  // SECTION 19: QUICK REVISION NOTES
  // ==========================
  revisionNotes: [
    { title: "If-Else Syntax", content: "`if (c) { } else { }` — executes one of two blocks based on condition." },
    { title: "Dangling Else", content: "Else matches nearest if. Fix with braces to make binding explicit." },
    { title: "Else-If Ladder", content: "`if (c1) {} else if (c2) {} else if (c3) {} else {}` — first match wins." },
    { title: "Ternary Operator", content: "`x = (cond) ? val1 : val2;` — concise if-else for assignments." },
    { title: "Key Differences", content: "else has no condition. Only one block runs. Braces recommended." },
    { title: "Short-Circuit", content: "&& stops at first false. || stops at first true. Side effects may be skipped." },
    { title: "Common Errors", content: "Using = instead of ==, semicolon after if, missing braces, else with condition." },
    { title: "Nested if-else", content: "if inside if. Use braces to control else binding. Any depth allowed." },
  ],

  // ==========================
  // SECTION 20: CHEAT SHEET
  // ==========================
  cheatsheet: {
    syntax: "if (condition) {\n    // true\n} else {\n    // false\n}",
    operators: { comparison: "==, !=, <, >, <=, >=", logical: "&&, ||, !" },
    commonPatterns: [
      { pattern: "Even/Odd", code: "if (num % 2 == 0) even else odd" },
      { pattern: "Ternary", code: "max = (a > b) ? a : b;" },
      { pattern: "Grade ladder", code: "if (m>=90) A else if (m>=80) B else C" },
      { pattern: "Positive/Negative/Zero", code: "if (n>0) P else if (n<0) N else Z" },
      { pattern: "Vote eligibility", code: "if (age >= 18) vote else no" },
    ],
    pitfalls: [
      "Don't put ; after if(condition) — breaks else binding",
      "Don't use = instead of == in condition",
      "Don't forget braces for multiple statements",
      "Don't put condition after else",
      "Don't use elseif — must be else if",
      "Don't use == for String comparison — use .equals()",
      "Don't assume else matches outer if in nesting",
    ],
  },

  // ==========================
  // SECTION 21: ASSERTION & REASON QUESTIONS
  // ==========================
  assertionReason: [
    
  {
    "id": "ifelse-ar-1",
    "assertion": "Assertion (A): In if-else, exactly one block always executes.",
    "reason": "Reason (R): The if block runs when condition is true, else block runs when false.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. If-else guarantees exactly one path executes."
  },
  {
    "id": "ifelse-ar-2",
    "assertion": "Assertion (A): The else block cannot have a condition.",
    "reason": "Reason (R): else is the default case that runs when the if condition is false.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. else has no condition — it's the fallback."
  },
  {
    "id": "ifelse-ar-3",
    "assertion": "Assertion (A): The ternary operator ? : can replace simple if-else statements.",
    "reason": "Reason (R): The ternary operator returns a value based on a condition.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 1,
    "explanation": "Both are true, but R explains how ternary works, not why it replaces if-else."
  },
  {
    "id": "ifelse-ar-4",
    "assertion": "Assertion (A): The dangling else problem occurs in nested if-else without braces.",
    "reason": "Reason (R): An else always matches the nearest unmatched if.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. The dangling else binds to the nearest if."
  },
  {
    "id": "ifelse-ar-5",
    "assertion": "Assertion (A): An else-if ladder checks conditions from top to bottom.",
    "reason": "Reason (R): The first true condition's block executes and the rest are skipped.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. Else-if ladder uses short-circuit evaluation."
  },
  {
    "id": "ifelse-ar-6",
    "assertion": "Assertion (A): Using multiple if statements is always better than else-if ladder.",
    "reason": "Reason (R): Multiple if statements check all conditions regardless of previous results.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 3,
    "explanation": "A is false — else-if is better for mutually exclusive conditions. R is true."
  },
  {
    "id": "ifelse-ar-7",
    "assertion": "Assertion (A): The condition if(x = 5) causes a compilation error in Java.",
    "reason": "Reason (R): In Java, the condition must be a boolean expression.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. x = 5 returns int 5, not boolean, causing compilation error."
  },
  {
    "id": "ifelse-ar-8",
    "assertion": "Assertion (A): Short-circuit evaluation can skip evaluating the second condition.",
    "reason": "Reason (R): && stops if left is false, || stops if left is true.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. Short-circuit evaluation prevents unnecessary evaluation."
  },
  {
    "id": "ifelse-ar-9",
    "assertion": "Assertion (A): The else-if must be written as two separate words.",
    "reason": "Reason (R): elseif is not a valid Java keyword.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. It must be 'else if' (two words), not 'elseif'."
  },
  {
    "id": "ifelse-ar-10",
    "assertion": "Assertion (A): Nested if-else can create complex decision trees.",
    "reason": "Reason (R): Placing if-else inside another if-else allows multi-level decisions.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "answer": 0,
    "explanation": "Both are true. Nesting allows hierarchical decision-making."
  }

  ]
      answer: 0,
      explanation: "Both are true. The condition is checked before each iteration. If false initially, it executes 0 times."
    },
    {
      id: "ifelse-ar-2",
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
      id: "ifelse-ar-3",
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
      id: "ifelse-ar-4",
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
      id: "ifelse-ar-5",
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
      id: "ifelse-ar-6",
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
      id: "ifelse-ar-7",
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
      id: "ifelse-ar-8",
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
      id: "ifelse-ar-9",
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
      id: "ifelse-ar-10",
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

  // ==========================
  // SECTION 22: DEBUG THE CODE
  // ==========================
  debugTheCode: [
    {
      id: "ifelse-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "ifelse-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "ifelse-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "ifelse-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "ifelse-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "ifelse-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "ifelse-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "ifelse-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "ifelse-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "ifelse-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ==========================
  // SECTION 23: CASE STUDY QUESTIONS
  // ==========================
  caseStudyQuestions: [
    {
      id: "ifelse-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "ifelse-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "ifelse-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "ifelse-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "ifelse-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "ifelse-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "ifelse-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "ifelse-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "ifelse-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "ifelse-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "ifelse-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "ifelse-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ==========================
  // SECTION 24: MIXED PRACTICE SETS
  // ==========================
  mixedPracticeSets: [
    {
      id: "ifelse-mps-1",
      title: "Practice Set 1: If-else statement Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "ifelse-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "ifelse-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "ifelse-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "ifelse-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "ifelse-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "ifelse-mps-2",
      title: "Practice Set 2: If-else statement Applications",
      questions: [
        {
          type: "mcq",
          id: "ifelse-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "ifelse-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "ifelse-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "ifelse-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "ifelse-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ==========================
  // SECTION 25: RAPID REVISION QUESTIONS
  // ==========================
  rapidRevisionQuestions: [
    { id: "ifelse-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "ifelse-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "ifelse-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "ifelse-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "ifelse-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "ifelse-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "ifelse-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "ifelse-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "ifelse-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "ifelse-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "ifelse-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "ifelse-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "ifelse-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "ifelse-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "ifelse-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "ifelse-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "ifelse-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "ifelse-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "ifelse-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "ifelse-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter02;
