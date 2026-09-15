export const ISC_XII_JAVA_PYTHON_CONTENT = {
  "methods-object-parameter-return": {
    title: "Methods – Object as a Parameter and Return Data Type",
    section: "B",
    overview: "Use methods to pass objects, return objects, and design reusable algorithms with clear contracts. Understanding how Java passes object references is essential for ISC board tracing and debugging questions.",
    concepts: [
      "An object reference can be passed as a method argument; the reference value is passed by value, so the method receives a copy of the reference, not a copy of the object.",
      "A method can return an object reference when its return type is a class type; the caller receives the same reference the method returns.",
      "Because both the caller and the method share the same object, changes to the object's fields inside the method are visible to the caller after the method returns.",
      "Method design should state inputs, processing, output and edge cases before coding.",
      "Overloaded methods must differ in their parameter list (number or type of parameters); the return type alone cannot distinguish overloaded methods.",
      "A static method belongs to the class and can be called without creating an object; it cannot access instance fields directly.",
      "The keyword this refers to the current object inside an instance method and is used to distinguish instance fields from local variables with the same name.",
      "A void method performs an action but does not return a value; a non-void method must return a compatible value on every reachable execution path.",
    ],
    workedExample: "A static method Student topper(Student a, Student b) compares the marks fields of two Student objects and returns the reference to the student with the higher mark. The caller receives the same object reference, so it can call any Student method on the result.",
    workedExampleCode: `class Student {
    String name;
    int marks;
    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    static Student topper(Student a, Student b) {
        return (a.marks >= b.marks) ? a : b;
    }
}
// In main:
Student s1 = new Student("Aryan", 88);
Student s2 = new Student("Priya", 92);
Student winner = Student.topper(s1, s2);
System.out.println(winner.name); // Priya`,
    practice: [
      { type: "tracing", question: "A method receives a Student object, increments its marks by 5, and returns the same reference. The caller prints marks before and after the call. What does the caller see?", answer: "The caller sees the updated marks after the call because both the caller and the method reference the same object in memory." },
      { type: "tracing", question: "Trace: Student a = new Student('Ali', 70); Student b = a; b.marks = 90; System.out.println(a.marks);", answer: "90. Both a and b refer to the same object, so changing b.marks also changes a.marks." },
      { type: "debugging", question: "A method is declared to return Student but one branch reaches the closing brace without a return statement. What error occurs and when?", answer: "A compile-time error: 'missing return statement'. Every reachable path in a non-void method must return a compatible value." },
      { type: "debugging", question: "A student writes: void compare(int a, int b) { return a > b; }. Identify two errors.", answer: "(1) A void method cannot return a value. (2) The return type should be boolean, not void." },
      { type: "programming", question: "Write a method that accepts two Student objects and returns the one with the greater marks. Handle a tie by returning the first argument.", answer: "Compare the marks fields and return the appropriate Student reference; if marks are equal, return the first parameter." },
      { type: "programming", question: "Write a static method double average(int[] arr) that returns the average of all elements. Call it from main and print the result.", answer: "Sum all elements in a loop, divide by arr.length (cast to double), and return the result. Handle the empty-array case explicitly." },
      { type: "mcq", question: "When an object reference is passed to a method, what does the method receive?", options: ["A) A deep copy of the object", "B) A copy of the reference", "C) The original variable name", "D) A primitive value"], answer: "B", explanation: "Java passes the reference by value; the method gets a copy of the address, not a copy of the object." },
      { type: "mcq", question: "Which keyword refers to the current object inside an instance method?", options: ["A) super", "B) self", "C) this", "D) current"], answer: "C", explanation: "'this' refers to the instance on which the method was called." },
      { type: "reasoning", question: "Explain why changing a primitive parameter inside a method does not affect the caller's variable, but changing an object's field does.", answer: "Primitives are passed by value so the method gets a copy. Object references are also passed by value, but both copies point to the same object, so field changes are visible to the caller." },
    ],
  },

  "arrays-strings": {
    title: "Arrays (Single and Double Dimensional) and String Handling",
    section: "B",
    overview: "Build reliable array and String algorithms, including traversal, searching, sorting, matrix processing and text manipulation. ISC board questions frequently test boundary conditions, off-by-one errors and String immutability.",
    concepts: [
      "Array indices run from 0 through length - 1; accessing index length or beyond throws ArrayIndexOutOfBoundsException at runtime.",
      "For a rectangular int[][] a, a.length gives the number of rows and a[i].length gives the number of columns in row i.",
      "Linear search works on unsorted data and has O(n) worst-case time; binary search requires sorted data and has O(log n) worst-case time.",
      "Bubble sort compares adjacent elements and swaps them if out of order; selection sort finds the minimum and places it at the front; both are O(n²).",
      "String objects are immutable; methods such as substring, replace and toUpperCase produce new String objects and do not modify the original.",
      "Key String methods: length(), charAt(i), substring(start, end), indexOf(ch), toUpperCase(), toLowerCase(), equals(), equalsIgnoreCase(), trim().",
      "substring(start, end) returns characters from index start up to but not including index end.",
      "A 2D array is an array of arrays; it is declared as int[][] matrix = new int[rows][cols] and traversed with nested loops.",
      "Common matrix operations: row sum, column sum, diagonal sum, transpose, and searching for a value.",
    ],
    workedExample: "For an n-element array, use for (int i = 0; i < a.length; i++) to visit every valid index exactly once. For binary search, maintain low and high pointers and compute mid = (low + high) / 2 each iteration.",
    workedExampleCode: `// Linear search
static int linearSearch(int[] arr, int key) {
    for (int i = 0; i < arr.length; i++)
        if (arr[i] == key) return i;
    return -1;
}
// String reversal
static String reverse(String s) {
    String result = "";
    for (int i = s.length() - 1; i >= 0; i--)
        result += s.charAt(i);
    return result;
}`,
    practice: [
      { type: "tracing", question: "Trace a two-dimensional array traversal for int[][] a = {{1,2},{3,4},{5,6}} and list every (i,j) index pair visited by nested loops.", answer: "(0,0),(0,1),(1,0),(1,1),(2,0),(2,1). Use i < a.length and j < a[i].length." },
      { type: "tracing", question: 'Trace: String s = "COMPUTER"; System.out.println(s.substring(2,6) + s.charAt(0));', answer: '"MPUT" + \'C\' = "MPUTC". substring(2,6) extracts indices 2,3,4,5.' },
      { type: "debugging", question: "A loop uses i <= a.length. Identify the error and state the correct condition.", answer: "The final iteration tries index a.length, which is out of bounds. Use i < a.length." },
      { type: "debugging", question: 'A student writes s1 == s2 to compare two String objects. What is wrong?', answer: '== compares references, not content. Use s1.equals(s2) to compare String values.' },
      { type: "programming", question: "Write a program to find the second-largest distinct value in an integer array.", answer: "Scan once while maintaining largest and second-largest distinct values. Handle arrays with fewer than two distinct values explicitly." },
      { type: "programming", question: "Write a method to count the number of vowels in a given String (case-insensitive).", answer: "Convert to lowercase, iterate with charAt, and count characters that are a, e, i, o, or u." },
      { type: "programming", question: "Write a method to transpose a square 2D integer array in-place.", answer: "Swap a[i][j] with a[j][i] for all i < j using nested loops." },
      { type: "mcq", question: "Which exception is thrown when an invalid array index is accessed at runtime?", options: ["A) IOException", "B) ArithmeticException", "C) ArrayIndexOutOfBoundsException", "D) NullPointerException"], answer: "C", explanation: "Java throws ArrayIndexOutOfBoundsException for invalid array indices." },
      { type: "mcq", question: "What does substring(3, 6) return for the String \"ABCDEFG\"?", options: ["A) \"ABC\"", "B) \"DEF\"", "C) \"DEFG\"", "D) \"CDE\""], answer: "B", explanation: "substring(start, end) returns characters at indices 3, 4, 5 — which are D, E, F." },
      { type: "reasoning", question: "Why is binary search faster than linear search, and what is its prerequisite?", answer: "Binary search halves the search range each step giving O(log n) time, but the array must be sorted in the correct order first." },
    ],
  },

  "recursion": {
    title: "Recursion",
    section: "B",
    overview: "Solve problems recursively by defining a correct base case and a recursive step that moves toward termination. ISC board questions test tracing of call and return sequences, identification of missing base cases, and writing recursive methods.",
    concepts: [
      "Every recursive solution needs a base case that stops further calls and returns a direct answer.",
      "The recursive case must reduce the problem toward the base case; if it does not, the recursion never terminates.",
      "Each recursive call creates a new stack frame holding its own local variables and parameters.",
      "Uncontrolled recursion (no base case or wrong reduction) causes StackOverflowError at runtime.",
      "Trace both the call sequence (going down) and the return sequence (coming back up) when solving board questions.",
      "Recursion can replace iteration for problems with a natural self-similar structure, such as factorial, Fibonacci, binary search and tree traversal.",
      "The number of recursive calls for factorial(n) is n; for binary search it is O(log n).",
      "Mutual recursion occurs when method A calls method B and method B calls method A; both must have base cases.",
    ],
    workedExample: "factorial(4) calls factorial(3), factorial(2), factorial(1), then returns 1, 2, 6, 24. The call sequence goes down to the base case and the return sequence multiplies back up.",
    workedExampleCode: `static int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}
// Trace for n=4:
// factorial(4) -> 4 * factorial(3)
// factorial(3) -> 3 * factorial(2)
// factorial(2) -> 2 * factorial(1)
// factorial(1) -> 1  (base case)
// Returns: 1 -> 2 -> 6 -> 24`,
    practice: [
      { type: "tracing", question: "Trace factorial(5) including the full call sequence and return sequence.", answer: "Calls: 5→4→3→2→1. Returns: 1→2→6→24→120." },
      { type: "tracing", question: "Trace a recursive method that computes the sum of digits of 253. Show each call and return.", answer: "sumDigits(253)=3+sumDigits(25); sumDigits(25)=5+sumDigits(2); sumDigits(2)=2 (base). Returns: 2→7→10." },
      { type: "debugging", question: "A recursive method calls itself with the same argument on every call. What is the defect and what error results?", answer: "The recursive step does not move toward the base case. The method calls itself infinitely and causes StackOverflowError." },
      { type: "debugging", question: "A student writes: static int power(int b, int e) { return b * power(b, e); }. Identify the error.", answer: "The exponent e never decreases, so the base case is never reached. Change to power(b, e-1) and add base case e==0 returns 1." },
      { type: "programming", question: "Write a recursive method to find the sum of the first n positive integers.", answer: "Base case: n <= 1 returns 1. Recursive case: return n + sum(n-1)." },
      { type: "programming", question: "Write a recursive method to reverse a String.", answer: "Base case: empty or single-character string returns itself. Recursive case: return reverse(s.substring(1)) + s.charAt(0)." },
      { type: "programming", question: "Write a recursive binary search method on a sorted int array.", answer: "Base case: low > high returns -1. Compute mid; if arr[mid]==key return mid; if key < arr[mid] search left half; else search right half." },
      { type: "mcq", question: "What is the purpose of the base case in a recursive method?", options: ["A) To increase recursion depth", "B) To stop recursive calls and return a direct answer", "C) To overload the method", "D) To create a new object"], answer: "B", explanation: "The base case terminates the recursion and prevents StackOverflowError." },
      { type: "mcq", question: "Which error is caused by infinite recursion in Java?", options: ["A) ArrayIndexOutOfBoundsException", "B) NullPointerException", "C) StackOverflowError", "D) ArithmeticException"], answer: "C", explanation: "Each call adds a frame to the call stack; infinite recursion exhausts the stack." },
      { type: "reasoning", question: "When is recursion preferable to iteration, and when is iteration preferable?", answer: "Recursion is cleaner for naturally self-similar problems (tree traversal, divide-and-conquer). Iteration is preferable when stack depth is a concern or when the iterative solution is equally clear." },
    ],
  },

  "inheritance-interface": {
    title: "Inheritance and Interface",
    section: "B",
    overview: "Use inheritance and interfaces to model common behaviour, override methods and understand runtime polymorphism. ISC board questions test constructor order, dynamic method dispatch, and the difference between overloading and overriding.",
    concepts: [
      "A subclass inherits all accessible (public and protected) members from its superclass and can add new members or override inherited methods.",
      "Method overriding requires the subclass to provide a method with the same name, same parameter list, and a compatible return type as the inherited method.",
      "Changing only the parameter list in a subclass creates overloading, not overriding.",
      "A superclass reference can refer to a subclass object (upcasting); this enables dynamic method dispatch.",
      "Dynamic method dispatch: when an overridden method is called through a superclass reference, Java selects the subclass implementation at runtime based on the actual object type.",
      "A superclass reference can only access members declared in the superclass; subclass-only members are not visible through a superclass reference at compile time.",
      "The super keyword calls the superclass constructor (super(...)) or a superclass method (super.method()).",
      "An interface declares method signatures (and optionally constants) that implementing classes must provide.",
      "A class can implement multiple interfaces but can extend only one class.",
      "Constructor execution order: the superclass constructor always runs before the subclass constructor.",
    ],
    workedExample: "Animal a = new Dog(); a.sound(); executes Dog's overridden sound() implementation at runtime because the actual object is Dog, even though the reference type is Animal.",
    workedExampleCode: `class Animal {
    void sound() { System.out.println("Generic sound"); }
}
class Dog extends Animal {
    void sound() { System.out.println("Woof"); }  // overrides
    void fetch() { System.out.println("Fetching!"); }
}
// In main:
Animal a = new Dog();  // superclass reference, subclass object
a.sound();   // prints "Woof" — dynamic dispatch
// a.fetch(); // compile error: fetch() not in Animal`,
    practice: [
      { type: "tracing", question: "Trace constructor execution for: class A { A() { System.out.println('A'); } } class B extends A { B() { System.out.println('B'); } } new B();", answer: "Output: A then B. The superclass constructor runs first." },
      { type: "tracing", question: "Predict the output: Animal a = new Dog(); a.sound(); where Dog overrides sound() to print 'Woof'.", answer: "Woof. Dynamic method dispatch selects Dog's implementation at runtime." },
      { type: "debugging", question: "A student calls a subclass-only method through a superclass reference and gets a compile error. Explain why and how to fix it.", answer: "Compile-time member access is checked against the reference type. Use a subclass reference or cast: ((Dog) a).fetch()." },
      { type: "debugging", question: "A student claims their method is overriding but the superclass version still runs. The subclass method has a different parameter type. What is wrong?", answer: "Different parameter types create overloading, not overriding. The superclass version is called because no override exists. Match the parameter list exactly." },
      { type: "programming", question: "Create an interface Printable with a method print(). Implement it in two classes with different print() behaviour. Call print() through a Printable reference.", answer: "Declare interface Printable { void print(); }. Implement in two classes. Assign each to a Printable reference and call print() to demonstrate polymorphism." },
      { type: "programming", question: "Write a superclass Shape with a method area() returning 0.0. Create a subclass Circle that overrides area() to return Math.PI * r * r. Demonstrate dynamic dispatch in main.", answer: "Shape s = new Circle(5); System.out.println(s.area()); prints Circle's area because of dynamic dispatch." },
      { type: "mcq", question: "Which change creates an overriding relationship?", options: ["A) Unrelated classes with same method name", "B) Same-signature inherited method reimplemented in a subclass", "C) Different parameter list in subclass", "D) Changing only the return type"], answer: "B", explanation: "Overriding requires inheritance and a matching method signature." },
      { type: "mcq", question: "In A obj = new B(); which type controls compile-time member visibility?", options: ["A) Actual object type B", "B) Reference type A", "C) Both equally", "D) Neither"], answer: "B", explanation: "Compile-time checks use the reference type; runtime dispatch uses the actual object type." },
      { type: "mcq", question: "How many classes can a Java class extend?", options: ["A) Unlimited", "B) Two", "C) One", "D) Zero"], answer: "C", explanation: "Java supports single inheritance for classes; multiple interfaces can be implemented." },
      { type: "reasoning", question: "Explain the difference between method overloading and method overriding with one example of each.", answer: "Overloading: same class, same name, different parameter list (e.g., add(int,int) and add(double,double)). Overriding: subclass provides new implementation of inherited method with same signature (e.g., Dog.sound() overrides Animal.sound())." },
    ],
  },

  "python": {
    title: "Programming in Python",
    section: "C",
    overview: "Write small Python programs using variables, selection, iteration, functions and core collections while reasoning about output. ISC board questions test output tracing, debugging indentation errors, and writing functions with lists and dictionaries.",
    concepts: [
      "Python uses indentation (consistent spaces or tabs) to define blocks; mixing them causes IndentationError.",
      "Use if/elif/else for selection; the elif chain is evaluated top-to-bottom and only the first matching branch executes.",
      "Use for to iterate over a sequence; use while for condition-controlled loops.",
      "Functions are defined with def; parameters are positional by default; return sends a value back to the caller.",
      "Lists are mutable ordered sequences; tuples are immutable ordered sequences; dictionaries map unique keys to values.",
      "List methods: append(x), insert(i,x), remove(x), pop(i), sort(), reverse(), len(lst).",
      "Dictionary methods: keys(), values(), items(), get(key, default).",
      "String formatting: f-strings (f'{variable}') and format() are both acceptable in ISC answers.",
      "range(start, stop, step) generates integers from start up to but not including stop.",
      "A function without a return statement implicitly returns None.",
    ],
    workedExample: "A function count_even(values) traverses a list, increments a counter for values divisible by 2, and returns the count. Trace: count_even([1,2,3,4]) → counter goes 0→1→1→2, returns 2.",
    workedExampleCode: `def count_even(values):
    count = 0
    for v in values:
        if v % 2 == 0:
            count += 1
    return count

# Dictionary example
def word_frequency(words):
    freq = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1
    return freq`,
    practice: [
      { type: "tracing", question: "Trace: total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)", answer: "total goes 0→1→3→6→10. Output: 10." },
      { type: "tracing", question: "Trace: lst = [3,1,4,1,5]\nlst.sort()\nprint(lst[0], lst[-1])", answer: "After sort: [1,1,3,4,5]. Output: 1 5." },
      { type: "debugging", question: "A Python block raises IndentationError after an if statement. What should be checked?", answer: "All statements belonging to the block must have consistent indentation. Mixing tabs and spaces causes IndentationError." },
      { type: "debugging", question: "A function is supposed to return the sum of a list but always returns None. What is the likely error?", answer: "The return statement is missing or is outside the function body due to incorrect indentation." },
      { type: "programming", question: "Write a Python function returning the largest distinct value in a list.", answer: "Convert the list to a set to remove duplicates, then return max(set(lst))." },
      { type: "programming", question: "Write a Python function that takes a list of integers and returns a new list containing only the even numbers.", answer: "Use a for loop with an if condition, or a list comprehension: [x for x in lst if x % 2 == 0]." },
      { type: "programming", question: "Write a Python function that counts the frequency of each character in a string and returns a dictionary.", answer: "Iterate over the string; use dict.get(ch, 0) + 1 to increment the count for each character." },
      { type: "mcq", question: "What does range(2, 10, 3) produce?", options: ["A) [2,5,8]", "B) [2,3,4,5,6,7,8,9]", "C) [2,5,8,11]", "D) [3,6,9]"], answer: "A", explanation: "range(2,10,3) generates 2, 5, 8 (step 3, stops before 10)." },
      { type: "mcq", question: "Which collection type is immutable in Python?", options: ["A) list", "B) dict", "C) set", "D) tuple"], answer: "D", explanation: "Tuples cannot be modified after creation." },
      { type: "reasoning", question: "Explain the difference between a list and a tuple in Python, and give one use case for each.", answer: "Lists are mutable (elements can be added/removed/changed); use for collections that change. Tuples are immutable; use for fixed data like coordinates or function return values where immutability is desired." },
    ],
  },

  "data-structures": {
    title: "Data Structures",
    section: "C",
    overview: "Understand how stacks, queues and linked lists organise data, how operations affect them, and how to choose the right structure. ISC board questions test tracing of push/pop/enqueue/dequeue sequences and reasoning about LIFO vs FIFO.",
    concepts: [
      "A stack follows LIFO (Last In First Out): the most recently inserted item is removed first. Operations: push (insert at top), pop (remove from top), peek/top (view top without removing).",
      "A queue follows FIFO (First In First Out): the earliest inserted item is removed first. Operations: enqueue (insert at rear), dequeue (remove from front).",
      "Stack overflow occurs when push is called on a full stack; stack underflow occurs when pop is called on an empty stack.",
      "A linked list is a sequence of nodes where each node stores data and a reference (pointer) to the next node. The last node's next is null.",
      "Linked list operations: insert at head O(1), insert at tail O(n) without tail pointer, search O(n), delete O(n).",
      "Stack time complexity: push O(1), pop O(1), peek O(1).",
      "Queue time complexity: enqueue O(1), dequeue O(1) with a proper implementation.",
      "Arrays provide O(1) indexed access; linked structures emphasise dynamic size and efficient insertion/deletion at known positions.",
      "Choose a structure based on required operations: use a stack for undo/backtracking, a queue for scheduling/BFS, a linked list for dynamic insertion.",
    ],
    workedExample: "Stack trace: push(A), push(B), push(C), pop() → C, push(D), pop() → D, pop() → B. Queue trace: enqueue(A), enqueue(B), dequeue() → A, enqueue(C), dequeue() → B.",
    workedExampleCode: `// Stack using array (ISC style)
class Stack {
    int[] data;
    int top = -1;
    Stack(int size) { data = new int[size]; }
    void push(int x) { data[++top] = x; }
    int pop() { return data[top--]; }
    int peek() { return data[top]; }
    boolean isEmpty() { return top == -1; }
}
// Queue using array
class Queue {
    int[] data;
    int front = 0, rear = -1, size = 0;
    Queue(int cap) { data = new int[cap]; }
    void enqueue(int x) { data[++rear] = x; size++; }
    int dequeue() { size--; return data[front++]; }
}`,
    practice: [
      { type: "tracing", question: "Trace: push(10), push(20), push(30), pop(), push(40), pop(), pop() on a stack. List the values returned by each pop.", answer: "pop() returns 30, then 40, then 20." },
      { type: "tracing", question: "Trace: enqueue(X), enqueue(Y), dequeue(), enqueue(Z), dequeue() on a queue. List the values returned by each dequeue.", answer: "dequeue() returns X, then Y." },
      { type: "tracing", question: "A linked list has nodes 5→10→15→null. Describe the state after inserting 8 at the head.", answer: "8→5→10→15→null. The new node's next points to the old head." },
      { type: "debugging", question: "A queue implementation removes the newest item first. Which rule has been violated and how should it be fixed?", answer: "A queue is FIFO; removal must occur from the front (oldest element). Fix by maintaining separate front and rear pointers." },
      { type: "debugging", question: "A stack's pop() method does not check whether the stack is empty before decrementing top. What can go wrong?", answer: "If the stack is empty, top becomes -1 and the next access is data[-1], causing ArrayIndexOutOfBoundsException (stack underflow)." },
      { type: "programming", question: "Write a Java method that uses a stack to reverse a string.", answer: "Push each character onto the stack, then pop all characters and concatenate them to form the reversed string." },
      { type: "programming", question: "Write a Java class for a singly linked list with methods to insert at head and display all nodes.", answer: "Define a Node class with int data and Node next. The LinkedList class holds a head reference. insertAtHead creates a new node, sets its next to head, and updates head." },
      { type: "mcq", question: "Which data structure uses LIFO order?", options: ["A) Queue", "B) Stack", "C) Linked List", "D) Array"], answer: "B", explanation: "A stack removes the most recently added element first." },
      { type: "mcq", question: "What is the time complexity of push and pop on a stack?", options: ["A) O(n)", "B) O(log n)", "C) O(1)", "D) O(n²)"], answer: "C", explanation: "Push and pop only access the top element, so they are O(1)." },
      { type: "reasoning", question: "When is a stack preferable to a queue, and when is a queue preferable?", answer: "Use a stack when the problem requires last-in-first-out processing (undo, recursive call modelling, expression evaluation). Use a queue when the problem requires first-in-first-out processing (task scheduling, BFS, print spooling)." },
    ],
  },

  "complexity-big-o": {
    title: "Complexity and Big O Notation",
    section: "C",
    overview: "Estimate how an algorithm's time and space requirements grow as input size increases. ISC board questions test identifying the complexity class of a given loop structure and comparing algorithms.",
    concepts: [
      "Big O notation describes an asymptotic upper bound on growth rate and focuses on how cost scales with input size n, ignoring constants and lower-order terms.",
      "O(1) — constant time: the operation takes the same time regardless of n (e.g., array index access, stack push/pop).",
      "O(log n) — logarithmic time: the problem size is halved each step (e.g., binary search, recursive binary search).",
      "O(n) — linear time: one pass through n elements (e.g., linear search, array traversal, counting).",
      "O(n log n) — linearithmic time: efficient sorting algorithms (e.g., merge sort, quicksort average case).",
      "O(n²) — quadratic time: two nested loops each running n times (e.g., bubble sort, selection sort, insertion sort).",
      "Space complexity measures additional memory used as n grows; an in-place algorithm uses O(1) extra space.",
      "Best case, average case and worst case describe the minimum, expected and maximum cost for a given input size.",
      "For linear search: best case O(1) (first element), worst case O(n) (last element or not found).",
      "For binary search: best case O(1) (middle element), worst case O(log n).",
    ],
    workedExample: "A loop that doubles i each iteration (i = 1; i < n; i *= 2) runs O(log n) times because the range is halved each step. Two independent nested loops each running n times give O(n²).",
    workedExampleCode: `// O(n) — single loop
for (int i = 0; i < n; i++) { /* O(1) work */ }

// O(n²) — nested loops
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++) { /* O(1) work */ }

// O(log n) — halving loop
for (int i = 1; i < n; i *= 2) { /* O(1) work */ }

// O(log n) — binary search
int low = 0, high = n - 1;
while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == key) return mid;
    else if (arr[mid] < key) low = mid + 1;
    else high = mid - 1;
}`,
    practice: [
      { type: "reasoning", question: "What is the worst-case time complexity of linear search on an array of n elements?", answer: "O(n). In the worst case the key is the last element or not present, requiring n comparisons." },
      { type: "reasoning", question: "What is the time complexity of bubble sort and why?", answer: "O(n²). The outer loop runs n times and the inner loop runs up to n-1 times, giving approximately n²/2 comparisons." },
      { type: "tracing", question: "How many iterations does the loop 'for (int i = 1; i < 64; i *= 2)' execute?", answer: "6 iterations: i takes values 1, 2, 4, 8, 16, 32 before i=64 fails the condition. This is O(log n) for n=64." },
      { type: "tracing", question: "Count the total number of iterations for two nested loops each running from 0 to n-1 when n=4.", answer: "4 × 4 = 16 iterations. This is O(n²)." },
      { type: "debugging", question: "A student applies binary search to an unsorted array and gets wrong results. What prerequisite is missing?", answer: "Binary search requires the array to be sorted in the correct order before the search begins." },
      { type: "debugging", question: "A student claims an algorithm is O(n) but it has two nested loops each running n/2 times. What is the correct complexity?", answer: "O(n²). Constants are dropped in Big O; (n/2)² = n²/4 which is still O(n²)." },
      { type: "programming", question: "Write a method that finds the maximum element in an array and state its time complexity.", answer: "Single loop comparing each element to a running maximum. Time complexity: O(n). Space complexity: O(1)." },
      { type: "mcq", question: "What is the time complexity of binary search in the worst case?", options: ["A) O(1)", "B) O(n)", "C) O(log n)", "D) O(n²)"], answer: "C", explanation: "Binary search halves the search range each step, giving O(log n) comparisons." },
      { type: "mcq", question: "Which sorting algorithm has O(n²) worst-case time complexity?", options: ["A) Merge sort", "B) Bubble sort", "C) Binary search", "D) Linear search"], answer: "B", explanation: "Bubble sort uses nested loops and is O(n²) in the worst case." },
      { type: "reasoning", question: "Explain the difference between time complexity and space complexity with one example of each.", answer: "Time complexity measures how the number of operations grows with n (e.g., linear search is O(n)). Space complexity measures how additional memory grows with n (e.g., creating a copy of an n-element array uses O(n) extra space; an in-place sort uses O(1) extra space)." },
    ],
  },
};

export const getISCXIIJavaPythonContent = (slug) => ISC_XII_JAVA_PYTHON_CONTENT[slug] ?? null;
