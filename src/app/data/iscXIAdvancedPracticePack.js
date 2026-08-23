// ISC XI Advanced Practice Pack
export const ISC_XI_ADVANCED_PRACTICE = {
  sections: [
    {
      id: "inheritance",
      title: "Inheritance",
      focus: "Single, multilevel and hierarchical inheritance, constructor chaining, super/this, overriding, protected access, arrays, methods and tracing.",
      conceptGuide: [
        { topic: "Single inheritance", explanation: "One subclass directly extends one superclass.", example: "class Dog extends Animal { }" },
        { topic: "Multilevel inheritance", explanation: "Inheritance continues through a chain such as A → B → C.", example: "class B extends A { } class C extends B { }" },
        { topic: "Hierarchical inheritance", explanation: "Multiple subclasses extend the same superclass.", example: "class Car extends Vehicle { } class Bike extends Vehicle { }" },
        { topic: "Constructor chaining", explanation: "Superclass constructors execute before subclass constructors; explicit super() must be first.", example: "A() → B() → C()" },
        { topic: "super() vs this()", explanation: "super() calls the immediate superclass constructor; this() calls another constructor in the same class.", example: "this(10); | super(10);" },
        { topic: "Method overriding", explanation: "A subclass supplies a new implementation with the same method signature.", example: "A ref = new B(); ref.show();" },
        { topic: "protected access", explanation: "protected members can be accessed by subclasses subject to Java access rules.", example: "protected int balance;" },
        { topic: "Inheritance + methods", explanation: "A child can reuse, add or override methods inherited from a parent.", example: "Savings reuses deposit() and adds calculateInterest()." },
        { topic: "Inheritance + arrays", explanation: "Inherited methods can process arrays and child classes can add specialised array operations.", example: "int sum(int[] a)" }
      ],
      questions: [
        { id: "INH-01", difficulty: "foundation", type: "classification", question: "Class B extends class A. Is this single, multilevel or hierarchical inheritance? Explain.", answer: "Single inheritance; B directly extends A.", explanation: "Only one parent-child inheritance link is present." },
        { id: "INH-02", difficulty: "foundation", type: "classification", question: "Classes B extends A and C extends B. What inheritance structure is formed?", answer: "Multilevel inheritance: A → B → C.", explanation: "There are multiple inheritance levels." },
        { id: "INH-03", difficulty: "foundation", type: "classification", question: "Classes Car and Bike both extend Vehicle. What inheritance structure is formed?", answer: "Hierarchical inheritance.", explanation: "Multiple subclasses share one superclass." },
        { id: "INH-04", difficulty: "board", type: "output", question: 'class A{ A(){System.out.print("A ");} } class B extends A{ B(){System.out.print("B ");} } public class Test{public static void main(String[] x){new B();}} What is the output?', answer: "A B", explanation: "The superclass constructor executes before the subclass constructor." },
        { id: "INH-05", difficulty: "board", type: "output", question: 'class A{ A(){System.out.print("A ");} } class B extends A{ B(){super(); System.out.print("B ");} } public class Test{public static void main(String[] x){new B();}} What is the output and why?', answer: "A B", explanation: "super() explicitly invokes the parent constructor first." },
        { id: "INH-06", difficulty: "board", type: "reasoning", question: "Compare super() and this() inside constructors. What does each call and why must it appear first?", answer: "super() calls the immediate superclass constructor; this() calls another constructor in the same class. Either constructor-chain call must be first.", explanation: "Java requires constructor chaining before executable statements." },
        { id: "INH-07", difficulty: "challenge", type: "debugging", question: 'A constructor contains System.out.println("Start"); super(); Identify the error.', answer: "super() is not the first statement. Move super() before the print statement.", explanation: "Superclass construction must happen first." },
        { id: "INH-08", difficulty: "board", type: "output", question: "A has int n=10; B extends A and declares int n=20. Inside B, what do n and super.n print?", answer: "n prints 20 and super.n prints 10.", explanation: "The child field hides the parent field; super selects the parent field." },
        { id: "INH-09", difficulty: "board", type: "access", question: "A superclass declares protected int balance. Can a subclass access balance directly?", answer: "Yes, subject to Java's protected access rules.", explanation: "protected permits controlled subclass access." },
        { id: "INH-10", difficulty: "board", type: "output", question: 'class A{void show(){System.out.print("A");}} class B extends A{void show(){System.out.print("B");}} A ref=new B(); ref.show(); Predict the output and explain why.', answer: "B", explanation: "Runtime dispatch selects the overridden B.show() implementation." },
        { id: "INH-11", difficulty: "reasoning", type: "comparison", question: "A has show(int) and B defines show(double). Is this overriding or overloading?", answer: "Overloading; the parameter lists differ.", explanation: "Overriding requires the same method signature." },
        { id: "INH-12", difficulty: "board", type: "programming", question: "Write a multilevel inheritance program A→B→C where C displays one inherited value from A and one value defined in B.", answer: "Use B extends A and C extends B, then create C and access both values.", explanation: "This tests transitive inheritance across three levels." },
        { id: "INH-13", difficulty: "board", type: "programming", question: "Create Vehicle as a superclass and Car/Bike as subclasses. Give both children a method showType() with different output.", answer: "Use hierarchical inheritance and override showType() in each child.", explanation: "This combines hierarchy with overriding." },
        { id: "INH-14", difficulty: "board", type: "methods", question: "Superclass Account has deposit(int). Subclass Savings adds calculateInterest(). Which methods can a Savings object call?", answer: "It can call inherited deposit(int) and its own calculateInterest().", explanation: "Inheritance provides method reuse." },
        { id: "INH-15", difficulty: "challenge", type: "arrays", question: "Superclass Result defines total(int[] marks). Subclass Result2026 adds grade(int total). How can one Result2026 object use both?", answer: "It inherits total(int[]) and defines grade(int), so the same object can call both.", explanation: "This combines inheritance with array-processing methods." },
        { id: "INH-16", difficulty: "challenge", type: "arrays", question: "A parent class method sum(int[] a) computes an array total. A child class adds average(int[] a). Explain the method reuse.", answer: "The child extends the parent, calls inherited sum(a), and divides by the element count.", explanation: "The child specialises rather than duplicates the parent logic." },
        { id: "INH-17", difficulty: "challenge", type: "tracing", question: "A base constructor prints 1, an intermediate constructor prints 2, and a child constructor prints 3. Predict new Child().", answer: "1 2 3", explanation: "Constructors execute from the topmost superclass down to the child." },
        { id: "INH-18", difficulty: "challenge", type: "output", question: 'class A{void show(){System.out.print("A");}} class B extends A{void show(){System.out.print("B");} void test(){super.show(); show();}} new B().test(); Predict the output and explain.', answer: "AB", explanation: "super.show() calls A.show(); normal show() calls B.show()." },
        { id: "INH-19", difficulty: "challenge", type: "debugging", question: "A subclass tries to access a superclass private field directly. Why does it fail?", answer: "private members are not directly accessible in subclasses; use an appropriate accessor or deliberately chosen access level.", explanation: "Inheritance does not expose private state directly." },
        { id: "INH-20", difficulty: "advanced", type: "programming", question: "Create Parent with an integer array and printPositiveCount(). Create Child with printMaximum(). Demonstrate both on one object.", answer: "Child extends Parent, reuses printPositiveCount() and adds printMaximum().", explanation: "This integrates inheritance, arrays and methods." },
        { id: "INH-21", difficulty: "advanced", type: "output", question: 'Predict the exact output: class A{A(){System.out.print("A");} void p(){System.out.print("P");}} class B extends A{B(){System.out.print("B");} void p(){System.out.print("Q");}} A x=new B(); x.p();', answer: "ABQ", explanation: "Constructor chaining prints A then B; runtime dispatch selects B.p()." }
      ]
    },
    {
      id: "polymorphism",
      title: "Polymorphism",
      focus: "Overloading, overriding and runtime dispatch.",
      questions: [
        { id: "POLY-01", difficulty: "board", type: "output", question: 'class A{void show(){System.out.print("A");}} class B extends A{void show(){System.out.print("B");}} A ref=new B(); ref.show(); What is printed?', answer: "B", explanation: "Overriding is resolved at runtime." },
        { id: "POLY-02", difficulty: "board", type: "reasoning", question: "A has show(int), B has show(double). Overriding or overloading?", answer: "Overloading", explanation: "The parameter lists differ." },
        { id: "POLY-03", difficulty: "challenge", type: "debugging", question: "Why can an A reference fail to call a B-only method even when it stores new B()?", answer: "Compile-time member visibility uses the reference type A.", explanation: "Dynamic dispatch does not add B-only methods to A's compile-time interface." },
        { id: "POLY-04", difficulty: "programming", type: "write", question: "Create Shape with area() and Circle/Rectangle overrides, then demonstrate runtime polymorphism.", answer: "Use a Shape reference pointing to Circle or Rectangle and call area().", explanation: "One reference type can invoke different subclass implementations." }
      ]
    },
    {
      id: "recursion",
      title: "Recursion",
      focus: "Base cases, recursive calls and stack unwinding.",
      questions: [
        { id: "REC-01", difficulty: "board", type: "output", question: "int f(int n){if(n==0)return 0;return n+f(n-1);} What does f(4) return?", answer: "10", explanation: "4+3+2+1+0 = 10." },
        { id: "REC-02", difficulty: "board", type: "tracing", question: "For fact(3), list the call and return order.", answer: "Calls fact(3), fact(2), fact(1), fact(0); returns 1, 1, 2, 6.", explanation: "The call stack unwinds after the base case." },
        { id: "REC-03", difficulty: "challenge", type: "debugging", question: "A recursive method never moves toward its base case. Result?", answer: "Infinite recursion leading to StackOverflowError.", explanation: "Every recursive call consumes stack space." },
        { id: "REC-04", difficulty: "programming", type: "write", question: "Write a recursive method to find sum of digits.", answer: "Base case n<10; recursive case n%10 + sumDigits(n/10).", explanation: "Each call removes one digit." }
      ]
    },
    {
      id: "stack",
      title: "Stack",
      focus: "LIFO, push/pop and overflow/underflow.",
      questions: [
        { id: "STK-01", difficulty: "board", type: "trace", question: "Push 10, push 20, pop, push 30. What is the top?", answer: "30", explanation: "20 is removed, then 30 becomes top." },
        { id: "STK-02", difficulty: "board", type: "reasoning", question: "A capacity-3 stack is full. What causes overflow?", answer: "A fourth push without a prior pop.", explanation: "Insertion into a full stack is overflow." },
        { id: "STK-03", difficulty: "challenge", type: "debugging", question: "What is a pop from an empty stack called?", answer: "Underflow.", explanation: "Removal from an empty stack is invalid." },
        { id: "STK-04", difficulty: "programming", type: "write", question: "Implement array-based push and pop with overflow/underflow checks.", answer: "Maintain top and check bounds before push/pop.", explanation: "The implementation should protect both ends of the valid range." }
      ]
    },
    {
      id: "queue",
      title: "Queue",
      focus: "FIFO, insertion/removal order and circular queues.",
      questions: [
        { id: "QUE-01", difficulty: "board", type: "trace", question: "Enqueue 5,10,15; dequeue twice. What remains at front?", answer: "15", explanation: "FIFO removes 5 then 10." },
        { id: "QUE-02", difficulty: "board", type: "reasoning", question: "Why can a linear array queue report overflow while earlier positions are empty?", answer: "The rear can reach the final cell while freed front cells remain unused.", explanation: "Circular queues reuse those cells." },
        { id: "QUE-03", difficulty: "challenge", type: "debugging", question: "What bug occurs if dequeue does not check empty first?", answer: "Queue underflow or invalid front movement.", explanation: "The empty condition must be tested before removal." },
        { id: "QUE-04", difficulty: "programming", type: "write", question: "Design a circular queue using an array.", answer: "Track front, rear and size or an equivalent full/empty test, wrapping with modulo.", explanation: "Circular reuse avoids the wasted-space problem of a simple linear queue." }
      ]
    },
    {
      id: "output-tracing",
      title: "Output & Tracing",
      focus: "Exact output from loops, methods, recursion and objects.",
      questions: [
        { id: "OUT-01", difficulty: "board", type: "output", question: "int x=2; for(int i=1;i<=3;i++) x+=i; System.out.print(x);", answer: "8", explanation: "x becomes 3, 5 and 8." },
        { id: "OUT-02", difficulty: "board", type: "output", question: "for(int i=1;i<=3;i++){for(int j=1;j<=i;j++)System.out.print(j);System.out.println();}", answer: "1\n12\n123", explanation: "The inner loop prints 1 through i." },
        { id: "OUT-03", difficulty: "challenge", type: "output", question: "int p=1; for(int i=1;i<=4;i++){p*=2;if(p>4)break;} System.out.print(p);", answer: "8", explanation: "p becomes 2,4,8 before the break." },
        { id: "OUT-04", difficulty: "challenge", type: "trace", question: "Why does changing a primitive parameter inside a method not change the caller variable?", answer: "Primitive values are passed by value, so the method receives a copy.", explanation: "Changing the copy does not change the caller's variable." }
      ]
    },
    {
      id: "array-rows-columns",
      title: "2D Arrays — Rows & Columns",
      focus: "Row sums, column sums, diagonals and row/column processing.",
      questions: [
        { id: "ARR-01", difficulty: "board", type: "programming", question: "Find and print the sum of every row of a 3×4 matrix.", answer: "Loop over rows and then columns, resetting the row sum each time.", explanation: "The outer loop identifies the row; the inner loop processes its columns." },
        { id: "ARR-02", difficulty: "board", type: "programming", question: "Find and print the sum of every column of a 4×3 matrix.", answer: "Loop over columns and then rows, accumulating each column.", explanation: "The loop order is swapped compared with row sums." },
        { id: "ARR-03", difficulty: "board", type: "reasoning", question: "How do you find the largest element in every row?", answer: "Start with the first element of each row and compare across the remaining columns.", explanation: "Each row needs its own maximum." },
        { id: "ARR-04", difficulty: "challenge", type: "programming", question: "Determine whether every row of a square matrix contains at least one prime.", answer: "Process rows independently and mark a row true when a prime is found.", explanation: "The overall result depends on every row satisfying the condition." },
        { id: "ARR-05", difficulty: "challenge", type: "programming", question: "Sort each row of a 2D array independently without changing row boundaries.", answer: "Apply a row-wise sorting algorithm to each row separately.", explanation: "Each row is treated as its own one-dimensional array." },
        { id: "ARR-06", difficulty: "challenge", type: "programming", question: "Compare main and secondary diagonal sums of a square matrix.", answer: "Main uses a[i][i]; secondary uses a[i][n-1-i].", explanation: "The two diagonal index patterns are different." },
        { id: "ARR-07", difficulty: "advanced", type: "programming", question: "Find the row with maximum sum and the column with maximum sum.", answer: "Compute all row sums and column sums separately and track each maximum.", explanation: "Rows and columns require different traversal directions." },
        { id: "ARR-08", difficulty: "advanced", type: "debugging", question: "Why can using matrix.length for both loops fail on a rectangular matrix?", answer: "matrix.length is the number of rows; matrix[0].length is the number of columns.", explanation: "A rectangular matrix can have different row and column counts." }
      ]
    }
  ],
  mcqs: [
    { id: "XI-MCQ-01", question: "Which concept allows an overridden method to be selected at runtime?", options: ["Encapsulation", "Polymorphism", "Compilation", "Casting only"], answer: "Polymorphism", explanation: "Runtime polymorphism selects the overridden implementation for the actual object." },
    { id: "XI-MCQ-02", question: "What happens when recursion never reaches its base case?", options: ["Queue overflow", "StackOverflowError", "Automatic correction", "No effect"], answer: "StackOverflowError", explanation: "Each recursive call consumes stack space." },
    { id: "XI-MCQ-03", question: "Which order does a normal queue follow?", options: ["LIFO", "FIFO", "Random", "Priority only"], answer: "FIFO", explanation: "First In, First Out." },
    { id: "XI-MCQ-04", question: "For int[][] a, what gives the number of columns in the first row?", options: ["a.length", "a[0].length", "a.length-1", "a[1]"], answer: "a[0].length", explanation: "The outer length is rows; a row's length is columns." },
    { id: "XI-MCQ-05", question: "Which keyword explicitly invokes a superclass constructor?", options: ["this", "super", "extends", "parent"], answer: "super", explanation: "super() invokes the superclass constructor." }
  ],
  practiceLadder: [
    "Foundation: trace one concept in isolation.",
    "Application: combine the concept with a small code fragment.",
    "Board-style: solve output, debugging and programming questions under realistic marks.",
    "Challenge: combine multiple concepts without ambiguous wording."
  ]
};

export default ISC_XI_ADVANCED_PRACTICE;
