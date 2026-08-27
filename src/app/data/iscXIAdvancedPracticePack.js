import fs from "fs";
import path from "path";

// ISC XI Advanced Practice Pack
// Fresh question set: inheritance, polymorphism, recursion, stacks, queues, output tracing and 2D array rows/columns.

export const ISC_XI_ADVANCED_PRACTICE = {
  sections: [
    {
      id: "inheritance",
      title: "Inheritance",
      focus: "Trace inherited members, constructor order, overriding and super.",
      questions: [
        { id: "INH-01", difficulty: "board", type: "output", question: "class A{ A(){System.out.print(\"A \");} } class B extends A{ B(){System.out.print(\"B \");} } public class Test{public static void main(String[] x){new B();}} What is the output?", answer: "A B", explanation: "The superclass constructor executes before the subclass constructor." },
        { id: "INH-02", difficulty: "board", type: "reasoning", question: "A superclass has int n=10 and subclass declares int n=20. Inside a subclass method, compare n and super.n.", answer: "n refers to the subclass field (20); super.n refers to the superclass field (10).", explanation: "Field hiding is resolved using the current scope; super explicitly selects the parent member." },
        { id: "INH-03", difficulty: "challenge", type: "debugging", question: "A subclass constructor calls super() after an executable statement. What must be corrected?", answer: "The explicit super() call must be the first statement of the constructor.", explanation: "A superclass constructor call must appear first in a Java constructor when written explicitly." },
        { id: "INH-04", difficulty: "programming", type: "write", question: "Write a superclass Account with a protected balance and a subclass Savings that adds interest. Demonstrate inherited access and method reuse.", answer: "Use extends, initialize balance in the superclass, then calculate interest in Savings without duplicating balance storage.", explanation: "The task checks inheritance as code reuse rather than merely the extends keyword." }
      ]
    },
    {
      id: "polymorphism",
      title: "Polymorphism",
      focus: "Distinguish overloading from overriding and trace runtime dispatch.",
      questions: [
        { id: "POLY-01", difficulty: "board", type: "output", question: "class A{void show(){System.out.print(\"A\");}} class B extends A{void show(){System.out.print(\"B\");}} A ref=new B(); ref.show(); What is printed?", answer: "B", explanation: "Method overriding is resolved at runtime using the actual object type." },
        { id: "POLY-02", difficulty: "board", type: "reasoning", question: "A has show(int), B extends A and has show(double). Is this overriding or overloading?", answer: "Overloading", explanation: "The parameter list differs, so the methods are overloaded rather than overridden." },
        { id: "POLY-03", difficulty: "challenge", type: "debugging", question: "A reference of type A calls a method that exists only in B. Why can the call fail at compile time even if the object is new B()?", answer: "Compile-time method lookup is based on the reference type; B-only methods are not visible through an A reference.", explanation: "Dynamic dispatch chooses an overridden method, but it does not expand the compile-time method set." },
        { id: "POLY-04", difficulty: "programming", type: "write", question: "Create Shape with area() and subclasses Circle and Rectangle overriding area(). Use a Shape reference to demonstrate runtime polymorphism.", answer: "Declare Shape ref; assign new Circle() or new Rectangle(); call area() and observe the subclass implementation.", explanation: "The key concept is one reference type invoking different overridden implementations." }
      ]
    },
    {
      id: "recursion",
      title: "Recursion",
      focus: "Trace base cases, recursive calls, stack unwinding and common errors.",
      questions: [
        { id: "REC-01", difficulty: "board", type: "output", question: "int f(int n){ if(n==0)return 0; return n+f(n-1);} What does f(4) return?", answer: "10", explanation: "4+3+2+1+0 = 10." },
        { id: "REC-02", difficulty: "board", type: "tracing", question: "For fact(3) = 3*fact(2), write the order of calls and returns.", answer: "Calls: fact(3), fact(2), fact(1), fact(0); returns: 1, 1, 2, 6.", explanation: "The recursive calls go deeper first; values resolve during stack unwinding." },
        { id: "REC-03", difficulty: "challenge", type: "debugging", question: "A recursive method never changes the argument toward its base case. What is the likely result?", answer: "Infinite recursion leading to StackOverflowError.", explanation: "Without progress toward the base case, calls continue until the call stack is exhausted." },
        { id: "REC-04", difficulty: "programming", type: "write", question: "Write a recursive method to find the sum of digits of a positive integer.", answer: "Use base case n<10 => n; recursive case => n%10 + sumDigits(n/10).", explanation: "Each call removes the last digit, ensuring progress toward the base case." }
      ]
    },
    {
      id: "stack",
      title: "Stack",
      focus: "LIFO behavior, push/pop/peek, overflow and underflow.",
      questions: [
        { id: "STK-01", difficulty: "board", type: "trace", question: "Start with empty stack. Push 10, push 20, pop, push 30. What is the top value?", answer: "30", explanation: "After pop, 20 is removed; pushing 30 makes 30 the new top." },
        { id: "STK-02", difficulty: "board", type: "reasoning", question: "A stack has capacity 3 and contains 3 items. What operation causes overflow?", answer: "A fourth push without a prior pop.", explanation: "Overflow occurs when insertion is attempted on a full stack." },
        { id: "STK-03", difficulty: "challenge", type: "debugging", question: "A pop operation is called on an empty stack. Identify the condition and correct response.", answer: "Underflow; reject the pop or report that the stack is empty.", explanation: "The empty condition must be checked before removal." },
        { id: "STK-04", difficulty: "programming", type: "write", question: "Using an array, implement push and pop for an integer stack with overflow and underflow checks.", answer: "Maintain a top index; push increments then stores, pop reads then decrements, with bounds checks.", explanation: "This tests actual stack implementation rather than definition recall." }
      ]
    },
    {
      id: "queue",
      title: "Queue",
      focus: "FIFO behavior, insertion/removal order and circular movement.",
      questions: [
        { id: "QUE-01", difficulty: "board", type: "trace", question: "Enqueue 5, 10, 15; dequeue twice. Which value remains at the front?", answer: "15", explanation: "FIFO removes 5 then 10, leaving 15 at the front." },
        { id: "QUE-02", difficulty: "board", type: "reasoning", question: "Why can a linear array queue report false overflow even when earlier positions are empty?", answer: "Because the rear index may reach the last array cell even though freed front cells are not reused.", explanation: "A circular queue reuses those positions by wrapping indices with modulo capacity." },
        { id: "QUE-03", difficulty: "challenge", type: "debugging", question: "A dequeue operation increments front without checking whether the queue is empty. What bug can occur?", answer: "Queue underflow or invalid front movement when no element exists.", explanation: "The empty condition must be checked before removal." },
        { id: "QUE-04", difficulty: "programming", type: "write", question: "Design a circular queue using an array with enqueue and dequeue operations.", answer: "Use front, rear and size (or an equivalent full/empty test), wrapping indices with modulo capacity.", explanation: "Circular reuse is the core improvement over a simple linear queue." }
      ]
    },
    {
      id: "output-tracing",
      title: "Output & Tracing",
      focus: "Predict exact output from nested loops, methods, recursion and objects.",
      questions: [
        { id: "OUT-01", difficulty: "board", type: "output", question: "int x=2; for(int i=1;i<=3;i++) x += i; System.out.print(x);", answer: "8", explanation: "x becomes 3, then 5, then 8." },
        { id: "OUT-02", difficulty: "board", type: "output", question: "for(int i=1;i<=3;i++){ for(int j=1;j<=i;j++) System.out.print(j); System.out.println(); }", answer: "1\n12\n123", explanation: "The inner loop runs from 1 through i for each outer-loop iteration." },
        { id: "OUT-03", difficulty: "challenge", type: "output", question: "int p=1; for(int i=1;i<=4;i++){ p*=2; if(p>4) break; } System.out.print(p);", answer: "8", explanation: "p becomes 2, 4, then 8; the break occurs after p has reached 8." },
        { id: "OUT-04", difficulty: "challenge", type: "trace", question: "A method increments a parameter int n. Why does the caller's primitive variable remain unchanged after the call?", answer: "Java passes primitive values by value, so the method receives a copy.", explanation: "Changes to the local parameter do not change the caller's primitive variable." }
      ]
    },
    {
      id: "array-rows-columns",
      title: "2D Arrays — Rows & Columns",
      focus: "Row sums, column sums, diagonal logic, row/column properties and transformations.",
      questions: [
        { id: "ARR-01", difficulty: "board", type: "programming", question: "Find and print the sum of every row of a 3×4 integer matrix.", answer: "Use outer loop over rows and inner loop over columns; reset sum for each row." },
        { id: "ARR-02", difficulty: "board", type: "programming", question: "Find and print the sum of every column of a 4×3 integer matrix.", answer: "Outer loop over columns, inner loop over rows; accumulate each column separately." },
        { id: "ARR-03", difficulty: "board", type: "reasoning", question: "How do you find the largest element in each row of a matrix?", answer: "Initialize row maximum from the first element, scan the remaining columns, then print/update the maximum." },
        { id: "ARR-04", difficulty: "challenge", type: "programming", question: "Determine whether every row of a square matrix contains at least one prime number.", answer: "Check each row independently; mark a row true when a prime is found, then combine row results." },
        { id: "ARR-05", difficulty: "challenge", type: "programming", question: "Sort each row of a 2D array independently in ascending order without changing row boundaries.", answer: "Apply a row-wise sorting algorithm to each row separately." },
        { id: "ARR-06", difficulty: "challenge", type: "programming", question: "Compare the sum of the main diagonal and secondary diagonal of a square matrix and report which is larger.", answer: "Use a[i][i] for the main diagonal and a[i][n-1-i] for the secondary diagonal." },
        { id: "ARR-07", difficulty: "advanced", type: "programming", question: "Find the row with the maximum sum and the column with the maximum sum in a matrix; print both indices and sums.", answer: "Compute all row sums and column sums independently, track maximum value and index for each." },
        { id: "ARR-08", difficulty: "advanced", type: "debugging", question: "A programmer uses matrix.length for both row and column loops on a rectangular matrix. Why can this fail?", answer: "matrix.length gives the number of rows; matrix[0].length gives the number of columns." }
      ]
    }
  ],
  mcqs: [
    { id: "XI-MCQ-01", question: "Which concept allows an overridden method to be selected at runtime?", options: ["Encapsulation", "Polymorphism", "Compilation", "Casting only"], answer: "Polymorphism", explanation: "Runtime polymorphism selects the overridden implementation based on the actual object." },
    { id: "XI-MCQ-02", question: "What happens when a recursive method never reaches its base case?", options: ["Queue overflow", "StackOverflowError", "Compile-time success only", "Automatic loop correction"], answer: "StackOverflowError", explanation: "Each recursive call consumes stack space." },
    { id: "XI-MCQ-03", question: "Which order does a normal queue follow?", options: ["LIFO", "FIFO", "Random", "Priority only"], answer: "FIFO", explanation: "First In, First Out." },
    { id: "XI-MCQ-04", question: "For int[][] a, what gives the number of columns in the first row?", options: ["a.length", "a[0].length", "a.length-1", "a[1]"], answer: "a[0].length", explanation: "The outer length is the number of rows; the row's length is its number of columns." },
    { id: "XI-MCQ-05", question: "Which keyword explicitly invokes a superclass constructor?", options: ["this", "super", "extends", "parent"], answer: "super", explanation: "super() calls the superclass constructor." }
  ],
  practiceLadder: [
    "Foundation: trace one concept in isolation.",
    "Application: combine the concept with a small code fragment.",
    "Board-style: solve output/debugging/programming under realistic marks.",
    "Challenge: combine two or more concepts without ambiguous wording."
  ]
};

export const iscXIAdvancedPracticeMetadata = {
  id: "isc-11-advanced-practice",
  title: "ISC Class 11 Advanced Practice Pack",
  board: "ISC",
  class: "11",
  subject: "Computer Science",
};

export function getISCXIAdvancedPracticeContent() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/app/data/ISC_XI_ADVANCED_PRACTICE_QA.md"
    );
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    return "";
  } catch (error) {
    console.error("Error reading ISC_XI_ADVANCED_PRACTICE_QA.md:", error);
    return "";
  }
}

export default iscXIAdvancedPracticeMetadata;