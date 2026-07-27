const chapter6 = {
  id: 6,
  title: "Methods",
  slug: "methods",
  description: "Learn method declaration, parameters, return types, method overloading, and recursion.",
  topics: ["Method Declaration", "Parameters", "Return Types", "Method Overloading", "Recursion", "Static Methods"],

  mcqs: [
    {
      id: "CH06-MCQ-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Declaration",
      question: "Which of the following is a correct method declaration in Java?",
      options: [
        "A) public void myMethod() { }",
        "B) public myMethod void() { }",
        "C) void public myMethod() { }",
        "D) method void myMethod() { }"
      ],
      correctAnswer: "A",
      explanation: "The correct syntax is: accessModifier returnType methodName(parameters) { body }. So 'public void myMethod() { }' is correct.",
      hint: "The order is: access modifier, return type, method name, parentheses.",
      estimatedTime: 15,
      marks: 1,
      tags: ["method declaration", "syntax"]
    },
    {
      id: "CH06-MCQ-002",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Return Types",
      question: "What keyword is used when a method does not return any value?",
      options: [
        "A) null",
        "B) void",
        "C) empty",
        "D) none"
      ],
      correctAnswer: "B",
      explanation: "The 'void' keyword indicates that a method does not return any value. Methods with void cannot use a return statement with a value.",
      hint: "It means 'empty' or 'nothing' in Java.",
      estimatedTime: 10,
      marks: 1,
      tags: ["void", "return type"]
    },
    {
      id: "CH06-MCQ-003",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "What is method overloading?",
      options: [
        "A) Two methods with the same name but different parameters",
        "B) Two methods with the same name and same parameters",
        "C) A method calling itself",
        "D) A method with no parameters"
      ],
      correctAnswer: "A",
      explanation: "Method overloading allows multiple methods with the same name but different parameter lists (different number, type, or order of parameters).",
      hint: "Same name, different parameters.",
      estimatedTime: 15,
      marks: 1,
      tags: ["overloading", "polymorphism"]
    },
    {
      id: "CH06-MCQ-004",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Parameters",
      question: "What will be the output?\n\npublic class Test {\n    public static void change(int x) {\n        x = 20;\n    }\n    public static void main(String[] args) {\n        int a = 10;\n        change(a);\n        System.out.println(a);\n    }\n}",
      options: [
        "A) 10",
        "B) 20",
        "C) Compilation error",
        "D) 0"
      ],
      correctAnswer: "A",
      explanation: "Java is pass-by-value. The method receives a copy of a. Changing x inside the method does not affect the original variable a.",
      hint: "Does Java use pass-by-value or pass-by-reference?",
      estimatedTime: 25,
      marks: 1,
      tags: ["pass-by-value", "parameters", "immutable"]
    },
    {
      id: "CH06-MCQ-005",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "What will be the output?\n\npublic static int fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\nSystem.out.println(fact(4));",
      options: [
        "A) 4",
        "B) 10",
        "C) 24",
        "D) 16"
      ],
      correctAnswer: "C",
      explanation: "fact(4) = 4 * fact(3) = 4 * 3 * fact(2) = 4 * 3 * 2 * fact(1) = 4 * 3 * 2 * 1 = 24.",
      hint: "Trace the recursive calls: fact(4) calls fact(3) calls fact(2) calls fact(1).",
      estimatedTime: 25,
      marks: 2,
      tags: ["recursion", "factorial"]
    },
    {
      id: "CH06-MCQ-006",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Static Methods",
      question: "Which of the following is true about static methods?",
      options: [
        "A) They can access instance variables directly",
        "B) They belong to the class, not to objects",
        "C) They must be called using an object",
        "D) They cannot have parameters"
      ],
      correctAnswer: "B",
      explanation: "Static methods belong to the class itself, not to instances. They can be called using the class name (e.g., Math.max()) and cannot directly access instance variables.",
      hint: "Do you need an object to call a static method?",
      estimatedTime: 20,
      marks: 1,
      tags: ["static", "class method"]
    },
    {
      id: "CH06-MCQ-007",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "Which of the following correctly overloads the method 'int add(int a, int b)'?",
      options: [
        "A) int add(int x, int y)",
        "B) double add(double a, double b)",
        "C) void add(int a, int b)",
        "D) int add(int a, int b, int c)"
      ],
      correctAnswer: "B",
      explanation: "Overloading requires different parameter types or count. Option B has different parameter types (double vs int). Option A has same parameters (just renamed). Option C has same parameters (return type doesn't matter for overloading). Option D has different count but is also valid overloading — but B is the clearest example.",
      hint: "What must be different for method overloading?",
      estimatedTime: 20,
      marks: 1,
      tags: ["overloading", "signature"]
    },
    {
      id: "CH06-MCQ-008",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Return Types",
      question: "A method declared as 'int calculate()' must return a value of which type?",
      options: [
        "A) String",
        "B) double",
        "C) int",
        "D) void"
      ],
      correctAnswer: "C",
      explanation: "The return type in the method declaration specifies what type of value the method must return. An 'int calculate()' method must return an int value using the return statement.",
      hint: "The return type is specified before the method name.",
      estimatedTime: 10,
      marks: 1,
      tags: ["return type", "int"]
    }
  ],

  assertionReasons: [
    {
      id: "CH06-AR-001",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Pass by Value",
      question: "Assertion (A): Java is strictly pass-by-value.\nReason (R): When a primitive variable is passed to a method, changes inside the method do not affect the original variable.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Java passes a copy of the value for primitives. The method works on the copy, so the original remains unchanged. This is the essence of pass-by-value.",
      hint: "Does the original variable change when passed to a method?",
      estimatedTime: 20,
      marks: 2,
      tags: ["pass-by-value", "primitives"]
    },
    {
      id: "CH06-AR-002",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "Assertion (A): Method overloading cannot be achieved by changing only the return type.\nReason (R): The return type is not part of the method signature in Java.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "The method signature includes the method name and parameter list, but NOT the return type. Changing only the return type creates a duplicate method, not an overloaded one.",
      hint: "What constitutes a method signature in Java?",
      estimatedTime: 25,
      marks: 2,
      tags: ["overloading", "signature", "return type"]
    },
    {
      id: "CH06-AR-003",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "Assertion (A): Every recursive method must have a base case.\nReason (R): Without a base case, recursion would continue infinitely, causing a StackOverflowError.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "A base case provides the termination condition for recursion. Without it, the method keeps calling itself until the call stack overflows, resulting in StackOverflowError.",
      hint: "What stops a recursive method from calling itself forever?",
      estimatedTime: 20,
      marks: 2,
      tags: ["recursion", "base case", "stack overflow"]
    },
    {
      id: "CH06-AR-004",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Static Methods",
      question: "Assertion (A): The main() method in Java is declared as static.\nReason (R): The JVM needs to call main() without creating an object of the class.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "main() is static so the JVM can call it directly using the class name, without needing to instantiate the class. This is the entry point of the program.",
      hint: "Does the JVM create an object before calling main()?",
      estimatedTime: 15,
      marks: 2,
      tags: ["main", "static", "jvm"]
    }
  ],

  trueFalse: [
    {
      id: "CH06-TF-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Declaration",
      question: "A method in Java must always have a return type.",
      correctAnswer: "True",
      explanation: "Every method must specify a return type. If it doesn't return anything, use 'void'. There is no concept of a 'procedure' without a return type in Java.",
      hint: "What do you write if a method returns nothing?",
      estimatedTime: 10,
      marks: 1,
      tags: ["return type", "void"]
    },
    {
      id: "CH06-TF-002",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Parameters",
      question: "A method can have zero or more parameters.",
      correctAnswer: "True",
      explanation: "Methods can have any number of parameters, including zero. Example: public void display() { } has no parameters.",
      hint: "Can a method have no parameters?",
      estimatedTime: 10,
      marks: 1,
      tags: ["parameters", "method"]
    },
    {
      id: "CH06-TF-003",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "Method overloading is an example of compile-time polymorphism.",
      correctAnswer: "True",
      explanation: "Method overloading is resolved at compile time. The compiler determines which overloaded method to call based on the method signature (name and parameters).",
      hint: "When is the overloaded method decided — at compile time or runtime?",
      estimatedTime: 20,
      marks: 1,
      tags: ["overloading", "compile-time", "polymorphism"]
    },
    {
      id: "CH06-TF-004",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "Recursion is always more efficient than iteration.",
      correctAnswer: "False",
      explanation: "Recursion is often less efficient than iteration due to function call overhead and stack memory usage. However, it can make code more elegant for certain problems like tree traversal.",
      hint: "Does recursion use more or less memory than iteration?",
      estimatedTime: 15,
      marks: 1,
      tags: ["recursion", "efficiency", "iteration"]
    },
    {
      id: "CH06-TF-005",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Static Methods",
      question: "A static method can access non-static instance variables directly.",
      correctAnswer: "False",
      explanation: "Static methods belong to the class, not to instances. They cannot access instance variables directly because there is no 'this' reference. They can only access static variables or local variables.",
      hint: "Does a static method have access to 'this'?",
      estimatedTime: 20,
      marks: 1,
      tags: ["static", "instance variables", "access"]
    }
  ],

  fillBlanks: [
    {
      id: "CH06-FIB-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Declaration",
      question: "The ________ of a method includes the method name and its parameter list.",
      correctAnswer: "signature",
      explanation: "The method signature uniquely identifies a method and consists of the method name and the parameter types and order. The return type is NOT part of the signature.",
      hint: "It's like a method's 'identity'.",
      estimatedTime: 15,
      marks: 1,
      tags: ["signature", "method identity"]
    },
    {
      id: "CH06-FIB-002",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Return Types",
      question: "The ________ keyword is used inside a method to send a value back to the caller.",
      correctAnswer: "return",
      explanation: "The return statement exits the method and optionally passes a value back to the caller. The returned value must match the method's declared return type.",
      hint: "It 'returns' a value to where the method was called.",
      estimatedTime: 10,
      marks: 1,
      tags: ["return", "keyword"]
    },
    {
      id: "CH06-FIB-003",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "Having multiple methods with the same name but different parameters is called method ________.",
      correctAnswer: "overloading",
      explanation: "Method overloading allows a class to have multiple methods with the same name but different parameter lists. It improves code readability.",
      hint: "It means 'multiple definitions with the same name'.",
      estimatedTime: 10,
      marks: 1,
      tags: ["overloading", "polymorphism"]
    },
    {
      id: "CH06-FIB-004",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "A method that calls itself is called a ________ method.",
      correctAnswer: "recursive",
      explanation: "Recursion is a technique where a method calls itself to solve a problem by breaking it into smaller subproblems.",
      hint: "It means 'to run again' or 'to call itself'.",
      estimatedTime: 10,
      marks: 1,
      tags: ["recursion", "self-calling"]
    },
    {
      id: "CH06-FIB-005",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Static Methods",
      question: "A method declared with the ________ keyword can be called without creating an object of the class.",
      correctAnswer: "static",
      explanation: "Static methods belong to the class rather than instances. They can be called using ClassName.methodName() without creating an object.",
      hint: "It means 'not changing' or 'class-level'.",
      estimatedTime: 10,
      marks: 1,
      tags: ["static", "class method"]
    }
  ],

  outputQuestions: [
    {
      id: "CH06-OUT-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Call",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void display() {\n        System.out.println(\"Hello\");\n    }\n    public static void main(String[] args) {\n        display();\n    }\n}",
      correctAnswer: "Hello",
      explanation: "The main() method calls display(), which prints 'Hello'.",
      hint: "Trace the method call from main to display.",
      estimatedTime: 10,
      marks: 1,
      tags: ["method call", "output"]
    },
    {
      id: "CH06-OUT-002",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Return Value",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static int square(int n) {\n        return n * n;\n    }\n    public static void main(String[] args) {\n        int result = square(5);\n        System.out.println(result);\n    }\n}",
      correctAnswer: "25",
      explanation: "square(5) returns 5 * 5 = 25. The returned value is stored in result and printed.",
      hint: "What is 5 squared?",
      estimatedTime: 15,
      marks: 1,
      tags: ["return value", "method"]
    },
    {
      id: "CH06-OUT-003",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    public static double add(double a, double b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(add(5, 10));\n        System.out.println(add(5.5, 2.5));\n    }\n}",
      correctAnswer: "15\n8.0",
      explanation: "add(5, 10) calls the int version: 5+10=15. add(5.5, 2.5) calls the double version: 5.5+2.5=8.0. The compiler chooses based on argument types.",
      hint: "Which version of add is called for integers vs doubles?",
      estimatedTime: 25,
      marks: 2,
      tags: ["overloading", "polymorphism"]
    },
    {
      id: "CH06-OUT-004",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static int sum(int n) {\n        if (n == 1) return 1;\n        return n + sum(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(sum(5));\n    }\n}",
      correctAnswer: "15",
      explanation: "sum(5) = 5 + sum(4) = 5 + 4 + sum(3) = 5 + 4 + 3 + sum(2) = 5 + 4 + 3 + 2 + sum(1) = 5 + 4 + 3 + 2 + 1 = 15.",
      hint: "This recursive method adds numbers from n down to 1.",
      estimatedTime: 25,
      marks: 2,
      tags: ["recursion", "sum"]
    },
    {
      id: "CH06-OUT-005",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Pass by Value",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void modify(int[] arr) {\n        arr[0] = 100;\n    }\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        modify(nums);\n        System.out.println(nums[0]);\n    }\n}",
      correctAnswer: "100",
      explanation: "Although Java is pass-by-value, the value passed for an object (including arrays) is the reference. So the method can modify the array elements. arr[0] = 100 changes the original array.",
      hint: "What is passed when you pass an array to a method — the array or a reference?",
      estimatedTime: 25,
      marks: 2,
      tags: ["pass-by-value", "arrays", "reference"]
    }
  ],

  errorFinding: [
    {
      id: "CH06-ERR-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Return Type",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static int calculate() {\n        System.out.println(\"Calculating...\");\n    }\n    public static void main(String[] args) {\n        calculate();\n    }\n}",
      correctAnswer: "The method calculate() is declared to return int but does not have a return statement.",
      explanation: "A method with a non-void return type must have a return statement that returns a value of that type. Add 'return 0;' or change the return type to void.",
      hint: "What does a method with int return type need to do?",
      estimatedTime: 15,
      marks: 1,
      tags: ["return type", "missing return"]
    },
    {
      id: "CH06-ERR-002",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Call",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void display() {\n        System.out.println(\"Hello\");\n    }\n    public static void main(String[] args) {\n        Display();\n    }\n}",
      correctAnswer: "Method names are case-sensitive. 'Display()' should be 'display()' (lowercase 'd').",
      explanation: "Java is case-sensitive. The method is defined as 'display' (lowercase) but called as 'Display' (uppercase D). The compiler will report a 'cannot find symbol' error.",
      hint: "Check the case of the method name in the definition vs the call.",
      estimatedTime: 10,
      marks: 1,
      tags: ["case-sensitive", "method call"]
    },
    {
      id: "CH06-ERR-003",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    public static double add(int a, int b) {\n        return (double)(a + b);\n    }\n    public static void main(String[] args) {\n        System.out.println(add(5, 10));\n    }\n}",
      correctAnswer: "Both methods have the same signature (add(int, int)). Changing only the return type does NOT constitute method overloading.",
      explanation: "Method overloading requires different parameter lists. Both methods have the same parameters (int, int). The compiler cannot distinguish between them, causing a 'duplicate method' error.",
      hint: "What part of the method must be different for overloading?",
      estimatedTime: 20,
      marks: 2,
      tags: ["overloading", "return type", "duplicate"]
    },
    {
      id: "CH06-ERR-004",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static int factorial(int n) {\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n    }\n}",
      correctAnswer: "Missing base case. The recursive method has no termination condition, causing infinite recursion and StackOverflowError.",
      explanation: "Every recursive method needs a base case to stop the recursion. Add: if (n <= 1) return 1; before the recursive call.",
      hint: "What condition stops the recursion?",
      estimatedTime: 15,
      marks: 2,
      tags: ["recursion", "base case", "stack overflow"]
    },
    {
      id: "CH06-ERR-005",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Static Context",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    int x = 10;\n    public static void display() {\n        System.out.println(x);\n    }\n    public static void main(String[] args) {\n        display();\n    }\n}",
      correctAnswer: "A static method cannot access a non-static instance variable (x) directly.",
      explanation: "Static methods belong to the class, not to instances. They cannot access instance variables because there is no 'this' reference. Either make x static or create an object to access x.",
      hint: "Can a static method access non-static variables?",
      estimatedTime: 20,
      marks: 2,
      tags: ["static", "instance variable", "access"]
    }
  ],

  programmingQuestions: [
    {
      id: "CH06-PRQ-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method with Return",
      problemStatement: "Write a Java program with a method 'int findMax(int a, int b, int c)' that returns the largest of three numbers. Call this method from main() with values 45, 78, 23.",
      input: "No input required (hardcoded values: 45, 78, 23).",
      output: "The largest number is: 78",
      constraints: "Use a separate method to find the maximum. Do not use built-in Math.max().",
      logic: "Compare a and b to find the larger, then compare that with c.",
      solution: `public class MaxFinder {
    public static int findMax(int a, int b, int c) {
        int max = a;\n        if (b > max) max = b;\n        if (c > max) max = c;\n        return max;\n    }\n    \n    public static void main(String[] args) {\n        int result = findMax(45, 78, 23);\n        System.out.println("The largest number is: " + result);\n    }\n}`,
      solutionExplanation: "1. Define findMax() with three int parameters.\n2. Assume a is max, then compare with b and c.\n3. Return the largest value.\n4. In main(), call findMax() and print the result.",
      sampleTestCases: [
        { input: "45, 78, 23", output: "The largest number is: 78" },
        { input: "10, 20, 30", output: "The largest number is: 30" }
      ],
      estimatedTime: 240,
      marks: 4,
      tags: ["method", "return", "maximum"]
    },
    {
      id: "CH06-PRQ-002",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      problemStatement: "Write a Java program demonstrating method overloading by creating two methods named 'area': one that calculates the area of a rectangle (int length, int breadth) and another that calculates the area of a circle (double radius). Test with length=5, breadth=8, radius=7.0.",
      input: "No input required (hardcoded values).",
      output: "Area of rectangle: 40\nArea of circle: 153.86",
      constraints: "Use PI = 3.14. Both methods must have the same name 'area'.",
      logic: "Overload area() with different parameter types: (int, int) for rectangle, (double) for circle.",
      solution: `public class AreaCalculator {\n    public static int area(int length, int breadth) {\n        return length * breadth;\n    }\n    \n    public static double area(double radius) {\n        return 3.14 * radius * radius;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println("Area of rectangle: " + area(5, 8));\n        System.out.println("Area of circle: " + area(7.0));\n    }\n}`,
      solutionExplanation: "1. area(int, int) calculates rectangle area: length × breadth.\n2. area(double) calculates circle area: π × r².\n3. The compiler chooses the correct method based on argument types.\n4. Print both results.",
      sampleTestCases: [
        { input: "5, 8, 7.0", output: "Area of rectangle: 40\nArea of circle: 153.86" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["overloading", "area", "polymorphism"]
    },
    {
      id: "CH06-PRQ-003",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      problemStatement: "Write a Java program using recursion to calculate the nth Fibonacci number. The Fibonacci series is: 0, 1, 1, 2, 3, 5, 8, 13, ... where fib(0)=0, fib(1)=1, fib(n)=fib(n-1)+fib(n-2). Test with n = 7.",
      input: "No input required (n = 7).",
      output: "Fibonacci number at position 7 is: 13",
      constraints: "Use recursion. Do NOT use loops.",
      logic: "Base cases: if n=0 return 0, if n=1 return 1. Recursive case: return fib(n-1) + fib(n-2).",
      solution: `public class Fibonacci {\n    public static int fib(int n) {\n        if (n == 0) return 0;\n        if (n == 1) return 1;\n        return fib(n - 1) + fib(n - 2);\n    }\n    \n    public static void main(String[] args) {\n        int n = 7;\n        System.out.println("Fibonacci number at position " + n + " is: " + fib(n));\n    }\n}`,
      solutionExplanation: "1. Base case: fib(0)=0, fib(1)=1.\n2. For n>1, fib(n) = fib(n-1) + fib(n-2).\n3. fib(7) = fib(6) + fib(5) = 8 + 5 = 13.\n4. The recursion continues until it reaches the base cases.",
      sampleTestCases: [
        { input: "7", output: "Fibonacci number at position 7 is: 13" },
        { input: "5", output: "Fibonacci number at position 5 is: 5" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["recursion", "fibonacci", "series"]
    }
  ],

  debuggingQuestions: [
    {
      id: "CH06-DBG-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Call",
      question: "The following code intends to call a method and print the result. Identify and fix the error:\n\npublic class Test {\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n    public static void main(String[] args) {\n        System.out.println(multiply(4));\n    }\n}",
      correctAnswer: "The method multiply() requires two arguments, but only one is provided. Call multiply(4, 5) with two arguments.",
      explanation: "The method signature is multiply(int a, int b) — it expects two int parameters. Passing only one argument causes a compilation error.",
      hint: "How many parameters does multiply() expect?",
      estimatedTime: 15,
      marks: 1,
      tags: ["debugging", "arguments", "parameters"]
    },
    {
      id: "CH06-DBG-002",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Return Type",
      question: "The following code intends to check if a number is even. Identify and fix the error:\n\npublic class Test {\n    public static boolean isEven(int n) {\n        if (n % 2 == 0) {\n            return true;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(isEven(10));\n    }\n}",
      correctAnswer: "The method does not return a value when n is odd. Add 'return false;' after the if block.",
      explanation: "If n is odd, the if condition is false, and the method reaches the end without a return statement. Every path must return a boolean value.",
      hint: "What happens if n is odd? Does the method return anything?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "return", "conditional"]
    },
    {
      id: "CH06-DBG-003",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "The following code intends to calculate power (x^n) using recursion. Identify and fix the error:\n\npublic class Test {\n    public static int power(int x, int n) {\n        return x * power(x, n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(power(2, 3));\n    }\n}",
      correctAnswer: "Missing base case. Add: if (n == 0) return 1; before the recursive call.",
      explanation: "Without a base case, the recursion never stops. For power, the base case is n == 0, which should return 1 (any number to power 0 is 1).",
      hint: "What is the simplest case for x^n? When does the recursion stop?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "recursion", "base case", "power"]
    }
  ],

  caseBasedQuestions: [
    {
      id: "CH06-CBQ-001",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Methods",
      question: "A school needs a program to calculate student results. The program has:\n- A method 'int calculateTotal(int[] marks)' that sums all marks.\n- A method 'double calculatePercentage(int total, int subjects)' that calculates percentage.\n- A method 'char getGrade(double percentage)' that returns grade.\n\nStudent marks: {85, 90, 78, 92, 88} (5 subjects).\n\na) Write the calculateTotal() method.\nb) Write the calculatePercentage() method.\nc) Write the getGrade() method (>=90: A, >=80: B, >=70: C, >=60: D, else F).\nd) What will be the final grade for this student?",
      correctAnswer: "a) int calculateTotal(int[] marks) { int sum=0; for(int m: marks) sum+=m; return sum; }\nb) double calculatePercentage(int total, int subjects) { return (double)total/subjects; }\nc) char getGrade(double p) { if(p>=90) return 'A'; else if(p>=80) return 'B'; else if(p>=70) return 'C'; else if(p>=60) return 'D'; else return 'F'; }\nd) Total=433, Percentage=86.6%, Grade='B'.",
      explanation: "The methods work together: main() calls calculateTotal(), then calculatePercentage(), then getGrade(). Each method has a single responsibility.",
      hint: "Calculate step by step: total → percentage → grade.",
      estimatedTime: 75,
      marks: 5,
      tags: ["methods", "chaining", "grading"]
    },
    {
      id: "CH06-CBQ-002",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "A palindrome is a number that reads the same forwards and backwards (e.g., 121, 4554).\n\na) Write a recursive method 'int reverse(int n, int rev)' that reverses a number.\nb) Write a method 'boolean isPalindrome(int n)' that uses the reverse method.\nc) Test with n = 12321. Is it a palindrome?\nd) How would you modify the code to work with strings instead of numbers?",
      correctAnswer: "a) int reverse(int n, int rev) { if(n==0) return rev; return reverse(n/10, rev*10 + n%10); }\nb) boolean isPalindrome(int n) { return n == reverse(n, 0); }\nc) reverse(12321, 0) = 12321. 12321 == 12321, so true.\nd) Use String: reverse the string using recursion and compare with original using .equals().",
      explanation: "The reverse method extracts the last digit (n%10), adds it to rev, and recursively processes the remaining digits (n/10). When n becomes 0, rev contains the reversed number.",
      hint: "How do you extract the last digit of a number? How do you remove it?",
      estimatedTime: 75,
      marks: 5,
      tags: ["recursion", "palindrome", "reverse"]
    }
  ],

  vivaQuestions: [
    {
      id: "CH06-VIV-001",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Declaration",
      question: "What is the syntax for declaring a method in Java? Explain each part.",
      sampleAnswer: "Syntax: accessModifier returnType methodName(parameterList) { methodBody }. Example: public int add(int a, int b) { return a + b; }. Parts: public (access modifier), int (return type), add (method name), (int a, int b) (parameters), { return a + b; } (body).",
      estimatedTime: 20,
      marks: 2,
      tags: ["method syntax", "declaration"]
    },
    {
      id: "CH06-VIV-002",
      difficulty: "easy",
      chapter: "Methods",
      chapterId: 6,
      topic: "Parameters",
      question: "What is the difference between a parameter and an argument?",
      sampleAnswer: "A parameter is a variable defined in the method declaration that receives a value. An argument is the actual value passed to the method when it is called. For example, in 'public void display(String msg)', msg is a parameter. In 'display(\"Hello\")', \"Hello\" is an argument.",
      estimatedTime: 15,
      marks: 2,
      tags: ["parameter", "argument", "difference"]
    },
    {
      id: "CH06-VIV-003",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Method Overloading",
      question: "What is method overloading? What are the rules?",
      sampleAnswer: "Method overloading allows multiple methods with the same name but different parameter lists. Rules: 1) Methods must have the same name. 2) They must have different parameter lists (different number, type, or order of parameters). 3) Changing only the return type does NOT constitute overloading. Overloading improves code readability and is an example of compile-time polymorphism.",
      estimatedTime: 25,
      marks: 2,
      tags: ["overloading", "rules"]
    },
    {
      id: "CH06-VIV-004",
      difficulty: "medium",
      chapter: "Methods",
      chapterId: 6,
      topic: "Recursion",
      question: "What is recursion? What are the essential components of a recursive method?",
      sampleAnswer: "Recursion is a technique where a method calls itself to solve a problem by breaking it into smaller subproblems. Essential components: 1) Base case — a condition that stops the recursion. 2) Recursive case — the method calls itself with a modified parameter that moves toward the base case. Without a base case, recursion causes StackOverflowError.",
      estimatedTime: 20,
      marks: 2,
      tags: ["recursion", "base case"]
    },
    {
      id: "CH06-VIV-005",
      difficulty: "hard",
      chapter: "Methods",
      chapterId: 6,
      topic: "Static",
      question: "What is the difference between static and non-static methods?",
      sampleAnswer: "Static methods belong to the class and can be called using ClassName.methodName() without creating an object. They can only access static variables and other static methods directly. Non-static (instance) methods belong to objects and require an object to be called. They can access both instance and static variables. The main() method is static because the JVM calls it before any objects exist.",
      estimatedTime: 25,
      marks: 3,
      tags: ["static", "instance", "difference"]
    }
  ]
};

export default chapter6;