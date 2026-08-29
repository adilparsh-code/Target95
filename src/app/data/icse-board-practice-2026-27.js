/**
 * ICSE 2026-27 board-style supplemental practice.
 * Focus: high-value Java tracing, debugging, programming and case-based work.
 */

const ICSE_BOARD_PRACTICE_2026_27 = [
  {
    id: "icse-x-arrays-trace-001",
    type: "output-tracing",
    difficulty: "hard",
    chapter: "Arrays",
    marks: 3,
    question: "Predict the output: int[] a={4,1,5,2}; int s=0; for(int i=1;i<a.length;i+=2) s += a[i]; System.out.println(s + \" \" + a[2]);",
    answer: "3 5",
    explanation: "The loop visits indexes 1 and 3, so s = 1 + 2 = 3. The value at index 2 is 5."
  },
  {
    id: "icse-x-strings-debug-001",
    type: "debugging",
    difficulty: "hard",
    chapter: "String Handling",
    marks: 3,
    question: "A student writes: String a=\"JAVA\"; String b=new String(\"JAVA\"); if(a==b) System.out.println(\"Same\"); else System.out.println(\"Different\"); The student expects Same. Identify the conceptual error and correct the comparison.",
    answer: "Use a.equals(b) because == compares object references while equals() compares String contents.",
    explanation: "Both objects contain JAVA, but they are distinct String objects. Content comparison should use equals()."
  },
  {
    id: "icse-x-library-case-001",
    type: "case-based",
    difficulty: "medium",
    chapter: "Library Classes",
    marks: 4,
    question: "A school app receives a character from a user. It must report whether the character is a digit, an uppercase letter, a lowercase letter or another symbol. Write the Java decision logic using Character library methods.",
    answer: "if(Character.isDigit(ch)) ... else if(Character.isUpperCase(ch)) ... else if(Character.isLowerCase(ch)) ... else ...",
    explanation: "The Character class provides direct classification methods, avoiding fragile ASCII-range assumptions."
  },
  {
    id: "icse-x-methods-debug-001",
    type: "debugging",
    difficulty: "hard",
    chapter: "Methods",
    marks: 3,
    question: "A method is declared as static int larger(int a, int b) { if(a>b) return a; } and the compiler reports a missing return value. Explain why and repair the method.",
    answer: "Provide a return value on every control path, for example: if(a>b) return a; else return b;",
    explanation: "A non-void method must return an int regardless of which branch executes."
  },
  {
    id: "icse-x-class-program-001",
    type: "programming",
    difficulty: "hard",
    chapter: "Class as the Basis of Computation",
    marks: 5,
    question: "Create a class StudentResult with name and three marks. Write a method to calculate the average and another method to return \"DISTINCTION\" when the average is at least 75, otherwise \"REGULAR\". Display both results for one object.",
    answer: "Use private/instance fields, a constructor or setter methods, a calculateAverage() method returning double, and a category() method using the 75 threshold.",
    explanation: "The task tests state, methods, object creation, return values and conditional logic in one compact board-style program."
  },
  {
    id: "icse-x-arrays-case-001",
    type: "case-based",
    difficulty: "hard",
    chapter: "Arrays",
    marks: 5,
    question: "A library stores the number of books issued by 8 classes in an integer array. Write logic to find the highest value, its first position, and then count how many classes issued more than the average number of books.",
    answer: "First compute sum and average; track maximum and its first index with a left-to-right traversal; perform a second traversal to count values greater than the average.",
    explanation: "Separating the aggregate calculation from the comparison pass makes the logic clear and avoids using an incomplete average while traversing."
  },
  {
    id: "icse-x-arrays-debug-002",
    type: "debugging",
    difficulty: "hard",
    chapter: "Arrays",
    marks: 3,
    question: "A student writes int[] a={3,6,9,12}; for(int i=0;i<=a.length;i++) System.out.println(a[i]); The program fails at runtime. Identify the boundary error and give the corrected loop condition.",
    answer: "Use i < a.length. Valid indexes are 0 through a.length-1.",
    explanation: "The <= condition reaches index 4 for a four-element array, causing ArrayIndexOutOfBoundsException."
  },
  {
    id: "icse-x-strings-trace-002",
    type: "output-tracing",
    difficulty: "hard",
    chapter: "String Handling",
    marks: 3,
    question: "Predict the output: String s=\"COMPUTER\"; System.out.println(s.substring(2,6) + \" \" + s.indexOf('P') + \" \" + s.charAt(4));",
    answer: "MPUT 3 U",
    explanation: "substring(2,6) takes indexes 2 to 5, indexOf('P') returns 3, and charAt(4) returns U."
  },
  {
    id: "icse-x-methods-case-002",
    type: "case-based",
    difficulty: "hard",
    chapter: "Methods",
    marks: 4,
    question: "A school utility needs one method to return the greatest of three integers and another overloaded method to return the greatest of three doubles. State the method headers and explain how overloading selects the correct method.",
    answer: "int largest(int a,int b,int c) and double largest(double a,double b,double c). The compiler selects the method whose parameter types match the arguments.",
    explanation: "The method name may remain the same when the parameter list differs; return type alone cannot overload a method."
  }
];

export default ICSE_BOARD_PRACTICE_2026_27;
export { ICSE_BOARD_PRACTICE_2026_27 };
