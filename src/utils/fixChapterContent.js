/**
 * Fixes the generic content added by addNewSections.js
 * Replaces loop-generic questions with chapter-specific ones.
 * Run: node src/utils/fixChapterContent.js
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'app', 'data', 'chapter-content');

// Chapter-specific assertion & reason questions
const ASSERTION_REASON = {
  '01-if': [
    { id: "if-ar-1", assertion: "Assertion (A): An if statement checks a condition before executing its block.", reason: "Reason (R): The condition in an if statement must evaluate to a boolean value.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 1, explanation: "Both are true. The if statement does check a condition, and that condition must be boolean. However, R explains the requirement, not the checking mechanism." },
    { id: "if-ar-2", assertion: "Assertion (A): Using = instead of == in an if condition causes a compilation error for int types.", reason: "Reason (R): The = operator is for assignment and returns the assigned value, not a boolean.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. Assignment returns int (not boolean), so Java gives a compilation error." },
    { id: "if-ar-3", assertion: "Assertion (A): A semicolon after if(condition) makes the if block always execute.", reason: "Reason (R): The semicolon ends the if statement, creating an empty body.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 2, explanation: "A is false — the semicolon creates an empty if body (the if does nothing). The next block is NOT part of the if. R is true." },
    { id: "if-ar-4", assertion: "Assertion (A): Without braces, only the first statement after if is conditional.", reason: "Reason (R): Java treats only the immediate next statement as the if body when braces are absent.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. Without braces, only the first statement belongs to the if block." },
    { id: "if-ar-5", assertion: "Assertion (A): The condition if(x > 5 && x < 10) checks if x is between 5 and 10.", reason: "Reason (R): The && operator returns true only when both conditions are true.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. x > 5 AND x < 10 means x is between 5 and 10 (exclusive)." },
    { id: "if-ar-6", assertion: "Assertion (A): The || operator short-circuits if the first condition is true.", reason: "Reason (R): In OR operation, if the first operand is true, the result is always true regardless of the second.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. || short-circuits: if left is true, right is not evaluated." },
    { id: "if-ar-7", assertion: "Assertion (A): Nested if statements allow checking multiple conditions hierarchically.", reason: "Reason (R): An if statement can be placed inside another if statement's block.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. Nested ifs allow hierarchical decision-making." },
    { id: "if-ar-8", assertion: "Assertion (A): The condition if(flag) is equivalent to if(flag == true) for boolean variables.", reason: "Reason (R): A boolean variable can be used directly as a condition.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. if(flag) is cleaner and preferred over if(flag == true)." },
    { id: "if-ar-9", assertion: "Assertion (A): The ! operator reverses a boolean value.", reason: "Reason (R): !true evaluates to false, and !false evaluates to true.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. The logical NOT operator (!) inverts the boolean value." },
    { id: "if-ar-10", assertion: "Assertion (A): An if statement can exist without an else block.", reason: "Reason (R): The else block is optional in Java's if-else construct.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. The else part is optional — if can be used alone." },
  ],
  '02-if-else': [
    { id: "ifelse-ar-1", assertion: "Assertion (A): In if-else, exactly one block always executes.", reason: "Reason (R): The if block runs when condition is true, else block runs when false.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. If-else guarantees exactly one path executes." },
    { id: "ifelse-ar-2", assertion: "Assertion (A): The else block cannot have a condition.", reason: "Reason (R): else is the default case that runs when the if condition is false.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. else has no condition — it's the fallback." },
    { id: "ifelse-ar-3", assertion: "Assertion (A): The ternary operator ? : can replace simple if-else statements.", reason: "Reason (R): The ternary operator returns a value based on a condition.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 1, explanation: "Both are true, but R explains how ternary works, not why it replaces if-else." },
    { id: "ifelse-ar-4", assertion: "Assertion (A): The dangling else problem occurs in nested if-else without braces.", reason: "Reason (R): An else always matches the nearest unmatched if.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. The dangling else binds to the nearest if." },
    { id: "ifelse-ar-5", assertion: "Assertion (A): An else-if ladder checks conditions from top to bottom.", reason: "Reason (R): The first true condition's block executes and the rest are skipped.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. Else-if ladder uses short-circuit evaluation." },
    { id: "ifelse-ar-6", assertion: "Assertion (A): Using multiple if statements is always better than else-if ladder.", reason: "Reason (R): Multiple if statements check all conditions regardless of previous results.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 3, explanation: "A is false — else-if is better for mutually exclusive conditions. R is true." },
    { id: "ifelse-ar-7", assertion: "Assertion (A): The condition if(x = 5) causes a compilation error in Java.", reason: "Reason (R): In Java, the condition must be a boolean expression.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. x = 5 returns int 5, not boolean, causing compilation error." },
    { id: "ifelse-ar-8", assertion: "Assertion (A): Short-circuit evaluation can skip evaluating the second condition.", reason: "Reason (R): && stops if left is false, || stops if left is true.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. Short-circuit evaluation prevents unnecessary evaluation." },
    { id: "ifelse-ar-9", assertion: "Assertion (A): The else-if must be written as two separate words.", reason: "Reason (R): elseif is not a valid Java keyword.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. It must be 'else if' (two words), not 'elseif'." },
    { id: "ifelse-ar-10", assertion: "Assertion (A): Nested if-else can create complex decision trees.", reason: "Reason (R): Placing if-else inside another if-else allows multi-level decisions.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explanation: "Both are true. Nesting allows hierarchical decision-making." },
  ],
};

// Chapter-specific debug the code questions
const DEBUG_THE_CODE = {
  '01-if': [
    { id: "if-dc-1", question: "Find and fix the bug:\nint x = 5;\nif (x = 10)\n    System.out.println(\"Equal\");", bug: "Using = instead of ==. Causes compilation error.", debuggedCode: "int x = 5;\nif (x == 10)\n    System.out.println(\"Equal\");", explanation: "Use == for comparison. = is for assignment." },
    { id: "if-dc-2", question: "Find and fix the bug:\nint x = 5;\nif (x > 3); {\n    System.out.println(\"x is greater than 3\");\n}", bug: "Semicolon after if creates empty body. Block always executes.", debuggedCode: "int x = 5;\nif (x > 3) {\n    System.out.println(\"x is greater than 3\");\n}", explanation: "Remove the semicolon after the if condition." },
    { id: "if-dc-3", question: "Find and fix the bug:\nint a = 10, b = 20;\nif (a > b)\n    System.out.println(\"a is greater\");\n    System.out.println(\"b is smaller\");", bug: "Missing braces. Second println always runs.", debuggedCode: "int a = 10, b = 20;\nif (a > b) {\n    System.out.println(\"a is greater\");\n    System.out.println(\"b is smaller\");\n}", explanation: "Without braces, only the first statement is conditional." },
    { id: "if-dc-4", question: "Find and fix the bug:\nint marks = 75;\nif (marks >= 40)\n    System.out.println(\"Pass\");\nelse\n    System.out.println(\"Fail\");\n    System.out.println(\"Result declared\");", bug: "No bug. Code is correct.", debuggedCode: "int marks = 75;\nif (marks >= 40)\n    System.out.println(\"Pass\");\nelse\n    System.out.println(\"Fail\");\n    System.out.println(\"Result declared\");", explanation: "The last println is outside if-else and always runs. This is correct." },
    { id: "if-dc-5", question: "Find and fix the bug:\nint age = 15;\nif (age >= 18);\n    System.out.println(\"Adult\");\nelse\n    System.out.println(\"Minor\");", bug: "Semicolon after if causes compilation error because else is dangling.", debuggedCode: "int age = 15;\nif (age >= 18)\n    System.out.println(\"Adult\");\nelse\n    System.out.println(\"Minor\");", explanation: "Remove the semicolon. The semicolon ends the if, leaving else without a matching if." },
    { id: "if-dc-6", question: "Find and fix the bug:\nint num = 7;\nif (num % 2 = 0)\n    System.out.println(\"Even\");", bug: "Using = instead of ==. Causes compilation error.", debuggedCode: "int num = 7;\nif (num % 2 == 0)\n    System.out.println(\"Even\");", explanation: "Use == for comparison. = is for assignment." },
    { id: "if-dc-7", question: "Find and fix the bug:\nboolean flag = true;\nif (flag == true)\n    System.out.println(\"True\");\nelse\n    System.out.println(\"False\");", bug: "No bug, but code can be cleaner.", debuggedCode: "boolean flag = true;\nif (flag)\n    System.out.println(\"True\");\nelse\n    System.out.println(\"False\");", explanation: "if(flag) is cleaner than if(flag == true). Both work correctly." },
    { id: "if-dc-8", question: "Find and fix the bug:\nint x = 10;\nif (x > 5) {\n    int y = 20;\n}\nSystem.out.println(y);", bug: "y is declared inside the if block and is not accessible outside.", debuggedCode: "int x = 10;\nint y = 0;\nif (x > 5) {\n    y = 20;\n}\nSystem.out.println(y);", explanation: "Variables declared inside a block are scoped to that block." },
    { id: "if-dc-9", question: "Find and fix the bug:\nint a = 5, b = 5;\nif (a = b)\n    System.out.println(\"Equal\");", bug: "Using = instead of ==. Causes compilation error.", debuggedCode: "int a = 5, b = 5;\nif (a == b)\n    System.out.println(\"Equal\");", explanation: "Use == for comparison. = is for assignment." },
    { id: "if-dc-10", question: "Find and fix the bug:\nint score = 85;\nif (score >= 90)\n    System.out.println(\"A\");\nif (score >= 80)\n    System.out.println(\"B\");\nif (score >= 70)\n    System.out.println(\"C\");", bug: "No bug, but using else-if would be more efficient.", debuggedCode: "int score = 85;\nif (score >= 90)\n    System.out.println(\"A\");\nelse if (score >= 80)\n    System.out.println(\"B\");\nelse if (score >= 70)\n    System.out.println(\"C\");", explanation: "Multiple ifs check all conditions. Else-if stops at first match." },
  ],
};

// Process all files
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('write') && !f.includes('enrich') && !f.includes('inventory') && !f.includes('audit') && !f.includes('fix'));

for (const file of files) {
  const filePath = path.join(DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const chapterId = file.replace('.js', '');
  
  // Fix assertion & reason questions if chapter-specific content exists
  if (ASSERTION_REASON[chapterId]) {
    const arContent = ASSERTION_REASON[chapterId];
    // Find the assertionReason section and replace it
    const arStart = content.indexOf('assertionReason: [');
    const arEnd = content.indexOf('],', arStart);
    if (arStart !== -1 && arEnd !== -1) {
      const before = content.substring(0, arStart);
      const after = content.substring(arEnd + 2);
      const newAR = 'assertionReason: ' + JSON.stringify(arContent, null, 2).replace(/^\[/, '[\n    ').replace(/\]$/, '\n  ]');
      content = before + newAR + after;
      console.log(file + ': ✅ Fixed assertionReason');
    }
  }
  
  // Fix debug the code questions if chapter-specific content exists
  if (DEBUG_THE_CODE[chapterId]) {
    const dcContent = DEBUG_THE_CODE[chapterId];
    const dcStart = content.indexOf('debugTheCode: [');
    const dcEnd = content.indexOf('],', dcStart);
    if (dcStart !== -1 && dcEnd !== -1) {
      const before = content.substring(0, dcStart);
      const after = content.substring(dcEnd + 2);
      const newDC = 'debugTheCode: ' + JSON.stringify(dcContent, null, 2).replace(/^\[/, '[\n    ').replace(/\]$/, '\n  ]');
      content = before + newDC + after;
      console.log(file + ': ✅ Fixed debugTheCode');
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('\n✅ Fix complete for all chapters with specific content.');