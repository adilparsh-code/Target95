const javaQuestions = [
  {
    id: 1,
    title: 'Sum of Two Integers',
    slug: 'sum-of-two-integers',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'Programming Basics',
    topic: 'Variables and Input',
    difficulty: 'Easy',
    marks: 2,
    question: 'Write a Java program that reads two integers and prints their sum.',
    constraints: 'Use integers only. Assume both values are within the int range.',
    sampleInput: '12\n8',
    sampleOutput: '20',
    algorithm: 'Read the two integers, add them, and print the result.',
    explanation: 'This question checks basic input handling and arithmetic in Java.',
    code: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    System.out.println(a + b);
  }
}`,
    complexity: 'O(1)',
    tags: ['java', 'input', 'operators'],
  },
  {
    id: 2,
    title: 'Check Even or Odd',
    slug: 'check-even-or-odd',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'Programming Basics',
    topic: 'Conditional Statements',
    difficulty: 'Easy',
    marks: 2,
    question: 'Write a Java program that checks whether a number is even or odd.',
    constraints: 'Input is a single integer.',
    sampleInput: '7',
    sampleOutput: 'Odd',
    algorithm: 'Use the modulus operator to determine parity.',
    explanation: 'This question tests conditional logic and arithmetic operators.',
    code: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    if (n % 2 == 0) {
      System.out.println("Even");
    } else {
      System.out.println("Odd");
    }
  }
}`,
    complexity: 'O(1)',
    tags: ['java', 'conditionals', 'modulus'],
  },
  {
    id: 3,
    title: 'Largest of Three Numbers',
    slug: 'largest-of-three-numbers',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'Programming Basics',
    topic: 'Decision Making',
    difficulty: 'Easy',
    marks: 3,
    question: 'Write a Java program to find the largest of three integers.',
    constraints: 'The numbers are distinct.',
    sampleInput: '12\n45\n30',
    sampleOutput: '45',
    algorithm: 'Compare the three values using conditional checks.',
    explanation: 'This question reinforces nested conditions and comparison logic.',
    code: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    int c = sc.nextInt();
    int largest = a;
    if (b > largest) largest = b;
    if (c > largest) largest = c;
    System.out.println(largest);
  }
}`,
    complexity: 'O(1)',
    tags: ['java', 'conditionals', 'comparison'],
  },
  {
    id: 4,
    title: 'Reverse a String',
    slug: 'reverse-a-string',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'String Handling',
    topic: 'String Manipulation',
    difficulty: 'Medium',
    marks: 3,
    question: 'Write a Java program that reverses a string and prints it.',
    constraints: 'The string contains letters only.',
    sampleInput: 'Java',
    sampleOutput: 'avaJ',
    algorithm: 'Traverse the string backward and build the reversed result.',
    explanation: 'This question tests loop usage and string handling.',
    code: `public class Main {
  public static void main(String[] args) {
    String text = "Java";
    String reversed = "";
    for (int i = text.length() - 1; i >= 0; i--) {
      reversed += text.charAt(i);
    }
    System.out.println(reversed);
  }
}`,
    complexity: 'O(n)',
    tags: ['java', 'strings', 'loops'],
  },
  {
    id: 5,
    title: 'Factorial of a Number',
    slug: 'factorial-of-a-number',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'Looping Statements',
    topic: 'Iteration',
    difficulty: 'Medium',
    marks: 3,
    question: 'Write a Java program to calculate the factorial of a non-negative integer.',
    constraints: 'The input value is non-negative.',
    sampleInput: '5',
    sampleOutput: '120',
    algorithm: 'Multiply values from 1 to n using a loop.',
    explanation: 'This question evaluates loop control and multiplication logic.',
    code: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int fact = 1;
    for (int i = 1; i <= n; i++) {
      fact *= i;
    }
    System.out.println(fact);
  }
}`,
    complexity: 'O(n)',
    tags: ['java', 'loops', 'math'],
  },
  {
    id: 6,
    title: 'Check Palindrome',
    slug: 'check-palindrome',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'String Handling',
    topic: 'String Comparison',
    difficulty: 'Medium',
    marks: 3,
    question: 'Write a Java program that checks whether a word is a palindrome.',
    constraints: 'The input is a single word in lowercase.',
    sampleInput: 'madam',
    sampleOutput: 'Palindrome',
    algorithm: 'Compare the string with its reversed version.',
    explanation: 'This question tests string traversal and logical comparison.',
    code: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String word = sc.next();
    String reversed = "";
    for (int i = word.length() - 1; i >= 0; i--) {
      reversed += word.charAt(i);
    }
    if (word.equals(reversed)) {
      System.out.println("Palindrome");
    } else {
      System.out.println("Not Palindrome");
    }
  }
}`,
    complexity: 'O(n)',
    tags: ['java', 'strings', 'logic'],
  },
  {
    id: 7,
    title: 'Count Vowels',
    slug: 'count-vowels',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'String Handling',
    topic: 'Character Processing',
    difficulty: 'Medium',
    marks: 3,
    question: 'Write a Java program that counts the number of vowels in a string.',
    constraints: 'The string contains lowercase letters.',
    sampleInput: 'programming',
    sampleOutput: '3',
    algorithm: 'Check each character and increment the count for vowels.',
    explanation: 'This question evaluates loop-based character processing.',
    code: `public class Main {
  public static void main(String[] args) {
    String text = "programming";
    int count = 0;
    for (int i = 0; i < text.length(); i++) {
      char ch = text.charAt(i);
      if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
        count++;
      }
    }
    System.out.println(count);
  }
}`,
    complexity: 'O(n)',
    tags: ['java', 'strings', 'loops'],
  },
  {
    id: 8,
    title: 'Multiplication Table',
    slug: 'multiplication-table',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'Looping Statements',
    topic: 'Pattern Generation',
    difficulty: 'Medium',
    marks: 4,
    question: 'Write a Java program that prints the multiplication table for a given number.',
    constraints: 'The input is a positive integer.',
    sampleInput: '5',
    sampleOutput: '5 10 15 20 25 30 35 40 45 50',
    algorithm: 'Use a loop from 1 to 10 and print the product at each step.',
    explanation: 'This question introduces repeated output generation using loops.',
    code: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    for (int i = 1; i <= 10; i++) {
      System.out.print(n * i + " ");
    }
  }
}`,
    complexity: 'O(1)',
    tags: ['java', 'loops', 'output'],
  },
  {
    id: 9,
    title: 'Fibonacci Series',
    slug: 'fibonacci-series',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'Looping Statements',
    topic: 'Series Generation',
    difficulty: 'Medium',
    marks: 4,
    question: 'Write a Java program that prints the first 10 Fibonacci numbers.',
    constraints: 'The output should contain 10 numbers.',
    sampleInput: '10',
    sampleOutput: '0 1 1 2 3 5 8 13 21 34',
    algorithm: 'Build each number from the previous two values.',
    explanation: 'This question tests iterative sequence generation.',
    code: `public class Main {
  public static void main(String[] args) {
    int a = 0, b = 1;
    System.out.print(a + " " + b + " ");
    for (int i = 2; i < 10; i++) {
      int c = a + b;
      System.out.print(c + " ");
      a = b;
      b = c;
    }
  }
}`,
    complexity: 'O(n)',
    tags: ['java', 'loops', 'series'],
  },
  {
    id: 10,
    title: 'Prime Number Check',
    slug: 'prime-number-check',
    board: 'ICSE',
    class: '10',
    subject: 'Computer Science',
    language: 'Java',
    chapter: 'Looping Statements',
    topic: 'Number Theory',
    difficulty: 'Medium',
    marks: 4,
    question: 'Write a Java program that checks if an integer is prime.',
    constraints: 'The input is a positive integer greater than 1.',
    sampleInput: '13',
    sampleOutput: 'Prime',
    algorithm: 'Test divisibility from 2 up to the square root of the number.',
    explanation: 'This question strengthens loop and conditional reasoning.',
    code: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    boolean isPrime = true;
    if (n < 2) isPrime = false;
    for (int i = 2; i * i <= n; i++) {
      if (n % i == 0) isPrime = false;
    }
    System.out.println(isPrime ? "Prime" : "Not Prime");
  }
}`,
    complexity: 'O(sqrt(n))',
    tags: ['java', 'loops', 'number-theory'],
  },
];

export default javaQuestions;
