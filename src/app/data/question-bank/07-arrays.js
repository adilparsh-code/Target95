const chapter7 = {
  id: 7,
  title: "Arrays",
  slug: "arrays",
  description: "Explore single-dimensional and multi-dimensional arrays, array operations, and sorting.",
  topics: ["1D Arrays", "2D Arrays", "Array Operations", "Array Traversal", "Array Initialization"],

  mcqs: [
    {
      id: "CH07-MCQ-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Basics",
      question: "What is the index of the first element in a Java array?",
      options: [
        "A) 1",
        "B) 0",
        "C) -1",
        "D) It depends on the array size"
      ],
      correctAnswer: "B",
      explanation: "Array indices in Java always start from 0. The first element is at index 0, the second at index 1, and so on.",
      hint: "Java uses zero-based indexing.",
      estimatedTime: 10,
      marks: 1,
      tags: ["array index", "zero-based"]
    },
    {
      id: "CH07-MCQ-002",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Declaration",
      question: "Which of the following correctly declares and initializes an array?",
      options: [
        "A) int arr = new int[5];",
        "B) int[] arr = new int[5];",
        "C) int arr[] = int[5];",
        "D) arr = new int[5];"
      ],
      correctAnswer: "B",
      explanation: "The correct syntax is int[] arr = new int[5]; or int arr[] = new int[5]; Both declare an array and allocate memory for 5 integers.",
      hint: "Square brackets are needed to indicate an array type.",
      estimatedTime: 15,
      marks: 1,
      tags: ["declaration", "initialization", "syntax"]
    },
    {
      id: "CH07-MCQ-003",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Length",
      question: "How do you find the number of elements in an array named 'arr'?",
      options: [
        "A) arr.length()",
        "B) arr.length",
        "C) arr.size()",
        "D) sizeof(arr)"
      ],
      correctAnswer: "B",
      explanation: "In Java, length is a property (not a method) of arrays. Use arr.length to get the number of elements. Note: No parentheses — it's a field, not a method.",
      hint: "Is length a method or a property on arrays?",
      estimatedTime: 15,
      marks: 1,
      tags: ["length", "array property"]
    },
    {
      id: "CH07-MCQ-004",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Traversal",
      question: "What will be the output?\n\nint[] arr = {10, 20, 30, 40};\nSystem.out.println(arr[2]);",
      options: [
        "A) 10",
        "B) 20",
        "C) 30",
        "D) 40"
      ],
      correctAnswer: "C",
      explanation: "Array indices: arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40. So arr[2] is 30.",
      hint: "Remember that indexing starts from 0.",
      estimatedTime: 10,
      marks: 1,
      tags: ["array access", "index"]
    },
    {
      id: "CH07-MCQ-005",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Initialization",
      question: "What will be the default value of elements in a boolean array of size 5?",
      options: [
        "A) true",
        "B) false",
        "C) null",
        "D) 0"
      ],
      correctAnswer: "B",
      explanation: "In Java, array elements are automatically initialized to default values: boolean → false, int → 0, double → 0.0, reference types → null.",
      hint: "What is the default value of a boolean variable?",
      estimatedTime: 15,
      marks: 1,
      tags: ["default values", "boolean array"]
    },
    {
      id: "CH07-MCQ-006",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "ArrayIndexOutOfBounds",
      question: "What happens when you try to access arr[5] if arr has 5 elements (indices 0 to 4)?",
      options: [
        "A) Returns null",
        "B) Returns 0",
        "C) Throws ArrayIndexOutOfBoundsException",
        "D) Compilation error"
      ],
      correctAnswer: "C",
      explanation: "Java performs bounds checking at runtime. Accessing an invalid index throws ArrayIndexOutOfBoundsException.",
      hint: "What error occurs when accessing an index outside the array bounds?",
      estimatedTime: 15,
      marks: 1,
      tags: ["exception", "bounds checking", "runtime error"]
    },
    {
      id: "CH07-MCQ-007",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Arrays",
      question: "How many elements does int[][] matrix = new int[3][4] contain?",
      options: [
        "A) 7",
        "B) 12",
        "C) 3",
        "D) 4"
      ],
      correctAnswer: "B",
      explanation: "This creates a 3×4 2D array. Total elements = 3 rows × 4 columns = 12 elements.",
      hint: "Multiply the number of rows by the number of columns.",
      estimatedTime: 15,
      marks: 1,
      tags: ["2D array", "dimensions"]
    },
    {
      id: "CH07-MCQ-008",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Traversal",
      question: "What will be the output?\n\nint[] arr = {1, 2, 3};\nfor (int i = 0; i < arr.length; i++) {\n    System.out.print(arr[i] + \" \");\n}",
      options: [
        "A) 1 2 3",
        "B) 0 1 2",
        "C) 3 2 1",
        "D) 1 1 1"
      ],
      correctAnswer: "A",
      explanation: "The loop iterates through all elements: arr[0]=1, arr[1]=2, arr[2]=3.",
      hint: "Trace the loop: i = 0, 1, 2.",
      estimatedTime: 15,
      marks: 1,
      tags: ["array traversal", "for loop"]
    }
  ],

  assertionReasons: [
    {
      id: "CH07-AR-001",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Bounds",
      question: "Assertion (A): In Java, array indices start from 0.\nReason (R): The last index of an array is always length - 1.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "B",
      explanation: "Both statements are true. If indices start from 0, then the last valid index is indeed length-1. However, R describes a consequence of zero-based indexing, not the reason for it.",
      hint: "If first index is 0, what is the last index for an array of length n?",
      estimatedTime: 20,
      marks: 2,
      tags: ["array index", "zero-based", "length"]
    },
    {
      id: "CH07-AR-002",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Size",
      question: "Assertion (A): The size of an array in Java cannot be changed once it is created.\nReason (R): Arrays in Java are fixed-length data structures.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Once an array is created with 'new int[n]', its size is fixed. It cannot be expanded or shrunk. If a dynamic size is needed, use ArrayList.",
      hint: "Can you add elements beyond the declared size of an array?",
      estimatedTime: 15,
      marks: 2,
      tags: ["array size", "fixed", "immutable"]
    },
    {
      id: "CH07-AR-003",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Jagged Arrays",
      question: "Assertion (A): In Java, a 2D array can have rows of different lengths.\nReason (R): Java implements 2D arrays as arrays of arrays.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Since a 2D array is an array of 1D arrays, each row can be a different length. These are called 'jagged arrays' or 'ragged arrays'. Example: int[][] arr = new int[3][]; arr[0] = new int[2]; arr[1] = new int[4];",
      hint: "Is each row of a 2D array a separate array object?",
      estimatedTime: 25,
      marks: 2,
      tags: ["jagged array", "2D array", "ragged"]
    },
    {
      id: "CH07-AR-004",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Declaration",
      question: "Assertion (A): int[] a and int a[] both declare an integer array.\nReason (R): Both syntaxes are valid for array declaration in Java.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Both int[] a (C-style) and int a[] (C++ style) are valid array declarations in Java. They are equivalent.",
      hint: "Do both placements of square brackets work?",
      estimatedTime: 10,
      marks: 2,
      tags: ["declaration", "syntax", "brackets"]
    }
  ],

  trueFalse: [
    {
      id: "CH07-TF-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Basics",
      question: "Arrays in Java can store elements of different data types.",
      correctAnswer: "False",
      explanation: "Arrays in Java are homogeneous — all elements must be of the same data type (or a subtype, in case of reference types).",
      hint: "Can you store a String and an int in the same array?",
      estimatedTime: 10,
      marks: 1,
      tags: ["homogeneous", "data type"]
    },
    {
      id: "CH07-TF-002",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Length",
      question: "The length property of a String array gives the length of each String element.",
      correctAnswer: "False",
      explanation: "arr.length gives the number of elements in the array, not the length of individual strings. For string length, use str.length().",
      hint: "Does length give array size or string size?",
      estimatedTime: 15,
      marks: 1,
      tags: ["length", "confusion", "array vs string"]
    },
    {
      id: "CH07-TF-003",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Initialization",
      question: "The statement int[] arr = new int[5]{1,2,3,4,5}; is valid in Java.",
      correctAnswer: "False",
      explanation: "You cannot specify both the size and the initial values. Use either: int[] arr = new int[5]; or int[] arr = {1,2,3,4,5};",
      hint: "Can you combine size specification with an initializer list?",
      estimatedTime: 15,
      marks: 1,
      tags: ["initialization", "syntax error"]
    },
    {
      id: "CH07-TF-004",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Enhanced For Loop",
      question: "The enhanced for loop (for-each) can be used to modify array elements.",
      correctAnswer: "False",
      explanation: "The for-each loop provides a read-only copy of each element. Modifying the loop variable does NOT affect the original array. Use a regular for loop to modify elements.",
      hint: "Does the for-each variable give you the actual element or a copy?",
      estimatedTime: 20,
      marks: 1,
      tags: ["for-each", "read-only", "modification"]
    },
    {
      id: "CH07-TF-005",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Arrays",
      question: "In a 2D array int[][] a = new int[3][4], a.length gives the value 4.",
      correctAnswer: "False",
      explanation: "a.length gives the number of rows (3). a[0].length gives the number of columns (4). In a 2D array, length of the top-level array is the row count.",
      hint: "What does arr.length give for a 2D array — rows or columns?",
      estimatedTime: 20,
      marks: 1,
      tags: ["2D array", "length", "rows"]
    }
  ],

  fillBlanks: [
    {
      id: "CH07-FIB-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Basics",
      question: "A collection of elements of the same data type stored in contiguous memory locations is called an ________.",
      correctAnswer: "array",
      explanation: "An array is a data structure that stores a fixed-size sequential collection of elements of the same type.",
      hint: "It's a fundamental data structure for storing multiple values.",
      estimatedTime: 10,
      marks: 1,
      tags: ["array", "definition"]
    },
    {
      id: "CH07-FIB-002",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Declaration",
      question: "The ________ keyword is used to allocate memory for an array in Java.",
      correctAnswer: "new",
      explanation: "The 'new' keyword allocates memory for the array. Example: int[] arr = new int[10];",
      hint: "It's the same keyword used for creating objects.",
      estimatedTime: 10,
      marks: 1,
      tags: ["new", "memory allocation"]
    },
    {
      id: "CH07-FIB-003",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Traversal",
      question: "The ________ loop (also called for-each) is used to iterate through array elements without using an index variable.",
      correctAnswer: "enhanced for",
      explanation: "The enhanced for loop syntax: for (int element : arr) { ... }. It simplifies array traversal but cannot modify elements.",
      hint: "It's a simpler version of the for loop for arrays.",
      estimatedTime: 15,
      marks: 1,
      tags: ["enhanced for", "for-each"]
    },
    {
      id: "CH07-FIB-004",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Arrays",
      question: "An array with two dimensions (rows and columns) is called a ________ array.",
      correctAnswer: "two-dimensional (or 2D)",
      explanation: "A 2D array is an array of arrays. It is often used to represent matrices, grids, or tables.",
      hint: "It has rows and columns.",
      estimatedTime: 10,
      marks: 1,
      tags: ["2D", "matrix"]
    },
    {
      id: "CH07-FIB-005",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Operations",
      question: "The ________ exception is thrown when you try to access an array index that is out of bounds.",
      correctAnswer: "ArrayIndexOutOfBoundsException",
      explanation: "This runtime exception occurs when using an invalid index (negative or >= array length).",
      hint: "It's an exception related to invalid array access.",
      estimatedTime: 15,
      marks: 1,
      tags: ["exception", "out of bounds"]
    }
  ],

  outputQuestions: [
    {
      id: "CH07-OUT-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Access",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr = {5, 10, 15, 20};\n        System.out.println(arr[1] + arr[3]);\n    }\n}",
      correctAnswer: "30",
      explanation: "arr[1] = 10, arr[3] = 20. 10 + 20 = 30.",
      hint: "Add the values at index 1 and index 3.",
      estimatedTime: 15,
      marks: 1,
      tags: ["array access", "addition"]
    },
    {
      id: "CH07-OUT-002",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Sum",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] nums = {2, 4, 6, 8};\n        int sum = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n        }\n        System.out.println(sum);\n    }\n}",
      correctAnswer: "20",
      explanation: "Sum = 2 + 4 + 6 + 8 = 20. The loop iterates through all elements and accumulates the sum.",
      hint: "Add all elements: 2+4+6+8.",
      estimatedTime: 20,
      marks: 2,
      tags: ["array sum", "traversal"]
    },
    {
      id: "CH07-OUT-003",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Reverse",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        for (int i = arr.length - 1; i >= 0; i--) {\n            System.out.print(arr[i] + \" \");\n        }\n    }\n}",
      correctAnswer: "5 4 3 2 1",
      explanation: "The loop starts from the last index (4) and goes backward to 0, printing elements in reverse order.",
      hint: "The loop goes from arr.length-1 down to 0.",
      estimatedTime: 20,
      marks: 2,
      tags: ["reverse", "backward traversal"]
    },
    {
      id: "CH07-OUT-004",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Array",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int[][] mat = {{1,2},{3,4},{5,6}};\n        System.out.println(mat[1][0] + mat[2][1]);\n    }\n}",
      correctAnswer: "9",
      explanation: "mat[1][0] = 3 (row 1, col 0), mat[2][1] = 6 (row 2, col 1). 3 + 6 = 9.",
      hint: "Remember: row index first, then column index.",
      estimatedTime: 25,
      marks: 2,
      tags: ["2D array", "access"]
    },
    {
      id: "CH07-OUT-005",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Search",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50};\n        int key = 30;\n        int pos = -1;\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == key) {\n                pos = i;\n                break;\n            }\n        }\n        System.out.println(pos);\n    }\n}",
      correctAnswer: "2",
      explanation: "The loop searches for 30. Found at index 2 (arr[2]=30). pos becomes 2, and break exits the loop.",
      hint: "Search for 30 and note its index (starting from 0).",
      estimatedTime: 25,
      marks: 2,
      tags: ["search", "linear search", "break"]
    }
  ],

  errorFinding: [
    {
      id: "CH07-ERR-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Declaration",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr;\n        arr = {1, 2, 3, 4, 5};\n        System.out.println(arr[2]);\n    }\n}",
      correctAnswer: "The shorthand initializer {1, 2, 3, 4, 5} can only be used at declaration. Use 'arr = new int[]{1, 2, 3, 4, 5};'",
      explanation: "The { } initializer syntax is only valid in the declaration line: int[] arr = {1, 2, 3, 4, 5}; If declaration and initialization are separate, use 'new int[]{...}'.",
      hint: "When can you use the { } syntax for arrays?",
      estimatedTime: 20,
      marks: 2,
      tags: ["array initialization", "syntax"]
    },
    {
      id: "CH07-ERR-002",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Index",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr = new int[5];\n        arr[5] = 100;\n        System.out.println(arr[5]);\n    }\n}",
      correctAnswer: "Array index out of bounds. Valid indices are 0 to 4. arr[5] is invalid.",
      explanation: "An array of size 5 has indices 0, 1, 2, 3, 4. Accessing index 5 throws ArrayIndexOutOfBoundsException at runtime.",
      hint: "What are the valid indices for an array of size 5?",
      estimatedTime: 15,
      marks: 1,
      tags: ["index out of bounds", "runtime error"]
    },
    {
      id: "CH07-ERR-003",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Length",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30};\n        for (int i = 0; i <= arr.length; i++) {\n            System.out.println(arr[i]);\n        }\n    }\n}",
      correctAnswer: "The condition should be i < arr.length, not i <= arr.length. i <= 3 causes accessing arr[3] which is out of bounds.",
      explanation: "arr.length is 3. When i = 3, i <= 3 is true, but arr[3] is invalid. Use i < arr.length to stop at the last valid index (2).",
      hint: "What is the last valid index? Should the loop go up to length or length-1?",
      estimatedTime: 20,
      marks: 2,
      tags: ["off-by-one", "loop condition"]
    },
    {
      id: "CH07-ERR-004",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Array",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int[][] arr = new int[3][];\n        System.out.println(arr[0][0]);\n    }\n}",
      correctAnswer: "The rows of the 2D array are not initialized. arr[0] is null, so accessing arr[0][0] throws NullPointerException.",
      explanation: "new int[3][] creates a 2D array with 3 null rows. Each row must be initialized separately before accessing elements: arr[0] = new int[4]; etc.",
      hint: "Are the individual rows of a jagged array initialized automatically?",
      estimatedTime: 20,
      marks: 2,
      tags: ["jagged array", "null pointer", "initialization"]
    },
    {
      id: "CH07-ERR-005",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "For-each",
      question: "Find the logical error in the following Java code (intended to double each element):\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4};\n        for (int x : arr) {\n            x *= 2;\n        }\n        System.out.println(arr[0]);\n    }\n}",
      correctAnswer: "The for-each loop gives a copy of each element. Modifying x does not change the original array. Output will be 1, not 2.",
      explanation: "The enhanced for loop assigns each element to x (a copy). Changing x does not affect the array. To modify elements, use a regular for loop with index: for (int i = 0; i < arr.length; i++) { arr[i] *= 2; }",
      hint: "Does the for-each variable give you the actual array element or a copy?",
      estimatedTime: 25,
      marks: 3,
      tags: ["for-each", "modification", "logical error"]
    }
  ],

  programmingQuestions: [
    {
      id: "CH07-PRQ-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Operations",
      problemStatement: "Write a Java program to find the largest element in an array. Use the array {45, 78, 23, 89, 12, 67}.",
      input: "No input required (hardcoded array).",
      output: "The largest element is: 89",
      constraints: "Use a loop to traverse the array.",
      logic: "Assume first element is max. Traverse the array, updating max whenever a larger element is found.",
      solution: `public class LargestElement {\n    public static void main(String[] args) {\n        int[] arr = {45, 78, 23, 89, 12, 67};\n        int max = arr[0];\n        \n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] > max) {\n                max = arr[i];\n            }\n        }\n        \n        System.out.println("The largest element is: " + max);\n    }\n}`,
      solutionExplanation: "1. Assume arr[0] is the largest (max).\n2. Loop from i=1 to arr.length-1.\n3. If arr[i] > max, update max.\n4. After loop, max holds the largest value.\n5. Print the result.",
      sampleTestCases: [
        { input: "{45, 78, 23, 89, 12, 67}", output: "The largest element is: 89" }
      ],
      estimatedTime: 240,
      marks: 4,
      tags: ["array", "maximum", "traversal"]
    },
    {
      id: "CH07-PRQ-002",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Operations",
      problemStatement: "Write a Java program to reverse an array in-place. Use the array {10, 20, 30, 40, 50}.",
      input: "No input required (hardcoded array).",
      output: "Original: 10 20 30 40 50\nReversed: 50 40 30 20 10",
      constraints: "Reverse the array in-place. Do NOT use a second array.",
      logic: "Swap the first element with the last, second with second-last, and so on. Use two pointers: i (start) and j (end).",
      solution: `public class ReverseArray {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50};\n        \n        System.out.print("Original: ");\n        for (int x : arr) System.out.print(x + " ");\n        System.out.println();\n        \n        int i = 0, j = arr.length - 1;\n        while (i < j) {\n            int temp = arr[i];\n            arr[i] = arr[j];\n            arr[j] = temp;\n            i++;\n            j--;\n        }\n        \n        System.out.print("Reversed: ");\n        for (int x : arr) System.out.print(x + " ");\n    }\n}`,
      solutionExplanation: "1. Print the original array.\n2. Use two pointers: i at start (0), j at end (length-1).\n3. Swap arr[i] and arr[j].\n4. Move i forward, j backward.\n5. Repeat until i >= j.\n6. Print the reversed array.",
      sampleTestCases: [
        { input: "10 20 30 40 50", output: "Original: 10 20 30 40 50\nReversed: 50 40 30 20 10" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["reverse", "in-place", "two pointers"]
    },
    {
      id: "CH07-PRQ-003",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Array",
      problemStatement: "Write a Java program to find the sum of all elements in a 2D array (matrix). Use the matrix:\n{{1, 2, 3},\n {4, 5, 6},\n {7, 8, 9}}",
      input: "No input required (hardcoded matrix).",
      output: "Sum of all elements: 45",
      constraints: "Use nested loops to traverse the 2D array.",
      logic: "Use nested for loops. Outer loop for rows, inner loop for columns. Add each element to sum.",
      solution: `public class MatrixSum {\n    public static void main(String[] args) {\n        int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};\n        int sum = 0;\n        \n        for (int i = 0; i < matrix.length; i++) {\n            for (int j = 0; j < matrix[i].length; j++) {\n                sum += matrix[i][j];\n            }\n        }\n        \n        System.out.println("Sum of all elements: " + sum);\n    }\n}`,
      solutionExplanation: "1. Declare and initialize the 2D array.\n2. Outer loop iterates over rows (i = 0 to rows-1).\n3. Inner loop iterates over columns (j = 0 to columns-1).\n4. Add matrix[i][j] to sum.\n5. Print the total sum (1+2+3+4+5+6+7+8+9 = 45).",
      sampleTestCases: [
        { input: "3x3 matrix 1-9", output: "Sum of all elements: 45" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["2D array", "matrix", "sum", "nested loops"]
    }
  ],

  debuggingQuestions: [
    {
      id: "CH07-DBG-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Initialization",
      question: "The following code intends to create an array of 5 integers. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int[5] arr = new int[5];\n        System.out.println(arr.length);\n    }\n}",
      correctAnswer: "The size should not be specified in the declaration. Change to: int[] arr = new int[5];",
      explanation: "In Java, the size is only specified during memory allocation (new int[5]), not in the declaration (int[] arr).",
      hint: "Where does the size go in array declaration?",
      estimatedTime: 10,
      marks: 1,
      tags: ["debugging", "declaration", "syntax"]
    },
    {
      id: "CH07-DBG-002",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Copy",
      question: "The following code intends to copy all elements from arr1 to arr2. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int[] arr1 = {1, 2, 3};\n        int[] arr2 = arr1;\n        arr2[0] = 100;\n        System.out.println(arr1[0]);\n    }\n}",
      correctAnswer: "arr2 = arr1 does not copy the array — it copies the reference. Both variables point to the same array. arr2[0] changes arr1[0] as well. Use a loop or System.arraycopy() to copy elements.",
      explanation: "In Java, array variables are references. Assignment copies the reference, not the elements. To copy, create a new array and copy each element: int[] arr2 = new int[arr1.length]; for (...) { arr2[i] = arr1[i]; }",
      hint: "Does '=' copy the array elements or just the reference?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "reference", "copy"]
    },
    {
      id: "CH07-DBG-003",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Array Traversal",
      question: "The following code intends to print a 2D array in matrix form. Identify and fix the error:\n\npublic class Test {\n    public static void main(String[] args) {\n        int[][] mat = {{1,2},{3,4},{5,6}};\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat.length; j++) {\n                System.out.print(mat[i][j] + \" \");\n            }\n            System.out.println();\n        }\n    }\n}",
      correctAnswer: "The inner loop uses mat.length (3) instead of mat[i].length (2). This causes ArrayIndexOutOfBoundsException when j=2.",
      explanation: "mat.length is 3 (rows). For the inner loop, use mat[i].length (columns = 2). With mat.length in the inner loop, j goes 0,1,2 but there are only 2 columns.",
      hint: "What is mat.length vs mat[i].length in a 2D array?",
      estimatedTime: 25,
      marks: 3,
      tags: ["debugging", "2D array", "length"]
    }
  ],

  caseBasedQuestions: [
    {
      id: "CH07-CBQ-001",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Statistics",
      question: "A teacher has stored the marks of 10 students in an array: {78, 85, 92, 60, 75, 88, 95, 70, 82, 90}.\n\na) Write code to find the highest and lowest marks.\nb) Write code to calculate the average marks.\nc) How many students scored above the average?\nd) Write code to count students who scored >= 80 (distinction).",
      correctAnswer: "a) int max=arr[0], min=arr[0]; for(...) { if(arr[i]>max) max=arr[i]; if(arr[i]<min) min=arr[i]; }\nb) int sum=0; for(...) sum+=arr[i]; double avg = sum/10.0;\nc) Count students where arr[i] > avg.\nd) int count=0; for(...) if(arr[i]>=80) count++;",
      explanation: "The program computes statistics by traversing the array. Finding max/min requires one pass. Sum requires another pass. Counting based on conditions requires additional passes.",
      hint: "Initialize max/min with the first element, then compare with others.",
      estimatedTime: 75,
      marks: 5,
      tags: ["array", "statistics", "traversal"]
    },
    {
      id: "CH07-CBQ-002",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Array",
      question: "A school has 3 classes, each with a different number of students:\nClass A: 4 students (marks: 85, 90, 78, 92)\nClass B: 3 students (marks: 75, 88, 80)\nClass C: 5 students (marks: 95, 70, 82, 88, 76)\n\na) Create a jagged 2D array to store this data.\nb) Write code to find the average of each class.\nc) Write code to find the overall average across all classes.\nd) Which class has the highest average?",
      correctAnswer: "a) int[][] marks = {{85,90,78,92},{75,88,80},{95,70,82,88,76}};\nb) For each class: sum row elements / row length.\nc) Sum all elements / total students (4+3+5=12).\nd) Class A: 345/4=86.25, Class B: 243/3=81.0, Class C: 411/5=82.2. Class A has the highest average.",
      explanation: "A jagged array allows each row to have a different length. Use nested loops: outer for classes, inner for students in that class.",
      hint: "Each row in the 2D array represents a class with different number of students.",
      estimatedTime: 75,
      marks: 5,
      tags: ["jagged array", "average", "2D array"]
    }
  ],

  vivaQuestions: [
    {
      id: "CH07-VIV-001",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Basics",
      question: "What is an array? What are its characteristics?",
      sampleAnswer: "An array is a data structure that stores a fixed-size sequential collection of elements of the same type. Characteristics: 1) Zero-based indexing, 2) Fixed size (cannot be changed after creation), 3) Homogeneous (same data type), 4) Contiguous memory allocation, 5) length property gives the number of elements.",
      estimatedTime: 20,
      marks: 2,
      tags: ["array", "characteristics"]
    },
    {
      id: "CH07-VIV-002",
      difficulty: "easy",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Declaration",
      question: "What are the different ways to create an array in Java?",
      sampleAnswer: "1) Declaration + allocation: int[] arr = new int[5];\n2) Declaration + initialization: int[] arr = {1, 2, 3, 4, 5};\n3) Declaration then separate allocation + initialization: int[] arr; arr = new int[]{1, 2, 3, 4, 5};",
      estimatedTime: 15,
      marks: 2,
      tags: ["creation", "initialization"]
    },
    {
      id: "CH07-VIV-003",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Traversal",
      question: "What is the difference between a regular for loop and an enhanced for loop (for-each) when used with arrays?",
      sampleAnswer: "Regular for loop: Uses an index variable, can access and modify elements, has full control over iteration order. Enhanced for loop: Simpler syntax, read-only access (cannot modify elements), no index variable. Use regular for when you need to modify elements or need the index. Use for-each when you just need to read elements sequentially.",
      estimatedTime: 20,
      marks: 2,
      tags: ["for loop", "for-each", "difference"]
    },
    {
      id: "CH07-VIV-004",
      difficulty: "medium",
      chapter: "Arrays",
      chapterId: 7,
      topic: "2D Arrays",
      question: "How do you declare, initialize, and traverse a 2D array in Java?",
      sampleAnswer: "Declaration: int[][] matrix = new int[3][4]; or int[][] matrix = {{1,2},{3,4}};\nTraversal: for (int i=0; i<matrix.length; i++) { for (int j=0; j<matrix[i].length; j++) { ... } }\nmatrix.length gives rows, matrix[i].length gives columns in row i.",
      estimatedTime: 20,
      marks: 2,
      tags: ["2D array", "traversal"]
    },
    {
      id: "CH07-VIV-005",
      difficulty: "hard",
      chapter: "Arrays",
      chapterId: 7,
      topic: "Array Limitations",
      question: "What are the limitations of arrays in Java? How do you overcome them?",
      sampleAnswer: "Limitations: 1) Fixed size — cannot grow or shrink. 2) Homogeneous — can only store one data type. 3) No built-in methods for common operations (search, sort, insert, delete). Overcome by: 1) Using ArrayList for dynamic sizing. 2) Using Object[] to store different types (but this is rarely recommended). 3) Using java.util.Arrays class for utility methods like sort(), binarySearch(), equals(), etc.",
      estimatedTime: 25,
      marks: 3,
      tags: ["limitations", "ArrayList", "Arrays class"]
    }
  ]
};

export default chapter7;