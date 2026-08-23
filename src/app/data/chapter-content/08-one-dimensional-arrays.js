const chapter08 = {
  id: "08-one-dimensional-arrays",
  title: "ONE DIMENSIONAL ARRAYS",
  slug: "one-dimensional-arrays",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 240,
  topics: [
    "arrays",
    "one-dimensional arrays",
    "array declaration",
    "array initialization",
    "array traversal",
    "array length",
    "searching in arrays",
    "sorting arrays",
    "linear search",
    "binary search",
    "bubble sort",
    "selection sort",
    "insertion sort",
    "array of objects",
    "array manipulation",
    "passing arrays to methods",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "An array is a collection of elements of the same data type stored at contiguous memory locations. It is the simplest and most widely used data structure in programming. Think of an array like a row of lockers in a school — each locker has a unique number (index) and stores one item. You can access any locker directly by its number without checking the others. Arrays allow you to store multiple values in a single variable instead of declaring separate variables for each value. This makes programs more organized, efficient, and easier to manage. In Java, arrays are objects, and their size is fixed once created.",
    realLifeExamples: [
      "A class attendance register — stores names of all students in one place, indexed by roll number.",
      "A music playlist — stores multiple songs in a sequence, accessible by position (1st, 2nd, 3rd song).",
      "A shopping list — stores multiple items in order, each with a position (item 1, item 2, etc.).",
      "A scoreboard — stores scores of multiple players, each at a specific index.",
      "A calendar — stores days of a month in an array, each day at a specific position.",
      "A library shelf — stores books in order, accessible by position (1st book, 2nd book, etc.).",
      "A seating arrangement — stores student names by seat number.",
      "A temperature log — stores daily temperatures for a month, each at a specific day index.",
    ],
    commonMistakes: [
      "ArrayIndexOutOfBoundsException — accessing an index that doesn't exist (e.g., arr[5] in an array of size 5).",
      "Forgetting that array indices start at 0, not 1.",
      "Using the wrong loop condition — using i <= n instead of i < n for an array of size n.",
      "Not initializing array elements before use — they contain default values (0 for int, null for objects).",
      "Confusing array length with array index — length is one more than the last valid index.",
      "Trying to change the size of an array after creation — arrays have fixed size in Java.",
      "Using assignment (=) instead of equals() for comparing array elements.",
      "Not checking for null before accessing array elements.",
    ],
    whereUsed: [
      "Storing multiple values of the same type (marks of students, temperatures, etc.).",
      "Implementing data structures like stacks, queues, and matrices.",
      "Processing collections of data efficiently.",
      "Sorting and searching algorithms.",
      "Matrix operations and mathematical computations.",
      "Storing and manipulating strings as character arrays.",
      "Implementing database-like operations in memory.",
      "Game development for storing scores, positions, and game states.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "An array is a container that holds a fixed number of values of a single type. The length of an array is established when the array is created and cannot be changed. Each item in an array is called an element, and each element is accessed by its numerical index. In Java, array indices start at 0 and go up to length-1. For example, if you create an array of size 5, valid indices are 0, 1, 2, 3, 4. Arrays are useful when you need to store and manipulate multiple values of the same type efficiently. Instead of creating 10 separate variables for 10 student marks, you can create one array that holds all 10 marks.",
    importantPoints: [
      "An array stores multiple values of the SAME data type.",
      "Array indices start at 0 and go up to length-1.",
      "The length of an array is FIXED — it cannot be changed after creation.",
      "Arrays are objects in Java — they are created using the new keyword.",
      "Default values: 0 for numeric types, false for boolean, null for objects.",
      "The length property gives the size of the array (arr.length).",
      "Array elements are stored in contiguous memory locations.",
      "Arrays can be single-dimensional (1D) or multi-dimensional (2D, 3D, etc.).",
      "You can pass arrays to methods and return arrays from methods.",
      "The Arrays class in java.util provides useful methods for array operations.",
    ],
    memoryTricks: [
      "ARRAY = 'A Row of Yielding Lots of Yellow' — a row of elements of the same type.",
      "Index starts at 0: 'Zero is the hero' — first element is at index 0.",
      "Length vs Index: 'Length is one more than the last index' — if length is 5, last index is 4.",
      "Array size is fixed: 'What you create is what you get' — cannot resize later.",
      "Same data type: 'All apples, no oranges' — all elements must be the same type.",
      "Contiguous memory: 'Neighbors in memory' — elements are stored next to each other.",
    ],
    examTips: [
      "Always remember: array indices start at 0, not 1.",
      "ArrayIndexOutOfBoundsException occurs when you access an invalid index.",
      "The last valid index is arr.length - 1, not arr.length.",
      "Use i < n (not i <= n) when looping through an array of size n.",
      "Default values: 0 for int, 0.0 for double, false for boolean, null for objects.",
      "To find array length, use arr.length (not arr.length()).",
      "Arrays are passed by reference to methods — changes in the method affect the original array.",
      "For sorting, know at least Bubble Sort and Selection Sort for ICSE exams.",
      "For searching, know Linear Search and Binary Search algorithms.",
      "Binary search requires the array to be SORTED first.",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `// Declaration
int[] arr;  // or int arr[];

// Creation (allocating memory)
arr = new int[5];  // creates array of size 5

// Declaration + Creation (combined)
int[] arr = new int[5];

// Initialization at creation
int[] arr = {10, 20, 30, 40, 50};

// Accessing elements
int first = arr[0];  // first element
int last = arr[4];   // last element (index 4 for size 5)

// Modifying elements
arr[2] = 100;  // changes 3rd element to 100

// Array length
int size = arr.length;  // returns 5`,
    breakdown: [
      {
        keyword: "int[] arr",
        explanation:
          "Declaration of an integer array. The [] indicates it's an array. Can also be written as int arr[].",
      },
      {
        keyword: "new int[5]",
        explanation:
          "Creates an array of size 5 in memory. All elements are initialized to default values (0 for int).",
      },
      {
        keyword: "{10, 20, 30, 40, 50}",
        explanation:
          "Array literal — creates and initializes the array in one step. Size is determined by the number of elements.",
      },
      {
        keyword: "arr[0]",
        explanation:
          "Accesses the first element of the array. Index starts at 0. arr[0] is the first element, arr[1] is the second, etc.",
      },
      {
        keyword: "arr.length",
        explanation:
          "Returns the length (size) of the array. For an array of size 5, arr.length returns 5. Note: it's a property, not a method — no parentheses.",
      },
    ],
    variations: {
      declaration: {
        code: `// Different ways to declare arrays
int[] arr1;           // Preferred way
int arr2[];           // C-style (also valid in Java)
double[] marks;       // Double array
String[] names;       // String array
char[] letters;       // Char array`,
        explanation:
          "Arrays can be declared for any data type. The [] can be after the type or after the variable name.",
      },
      initialization: {
        code: `// Different ways to initialize arrays
int[] arr1 = new int[5];           // All elements = 0
int[] arr2 = {1, 2, 3, 4, 5};     // Direct initialization
int[] arr3 = new int[]{1, 2, 3};   // Anonymous array`,
        explanation:
          "Arrays can be initialized with default values or specific values. The size is fixed once created.",
      },
      traversal: {
        code: `// Traversing an array using for loop
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// Traversing using enhanced for loop
for (int element : arr) {
    System.out.println(element);
}`,
        explanation:
          "Arrays can be traversed using traditional for loops (with index) or enhanced for loops (for-each).",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "array-ex-b-1",
        title: "Declare and initialize an array",
        code: `int[] marks = {85, 90, 78, 92, 88};

// Access elements
System.out.println("First mark: " + marks[0]);  // 85
System.out.println("Third mark: " + marks[2]);  // 78
System.out.println("Last mark: " + marks[4]);   // 88

// Modify element
marks[1] = 95;
System.out.println("Updated second mark: " + marks[1]);  // 95

// Array length
System.out.println("Total subjects: " + marks.length);  // 5`,
        output: "First mark: 85\nThird mark: 78\nLast mark: 88\nUpdated second mark: 95\nTotal subjects: 5",
        explanation: [
          "Step 1: Declare and initialize array with 5 marks.",
          "Step 2: Access elements using indices 0, 2, and 4.",
          "Step 3: Modify marks[1] from 90 to 95.",
          "Step 4: Get array length using marks.length (returns 5).",
          "Key point: Indices start at 0, so last index is 4 for a 5-element array.",
        ],
      },
      {
        id: "array-ex-b-2",
        title: "Print all elements of an array",
        code: `int[] numbers = {10, 20, 30, 40, 50};

System.out.println("Array elements:");
for (int i = 0; i < numbers.length; i++) {
    System.out.println("Element at index " + i + ": " + numbers[i]);
}`,
        output: "Array elements:\nElement at index 0: 10\nElement at index 1: 20\nElement at index 2: 30\nElement at index 3: 40\nElement at index 4: 50",
        explanation: [
          "Step 1: Initialize array with 5 elements.",
          "Step 2: Loop from i = 0 to i < 5 (i.e., 0, 1, 2, 3, 4).",
          "Step 3: Print each element with its index.",
          "Key point: Use i < arr.length (not i <= arr.length) to avoid ArrayIndexOutOfBoundsException.",
        ],
      },
      {
        id: "array-ex-b-3",
        title: "Calculate sum and average of array elements",
        code: `int[] marks = {85, 90, 78, 92, 88};
int sum = 0;

for (int i = 0; i < marks.length; i++) {
    sum = sum + marks[i];
}

double average = (double) sum / marks.length;
System.out.println("Sum: " + sum);
System.out.println("Average: " + average);`,
        output: "Sum: 433\nAverage: 86.6",
        explanation: [
          "Step 1: Initialize array and sum variable.",
          "Step 2: Loop through all elements, adding each to sum.",
          "Step 3: Calculate average by dividing sum by length (cast to double for decimal result).",
          "Key point: Sum = 85+90+78+92+88 = 433. Average = 433/5 = 86.6.",
        ],
      },
      {
        id: "array-ex-b-4",
        title: "Find maximum and minimum in an array",
        code: `int[] numbers = {45, 23, 67, 12, 89, 34};
int max = numbers[0];
int min = numbers[0];

for (int i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
    if (numbers[i] < min) {
        min = numbers[i];
    }
}

System.out.println("Maximum: " + max);  // 89
System.out.println("Minimum: " + min);  // 12`,
        output: "Maximum: 89\nMinimum: 12",
        explanation: [
          "Step 1: Initialize max and min with first element (numbers[0]).",
          "Step 2: Loop from i = 1 (second element) to end.",
          "Step 3: Update max if current element is greater.",
          "Step 4: Update min if current element is smaller.",
          "Key point: Start from index 1 since index 0 is already used for initialization.",
        ],
      },
      {
        id: "array-ex-b-5",
        title: "Count even and odd numbers in an array",
        code: `int[] numbers = {12, 45, 67, 23, 34, 56, 78, 90};
int evenCount = 0;
int oddCount = 0;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 == 0) {
        evenCount++;
    } else {
        oddCount++;
    }
}

System.out.println("Even numbers: " + evenCount);  // 5
System.out.println("Odd numbers: " + oddCount);    // 3`,
        output: "Even numbers: 5\nOdd numbers: 3",
        explanation: [
          "Step 1: Initialize array and counters.",
          "Step 2: Loop through all elements.",
          "Step 3: Check if element is even (divisible by 2) or odd.",
          "Step 4: Increment appropriate counter.",
          "Key point: Even numbers: 12, 34, 56, 78, 90 (5). Odd numbers: 45, 67, 23 (3).",
        ],
      },
      {
        id: "array-ex-b-6",
        title: "Reverse an array",
        code: `int[] original = {1, 2, 3, 4, 5};
int[] reversed = new int[original.length];

for (int i = 0; i < original.length; i++) {
    reversed[i] = original[original.length - 1 - i];
}

System.out.println("Original: ");
for (int i = 0; i < original.length; i++) {
    System.out.print(original[i] + " ");
}
System.out.println("\\nReversed: ");
for (int i = 0; i < reversed.length; i++) {
    System.out.print(reversed[i] + " ");
}`,
        output: "Original: \n1 2 3 4 5 \nReversed: \n5 4 3 2 1 ",
        explanation: [
          "Step 1: Create original array and new reversed array of same size.",
          "Step 2: Copy elements in reverse order: reversed[0] = original[4], reversed[1] = original[3], etc.",
          "Step 3: Formula: reversed[i] = original[length - 1 - i].",
          "Key point: The index mapping is: 0→4, 1→3, 2→2, 3→1, 4→0.",
        ],
      },
      {
        id: "array-ex-b-7",
        title: "Copy elements from one array to another",
        code: `int[] source = {10, 20, 30, 40, 50};
int[] destination = new int[source.length];

for (int i = 0; i < source.length; i++) {
    destination[i] = source[i];
}

System.out.println("Copied array:");
for (int i = 0; i < destination.length; i++) {
    System.out.print(destination[i] + " ");
}`,
        output: "Copied array:\n10 20 30 40 50 ",
        explanation: [
          "Step 1: Create source array and destination array of same size.",
          "Step 2: Copy each element from source to destination using loop.",
          "Step 3: destination[i] = source[i] for all i.",
          "Key point: Arrays are reference types — direct assignment (dest = src) doesn't copy, it references.",
        ],
      },
      {
        id: "array-ex-b-8",
        title: "Count occurrences of a specific element",
        code: `int[] numbers = {10, 20, 30, 20, 40, 20, 50};
int target = 20;
int count = 0;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == target) {
        count++;
    }
}

System.out.println(target + " appears " + count + " times");`,
        output: "20 appears 3 times",
        explanation: [
          "Step 1: Initialize array and target value.",
          "Step 2: Loop through all elements.",
          "Step 3: If element equals target, increment count.",
          "Step 4: 20 appears at indices 1, 3, and 5 — total 3 times.",
          "Key point: This is useful for frequency counting in arrays.",
        ],
      },
      {
        id: "array-ex-b-9",
        title: "Merge two arrays",
        code: `int[] arr1 = {1, 2, 3};
int[] arr2 = {4, 5, 6};
int[] merged = new int[arr1.length + arr2.length];

int index = 0;
for (int i = 0; i < arr1.length; i++) {
    merged[index++] = arr1[i];
}
for (int i = 0; i < arr2.length; i++) {
    merged[index++] = arr2[i];
}

System.out.println("Merged array:");
for (int i = 0; i < merged.length; i++) {
    System.out.print(merged[i] + " ");
}`,
        output: "Merged array:\n1 2 3 4 5 6 ",
        explanation: [
          "Step 1: Create two arrays and a merged array of combined size.",
          "Step 2: Copy all elements from arr1 to merged.",
          "Step 3: Copy all elements from arr2 to merged.",
          "Step 4: Use a separate index variable to track position in merged array.",
          "Key point: Merged array size = arr1.length + arr2.length.",
        ],
      },
      {
        id: "array-ex-b-10",
        title: "Check if array is sorted",
        code: `int[] numbers = {1, 2, 3, 4, 5};
boolean isSorted = true;

for (int i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] > numbers[i + 1]) {
        isSorted = false;
        break;
    }
}

System.out.println("Is sorted: " + isSorted);`,
        output: "Is sorted: true",
        explanation: [
          "Step 1: Initialize array and flag isSorted = true.",
          "Step 2: Loop from 0 to length-2 (compare each element with next).",
          "Step 3: If any element is greater than next, array is not sorted.",
          "Step 4: Set isSorted = false and break.",
          "Key point: Loop goes to length-1 because we compare i with i+1.",
        ],
      },
    ],
    intermediate: [
      {
        id: "array-ex-i-1",
        title: "Linear Search",
        code: `int[] numbers = {10, 25, 30, 45, 50};
int target = 30;
int index = -1;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == target) {
        index = i;
        break;
    }
}

if (index != -1) {
    System.out.println(target + " found at index " + index);
} else {
    System.out.println(target + " not found");
}`,
        output: "30 found at index 2",
        explanation: [
          "Step 1: Initialize array and target value.",
          "Step 2: Loop through array, comparing each element with target.",
          "Step 3: If found, store index and break.",
          "Step 4: If not found, index remains -1.",
          "Key point: Linear search checks each element sequentially. Time complexity: O(n).",
        ],
      },
      {
        id: "array-ex-i-2",
        title: "Binary Search (array must be sorted)",
        code: `int[] sortedArr = {10, 20, 30, 40, 50, 60, 70};
int target = 40;
int left = 0;
int right = sortedArr.length - 1;
int index = -1;

while (left <= right) {
    int mid = (left + right) / 2;
    if (sortedArr[mid] == target) {
        index = mid;
        break;
    } else if (sortedArr[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

if (index != -1) {
    System.out.println(target + " found at index " + index);
} else {
    System.out.println(target + " not found");
}`,
        output: "40 found at index 3",
        explanation: [
          "Step 1: Array must be sorted. Initialize left = 0, right = length-1.",
          "Step 2: Calculate mid = (left + right) / 2.",
          "Step 3: If arr[mid] == target, found at mid.",
          "Step 4: If arr[mid] < target, search right half (left = mid + 1).",
          "Step 5: If arr[mid] > target, search left half (right = mid - 1).",
          "Key point: Binary search divides array in half each time. Time complexity: O(log n).",
        ],
      },
      {
        id: "array-ex-i-3",
        title: "Bubble Sort",
        code: `int[] arr = {64, 34, 25, 12, 22, 11, 90};
int n = arr.length;

for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            // Swap
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}

System.out.println("Sorted array:");
for (int i = 0; i < n; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Sorted array:\n11 12 22 25 34 64 90 ",
        explanation: [
          "Step 1: Outer loop runs n-1 times.",
          "Step 2: Inner loop compares adjacent elements and swaps if out of order.",
          "Step 3: After each outer iteration, the largest element 'bubbles' to the end.",
          "Step 4: Inner loop range decreases each time (n-i-1) because end is sorted.",
          "Key point: Bubble sort repeatedly swaps adjacent elements if they are in wrong order.",
        ],
      },
      {
        id: "array-ex-i-4",
        title: "Selection Sort",
        code: `int[] arr = {64, 34, 25, 12, 22, 11, 90};
int n = arr.length;

for (int i = 0; i < n - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }
    // Swap minimum element with first element
    int temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
}

System.out.println("Sorted array:");
for (int i = 0; i < n; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Sorted array:\n11 12 22 25 34 64 90 ",
        explanation: [
          "Step 1: Outer loop selects position to fill with minimum element.",
          "Step 2: Inner loop finds minimum element in unsorted portion.",
          "Step 3: Swap minimum element with element at current position.",
          "Step 4: After each iteration, sorted portion grows from left.",
          "Key point: Selection sort finds minimum and places it at the beginning.",
        ],
      },
      {
        id: "array-ex-i-5",
        title: "Insertion Sort",
        code: `int[] arr = {64, 34, 25, 12, 22, 11, 90};
int n = arr.length;

for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}

System.out.println("Sorted array:");
for (int i = 0; i < n; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Sorted array:\n11 12 22 25 34 64 90 ",
        explanation: [
          "Step 1: Start from second element (i = 1).",
          "Step 2: Store current element as key.",
          "Step 3: Compare key with elements before it and shift larger elements right.",
          "Step 4: Insert key at correct position.",
          "Key point: Insertion sort builds sorted array one element at a time.",
        ],
      },
      {
        id: "array-ex-i-6",
        title: "Find second largest element",
        code: `int[] numbers = {12, 35, 1, 10, 34, 1};
int largest = numbers[0];
int secondLargest = Integer.MIN_VALUE;

for (int i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
        secondLargest = largest;
        largest = numbers[i];
    } else if (numbers[i] > secondLargest && numbers[i] != largest) {
        secondLargest = numbers[i];
    }
}

System.out.println("Largest: " + largest);
System.out.println("Second largest: " + secondLargest);`,
        output: "Largest: 35\nSecond largest: 34",
        explanation: [
          "Step 1: Initialize largest with first element, secondLargest with minimum value.",
          "Step 2: If current element > largest, update both largest and secondLargest.",
          "Step 3: If current element is between largest and secondLargest, update secondLargest.",
          "Step 4: Skip duplicates of largest.",
          "Key point: Track both largest and second largest in single pass.",
        ],
      },
      {
        id: "array-ex-i-7",
        title: "Remove duplicates from sorted array",
        code: `int[] arr = {1, 2, 2, 3, 3, 3, 4, 5, 5};
int[] temp = new int[arr.length];
int j = 0;

temp[j++] = arr[0];

for (int i = 1; i < arr.length; i++) {
    if (arr[i] != arr[i - 1]) {
        temp[j++] = arr[i];
    }
}

System.out.println("Array without duplicates:");
for (int i = 0; i < j; i++) {
    System.out.print(temp[i] + " ");
}`,
        output: "Array without duplicates:\n1 2 3 4 5 ",
        explanation: [
          "Step 1: Create temporary array to store unique elements.",
          "Step 2: Copy first element to temp.",
          "Step 3: For each element, compare with previous element.",
          "Step 4: If different, copy to temp.",
          "Key point: Works for sorted arrays. j tracks the position in temp array.",
        ],
      },
      {
        id: "array-ex-i-8",
        title: "Rotate array by one position",
        code: `int[] arr = {1, 2, 3, 4, 5};
int first = arr[0];

for (int i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
}
arr[arr.length - 1] = first;

System.out.println("Rotated array:");
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Rotated array:\n2 3 4 5 1 ",
        explanation: [
          "Step 1: Store first element in a temporary variable.",
          "Step 2: Shift all elements one position to the left.",
          "Step 3: Place the stored first element at the last position.",
          "Key point: Left rotation moves first element to the end.",
        ],
      },
      {
        id: "array-ex-i-9",
        title: "Find pair with given sum",
        code: `int[] arr = {2, 7, 11, 15};
int target = 9;
boolean found = false;

for (int i = 0; i < arr.length - 1; i++) {
    for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] + arr[j] == target) {
            System.out.println("Pair found: " + arr[i] + " + " + arr[j] + " = " + target);
            found = true;
            break;
        }
    }
    if (found) break;
}`,
        output: "Pair found: 2 + 7 = 9",
        explanation: [
          "Step 1: Use nested loops to check all pairs.",
          "Step 2: Outer loop picks first element, inner loop picks second element.",
          "Step 3: If sum equals target, print pair and exit.",
          "Step 4: j starts from i+1 to avoid using same element twice.",
          "Key point: This is O(n²) solution. For sorted arrays, use two-pointer technique for O(n).",
        ],
      },
      {
        id: "array-ex-i-10",
        title: "Move all zeros to end",
        code: `int[] arr = {0, 5, 0, 8, 0, 3, 0, 9};
int count = 0;

for (int i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
        arr[count++] = arr[i];
    }
}

while (count < arr.length) {
    arr[count++] = 0;
}

System.out.println("Array after moving zeros:");
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Array after moving zeros:\n5 8 3 9 0 0 0 0 ",
        explanation: [
          "Step 1: Use count variable to track position for non-zero elements.",
          "Step 2: Copy all non-zero elements to the front.",
          "Step 3: Fill remaining positions with zeros.",
          "Key point: This maintains the relative order of non-zero elements.",
        ],
      },
    ],
    advanced: [
      {
        id: "array-ex-a-1",
        title: "Find missing number in array 1 to N",
        code: `int[] arr = {1, 2, 4, 5, 6};  // 3 is missing
int n = 6;
int expectedSum = n * (n + 1) / 2;
int actualSum = 0;

for (int i = 0; i < arr.length; i++) {
    actualSum = actualSum + arr[i];
}

int missing = expectedSum - actualSum;
System.out.println("Missing number: " + missing);`,
        output: "Missing number: 3",
        explanation: [
          "Step 1: Calculate expected sum of 1 to N using formula n(n+1)/2.",
          "Step 2: Calculate actual sum of array elements.",
          "Step 3: Missing number = expected sum - actual sum.",
          "Key point: This works for arrays containing numbers 1 to N with one missing.",
        ],
      },
      {
        id: "array-ex-a-2",
        title: "Find duplicate elements",
        code: `int[] arr = {1, 3, 4, 2, 2, 3, 5};
System.out.println("Duplicate elements:");

for (int i = 0; i < arr.length; i++) {
    for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
            System.out.println(arr[i]);
            break;
        }
    }
}`,
        output: "Duplicate elements:\n2\n3",
        explanation: [
          "Step 1: Use nested loops to compare each element with all others.",
          "Step 2: If duplicate found, print it and break inner loop.",
          "Step 3: j starts from i+1 to avoid comparing with self and duplicates.",
          "Key point: This is O(n²) solution. For better performance, use HashSet.",
        ],
      },
      {
        id: "array-ex-a-3",
        title: "Find majority element (appears more than n/2 times)",
        code: `int[] arr = {3, 3, 4, 2, 4, 4, 2, 4, 4};
int n = arr.length;
int majority = arr[0];
int count = 1;

for (int i = 1; i < n; i++) {
    if (arr[i] == majority) {
        count++;
    } else {
        count--;
        if (count == 0) {
            majority = arr[i];
            count = 1;
        }
    }
}

System.out.println("Majority element: " + majority);`,
        output: "Majority element: 4",
        explanation: [
          "Step 1: Use Boyer-Moore Voting Algorithm.",
          "Step 2: Maintain a candidate and its count.",
          "Step 3: If same as candidate, increment count; else decrement.",
          "Step 4: If count becomes 0, change candidate.",
          "Key point: This is O(n) time and O(1) space solution.",
        ],
      },
      {
        id: "array-ex-a-4",
        title: "Wave sort (alternating peaks and valleys)",
        code: `int[] arr = {10, 5, 6, 3, 2, 20, 100, 80};

for (int i = 0; i < arr.length - 1; i += 2) {
    if (i > 0 && arr[i] < arr[i - 1]) {
        int temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;
    }
    if (i < arr.length - 1 && arr[i] < arr[i + 1]) {
        int temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }
}

System.out.println("Wave sorted array:");
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Wave sorted array:\n10 5 6 2 20 3 100 80 ",
        explanation: [
          "Step 1: Traverse array and swap elements at even indices.",
          "Step 2: Ensure arr[0] >= arr[1] <= arr[2] >= arr[3]...",
          "Step 3: Swap with previous if current is smaller.",
          "Step 4: Swap with next if current is smaller.",
          "Key point: Creates wave pattern: peak, valley, peak, valley...",
        ],
      },
      {
        id: "array-ex-a-5",
        title: "Find equilibrium index",
        code: `int[] arr = {-7, 1, 5, 2, -4, 3, 0};
int totalSum = 0;
int leftSum = 0;

for (int i = 0; i < arr.length; i++) {
    totalSum = totalSum + arr[i];
}

for (int i = 0; i < arr.length; i++) {
    totalSum = totalSum - arr[i];
    if (leftSum == totalSum) {
        System.out.println("Equilibrium index: " + i);
    }
    leftSum = leftSum + arr[i];
}`,
        output: "Equilibrium index: 3",
        explanation: [
          "Step 1: Calculate total sum of array.",
          "Step 2: For each index, subtract element from totalSum (right sum).",
          "Step 3: Compare leftSum with rightSum (totalSum).",
          "Step 4: If equal, it's equilibrium index.",
          "Step 5: Add current element to leftSum for next iteration.",
          "Key point: Equilibrium index: sum of left = sum of right. Index 3: (-7+1+5) = (2-4+3+0) = -1.",
        ],
      },
      {
        id: "array-ex-a-6",
        title: "Trapping rain water",
        code: `int[] height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
int n = height.length;
int[] leftMax = new int[n];
int[] rightMax = new int[n];
int water = 0;

leftMax[0] = height[0];
for (int i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
}

rightMax[n - 1] = height[n - 1];
for (int i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
}

for (int i = 0; i < n; i++) {
    water = water + (Math.min(leftMax[i], rightMax[i]) - height[i]);
}

System.out.println("Trapped water: " + water);`,
        output: "Trapped water: 6",
        explanation: [
          "Step 1: Calculate maximum height to the left of each bar.",
          "Step 2: Calculate maximum height to the right of each bar.",
          "Step 3: Water trapped at each position = min(leftMax, rightMax) - height.",
          "Step 4: Sum water trapped at all positions.",
          "Key point: Water trapped depends on the minimum of left and right maximums.",
        ],
      },
      {
        id: "array-ex-a-7",
        title: "Find subarray with given sum",
        code: `int[] arr = {1, 4, 20, 3, 10, 5};
int target = 33;
int start = 0;
int currentSum = 0;
boolean found = false;

for (int end = 0; end < arr.length; end++) {
    currentSum = currentSum + arr[end];
    
    while (currentSum > target && start < end) {
        currentSum = currentSum - arr[start];
        start++;
    }
    
    if (currentSum == target) {
        System.out.println("Subarray found from index " + start + " to " + end);
        found = true;
        break;
    }
}

if (!found) {
    System.out.println("No subarray found");
}`,
        output: "Subarray found from index 2 to 4",
        explanation: [
          "Step 1: Use sliding window technique.",
          "Step 2: Add elements to currentSum until it equals or exceeds target.",
          "Step 3: If exceeds, remove elements from start.",
          "Step 4: If equals target, subarray found.",
          "Key point: This is O(n) solution for positive numbers only.",
        ],
      },
      {
        id: "array-ex-a-8",
        title: "Sort array of 0s, 1s, and 2s (Dutch National Flag)",
        code: `int[] arr = {0, 1, 2, 0, 1, 2, 1, 0, 2};
int low = 0, mid = 0, high = arr.length - 1;

while (mid <= high) {
    if (arr[mid] == 0) {
        int temp = arr[low];
        arr[low] = arr[mid];
        arr[mid] = temp;
        low++;
        mid++;
    } else if (arr[mid] == 1) {
        mid++;
    } else {
        int temp = arr[mid];
        arr[mid] = arr[high];
        arr[high] = temp;
        high--;
    }
}

System.out.println("Sorted array:");
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Sorted array:\n0 0 0 1 1 1 2 2 2 ",
        explanation: [
          "Step 1: Maintain three pointers: low, mid, high.",
          "Step 2: 0s go to low region, 1s stay in mid, 2s go to high region.",
          "Step 3: Swap 0s with low, 2s with high, keep 1s in middle.",
          "Step 4: Move pointers accordingly.",
          "Key point: This is O(n) single-pass solution.",
        ],
      },
      {
        id: "array-ex-a-9",
        title: "Find maximum subarray sum (Kadane's Algorithm)",
        code: `int[] arr = {-2, -3, 4, -1, -2, 1, 5, -3};
int maxSoFar = arr[0];
int maxEndingHere = arr[0];

for (int i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
}

System.out.println("Maximum subarray sum: " + maxSoFar);`,
        output: "Maximum subarray sum: 7",
        explanation: [
          "Step 1: Initialize maxSoFar and maxEndingHere with first element.",
          "Step 2: For each element, decide: start new subarray or extend existing.",
          "Step 3: maxEndingHere = max(current element, current element + maxEndingHere).",
          "Step 4: Update maxSoFar if maxEndingHere is greater.",
          "Key point: Kadane's algorithm finds maximum sum contiguous subarray in O(n).",
        ],
      },
      {
        id: "array-ex-a-10",
        title: "Left rotate array by k positions",
        code: `int[] arr = {1, 2, 3, 4, 5, 6, 7};
int k = 3;
int n = arr.length;
k = k % n;  // Handle k > n

int[] temp = new int[k];
for (int i = 0; i < k; i++) {
    temp[i] = arr[i];
}

for (int i = 0; i < n - k; i++) {
    arr[i] = arr[i + k];
}

for (int i = 0; i < k; i++) {
    arr[n - k + i] = temp[i];
}

System.out.println("Rotated array:");
for (int i = 0; i < n; i++) {
    System.out.print(arr[i] + " ");
}`,
        output: "Rotated array:\n4 5 6 7 1 2 3 ",
        explanation: [
          "Step 1: Store first k elements in temporary array.",
          "Step 2: Shift remaining elements to the left.",
          "Step 3: Copy temporary elements to the end.",
          "Step 4: k % n handles cases where k > array size.",
          "Key point: Left rotation by k moves first k elements to the end.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "Linear Search",
      code: `int[] arr = {10, 20, 30, 40, 50};
int target = 30;
int index = -1;

for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
        index = i;
        break;
    }
}

System.out.println("Found at index: " + index);`,
      trace: [
        { line: 1, explanation: "arr = [10, 20, 30, 40, 50]. Memory: arr → [10, 20, 30, 40, 50]" },
        { line: 2, explanation: "target = 30. Memory: target → 30" },
        { line: 3, explanation: "index = -1. Memory: index → -1" },
        { line: 4, explanation: "i = 0. Check: 0 < 5 is true." },
        { line: 5, explanation: "arr[0] = 10. Is 10 == 30? No." },
        { line: 4, explanation: "i = 1. Check: 1 < 5 is true." },
        { line: 5, explanation: "arr[1] = 20. Is 20 == 30? No." },
        { line: 4, explanation: "i = 2. Check: 2 < 5 is true." },
        { line: 5, explanation: "arr[2] = 30. Is 30 == 30? Yes! index = 2. Break." },
        { line: 9, explanation: "Print: 'Found at index: 2'" },
      ],
    },
    {
      title: "Bubble Sort",
      code: `int[] arr = {5, 2, 8, 1, 9};
int n = arr.length;

for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}`,
      trace: [
        { line: 1, explanation: "arr = [5, 2, 8, 1, 9]. n = 5" },
        { line: 3, explanation: "i = 0. Outer loop iteration 1." },
        { line: 4, explanation: "j = 0. Compare arr[0]=5 with arr[1]=2. 5 > 2, swap. arr = [2, 5, 8, 1, 9]" },
        { line: 4, explanation: "j = 1. Compare arr[1]=5 with arr[2]=8. 5 < 8, no swap." },
        { line: 4, explanation: "j = 2. Compare arr[2]=8 with arr[3]=1. 8 > 1, swap. arr = [2, 5, 1, 8, 9]" },
        { line: 4, explanation: "j = 3. Compare arr[3]=8 with arr[4]=9. 8 < 9, no swap." },
        { line: 3, explanation: "i = 1. Outer loop iteration 2." },
        { line: 4, explanation: "j = 0. Compare arr[0]=2 with arr[1]=5. 2 < 5, no swap." },
        { line: 4, explanation: "j = 1. Compare arr[1]=5 with arr[2]=1. 5 > 1, swap. arr = [2, 1, 5, 8, 9]" },
        { line: 4, explanation: "j = 2. Compare arr[2]=5 with arr[3]=8. 5 < 8, no swap." },
        { line: 3, explanation: "i = 2. Outer loop iteration 3." },
        { line: 4, explanation: "j = 0. Compare arr[0]=2 with arr[1]=1. 2 > 1, swap. arr = [1, 2, 5, 8, 9]" },
        { line: 4, explanation: "j = 1. Compare arr[1]=2 with arr[2]=5. 2 < 5, no swap." },
        { line: 3, explanation: "i = 3. Outer loop iteration 4." },
        { line: 4, explanation: "j = 0. Compare arr[0]=1 with arr[1]=2. 1 < 2, no swap." },
        { line: 3, explanation: "Array is now sorted: [1, 2, 5, 8, 9]" },
      ],
    },
    {
      title: "Binary Search",
      code: `int[] arr = {10, 20, 30, 40, 50, 60, 70};
int target = 40;
int left = 0, right = 6;
int index = -1;

while (left <= right) {
    int mid = (left + right) / 2;
    if (arr[mid] == target) {
        index = mid;
        break;
    } else if (arr[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}`,
      trace: [
        { line: 1, explanation: "arr = [10, 20, 30, 40, 50, 60, 70]. target = 40" },
        { line: 2, explanation: "left = 0, right = 6" },
        { line: 5, explanation: "Iteration 1: mid = (0+6)/2 = 3. arr[3] = 40. Found! index = 3. Break." },
        { line: 10, explanation: "Print: 'Found at index 3'" },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "array-ob-1",
      question: `int[] arr = {5, 10, 15, 20};
System.out.println(arr[2]);`,
      answer: "15",
      explanation: "arr[2] accesses the third element (index 2), which is 15.",
    },
    {
      id: "array-ob-2",
      question: `int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}`,
      answer: "1 2 3 4 5 ",
      explanation: "Loop prints all elements from index 0 to 4.",
    },
    {
      id: "array-ob-3",
      question: `int[] arr = {10, 20, 30};
arr[1] = 100;
System.out.println(arr[1]);`,
      answer: "100",
      explanation: "arr[1] is modified to 100, so it prints 100.",
    },
    {
      id: "array-ob-4",
      question: `int[] arr = {2, 4, 6, 8};
int sum = 0;
for (int i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
}
System.out.println(sum);`,
      answer: "20",
      explanation: "Sum = 2+4+6+8 = 20.",
    },
    {
      id: "array-ob-5",
      question: `int[] arr = {5, 3, 8, 1, 9};
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}
System.out.println(max);`,
      answer: "9",
      explanation: "Maximum element in array is 9.",
    },
    {
      id: "array-ob-6",
      question: `int[] arr = {1, 2, 3, 4, 5};
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.print(arr[i] + " ");
}`,
      answer: "5 4 3 2 1 ",
      explanation: "Loop prints elements in reverse order from last index to 0.",
    },
    {
      id: "array-ob-7",
      question: `int[] arr = {2, 3, 4, 5};
int prod = 1;
for (int i = 0; i < arr.length; i++) {
    prod = prod * arr[i];
}
System.out.println(prod);`,
      answer: "120",
      explanation: "Product = 2*3*4*5 = 120.",
    },
    {
      id: "array-ob-8",
      question: `int[] arr = {10, 20, 30, 40, 50};
System.out.println(arr.length);`,
      answer: "5",
      explanation: "arr.length returns the size of the array, which is 5.",
    },
    {
      id: "array-ob-9",
      question: `int[] arr = {1, 2, 3, 4, 5};
int count = 0;
for (int i = 0; i < arr.length; i++) {
    if (arr[i] % 2 == 0) {
        count++;
    }
}
System.out.println(count);`,
      answer: "2",
      explanation: "Even numbers: 2 and 4. Count = 2.",
    },
    {
      id: "array-ob-10",
      question: `int[] arr = {5, 5, 5, 5};
int sum = 0;
for (int i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
}
System.out.println(sum / arr.length);`,
      answer: "5",
      explanation: "Sum = 20. Average = 20/4 = 5.",
    },
    {
      id: "array-ob-11",
      question: `int[] arr = {1, 2, 3};
arr[0] = arr[2];
System.out.println(arr[0] + " " + arr[2]);`,
      answer: "3 3",
      explanation: "arr[0] is assigned arr[2] (value 3). Both become 3.",
    },
    {
      id: "array-ob-12",
      question: `int[] arr = {10, 20, 30};
for (int i = 0; i <= arr.length; i++) {
    System.out.print(arr[i] + " ");
}`,
      answer: "ArrayIndexOutOfBoundsException",
      explanation: "Loop goes to i = 3, but valid indices are 0, 1, 2. arr[3] causes exception.",
    },
    {
      id: "array-ob-13",
      question: `int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length - 1; i++) {
    System.out.print(arr[i] + arr[i+1] + " ");
}`,
      answer: "3 5 7 9 ",
      explanation: "Prints sum of adjacent pairs: 1+2=3, 2+3=5, 3+4=7, 4+5=9.",
    },
    {
      id: "array-ob-14",
      question: `int[] arr = {2, 4, 6, 8};
int i = 0;
while (i < arr.length) {
    System.out.print(arr[i] + " ");
    i = i + 2;
}`,
      answer: "2 6 ",
      explanation: "Prints elements at even indices: arr[0]=2, arr[2]=6.",
    },
    {
      id: "array-ob-15",
      question: `int[] arr = {1, 2, 3, 4, 5};
int[] brr = arr;
brr[2] = 100;
System.out.println(arr[2]);`,
      answer: "100",
      explanation: "Arrays are reference types. brr and arr point to same array. Changing brr[2] changes arr[2].",
    },
    {
      id: "array-ob-16",
      question: `int[] arr = new int[3];
System.out.println(arr[0] + " " + arr[1] + " " + arr[2]);`,
      answer: "0 0 0",
      explanation: "New int array is initialized with default value 0 for all elements.",
    },
    {
      id: "array-ob-17",
      question: `int[] arr = {5, 1, 4, 2, 3};
int min = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
        min = arr[i];
    }
}
System.out.println(min);`,
      answer: "1",
      explanation: "Minimum element in array is 1.",
    },
    {
      id: "array-ob-18",
      question: `int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length; i++) {
    if (arr[i] % 2 != 0) {
        System.out.print(arr[i] + " ");
    }
}`,
      answer: "1 3 5 ",
      explanation: "Prints only odd numbers: 1, 3, 5.",
    },
    {
      id: "array-ob-19",
      question: `int[] arr = {10, 20, 30};
System.out.println(arr[arr.length - 1]);`,
      answer: "30",
      explanation: "arr.length - 1 = 2. arr[2] is the last element, which is 30.",
    },
    {
      id: "array-ob-20",
      question: `int[] arr = {1, 2, 3, 4, 5};
int sum = 0;
for (int i = 0; i < arr.length; i++) {
    sum = sum + i;
}
System.out.println(sum);`,
      answer: "10",
      explanation: "Sum of indices 0+1+2+3+4 = 10, not array elements.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "array-ef-1",
      question: `int[] arr = {1, 2, 3};
System.out.println(arr[3]);`,
      error: "ArrayIndexOutOfBoundsException. The array has indices 0, 1, 2. Accessing arr[3] is out of bounds.",
      corrected: `int[] arr = {1, 2, 3};
System.out.println(arr[2]);  // Access last valid index`,
    },
    {
      id: "array-ef-2",
      question: `int[] arr = new int[5];
arr[5] = 100;`,
      error: "ArrayIndexOutOfBoundsException. Array of size 5 has indices 0 to 4. arr[5] is out of bounds.",
      corrected: `int[] arr = new int[5];
arr[4] = 100;  // Last valid index is 4`,
    },
    {
      id: "array-ef-3",
      question: `int[] arr = {1, 2, 3};
System.out.println(arr.length());`,
      error: "Compilation error. length is a property, not a method. Use arr.length (no parentheses).",
      corrected: `int[] arr = {1, 2, 3};
System.out.println(arr.length);`,
    },
    {
      id: "array-ef-4",
      question: `int[] arr;
System.out.println(arr[0]);`,
      error: "Compilation error. Array is declared but not initialized. Must allocate memory: arr = new int[5];",
      corrected: `int[] arr = new int[5];
System.out.println(arr[0]);`,
    },
    {
      id: "array-ef-5",
      question: `int[] arr = {1, 2, 3};
for (int i = 0; i <= arr.length; i++) {
    System.out.println(arr[i]);
}`,
      error: "ArrayIndexOutOfBoundsException. Loop condition should be i < arr.length, not i <= arr.length.",
      corrected: `int[] arr = {1, 2, 3};
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`,
    },
    {
      id: "array-ef-6",
      question: `int[] arr = {1, 2, 3};
arr = {4, 5, 6};`,
      error: "Compilation error. Cannot use array initializer in assignment. Must use new keyword: arr = new int[]{4, 5, 6};",
      corrected: `int[] arr = {1, 2, 3};
arr = new int[]{4, 5, 6};`,
    },
    {
      id: "array-ef-7",
      question: `int n = 5;
int[] arr = new int[n];
arr[n] = 10;`,
      error: "ArrayIndexOutOfBoundsException. Array of size 5 has indices 0 to 4. arr[5] is out of bounds.",
      corrected: `int n = 5;
int[] arr = new int[n];
arr[n-1] = 10;  // Last valid index is n-1`,
    },
    {
      id: "array-ef-8",
      question: `int[] arr1 = {1, 2, 3};
int[] arr2 = arr1;
arr2[0] = 100;
System.out.println(arr1[0]);`,
      error: "No error. Arrays are reference types. arr1 and arr2 point to the same array. Changing arr2[0] also changes arr1[0]. Output: 100.",
      corrected: "No error. This demonstrates that arrays are passed by reference.",
    },
    {
      id: "array-ef-9",
      question: `int[] arr = new int[3];
System.out.println(arr[0]);`,
      error: "No error. Array is initialized with default values. arr[0] prints 0 (default for int).",
      corrected: "No error. Code is correct.",
    },
    {
      id: "array-ef-10",
      question: `int[] arr = {1, 2, 3};
for (int i = 1; i <= arr.length; i++) {
    System.out.println(arr[i]);
}`,
      error: "ArrayIndexOutOfBoundsException. Loop starts at 1 (skips arr[0]) and goes to arr[3] (out of bounds).",
      corrected: `int[] arr = {1, 2, 3};
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`,
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    { id: "array-fb-1", question: "An array stores multiple values of the _____ data type.", answer: "same" },
    { id: "array-fb-2", question: "Array indices in Java start at _____ .", answer: "0" },
    { id: "array-fb-3", question: "The last index of an array of size n is _____ .", answer: "n-1" },
    { id: "array-fb-4", question: "The length of an array is accessed using _____ .", answer: "arr.length" },
    { id: "array-fb-5", question: "Arrays in Java are created using the _____ keyword.", answer: "new" },
    { id: "array-fb-6", question: "Default value for int array elements is _____ .", answer: "0" },
    { id: "array-fb-7", question: "Default value for boolean array elements is _____ .", answer: "false" },
    { id: "array-fb-8", question: "The _____ search requires the array to be sorted.", answer: "binary" },
    { id: "array-fb-9", question: "Linear search has time complexity _____ .", answer: "O(n)" },
    { id: "array-fb-10", question: "Binary search has time complexity _____ .", answer: "O(log n)" },
    { id: "array-fb-11", question: "Bubble sort repeatedly _____ adjacent elements if they are in wrong order.", answer: "swaps" },
    { id: "array-fb-12", question: "Selection sort finds the _____ element and places it at the beginning.", answer: "minimum" },
    { id: "array-fb-13", question: "Insertion sort builds the sorted array _____ element at a time.", answer: "one" },
    { id: "array-fb-14", question: "Arrays are passed to methods by _____ .", answer: "reference" },
    { id: "array-fb-15", question: "The _____ exception occurs when accessing an invalid array index.", answer: "ArrayIndexOutOfBoundsException" },
    { id: "array-fb-16", question: "To copy an array, use _____ loop or System.arraycopy().", answer: "for" },
    { id: "array-fb-17", question: "The enhanced for loop is also called _____ loop.", answer: "for-each" },
    { id: "array-fb-18", question: "To find array size, use _____ (not a method).", answer: "length" },
    { id: "array-fb-19", question: "Arrays of the same type can be _____ using loops.", answer: "merged" },
    { id: "array-fb-20", question: "The _____ sort is the simplest but slowest sorting algorithm.", answer: "bubble" },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "array-mcq-1",
      question: "What is the index of the first element in a Java array?",
      options: ["1", "0", "-1", "Depends on size"],
      answer: 1,
      explanation: "Array indices in Java start at 0. The first element is at index 0.",
    },
    {
      id: "array-mcq-2",
      question: "What is the output?\nint[] arr = {10, 20, 30};\nSystem.out.println(arr.length);",
      options: ["2", "3", "4", "Compilation error"],
      answer: 1,
      explanation: "arr.length returns 3, which is the size of the array.",
    },
    {
      id: "array-mcq-3",
      question: "What is the default value of int array elements?",
      options: ["1", "0", "-1", "null"],
      answer: 1,
      explanation: "Default value for int array elements is 0.",
    },
    {
      id: "array-mcq-4",
      question: "Which exception is thrown when accessing an invalid array index?",
      options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ArithmeticException"],
      answer: 1,
      explanation: "ArrayIndexOutOfBoundsException is thrown when trying to access an index that doesn't exist.",
    },
    {
      id: "array-mcq-5",
      question: "What is the last valid index of an array of size 10?",
      options: ["9", "10", "11", "0"],
      answer: 0,
      explanation: "Last valid index is size - 1 = 10 - 1 = 9.",
    },
    {
      id: "array-mcq-6",
      question: "Which search algorithm has O(log n) time complexity?",
      options: ["Linear Search", "Binary Search", "Bubble Sort", "Selection Sort"],
      answer: 1,
      explanation: "Binary search has O(log n) time complexity, but requires the array to be sorted.",
    },
    {
      id: "array-mcq-7",
      question: "Which sorting algorithm is the simplest but slowest?",
      options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Binary Search"],
      answer: 2,
      explanation: "Bubble sort is the simplest to understand but has O(n²) time complexity, making it slow for large arrays.",
    },
    {
      id: "array-mcq-8",
      question: "What is the time complexity of linear search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 2,
      explanation: "Linear search checks each element sequentially, so it's O(n).",
    },
    {
      id: "array-mcq-9",
      question: "Can you change the size of an array after creation in Java?",
      options: ["Yes", "No", "Only for primitive types", "Only for objects"],
      answer: 1,
      explanation: "Array size is fixed once created. To change size, you need to create a new array.",
    },
    {
      id: "array-mcq-10",
      question: "How are arrays passed to methods in Java?",
      options: ["By value", "By reference", "By copy", "Cannot be passed"],
      answer: 1,
      explanation: "Arrays are passed by reference. Changes in the method affect the original array.",
    },
    {
      id: "array-mcq-11",
      question: "What is the output?\nint[] arr = {1, 2, 3};\nfor (int i = 0; i < arr.length; i++) {\n    System.out.print(arr[i] + \" \");\n}",
      options: ["1 2 3 ", "0 1 2 3 ", "1 2 ", "Compilation error"],
      answer: 0,
      explanation: "Loop prints all three elements: 1, 2, 3.",
    },
    {
      id: "array-mcq-12",
      question: "Which loop is best for traversing an array when you don't need the index?",
      options: ["for loop", "while loop", "enhanced for loop", "do-while loop"],
      answer: 2,
      explanation: "Enhanced for loop (for-each) is best when you don't need the index.",
    },
    {
      id: "array-mcq-13",
      question: "What is the output?\nint[] arr = {5, 3, 8, 1};\nint max = arr[0];\nfor (int i = 1; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n}\nSystem.out.println(max);",
      options: ["5", "8", "3", "1"],
      answer: 1,
      explanation: "Maximum element in array is 8.",
    },
    {
      id: "array-mcq-14",
      question: "Binary search can only be applied to:",
      options: ["Any array", "Sorted array", "Array of size > 10", "Array of integers"],
      answer: 1,
      explanation: "Binary search requires the array to be sorted in ascending or descending order.",
    },
    {
      id: "array-mcq-15",
      question: "What does arr.length return?",
      options: ["Last index", "Number of elements", "First index", "Memory size"],
      answer: 1,
      explanation: "arr.length returns the number of elements in the array.",
    },
    {
      id: "array-mcq-16",
      question: "Which sorting algorithm finds the minimum element and places it at the beginning?",
      options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"],
      answer: 1,
      explanation: "Selection sort finds the minimum element in the unsorted portion and swaps it with the first element.",
    },
    {
      id: "array-mcq-17",
      question: "What is the output?\nint[] arr = {2, 4, 6};\nSystem.out.println(arr[1] + arr[2]);",
      options: ["6", "10", "8", "Compilation error"],
      answer: 1,
      explanation: "arr[1] = 4, arr[2] = 6. Sum = 4 + 6 = 10.",
    },
    {
      id: "array-mcq-18",
      question: "How do you declare an array of 5 integers?",
      options: ["int arr(5);", "int[5] arr;", "int[] arr = new int[5];", "array arr = new int[5];"],
      answer: 2,
      explanation: "Correct syntax: int[] arr = new int[5];",
    },
    {
      id: "array-mcq-19",
      question: "What is the output?\nint[] arr = {1, 2, 3, 4};\nSystem.out.println(arr[arr.length - 1]);",
      options: ["1", "3", "4", "Compilation error"],
      answer: 2,
      explanation: "arr.length - 1 = 3. arr[3] is the last element, which is 4.",
    },
    {
      id: "array-mcq-20",
      question: "Which of the following is NOT a valid array declaration?",
      options: ["int[] arr;", "int arr[];", "int arr[5];", "int[] arr = new int[5];"],
      answer: 2,
      explanation: "int arr[5]; is not valid in Java. Size is not specified in declaration.",
    },
    {
      id: "array-mcq-21",
      question: "What is the output?\nint[] arr = {1, 2, 3};\narr[0] = arr[1];\narr[1] = arr[2];\nSystem.out.println(arr[0] + arr[1]);",
      options: ["3", "4", "5", "6"],
      answer: 2,
      explanation: "After operations: arr[0]=2, arr[1]=3. Sum = 2+3 = 5.",
    },
    {
      id: "array-mcq-22",
      question: "The enhanced for loop is also known as:",
      options: ["for-each loop", "while loop", "do-while loop", "infinite loop"],
      answer: 0,
      explanation: "Enhanced for loop is also called for-each loop. Syntax: for(type var : array).",
    },
    {
      id: "array-mcq-23",
      question: "What is the output?\nint[] arr = new int[4];\nSystem.out.println(arr[0]);",
      options: ["null", "0", "Compilation error", "Runtime error"],
      answer: 1,
      explanation: "New int array is initialized with default value 0 for all elements.",
    },
    {
      id: "array-mcq-24",
      question: "Which algorithm is used to find the maximum subarray sum?",
      options: ["Bubble Sort", "Kadane's Algorithm", "Binary Search", "Linear Search"],
      answer: 1,
      explanation: "Kadane's Algorithm is used to find the maximum sum contiguous subarray in O(n) time.",
    },
    {
      id: "array-mcq-25",
      question: "What happens when you assign one array to another in Java?",
      options: ["Elements are copied", "Both reference the same array", "Compilation error", "Runtime error"],
      answer: 1,
      explanation: "Arrays are reference types. Assignment makes both variables point to the same array.",
    },
    {
      id: "array-mcq-26",
      question: "Which sorting algorithm is most efficient for small arrays?",
      options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "All are same"],
      answer: 1,
      explanation: "Insertion sort is efficient for small arrays and nearly sorted arrays.",
    },
    {
      id: "array-mcq-27",
      question: "What is the output?\nint[] arr = {1, 2, 3};\nfor (int i = 0; i < 3; i++) {\n    System.out.print(arr[i] + \" \");\n}",
      options: ["1 2 3 ", "0 1 2 3 ", "1 2 ", "Compilation error"],
      answer: 0,
      explanation: "Loop runs 3 times (i = 0, 1, 2) and prints all elements.",
    },
    {
      id: "array-mcq-28",
      question: "In which scenario is do-while loop useful with arrays?",
      options: ["Array traversal", "Menu-driven array operations", "Array sorting", "Array declaration"],
      answer: 1,
      explanation: "Do-while is useful for menu-driven programs where menu must display at least once.",
    },
    {
      id: "array-mcq-29",
      question: "What is the output?\nint[] arr = {5, 10, 15, 20};\nSystem.out.println(arr[1] + arr[3]);",
      options: ["15", "25", "30", "Compilation error"],
      answer: 2,
      explanation: "arr[1] = 10, arr[3] = 20. Sum = 10 + 20 = 30.",
    },
    {
      id: "array-mcq-30",
      question: "Which of the following is true about arrays in Java?",
      options: ["Size can be changed", "Size is fixed", "Can store different types", "Indices start at 1"],
      answer: 1,
      explanation: "Array size is fixed once created. All elements must be of the same type. Indices start at 0.",
    },
  ],

  // ========== 10. TRUE/FALSE ==========
  trueFalse: [
    { id: "array-tf-1", question: "Array indices in Java start at 0.", answer: true, explanation: "The first element of an array is at index 0." },
    { id: "array-tf-2", question: "The length of an array can be changed after creation.", answer: false, explanation: "Array size is fixed once created. You cannot change it." },
    { id: "array-tf-3", question: "Arrays can store elements of different data types.", answer: false, explanation: "All elements in an array must be of the same data type." },
    { id: "array-tf-4", question: "arr.length is a method.", answer: false, explanation: "arr.length is a property (field), not a method. No parentheses needed." },
    { id: "array-tf-5", question: "The last index of an array is arr.length.", answer: false, explanation: "The last index is arr.length - 1, not arr.length." },
    { id: "array-tf-6", question: "Binary search requires the array to be sorted.", answer: true, explanation: "Binary search only works on sorted arrays." },
    { id: "array-tf-7", question: "Linear search has O(log n) time complexity.", answer: false, explanation: "Linear search has O(n) time complexity. Binary search has O(log n)." },
    { id: "array-tf-8", question: "Arrays are passed to methods by value.", answer: false, explanation: "Arrays are passed by reference. Changes in the method affect the original array." },
    { id: "array-tf-9", question: "Default value for int array elements is 0.", answer: true, explanation: "When an int array is created, all elements are initialized to 0." },
    { id: "array-tf-10", question: "Default value for String array elements is null.", answer: true, explanation: "Object arrays (including String) are initialized with null." },
    { id: "array-tf-11", question: "Bubble sort is the most efficient sorting algorithm.", answer: false, explanation: "Bubble sort is simple but inefficient (O(n²)). Quick sort and merge sort are more efficient." },
    { id: "array-tf-12", question: "Selection sort finds the minimum element in each iteration.", answer: true, explanation: "Selection sort finds the minimum element in the unsorted portion and places it at the beginning." },
    { id: "array-tf-13", question: "Insertion sort is efficient for nearly sorted arrays.", answer: true, explanation: "Insertion sort performs well on nearly sorted or small arrays." },
    { id: "array-tf-14", question: "ArrayIndexOutOfBoundsException is a compile-time error.", answer: false, explanation: "It's a runtime exception (checked at runtime, not compile time)." },
    { id: "array-tf-15", question: "You can create an array without specifying its size.", answer: false, explanation: "Array size must be specified when creating the array (except when using array initializer)." },
    { id: "array-tf-16", question: "Two arrays can be compared using == operator.", answer: false, explanation: "== compares references, not contents. Use Arrays.equals() to compare array contents." },
    { id: "array-tf-17", question: "The enhanced for loop can modify array elements.", answer: false, explanation: "Enhanced for loop variable is a copy. Modifying it doesn't change the original array." },
    { id: "array-tf-18", question: "Arrays in Java are objects.", answer: true, explanation: "Arrays in Java are objects that inherit from Object class." },
    { id: "array-tf-19", question: "You can create an array of primitives and objects.", answer: true, explanation: "Java supports arrays of both primitives (int[], double[]) and objects (String[], etc.)." },
    { id: "array-tf-20", question: "The length of an array is arr.length().", answer: false, explanation: "length is a property, not a method. Use arr.length (no parentheses)." },
  ],

  // ========== 11. SHORT ANSWER QUESTIONS ==========
  shortAnswerQuestions: [
    { id: "array-sa-1", question: "What is an array?", answer: "An array is a collection of elements of the same data type stored at contiguous memory locations. It allows storing multiple values in a single variable, with each element accessed by its index." },
    { id: "array-sa-2", question: "What is the default value of array elements in Java?", answer: "Default values: 0 for numeric types (int, double, etc.), false for boolean, and null for object types (String, etc.)." },
    { id: "array-sa-3", question: "What is ArrayIndexOutOfBoundsException?", answer: "It's a runtime exception that occurs when you try to access an array element with an invalid index (e.g., accessing arr[5] in an array of size 5, where valid indices are 0-4)." },
    { id: "array-sa-4", question: "What is the difference between arr.length and arr.length()?", answer: "arr.length is a property (field) that returns the size of the array. arr.length() is not valid for arrays (it's used for String). For arrays, use arr.length without parentheses." },
    { id: "array-sa-5", question: "Can you change the size of an array after creation?", answer: "No, array size is fixed once created. To 'resize', you need to create a new array and copy elements from the old array." },
    { id: "array-sa-6", question: "What is linear search?", answer: "Linear search is a searching algorithm that checks each element of the array sequentially until the target element is found or the end of the array is reached. Time complexity: O(n)." },
    { id: "array-sa-7", question: "What is binary search?", answer: "Binary search is an efficient searching algorithm that works on sorted arrays. It repeatedly divides the search interval in half. Time complexity: O(log n)." },
    { id: "array-sa-8", question: "What is bubble sort?", answer: "Bubble sort is a simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order. Time complexity: O(n²)." },
    { id: "array-sa-9", question: "What is selection sort?", answer: "Selection sort finds the minimum element in the unsorted portion of the array and swaps it with the first element of the unsorted portion. Time complexity: O(n²)." },
    { id: "array-sa-10", question: "What is insertion sort?", answer: "Insertion sort builds the sorted array one element at a time by inserting each element into its correct position in the sorted portion. Time complexity: O(n²)." },
    { id: "array-sa-11", question: "Are arrays passed by value or by reference in Java?", answer: "Arrays are passed by reference. When you pass an array to a method, the method receives a reference to the original array, so changes made in the method affect the original array." },
    { id: "array-sa-12", question: "What is the enhanced for loop?", answer: "The enhanced for loop (for-each loop) is a simplified way to traverse arrays. Syntax: for(type var : array) { // code }. It doesn't provide the index." },
    { id: "array-sa-13", question: "What is the difference between == and equals() for arrays?", answer: "== compares references (memory addresses), not contents. equals() for arrays compares references too. To compare contents, use Arrays.equals(arr1, arr2)." },
    { id: "array-sa-14", question: "What is a jagged array?", answer: "A jagged array is a 2D array where each row can have a different number of columns. In Java, 2D arrays are actually arrays of arrays, so they can be jagged." },
    { id: "array-sa-15", question: "What is the time complexity of binary search?", answer: "Binary search has O(log n) time complexity because it divides the search space in half with each comparison." },
    { id: "array-sa-16", question: "Why does binary search require a sorted array?", answer: "Binary search works by comparing the target with the middle element and deciding which half to search. This only works if the array is sorted." },
    { id: "array-sa-17", question: "What is the difference between for loop and enhanced for loop for arrays?", answer: "For loop provides index access and allows modification of elements. Enhanced for loop is simpler but doesn't provide index and the loop variable is a copy." },
    { id: "array-sa-18", question: "What happens when you assign one array to another?", answer: "Both variables reference the same array object. Changes through one reference are visible through the other. This is because arrays are reference types." },
    { id: "array-sa-19", question: "What is the output of: int[] arr = new int[5]; System.out.println(arr[0]);", answer: "The output is 0. When an int array is created, all elements are initialized to the default value 0." },
    { id: "array-sa-20", question: "What is the difference between arr[0] and arr[1]?", answer: "arr[0] accesses the first element of the array (index 0). arr[1] accesses the second element (index 1). Array indices start at 0." },
  ],

  // ========== 12. LONG ANSWER QUESTIONS ==========
  longAnswerQuestions: [
    {
      id: "array-la-1",
      question: "Explain arrays in Java with syntax and examples.",
      answer: "An array is a collection of elements of the same data type stored at contiguous memory locations.\n\nDeclaration:\nint[] arr;  // or int arr[];\n\nCreation:\narr = new int[5];  // creates array of size 5\n\nCombined declaration and creation:\nint[] arr = new int[5];\n\nInitialization:\nint[] arr = {10, 20, 30, 40, 50};\n\nAccessing elements:\nint first = arr[0];  // first element\nint last = arr[4];   // last element\n\nModifying elements:\narr[2] = 100;  // changes 3rd element\n\nArray length:\nint size = arr.length;  // returns 5\n\nExample:\nint[] marks = {85, 90, 78, 92, 88};\nfor (int i = 0; i < marks.length; i++) {\n    System.out.println(marks[i]);\n}\n\nKey points:\n- Indices start at 0\n- Length is fixed\n- All elements must be same type\n- Default values: 0 for int, false for boolean, null for objects",
    },
    {
      id: "array-la-2",
      question: "Explain linear search and binary search with examples.",
      answer: "LINEAR SEARCH:\nLinear search checks each element sequentially until the target is found.\n\nAlgorithm:\n1. Start from first element.\n2. Compare each element with target.\n3. If found, return index.\n4. If not found after checking all elements, return -1.\n\nTime Complexity: O(n)\n\nExample:\nint[] arr = {10, 20, 30, 40};\nint target = 30;\nfor (int i = 0; i < arr.length; i++) {\n    if (arr[i] == target) {\n        System.out.println('Found at index ' + i);\n        break;\n    }\n}\n\nBINARY SEARCH:\nBinary search works on sorted arrays by repeatedly dividing the search interval in half.\n\nAlgorithm:\n1. Set left = 0, right = n-1.\n2. Calculate mid = (left + right) / 2.\n3. If arr[mid] == target, found.\n4. If arr[mid] < target, search right half (left = mid + 1).\n5. If arr[mid] > target, search left half (right = mid - 1).\n6. Repeat until found or left > right.\n\nTime Complexity: O(log n)\n\nExample:\nint[] arr = {10, 20, 30, 40, 50};\nint target = 30;\nint left = 0, right = 4;\nwhile (left <= right) {\n    int mid = (left + right) / 2;\n    if (arr[mid] == target) {\n        System.out.println('Found at index ' + mid);\n        break;\n    } else if (arr[mid] < target) {\n        left = mid + 1;\n    } else {\n        right = mid - 1;\n    }\n}\n\nKey difference: Binary search is much faster but requires sorted array.",
    },
    {
      id: "array-la-3",
      question: "Explain bubble sort, selection sort, and insertion sort with examples.",
      answer: "BUBBLE SORT:\nRepeatedly compares adjacent elements and swaps them if in wrong order. Largest elements 'bubble' to the end.\n\nAlgorithm:\nfor i = 0 to n-2:\n    for j = 0 to n-i-2:\n        if arr[j] > arr[j+1]:\n            swap(arr[j], arr[j+1])\n\nTime Complexity: O(n²)\n\nSELECTION SORT:\nFinds minimum element in unsorted portion and places it at the beginning.\n\nAlgorithm:\nfor i = 0 to n-2:\n    minIndex = i\n    for j = i+1 to n-1:\n        if arr[j] < arr[minIndex]:\n            minIndex = j\n    swap(arr[i], arr[minIndex])\n\nTime Complexity: O(n²)\n\nINSERTION SORT:\nBuilds sorted array one element at a time by inserting each element into its correct position.\n\nAlgorithm:\nfor i = 1 to n-1:\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n        arr[j+1] = arr[j]\n        j--\n    arr[j+1] = key\n\nTime Complexity: O(n²)\n\nComparison:\n- Bubble sort: Simple but inefficient, many swaps.\n- Selection sort: Fewer swaps than bubble sort.\n- Insertion sort: Efficient for small/nearly sorted arrays.",
    },
    {
      id: "array-la-4",
      question: "Write a program to find the sum and average of elements in an array.",
      answer: "Program to calculate sum and average:\n\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter number of elements: ');\n        int n = sc.nextInt();\n        \n        int[] arr = new int[n];\n        System.out.println('Enter elements:');\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n        \n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum = sum + arr[i];\n        }\n        \n        double average = (double) sum / n;\n        \n        System.out.println('Sum: ' + sum);\n        System.out.println('Average: ' + average);\n        \n        sc.close();\n    }\n}\n\nExample run:\nEnter number of elements: 5\nEnter elements:\n10 20 30 40 50\nSum: 150\nAverage: 30.0\n\nExplanation:\n1. Read n and create array of size n.\n2. Read n elements from user.\n3. Calculate sum by adding all elements.\n4. Calculate average by dividing sum by n (cast to double for decimal).",
    },
    {
      id: "array-la-5",
      question: "Write a program to search for an element in an array using both linear and binary search.",
      answer: "Program demonstrating both search methods:\n\nimport java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        int[] arr = {10, 20, 30, 40, 50, 60, 70};\n        System.out.print('Enter element to search: ');\n        int target = sc.nextInt();\n        \n        // Linear Search\n        int linearIndex = linearSearch(arr, target);\n        if (linearIndex != -1) {\n            System.out.println('Linear Search: Found at index ' + linearIndex);\n        } else {\n            System.out.println('Linear Search: Not found');\n        }\n        \n        // Binary Search (array must be sorted)\n        int binaryIndex = binarySearch(arr, target);\n        if (binaryIndex != -1) {\n            System.out.println('Binary Search: Found at index ' + binaryIndex);\n        } else {\n            System.out.println('Binary Search: Not found');\n        }\n        \n        sc.close();\n    }\n    \n    public static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) {\n                return i;\n            }\n        }\n        return -1;\n    }\n    \n    public static int binarySearch(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = (left + right) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}\n\nKey points:\n- Linear search: O(n), works on any array.\n- Binary search: O(log n), requires sorted array.",
    },
    {
      id: "array-la-6",
      question: "Write a program to sort an array using bubble sort.",
      answer: "Bubble Sort Program:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        \n        System.out.println('Original array:');\n        printArray(arr);\n        \n        bubbleSort(arr);\n        \n        System.out.println('\\nSorted array:');\n        printArray(arr);\n    }\n    \n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    // Swap\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                }\n            }\n        }\n    }\n    \n    public static void printArray(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + ' ');\n        }\n        System.out.println();\n    }\n}\n\nOutput:\nOriginal array:\n64 34 25 12 22 11 90\nSorted array:\n11 12 22 25 34 64 90\n\nHow it works:\n1. Outer loop runs n-1 times.\n2. Inner loop compares adjacent elements and swaps if needed.\n3. After each outer iteration, largest element is at correct position.\n4. Inner loop range decreases each time (n-i-1).",
    },
    {
      id: "array-la-7",
      question: "Explain how arrays are passed to methods in Java with an example.",
      answer: "In Java, arrays are passed to methods by reference. This means the method receives a reference to the original array, not a copy. Any changes made to the array inside the method affect the original array.\n\nExample:\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30};\n        \n        System.out.println('Before: ' + arr[0]);  // 10\n        modifyArray(arr);\n        System.out.println('After: ' + arr[0]);   // 100\n    }\n    \n    public static void modifyArray(int[] arr) {\n        arr[0] = 100;  // Modifies original array\n    }\n}\n\nOutput:\nBefore: 10\nAfter: 100\n\nExplanation:\n1. arr is created in main() with values {10, 20, 30}.\n2. modifyArray() receives reference to the same array.\n3. arr[0] is changed to 100 inside the method.\n4. The change is reflected in the original array.\n\nKey point: Arrays are reference types, so they behave differently from primitive types when passed to methods.",
    },
    {
      id: "array-la-8",
      question: "Write a program to merge two sorted arrays into a single sorted array.",
      answer: "Program to merge two sorted arrays:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr1 = {1, 3, 5, 7};\n        int[] arr2 = {2, 4, 6, 8};\n        \n        int[] merged = mergeArrays(arr1, arr2);\n        \n        System.out.println('Merged array:');\n        for (int i = 0; i < merged.length; i++) {\n            System.out.print(merged[i] + ' ');\n        }\n    }\n    \n    public static int[] mergeArrays(int[] arr1, int[] arr2) {\n        int n1 = arr1.length;\n        int n2 = arr2.length;\n        int[] merged = new int[n1 + n2];\n        \n        int i = 0, j = 0, k = 0;\n        \n        while (i < n1 && j < n2) {\n            if (arr1[i] <= arr2[j]) {\n                merged[k++] = arr1[i++];\n            } else {\n                merged[k++] = arr2[j++];\n            }\n        }\n        \n        while (i < n1) {\n            merged[k++] = arr1[i++];\n        }\n        \n        while (j < n2) {\n            merged[k++] = arr2[j++];\n        }\n        \n        return merged;\n    }\n}\n\nOutput:\nMerged array:\n1 2 3 4 5 6 7 8\n\nExplanation:\n1. Use three pointers: i for arr1, j for arr2, k for merged.\n2. Compare elements and copy smaller one to merged.\n3. Copy remaining elements from whichever array has leftovers.\n4. Time complexity: O(n1 + n2).",
    },
    {
      id: "array-la-9",
      question: "What is the output? Trace the code.\nint[] arr = {2, 4, 6, 8};\nfor (int i = 0; i < arr.length; i++) {\n    arr[i] = arr[i] * 2;\n}\nfor (int i = 0; i < arr.length; i++) {\n    System.out.print(arr[i] + ' ');\n}",
      answer: "Output: 4 8 12 16\n\nTrace:\n- Initial: arr = [2, 4, 6, 8]\n- First loop (i=0): arr[0] = 2*2 = 4. arr = [4, 4, 6, 8]\n- First loop (i=1): arr[1] = 4*2 = 8. arr = [4, 8, 6, 8]\n- First loop (i=2): arr[2] = 6*2 = 12. arr = [4, 8, 12, 8]\n- First loop (i=3): arr[3] = 8*2 = 16. arr = [4, 8, 12, 16]\n- Second loop prints: 4 8 12 16\n\nKey insight: First loop doubles each element. Second loop prints the modified array.",
    },
    {
      id: "array-la-10",
      question: "Write a program to find the frequency of each element in an array.",
      answer: "Program to find frequency of each element:\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 2, 3, 3, 3, 4, 4, 4, 4};\n        int[] visited = new int[arr.length];\n        \n        for (int i = 0; i < arr.length; i++) {\n            if (visited[i] == 1) continue;\n            \n            int count = 1;\n            for (int j = i + 1; j < arr.length; j++) {\n                if (arr[i] == arr[j]) {\n                    count++;\n                    visited[j] = 1;\n                }\n            }\n            \n            System.out.println(arr[i] + ' appears ' + count + ' times');\n        }\n    }\n}\n\nOutput:\n1 appears 1 times\n2 appears 2 times\n3 appears 3 times\n4 appears 4 times\n\nExplanation:\n1. Use visited array to track counted elements.\n2. For each element, count its occurrences in remaining array.\n3. Mark counted elements as visited.\n4. Skip already counted elements.\n\nTime Complexity: O(n²)\nSpace Complexity: O(n)",
    },
  ],

  // ========== 13. PROGRAMMING QUESTIONS ==========
  programmingQuestions: {
    easy: [
      {
        id: "array-pg-e-1",
        question: "Write a program to input 5 numbers and print them in reverse order.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[5];
        
        System.out.println("Enter 5 numbers:");
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }
        
        System.out.println("Reverse order:");
        for (int i = arr.length - 1; i >= 0; i--) {
            System.out.print(arr[i] + " ");
        }
        sc.close();
    }
}`,
        output: "Enter 5 numbers:\n1 2 3 4 5\nReverse order:\n5 4 3 2 1 ",
      },
      {
        id: "array-pg-e-2",
        question: "Write a program to calculate the sum of all elements in an array.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 20, 30, 40, 50};
        int sum = 0;
        
        for (int i = 0; i < arr.length; i++) {
            sum = sum + arr[i];
        }
        
        System.out.println("Sum: " + sum);
        sc.close();
    }
}`,
        output: "Sum: 150",
      },
      {
        id: "array-pg-e-3",
        question: "Write a program to find the maximum element in an array.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {45, 23, 67, 12, 89, 34};
        int max = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        
        System.out.println("Maximum: " + max);
        sc.close();
    }
}`,
        output: "Maximum: 89",
      },
      {
        id: "array-pg-e-4",
        question: "Write a program to count even and odd numbers in an array.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {12, 45, 67, 23, 34, 56, 78, 90};
        int evenCount = 0, oddCount = 0;
        
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }
        
        System.out.println("Even: " + evenCount);
        System.out.println("Odd: " + oddCount);
        sc.close();
    }
}`,
        output: "Even: 5\nOdd: 3",
      },
      {
        id: "array-pg-e-5",
        question: "Write a program to copy elements from one array to another.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] source = {1, 2, 3, 4, 5};
        int[] destination = new int[source.length];
        
        for (int i = 0; i < source.length; i++) {
            destination[i] = source[i];
        }
        
        System.out.println("Copied array:");
        for (int i = 0; i < destination.length; i++) {
            System.out.print(destination[i] + " ");
        }
        sc.close();
    }
}`,
        output: "Copied array:\n1 2 3 4 5 ",
      },
      {
        id: "array-pg-e-6",
        question: "Write a program to print all elements of an array using enhanced for loop.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        System.out.println("Array elements:");
        for (int num : arr) {
            System.out.println(num);
        }
    }
}`,
        output: "Array elements:\n10\n20\n30\n40\n50",
      },
      {
        id: "array-pg-e-7",
        question: "Write a program to find the minimum element in an array.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {45, 23, 67, 12, 89, 34};
        int min = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        
        System.out.println("Minimum: " + min);
        sc.close();
    }
}`,
        output: "Minimum: 12",
      },
      {
        id: "array-pg-e-8",
        question: "Write a program to count occurrences of a specific element in an array.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 20, 30, 20, 40, 20, 50};
        int target = 20;
        int count = 0;
        
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                count++;
            }
        }
        
        System.out.println(target + " appears " + count + " times");
        sc.close();
    }
}`,
        output: "20 appears 3 times",
      },
      {
        id: "array-pg-e-9",
        question: "Write a program to check if an array is sorted in ascending order.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        boolean isSorted = true;
        
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                isSorted = false;
                break;
            }
        }
        
        System.out.println("Is sorted: " + isSorted);
    }
}`,
        output: "Is sorted: true",
      },
      {
        id: "array-pg-e-10",
        question: "Write a program to print only the prime numbers from an array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11};
        
        System.out.println("Prime numbers:");
        for (int i = 0; i < arr.length; i++) {
            if (isPrime(arr[i])) {
                System.out.print(arr[i] + " ");
            }
        }
    }
    
    public static boolean isPrime(int num) {
        if (num <= 1) return false;
        for (int i = 2; i <= num / 2; i++) {
            if (num % i == 0) return false;
        }
        return true;
    }
}`,
        output: "Prime numbers:\n2 3 5 7 11 ",
      },
    ],
    medium: [
      {
        id: "array-pg-m-1",
        question: "Write a program to implement linear search in an array.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 25, 30, 45, 50};
        System.out.print("Enter element to search: ");
        int target = sc.nextInt();
        
        int index = linearSearch(arr, target);
        
        if (index != -1) {
            System.out.println(target + " found at index " + index);
        } else {
            System.out.println(target + " not found");
        }
        sc.close();
    }
    
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`,
        output: "Enter element to search: 30\n30 found at index 2",
      },
      {
        id: "array-pg-m-2",
        question: "Write a program to implement binary search in a sorted array.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 20, 30, 40, 50, 60, 70};
        System.out.print("Enter element to search: ");
        int target = sc.nextInt();
        
        int index = binarySearch(arr, target);
        
        if (index != -1) {
            System.out.println(target + " found at index " + index);
        } else {
            System.out.println(target + " not found");
        }
        sc.close();
    }
    
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = (left + right) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
        output: "Enter element to search: 40\n40 found at index 3",
      },
      {
        id: "array-pg-m-3",
        question: "Write a program to sort an array using bubble sort.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(arr);
        
        bubbleSort(arr);
        
        System.out.println("\\nSorted array:");
        printArray(arr);
    }
    
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}`,
        output: "Original array:\n64 34 25 12 22 11 90\nSorted array:\n11 12 22 25 34 64 90",
      },
      {
        id: "array-pg-m-4",
        question: "Write a program to sort an array using selection sort.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array:");
        printArray(arr);
        
        selectionSort(arr);
        
        System.out.println("\\nSorted array:");
        printArray(arr);
    }
    
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}`,
        output: "Original array:\n64 34 25 12 22 11 90\nSorted array:\n11 12 22 25 34 64 90",
      },
      {
        id: "array-pg-m-5",
        question: "Write a program to find the second largest element in an array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {12, 35, 1, 10, 34, 1};
        int largest = arr[0];
        int secondLargest = Integer.MIN_VALUE;
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > largest) {
                secondLargest = largest;
                largest = arr[i];
            } else if (arr[i] > secondLargest && arr[i] != largest) {
                secondLargest = arr[i];
            }
        }
        
        System.out.println("Largest: " + largest);
        System.out.println("Second largest: " + secondLargest);
    }
}`,
        output: "Largest: 35\nSecond largest: 34",
      },
      {
        id: "array-pg-m-6",
        question: "Write a program to reverse an array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] reversed = new int[arr.length];
        
        for (int i = 0; i < arr.length; i++) {
            reversed[i] = arr[arr.length - 1 - i];
        }
        
        System.out.println("Reversed array:");
        for (int i = 0; i < reversed.length; i++) {
            System.out.print(reversed[i] + " ");
        }
    }
}`,
        output: "Reversed array:\n5 4 3 2 1 ",
      },
      {
        id: "array-pg-m-7",
        question: "Write a program to merge two arrays.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {4, 5, 6};
        int[] merged = new int[arr1.length + arr2.length];
        
        int index = 0;
        for (int i = 0; i < arr1.length; i++) {
            merged[index++] = arr1[i];
        }
        for (int i = 0; i < arr2.length; i++) {
            merged[index++] = arr2[i];
        }
        
        System.out.println("Merged array:");
        for (int i = 0; i < merged.length; i++) {
            System.out.print(merged[i] + " ");
        }
    }
}`,
        output: "Merged array:\n1 2 3 4 5 6 ",
      },
      {
        id: "array-pg-m-8",
        question: "Write a program to find the frequency of each element in an array.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 3, 3, 3, 4};
        int[] visited = new int[arr.length];
        
        for (int i = 0; i < arr.length; i++) {
            if (visited[i] == 1) continue;
            
            int count = 1;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    count++;
                    visited[j] = 1;
                }
            }
            
            System.out.println(arr[i] + " appears " + count + " times");
        }
    }
}`,
        output: "1 appears 1 times\n2 appears 2 times\n3 appears 3 times\n4 appears 1 times",
      },
      {
        id: "array-pg-m-9",
        question: "Write a program to left rotate an array by k positions.",
        solution: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {1, 2, 3, 4, 5, 6, 7
  // ========== 14. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "onedimensionalarrays-ar-1",
      assertion: "Assertion (A): A one-dimensional array can execute zero or more times.",
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
      id: "onedimensionalarrays-ar-2",
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
      id: "onedimensionalarrays-ar-3",
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
      id: "onedimensionalarrays-ar-4",
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
      id: "onedimensionalarrays-ar-5",
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
      id: "onedimensionalarrays-ar-6",
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
      id: "onedimensionalarrays-ar-7",
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
      id: "onedimensionalarrays-ar-8",
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
      id: "onedimensionalarrays-ar-9",
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
      id: "onedimensionalarrays-ar-10",
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

  // ========== 15. DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "onedimensionalarrays-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "onedimensionalarrays-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "onedimensionalarrays-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "onedimensionalarrays-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "onedimensionalarrays-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "onedimensionalarrays-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "onedimensionalarrays-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "onedimensionalarrays-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "onedimensionalarrays-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "onedimensionalarrays-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 16. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "onedimensionalarrays-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "onedimensionalarrays-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "onedimensionalarrays-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "onedimensionalarrays-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "onedimensionalarrays-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "onedimensionalarrays-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "onedimensionalarrays-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "onedimensionalarrays-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "onedimensionalarrays-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "onedimensionalarrays-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "onedimensionalarrays-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "onedimensionalarrays-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 17. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "onedimensionalarrays-mps-1",
      title: "Practice Set 1: One-dimensional array Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "onedimensionalarrays-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "onedimensionalarrays-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "onedimensionalarrays-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "onedimensionalarrays-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "onedimensionalarrays-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "onedimensionalarrays-mps-2",
      title: "Practice Set 2: One-dimensional array Applications",
      questions: [
        {
          type: "mcq",
          id: "onedimensionalarrays-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "onedimensionalarrays-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "onedimensionalarrays-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "onedimensionalarrays-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "onedimensionalarrays-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 18. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "onedimensionalarrays-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "onedimensionalarrays-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "onedimensionalarrays-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "onedimensionalarrays-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "onedimensionalarrays-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "onedimensionalarrays-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "onedimensionalarrays-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "onedimensionalarrays-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "onedimensionalarrays-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "onedimensionalarrays-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "onedimensionalarrays-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "onedimensionalarrays-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "onedimensionalarrays-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "onedimensionalarrays-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "onedimensionalarrays-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "onedimensionalarrays-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "onedimensionalarrays-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "onedimensionalarrays-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "onedimensionalarrays-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "onedimensionalarrays-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};
        System.out.print("Enter k: ");
        int k = sc.nextInt();
        int n = arr.length;
        k = k % n;
        
        int[] temp = new int[k];
        for (int i = 0; i < k; i++) {
            temp[i] = arr[i];
        }
        
        for (int i = 0; i < n - k; i++) {
            arr[i] = arr[i + k];
        }
        
        for (int i = 0; i < k; i++) {
            arr[n - k + i] = temp[i];
        }
        
        System.out.println("Rotated array:");
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        sc.close();
    }
}`,
        output: "Enter k: 3\nRotated array:\n4 5 6 7 1 2 3 ",
      },
      {
        id: "array-pg-m-10",
        question: "Write a program to move all zeros to the end of an array.",
        solution