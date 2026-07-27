const chapter2 = {
  id: 2,
  title: "Variables & Data Types",
  slug: "variables-data-types",
  description: "Understand variables, primitive data types, type casting, and variable scope in Java.",
  topics: ["Variables", "Data Types", "Type Casting", "Scope", "Primitive Types", "Constants"],

  mcqs: [
    {
      id: "CH02-MCQ-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "Which of the following is NOT a primitive data type in Java?",
      options: [
        "A) int",
        "B) float",
        "C) String",
        "D) boolean"
      ],
      correctAnswer: "C",
      explanation: "String is a class (reference type) in Java, not a primitive data type. The primitive types are byte, short, int, long, float, double, char, and boolean.",
      hint: "Think about which one is a class rather than a primitive.",
      estimatedTime: 20,
      marks: 1,
      tags: ["primitive types", "string", "reference type"]
    },
    {
      id: "CH02-MCQ-002",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "What is the default value of an int variable in Java?",
      options: [
        "A) 1",
        "B) -1",
        "C) 0",
        "D) null"
      ],
      correctAnswer: "C",
      explanation: "The default value of an int (and other numeric types) is 0. For boolean it's false, for reference types it's null.",
      hint: "It's the same number that represents nothing in addition.",
      estimatedTime: 20,
      marks: 1,
      tags: ["default values", "int", "initialization"]
    },
    {
      id: "CH02-MCQ-003",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "Which data type would you use to store a single character in Java?",
      options: [
        "A) String",
        "B) char",
        "C) varchar",
        "D) character"
      ],
      correctAnswer: "B",
      explanation: "The char data type is used to store a single 16-bit Unicode character. String is for sequences of characters, and varchar is not a Java type.",
      hint: "It starts with 'c' and is a primitive type.",
      estimatedTime: 15,
      marks: 1,
      tags: ["char", "character", "unicode"]
    },
    {
      id: "CH02-MCQ-004",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "What is the size of a float variable in Java?",
      options: [
        "A) 16 bits",
        "B) 32 bits",
        "C) 64 bits",
        "D) 8 bits"
      ],
      correctAnswer: "B",
      explanation: "A float in Java occupies 32 bits (4 bytes) of memory. A double occupies 64 bits (8 bytes).",
      hint: "It's half the size of double.",
      estimatedTime: 20,
      marks: 1,
      tags: ["float", "memory size", "data types"]
    },
    {
      id: "CH02-MCQ-005",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "Which of the following is a valid variable name in Java?",
      options: [
        "A) 2ndNumber",
        "B) my-variable",
        "C) _count",
        "D) class"
      ],
      correctAnswer: "C",
      explanation: "Valid Java variable names can start with a letter, underscore (_), or dollar sign ($). They cannot start with a digit, contain hyphens, or use reserved keywords like 'class'.",
      hint: "Check which one follows Java naming rules — letters, digits, _, $.",
      estimatedTime: 20,
      marks: 1,
      tags: ["identifier rules", "naming conventions"]
    },
    {
      id: "CH02-MCQ-006",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "What is the result of the following expression? (int) 7.9",
      options: [
        "A) 7.9",
        "B) 8",
        "C) 7",
        "D) 8.0"
      ],
      correctAnswer: "C",
      explanation: "Explicit casting (int) truncates the decimal part, so (int) 7.9 becomes 7. It does NOT round — it simply discards the fractional part.",
      hint: "Casting to int removes the fractional part without rounding.",
      estimatedTime: 20,
      marks: 1,
      tags: ["type casting", "truncation", "explicit cast"]
    },
    {
      id: "CH02-MCQ-007",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "What is the range of the byte data type in Java?",
      options: [
        "A) -128 to 127",
        "B) 0 to 255",
        "C) -256 to 255",
        "D) -32768 to 32767"
      ],
      correctAnswer: "A",
      explanation: "byte is an 8-bit signed integer with range -128 to 127. It uses two's complement representation.",
      hint: "It's 8 bits, signed. The range is from -2^7 to (2^7 - 1).",
      estimatedTime: 25,
      marks: 1,
      tags: ["byte", "range", "8-bit"]
    },
    {
      id: "CH02-MCQ-008",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "What will be the output of the following code?\n\nint a = 5;\nint b = 2;\ndouble result = a / b;\nSystem.out.println(result);",
      options: [
        "A) 2.5",
        "B) 2.0",
        "C) 2",
        "D) 2.5E0"
      ],
      correctAnswer: "B",
      explanation: "Since both a and b are int, integer division is performed: 5/2 = 2. The result (2) is then implicitly converted to double, giving 2.0.",
      hint: "What type of division is performed when both operands are int?",
      estimatedTime: 30,
      marks: 2,
      tags: ["integer division", "type promotion", "precision"]
    }
  ],

  assertionReasons: [
    {
      id: "CH02-AR-001",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "Assertion (A): Implicit type conversion is possible from int to double.\nReason (R): double has a larger range and precision than int.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Implicit (automatic) conversion from int to double is allowed because double can represent all int values without loss of precision. This is a widening conversion.",
      hint: "Widening conversions are automatic in Java.",
      estimatedTime: 25,
      marks: 2,
      tags: ["implicit conversion", "widening", "type promotion"]
    },
    {
      id: "CH02-AR-002",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "Assertion (A): Assigning a double value to an int variable without explicit casting causes a compilation error.\nReason (R): double to int is a narrowing conversion and may lead to data loss.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "double to int is a narrowing conversion that may lose precision (decimal part). Java requires explicit casting for all narrowing conversions to make the programmer aware of potential data loss.",
      hint: "Think about what happens to the fractional part when converting to int.",
      estimatedTime: 25,
      marks: 2,
      tags: ["narrowing", "explicit cast", "data loss"]
    },
    {
      id: "CH02-AR-003",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "Assertion (A): A variable declared inside a method cannot be accessed outside that method.\nReason (R): Variables declared inside a method have local scope.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Local variables are declared inside methods and are only accessible within that method. They are created when the method is called and destroyed when the method returns.",
      hint: "Where is a local variable accessible?",
      estimatedTime: 20,
      marks: 2,
      tags: ["local variable", "scope", "method"]
    },
    {
      id: "CH02-AR-004",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Constants",
      question: "Assertion (A): A variable declared with the 'final' keyword cannot be reassigned.\nReason (R): The 'final' keyword makes a variable constant.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "The 'final' keyword creates a constant — the variable can be assigned only once. Any attempt to reassign a final variable causes a compilation error.",
      hint: "What keyword in Java makes a variable unchangeable?",
      estimatedTime: 20,
      marks: 2,
      tags: ["final", "constant", "immutable"]
    }
  ],

  trueFalse: [
    {
      id: "CH02-TF-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "A variable in Java must be declared before it can be used.",
      correctAnswer: "True",
      explanation: "In Java, all variables must be declared with a type before they are used. The compiler will report an 'cannot find symbol' error if you use an undeclared variable.",
      hint: "What happens if you use a variable without declaring it first?",
      estimatedTime: 10,
      marks: 1,
      tags: ["variable declaration", "compilation"]
    },
    {
      id: "CH02-TF-002",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "The boolean data type in Java can store the values 0 or 1.",
      correctAnswer: "False",
      explanation: "The boolean data type in Java can only store true or false. Unlike C/C++, Java does not treat 0 as false or non-zero as true.",
      hint: "What are the two possible values of a boolean?",
      estimatedTime: 15,
      marks: 1,
      tags: ["boolean", "true", "false"]
    },
    {
      id: "CH02-TF-003",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "The long data type in Java occupies 8 bytes of memory.",
      correctAnswer: "True",
      explanation: "long occupies 64 bits (8 bytes) of memory, with a range of -2^63 to 2^63-1.",
      hint: "Think about the size of long — it's the same as double.",
      estimatedTime: 15,
      marks: 1,
      tags: ["long", "memory size", "64-bit"]
    },
    {
      id: "CH02-TF-004",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "Implicit type conversion is possible from double to int.",
      correctAnswer: "False",
      explanation: "double to int is a narrowing conversion that requires explicit casting. Java only allows implicit conversion for widening conversions (where no data loss occurs).",
      hint: "What kind of conversion is double to int — widening or narrowing?",
      estimatedTime: 15,
      marks: 1,
      tags: ["implicit conversion", "narrowing", "type casting"]
    },
    {
      id: "CH02-TF-005",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "A local variable in Java is automatically initialized to its default value.",
      correctAnswer: "False",
      explanation: "Local variables are NOT automatically initialized in Java. The compiler gives an 'variable might not have been initialized' error if you try to use a local variable before assigning a value.",
      hint: "Think about what happens if you try to print a local variable without assigning a value.",
      estimatedTime: 20,
      marks: 1,
      tags: ["local variable", "initialization", "default values"]
    }
  ],

  fillBlanks: [
    {
      id: "CH02-FIB-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "The ________ data type is used to store true/false values in Java.",
      correctAnswer: "boolean",
      explanation: "The boolean primitive type represents a single bit of information that can be either true or false.",
      hint: "It begins with 'b' and has only two possible values.",
      estimatedTime: 10,
      marks: 1,
      tags: ["boolean", "true", "false"]
    },
    {
      id: "CH02-FIB-002",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "The process of giving a variable its first value is called ________.",
      correctAnswer: "initialization",
      explanation: "Initialization is the process of assigning a value to a variable for the first time. It can be done at declaration or later.",
      hint: "It starts with 'init' — the first value assignment.",
      estimatedTime: 10,
      marks: 1,
      tags: ["initialization", "variable"]
    },
    {
      id: "CH02-FIB-003",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "Converting a smaller data type to a larger data type is called ________ conversion.",
      correctAnswer: "widening (or implicit)",
      explanation: "Widening conversion automatically converts a smaller type (like int) to a larger type (like double) without explicit casting.",
      hint: "The opposite of narrowing.",
      estimatedTime: 20,
      marks: 1,
      tags: ["widening", "implicit conversion", "type promotion"]
    },
    {
      id: "CH02-FIB-004",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "A variable declared inside a method is called a ________ variable.",
      correctAnswer: "local",
      explanation: "Local variables are declared within a method or block and are only accessible within that scope.",
      hint: "It refers to the limited region where the variable is accessible.",
      estimatedTime: 10,
      marks: 1,
      tags: ["local variable", "scope"]
    },
    {
      id: "CH02-FIB-005",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Constants",
      question: "The ________ keyword is used to declare a constant variable in Java.",
      correctAnswer: "final",
      explanation: "The 'final' keyword makes a variable unmodifiable. Once assigned, its value cannot be changed throughout the program.",
      hint: "It means 'cannot be changed further'.",
      estimatedTime: 15,
      marks: 1,
      tags: ["final", "constant"]
    }
  ],

  outputQuestions: [
    {
      id: "CH02-OUT-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 10;\n        System.out.println(x);\n    }\n}",
      correctAnswer: "10",
      explanation: "The variable x is declared and initialized to 10. The println() statement prints its value.",
      hint: "Simply print the value stored in x.",
      estimatedTime: 15,
      marks: 1,
      tags: ["variable", "output"]
    },
    {
      id: "CH02-OUT-002",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        double d = 5.7;\n        int i = (int) d;\n        System.out.println(i);\n    }\n}",
      correctAnswer: "5",
      explanation: "Explicit casting (int) truncates the decimal part of 5.7, so the value stored in i is 5.",
      hint: "What happens when you cast a double to int?",
      estimatedTime: 20,
      marks: 2,
      tags: ["type casting", "truncation"]
    },
    {
      id: "CH02-OUT-003",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Arithmetic Promotion",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 10;\n        double b = 3.5;\n        System.out.println(a + b);\n    }\n}",
      correctAnswer: "13.5",
      explanation: "When an int and double are used in an expression, the int is automatically promoted to double. So 10 + 3.5 = 13.5 (double).",
      hint: "What happens when you mix int and double in arithmetic?",
      estimatedTime: 20,
      marks: 2,
      tags: ["type promotion", "arithmetic", "double"]
    },
    {
      id: "CH02-OUT-004",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "String Concatenation",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = 10;\n        System.out.println(\"Sum: \" + a + b);\n    }\n}",
      correctAnswer: "Sum: 510",
      explanation: "The + operator performs string concatenation when used with strings. \"Sum: \" + a gives \"Sum: 5\", then + b gives \"Sum: 510\". If you want addition, use parentheses: \"Sum: \" + (a + b).",
      hint: "What is the data type of the first operand in the expression?",
      estimatedTime: 25,
      marks: 2,
      tags: ["concatenation", "string", "addition"]
    },
    {
      id: "CH02-OUT-005",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Constants",
      question: "What will be the output of the following Java code?\n\npublic class Test {\n    public static void main(String[] args) {\n        final int X = 5;\n        // X = 10;\n        int Y = X * 2;\n        System.out.println(Y);\n    }\n}",
      correctAnswer: "10",
      explanation: "X is declared as final with value 5. The commented line (X = 10;) is not executed. Y = 5 * 2 = 10.",
      hint: "Does the commented line execute?",
      estimatedTime: 20,
      marks: 2,
      tags: ["final", "constants", "comments"]
    }
  ],

  errorFinding: [
    {
      id: "CH02-ERR-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int 123num = 10;\n        System.out.println(123num);\n    }\n}",
      correctAnswer: "Variable name '123num' starts with a digit. Java identifiers cannot begin with a digit.",
      explanation: "Java identifiers must start with a letter, underscore (_), or dollar sign ($). They cannot start with a digit.",
      hint: "Check the first character of the variable name.",
      estimatedTime: 15,
      marks: 1,
      tags: ["identifier rules", "variable naming"]
    },
    {
      id: "CH02-ERR-002",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 10.5;\n        System.out.println(x);\n    }\n}",
      correctAnswer: "Cannot assign a double value (10.5) to an int variable without explicit casting.",
      explanation: "10.5 is a double literal. Assigning it to int requires explicit casting: int x = (int) 10.5; Otherwise, the compiler reports a 'possible lossy conversion' error.",
      hint: "What is the data type of 10.5?",
      estimatedTime: 15,
      marks: 1,
      tags: ["type mismatch", "double", "int"]
    },
    {
      id: "CH02-ERR-003",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        double d = 10;\n        int i = d;\n        System.out.println(i);\n    }\n}",
      correctAnswer: "Cannot assign a double to int implicitly. Need explicit casting: (int) d.",
      explanation: "Assigning double to int requires explicit narrowing cast because it may result in data loss (the decimal part). The correct code is: int i = (int) d;",
      hint: "What type of cast is needed from double to int?",
      estimatedTime: 20,
      marks: 2,
      tags: ["narrowing", "explicit cast", "conversion"]
    },
    {
      id: "CH02-ERR-004",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        int x;\n        System.out.println(x);\n    }\n}",
      correctAnswer: "Local variable x might not have been initialized.",
      explanation: "Local variables in Java must be explicitly initialized before use. Unlike instance variables, they do not get default values.",
      hint: "What is the default value of a local int variable?",
      estimatedTime: 20,
      marks: 2,
      tags: ["local variable", "initialization", "compiler error"]
    },
    {
      id: "CH02-ERR-005",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Constants",
      question: "Find the error in the following Java code:\n\npublic class Test {\n    public static void main(String[] args) {\n        final int MAX = 100;\n        MAX = 200;\n        System.out.println(MAX);\n    }\n}",
      correctAnswer: "Cannot reassign a final variable. MAX is declared as final, so MAX = 200; causes a compilation error.",
      explanation: "Variables declared with the 'final' keyword can be assigned only once. Any attempt to change the value of MAX results in a compilation error.",
      hint: "What does the 'final' keyword mean?",
      estimatedTime: 15,
      marks: 2,
      tags: ["final", "constant", "reassignment error"]
    }
  ],

  programmingQuestions: [
    {
      id: "CH02-PRQ-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables and Arithmetic",
      problemStatement: "Write a Java program to swap two integer variables using a third temporary variable. Use the values a = 10 and b = 20.",
      input: "No input required (hardcoded values).",
      output: "Before swap: a = 10, b = 20\nAfter swap: a = 20, b = 10",
      constraints: "Use a third variable for swapping.",
      logic: "Store a in temp, assign b to a, then assign temp to b.",
      solution: `public class SwapNumbers {
    public static void main(String[] args) {
        int a = 10, b = 20;
        System.out.println("Before swap: a = " + a + ", b = " + b);
        
        int temp = a;
        a = b;
        b = temp;
        
        System.out.println("After swap: a = " + a + ", b = " + b);
    }
}`,
      solutionExplanation: "1. Declare and initialize a=10, b=20.\n2. Store a's value in temp: temp = 10.\n3. Assign b's value to a: a = 20.\n4. Assign temp's value (original a) to b: b = 10.\n5. Variables are now swapped.",
      sampleTestCases: [
        { input: "No input", output: "Before swap: a = 10, b = 20\nAfter swap: a = 20, b = 10" }
      ],
      estimatedTime: 240,
      marks: 4,
      tags: ["swap", "variables", "temporary variable"]
    },
    {
      id: "CH02-PRQ-002",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types and Casting",
      problemStatement: "Write a Java program to convert a temperature from Celsius to Fahrenheit. Use the formula: F = (C * 9/5) + 32. Test with Celsius = 37.5.",
      input: "No input required (hardcoded value: 37.5).",
      output: "Celsius: 37.5\nFahrenheit: 99.5",
      constraints: "Use double data type for temperature.",
      logic: "Apply the conversion formula F = (C * 9/5) + 32. Be careful with integer division — use 9.0/5.0 or cast appropriately.",
      solution: `public class TemperatureConverter {
    public static void main(String[] args) {
        double celsius = 37.5;
        double fahrenheit = (celsius * 9.0 / 5.0) + 32;
        
        System.out.println("Celsius: " + celsius);
        System.out.println("Fahrenheit: " + fahrenheit);
    }
}`,
      solutionExplanation: "1. Declare double variable celsius = 37.5.\n2. Apply formula using 9.0/5.0 (not 9/5, which would give integer division).\n3. Compute and store result in fahrenheit.\n4. Display both values.",
      sampleTestCases: [
        { input: "37.5", output: "Celsius: 37.5\nFahrenheit: 99.5" },
        { input: "0", output: "Celsius: 0.0\nFahrenheit: 32.0" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["temperature conversion", "double", "formula"]
    },
    {
      id: "CH02-PRQ-003",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      problemStatement: "Write a Java program to find the area of a circle. Use the formula: Area = π * r². Take radius as an integer (r = 7) and display the area as a double. Use the value 3.14159 for π.",
      input: "No input required (radius = 7).",
      output: "Radius: 7\nArea: 153.93791",
      constraints: "Radius is int. Area must be double. Use explicit casting where needed.",
      logic: "Compute area = PI * r * r. Since r is int, r*r is int. Multiply by double PI to get double result.",
      solution: `public class CircleArea {
    public static void main(String[] args) {
        int radius = 7;
        double pi = 3.14159;
        double area = pi * radius * radius;
        
        System.out.println("Radius: " + radius);
        System.out.println("Area: " + area);
    }
}`,
      solutionExplanation: "1. Declare int radius = 7.\n2. Declare double pi = 3.14159.\n3. Compute area: pi * radius * radius. The int values are automatically promoted to double. Result is double.\n4. Display the result.",
      sampleTestCases: [
        { input: "7", output: "Radius: 7\nArea: 153.93791" },
        { input: "5", output: "Radius: 5\nArea: 78.53975" }
      ],
      estimatedTime: 300,
      marks: 5,
      tags: ["area", "circle", "type promotion", "pi"]
    }
  ],

  debuggingQuestions: [
    {
      id: "CH02-DBG-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variable Declaration",
      question: "The following Java code has errors. Identify and fix them:\n\npublic class Test {\n    public static void main(String[] args) {\n        int a = 5\n        int b = 10;\n        System.out.println(a + b);\n    }\n}",
      correctAnswer: "Add a semicolon after 'int a = 5':\nint a = 5;",
      explanation: "The first declaration statement is missing a semicolon at the end. Every Java statement must end with a semicolon.",
      hint: "Check the end of each statement line.",
      estimatedTime: 10,
      marks: 1,
      tags: ["debugging", "semicolon", "declaration"]
    },
    {
      id: "CH02-DBG-002",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Compatibility",
      question: "The following Java code has errors. Identify and fix them:\n\npublic class Test {\n    public static void main(String[] args) {\n        int x = 10.5;\n        System.out.println(x);\n    }\n}",
      correctAnswer: "Change int x = 10.5; to double x = 10.5; or int x = (int) 10.5;",
      explanation: "10.5 is a double literal and cannot be assigned to an int variable without explicit casting. Either declare x as double or use casting.",
      hint: "What is the data type of the value being assigned?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "type mismatch", "type casting"]
    },
    {
      id: "CH02-DBG-003",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variable Scope",
      question: "The following Java code has errors. Identify and fix them:\n\npublic class Test {\n    public static void main(String[] args) {\n        {\n            int x = 10;\n        }\n        System.out.println(x);\n    }\n}",
      correctAnswer: "x is declared inside a block and is not accessible outside it. Declare x outside the block or use it inside the block.",
      explanation: "Variables declared inside a block (curly braces) have block-level scope. They cannot be accessed outside that block.",
      hint: "Where is x declared? Where is it being used?",
      estimatedTime: 20,
      marks: 2,
      tags: ["debugging", "scope", "block"]
    }
  ],

  caseBasedQuestions: [
    {
      id: "CH02-CBQ-001",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "Sneha is writing a Java program for her school library. She needs to store the following information:\n- Number of books (up to 5000)\n- Price of a book (can be decimal, up to Rs. 9999.99)\n- Grade category ('P' for Primary, 'S' for Secondary)\n- Is the book available (yes/no)\n\na) What data type should she use for each piece of information?\nb) Write Java declaration statements for all four variables.\nc) If she stores the price in an int instead of double, what problem might occur?\nd) Explain why she cannot store 50000 books in a byte variable.",
      correctAnswer: "a) int for books, double for price, char for grade, boolean for availability.\nb) int numBooks; double price; char grade; boolean isAvailable;\nc) Storing price in int would lose the decimal part (e.g., 399.75 becomes 399).\nd) byte can only store values from -128 to 127. 50000 exceeds this range.",
      explanation: "Choosing the right data type is crucial for accuracy and memory efficiency. int (4 bytes) handles up to 2 billion, double handles decimals, char stores single characters, boolean stores true/false.",
      hint: "Match each value to the most appropriate primitive type.",
      estimatedTime: 60,
      marks: 5,
      tags: ["data types", "application", "memory"]
    },
    {
      id: "CH02-CBQ-002",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "Rahul wrote the following code to calculate the average of three test scores:\n\nint score1 = 85;\nint score2 = 92;\nint score3 = 78;\nint sum = score1 + score2 + score3;\ndouble average = sum / 3;\nSystem.out.println(average);\n\na) What value will be printed? Why?\nb) How should Rahul fix the code to get the correct average (85.0)?\nc) What is this type of issue called?\nd) Rewrite the calculation using explicit casting.",
      correctAnswer: "a) 85.0 (because 255/3 = 85 integer division, then converted to 85.0)\nb) Use sum / 3.0 or (double) sum / 3.\nc) Integer division — when both operands are int, result is int (truncated).\nd) double average = (double) sum / 3; or double average = sum / 3.0;",
      explanation: "Integer division truncates the decimal part. To get a precise result, at least one operand must be a floating-point type (double). 85+92+78=255, 255/3=85, but 255/3.0=85.0.",
      hint: "What type of division happens when both numbers are integers?",
      estimatedTime: 60,
      marks: 5,
      tags: ["integer division", "average", "type casting"]
    }
  ],

  vivaQuestions: [
    {
      id: "CH02-VIV-001",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Data Types",
      question: "How many primitive data types does Java support? Name them.",
      sampleAnswer: "Java supports 8 primitive data types: byte (8-bit), short (16-bit), int (32-bit), long (64-bit), float (32-bit), double (64-bit), char (16-bit Unicode), and boolean (true/false).",
      estimatedTime: 30,
      marks: 2,
      tags: ["primitive types", "data types"]
    },
    {
      id: "CH02-VIV-002",
      difficulty: "easy",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variables",
      question: "What are the rules for naming a variable in Java?",
      sampleAnswer: "1. Must start with a letter, underscore (_), or dollar sign ($).\n2. Cannot start with a digit.\n3. Can contain letters, digits, underscores, and dollar signs.\n4. Cannot be a reserved keyword (like int, class, public).\n5. Case-sensitive — 'count' and 'Count' are different.\n6. No limit on length.",
      estimatedTime: 30,
      marks: 2,
      tags: ["identifier rules", "naming"]
    },
    {
      id: "CH02-VIV-003",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Type Casting",
      question: "What is the difference between implicit and explicit type conversion?",
      sampleAnswer: "Implicit conversion (widening) is automatic when converting a smaller type to a larger type, e.g., int to double. No data loss occurs. Explicit conversion (narrowing) requires a cast operator (type) and is used when converting a larger type to a smaller type, e.g., double to int. Data loss may occur.",
      estimatedTime: 30,
      marks: 2,
      tags: ["implicit", "explicit", "widening", "narrowing"]
    },
    {
      id: "CH02-VIV-004",
      difficulty: "medium",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Variable Scope",
      question: "Explain the different scopes a variable can have in Java.",
      sampleAnswer: "1. Local scope: Variables declared inside a method or block, accessible only within that method/block.\n2. Instance scope: Variables (fields) declared inside a class but outside methods, accessible by all methods of the class.\n3. Class/Static scope: Variables declared with the static keyword, shared across all instances of the class.",
      estimatedTime: 35,
      marks: 3,
      tags: ["scope", "local", "instance", "static"]
    },
    {
      id: "CH02-VIV-005",
      difficulty: "hard",
      chapter: "Variables & Data Types",
      chapterId: 2,
      topic: "Constants",
      question: "How do you declare a constant in Java? Why would you use constants?",
      sampleAnswer: "Use the 'final' keyword: final int MAX_VALUE = 100; Constants are used for values that should not change, such as PI, tax rates, maximum limits. Benefits: makes code more readable, prevents accidental modification, makes maintenance easier (change in one place). By convention, constant names are written in UPPER_CASE with underscores.",
      estimatedTime: 30,
      marks: 2,
      tags: ["final", "constants", "naming convention"]
    }
  ]
};

export default chapter2;