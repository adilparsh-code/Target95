/**
 * Target95 ICSE Class X Computer Applications - enriched learning content.
 *
 * Purpose: provide a student-first layer above the official syllabus with
 * concise theory, worked ideas, MCQs, exam-style practice and practical tasks.
 * This file is intentionally content-only; existing routing/components remain unchanged.
 */

const mcq = (id, difficulty, topic, question, options, answer, explanation, marks = 1) => ({
  id,
  difficulty,
  topic,
  question,
  options,
  correctAnswer: answer,
  explanation,
  marks,
});

const practice = (id, difficulty, type, question, answer = "", marks = 2) => ({
  id,
  difficulty,
  type,
  question,
  answer,
  marks,
});

export const ICSE_CLASS_X_CONTENT = [
  {
    topicId: "x-revision",
    slug: "revision",
    title: "Revision of Class IX Syllabus",
    learningObjectives: ["Trace Java execution from class definition to output.", "Evaluate expressions using precedence and associativity.", "Choose the correct conditional or loop construct for a problem.", "Trace simple programs and identify syntax, runtime and logical errors.", "Combine Class IX concepts in short exam-style programs."],
    keyConcepts: ["OOP vocabulary: class, object, method and state", "Identifiers, literals and primitive data types", "Arithmetic, relational, logical and conditional operators", "if / if-else / else-if / switch", "for / while / do-while", "Nested loops and pattern logic", "Input, output and Math library basics"],
    remember: ["Use == for primitive comparison; do not confuse it with =.", "A switch case normally needs break unless fall-through is intentional.", "for and while are entry-controlled; do-while is exit-controlled.", "Array/string indexing starts at 0."],
    mcqs: [
      mcq("X-REV-MCQ-01", "easy", "Operators", "Which operator checks equality of two primitive values?", ["A) =", "B) ==", "C) !=", "D) ==="], "B", "The equality operator for Java primitive values is ==."),
      mcq("X-REV-MCQ-02", "easy", "Loops", "Which loop executes its body at least once even when the condition is initially false?", ["A) for", "B) while", "C) do-while", "D) nested for"], "C", "do-while checks its condition after the first execution."),
      mcq("X-REV-MCQ-03", "medium", "Switch", "What is the most likely result when a switch case has no break and the next case is compatible?", ["A) Immediate compilation error", "B) Fall-through to the next case", "C) Program always terminates", "D) Default executes first"], "B", "Without break, execution can continue into the following case (fall-through)."),
      mcq("X-REV-MCQ-04", "hard", "Expression", "What is the value of 6 + 4 * 2 in Java?", ["A) 20", "B) 14", "C) 16", "D) 10"], "B", "Multiplication has higher precedence than addition, so 6 + (4*2) = 14.")
    ],
    practice: [practice("X-REV-P-01", "easy", "output", "Predict the output of a loop that prints the numbers 1 to 5.", "1 2 3 4 5", 2), practice("X-REV-P-02", "medium", "debugging", "A program uses = inside an if condition when equality was intended. Identify the mistake and correct it.", "Use == for comparison; = is assignment.", 2), practice("X-REV-P-03", "hard", "program", "Write a menu-driven Java program using switch for area of circle, rectangle and square.", "Student-written Java program using switch and Math.PI where required.", 5)],
    practicalTasks: ["Create a calculator using switch.", "Generate a multiplication table for a user-entered number.", "Print a right-triangle star pattern using nested for loops."],
    examTips: ["Trace variables line by line before selecting an output option.", "For loops, write the first three iterations explicitly when stuck.", "Use a clear variable trace table for 2-4 mark output questions."]
  },
  {
    topicId: "x-library-classes",
    slug: "library-classes",
    title: "Library Classes",
    learningObjectives: ["Use common java.lang library methods confidently.", "Distinguish primitive values from wrapper objects.", "Use Integer, Double and Character utility methods correctly.", "Apply Math methods in exam programs."],
    keyConcepts: ["Math.abs, Math.pow, Math.sqrt, Math.ceil, Math.floor, Math.round", "Math.max, Math.min, Math.random", "Integer.parseInt and Integer.toString", "Character.isDigit, isLetter, isUpperCase, isLowerCase", "Wrapper classes and autoboxing/unboxing"],
    remember: ["Math.sqrt returns double.", "Math.round returns a long for a double argument.", "Integer is a class; int is a primitive type.", "parseInt converts valid numeric text to an int and can throw NumberFormatException."],
    mcqs: [mcq("X-LIB-MCQ-01", "easy", "Math", "Which method returns the absolute value of -17?", ["A) Math.abs(-17)", "B) Math.absolute(-17)", "C) Math.mod(-17)", "D) Math.value(-17)"], "A", "Math.abs returns the absolute value."), mcq("X-LIB-MCQ-02", "easy", "Wrapper", "Which is the wrapper class of int?", ["A) Int", "B) Integer", "C) NumberInt", "D) PrimitiveInt"], "B", "Integer is the wrapper class corresponding to int."), mcq("X-LIB-MCQ-03", "medium", "Character", "What does Character.isDigit('7') return?", ["A) true", "B) false", "C) 7", "D) 0"], "A", "The character '7' is a decimal digit, so isDigit returns true."), mcq("X-LIB-MCQ-04", "hard", "Parsing", "What happens when Integer.parseInt(\"12A\") is executed?", ["A) Returns 12", "B) Returns 12A", "C) NumberFormatException", "D) Compilation error"], "C", "12A is not a valid decimal integer representation, so parsing fails at runtime.")],
    practice: [practice("X-LIB-P-01", "easy", "output", "Find the output of Math.floor(7.9).", "7.0", 1), practice("X-LIB-P-02", "medium", "program", "Write a program to input a decimal number and print its square root, square and absolute value.", "Use Math.sqrt, multiplication or Math.pow, and Math.abs.", 4), practice("X-LIB-P-03", "hard", "program", "Input a character and report whether it is a digit, uppercase letter, lowercase letter or special character.", "Use Character.isDigit/isUpperCase/isLowerCase with a final else branch.", 4)],
    practicalTasks: ["Build a simple number utility using Math methods.", "Create a character classifier using Character methods.", "Convert numeric strings to numbers and handle invalid input gracefully."],
    examTips: ["Memorise method purpose + return type, not just the method name.", "For character questions, remember that methods accept char values."]
  },
  {
    topicId: "x-arrays",
    slug: "arrays",
    title: "Arrays",
    learningObjectives: ["Declare, create, initialise and traverse one-dimensional arrays.", "Perform searching and sorting on one-dimensional arrays.", "Pass arrays to methods and process their elements systematically.", "Work with two-dimensional arrays for traversal and basic matrix tasks as an extension."],
    keyConcepts: ["Declaration and creation", "Indexing and length", "Traversal with for loops", "Sum, average, maximum and minimum", "Linear search and binary search after sorting", "Bubble sort and selection sort", "Arrays as method arguments", "2-D traversal and matrix basics (extension)"],
    remember: ["last valid index = length - 1.", "arr.length is a field; String.length() is a method.", "Never access an index outside 0..length-1.", "Binary search assumes the array is sorted.", "Class X board-level searching/sorting should be treated primarily as one-dimensional array work."],
    mcqs: [mcq("X-ARR-MCQ-01", "easy", "Basics", "What is the first valid index of an int array?", ["A) 0", "B) 1", "C) -1", "D) Depends on length"], "A", "Java arrays use zero-based indexing."), mcq("X-ARR-MCQ-02", "easy", "Basics", "For int[] a = new int[8], what is a.length?", ["A) 7", "B) 8", "C) 9", "D) 0"], "B", "length gives the number of elements."), mcq("X-ARR-MCQ-03", "medium", "Search", "Which search is appropriate for an unsorted one-dimensional array?", ["A) Binary search only", "B) Linear search", "C) Tree search only", "D) Hash search only"], "B", "Linear search does not require sorted data."), mcq("X-ARR-MCQ-04", "medium", "Sorting", "In a standard bubble sort ascending pass, adjacent elements are swapped when:", ["A) Left > right", "B) Left < right", "C) They are equal", "D) Index is odd"], "A", "Swapping when the left value is greater moves larger values toward the end."), mcq("X-ARR-MCQ-05", "hard", "Binary Search", "What must be true before binary search is applied?", ["A) Array must contain unique values", "B) Array must be sorted", "C) Array must be reversed", "D) Array must be two-dimensional"], "B", "Binary search repeatedly halves a sorted search range.")],
    practice: [practice("X-ARR-P-01", "easy", "program", "Input 10 integers and print their sum, average, maximum and minimum.", "Use traversal and maintain running sum/max/min.", 5), practice("X-ARR-P-02", "medium", "program", "Implement linear search and print the first index at which the target occurs.", "Traverse from index 0; return/print the first matching index.", 4), practice("X-ARR-P-03", "medium", "program", "Sort an integer array in ascending order using bubble sort without library sorting.", "Compare adjacent elements and perform repeated passes.", 5), practice("X-ARR-P-04", "hard", "debugging", "A binary search gives wrong answers because the array is unsorted. Explain the bug and repair the logic.", "Sort first or use linear search; binary search requires sorted data.", 3)],
    practicalTasks: ["Linear search with position reporting.", "Bubble sort with pass count.", "Selection sort with minimum-index tracking.", "Find the second largest element.", "Merge two sorted one-dimensional arrays into a third array."],
    examTips: ["Write index ranges beside loops when solving array questions.", "For binary search, show low, mid and high after each iteration.", "Never silently assume 1-based indexing."]
  },
  {
    topicId: "x-strings",
    slug: "string-handling",
    title: "String Handling",
    learningObjectives: ["Understand String as an object and use core methods accurately.", "Trace character positions and substrings.", "Compare strings correctly using equals/compareTo rather than == for content.", "Solve classification, palindrome, frequency and transformation problems."],
    keyConcepts: ["length, charAt, substring", "equals and equalsIgnoreCase", "compareTo", "indexOf and lastIndexOf", "toUpperCase and toLowerCase", "replace", "String immutability", "StringBuilder as an optional extension"],
    remember: ["String.length() is a method.", "String indexes start at 0.", "equals compares content; == compares references for objects.", "substring(begin, end) includes begin but excludes end."],
    mcqs: [mcq("X-STR-MCQ-01", "easy", "Basics", "What does \"HELLO\".length() return?", ["A) 4", "B) 5", "C) 6", "D) Error"], "B", "HELLO contains five characters."), mcq("X-STR-MCQ-02", "easy", "charAt", "What does \"JAVA\".charAt(1) return?", ["A) J", "B) A", "C) V", "D) \"A\""], "B", "Index 1 points to the second character, A."), mcq("X-STR-MCQ-03", "medium", "Comparison", "Which method is appropriate for comparing two String contents?", ["A) =", "B) ==", "C) equals", "D) compare"], "C", "equals compares the character sequences represented by the two strings."), mcq("X-STR-MCQ-04", "medium", "substring", "What is \"COMPUTER\".substring(0, 4)?", ["A) COMP", "B) COMPUT", "C) OMPU", "D) COMP U"], "A", "The end index is exclusive, so indexes 0,1,2,3 are selected."), mcq("X-STR-MCQ-05", "hard", "Immutability", "What is true about Java String objects?", ["A) They are always mutable", "B) Their contents cannot be changed after creation", "C) charAt changes the string", "D) replace mutates the original in place"], "B", "String is immutable; methods create and return new string values when necessary.")],
    practice: [practice("X-STR-P-01", "easy", "program", "Input a string and count vowels, consonants, digits and spaces.", "Traverse characters and classify with Character methods and vowel checks.", 5), practice("X-STR-P-02", "medium", "program", "Check whether a string is a palindrome ignoring case.", "Compare characters from both ends or compare with a reversed string.", 4), practice("X-STR-P-03", "medium", "program", "Count the frequency of each vowel in a sentence.", "Use five counters or a small array and traverse the string.", 4), practice("X-STR-P-04", "hard", "debugging", "A program uses == to compare two Strings read from input. Explain why the result may be unexpected and fix it.", "Use equals or equalsIgnoreCase for content comparison.", 3)],
    practicalTasks: ["Reverse a string without using library reverse methods.", "Check palindrome and count its vowels.", "Find the longest word in a sentence.", "Replace every vowel with '*'."],
    examTips: ["Always write indexes under the string for tricky output questions.", "For substring questions, mark begin inclusive/end exclusive."]
  },
  {
    topicId: "x-class-computation",
    slug: "class-as-basis",
    title: "Class as the Basis of all Computation",
    learningObjectives: ["Design small classes with state and behaviour.", "Use instance/static members appropriately.", "Apply access control and encapsulation.", "Call overloaded methods correctly and explain method signatures."],
    keyConcepts: ["Class and object relationship", "Instance variables and methods", "static members", "public/private/protected basics", "encapsulation", "this keyword", "method parameters and return values", "method overloading", "has-a association"],
    remember: ["A method signature is based on name + parameter types/order, not return type.", "Static members belong to the class; instance members belong to objects.", "private supports encapsulation by restricting direct outside access.", "Use this when parameter names hide instance variable names."],
    mcqs: [mcq("X-CLS-MCQ-01", "easy", "Objects", "Which statement best describes an object?", ["A) A comment", "B) An instance of a class", "C) A package", "D) A primitive type"], "B", "An object is a runtime instance of a class."), mcq("X-CLS-MCQ-02", "medium", "Static", "Which member is shared by all objects of a class?", ["A) Instance variable", "B) Local variable", "C) Static variable", "D) Parameter"], "C", "A static field belongs to the class and is shared."), mcq("X-CLS-MCQ-03", "medium", "Overloading", "Which change can create a valid overloaded method?", ["A) Only return type", "B) Different parameter list", "C) Only access modifier", "D) Only method body"], "B", "Overloading requires a different parameter list."), mcq("X-CLS-MCQ-04", "hard", "Encapsulation", "Why is a private instance variable commonly paired with public getter/setter methods?", ["A) To expose unrestricted memory", "B) To control access to object state", "C) To make the variable static", "D) To remove constructors"], "B", "Controlled access supports encapsulation.")],
    practice: [practice("X-CLS-P-01", "medium", "design", "Design a Student class with name, roll number and marks, plus a method to print the grade.", "Class with instance variables, constructor and grade method.", 5), practice("X-CLS-P-02", "medium", "program", "Create a Rectangle class with overloaded constructors and methods for area and perimeter.", "Provide no-arg and parameterized constructors and calculation methods.", 5), practice("X-CLS-P-03", "hard", "debugging", "A method is overloaded only by changing its return type. Explain why this is invalid.", "Return type alone does not distinguish overloaded methods.", 2)],
    practicalTasks: ["Student result class.", "BankAccount class with deposit/withdraw and balance check.", "Rectangle class with constructor overloading.", "LibraryBook class with issue/return state."],
    examTips: ["When asked about overloading, write both method headers to make the parameter difference obvious.", "Separate class state from operations in your code."]
  },
  {
    topicId: "x-constructors",
    slug: "constructors",
    title: "Constructors",
    learningObjectives: ["Distinguish constructors from methods.", "Write default/no-argument and parameterized constructors.", "Use constructor overloading and this() chaining.", "Predict constructor call order in object creation."],
    keyConcepts: ["Constructor name matches class name", "No return type", "No-argument constructor", "Parameterized constructor", "Constructor overloading", "this() constructor chaining", "Implicit default constructor when no constructor is declared"],
    remember: ["If you write any constructor, Java does not automatically add the no-arg constructor.", "this() must be the first statement of a constructor.", "A constructor is invoked as part of object creation with new."],
    mcqs: [mcq("X-CON-MCQ-01", "easy", "Basics", "Which statement about a Java constructor is correct?", ["A) It must return void", "B) It has the same name as the class", "C) It is always static", "D) It is inherited"], "B", "A constructor has the same name as its class and no return type."), mcq("X-CON-MCQ-02", "easy", "Default", "When is an implicit default constructor supplied?", ["A) Always", "B) Only when no constructor is declared", "C) Only after parameterized constructors", "D) Never"], "B", "Java supplies a default no-argument constructor only when the class declares no constructor."), mcq("X-CON-MCQ-03", "medium", "Overloading", "Which pair demonstrates constructor overloading?", ["A) C() and void C(int x)", "B) C() and C(int x)", "C) int C() and double C()", "D) C() and c()"], "B", "Overloaded constructors have the same name but different parameter lists and no return type."), mcq("X-CON-MCQ-04", "hard", "Chaining", "Where must this() appear inside a constructor?", ["A) Anywhere", "B) Last statement", "C) First statement", "D) Only in main"], "C", "A this() constructor call must be the first statement.")],
    practice: [practice("X-CON-P-01", "easy", "program", "Create a Book class with a no-argument constructor and a parameterized constructor.", "Provide both constructors and initialise sensible defaults.", 4), practice("X-CON-P-02", "medium", "program", "Overload constructors in a Student class for name only, name+roll, and name+roll+marks.", "Use this() to avoid duplicate initialisation logic.", 5), practice("X-CON-P-03", "hard", "output", "Trace the constructor calls when three overloaded constructors are chained with this().", "The called constructor must execute first according to the chaining path, then control returns to the caller constructor.", 3)],
    practicalTasks: ["Constructor-overloaded Student class.", "Time class with hour/minute constructor variants.", "Box class using constructor chaining."],
    examTips: ["Never write a return type before a constructor name.", "When tracing, circle the constructor selected by the argument list."]
  },
  {
    topicId: "x-custom-methods",
    slug: "custom-methods",
    title: "Custom Methods",
    learningObjectives: ["Write void and value-returning methods.", "Pass parameters and return results.", "Apply method overloading and scope rules.", "Use simple recursion for small problems."],
    keyConcepts: ["Method declaration and invocation", "Parameters and arguments", "return statement", "void methods", "local vs instance scope", "method overloading", "static methods", "simple recursion"],
    remember: ["Arguments are actual values supplied at a call; parameters are variables in the method definition.", "A non-void method must return a compatible value on every required path.", "Java passes argument values; changing a primitive parameter does not change the caller's primitive variable."],
    mcqs: [mcq("X-MET-MCQ-01", "easy", "Methods", "Which keyword marks a method that returns no value?", ["A) null", "B) empty", "C) void", "D) none"], "C", "void is used when a method does not return a value."), mcq("X-MET-MCQ-02", "easy", "Methods", "What is passed into a method call?", ["A) Arguments", "B) Parameters", "C) Classes", "D) Packages"], "A", "Arguments are the actual values/expressions supplied at the call site."), mcq("X-MET-MCQ-03", "medium", "Overloading", "Which two methods can legally be overloaded?", ["A) sum(int,int) and sum(int,int) with a different return type", "B) sum(int,int) and sum(int,double)", "C) sum() and sum()", "D) only methods with different names"], "B", "Parameter lists must differ for overloading."), mcq("X-MET-MCQ-04", "hard", "Recursion", "What is essential to prevent a simple recursive method from calling itself forever?", ["A) Static keyword", "B) Constructor", "C) Base case", "D) Package"], "C", "A base case terminates recursive calls.")],
    practice: [practice("X-MET-P-01", "easy", "program", "Write a method that accepts three integers and returns the largest.", "Return the maximum using comparisons or Math.max.", 3), practice("X-MET-P-02", "medium", "program", "Write overloaded area() methods for square, rectangle and circle.", "Use distinct parameter lists and appropriate return types.", 5), practice("X-MET-P-03", "hard", "recursion", "Write a recursive method to calculate factorial of n.", "Base case n<=1; otherwise n*factorial(n-1).", 4)],
    practicalTasks: ["Method-based calculator.", "Overloaded area() methods.", "Recursive factorial and digit-sum methods.", "Method that returns the count of prime numbers in an array."],
    examTips: ["Write the method header before the method body to avoid signature mistakes.", "For recursion, explicitly write the base case and recursive step."]
  },
  {
    topicId: "x-disruptive-technologies",
    slug: "disruptive-technologies",
    title: "Disruptive Technologies",
    learningObjectives: ["Explain AI, ML, cloud, IoT and big data in student-friendly language.", "Connect each technology to real-world examples.", "Recognise cybersecurity and privacy risks.", "Discuss benefits, limitations and ethical considerations."],
    keyConcepts: ["Artificial Intelligence", "Machine Learning", "Cloud Computing", "Internet of Things", "Big Data", "Cybersecurity", "Privacy and algorithmic bias", "Responsible technology use"],
    remember: ["AI is the broader field; ML is one approach used within AI.", "IoT connects physical devices/sensors to communicate data.", "Cloud computing provides network-accessible computing resources.", "Never share passwords or OTPs; verify suspicious requests independently."],
    mcqs: [mcq("X-DIS-MCQ-01", "easy", "AI", "Which is an example of AI-assisted decision making?", ["A) A fixed ruler", "B) A recommendation system that analyses patterns", "C) A notebook", "D) A USB cable"], "B", "Recommendation systems can analyse patterns to make predictions or suggestions."), mcq("X-DIS-MCQ-02", "medium", "Cloud", "Which statement is a reasonable description of cloud computing?", ["A) Remote access to computing resources over a network", "B) Storing data only on paper", "C) A device without software", "D) A keyboard layout"], "A", "Cloud platforms provide network-accessible computing resources such as storage and processing."), mcq("X-DIS-MCQ-03", "medium", "IoT", "Which device is most clearly an IoT endpoint?", ["A) A standalone pencil", "B) A temperature sensor connected to a network", "C) A printed book", "D) A disconnected chair"], "B", "A connected sensor that sends data is a typical IoT device."), mcq("X-DIS-MCQ-04", "hard", "Ethics", "An AI model gives unfair results because its training data is unbalanced. What is the main issue?", ["A) Data/algorithmic bias", "B) Screen resolution", "C) Compression", "D) File extension"], "A", "Biased data can lead to systematically unfair model outcomes.")],
    practice: [practice("X-DIS-P-01", "easy", "concept", "Explain AI, ML and IoT using one school-related example for each.", "Any accurate school-based examples with a clear distinction earn full credit.", 3), practice("X-DIS-P-02", "medium", "case", "A school stores student files in the cloud. List two benefits and two safety measures.", "Benefits: remote access/backup/collaboration. Safety: strong passwords, MFA, least privilege, secure sharing.", 4), practice("X-DIS-P-03", "hard", "case", "Explain one ethical risk of using AI to rank students and suggest two safeguards.", "Possible risks: bias, lack of transparency, privacy. Safeguards: human review, bias testing, representative data and monitoring.", 4)],
    practicalTasks: ["Prepare an AI-in-education mini project with benefits and risks.", "Map IoT devices used in a smart home/classroom.", "Create a cybersecurity awareness checklist for students."],
    examTips: ["For 4-mark answers, use a definition + example + benefit/risk structure.", "Do not claim technology is always safe or always harmful; mention context and safeguards."]
  }
];

export const ICSE_CLASS_X_CONTENT_MAP = ICSE_CLASS_X_CONTENT.reduce((map, item) => {
  map[item.topicId] = item;
  map[item.slug] = item;
  return map;
}, {});

export function getICSEClassXContent(topicOrSlug) {
  if (!topicOrSlug) return null;
  return ICSE_CLASS_X_CONTENT_MAP[topicOrSlug] || null;
}

export default ICSE_CLASS_X_CONTENT;
