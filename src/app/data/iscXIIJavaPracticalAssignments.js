/**
 * ISC Class XII Java practical assignments for the CISCE 2028 syllabus.
 * Distribution: 5 Methods, 3 single-dimensional arrays, 5 double-dimensional arrays,
 * 4 String handling and 3 Inheritance. Interfaces remain conceptual only.
 */
export const ISC_XII_JAVA_PRACTICALS = [
  {
    "id": "ISC12-M01",
    "topicKey": "methods-object-parameter-return",
    "category": "Methods",
    "title": "Return the Student with Higher Marks",
    "difficulty": "Medium",
    "objective": "Pass two Student objects to a static method and return the reference to the student with higher marks. On a tie, return the first student.",
    "variables": "Student a, Student b, Student topper",
    "algorithm": [
      "Create two Student objects using a constructor.",
      "Pass both references to topper().",
      "Compare their marks and return one of the received references.",
      "Display the returned object's name and marks."
    ],
    "code": "class Student {\n    String name;\n    int marks;\n    Student(String n, int m) { name = n; marks = m; }\n}\nclass TopperMethod {\n    static Student topper(Student a, Student b) {\n        if (a.marks >= b.marks) return a;\n        return b;\n    }\n    public static void main(String args[]) {\n        Student s1 = new Student(\"Ayan\", 86);\n        Student s2 = new Student(\"Sara\", 92);\n        Student result = topper(s1, s2);\n        System.out.println(result.name + \" \" + result.marks);\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "Sara 92",
    "concepts": [
      "Object as argument",
      "Object return type",
      "Reference value"
    ]
  },
  {
    "id": "ISC12-M02",
    "topicKey": "methods-object-parameter-return",
    "category": "Methods",
    "title": "Reverse an Array through a Returned Array",
    "difficulty": "Medium",
    "objective": "Pass a one-dimensional integer array to a method and return a new array containing the elements in reverse order.",
    "variables": "int[] source, int[] reversed",
    "algorithm": [
      "Create and initialise the source array.",
      "Pass the array to reverseArray().",
      "Create a new array of equal length inside the method.",
      "Copy elements from the end of source to the beginning of the returned array."
    ],
    "code": "class ArrayReturn {\n    static int[] reverseArray(int[] a) {\n        int[] result = new int[a.length];\n        for (int i = 0; i < a.length; i++)\n            result[i] = a[a.length - 1 - i];\n        return result;\n    }\n    public static void main(String args[]) {\n        int[] data = {12, 25, 31, 48};\n        int[] answer = reverseArray(data);\n        for (int x : answer) System.out.print(x + \" \");\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "48 31 25 12",
    "concepts": [
      "Array as parameter",
      "Array return type",
      "New array creation"
    ]
  },
  {
    "id": "ISC12-M03",
    "topicKey": "methods-object-parameter-return",
    "category": "Methods",
    "title": "Update and Return an Object",
    "difficulty": "Medium",
    "objective": "Pass an Account object to a method, update its balance through the received reference and return the same object.",
    "variables": "Account acc, double deposit",
    "algorithm": [
      "Create an Account object with an opening balance.",
      "Pass the object and deposit amount to addDeposit().",
      "Update the object's balance inside the method.",
      "Return the same object reference and display its new balance."
    ],
    "code": "class Account {\n    String holder;\n    double balance;\n    Account(String h, double b) { holder = h; balance = b; }\n}\nclass ObjectUpdate {\n    static Account addDeposit(Account a, double amount) {\n        a.balance += amount;\n        return a;\n    }\n    public static void main(String args[]) {\n        Account account = new Account(\"Mina\", 2500);\n        Account updated = addDeposit(account, 750);\n        System.out.println(updated.holder + \" \" + updated.balance);\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "Mina 3250.0",
    "concepts": [
      "Object arguments",
      "Side effect",
      "Returning an object"
    ]
  },
  {
    "id": "ISC12-M04",
    "topicKey": "methods-object-parameter-return",
    "category": "Methods",
    "title": "Return an Array of Even Values",
    "difficulty": "Hard",
    "objective": "Pass an integer array to a method and return a compact array containing only its even elements.",
    "variables": "int[] values, int count, int[] evenValues",
    "algorithm": [
      "Count the even elements in a first traversal.",
      "Create a result array of exactly that size.",
      "Copy even elements into the result array.",
      "Return and display the result."
    ],
    "code": "class EvenArray {\n    static int[] getEven(int[] a) {\n        int count = 0;\n        for (int x : a) if (x % 2 == 0) count++;\n        int[] result = new int[count];\n        int k = 0;\n        for (int x : a) if (x % 2 == 0) result[k++] = x;\n        return result;\n    }\n    public static void main(String args[]) {\n        int[] data = {7, 12, 5, 18, 21, 24};\n        int[] even = getEven(data);\n        for (int x : even) System.out.print(x + \" \");\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "12 18 24",
    "concepts": [
      "Array parameter",
      "Array return",
      "Two-pass processing"
    ]
  },
  {
    "id": "ISC12-M05",
    "topicKey": "methods-object-parameter-return",
    "category": "Methods",
    "title": "Find the Highest-Paid Employee",
    "difficulty": "Hard",
    "objective": "Pass an array of Employee objects to a method and return the Employee object with the highest salary.",
    "variables": "Employee[] staff, Employee highest",
    "algorithm": [
      "Create an array of Employee objects.",
      "Pass the array to highestPaid().",
      "Compare salary fields while traversing the array.",
      "Return the reference to the highest-paid employee."
    ],
    "code": "class Employee {\n    String name;\n    double salary;\n    Employee(String n, double s) { name = n; salary = s; }\n}\nclass EmployeeSearch {\n    static Employee highestPaid(Employee[] staff) {\n        Employee best = staff[0];\n        for (int i = 1; i < staff.length; i++)\n            if (staff[i].salary > best.salary) best = staff[i];\n        return best;\n    }\n    public static void main(String args[]) {\n        Employee[] team = {\n            new Employee(\"Aarav\", 32000),\n            new Employee(\"Zoya\", 41500),\n            new Employee(\"Kabir\", 39000)\n        };\n        Employee result = highestPaid(team);\n        System.out.println(result.name + \" \" + result.salary);\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "Zoya 41500.0",
    "concepts": [
      "Array of objects",
      "Passing arrays",
      "Returning object reference"
    ]
  },
  {
    "id": "ISC12-A01",
    "topicKey": "arrays-strings",
    "category": "Single-dimensional arrays",
    "title": "Second Largest Distinct Element",
    "difficulty": "Medium",
    "objective": "Read a one-dimensional array and find its second-largest distinct value.",
    "variables": "int[] a, largest, second",
    "algorithm": [
      "Read n and the array elements.",
      "Track the largest and second-largest distinct values in one traversal.",
      "Do not treat a duplicate of the largest value as the second largest.",
      "Report when fewer than two distinct values exist."
    ],
    "code": "import java.util.*;\nclass SecondLargest {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int largest = Integer.MIN_VALUE, second = Integer.MIN_VALUE;\n        for (int x : a) {\n            if (x > largest) { second = largest; largest = x; }\n            else if (x > second && x != largest) second = x;\n        }\n        if (second == Integer.MIN_VALUE) System.out.println(\"No second distinct value\");\n        else System.out.println(\"Second largest = \" + second);\n    }\n}",
    "sampleInput": "6\n12 45 45 29 8 37",
    "sampleOutput": "Second largest = 37",
    "concepts": [
      "Single-dimensional array",
      "Distinct values",
      "Traversal"
    ]
  },
  {
    "id": "ISC12-A02",
    "topicKey": "arrays-strings",
    "category": "Single-dimensional arrays",
    "title": "Insertion Sort",
    "difficulty": "Hard",
    "objective": "Sort an integer array in ascending order using insertion sort.",
    "variables": "int[] a, key, i, j",
    "algorithm": [
      "Read the array.",
      "Start from the second element.",
      "Store the current element as key and shift larger preceding elements one position right.",
      "Insert key in its correct position."
    ],
    "code": "import java.util.*;\nclass InsertionSort {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        for (int i = 1; i < n; i++) {\n            int key = a[i], j = i - 1;\n            while (j >= 0 && a[j] > key) {\n                a[j + 1] = a[j];\n                j--;\n            }\n            a[j + 1] = key;\n        }\n        for (int x : a) System.out.print(x + \" \");\n    }\n}",
    "sampleInput": "6\n29 10 14 37 13 5",
    "sampleOutput": "5 10 13 14 29 37",
    "concepts": [
      "Insertion sort",
      "Shifting",
      "O(n²) worst case"
    ]
  },
  {
    "id": "ISC12-A03",
    "topicKey": "arrays-strings",
    "category": "Single-dimensional arrays",
    "title": "Binary Search with Iteration Count",
    "difficulty": "Medium",
    "objective": "Search for a key in a sorted array using binary search and display the number of comparisons.",
    "variables": "int[] a, key, low, high, mid, comparisons",
    "algorithm": [
      "Read the sorted array and search key.",
      "Initialise low and high boundaries.",
      "Repeatedly calculate mid and compare the key with a[mid].",
      "Narrow the search interval and report position and comparisons."
    ],
    "code": "import java.util.*;\nclass BinarySearchCount {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int key = sc.nextInt(), low = 0, high = n - 1;\n        int comparisons = 0, position = -1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            comparisons++;\n            if (a[mid] == key) { position = mid; break; }\n            if (key < a[mid]) high = mid - 1;\n            else low = mid + 1;\n        }\n        System.out.println(\"Position = \" + (position == -1 ? -1 : position + 1));\n        System.out.println(\"Comparisons = \" + comparisons);\n    }\n}",
    "sampleInput": "7\n3 8 12 19 25 31 44\n25",
    "sampleOutput": "Position = 5\nComparisons = 2",
    "concepts": [
      "Binary search",
      "Sorted input",
      "Comparison counting"
    ]
  },
  {
    "id": "ISC12-D01",
    "topicKey": "arrays-strings",
    "category": "Double-dimensional arrays",
    "title": "Row and Column Totals",
    "difficulty": "Medium",
    "objective": "Read a rectangular matrix and calculate the sum of each row and each column.",
    "variables": "int[][] a, rows, cols, sum",
    "algorithm": [
      "Read matrix dimensions and elements.",
      "For each row, add all column values.",
      "For each column, add all row values.",
      "Display row totals and column totals separately."
    ],
    "code": "import java.util.*;\nclass RowColumnSum {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt(), c = sc.nextInt();\n        int[][] a = new int[r][c];\n        for (int i = 0; i < r; i++)\n            for (int j = 0; j < c; j++) a[i][j] = sc.nextInt();\n        for (int i = 0; i < r; i++) {\n            int sum = 0;\n            for (int j = 0; j < c; j++) sum += a[i][j];\n            System.out.println(\"Row \" + (i + 1) + \" = \" + sum);\n        }\n        for (int j = 0; j < c; j++) {\n            int sum = 0;\n            for (int i = 0; i < r; i++) sum += a[i][j];\n            System.out.println(\"Column \" + (j + 1) + \" = \" + sum);\n        }\n    }\n}",
    "sampleInput": "2 3\n1 2 3\n4 5 6",
    "sampleOutput": "Row 1 = 6\nRow 2 = 15\nColumn 1 = 5\nColumn 2 = 7\nColumn 3 = 9",
    "concepts": [
      "2D array",
      "Nested loops",
      "Row-major traversal"
    ]
  },
  {
    "id": "ISC12-D02",
    "topicKey": "arrays-strings",
    "category": "Double-dimensional arrays",
    "title": "Transpose of a Matrix",
    "difficulty": "Medium",
    "objective": "Read a rectangular matrix and display its transpose.",
    "variables": "int[][] a, transpose",
    "algorithm": [
      "Read rows, columns and matrix elements.",
      "Create a transpose array with dimensions columns × rows.",
      "Copy a[i][j] into transpose[j][i].",
      "Display the transposed matrix."
    ],
    "code": "import java.util.*;\nclass MatrixTranspose {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt(), c = sc.nextInt();\n        int[][] a = new int[r][c];\n        int[][] t = new int[c][r];\n        for (int i = 0; i < r; i++)\n            for (int j = 0; j < c; j++) a[i][j] = sc.nextInt();\n        for (int i = 0; i < r; i++)\n            for (int j = 0; j < c; j++) t[j][i] = a[i][j];\n        for (int i = 0; i < c; i++) {\n            for (int j = 0; j < r; j++) System.out.print(t[i][j] + \" \");\n            System.out.println();\n        }\n    }\n}",
    "sampleInput": "2 3\n1 2 3\n4 5 6",
    "sampleOutput": "1 4\n2 5\n3 6",
    "concepts": [
      "2D array",
      "Transpose",
      "Dimension reversal"
    ]
  },
  {
    "id": "ISC12-D03",
    "topicKey": "arrays-strings",
    "category": "Double-dimensional arrays",
    "title": "Matrix Multiplication",
    "difficulty": "Hard",
    "objective": "Multiply two matrices when the number of columns of the first equals the number of rows of the second.",
    "variables": "int[][] a, b, product; int i, j, k",
    "algorithm": [
      "Read dimensions r1,c1 and r2,c2; require c1 == r2.",
      "Read both matrices.",
      "Use three nested loops to calculate product[i][j].",
      "Display the product matrix."
    ],
    "code": "import java.util.*;\nclass MatrixMultiply {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        int r1 = sc.nextInt(), c1 = sc.nextInt();\n        int r2 = sc.nextInt(), c2 = sc.nextInt();\n        if (c1 != r2) { System.out.println(\"Multiplication not possible\"); return; }\n        int[][] a = new int[r1][c1], b = new int[r2][c2], p = new int[r1][c2];\n        for (int i = 0; i < r1; i++)\n            for (int j = 0; j < c1; j++) a[i][j] = sc.nextInt();\n        for (int i = 0; i < r2; i++)\n            for (int j = 0; j < c2; j++) b[i][j] = sc.nextInt();\n        for (int i = 0; i < r1; i++)\n            for (int j = 0; j < c2; j++)\n                for (int k = 0; k < c1; k++) p[i][j] += a[i][k] * b[k][j];\n        for (int i = 0; i < r1; i++) {\n            for (int j = 0; j < c2; j++) System.out.print(p[i][j] + \" \");\n            System.out.println();\n        }\n    }\n}",
    "sampleInput": "2 2\n2 3\n2 2\n1 4\n5 2",
    "sampleOutput": "17 14\n23 20",
    "concepts": [
      "2D arrays",
      "Triple nested loop",
      "Matrix multiplication"
    ]
  },
  {
    "id": "ISC12-D04",
    "topicKey": "arrays-strings",
    "category": "Double-dimensional arrays",
    "title": "Diagonal Sums of a Square Matrix",
    "difficulty": "Medium",
    "objective": "Calculate the primary and secondary diagonal sums of a square matrix.",
    "variables": "int[][] a, n, primary, secondary",
    "algorithm": [
      "Read order n and the square matrix.",
      "Add a[i][i] to the primary diagonal sum.",
      "Add a[i][n-1-i] to the secondary diagonal sum.",
      "Display both totals."
    ],
    "code": "import java.util.*;\nclass DiagonalSums {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), primary = 0, secondary = 0;\n        int[][] a = new int[n][n];\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < n; j++) a[i][j] = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            primary += a[i][i];\n            secondary += a[i][n - 1 - i];\n        }\n        System.out.println(\"Primary = \" + primary);\n        System.out.println(\"Secondary = \" + secondary);\n    }\n}",
    "sampleInput": "3\n1 2 3\n4 5 6\n7 8 9",
    "sampleOutput": "Primary = 15\nSecondary = 15",
    "concepts": [
      "Square matrix",
      "Diagonal indexing"
    ]
  },
  {
    "id": "ISC12-D05",
    "topicKey": "arrays-strings",
    "category": "Double-dimensional arrays",
    "title": "Solve Two Linear Equations",
    "difficulty": "Hard",
    "objective": "Solve two simultaneous linear equations using a 2D coefficient matrix and Cramer's rule.",
    "variables": "double[][] a; double D, Dx, Dy, x, y",
    "algorithm": [
      "Read coefficients a,b,c,d and constants e,f for ax+by=e and cx+dy=f.",
      "Calculate D=ad-bc, Dx=ed-bf and Dy=af-ec.",
      "If D is zero, report that a unique solution does not exist.",
      "Otherwise calculate x=Dx/D and y=Dy/D."
    ],
    "code": "import java.util.*;\nclass LinearEquations {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        double[][] a = new double[2][3];\n        for (int i = 0; i < 2; i++)\n            for (int j = 0; j < 3; j++) a[i][j] = sc.nextDouble();\n        double d = a[0][0] * a[1][1] - a[0][1] * a[1][0];\n        if (Math.abs(d) < 1.0E-9) {\n            System.out.println(\"No unique solution\");\n        } else {\n            double dx = a[0][2] * a[1][1] - a[0][1] * a[1][2];\n            double dy = a[0][0] * a[1][2] - a[0][2] * a[1][0];\n            System.out.printf(\"x = %.2f%n\", dx / d);\n            System.out.printf(\"y = %.2f%n\", dy / d);\n        }\n    }\n}",
    "sampleInput": "2 1 5\n1 -1 1",
    "sampleOutput": "x = 2.00\ny = 1.00",
    "concepts": [
      "2D coefficient matrix",
      "Cramer's rule",
      "Linear equations"
    ]
  },
  {
    "id": "ISC12-S01",
    "topicKey": "arrays-strings",
    "category": "String handling",
    "title": "Count Words Using StringTokenizer",
    "difficulty": "Medium",
    "objective": "Accept a sentence and count its tokens using StringTokenizer.",
    "variables": "String line; StringTokenizer st; int count",
    "algorithm": [
      "Read a full line of text.",
      "Create a StringTokenizer for the line.",
      "Count tokens while hasMoreTokens() is true.",
      "Display the number of words."
    ],
    "code": "import java.util.*;\nclass WordCount {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.nextLine();\n        StringTokenizer st = new StringTokenizer(line);\n        int count = 0;\n        while (st.hasMoreTokens()) { st.nextToken(); count++; }\n        System.out.println(\"Words = \" + count);\n    }\n}",
    "sampleInput": "Java makes problem solving interesting",
    "sampleOutput": "Words = 6",
    "concepts": [
      "StringTokenizer",
      "Tokens",
      "Whitespace delimiters"
    ]
  },
  {
    "id": "ISC12-S02",
    "topicKey": "arrays-strings",
    "category": "String handling",
    "title": "Find the Longest Word",
    "difficulty": "Medium",
    "objective": "Find and display the longest word in a sentence using StringTokenizer.",
    "variables": "String line, word, longest",
    "algorithm": [
      "Read a sentence.",
      "Tokenise it using StringTokenizer.",
      "Compare each token length with the current longest word.",
      "Display the longest word and its length."
    ],
    "code": "import java.util.*;\nclass LongestWord {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.nextLine();\n        StringTokenizer st = new StringTokenizer(line);\n        String longest = \"\";\n        while (st.hasMoreTokens()) {\n            String word = st.nextToken();\n            if (word.length() > longest.length()) longest = word;\n        }\n        System.out.println(\"Longest word = \" + longest);\n        System.out.println(\"Length = \" + longest.length());\n    }\n}",
    "sampleInput": "Computer science develops logical thinking",
    "sampleOutput": "Longest word = Computer\nLength = 8",
    "concepts": [
      "StringTokenizer",
      "String.length()",
      "Token traversal"
    ]
  },
  {
    "id": "ISC12-S03",
    "topicKey": "arrays-strings",
    "category": "String handling",
    "title": "StringBuffer Text Editor",
    "difficulty": "Hard",
    "objective": "Use StringBuffer to append, insert, replace and delete text, demonstrating mutable string operations.",
    "variables": "StringBuffer text",
    "algorithm": [
      "Create a StringBuffer with initial text.",
      "Append a word and insert a marker.",
      "Replace a selected range.",
      "Delete an unwanted range and display the final text."
    ],
    "code": "class StringBufferEditor {\n    public static void main(String args[]) {\n        StringBuffer text = new StringBuffer(\"Java\");\n        text.append(\" Language\");\n        text.insert(5, \"Core \");\n        text.replace(0, 4, \"Core\");\n        text.delete(5, 10);\n        System.out.println(text);\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "Core Language",
    "concepts": [
      "StringBuffer",
      "Mutable character sequence",
      "append/insert/replace/delete"
    ]
  },
  {
    "id": "ISC12-S04",
    "topicKey": "arrays-strings",
    "category": "String handling",
    "title": "Count Substring Occurrences",
    "difficulty": "Hard",
    "objective": "Count non-overlapping occurrences of a target substring using indexOf and substring operations.",
    "variables": "String text, target; int count, position",
    "algorithm": [
      "Read the text and target substring.",
      "Search from the current position using indexOf(target, start).",
      "Increase count and advance start by target.length().",
      "Stop when indexOf returns -1."
    ],
    "code": "import java.util.*;\nclass SubstringCount {\n    public static void main(String args[]) {\n        Scanner sc = new Scanner(System.in);\n        String text = sc.nextLine();\n        String target = sc.nextLine();\n        if (target.length() == 0) { System.out.println(\"Target cannot be empty\"); return; }\n        int count = 0, start = 0, position;\n        while ((position = text.indexOf(target, start)) != -1) {\n            count++;\n            start = position + target.length();\n        }\n        System.out.println(\"Occurrences = \" + count);\n    }\n}",
    "sampleInput": "JAVA IS FUN AND JAVA IS POWERFUL\nJAVA",
    "sampleOutput": "Occurrences = 2",
    "concepts": [
      "String.indexOf",
      "Substring search",
      "String immutability"
    ]
  },
  {
    "id": "ISC12-I01",
    "topicKey": "inheritance-interface",
    "category": "Inheritance",
    "title": "Abstract Class and Method Overriding",
    "difficulty": "Hard",
    "objective": "Create an abstract Shape class and derive Circle and Rectangle classes that override area().",
    "variables": "abstract Shape; Circle; Rectangle; double area",
    "algorithm": [
      "Declare an abstract Shape class with abstract area().",
      "Derive Circle and Rectangle and implement area().",
      "Use a Shape reference to refer to each subclass object.",
      "Call area() and observe dynamic binding."
    ],
    "code": "abstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double radius;\n    Circle(double r) { radius = r; }\n    double area() { return 3.14159 * radius * radius; }\n}\nclass Rectangle extends Shape {\n    double length, breadth;\n    Rectangle(double l, double b) { length = l; breadth = b; }\n    double area() { return length * breadth; }\n}\nclass AbstractShapeDemo {\n    public static void main(String args[]) {\n        Shape s = new Circle(3);\n        System.out.printf(\"Circle = %.2f%n\", s.area());\n        s = new Rectangle(4, 5);\n        System.out.printf(\"Rectangle = %.2f%n\", s.area());\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "Circle = 28.27\nRectangle = 20.00",
    "concepts": [
      "Abstract class",
      "Overriding",
      "Dynamic binding"
    ]
  },
  {
    "id": "ISC12-I02",
    "topicKey": "inheritance-interface",
    "category": "Inheritance",
    "title": "Protected Member in Multilevel Inheritance",
    "difficulty": "Medium",
    "objective": "Demonstrate protected visibility and constructor order through multilevel inheritance.",
    "variables": "Person, Student, Monitor classes",
    "algorithm": [
      "Create a base class with a protected member and constructor.",
      "Derive Student and then Monitor.",
      "Use inherited protected data in a subclass method.",
      "Create a Monitor object and observe constructor order."
    ],
    "code": "class Person {\n    protected String name;\n    Person(String n) { name = n; System.out.println(\"Person constructor\"); }\n}\nclass Student extends Person {\n    protected int roll;\n    Student(String n, int r) {\n        super(n);\n        roll = r;\n        System.out.println(\"Student constructor\");\n    }\n}\nclass Monitor extends Student {\n    Monitor(String n, int r) {\n        super(n, r);\n        System.out.println(\"Monitor constructor\");\n    }\n    void display() { System.out.println(name + \" \" + roll); }\n}\nclass ProtectedDemo {\n    public static void main(String args[]) {\n        Monitor m = new Monitor(\"Ira\", 12);\n        m.display();\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "Person constructor\nStudent constructor\nMonitor constructor\nIra 12",
    "concepts": [
      "protected visibility",
      "Multilevel inheritance",
      "super constructor call"
    ]
  },
  {
    "id": "ISC12-I03",
    "topicKey": "inheritance-interface",
    "category": "Inheritance",
    "title": "Object Class and toString() Overriding",
    "difficulty": "Medium",
    "objective": "Demonstrate that every Java class inherits from Object and can override toString() for a meaningful textual representation.",
    "variables": "Book class; title, author, price",
    "algorithm": [
      "Create a Book class with fields and a constructor.",
      "Override toString() to return a formatted description.",
      "Create a Book object.",
      "Print the object directly to invoke toString()."
    ],
    "code": "class Book {\n    String title, author;\n    double price;\n    Book(String t, String a, double p) {\n        title = t; author = a; price = p;\n    }\n    public String toString() {\n        return title + \" by \" + author + \" - Rs. \" + price;\n    }\n}\nclass ObjectClassDemo {\n    public static void main(String args[]) {\n        Book b = new Book(\"Java Basics\", \"R. Kumar\", 450);\n        System.out.println(b);\n    }\n}",
    "sampleInput": "No keyboard input",
    "sampleOutput": "Java Basics by R. Kumar - Rs. 450.0",
    "concepts": [
      "java.lang.Object",
      "toString()",
      "Method overriding"
    ]
  }
];

export const ISC_XII_JAVA_PRACTICAL_COUNTS = {
  "Methods": 5,
  "Single-dimensional arrays": 3,
  "Double-dimensional arrays": 5,
  "String handling": 4,
  "Inheritance": 3
};
