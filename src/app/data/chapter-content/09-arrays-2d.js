const chapter09 = {
  id: "09-arrays-2d",
  title: "Arrays (Double Dimensional)",
  slug: "arrays-2d",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 90,
  topics: ["2D arrays", "matrix", "row-major", "nested loops", "diagonal", "transpose"],
  introduction: {
    description: "A two-dimensional array stores values in rows and columns. In Java, it is an array whose elements are themselves one-dimensional arrays.",
    realLifeExamples: ["A school timetable can be represented as rows for periods and columns for days.", "A marks table can store students as rows and subjects as columns.", "A cinema seating chart can store seat status using row and column positions."],
    commonMistakes: ["Using arr.length for both dimensions when rows may have different lengths.", "Starting a loop at 1 instead of 0 and skipping the first row or column.", "Mixing row and column indexes when accessing arr[i][j]."],
    whereUsed: ["Matrices and tables", "Game boards and seating grids", "Image and numerical data processing"]
  },
  theoryNotes: {
    beginnerExplanation: "Think of a 2D array as a table. arr[i][j] means row i, column j. Java arrays are zero-indexed, so the first element is arr[0][0].",
    importantPoints: ["arr.length gives the number of rows.", "arr[i].length gives the number of columns in row i.", "Nested loops are commonly used to visit every element.", "Java supports jagged arrays where rows can have different lengths.", "Diagonal and transpose operations require careful index reasoning."],
    memoryTricks: ["First index = row, second index = column.", "For every row, use a fresh j loop from 0 to a[i].length - 1.", "Main diagonal: row index equals column index."],
    examTips: ["Write the dimensions and indexes before tracing a nested loop.", "Identify whether traversal is row-wise or column-wise.", "For jagged arrays, never assume every row has the same length.", "Show initialization, traversal condition, and final result clearly in board answers."]
  },
  syntax: {
    code: "int[][] a = new int[3][4];\nint[][] b = {{1, 2}, {3, 4}, {5, 6}};",
    breakdown: [{ keyword: "int[][]", explanation: "Declares a two-dimensional integer array." }, { keyword: "new int[3][4]", explanation: "Creates 3 rows, each containing 4 integer elements." }, { keyword: "b[i][j]", explanation: "Accesses the element at row i and column j." }]
  },
  examples: {
    basic: [{ title: "Print all elements row by row", code: "int[][] a = {{10, 20}, {30, 40}};\nfor (int i = 0; i < a.length; i++) {\n    for (int j = 0; j < a[i].length; j++)\n        System.out.print(a[i][j] + \" \");\n    System.out.println();\n}", output: "10 20\n30 40", explanation: ["The outer loop selects each row.", "The inner loop visits every column in that row."] }],
    intermediate: [{ title: "Find row sums", code: "int[][] marks = {{12, 15, 18}, {10, 14, 16}};\nfor (int i = 0; i < marks.length; i++) {\n    int sum = 0;\n    for (int j = 0; j < marks[i].length; j++) sum += marks[i][j];\n    System.out.println(sum);\n}", output: "45\n40", explanation: ["A new sum is started for each row.", "Each row's values are accumulated before printing."] }],
    advanced: [{ title: "Transpose a 2 × 3 matrix", code: "int[][] a = {{1, 2, 3}, {4, 5, 6}};\nfor (int j = 0; j < a[0].length; j++) {\n    for (int i = 0; i < a.length; i++)\n        System.out.print(a[i][j] + \" \");\n    System.out.println();\n}", output: "1 4\n2 5\n3 6", explanation: ["The column index is fixed by the outer loop.", "The row index changes in the inner loop, producing the transpose traversal."] }]
  },
  dryRun: [{ title: "Trace a 2 × 2 matrix", code: "int[][] a = {{2, 4}, {6, 8}};\nint s = 0;\nfor (int i = 0; i < 2; i++)\n    for (int j = 0; j < 2; j++)\n        if (i == j) s += a[i][j];", trace: [{ line: 1, explanation: "Matrix values are stored as two rows." }, { line: 2, explanation: "s starts at 0." }, { line: 3, explanation: "The loops visit (0,0), (0,1), (1,0), (1,1)." }, { line: 4, explanation: "Only diagonal positions are added, so s becomes 10." }] }],
  outputBasedQuestions: [
    { id: "arrays-2d-ob-1", question: "What is printed by int[][] a={{1,2},{3,4}}; System.out.println(a[1][0]);", answer: "3", explanation: "Row 1 is the second row and column 0 is its first element." },
    { id: "arrays-2d-ob-2", question: "Find the output: int[][] a={{2,4},{6,8}}; int s=0; for(int i=0;i<2;i++) for(int j=0;j<2;j++) s+=a[i][j]; System.out.println(s);", answer: "20", explanation: "All four elements are added." },
    { id: "arrays-2d-ob-3", question: "What is printed by int[][] a={{5,7,9},{2,4,6}}; System.out.println(a.length);", answer: "2", explanation: "There are two row arrays." },
    { id: "arrays-2d-ob-4", question: "What is printed by int[][] a={{5,7,9},{2,4,6}}; System.out.println(a[0].length);", answer: "3", explanation: "The first row contains three elements." },
    { id: "arrays-2d-ob-5", question: "Find the output: int[][] a={{1,2,3},{4,5,6}}; System.out.print(a[0][2]+a[1][1]);", answer: "8", explanation: "a[0][2] is 3 and a[1][1] is 5." },
    { id: "arrays-2d-ob-6", question: "What is printed? int[][] a={{1,2},{3,4}}; for(int i=1;i>=0;i--) System.out.print(a[i][0]+\" \" );", answer: "3 1 ", explanation: "Rows are visited from bottom to top." },
    { id: "arrays-2d-ob-7", question: "Find the output: int[][] a={{2,3},{4,5}}; int p=1; for(int i=0;i<2;i++) p*=a[i][i]; System.out.println(p);", answer: "10", explanation: "The main diagonal contains 2 and 5." },
    { id: "arrays-2d-ob-8", question: "What is printed? int[][] a={{10,20},{30,40}}; System.out.println(a[1][1]-a[0][1]);", answer: "20", explanation: "40 - 20 = 20." },
    { id: "arrays-2d-ob-9", question: "What is printed? int[][] a={{1,2},{3,4}}; for(int j=0;j<2;j++) System.out.print(a[0][j]+\" \" );", answer: "1 2 ", explanation: "Only the first row is traversed." },
    { id: "arrays-2d-ob-10", question: "Find the output: int[][] a={{3,1},{2,5}}; int max=a[0][0]; for(int i=0;i<2;i++) for(int j=0;j<2;j++) if(a[i][j]>max) max=a[i][j]; System.out.println(max);", answer: "5", explanation: "The largest matrix element is 5." },
    { id: "arrays-2d-ob-11", question: "What is printed? int[][] a={{1,2,3},{4,5}}; System.out.println(a[1].length);", answer: "2", explanation: "The second row has two elements; this is a jagged array." },
    { id: "arrays-2d-ob-12", question: "Find the output: int[][] a={{1,2,3},{4,5,6}}; int s=0; for(int i=0;i<a.length;i++) s+=a[i][0]; System.out.println(s);", answer: "5", explanation: "The first column is 1 + 4." },
    { id: "arrays-2d-ob-13", question: "What is printed? int[][] a={{2,4},{6,8}}; System.out.println(a[0][0]*a[1][1]);", answer: "16", explanation: "2 × 8 = 16." },
    { id: "arrays-2d-ob-14", question: "What is printed? int[][] a={{1,2},{3,4}}; for(int i=0;i<2;i++) System.out.print(a[i][i]+\" \" );", answer: "1 4 ", explanation: "The loop prints main-diagonal elements." },
    { id: "arrays-2d-ob-15", question: "Find the output: int[][] a={{2,0},{0,2}}; int c=0; for(int i=0;i<2;i++) for(int j=0;j<2;j++) if(a[i][j]==0)c++; System.out.println(c);", answer: "2", explanation: "There are two zero entries." },
    { id: "arrays-2d-ob-16", question: "What is printed? int[][] a={{9,8},{7,6}}; System.out.print(a[0][1]+a[1][0]);", answer: "15", explanation: "8 + 7 = 15." },
    { id: "arrays-2d-ob-17", question: "Find the output: int[][] a={{1,2},{3,4}}; int s=0; for(int i=0;i<2;i++) s+=a[i][1]; System.out.println(s);", answer: "6", explanation: "Second-column values are 2 and 4." },
    { id: "arrays-2d-ob-18", question: "What is printed? int[][] a={{1,2,3},{4,5,6}}; int s=0; for(int j=0;j<3;j++) s+=a[0][j]; System.out.println(s);", answer: "6", explanation: "The first row sums to 1+2+3." },
    { id: "arrays-2d-ob-19", question: "Find the output: int[][] a={{2,4},{6,8}}; for(int i=0;i<2;i++){ for(int j=0;j<2;j++) if(a[i][j]%2==0) System.out.print(1); }", answer: "1111", explanation: "All four entries are even." },
    { id: "arrays-2d-ob-20", question: "What is printed? int[][] a={{3,5},{7,9}}; System.out.println(a[1][0]+a[0][0]);", answer: "10", explanation: "7 + 3 = 10." },
    { id: "arrays-2d-ob-21", question: "Find the output: int[][] a={{4,1},{2,8}}; System.out.println(a[0][0] > a[1][1]);", answer: "false", explanation: "4 is not greater than 8." },
    { id: "arrays-2d-ob-22", question: "What is printed? int[][] a={{1,2},{3,4}}; System.out.print(a[0][0]+a[0][1]);", answer: "3", explanation: "1 + 2 = 3." },
    { id: "arrays-2d-ob-23", question: "Find the output: int[][] a={{1,2},{3,4}}; int t=a[0][1]; a[0][1]=a[1][0]; a[1][0]=t; System.out.println(a[0][1]);", answer: "3", explanation: "The off-diagonal values are swapped." },
    { id: "arrays-2d-ob-24", question: "What is printed? int[][] a={{5,6},{7,8}}; int s=0; for(int i=0;i<2;i++) for(int j=0;j<=i;j++) s+=a[i][j]; System.out.println(s);", answer: "18", explanation: "Values added are 5, 7 and 8." },
    { id: "arrays-2d-ob-25", question: "Find the output: int[][] a={{1,0,0},{0,1,0},{0,0,1}}; int s=0; for(int i=0;i<3;i++) s+=a[i][i]; System.out.println(s);", answer: "3", explanation: "The identity matrix has three ones on the main diagonal." }
  ],
  errorFindingQuestions: [
    { id: "arrays-2d-ef-1", question: "int[][] a={{1,2},{3,4}}; System.out.println(a[2][0]); What is wrong?", error: "Row index 2 does not exist in a 2-row array.", corrected: "Use a valid row index such as a[1][0]." },
    { id: "arrays-2d-ef-2", question: "for(int i=0;i<=a.length;i++) ... Why can this fail?", error: "The last valid row index is a.length - 1.", corrected: "Use i < a.length." },
    { id: "arrays-2d-ef-3", question: "for(int j=0;j<=a[i].length;j++) ... Why can this fail?", error: "The condition allows j == a[i].length, which is outside the row.", corrected: "Use j < a[i].length." },
    { id: "arrays-2d-ef-4", question: "int[][] a={{1,2},{3}}; for(int j=0;j<2;j++) System.out.print(a[1][j]);", error: "The second row has only one element.", corrected: "Loop with j < a[1].length." },
    { id: "arrays-2d-ef-5", question: "int[][] a=new int[2][3]; System.out.println(a[3][0]);", error: "There are only rows 0 and 1.", corrected: "Use a row index between 0 and 1." },
    { id: "arrays-2d-ef-6", question: "int[][] a={{1,2},{3,4}}; System.out.println(a[0,1]);", error: "Java uses two index brackets for a 2D array.", corrected: "Write a[0][1]." },
    { id: "arrays-2d-ef-7", question: "for(int i=0;i<a[0].length;i++) ... when rows are not known to have equal length.", error: "The outer loop should depend on the number of rows.", corrected: "Use i < a.length for rows and a[i].length for columns." },
    { id: "arrays-2d-ef-8", question: "int sum=0; for(int i=0;i<a.length;i++) for(int j=0;j<a.length;j++) sum+=a[i][j];", error: "The inner loop incorrectly uses the row count for columns.", corrected: "Use j < a[i].length." },
    { id: "arrays-2d-ef-9", question: "int[][] a={{1,2},{3,4}}; for(int i=0;i<2;i++) System.out.println(a[0][i]);", error: "This prints only the first row.", corrected: "Add an inner loop and access a[i][j] to print the complete matrix." },
    { id: "arrays-2d-ef-10", question: "int[][] a={{1,2},{3,4}}; for(int j=0;j<2;j++) System.out.print(a[j][0]);", error: "This valid code traverses only the first column.", corrected: "Use nested loops when the requirement is to print the complete matrix." }
  ],
  fillInTheBlanks: [
    { id: "arrays-2d-fb-1", question: "The number of rows in a 2D array a is given by ___.", answer: "a.length" },
    { id: "arrays-2d-fb-2", question: "The number of elements in row i is given by ___.", answer: "a[i].length" },
    { id: "arrays-2d-fb-3", question: "The first element of a 2D array is at index ___.", answer: "a[0][0]" },
    { id: "arrays-2d-fb-4", question: "A 2D array is commonly processed using ___ loops.", answer: "nested" },
    { id: "arrays-2d-fb-5", question: "In a[i][j], i usually represents the ___ and j the ___.", answer: "row, column" },
    { id: "arrays-2d-fb-6", question: "The main diagonal contains elements where ___ equals ___.", answer: "row index, column index" },
    { id: "arrays-2d-fb-7", question: "A 2D array with rows of different lengths is called a ___ array.", answer: "jagged" },
    { id: "arrays-2d-fb-8", question: "The last valid row index is ___.", answer: "a.length - 1" },
    { id: "arrays-2d-fb-9", question: "For safe traversal of row i, the column condition is j < ___.", answer: "a[i].length" },
    { id: "arrays-2d-fb-10", question: "A matrix with equal numbers of rows and columns is called a ___ matrix.", answer: "square" }
  ],
  mcqs: [
    { id: "arrays-2d-mcq-1", question: "Which expression gives the number of rows in int[][] a?", options: ["a[0].length", "a.length", "a.size()", "a.columns"], answer: "B", explanation: "a.length stores the number of row arrays." },
    { id: "arrays-2d-mcq-2", question: "Which expression accesses row 2, column 1?", options: ["a[1][2]", "a[2][1]", "a[2,1]", "a(2,1)"], answer: "B", explanation: "The row index comes first and the column index second." },
    { id: "arrays-2d-mcq-3", question: "What is the safest inner-loop bound for row i?", options: ["j < a.length", "j <= a[i].length", "j < a[i].length", "j <= a.length"], answer: "C", explanation: "Each row may have its own length." },
    { id: "arrays-2d-mcq-4", question: "Which structure is best for printing every element?", options: ["One if statement", "Nested loops", "One switch", "One variable"], answer: "B", explanation: "One loop handles rows and another handles columns." },
    { id: "arrays-2d-mcq-5", question: "Which elements form the main diagonal of a square matrix?", options: ["a[i][0]", "a[0][j]", "a[i][i]", "a[i][i+1]"], answer: "C", explanation: "Main diagonal positions have equal row and column indexes." }
  ],
  programmingQuestions: [
    { id: "arrays-2d-pr-1", title: "Row-wise sum", prompt: "Input a 3×4 integer matrix and print the sum of each row." },
    { id: "arrays-2d-pr-2", title: "Largest element", prompt: "Write a program to find the largest value in a 2D integer array." },
    { id: "arrays-2d-pr-3", title: "Main diagonal", prompt: "For a square matrix, calculate and display the sum of the main diagonal." },
    { id: "arrays-2d-pr-4", title: "Transpose", prompt: "Display the transpose of a rectangular matrix without modifying the original matrix." },
    { id: "arrays-2d-pr-5", title: "Count even values", prompt: "Count and display how many even numbers occur in a 2D array." }
  ]
};

export default chapter09;
