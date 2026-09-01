/**
 * Target95 ISC Class XI Computer Science - student-first content foundation.
 * Section A + core Section B/C starter coverage. Content only; no route changes.
 */

const mcq = (id, difficulty, topic, question, options, correctAnswer, explanation, marks = 1) => ({
  id,
  difficulty,
  topic,
  question,
  options,
  correctAnswer,
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

export const ISC_XI_CONTENT = [
  {
    topicId: "xi-system-of-numeration",
    slug: "system-of-numeration",
    title: "System of Numeration",
    section: "A",
    learningObjectives: ["Convert values among binary, octal, decimal and hexadecimal.", "Explain positional notation and complements.", "Perform binary arithmetic accurately."],
    keyConcepts: ["Number systems and base/radix", "Binary, octal, decimal, hexadecimal", "Conversion methods", "Binary arithmetic", "1's and 2's complement"],
    remember: ["Hexadecimal is base 16 and uses 0-9, A-F.", "Binary subtraction can use 2's complement.", "Each digit has a positional weight based on powers of the base."],
    mcqs: [
      mcq("XI-SN-MCQ-01", "easy", "Bases", "Which base is used by hexadecimal?", ["A) 2", "B) 8", "C) 10", "D) 16"], "D", "Hexadecimal is a base-16 number system."),
      mcq("XI-SN-MCQ-02", "easy", "Conversion", "What is 1011₂ in decimal?", ["A) 9", "B) 10", "C) 11", "D) 12"], "C", "1011₂ = 8 + 2 + 1 = 11."),
      mcq("XI-SN-MCQ-03", "medium", "Hexadecimal", "Which hexadecimal digit represents decimal 15?", ["A) E", "B) F", "C) 10", "D) 15"], "B", "F represents decimal 15 in hexadecimal."),
      mcq("XI-SN-MCQ-04", "hard", "Complements", "How is 2's complement formed?", ["A) Invert bits only", "B) Add 1 to 1's complement", "C) Multiply by 2", "D) Drop leading zeroes"], "B", "2's complement is the 1's complement plus 1."),
    ],
    practice: [
      practice("XI-SN-P-01", "easy", "conversion", "Convert 110101₂ to decimal.", "53", 2),
      practice("XI-SN-P-02", "medium", "conversion", "Convert 157₈ to hexadecimal.", "6F₁₆", 3),
      practice("XI-SN-P-03", "medium", "arithmetic", "Perform 101101₂ + 011011₂.", "1001000₂", 3),
      practice("XI-SN-P-04", "hard", "complements", "Represent -13 using 8-bit 2's complement.", "11110011₂", 3),
    ],
    practicalTasks: ["Build a base-conversion worksheet.", "Implement a menu-driven decimal/binary converter in Java."],
  },
  {
    topicId: "xi-encodings",
    slug: "encodings",
    section: "A",
    title: "Encodings",
    learningObjectives: ["Explain why character encodings are needed.", "Distinguish ASCII, Unicode and UTF encodings.", "Solve basic representation questions."],
    keyConcepts: ["Character sets vs encodings", "ASCII", "Unicode", "UTF-8 and UTF-16 concepts", "Text compatibility"],
    remember: ["Classic ASCII uses 7 bits and has 128 code points.", "Unicode supports a much larger character repertoire.", "UTF-8 is an encoding of Unicode, not a synonym for Unicode."],
    mcqs: [
      mcq("XI-ENC-MCQ-01", "easy", "ASCII", "Classic ASCII uses how many code points?", ["A) 32", "B) 64", "C) 128", "D) 1024"], "C", "ASCII uses 7 bits, giving 128 possible code points."),
      mcq("XI-ENC-MCQ-02", "easy", "Unicode", "What is Unicode mainly designed to do?", ["A) Replace number systems", "B) Represent characters from many scripts", "C) Speed up CPUs", "D) Compress images"], "B", "Unicode provides a common repertoire for many scripts and symbols."),
      mcq("XI-ENC-MCQ-03", "medium", "UTF", "Which statement is accurate?", ["A) UTF-8 is a Unicode encoding", "B) Unicode is only ASCII", "C) UTF-8 is a processor architecture", "D) ASCII and Unicode are unrelated"], "A", "UTF-8 encodes Unicode code points using one to four bytes."),
    ],
    practice: [
      practice("XI-ENC-P-01", "easy", "concept", "Differentiate between a character set and an encoding.", "A character set defines characters/code points; an encoding defines how those characters are represented.", 2),
      practice("XI-ENC-P-02", "medium", "application", "Explain why multilingual websites prefer Unicode-based encodings.", "They can represent characters from many writing systems consistently.", 3),
    ],
    practicalTasks: ["Print multilingual text in Java and discuss encoding compatibility.", "Compare UTF-8 representations of ASCII and non-ASCII characters."],
  },
  {
    topicId: "xi-propositional-logic-hardware",
    slug: "propositional-logic-hardware",
    section: "A",
    title: "Propositional Logic, Hardware Implementation and Arithmetic Operations",
    learningObjectives: ["Evaluate propositions and truth tables.", "Relate Boolean expressions to logic gates.", "Understand basic arithmetic circuits."],
    keyConcepts: ["Propositions and truth values", "AND, OR, NOT, XOR", "Truth tables", "Gate implementation", "Half adder/full adder", "Binary arithmetic hardware"],
    remember: ["AND is true only when both inputs are true.", "OR is true when at least one input is true.", "A half adder produces Sum and Carry.", "A full adder also accepts carry-in."],
    mcqs: [
      mcq("XI-LOG-MCQ-01", "easy", "Gates", "Which gate outputs 1 only when both inputs are 1?", ["A) OR", "B) NOT", "C) AND", "D) XOR"], "C", "AND requires both inputs to be 1."),
      mcq("XI-LOG-MCQ-02", "medium", "Truth Tables", "How many rows are needed for three Boolean inputs?", ["A) 3", "B) 6", "C) 8", "D) 9"], "C", "A truth table for n binary inputs has 2^n rows."),
      mcq("XI-LOG-MCQ-03", "medium", "Adder", "What are the outputs of a half adder?", ["A) Quotient and remainder", "B) Sum and carry", "C) Product and carry", "D) Difference and borrow"], "B", "A half adder adds two bits and outputs sum and carry."),
      mcq("XI-LOG-MCQ-04", "hard", "XOR", "When is XOR true for two inputs?", ["A) Both are 0", "B) Both are 1", "C) Inputs differ", "D) Inputs are ignored"], "C", "XOR is true when the two inputs differ."),
    ],
    practice: [
      practice("XI-LOG-P-01", "easy", "truth-table", "Construct the truth table for A AND (NOT B).", "Output is 1 only for A=1, B=0.", 3),
      practice("XI-LOG-P-02", "medium", "logic", "Simplify A OR (A AND B).", "A", 2),
      practice("XI-LOG-P-03", "hard", "hardware", "Explain the difference between a half adder and a full adder.", "A full adder accepts carry-in in addition to A and B.", 3),
    ],
    practicalTasks: ["Build truth tables for common gates.", "Design a half-adder truth table and logic diagram.", "Simulate binary addition with Java Boolean expressions."],
  },
  {
    topicId: "xi-oop-java",
    slug: "introduction-oop-java",
    section: "B",
    title: "Introduction to Object Oriented Programming using Java",
    learningObjectives: ["Explain core OOP principles with Java examples.", "Understand class/object thinking.", "Write simple classes and instantiate objects."],
    keyConcepts: ["Class, object, state and behaviour", "Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "Java compilation/execution"],
    remember: ["Class = blueprint; object = runtime instance.", "Encapsulation controls access to object state.", "Polymorphism allows a common type to work with different related objects."],
    mcqs: [
      mcq("XI-OOP-MCQ-01", "easy", "OOP", "Which principle bundles data with related methods and controls access?", ["A) Encapsulation", "B) Recursion", "C) Compilation", "D) Parsing"], "A", "Encapsulation combines related state/behaviour and supports controlled access."),
      mcq("XI-OOP-MCQ-02", "medium", "Java", "Which expression creates an object of class Student?", ["A) Student s;", "B) new Student();", "C) object Student();", "D) create Student();"], "B", "new Student() constructs an object; a reference variable can store it."),
      mcq("XI-OOP-MCQ-03", "hard", "Polymorphism", "Which idea best represents polymorphism?", ["A) One class can never have methods", "B) One reference can work with different related object types", "C) Every object needs a unique compiler", "D) All fields must be public"], "B", "Polymorphism lets code use a common type while behaviour varies by the concrete object."),
    ],
    practice: [
      practice("XI-OOP-P-01", "easy", "concept", "Define class, object, state and behaviour using Student.", "Class=blueprint; object=one student; state=name/roll/marks; behaviour=display/calculation.", 3),
      practice("XI-OOP-P-02", "medium", "program", "Create a Java Student class and instantiate two objects.", "Use fields plus a constructor or assignments, then display object state.", 4),
    ],
    practicalTasks: ["Create Student, Rectangle and BankAccount classes.", "Demonstrate encapsulation using private fields and public methods."],
  },
  {
    topicId: "xi-objects",
    slug: "objects",
    section: "B",
    title: "Objects",
    learningObjectives: ["Create and reference objects correctly.", "Distinguish instance state from references.", "Use dot notation and understand object identity."],
    keyConcepts: ["Reference variables", "new keyword", "instance state", "null reference", "dot operator", "object identity"],
    remember: ["A reference variable stores a reference to an object, not the object itself.", "Using a null reference to access an instance member causes NullPointerException.", "Two references can point to the same object."],
    mcqs: [
      mcq("XI-OBJ-MCQ-01", "easy", "References", "What does a reference variable hold?", ["A) A class definition", "B) A reference to an object", "C) Only source code", "D) A package"], "B", "A reference variable identifies an object in memory."),
      mcq("XI-OBJ-MCQ-02", "medium", "Null", "What commonly happens when an instance method is called through null?", ["A) Compilation always succeeds and prints 0", "B) NullPointerException", "C) NumberFormatException", "D) StackOverflowError"], "B", "A null reference does not identify an object and cannot be dereferenced."),
    ],
    practice: [practice("XI-OBJ-P-01", "easy", "concept", "Explain the difference between a class, object and reference variable.", "Class=blueprint; object=instance; reference variable=variable that refers to an object.", 3), practice("XI-OBJ-P-02", "medium", "output", "Trace two references assigned to the same object and predict the final state.", "Both references modify the same object because they point to the same instance.", 3)],
    practicalTasks: ["Create two references to one Student object and demonstrate shared state.", "Demonstrate a null reference and safely check it before use."],
  },
  {
    topicId: "xi-primitive-wrapper-casting",
    slug: "primitive-wrapper-casting",
    section: "B",
    title: "Primitive Values, Wrapper Classes, Types and Casting",
    learningObjectives: ["Distinguish primitive and reference types.", "Use wrapper classes and boxing/unboxing.", "Apply widening and narrowing conversions safely."],
    keyConcepts: ["Primitive types", "Integer, Double, Character, Boolean", "Autoboxing/unboxing", "Widening conversion", "Narrowing cast", "parse methods"],
    remember: ["Widening is generally automatic; narrowing usually requires an explicit cast.", "Wrapper classes are objects corresponding to primitive types.", "Narrowing may lose information."],
    mcqs: [
      mcq("XI-CAST-MCQ-01", "easy", "Wrappers", "What is the wrapper class of int?", ["A) Int", "B) Integer", "C) Number", "D) LongInt"], "B", "Integer wraps the primitive int."),
      mcq("XI-CAST-MCQ-02", "medium", "Casting", "Which is a widening conversion?", ["A) double to int", "B) int to double", "C) long to byte", "D) double to short"], "B", "An int can widen to double without an explicit cast."),
      mcq("XI-CAST-MCQ-03", "hard", "Parsing", "What does Integer.parseInt(\"42\") return?", ["A) String", "B) Integer object only", "C) int 42", "D) double 42.0"], "C", "parseInt returns the primitive int value 42."),
    ],
    practice: [practice("XI-CAST-P-01", "easy", "concept", "Differentiate widening and narrowing conversion.", "Widening moves to a type that can represent the range more safely; narrowing may lose information and needs a cast.", 3), practice("XI-CAST-P-02", "hard", "program", "Show autoboxing and unboxing between int and Integer.", "Integer x = 10; int y = x;", 2)],
    practicalTasks: ["Create a type-conversion demonstration program.", "Compare parseInt/parseDouble with explicit casting."],
  },
  {
    topicId: "xi-variables-expressions",
    slug: "variables-expressions",
    section: "B",
    title: "Variables, Expressions",
    learningObjectives: ["Declare and initialise variables with correct types.", "Evaluate arithmetic and logical expressions.", "Apply precedence and associativity correctly."],
    keyConcepts: ["Declaration and initialisation", "Literals and constants", "Arithmetic/relational/logical operators", "Type compatibility", "Precedence and associativity", "Compound assignment"],
    remember: ["= assigns; == compares.", "Integer division discards the fractional part.", "Parentheses can make intended evaluation explicit."],
    mcqs: [
      mcq("XI-VAR-MCQ-01", "easy", "Operators", "What does x += 3 mean?", ["A) x = 3", "B) x = x + 3", "C) x = x - 3", "D) x == x + 3"], "B", "Compound addition assignment means x = x + 3."),
      mcq("XI-VAR-MCQ-02", "medium", "Expressions", "What is the result of 7 / 2 when both operands are int?", ["A) 3", "B) 3.5", "C) 4", "D) 2.5"], "A", "Integer division produces the integer quotient 3."),
      mcq("XI-VAR-MCQ-03", "hard", "Precedence", "What is 5 + 3 * 2?", ["A) 16", "B) 11", "C) 13", "D) 10"], "B", "Multiplication is evaluated before addition."),
    ],
    practice: [practice("XI-VAR-P-01", "easy", "output", "Predict the output of an integer expression using precedence.", "Evaluate multiplication/division before addition/subtraction unless parentheses override it.", 2), practice("XI-VAR-P-02", "medium", "program", "Build a marks calculator using integer and double variables.", "Use suitable variable types and explicit conversions where needed.", 4)],
    practicalTasks: ["Create an expression evaluator worksheet.", "Build a simple student marks percentage calculator."],
  },
  {
    topicId: "xi-statements-scope",
    slug: "statements-scope",
    section: "B",
    title: "Statements, Scope",
    learningObjectives: ["Use selection and iteration statements correctly.", "Trace nested blocks and variable scope.", "Choose appropriate control structures for a task."],
    keyConcepts: ["if/else", "switch", "for/while/do-while", "break and continue", "Block scope", "Local, instance and class scope"],
    remember: ["A local variable is accessible only within its declared scope.", "do-while executes at least once.", "break exits the nearest enclosing loop or switch."],
    mcqs: [
      mcq("XI-SCOPE-MCQ-01", "easy", "Scope", "Where is a local variable normally accessible?", ["A) Anywhere in the project", "B) Within its enclosing scope", "C) Only in another class", "D) Only in static methods"], "B", "Scope limits where a declared variable can be referenced."),
      mcq("XI-SCOPE-MCQ-02", "medium", "Loops", "Which loop is exit-controlled?", ["A) for", "B) while", "C) do-while", "D) enhanced for"], "C", "do-while checks its condition after the body executes."),
    ],
    practice: [practice("XI-SCOPE-P-01", "easy", "debugging", "Identify why a variable declared inside an if block cannot be used outside it.", "Its scope ends at the closing brace of the block.", 2), practice("XI-SCOPE-P-02", "medium", "program", "Write a menu-driven program using switch and loops.", "Use a loop for repeated menu display and switch for choices.", 5)],
    practicalTasks: ["Build a menu-driven calculator.", "Trace variable scope in nested blocks with comments."],
  },
  {
    topicId: "xi-methods-constructors",
    slug: "methods-constructors",
    section: "B",
    title: "Methods and Constructors",
    learningObjectives: ["Write instance/static methods with parameters and return values.", "Use constructors to initialise objects.", "Apply overloading and constructor chaining."],
    keyConcepts: ["Method declaration/call", "Parameters and return", "Constructors", "Default and parameterized constructors", "Overloading", "this()"],
    remember: ["A constructor has no return type.", "Overloading requires different parameter lists.", "this() must be the first statement of a constructor."],
    mcqs: [
      mcq("XI-METH-MCQ-01", "easy", "Methods", "Which keyword indicates no return value?", ["A) null", "B) void", "C) none", "D) empty"], "B", "void is used for methods that return no value."),
      mcq("XI-METH-MCQ-02", "medium", "Constructors", "Which statement about a constructor is correct?", ["A) It must be static", "B) It can have a return type", "C) Its name matches the class", "D) It is inherited"], "C", "A constructor uses the class name and has no return type."),
    ],
    practice: [practice("XI-METH-P-01", "easy", "program", "Write a method that returns the largest of three integers.", "Use comparisons or Math.max and return the result.", 3), practice("XI-METH-P-02", "hard", "program", "Create a Student class with overloaded constructors and a display method.", "Provide multiple constructors with different parameter lists.", 5)],
    practicalTasks: ["Student result class with overloaded constructors.", "Utility class with overloaded area methods.", "Constructor-chaining example using this()."],
  },
  {
    topicId: "xi-arrays-strings",
    slug: "arrays-strings",
    section: "B",
    title: "Arrays, Strings",
    learningObjectives: ["Process one-dimensional arrays systematically.", "Use core String operations accurately.", "Combine arrays/strings with methods and loops."],
    keyConcepts: ["Array declaration/traversal", "Searching and sorting", "String length/charAt/substring", "equals/compareTo", "String immutability", "Array arguments"],
    remember: ["Array indexes begin at 0.", "Binary search requires sorted data.", "Use equals for String content comparison.", "String.length() is a method; array.length is a field."],
    mcqs: [
      mcq("XI-AS-MCQ-01", "easy", "Arrays", "What is the first valid array index?", ["A) 0", "B) 1", "C) -1", "D) Depends"], "A", "Java arrays are zero-indexed."),
      mcq("XI-AS-MCQ-02", "medium", "Strings", "Which method compares String content?", ["A) =", "B) ==", "C) equals", "D) compare"], "C", "equals compares String contents."),
      mcq("XI-AS-MCQ-03", "hard", "Arrays", "Which search requires sorted data?", ["A) Linear", "B) Binary", "C) Sequential", "D) Simple traversal"], "B", "Binary search relies on sorted ordering."),
    ],
    practice: [practice("XI-AS-P-01", "medium", "program", "Write a method to count vowels in a String.", "Traverse the string and count a/e/i/o/u, preferably case-insensitively.", 3), practice("XI-AS-P-02", "hard", "program", "Sort an integer array using selection sort and then search for a target using binary search.", "Sort first, then perform binary search on the sorted array.", 6)],
    practicalTasks: ["Array statistics program.", "Selection sort + binary search.", "String palindrome/frequency program.", "Word-length analysis in a sentence."],
  },
  {
    topicId: "xi-text-file-handling",
    slug: "text-file-handling",
    section: "B",
    title: "Basic Input/Output and Text File Handling",
    learningObjectives: ["Read console input correctly.", "Understand text-file reading/writing flow.", "Handle basic I/O errors responsibly."],
    keyConcepts: ["Standard input/output", "Scanner and BufferedReader concepts", "FileReader/FileWriter concepts", "Try-with-resources", "IOException"],
    remember: ["Always close file resources or use try-with-resources.", "File operations can fail and may require exception handling.", "Text files store characters rather than Java objects."],
    mcqs: [
      mcq("XI-IO-MCQ-01", "easy", "Input", "Which class is commonly used for token-based console input in Java?", ["A) Scanner", "B) File", "C) Thread", "D) Math"], "A", "Scanner is commonly used for console input."),
      mcq("XI-IO-MCQ-02", "medium", "Files", "Which exception is commonly associated with file I/O operations?", ["A) IOException", "B) ArithmeticException", "C) ClassCastException", "D) IllegalMonitorStateException"], "A", "IOException represents many I/O failures."),
    ],
    practice: [practice("XI-IO-P-01", "medium", "program", "Read a text file and count the number of lines.", "Read line by line, incrementing a counter until EOF.", 4), practice("XI-IO-P-02", "hard", "program", "Copy the contents of one text file into another.", "Read the source and write each line to the destination, safely closing resources.", 5)],
    practicalTasks: ["Line/word/character counter for a text file.", "Text-file copy utility.", "Simple log file analyser."],
  },
  {
    topicId: "xi-python",
    slug: "introduction-python",
    section: "C",
    title: "Introduction to Python",
    learningObjectives: ["Understand Python syntax and basic data types.", "Write small input/output and control-flow programs.", "Use functions and lists at an introductory level."],
    keyConcepts: ["Python syntax/indentation", "Variables and types", "Input/output", "if/elif/else", "for/while", "Functions", "Lists and strings"],
    remember: ["Indentation is syntactically significant in Python.", "input() returns text unless converted.", "Python lists are mutable and zero-indexed."],
    mcqs: [
      mcq("XI-PY-MCQ-01", "easy", "Syntax", "Which keyword defines a Python function?", ["A) function", "B) def", "C) fun", "D) method"], "B", "Python functions are defined using def."),
      mcq("XI-PY-MCQ-02", "medium", "Input", "What type does input() return by default?", ["A) int", "B) float", "C) str", "D) bool"], "C", "input() returns a string; numeric conversion is explicit."),
    ],
    practice: [practice("XI-PY-P-01", "easy", "program", "Write a Python program to accept two numbers and print their sum.", "Convert input to int/float, add and print.", 2), practice("XI-PY-P-02", "medium", "program", "Write a Python function to return the largest element of a list.", "Use iteration or max() and return the result.", 3)],
    practicalTasks: ["Calculator in Python.", "List statistics program.", "Menu-driven student marks utility.", "Text word counter."],
  },
  {
    topicId: "xi-trends-ethics",
    slug: "trends-ethics",
    section: "C",
    title: "Trends in Computing and Ethical Issues",
    learningObjectives: ["Identify major computing trends.", "Discuss privacy, security, bias and responsible use.", "Evaluate technology choices using ethical reasoning."],
    keyConcepts: ["AI/ML", "Cloud computing", "IoT", "Big Data", "Cybersecurity", "Privacy", "Bias", "Digital responsibility"],
    remember: ["Technology benefits and risks depend on context and safeguards.", "Protect personal data and verify suspicious requests.", "AI systems can inherit bias from data and design."],
    mcqs: [
      mcq("XI-ETH-MCQ-01", "easy", "AI", "Which is an ethical concern in AI systems?", ["A) Bias", "B) Keyboard layout", "C) Monitor size", "D) File naming"], "A", "Bias can lead to unfair outcomes and is a major AI ethics issue."),
      mcq("XI-ETH-MCQ-02", "medium", "Privacy", "Which is a good privacy practice?", ["A) Share passwords", "B) Use strong unique passwords and appropriate access controls", "C) Publish all personal data", "D) Disable updates"], "B", "Strong access controls reduce unnecessary exposure."),
      mcq("XI-ETH-MCQ-03", "hard", "Cyber safety", "A suspicious message asks for a student portal password. What is the best first action?", ["A) Share it quickly", "B) Verify the sender through an official channel", "C) Forward it to everyone", "D) Disable security"], "B", "Independent verification helps prevent phishing and credential theft."),
    ],
    practice: [practice("XI-ETH-P-01", "medium", "case", "A school wants to use AI to rank students. Identify two risks and two safeguards.", "Risks may include bias and opacity; safeguards include human review, representative data, testing and monitoring.", 4), practice("XI-ETH-P-02", "hard", "essay", "Discuss one benefit and one risk of IoT in a smart school.", "Benefit: automation/monitoring. Risk: privacy/security exposure.", 3)],
    practicalTasks: ["AI ethics case study.", "Cybersecurity awareness poster/content brief.", "Privacy checklist for a smart classroom."],
    boardPractice: [
      practice("XI-ETH-BP-01", "hard", "case", "A school proposes facial recognition for attendance. Analyse two benefits, two privacy/security risks, and two safeguards.", "Benefits: automation and attendance accuracy. Risks: biometric-data exposure and false matches. Safeguards: informed policy/consent where applicable, strict access control, retention limits, testing and human review.", 6),
      practice("XI-ETH-BP-02", "hard", "essay", "Explain why an AI model should be tested for bias before being used for high-impact student decisions.", "Training data and system design can create unequal outcomes; representative evaluation, subgroup testing, human oversight and monitoring reduce risk.", 5),
    ],
  },
];

export const ISC_XI_CONTENT_MAP = ISC_XI_CONTENT.reduce((map, topic) => {
  map[topic.topicId] = topic;
  map[topic.slug] = topic;
  return map;
}, {});

export function getISCClassXIContent(topicOrSlug) {
  if (!topicOrSlug) return null;
  return ISC_XI_CONTENT_MAP[topicOrSlug] || null;
}

export default ISC_XI_CONTENT;
