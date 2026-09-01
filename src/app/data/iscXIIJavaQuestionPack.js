import { ISC_XII_JAVA_STANDARD } from "./iscXIICurriculum";

export const ISC_XII_JAVA_QUESTION_PACK = {
  standard: ISC_XII_JAVA_STANDARD,
  workedExample: {
    title: "Method Overriding + Dynamic Method Dispatch",
    level: "board",
    code: `class A\n{\n    void show()\n    {\n        System.out.println("Class A");\n    }\n}\n\nclass B extends A\n{\n    void show()\n    {\n        System.out.println("Class B");\n    }\n\n    void display()\n    {\n        System.out.println("Display B");\n    }\n}\n\nclass Test\n{\n    public static void main(String args[])\n    {\n        A obj = new B();\n        obj.show();\n        // obj.display();\n    }\n}`,
    tasks: [
      "State the output.",
      "Identify the concept demonstrated by A obj = new B().",
      "Explain why obj.show() executes B's version.",
      "Predict what happens when obj.display() is uncommented.",
      "State whether show() demonstrates overloading or overriding and justify.",
    ],
    answer: [
      "Output: Class B.",
      "The reference type is A, but the actual object created is B; this demonstrates runtime polymorphism/dynamic method dispatch.",
      "Because show() is overridden, the runtime object type B determines the method implementation selected.",
      "obj.display() causes a compile-time error because display() is not declared in reference class A.",
      "It is method overriding because B supplies a new implementation of the inherited show() method with the same signature.",
    ],
  },
  practice: [
    {
      id: "JXII-Q01", type: "output", difficulty: "board", topic: "Inheritance / overriding",
      question: "Predict the output and justify the method selected when a superclass reference stores a subclass object and an overridden method is called.",
      answer: "The subclass implementation is selected at runtime because the actual object is the subclass.",
    },
    {
      id: "JXII-Q02", type: "debugging", difficulty: "board", topic: "Methods",
      question: "A program compiles until a subclass-only method is called through a superclass reference. Identify the error and explain how the reference type affects method visibility.",
      answer: "It is a compile-time error: the reference type exposes only members declared in the superclass. Use a suitable subclass reference when that member is required.",
    },
    {
      id: "JXII-Q03", type: "programming", difficulty: "challenge", topic: "Inheritance",
      question: "Write a Java program with a superclass and subclass where an overridden method produces different output for the subclass object. Demonstrate dynamic method dispatch in main().",
      answer: "Create an A reference to a B object and call the overridden method; B's implementation should execute at runtime.",
    },
    {
      id: "JXII-Q04", type: "reasoning", difficulty: "application", topic: "Overloading vs overriding",
      question: "A student claims that changing only the parameter list creates method overriding. Decide whether the claim is correct and give a counterexample.",
      answer: "The claim is false. Different parameter lists in the same class are overloading; overriding requires an inherited method with the same signature in the subclass.",
    },
    {
      id: "JXII-Q05", type: "tracing", difficulty: "board", topic: "Constructor / inheritance",
      question: "Trace constructor execution in a superclass-subclass hierarchy and list the order in which constructors execute. Explain why that order occurs.",
      answer: "The superclass constructor executes first, followed by the subclass constructor, because inherited state must be initialized before subclass initialization completes.",
    },
    {
      id: "JXII-Q06", type: "debugging", difficulty: "challenge", topic: "Arrays",
      question: "Given a program that traverses an array and accidentally skips the last valid index, identify the boundary error and state the correct loop condition.",
      answer: "Use i < arr.length (or i <= arr.length - 1). Using i < arr.length - 1 skips the final valid index.",
    },
    {
      id: "JXII-Q07", type: "output", difficulty: "board", topic: "Strings",
      question: "Predict the output of a short String-manipulation program and justify each intermediate value rather than giving only the final line.",
      answer: "Show each intermediate substring/index/character value and then derive the final output from those values.",
    },
    {
      id: "JXII-Q08", type: "programming", difficulty: "board", topic: "Arrays / methods",
      question: "Write a method that receives an integer array and returns the second-largest distinct value. State how your solution handles duplicate maximum values.",
      answer: "Track the largest and second-largest distinct values while scanning once; reject arrays with fewer than two distinct values.",
    },
    {
      id: "JXII-Q09", type: "debugging", difficulty: "application", topic: "Recursion",
      question: "A recursive method never reaches its base case. Identify the defect and explain how the recursive call should move toward termination.",
      answer: "The recursive call must change its argument toward the base-case condition; otherwise recursion can continue until StackOverflowError.",
    },
    {
      id: "JXII-Q10", type: "programming", difficulty: "challenge", topic: "Integrated programming",
      question: "Design a small Java class that stores data, validates input through a method, and generates a formatted result. Explain your choice of fields, constructor and methods.",
      answer: "Use private fields for state, a constructor for initialization, a validation method for constraints, and a result method for formatted output.",
    },
  ],
  caseBased: [
    {
      id: "JXII-CB01", type: "case-based", difficulty: "board", topic: "Inheritance and polymorphism",
      case: "A school system stores Student records and uses a Scholar subclass. A Student reference stores a Scholar object and calls an overridden display() method.",
      questions: [
        "Identify the reference type and actual object type.",
        "Predict which display() implementation executes.",
        "Why can a Scholar-only method not be called through the Student reference?",
        "Name the OOP concept demonstrated."
      ],
      answers: [
        "Reference type: Student; actual object type: Scholar.",
        "Scholar's overridden display() executes at runtime.",
        "Compile-time member access is checked against the Student reference type.",
        "Runtime polymorphism / dynamic method dispatch."
      ]
    },
    {
      id: "JXII-CB02", type: "case-based", difficulty: "board", topic: "Arrays and searching",
      case: "A school maintains marks in an integer array. The program must find the highest mark, count students above 75, and report the first position of a target mark.",
      questions: [
        "State the traversal condition that visits every element.",
        "Write the update rule for the highest mark.",
        "How should the program count marks above 75?",
        "What should be reported if the target mark is absent?"
      ],
      answers: [
        "Use i < marks.length.",
        "If marks[i] > max, assign marks[i] to max.",
        "Increment the counter whenever marks[i] > 75.",
        "Report -1 or another explicitly documented not-found value."
      ]
    }
  ],
  tracing: [
    {
      id: "JXII-TRACE01", type: "tracing", difficulty: "board", topic: "Recursion",
      question: "Trace factorial for n = 4. Give the call sequence and return sequence.",
      answer: "Calls: fact(4) -> fact(3) -> fact(2) -> fact(1). Returns: 1 -> 2 -> 6 -> 24."
    },
    {
      id: "JXII-TRACE02", type: "tracing", difficulty: "board", topic: "Array traversal",
      question: "For a loop over an array of length 5 using i < length, list the valid index values.",
      answer: "0, 1, 2, 3, 4. The loop visits the final valid index because it stops before 5."
    },
    {
      id: "JXII-TRACE03", type: "tracing", difficulty: "application", topic: "String methods",
      question: "Trace s = "COMPUTER" for s.substring(2, 6), s.indexOf("P"), and s.charAt(4).",
      answer: "substring(2,6) = "MPUT"; indexOf("P") = 3; charAt(4) = 'U'."
    }
  ],
  mcqs: [
    {
      id: "JXII-MCQ01", question: "Which change creates an overriding relationship?",
      options: ["A) Unrelated classes", "B) Same-signature inherited method reimplemented in a subclass", "C) Rename a variable", "D) Change a comment"],
      answer: "B", explanation: "Overriding requires inheritance and a compatible method signature."
    },
    {
      id: "JXII-MCQ02", question: "Which loop condition visits every element of int[] a exactly once?",
      options: ["A) i <= a.length", "B) i < a.length", "C) i < a.length - 1", "D) i == a.length"],
      answer: "B", explanation: "Valid indices are 0 through a.length - 1."
    },
    {
      id: "JXII-MCQ03", question: "What is the purpose of a recursive base case?",
      options: ["A) Stop recursive expansion", "B) Create an object", "C) Overload a method", "D) Increase recursion"],
      answer: "A", explanation: "The base case terminates recursive calls."
    },
    {
      id: "JXII-MCQ04", question: "Which exception is raised for an invalid array index at runtime?",
      options: ["A) IOException", "B) ArithmeticException", "C) ArrayIndexOutOfBoundsException", "D) ClassCastException"],
      answer: "C", explanation: "Java reports an invalid array index with ArrayIndexOutOfBoundsException."
    },
    {
      id: "JXII-MCQ05", question: "In A obj = new B(); which type controls whether obj can directly access a member?",
      options: ["A) Actual object type only", "B) Reference type", "C) Constructor name", "D) Variable value"],
      answer: "B", explanation: "Compile-time member visibility is checked using the reference type."
    },
    {
      id: "JXII-MCQ06", question: "Which value is the last valid index of an array with length n?",
      options: ["A) n", "B) n + 1", "C) n - 1", "D) n / 2"],
      answer: "C", explanation: "Java array indices start at zero."
    }
  ],
};

export default ISC_XII_JAVA_QUESTION_PACK;
