const chapter09 = {
  id: "09-two-dimensional-arrays",
  title: "TWO DIMENSIONAL ARRAYS",
  slug: "two-dimensional-arrays",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 280,
  topics: [
    "two-dimensional arrays",
    "2D arrays",
    "matrices",
    "matrix declaration",
    "matrix initialization",
    "row-wise traversal",
    "column-wise traversal",
    "matrix input",
    "matrix output",
    "sum of rows",
    "sum of columns",
    "diagonal operations",
    "main diagonal",
    "secondary diagonal",
    "matrix addition",
    "matrix subtraction",
    "matrix transpose",
    "spiral matrix",
    "boundary elements",
    "matrix manipulation",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "A two-dimensional (2D) array is an array of arrays, representing a table or matrix with rows and columns. Think of it like a spreadsheet or a chessboard — it has rows (horizontal) and columns (vertical), and each cell is identified by its row index and column index. In Java, a 2D array is actually an array where each element is itself an array. This structure is perfect for storing tabular data, matrices, grids, and any data that has both row and column dimensions. For example, a class timetable, a marksheet with subjects and students, or a game board can all be represented using 2D arrays.",
    realLifeExamples: [
      "A class timetable — rows represent classes, columns represent time periods, cells contain subjects.",
      "A marksheet — rows represent students, columns represent subjects, cells contain marks.",
      "A chessboard or game board — 8x8 grid where each cell represents a position.",
      "A seating arrangement — rows represent rows in a hall, columns represent seats.",
      "A spreadsheet or Excel sheet — rows and columns of data.",
      "A pixel grid in an image — rows and columns of pixels with color values.",
      "A distance matrix — rows and columns represent cities, cells contain distances.",
      "A Sudoku puzzle — 9x9 grid where each cell contains a number.",
      "A calendar month — rows represent weeks, columns represent days.",
      "A grade book — rows represent students, columns represent assignments.",
    ],
    commonMistakes: [
      "Confusing row index and column index — matrix[row][col], not matrix[col][row].",
      "Using wrong loop conditions — matrix.length gives rows, matrix[0].length gives columns.",
      "Forgetting that 2D arrays in Java can be jagged (rows of different lengths).",
      "Accessing matrix[i][j] without checking if row i exists.",
      "Using matrix[i].length inside the outer loop instead of matrix.length.",
      "Not initializing all rows properly when creating a 2D array.",
      "Confusing matrix.length (rows) with matrix[0].length (columns).",
      "Trying to access matrix[i][j] when matrix[i] is null (not initialized).",
      "Using <= instead of < in loop conditions, causing ArrayIndexOutOfBoundsException.",
      "Assuming all 2D arrays are rectangular — Java allows jagged arrays.",
    ],
    whereUsed: [
      "Storing tabular data (marksheets, attendance records, grade books).",
      "Matrix operations in mathematics (addition, multiplication, transpose).",
      "Game development (game boards, grids, maps).",
      "Image processing (pixel grids, filters).",
      "Graph representations (adjacency matrices).",
      "Dynamic programming problems.",
      "Scientific computing and numerical analysis.",
      "Spreadsheet applications.",
      "Pathfinding algorithms (Dijkstra's, Floyd-Warshall).",
      "Rotating and transforming images.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "A two-dimensional array is like a table with rows and columns. Each element is accessed using two indices: row index and column index. For example, matrix[2][3] accesses the element in the 3rd row (index 2) and 4th column (index 3). In Java, a 2D array is declared as dataType[][] arrayName. The first dimension represents rows, and the second dimension represents columns. For a matrix with 3 rows and 4 columns, valid indices are: rows 0-2 and columns 0-3. You can think of it as an array where each element is itself an array (array of arrays).",
    importantPoints: [
      "A 2D array is an array of arrays — each row is itself an array.",
      "Declaration: dataType[][] matrix; or dataType matrix[][];",
      "Creation: matrix = new int[rows][cols];",
      "matrix.length gives the number of rows.",
      "matrix[i].length gives the number of columns in row i.",
      "Indices start at 0 for both rows and columns.",
      "Last valid row index: matrix.length - 1.",
      "Last valid column index: matrix[0].length - 1 (for rectangular arrays).",
      "Java allows jagged arrays where each row can have different number of columns.",
      "Elements are accessed as matrix[row][col].",
      "Default value for int 2D arrays: 0 for all elements.",
      "2D arrays are stored in row-major order in memory.",
      "You can create and initialize 2D arrays with array literals.",
      "Nested loops are used to traverse 2D arrays.",
      "Matrix addition/subtraction requires same dimensions.",
    ],
    memoryTricks: [
      "2D ARRAY = 'Two Directions Array' — has rows AND columns.",
      "Row first, column second: 'Row before Column' — matrix[row][col].",
      "matrix.length = rows: 'Length counts rows, not columns'.",
      "matrix[0].length = columns: 'Ask any row for its length'.",
      "Indices start at 0: 'Zero is the hero' for both dimensions.",
      "Jagged array: 'Not all rows are equal' — each row can have different length.",
      "Row-major order: 'Complete one row before moving to next'.",
      "matrix[i][j]: 'i for row, j for column' — remember the order.",
    ],
    examTips: [
      "Always remember: matrix[row][col] — row comes first, then column.",
      "matrix.length gives number of rows, matrix[0].length gives number of columns.",
      "For rectangular matrices, all rows have same length.",
      "Java supports jagged arrays — each row can have different number of columns.",
      "Use nested for loops to traverse 2D arrays.",
      "Outer loop for rows (0 to matrix.length-1), inner loop for columns (0 to matrix[i].length-1).",
      "For matrix addition, both matrices must have same dimensions.",
      "To transpose a matrix, swap rows and columns: transpose[i][j] = matrix[j][i].",
      "Main diagonal: elements where row index = column index (i == j).",
      "Secondary diagonal: elements where i + j = n - 1 (for n×n matrix).",
      "Always check bounds before accessing matrix elements to avoid ArrayIndexOutOfBoundsException.",
      "For spiral matrix, use four boundaries: top, bottom, left, right.",
      "Boundary elements are those in first row, last row, first column, or last column.",
      "To sum all elements, use nested loops or single loop with proper indexing.",
      "Practice matrix operations thoroughly — they're frequently asked in ICSE/ISC exams.",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `// Declaration
int[][] matrix;  // or int matrix[][];

// Creation (allocating memory)
matrix = new int[3][4];  // 3 rows, 4 columns

// Declaration + Creation (combined)
int[][] matrix = new int[3][4];

// Initialization with values
int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// Accessing elements
int element = matrix[1][2];  // row 1, column 2 (value: 7)

// Modifying elements
matrix[0][1] = 100;  // changes element at row 0, column 1

// Getting dimensions
int rows = matrix.length;        // returns 3
int cols = matrix[0].length;     // returns 4

// Traversing 2D array
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
    breakdown: [
      {
        keyword: "int[][] matrix",
        explanation:
          "Declaration of a 2D integer array. The first [] indicates rows, second [] indicates columns. Can also be written as int matrix[][];",
      },
      {
        keyword: "new int[3][4]",
        explanation:
          "Creates a 2D array with 3 rows and 4 columns. All elements are initialized to default values (0 for int).",
      },
      {
        keyword: "matrix[1][2]",
        explanation:
          "Accesses the element at row 1, column 2. First index is row, second index is column. In the example, this would be 7.",
      },
      {
        keyword: "matrix.length",
        explanation:
          "Returns the number of rows in the 2D array. For a 3x4 matrix, matrix.length returns 3.",
      },
      {
        keyword: "matrix[0].length",
        explanation:
          "Returns the number of columns in the first row. For a 3x4 matrix, matrix[0].length returns 4.",
      },
    ],
    variations: {
      declaration: {
        code: `// Different ways to declare 2D arrays
int[][] matrix1;           // Preferred way
int matrix2[][];           // C-style (also valid)
double[][] marks;          // Double 2D array
String[][] names;          // String 2D array
char[][] letters;          // Char 2D array`,
        explanation:
          "2D arrays can be declared for any data type. The [][] can be after the type or after the variable name.",
      },
      initialization: {
        code: `// Different ways to initialize 2D arrays
int[][] matrix1 = new int[3][4];           // All elements = 0
int[][] matrix2 = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};                                         // Direct initialization
int[][] matrix3 = new int[][]{
    {1, 2},
    {3, 4}
};                                         // Anonymous array`,
        explanation:
          "2D arrays can be initialized with default values or specific values. Jagged arrays are also possible.",
      },
      jaggedArray: {
        code: `// Jagged array (rows of different lengths)
int[][] jagged = new int[3][];
jagged[0] = new int[2];  // Row 0 has 2 columns
jagged[1] = new int[3];  // Row 1 has 3 columns
jagged[2] = new int[1];  // Row 2 has 1 column

// Or initialize directly
int[][] jagged2 = {
    {1, 2},
    {3, 4, 5},
    {6}
};`,
        explanation:
          "Java allows jagged arrays where each row can have a different number of columns. This is unique to Java's array implementation.",
      },
      traversal: {
        code: `// Row-wise traversal
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}

// Column-wise traversal
for (int j = 0; j < matrix[0].length; j++) {
    for (int i = 0; i < matrix.length; i++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
        explanation:
          "Row-wise traversal processes each row completely before moving to next row. Column-wise traversal processes each column completely before moving to next column.",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "matrix-ex-b-1",
        title: "Declare and initialize a 2D array",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access elements
System.out.println("Element at [0][0]: " + matrix[0][0]);  // 1
System.out.println("Element at [1][2]: " + matrix[1][2]);  // 6
System.out.println("Element at [2][1]: " + matrix[2][1]);  // 8

// Modify element
matrix[0][2] = 100;
System.out.println("Modified [0][2]: " + matrix[0][2]);  // 100

// Dimensions
System.out.println("Rows: " + matrix.length);           // 3
System.out.println("Columns: " + matrix[0].length);      // 3`,
        output: "Element at [0][0]: 1\nElement at [1][2]: 6\nElement at [2][1]: 8\nModified [0][2]: 100\nRows: 3\nColumns: 3",
        explanation: [
          "Step 1: Declare and initialize 3x3 matrix with values 1-9.",
          "Step 2: Access elements using [row][col] notation.",
          "Step 3: Modify matrix[0][2] from 3 to 100.",
          "Step 4: matrix.length returns 3 (rows), matrix[0].length returns 3 (columns).",
          "Key point: First index is row, second index is column.",
        ],
      },
      {
        id: "matrix-ex-b-2",
        title: "Print 2D array in matrix format",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println("Matrix:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Matrix:\n1 2 3 \n4 5 6 \n7 8 9 ",
        explanation: [
          "Step 1: Initialize 3x3 matrix.",
          "Step 2: Outer loop iterates through rows (i = 0, 1, 2).",
          "Step 3: Inner loop iterates through columns (j = 0, 1, 2).",
          "Step 4: Print each element with space, newline after each row.",
          "Key point: Nested loops are used — outer for rows, inner for columns.",
        ],
      },
      {
        id: "matrix-ex-b-3",
        title: "Input 2D array from user",
        code: `import java.util.Scanner;

Scanner sc = new Scanner(System.in);
int[][] matrix = new int[3][3];

System.out.println("Enter 3x3 matrix:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = sc.nextInt();
    }
}

System.out.println("Matrix entered:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
sc.close();`,
        output: "Enter 3x3 matrix:\n1 2 3 4 5 6 7 8 9\nMatrix entered:\n1 2 3 \n4 5 6 \n7 8 9 ",
        explanation: [
          "Step 1: Create Scanner object and 3x3 matrix.",
          "Step 2: Use nested loops to read 9 integers from user.",
          "Step 3: Store each value in matrix[i][j].",
          "Step 4: Print the matrix to verify input.",
          "Key point: matrix.length = 3 (rows), matrix[i].length = 3 (columns).",
        ],
      },
      {
        id: "matrix-ex-b-4",
        title: "Calculate sum of all elements",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int sum = 0;
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        sum = sum + matrix[i][j];
    }
}

System.out.println("Sum of all elements: " + sum);`,
        output: "Sum of all elements: 45",
        explanation: [
          "Step 1: Initialize 3x3 matrix.",
          "Step 2: Use nested loops to access each element.",
          "Step 3: Add each element to sum.",
          "Step 4: Sum = 1+2+3+4+5+6+7+8+9 = 45.",
          "Key point: Nested loops ensure all elements are visited.",
        ],
      },
      {
        id: "matrix-ex-b-5",
        title: "Calculate sum of each row",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int i = 0; i < matrix.length; i++) {
    int rowSum = 0;
    for (int j = 0; j < matrix[i].length; j++) {
        rowSum = rowSum + matrix[i][j];
    }
    System.out.println("Sum of row " + i + ": " + rowSum);
}`,
        output: "Sum of row 0: 6\nSum of row 1: 15\nSum of row 2: 24",
        explanation: [
          "Step 1: Initialize 3x3 matrix.",
          "Step 2: For each row i, calculate sum of all elements in that row.",
          "Step 3: Row 0: 1+2+3 = 6, Row 1: 4+5+6 = 15, Row 2: 7+8+9 = 24.",
          "Key point: Reset rowSum for each row.",
        ],
      },
      {
        id: "matrix-ex-b-6",
        title: "Calculate sum of each column",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int j = 0; j < matrix[0].length; j++) {
    int colSum = 0;
    for (int i = 0; i < matrix.length; i++) {
        colSum = colSum + matrix[i][j];
    }
    System.out.println("Sum of column " + j + ": " + colSum);
}`,
        output: "Sum of column 0: 12\nSum of column 1: 15\nSum of column 2: 18",
        explanation: [
          "Step 1: Initialize 3x3 matrix.",
          "Step 2: For each column j, calculate sum of all elements in that column.",
          "Step 3: Column 0: 1+4+7 = 12, Column 1: 2+5+8 = 15, Column 2: 3+6+9 = 18.",
          "Key point: Outer loop for columns, inner loop for rows (opposite of row-wise).",
        ],
      },
      {
        id: "matrix-ex-b-7",
        title: "Find maximum element in matrix",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int max = matrix[0][0];
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] > max) {
            max = matrix[i][j];
        }
    }
}

System.out.println("Maximum element: " + max);`,
        output: "Maximum element: 9",
        explanation: [
          "Step 1: Initialize max with first element matrix[0][0].",
          "Step 2: Traverse all elements using nested loops.",
          "Step 3: Update max if current element is greater.",
          "Step 4: Maximum element is 9.",
          "Key point: Start from first element and compare with all others.",
        ],
      },
      {
        id: "matrix-ex-b-8",
        title: "Count even and odd numbers in matrix",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int evenCount = 0, oddCount = 0;
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] % 2 == 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }
}

System.out.println("Even numbers: " + evenCount);
System.out.println("Odd numbers: " + oddCount);`,
        output: "Even numbers: 4\nOdd numbers: 5",
        explanation: [
          "Step 1: Initialize 3x3 matrix.",
          "Step 2: Traverse all elements and check if even or odd.",
          "Step 3: Even: 2, 4, 6, 8 (4 numbers). Odd: 1, 3, 5, 7, 9 (5 numbers).",
          "Key point: Use modulo operator % to check even/odd.",
        ],
      },
      {
        id: "matrix-ex-b-9",
        title: "Print diagonal elements",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println("Main diagonal:");
for (int i = 0; i < matrix.length; i++) {
    System.out.print(matrix[i][i] + " ");
}

System.out.println("\\nSecondary diagonal:");
for (int i = 0; i < matrix.length; i++) {
    System.out.print(matrix[i][matrix.length - 1 - i] + " ");
}`,
        output: "Main diagonal:\n1 5 9 \nSecondary diagonal:\n3 5 7 ",
        explanation: [
          "Step 1: Main diagonal: elements where row = column (i == j).",
          "Step 2: matrix[0][0] = 1, matrix[1][1] = 5, matrix[2][2] = 9.",
          "Step 3: Secondary diagonal: elements where i + j = n - 1.",
          "Step 4: matrix[0][2] = 3, matrix[1][1] = 5, matrix[2][0] = 7.",
          "Key point: Main diagonal goes from top-left to bottom-right.",
        ],
      },
      {
        id: "matrix-ex-b-10",
        title: "Print boundary elements of matrix",
        code: `int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

System.out.println("Boundary elements:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        // Print if first row, last row, first column, or last column
        if (i == 0 || i == matrix.length - 1 || j == 0 || j == matrix[i].length - 1) {
            System.out.print(matrix[i][j] + " ");
        } else {
            System.out.print("  ");
        }
    }
    System.out.println();
}`,
        output: "Boundary elements:\n1 2 3 4 \n5     8 \n9 10 11 12 ",
        explanation: [
          "Step 1: Boundary elements are in first row, last row, first column, or last column.",
          "Step 2: Check if i == 0 (first row) or i == rows-1 (last row).",
          "Step 3: Check if j == 0 (first column) or j == cols-1 (last column).",
          "Step 4: Print boundary elements, print spaces for internal elements.",
          "Key point: Boundary forms a 'frame' around the matrix.",
        ],
      },
    ],
    intermediate: [
      {
        id: "matrix-ex-i-1",
        title: "Add two matrices",
        code: `int[][] matrix1 = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int[][] matrix2 = {
    {9, 8, 7},
    {6, 5, 4},
    {3, 2, 1}
};

int[][] sum = new int[3][3];

for (int i = 0; i < matrix1.length; i++) {
    for (int j = 0; j < matrix1[i].length; j++) {
        sum[i][j] = matrix1[i][j] + matrix2[i][j];
    }
}

System.out.println("Sum of matrices:");
for (int i = 0; i < sum.length; i++) {
    for (int j = 0; j < sum[i].length; j++) {
        System.out.print(sum[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Sum of matrices:\n10 10 10 \n10 10 10 \n10 10 10 ",
        explanation: [
          "Step 1: Initialize two 3x3 matrices.",
          "Step 2: Create result matrix of same size.",
          "Step 3: Add corresponding elements: sum[i][j] = matrix1[i][j] + matrix2[i][j].",
          "Step 4: Print the sum matrix.",
          "Key point: Matrix addition requires same dimensions for both matrices.",
        ],
      },
      {
        id: "matrix-ex-i-2",
        title: "Transpose of a matrix",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int[][] transpose = new int[3][3];

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        transpose[j][i] = matrix[i][j];
    }
}

System.out.println("Original matrix:");
printMatrix(matrix);

System.out.println("\\nTranspose:");
printMatrix(transpose);

public static void printMatrix(int[][] mat) {
    for (int i = 0; i < mat.length; i++) {
        for (int j = 0; j < mat[i].length; j++) {
            System.out.print(mat[i][j] + " ");
        }
        System.out.println();
    }
}`,
        output: "Original matrix:\n1 2 3 \n4 5 6 \n7 8 9 \n\nTranspose:\n1 4 7 \n2 5 8 \n3 6 9 ",
        explanation: [
          "Step 1: Initialize 3x3 matrix.",
          "Step 2: Create transpose matrix.",
          "Step 3: Swap rows and columns: transpose[j][i] = matrix[i][j].",
          "Step 4: Original row 0 becomes column 0 in transpose.",
          "Key point: Transpose flips matrix over its diagonal.",
        ],
      },
      {
        id: "matrix-ex-i-3",
        title: "Check if matrix is symmetric",
        code: `int[][] matrix = {
    {1, 2, 3},
    {2, 4, 5},
    {3, 5, 6}
};

boolean isSymmetric = true;

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] != matrix[j][i]) {
            isSymmetric = false;
            break;
        }
    }
    if (!isSymmetric) break;
}

System.out.println("Is symmetric: " + isSymmetric);`,
        output: "Is symmetric: true",
        explanation: [
          "Step 1: A matrix is symmetric if matrix[i][j] == matrix[j][i] for all i, j.",
          "Step 2: Check each element against its transpose counterpart.",
          "Step 3: If any pair doesn't match, matrix is not symmetric.",
          "Step 4: All elements match, so matrix is symmetric.",
          "Key point: Symmetric matrix equals its own transpose.",
        ],
      },
      {
        id: "matrix-ex-i-4",
        title: "Find sum of diagonal elements",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int mainDiagonalSum = 0;
int secondaryDiagonalSum = 0;

for (int i = 0; i < matrix.length; i++) {
    // Main diagonal
    mainDiagonalSum = mainDiagonalSum + matrix[i][i];
    
    // Secondary diagonal
    secondaryDiagonalSum = secondaryDiagonalSum + matrix[i][matrix.length - 1 - i];
}

System.out.println("Main diagonal sum: " + mainDiagonalSum);
System.out.println("Secondary diagonal sum: " + secondaryDiagonalSum);`,
        output: "Main diagonal sum: 15\nSecondary diagonal sum: 15",
        explanation: [
          "Step 1: Main diagonal: matrix[0][0] + matrix[1][1] + matrix[2][2] = 1+5+9 = 15.",
          "Step 2: Secondary diagonal: matrix[0][2] + matrix[1][1] + matrix[2][0] = 3+5+7 = 15.",
          "Step 3: Calculate both sums in single loop.",
          "Key point: For n×n matrix, both diagonals have n elements.",
        ],
      },
      {
        id: "matrix-ex-i-5",
        title: "Print matrix in spiral order",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int top = 0, bottom = matrix.length - 1;
int left = 0, right = matrix[0].length - 1;

System.out.println("Spiral order:");

while (top <= bottom && left <= right) {
    // Print top row
    for (int j = left; j <= right; j++) {
        System.out.print(matrix[top][j] + " ");
    }
    top++;

    // Print right column
    for (int i = top; i <= bottom; i++) {
        System.out.print(matrix[i][right] + " ");
    }
    right--;

    // Print bottom row (if exists)
    if (top <= bottom) {
        for (int j = right; j >= left; j--) {
            System.out.print(matrix[bottom][j] + " ");
        }
        bottom--;
    }

    // Print left column (if exists)
    if (left <= right) {
        for (int i = bottom; i >= top; i--) {
            System.out.print(matrix[i][left] + " ");
        }
        left++;
    }
}`,
        output: "Spiral order:\n1 2 3 6 9 8 7 4 5 ",
        explanation: [
          "Step 1: Use four boundaries: top, bottom, left, right.",
          "Step 2: Print top row (left to right), increment top.",
          "Step 3: Print right column (top to bottom), decrement right.",
          "Step 4: Print bottom row (right to left), decrement bottom.",
          "Step 5: Print left column (bottom to top), increment left.",
          "Key point: Boundaries shrink after each side is printed.",
        ],
      },
      {
        id: "matrix-ex-i-6",
        title: "Search for element in matrix",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int target = 5;
boolean found = false;
int row = -1, col = -1;

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == target) {
            found = true;
            row = i;
            col = j;
            break;
        }
    }
    if (found) break;
}

if (found) {
    System.out.println("Element " + target + " found at [" + row + "][" + col + "]");
} else {
    System.out.println("Element not found");
}`,
        output: "Element 5 found at [1][1]",
        explanation: [
          "Step 1: Initialize matrix and target value.",
          "Step 2: Use nested loops to search for target.",
          "Step 3: If found, store position and break both loops.",
          "Step 4: Element 5 is at row 1, column 1.",
          "Key point: Break outer loop after finding element to avoid unnecessary searches.",
        ],
      },
      {
        id: "matrix-ex-i-7",
        title: "Count frequency of each element",
        code: `int[][] matrix = {
    {1, 2, 3},
    {2, 3, 4},
    {3, 4, 5}
};

int[] freq = new int[10];  // Assuming values 0-9

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        freq[matrix[i][j]]++;
    }
}

System.out.println("Element frequencies:");
for (int i = 0; i < freq.length; i++) {
    if (freq[i] > 0) {
        System.out.println(i + " appears " + freq[i] + " times");
    }
}`,
        output: "Element frequencies:\n1 appears 1 times\n2 appears 2 times\n3 appears 3 times\n4 appears 2 times\n5 appears 1 times",
        explanation: [
          "Step 1: Initialize matrix and frequency array.",
          "Step 2: Traverse matrix and increment frequency of each element.",
          "Step 3: Print elements with frequency > 0.",
          "Key point: Use value as index in frequency array.",
        ],
      },
      {
        id: "matrix-ex-i-8",
        title: "Rotate matrix 90 degrees clockwise",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int n = matrix.length;
int[][] rotated = new int[n][n];

// Transpose
for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
}

// Reverse each row
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n / 2; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[i][n - 1 - j];
        matrix[i][n - 1 - j] = temp;
    }
}

System.out.println("Rotated matrix:");
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Rotated matrix:\n7 4 1 \n8 5 2 \n9 6 3 ",
        explanation: [
          "Step 1: Transpose the matrix (swap rows and columns).",
          "Step 2: Reverse each row of the transposed matrix.",
          "Step 3: Result is 90-degree clockwise rotation.",
          "Key point: Transpose + Reverse rows = 90° clockwise rotation.",
        ],
      },
      {
        id: "matrix-ex-i-9",
        title: "Check if matrix is identity matrix",
        code: `int[][] matrix = {
    {1, 0, 0},
    {0, 1, 0},
    {0, 0, 1}
};

boolean isIdentity = true;

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (i == j) {
            // Diagonal elements should be 1
            if (matrix[i][j] != 1) {
                isIdentity = false;
                break;
            }
        } else {
            // Non-diagonal elements should be 0
            if (matrix[i][j] != 0) {
                isIdentity = false;
                break;
            }
        }
    }
    if (!isIdentity) break;
}

System.out.println("Is identity matrix: " + isIdentity);`,
        output: "Is identity matrix: true",
        explanation: [
          "Step 1: Identity matrix has 1s on diagonal, 0s elsewhere.",
          "Step 2: Check if diagonal elements (i == j) are 1.",
          "Step 3: Check if non-diagonal elements (i != j) are 0.",
          "Step 4: All conditions satisfied, so it's an identity matrix.",
          "Key point: Identity matrix is square with 1s on main diagonal.",
        ],
      },
      {
        id: "matrix-ex-i-10",
        title: "Find row with maximum sum",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int maxRowSum = Integer.MIN_VALUE;
int maxRowIndex = -1;

for (int i = 0; i < matrix.length; i++) {
    int rowSum = 0;
    for (int j = 0; j < matrix[i].length; j++) {
        rowSum = rowSum + matrix[i][j];
    }
    
    if (rowSum > maxRowSum) {
        maxRowSum = rowSum;
        maxRowIndex = i;
    }
}

System.out.println("Row " + maxRowIndex + " has maximum sum: " + maxRowSum);`,
        output: "Row 2 has maximum sum: 24",
        explanation: [
          "Step 1: Calculate sum of each row.",
          "Step 2: Track maximum row sum and its index.",
          "Step 3: Row 0: 6, Row 1: 15, Row 2: 24.",
          "Step 4: Row 2 has maximum sum (24).",
          "Key point: Initialize maxRowSum with minimum value to handle negative numbers.",
        ],
      },
    ],
    advanced: [
      {
        id: "matrix-ex-a-1",
        title: "Multiply two matrices",
        code: `int[][] matrix1 = {
    {1, 2, 3},
    {4, 5, 6}
};

int[][] matrix2 = {
    {7, 8},
    {9, 10},
    {11, 12}
};

// matrix1: 2x3, matrix2: 3x2, result: 2x2
int[][] product = new int[2][2];

for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        for (int k = 0; k < 3; k++) {
            product[i][j] = product[i][j] + matrix1[i][k] * matrix2[k][j];
        }
    }
}

System.out.println("Product of matrices:");
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        System.out.print(product[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Product of matrices:\n58 64 \n139 154 ",
        explanation: [
          "Step 1: Matrix multiplication: (m×n) × (n×p) = (m×p).",
          "Step 2: Use three nested loops: i for rows of first, j for columns of second, k for common dimension.",
          "Step 3: product[i][j] = sum(matrix1[i][k] * matrix2[k][j]) for all k.",
          "Step 4: Calculate dot product of row i of matrix1 and column j of matrix2.",
          "Key point: Number of columns in first matrix must equal number of rows in second matrix.",
        ],
      },
      {
        id: "matrix-ex-a-2",
        title: "Sort each row of matrix",
        code: `int[][] matrix = {
    {9, 2, 7},
    {4, 5, 1},
    {8, 3, 6}
};

// Sort each row using bubble sort
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length - 1; j++) {
        for (int k = 0; k < matrix[i].length - j - 1; k++) {
            if (matrix[i][k] > matrix[i][k + 1]) {
                int temp = matrix[i][k];
                matrix[i][k] = matrix[i][k + 1];
                matrix[i][k + 1] = temp;
            }
        }
    }
}

System.out.println("Sorted matrix:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Sorted matrix:\n2 7 9 \n1 4 5 \n3 6 8 ",
        explanation: [
          "Step 1: Apply sorting algorithm to each row independently.",
          "Step 2: Use bubble sort for each row.",
          "Step 3: Outer loop i iterates through rows.",
          "Step 4: Inner loops j and k sort the current row.",
          "Key point: Each row is sorted independently.",
        ],
      },
      {
        id: "matrix-ex-a-3",
        title: "Find saddle point",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

boolean found = false;

for (int i = 0; i < matrix.length; i++) {
    // Find minimum in row i
    int minInRow = matrix[i][0];
    int colIndex = 0;
    for (int j = 1; j < matrix[i].length; j++) {
        if (matrix[i][j] < minInRow) {
            minInRow = matrix[i][j];
            colIndex = j;
        }
    }
    
    // Check if this minimum is maximum in its column
    boolean isMaxInCol = true;
    for (int k = 0; k < matrix.length; k++) {
        if (matrix[k][colIndex] > minInRow) {
            isMaxInCol = false;
            break;
        }
    }
    
    if (isMaxInCol) {
        System.out.println("Saddle point: " + minInRow + " at [" + i + "][" + colIndex + "]");
        found = true;
    }
}

if (!found) {
    System.out.println("No saddle point found");
}`,
        output: "Saddle point: 7 at [2][0]",
        explanation: [
          "Step 1: Saddle point is minimum in its row and maximum in its column.",
          "Step 2: For each row, find minimum element and its column.",
          "Step 3: Check if this minimum is maximum in its column.",
          "Step 4: 7 is minimum in row 2 and maximum in column 0.",
          "Key point: A matrix can have zero or more saddle points.",
        ],
      },
      {
        id: "matrix-ex-a-4",
        title: "Print upper and lower triangular matrices",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println("Upper triangular:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (j >= i) {
            System.out.print(matrix[i][j] + " ");
        } else {
            System.out.print("  ");
        }
    }
    System.out.println();
}

System.out.println("\\nLower triangular:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (j <= i) {
            System.out.print(matrix[i][j] + " ");
        } else {
            System.out.print("  ");
        }
    }
    System.out.println();
}`,
        output: "Upper triangular:\n1 2 3 \n  5 6 \n  8 9 \n\nLower triangular:\n1   \n4 5 \n7 8 9 ",
        explanation: [
          "Step 1: Upper triangular: elements on and above main diagonal (j >= i).",
          "Step 2: Lower triangular: elements on and below main diagonal (j <= i).",
          "Step 3: Print spaces for elements not in the triangular region.",
          "Key point: Main diagonal is included in both upper and lower triangular matrices.",
        ],
      },
      {
        id: "matrix-ex-a-5",
        title: "Check if matrix is magic square",
        code: `int[][] matrix = {
    {2, 7, 6},
    {9, 5, 1},
    {4, 3, 8}
};

int n = matrix.length;
int magicSum = 0;

// Calculate sum of first row
for (int j = 0; j < n; j++) {
    magicSum = magicSum + matrix[0][j];
}

boolean isMagic = true;

// Check all rows
for (int i = 1; i < n; i++) {
    int rowSum = 0;
    for (int j = 0; j < n; j++) {
        rowSum = rowSum + matrix[i][j];
    }
    if (rowSum != magicSum) {
        isMagic = false;
        break;
    }
}

// Check all columns
for (int j = 0; j < n; j++) {
    int colSum = 0;
    for (int i = 0; i < n; i++) {
        colSum = colSum + matrix[i][j];
    }
    if (colSum != magicSum) {
        isMagic = false;
        break;
    }
}

// Check diagonals
int diag1 = 0, diag2 = 0;
for (int i = 0; i < n; i++) {
    diag1 = diag1 + matrix[i][i];
    diag2 = diag2 + matrix[i][n - 1 - i];
}

if (diag1 != magicSum || diag2 != magicSum) {
    isMagic = false;
}

System.out.println("Is magic square: " + isMagic);`,
        output: "Is magic square: true",
        explanation: [
          "Step 1: Magic square: all rows, columns, and diagonals sum to same value.",
          "Step 2: Calculate magic sum from first row.",
          "Step 3: Check if all rows sum to magicSum.",
          "Step 4: Check if all columns sum to magicSum.",
          "Step 5: Check if both diagonals sum to magicSum.",
          "Key point: In 3x3 magic square, magic sum is 15.",
        ],
      },
      {
        id: "matrix-ex-a-6",
        title: "Find sum of boundary elements",
        code: `int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

int boundarySum = 0;

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (i == 0 || i == matrix.length - 1 || j == 0 || j == matrix[i].length - 1) {
            boundarySum = boundarySum + matrix[i][j];
        }
    }
}

System.out.println("Sum of boundary elements: " + boundarySum);`,
        output: "Sum of boundary elements: 60",
        explanation: [
          "Step 1: Boundary elements: first row, last row, first column, last column.",
          "Step 2: Check if element is on boundary using conditions.",
          "Step 3: Sum = 1+2+3+4+5+8+9+10+11+12 = 60.",
          "Key point: Internal elements (6, 7) are not included.",
        ],
      },
      {
        id: "matrix-ex-a-7",
        title: "Reverse each row of matrix",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int i = 0; i < matrix.length; i++) {
    int start = 0;
    int end = matrix[i].length - 1;
    
    while (start < end) {
        int temp = matrix[i][start];
        matrix[i][start] = matrix[i][end];
        matrix[i][end] = temp;
        start++;
        end--;
    }
}

System.out.println("Matrix with reversed rows:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Matrix with reversed rows:\n3 2 1 \n6 5 4 \n9 8 7 ",
        explanation: [
          "Step 1: For each row, reverse the elements.",
          "Step 2: Use two-pointer technique: start and end.",
          "Step 3: Swap elements at start and end, move pointers towards center.",
          "Step 4: Row 0: [1,2,3] → [3,2,1], Row 1: [4,5,6] → [6,5,4], etc.",
          "Key point: Each row is reversed independently.",
        ],
      },
      {
        id: "matrix-ex-a-8",
        title: "Check if matrix is lower triangular",
        code: `int[][] matrix = {
    {1, 0, 0},
    {4, 5, 0},
    {7, 8, 9}
};

boolean isLowerTriangular = true;

for (int i = 0; i < matrix.length; i++) {
    for (int j = i + 1; j < matrix[i].length; j++) {
        if (matrix[i][j] != 0) {
            isLowerTriangular = false;
            break;
        }
    }
    if (!isLowerTriangular) break;
}

System.out.println("Is lower triangular: " + isLowerTriangular);`,
        output: "Is lower triangular: true",
        explanation: [
          "Step 1: Lower triangular matrix has all elements above diagonal equal to 0.",
          "Step 2: Check elements where column index > row index (j > i).",
          "Step 3: All elements above diagonal are 0, so it's lower triangular.",
          "Key point: In lower triangular matrix, all elements above main diagonal are zero.",
        ],
      },
      {
        id: "matrix-ex-a-9",
        title: "Interchange first and last rows",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Swap first and last rows
int[] temp = matrix[0];
matrix[0] = matrix[matrix.length - 1];
matrix[matrix.length - 1] = temp;

System.out.println("Matrix after swapping rows:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Matrix after swapping rows:\n7 8 9 \n4 5 6 \n1 2 3 ",
        explanation: [
          "Step 1: Store first row in temporary array.",
          "Step 2: Assign last row to first row.",
          "Step 3: Assign temporary array (original first row) to last row.",
          "Step 4: First and last rows are swapped.",
          "Key point: Use temporary array to swap rows.",
        ],
      },
      {
        id: "matrix-ex-a-10",
        title: "Interchange first and last columns",
        code: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Swap first and last columns
for (int i = 0; i < matrix.length; i++) {
    int temp = matrix[i][0];
    matrix[i][0] = matrix[i][matrix[i].length - 1];
    matrix[i][matrix[i].length - 1] = temp;
}

System.out.println("Matrix after swapping columns:");
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}`,
        output: "Matrix after swapping columns:\n3 2 1 \n6 5 4 \n9 8 7 ",
        explanation: [
          "Step 1: For each row, swap first and last column elements.",
          "Step 2: Use temporary variable to hold one value during swap.",
          "Step 3: Swap matrix[i][0] with matrix[i][cols-1] for all rows.",
          "Step 4: First and last columns are swapped.",
          "Key point: Iterate through rows and swap column elements in each row.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "Matrix Input and Sum of Rows",
      code: `int[][] matrix = new int[2][3];
int sum = 0;

// Input: 1 2 3 4 5 6
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        matrix[i][j] = sc.nextInt();
    }
}

// Calculate sum
for (int i = 0; i < 2; i++) {
    int rowSum = 0;
    for (int j = 0; j < 3; j++) {
        rowSum = rowSum + matrix[i][j];
    }
    System.out.println("Row " + i + " sum: " + rowSum);
}`,
      trace: [
        { line: 1, explanation: "Create 2x3 matrix. Memory: matrix → [[null, null, null], [null, null, null]]" },
        { line: 2, explanation: "sum = 0" },
        { line: 5, explanation: "i = 0. Inner loop: j = 0, 1, 2. Read 1, 2, 3. matrix[0] = [1, 2, 3]" },
        { line: 5, explanation: "i = 1. Inner loop: j = 0, 1, 2. Read 4, 5, 6. matrix[1] = [4, 5, 6]" },
        { line: 10, explanation: "i = 0. rowSum = 0. j = 0: rowSum = 1. j = 1: rowSum = 3. j = 2: rowSum = 6." },
        { line: 15, explanation: "Print: 'Row 0 sum: 6'" },
        { line: 10, explanation: "i = 1. rowSum = 0. j = 0: rowSum = 4. j = 1: rowSum = 9. j = 2: rowSum = 15." },
        { line: 15, explanation: "Print: 'Row 1 sum: 15'" },
      ],
    },
    {
      title: "Matrix Addition",
      code: `int[][] A = {{1, 2}, {3, 4}};
int[][] B = {{5, 6}, {7, 8}};
int[][] C = new int[2][2];

for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        C[i][j] = A[i][j] + B[i][j];
    }
}`,
      trace: [
        { line: 1, explanation: "A = [[1, 2], [3, 4]]" },
        { line: 2, explanation: "B = [[5, 6], [7, 8]]" },
        { line: 3, explanation: "C = [[0, 0], [0, 0]]" },
        { line: 5, explanation: "i = 0. j = 0: C[0][0] = 1 + 5 = 6. C = [[6, 0], [0, 0]]" },
        { line: 5, explanation: "i = 0. j = 1: C[0][1] = 2 + 6 = 8. C = [[6, 8], [0, 0]]" },
        { line: 5, explanation: "i = 1. j = 0: C[1][0] = 3 + 7 = 10. C = [[6, 8], [10, 0]]" },
        { line: 5, explanation: "i = 1. j = 1: C[1][1] = 4 + 8 = 12. C = [[6, 8], [10, 12]]" },
      ],
    },
    {
      title: "Matrix Transpose",
      code: `int[][] A = {{1, 2, 3}, {4, 5, 6}};
int[][] T = new int[3][2];

for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        T[j][i] = A[i][j];
    }
}`,
      trace: [
        { line: 1, explanation: "A = [[1, 2, 3], [4, 5, 6]] (2x3 matrix)" },
        { line: 2, explanation: "T = [[0, 0], [0, 0], [0, 0]] (3x2 matrix)" },
        { line: 5, explanation: "i = 0. j = 0: T[0][0] = A[0][0] = 1. T = [[1, 0], [0, 0], [0, 0]]" },
        { line: 5, explanation: "i = 0. j = 1: T[1][0] = A[0][1] = 2. T = [[1, 0], [2, 0], [0, 0]]" },
        { line: 5, explanation: "i = 0. j = 2: T[2][0] = A[0][2] = 3. T = [[1, 0], [2, 0], [3, 0]]" },
        { line: 5, explanation: "i = 1. j = 0: T[0][1] = A[1][0] = 4. T = [[1, 4], [2, 0], [3, 0]]" },
        { line: 5, explanation: "i = 1. j = 1: T[1][1] = A[1][1] = 5. T = [[1, 4], [2, 5], [3, 0]]" },
        { line: 5, explanation: "i = 1. j = 2: T[2][1] = A[1][2] = 6. T = [[1, 4], [2, 5], [3, 6]]" },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "matrix-ob-1",
      question: `int[][] arr = {{1, 2}, {3, 4}};
System.out.println(arr[0][1]);`,
      answer: "2",
      explanation: "arr[0][1] accesses row 0, column 1, which is 2.",
    },
    {
      id: "matrix-ob-2",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}};
System.out.println(arr.length);`,
      answer: "2",
      explanation: "arr.length returns the number of rows, which is 2.",
    },
    {
      id: "matrix-ob-3",
      question: `int[][] arr = {{1, 2}, {3, 4}, {5, 6}};
System.out.println(arr[1].length);`,
      answer: "2",
      explanation: "arr[1].length returns the number of columns in row 1, which is 2.",
    },
    {
      id: "matrix-ob-4",
      question: `int[][] arr = {{1, 2}, {3, 4}};
arr[0][1] = 100;
System.out.println(arr[0][1]);`,
      answer: "100",
      explanation: "arr[0][1] is modified to 100, so it prints 100.",
    },
    {
      id: "matrix-ob-5",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int sum = 0;
for (int i = 0; i < arr.length; i++) {
    sum = sum + arr[i][i];
}
System.out.println(sum);`,
      answer: "15",
      explanation: "Sum of main diagonal: 1 + 5 + 9 = 15.",
    },
    {
      id: "matrix-ob-6",
      question: `int[][] arr = {{1, 2}, {3, 4}, {5, 6}};
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i][0] + " ");
}`,
      answer: "1 3 5 ",
      explanation: "Prints first column: arr[0][0]=1, arr[1][0]=3, arr[2][0]=5.",
    },
    {
      id: "matrix-ob-7",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
    System.out.println();
}`,
      answer: "1 2 3 \n4 5 6 ",
      explanation: "Prints matrix in row-wise order.",
    },
    {
      id: "matrix-ob-8",
      question: `int[][] arr = {{1, 2}, {3, 4}, {5, 6}};
System.out.println(arr[2][1]);`,
      answer: "6",
      explanation: "arr[2][1] accesses row 2, column 1, which is 6.",
    },
    {
      id: "matrix-ob-9",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int count = 0;
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        if (arr[i][j] % 2 == 0) {
            count++;
        }
    }
}
System.out.println(count);`,
      answer: "4",
      explanation: "Even numbers: 2, 4, 6, 8. Count = 4.",
    },
    {
      id: "matrix-ob-10",
      question: `int[][] arr = {{1, 2}, {3, 4}};
int[][] brr = arr;
brr[0][0] = 100;
System.out.println(arr[0][0]);`,
      answer: "100",
      explanation: "2D arrays are reference types. brr and arr point to same array. Changing brr[0][0] changes arr[0][0].",
    },
    {
      id: "matrix-ob-11",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}};
for (int j = 0; j < arr[0].length; j++) {
    System.out.print(arr[1][j] + " ");
}`,
      answer: "4 5 6 ",
      explanation: "Prints second row (index 1): 4, 5, 6.",
    },
    {
      id: "matrix-ob-12",
      question: `int[][] arr = new int[2][3];
System.out.println(arr[0][0]);`,
      answer: "0",
      explanation: "New int 2D array is initialized with default value 0 for all elements.",
    },
    {
      id: "matrix-ob-13",
      question: `int[][] arr = {{1, 2}, {3, 4}, {5, 6}};
int sum = 0;
for (int i = 0; i < arr.length; i++) {
    sum = sum + arr[i][arr[i].length - 1];
}
System.out.println(sum);`,
      answer: "12",
      explanation: "Sum of last column: arr[0][1]=2 + arr[1][1]=4 + arr[2][1]=6 = 12.",
    },
    {
      id: "matrix-ob-14",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i][arr.length - 1 - i] + " ");
}`,
      answer: "3 5 7 ",
      explanation: "Prints secondary diagonal: arr[0][2]=3, arr[1][1]=5, arr[2][0]=7.",
    },
    {
      id: "matrix-ob-15",
      question: `int[][] arr = {{1, 2}, {3, 4}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        if (i == j) {
            System.out.print(arr[i][j] + " ");
        }
    }
}`,
      answer: "1 4 ",
      explanation: "Prints main diagonal elements: arr[0][0]=1, arr[1][1]=4.",
    },
    {
      id: "matrix-ob-16",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}};
System.out.println(arr[1][2]);`,
      answer: "6",
      explanation: "arr[1][2] accesses row 1, column 2, which is 6.",
    },
    {
      id: "matrix-ob-17",
      question: `int[][] arr = {{1, 2}, {3, 4}, {5, 6}};
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i][0] + arr[i][1]);
}`,
      answer: "3\n7\n11",
      explanation: "Prints sum of each row: 1+2=3, 3+4=7, 5+6=11.",
    },
    {
      id: "matrix-ob-18",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int max = arr[0][0];
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        if (arr[i][j] > max) {
            max = arr[i][j];
        }
    }
}
System.out.println(max);`,
      answer: "9",
      explanation: "Maximum element in matrix is 9.",
    },
    {
      id: "matrix-ob-19",
      question: `int[][] arr = {{1, 2}, {3, 4}};
arr[1] = arr[0];
System.out.println(arr[1][0]);`,
      answer: "1",
      explanation: "arr[1] = arr[0] makes row 1 reference the same array as row 0. arr[1][0] = arr[0][0] = 1.",
    },
    {
      id: "matrix-ob-20",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[j][i] + " ");
    }
    System.out.println();
}`,
      answer: "1 4 \n2 5 \n3 6 ",
      explanation: "Prints transpose: column-wise traversal. arr[0][0]=1, arr[1][0]=4, arr[0][1]=2, arr[1][1]=5, etc.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "matrix-ef-1",
      question: `int[][] arr = {{1, 2}, {3, 4}};
System.out.println(arr[2][0]);`,
      error: "ArrayIndexOutOfBoundsException. Array has 2 rows (indices 0, 1). arr[2] is out of bounds.",
      corrected: `int[][] arr = {{1, 2}, {3, 4}};
System.out.println(arr[1][0]);  // Access valid index`,
    },
    {
      id: "matrix-ef-2",
      question: `int[][] arr = {{1, 2, 3}, {4, 5, 6}};
System.out.println(arr[0][3]);`,
      error: "ArrayIndexOutOfBoundsException. Row 0 has 3 columns (indices 0, 1, 2). arr[0][3] is out of bounds.",
      corrected: `int[][] arr = {{1, 2, 3}, {4, 5, 6}};
System.out.println(arr[0][2]);  // Last valid column index`,
    },
    {
      id: "matrix-ef-3",
      question: `int[][] arr = new int[2][3];
arr[2][0] = 10;`,
      error: "ArrayIndexOutOfBoundsException. Array has 2 rows (indices 0, 1). arr[2] is out of bounds.",
      corrected: `int[][] arr = new int[2][3];
arr[1][0] = 10;  // Last valid row index is 1`,
    },
    {
      id: "matrix-ef-4",
      question: `int[][] arr;
System.out.println(arr[0][0]);`,
      error: "Compilation error. Array is declared but not initialized. Must allocate memory: arr = new int[2][2];",
      corrected: `int[][] arr = new int[2][2];
System.out.println(arr[0][0]);`,
    },
    {
      id: "matrix-ef-5",
      question: `int[][] arr = {{1, 2}, {3, 4}};
for (int i = 0; i <= arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
}`,
      error: "ArrayIndexOutOfBoundsException. Loop condition should be i < arr.length, not i <= arr.length.",
      corrected: `int[][] arr = {{1, 2}, {3, 4}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
}`,
    },
    {
      id: "matrix-ef-6",
      question: `int[][] arr = {{1, 2}, {3, 4}};
System.out.println(arr.length());`,
      error: "Compilation error. length is a property, not a method. Use arr.length (no parentheses).",
      corrected: `int[][] arr = {{1, 2}, {3, 4}};
System.out.println(arr.length);`,
    },
    {
      id: "matrix-ef-7",
      question: `int[][] arr = {{1, 2}, {3, 4}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j <= arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
}`,
      error: "ArrayIndexOutOfBoundsException. Inner loop condition should be j < arr[i].length, not j <= arr[i].length.",
      corrected: `int[][] arr = {{1, 2}, {3, 4}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
}`,
    },
    {
      id: "matrix-ef-8",
      question: `int[][] arr1 = {{1, 2}, {3, 4}};
int[][] arr2 = arr1;
arr2[0][0] = 100;
System.out.println(arr1[0][0]);`,
      error: "No error. 2D arrays are reference types. arr1 and arr2 point to same array. Changing arr2[0][0] also changes arr1[0][0]. Output: 100.",
      corrected: "No error. This demonstrates that 2D arrays are passed by reference.",
    },
    {
      id: "matrix-ef-9",
      question: `int[][] arr = new int[2][2];
System.out.println(arr[0][0]);`,
      error: "No error. Array is initialized with default values. arr[0][0] prints 0 (default for int).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "matrix-ef-10",
      question: `int[][] arr = {{1, 2}, {3, 4}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 1; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
    System.out.println();
}`,
      error: "No error, but logic skips first column. Loop starts at j = 1, so arr[i][0] is never printed.",
      corrected: `int[][] arr = {{1, 2}, {3, 4}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {  // Start from 0
        System.out.print(arr[i][j] + " ");
    }
    System.out.println();
}`,
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    { id: "matrix-fb-1", question: "A 2D array is an array of _____ .", answer: "arrays" },
    { id: "matrix-fb-2", question: "In a 2D array, the first index represents _____ and the second index represents _____.", answer: "row, column" },
    { id: "matrix-fb-3", question: "matrix.length gives the number of _____ in a 2D array.", answer: "rows" },
    { id: "matrix-fb-4", question: "matrix[i].length gives the number of _____ in row i.", answer: "columns" },
    { id: "matrix-fb-5", question: "Array indices in Java start at _____ .", answer: "0" },
    { id: "matrix-fb-6", question: "A 2D array with 3 rows and 4 columns is declared as int[][] arr = new int[_____][_____].", answer: "3, 4" },
    { id: "matrix-fb-7", question: "The last valid row index of a 2D array with 5 rows is _____ .", answer: "4" },
    { id: "matrix-fb-8", question: "The last valid column index of a 2D array with 4 columns is _____ .", answer: "3" },
    { id: "matrix-fb-9", question: "Main diagonal elements satisfy the condition _____ .", answer: "i == j" },
    { id: "matrix-fb-10", question: "Secondary diagonal elements satisfy the condition _____ for an n×n matrix.", answer: "i + j = n - 1" },
    { id: "matrix-fb-11", question: "To add two matrices, they must have the same _____ .", answer: "dimensions" },
    { id: "matrix-fb-12", question: "The transpose of a matrix is obtained by swapping _____ and _____.", answer: "rows, columns" },
    { id: "matrix-fb-13", question: "In Java, 2D arrays can be _____ where each row has different length.", answer: "jagged" },
    { id: "matrix-fb-14", question: "To traverse a 2D array row-wise, the outer loop iterates over _____ and inner loop over _____.", answer: "rows, columns" },
    { id: "matrix-fb-15", question: "To traverse a 2D array column-wise, the outer loop iterates over _____ and inner loop over _____.", answer: "columns, rows" },
    { id: "matrix-fb-16", question: "A matrix with all elements above the main diagonal as 0 is called _____ triangular matrix.", answer: "lower" },
    { id: "matrix-fb-17", question: "A matrix with all elements below the main diagonal as 0 is called _____ triangular matrix.", answer: "upper" },
    { id: "matrix-fb-18", question: "An identity matrix has 1s on the _____ diagonal and 0s elsewhere.", answer: "main" },
    { id: "matrix-fb-19", question: "A symmetric matrix satisfies the condition matrix[i][j] = _____.", answer: "matrix[j][i]" },
    { id: "matrix-fb-20", question: "Default value for int elements in a 2D array is _____ .", answer: "0" },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "matrix-mcq-1",
      question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}};\nSystem.out.println(arr[0][1]);",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "arr[0][1] accesses row 0, column 1, which is 2.",
    },
    {
      id: "matrix-mcq-2",
      question: "What does arr.length return for a 2D array?",
      options: ["Number of columns", "Number of rows", "Total elements", "Last index"],
      answer: 1,
      explanation: "arr.length returns the number of rows in a 2D array.",
    },
    {
      id: "matrix-mcq-3",
      question: "What does arr[0].length return for a 2D array?",
      options: ["Number of rows", "Number of columns", "Total elements", "First element"],
      answer: 1,
      explanation: "arr[0].length returns the number of columns in the first row.",
    },
    {
      id: "matrix-mcq-4",
      question: "How do you declare a 2D array with 3 rows and 4 columns?",
      options: ["int arr[3][4];", "int[][] arr = new int[3][4];", "int arr(3,4);", "array arr = new int[3][4];"],
      answer: 1,
      explanation: "Correct syntax: int[][] arr = new int[3][4];",
    },
    {
      id: "matrix-mcq-5",
      question: "What is the last valid row index of a 2D array with 5 rows?",
      options: ["5", "4", "6", "0"],
      answer: 1,
      explanation: "Last valid row index is 5 - 1 = 4.",
    },
    {
      id: "matrix-mcq-6",
      question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}};\nSystem.out.println(arr[1][2]);",
      options: ["2", "3", "5", "6"],
      answer: 3,
      explanation: "arr[1][2] accesses row 1, column 2, which is 6.",
    },
    {
      id: "matrix-mcq-7",
      question: "Which loop structure is used to traverse a 2D array?",
      options: ["Single loop", "Nested loops", "Infinite loop", "No loop needed"],
      answer: 1,
      explanation: "Nested loops are used: outer loop for rows, inner loop for columns.",
    },
    {
      id: "matrix-mcq-8",
      question: "What is a jagged array?",
      options: ["Array with equal rows and columns", "Array where rows can have different lengths", "Array with only one row", "Array with only one column"],
      answer: 1,
      explanation: "Jagged array is a 2D array where each row can have a different number of columns.",
    },
    {
      id: "matrix-mcq-9",
      question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}, {5, 6}};\nSystem.out.println(arr.length);",
      options: ["2", "3", "4", "6"],
      answer: 1,
      explanation: "arr.length returns the number of rows, which is 3.",
    },
    {
      id: "matrix-mcq-10",
      question: "How do you access the element in the 2nd row and 3rd column?",
      options: ["arr[2][3]", "arr[1][2]", "arr[3][2]", "arr[2][1]"],
      answer: 1,
      explanation: "Indices start at 0, so 2nd row is index 1, 3rd column is index 2.",
    },
    {
      id: "matrix-mcq-11",
      question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nint sum = arr[0][0] + arr[1][1] + arr[2][2];\nSystem.out.println(sum);",
      options: ["6", "12", "15", "18"],
      answer: 2,
      explanation: "Sum of main diagonal: 1 + 5 + 9 = 15.",
    },
    {
      id: "matrix-mcq-12",
      question: "Which of the following is true about matrix addition?",
      options: ["Any two matrices can be added", "Matrices must have same dimensions", "Matrices must be square", "Matrices must be of different sizes"],
      answer: 1,
      explanation: "Matrix addition requires both matrices to have the same dimensions.",
    },
    {
      id: "matrix-mcq-13",
      question: "What is the transpose of matrix {{1, 2}, {3, 4}}?",
      options: ["{{1, 2}, {3, 4}}", "{{1, 3}, {2, 4}}", "{{4, 3}, {2, 1}}", "{{2, 1}, {4, 3}}"],
      answer: 1,
      explanation: "Transpose swaps rows and columns: {{1, 3}, {2, 4}}.",
    },
    {
      id: "matrix-mcq-14",
      question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}};\nfor (int i = 0; i < arr.length; i++) {\n    System.out.print(arr[i][0] + \" \");\n}",
      options: ["1 2 3 ", "1 4 ", "1 2 ", "3 6 "],
      answer: 1,
      explanation: "Prints first column: arr[0][0]=1, arr[1][0]=4.",
    },
    {
      id: "matrix-mcq-15",
      question: "In a 3x3 matrix, what is the secondary diagonal?",
      options: ["arr[0][0], arr[1][1], arr[2][2]", "arr[0][2], arr[1][1], arr[2][0]", "arr[0][1], arr[1][1], arr[2][1]", "arr[1][0], arr[1][1], arr[1][2]"],
      answer: 1,
      explanation: "Secondary diagonal: arr[0][2], arr[1][1], arr[2][0].",
    },
    {
      id: "matrix-mcq-16",
      question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}};\nfor (int i = 0; i < arr.length; i++) {\n    for (int j = 0; j < arr[i].length; j++) {\n        System.out.print(arr[j][i] + \" \");\n    }\n    System.out.println();\n}",
      options: ["1 2 \n3 4 ", "1 3 \n2 4 ", "1 4 \n2 3 ", "2 1 \n4 3 "],
      answer: 1,
      explanation: "Prints transpose (column-wise): arr[0][0]=1, arr[1][0]=3, arr[0][1]=2, arr[1][1]=4.",
    },
    {
      id: "matrix-mcq-17",
      question: "Which condition checks if an element is on the main diagonal?",
      options: ["i > j", "i < j", "i == j", "i + j = n - 1"],
      answer: 2,
      explanation: "Main diagonal elements have row index equal to column index (i == j).",
    },
    {
      id: "matrix-mcq-18",
      question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nSystem.out.println(arr[2][1]);",
      options: ["2", "5", "8", "9"],
      answer: 2,
      explanation: "arr[2][1] accesses row 2, column 1, which is 8.",
    },
    {
      id: "matrix-mcq-19",
      question: "Can a 2D array in Java have rows of different lengths?",
      options: ["No, always rectangular", "Yes, called jagged array", "Only for String arrays", "Only for primitive arrays"],
      answer: 1,
      explanation: "Java allows jagged arrays where each row can have a different number of columns.",
    },
    {
      id: "matrix-mcq-20",
      question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}};\narr[1] = arr[0];\nSystem.out.println(arr[1][0]);",
      options: ["1", "2", "3", "4"],
      answer: 0,
      explanation: "arr[1] = arr[0] makes row 1 reference row 0. arr[1][0] = arr[0][0] = 1.",
    },
    {
      id: "matrix-mcq-21",
      question: "How many elements are in a 2D array declared as new int[3][4]?",
      options: ["7", "12", "3", "4"],
      answer: 1,
      explanation: "3 rows × 4 columns = 12 elements.",
    },
    {
      id: "matrix-mcq-22",
      question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}};\nSystem.out.println(arr[0].length);",
      options: ["2", "3", "4", "6"],
      answer: 1,
      explanation: "arr[0].length returns the number of columns in row 0, which is 3.",
    },
    {
      id: "matrix-mcq-23",
      question: "Which of the following is NOT a valid 2D array declaration?",
      options: ["int[][] arr;", "int arr[][];", "int[2] arr;", "int[][] arr = new int[2][3];"],
      answer: 2,
      explanation: "int[2] arr; is not valid. Size is not specified in declaration.",
    },
    {
      id: "matrix-mcq-24",
      question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}, {5, 6}};\nfor (int i = 0; i < arr.length; i++) {\n    System.out.print(arr[i][arr[i].length - 1] + \" \");\n}",
      options: ["1 3 5 ", "2 4 6 ", "1 2 3 ", "3 6 "],
      answer: 1,
      explanation: "Prints last element of each row: arr[0][1]=2, arr[1][1]=4, arr[2][1]=6.",
    },
    {
      id: "matrix-mcq-25",
      question: "For matrix multiplication, if A is m×n and B is n×p, the result is:",
      options: ["m×n", "n×p", "m×p", "p×m"],
      answer: 2,
      explanation: "Matrix multiplication: (m×n) × (n×p) = m×p.",
    },
    {
      id: "matrix-mcq-26",
      question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nint sum = 0;\nfor (int i = 0; i < arr.length; i++) {\n    sum = sum + arr[i][arr.length - 1 - i];\n}\nSystem.out.println(sum);",
      options: ["12", "15", "18", "21"],
      answer: 1,
      explanation: "Sum of secondary diagonal: 3 + 5 + 7 = 15.",
    },
    {
      id: "matrix-mcq-27",
      question: "Which of the following is true about 2D arrays in Java?",
      options: ["They are always rectangular", "They can be jagged", "They cannot be initialized with literals", "They don't have a length property"],
      answer: 1,
      explanation: "Java 2D arrays can be jagged (rows of different lengths).",
    },
    {
      id: "matrix-mcq-28",
      question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}};\nSystem.out.println(arr[1][1] + arr[0][0]);",
      options: ["3", "4", "5", "6"],
      answer: 2,
      explanation: "arr[1][1] = 4, arr[0][0] = 1. Sum = 4 + 1 = 5.",
    },
    {
      id: "matrix-mcq-29",
      question: "In column-wise traversal, which loop is the outer loop?",
      options: ["Row loop", "Column loop", "Both are same", "No outer loop"],
      answer: 1,
      explanation: "In column-wise traversal, outer loop iterates over columns.",
    },
    {
      id: "matrix-mcq-30",
      question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}};\nfor (int i = 0; i < arr.length; i++) {\n    for (int j = 0; j < arr[i].length; j++) {\n        if (i == j) {\n            System.out.print(arr[i][j] + \" \");\n        }\n    }\n}",
      options: ["1 2 ", "1 5 ", "1 4 ", "1 2 3 "],
      answer: 1,
      explanation: "Prints main diagonal: arr[0][0]=1, arr[1][1]=5.",
    },
  ],

  // ========== 10. TRUE/FALSE ==========
  trueFalse: [
    { id: "matrix-tf-1", question: "A 2D array is an array of arrays.", answer: true, explanation: "In Java, a 2D array is implemented as an array where each element is itself an array." },
    { id: "matrix-tf-2", question: "matrix.length returns the number of columns.", answer: false, explanation: "matrix.length returns the number of rows, not columns." },
    { id: "matrix-tf-3", question: "matrix[0].length returns the number of columns in the first row.", answer: true, explanation: "matrix[0].length gives the length of the first row, which is the number of columns." },
    { id: "matrix-tf-4", question: "Array indices in Java start at 1 for 2D arrays.", answer: false, explanation: "Array indices always start at 0 in Java, for both 1D and 2D arrays." },
    { id: "matrix-tf-5", question: "Java allows jagged arrays where rows can have different lengths.", answer: true, explanation: "Java supports jagged arrays. Each row is an independent array and can have different length." },
    { id: "matrix-tf-6", question: "To add two matrices, they must have the same dimensions.", answer: true, explanation: "Matrix addition requires both matrices to have the same number of rows and columns." },
    { id: "matrix-tf-7", question: "The transpose of a matrix swaps rows and columns.", answer: true, explanation: "Transpose is obtained by converting rows to columns and columns to rows." },
    { id: "matrix-tf-8", question: "A symmetric matrix equals its own transpose.", answer: true, explanation: "In a symmetric matrix, matrix[i][j] = matrix[j][i] for all i, j." },
    { id: "matrix-tf-9", question: "Main diagonal elements satisfy i + j = n - 1.", answer: false, explanation: "Main diagonal: i == j. Secondary diagonal: i + j = n - 1." },
    { id: "matrix-tf-10", question: "2D arrays are stored in row-major order in memory.", answer: true, explanation: "Java stores 2D arrays in row-major order: complete one row before moving to next." },
    { id: "matrix-tf-11", question: "Nested loops are required to traverse a 2D array.", answer: true, explanation: "Two nested loops are used: outer for rows, inner for columns." },
    { id: "matrix-tf-12", question: "You can create a 2D array without specifying dimensions.", answer: false, explanation: "Dimensions must be specified when creating a 2D array (except when using array initializer)." },
    { id: "matrix-tf-13", question: "All rows in a 2D array must have the same length.", answer: false, explanation: "Java allows jagged arrays where rows can have different lengths." },
    { id: "matrix-tf-14", question: "The element at matrix[i][j] is in the i-th column and j-th row.", answer: false, explanation: "matrix[i][j] is in the i-th row and j-th column. First index is row, second is column." },
    { id: "matrix-tf-15", question: "Default value for int elements in a 2D array is 0.", answer: true, explanation: "When a 2D int array is created, all elements are initialized to 0." },
    { id: "matrix-tf-16", question: "2D arrays are passed to methods by value.", answer: false, explanation: "2D arrays are passed by reference. Changes in the method affect the original array." },
    { id: "matrix-tf-17", question: "You can use arr.length() to get the number of rows.", answer: false, explanation: "length is a property, not a method. Use arr.length (no parentheses)." },
    { id: "matrix-tf-18", question: "An identity matrix has 1s on the main diagonal and 0s elsewhere.", answer: true, explanation: "Identity matrix is a square matrix with 1s on main diagonal and 0s elsewhere." },
    { id: "matrix-tf-19", question: "Matrix multiplication is commutative (A × B = B × A).", answer: false, explanation: "Matrix multiplication is not commutative. A × B ≠ B × A in general." },
    { id: "matrix-tf-20", question: "A magic square has all rows, columns, and diagonals summing to the same value.", answer: true, explanation: "In a magic square, all rows, columns, and both diagonals sum to the same magic constant." },
  ],

  // ========== 11. SHORT ANSWER QUESTIONS ==========
  shortAnswerQuestions: [
    { id: "matrix-sa-1", question: "What is a 2D array?", answer: "A 2D array is an array of arrays, representing a table or matrix with rows and columns. Each element is accessed using two indices: row index and column index." },
    { id: "matrix-sa-2", question: "How do you declare a 2D array in Java?", answer: "int[][] matrix; or int matrix[][]; Then create it: matrix = new int[rows][cols];" },
    { id: "matrix-sa-3", question: "What is the difference between matrix.length and matrix[0].length?", answer: "matrix.length returns the number of rows. matrix[0].length returns the number of columns in the first row." },
    { id: "matrix-sa-4", question: "What is a jagged array?", answer: "A jagged array is a 2D array where each row can have a different number of columns. In Java, 2D arrays are arrays of arrays, so they can be jagged." },
    { id: "matrix-sa-5", question: "How do you traverse a 2D array row-wise?", answer: "Use nested loops: outer loop for rows (i from 0 to matrix.length-1), inner loop for columns (j from 0 to matrix[i].length-1)." },
    { id: "matrix-sa-6", question: "How do you traverse a 2D array column-wise?", answer: "Use nested loops: outer loop for columns (j from 0 to matrix[0].length-1), inner loop for rows (i from 0 to matrix.length-1)." },
    { id: "matrix-sa-7", question: "What is the main diagonal of a matrix?", answer: "Main diagonal consists of elements where row index equals column index (i == j). It goes from top-left to bottom-right." },
    { id: "matrix-sa-8", question: "What is the secondary diagonal of a matrix?", answer: "Secondary diagonal consists of elements where i + j = n - 1 (for n×n matrix). It goes from top-right to bottom-left." },
    { id: "matrix-sa-9", question: "What is matrix addition?", answer: "Matrix addition adds corresponding elements of two matrices. Both matrices must have the same dimensions. Result[i][j] = matrix1[i][j] + matrix2[i][j]." },
    { id: "matrix-sa-10", question: "What is the transpose of a matrix?", answer: "Transpose of a matrix is obtained by swapping rows and columns. transpose[i][j] = matrix[j][i]. Rows become columns and columns become rows." },
    { id: "matrix-sa-11", question: "What is a symmetric matrix?", answer: "A symmetric matrix is a square matrix that equals its own transpose. matrix[i][j] = matrix[j][i] for all i, j." },
    { id: "matrix-sa-12", question: "What is an identity matrix?", answer: "An identity matrix is a square matrix with 1s on the main diagonal and 0s elsewhere. It acts like the number 1 in matrix multiplication." },
    { id: "matrix-sa-13", question: "What is a magic square?", answer: "A magic square is a square matrix where the sum of each row, each column, and both diagonals are equal to the same value (magic constant)." },
    { id: "matrix-sa-14", question: "What is a saddle point in a matrix?", answer: "A saddle point is an element that is the minimum in its row and the maximum in its column." },
    { id: "matrix-sa-15", question: "What is the difference between upper and lower triangular matrices?", answer: "Upper triangular: all elements below main diagonal are 0 (j >= i has values). Lower triangular: all elements above main diagonal are 0 (j <= i has values)." },
    { id: "matrix-sa-16", question: "How do you print a matrix in spiral order?", answer: "Use four boundaries (top, bottom, left, right). Print top row, right column, bottom row, left column, then shrink boundaries and repeat." },
    { id: "matrix-sa-17", question: "What are boundary elements of a matrix?", answer: "Boundary elements are those in the first row, last row, first column, or last column. They form a 'frame' around the matrix." },
    { id: "matrix-sa-18", question: "Can you multiply any two matrices?", answer: "No. For matrix multiplication, the number of columns in the first matrix must equal the number of rows in the second matrix." },
    { id: "matrix-sa-19", question: "What is the time complexity of matrix addition?", answer: "O(rows × columns). We visit each element exactly once." },
    { id: "matrix-sa-20", question: "How do you find the row with maximum sum?", answer: "Calculate sum of each row, track the maximum sum and its row index. Initialize max with minimum value to handle negative numbers." },
  ],

  // ========== 12. LONG ANSWER QUESTIONS ==========
  longAnswerQuestions: [
    {
      id: "matrix-la-1",
      question: "Explain 2D arrays in Java with syntax and examples.",
      answer: "A 2D array is an array of arrays, representing a table with rows and columns.\n\nDeclaration:\nint[][] matrix;  // or int matrix[][];\n\nCreation:\nmatrix = new int[3][4];  // 3 rows, 4 columns\n\nCombined declaration and creation:\nint[][] matrix = new int[3][4];\n\nInitialization:\nint[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\n\nAccessing elements:\nint element = matrix[1][2];  // row 1, column 2\n\nModifying elements:\nmatrix[0][1] = 100;\n\nDimensions:\nint rows = matrix.length;        // number of rows\nint cols = matrix[0].length;     // number of columns\n\nTraversal:\nfor (int i = 0; i < matrix.length; i++) {\n    for (int j = 0; j < matrix[i].length; j++) {\n        System.out.print(matrix[i][j] + \" \");\n    }\n    System.out.println();\n}\n\nKey points:\n- First index is row, second index is column\n- Indices start at 0\n- matrix.length gives rows, matrix[0].length gives columns\n- Java allows jagged arrays",
    },
    {
      id: "matrix-la-2",
      question: "Explain matrix addition and matrix transpose with examples.",
      answer: "MATRIX ADDITION:\nTwo matrices can be added if they have the same dimensions. Corresponding elements are added.\n\nAlgorithm:\nfor i = 0 to rows-1:\n    for j = 0 to cols-1:\n        result[i][j] = matrix1[i][j] + matrix2[i][j]\n\nExample:\nA = {{1, 2}, {3, 4}}\nB = {{5, 6}, {7, 8}}\nC = A + B = {{6, 8}, {10, 12}}\n\nMATRIX TRANSPOSE:\nTranspose swaps rows and columns. transpose[i][j] = matrix[j][i]\n\nAlgorithm:\nfor i = 0 to rows-1:\n    for j = 0 to cols-1:\n        transpose[j][i] = matrix[i][j]\n\nExample:\nA = {{1, 2, 3}, {4, 5, 6}}\nAT = {{1, 4}, {2, 5}, {3, 6}}\n\nKey points:\n- Addition requires same dimensions\n- Transpose changes dimensions: m×n becomes n×m\n- Transpose is denoted as A^T",
    },
    {
      id: "matrix-la-3",
      question: "Write a program to add two matrices.",
      answer: "Program to add two matrices:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int[][] matrix1 = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        \n        int[][] matrix2 = {\n            {7, 8, 9},\n            {10, 11, 12}\n        };\n        \n        int rows = matrix1.length;\n        int cols = matrix1[0].length;\n        int[][] sum = new int[rows][cols];\n        \n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                sum[i][j] = matrix1[i][j] + matrix2[i][j];\n            }\n        }\n        \n        System.out.println('Sum of matrices:');\n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                System.out.print(sum[i][j] + ' ');\n            }\n            System.out.println();\n        }\n        \n        sc.close();\n    }\n}\n\nOutput:\nSum of matrices:\n8 10 12 \n14 16 18 \n\nExplanation:\n1. Initialize two 2x3 matrices.\n2. Create result matrix of same size.\n3. Add corresponding elements.\n4. Print the sum matrix.",
    },
    {
      id: "matrix-la-4",
      question: "Write a program to find the transpose of a matrix.",
      answer: "Program to find transpose:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        \n        int rows = matrix.length;\n        int cols = matrix[0].length;\n        int[][] transpose = new int[cols][rows];\n        \n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                transpose[j][i] = matrix[i][j];\n            }\n        }\n        \n        System.out.println('Original matrix:');\n        printMatrix(matrix);\n        \n        System.out.println('\\nTranspose:');\n        printMatrix(transpose);\n    }\n    \n    public static void printMatrix(int[][] mat) {\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                System.out.print(mat[i][j] + ' ');\n            }\n            System.out.println();\n        }\n    }\n}\n\nOutput:\nOriginal matrix:\n1 2 3 \n4 5 6 \n\nTranspose:\n1 4 \n2 5 \n3 6 \n\nExplanation:\n1. Original matrix is 2x3.\n2. Transpose will be 3x2.\n3. Swap rows and columns: transpose[j][i] = matrix[i][j].",
    },
    {
      id: "matrix-la-5",
      question: "Write a program to multiply two matrices.",
      answer: "Program to multiply two matrices:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[][] A = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        \n        int[][] B = {\n            {7, 8},\n            {9, 10},\n            {11, 12}\n        };\n        \n        int rowsA = A.length;\n        int colsA = A[0].length;\n        int colsB = B[0].length;\n        int[][] product = new int[rowsA][colsB];\n        \n        for (int i = 0; i < rowsA; i++) {\n            for (int j = 0; j < colsB; j++) {\n                for (int k = 0; k < colsA; k++) {\n                    product[i][j] = product[i][j] + A[i][k] * B[k][j];\n                }\n            }\n        }\n        \n        System.out.println('Product of matrices:');\n        for (int i = 0; i < rowsA; i++) {\n            for (int j = 0; j < colsB; j++) {\n                System.out.print(product[i][j] + ' ');\n            }\n            System.out.println();\n        }\n    }\n}\n\nOutput:\nProduct of matrices:\n58 64 \n139 154 \n\nExplanation:\n1. A is 2x3, B is 3x2, result is 2x2.\n2. Use three nested loops.\n3. product[i][j] = sum of (A[i][k] * B[k][j]) for all k.\n4. Time complexity: O(rowsA × colsA × colsB).",
    },
    {
      id: "matrix-la-6",
      question: "Write a program to check if a matrix is symmetric.",
      answer: "Program to check symmetric matrix:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {2, 4, 5},\n            {3, 5, 6}\n        };\n        \n        boolean isSymmetric = true;\n        int rows = matrix.length;\n        int cols = matrix[0].length;\n        \n        // Check if square matrix\n        if (rows != cols) {\n            isSymmetric = false;\n        } else {\n            for (int i = 0; i < rows; i++) {\n                for (int j = 0; j < cols; j++) {\n                    if (matrix[i][j] != matrix[j][i]) {\n                        isSymmetric = false;\n                        break;\n                    }\n                }\n                if (!isSymmetric) break;\n            }\n        }\n        \n        System.out.println('Is symmetric: ' + isSymmetric);\n    }\n}\n\nOutput:\nIs symmetric: true\n\nExplanation:\n1. A matrix is symmetric if matrix[i][j] = matrix[j][i].\n2. Must be a square matrix (rows = columns).\n3. Check each element against its transpose counterpart.\n4. If any pair doesn't match, not symmetric.",
    },
    {
      id: "matrix-la-7",
      question: "Write a program to print a matrix in spiral order.",
      answer: "Program to print matrix in spiral order:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        \n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        \n        System.out.println('Spiral order:');\n        \n        while (top <= bottom && left <= right) {\n            // Print top row\n            for (int j = left; j <= right; j++) {\n                System.out.print(matrix[top][j] + ' ');\n            }\n            top++;\n            \n            // Print right column\n            for (int i = top; i <= bottom; i++) {\n                System.out.print(matrix[i][right] + ' ');\n            }\n            right--;\n            \n            // Print bottom row\n            if (top <= bottom) {\n                for (int j = right; j >= left; j--) {\n                    System.out.print(matrix[bottom][j] + ' ');\n                }\n                bottom--;\n            }\n            \n            // Print left column\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) {\n                    System.out.print(matrix[i][left] + ' ');\n                }\n                left++;\n            }\n        }\n    }\n}\n\nOutput:\nSpiral order:\n1 2 3 6 9 8 7 4 5 \n\nExplanation:\n1. Use four boundaries: top, bottom, left, right.\n2. Print top row (left to right), increment top.\n3. Print right column (top to bottom), decrement right.\n4. Print bottom row (right to left), decrement bottom.\n5. Print left column (bottom to top), increment left.\n6. Repeat until boundaries cross.",
    },
    {
      id: "matrix-la-8",
      question: "Write a program to find the sum of boundary elements of a matrix.",
      answer: "Program to find sum of boundary elements:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3, 4},\n            {5, 6, 7, 8},\n            {9, 10, 11, 12}\n        };\n        \n        int boundarySum = 0;\n        int rows = matrix.length;\n        int cols = matrix[0].length;\n        \n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {\n                    boundarySum = boundarySum + matrix[i][j];\n                }\n            }\n        }\n        \n        System.out.println('Sum of boundary elements: ' + boundarySum);\n    }\n}\n\nOutput:\nSum of boundary elements: 60\n\nExplanation:\n1. Boundary elements are in first row, last row, first column, or last column.\n2. Check if i == 0 (first row) or i == rows-1 (last row).\n3. Check if j == 0 (first column) or j == cols-1 (last column).\n4. Sum = 1+2+3+4+5+8+9+10+11+12 = 60.\n5. Internal elements (6, 7) are not included.",
    },
    {
      id: "matrix-la-9",
      question: "Write a program to check if a matrix is a magic square.",
      answer: "Program to check magic square:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {2, 7, 6},\n            {9, 5, 1},\n            {4, 3, 8}\n        };\n        \n        int n = matrix.length;\n        int magicSum = 0;\n        boolean isMagic = true;\n        \n        // Calculate sum of first row\n        for (int j = 0; j < n; j++) {\n            magicSum = magicSum + matrix[0][j];\n        }\n        \n        // Check all rows\n        for (int i = 1; i < n; i++) {\n            int rowSum = 0;\n            for (int j = 0; j < n; j++) {\n                rowSum = rowSum + matrix[i][j];\n            }\n            if (rowSum != magicSum) {\n                isMagic = false;\n                break;\n            }\n        }\n        \n        // Check all columns\n        for (int j = 0; j < n && isMagic; j++) {\n            int colSum = 0;\n            for (int i = 0; i < n; i++) {\n                colSum = colSum + matrix[i][j];\n            }\n            if (colSum != magicSum) {\n                isMagic = false;\n                break;\n            }\n        }\n        \n        // Check diagonals\n        int diag1 = 0, diag2 = 0;\n        for (int i = 0; i < n; i++) {\n            diag1 = diag1 + matrix[i][i];\n            diag2 = diag2 + matrix[i][n - 1 - i];\n        }\n        if (diag1 != magicSum || diag2 != magicSum) {\n            isMagic = false;\n        }\n        \n        System.out.println('Is magic square: ' + isMagic);\n    }\n}\n\nOutput:\nIs magic square: true\n\nExplanation:\n1. Magic square: all rows, columns, diagonals sum to same value.\n2. Calculate magic sum from first row.\n3. Check all rows, columns, and both diagonals.\n4. In 3x3 magic square, magic sum is 15.",
    },
    {
      id: "matrix-la-10",
      question: "Write a program to interchange first and last rows of a matrix.",
      answer: "Program to interchange first and last rows:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        \n        int rows = matrix.length;\n        \n        // Swap first and last rows\n        int[] temp = matrix[0];\n        matrix[0] = matrix[rows - 1];\n        matrix[rows - 1] = temp;\n        \n        System.out.println('Matrix after swapping rows:');\n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < matrix[i].length; j++) {\n                System.out.print(matrix[i][j] + ' ');\n            }\n            System.out.println();\n        }\n    }\n}\n\nOutput:\nMatrix after swapping rows:\n7 8 9 \n4 5 6 \n1 2 3 \n\nExplanation:\n1. Store first row in temporary array.\n2. Assign last row to first row.\n3. Assign temporary array (original first row) to last row.\n4. First and last rows are swapped.\n5. Time complexity: O(cols), only one operation per element in the rows.",
    },
  ],

  // ========== 13. PROGRAMMING QUESTIONS ==========
  programmingQuestions: {
    easy: [
      {
        id: "matrix-pg-e-1",
        question: "Write a program to input a 3x3 matrix and print it.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[][] matrix = new int[3][3];
        
        System.out.println("Enter 3x3 matrix:");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        System.out.println("Matrix:");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}`,
        output: "Enter 3x3 matrix:\n1 2 3 4 5 6 7 8 9\nMatrix:\n1 2 3 \n4 5 6 \n7 8 9 ",
      },
      {
        id: "matrix-pg-e-2",
        question: "Write a program to calculate the sum of all elements in a 2D array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int sum = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                sum = sum + matrix[i][j];
            }
        }
        
        System.out.println("Sum: " + sum);
    }
}`,
        output: "Sum: 45",
      },
      {
        id: "matrix-pg-e-3",
        question: "Write a program to find the sum of each row in a 2D array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        for (int i = 0; i < matrix.length; i++) {
            int rowSum = 0;
            for (int j = 0; j < matrix[i].length; j++) {
                rowSum = rowSum + matrix[i][j];
            }
            System.out.println("Row " + i + " sum: " + rowSum);
        }
    }
}`,
        output: "Row 0 sum: 6\nRow 1 sum: 15\nRow 2 sum: 24",
      },
      {
        id: "matrix-pg-e-4",
        question: "Write a program to find the sum of each column in a 2D array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        for (int j = 0; j < matrix[0].length; j++) {
            int colSum = 0;
            for (int i = 0; i < matrix.length; i++) {
                colSum = colSum + matrix[i][j];
            }
            System.out.println("Column " + j + " sum: " + colSum);
        }
    }
}`,
        output: "Column 0 sum: 12\nColumn 1 sum: 15\nColumn 2 sum: 18",
      },
      {
        id: "matrix-pg-e-5",
        question: "Write a program to print the main diagonal elements of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Main diagonal:");
        for (int i = 0; i < matrix.length; i++) {
            System.out.print(matrix[i][i] + " ");
        }
    }
}`,
        output: "Main diagonal:\n1 5 9 ",
      },
      {
        id: "matrix-pg-e-6",
        question: "Write a program to print the secondary diagonal elements of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Secondary diagonal:");
        for (int i = 0; i < matrix.length; i++) {
            System.out.print(matrix[i][matrix.length - 1 - i] + " ");
        }
    }
}`,
        output: "Secondary diagonal:\n3 5 7 ",
      },
      {
        id: "matrix-pg-e-7",
        question: "Write a program to count even and odd numbers in a 2D array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int evenCount = 0, oddCount = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] % 2 == 0) {
                    evenCount++;
                } else {
                    oddCount++;
                }
            }
        }
        
        System.out.println("Even: " + evenCount);
        System.out.println("Odd: " + oddCount);
    }
}`,
        output: "Even: 4\nOdd: 5",
      },
      {
        id: "matrix-pg-e-8",
        question: "Write a program to find the maximum element in a 2D array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int max = matrix[0][0];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                }
            }
        }
        
        System.out.println("Maximum: " + max);
    }
}`,
        output: "Maximum: 9",
      },
      {
        id: "matrix-pg-e-9",
        question: "Write a program to print boundary elements of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };
        
        System.out.println("Boundary elements:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (i == 0 || i == matrix.length - 1 || j == 0 || j == matrix[i].length - 1) {
                    System.out.print(matrix[i][j] + " ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}`,
        output: "Boundary elements:\n1 2 3 4 \n5     8 \n9 10 11 12 ",
      },
      {
        id: "matrix-pg-e-10",
        question: "Write a program to search for an element in a 2D array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int target = 5;
        boolean found = false;
        int row = -1, col = -1;
        
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == target) {
                    found = true;
                    row = i;
                    col = j;
                    break;
                }
            }
            if (found) break;
        }
        
        if (found) {
            System.out.println("Found at [" + row + "][" + col + "]");
        } else {
            System.out.println("Not found");
        }
    }
}`,
        output: "Found at [1][1]",
      },
    ],
    medium: [
      {
        id: "matrix-pg-m-1",
        question: "Write a program to add two matrices.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] A = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        int[][] B = {
            {7, 8, 9},
            {10, 11, 12}
        };
        
        int rows = A.length;
        int cols = A[0].length;
        int[][] sum = new int[rows][cols];
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                sum[i][j] = A[i][j] + B[i][j];
            }
        }
        
        System.out.println("Sum:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(sum[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "Sum:\n8 10 12 \n14 16 18 ",
      },
      {
        id: "matrix-pg-m-2",
        question: "Write a program to find the transpose of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        int[][] transpose = new int[cols][rows];
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                transpose[j][i] = matrix[i][j];
            }
        }
        
        System.out.println("Transpose:");
        for (int i = 0; i < cols; i++) {
            for (int j = 0; j < rows; j++) {
                System.out.print(transpose[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "Transpose:\n1 4 \n2 5 \n3 6 ",
      },
      {
        id: "matrix-pg-m-3",
        question: "Write a program to check if a matrix is symmetric.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {2, 4, 5},
            {3, 5, 6}
        };
        
        boolean isSymmetric = true;
        int n = matrix.length;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] != matrix[j][i]) {
                    isSymmetric = false;
                    break;
                }
            }
            if (!isSymmetric) break;
        }
        
        System.out.println("Is symmetric: " + isSymmetric);
    }
}`,
        output: "Is symmetric: true",
      },
      {
        id: "matrix-pg-m-4",
        question: "Write a program to print a matrix in spiral order.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        System.out.println("Spiral order:");
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) {
                System.out.print(matrix[top][j] + " ");
            }
            top++;
            
            for (int i = top; i <= bottom; i++) {
                System.out.print(matrix[i][right] + " ");
            }
            right--;
            
            if (top <= bottom) {
                for (int j = right; j >= left; j--) {
                    System.out.print(matrix[bottom][j] + " ");
                }
                bottom--;
            }
            
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    System.out.print(matrix[i][left] + " ");
                }
                left++;
            }
        }
    }
}`,
        output: "Spiral order:\n1 2 3 6 9 8 7 4 5 ",
      },
      {
        id: "matrix-pg-m-5",
        question: "Write a program to find the sum of diagonal elements.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int mainSum = 0, secondarySum = 0;
        
        for (int i = 0; i < matrix.length; i++) {
            mainSum = mainSum + matrix[i][i];
            secondarySum = secondarySum + matrix[i][matrix.length - 1 - i];
        }
        
        System.out.println("Main diagonal sum: " + mainSum);
        System.out.println("Secondary diagonal sum: " + secondarySum);
    }
}`,
        output: "Main diagonal sum: 15\nSecondary diagonal sum: 15",
      },
      {
        id: "matrix-pg-m-6",
        question: "Write a program to check if a matrix is an identity matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 0, 0},
            {0, 1, 0},
            {0, 0, 1}
        };
        
        boolean isIdentity = true;
        int n = matrix.length;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    if (matrix[i][j] != 1) {
                        isIdentity = false;
                        break;
                    }
                } else {
                    if (matrix[i][j] != 0) {
                        isIdentity = false;
                        break;
                    }
                }
            }
            if (!isIdentity) break;
        }
        
        System.out.println("Is identity: " + isIdentity);
    }
}`,
        output: "Is identity: true",
      },
      {
        id: "matrix-pg-m-7",
        question: "Write a program to reverse each row of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        for (int i = 0; i < matrix.length; i++) {
            int start = 0;
            int end = matrix[i].length - 1;
            
            while (start < end) {
                int temp = matrix[i][start];
                matrix[i][start] = matrix[i][end];
                matrix[i][end] = temp;
                start++;
                end--;
            }
        }
        
        System.out.println("Reversed rows:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "Reversed rows:\n3 2 1 \n6 5 4 \n9 8 7 ",
      },
      {
        id: "matrix-pg-m-8",
        question: "Write a program to interchange first and last columns of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        for (int i = 0; i < matrix.length; i++) {
            int temp = matrix[i][0];
            matrix[i][0] = matrix[i][matrix[i].length - 1];
            matrix[i][matrix[i].length - 1] = temp;
        }
        
        System.out.println("After swapping columns:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "After swapping columns:\n3 2 1 \n6 5 4 \n9 8 7 ",
      },
      {
        id: "matrix-pg-m-9",
        question: "Write a program to find the row with maximum sum.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int maxRowSum = Integer.MIN_VALUE;
        int maxRowIndex = -1;
        
        for (int i = 0; i < matrix.length; i++) {
            int rowSum = 0;
            for (int j = 0; j < matrix[i].length; j++) {
                rowSum = rowSum + matrix[i][j];
            }
            
            if (rowSum > maxRowSum) {
                maxRowSum = rowSum;
                maxRowIndex = i;
            }
        }
        
        System.out.println("Row " + maxRowIndex + " has maximum sum: " + maxRowSum);
    }
}`,
        output: "Row 2 has maximum sum: 24",
      },
      {
        id: "matrix-pg-m-10",
        question: "Write a program to sort each row of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {9, 2, 7},
            {4, 5, 1},
            {8, 3, 6}
        };
        
        // Sort each row using bubble sort
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length - 1; j++) {
                for (int k = 0; k < matrix[i].length - j - 1; k++) {
                    if (matrix[i][k] > matrix[i][k + 1]) {
                        int temp = matrix[i][k];
                        matrix[i][k] = matrix[i][k + 1];
                        matrix[i][k + 1] = temp;
                    }
                }
            }
        }
        
        System.out.println("Sorted matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "Sorted matrix:\n2 7 9 \n1 4 5 \n3 6 8 ",
      },
    ],
    hard: [
      {
        id: "matrix-pg-h-1",
        question: "Write a program to multiply two matrices.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] A = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        int[][] B = {
            {7, 8},
            {9, 10},
            {11, 12}
        };
        
        int rowsA = A.length;
        int colsA = A[0].length;
        int colsB = B[0].length;
        int[][] product = new int[rowsA][colsB];
        
        for (int i = 0; i < rowsA; i++) {
            for (int j = 0; j < colsB; j++) {
                for (int k = 0; k < colsA; k++) {
                    product[i][j] = product[i][j] + A[i][k] * B[k][j];
                }
            }
        }
        
        System.out.println("Product:");
        for (int i = 0; i < rowsA; i++) {
            for (int j = 0; j < colsB; j++) {
                System.out.print(product[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "Product:\n58 64 \n139 154 ",
      },
      {
        id: "matrix-pg-h-2",
        question: "Write a program to check if a matrix is a magic square.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {2, 7, 6},
            {9, 5, 1},
            {4, 3, 8}
        };
        
        int n = matrix.length;
        int magicSum = 0;
        boolean isMagic = true;
        
        for (int j = 0; j < n; j++) {
            magicSum = magicSum + matrix[0][j];
        }
        
        for (int i = 1; i < n; i++) {
            int rowSum = 0;
            for (int j = 0; j < n; j++) {
                rowSum = rowSum + matrix[i][j];
            }
            if (rowSum != magicSum) {
                isMagic = false;
                break;
            }
        }
        
        for (int j = 0; j < n && isMagic; j++) {
            int colSum = 0;
            for (int i = 0; i < n; i++) {
                colSum = colSum + matrix[i][j];
            }
            if (colSum != magicSum) {
                isMagic = false;
                break;
            }
        }
        
        int diag1 = 0, diag2 = 0;
        for (int i = 0; i < n; i++) {
            diag1 = diag1 + matrix[i][i];
            diag2 = diag2 + matrix[i][n - 1 - i];
        }
        if (diag1 != magicSum || diag2 != magicSum) {
            isMagic = false;
        }
        
        System.out.println("Is magic square: " + isMagic);
    }
}`,
        output: "Is magic square: true",
      },
      {
        id: "matrix-pg-h-3",
        question: "Write a program to find the saddle point of a matrix.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        boolean found = false;
        
        for (int i = 0; i < matrix.length; i++) {
            int minInRow = matrix[i][0];
            int colIndex = 0;
            
            for (int j = 1; j < matrix[i].length; j++) {
                if (matrix[i][j] < minInRow) {
                    minInRow = matrix[i][j];
                    colIndex = j;
                }
            }
            
            boolean isMaxInCol = true;
            for (int k = 0; k < matrix.length; k++) {
                if (matrix[k][colIndex] > minInRow) {
                    isMaxInCol = false;
                    break;
                }
            }
            
            if (isMaxInCol) {
                System.out.println("Saddle point: " + minInRow + " at [" + i + "][" + colIndex + "]");
                found = true;
            }
        }
        
        if (!found) {
            System.out.println("No saddle point found");
        }
    }
}`,
        output: "Saddle point: 7 at [2][0]",
      },
      {
        id: "matrix-pg-h-4",
        question: "Write a program to rotate a matrix 90 degrees clockwise.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int n = matrix.length;
        
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
        
        System.out.println("Rotated matrix:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "Rotated matrix:\n7 4 1 \n8 5 2 \n9 6 3 ",
      },
      {
        id: "matrix-pg-h-5",
        question: "Write a program to find the sum of boundary elements.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };
        
        int boundarySum = 0;
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
                    boundarySum = boundarySum + matrix[i][j];
                }
            }
        }
        
        System.out.println("Sum of boundary elements: " + boundarySum);
    }
}`,
        output: "Sum of boundary elements: 60",
      },
      {
        id: "matrix-pg-h-6",
        question: "Write a program to print upper and lower triangular matrices.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Upper triangular:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (j >= i) {
                    System.out.print(matrix[i][j] + " ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
        
        System.out.println("\\nLower triangular:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (j <= i) {
                    System.out.print(matrix[i][j] + " ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}`,
        output: "Upper triangular:\n1 2 3 \n  5 6 \n  8 9 \n\nLower triangular:\n1   \n4 5 \n7 8 9 ",
      },
      {
        id: "matrix-pg-h-7",
        question: "Write a program to find the intersection of two matrices.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] A = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        int[][] B = {
            {7, 2, 9},
            {4, 8, 6}
        };
        
        System.out.println("Common elements:");
        for (int i = 0; i < A.length; i++) {
            for (int j = 0; j < A[i].length; j++) {
                for (int k = 0; k < B.length; k++) {
                    for (int l = 0; l < B[k].length; l++) {
                        if (A[i][j] == B[k][l]) {
                            System.out.print(A[i][j] + " ");
                        }
                    }
                }
            }
        }
    }
}`,
        output: "Common elements:\n2 4 6 ",
      },
      {
        id: "matrix-pg-h-8",
        question: "Write a program to check if a matrix is lower triangular.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 0, 0},
            {4, 5, 0},
            {7, 8, 9}
        };
        
        boolean isLowerTriangular = true;
        int n = matrix.length;
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (matrix[i][j] != 0) {
                    isLowerTriangular = false;
                    break;
                }
            }
            if (!isLowerTriangular) break;
        }
        
        System.out.println("Is lower triangular: " + isLowerTriangular);
    }
}`,
        output: "Is lower triangular: true",
      },
      {
        id: "matrix-pg-h-9",
        question: "Write a program to find the union of two matrices.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] A = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        int[][] B = {
            {7, 2, 9},
            {4, 8, 6}
        };
        
        System.out.print("Union: ");
        for (int i = 0; i < A.length; i++) {
            for (int j = 0; j < A[i].length; j++) {
                System.out.print(A[i][j] + " ");
            }
        }
        
        for (int i = 0; i < B.length; i++) {
            for (int j = 0; j < B[i].length; j++) {
                boolean found = false;
                for (int k = 0; k < A.length && !found; k++) {
                    for (int l = 0; l < A[k].length && !found; l++) {
                        if (B[i][j] == A[k][l]) {
                            found = true;
                        }
                    }
                }
                if (!found) {
                    System.out.print(B[i][j] + " ");
                }
            }
        }
    }
}`,
        output: "Union: 1 2 3 4 5 6 7 9 8 ",
      },
      {
        id: "matrix-pg-h-10",
        question: "Write a program to rotate a matrix 180 degrees.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int n = matrix.length;
        
        // Reverse each row
        for (int i = 0; i < n; i++) {
            int start = 0;
            int end = n - 1;
            while (start < end) {
                int temp = matrix[i][start];
                matrix[i][start] = matrix[i][end];
                matrix[i][end] = temp;
                start++;
                end--;
            }
        }
        
        // Reverse order of rows
        for (int i = 0; i < n / 2; i++) {
            int[] temp = matrix[i];
            matrix[i] = matrix[n - 1 - i];
            matrix[n - 1 - i] = temp;
        }
        
        System.out.println("Rotated 180 degrees:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "Rotated 180 degrees:\n9 8 7 \n6 5 4 \n3 2 1 ",
      },
    ],
  },

  // ========== 14. CHALLENGE PROBLEMS ==========
  challengeProblems: [
    {
      id: "matrix-cp-1",
      title: "Spiral Matrix",
      question: "Given a matrix, print all elements in spiral order.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };
        
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) {
                System.out.print(matrix[top][j] + " ");
            }
            top++;
            
            for (int i = top; i <= bottom; i++) {
                System.out.print(matrix[i][right] + " ");
            }
            right--;
            
            if (top <= bottom) {
                for (int j = right; j >= left; j--) {
                    System.out.print(matrix[bottom][j] + " ");
                }
                bottom--;
            }
            
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    System.out.print(matrix[i][left] + " ");
                }
                left++;
            }
        }
    }
}`,
      output: "1 2 3 4 8 12 11 10 9 5 6 7 ",
    },
    {
      id: "matrix-cp-2",
      title: "Rotate Matrix 90 Degrees",
      question: "Given a square matrix, rotate it 90 degrees clockwise.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int n = matrix.length;
        
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
        
        System.out.println("Rotated matrix:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: "Rotated matrix:\n7 4 1 \n8 5 2 \n9 6 3 ",
    },
    {
      id: "matrix-cp-3",
      title: "Search in Row-wise and Column-wise Sorted Matrix",
      question: "Search for an element in a matrix where each row and column is sorted in ascending order.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {10, 20, 30, 40},
            {15, 25, 35, 45},
            {27, 29, 37, 48},
            {32, 33, 39, 50}
        };
        
        int target = 29;
        int i = 0;
        int j = matrix[0].length - 1;
        boolean found = false;
        
        while (i < matrix.length && j >= 0) {
            if (matrix[i][j] == target) {
                System.out.println("Found at [" + i + "][" + j + "]");
                found = true;
                break;
            } else if (matrix[i][j] > target) {
                j--;
            } else {
                i++;
            }
        }
        
        if (!found) {
            System.out.println("Not found");
        }
    }
}`,
      output: "Found at [2][1]",
    },
    {
      id: "matrix-cp-4",
      title: "Find All Saddle Points",
      question: "Find all saddle points in a matrix (minimum in row and maximum in column).",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Saddle points:");
        boolean found = false;
        
        for (int i = 0; i < matrix.length; i++) {
            int minInRow = matrix[i][0];
            int colIndex = 0;
            
            for (int j = 1; j < matrix[i].length; j++) {
                if (matrix[i][j] < minInRow) {
                    minInRow = matrix[i][j];
                    colIndex = j;
                }
            }
            
            boolean isMaxInCol = true;
            for (int k = 0; k < matrix.length; k++) {
                if (matrix[k][colIndex] > minInRow) {
                    isMaxInCol = false;
                    break;
                }
            }
            
            if (isMaxInCol) {
                System.out.println(minInRow + " at [" + i + "][" + colIndex + "]");
                found = true;
            }
        }
        
        if (!found) {
            System.out.println("No saddle point found");
        }
    }
}`,
      output: "Saddle points:\n7 at [2][0]",
    },
    {
      id: "matrix-cp-5",
      title: "Print Matrix in Zig-Zag Pattern",
      question: "Print a matrix in zig-zag diagonal pattern.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int n = matrix.length;
        System.out.println("Zig-zag pattern:");
        
        for (int sum = 0; sum <= 2 * (n - 1); sum++) {
            if (sum % 2 == 0) {
                // Even sum: go up
                for (int i = Math.min(sum, n - 1); i >= 0 && sum - i < n; i--) {
                    System.out.print(matrix[i][sum - i] + " ");
                }
            } else {
                // Odd sum: go down
                for (int i = Math.max(0, sum - (n - 1)); i <= Math.min(sum, n - 1); i++) {
                    System.out.print(matrix[i][sum - i] + " ");
                }
            }
        }
    }
}`,
      output: "Zig-zag pattern:\n1 2 4 7 5 3 6 8 9 ",
    },
    {
      id: "matrix-cp-6",
      title: "Find Kth Smallest Element in Sorted Matrix",
      question: "Find the kth smallest element in a row-wise and column-wise sorted matrix.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {10, 20, 30, 40},
            {15, 25, 35, 45},
            {27, 29, 37, 48},
            {32, 33, 39, 50}
        };
        
        int k = 4;
        int n = matrix.length;
        int[] flattened = new int[n * n];
        int index = 0;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                flattened[index++] = matrix[i][j];
            }
        }
        
        // Sort the array
        for (int i = 0; i < flattened.length - 1; i++) {
            for (int j = 0; j < flattened.length - i - 1; j++) {
                if (flattened[j] > flattened[j + 1]) {
                    int temp = flattened[j];
                    flattened[j] = flattened[j + 1];
                    flattened[j + 1] = temp;
                }
            }
        }
        
        System.out.println(k + "th smallest element: " + flattened[k - 1]);
    }
}`,
      output: "4th smallest element: 20",
    },
    {
      id: "matrix-cp-7",
      title: "Common Elements in All Rows",
      question: "Find common elements present in all rows of a matrix.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4, 5},
            {2, 4, 5, 8, 10},
            {3, 5, 7, 9, 11},
            {1, 3, 5, 7, 9}
        };
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        System.out.println("Common elements:");
        
        for (int j = 0; j < cols; j++) {
            int element = matrix[0][j];
            boolean common = true;
            
            for (int i = 1; i < rows; i++) {
                boolean found = false;
                for (int k = 0; k < cols; k++) {
                    if (matrix[i][k] == element) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    common = false;
                    break;
                }
            }
            
            if (common) {
                System.out.print(element + " ");
            }
        }
    }
}`,
      output: "Common elements:\n5 ",
    },
    {
      id: "matrix-cp-8",
      title: "In-place Rotate Matrix 90 Degrees",
      question: "Rotate a square matrix 90 degrees clockwise without using extra space.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int n = matrix.length;
        
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
        
        System.out.println("Rotated matrix:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: "Rotated matrix:\n7 4 1 \n8 5 2 \n9 6 3 ",
    },
  ],

  // ========== 15. PREVIOUS YEAR QUESTIONS ==========
  previousYearQuestions: [
    {
      id: "matrix-py-1",
      question: "(ICSE 2023) Write a program to input a 3x3 matrix and find the sum of all elements.",
      answer: "int sum = 0;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        sum = sum + matrix[i][j];\n    }\n}\nSystem.out.println(sum);",
      explanation: "Use nested loops to traverse all elements and calculate sum.",
    },
    {
      id: "matrix-py-2",
      question: "(ICSE 2023) Write a program to find the sum of diagonal elements of a 3x3 matrix.",
      answer: "int sum = 0;\nfor (int i = 0; i < 3; i++) {\n    sum = sum + matrix[i][i];\n}\nSystem.out.println(sum);",
      explanation: "Main diagonal elements are matrix[0][0], matrix[1][1], matrix[2][2].",
    },
    {
      id: "matrix-py-3",
      question: "(ICSE 2022) Write a program to add two 3x3 matrices.",
      answer: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        sum[i][j] = A[i][j] + B[i][j];\n    }\n}",
      explanation: "Add corresponding elements of both matrices.",
    },
    {
      id: "matrix-py-4",
      question: "(ICSE 2022) Write a program to find the transpose of a 3x3 matrix.",
      answer: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        transpose[j][i] = matrix[i][j];\n    }\n}",
      explanation: "Swap rows and columns: transpose[j][i] = matrix[i][j].",
    },
    {
      id: "matrix-py-5",
      question: "(ICSE 2021) Write a program to print the boundary elements of a 3x3 matrix.",
      answer: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == 0 || i == 2 || j == 0 || j == 2) {\n            System.out.print(matrix[i][j] + \" \");\n        }\n    }\n}",
      explanation: "Boundary elements are in first row, last row, first column, or last column.",
    },
    {
      id: "matrix-py-6",
      question: "(ISC 2021) Write a program to check if a square matrix is symmetric.",
      answer: "for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (matrix[i][j] != matrix[j][i]) {\n            not symmetric;\n        }\n    }\n}",
      explanation: "Symmetric matrix satisfies matrix[i][j] = matrix[j][i] for all i, j.",
    },
  ],

  // ========== 16. AI VIVA QUESTIONS ==========
  aiVivaQuestions: [
    {
      id: "matrix-av-1",
      question: "What is a 2D array?",
      answer: "A 2D array is an array of arrays, representing a table or matrix with rows and columns. Each element is accessed using two indices: row index and column index.",
    },
    {
      id: "matrix-av-2",
      question: "How do you declare a 2D array in Java?",
      answer: "int[][] matrix; or int matrix[][]; Then create it: matrix = new int[rows][cols];",
    },
    {
      id: "matrix-av-3",
      question: "What does matrix.length return?",
      answer: "matrix.length returns the number of rows in a 2D array.",
    },
    {
      id: "matrix-av-4",
      question: "What does matrix[0].length return?",
      answer: "matrix[0].length returns the number of columns in the first row.",
    },
    {
      id: "matrix-av-5",
      question: "What is a jagged array?",
      answer: "A jagged array is a 2D array where each row can have a different number of columns. Java allows jagged arrays because each row is an independent array.",
    },
    {
      id: "matrix-av-6",
      question: "How do you traverse a 2D array?",
      answer: "Use nested loops: outer loop for rows (i from 0 to matrix.length-1), inner loop for columns (j from 0 to matrix[i].length-1).",
    },
    {
      id: "matrix-av-7",
      question: "What is the main diagonal of a matrix?",
      answer: "Main diagonal consists of elements where row index equals column index (i == j). It goes from top-left to bottom-right.",
    },
    {
      id: "matrix-av-8",
      question: "What is the secondary diagonal?",
      answer: "Secondary diagonal consists of elements where i + j = n - 1 (for n×n matrix). It goes from top-right to bottom-left.",
    },
    {
      id: "matrix-av-9",
      question: "What is matrix addition?",
      answer: "Matrix addition adds corresponding elements of two matrices. Both matrices must have the same dimensions. Result[i][j] = matrix1[i][j] + matrix2[i][j].",
    },
    {
      id: "matrix-av-10",
      question: "What is the transpose of a matrix?",
      answer: "Transpose of a matrix is obtained by swapping rows and columns. transpose[i][j] = matrix[j][i]. Rows become columns and columns become rows.",
    },
    {
      id: "matrix-av-11",
      question: "What is a symmetric matrix?",
      answer: "A symmetric matrix is a square matrix that equals its own transpose. matrix[i][j] = matrix[j][i] for all i, j.",
    },
    {
      id: "matrix-av-12",
      question: "What is an identity matrix?",
      answer: "An identity matrix is a square matrix with 1s on the main diagonal and 0s elsewhere. It acts like the number 1 in matrix multiplication.",
    },
    {
      id: "matrix-av-13",
      question: "What is a magic square?",
      answer: "A magic square is a square matrix where the sum of each row, each column, and both diagonals are equal to the same value (magic constant).",
    },
    {
      id: "matrix-av-14",
      question: "What is a saddle point?",
      answer: "A saddle point is an element that is the minimum in its row and the maximum in its column.",
    },
    {
      id: "matrix-av-15",
      question: "Can you multiply any two matrices?",
      answer: "No. For matrix multiplication, the number of columns in the first matrix must equal the number of rows in the second matrix. If A is m×n and B is n×p, result is m×p.",
    },
    {
      id: "matrix-av-16",
      question: "What is the time complexity of matrix addition?",
      answer: "O(rows × columns). We visit each element exactly once.",
    },
    {
      id: "matrix-av-17",
      question: "What are boundary elements?",
      answer: "Boundary elements are those in the first row, last row, first column, or last column. They form a 'frame' around the matrix.",
    },
    {
      id: "matrix-av-18",
      question: "What is the difference between upper and lower triangular matrices?",
      answer: "Upper triangular: all elements below main diagonal are 0. Lower triangular: all elements above main diagonal are 0.",
    },
    {
      id: "matrix-av-19",
      question: "How do you print a matrix in spiral order?",
      answer: "Use four boundaries (top, bottom, left, right). Print top row, right column, bottom row, left column, then shrink boundaries and repeat until all elements are printed.",
    },
    {
      id: "matrix-av-20",
      question: "Are 2D arrays passed by value or by reference?",
      answer: "2D arrays are passed by reference. When you pass a 2D array to a method, the method receives a reference to the original array, so changes affect the original.",
    },
  ],

  // ========== 17. PRACTICE TEST ==========
  practiceTest: {
    title: "TWO DIMENSIONAL ARRAYS - Practice Test",
    duration: "60 minutes",
    totalMarks: 50,
    instructions: "Attempt all questions. Write programs with proper indentation and comments.",
    sections: [
      {
        name: "Section A: Objective Questions",
        marks: 10,
        questions: [
          { id: "pt-1", question: "What does matrix.length return?", options: ["Number of columns", "Number of rows", "Total elements", "Last index"], answer: 1 },
          { id: "pt-2", question: "What does matrix[0].length return?", options: ["Number of rows", "Number of columns", "Total elements", "First element"], answer: 1 },
          { id: "pt-3", question: "How do you access element at row 2, column 3?", options: ["arr[2][3]", "arr[3][2]", "arr[1][2]", "arr[2][1]"], answer: 0 },
          { id: "pt-4", question: "What is a jagged array?", options: ["Array with equal rows", "Array with rows of different lengths", "Array with one row", "Array with one column"], answer: 1 },
          { id: "pt-5", question: "What is the transpose of a matrix?", options: ["Same matrix", "Rows become columns", "Columns become rows", "Reverse of matrix"], answer: 1 },
        ],
      },
      {
        name: "Section B: Output Questions",
        marks: 10,
        questions: [
          { id: "pt-6", question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}};\nSystem.out.println(arr[1][0]);", answer: "3" },
          { id: "pt-7", question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}};\nSystem.out.println(arr.length);", answer: "2" },
          { id: "pt-8", question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nint sum = arr[0][0] + arr[1][1] + arr[2][2];\nSystem.out.println(sum);", answer: "15" },
          { id: "pt-9", question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}, {5, 6}};\nfor (int i = 0; i < arr.length; i++) {\n    System.out.print(arr[i][0] + \" \");\n}", answer: "1 3 5 " },
          { id: "pt-10", question: "What is the output?\nint[][] arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nfor (int i = 0; i < arr.length; i++) {\n    System.out.print(arr[i][arr.length - 1 - i] + \" \");\n}", answer: "3 5 7 " },
        ],
      },
      {
        name: "Section C: Programming Questions",
        marks: 20,
        questions: [
          { id: "pt-11", question: "Write a program to add two 3x3 matrices.", answer: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        sum[i][j] = A[i][j] + B[i][j];\n    }\n}" },
          { id: "pt-12", question: "Write a program to find the transpose of a 3x3 matrix.", answer: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        transpose[j][i] = matrix[i][j];\n    }\n}" },
          { id: "pt-13", question: "Write a program to print the boundary elements of a 3x3 matrix.", answer: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == 0 || i == 2 || j == 0 || j == 2) {\n            System.out.print(matrix[i][j] + \" \");\n        }\n    }\n}" },
          { id: "pt-14", question: "Write a program to find the sum of diagonal elements.", answer: "int sum = 0;\nfor (int i = 0; i < 3; i++) {\n    sum = sum + matrix[i][i];\n}" },
          { id: "pt-15", question: "Write a program to check if a matrix is symmetric.", answer: "for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (matrix[i][j] != matrix[j][i]) {\n            not symmetric;\n        }\n    }\n}" },
        ],
      },
      {
        name: "Section D: HOTS (Higher Order Thinking Skills)",
        marks: 10,
        questions: [
          { id: "pt-16", question: "What is the output?\nint[][] arr = {{1, 2}, {3, 4}};\narr[1] = arr[0];\nSystem.out.println(arr[1][0]);", answer: "1", explanation: "arr[1] = arr[0] makes row 1 reference row 0. arr[1][0] = arr[0][0] = 1." },
          { id: "pt-17", question: "Trace the output:\nint[][] arr = {{1, 2, 3}, {4, 5, 6}};\nfor (int i = 0; i < arr.length; i++) {\n    for (int j = 0; j < arr[i].length; j++) {\n        System.out.print(arr[j][i] + \" \");\n    }\n    System.out.println();\n}", answer: "1 4 \n2 5 \n3 6 " },
        ],
      },
    ],
  },

  // ========== 18. REVISION NOTES ==========
  revisionNotes: [
    "A 2D array is an array of arrays — each row is itself an array.",
    "matrix.length gives the number of rows.",
    "matrix[i].length gives the number of columns in row i.",
    "Indices start at 0 for both rows and columns.",
    "First index is row, second index is column: matrix[row][col].",
    "Java allows jagged arrays where rows can have different lengths.",
    "Nested loops are used to traverse 2D arrays.",
    "Outer loop for rows, inner loop for columns (row-wise traversal).",
    "Matrix addition requires same dimensions for both matrices.",
    "Transpose swaps rows and columns: transpose[i][j] = matrix[j][i].",
    "Main diagonal: elements where i == j.",
    "Secondary diagonal: elements where i + j = n - 1.",
    "Symmetric matrix: matrix[i][j] = matrix[j][i].",
    "Identity matrix: 1s on main diagonal, 0s elsewhere.",
    "Boundary elements are in first row, last row, first column, or last column.",
  ],

  // ========== 19. CHEATSHEET ==========
  cheatsheet: {
    title: "TWO DIMENSIONAL ARRAYS - Quick Reference",
    syntax: "int[][] matrix = new int[rows][cols];  or  int[][] matrix = {{1, 2}, {3, 4}};",
    keyPoints: [
      "First index is row, second index is column",
      "matrix.length = number of rows",
      "matrix[i].length = number of columns in row i",
      "Indices start at 0 for both dimensions",
      "Java allows jagged arrays",
      "Default value: 0 for int",
      "Nested loops for traversal",
      "Passed by reference",
    ],
    commonOperations: [
      { operation: "Traverse row-wise", code: "for i: for j: System.out.print(matrix[i][j]);" },
      { operation: "Traverse column-wise", code: "for j: for i: System.out.print(matrix[i][j]);" },
      { operation: "Sum of all elements", code: "for i: for j: sum += matrix[i][j];" },
      { operation: "Sum of row i", code: "for j: rowSum += matrix[i][j];" },
      { operation: "Sum of column j", code: "for i: colSum += matrix[i][j];" },
      { operation: "Main diagonal", code: "for i: System.out.print(matrix[i][i]);" },
      { operation: "Transpose", code: "transpose[j][i] = matrix[i][j];" },
      { operation: "Matrix addition", code: "sum[i][j] = A[i][j] + B[i][j];" },
    ],
    diagonals: [
      { name: "Main diagonal", condition: "i == j", example: "matrix[0][0], matrix[1][1], matrix[2][2]" },
      { name: "Secondary diagonal", condition: "i + j = n - 1", example: "matrix[0][2], matrix[1][1], matrix[2][0]" },
    ],
    specialMatrices: [
      { name: "Symmetric", condition: "matrix[i][j] = matrix[j][i]" },
      { name: "Identity", condition: "1s on diagonal, 0s elsewhere" },
      { name: "Diagonal", condition: "Non-zero only on main diagonal" },
      { name: "Triangular", condition: "All elements above/below diagonal are 0" },
    ],
  },

  // ========== 20. INTERVIEW QUESTIONS ==========
  interviewQuestions: [
    {
      id: "matrix-iq-1",
      question: "What is a 2D array?",
      answer: "A 2D array is an array of arrays, representing a table with rows and columns. Each element is accessed using two indices: row index and column index.",
    },
    {
      id: "matrix-iq-2",
      question: "How do you declare a 2D array?",
      answer: "int[][] matrix; or int matrix[][]; Then create: matrix = new int[rows][cols];",
    },
    {
      id: "matrix-iq-3",
      question: "What is the difference between matrix.length and matrix[0].length?",
      answer: "matrix.length returns the number of rows. matrix[0].length returns the number of columns in the first row.",
    },
    {
      id: "matrix-iq-4",
      question: "What is a jagged array?",
      answer: "A jagged array is a 2D array where each row can have a different number of columns. Java allows this because each row is an independent array.",
    },
    {
      id: "matrix-iq-5",
      question: "How do you traverse a 2D array?",
      answer: "Use nested loops: outer loop for rows (i from 0 to matrix.length-1), inner loop for columns (j from 0 to matrix[i].length-1).",
    },
    {
      id: "matrix-iq-6",
      question: "What is matrix addition?",
      answer: "Matrix addition adds corresponding elements of two matrices. Both must have same dimensions. Result[i][j] = matrix1[i][j] + matrix2[i][j].",
    },
    {
      id: "matrix-iq-7",
      question: "What is the transpose of a matrix?",
      answer: "Transpose swaps rows and columns. transpose[i][j] = matrix[j][i]. An m×n matrix becomes n×m.",
    },
    {
      id: "matrix-iq-8",
      question: "What is a symmetric matrix?",
      answer: "A symmetric matrix equals its own transpose. matrix[i][j] = matrix[j][i] for all i, j. It must be a square matrix.",
    },
    {
      id: "matrix-iq-9",
      question: "What is an identity matrix?",
      answer: "An identity matrix is a square matrix with 1s on the main diagonal and 0s elsewhere. It acts like the number 1 in matrix multiplication.",
    },
    {
      id: "matrix-iq-10",
      question: "What is the time complexity of matrix multiplication?",
      answer: "O(n³) for two n×n matrices. For m×n and n×p matrices, it's O(m × n × p).",
    },
    {
      id: "matrix-iq-11",
      question: "What is a magic square?",
      answer: "A magic square is a square matrix where the sum of each row, each column, and both diagonals are equal to the same value.",
    },
    {
      id: "matrix-iq-12",
      question: "What is a saddle point?",
      answer: "A saddle point is an element that is the minimum in its row and the maximum in its column.",
    },
    {
      id: "matrix-iq-13",
      question: "How do you print a matrix in spiral order?",
      answer: "Use four boundaries (top, bottom, left, right). Print top row, right column, bottom row, left column, then shrink boundaries and repeat.",
    },
    {
      id: "matrix-iq-14",
      question: "What are boundary elements?",
      answer: "Boundary elements are those in the first row, last row, first column, or last column. They form a frame around the matrix.",
    },
    {
      id: "matrix-iq-15",
      question: "Can you multiply any two matrices?",
      answer: "No. The number of columns in the first matrix must equal the number of rows in the second matrix. If A is m×n and B is n×p, the result is m×p.",
    },
  ],

  // ========== 21. EXAM TRICKS ==========
  examTricks: [
    "Always remember: matrix[row][col] — row comes first, then column.",
    "matrix.length gives number of rows, matrix[0].length gives number of columns.",
    "For rectangular matrices, all rows have same length.",
    "Java allows jagged arrays — each row can have different number of columns.",
    "Use nested for loops to traverse 2D arrays.",
    "Outer loop for rows (0 to matrix.length-1), inner loop for columns (0 to matrix[i].length-1).",
    "For matrix addition, both matrices must have same dimensions.",
    "To transpose, swap rows and columns: transpose[j][i] = matrix[i][j].",
    "Main diagonal: elements where i == j.",
    "Secondary diagonal: elements where i + j = n - 1.",
    "Always check bounds before accessing matrix elements.",
    "For spiral matrix, use four boundaries: top, bottom, left, right.",
    "Boundary elements are in first row, last row, first column, or last column.",
    "Matrix multiplication: (m×n) × (n×p) = m×p.",
    "Practice matrix operations thoroughly — they're frequently asked in ICSE/ISC exams.",
  ],

  // ========== 22. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "twodimensionalarrays-ar-1",
      assertion: "Assertion (A): A two-dimensional array can execute zero or more times.",
      reason: "Reason (R): The condition is checked before entering the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The condition is checked before each iteration. If false initially, it executes 0 times."
    },
    {
      id: "twodimensionalarrays-ar-2",
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
      id: "twodimensionalarrays-ar-3",
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
      id: "twodimensionalarrays-ar-4",
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
      id: "twodimensionalarrays-ar-5",
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
      id: "twodimensionalarrays-ar-6",
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
      id: "twodimensionalarrays-ar-7",
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
      id: "twodimensionalarrays-ar-8",
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
      id: "twodimensionalarrays-ar-9",
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
      id: "twodimensionalarrays-ar-10",
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

  // ========== 23. DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "twodimensionalarrays-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "twodimensionalarrays-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "twodimensionalarrays-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "twodimensionalarrays-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "twodimensionalarrays-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "twodimensionalarrays-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "twodimensionalarrays-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "twodimensionalarrays-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "twodimensionalarrays-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "twodimensionalarrays-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 24. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "twodimensionalarrays-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "twodimensionalarrays-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "twodimensionalarrays-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "twodimensionalarrays-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "twodimensionalarrays-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "twodimensionalarrays-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "twodimensionalarrays-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "twodimensionalarrays-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "twodimensionalarrays-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "twodimensionalarrays-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "twodimensionalarrays-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "twodimensionalarrays-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 25. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "twodimensionalarrays-mps-1",
      title: "Practice Set 1: Two-dimensional array Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "twodimensionalarrays-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "twodimensionalarrays-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "twodimensionalarrays-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "twodimensionalarrays-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "twodimensionalarrays-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "twodimensionalarrays-mps-2",
      title: "Practice Set 2: Two-dimensional array Applications",
      questions: [
        {
          type: "mcq",
          id: "twodimensionalarrays-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "twodimensionalarrays-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "twodimensionalarrays-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "twodimensionalarrays-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "twodimensionalarrays-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 26. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "twodimensionalarrays-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "twodimensionalarrays-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "twodimensionalarrays-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "twodimensionalarrays-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "twodimensionalarrays-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "twodimensionalarrays-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "twodimensionalarrays-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "twodimensionalarrays-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "twodimensionalarrays-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "twodimensionalarrays-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "twodimensionalarrays-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "twodimensionalarrays-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "twodimensionalarrays-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "twodimensionalarrays-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "twodimensionalarrays-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "twodimensionalarrays-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "twodimensionalarrays-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "twodimensionalarrays-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "twodimensionalarrays-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "twodimensionalarrays-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter09;