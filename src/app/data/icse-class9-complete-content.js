// Canonical Class IX academic content dataset for ICSE 2028.
// Every chapter carries the same minimum student-facing contract.
const chapters = [
  {
    slug: 'ix-oop-concepts', title: 'Introduction to Object Oriented Programming Concepts', keywords: ['OOP','object','class','abstraction','encapsulation','inheritance','polymorphism','JDK','JRE','JVM','bytecode','BlueJ'],
    theory: 'Object-oriented programming models software using objects that combine state and behaviour. A class is a blueprint and an object is an instance. Java source is compiled to bytecode and executed by the JVM. Class IX students should understand abstraction, encapsulation, inheritance and polymorphism conceptually.',
    commonMistakes: ['Calling JVM the compiler','Treating class and object as the same thing','Confusing abstraction with encapsulation','Forgetting that Java supports primitive types'],
    examples: ['class Student { String name; int marks; void display(){ System.out.println(name + " " + marks); } public static void main(String[] a){ Student s=new Student(); s.name="Aman"; s.marks=82; s.display(); } }'],
    programmingQuestions: ['Create Student with name, roll number and marks.','Create Rectangle and display area and perimeter.','Create Book with title and price and display its details.','Create Employee and display employee details using an object.','Explain Java source → compiler → bytecode → JVM with a simple program.']
  },
  {
    slug: 'ix-objects-classes', title: 'Elementary Concept of Objects and Classes', keywords: ['class','object','new','reference','instance','field','method','member','state','behaviour'],
    theory: 'A class defines fields and methods. An object is created from the class using new. Each object has its own instance state and accesses members with the dot operator.',
    commonMistakes: ['Declaring a reference and assuming an object exists','Forgetting new','Calling a method like a variable','Mixing instance data between objects'],
    examples: ['class Circle { double r; void area(){ System.out.println(Math.PI*r*r); } public static void main(String[] a){ Circle c=new Circle(); c.r=5; c.area(); } }'],
    programmingQuestions: ['Create Box and calculate volume.','Create BankAccount with account number and balance.','Create Temperature and convert Celsius to Fahrenheit.','Create two Student objects with different data.','Create Product with code, name and price.']
  },
  {
    slug: 'ix-identifiers-literals', title: 'Identifiers and Literals', keywords: ['token','identifier','keyword','literal','variable','constant','int','double','char','boolean','String','type casting'],
    theory: 'Identifiers are programmer-defined names and Java is case-sensitive. Literals are fixed values written in source code. Primitive data types include byte, short, int, long, float, double, char and boolean. Type compatibility must be respected.',
    commonMistakes: ['Using a keyword as a name','Starting an identifier with a digit','Using double quotes for char','Using single quotes for String','Ignoring case sensitivity'],
    examples: ['int age=14; double percentage=87.5; char grade=\'A\'; boolean passed=true; String name="Riya";'],
    programmingQuestions: ['Declare suitable variables for a student record.','Input two integers and display sum and average.','Input radius and calculate area and circumference.','Demonstrate int-to-double widening conversion.','Classify a supplied list of identifiers as valid or invalid.']
  },
  {
    slug: 'ix-operators', title: 'Operators in Java', keywords: ['arithmetic','relational','logical','assignment','increment','decrement','ternary','precedence','associativity','modulus'],
    theory: 'Operators perform operations on operands. Arithmetic, relational, logical, assignment, increment/decrement and conditional operators must be understood together with precedence and associativity.',
    commonMistakes: ['Using = instead of ==','Expecting integer division to produce a decimal','Ignoring precedence','Confusing pre-increment and post-increment','Using the wrong logical operator'],
    examples: ['int a=17,b=5; System.out.println(a/b); //3\nSystem.out.println(a%b); //2\nSystem.out.println(a>b && b>0); //true'],
    programmingQuestions: ['Find the larger of two numbers.','Check divisibility by both 3 and 5.','Find larger value using ternary operator.','Predict output of pre/post increment expressions.','Display quotient and remainder of two integers.']
  },
  {
    slug: 'ix-basic-structure', title: 'Basic Structure of a Class in Java', keywords: ['class','main','public','static','void','String','System','out','println','comment','compiler','bytecode'],
    theory: 'A Java program is organised into classes. An executable program uses main as its entry point. Statements normally end with semicolons, blocks use braces, and comments document source code. Compilation creates bytecode for JVM execution.',
    commonMistakes: ['Misspelling main or println','Missing braces or semicolons','Confusing syntax and logical errors','Changing the required entry-point signature incorrectly'],
    examples: ['class Welcome { public static void main(String args[]){ System.out.println("Welcome"); System.out.println(10+20); } }'],
    programmingQuestions: ['Display name, class and school on separate lines.','Display first five multiples of a number.','Write a program with comments explaining each section.','Explain source → compiler → bytecode → JVM.','Debug a program containing syntax errors.']
  },
  {
    slug: 'ix-data-processing', title: 'Data Processing in Java', keywords: ['Scanner','input','nextInt','nextDouble','next','nextLine','runtime','variable','processing'],
    theory: 'Runtime input makes programs interactive. Scanner reads values from the keyboard; the input method should match the expected data type. Values are stored in variables and then processed using expressions and control structures.',
    commonMistakes: ['Forgetting Scanner import','Using nextInt for decimal data','Not understanding nextLine after numeric input','Using an incompatible variable type'],
    examples: ['Scanner sc=new Scanner(System.in); double p=sc.nextDouble(); double r=sc.nextDouble(); double t=sc.nextDouble(); double si=p*r*t/100; System.out.println(si);'],
    programmingQuestions: ['Calculate average of three numbers.','Calculate simple interest.','Calculate area and perimeter of rectangle.','Calculate percentage from five subject marks.','Convert Celsius to Fahrenheit.']
  },
  {
    slug: 'ix-math-library', title: 'Mathematical Library Methods', keywords: ['Math','sqrt','pow','abs','ceil','floor','round','random','argument','return value'],
    theory: 'The Math class supplies commonly used mathematical methods. Students should know the purpose, arguments and returned values of the prescribed methods and use them correctly in expressions.',
    commonMistakes: ['Confusing pow with multiplication','Treating ceil and floor as nearest rounding','Ignoring return values','Using an unsuitable variable type for decimal results'],
    examples: ['double root=Math.sqrt(81); double p=Math.pow(2,5); int a=Math.abs(-17);'],
    programmingQuestions: ['Find square root and cube.','Find absolute difference of two numbers.','Calculate hypotenuse using sqrt and pow.','Compare round, ceil and floor for a decimal.','Generate a random integer in a specified range.']
  },
  {
    slug: 'ix-conditionals', title: 'Conditional Statements in Java', keywords: ['if','else','else-if','nested if','switch','case','default','break','condition'],
    theory: 'Conditional statements control which statements execute. Use if for a decision, if-else for two alternatives, an else-if ladder for multiple ranges, nested if for dependent decisions and switch for discrete choices.',
    commonMistakes: ['Accidental semicolon after if','Using = instead of ==','Forgetting switch break','Overlapping range conditions','Using independent if statements when one ladder is required'],
    examples: ['if(m>=90) System.out.println("A"); else if(m>=75) System.out.println("B"); else System.out.println("C");'],
    programmingQuestions: ['Check positive/negative/zero.','Find greatest of three numbers.','Check leap year.','Calculate slab-based electricity bill.','Grade a student by percentage.','Menu-driven calculator using switch.','Check vowel/consonant.','Check divisibility by 2 and 3.']
  },
  {
    slug: 'ix-iterative', title: 'Looping / Iterative Statements in Java', keywords: ['for','while','do-while','break','continue','iteration','counter','accumulator','entry-controlled','exit-controlled'],
    theory: 'Loops repeat statements. for combines initialization, condition and update; while tests before execution; do-while executes the body at least once before testing the condition.',
    commonMistakes: ['Forgetting update','Off-by-one condition','Wrong starting counter','Infinite loop','Division by zero in averages'],
    examples: ['int sum=0; for(int i=1;i<=10;i++) sum+=i; System.out.println(sum);'],
    programmingQuestions: ['Print 1 to 100.','Print even numbers.','Sum first n natural numbers.','Find factorial.','Reverse a number.','Check palindrome.','Find sum of digits.','Count digits.','Check prime.','Print multiplication table.','Generate Fibonacci series.','Find HCF.']
  },
  {
    slug: 'ix-nested-loops', title: 'Nested for Loops', keywords: ['nested loop','outer loop','inner loop','row','column','pattern','dry run','iteration'],
    theory: 'A nested loop contains an inner loop inside an outer loop. For each outer iteration, the inner loop starts again and completes its iterations. This is useful for patterns, tables and row-column processing.',
    commonMistakes: ['Updating wrong loop variable','Using outer counter accidentally','Forgetting inner loop restarts','Off-by-one row/column counts'],
    examples: ['for(int i=1;i<=5;i++){ for(int j=1;j<=i;j++) System.out.print("* "); System.out.println(); }'],
    programmingQuestions: ['Print 5×5 star square.','Print right triangle.','Print inverted triangle.','Print 1, 12, 123 pattern.','Print 1, 22, 333 pattern.','Print tables from 1 to 10.','Print hollow square.','Print numeric pyramid.','Trace inner-loop execution count.','Debug a nested-loop counter.']
  },
  {
    slug: 'ix-ethical-computing', title: 'Ethical Computing', keywords: ['ethics','digital citizenship','privacy','plagiarism','copyright','intellectual property','cyber safety','licence','open source','proprietary'],
    theory: 'Ethical computing means using technology lawfully, safely and respectfully. Students should understand intellectual property, copyright, plagiarism, privacy, cyber safety, digital citizenship, responsible social media use and software licensing.',
    commonMistakes: ['Assuming internet content is free to copy','Treating plagiarism as acceptable','Sharing personal information without consent','Confusing open source with no licence'],
    examples: ['Cite the source of an image in a project. Use licensed software. Do not publish another person’s private information without permission.'],
    programmingQuestions: [],
    theoryQuestions: ['Define plagiarism with two examples.','Differentiate copyright and plagiarism.','What is digital citizenship?','Why must personal information be protected?','Differentiate open-source and proprietary software.','Give two responsible social-media practices.','Explain intellectual property with a computing example.','What should a student check before using an online image?']
  }
];

export default chapters;
