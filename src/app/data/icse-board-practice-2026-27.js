/** ICSE Class X supplemental board practice bank. Canonical, deduplicated entries. */
const ICSE_BOARD_PRACTICE_2026_27 = [
  {
    id:"icse-x-arrays-trace-001",type:"output-tracing",difficulty:"hard",chapter:"Arrays",marks:3,
    question:`Predict the output: int[] a={4,1,5,2}; int s=0; for(int i=1;i<a.length;i+=2) s+=a[i]; System.out.println(s+" "+a[2]);`,
    answer:"3 5",explanation:"Indexes 1 and 3 are visited, giving 1+2=3; index 2 contains 5."
  },
  {
    id:"icse-x-arrays-trace-004",type:"output-tracing",difficulty:"hard",chapter:"Arrays",marks:4,
    question:`Predict the output: int[] a={2,4,6,8,10}; for(int i=a.length-1;i>=0;i-=2) System.out.print(a[i]+" ");`,
    answer:"10 6 2",explanation:"The loop visits indexes 4, 2 and 0."
  },
  {
    id:"icse-x-arrays-debug-002",type:"debugging",difficulty:"hard",chapter:"Arrays",marks:3,
    question:`A student writes int[] a={3,6,9,12}; for(int i=0;i<=a.length;i++) System.out.println(a[i]); Identify and correct the error.`,
    answer:"Use i<a.length. Valid indexes are 0 through a.length-1.",explanation:"<= reaches an invalid index."
  },
  {
    id:"icse-x-arrays-program-002",type:"programming",difficulty:"hard",chapter:"Arrays",marks:5,
    question:`Write Java logic to read 10 integers and display the second-largest distinct value. Assume at least two distinct values exist.`,
    answer:"Traverse once while tracking the largest and second-largest distinct values.",explanation:"The distinct condition prevents a repeated maximum from being selected."
  },
  {
    id:"icse-x-strings-debug-001",type:"debugging",difficulty:"hard",chapter:"String Handling",marks:3,
    question:'String a="JAVA"; String b=new String("JAVA"); if(a==b) System.out.println("Same"); else System.out.println("Different"). Identify the error.',
    answer:"Use a.equals(b) because == compares references while equals() compares String contents.",explanation:"The two String objects contain the same text but are different objects."
  },
  {
    id:"icse-x-strings-trace-002",type:"output-tracing",difficulty:"hard",chapter:"String Handling",marks:3,
    question:'Predict the output: String s="COMPUTER"; System.out.println(s.substring(2,6)+" "+s.indexOf("P")+" "+s.charAt(4));',
    answer:"MPUT 3 U",explanation:"substring excludes index 6; P is at index 3 and index 4 is U."
  },
  {
    id:"icse-x-strings-program-004",type:"programming",difficulty:"hard",chapter:"String Handling",marks:5,
    question:`Write Java logic to count vowels, consonants and spaces in a sentence, treating uppercase and lowercase letters as equivalent.`,
    answer:"Traverse the string; classify letters with Character.isLetter(), test vowels after converting case, and count spaces separately.",explanation:"Punctuation should not be counted as consonants."
  },
  {
    id:"icse-x-string-case-003",type:"case-based",difficulty:"hard",chapter:"String Handling",marks:5,
    question:`Design Java logic to test whether a user-entered word is a palindrome while ignoring case. Compare matching characters from both ends.`,
    answer:"Normalize case, use left and right indexes, compare while left<right, and reject on the first mismatch.",explanation:"Two-pointer comparison directly tests mirrored characters."
  },
  {
    id:"icse-x-methods-debug-001",type:"debugging",difficulty:"hard",chapter:"Methods",marks:3,
    question:`A method static int larger(int a,int b){if(a>b)return a;} gives a missing-return error. Repair it.`,
    answer:"Add an else return, e.g. if(a>b)return a; else return b;",explanation:"Every control path of a non-void method must return an int."
  },
  {
    id:"icse-x-methods-case-002",type:"case-based",difficulty:"hard",chapter:"Methods",marks:4,
    question:`State headers for overloaded methods that return the greatest of three integers and three doubles. Explain how overloading works.`,
    answer:"int largest(int a,int b,int c) and double largest(double a,double b,double c).",explanation:"Parameter types differ; return type alone cannot overload a method."
  },
  {
    id:"icse-x-methods-program-003",type:"programming",difficulty:"hard",chapter:"Methods",marks:5,
    question:`Write overloaded Java methods sum() for the first n natural numbers and the first n even numbers using different parameter lists.`,
    answer:"Use sum(int n) and sum(int n, boolean even), implementing the appropriate arithmetic sequence.",explanation:"Different parameter lists permit overloading."
  },
  {
    id:"icse-x-library-case-001",type:"case-based",difficulty:"medium",chapter:"Library Classes",marks:4,
    question:`A school app receives a character and must report digit, uppercase, lowercase or symbol. Give the Java decision logic.`,
    answer:"Use Character.isDigit(ch), Character.isUpperCase(ch), Character.isLowerCase(ch), otherwise symbol.",explanation:"Character methods provide reliable classification."
  },
  {
    id:"icse-x-library-debug-002",type:"debugging",difficulty:"medium",chapter:"Library Classes",marks:3,
    question:`int n=(int)Math.random()*6+1 always gives 1. Correct it and explain.`,
    answer:"Use int n=(int)(Math.random()*6)+1;.",explanation:"Casting Math.random() first converts its value to zero."
  },
  {
    id:"icse-x-loops-trace-003",type:"output-tracing",difficulty:"hard",chapter:"Loops",marks:4,
    question:`Predict the output: int n=3214,s=0; while(n>0){int d=n%10;if(d%2==0)s+=d;n/=10;} System.out.println(s);`,
    answer:"6",explanation:"Only digits 4 and 2 are even, so their sum is 6."
  },
  {
    id:"icse-x-loops-debug-004",type:"debugging",difficulty:"hard",chapter:"Loops",marks:3,
    question:`for(int i=1;i<=10;i--) does not terminate as intended. Identify the error and correct it.`,
    answer:"Use i++ so the loop progresses from 1 to 10.",explanation:"i-- moves farther from the i<=10 termination condition."
  },
  {
    id:"icse-x-numbers-program-003",type:"programming",difficulty:"hard",chapter:"Number Systems",marks:5,
    question:`Write a Java method isArmstrong(int n) for a three-digit number using digit extraction, without converting to String.`,
    answer:"Extract each digit with %10, add its cube, divide by 10 repeatedly, then compare the sum with the original.",explanation:"A three-digit Armstrong number equals the sum of the cubes of its digits."
  },
  {
    id:"icse-x-numbers-case-004",type:"case-based",difficulty:"hard",chapter:"Number Systems",marks:5,
    question:`Write Java logic to test whether a positive integer is a palindrome without converting it to String.`,
    answer:"Store the original, reverse digits using %10 and /10, then compare reverse with original.",explanation:"Digit arithmetic avoids String conversion."
  },
  {
    id:"icse-x-inheritance-trace-001",type:"output-tracing",difficulty:"hard",chapter:"Inheritance",marks:4,
    question:`Predict the output: class A{int x=10;} class B extends A{int x=20;void show(){System.out.print(super.x+" "+x);}} What does new B().show() print?`,
    answer:"10 20",explanation:"super.x refers to the superclass field; x refers to the subclass field."
  },
  {
    id:"icse-x-inheritance-debug-003",type:"debugging",difficulty:"hard",chapter:"Inheritance",marks:4,
    question:`A subclass constructor calls super(); and later super(name). The compiler reports an error. Explain the rule.`,
    answer:"A constructor may invoke only one superclass constructor, and super(...) must be its first statement.",explanation:"Java permits one explicit superclass-constructor invocation."
  },
  {
    id:"icse-x-inheritance-case-002",type:"case-based",difficulty:"hard",chapter:"Inheritance",marks:5,
    question:`Person has name and Student extends Person with rollNumber and marks. Show how Student's constructor initializes inherited name using super().`,
    answer:"Call super(name) first, then initialize rollNumber and marks.",explanation:"The superclass constructor initializes inherited state."
  },
  {
    id:"icse-x-constructors-debug-001",type:"debugging",difficulty:"hard",chapter:"Constructors",marks:3,
    question:`class Box{int n;Box(int x){n=x;}}; Box b=new Box(); Identify the error and give two valid fixes.`,
    answer:"There is no no-argument constructor. Use new Box(10), or define Box().",explanation:"Declaring a parameterized constructor prevents an automatic no-argument constructor."
  },
  {
    id:"icse-x-constructors-trace-002",type:"output-tracing",difficulty:"hard",chapter:"Constructors",marks:4,
    question:'Predict the output: class A{A(){System.out.print("A ");}} class B extends A{B(){System.out.print("B");}} What is printed by new B()?',
    answer:"A B",explanation:"The superclass constructor executes before the subclass constructor body."
  },
  {
    id:"icse-x-constructors-case-003",type:"case-based",difficulty:"medium",chapter:"Constructors",marks:4,
    question:`A Book class needs creation with title only or title and price. Design the two constructors and explain overloading.`,
    answer:"Book(String title) and Book(String title,double price).",explanation:"Same constructor name with different parameter lists is constructor overloading."
  },
  {
    id:"icse-x-encapsulation-debug-002",type:"debugging",difficulty:"hard",chapter:"Encapsulation",marks:4,
    question:`A private marks field is accessed directly as obj.marks=95 from another class. Explain the error and correct the design.`,
    answer:"Use getMarks() and setMarks(int m), then call obj.setMarks(95).",explanation:"Private state is accessed through controlled methods."
  },
  {
    id:"icse-x-encapsulation-program-003",type:"programming",difficulty:"hard",chapter:"Encapsulation",marks:5,
    question:`Create Account with private balance, a setter rejecting negative balances, and a getter returning the balance.`,
    answer:"Use private double balance; setBalance checks b>=0 before assignment; getBalance returns balance.",explanation:"The setter enforces the validity rule."
  },
  {
    id:"icse-x-polymorphism-case-001",type:"case-based",difficulty:"hard",chapter:"Polymorphism",marks:5,
    question:`Shape defines display() and Circle overrides it. If Shape s=new Circle(); which display() runs and why?`,
    answer:"Circle's display() runs because overridden instance methods use runtime dispatch.",explanation:"The runtime object is Circle even though the reference type is Shape."
  },
  {
    id:"icse-x-polymorphism-trace-002",type:"output-tracing",difficulty:"hard",chapter:"Polymorphism",marks:4,
    question:'Predict the output: class A{void show(){System.out.print("A");}} class B extends A{void show(){System.out.print("B");}} A obj=new B(); obj.show();',
    answer:"B",explanation:"The overridden method is selected using the runtime object."
  },
  {
    id:"icse-x-class-program-001",type:"programming",difficulty:"hard",chapter:"Class as the Basis of Computation",marks:5,
    question:`Create StudentResult with name and three marks. Write methods for average and category, where average>=75 gives DISTINCTION.`,
    answer:"Use fields, a constructor/setters, calculateAverage() returning double, and category() applying the threshold.",explanation:"This combines state, methods, objects and conditional logic."
  }
];
export default ICSE_BOARD_PRACTICE_2026_27;
export { ICSE_BOARD_PRACTICE_2026_27 };