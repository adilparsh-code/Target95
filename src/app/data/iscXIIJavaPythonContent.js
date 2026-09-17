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
      { type: "programming", question: "Write binary search on a sorted int array. Return the index or -1. State worst-case complexity.", answer: "Keep low and high; mid = (low+high)/2; equal → return mid; key < arr[mid] → high = mid-1; else low = mid+1. Worst case O(log n)." },
      { type: "programming", question: "Write bubble sort for an int array and state its worst-case time complexity.", answer: "Nested loops: if arr[j] > arr[j+1] swap. Worst case O(n²) comparisons and swaps." },
      { type: "tracing", question: "Trace one full outer pass of bubble sort on [4, 1, 3, 2] and show the array after that pass.", answer: "Compare 4>1 swap → [1,4,3,2]; 4>3 swap → [1,3,4,2]; 4>2 swap → [1,3,2,4]. After pass 1 the largest value 4 is at the end." },
    ],
    related: [
      { href: "/isc/class-xii/data-structures", label: "Data Structures overview" },
      { href: "/isc/class-xii/complexity-big-o", label: "Complexity and Big O" },
      { href: "/isc/class-xii/trees", label: "Trees" },
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
    overview: "Choose and reason about stacks, queues, linked lists and trees. ISC board questions test LIFO vs FIFO, overflow/underflow, node linking, and matching a structure to an operation set. Study the dedicated Stack, Queue and Trees lessons after this overview.",
    concepts: [
      "A stack follows LIFO (Last In First Out): the most recently inserted item is removed first. Operations: push (insert at top), pop (remove from top), peek/top (view top without removing).",
      "A queue follows FIFO (First In First Out): the earliest inserted item is removed first. Operations: enqueue (insert at rear), dequeue (remove from front).",
      "Stack overflow occurs when push is called on a full stack; stack underflow occurs when pop is called on an empty stack. Queue overflow/underflow follow the same idea at rear/front.",
      "A linked list is a sequence of nodes where each node stores data and a reference (pointer) to the next node. The last node's next is null.",
      "A binary tree is a hierarchical structure: each node has at most two children (left and right). Traversals are inorder, preorder and postorder.",
      "Linked list operations: insert at head O(1), insert at tail O(n) without a tail pointer, search O(n), delete O(n).",
      "Stack time complexity: push O(1), pop O(1), peek O(1). Queue time complexity: enqueue O(1), dequeue O(1) with a proper (circular or linked) implementation.",
      "Arrays provide O(1) indexed access; linked structures emphasise dynamic size and efficient insertion/deletion at known positions.",
      "Choose a structure based on required operations: stack for undo/backtracking/expression evaluation, queue for scheduling/BFS, linked list for dynamic insertion, tree for hierarchical search.",
    ],
    workedExample: "Stack trace: push(A), push(B), push(C), pop() → C, push(D), pop() → D, pop() → B. Queue trace: enqueue(A), enqueue(B), dequeue() → A, enqueue(C), dequeue() → B. Tree: root 8 with left 3 and right 10 has inorder 3, 8, 10.",
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
    related: [
      { href: "/isc/class-xii/stack", label: "Stack" },
      { href: "/isc/class-xii/queue", label: "Queue" },
      { href: "/isc/class-xii/trees", label: "Trees" },
      { href: "/isc/class-xii/complexity-big-o", label: "Complexity and Big O" },
    ],
  },

  "stack": {
    title: "Stack",
    section: "C",
    overview: "A stack is a LIFO linear structure. ISC board questions require tracing push/pop/peek, detecting overflow and underflow, implementing an array stack in Java, and applying stacks to reverse, matching brackets and postfix evaluation.",
    concepts: [
      "LIFO: the last item pushed is the first item popped. Only the top is accessible.",
      "Primitive operations: push (insert at top), pop (remove from top), peek/top (read top without removing), isEmpty, isFull.",
      "Array implementation: int top = -1 for empty. Push does data[++top] = x after a full check. Pop returns data[top--] after an empty check.",
      "Overflow: push on a full stack (top == capacity - 1). Underflow: pop or peek on an empty stack (top == -1).",
      "Push, pop and peek are O(1) time and O(1) extra space for an array stack.",
      "The Java method-call stack is itself a stack of frames; recursion uses the same LIFO rule.",
      "Applications: undo, backtracking, reversing a sequence, matching parentheses, converting infix to postfix, evaluating postfix, DFS.",
      "A linked-list stack pushes and pops at the head, so it grows until memory is exhausted and still has O(1) push/pop.",
      "Peek never changes top. Confusing peek with pop is a common board tracing error.",
    ],
    workedExample: "Capacity 4, top starts at -1. push(5), push(8), push(2) → stack [5, 8, 2], top=2. pop() returns 2, top=1. peek() returns 8, top still 1. push(9) → [5, 8, 9], top=2.",
    workedExampleCode: `class Stack {
    int[] data;
    int top;
    int capacity;
    Stack(int capacity) {
        this.capacity = capacity;
        data = new int[capacity];
        top = -1;
    }
    boolean isEmpty() { return top == -1; }
    boolean isFull() { return top == capacity - 1; }
    void push(int x) {
        if (isFull()) {
            System.out.println("Overflow");
            return;
        }
        data[++top] = x;
    }
    int pop() {
        if (isEmpty()) {
            System.out.println("Underflow");
            return -1;
        }
        return data[top--];
    }
    int peek() {
        if (isEmpty()) return -1;
        return data[top];
    }
}
// Trace: push(5); push(8); push(2); pop(); peek(); push(9);
// After push 5,8,2: [5,8,2] top=2
// pop -> 2, top=1; peek -> 8; push 9 -> [5,8,9] top=2`,
    practice: [
      { type: "tracing", question: "Empty stack. Operations: push(4), push(7), pop(), push(1), push(9), pop(), peek(). State each pop/peek result and the final stack from bottom to top.", answer: "pop returns 7, then 9. peek returns 1. Final stack bottom→top: 4, 1." },
      { type: "tracing", question: "Trace postfix evaluation of 5 3 + 2 * using a stack. Show the stack after each token.", answer: "5 → [5]; 3 → [5,3]; + pops 3 and 5, pushes 8 → [8]; 2 → [8,2]; * pops 2 and 8, pushes 16 → [16]. Result 16." },
      { type: "tracing", question: "A stack of capacity 3 contains 10, 20 (top=20). Trace push(30), push(40), pop(), pop(). Which operation fails and why?", answer: "push(30) succeeds (now full). push(40) is overflow. Then pop returns 30, pop returns 20. Remaining: 10." },
      { type: "debugging", question: "push is written as data[top++] = x with top initially -1. Identify the defect.", answer: "The first push writes data[-1]. Use data[++top] = x so top becomes 0 before the write. pop should use data[top--]." },
      { type: "debugging", question: "A matching-brackets method pushes every character, including letters. Why can it report a balanced string as unbalanced?", answer: "Only opening brackets should be pushed. Letters must be ignored. Pop only when a closing bracket arrives, and compare types." },
      { type: "programming", question: "Write a Java array Stack with push, pop, peek, isEmpty and isFull, including overflow and underflow messages.", answer: "Maintain top and capacity. push checks isFull then data[++top]=x. pop checks isEmpty then returns data[top--]. peek returns data[top] without changing top." },
      { type: "programming", question: "Write a method boolean balanced(String s) that uses a stack to check (), [] and {}.", answer: "Push opening brackets. On a closer, if the stack is empty or the popped opener does not match, return false. After the scan the stack must be empty." },
      { type: "programming", question: "Write a method that reverses an int array in place using a stack.", answer: "Push every element, then pop back into indices 0..n-1. Time O(n), extra space O(n)." },
      { type: "mcq", question: "After push(1), push(2), peek(), pop(), what does a second peek return?", options: ["A) 2", "B) 1", "C) Underflow", "D) 1 then 2"], answer: "B", explanation: "peek does not remove 2; pop removes 2; the new top is 1." },
      { type: "mcq", question: "Which application is a natural fit for a stack?", options: ["A) Print-job scheduling", "B) Undo in an editor", "C) CPU round-robin", "D) Breadth-first search"], answer: "B", explanation: "Undo restores the most recent change first (LIFO)." },
      { type: "mcq", question: "When is an array stack in overflow?", options: ["A) top == -1", "B) top == 0", "C) top == capacity - 1 and another push is attempted", "D) peek is called"], answer: "C", explanation: "The last valid index is capacity-1; a further push overflows." },
      { type: "reasoning", question: "Why are stack push and pop O(1), and why is searching a stack for an arbitrary value O(n)?", answer: "Push and pop touch only the top cell. Finding an arbitrary value may require scanning every element from the top, which is O(n)." },
    ],
    related: [
      { href: "/isc/class-xii/data-structures", label: "Data Structures overview" },
      { href: "/isc/class-xii/queue", label: "Queue" },
      { href: "/isc/class-xii/trees", label: "Trees" },
      { href: "/isc/class-xii/complexity-big-o", label: "Complexity and Big O" },
    ],
  },

  "queue": {
    title: "Queue",
    section: "C",
    overview: "A queue is a FIFO linear structure. ISC board questions require tracing enqueue/dequeue, explaining linear-array false overflow, implementing a circular queue, and choosing a queue for scheduling problems.",
    concepts: [
      "FIFO: the earliest enqueued item is dequeued first. Insert at rear, remove from front.",
      "Primitive operations: enqueue/insert (rear), dequeue/delete (front), peek/front, isEmpty, isFull.",
      "Linear array queue: front starts at 0, rear at -1. enqueue does data[++rear]=x. dequeue returns data[front++]. Unused cells at the front are not reused, causing false overflow.",
      "Circular queue: wrap with rear = (rear + 1) % capacity and front = (front + 1) % capacity. Maintain a size counter (or equivalent full/empty test) so full and empty are not confused.",
      "Empty: size == 0 (or front == rear in some conventions). Full: size == capacity.",
      "Enqueue and dequeue are O(1) when front and rear are maintained. Shifting every remaining element on dequeue is O(n) and is not the ISC-preferred design.",
      "Overflow: enqueue on a full queue. Underflow: dequeue on an empty queue.",
      "A linked-list queue uses a tail pointer so enqueue at the tail and dequeue at the head are both O(1).",
      "Applications: print spooling, customer service, BFS, CPU scheduling, buffering.",
    ],
    workedExample: "Circular queue capacity 3. enqueue(A), enqueue(B), enqueue(C) → full. dequeue() → A. enqueue(D) reuses index 0. Contents in FIFO order: B, C, D.",
    workedExampleCode: `class CircularQueue {
    int[] data;
    int front = 0, rear = -1, size = 0, cap;
    CircularQueue(int cap) {
        this.cap = cap;
        data = new int[cap];
    }
    boolean isEmpty() { return size == 0; }
    boolean isFull() { return size == cap; }
    void enqueue(int x) {
        if (isFull()) {
            System.out.println("Overflow");
            return;
        }
        rear = (rear + 1) % cap;
        data[rear] = x;
        size++;
    }
    int dequeue() {
        if (isEmpty()) {
            System.out.println("Underflow");
            return -1;
        }
        int val = data[front];
        front = (front + 1) % cap;
        size--;
        return val;
    }
}
// enqueue 10,20,30 (full); dequeue -> 10; enqueue 40
// FIFO remaining: 20, 20's front, then 30, 40`,
    practice: [
      { type: "tracing", question: "Empty queue. enqueue(5), enqueue(8), dequeue(), enqueue(3), dequeue(), dequeue(). List each dequeue result and the final state.", answer: "dequeue returns 5, then 8, then 3. The queue is then empty." },
      { type: "tracing", question: "Linear array capacity 3: enqueue(1), enqueue(2), enqueue(3), dequeue(), dequeue(). Can enqueue(4) succeed without shifting or wrapping? Explain.", answer: "No. rear is already at index 2 (last cell) even though two front cells are free. This is false overflow; a circular queue or a shift would be required." },
      { type: "tracing", question: "Circular queue capacity 3, size 0. Trace enqueue(9), enqueue(6), enqueue(1), dequeue(), enqueue(4), enqueue(2). Which operation overflows? State remaining FIFO order after the overflow attempt.", answer: "enqueue(9), enqueue(6), enqueue(1) fill the queue. dequeue() returns 9 (remaining 6, 1). enqueue(4) reuses the freed slot (remaining 6, 1, 4). enqueue(2) is overflow. Remaining FIFO order: 6, 1, 4." },
      { type: "debugging", question: "A circular queue uses front == rear for both empty and full. What bug appears and how is it fixed?", answer: "Empty and full are indistinguishable. Store a size count, or keep one slot empty, or use a separate boolean full flag." },
      { type: "debugging", question: "dequeue is implemented by moving every remaining element one index left and decrementing rear. Why is this poor for ISC timing questions?", answer: "Each dequeue is O(n). Keep a front index (and wrap in the circular case) so dequeue stays O(1)." },
      { type: "programming", question: "Implement a CircularQueue in Java with enqueue, dequeue, peek, isEmpty and isFull using modulo wrapping and a size field.", answer: "rear = (rear+1)%cap on enqueue; front = (front+1)%cap on dequeue; reject enqueue when size==cap and dequeue when size==0." },
      { type: "programming", question: "Write a method that simulates a printer queue: enqueue job names, then dequeue and print until empty.", answer: "Use a queue of strings. enqueue each job, then while (!isEmpty()) print dequeue(). Jobs emerge in arrival order." },
      { type: "programming", question: "Using two stacks, implement a queue (enqueue and dequeue). State the amortised cost.", answer: "inStack for enqueue (O(1)). dequeue: if outStack is empty, pop all from inStack onto outStack, then pop outStack. Amortised O(1) dequeue." },
      { type: "mcq", question: "Which order does a standard queue follow?", options: ["A) LIFO", "B) FIFO", "C) Sorted order", "D) Random"], answer: "B", explanation: "First in, first out." },
      { type: "mcq", question: "What causes false overflow in a linear array queue?", options: ["A) front == 0", "B) rear reaches the last index while earlier cells are free", "C) size == 0", "D) peek on one element"], answer: "B", explanation: "Without wrapping, freed front cells cannot be reused." },
      { type: "mcq", question: "Which problem is best modelled with a queue?", options: ["A) Undo", "B) Recursion", "C) Print spooling", "D) Postfix evaluation"], answer: "C", explanation: "Jobs should print in the order they arrived." },
      { type: "reasoning", question: "Compare a linear array queue, a circular array queue and a linked queue on overflow and time.", answer: "Linear array: O(1) operations but false overflow. Circular array: O(1) operations, reuses cells, overflow only when truly full. Linked queue: O(1) with tail pointer, overflow only when memory is exhausted." },
    ],
    related: [
      { href: "/isc/class-xii/data-structures", label: "Data Structures overview" },
      { href: "/isc/class-xii/stack", label: "Stack" },
      { href: "/isc/class-xii/trees", label: "Trees" },
      { href: "/isc/class-xii/complexity-big-o", label: "Complexity and Big O" },
    ],
  },

  "trees": {
    title: "Trees",
    section: "C",
    overview: "A binary tree organises data hierarchically. ISC-style questions test node terminology, BST insert/search, inorder/preorder/postorder tracing, and writing recursive traversal methods.",
    concepts: [
      "A tree is a connected acyclic hierarchy of nodes. The root has no parent; leaves have no children.",
      "A binary tree: each node has at most two children, conventionally left and right.",
      "Depth/level of the root is 0 (or 1, if the paper defines it that way — state the convention). Height is the number of edges on the longest root-to-leaf path.",
      "A binary search tree (BST): for every node, all keys in the left subtree are smaller and all keys in the right subtree are larger (assuming distinct keys).",
      "BST search and insert follow the same compare-and-descend rule and are O(h), where h is height. A balanced tree has h = O(log n); a skewed tree has h = O(n).",
      "Inorder (left, root, right) of a BST yields keys in ascending order.",
      "Preorder: root, left, right. Postorder: left, right, root. These are used for copying a tree and for deleting/evaluating an expression tree.",
      "A complete binary tree fills levels from left to right. A full binary tree has 0 or 2 children on every node.",
      "Level-order (BFS) traversal uses a queue; DFS-style traversals use recursion (the call stack) or an explicit stack.",
    ],
    workedExample: "Insert 8, 3, 10, 1, 6 into an empty BST. Root 8, left 3 with children 1 and 6, right 10. Inorder: 1, 3, 6, 8, 10. Preorder: 8, 3, 1, 6, 10. Postorder: 1, 6, 3, 10, 8. Search 6: 8→3→6.",
    workedExampleCode: `class Node {
    int data;
    Node left, right;
    Node(int data) { this.data = data; }
}
class BST {
    Node root;
    Node insert(Node t, int key) {
        if (t == null) return new Node(key);
        if (key < t.data) t.left = insert(t.left, key);
        else if (key > t.data) t.right = insert(t.right, key);
        return t;
    }
    void inorder(Node t) {
        if (t == null) return;
        inorder(t.left);
        System.out.print(t.data + " ");
        inorder(t.right);
    }
    boolean search(Node t, int key) {
        if (t == null) return false;
        if (key == t.data) return true;
        if (key < t.data) return search(t.left, key);
        return search(t.right, key);
    }
}
// Insert 8,3,10,1,6 then inorder prints: 1 3 6 8 10`,
    practice: [
      { type: "tracing", question: "BST insertions in order: 50, 30, 70, 20, 40. Draw parent-child links and write the inorder sequence.", answer: "50 has left 30 and right 70. 30 has left 20 and right 40. Inorder: 20, 30, 40, 50, 70." },
      { type: "tracing", question: "For the tree with preorder 8,3,1,6,10 and inorder 1,3,6,8,10, state the postorder sequence.", answer: "Postorder is 1, 6, 3, 10, 8. Root is 8; left subtree 3(1,6); right subtree 10." },
      { type: "tracing", question: "Search for 40 in BST root 50, left 30 (left 20, right 40), right 70. List the nodes compared.", answer: "Compare 50 (go left), 30 (go right), 40 (found). Three comparisons." },
      { type: "debugging", question: "A student writes inorder as print, then left, then right. What traversal is this, and what BST property is lost?", answer: "That is preorder, not inorder. The ascending-key property of BST inorder is lost." },
      { type: "debugging", question: "insert always attaches a new node on the left, ignoring the key comparison. What happens after inserting 5, 2, 8?", answer: "The tree becomes a left chain 5-2-8 (all left). Search for 8 may fail or take a skewed path; the BST invariant is broken." },
      { type: "programming", question: "Write recursive methods for inorder, preorder and postorder printing of a binary tree.", answer: "Base case: t==null return. Inorder: left, print, right. Preorder: print, left, right. Postorder: left, right, print." },
      { type: "programming", question: "Write a recursive BST insert and search for distinct integer keys.", answer: "insert: null → new Node(key); key < t.data → t.left = insert(t.left,key); else t.right = insert(t.right,key). search: null → false; equal → true; else descend left or right." },
      { type: "programming", question: "Write a method int height(Node t) returning the number of edges on the longest path to a leaf. Empty tree height is -1.", answer: "if (t==null) return -1; return 1 + Math.max(height(t.left), height(t.right));" },
      { type: "mcq", question: "Inorder traversal of a BST produces keys in which order?", options: ["A) Insertion order", "B) Ascending order", "C) Descending only if skewed", "D) Level order"], answer: "B", explanation: "Left, root, right visits smaller keys first." },
      { type: "mcq", question: "Worst-case search time in a skewed BST of n nodes is", options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n²)"], answer: "C", explanation: "A chain of n nodes is equivalent to a linked list." },
      { type: "mcq", question: "Which traversal visits the root first?", options: ["A) Inorder", "B) Preorder", "C) Postorder", "D) None"], answer: "B", explanation: "Preorder is root, left, right." },
      { type: "reasoning", question: "Why can BST search be O(log n) and also O(n)? What structure restores the logarithmic bound?", answer: "Height decides the path length. Inserting in sorted order builds a skew of height n. A balanced binary tree (or careful insertion) keeps height O(log n)." },
    ],
    related: [
      { href: "/isc/class-xii/data-structures", label: "Data Structures overview" },
      { href: "/isc/class-xii/stack", label: "Stack" },
      { href: "/isc/class-xii/queue", label: "Queue" },
      { href: "/isc/class-xii/recursion", label: "Recursion" },
      { href: "/isc/class-xii/complexity-big-o", label: "Complexity and Big O" },
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
      { type: "reasoning", question: "State the time complexity of stack push/pop, circular-queue enqueue/dequeue, BST search in a balanced tree, and BST search in a skewed tree.", answer: "Stack push/pop: O(1). Circular-queue enqueue/dequeue: O(1). Balanced BST search: O(log n). Skewed BST search: O(n)." },
    ],
    related: [
      { href: "/isc/class-xii/data-structures", label: "Data Structures overview" },
      { href: "/isc/class-xii/stack", label: "Stack" },
      { href: "/isc/class-xii/queue", label: "Queue" },
      { href: "/isc/class-xii/trees", label: "Trees" },
      { href: "/isc/class-xii/arrays-strings", label: "Arrays and Strings" },
    ],
  },
};

export const getISCXIIJavaPythonContent = (slug) => ISC_XII_JAVA_PYTHON_CONTENT[slug] ?? null;
