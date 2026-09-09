export const ISC_XII_JAVA_PYTHON_CONTENT = {
  "methods-object-parameter-return": {
    title: "Methods – Object as a Parameter and Return Data Type",
    section: "B",
    overview: "Use methods to pass objects, return objects, and design reusable algorithms with clear contracts.",
    concepts: [
      "An object reference can be passed as a method argument; the reference value is passed by value.",
      "A method can return an object reference when its return type is a class type.",
      "Method design should state inputs, processing, output and edge cases before coding.",
      "Overloaded methods must differ in their parameter list; the return type alone cannot overload a method."
    ],
    workedExample: "A static Student topper(Student a, Student b) method can compare marks and return the reference to the student with the higher mark.",
    practice: [
      { type: "tracing", question: "Trace a method that receives an object, changes one field, and returns the same reference.", answer: "The caller sees the changed field because both references identify the same object." },
      { type: "debugging", question: "A method is declared to return Student but reaches the end without returning a value. What is wrong?", answer: "A non-void method must return a compatible value on every reachable path." },
      { type: "programming", question: "Write a method that accepts two Student objects and returns the one with the greater marks.", answer: "Compare the marks fields and return the appropriate Student reference; define a tie rule." }
    ]
  },
  "arrays-strings": {
    title: "Arrays (Single and Double Dimensional) and String Handling",
    section: "B",
    overview: "Build reliable array and String algorithms, including traversal, searching, sorting, matrix processing and text manipulation.",
    concepts: [
      "Array indices run from 0 through length - 1.",
      "For a rectangular int[][] a, a.length gives rows and a[i].length gives columns for row i.",
      "Linear search works on unsorted data; binary search requires sorted data.",
      "String objects are immutable; methods such as substring and replace produce resulting String values."
    ],
    workedExample: "For an n-element array, use for (int i = 0; i < a.length; i++) to visit every valid index exactly once.",
    practice: [
      { type: "tracing", question: "Trace a two-dimensional array traversal and list the row/column indices visited.", answer: "Use nested loops with i < a.length and j < a[i].length." },
      { type: "debugging", question: "A loop uses i <= a.length. Identify the error.", answer: "The final iteration tries index a.length, which is outside the valid range; use i < a.length." },
      { type: "programming", question: "Write a program to find the second-largest distinct value in an integer array.", answer: "Scan once while maintaining largest and second-largest distinct values, and handle fewer-than-two-distinct-values explicitly." }
    ]
  },
  "recursion": {
    title: "Recursion",
    section: "B",
    overview: "Solve problems recursively by defining a correct base case and a recursive step that moves toward termination.",
    concepts: [
      "Every recursive solution needs a base case that stops further calls.",
      "The recursive case must reduce the problem toward the base case.",
      "Each call creates a stack frame, so uncontrolled recursion can cause StackOverflowError.",
      "Trace both the call sequence and the return sequence when solving board questions."
    ],
    workedExample: "factorial(4) calls factorial(3), factorial(2), factorial(1), then returns 1, 2, 6, 24.",
    practice: [
      { type: "tracing", question: "Trace factorial(4) including calls and returns.", answer: "Calls: 4→3→2→1; returns: 1→2→6→24." },
      { type: "debugging", question: "A recursive method calls itself with the same argument forever. What is the defect?", answer: "The recursive step does not move toward the base case; change the argument so termination is guaranteed." },
      { type: "programming", question: "Write a recursive method to find the sum of the first n positive integers.", answer: "Use base case n<=1 and recursive relation sum(n)=n+sum(n-1)." }
    ]
  },
  "inheritance-interface": {
    title: "Inheritance and Interface",
    section: "B",
    overview: "Use inheritance and interfaces to model common behaviour, override methods and understand runtime polymorphism.",
    concepts: [
      "A subclass inherits accessible members from its superclass and can add or override behaviour.",
      "Method overriding requires a compatible inherited method signature; changing only parameters creates overloading instead.",
      "A superclass reference can refer to a subclass object, enabling dynamic method dispatch for overridden methods.",
      "An interface specifies behaviour that implementing classes must provide; a class can implement multiple interfaces."
    ],
    workedExample: "Animal a = new Dog(); a.sound(); executes Dog's overridden sound() implementation at runtime.",
    practice: [
      { type: "tracing", question: "Trace constructor execution for a superclass and subclass object.", answer: "The superclass constructor executes before the subclass constructor so inherited state is initialized first." },
      { type: "debugging", question: "Why can a superclass reference not directly call a subclass-only method?", answer: "Compile-time member access is checked against the reference type; use a suitable subclass reference or a declared common interface." },
      { type: "programming", question: "Create an interface Printable and implement it in two classes with different print() behaviour.", answer: "Declare the interface method and provide compatible implementations in both classes; call through a Printable reference." }
    ]
  },
  "python": {
    title: "Programming in Python",
    section: "C",
    overview: "Write small Python programs using variables, selection, iteration, functions and core collections while reasoning about output.",
    concepts: [
      "Python uses indentation to define blocks.",
      "Use if/elif/else for selection and for/while for iteration.",
      "Functions should have clear parameters, return values and boundary behaviour.",
      "Lists are mutable sequences; tuples are immutable sequences; dictionaries map keys to values."
    ],
    workedExample: "A function count_even(values) can traverse a list, increment a counter for values divisible by 2, and return the count.",
    practice: [
      { type: "tracing", question: "Trace a Python loop that accumulates the sum of values in a list.", answer: "Maintain an accumulator and update it once for each list element." },
      { type: "debugging", question: "A Python block raises an indentation error after an if statement. What should be checked?", answer: "Check that all statements belonging to the block have consistent indentation." },
      { type: "programming", question: "Write a Python function returning the largest distinct value in a list.", answer: "Track the maximum while ignoring duplicates, or use a clearly explained distinct-value approach." }
    ]
  },
  "data-structures": {
    title: "Data Structures",
    section: "C",
    overview: "Understand how common data structures organise data and how operations affect efficiency and correctness.",
    concepts: [
      "A stack follows LIFO: the most recently inserted item is removed first.",
      "A queue follows FIFO: the earliest inserted item is removed first.",
      "Arrays provide indexed access; linked structures emphasise node connections and dynamic structure.",
      "Choose a structure based on required operations, memory model and expected access pattern."
    ],
    workedExample: "For a stack, push(A), push(B), pop() returns B; for a queue, enqueue(A), enqueue(B), dequeue() returns A.",
    practice: [
      { type: "tracing", question: "Trace push A, push B, pop, push C, pop on a stack.", answer: "The pops return B and then C." },
      { type: "debugging", question: "A queue implementation removes the newest item first. Which rule has been violated?", answer: "A queue is FIFO, so removal must occur from the oldest available element." },
      { type: "reasoning", question: "When is a stack preferable to a queue?", answer: "When the problem naturally requires last-in-first-out processing, such as undo operations or recursive call modelling." }
    ]
  },
  "complexity-big-o": {
    title: "Complexity and Big O Notation",
    section: "C",
    overview: "Estimate how an algorithm's time and space requirements grow as input size increases.",
    concepts: [
      "Big O describes an asymptotic upper-growth class and focuses on how cost scales with input size.",
      "A single loop over n items is typically O(n); two independent nested loops over n items are typically O(n²).",
      "Binary search on sorted data is O(log n) because the remaining search range is repeatedly halved.",
      "Space complexity considers additional memory used as input size grows."
    ],
    workedExample: "A loop that doubles i each iteration (i *= 2) runs O(log n) times before exceeding n.",
    practice: [
      { type: "reasoning", question: "What is the typical time complexity of linear search in the worst case?", answer: "O(n)." },
      { type: "tracing", question: "How many iterations are required when i starts at 1 and doubles until i >= n?", answer: "Theta(log n) iterations." },
      { type: "debugging", question: "A student calls binary search O(log n) on an unsorted array. What prerequisite is missing?", answer: "The data must be sorted according to the search order before binary search is valid." }
    ]
  }
};

export const getISCXIIJavaPythonContent = (slug) => ISC_XII_JAVA_PYTHON_CONTENT[slug] ?? null;
