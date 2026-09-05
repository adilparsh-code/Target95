const chapter06 = {
  id: "06-while-loop",
  title: "WHILE Loop",
  slug: "while-loop",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 120,
  topics: ["while loop", "entry-controlled loop", "initialisation", "condition", "iteration", "update", "infinite loop", "nested while", "sentinel-controlled loop", "digit processing"],

  introduction: {
    description: "A while loop repeatedly executes a block of Java statements while a boolean condition remains true. It is entry-controlled, so the condition is checked before each iteration.",
    realLifeExamples: ["Reading values until a sentinel value is entered.", "Continuing a menu until the user chooses Exit.", "Processing items while a condition remains true."],
    commonMistakes: ["Forgetting to initialise the loop variable.", "Forgetting to update the loop variable.", "Using a condition that never becomes false.", "Off-by-one errors in loop conditions.", "Resetting a control variable at the wrong place."],
    whereUsed: ["Sentinel-controlled input", "Menu-driven programs", "Repeated processing", "Digit and number problems"],
  },

  theoryNotes: {
    beginnerExplanation: "A while loop has three logical parts: initialise before the loop, test the condition, and update inside the body. If the condition is false at the beginning, the body runs zero times.",
    importantPoints: ["while is an entry-controlled loop.", "The condition is checked before every iteration.", "The body may execute zero or more times.", "The control variable should move toward termination.", "A missing update can create an infinite loop.", "while is useful when the number of repetitions is not known in advance."],
    memoryTricks: ["INITIALISE → CHECK → EXECUTE → UPDATE → CHECK again.", "False at the start means zero iterations.", "For digit problems: EXTRACT → PROCESS → REMOVE DIGIT."],
    examTips: ["Trace the control variable after each iteration.", "Check both the first condition and the final failing condition.", "For sentinel problems, read the next value before the next test.", "Look for integer division and modulo when analysing outputs.", "In nested loops, reset the inner-loop variable for every outer iteration."],
  },

  syntax: {
    code: `int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}`,
    breakdown: [
      { keyword: "int i = 1", explanation: "Initialises the loop variable before the loop." },
      { keyword: "while", explanation: "Starts an entry-controlled loop." },
      { keyword: "i <= 5", explanation: "Condition tested before every iteration." },
      { keyword: "i++", explanation: "Updates the control variable so the loop can terminate." },
    ],
    variations: {
      sentinel: { code: `int n = sc.nextInt();
while (n != -1) {
    System.out.println(n);
    n = sc.nextInt();
}`, explanation: "The sentinel -1 ends the loop and is not processed." },
      nested: { code: `int i = 1;
while (i <= 3) {
    int j = 1;
    while (j <= 3) {
        System.out.print(j + " ");
        j++;
    }
    System.out.println();
    i++;
}`, explanation: "The inner while completes for each outer-loop iteration." },
    },
  },

  examples: {
    basic: [
      { id: "while-ex-b-1", title: "Print 1 to 5", code: `int i = 1;
while (i <= 5) {
    System.out.print(i + " ");
    i++;
}`, output: "1 2 3 4 5 ", explanation: ["i starts at 1.", "The loop runs while i <= 5.", "i increases after each print."] },
      { id: "while-ex-b-2", title: "Sum of first n natural numbers", code: `int n = 5;
int i = 1;
int sum = 0;
while (i <= n) {
    sum += i;
    i++;
}
System.out.println(sum);`, output: "15", explanation: ["sum is the accumulator.", "Each value from 1 through n is added once."] },
      { id: "while-ex-b-3", title: "Reverse counting", code: `int i = 5;
while (i >= 1) {
    System.out.print(i + " ");
    i--;
}`, output: "5 4 3 2 1 ", explanation: ["The loop decrements i after each iteration."] },
    ],
    intermediate: [
      { id: "while-ex-i-1", title: "Count even numbers", code: `int i = 2;
int count = 0;
while (i <= 20) {
    if (i % 2 == 0) count++;
    i++;
}
System.out.println(count);`, output: "10", explanation: ["The loop visits every integer from 2 to 20.", "Each even value increments count."] },
      { id: "while-ex-i-2", title: "Sum of digits", code: `int n = 4725;
int sum = 0;
while (n > 0) {
    sum += n % 10;
    n /= 10;
}
System.out.println(sum);`, output: "18", explanation: ["% 10 extracts the last digit.", "/= 10 removes the last digit.", "The digits 5, 2, 7 and 4 are accumulated."] },
      { id: "while-ex-i-3", title: "Reverse a number", code: `int n = 1204;
int rev = 0;
while (n > 0) {
    rev = rev * 10 + n % 10;
    n /= 10;
}
System.out.println(rev);`, output: "4021", explanation: ["Each extracted digit is appended to rev.", "The loop ends when n becomes 0."] },
      { id: "while-ex-i-4", title: "Sentinel-controlled total", code: `int n = 4;
int sum = 0;
while (n != -1) {
    sum += n;
    n--;
}
System.out.println(sum);`, output: "10", explanation: ["The values 4, 3, 2 and 1 are added.", "When n becomes -1, the loop stops."] },
    ],
    advanced: [
      { id: "while-ex-a-1", title: "Prime test with while", code: `int n = 29;
int d = 2;
boolean prime = true;
while (d <= n / d) {
    if (n % d == 0) {
        prime = false;
        break;
    }
    d++;
}
System.out.println(prime);`, output: "true", explanation: ["Possible factors are checked only up to sqrt(n).", "No divisor is found for 29."] },
      { id: "while-ex-a-2", title: "Euclidean GCD", code: `int a = 84;
int b = 30;
while (b != 0) {
    int r = a % b;
    a = b;
    b = r;
}
System.out.println(a);`, output: "6", explanation: ["The remainder replaces b repeatedly.", "When b becomes 0, a is the GCD."] },
      { id: "while-ex-a-3", title: "Nested while trace", code: `int i = 1;
while (i <= 3) {
    int j = i;
    while (j <= 3) {
        System.out.print(j + " ");
        j++;
    }
    i++;
}`, output: "1 2 3 2 3 3 ", explanation: ["The inner loop starts from the current value of i.", "Its starting point changes on each outer iteration."] },
    ],
  },

  outputBasedQuestions: [
    { id: "while-ob-1", question: `int i = 1;
while (i <= 4) {
    System.out.print(i * i + " ");
    i++;
}`, answer: "1 4 9 16 ", explanation: "The loop prints the square of i for i = 1, 2, 3 and 4." },
    { id: "while-ob-2", question: `int i = 3;
while (i > 0) {
    System.out.print(i + " ");
    i--;
}`, answer: "3 2 1 ", explanation: "i decreases from 3 to 1; after i becomes 0 the condition is false." },
    { id: "while-ob-3", question: `int n = 29;
while (n > 0) {
    System.out.print(n % 10 + " ");
    n = n / 10;
}`, answer: "9 2 ", explanation: "Modulo extracts the last digit and integer division removes it." },
    { id: "while-ob-4", question: `int a = 7;
int b = 3;
while (a >= b) {
    a -= b;
}
System.out.println(a);`, answer: "1", explanation: "7 becomes 4, then 1. The next condition 1 >= 3 is false." },
    { id: "while-ob-5", question: `int n = 507;
int count = 0;
while (n > 0) {
    if (n % 10 == 0) count++;
    n /= 10;
}
System.out.println(count);`, answer: "1", explanation: "The zero in 507 is encountered when the last digit is extracted." },
    { id: "while-ob-6", question: `int x = 1;
while (x < 20) {
    x = x * 2 + 1;
}
System.out.println(x);`, answer: "31", explanation: "x becomes 3, 7, 15 and 31; then 31 < 20 is false." },
  ],

  errorFindingQuestions: [
    { id: "while-err-1", question: "Identify the problem: int i = 1; while (i <= 5) { System.out.println(i); }", answer: "The loop variable i is never updated, so the loop is infinite.", explanation: "An update such as i++ is needed inside the loop." },
    { id: "while-err-2", question: "Identify the problem: while (i = 5) { ... }", answer: "A while condition must be boolean; i = 5 is an assignment, not a boolean condition.", explanation: "Use a valid comparison such as i == 5 where appropriate." },
    { id: "while-err-3", question: "Find the logical error: int n = 1234; while (n > 0) { System.out.println(n % 10); }", answer: "n is never divided by 10, so the loop never terminates.", explanation: "Add n /= 10 after processing the extracted digit." },
    { id: "while-err-4", question: "Find the logical error: int i = 1; while (i < 5) { i += 2; } System.out.println(i);", answer: "There is no infinite loop, but the final value is 5; the condition must be checked carefully if values 1 through 4 are intended to be processed.", explanation: "The update changes i from 1 to 3 to 5, so 5 is never processed inside the loop." },
  ],

  fillInTheBlanks: [
    { question: "The while loop is an ______-controlled loop.", answer: "entry" },
    { question: "The loop condition is checked ______ each iteration.", answer: "before" },
    { question: "A value used to terminate input processing is called a ______ value.", answer: "sentinel" },
    { question: "The operator commonly used to extract the last digit of an integer is ______.", answer: "%" },
    { question: "Integer division by 10 can remove the last digit using the ______ operator.", answer: "/=" },
  ],

  mcqs: [
    { id: "while-mcq-1", question: "What happens if the while condition is false initially?", options: ["The body executes once", "The body executes twice", "The body does not execute", "Compilation always fails"], answer: "The body does not execute", difficulty: "easy", explanation: "The while loop checks its condition before entering the body." },
    { id: "while-mcq-2", question: "Which construct is most suitable when the number of iterations depends on a sentinel value?", options: ["while", "switch", "if", "class"], answer: "while", difficulty: "medium", explanation: "A sentinel-controlled process naturally maps to a while condition." },
    { id: "while-mcq-3", question: "What is printed? int n=123; while(n>0){System.out.print(n%10); n/=10;}", options: ["123", "321", "6", "111"], answer: "321", difficulty: "medium", explanation: "% 10 extracts digits from right to left." },
    { id: "while-mcq-4", question: "Which change most directly prevents an infinite loop when i starts at 1 and the condition is i <= 10?", options: ["Remove the condition", "Update i toward 10", "Move i declaration inside every iteration", "Replace while with if"], answer: "Update i toward 10", difficulty: "medium", explanation: "The control variable must make progress toward the terminating condition." },
    { id: "while-mcq-5", question: "In a nested while loop, when should the inner control variable normally be initialised?", options: ["Only once before both loops", "For each required outer-loop iteration", "After the program ends", "Never"], answer: "For each required outer-loop iteration", difficulty: "hard", explanation: "Otherwise the inner loop may not execute again after its first completion." },
  ],

  assertionReasonQuestions: [
    { id: "while-ar-1", assertion: "A while loop may execute zero times.", reason: "Its condition is checked before the loop body executes.", answer: 0, explanation: "Both statements are true and the reason correctly explains the assertion." },
    { id: "while-ar-2", assertion: "A while loop can become infinite.", reason: "Its condition may remain true if the control state never moves toward termination.", answer: 0, explanation: "Both statements are true and the reason explains why an infinite loop can occur." },
  ],

  programmingQuestions: [
    { id: "while-prg-1", title: "Read Until Sentinel", problemStatement: "Accept integers until -1 is entered. Display the sum of all non-negative values entered before the sentinel.", difficulty: "medium", solution: `Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
int sum = 0;
while (n != -1) {
    if (n >= 0) sum += n;
    n = sc.nextInt();
}
System.out.println(sum);` },
    { id: "while-prg-2", title: "Digit Analysis", problemStatement: "Accept a positive integer and use a while loop to count its digits and calculate the sum of its digits.", difficulty: "hard", solution: `int n = sc.nextInt();
int count = 0;
int sum = 0;
while (n > 0) {
    int digit = n % 10;
    sum += digit;
    count++;
    n /= 10;
}
System.out.println(count);
System.out.println(sum);` },
    { id: "while-prg-3", title: "Palindrome Number", problemStatement: "Accept a positive integer, reverse it using a while loop and determine whether the original number is a palindrome.", difficulty: "hard", solution: `int n = sc.nextInt();
int original = n;
int rev = 0;
while (n > 0) {
    rev = rev * 10 + n % 10;
    n /= 10;
}
System.out.println(original == rev ? "Palindrome" : "Not Palindrome");` },
  ],

  challengeProblems: [
    { id: "while-ch-1", title: "Reverse a Number", question: "Use a while loop to reverse a positive integer and display the reversed number.", difficulty: "medium" },
    { id: "while-ch-2", title: "Prime Test by Repeated Division", question: "Use a while loop to test whether a positive integer greater than 1 is prime.", difficulty: "hard" },
    { id: "while-ch-3", title: "GCD by Repeated Modulo", question: "Use a while loop to implement the Euclidean algorithm and find the GCD of two positive integers.", difficulty: "hard" },
    { id: "while-ch-4", title: "Armstrong Number", question: "Use a while loop to calculate the sum of cubes of the digits of a three-digit number and test whether it is an Armstrong number.", difficulty: "hard" },
    { id: "while-ch-5", title: "Menu Loop", question: "Design a menu-driven program that repeatedly accepts a choice and performs an operation until the user selects Exit.", difficulty: "hard" },
  ],

  rapidRevisionQuestions: [
    { question: "When is a while loop useful?", answer: "When repetition depends on a condition and the iteration count may not be known in advance." },
    { question: "Can a while loop execute zero times?", answer: "Yes, when the condition is false initially." },
    { question: "What commonly causes an infinite while loop?", answer: "A condition that never becomes false, often because the control variable is not updated." },
    { question: "How is the last digit extracted?", answer: "Using n % 10." },
    { question: "How is the last digit removed?", answer: "Using integer division such as n /= 10." },
  ],

  revisionNotes: {
    title: "Exam-Focused Revision Notes",
    keyTerms: [
      { term: "while", definition: "Java looping construct that repeats while a condition is true." },
      { term: "Sentinel", definition: "A special input value that signals termination." },
      { term: "Iteration", definition: "One execution of the loop body." },
      { term: "Infinite loop", definition: "A loop whose terminating condition is never reached." },
    ],
    quickFlow: "Initialise → check → execute → update → check",
  },
};

export default chapter06;
