# ICSE Class IX Computer Applications — Complete Academic Content

**Target examination:** ICSE 2028  
**Board:** CISCE  
**Class:** IX  
**Subject:** Computer Applications

This document is the content source for the Class IX syllabus audit. Every unit contains theory anchors, keywords, common mistakes, worked examples, and programming practice. The application must not show placeholders when these sections are available.

---

## 1. Introduction to Object Oriented Programming Concepts

### Core theory
Object-oriented programming models a problem using **objects** that combine data and behaviour. A **class** is a blueprint from which objects are created. Java was designed around this model and executes compiled bytecode on the Java Virtual Machine (JVM).

The major introductory OOP ideas are **class, object, encapsulation, abstraction, inheritance and polymorphism**. At Class IX level, students should understand the ideas conceptually before using advanced inheritance or polymorphism syntax.

Java source code is written in a `.java` file. The compiler converts it to bytecode in a `.class` file. The JVM executes that bytecode. This is the basis of Java's platform-independent approach.

### Keywords
`class`, `object`, `method`, `attribute`, `encapsulation`, `abstraction`, `inheritance`, `polymorphism`, `JDK`, `JRE`, `JVM`, `bytecode`, `compiler`, `BlueJ`.

### Common mistakes
- Saying JVM compiles Java source code; the compiler produces bytecode.
- Treating a class and an object as identical.
- Saying Java is completely platform-independent without mentioning bytecode/JVM.
- Confusing encapsulation with inheritance.

### Worked programming example
```java
class Student {
    String name;
    int marks;

    void display() {
        System.out.println(name + " " + marks);
    }

    public static void main(String args[]) {
        Student s = new Student();
        s.name = "Aman";
        s.marks = 82;
        s.display();
    }
}
```

### Programming questions
1. Create a class `Book` with title and price and display both.
2. Create a class `Rectangle` with length and breadth and display area.
3. Create a class `Student` with name, roll number and marks and display a formatted record.
4. Explain with a program how an object accesses instance members.
5. Create a class `Employee` and display employee details using an object.

---

## 2. Elementary Concept of Objects and Classes

### Core theory
A class defines the structure and behaviour of objects. Data members represent state; methods represent behaviour. An object is created using `new`. The dot operator accesses members through an object reference.

Basic form:
```java
class ClassName {
    dataType variable;
    void methodName() { }
}
```

Object creation:
```java
ClassName obj = new ClassName();
```

### Keywords
`class`, `new`, object, reference, member variable, method, instance, dot operator, state, behaviour.

### Common mistakes
- Writing `ClassName obj;` and assuming an object has been created.
- Forgetting `new` during object creation.
- Using a method as if it were a variable.
- Confusing a reference variable with the object itself.

### Worked examples
```java
class Circle {
    double radius;
    void area() {
        System.out.println(3.14 * radius * radius);
    }
    public static void main(String args[]) {
        Circle c = new Circle();
        c.radius = 5;
        c.area();
    }
}
```

### Programming questions
1. Define `Box` with length, breadth and height; display volume.
2. Define `BankAccount` with account number and balance; display them.
3. Define `Temperature` with Celsius value and display Fahrenheit.
4. Create two objects of `Student` and display their different values.
5. Create `Product` with code, name and price and display the product bill line.

---

## 3. Identifiers and Literals

### Core theory
Java programs are made from tokens such as keywords, identifiers and literals. An **identifier** is a programmer-defined name. It may contain letters, digits, underscore and dollar sign, but cannot begin with a digit or be a Java keyword. Java is case-sensitive.

A literal is a fixed value written directly in source code. Common literals include integer, floating-point, character, string, boolean and `null` reference literal.

Important primitive types include `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`.

### Keywords
identifier, keyword, literal, variable, constant, primitive type, `int`, `double`, `char`, `boolean`, type casting, token.

### Common mistakes
- Using a keyword as an identifier.
- Forgetting that `A` and `a` are different identifiers.
- Writing a character literal in double quotes.
- Writing a string literal in single quotes.
- Assigning an incompatible value without conversion/casting.

### Worked example
```java
int age = 14;
double height = 5.4;
char grade = 'A';
boolean passed = true;
String name = "Riya";
System.out.println(name + " " + age + " " + grade);
```

### Programming questions
1. Declare suitable variables for a student's name, age, percentage and grade.
2. Input two integers and display their sum and average.
3. Input radius and calculate circumference and area.
4. Demonstrate widening conversion from `int` to `double`.
5. Identify valid and invalid Java identifiers from a supplied list.

---

## 4. Operators in Java

### Core theory
Operators perform operations on operands. Class IX work should cover arithmetic, relational, logical, assignment, increment/decrement and conditional operators, together with precedence and associativity.

Arithmetic: `+ - * / %`  
Relational: `> < >= <= == !=`  
Logical: `&& || !`  
Assignment: `= += -= *= /= %=`  
Unary: `++ --`  
Conditional: `condition ? value1 : value2`

### Keywords
operand, operator, expression, precedence, associativity, modulus, relational, logical, ternary.

### Common mistakes
- Using `=` when `==` is required.
- Expecting integer division to produce decimals.
- Forgetting precedence in mixed expressions.
- Misreading `a++` and `++a`.
- Using `&` and `|` when logical `&&` and `||` are intended.

### Worked example
```java
int a = 17, b = 5;
System.out.println(a / b); // 3
System.out.println(a % b); // 2
System.out.println(a > b && b > 0); // true
```

### Programming questions
1. Input two numbers and display the larger using a relational expression.
2. Check whether a number is divisible by both 3 and 5.
3. Use the ternary operator to find the larger of two numbers.
4. Predict the output of expressions containing `++` and `--`.
5. Write a program to calculate quotient and remainder.

---

## 5. Basic Structure of a Class in Java

### Core theory
A simple Java program contains a class and, for an executable program, a `main()` method. `System.out.println()` prints output. Comments document code and are ignored by the compiler. Java source is compiled to bytecode and executed by the JVM.

Typical structure:
```java
class Demo {
    public static void main(String args[]) {
        // statements
    }
}
```

### Keywords
`class`, `public`, `static`, `void`, `main`, `String`, `System`, `out`, `println`, source code, bytecode, compiler, JVM.

### Common mistakes
- Misspelling `main` or `println`.
- Incorrect braces.
- Missing semicolons.
- Confusing syntax errors with logical errors.
- Changing the required main method signature unnecessarily.

### Worked example
```java
class Welcome {
    public static void main(String args[]) {
        System.out.println("Welcome to Target95+");
        System.out.println(10 + 20);
    }
}
```

### Programming questions
1. Display your name, class and school on separate lines.
2. Display the first five multiples of a number.
3. Write a program showing the difference between a comment and executable statement.
4. Explain the compilation and execution path of a Java program.
5. Correct a supplied Java program containing syntax errors.

---

## 6. Data Processing in Java

### Core theory
Input allows a program to work with values supplied at runtime. The `Scanner` class is commonly used for keyboard input. Students must choose the method matching the data type and store the result in a suitable variable.

```java
import java.util.Scanner;
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
double x = sc.nextDouble();
```

### Keywords
`Scanner`, `nextInt()`, `nextDouble()`, `next()`, `nextLine()`, input, variable, runtime, parsing.

### Common mistakes
- Forgetting the import when using `Scanner`.
- Calling `nextInt()` for decimal input.
- Mixing `nextInt()` and `nextLine()` without understanding the pending newline.
- Using a variable of the wrong type.

### Worked programming example
```java
import java.util.Scanner;
class SimpleInterest {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        double p = sc.nextDouble();
        double r = sc.nextDouble();
        double t = sc.nextDouble();
        double si = p * r * t / 100;
        System.out.println("SI = " + si);
    }
}
```

### Programming questions
1. Input three numbers and find their average.
2. Input principal, rate and time and calculate simple interest.
3. Input length and breadth and calculate area and perimeter.
4. Input marks in five subjects and calculate percentage.
5. Input temperature in Celsius and convert to Fahrenheit.

---

## 7. Mathematical Library Methods

### Core theory
The `Math` class in `java.lang` provides commonly used mathematical methods. Frequently useful methods include `Math.sqrt()`, `Math.pow()`, `Math.abs()`, `Math.ceil()`, `Math.floor()`, `Math.round()` and `Math.random()`.

Examples:
```java
double root = Math.sqrt(81);
double power = Math.pow(2, 5);
int absolute = Math.abs(-17);
```

### Keywords
`Math`, `sqrt`, `pow`, `abs`, `ceil`, `floor`, `round`, `random`, argument, return value.

### Common mistakes
- Confusing `pow(a,b)` with multiplication.
- Assuming `ceil()` and `floor()` both round to the nearest integer.
- Forgetting that methods return values that should be stored/printed.
- Using integer variables when a fractional result is required.

### Programming questions
1. Find square root and cube of a number.
2. Find the larger absolute distance between two integers.
3. Calculate the hypotenuse using `sqrt` and `pow`.
4. Round a decimal number using `round`, `ceil` and `floor` and compare outputs.
5. Generate a random integer in a specified range using `Math.random()`.

---

## 8. Conditional Statements in Java

### Core theory
Conditional statements select a block based on a boolean condition. Use `if` for a single decision, `if-else` for two alternatives, an `else-if` ladder for multiple mutually exclusive ranges, nested `if` for dependent decisions, and `switch` when selecting among discrete cases.

### Keywords
`if`, `else`, `switch`, `case`, `default`, `break`, condition, boolean, nested condition, ladder.

### Common mistakes
- Writing `if(condition);` with an accidental semicolon.
- Using `=` instead of `==`.
- Forgetting `break` in a switch when fall-through is not wanted.
- Using independent `if` statements where an `else-if` ladder is required.
- Creating overlapping range conditions.

### Worked programming example
```java
import java.util.Scanner;
class Grade {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        if (m >= 90) System.out.println("A");
        else if (m >= 75) System.out.println("B");
        else if (m >= 50) System.out.println("C");
        else System.out.println("D");
    }
}
```

### Programming questions
1. Check whether a number is positive, negative or zero.
2. Find the greatest of three numbers.
3. Check whether a year is a leap year.
4. Calculate electricity bill according to slabs.
5. Display grade according to percentage.
6. Create a menu-driven calculator using `switch`.
7. Check whether a character is a vowel or consonant.
8. Check whether a number is divisible by 2, 3, both or neither.

---

## 9. Looping / Iterative Statements in Java

### Core theory
Loops repeat statements. `for` is convenient when initialization, condition and update are known together. `while` checks the condition before each iteration. `do-while` executes its body at least once because its condition is checked after the body.

### Keywords
`for`, `while`, `do`, `break`, `continue`, iteration, counter, accumulator, entry-controlled, exit-controlled.

### Common mistakes
- Forgetting to update the loop variable.
- Using `<=` when `<` is required and producing one extra iteration.
- Starting a counter at the wrong value.
- Dividing by zero in an accumulation/average program.
- Creating an infinite loop.

### Worked programming example
```java
class SumNatural {
    public static void main(String args[]) {
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}
```

### Programming questions
1. Print 1 to 100.
2. Print even numbers from 1 to 100.
3. Find sum of first `n` natural numbers.
4. Find factorial of a number.
5. Reverse a number.
6. Check whether a number is palindrome.
7. Find sum of digits.
8. Count digits of a number.
9. Check whether a number is prime.
10. Print multiplication table of a number.
11. Generate Fibonacci series.
12. Find HCF of two numbers using iteration.

---

## 10. Nested for Loops

### Core theory
A nested loop is a loop inside another loop. For each iteration of the outer loop, the inner loop completes its required iterations. This is useful for patterns, tables and two-dimensional processing.

### Keywords
nested loop, outer loop, inner loop, row, column, pattern, iteration, dry run.

### Common mistakes
- Updating the wrong loop variable.
- Using the outer counter inside the inner loop accidentally.
- Forgetting that the inner loop restarts for every outer iteration.
- Off-by-one errors in row/column counts.

### Worked programming example
```java
class Pattern {
    public static void main(String args[]) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

### Programming questions
1. Print a 5×5 square of stars.
2. Print a right triangle of stars.
3. Print an inverted star triangle.
4. Print numbers `1`, `12`, `123`, etc.
5. Print repeated row numbers: `1`, `22`, `333`, etc.
6. Print multiplication tables from 1 to 10.
7. Print a hollow square pattern.
8. Print a numeric pyramid.
9. Trace the number of times the inner statement executes.
10. Debug a nested loop containing an incorrect counter update.

---

## 11. Ethical Computing

### Core theory
Responsible computing means using technology lawfully, safely and respectfully. Students should understand intellectual property, plagiarism, privacy, cyber safety, digital citizenship, responsible social-media behaviour and the distinction between open-source and proprietary software.

### Keywords
ethics, digital citizenship, privacy, plagiarism, copyright, intellectual property, cyber safety, licence, open source, proprietary software, responsible use.

### Common mistakes
- Assuming anything on the internet is free to copy.
- Treating plagiarism as acceptable if the source is not discovered.
- Sharing another person's personal information without permission.
- Confusing open-source software with software that has no licence.

### Examples
- Cite the source of an image used in a school project.
- Use licensed software instead of unauthorized copies.
- Do not publish a classmate's personal information without consent.
- Use strong passwords and do not share authentication credentials.

### Questions
1. Define plagiarism and give two examples.
2. Differentiate copyright and plagiarism.
3. What is digital citizenship?
4. Why should personal information be protected online?
5. Differentiate open-source and proprietary software.
6. Explain two responsible social-media practices.
7. Explain intellectual property with a computing example.
8. What should a student do before using an image from the internet in a project?

---

# Class IX Programming Question Bank — Minimum Core Set

## Basic programming
1. Input two numbers and display sum, difference, product and quotient.
2. Input a number and calculate its square and cube.
3. Input marks in five subjects and calculate total and percentage.
4. Input a three-digit number and calculate the sum of its digits.
5. Convert a given number of minutes into hours and minutes.

## Conditional programming
6. Find the greatest of three numbers.
7. Check whether a number is odd/even and positive/negative.
8. Check whether a number is a palindrome.
9. Check whether a year is leap year.
10. Calculate a slab-based electricity bill.
11. Create a menu-driven arithmetic calculator.
12. Check whether a character is vowel/consonant/digit.

## Loop programming
13. Print the first `n` natural numbers.
14. Find factorial.
15. Find sum of digits.
16. Reverse a number.
17. Check prime number.
18. Print primes in a range.
19. Print Fibonacci series.
20. Find HCF and LCM.
21. Check Armstrong number where appropriate to the prescribed exercise level.
22. Print multiplication tables.

## Nested-loop programming
23. Print star triangle.
24. Print inverted star triangle.
25. Print number triangle.
26. Print repeated-number pattern.
27. Print square and hollow-square patterns.
28. Print multiplication tables from 1 to 10.

## Output tracing
29. Predict output involving precedence and integer division.
30. Predict output involving pre/post increment.
31. Trace an `if-else` ladder.
32. Trace a `for` loop and calculate final counter value.
33. Trace nested loops and count executions.
34. Identify the output after `break` in a `switch`.

## Debugging
35. Find and correct a missing semicolon.
36. Correct a wrong relational operator.
37. Correct an infinite loop.
38. Correct a faulty `switch` fall-through.
39. Correct a nested-loop counter error.
40. Correct a type mismatch in input/data processing.

# Exam-readiness checklist

A Class IX chapter is considered complete only when the student can:

- explain the theory without memorising placeholder text;
- define every important keyword;
- identify common mistakes;
- read and trace Java code;
- write a complete program from a problem statement;
- predict output;
- debug common errors;
- answer short and objective questions;
- practise enough problems to transfer the concept to a new question.
