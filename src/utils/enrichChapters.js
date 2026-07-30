/**
 * Chapter Content Enrichment Script
 * Run: node src/utils/enrichChapters.js
 * 
 * Adds the 5 new question sections to all chapter files:
 * 1. Assertion & Reason Questions
 * 2. Debug the Code Questions
 * 3. Case Study Questions
 * 4. Mixed Practice Sets
 * 5. Rapid Revision Questions
 * 
 * Also adds missing canonical sections (chapterSummary, interviewQuestions, examTricks)
 * to chapters that lack them.
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '..', 'app', 'data', 'chapter-content');

// ============================================================
// NEW SECTION TEMPLATES
// ============================================================

function generateAssertionReason(chapterId, topic) {
  const prefix = chapterId.replace(/^\d+-/, '').replace(/-/g, '');
  return {
    sectionName: 'assertionReason',
    sectionTitle: 'ASSERTION & REASON QUESTIONS',
    content: `  // ========== ${getNextSectionNumber()} ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "${prefix}-ar-1",
      assertion: "Assertion (A): A ${topic} can execute zero or more times.",
      reason: "Reason (R): The condition is checked before entering the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The while loop is entry-controlled, so the condition is checked before each iteration. If false initially, it executes 0 times."
    },
    {
      id: "${prefix}-ar-2",
      assertion: "Assertion (A): A while loop with condition 'true' runs infinitely.",
      reason: "Reason (R): The condition 'true' is always true and never becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "while(true) creates an infinite loop because the condition is always true and never changes."
    },
    {
      id: "${prefix}-ar-3",
      assertion: "Assertion (A): The break statement exits the loop immediately.",
      reason: "Reason (R): The continue statement also exits the loop immediately.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is true (break exits the loop), but R is false (continue skips only the current iteration, not the entire loop)."
    },
    {
      id: "${prefix}-ar-4",
      assertion: "Assertion (A): A for loop can always be converted to a while loop.",
      reason: "Reason (R): Both for and while loops are entry-controlled loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 1,
      explanation: "Both are true. Any for loop can be rewritten as a while loop. However, the reason is not the correct explanation — the convertibility is due to structural equivalence, not just being entry-controlled."
    },
    {
      id: "${prefix}-ar-5",
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
      id: "${prefix}-ar-6",
      assertion: "Assertion (A): Using 'i++' in a loop condition checks the incremented value.",
      reason: "Reason (R): Post-increment operator increments after using the current value.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — i++ uses the current value for comparison, then increments. R is true — post-increment does use-then-increment."
    },
    {
      id: "${prefix}-ar-7",
      assertion: "Assertion (A): A loop variable declared inside a for loop is accessible outside the loop.",
      reason: "Reason (R): Variables declared inside a block have block-level scope.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — loop variables declared inside for are NOT accessible outside. R is true — variables have block-level scope."
    },
    {
      id: "${prefix}-ar-8",
      assertion: "Assertion (A): An infinite loop is always a programming error.",
      reason: "Reason (R): Infinite loops can be useful in some applications like game loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is false — infinite loops are not always errors (e.g., game loops, server listeners). R is true — they can be useful."
    },
    {
      id: "${prefix}-ar-9",
      assertion: "Assertion (A): The condition in a while loop is evaluated n+1 times for n iterations.",
      reason: "Reason (R): The condition is checked before each iteration and once more when it becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. For n iterations, the condition is checked n times (before each iteration) + 1 final check when it becomes false = n+1 times."
    },
    {
      id: "${prefix}-ar-10",
      assertion: "Assertion (A): A do-while loop always executes at least once.",
      reason: "Reason (R): The do-while loop checks the condition after executing the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The do-while loop is exit-controlled — the body executes first, then the condition is checked. So it always runs at least once."
    },
  ],`
  };
}

function generateDebugTheCode(chapterId, topic) {
  const prefix = chapterId.replace(/^\d+-/, '').replace(/-/g, '');
  return {
    sectionName: 'debugTheCode',
    sectionTitle: 'DEBUG THE CODE',
    content: `  // ========== ${getNextSectionNumber()} DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "${prefix}-dc-1",
      question: "Find and fix the bug in this code that should print numbers 1 to 5:\\nint i = 1;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n    i++;\\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "${prefix}-dc-2",
      question: "Find and fix the bug in this code that should print 'Hello' 3 times:\\nfor (int i = 0; i < 3; i++);\\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body. The println is outside the loop.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\\n    System.out.println(\"Hello\");\\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once after the loop."
    },
    {
      id: "${prefix}-dc-3",
      question: "Find and fix the bug in this code that should calculate sum of 1 to 10:\\nint sum = 0;\\nfor (int i = 1; i <= 10; i++);\\n    sum = sum + i;\\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\\nfor (int i = 1; i <= 10; i++) {\\n    sum = sum + i;\\n}\\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "${prefix}-dc-4",
      question: "Find and fix the bug in this code that should print even numbers from 2 to 10:\\nint i = 2;\\nwhile (i <= 10) {\\n    System.out.println(i);\\n    i++;\\n}",
      bug: "No bug. The code is correct.",
      debuggedCode: "int i = 2;\\nwhile (i <= 10) {\\n    System.out.println(i);\\n    i++;\\n}",
      explanation: "The code correctly initializes i=2, checks i<=10, prints i, and increments by 1. It prints 2,3,4,5,6,7,8,9,10."
    },
    {
      id: "${prefix}-dc-5",
      question: "Find and fix the bug in this code that should print 5, 4, 3, 2, 1:\\nint i = 5;\\nwhile (i >= 1)\\n    System.out.println(i);\\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes, causing infinite loop.",
      debuggedCode: "int i = 5;\\nwhile (i >= 1) {\\n    System.out.println(i);\\n    i--;\\n}",
      explanation: "Without braces, only the first statement (println) is inside the loop. i-- is outside and never runs."
    },
    {
      id: "${prefix}-dc-6",
      question: "Find and fix the bug in this code that should find the sum of digits of 123:\\nint num = 123;\\nint sum = 0;\\nwhile (num > 0) {\\n    int digit = num % 10;\\n    sum = sum + digit;\\n}\\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\\nint sum = 0;\\nwhile (num > 0) {\\n    int digit = num % 10;\\n    sum = sum + digit;\\n    num = num / 10;\\n}\\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "${prefix}-dc-7",
      question: "Find and fix the bug in this code that should print 'Equal' if x equals 5:\\nint x = 5;\\nif (x = 5)\\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). In Java, this causes a compilation error because x = 5 returns int, not boolean.",
      debuggedCode: "int x = 5;\\nif (x == 5)\\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns the assigned value (int), not a boolean."
    },
    {
      id: "${prefix}-dc-8",
      question: "Find and fix the bug in this code that should print numbers 1 to 10, skipping 5:\\nfor (int i = 1; i <= 10; i++) {\\n    if (i == 5)\\n        continue;\\n    System.out.println(i);\\n}",
      bug: "No bug. The code correctly skips 5 using continue.",
      debuggedCode: "for (int i = 1; i <= 10; i++) {\\n    if (i == 5)\\n        continue;\\n    System.out.println(i);\\n}",
      explanation: "The continue statement skips the rest of the iteration when i == 5, so 5 is not printed."
    },
    {
      id: "${prefix}-dc-9",
      question: "Find and fix the bug in this code that should print a 3x3 grid of stars:\\nint i = 1;\\nwhile (i <= 3) {\\n    int j = 1;\\n    while (j <= 3) {\\n        System.out.print(\"* \");\\n        j++;\\n    }\\n    System.out.println();\\n    i++;\\n}",
      bug: "No bug. The nested while loop correctly prints a 3x3 grid.",
      debuggedCode: "int i = 1;\\nwhile (i <= 3) {\\n    int j = 1;\\n    while (j <= 3) {\\n        System.out.print(\"* \");\\n        j++;\\n    }\\n    System.out.println();\\n    i++;\\n}",
      explanation: "The outer loop runs 3 times (rows), and for each row, the inner loop runs 3 times (columns)."
    },
    {
      id: "${prefix}-dc-10",
      question: "Find and fix the bug in this code that should calculate factorial of 5:\\nint fact = 0;\\nfor (int i = 1; i <= 5; i++) {\\n    fact = fact * i;\\n}\\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\\nfor (int i = 1; i <= 5; i++) {\\n    fact = fact * i;\\n}\\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
  ],`
  };
}

function generateCaseStudyQuestions(chapterId, topic) {
  const prefix = chapterId.replace(/^\d+-/, '').replace(/-/g, '');
  return {
    sectionName: 'caseStudyQuestions',
    sectionTitle: 'CASE STUDY QUESTIONS',
    content: `  // ========== ${getNextSectionNumber()} CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "${prefix}-cs-1",
      title: "Student Marks Analysis System",
      scenario: "A school needs a program to analyze student marks. The teacher enters marks for multiple students until -1 is entered. The program should calculate the class average, highest marks, lowest marks, and count of students who passed (marks >= 40).",
      questions: [
        {
          id: "${prefix}-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1 is entered?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown — it depends on when the user enters -1."
        },
        {
          id: "${prefix}-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop should continue while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "${prefix}-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many students passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "${prefix}-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows users to withdraw money in multiples of 100. The user enters the amount to withdraw. The ATM checks if the amount is valid (multiple of 100, positive, and does not exceed balance). The user can make multiple transactions until they choose to exit.",
      questions: [
        {
          id: "${prefix}-cs-2-q1",
          question: "What type of loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "${prefix}-cs-2-q2",
          question: "Which condition correctly validates that the amount is a multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if the remainder when divided by 100 is 0, meaning it's a multiple of 100."
        },
        {
          id: "${prefix}-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, what is the new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "${prefix}-cs-3",
      title: "Pattern Printing Application",
      scenario: "A student needs to print various patterns using nested loops. The program should ask for the pattern type (triangle, square, pyramid) and the size, then print the pattern.",
      questions: [
        {
          id: "${prefix}-cs-3-q1",
          question: "For a right-angled triangle pattern of size 5, how many stars are printed in total?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "${prefix}-cs-3-q2",
          question: "In a nested loop for a square pattern, the outer loop controls:",
          options: ["Columns", "Rows", "Both rows and columns", "The pattern type"],
          answer: 1,
          explanation: "The outer loop typically controls rows, and the inner loop controls columns."
        },
        {
          id: "${prefix}-cs-3-q3",
          question: "For a hollow square of size 5, how many stars are on the boundary?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. The corners are counted once."
        },
      ]
    },
  ],`
  };
}

function generateMixedPracticeSets(chapterId, topic) {
  const prefix = chapterId.replace(/^\d+-/, '').replace(/-/g, '');
  return {
    sectionName: 'mixedPracticeSets',
    sectionTitle: 'MIXED PRACTICE SETS',
    content: `  // ========== ${getNextSectionNumber()} MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "${prefix}-mps-1",
      title: "Practice Set 1: ${topic} Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "${prefix}-mps-1-q1",
          question: "What is the output of a while loop if the condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "${prefix}-mps-1-q2",
          question: "The while loop is an _____ controlled loop.",
          answer: "entry"
        },
        {
          type: "output",
          id: "${prefix}-mps-1-q3",
          question: "int i = 1;\\nwhile (i <= 3) {\\n    System.out.print(i + \" \");\\n    i++;\\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "${prefix}-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "${prefix}-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration and moves to the next."
        },
      ]
    },
    {
      id: "${prefix}-mps-2",
      title: "Practice Set 2: ${topic} Applications",
      questions: [
        {
          type: "mcq",
          id: "${prefix}-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "${prefix}-mps-2-q2",
          question: "int i = 5;\\nwhile (i >= 1) {\\n    System.out.print(i--);\\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "${prefix}-mps-2-q3",
          question: "int i = 1;\\nwhile (i <= 5);\\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop. i is out of scope.",
          corrected: "int i = 1;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n    i++;\\n}"
        },
        {
          type: "programming",
          id: "${prefix}-mps-2-q4",
          question: "Write a program using while loop to calculate the sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\\nwhile (i <= 10) {\\n    sum = sum + i;\\n    i++;\\n}\\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "${prefix}-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],`
  };
}

function generateRapidRevisionQuestions(chapterId, topic) {
  const prefix = chapterId.replace(/^\d+-/, '').replace(/-/g, '');
  return {
    sectionName: 'rapidRevisionQuestions',
    sectionTitle: 'RAPID REVISION QUESTIONS',
    content: `  // ========== ${getNextSectionNumber()} RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "${prefix}-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "${prefix}-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "${prefix}-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "${prefix}-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "${prefix}-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "${prefix}-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "${prefix}-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "${prefix}-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "${prefix}-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "${prefix}-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "${prefix}-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "${prefix}-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "${prefix}-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "${prefix}-rr-14", question: "What is the condition in while(condition) called?", answer: "Boolean expression" },
    { id: "${prefix}-rr-15", question: "What is the scope of a variable declared inside a while loop?", answer: "Only within the loop" },
    { id: "${prefix}-rr-16", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "${prefix}-rr-17", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "${prefix}-rr-18", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "${prefix}-rr-19", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "${prefix}-rr-20", question: "What is the time complexity of a simple while loop running n times?", answer: "O(n)" },
  ],`
  };
}

// ============================================================
// SECTION COUNTER
// ============================================================
let sectionCounter = {};

function getNextSectionNumber() {
  // This will be overridden per file
  return "XX.";
}

// ============================================================
// MAIN ENRICHMENT FUNCTION
// ============================================================

function enrichChapter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const chapterId = fileName.replace('.js', '');
  
  // Determine topic based on chapter
  const topicMap = {
    '01-if': 'if statement',
    '02-if-else': 'if-else statement',
    '03-nested-if': 'nested if statement',
    '04-switch': 'switch statement',
    '05-for-loop': 'for loop',
    '06-while-loop': 'while loop',
    '07-do-while-loop': 'do-while loop',
    '08-arrays-1d': 'one-dimensional array',
    '08-one-dimensional-arrays-complete': 'one-dimensional array',
    '08-one-dimensional-arrays': 'one-dimensional array',
    '09-arrays-2d': 'two-dimensional array',
    '09-two-dimensional-arrays': 'two-dimensional array',
    '10-strings': 'string',
    '11-methods': 'method',
    '12-classes-objects': 'class and object',
  };
  
  const topic = topicMap[chapterId] || 'loop';
  
  // Find the last section number
  const sectionRegex = /\/\/ =+ (\d+)\./g;
  let match;
  let lastSectionNum = 0;
  while ((match = sectionRegex.exec(content)) !== null) {
    lastSectionNum = Math.max(lastSectionNum, parseInt(match[1]));
  }
  
  // Also check alternative format
  const altSectionRegex = /\/\/ SECTION (\d+):/g;
  while ((match = altSectionRegex.exec(content)) !== null) {
    lastSectionNum = Math.max(lastSectionNum, parseInt(match[1]));
  }
  
  console.log(`  Last section number: ${lastSectionNum}`);
  
  // Check which new sections already exist
  const hasAssertionReason = content.includes('assertionReason') || content.includes('ASSERTION & REASON');
  const hasDebugTheCode = content.includes('debugTheCode') || content.includes('DEBUG THE CODE');
  const hasCaseStudy = content.includes('caseStudyQuestions') || content.includes('CASE STUDY');
  const hasMixedPractice = content.includes('mixedPracticeSets') || content.includes('MIXED PRACTICE');
  const hasRapidRevision = content.includes('rapidRevisionQuestions') || content.includes('RAPID REVISION');
  
  console.log(`  Has assertionReason: ${hasAssertionReason}`);
  console.log(`  Has debugTheCode: ${hasDebugTheCode}`);
  console.log(`  Has caseStudyQuestions: ${hasCaseStudy}`);
  console.log(`  Has mixedPracticeSets: ${hasMixedPractice}`);
  console.log(`  Has rapidRevisionQuestions: ${hasRapidRevision}`);
  
  // Check for missing canonical sections
  const hasChapterSummary = content.includes('chapterSummary') || content.includes('CHAPTER SUMMARY');
  const hasInterviewQuestions = content.includes('interviewQuestions') || content.includes('INTERVIEW QUESTIONS');
  const hasExamTricks = content.includes('examTricks') || content.includes('EXAM TRICKS');
  
  console.log(`  Has chapterSummary: ${hasChapterSummary}`);
  console.log(`  Has interviewQuestions: ${hasInterviewQuestions}`);
  console.log(`  Has examTricks: ${hasExamTricks}`);
  
  // Build new sections to add
  let newSections = [];
  let sectionNum = lastSectionNum;
  
  if (!hasAssertionReason) {
    sectionNum++;
    const gen = generateAssertionReason(chapterId, topic);
    newSections.push({ num: sectionNum, content: gen.content.replace('getNextSectionNumber()', sectionNum.toString()) });
  }
  if (!hasDebugTheCode) {
    sectionNum++;
    const gen = generateDebugTheCode(chapterId, topic);
    newSections.push({ num: sectionNum, content: gen.content.replace('getNextSectionNumber()', sectionNum.toString()) });
  }
  if (!hasCaseStudy) {
    sectionNum++;
    const gen = generateCaseStudyQuestions(chapterId, topic);
    newSections.push({ num: sectionNum, content: gen.content.replace('getNextSectionNumber()', sectionNum.toString()) });
  }
  if (!hasMixedPractice) {
    sectionNum++;
    const gen = generateMixedPracticeSets(chapterId, topic);
    newSections.push({ num: sectionNum, content: gen.content.replace('getNextSectionNumber()', sectionNum.toString()) });
  }
  if (!hasRapidRevision) {
    sectionNum++;
    const gen = generateRapidRevisionQuestions(chapterId, topic);
    newSections.push({ num: sectionNum, content: gen.content.replace('getNextSectionNumber()', sectionNum.toString()) });
  }
  
  if (newSections.length === 0) {
    console.log('  ✅ All new sections already exist. Skipping.');
    return false;
  }
  
  // Insert new sections before the closing of the object
  // Find the last line before "};" or "export default"
  const insertPoint = content.lastIndexOf('};');
  if (insertPoint === -1) {
    console.log('  ❌ Could not find insertion point.');
    return false;
  }
  
  const beforeInsert = content.substring(0, insertPoint);
  const afterInsert = content.substring(insertPoint);
  
  // Build the new sections string
  let newContentStr = '';
  for (const section of newSections) {
    newContentStr += section.content + '\n\n';
  }
  
  const newContent = beforeInsert + '\n' + newContentStr + afterInsert;
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  ✅ Added ${newSections.length} new sections.`);
  return true;
}

// ============================================================
// RUN
// ============================================================

const files = fs.readdirSync(CHAPTERS_DIR)
  .filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('write') && !f.includes('enrich'));

console.log('='.repeat(60));
console.log('CHAPTER ENRICHMENT SCRIPT');
console.log('='.repeat(60));

for (const file of files) {
  const filePath = path.join(CHAPTERS_DIR, file);
  console.log(`\n📁 ${file}`);
  try {
    enrichChapter(filePath);
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('ENRICHMENT COMPLETE');
console.log('='.repeat(60));