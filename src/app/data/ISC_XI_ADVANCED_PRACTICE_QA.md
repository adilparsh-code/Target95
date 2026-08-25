# ISC Class XI Computer Science Advanced Practice Questions & Answers

## Chapter 1: Basic Computer Concepts & Logic Gates
### 1.1 Computer Fundamentals & Number Systems
---

#### Question 1.1.1 (Short Answer)
**Question:** Convert the hexadecimal number `3AF₁₆` to its binary, octal, and decimal equivalents. Show all steps of conversion.
**Correct Answer:** Binary = `1110101111₂`, Octal = `1657₈`, Decimal = `943₁₀`
**Explanation:**
- **Hex to Binary:** Each hex digit maps to 4 binary bits:
  - 3 = 0011, A = 1010, F = 1111 → Combined: `001110101111₂` = `1110101111₂`
- **Binary to Octal:** Group binary digits into sets of 3 from right:
  - 001 110 101 111 → 1 6 5 7 → `1657₈`
- **Binary to Decimal:** 1×512 + 1×256 + 1×128 + 0×64 + 1×32 + 0×16 + 1×8 + 1×4 + 1×2 + 1×1 = 943
**Difficulty Level:** Medium
**Marks:** 4
**Topic/Subtopic:** Number Systems / Base Conversion

---

#### Question 1.1.2 (Application-Based)
**Question:** Using 8-bit 2's complement arithmetic, compute the subtraction `45₁₀ - 72₁₀`. Show all intermediate steps including 1's complement, 2's complement, and final binary result.
**Correct Answer:** Result = `11100101₂` (which is -27₁₀ in decimal)
**Explanation:**
1. Convert numbers to 8-bit binary:
   - 45₁₀ = `00101101₂`
   - 72₁₀ = `01001000₂`
2. Find 2's complement of 72 (to convert subtraction to addition):
   - 1's complement of 01001000 = `10110111`
   - Add 1 to get 2's complement: `10110111 + 1 = 10111000`
3. Add the two binary numbers:
   ```
     00101101  (45)
   + 10111000  (-72 in 2's complement)
   -----------
     11100101  (final result)
   ```
4. Verify: The result is a negative number (MSB=1). Convert back to decimal by taking 2's complement:
   - 2's complement of 11100101 = 00011011 = 27 → result = -27
**Difficulty Level:** Hard
**Marks:** 5
**Topic/Subtopic:** Complements / 2's Complement Arithmetic

---

#### Question 1.1.3 (Debugging)
**Question:** A student wrote `128₈` as a valid octal number representing the decimal value 88. Identify the error in their statement and correct the octal number that would actually represent 88₁₀.
**Correct Answer:** The digit `8` is invalid in octal; correct octal for 88₁₀ is `130₈`
**Explanation:** Octal (base-8) only uses digits 0-7. The digit 8 makes `128₈` syntactically invalid. To convert 88₁₀ to octal:
- 88 ÷ 8 = 11 remainder 0
- 11 ÷ 8 = 1 remainder 3
- 1 ÷ 8 = 0 remainder 1
- Read remainders backwards: 130₈
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** Number Systems / Octal Representation

---

### 1.2 Logic Gates & Boolean Algebra
---

#### Question 1.2.1 (Conceptual)
**Question:** Prove that NAND gates are universal by showing how to implement AND, OR, and NOT gates using only 2-input NAND gates. Include truth tables for each implemented gate.
**Correct Answer:** All three basic gates can be implemented with NAND gates as shown below.
**Explanation:**
1. **NOT Gate:** Tie both inputs of a NAND gate together: `A NAND A = NOT A`
   | A | A | Output |
   |---|---|--------|
   | 0 | 0 | 1      |
   | 1 | 1 | 0      |

2. **AND Gate:** Use a NAND gate followed by a NOT gate (implemented with NAND): `(A NAND B) NAND (A NAND B) = A AND B`
   | A | B | Output |
   |---|---|--------|
   | 0 | 0 | 0      |
   | 0 | 1 | 0      |
   | 1 | 0 | 0      |
   | 1 | 1 | 1      |

3. **OR Gate:** Apply De Morgan's law: `(NOT A) NAND (NOT B) = A OR B`
   | A | B | Output |
   |---|---|--------|
   | 0 | 0 | 0      |
   | 0 | 1 | 1      |
   | 1 | 0 | 1      |
   | 1 | 1 | 1      |
Since all basic gates can be built from NAND, it is universal.
**Difficulty Level:** Hard
**Marks:** 6
**Topic/Subtopic:** Logic Gates / Universal Gates

---

#### Question 1.2.2 (Output Tracing)
**Question:** Trace the output of the following combinational logic circuit for all possible input combinations: A=0/1, B=0/1. The circuit sequence is: `NOT A → XOR with B → AND with original A`.
**Correct Answer:** The output is always 0 for all input combinations.
**Explanation:**
The step-by-step truth table for the circuit is:
| A | B | NOT A | (NOT A) XOR B | Final Output (AND with A) |
|---|---|-------|---------------|---------------------------|
| 0 | 0 | 1     | 1             | 0 AND 1 = 0               |
| 0 | 1 | 1     | 0             | 0 AND 0 = 0               |
| 1 | 0 | 0     | 0             | 1 AND 0 = 0               |
| 1 | 1 | 0     | 1             | 1 AND 1 = 1               |

Boolean simplification confirms the output is `A ∧ B` (A AND B), which means the output is 1 only when both A=1 and B=1. The algebraic derivation:
`A · (A' ⊕ B) = A · ((¬A∧¬B) ∨ (A∧B)) = A∧B`
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Combinational Circuits / Output Tracing

---

#### Question 1.2.3 (Assertion & Reason)
**Question:** Assertion (A): The XNOR gate output is 1 only when both inputs are equal. Reason (R): XNOR is the negation of the XOR gate, which outputs 1 only when inputs are different.
**Options:**
A) Both A and R are true, and R is the correct explanation of A
B) Both A and R are true, but R is not the correct explanation of A
C) A is true, R is false
D) A is false, R is true
**Correct Answer:** A
**Explanation:** XOR gate truth table: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0. XNOR is the inverse: 0⊙0=1, 0⊙1=0, 1⊙0=0, 1⊙1=1. XNOR outputs 1 exactly when inputs are equal, which is the direct negation of XOR's behavior. Reason correctly explains Assertion.
**Difficulty Level:** Easy
**Marks:** 1
**Topic/Subtopic:** Logic Gates / XNOR Gate

---

#### Question 1.2.4 (Viva Question)
**Question:** What is the difference between a minterm and a maxterm in Boolean algebra? When would you use each?
**Correct Answer:** Minterms are product terms that are 1 for exactly one input combination; maxterms are sum terms that are 0 for exactly one input combination.
**Explanation:** 
- **Minterm (Product term):** For n variables, a minterm is a logical AND of all variables where each variable appears once (either normal or complemented). It is 1 for only one row of the truth table. Used to write Sum of Products (SOP) expressions.
- **Maxterm (Sum term):** A logical OR of all variables, each appearing once. It is 0 for only one row of the truth table. Used to write Product of Sums (POS) expressions.
**Difficulty Level:** Medium
**Marks:** 2 (viva)
**Topic/Subtopic:** Boolean Algebra / Minterms & Maxterms

---

## Chapter 2: Introduction to Java Programming
### 2.1 Java Basics & Program Structure
---

#### Question 2.1.1 (Code Reading)
**Question:** What is the output of the following Java code? Explain any unexpected behavior.
```java
public class OutputTest {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        System.out.println(a + b + " is the sum");
        System.out.println("Sum is: " + a + b);
    }
}
```
**Correct Answer:**
```
30 is the sum
Sum is: 1020
```
**Explanation:** Java's `+` operator is left-associative. In the first line, `a + b` is evaluated first as integer addition (10+20=30), then concatenated with the string. In the second line, the string is encountered first, so all subsequent `+` operations are string concatenations: "Sum is: " + 10 becomes "Sum is: 10", then +20 appends "20" to create "Sum is: 1020". To get numeric addition in the second line, wrap `a + b` in parentheses: `(a + b)`.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Operators / String Concatenation

---

#### Question 2.1.2 (Debugging)
**Question:** Identify all syntax errors in the following Java code and correct them:
```java
public class MyFirstProgram {
    void main(String args[]) {
        System.out.println("Hello World")
    }
}
```
**Correct Answer:** There are two critical syntax errors that prevent compilation.
**Explanation:**
1. **Missing `static` modifier on main():** The JVM calls `main()` without creating an object of the class, so it must be declared `static`.
2. **Missing semicolon after print statement:** All Java statements must end with a semicolon.
Corrected code:
```java
public class MyFirstProgram {
    public static void main(String args[]) {
        System.out.println("Hello World");
    }
}
```
Additionally, the `main()` method should be `public` to be accessible to the JVM (while some JVMs may work with package-private, it's not standard).
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Program Structure / main() Method

---

#### Question 2.1.3 (Short Answer)
**Question:** Differentiate between JDK, JRE, and JVM. Explain their roles in Java program execution.
**Correct Answer:** JDK > JRE > JVM in terms of scope.
**Explanation:**
- **JVM (Java Virtual Machine):** The runtime engine that executes Java bytecode. It is platform-specific and responsible for converting bytecode to machine code.
- **JRE (Java Runtime Environment):** Contains the JVM plus standard libraries required to run Java applications. It is used to execute compiled Java programs.
- **JDK (Java Development Kit):** Contains the JRE plus development tools like `javac` (compiler), `javadoc` (documentation generator), and `jdb` (debugger). It is used to write and compile Java source code.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Java Environment / JDK/JRE/JVM

---

#### Question 2.1.4 (Long Answer/Programming)
**Question:** Write a Java program that accepts three integers from the user, swaps the first and third numbers, and prints all three values before and after swapping. Use only arithmetic operations for swapping (no temporary variable).
**Correct Answer:** The following program implements the requirement correctly.
```java
import java.util.Scanner;

public class SwapNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter three integers:");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        
        System.out.println("Before swapping: a = " + a + ", b = " + b + ", c = " + c);
        
        // Swap a and c using arithmetic operations
        a = a + c;
        c = a - c;
        a = a - c;
        
        System.out.println("After swapping: a = " + a + ", b = " + b + ", c = " + c);
        sc.close();
    }
}
```
**Sample Input & Output:**
```
Enter three integers:
10 20 30
Before swapping: a = 10, b = 20, c = 30
After swapping: a = 30, b = 20, c = 10
```
**Explanation:** The arithmetic swap works by:
1. `a = a + c` stores the sum of both values in `a`
2. `c = a - c` subtracts the original c from the sum to get original a, stored in c
3. `a = a - c` subtracts the new c (original a) from the sum to get original c, stored in a
This swaps the values without using a temporary variable.
**Difficulty Level:** Medium
**Marks:** 5
**Topic/Subtopic:** Input/Output / Variable Swapping

---

### 2.2 Variables & Data Types
---

#### Question 2.2.1 (Output Tracing)
**Question:** What is the output of the following code? Explain the type conversion that occurs.
```java
public class TypeTest {
    public static void main(String[] args) {
        byte b = 50;
        char c = 'A';
        short s = 1000;
        double d = 150.5;
        System.out.println((b + c + s + d));
    }
}
```
**Correct Answer:** Output is `815.5`
**Explanation:** Java promotes all smaller numeric types to the largest type in the expression during evaluation. Here, `double` is the largest type, so all operands are promoted to double:
- b = 50 (byte → double: 50.0)
- c = 'A' (ASCII value 65, char → double:65.0)
- s = 1000 (short → double:1000.0)
- d = 150.5 (double:150.5)
Total sum: 50 + 65 + 1000 + 150.5 = 1265.5. The promotion rules ensure that no precision is lost during the addition.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Data Types / Type Promotion

---

#### Question 2.2.2 (Conceptual)
**Question:** Why is String not a primitive data type in Java? List the primitive data types in Java and their sizes.
**Correct Answer:** String is a class (reference type) because it requires object-oriented features that primitive types don't support.
**Explanation:** String is an instance of the `java.lang.String` class, which provides methods like `length()`, `substring()`, and `equals()` that primitive types cannot have. Java's 8 primitive types and their sizes:
| Primitive | Size (bits) |
|-----------|-------------|
| byte      | 8           |
| short     | 16          |
| int       | 32          |
| long      | 64          |
| float     | 32          |
| double    | 64          |
| char      | 16          |
| boolean   | 1 (JVM dependent, typically 1 byte in practice) |
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Data Types / Primitive vs Reference

---

#### Question 2.2.3 (Case-Based Question)
**Question:** A student is writing a program to store a student's exam marks (out of 100), their roll number (up to 10000), and their percentage (to 2 decimal places). Suggest the most memory-efficient primitive data types for each of these values, justifying your choice.
**Correct Answer:** marks: byte, rollNumber: short, percentage: float.
**Explanation:**
1. **Marks (0-100):** byte is sufficient (range -128 to 127), uses only 1 byte, which is more efficient than int.
2. **Roll number (up to 10000):** short can store up to 32767, so it fits perfectly and uses only 2 bytes.
3. **Percentage (2 decimal places):** float has enough precision for 2 decimal places and uses 4 bytes, which is more efficient than double for this use case.
Total memory used: 1+2+4=7 bytes, vs using int for all which would use 12 bytes.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Data Types / Memory Optimization

---

## Chapter 3: Control Flow Statements in Java
### 3.1 Conditional Statements
---

#### Question 3.1.1 (Debugging)
**Question:** The following code is supposed to print "Adult" if age >= 18, "Minor" otherwise. It has a logical error. Identify and fix it:
```java
public class AgeCheck {
    public static void main(String[] args) {
        int age = 20;
        if (age >= 18);
        {
            System.out.println("Adult");
        }
        else {
            System.out.println("Minor");
        }
    }
}
```
**Correct Answer:** The semicolon after the if condition terminates the if statement, causing the else to be a dangling else that causes a compilation error.
**Explanation:** The semicolon after `if (age >=18);` makes the if block empty, so the subsequent code block is always executed, and the else keyword has no preceding if to match, leading to compilation failure. Fix by removing the semicolon:
```java
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}
```
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** if-else / Common Syntax Errors

---

#### Question 3.3.7 (Output Tracing)
**Question:** What is the output of the following code that uses nested if-else statements?
```java
public class NestedIfTest {
    public static void main(String[] args) {
        int a = 10, b = 20, c = 15;
        if (a > b) {
            if (a > c) System.out.println(a);
            else System.out.println(c);
        } else {
            if (b > c) System.out.println(b);
            else System.out.println(c);
        }
    }
}
```
**Correct Answer:** `20`
**Explanation:** The code finds the maximum of three numbers. First, `a > b` (10>20) is false, so we enter the else block. Then `b > c` (20>15) is true, so we print b which is 20. This is the correct maximum value of the three inputs.
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Conditional Statements / Nested if-else

---

#### Question 3.3.8 (Programming)
**Question:** Write a Java program that accepts a number from the user and prints whether it is positive, negative, or zero. Use a single if-else-if ladder to implement the logic.
**Correct Answer:** The following code implements the requirement correctly.
```java
import java.util.Scanner;

public class NumberCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        double num = sc.nextDouble();
        
        if (num > 0) {
            System.out.println("Positive number");
        } else if (num < 0) {
            System.out.println("Negative number");
        } else {
            System.out.println("Zero");
        }
        sc.close();
    }
}
```
**Explanation:** The if-else-if ladder checks the number against each condition in sequence. If the number is greater than 0, it prints "Positive". If it's less than 0, it prints "Negative". If neither condition is met, the number must be zero.
**Difficulty Level:** Easy
**Marks:** 4
**Topic/Subtopic:** Conditional Statements / if-else-if Ladder

---

#### Question 3.3.9 (Debugging)
**Question:** The following code is supposed to print the multiplication table of 5 up to 10, but it only prints the first entry. Identify and fix the error:
```java
public class MultiplicationTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++);
            System.out.println("5 * " + i + " = " + 5*i);
    }
}
```
**Correct Answer:** The semicolon after the for loop condition terminates the loop body, so the print statement only executes once after the loop completes. Since i is out of scope (declared inside the for loop), this code also throws a compilation error.
**Explanation:** The stray semicolon after `for (int i=1; i<=10; i++);` makes the loop body empty. The print statement is not part of the loop, and since i is declared in the loop's initialization, it cannot be accessed outside the loop, leading to a compile failure. Fix by wrapping the print statement in curly braces and removing the semicolon:
```java
for (int i = 1; i <= 10; i++) {
    System.out.println("5 * " + i + " = " + 5*i);
}
```
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Loops / Common Loop Errors

---

## Additional New Questions for Chapter 4 (OOP)
---

### 4.2 Additional Constructor & Inheritance Questions
---

#### Question 4.2.1 (Output Tracing)
**Question:** What is the output of the following code that demonstrates constructor chaining?
```java
class Parent {
    Parent() {
        System.out.println("Parent constructor");
    }
}

class Child extends Parent {
    Child() {
        System.out.println("Child constructor");
    }
}

public class ConstructorTest {
    public static void main(String[] args) {
        Child c = new Child();
    }
}
```
**Correct Answer:**
```
Parent constructor
Child constructor
```
**Explanation:** In Java, when you create an instance of a child class, the parent class constructor is always called first. This is constructor chaining: the JVM automatically inserts a call to `super()` as the first line of the child constructor if you don't explicitly call a parent constructor. This ensures that the parent class's state is initialized before the child class is constructed.
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** Constructors / Constructor Chaining

---

#### Question 4.2.2 (Conceptual)
**Question:** What is the diamond problem in Java? Why does Java not allow multiple inheritance through classes to avoid this problem?
**Correct Answer:** The diamond problem occurs when a class inherits from two classes that both inherit from the same parent class, leading to ambiguity about which parent's version of a method to use.
**Explanation:** The class hierarchy looks like this (diamond shape):
```
   Object
     / \
    A   B
     \ /
     C
```
If both A and B override a method from Object, and C inherits from both, Java cannot determine which version of the method (from A or B) C should use. To avoid this ambiguity, Java prohibits multiple inheritance through classes, only allowing it through interfaces (which have a clear resolution order for default methods).
**Difficulty Level:** Hard
**Marks:** 4
**Topic/Subtopic:** Inheritance / Diamond Problem

---

#### Question 4.2.3 (Output Tracing)
**Question:** What is the output of the following code that uses the `this()` constructor call?
```java
class Sample {
    int x;
    Sample() {
        this(10);
        System.out.println("Default constructor: x = " + x);
    }
    Sample(int x) {
        this.x = x;
        System.out.println("Parameterized constructor: x = " + x);
    }
}

public class ThisConstructorTest {
    public static void main(String[] args) {
        Sample s = new Sample();
    }
}
```
**Correct Answer:**
```
Parameterized constructor: x = 10
Default constructor: x = 10
```
**Explanation:** When `this(10)` is called from the no-argument constructor, it invokes the parameterized constructor of the same class, which sets x to 10 and prints its message. Then the control returns to the no-argument constructor, which prints its own message. Note that `this()` must always be the first statement in a constructor, which is why it works here.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Constructors / this() Constructor Call

---

#### Question 4.2.4 (Programming)
**Question:** Create a class `Employee` with private fields name, id, and salary. Add a default constructor that sets default values, and a parameterized constructor that initializes all fields. Add a method to print employee details. Write a main method to test both constructors.
**Correct Answer:** The following code implements the requirement with proper encapsulation.
```java
public class Employee {
    private String name;
    private int id;
    private double salary;
    
    // Default constructor
    public Employee() {
        this.name = "Unknown";
        this.id = 0;
        this.salary = 0.0;
    }
    
    // Parameterized constructor
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    public void printDetails() {
        System.out.println("Name: " + name + ", ID: " + id + ", Salary: " + salary);
    }
    
    public static void main(String[] args) {
        Employee e1 = new Employee();
        Employee e2 = new Employee("John Doe", 101, 50000.0);
        e1.printDetails(); // Name: Unknown, ID: 0, Salary: 0.0
        e2.printDetails(); // Name: John Doe, ID: 101, Salary: 50000.0
    }
}
```
**Explanation:** The class uses constructor overloading to provide two ways to create Employee objects: one with default values and one with custom values. The `printDetails()` method displays the state of the object, and both constructors are tested in the main method.
**Difficulty Level:** Medium
**Marks:** 6
**Topic/Subtopic: Classes & Objects / Constructor Overloading

---

#### Question 4.2.5 (Assertion & Reason)
**Question:** Assertion (A): In Java, a static method cannot access non-static instance variables of the class. Reason (R): Static methods belong to the class rather than any specific object, so they don't have a reference to an instance's state.
**Options:**
A) Both A and R are true, R is the correct explanation of A
B) Both A and R are true, R is not the correct explanation of A
C) A is true, R is false
D) A is false, R is true
**Correct Answer:** A
**Explanation:** Static methods are associated with the class itself, not with any particular object. They cannot access non-static (instance) variables because those variables belong to specific objects, and there's no way to know which instance's variables to use. The reason correctly explains why static methods cannot access non-static variables.
**Difficulty Level:** Medium
**Marks:** 1
**Topic/Subtopic:** Static Members / Static vs Instance

---

#### Question 4.2.6 (Output Tracing)
**Question:** What is the output of the following code that uses a static variable?
```java
class Counter {
    static int count = 0;
    Counter() {
        count++;
        System.out.print(count + " ");
    }
}

public class StaticTest {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        new Counter();
    }
}
```
**Correct Answer:** `1 2 3 `
**Explanation:** The static variable `count` is shared across all instances of the Counter class. Every time a Counter object is created, the constructor increments the same shared count variable. The first object sets count to 1, the second to 2, the third to 3, resulting in the output "1 2 3 ".
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** Static Members / Static Variables

---

### Final Chapter 1 Additions
---

#### Question 1.4.3 (Conceptual)
**Question:** What is the difference between a combinational and a sequential logic circuit? Provide one example of each that is relevant to computer architecture.
**Correct Answer:** Combinational circuits use only current inputs to produce outputs, while sequential circuits use current inputs plus past state (memory) to produce outputs.
**Explanation:**
- **Combinational circuit:** Output depends only on present inputs, no memory. Example: A half adder or full adder used in ALUs for arithmetic operations.
- **Sequential circuit:** Output depends on present inputs and previous state (has memory). Example: A flip-flop used in registers to store binary data.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Combinational vs Sequential Circuits / Basic Differences

---

#### Question 1.4.4 (Application-Based)
**Question:** Convert the binary number `11010.101₂` to its decimal, octal, and hexadecimal equivalents. Show all steps.
**Correct Answer:** Decimal = 26.625₁₀, Octal = 32.5₈, Hexadecimal = 1A.A₁₆
**Explanation:**
- **Decimal conversion:** Integer part: 16+8+2=26, Fractional part: 0.5 + 0.125 = 0.625 → Total 26.625
- **Octal conversion:** Group binary into 3 bits: 011 010 . 101 → 3 2 .5 → 32.5₈
- **Hex conversion:** Group into 4 bits: 0001 1010 . 1010 → 1 A .A → 1A.A₁₆
**Difficulty Level:** Medium
**Marks:** 4
**Topic/Subtopic:** Number Systems / Fractional Base Conversion

---

### Final Chapter 2 Additions
---

#### Question 2.3.7 (Output Tracing)
**Question:** What is the output of the following code that uses relational and logical operators?
```java
public class LogicalTest {
    public static void main(String[] args) {
        int a = 5, b = 10;
        boolean res = (a < b) && (b > 5) || (a == 5);
        System.out.println(res);
    }
}
```
**Correct Answer:** `true`
**Explanation:** Operator precedence in Java evaluates logical AND (&&) before logical OR (||). First `(a<b)&&(b>5)` evaluates to true (5<10 and 10>5), then `true || true` evaluates to true, so res is true. Even if the OR condition was false, the AND condition was already true.
**Difficulty Level:** Easy
**Marks:** 1
**Topic/Subtopic:** Operators / Logical Operators

---

#### Question 2.3.8 (Conceptual)
**Question:** Why is Java called a platform-independent language? Explain the role of bytecode in achieving platform independence.
**Correct Answer:** Java is platform-independent because compiled Java code (bytecode) can run on any operating system that has a JVM.
**Explanation:** When you compile a Java program, the `javac` compiler converts source code into platform-neutral bytecode, not machine-specific code. Any JVM (regardless of the OS it's running on) can interpret this bytecode and execute the program. This is the origin of the "write once, run anywhere" (WORA) principle of Java.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Java Basics / Platform Independence

---

#### Question 3.1.2 (Programming)
**Question:** Write a Java program that accepts a year from the user and checks if it is a leap year. A leap year is divisible by 4, but not by 100 unless it is also divisible by 400.
**Correct Answer:** The following code implements the leap year check correctly.
```java
import java.util.Scanner;

public class LeapYear {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a year: ");
        int year = sc.nextInt();
        
        boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
        
        if (isLeap) {
            System.out.println(year + " is a leap year.");
        } else {
            System.out.println(year + " is not a leap year.");
        }
        sc.close();
    }
}
```
**Test Cases:**
- 2020 → Leap year (divisible by 4, not by 100)
- 1900 → Not leap (divisible by 100 but not 400)
- 2000 → Leap (divisible by 400)
**Difficulty Level:** Medium
**Marks:** 5
**Topic/Subtopic:** Conditional Statements / Real-World Applications

---

### 3.2 Iterative Statements (Loops)
---

#### Question 3.2.1 (Output Tracing)
**Question:** What is the output of the following loop?
```java
for (int i = 1; i <= 5; i++) {
    for (int j = i; j > 0; j--) {
        System.out.print("*");
    }
    System.out.println();
}
```
**Correct Answer:**
```
*
**
***
****
*****
```
**Explanation:** The outer loop runs from 1 to 5. For each iteration of the outer loop (i), the inner loop runs i times, printing a star each time, then a newline is printed. This creates a right-angled triangle pattern of stars.
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Loops / Pattern Printing

---

#### Question 3.2.2 (Viva Question)
**Question:** What is the difference between a while loop and a do-while loop in Java? Provide an example scenario where you would use a do-while loop.
**Correct Answer:** A while loop checks the condition before executing the body; a do-while loop executes the body first then checks the condition.
**Explanation:** 
- **while loop:** Entry-controlled loop, body may never execute if condition is initially false.
- **do-while loop:** Exit-controlled loop, body always executes at least once.
A common use case for do-while is menu-driven programs: you want to display the menu at least once, then keep displaying it until the user selects the exit option.
**Difficulty Level:** Easy
**Marks:** 2 (viva)
**Topic/Subtopic:** Loops / Loop Types

---

## Chapter 4: Object-Oriented Programming in Java
### 4.1 Classes & Objects
---

#### Question 4.1.1 (Programming)
**Question:** Create a class `Student` with private fields for name, rollNumber, and marks. Write a method to calculate grade based on marks: >=90 → 'A', >=80 → 'B', >=70 → 'C', >=60 → 'D', else 'F'. Write a main method to create a Student object and test the grade calculation.
**Correct Answer:** The following code implements the requirement with proper encapsulation.
```java
public class Student {
    private String name;
    private int rollNumber;
    private double marks;
    
    public Student(String name, int rollNumber, double marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }
    
    public char calculateGrade() {
        if (marks >= 90) return 'A';
        else if (marks >= 80) return 'B';
        else if (marks >= 70) return 'C';
        else if (marks >= 60) return 'D';
        else return 'F';
    }
    
    public static void main(String[] args) {
        Student s = new Student("John Doe", 101, 85.5);
        System.out.println("Grade: " + s.calculateGrade()); // Output: B
    }
}
```
**Explanation:** The class uses encapsulation by marking fields as private, providing a constructor to initialize values, and a method to compute grade. The main method tests the implementation with a sample student who scores 85.5, which correctly returns grade 'B'.
**Difficulty Level:** Medium
**Marks:** 6
**Topic/Subtopic:** Classes & Objects / Encapsulation

---

#### Question 4.1.2 (Assertion & Reason)
**Question:** Assertion (A): In Java, objects are stored on the heap, while primitive variables are typically stored on the stack. Reason (R): The stack stores temporary values with limited lifetime, while the heap stores long-lived data that can be accessed globally.
**Options:**
A) Both A and R are true, R is correct explanation of A
B) Both A and R are true, R is not correct explanation of A
C) A is true, R is false
D) A is false, R is true
**Correct Answer:** A
**Explanation:** Primitive variables declared in methods are stored on the call stack, which is a LIFO structure that frees memory when the method completes. Objects are stored on the heap, which is a dynamic memory region that persists until garbage collected. The reason correctly explains why primitives and objects are stored in different memory regions.
**Difficulty Level:** Medium
**Marks:** 1
**Topic/Subtopic:** Memory Management / Stack vs Heap

---

#### Question 4.1.3 (Output Tracing)
**Question:** What is the output of the following code that demonstrates object reference behavior?
```java
class Test {
    int x = 10;
}

public class ReferenceTest {
    public static void main(String[] args) {
        Test obj1 = new Test();
        Test obj2 = obj1;
        obj2.x = 20;
        System.out.println(obj1.x + " " + obj2.x);
    }
}
```
**Correct Answer:** `20 20`
**Explanation:** When `obj2 = obj1` is executed, both variables reference the same object on the heap. There is no copy of the object created — both references point to the same memory location. When `obj2.x` is updated to 20, `obj1.x` (which accesses the same object's field) also reflects this change. This is a common point of confusion for new Java programmers who expect primitive variable behavior.
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** OOP / Object References

---

#### Question 4.1.4 (Debugging)
**Question:** The following code is supposed to create a student object with name "Alice", but it throws a compilation error. Identify and fix the error:
```java
public class Student {
    private String name;
    
    public Student(String studentName) {
        name = studentName;
    }
    
    public static void main(String[] args) {
        Student s = new Student();
        System.out.println(s.name);
    }
}
```
**Correct Answer:** The code tries to call a default no-argument constructor that is no longer available because a parameterized constructor was defined.
**Explanation:** In Java, if you define any constructor explicitly, the compiler does not generate a default no-argument constructor. The fix is to either call the existing parameterized constructor: `Student s = new Student("Alice");` or add a no-argument constructor to the class. Additionally, the `name` field is private, so it cannot be accessed directly from main() — add a getter method to access it.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Constructors / Default Constructor

---

#### Question 4.1.5 (Conceptual)
**Question:** Explain the use of the `this` keyword in Java with three different use cases that are relevant to Class XI syllabus.
**Correct Answer:** The `this` keyword refers to the current object of the class, with three key use cases.
**Explanation:**
1. **To resolve name hiding:** When instance variables have the same name as parameters, `this.variable` refers to the instance variable while `variable` refers to the parameter.
   ```java
   public Student(String name) { this.name = name; }
   ```
2. **To invoke the current class's constructor:** Used in constructor chaining to call another constructor of the same class (`this(arguments)`).
3. **To pass the current object as a parameter to another method:** Used when you need to pass the current object's reference to another method.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** OOP / this Keyword

---

#### Question 4.1.6 (Programming)
**Question:** Create a class `Rectangle` with private length and breadth fields. Add a constructor to initialize both, and methods to calculate area and perimeter. Write a main method to create two rectangle objects and print their areas.
**Correct Answer:** The following code implements the requirement correctly.
```java
public class Rectangle {
    private double length;
    private double breadth;
    
    public Rectangle(double l, double b) {
        length = l;
        breadth = b;
    }
    
    public double calculateArea() {
        return length * breadth;
    }
    
    public double calculatePerimeter() {
        return 2 * (length + breadth);
    }
    
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle(5, 3);
        Rectangle r2 = new Rectangle(4.5, 2.5);
        System.out.println("Area of r1: " + r1.calculateArea()); // 15.0
        System.out.println("Area of r2: " + r2.calculateArea()); // 11.25
    }
}
```
**Explanation:** The class uses encapsulation to hide the internal state of the rectangle, only exposing methods to calculate values. The constructor initializes all fields when an object is created, ensuring no uninitialized objects exist.
**Difficulty Level:** Easy
**Marks:** 5
**Topic/Subtopic:** Classes & Objects / Class Design

---

#### Question 4.1.7 (Assertion & Reason)
**Question:** Assertion (A): Java supports multiple inheritance through classes. Reason (R): Java allows classes to implement multiple interfaces.
**Options:**
A) Both A and R are true, R is correct explanation of A
B) Both A and R are true, R is not correct explanation of A
C) A is true, R is false
D) A is false, R is true
**Correct Answer:** D
**Explanation:** Java does NOT support multiple inheritance through classes (you cannot extend more than one class) to avoid the diamond problem. However, Java does allow implementing multiple interfaces, which is a form of interface-level multiple inheritance. So Assertion is false, Reason is true.
**Difficulty Level:** Medium
**Marks:** 1
**Topic/Subtopic:** Inheritance / Multiple Inheritance

---

## Additional New Questions for Chapter 1 (Basic Computer Concepts)
---

### 1.3 Additional Number System Questions
---

#### Question 1.3.1 (Application-Based)
**Question:** Convert the decimal number `255.625₁₀` to binary, octal, and hexadecimal. Show steps for both integer and fractional parts.
**Correct Answer:** Binary = `11111111.101₂`, Octal = `377.5₈`, Hexadecimal = `FF.A₁₆`
**Explanation:**
- **Integer part (255):** Repeated division by 2 gives `11111111₂`
- **Fractional part (0.625):** Multiply by 2 repeatedly: 0.625*2=1.25 → 1, 0.25*2=0.5 →0, 0.5*2=1.0→1 → fractional binary `.101₂`
- **Octal conversion:** Group binary into 3 bits: 011 111 111 . 101 → 377.5₈
- **Hex conversion:** Group into 4 bits: 1111 1111 . 1010 → FF.A₁₆
**Difficulty Level:** Hard
**Marks:** 5
**Topic/Subtopic:** Number Systems / Fractional Base Conversion

---

#### Question 1.3.2 (Output Tracing)
**Question:** Evaluate the binary arithmetic expression: `1101.101₂ + 1011.011₂`. What is the result in binary?
**Correct Answer:** `11001.000₂`
**Explanation:** Align decimal points and add:
```
  1101.101
+ 1011.011
----------
 11001.000
```
Decimal verification: 13.625 + 11.375 = 25.0, which is `11001₂` in binary, matching the result.
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Binary Arithmetic / Fractional Addition

---

#### Question 1.3.3 (Debugging)
**Question:** A student wrote `11110000` as the 8-bit 2's complement of -15. Identify the error in their calculation and provide the correct 2's complement value.
**Correct Answer:** The correct 8-bit 2's complement of -15 is `11110001`.
**Explanation:** The student only calculated the 1's complement of 15, but 2's complement requires adding 1 to the 1's complement. Step-by-step calculation:
1. 15 in 8-bit binary: `00001111`
2. 1's complement (flip all bits): `11110000`
3. 2's complement (add 1 to 1's complement): `11110000 + 1 = 11110001`
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Complements / 2's Complement Errors

---

#### Question 1.3.4 (Boolean Algebra)
**Question:** Simplify the Boolean expression `F(A,B,C) = AB + A'C + BC` using Boolean algebra laws. What is the simplified expression?
**Correct Answer:** `AB + A'C`
**Explanation:** Use the consensus theorem (a key Boolean algebra law): XY + X'Z + YZ = XY + X'Z. The BC term is a consensus term that is redundant and can be removed. Proof:
- BC = ABC + A'BC
- Add to original expression: AB + A'C + ABC + A'BC = AB(1+C) + A'C(1+B) = AB + A'C
**Difficulty Level:** Hard
**Marks:** 4
**Topic/Subtopic:** Boolean Algebra / Simplification

---

#### Question 1.3.5 (Truth Table Construction)
**Question:** Create the truth table for the Boolean expression `F = A ⊙ B + A · B'` where ⊙ is XNOR. What is the simplified form of this expression?
**Correct Answer:** The simplified expression is `A + B'`.
**Explanation:** First, construct the truth table using XNOR definition (XNOR outputs 1 when inputs are equal):
| A | B | A⊙B (XNOR) | A·B' (A AND NOT B) | F = (A⊙B)+(A·B') |
|---|---|------------|--------------------|------------------|
| 0 | 0 | 1          | 0                  | 1                |
| 0 | 1 | 0          | 0                  | 0                |
| 1 | 0 | 0          | 1                  | 1                |
| 1 | 1 | 1          | 0                  | 1                |

Simplified Boolean algebra derivation:
F = (AB + A'B') + AB'  // expand XNOR
= AB + A'B' + AB'
= A(B + B') + A'B'
= A(1) + A'B'
= A + A'B'
= A + B' (using absorption rule: A + A'B = A + B)
**Difficulty Level:** Hard
**Marks:** 4
**Topic/Subtopic:** Boolean Algebra / Truth Tables

---

#### Question 1.3.6 (Logic Gate Implementation)
**Question:** Implement the Boolean expression `F = AB + A'C` using only NAND gates. How many 2-input NAND gates are required?
**Correct Answer:** 4 NAND gates are sufficient.
**Explanation:** The expression can be rewritten using NAND operations:
- AB = (A NAND B) NAND (A NAND B)
- A'C = (A NAND A) NAND (C NAND C) → first create NOT A by tying A to both inputs of a NAND gate
- Sum of two NAND outputs: Combine the two results with another NAND gate to get the final OR operation. Total gates: 4.
**Difficulty Level:** Hard
**Marks:** 5
**Topic/Subtopic:** Combinational Circuits / NAND Implementation

---

### 1.4 Additional Logic Gate Questions
---

#### Question 1.4.1 (Output Tracing)
**Question:** What is the output of a 3-input XOR gate for inputs A=1, B=1, C=1?
**Correct Answer:** Output is 1.
**Explanation:** XOR is true when there is an odd number of 1s in inputs. For three 1s, that's odd, so output is 1. A 3-input XOR is equivalent to `(A⊕B)⊕C = (0)⊕1 = 1`.
**Difficulty Level:** Easy
**Marks:** 1
**Topic/Subtopic:** Logic Gates / Multi-input Gates

---

#### Question 1.4.2 (Assertion & Reason)
**Question:** Assertion (A): A half adder can only add two single bits and cannot account for a carry-in. Reason (R): A full adder requires two half adders and an OR gate to implement 3-bit addition with carry-in.
**Options:**
A) Both A and R are true, R is correct explanation of A
B) Both A and R are true, R is not correct explanation of A
C) A is true, R is false
D) A is false, R is true
**Correct Answer:** B
**Explanation:** Both statements are factually correct, but the reason does not explain why a half adder cannot handle carry-in. The assertion describes a limitation of half adders, while the reason describes the structure of a full adder — they are related but the reason does not directly explain the assertion.
**Difficulty Level:** Medium
**Marks:** 1
**Topic/Subtopic:** Combinational Circuits / Adders

---

## Additional New Questions for Chapter 2 (Java Basics)
---

### 2.3 Additional Operators & Type Conversion Questions
---

#### Question 2.3.1 (Output Tracing)
**Question:** What is the output of the following code that uses arithmetic operators?
```java
public class OpTest {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        System.out.println(a / b + " " + a % b);
    }
}
```
**Correct Answer:** `3 1`
**Explanation:** Integer division in Java truncates the decimal part, so 10/3=3. The modulus operator returns the remainder of division, so 10%3=1. The output is "3 1".
**Difficulty Level:** Easy
**Marks:** 1
**Topic/Subtopic:** Operators / Arithmetic Operators

---

#### Question 2.3.2 (Debugging)
**Question:** Identify the error in the following code that uses type casting:
```java
public class CastTest {
    public static void main(String[] args) {
        double d = 100.5;
        int i = d;
        System.out.println(i);
    }
}
```
**Correct Answer:** The code fails to compile because it tries to perform a narrowing primitive conversion without explicit casting.
**Explanation:** Converting a double to an int is a narrowing conversion that can lose precision, so Java requires an explicit cast: `int i = (int) d;`. Without this, the compiler throws an error about possible loss of precision.
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Type Conversion / Narrowing Casts

---

#### Question 2.3.3 (Conceptual)
**Question:** What is the difference between `=` and `==` in Java? Provide an example of each.
**Correct Answer:** `=` is the assignment operator, `==` is the equality comparison operator.
**Explanation:**
- `=` assigns the value on the right to the variable on the left: `int x = 10;`
- `==` compares two values and returns true if they are equal: `if (x == 10) { ... }`
This is a common beginner mistake that causes unexpected logical errors in code.
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Operators / Assignment vs Equality

---

#### Question 2.3.4 (Output Tracing)
**Question:** What is the output of the following code that uses increment operators?
```java
public class IncTest {
    public static void main(String[] args) {
        int a = 5;
        int b = a++ + ++a;
        System.out.println(a + " " + b);
    }
}
```
**Correct Answer:** `7 12`
**Explanation:** Step-by-step evaluation:
1. `a++` is post-increment: returns current value 5, then a becomes 6
2. `++a` is pre-increment: increments a to 7 first, then returns 7
3. Sum:5+7=12 → b=12
4. Final a=7, b=12 → output "7 12"
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** Operators / Increment Operators

---

#### Question 2.3.5 (Java Tokens)
**Question:** List all the Java tokens in the following line of code: `int sum = a + b;` Classify each token type.
**Correct Answer:**
| Token   | Type          |
|---------|---------------|
| int     | Keyword       |
| sum     | Identifier    |
| =       | Operator      |
| a       | Identifier    |
| +       | Operator      |
| b       | Identifier    |
| ;       | Separator     |
**Explanation:** Java tokens are the smallest indivisible units of code. Keywords are reserved words, identifiers are names created by the programmer, operators perform operations, separators mark boundaries.
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Java Basics / Tokens

---

#### Question 2.3.6 (Debugging)
**Question:** Which of the following variable names are invalid in Java? State why: `123abc`, `_count`, `$price`, `my-variable`, `class`
**Correct Answer:** Invalid names: `123abc`, `my-variable`, `class`
**Explanation:**
- `123abc`: Cannot start with a digit
- `my-variable`: Cannot contain hyphens (only letters, digits, _, $ are allowed)
- `class`: Reserved keyword that cannot be used as an identifier
Valid names: `_count`, `$price` (both follow Java identifier rules).
**Difficulty Level:** Medium
**Marks:** 3
**Topic/Subtopic:** Java Basics / Identifiers

---

## Additional New Questions for Chapter 3 (Control Flow)
---

### 3.3 Additional Switch & Loop Questions
---

#### Question 3.3.1 (Output Tracing)
**Question:** What is the output of the following switch case code?
```java
public class SwitchTest {
    public static void main(String[] args) {
        int x = 2;
        switch(x) {
            case 1: System.out.println("One");
            case 2: System.out.println("Two");
            case 3: System.out.println("Three");
            break;
            default: System.out.println("Default");
        }
    }
}
```
**Correct Answer:**
```
Two
Three
```
**Explanation:** There is no break statement after case 2, so fall-through occurs. After printing "Two", execution continues to case 3 and prints "Three" before hitting the break statement.
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** switch / Fall-Through Behavior

---

#### Question 3.3.2 (Debugging)
**Question:** The following code is supposed to print numbers from 1 to 5 and then exit the loop, but it skips the number 5. Identify the error in the code and fix it:
```java
public class LoopTest {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 5)
                continue;
            System.out.println(i);
        }
    }
}
```
**Correct Answer:** The student used `continue` instead of `break` to stop the loop at i=5. The fix is to replace `continue` with `break` to exit the entire loop when i reaches 5.
**Explanation:** `continue` only skips the current iteration of the loop, so when i=5, the code skips printing 5 and continues to the next iteration. `break` exits the entire loop, which matches the intended behavior of stopping after printing numbers 1-4 (or including 5 if the print statement is placed before the condition). Correct code:
```java
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
    if (i == 5)
        break;
}
```
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** Loops / continue vs break

---

#### Question 3.3.3 (Programming)
**Question:** Write a Java program to print the first 10 terms of the Fibonacci series (0, 1, 1, 2, 3, 5, ...).
**Correct Answer:** The following code implements this correctly.
```java
public class Fibonacci {
    public static void main(String[] args) {
        int a = 0, b = 1;
        System.out.print(a + ", " + b);
        for (int i = 2; i < 10; i++) {
            int c = a + b;
            System.out.print(", " + c);
            a = b;
            b = c;
        }
    }
}
```
**Output:** `0, 1, 1, 2, 3, 5, 8, 13, 21, 34`
**Explanation:** The loop starts from the third term, calculating each subsequent term as the sum of the previous two. The variables a and b are updated to shift the window forward each iteration.
**Difficulty Level:** Medium
**Marks:** 5
**Topic/Subtopic:** Loops / Series Generation

---

#### Question 3.3.4 (Output Tracing)
**Question:** What is the output of the following nested loop code?
```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + " ");
    }
    System.out.println();
}
```
**Correct Answer:**
```
1 
1 2 
1 2 3 
```
**Explanation:** The outer loop runs 3 times. For each i, the inner loop runs i times, printing values from 1 to i. This creates a triangular pattern of numbers.
**Difficulty Level:** Easy
**Marks:** 2
**Topic/Subtopic:** Nested Loops / Pattern Printing

---

#### Question 3.3.5 (Switch Case)
**Question:** Can you use a String variable as the selector in a Java switch case? If yes, what Java version introduced this feature?
**Correct Answer:** Yes, Java 7 introduced support for String values in switch case expressions.
**Explanation:** Before Java 7, only byte, short, char, int, and enum types could be used in switch. Java 7 added String support, allowing code like:
```java
String day = "Monday";
switch(day) {
    case "Monday": System.out.println("Start of week"); break;
}
```
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** switch / String Support

---

#### Question 3.3.6 (Debugging)
**Question:** The following code is supposed to print "Odd" for odd numbers and "Even" for even numbers, but it always prints "Odd". Find the error:
```java
public class EvenOdd {
    public static void main(String[] args) {
        int num = 4;
        if (num % 2 == 0);
        {
            System.out.println("Odd");
        }
        else {
            System.out.println("Even");
        }
    }
}
```
**Correct Answer:** The stray semicolon after the `if (num % 2 == 0);` condition causes both compilation failure and incorrect logic. The fix is to remove the semicolon to restore the valid if-else structure.
**Explanation:** The semicolon terminates the if statement immediately, making the if block empty. The code block that prints "Odd" becomes a standalone block, and the `else` keyword is orphaned ("dangling else"), leading to compilation failure. Even if the else was removed, the code would always print "Odd" regardless of the input. Correct code:
```java
if (num % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}
```
**Difficulty Level:** Medium
**Marks:** 2
**Topic/Subtopic:** if-else / Common Syntax Errors