/**
 * Adds the 5 new question sections to all chapter files.
 * Handles both comment formats (==== X. TITLE ==== and SECTION X: TITLE)
 * 
 * Sections to add:
 * 1. Assertion & Reason Questions
 * 2. Debug the Code Questions
 * 3. Case Study Questions
 * 4. Mixed Practice Sets
 * 5. Rapid Revision Questions
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'app', 'data', 'chapter-content');

// Chapter-specific topic names
const TOPICS = {
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

function getPrefix(chapterId) {
  return chapterId.replace(/^\d+-/, '').replace(/-/g, '');
}

function getSectionHeader(num, title, format) {
  if (format === 'alt') {
    return '  // ==========================\n  // SECTION ' + num + ': ' + title + '\n  // ==========================';
  }
  return '  // ========== ' + num + '. ' + title + ' ==========';
}

function detectFormat(content) {
  if (content.includes('// SECTION 1:')) return 'alt';
  return 'standard';
}

function getLastSectionNum(content) {
  let max = 0;
  let m;
  const re1 = /\/\/ =+ (\d+)\./g;
  while ((m = re1.exec(content)) !== null) max = Math.max(max, parseInt(m[1]));
  const re2 = /\/\/ SECTION (\d+):/g;
  while ((m = re2.exec(content)) !== null) max = Math.max(max, parseInt(m[1]));
  return max;
}

function generateSections(chapterId, topic, startNum, format) {
  const prefix = getPrefix(chapterId);
  let sections = [];
  let num = startNum;

  // 1. Assertion & Reason
  num++;
  sections.push({
    num: num,
    title: 'ASSERTION & REASON QUESTIONS',
    key: 'assertionReason',
    content: getSectionHeader(num, 'ASSERTION & REASON QUESTIONS', format) + '\n  assertionReason: [\n    {\n      id: "' + prefix + '-ar-1",\n      assertion: "Assertion (A): A ' + topic + ' can execute zero or more times.",\n      reason: "Reason (R): The condition is checked before entering the loop body.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 0,\n      explanation: "Both are true. The condition is checked before each iteration. If false initially, it executes 0 times."\n    },\n    {\n      id: "' + prefix + '-ar-2",\n      assertion: "Assertion (A): The break statement exits the loop immediately.",\n      reason: "Reason (R): The continue statement also exits the loop immediately.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 2,\n      explanation: "A is true (break exits the loop), but R is false (continue skips only the current iteration)."\n    },\n    {\n      id: "' + prefix + '-ar-3",\n      assertion: "Assertion (A): Nested loops are loops inside other loops.",\n      reason: "Reason (R): The inner loop completes all its iterations for each iteration of the outer loop.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 0,\n      explanation: "Both are true. A nested loop is a loop inside another loop, and the inner loop runs completely for each outer loop iteration."\n    },\n    {\n      id: "' + prefix + '-ar-4",\n      assertion: "Assertion (A): An infinite loop is always a programming error.",\n      reason: "Reason (R): Infinite loops can be useful in some applications like game loops.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 2,\n      explanation: "A is false — infinite loops are not always errors (e.g., game loops, server listeners). R is true."\n    },\n    {\n      id: "' + prefix + '-ar-5",\n      assertion: "Assertion (A): A loop variable declared inside a loop is accessible outside the loop.",\n      reason: "Reason (R): Variables declared inside a block have block-level scope.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 3,\n      explanation: "A is false — loop variables are NOT accessible outside. R is true — variables have block-level scope."\n    },\n    {\n      id: "' + prefix + '-ar-6",\n      assertion: "Assertion (A): Using i++ in a loop condition checks the incremented value.",\n      reason: "Reason (R): Post-increment operator increments after using the current value.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 3,\n      explanation: "A is false — i++ uses the current value for comparison, then increments. R is true."\n    },\n    {\n      id: "' + prefix + '-ar-7",\n      assertion: "Assertion (A): A for loop can always be converted to a while loop.",\n      reason: "Reason (R): Both for and while loops are entry-controlled loops.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 1,\n      explanation: "Both are true. Any for loop can be rewritten as a while loop. However, the reason is not the correct explanation."\n    },\n    {\n      id: "' + prefix + '-ar-8",\n      assertion: "Assertion (A): The condition in a loop is evaluated n+1 times for n iterations.",\n      reason: "Reason (R): The condition is checked before each iteration and once more when it becomes false.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 0,\n      explanation: "Both are true. For n iterations, the condition is checked n times + 1 final check = n+1 times."\n    },\n    {\n      id: "' + prefix + '-ar-9",\n      assertion: "Assertion (A): A do-while loop always executes at least once.",\n      reason: "Reason (R): The do-while loop checks the condition after executing the loop body.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 0,\n      explanation: "Both are true. The do-while loop is exit-controlled — the body executes first, then the condition is checked."\n    },\n    {\n      id: "' + prefix + '-ar-10",\n      assertion: "Assertion (A): A while loop with condition true runs infinitely.",\n      reason: "Reason (R): The condition true is always true and never becomes false.",\n      options: [\n        "Both A and R are true and R is the correct explanation of A",\n        "Both A and R are true but R is NOT the correct explanation of A",\n        "A is true but R is false",\n        "A is false but R is true"\n      ],\n      answer: 0,\n      explanation: "while(true) creates an infinite loop because the condition is always true and never changes."\n    },\n  ],'
  });

  // 2. Debug the Code
  num++;
  sections.push({
    num: num,
    title: 'DEBUG THE CODE',
    key: 'debugTheCode',
    content: getSectionHeader(num, 'DEBUG THE CODE', format) + '\n  debugTheCode: [\n    {\n      id: "' + prefix + '-dc-1",\n      question: "Find and fix the bug:\\nint i = 1;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n}",\n      bug: "The loop variable i is never incremented, causing an infinite loop.",\n      debuggedCode: "int i = 1;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n    i++;\\n}",\n      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."\n    },\n    {\n      id: "' + prefix + '-dc-2",\n      question: "Find and fix the bug:\\nfor (int i = 0; i < 3; i++);\\n    System.out.println(\\"Hello\\");",\n      bug: "The semicolon after the for loop creates an empty loop body.",\n      debuggedCode: "for (int i = 0; i < 3; i++) {\\n    System.out.println(\\"Hello\\");\\n}",\n      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."\n    },\n    {\n      id: "' + prefix + '-dc-3",\n      question: "Find and fix the bug:\\nint sum = 0;\\nfor (int i = 1; i <= 10; i++);\\n    sum = sum + i;\\nSystem.out.println(sum);",\n      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",\n      debuggedCode: "int sum = 0;\\nfor (int i = 1; i <= 10; i++) {\\n    sum = sum + i;\\n}\\nSystem.out.println(sum);",\n      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."\n    },\n    {\n      id: "' + prefix + '-dc-4",\n      question: "Find and fix the bug:\\nint i = 5;\\nwhile (i >= 1)\\n    System.out.println(i);\\n    i--;",\n      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",\n      debuggedCode: "int i = 5;\\nwhile (i >= 1) {\\n    System.out.println(i);\\n    i--;\\n}",\n      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."\n    },\n    {\n      id: "' + prefix + '-dc-5",\n      question: "Find and fix the bug:\\nint num = 123;\\nint sum = 0;\\nwhile (num > 0) {\\n    int digit = num % 10;\\n    sum = sum + digit;\\n}\\nSystem.out.println(sum);",\n      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",\n      debuggedCode: "int num = 123;\\nint sum = 0;\\nwhile (num > 0) {\\n    int digit = num % 10;\\n    sum = sum + digit;\\n    num = num / 10;\\n}\\nSystem.out.println(sum);",\n      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."\n    },\n    {\n      id: "' + prefix + '-dc-6",\n      question: "Find and fix the bug:\\nint x = 5;\\nif (x = 5)\\n    System.out.println(\\"Equal\\");",\n      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",\n      debuggedCode: "int x = 5;\\nif (x == 5)\\n    System.out.println(\\"Equal\\");",\n      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."\n    },\n    {\n      id: "' + prefix + '-dc-7",\n      question: "Find and fix the bug:\\nint fact = 0;\\nfor (int i = 1; i <= 5; i++) {\\n    fact = fact * i;\\n}\\nSystem.out.println(fact);",\n      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",\n      debuggedCode: "int fact = 1;\\nfor (int i = 1; i <= 5; i++) {\\n    fact = fact * i;\\n}\\nSystem.out.println(fact);",\n      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."\n    },\n    {\n      id: "' + prefix + '-dc-8",\n      question: "Find and fix the bug:\\nint i = 1;\\nwhile (i <= 5);\\n    System.out.println(i);",\n      bug: "Semicolon after while creates empty loop. i is out of scope.",\n      debuggedCode: "int i = 1;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n    i++;\\n}",\n      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."\n    },\n    {\n      id: "' + prefix + '-dc-9",\n      question: "Find and fix the bug:\\nint a = 5, b = 10;\\nif (a > b)\\n    System.out.println(a);\\n    System.out.println(b);",\n      bug: "Missing braces. Only the first println is inside the if. The second always runs.",\n      debuggedCode: "int a = 5, b = 10;\\nif (a > b) {\\n    System.out.println(a);\\n    System.out.println(b);\\n}",\n      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."\n    },\n    {\n      id: "' + prefix + '-dc-10",\n      question: "Find and fix the bug:\\nint i = 1;\\nwhile (i <= 10) {\\n    if (i == 5)\\n        continue;\\n    System.out.println(i);\\n    i++;\\n}",\n      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",\n      debuggedCode: "int i = 1;\\nwhile (i <= 10) {\\n    if (i == 5) {\\n        i++;\\n        continue;\\n    }\\n    System.out.println(i);\\n    i++;\\n}",\n      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."\n    },\n  ],'
  });

  // 3. Case Study Questions
  num++;
  sections.push({
    num: num,
    title: 'CASE STUDY QUESTIONS',
    key: 'caseStudyQuestions',
    content: getSectionHeader(num, 'CASE STUDY QUESTIONS', format) + '\n  caseStudyQuestions: [\n    {\n      id: "' + prefix + '-cs-1",\n      title: "Student Marks Analysis",\n      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",\n      questions: [\n        {\n          id: "' + prefix + '-cs-1-q1",\n          question: "Which loop is most suitable for reading marks until -1?",\n          options: ["for loop", "while loop", "do-while loop", "Any loop works"],\n          answer: 1,\n          explanation: "A while loop is best because the number of iterations is unknown."\n        },\n        {\n          id: "' + prefix + '-cs-1-q2",\n          question: "What should be the loop condition?",\n          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],\n          answer: 1,\n          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."\n        },\n        {\n          id: "' + prefix + '-cs-1-q3",\n          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",\n          options: ["2", "3", "4", "5"],\n          answer: 2,\n          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."\n        },\n      ]\n    },\n    {\n      id: "' + prefix + '-cs-2",\n      title: "ATM Withdrawal System",\n      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",\n      questions: [\n        {\n          id: "' + prefix + '-cs-2-q1",\n          question: "What loop structure is best for the main menu?",\n          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],\n          answer: 1,\n          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."\n        },\n        {\n          id: "' + prefix + '-cs-2-q2",\n          question: "Which condition validates multiple of 100?",\n          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],\n          answer: 0,\n          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."\n        },\n        {\n          id: "' + prefix + '-cs-2-q3",\n          question: "If balance is 5000 and user withdraws 1500, new balance?",\n          options: ["3500", "1500", "5000", "6500"],\n          answer: 0,\n          explanation: "New balance = 5000 - 1500 = 3500."\n        },\n      ]\n    },\n    {\n      id: "' + prefix + '-cs-3",\n      title: "Pattern Printing",\n      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",\n      questions: [\n        {\n          id: "' + prefix + '-cs-3-q1",\n          question: "For a right-angled triangle of size 5, total stars?",\n          options: ["5", "10", "15", "25"],\n          answer: 2,\n          explanation: "Sum of 1+2+3+4+5 = 15 stars."\n        },\n        {\n          id: "' + prefix + '-cs-3-q2",\n          question: "In nested loops for a square, outer loop controls:",\n          options: ["Columns", "Rows", "Both", "Pattern type"],\n          answer: 1,\n          explanation: "The outer loop controls rows, inner loop controls columns."\n        },\n        {\n          id: "' + prefix + '-cs-3-q3",\n          question: "For a hollow square of size 5, boundary stars?",\n          options: ["16", "20", "25", "12"],\n          answer: 0,\n          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."\n        },\n      ]\n    },\n  ],'
  });

  // 4. Mixed Practice Sets
  num++;
  sections.push({
    num: num,
    title: 'MIXED PRACTICE SETS',
    key: 'mixedPracticeSets',
    content: getSectionHeader(num, 'MIXED PRACTICE SETS', format) + '\n  mixedPracticeSets: [\n    {\n      id: "' + prefix + '-mps-1",\n      title: "Practice Set 1: ' + topic.charAt(0).toUpperCase() + topic.slice(1) + ' Fundamentals",\n      questions: [\n        {\n          type: "mcq",\n          id: "' + prefix + '-mps-1-q1",\n          question: "What is the output if the loop condition is false initially?",\n          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],\n          answer: 1\n        },\n        {\n          type: "fillInTheBlank",\n          id: "' + prefix + '-mps-1-q2",\n          question: "An entry-controlled loop checks the condition _____ each iteration.",\n          answer: "before"\n        },\n        {\n          type: "output",\n          id: "' + prefix + '-mps-1-q3",\n          question: "int i = 1;\\nwhile (i <= 3) {\\n    System.out.print(i + \\" \\");\\n    i++;\\n}",\n          answer: "1 2 3"\n        },\n        {\n          type: "trueFalse",\n          id: "' + prefix + '-mps-1-q4",\n          question: "A while loop can be converted to a for loop.",\n          answer: true\n        },\n        {\n          type: "shortAnswer",\n          id: "' + prefix + '-mps-1-q5",\n          question: "What is the difference between break and continue?",\n          answer: "break exits the loop completely. continue skips the current iteration."\n        },\n      ]\n    },\n    {\n      id: "' + prefix + '-mps-2",\n      title: "Practice Set 2: ' + topic.charAt(0).toUpperCase() + topic.slice(1) + ' Applications",\n      questions: [\n        {\n          type: "mcq",\n          id: "' + prefix + '-mps-2-q1",\n          question: "Which loop is best for menu-driven programs?",\n          options: ["for", "while", "do-while", "for-each"],\n          answer: 1\n        },\n        {\n          type: "output",\n          id: "' + prefix + '-mps-2-q2",\n          question: "int i = 5;\\nwhile (i >= 1) {\\n    System.out.print(i--);\\n}",\n          answer: "54321"\n        },\n        {\n          type: "errorFinding",\n          id: "' + prefix + '-mps-2-q3",\n          question: "int i = 1;\\nwhile (i <= 5);\\n    System.out.println(i);",\n          error: "Semicolon after while creates empty loop.",\n          corrected: "int i = 1;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n    i++;\\n}"\n        },\n        {\n          type: "programming",\n          id: "' + prefix + '-mps-2-q4",\n          question: "Write a program to calculate sum of first 10 natural numbers.",\n          solution: "int sum = 0, i = 1;\\nwhile (i <= 10) {\\n    sum = sum + i;\\n    i++;\\n}\\nSystem.out.println(sum);"\n        },\n        {\n          type: "assertionReason",\n          id: "' + prefix + '-mps-2-q5",\n          assertion: "A while loop may execute zero times.",\n          reason: "The condition is checked before entering the loop body.",\n          answer: 0\n        },\n      ]\n    },\n  ],'
  });

  // 5. Rapid Revision Questions
  num++;
  sections.push({
    num: num,
    title: 'RAPID REVISION QUESTIONS',
    key: 'rapidRevisionQuestions',
    content: getSectionHeader(num, 'RAPID REVISION QUESTIONS', format) + '\n  rapidRevisionQuestions: [\n    { id: "' + prefix + '-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },\n    { id: "' + prefix + '-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },\n    { id: "' + prefix + '-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },\n    { id: "' + prefix + '-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },\n    { id: "' + prefix + '-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },\n    { id: "' + prefix + '-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },\n    { id: "' + prefix + '-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },\n    { id: "' + prefix + '-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },\n    { id: "' + prefix + '-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },\n    { id: "' + prefix + '-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },\n    { id: "' + prefix + '-rr-11", question: "Can a while loop be nested?", answer: "Yes" },\n    { id: "' + prefix + '-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },\n    { id: "' + prefix + '-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },\n    { id: "' + prefix + '-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },\n    { id: "' + prefix + '-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },\n    { id: "' + prefix + '-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },\n    { id: "' + prefix + '-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },\n    { id: "' + prefix + '-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },\n    { id: "' + prefix + '-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },\n    { id: "' + prefix + '-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },\n  ],'
  });

  return sections;
}

// Process all files
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('write') && !f.includes('enrich') && !f.includes('inventory') && !f.includes('audit'));

for (const file of files) {
  const filePath = path.join(DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const chapterId = file.replace('.js', '');
  const topic = TOPICS[chapterId] || 'loop';
  const format = detectFormat(content);
  
  // Check which new sections already exist
  if (content.includes('assertionReason') && content.includes('debugTheCode') && 
      content.includes('caseStudyQuestions') && content.includes('mixedPracticeSets') && 
      content.includes('rapidRevisionQuestions')) {
    console.log(file + ': ✅ All 5 new sections already exist. Skipping.');
    continue;
  }
  
  const lastNum = getLastSectionNum(content);
  const newSections = generateSections(chapterId, topic, lastNum, format);
  
  // Filter to only add sections that don't exist
  const toAdd = newSections.filter(s => !content.includes(s.key));
  
  if (toAdd.length === 0) {
    console.log(file + ': ✅ All new sections already exist. Skipping.');
    continue;
  }
  
  // Insert before the closing of the object
  const insertPoint = content.lastIndexOf('};');
  if (insertPoint === -1) {
    console.log(file + ': ❌ Could not find insertion point.');
    continue;
  }
  
  const before = content.substring(0, insertPoint);
  const after = content.substring(insertPoint);
  
  let newContent = '';
  for (const section of toAdd) {
    newContent += '\n' + section.content + '\n';
  }
  
  const updated = before + newContent + '\n' + after;
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(file + ': ✅ Added ' + toAdd.length + ' new sections (AR=' + !content.includes('assertionReason') + ' DTC=' + !content.includes('debugTheCode') + ' CS=' + !content.includes('caseStudyQuestions') + ' MPS=' + !content.includes('mixedPracticeSets') + ' RR=' + !content.includes('rapidRevisionQuestions') + ')');
}