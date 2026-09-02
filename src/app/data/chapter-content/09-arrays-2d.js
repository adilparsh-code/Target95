const chapter09 = {
  id: "09-arrays-2d",
  title: "Arrays (Double Dimensional)",
  slug: "arrays-2d",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 100,
  topics: [
    "2D arrays",
    "matrix",
    "row-major traversal",
    "memory model",
    "array references",
    "nested loops",
    "diagonal",
    "transpose"
  ],
  introduction: {
    description: "A two-dimensional array stores values in rows and columns. In Java, a 2D array is an array whose elements are references to one-dimensional arrays.",
    realLifeExamples: [
      "A school timetable can be represented as rows and columns.",
      "A marks table can store students as rows and subjects as columns.",
      "A cinema seating chart can store seat status by row and column."
    ],
    commonMistakes: [
      "Confusing a[i][j] with a[j][i].",
      "Using arr.length for the number of columns instead of arr[i].length.",
      "Assuming Java stores a 2D array as one guaranteed contiguous rectangular block."
    ],
    whereUsed: ["Matrices and tables", "Game boards and seating grids", "Numerical and image-style grid data"]
  },
  theoryNotes: {
    beginnerExplanation: "Think of a 2D array as a table. a[i][j] means row i, column j. Indexing starts at 0. In Java, the outer array stores references to row arrays; each row is a separate array object.",
    importantPoints: [
      "a.length gives the number of row references in the outer array.",
      "a[i].length gives the length of the particular row.",
      "A rectangular array has equal row lengths, while a jagged array may have different row lengths.",
      "Java does not define a single numeric memory-address formula like base + offset for every 2D access because rows are separately allocated array objects.",
      "The expression a[i][j] first accesses the i-th row reference and then the j-th element of that row."
    ],
    memoryModel: {
      heading: "2D Array Memory Location in Java",
      explanation: "For a declaration such as int[][] a = {{10,20,30},{40,50,60}}, the variable a refers to an outer array. The outer array contains references to row arrays. Each row array has its own array object and storage. Therefore, do not teach a[i][j] as a guaranteed single contiguous memory-address calculation.",
      diagram: "a ──► outer array [ref0, ref1]\n             │       │\n             ▼       ▼\n         row 0     row 1\n        [10,20,30] [40,50,60]\n\nAccess a[1][2]:\n1. a[1] → reference to row 1\n2. [2] → third element of row 1\n3. value = 60",
      examNote: "For Java school-level questions, focus on index location and the two-step reference model. Avoid claiming that all rows have one fixed base address relationship unless the question explicitly defines a simplified memory model."
    },
    memoryAddressLocation: {
      questionStyle: "Locate an element in a 2D array",
      example: "int[][] a = {{11, 22, 33}, {44, 55, 66}};",
      steps: [
        "a[0][0] → first row, first column → 11",
        "a[0][2] → first row, third column → 33",
        "a[1][1] → second row, second column → 55",
        "a[1][2] → second row, third column → 66"
      ],
      reminder: "First index = row; second index = column. Java's 2D array is an array of row references, so the exact runtime memory address is implementation-dependent."
    },
    infixNotation: {
      heading: "Infix Notation and Operator Precedence in Java",
      definition: "In infix notation, the operator is written between its operands, for example A + B, A * B and (A + B) * C.",
      examples: [
        "A + B",
        "A - B",
        "A * B",
        "A / B",
        "(A + B) * C"
      ],
      precedence: [
        "Parentheses first: ( )",
        "Unary operators such as ++, --, +, -",
        "Multiplication, division and modulus: *, /, %",
        "Addition and subtraction: +, -",
        "Relational operators: <, <=, >, >=",
        "Equality: ==, !=",
        "Logical AND: &&",
        "Logical OR: ||",
        "Assignment operators are evaluated after higher-precedence expressions."
      ],
      examTips: [
        "If an expression contains parentheses, solve the innermost parentheses first.",
        "For operators at the same precedence level, Java generally evaluates left to right; associativity matters.",
        "Do not confuse infix notation with postfix or prefix increment notation."
      ],
      workedExamples: [
        {
          expression: "8 + 3 * 2",
          working: "Multiplication first → 8 + 6 → 14",
          answer: "14"
        },
        {
          expression: "(8 + 3) * 2",
          working: "Parentheses first → 11 * 2",
          answer: "22"
        },
        {
          expression: "20 / 5 + 2 * 3",
          working: "Division and multiplication first → 4 + 6",
          answer: "10"
        }
      ],
      note: "Infix notation is especially useful when tracing Java expressions inside array-processing programs."
    },
    memoryTricks: [
      "First index = row, second index = column.",
      "Outer array → row reference → element.",
      "For columns, use a[i].length when rows may be jagged.",
      "Infix: operand OP operand; use precedence before left-to-right evaluation."
    ],
    examTips: [
      "Write dimensions and indexes before tracing a nested loop.",
      "For a[i][j], identify i first as the row and j second as the column.",
      "For memory questions, describe references to row arrays rather than inventing physical addresses.",
      "For expression questions, mark parentheses and operator precedence before calculating."
    ]
  },
  syntax: {
    code: "int[][] a = new int[3][4];\nint[][] b = {{1, 2}, {3, 4}, {5, 6}};\nint x = b[1][0];",
    breakdown: [
      { keyword: "int[][]", explanation: "Declares a two-dimensional array of int references to row arrays." },
      { keyword: "new int[3][4]", explanation: "Creates 3 row arrays, each with 4 integer elements." },
      { keyword: "b[i][j]", explanation: "First obtains row i, then element j in that row." }
    ]
  },
  examples: {
    basic: [{
      title: "Print all elements row by row",
      code: "int[][] a = {{10, 20}, {30, 40}};\nfor (int i = 0; i < a.length; i++) {\n    for (int j = 0; j < a[i].length; j++)\n        System.out.print(a[i][j] + \" \" );\n    System.out.println();\n}",
      output: "10 20\n30 40",
      explanation: ["The outer loop selects a row.", "The inner loop visits the elements of that row."]
    }],
    intermediate: [{
      title: "Find row sums",
      code: "int[][] marks = {{12, 15, 18}, {10, 14, 16}};\nfor (int i = 0; i < marks.length; i++) {\n    int sum = 0;\n    for (int j = 0; j < marks[i].length; j++) sum += marks[i][j];\n    System.out.println(sum);\n}",
      output: "45\n40",
      explanation: ["A fresh sum is started for each row.", "Each row is processed independently."]
    }],
    advanced: [{
      title: "Transpose traversal",
      code: "int[][] a = {{1, 2, 3}, {4, 5, 6}};\nfor (int j = 0; j < a[0].length; j++) {\n    for (int i = 0; i < a.length; i++)\n        System.out.print(a[i][j] + \" \" );\n    System.out.println();\n}",
      output: "1 4\n2 5\n3 6",
      explanation: ["The outer loop fixes a column.", "The inner loop moves through rows, giving transpose order."]
    }]
  },
  dryRun: [{
    title: "Trace a diagonal sum",
    code: "int[][] a = {{2, 4}, {6, 8}};\nint s = 0;\nfor (int i = 0; i < 2; i++)\n    if (i == i) s += a[i][i];",
    trace: [
      { line: 1, explanation: "The matrix contains two rows." },
      { line: 2, explanation: "s starts at 0." },
      { line: 3, explanation: "i takes values 0 and 1." },
      { line: 4, explanation: "a[0][0] and a[1][1] are added → 2 + 8 = 10." }
    ]
  }],
  outputBasedQuestions: [
    { id: "arrays-2d-ob-1", question: "int[][] a={{1,2},{3,4}}; What is a[1][0]?", answer: "3", explanation: "Second row, first column." },
    { id: "arrays-2d-ob-2", question: "int[][] a={{2,4},{6,8}}; Find the sum of all elements.", answer: "20", explanation: "2 + 4 + 6 + 8 = 20." },
    { id: "arrays-2d-ob-3", question: "For int[][] a={{5,7,9},{2,4,6}}, what is a.length?", answer: "2", explanation: "There are two row arrays." },
    { id: "arrays-2d-ob-4", question: "For int[][] a={{5,7,9},{2,4,6}}, what is a[0].length?", answer: "3", explanation: "The first row has three elements." },
    { id: "arrays-2d-ob-5", question: "What is a[0][2] + a[1][1] for {{1,2,3},{4,5,6}}?", answer: "8", explanation: "3 + 5 = 8." },
    { id: "arrays-2d-ob-6", question: "What does a[1][2] locate in {{11,22,33},{44,55,66}}?", answer: "66", explanation: "Row 1 is the second row and column 2 is its third element." },
    { id: "arrays-2d-ob-7", question: "int[][] a={{2,3},{4,5}}; Find a[0][0] * a[1][1].", answer: "10", explanation: "2 × 5 = 10." },
    { id: "arrays-2d-ob-8", question: "What is printed by System.out.println(8 + 3 * 2);?", answer: "14", explanation: "Multiplication has higher precedence than addition." },
    { id: "arrays-2d-ob-9", question: "What is printed by System.out.println((8 + 3) * 2);?", answer: "22", explanation: "Parentheses are evaluated first." },
    { id: "arrays-2d-ob-10", question: "For int[][] a={{1,2,3},{4,5}}; what is a[1].length?", answer: "2", explanation: "The second row has two elements." },
    { id: "arrays-2d-ob-11", question: "For {{1,2},{3,4}}, what is the main-diagonal sum?", answer: "5", explanation: "1 + 4 = 5." },
    { id: "arrays-2d-ob-12", question: "Which is correct for a rectangular 2D array: a.length or a[i].length for the columns of row i?", answer: "a[i].length", explanation: "Column count belongs to the particular row." },
    { id: "arrays-2d-ob-13", question: "What is printed by 20 / 5 + 2 * 3?", answer: "10", explanation: "4 + 6 = 10." },
    { id: "arrays-2d-ob-14", question: "For {{9,8},{7,6}}, find a[0][1] + a[1][0].", answer: "15", explanation: "8 + 7 = 15." },
    { id: "arrays-2d-ob-15", question: "A jagged array has rows of lengths 3, 1 and 4. What is the length of the outer array?", answer: "3", explanation: "The outer array contains three row references." }
  ],
  errorFindingQuestions: [
    { id: "arrays-2d-ef-1", question: "int[][] a={{1,2},{3,4}}; System.out.println(a[2][0]);", error: "Row index 2 does not exist.", corrected: "Use a valid row index such as a[1][0]." },
    { id: "arrays-2d-ef-2", question: "for(int i=0;i<=a.length;i++)", error: "The condition allows i == a.length.", corrected: "Use i < a.length." },
    { id: "arrays-2d-ef-3", question: "for(int j=0;j<=a[i].length;j++)", error: "The condition allows an out-of-range column index.", corrected: "Use j < a[i].length." },
    { id: "arrays-2d-ef-4", question: "int[][] a={{1,2},{3}}; for(int j=0;j<2;j++) System.out.print(a[1][j]);", error: "Second row has only one element.", corrected: "Use j < a[1].length." },
    { id: "arrays-2d-ef-5", question: "System.out.println(a[0,1]);", error: "Java 2D indexing uses two bracket pairs.", corrected: "Write a[0][1]." },
    { id: "arrays-2d-ef-6", question: "for(int j=0;j<a.length;j++) sum += a[i][j];", error: "The inner loop is using the number of rows as the column bound.", corrected: "Use j < a[i].length." },
    { id: "arrays-2d-ef-7", question: "Explain the misconception that a Java 2D array always occupies one contiguous rectangular block.", error: "A Java 2D array is an outer array of row references; rows are separate array objects.", corrected: "Describe the two-level reference model." },
    { id: "arrays-2d-ef-8", question: "8 + 3 * 2 is evaluated as (8 + 3) * 2.", error: "This ignores operator precedence.", corrected: "Evaluate 3 * 2 first, giving 14." },
    { id: "arrays-2d-ef-9", question: "20 / (5 + 2 * 3) is evaluated as 20 / 5 + 6.", error: "The parentheses contain a full expression that must be evaluated first.", corrected: "Compute 5 + 6 = 11, then evaluate 20 / 11 using Java arithmetic rules." },
    { id: "arrays-2d-ef-10", question: "a[1][0] is described as first row, second column.", error: "The row and column meanings are reversed.", corrected: "a[1][0] means second row, first column." }
  ],
  fillInTheBlanks: [
    { id: "arrays-2d-fb-1", question: "The first index in a[i][j] represents the ______.", answer: "row" },
    { id: "arrays-2d-fb-2", question: "The second index in a[i][j] represents the ______.", answer: "column" },
    { id: "arrays-2d-fb-3", question: "The number of row references in a 2D array is given by ______.", answer: "a.length" },
    { id: "arrays-2d-fb-4", question: "The length of row i is given by ______.", answer: "a[i].length" },
    { id: "arrays-2d-fb-5", question: "Java arrays start indexing from ______.", answer: "0" },
    { id: "arrays-2d-fb-6", question: "In infix notation, the operator is written ______ the operands.", answer: "between" },
    { id: "arrays-2d-fb-7", question: "In 8 + 3 * 2, multiplication is evaluated before ______.", answer: "addition" },
    { id: "arrays-2d-fb-8", question: "A Java 2D array is an outer array containing ______ to row arrays.", answer: "references" }
  ],
  mcqs: [
    { id: "arrays-2d-mcq-1", question: "For int[][] a={{1,2},{3,4}}, what is a[1][1]?", options: ["1", "2", "3", "4"], answer: "4", explanation: "Second row, second column." },
    { id: "arrays-2d-mcq-2", question: "Which expression gives the length of row i?", options: ["a.length", "a[i].length", "a[0]", "a[i][j]"], answer: "a[i].length", explanation: "Each row is a separate array." },
    { id: "arrays-2d-mcq-3", question: "What is a Java 2D array most accurately described as?", options: ["Always one flat block", "An array of row references", "A linked list", "A String"], answer: "An array of row references", explanation: "Java's multidimensional arrays are arrays of arrays." },
    { id: "arrays-2d-mcq-4", question: "What is 8 + 3 * 2 in Java?", options: ["22", "14", "16", "13"], answer: "14", explanation: "* has higher precedence than +." },
    { id: "arrays-2d-mcq-5", question: "Which notation is infix?", options: ["+ A B", "A B +", "A + B", "++A"], answer: "A + B", explanation: "The operator appears between its operands." },
    { id: "arrays-2d-mcq-6", question: "For a={{1,2,3},{4,5}}, which is the safest inner-loop bound?", options: ["j <= a.length", "j < a[i].length", "j < a.length", "j <= a[i].length"], answer: "j < a[i].length", explanation: "It works correctly for each row, including jagged arrays." },
    { id: "arrays-2d-mcq-7", question: "What does a[1][2] mean?", options: ["Second column, third row", "Second row, third column", "First row, third column", "Third row, second column"], answer: "Second row, third column", explanation: "The first index is the row." },
    { id: "arrays-2d-mcq-8", question: "What should be evaluated first in (A + B) * C?", options: ["C", "*", "A + B", "Everything left to right"], answer: "A + B", explanation: "Parentheses have higher precedence." }
  ],
  programmingQuestions: [
    { id: "arrays-2d-pr-1", title: "Row and column totals", prompt: "Write a Java program to input a rectangular matrix and print the sum of each row and each column.", hints: ["Use nested loops.", "Maintain separate row and column sums."] },
    { id: "arrays-2d-pr-2", title: "Main diagonal", prompt: "Write a Java program to print the main diagonal of a square matrix and calculate its sum.", hints: ["Main diagonal positions satisfy i == j."] },
    { id: "arrays-2d-pr-3", title: "Transpose", prompt: "Write a Java program to display the transpose of a matrix without changing the original array.", hints: ["Outer loop can iterate through columns.", "Inner loop can iterate through rows."] },
    { id: "arrays-2d-pr-4", title: "Memory model explanation", prompt: "Given int[][] a = {{10,20},{30,40}}, explain the reference path used to access a[1][0] and identify the value.", hints: ["Follow a → row reference → element."] },
    { id: "arrays-2d-pr-5", title: "Expression trace", prompt: "Evaluate and explain the Java expression (a + b) * c - d / e using infix precedence and left-to-right rules where applicable.", hints: ["Parentheses first, then multiplication/division, then addition/subtraction."] }
  ],
  caseBasedQuestions: [
    {
      id: "arrays-2d-cb-1",
      title: "School marks matrix",
      scenario: "A school stores marks for students in a 2D array, with students as rows and subjects as columns.",
      questions: [
        "Explain what marks[2][1] represents.",
        "Write the expression for the number of students.",
        "Write the expression for the number of subjects in student row 2.",
        "Explain why a[i].length is safer than a.length for a jagged structure."
      ]
    },
    {
      id: "arrays-2d-cb-2",
      title: "Tracing a billing expression",
      scenario: "A program calculates a total using the Java expression (quantity * price) + tax - discount / 100. The student must justify the evaluation order.",
      questions: [
        "Identify the infix operators.",
        "State the precedence order relevant to the expression.",
        "Explain the role of parentheses.",
        "Show the order in which the sub-expressions should be evaluated."
      ]
    }
  ]
};

export default chapter09;
