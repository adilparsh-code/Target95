const chapter11 = {
  id: "11-methods",
  title: "Methods",
  slug: "methods",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 60,
  topics: [
    "method declaration",
    "parameters",
    "return type",
    "overloading",
    "method calling",
    "formal parameters",
    "actual parameters",
    "void return type",
    "value returning methods",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "A method is a reusable block of code that performs a specific task. Methods help organize code into manageable pieces, avoid repetition, and make programs modular and easier to maintain. In Java, every program must have a main() method as the entry point. Methods can accept parameters (inputs), perform operations, and return values (outputs). Understanding methods is crucial for writing efficient, readable, and maintainable Java programs. Method overloading allows multiple methods with the same name but different parameters, providing flexibility in how methods are called.",
    realLifeExamples: [
      "A calculator's add() function - you call it with different numbers each time.",
      "A coffee machine's brew() method - it performs the same steps for different cup sizes.",
      "A bank's withdraw() method - works with different account numbers and amounts.",
      "A school's calculateGrade() method - processes different student marks.",
      "A shopping cart's calculateTotal() method - sums different item prices.",
      "A thermostat's setTemperature() method - accepts different temperature values.",
      "A microwave's heat() method - works with different time and power settings.",
      "A GPS's calculateRoute() method - finds routes between different locations.",
    ],
    commonMistakes: [
      "Forgetting to use the return statement in a value-returning method - causes compilation error.",
      "Mismatching return type - declaring int but returning a String value.",
      "Not matching parameter types when calling a method - type mismatch error.",
      "Confusing formal parameters (in definition) with actual parameters (in call).",
      "Trying to return multiple values from a method - Java allows only one return value.",
      "Using void return type but trying to return a value - compilation error.",
      "Not calling the method - defining a method doesn't execute it automatically.",
      "Passing wrong number of arguments - parameter count must match.",
      "Using method overloading with only return type difference - not allowed in Java.",
      "Forgetting that method names are case-sensitive in Java.",
    ],
    whereUsed: [
      "Breaking complex problems into smaller, manageable tasks.",
      "Reusing code multiple times without rewriting (DRY principle).",
      "Organizing program logic into logical units.",
      "Creating libraries and APIs for other programmers to use.",
      "Implementing event handlers in GUI applications.",
      "Writing recursive algorithms (methods calling themselves).",
      "Creating utility classes with helper methods.",
      "Implementing business logic in enterprise applications.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "A method in Java is like a function or procedure that performs a specific task. Think of it as a recipe: you give it some ingredients (parameters), it follows steps (code), and gives you a result (return value). The main() method is where every Java program starts. You can create your own methods to organize code better. For example, instead of writing the same calculation code 10 times, you write it once in a method and call it 10 times. Methods make code cleaner, easier to test, and simpler to understand.",
    importantPoints: [
      "A method must be declared inside a class, not outside.",
      "The main() method is the entry point of every Java program: public static void main(String[] args).",
      "Methods can have zero or more parameters (inputs).",
      "Methods can return at most one value using the return statement.",
      "If a method doesn't return anything, use void as return type.",
      "Method signature = method name + parameter list (used for overloading).",
      "Method overloading: same method name, different parameters (type/number/order).",
      "Parameters passed to methods are passed by value (a copy is made).",
      "Formal parameters: variables in method definition. Actual parameters: values passed in call.",
      "A method must be called to execute - definition alone doesn't run the code.",
      "Methods can call other methods, including themselves (recursion).",
      "Static methods can be called without creating an object using class name.",
      "Non-static methods require an object to be called.",
      "The return statement immediately exits the method.",
      "Method names should follow camelCase convention (e.g., calculateSum).",
    ],
    memoryTricks: [
      "METHOD = 'Make Everything Testable, Handle Operations Logically' - reusable code block.",
      "Parameters = 'Pass information to method' - like function inputs.",
      "Return = 'Result Exits After Task, Turn Ends Normally' - gives back a value.",
      "Void = 'Very Important Output Is Denied' - method returns nothing.",
      "Overloading = 'One name, Many forms' - same method name, different parameters.",
      "Signature = 'Name + Parameters' - what makes methods unique.",
      "Formal = 'Function definition parameters' - in method declaration.",
      "Actual = 'Arguments you pass' - values in method call.",
      "Call = 'Activate Logic, Let's Go!' - execute the method.",
      "Static = 'Same for all, No object needed' - belongs to class.",
    ],
    examTips: [
      "Always remember: main() method must be public static void main(String[] args).",
      "If a method declares a return type, it MUST return a value of that type.",
      "Method overloading depends on parameter types/count, NOT return type alone.",
      "In ICSE exams, check if the method is static or non-static when calling.",
      "Formal parameters are variables, actual parameters are values/variables passed.",
      "A method with void return type cannot use return with a value.",
      "The return statement ends method execution immediately.",
      "Methods are called using: methodName(arguments) for static, object.methodName() for non-static.",
      "Parameter order matters in overloading: (int, String) ≠ (String, int).",
      "Default values are not allowed in method parameters in Java (unlike C++).",
      "Methods can be called from other methods - this is normal and encouraged.",
      "Recursion requires a base case to prevent infinite loop.",
      "Always match the number and type of arguments when calling methods.",
      "In exams, trace method calls carefully - track parameter values and return values.",
      "Method names and class names can be the same (common in simple programs).",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `// Method without parameters and without return value
public static void greet() {
    System.out.println("Hello, World!");
}

// Method with parameters and without return value
public static void printSum(int a, int b) {
    int sum = a + b;
    System.out.println("Sum: " + sum);
}

// Method with parameters and with return value
public static int add(int a, int b) {
    int sum = a + b;
    return sum;
}

// Method with no parameters but with return value
public static int getNumber() {
    return 42;
}

// Method calling
public static void main(String[] args) {
    // Calling void method
    greet();
    
    // Calling method with parameters
    printSum(5, 10);
    
    // Calling method with return value
    int result = add(3, 7);
    System.out.println("Result: " + result);
    
    // Using return value directly
    System.out.println("Direct: " + add(10, 20));
}`,
    breakdown: [
      {
        keyword: "public",
        explanation: "Access modifier - method can be accessed from anywhere. Other modifiers: private, protected.",
      },
      {
        keyword: "static",
        explanation: "Method belongs to class, not instance. Can be called without creating object using ClassName.methodName().",
      },
      {
        keyword: "void",
        explanation: "Return type - method doesn't return any value. Use actual type (int, String, etc.) if returning value.",
      },
      {
        keyword: "methodName",
        explanation: "Identifier for the method. Follows camelCase convention. Must be unique within a class (considering signature).",
      },
      {
        keyword: "(int a, int b)",
        explanation: "Parameter list - variables that receive values when method is called. Can be empty () for no parameters.",
      },
      {
        keyword: "return value;",
        explanation: "Returns a value to the caller. Only for non-void methods. Immediately exits the method.",
      },
      {
        keyword: "methodName(args)",
        explanation: "Method call - executes the method with provided arguments. Arguments must match parameters in type and order.",
      },
    ],
    variations: {
      methodTypes: {
        code: `// 1. No parameters, no return value
public static void sayHello() {
    System.out.println("Hello!");
}

// 2. With parameters, no return value
public static void displayMessage(String msg) {
    System.out.println(msg);
}

// 3. No parameters, with return value
public static int getRandomNumber() {
    return (int)(Math.random() * 100);
}

// 4. With parameters, with return value
public static int multiply(int a, int b) {
    return a * b;
}

// 5. Multiple parameters of different types
public static String createFullName(String firstName, String lastName, int age) {
    return firstName + " " + lastName + " (Age: " + age + ")";
}`,
        explanation:
          "Methods can have different combinations of parameters and return types. Choose based on what the method needs to do.",
      },
      overloading: {
        code: `// Method Overloading - same name, different parameters

// Version 1: No parameters
public static int add() {
    return 0;
}

// Version 2: Two int parameters
public static int add(int a, int b) {
    return a + b;
}

// Version 3: Three int parameters
public static int add(int a, int b, int c) {
    return a + b + c;
}

// Version 4: Two double parameters
public static double add(double a, double b) {
    return a + b;
}

// Version 5: Different parameter order
public static String add(String prefix, int num) {
    return prefix + num;
}

// Calling overloaded methods
int sum1 = add();                    // Calls version 1
int sum2 = add(5, 10);              // Calls version 2
int sum3 = add(1, 2, 3);            // Calls version 3
double sum4 = add(1.5, 2.5);        // Calls version 4
String sum5 = add("Number: ", 42);  // Calls version 5`,
        explanation:
          "Method overloading allows multiple methods with same name but different parameters. Java determines which version to call based on the arguments provided.",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "method-ex-b-1",
        title: "Simple method without parameters",
        code: `public class Main {
    // Method definition
    public static void greet() {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Methods!");
    }
    
    public static void main(String[] args) {
        System.out.println("Program starts...");
        greet();  // Method call
        System.out.println("Program ends...");
    }
}`,
        output: "Program starts...\nHello, World!\nWelcome to Java Methods!\nProgram ends...",
        explanation: [
          "Line 3-6: greet() method is defined with no parameters and no return value (void).",
          "Line 10: Program execution starts from main() method.",
          "Line 11: greet() is called - execution jumps to line 3.",
          "Lines 4-5: Execute inside greet() method.",
          "Line 6: greet() ends, execution returns to main() at line 12.",
          "Key point: Method must be called to execute its code.",
        ],
      },
      {
        id: "method-ex-b-2",
        title: "Method with parameters",
        code: `public class Main {
    // Method with one parameter
    public static void printName(String name) {
        System.out.println("Hello, " + name + "!");
    }
    
    // Method with two parameters
    public static void printSum(int a, int b) {
        int sum = a + b;
        System.out.println(a + " + " + b + " = " + sum);
    }
    
    public static void main(String[] args) {
        printName("Alice");        // Passing String argument
        printName("Bob");          // Different String argument
        printSum(10, 20);         // Passing two int arguments
        printSum(5, 15);          // Different int arguments
    }
}`,
        output: "Hello, Alice!\nHello, Bob!\n10 + 20 = 30\n5 + 15 = 20",
        explanation: [
          "Line 3-6: printName() accepts one String parameter 'name'.",
          "Line 9-12: printSum() accepts two int parameters 'a' and 'b'.",
          "Line 16: printName() called with 'Alice' - name = 'Alice'.",
          "Line 17: printName() called with 'Bob' - name = 'Bob'.",
          "Line 18: printSum() called with 10, 20 - a = 10, b = 20.",
          "Key point: Parameters receive values when method is called.",
        ],
      },
      {
        id: "method-ex-b-3",
        title: "Method with return value",
        code: `public class Main {
    // Method that returns int
    public static int square(int num) {
        return num * num;
    }
    
    // Method that returns String
    public static String getGreeting(String name) {
        return "Hello, " + name + "!";
    }
    
    // Method that returns boolean
    public static boolean isEven(int num) {
        return num % 2 == 0;
    }
    
    public static void main(String[] args) {
        // Using returned values
        int result1 = square(5);
        System.out.println("Square of 5: " + result1);
        
        String greeting = getGreeting("Alice");
        System.out.println(greeting);
        
        boolean check = isEven(10);
        System.out.println("Is 10 even? " + check);
        
        // Using return value directly
        System.out.println("Square of 7: " + square(7));
    }
}`,
        output: "Square of 5: 25\nHello, Alice!\nIs 10 even? true\nSquare of 7: 49",
        explanation: [
          "Line 3-6: square() returns int value (num * num).",
          "Line 9-12: getGreeting() returns String value.",
          "Line 15-18: isEven() returns boolean value (true/false).",
          "Line 22: square(5) returns 25, stored in result1.",
          "Line 26: getGreeting() returns 'Hello, Alice!', stored in greeting.",
          "Line 30: isEven(10) returns true, stored in check.",
          "Line 34: square(7) returns 49, used directly in println.",
          "Key point: Return value can be stored in variable or used directly.",
        ],
      },
      {
        id: "method-ex-b-4",
        title: "Multiple method calls",
        code: `public class Main {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int subtract(int a, int b) {
        return a - b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    public static void main(String[] args) {
        int x = 10, y = 5;
        
        // Using methods with variables
        int sum = add(x, y);
        int diff = subtract(x, y);
        int product = multiply(x, y);
        
        System.out.println(x + " + " + y + " = " + sum);
        System.out.println(x + " - " + y + " = " + diff);
        System.out.println(x + " * " + y + " = " + product);
        
        // Nested method calls
        int result = add(subtract(20, 5), multiply(2, 3));
        System.out.println("Nested: " + result);
    }
}`,
        output: "10 + 5 = 15\n10 - 5 = 5\n10 * 5 = 50\nNested: 15",
        explanation: [
          "Lines 3-15: Three methods defined - add, subtract, multiply.",
          "Line 19: Variables x=10, y=5 declared.",
          "Line 21: add(10, 5) returns 15.",
          "Line 22: subtract(10, 5) returns 5.",
          "Line 23: multiply(10, 5) returns 50.",
          "Line 28: Nested call - subtract(20,5)=15, multiply(2,3)=6, add(15,6)=21.",
          "Key point: Methods can call other methods, including nested calls.",
        ],
      },
    ],
    intermediate: [
      {
        id: "method-ex-i-1",
        title: "Method overloading example",
        code: `public class Main {
    // Overloaded methods for area calculation
    
    // Area of square
    public static double area(int side) {
        return side * side;
    }
    
    // Area of rectangle
    public static double area(int length, int breadth) {
        return length * breadth;
    }
    
    // Area of circle
    public static double area(double radius) {
        return Math.PI * radius * radius;
    }
    
    public static void main(String[] args) {
        System.out.println("Area of square (side=5): " + area(5));
        System.out.println("Area of rectangle (4x6): " + area(4, 6));
        System.out.println("Area of circle (r=3.5): " + area(3.5));
    }
}`,
        output: "Area of square (side=5): 25.0\nArea of rectangle (4x6): 24.0\nArea of circle (r=3.5): 38.48451000647493",
        explanation: [
          "Three methods with same name 'area' but different parameters.",
          "area(int) - for square, takes one int parameter.",
          "area(int, int) - for rectangle, takes two int parameters.",
          "area(double) - for circle, takes one double parameter.",
          "Java determines which method to call based on arguments passed.",
          "Key point: Overloading improves code readability - same name for similar operations.",
        ],
      },
      {
        id: "method-ex-i-2",
        title: "Finding maximum of three numbers",
        code: `public class Main {
    // Method to find max of two numbers
    public static int max(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
    
    // Method to find max of three numbers using max(int, int)
    public static int max(int a, int b, int c) {
        int maxAB = max(a, b);      // Call max(int, int)
        return max(maxAB, c);       // Call max(int, int) again
    }
    
    public static void main(String[] args) {
        System.out.println("Max of 10, 20: " + max(10, 20));
        System.out.println("Max of 30, 25: " + max(30, 25));
        System.out.println("Max of 5, 15, 10: " + max(5, 15, 10));
        System.out.println("Max of 100, 50, 75: " + max(100, 50, 75));
    }
}`,
        output: "Max of 10, 20: 20\nMax of 30, 25: 30\nMax of 5, 15, 10: 15\nMax of 100, 50, 75: 100",
        explanation: [
          "Line 3-8: max(int, int) finds maximum of two numbers.",
          "Line 11-15: max(int, int, int) finds maximum of three numbers.",
          "Line 13: Calls max(a, b) to get max of first two numbers.",
          "Line 14: Calls max(maxAB, c) to compare with third number.",
          "Line 19: max(10, 20) returns 20.",
          "Line 22: max(5, 15, 10) calls max(5,15)=15, then max(15,10)=15.",
          "Key point: Methods can call other methods, including themselves (overloading).",
        ],
      },
      {
        id: "method-ex-i-3",
        title: "Checking prime number",
        code: `public class Main {
    // Method to check if number is prime
    public static boolean isPrime(int num) {
        if (num <= 1) {
            return false;  // 0, 1, and negative numbers are not prime
        }
        
        for (int i = 2; i <= num / 2; i++) {
            if (num % i == 0) {
                return false;  // Found a divisor, not prime
            }
        }
        
        return true;  // No divisors found, is prime
    }
    
    public static void main(String[] args) {
        int[] numbers = {2, 3, 4, 5, 17, 20, 23, 25};
        
        for (int i = 0; i < numbers.length; i++) {
            if (isPrime(numbers[i])) {
                System.out.println(numbers[i] + " is prime");
            } else {
                System.out.println(numbers[i] + " is not prime");
            }
        }
    }
}`,
        output: "2 is prime\n3 is prime\n4 is not prime\n5 is prime\n17 is prime\n20 is not prime\n23 is prime\n25 is not prime",
        explanation: [
          "Line 3-16: isPrime() checks if a number is prime, returns boolean.",
          "Line 6: Numbers <= 1 are not prime.",
          "Line 9-12: Check divisibility from 2 to num/2. If divisible, not prime.",
          "Line 15: If no divisors found, number is prime.",
          "Line 20: Array of numbers to check.",
          "Line 22-28: Loop through array, call isPrime() for each number.",
          "Key point: Return statement exits method immediately when condition is met.",
        ],
      },
      {
        id: "method-ex-i-4",
        title: "Calculating factorial using recursion",
        code: `public class Main {
    // Recursive method to calculate factorial
    public static long factorial(int n) {
        // Base case
        if (n == 0 || n == 1) {
            return 1;
        }
        // Recursive case
        else {
            return n * factorial(n - 1);
        }
    }
    
    public static void main(String[] args) {
        System.out.println("Factorial of 0: " + factorial(0));
        System.out.println("Factorial of 1: " + factorial(1));
        System.out.println("Factorial of 5: " + factorial(5));
        System.out.println("Factorial of 7: " + factorial(7));
    }
}`,
        output: "Factorial of 0: 1\nFactorial of 1: 1\nFactorial of 5: 120\nFactorial of 7: 5040",
        explanation: [
          "Line 3-10: factorial() calculates factorial recursively.",
          "Line 6-7: Base case - factorial(0) = 1, factorial(1) = 1.",
          "Line 10: Recursive case - n! = n * (n-1)!.",
          "factorial(5) = 5 * factorial(4) = 5 * 4 * factorial(3) = ... = 120.",
          "Line 15: factorial(0) returns 1 (base case).",
          "Line 18: factorial(5) = 5 * 4 * 3 * 2 * 1 = 120.",
          "Key point: Recursion needs base case to stop infinite recursion.",
        ],
      },
      {
        id: "method-ex-i-5",
        title: "String manipulation methods",
        code: `public class Main {
    // Method to reverse a string
    public static String reverse(String s) {
        String reversed = "";
        for (int i = s.length() - 1; i >= 0; i--) {
            reversed = reversed + s.charAt(i);
        }
        return reversed;
    }
    
    // Method to check palindrome
    public static boolean isPalindrome(String s) {
        String reversed = reverse(s);
        return s.equals(reversed);
    }
    
    // Method to count vowels
    public static int countVowels(String s) {
        int count = 0;
        s = s.toLowerCase();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                count++;
            }
        }
        return count;
    }
    
    public static void main(String[] args) {
        String word = "madam";
        System.out.println("Original: " + word);
        System.out.println("Reversed: " + reverse(word));
        System.out.println("Is palindrome: " + isPalindrome(word));
        System.out.println("Vowels in 'Hello': " + countVowels("Hello"));
    }
}`,
        output: "Original: madam\nReversed: madam\nIs palindrome: true\nVowels in 'Hello': 2",
        explanation: [
          "Line 3-9: reverse() takes String, returns reversed String.",
          "Line 12-16: isPalindrome() uses reverse() to check if string is palindrome.",
          "Line 19-27: countVowels() counts vowels in a string.",
          "Line 31: reverse('madam') returns 'madam'.",
          "Line 33: isPalindrome('madam') returns true.",
          "Line 34: countVowels('Hello') returns 2 (e, o).",
          "Key point: Methods can call other methods and return different data types.",
        ],
      },
      {
        id: "method-ex-i-6",
        title: "Array processing with methods",
        code: `public class Main {
    // Method to find sum of array elements
    public static int sum(int[] arr) {
        int total = 0;
        for (int i = 0; i < arr.length; i++) {
            total = total + arr[i];
        }
        return total;
    }
    
    // Method to find maximum element
    public static int max(int[] arr) {
        int maximum = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > maximum) {
                maximum = arr[i];
            }
        }
        return maximum;
    }
    
    // Method to find minimum element
    public static int min(int[] arr) {
        int minimum = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < minimum) {
                minimum = arr[i];
            }
        }
        return minimum;
    }
    
    public static void main(String[] args) {
        int[] numbers = {10, 5, 25, 15, 30};
        
        System.out.println("Array: ");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        
        System.out.println("\\nSum: " + sum(numbers));
        System.out.println("Max: " + max(numbers));
        System.out.println("Min: " + min(numbers));
    }
}`,
        output: "Array: \n10 5 25 15 30 \nSum: 85\nMax: 30\nMin: 5",
        explanation: [
          "Line 3-10: sum() takes int array, returns sum of all elements.",
          "Line 13-21: max() finds maximum element in array.",
          "Line 24-32: min() finds minimum element in array.",
          "Line 36: Array {10, 5, 25, 15, 30} declared.",
          "Line 41: sum(numbers) = 10+5+25+15+30 = 85.",
          "Line 42: max(numbers) = 30.",
          "Line 43: min(numbers) = 5.",
          "Key point: Arrays can be passed as parameters to methods.",
        ],
      },
    ],
    advanced: [
      {
        id: "method-ex-a-1",
        title: "Method overloading with different parameter types",
        code: `public class Main {
    // Overloaded methods for displaying different data types
    
    public static void display(int num) {
        System.out.println("Integer: " + num);
    }
    
    public static void display(double num) {
        System.out.println("Double: " + num);
    }
    
    public static void display(String str) {
        System.out.println("String: " + str);
    }
    
    public static void display(int a, int b) {
        System.out.println("Two integers: " + a + ", " + b);
    }
    
    public static void display(String str, int num) {
        System.out.println("String and Integer: " + str + ", " + num);
    }
    
    public static void main(String[] args) {
        display(10);                    // Calls display(int)
        display(3.14);                  // Calls display(double)
        display("Hello");               // Calls display(String)
        display(5, 15);                 // Calls display(int, int)
        display("Age", 25);             // Calls display(String, int)
        display(100, "Score");          // Calls display(int, String) - DOESN'T EXIST!
    }
}`,
        output: "Integer: 10\nDouble: 3.14\nString: Hello\nTwo integers: 5, 15\nString and Integer: Age, 25",
        explanation: [
          "Five overloaded methods with same name but different parameters.",
          "display(int) - handles single integer.",
          "display(double) - handles single double.",
          "display(String) - handles single string.",
          "display(int, int) - handles two integers.",
          "display(String, int) - handles string and integer.",
          "Line 25: display(100, 'Score') would cause error - no matching method.",
          "Key point: Java selects method based on number, type, and order of parameters.",
        ],
      },
      {
        id: "method-ex-a-2",
        title: "Fibonacci series using method",
        code: `public class Main {
    // Method to calculate nth Fibonacci number
    public static int fibonacci(int n) {
        if (n == 0) {
            return 0;
        } else if (n == 1) {
            return 1;
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    }
    
    // Method to print Fibonacci series
    public static void printFibonacci(int terms) {
        System.out.print("Fibonacci Series: ");
        for (int i = 0; i < terms; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        printFibonacci(10);
        System.out.println("10th Fibonacci: " + fibonacci(10));
    }
}`,
        output: "Fibonacci Series: 0 1 1 2 3 5 8 13 21 34 \n10th Fibonacci: 55",
        explanation: [
          "Line 3-11: fibonacci() recursively calculates nth Fibonacci number.",
          "Base cases: fibonacci(0) = 0, fibonacci(1) = 1.",
          "Recursive: fibonacci(n) = fibonacci(n-1) + fibonacci(n-2).",
          "Line 14-20: printFibonacci() prints first 'terms' Fibonacci numbers.",
          "Line 24: printFibonacci(10) prints first 10 Fibonacci numbers.",
          "Line 25: fibonacci(10) returns 55.",
          "Key point: Recursive methods call themselves with simpler inputs until base case.",
        ],
      },
      {
        id: "method-ex-a-3",
        title: "Pass by value demonstration",
        code: `public class Main {
    // Method that tries to modify parameter
    public static void modifyValue(int num) {
        num = 100;  // This only changes local copy
        System.out.println("Inside method: num = " + num);
    }
    
    // Method that modifies array (reference is passed by value)
    public static void modifyArray(int[] arr) {
        arr[0] = 100;  // This changes original array
        System.out.println("Inside method: arr[0] = " + arr[0]);
    }
    
    public static void main(String[] args) {
        int x = 10;
        System.out.println("Before method call: x = " + x);
        modifyValue(x);
        System.out.println("After method call: x = " + x);
        
        int[] numbers = {10, 20, 30};
        System.out.println("\\nBefore method call: numbers[0] = " + numbers[0]);
        modifyArray(numbers);
        System.out.println("After method call: numbers[0] = " + numbers[0]);
    }
}`,
        output: "Before method call: x = 10\nInside method: num = 100\nAfter method call: x = 10\n\nBefore method call: numbers[0] = 10\nInside method: arr[0] = 100\nAfter method call: numbers[0] = 100",
        explanation: [
          "Line 3-8: modifyValue() receives a copy of x. Changing num doesn't affect x.",
          "Line 11-16: modifyArray() receives reference to array. Changing arr[0] affects original.",
          "Line 20: x = 10 before call.",
          "Line 22: Inside method, num = 100 (local copy).",
          "Line 24: x is still 10 (not modified).",
          "Line 28: numbers[0] = 10 before call.",
          "Line 30: Inside method, arr[0] = 100 (modifies original).",
          "Line 32: numbers[0] is now 100 (modified!).",
          "Key point: Primitives are passed by value, arrays are passed by reference value.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "Tracing method execution flow",
      code: `public class Main {
    public static int calculate(int a, int b) {
        int sum = a + b;
        return sum;
    }
    
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        int result = calculate(x, y);
        System.out.println(result);
    }
}`,
      trace: [
        { line: 1, explanation: "Class Main defined." },
        { line: 2, explanation: "calculate() method defined (not executed yet)." },
        { line: 7, explanation: "main() method starts executing." },
        { line: 8, explanation: "x = 5 declared and initialized." },
        { line: 9, explanation: "y = 10 declared and initialized." },
        { line: 10, explanation: "Call calculate(x, y) → calculate(5, 10). Execution jumps to line 2." },
        { line: 3, explanation: "a = 5, b = 10 (parameters receive values)." },
        { line: 4, explanation: "sum = 5 + 10 = 15." },
        { line: 5, explanation: "return 15 - execution returns to line 10." },
        { line: 10, explanation: "result = 15 (return value stored)." },
        { line: 11, explanation: "Print result (15) to console." },
      ],
    },
    {
      title: "Tracing method with multiple calls",
      code: `public class Main {
    public static int square(int n) {
        return n * n;
    }
    
    public static void main(String[] args) {
        int a = 3;
        int b = 4;
        int c = square(a) + square(b);
        System.out.println(c);
    }
}`,
      trace: [
        { line: 1, explanation: "Class Main defined." },
        { line: 2, explanation: "square() method defined." },
        { line: 7, explanation: "main() starts." },
        { line: 8, explanation: "a = 3." },
        { line: 9, explanation: "b = 4." },
        { line: 10, explanation: "Evaluate right side: square(a) + square(b)." },
        { line: 10, explanation: "Call square(3): return 3*3 = 9." },
        { line: 10, explanation: "Call square(4): return 4*4 = 16." },
        { line: 10, explanation: "c = 9 + 16 = 25." },
        { line: 11, explanation: "Print 25." },
      ],
    },
    {
      title: "Tracing method overloading",
      code: `public class Main {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static double add(double a, double b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int sum1 = add(5, 10);
        double sum2 = add(2.5, 3.5);
        System.out.println(sum1 + " " + sum2);
    }
}`,
      trace: [
        { line: 1, explanation: "Class Main defined." },
        { line: 2, explanation: "add(int, int) method defined." },
        { line: 6, explanation: "add(double, double) method defined." },
        { line: 11, explanation: "main() starts." },
        { line: 12, explanation: "Call add(5, 10) - both int, so calls add(int, int). Returns 15." },
        { line: 13, explanation: "Call add(2.5, 3.5) - both double, so calls add(double, double). Returns 6.0." },
        { line: 14, explanation: "Print '15 6.0'." },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "methods-ob-1",
      question: `public static void print() {
    System.out.println("Hello");
}
public static void main(String[] args) {
    print();
}`,
      answer: "Hello",
      explanation: "print() method is called, which prints 'Hello'.",
    },
    {
      id: "methods-ob-2",
      question: `public static int getNumber() {
    return 42;
}
public static void main(String[] args) {
    int x = getNumber();
    System.out.println(x);
}`,
      answer: "42",
      explanation: "getNumber() returns 42, which is stored in x and printed.",
    },
    {
      id: "methods-ob-3",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static void main(String[] args) {
    int result = add(5, 10);
    System.out.println(result);
}`,
      answer: "15",
      explanation: "add(5, 10) returns 15, stored in result and printed.",
    },
    {
      id: "methods-ob-4",
      question: `public static void greet(String name) {
    System.out.println("Hello, " + name);
}
public static void main(String[] args) {
    greet("Alice");
    greet("Bob");
}`,
      answer: "Hello, Alice\nHello, Bob",
      explanation: "greet() is called twice with different names.",
    },
    {
      id: "methods-ob-5",
      question: `public static int multiply(int a, int b) {
    return a * b;
}
public static void main(String[] args) {
    System.out.println(multiply(3, 4));
    System.out.println(multiply(5, 2));
}`,
      answer: "12\n10",
      explanation: "multiply(3,4) returns 12, multiply(5,2) returns 10.",
    },
    {
      id: "methods-ob-6",
      question: `public static boolean isPositive(int n) {
    return n > 0;
}
public static void main(String[] args) {
    System.out.println(isPositive(5));
    System.out.println(isPositive(-3));
    System.out.println(isPositive(0));
}`,
      answer: "true\nfalse\nfalse",
      explanation: "5>0 is true, -3>0 is false, 0>0 is false.",
    },
    {
      id: "methods-ob-7",
      question: `public static int square(int n) {
    return n * n;
}
public static void main(String[] args) {
    int a = 4;
    int b = square(a);
    System.out.println(b);
}`,
      answer: "16",
      explanation: "square(4) returns 16, stored in b and printed.",
    },
    {
      id: "methods-ob-8",
      question: `public static void printSum(int a, int b) {
    System.out.println(a + b);
}
public static void main(String[] args) {
    int x = 10;
    int y = 20;
    printSum(x, y);
}`,
      answer: "30",
      explanation: "printSum(10, 20) prints 10+20=30.",
    },
    {
      id: "methods-ob-9",
      question: `public static int max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}
public static void main(String[] args) {
    System.out.println(max(15, 25));
    System.out.println(max(100, 50));
}`,
      answer: "25\n100",
      explanation: "max(15,25) returns 25, max(100,50) returns 100.",
    },
    {
      id: "methods-ob-10",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static void main(String[] args) {
    int result = add(3, 4) + add(5, 6);
    System.out.println(result);
}`,
      answer: "18",
      explanation: "add(3,4)=7, add(5,6)=11, result=7+11=18.",
    },
    {
      id: "methods-ob-11",
      question: `public static void display(char ch) {
    System.out.println(ch);
}
public static void main(String[] args) {
    display('A');
    display('B');
    display('C');
}`,
      answer: "A\nB\nC",
      explanation: "display() called three times with different characters.",
    },
    {
      id: "methods-ob-12",
      question: `public static int getFirst(int[] arr) {
    return arr[0];
}
public static void main(String[] args) {
    int[] nums = {10, 20, 30};
    System.out.println(getFirst(nums));
}`,
      answer: "10",
      explanation: "getFirst(nums) returns arr[0] which is 10.",
    },
    {
      id: "methods-ob-13",
      question: `public static int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
public static void main(String[] args) {
    System.out.println(factorial(4));
}`,
      answer: "24",
      explanation: "factorial(4) = 4*factorial(3) = 4*3*factorial(2) = 4*3*2*factorial(1) = 4*3*2*1 = 24.",
    },
    {
      id: "methods-ob-14",
      question: `public static void printMessage(String msg, int times) {
    for (int i = 0; i < times; i++) {
        System.out.println(msg);
    }
}
public static void main(String[] args) {
    printMessage("Hi", 3);
}`,
      answer: "Hi\nHi\nHi",
      explanation: "printMessage prints 'Hi' three times.",
    },
    {
      id: "methods-ob-15",
      question: `public static boolean isVowel(char ch) {
    ch = Character.toLowerCase(ch);
    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';
}
public static void main(String[] args) {
    System.out.println(isVowel('A'));
    System.out.println(isVowel('X'));
}`,
      answer: "true\nfalse",
      explanation: "'A' converted to 'a' is vowel, 'X' is not vowel.",
    },
    {
      id: "methods-ob-16",
      question: `public static int sum(int a, int b, int c) {
    return a + b + c;
}
public static void main(String[] args) {
    System.out.println(sum(1, 2, 3));
    System.out.println(sum(10, 20, 30));
}`,
      answer: "6\n60",
      explanation: "sum(1,2,3)=6, sum(10,20,30)=60.",
    },
    {
      id: "methods-ob-17",
      question: `public static String concat(String s1, String s2) {
    return s1 + s2;
}
public static void main(String[] args) {
    System.out.println(concat("Hello", "World"));
    System.out.println(concat("Java", "Programming"));
}`,
      answer: "HelloWorld\nJavaProgramming",
      explanation: "concat concatenates two strings without space.",
    },
    {
      id: "methods-ob-18",
      question: `public static int absolute(int n) {
    if (n < 0) {
        return -n;
    }
    return n;
}
public static void main(String[] args) {
    System.out.println(absolute(-5));
    System.out.println(absolute(7));
    System.out.println(absolute(0));
}`,
      answer: "5\n7\n0",
      explanation: "absolute(-5) returns 5, absolute(7) returns 7, absolute(0) returns 0.",
    },
    {
      id: "methods-ob-19",
      question: `public static void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    System.out.println(a + " " + b);
}
public static void main(String[] args) {
    int x = 10;
    int y = 20;
    swap(x, y);
    System.out.println(x + " " + y);
}`,
      answer: "20 10\n10 20",
      explanation: "Inside swap, a=20, b=10 (swapped locally). Outside, x=10, y=20 (unchanged). Pass by value.",
    },
    {
      id: "methods-ob-20",
      question: `public static int power(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result = result * base;
    }
    return result;
}
public static void main(String[] args) {
    System.out.println(power(2, 3));
    System.out.println(power(3, 2));
    System.out.println(power(5, 0));
}`,
      answer: "8\n9\n1",
      explanation: "power(2,3)=8, power(3,2)=9, power(5,0)=1 (any number^0=1).",
    },
    {
      id: "methods-ob-21",
      question: `public static int countDigits(int n) {
    int count = 0;
    while (n > 0) {
        count++;
        n = n / 10;
    }
    return count;
}
public static void main(String[] args) {
    System.out.println(countDigits(123));
    System.out.println(countDigits(4567));
    System.out.println(countDigits(9));
}`,
      answer: "3\n4\n1",
      explanation: "123 has 3 digits, 4567 has 4 digits, 9 has 1 digit.",
    },
    {
      id: "methods-ob-22",
      question: `public static boolean isLeapYear(int year) {
    if (year % 400 == 0) return true;
    if (year % 100 == 0) return false;
    return year % 4 == 0;
}
public static void main(String[] args) {
    System.out.println(isLeapYear(2000));
    System.out.println(isLeapYear(1900));
    System.out.println(isLeapYear(2024));
    System.out.println(isLeapYear(2023));
}`,
      answer: "true\nfalse\ntrue\nfalse",
      explanation: "2000 divisible by 400 (leap), 1900 divisible by 100 but not 400 (not leap), 2024 divisible by 4 (leap), 2023 not divisible by 4 (not leap).",
    },
    {
      id: "methods-ob-23",
      question: `public static int sum(int a, int b) {
    return a + b;
}
public static double sum(double a, double b) {
    return a + b;
}
public static void main(String[] args) {
    System.out.println(sum(5, 10));
    System.out.println(sum(2.5, 3.5));
}`,
      answer: "15\n6.0",
      explanation: "sum(5,10) calls int version, sum(2.5,3.5) calls double version (overloading).",
    },
    {
      id: "methods-ob-24",
      question: `public static void printPattern(int n) {
    for (int i = 1; i <= n; i++) {
        System.out.print(i + " ");
    }
    System.out.println();
}
public static void main(String[] args) {
    printPattern(5);
    printPattern(3);
}`,
      answer: "1 2 3 4 5 \n1 2 3 ",
      explanation: "printPattern(5) prints 1 to 5, printPattern(3) prints 1 to 3.",
    },
    {
      id: "methods-ob-25",
      question: `public static int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
public static void main(String[] args) {
    System.out.println(gcd(12, 18));
    System.out.println(gcd(100, 75));
}`,
      answer: "6\n25",
      explanation: "GCD(12,18)=6, GCD(100,75)=25 (Euclidean algorithm).",
    },
    {
      id: "methods-ob-26",
      question: `public static int[] getArray() {
    int[] arr = {1, 2, 3};
    return arr;
}
public static void main(String[] args) {
    int[] nums = getArray();
    System.out.println(nums[1]);
}`,
      answer: "2",
      explanation: "getArray() returns {1,2,3}, nums[1] is 2.",
    },
    {
      id: "methods-ob-27",
      question: `public static void increment(int n) {
    n++;
    System.out.println("Inside: " + n);
}
public static void main(String[] args) {
    int x = 5;
    increment(x);
    System.out.println("Outside: " + x);
}`,
      answer: "Inside: 6\nOutside: 5",
      explanation: "Pass by value: n is a copy, incrementing n doesn't affect x.",
    },
    {
      id: "methods-ob-28",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static void main(String[] args) {
    int x = 5;
    int y = 10;
    int z = add(x, y);
    System.out.println(z);
}`,
      answer: "15",
      explanation: "add(5,10) returns 15, stored in z and printed.",
    },
    {
      id: "methods-ob-29",
      question: `public static String getGrade(int marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    return "C";
}
public static void main(String[] args) {
    System.out.println(getGrade(85));
    System.out.println(getGrade(75));
    System.out.println(getGrade(65));
}`,
      answer: "A\nB\nC",
      explanation: "85>=80 returns 'A', 75>=70 returns 'B', 65<70 returns 'C'.",
    },
    {
      id: "methods-ob-30",
      question: `public static int multiply(int a, int b) {
    return a * b;
}
public static void main(String[] args) {
    int result = multiply(2, multiply(3, 4));
    System.out.println(result);
}`,
      answer: "24",
      explanation: "Inner multiply(3,4)=12, outer multiply(2,12)=24.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "methods-ef-1",
      question: `public static int add(int a, int b) {
    int sum = a + b;
}
public static void main(String[] args) {
    System.out.println(add(5, 10));
}`,
      error: "Method declares return type int but doesn't return a value. Add 'return sum;' before closing brace.",
      corrected: `public static int add(int a, int b) {
    int sum = a + b;
    return sum;
}`,
    },
    {
      id: "methods-ef-2",
      question: `public static void greet() {
    return "Hello";
}
public static void main(String[] args) {
    System.out.println(greet());
}`,
      error: "Method has void return type but tries to return a String value. Change return type to String or remove return value.",
      corrected: `public static String greet() {
    return "Hello";
}`,
    },
    {
      id: "methods-ef-3",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static void main(String[] args) {
    int result = add(5);
    System.out.println(result);
}`,
      error: "Method add(int, int) requires 2 arguments but only 1 provided. Add second argument: add(5, 10).",
      corrected: `int result = add(5, 10);`,
    },
    {
      id: "methods-ef-4",
      question: `public static void main(String[] args) {
    int result = add(5, 10);
    System.out.println(result);
}
public static int add(int a, int b) {
    return a + b;
}`,
      error: "Method add() is defined after main(). In Java, methods can be in any order within class, but main() should call methods that are defined. Move add() before main() or keep as is (Java allows this).",
      corrected: "No error - Java allows methods in any order within a class.",
    },
    {
      id: "methods-ef-5",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static int add(int a, int b, int c) {
    return a + b + c;
}
public static void main(String[] args) {
    int result = add(5, 10);
    System.out.println(result);
}`,
      error: "No error. This is valid method overloading. add(5, 10) calls the two-parameter version.",
      corrected: "No error. Code is correct.",
    },
    {
      id: "methods-ef-6",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static double add(int a, int b) {
    return a + b;
}`,
      error: "Method overloading cannot differ only by return type. Both methods have same name and parameters. Change parameter types or number.",
      corrected: `public static int add(int a, int b) {
    return a + b;
}
public static double add(double a, double b) {
    return a + b;
}`,
    },
    {
      id: "methods-ef-7",
      question: `public static void print() {
    System.out.println("Hello");
}
public static void main(String[] args) {
    print;`,
      error: "Method call requires parentheses even with no parameters. Use print() not print.",
      corrected: `print();`,
    },
    {
      id: "methods-ef-8",
      question: `public static int square(int n) {
    n * n;
}
public static void main(String[] args) {
    System.out.println(square(5));
}`,
      error: "Method calculates n*n but doesn't return it. Add 'return n * n;' statement.",
      corrected: `public static int square(int n) {
    return n * n;
}`,
    },
    {
      id: "methods-ef-9",
      question: `public static void main(String[] args) {
    int result = add(5, 10);
    System.out.println(result);
}`,
      error: "Method add() is called but not defined in the class. Define the add() method.",
      corrected: `public static int add(int a, int b) {
    return a + b;
}`,
    },
    {
      id: "methods-ef-10",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static void main(String[] args) {
    int result = add(5, 10);
    System.out.println(result);
}
public static int add(int x, int y) {
    return x + y;
}`,
      error: "Duplicate method - two methods with same signature (name and parameter types). Remove one or change parameters.",
      corrected: "Remove the duplicate method or change parameter names/types.",
    },
    {
      id: "methods-ef-11",
      question: `public static int multiply(int a, int b) {
    int result = a * b;
    System.out.println(result);
    return result;
}
public static void main(String[] args) {
    multiply(3, 4);
}`,
      error: "No error. Method works correctly - prints and returns value.",
      corrected: "No error.",
    },
    {
      id: "methods-ef-12",
      question: `public static void main(String[] args) {
    int x = 10;
    int y = 20;
    swap(x, y);
    System.out.println(x + " " + y);
}
public static void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}`,
      error: "No error in syntax. However, swap() won't swap x and y because Java is pass-by-value. The swap only affects local copies a and b.",
      corrected: "To actually swap, return an array or use wrapper class. Or accept that this demonstrates pass-by-value.",
    },
    {
      id: "methods-ef-13",
      question: `public static int max(int a, int b) {
    if (a > b)
        return a;
    else
        return b;
    System.out.println("Done");
}
public static void main(String[] args) {
    System.out.println(max(10, 20));
}`,
      error: "Line 7 is unreachable - return statements in lines 4 and 6 exit the method. Code after return never executes.",
      corrected: `public static int max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}`,
    },
    {
      id: "methods-ef-14",
      question: `public static int divide(int a, int b) {
    return a / b;
}
public static void main(String[] args) {
    System.out.println(divide(10, 0));
}`,
      error: "No syntax error, but runtime error: ArithmeticException (division by zero). Add check for b == 0.",
      corrected: `public static int divide(int a, int b) {
    if (b == 0) {
        System.out.println("Error: Division by zero");
        return 0;
    }
    return a / b;
}`,
    },
    {
      id: "methods-ef-15",
      question: `public static void printSum(int a, int b) {
    int sum = a + b;
    System.out.println(sum);
}
public static void main(String[] args) {
    int result = printSum(5, 10);
    System.out.println(result);
}`,
      error: "printSum() has void return type but result tries to store its return value. Either change return type to int or don't store in variable.",
      corrected: `System.out.println(printSum(5, 10)); // If changed to return int
// OR
printSum(5, 10); // Keep as void`,
    },
    {
      id: "methods-ef-16",
      question: `public static int add(int a) {
    return a;
}
public static int add(int a, int b) {
    return a + b;
}
public static void main(String[] args) {
    System.out.println(add(5));
}`,
      error: "No error. This is valid overloading - different number of parameters. add(5) calls the one-parameter version.",
      corrected: "No error.",
    },
    {
      id: "methods-ef-17",
      question: `public static void display(int num) {
    System.out.println(num);
}
public static void main(String[] args) {
    display(5, 10);
}`,
      error: "Method display(int) expects 1 argument but 2 provided. Either change method to accept 2 parameters or call with 1 argument.",
      corrected: `public static void display(int num1, int num2) {
    System.out.println(num1 + " " + num2);
}`,
    },
    {
      id: "methods-ef-18",
      question: `public static int factorial(int n) {
    return n * factorial(n - 1);
}
public static void main(String[] args) {
    System.out.println(factorial(5));
}`,
      error: "Missing base case in recursion. factorial() will cause StackOverflowError. Add base case: if (n == 0 || n == 1) return 1;",
      corrected: `public static int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
    },
    {
      id: "methods-ef-19",
      question: `public static int getValue() {
    int value = 100;
}
public static void main(String[] args) {
    int x = getValue();
    System.out.println(x);
}`,
      error: "Method declares return type int but doesn't return a value. Add 'return value;' statement.",
      corrected: `public static int getValue() {
    int value = 100;
    return value;
}`,
    },
    {
      id: "methods-ef-20",
      question: `public static void main(String[] args) {
    int a = 5;
    int b = 10;
    int max = maximum(a, b);
    System.out.println(max);
}
public static int maximum(int x, int y) {
    if (x > y) {
        return x;
    } else {
        return y;
    }
}`,
      error: "No error. Code is correct. Method names can be different from variable names.",
      corrected: "No error.",
    },
    {
      id: "methods-ef-21",
      question: `public static int add(int a, int b) {
    return a + b;
}
public static void main(String[] args) {
    int result = add(5, 10);
    System.out.println(add(3, 7));
    System.out.println(result);
}`,
      error: "No error. Method can be called multiple times with different arguments.",
      corrected: "No error.",
    },
    {
      id: "methods-ef-22",
      question: `public static void printArray(int[] arr) {
    for (int i = 0; i <= arr.length; i++) {
        System.out.println(arr[i]);
    }
}
public static void main(String[] args) {
    int[] nums = {1, 2, 3};
    printArray(nums);
}`,
      error: "ArrayIndexOutOfBoundsException. Loop condition should be i < arr.length, not i <= arr.length. Array indices go from 0 to length-1.",
      corrected: `for (int i = 0; i < arr.length; i++)`,
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    {
      id: "methods-fb-1",
      question: "A _____ is a reusable block of code that performs a specific task.",
      answer: "method",
    },
    {
      id: "methods-fb-2",
      question: "The entry point of every Java program is the _____ method.",
      answer: "main",
    },
    {
      id: "methods-fb-3",
      question: "If a method doesn't return any value, its return type is _____.",
      answer: "void",
    },
    {
      id: "methods-fb-4",
      question: "The keyword used to return a value from a method is _____.",
      answer: "return",
    },
    {
      id: "methods-fb-5",
      question: "Variables in method definition are called _____ parameters.",
      answer: "formal",
    },
    {
      id: "methods-fb-6",
      question: "Values passed in method call are called _____ parameters.",
      answer: "actual",
    },
    {
      id: "methods-fb-7",
      question: "Having multiple methods with same name but different parameters is called _____.",
      answer: "overloading",
    },
    {
      id: "methods-fb-8",
      question: "Method overloading depends on number, type, and _____ of parameters.",
      answer: "order",
    },
    {
      id: "methods-fb-9",
      question: "In Java, parameters are passed by _____.",
      answer: "value",
    },
    {
      id: "methods-fb-10",
      question: "A method that calls itself is called _____.",
      answer: "recursive",
    },
    {
      id: "methods-fb-11",
      question: "The combination of method name and parameter list is called method _____.",
      answer: "signature",
    },
    {
      id: "methods-fb-12",
      question: "Methods declared with static keyword can be called without creating an _____.",
      answer: "object",
    },
    {
      id: "methods-fb-13",
      question: "The _____ statement immediately exits the method.",
      answer: "return",
    },
    {
      id: "methods-fb-14",
      question: "A method can return at most _____ value(s).",
      answer: "one",
    },
    {
      id: "methods-fb-15",
      question: "Method names in Java should follow _____ case convention.",
      answer: "camel",
    },
    {
      id: "methods-fb-16",
      question: "The main() method must be declared as public static _____ main(String[] args).",
      answer: "void",
    },
    {
      id: "methods-fb-17",
      question: "In recursion, the condition that stops the recursion is called _____ case.",
      answer: "base",
    },
    {
      id: "methods-fb-18",
      question: "When a method calls another method, it's called _____ calling.",
      answer: "nested",
    },
    {
      id: "methods-fb-19",
      question: "The data type of value returned by method is called _____ type.",
      answer: "return",
    },
    {
      id: "methods-fb-20",
      question: "Methods help achieve the _____ principle (Don't Repeat Yourself).",
      answer: "DRY",
    },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "methods-mcq-1",
      question: "What is a method in Java?",
      options: [
        "A variable that stores data",
        "A reusable block of code that performs a task",
        "A data type",
        "A class name",
      ],
      answer: 1,
      explanation: "A method is a reusable block of code designed to perform a specific task.",
    },
    {
      id: "methods-mcq-2",
      question: "What is the return type of main() method?",
      options: ["int", "String", "void", "boolean"],
      answer: 2,
      explanation: "The main() method has void return type, meaning it doesn't return any value.",
    },
    {
      id: "methods-mcq-3",
      question: "Which keyword is used to return a value from a method?",
      options: ["break", "continue", "return", "exit"],
      answer: 2,
      explanation: "The return keyword is used to return a value from a method and exit it.",
    },
    {
      id: "methods-mcq-4",
      question: "What is method overloading?",
      options: [
        "Having multiple methods with same name but different parameters",
        "Having multiple methods with different names",
        "Having multiple return types",
        "Having multiple classes",
      ],
      answer: 0,
      explanation: "Method overloading allows multiple methods with same name but different parameters.",
    },
    {
      id: "methods-mcq-5",
      question: "Can method overloading be achieved by changing only the return type?",
      options: ["Yes", "No", "Sometimes", "Depends on compiler"],
      answer: 1,
      explanation: "No, overloading requires different parameters (type, number, or order), not just return type.",
    },
    {
      id: "methods-mcq-6",
      question: "What is the correct method signature for main()?",
      options: [
        "public static void main()",
        "public void static main(String[] args)",
        "public static void main(String[] args)",
        "static public void main()",
      ],
      answer: 2,
      explanation: "The correct signature is public static void main(String[] args).",
    },
    {
      id: "methods-mcq-7",
      question: "How are parameters passed to methods in Java?",
      options: [
        "Pass by reference",
        "Pass by value",
        "Pass by pointer",
        "Pass by address",
      ],
      answer: 1,
      explanation: "Java uses pass by value - a copy of the value is passed to the method.",
    },
    {
      id: "methods-mcq-8",
      question: "What happens if a method with return type int doesn't have a return statement?",
      options: [
        "It returns 0 automatically",
        "It returns null",
        "Compilation error",
        "It returns garbage value",
      ],
      answer: 2,
      explanation: "Compilation error - a method with non-void return type must return a value.",
    },
    {
      id: "methods-mcq-9",
      question: "Which of the following is a valid method call for: public static void print(String msg)?",
      options: ["print();", "print('Hello');", 'print("Hello");', "print('Hello');"],
      answer: 2,
      explanation: "print('Hello') is correct - String parameter requires double quotes.",
    },
    {
      id: "methods-mcq-10",
      question: "What is the output of: System.out.println(add(2, 3) + add(4, 5)); where add returns sum?",
      options: ["9", "14", "7", "Error"],
      answer: 1,
      explanation: "add(2,3)=5, add(4,5)=9, 5+9=14.",
    },
    {
      id: "methods-mcq-11",
      question: "Can a method call another method?",
      options: ["No", "Yes", "Only static methods", "Only in same class"],
      answer: 1,
      explanation: "Yes, methods can call other methods, including themselves (recursion).",
    },
    {
      id: "methods-mcq-12",
      question: "What is a recursive method?",
      options: [
        "A method that calls another method",
        "A method that calls itself",
        "A method with no parameters",
        "A method with void return type",
      ],
      answer: 1,
      explanation: "A recursive method is one that calls itself to solve a problem.",
    },
    {
      id: "methods-mcq-13",
      question: "What is required in a recursive method?",
      options: [
        "Only a recursive call",
        "Only a base case",
        "Both base case and recursive case",
        "Neither base case nor recursive case",
      ],
      answer: 2,
      explanation: "Recursive methods need both a base case (to stop) and a recursive case (to continue).",
    },
    {
      id: "methods-mcq-14",
      question: "What does the following code output?\nint x = 5;\nchange(x);\nSystem.out.println(x);\nvoid change(int n) { n = 10; }",
      options: ["5", "10", "Error", "Garbage value"],
      answer: 0,
      explanation: "Pass by value: changing n inside method doesn't affect x. x remains 5.",
    },
    {
      id: "methods-mcq-15",
      question: "Which is true about static methods?",
      options: [
        "They can only be called from static methods",
        "They belong to the class, not instances",
        "They can access non-static variables directly",
        "They require an object to be called",
      ],
      answer: 1,
      explanation: "Static methods belong to the class and can be called using ClassName.method().",
    },
    {
      id: "methods-mcq-16",
      question: "What is the output of: System.out.println(max(3, 7)); where max returns larger value?",
      options: ["3", "7", "10", "Error"],
      answer: 1,
      explanation: "max(3, 7) returns 7 (the larger value).",
    },
    {
      id: "methods-mcq-17",
      question: "How many values can a method return?",
      options: ["Zero", "One", "Two", "Multiple"],
      answer: 1,
      explanation: "A method can return at most one value. Use arrays or objects to return multiple values.",
    },
    {
      id: "methods-mcq-18",
      question: "What is the output of factorial(5)?",
      options: ["5", "25", "120", "60"],
      answer: 2,
      explanation: "factorial(5) = 5×4×3×2×1 = 120.",
    },
    {
      id: "methods-mcq-19",
      question: "Which method is called first when a Java program runs?",
      options: ["start()", "init()", "main()", "run()"],
      answer: 2,
      explanation: "The main() method is the entry point where program execution begins.",
    },
    {
      id: "methods-mcq-20",
      question: "What is the output?\nvoid display(int a, int b) { System.out.println(a + b); }\ndisplay(5);",
      options: ["5", "Error", "0", "Null"],
      answer: 1,
      explanation: "Error: method expects 2 arguments but only 1 provided.",
    },
    {
      id: "methods-mcq-21",
      question: "Can a void method use return statement?",
      options: ["No", "Yes, with a value", "Yes, without a value", "Only at the end"],
      answer: 2,
      explanation: "Yes, a void method can use 'return;' without a value to exit early.",
    },
    {
      id: "methods-mcq-22",
      question: "What is method signature?",
      options: [
        "Method name only",
        "Parameter list only",
        "Method name + parameter list",
        "Return type + method name",
      ],
      answer: 2,
      explanation: "Method signature = method name + parameter list (types and order).",
    },
    {
      id: "methods-mcq-23",
      question: "Which is correct about formal and actual parameters?",
      options: [
        "Formal are in call, actual are in definition",
        "Formal are in definition, actual are in call",
        "Both are the same",
        "Neither exists in Java",
      ],
      answer: 1,
      explanation: "Formal parameters are in method definition, actual parameters are values passed in call.",
    },
    {
      id: "methods-mcq-24",
      question: "What is the output of: System.out.println(isEven(4)); where isEven returns boolean?",
      options: ["4", "true", "false", "Error"],
      answer: 1,
      explanation: "4 is even, so isEven(4) returns true.",
    },
    {
      id: "methods-mcq-25",
      question: "Can a method be called without creating an object if it's static?",
      options: ["No", "Yes", "Only in main()", "Depends on parameters"],
      answer: 1,
      explanation: "Yes, static methods can be called using ClassName.method() without creating an object.",
    },
    {
      id: "methods-mcq-26",
      question: "What happens when return statement is executed?",
      options: [
        "Method continues executing",
        "Method pauses",
        "Method exits immediately",
        "Program terminates",
      ],
      answer: 2,
      explanation: "Return statement immediately exits the method and returns to caller.",
    },
    {
      id: "methods-mcq-27",
      question: "Which is a valid method declaration?",
      options: [
        "void myMethod()",
        "public void myMethod()",
        "static void myMethod()",
        "All of the above",
      ],
      answer: 3,
      explanation: "All are valid - methods can have various access modifiers and combinations.",
    },
    {
      id: "methods-mcq-28",
      question: "What is the output of: System.out.println(power(2, 3)); where power calculates base^exp?",
      options: ["5", "6", "8", "9"],
      answer: 2,
      explanation: "2^3 = 2×2×2 = 8.",
    },
    {
      id: "methods-mcq-29",
      question: "Can two methods have same name if they have different parameters?",
      options: ["No", "Yes (overloading)", "Only if return type differs", "Only in different classes"],
      answer: 1,
      explanation: "Yes, this is called method overloading - same name, different parameters.",
    },
    {
      id: "methods-mcq-30",
      question: "What is the output of: System.out.println(add(1, 2, 3)); where add has versions for 2 and 3 parameters?",
      options: ["3", "6", "Error", "Depends"],
      answer: 1,
      explanation: "With 3 arguments, calls add(int, int, int) which returns 1+2+3=6.",
    },
    {
      id: "methods-mcq-31",
      question: "Which is true about method parameters?",
      options: [
        "They must have default values",
        "They can be used without declaration",
        "They act as local variables in the method",
        "They are global variables",
      ],
      answer: 2,
      explanation: "Parameters are local variables that receive values when method is called.",
    },
    {
      id: "methods-mcq-32",
      question: "What is the output of: System.out.println(reverse('hello')); where reverse returns reversed string?",
      options: ["hello", "olleh", "Error", "null"],
      answer: 1,
      explanation: "reverse('hello') returns 'olleh'.",
    },
    {
      id: "methods-mcq-33",
      question: "Can a method return an array?",
      options: ["No", "Yes", "Only String arrays", "Only primitive arrays"],
      answer: 1,
      explanation: "Yes, methods can return arrays of any type.",
    },
    {
      id: "methods-mcq-34",
      question: "What is the output of: System.out.println(isPalindrome('madam')); where isPalindrome checks palindrome?",
      options: ["madam", "true", "false", "Error"],
      answer: 1,
      explanation: "'madam' is a palindrome, so isPalindrome returns true.",
    },
    {
      id: "methods-mcq-35",
      question: "How do you call a non-static method?",
      options: [
        "ClassName.method()",
        "method()",
        "object.method()",
        "Both B and C",
      ],
      answer: 3,
      explanation: "Non-static methods require an object to be called: object.method().",
    },
    {
      id: "methods-mcq-36",
      question: "What is the output of: System.out.println(gcd(12, 18)); where gcd finds greatest common divisor?",
      options: ["2", "3", "6", "9"],
      answer: 2,
      explanation: "GCD(12, 18) = 6.",
    },
    {
      id: "methods-mcq-37",
      question: "Can a method have no parameters?",
      options: ["No", "Yes", "Only void methods", "Only static methods"],
      answer: 1,
      explanation: "Yes, methods can have zero parameters: void methodName().",
    },
    {
      id: "methods-mcq-38",
      question: "What is the output of: System.out.println(countVowels('Hello')); where countVowels counts vowels?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "'Hello' has 2 vowels: 'e' and 'o'.",
    },
    {
      id: "methods-mcq-39",
      question: "Which is NOT a valid reason to use methods?",
      options: [
        "Code reusability",
        "Better organization",
        "Makes program longer",
        "Easier debugging",
      ],
      answer: 2,
      explanation: "Methods make programs shorter and more organized, not longer.",
    },
    {
      id: "methods-mcq-40",
      question: "What is the output of: System.out.println(absolute(-5)); where absolute returns absolute value?",
      options: ["-5", "5", "0", "Error"],
      answer: 1,
      explanation: "absolute(-5) returns 5 (absolute value of -5).",
    },
  ],

  // ========== 10. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "methods-ar-1",
      assertion: "Assertion (A): A method can execute zero or more times.",
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
      id: "methods-ar-2",
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
      id: "methods-ar-3",
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
      id: "methods-ar-4",
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
      id: "methods-ar-5",
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
      id: "methods-ar-6",
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
      id: "methods-ar-7",
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
      id: "methods-ar-8",
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
      id: "methods-ar-9",
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
      id: "methods-ar-10",
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

  // ========== 11. DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "methods-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "methods-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "methods-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "methods-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "methods-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "methods-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "methods-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "methods-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "methods-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "methods-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 12. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "methods-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "methods-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "methods-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "methods-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "methods-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "methods-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "methods-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "methods-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "methods-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "methods-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "methods-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "methods-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 13. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "methods-mps-1",
      title: "Practice Set 1: Method Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "methods-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "methods-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "methods-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "methods-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "methods-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "methods-mps-2",
      title: "Practice Set 2: Method Applications",
      questions: [
        {
          type: "mcq",
          id: "methods-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "methods-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "methods-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "methods-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "methods-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 14. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "methods-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "methods-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "methods-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "methods-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "methods-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "methods-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "methods-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "methods-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "methods-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "methods-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "methods-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "methods-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "methods-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "methods-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "methods-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "methods-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "methods-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "methods-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "methods-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "methods-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter11;