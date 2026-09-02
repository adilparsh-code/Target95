const chapter09 = {
  id: "09-arrays-2d",
  title: "Arrays (Double Dimensional)",
  slug: "arrays-2d",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 105,
  topics: [
    "2D arrays",
    "matrix",
    "row-wise traversal",
    "column-wise traversal",
    "memory model",
    "array references",
    "nested loops",
    "row sums",
    "column sums",
    "diagonal",
    "transpose",
    "infix notation"
  ],
  introduction: {
    description: "A two-dimensional array stores values in rows and columns. In Java, a 2D array is an array whose elements are references to one-dimensional row arrays.",
    realLifeExamples: [
      "A school timetable can be represented as rows and columns.",
      "A marks table can store students as rows and subjects as columns.",
      "A cinema seating chart can store seat status by row and column."
    ],
    commonMistakes: [
      "Confusing a[i][j] with a[j][i].",
      "Using a.length as the number of columns for every row.",
      "Assuming Java stores a 2D array as one guaranteed contiguous rectangular memory block.",
      "Forgetting that column-wise traversal changes which index is controlled by the outer loop."
    ],
    whereUsed: ["Matrices and tables", "Game boards and seating grids", "Numerical and image-style grid data"]
  },
  theoryNotes: {
    beginnerExplanation: "Think of a 2D array as a table. a[i][j] means row i, column j. Indexing starts at 0. In Java, the outer array stores references to row arrays; each row is a separate array object.",
    importantPoints: [
      "a.length gives the number of row references in the outer array.",
      "a[i].length gives the length of the particular row.",
      "Row-wise traversal normally fixes a row and moves across its columns.",
      "Column-wise traversal normally fixes a column and moves down the rows.",
      "A rectangular array has equal row lengths, while a jagged array may have different row lengths.",
      "Java does not define one universal numeric memory-address formula for every a[i][j] access because rows are separately allocated array objects.",
      "The expression a[i][j] first obtains the i-th row reference and then the j-th element of that row."
    ],
    memoryModel: {
      heading: "2D Array Memory Location in Java",
      explanation: "For int[][] a = {{10,20,30},{40,50,60}}, the variable a refers to an outer array. The outer array contains references to row arrays. Each row is a separate array object. Therefore, a[i][j] should be understood as a two-step reference operation, not as a guaranteed base-address-plus-fixed-offset calculation.",
      diagram: "a ──► outer array [ref0, ref1]\n             │       │\n             ▼       ▼\n         row 0     row 1\n        [10,20,30] [40,50,60]\n\nAccess a[1][2]:\n1. a[1] → reference to row 1\n2. [2] → third element of row 1\n3. value = 60",
      examNote: "For Java school-level questions, focus on index location and the two-level reference model. Exact runtime memory addresses are implementation-dependent."
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
      reminder: "First index = row; second index = column. Java's 2D array is an array of row references, so the exact runtime address is implementation-dependent."
    },
    infixNotation: {
      heading: "Infix Notation and Operator Precedence in Java",
      definition: "In infix notation, the operator is written between its operands, for example A + B, A * B and (A + B) * C.",
      examples: ["A + B", "A - B", "A * B", "A / B", "(A + B) * C"],
      precedence: [
        "Parentheses first: ( )",
        "Unary operators such as ++, --, +, -",
        "Multiplication, division and modulus: *, /, %",
        "Addition and subtraction: +, -",
        "Relational operators: <, <=, >, >=",
        "Equality: ==, !=",
        "Logical AND: &&",
        "Logical OR: ||",
        "Assignment operators follow higher-precedence expressions."
      ],
      examTips: [
        "Solve the innermost parentheses first.",
        "For operators at the same precedence level, associativity matters; arithmetic operators of the same level generally evaluate left to right.",
        "Do not confuse infix notation with prefix or postfix increment notation."
      ],
      workedExamples: [
        { expression: "8 + 3 * 2", working: "3 * 2 first → 8 + 6 → 14", answer: "14" },
        { expression: "(8 + 3) * 2", working: "Parentheses first → 11 * 2", answer: "22" },
        { expression: "20 / 5 + 2 * 3", working: "20 / 5 and 2 * 3 first → 4 + 6", answer: "10" }
      ],
      note: "Infix reasoning is useful when tracing expressions inside array-processing programs."
    },
    traversal: {
      heading: "Row-wise and Column-wise Traversal",
      rowWise: {
        explanation: "Outer loop selects a row; inner loop moves across columns in that row.",
        code: "for (int i = 0; i < a.length; i++) {\n    for (int j = 0; j < a[i].length; j++)\n        System.out.print(a[i][j] + \" \" );\n    System.out.println();\n}",
        outputExample: "1 2 3\n4 5 6"
      },
      columnWise: {
        explanation: "For a rectangular matrix, outer loop selects a column; inner loop moves through rows. The column bound comes from the number of columns and the row bound from a.length.",
        code: "for (int j = 0; j < a[0].length; j++) {\n    for (int i = 0; i < a.length; i++)\n        System.out.print(a[i][j] + \" \" );\n    System.out.println();\n}",
        outputExample: "1 4\n2 5\n3 6",
        warning: "The simple column-wise form assumes a rectangular matrix. For jagged arrays, a missing element may exist in some row, so the traversal strategy must be adapted."
      },
      memoryTrick: "Row-wise: fix i, change j. Column-wise: fix j, change i."
    },
    memoryTricks: [
      "First index = row, second index = column.",
      "Outer array → row reference → element.",
      "Row-wise: fix i, vary j. Column-wise: fix j, vary i.",
      "For row lengths, use a[i].length when rows may be jagged.",
      "Infix: operand OP operand; apply precedence before left-to-right evaluation."
    ],
    examTips: [
      "Write dimensions and indexes before tracing a nested loop.",
      "For a[i][j], identify i first as the row and j second as the column.",
      "For memory questions, describe references to row arrays instead of inventing physical addresses.",
      "For column-wise output, check whether the question guarantees a rectangular matrix.",
      "For expression questions, mark parentheses and operator precedence before calculating."
    ]
  },
  syntax: {
    code: "int[][] a = new int[3][4];\nint[][] b = {{1, 2}, {3, 4}, {5, 6}};\nint x = b[1][0];",
    breakdown: [
      { keyword: "int[][]", explanation: "Declares a two-dimensional array whose outer elements refer to int row arrays." },
      { keyword: "new int[3][4]", explanation: "Creates 3 row arrays, each with 4 integer elements." },
      { keyword: "b[i][j]", explanation: "First obtains row i, then element j in that row." }
    ]
  },
  examples: {
    basic: [{
      title: "Print all elements row by row",
      code: "int[][] a = {{10, 20}, {30, 40}};\nfor (int i = 0; i < a.length; i++) {\n    for (int j = 0; j < a[i].length; j++)\n        System.out.print(a[i][j] + \" \" );\n    System.out.println();\n}",
      output: "10 20\n30 40",
      explanation: ["The outer loop selects a row.", "The inner loop visits that row's columns."]
    }],
    intermediate: [{
      title: "Row totals and column totals",
      code: "int[][] marks = {{12, 15, 18}, {10, 14, 16}};\nfor (int i = 0; i < marks.length; i++) {\n    int sum = 0;\n    for (int j = 0; j < marks[i].length; j++) sum += marks[i][j];\n    System.out.println(\"Row sum = \" + sum);\n}\nfor (int j = 0; j < marks[0].length; j++) {\n    int sum = 0;\n    for (int i = 0; i < marks.length; i++) sum += marks[i][j];\n    System.out.println(\"Column sum = \" + sum);\n}",
      output: "Row sum = 45\nRow sum = 40\nColumn sum = 22\nColumn sum = 29\nColumn sum = 34",
      explanation: ["The first nested loop processes rows.", "The second nested loop fixes each column and moves through rows."]
    }],
    advanced: [{
      title: "Column-wise traversal",
      code: "int[][] a = {{1, 2, 3}, {4, 5, 6}};\nfor (int j = 0; j < a[0].length; j++) {\n    for (int i = 0; i < a.length; i++)\n        System.out.print(a[i][j] + \" \" );\n    System.out.println();\n}",
      output: "1 4\n2 5\n3 6",
      explanation: ["The outer loop fixes a column.", "The inner loop visits every row in that column.", "This is the same order commonly used to display the transpose of a rectangular matrix."]
    }]
  },
  dryRun: [{
    title: "Trace column-wise traversal",
    code: "int[][] a = {{1, 2}, {3, 4}, {5, 6}};\nfor (int j = 0; j < 2; j++) {\n    for (int i = 0; i < 3; i++)\n        System.out.print(a[i][j] + \" \" );\n    System.out.println();\n}",
    trace: [
      { line: 1, explanation: "The matrix has 3 rows and 2 columns." },
      { line: 2, explanation: "j = 0 selects the first column." },
      { line: 3, explanation: "i takes 0, 1, 2, so values 1, 3, 5 are printed." },
      { line: 2, explanation: "j = 1 selects the second column." },
      { line: 3, explanation: "i takes 0, 1, 2, so values 2, 4, 6 are printed." }
    ]
  }],
  outputBasedQuestions: [
    { id: "arrays-2d-ob-1", question: "int[][] a={{1,2},{3,4}}; What is a[1][0]?", answer: "3", explanation: "Second row, first column." },
    { id: "arrays-2d-ob-2", question: "What is printed by System.out.println(8 + 3 * 2);?", answer: "14", explanation: "Multiplication has higher precedence than addition." },
    { id: "arrays-2d-ob-3", question: "What is printed by System.out.println((8 + 3) * 2);?", answer: "22", explanation: "Parentheses are evaluated first." },
    { id: "arrays-2d-ob-4", question: "For int[][] a={{5,7,9},{2,4,6}}, what is a.length?", answer: "2", explanation: "There are two row arrays." },
    { id: "arrays-2d-ob-5", question: "For int[][] a={{5,7,9},{2,4,6}}, what is a[0].length?", answer: "3", explanation: "The first row has three elements." },
    { id: "arrays-2d-ob-6", question: "What is the main-diagonal sum of {{1,2},{3,4}}?", answer: "5", explanation: "1 + 4 = 5." },
    { id: "arrays-2d-ob-7", question: "What is printed column-wise for {{1,2},{3,4}} when j is the outer loop?", answer: "1 3 / 2 4", explanation: "First column: 1,3; second column: 2,4." },
    { id: "arrays-2d-ob-8", question: "For {{1,2,3},{4,5,6}}, what is the sum of column 1?", answer: "7", explanation: "Column 1 contains 2 and 5." },
    { id: "arrays-2d-ob-9", question: "For {{1,2,3},{4,5,6}}, what is the sum of column 2?", answer: "9", explanation: "Column 2 contains 3 and 6." },
    { id: "arrays-2d-ob-10", question: "What does a[1][2] locate in {{11,22,33},{44,55,66}}?", answer: "66", explanation: "Second row, third column." },
    { id: "arrays-2d-ob-11", question: "Which loop pattern is column-wise for a rectangular matrix?", answer: "Outer j loop, inner i loop", explanation: "The column index is fixed by the outer loop." },
    { id: "arrays-2d-ob-12", question: "What is 20 / 5 + 2 * 3 in Java?", answer: "10", explanation: "4 + 6 = 10." },
    { id: "arrays-2d-ob-13", question: "For {{1,2},{3,4}}, what does a[0][1] + a[1][0] evaluate to?", answer: "5", explanation: "2 + 3 = 5." },
    { id: "arrays-2d-ob-14", question: "A Java 2D array is most accurately described as what?", answer: "An outer array of row references", explanation: "Rows are separate array objects." },
    { id: "arrays-2d-ob-15", question: "A jagged array has row lengths 3, 1 and 4. What is a.length?", answer: "3", explanation: "The outer array contains three row references." },
    { id: "arrays-2d-ob-16", question: "For {{2,4},{6,8}}, what is the product of the main diagonal?", answer: "16", explanation: "2 × 8 = 16." },
    { id: "arrays-2d-ob-17", question: "For {{1,2,3},{4,5,6}}, what is the first column sum?", answer: "5", explanation: "1 + 4 = 5." },
    { id: "arrays-2d-ob-18", question: "Which element is at row 0, column 2 in {{7,8,9}}?", answer: "9", explanation: "Column indexes start at 0." },
    { id: "arrays-2d-ob-19", question: "Why is j < a[i].length safer than j < a.length for row traversal?", answer: "The row length may differ from the number of rows", explanation: "This matters especially for jagged arrays." },
    { id: "arrays-2d-ob-20", question: "What is the output of column-wise traversal of {{10,20,30},{40,50,60}}?", answer: "10 40 / 20 50 / 30 60", explanation: "Each column is printed top to bottom." }
  ],
  errorFindingQuestions: [
    { id: "arrays-2d-ef-1", question: "int[][] a={{1,2},{3,4}}; System.out.println(a[2][0]);", error: "Row index 2 does not exist.", corrected: "Use a valid row index such as a[1][0]." },
    { id: "arrays-2d-ef-2", question: "for(int i=0;i<=a.length;i++)", error: "The condition allows i == a.length.", corrected: "Use i < a.length." },
    { id: "arrays-2d-ef-3", question: "for(int j=0;j<=a[i].length;j++)", error: "The condition allows an out-of-range column index.", corrected: "Use j < a[i].length." },
    { id: "arrays-2d-ef-4", question: "for(int i=0;i<3;i++) for(int j=0;j<2;j++) print(a[j][i]);", error: "The row and column indexes are swapped for the declared dimensions.", corrected: "Use a[i][j] when i is the row and j is the column, or deliberately change loop bounds to match the intended traversal." },
    { id: "arrays-2d-ef-5", question: "int[][] a={{1,2},{3}}; for(int j=0;j<2;j++) System.out.print(a[1][j]);", error: "Second row has only one element.", corrected: "Use j < a[1].length." },
    { id: "arrays-2d-ef-6", question: "for(int j=0;j<a.length;j++) sum += a[i][j];", error: "The inner loop is using the number of rows as the column bound.", corrected: "Use j < a[i].length." },
    { id: "arrays-2d-ef-7", question: "Explain the misconception that a Java 2D array always occupies one contiguous rectangular block.", error: "Java uses an outer array of row references; rows are separate array objects.", corrected: "Describe the two-level reference model." },
    { id: "arrays-2d-ef-8", question: "8 + 3 * 2 is evaluated as (8 + 3) * 2.", error: "This ignores operator precedence.", corrected: "Evaluate 3 * 2 first, giving 14." },
    { id: "arrays-2d-ef-9", question: "a[1][0] is described as first row, second column.", error: "The row and column meanings are reversed.", corrected: "a[1][0] means second row, first column." },
    { id: "arrays-2d-ef-10", question: "In column-wise traversal of a 2 × 3 rectangular matrix, the code uses for(int i=0;i<2;i++) as the outer loop.", error: "The outer loop is selecting rows, not columns.", corrected: "Use the column loop as the outer loop when column-wise order is required: for(int j=0;j<3;j++)." }
  ],
  fillInTheBlanks: [
    { id: "arrays-2d-fb-1", question: "In a[i][j], the first index represents the ______.", answer: "row" },
    { id: "arrays-2d-fb-2", question: "In a[i][j], the second index represents the ______.", answer: "column" },
    { id: "arrays-2d-fb-3", question: "a.length gives the number of ______ references in the outer array.", answer: "row" },
    { id: "arrays-2d-fb-4", question: "For row i, a[i].length gives the number of ______ in that row.", answer: "elements" },
    { id: "arrays-2d-fb-5", question: "For column-wise traversal, the ______ index is normally controlled by the outer loop.", answer: "column" },
    { id: "arrays-2d-fb-6", question: "In infix notation, the operator appears ______ the operands.", answer: "between" },
    { id: "arrays-2d-fb-7", question: "In 8 + 3 * 2, multiplication is evaluated before ______.", answer: "addition" },
    { id: "arrays-2d-fb-8", question: "A Java 2D array is an outer array containing ______ to row arrays.", answer: "references" }
  ],
  mcqs: [
    { id: "arrays-2d-mcq-1", question: "For int[][] a={{1,2},{3,4}}, what is a[1][1]?", options: ["1", "2", "3", "4"], answer: "4", explanation: "Second row, second column." },
    { id: "arrays-2d-mcq-2", question: "Which expression gives the length of row i?", options: ["a.length", "a[i].length", "a[0]", "a[i][j]"], answer: "a[i].length", explanation: "Each row is a separate array." },
    { id: "arrays-2d-mcq-3", question: "What is a Java 2D array most accurately described as?", options: ["Always one flat block", "An array of row references", "A linked list", "A String"], answer: "An array of row references", explanation: "Java's multidimensional arrays are arrays of arrays." },
    { id: "arrays-2d-mcq-4", question: "What is 8 + 3 * 2 in Java?", options: ["22", "14", "16", "13"], answer: "14", explanation: "* has higher precedence than +." },
    { id: "arrays-2d-mcq-5", question: "Which notation is infix?", options: ["+ A B", "A B +", "A + B", "++A"], answer: "A + B", explanation: "The operator appears between its operands." },
    { id: "arrays-2d-mcq-6", question: "For a={{1,2,3},{4,5}}, which is the safest inner-loop bound for a row traversal?", options: ["j <= a.length", "j < a[i].length", "j < a.length", "j <= a[i].length"], answer: "j < a[i].length", explanation: "It matches the current row length." },
    { id: "arrays-2d-mcq-7", question: "What does a[1][2] mean?", options: ["Second column, third row", "Second row, third column", "First row, third column", "Third row, second column"], answer: "Second row, third column", explanation: "The first index is the row." },
    { id: "arrays-2d-mcq-8", question: "What should be evaluated first in (A + B) * C?", options: ["C", "*", "A + B", "Everything left to right"], answer: "A + B", explanation: "Parentheses are evaluated first." },
    { id: "arrays-2d-mcq-9", question: "For column-wise traversal of a rectangular matrix, which index is normally the outer loop index?", options: ["The row index", "The column index", "Both simultaneously", "Neither"], answer: "The column index", explanation: "Fix the column, then move through rows." },
    { id: "arrays-2d-mcq-10", question: "Which output order is column-wise for {{1,2},{3,4}}?", options: ["1 2 3 4", "1 3 2 4", "2 1 4 3", "3 4 1 2"], answer: "1 3 2 4", explanation: "First column top-to-bottom, then second column." }
  ],
  programmingQuestions: [
    { id: "arrays-2d-pr-1", title: "Row and column totals", prompt: "Write a Java program to input a rectangular matrix and print the sum of each row and each column.", hints: ["Use nested loops.", "For each column, keep the column index fixed in the outer loop."] },
    { id: "arrays-2d-pr-2", title: "Column-wise display", prompt: "Write a Java program to display a rectangular matrix column-wise rather than row-wise.", hints: ["Use j as the outer loop and i as the inner loop."] },
    { id: "arrays-2d-pr-3", title: "Main diagonal", prompt: "Write a Java program to print the main diagonal of a square matrix and calculate its sum.", hints: ["Main diagonal positions satisfy i == j."] },
    { id: "arrays-2d-pr-4", title: "Transpose", prompt: "Write a Java program to display the transpose of a matrix without changing the original array.", hints: ["For a rectangular matrix, use column-wise traversal order."] },
    { id: "arrays-2d-pr-5", title: "Memory model explanation", prompt: "Given int[][] a = {{10,20},{30,40}}, explain the reference path used to access a[1][0] and identify the value.", hints: ["Follow a → row reference → element."] },
    { id: "arrays-2d-pr-6", title: "Expression trace", prompt: "Evaluate and explain the Java expression (a + b) * c - d / e using infix precedence and associativity.", hints: ["Parentheses first, then multiplication/division, then addition/subtraction."] }
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
        "Explain why a[i].length is safer than a.length for a jagged structure.",
        "Write the loop idea needed to calculate the total for each subject column."
      ]
    },
    {
      id: "arrays-2d-cb-2",
      title: "Column-wise report",
      scenario: "A school wants to print a marks matrix subject-wise so that all students' marks for Subject 1 appear together, followed by Subject 2 and so on.",
      questions: [
        "Which index should be controlled by the outer loop?",
        "Which index should be controlled by the inner loop?",
        "What output order is produced for {{10,20},{30,40}}?",
        "Why does the simple form require a rectangular matrix?"
      ]
    },
    {
      id: "arrays-2d-cb-3",
      title: "Tracing an expression",
      scenario: "A billing program calculates a total using the Java expression (quantity * price) + tax - discount / 100.",
      questions: [
        "Identify the infix operators.",
        "State the relevant precedence order.",
        "Explain the role of parentheses.",
        "Show the order in which the sub-expressions are evaluated."
      ]
    }
  ]
};

export default chapter09;
