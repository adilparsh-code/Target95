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
    learningObjectives: [
      "Convert values confidently among binary, octal, decimal and hexadecimal representations.",
      "Use place value and positional notation to explain conversions.",
      "Perform binary arithmetic and use complements correctly.",
    ],
    keyConcepts: [
      "Positional number systems and base/radix",
      "Binary, octal, decimal and hexadecimal",
      "Repeated division and multiplication conversion methods",
      "Binary addition, subtraction and multiplication",
      "1's and 2's complement",
    ],
    remember: [
      "Binary digits are 0 and 1; hexadecimal uses 0-9 and A-F.",
      "In positional notation, each digit is weighted by a power of the base.",
      "Binary subtraction can be performed using 2's complement.",
    ],
    mcqs: [
      mcq("XI-SN-MCQ-01", "easy", "Bases", "Which base is used by the hexadecimal number system?", ["A) 2", "B) 8", "C) 10", "D) 16"], "D", "Hexadecimal is a base-16 positional number system."),
      mcq("XI-SN-MCQ-02", "easy", "Conversion", "What is binary 1011 in decimal?", ["A) 9", "B) 10", "C) 11", "D) 12"], "C", "1011₂ = 8 + 2 + 1 = 11."),
      mcq("XI-SN-MCQ-03", "medium", "Hexadecimal", "Which hexadecimal digit represents decimal 15?", ["A) E", "B) F", "C) 10", "D) 15"], "B", "Hexadecimal uses A=10, B=11, C=12, D=13, E=14 and F=15."),
      mcq("XI-SN-MCQ-04", "hard", "Complements", "In n-bit binary arithmetic, the 2's complement is obtained by:", ["A) Inverting every bit only", "B) Adding 1 to the 1's complement", "C) Multiplying by 2", "D) Removing leading zeroes"], "B", "2's complement = 1's complement + 1."),
    ],
    practice: [
      practice("XI-SN-P-01", "easy", "conversion", "Convert 110101₂ to decimal.", "53", 2),
      practice("XI-SN-P-02", "medium", "conversion", "Convert 157₈ to hexadecimal.", "6F₁₆", 3),
      practice("XI-SN-P-03", "medium", "arithmetic", "Perform 101101₂ + 011011₂.", "1001000₂", 3),
      practice("XI-SN-P-04", "hard", "complements", "Represent -13 using 8-bit 2's complement.", "11110011₂", 3),
    ],
    practicalTasks: [
      "Build a base-conversion worksheet covering all four number systems.",
      "Implement a menu-driven decimal/binary converter in Java.",
    ],
  },
  {
    topicId: "xi-encodings",
    slug: "encodings",
    section: "A",
    title: "Encodings",
    learningObjectives: ["Explain why character encodings are needed.", "Distinguish ASCII, Unicode and UTF-style encodings at a conceptual level.", "Solve small encoding and representation questions."],
    keyConcepts: ["Character sets vs encodings", "ASCII", "Unicode", "UTF-8/UTF-16 concepts", "Text representation and compatibility"],
    remember: ["ASCII covers a limited set of characters; Unicode supports a far larger repertoire.", "An encoding specifies how characters are represented as bytes/code units.", "Unicode is a character standard; UTF-8 is one encoding of Unicode."],
    mcqs: [
      mcq("XI-ENC-MCQ-01", "easy", "ASCII", "ASCII was originally designed for approximately how many basic code points?", ["A) 32", "B) 64", "C) 128", "D) 1024"], "C", "Classic ASCII uses 7 bits, giving 128 code points."),
      mcq("XI-ENC-MCQ-02", "easy", "Unicode", "What is the primary purpose of Unicode?", ["A) Replace all number systems", "B) Represent characters from many writing systems", "C) Speed up processors", "D) Compress images"], "B", "Unicode provides a universal character repertoire for many scripts and symbols."),
      mcq("XI-ENC-MCQ-03", "medium", "UTF", "Which statement is most accurate?", ["A) UTF-8 is a Unicode encoding", "B) Unicode is only ASCII", "C) UTF-8 is a processor architecture", "D) ASCII and Unicode are unrelated"], "A", "UTF-8 is a variable-length encoding used to represent Unicode code points."),
    ],
    practice: [
      practice("XI-ENC-P-01", "easy", "concept", "Differentiate between a character set and an encoding.", "A character set defines characters/code points; an encoding defines how those characters are represented in bytes/code units.", 2),
      practice("XI-ENC-P-02", "medium", "application", "Explain why a modern multilingual website should prefer a Unicode-based encoding.", "It can represent characters from many scripts consistently and avoid legacy encoding limitations.", 3),
    ],
    practicalTasks: ["Create a small Java program that prints characters from different scripts and discuss encoding compatibility.", "Compare the byte representation of a few ASCII and non-ASCII characters in UTF-8."],
  },
  {
    topicId: "xi-propositional-logic-hardware",
    slug: "propositional-logic-hardware",
    section: "A",
    title: "Propositional Logic, Hardware Implementation and Arithmetic Operations",
    learningObjectives: ["Evaluate propositions and logic expressions.", "Relate Boolean operations to logic gates.", "Understand basic hardware implementation and arithmetic circuits."],
    keyConcepts: ["Propositions and truth values", "AND, OR, NOT and derived gates", "Truth tables", "Logic gate implementation", "Half adder/full adder concepts", "Binary arithmetic hardware"],
    remember: ["AND is true only when both inputs are true.", "OR is true when at least one input is true.", "NOT reverses the truth value.", "A half adder adds two bits and produces sum and carry outputs."],
    mcqs: [
      mcq("XI-LOG-MCQ-01", "easy", "Gates", "Which gate outputs 1 only when both inputs are 1?", ["A) OR", "B) NOT", "C) AND", "D) XOR"], "C", "AND outputs true only when both inputs are true."),
      mcq("XI-LOG-MCQ-02", "medium", "Truth Tables", "How many rows are needed for a truth table with three Boolean inputs?", ["A) 3", "B) 6", "C) 8", "D) 9"], "C", "A truth table with n binary variables has 2^n rows; for 3 variables, 8 rows."),
      mcq("XI-LOG-MCQ-03", "medium", "Adder", "What are the two outputs of a half adder?", ["A) Quotient and remainder", "B) Sum and carry", "C) Product and carry", "D) Difference and borrow"], "B", "A half adder produces sum and carry."),
      mcq("XI-LOG-MCQ-04", "hard", "XOR", "For two inputs, XOR is true when:", ["A) Both are 0", "B) Both are 1", "C) The inputs are different", "D) Either input is ignored"], "C", "XOR is true when the two Boolean inputs differ."),
    ],
    practice: [
      practice("XI-LOG-P-01", "easy", "truth-table", "Construct the truth table for A AND (NOT B).", "Four rows with output 1 only when A=1 and B=0.", 3),
      practice("XI-LOG-P-02", "medium", "logic", "Simplify the proposition A OR (A AND B).", "A, by the absorption law.", 2),
      practice("XI-LOG-P-03", "hard", "hardware", "Explain how a full adder differs from a half adder.", "A full adder also accepts an input carry, so it adds A, B and Cin and produces Sum and Cout.", 3),
    ],
    practicalTasks: ["Build truth tables for common gates.", "Design a half-adder truth table and logic diagram.", "Simulate a simple binary adder with Java Boolean expressions."],
  },
  {
    topicId: "xi-oop-java",
    slug: "introduction-oop-java",
    section: "B",
    title: "Introduction to Object Oriented Programming using Java",
    learningObjectives: ["Explain core OOP principles using Java examples.", "Understand class/object thinking before implementation details.", "Write simple Java classes and instantiate objects."],
    keyConcepts: ["Class, object, state and behaviour", "Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "Java source, compilation and execution"],
    remember: ["Class = blueprint; object = runtime instance.", "Encapsulation bundles data and behaviour and controls access.", "Polymorphism allows a common interface to represent different implementations."],
    mcqs: [
      mcq("XI-OOP-MCQ-01", "easy", "OOP", "Which OOP principle focuses on bundling data with related methods and controlling access?", ["A) Encapsulation", "B) Recursion", "C) Compilation", "D) Parsing"], "A", "Encapsulation combines state/behaviour and supports controlled access."),
      mcq("XI-OOP-MCQ-02", "medium", "Java", "Which statement creates an object of class Student?", ["A) Student s;", "B) new Student();", "C) object Student();", "D) create Student();"], "B", "new Student() creates the object; Student s can hold the reference when combined in a declaration."),
      mcq("XI-OOP-MCQ-03", "hard", "Polymorphism", "Which idea best represents polymorphism?", ["A) One class can never have methods", "B) One reference/interface can work with objects of different related classes", "C) Every object must have a unique compiler", "D) All data must be public"], "B", "Polymorphism lets code work through a common type while concrete behaviour varies."),
    ],
    practice: [
      practice("XI-OOP-P-01", "easy", "concept", "Define class, object, state and behaviour with a Student example.", "Class=Student blueprint; object=one student; state=name/roll/marks; behaviour=display/calculate methods.", 3),
      practice("XI-OOP-P-02", "medium", "program", "Create a simple Java Student class and instantiate two objects.", "Use fields, a constructor or assignments, and display the object state.", 4),
    ],
    practicalTasks: ["Create Student, Rectangle and BankAccount classes.", "Demonstrate encapsulation with private fields and methods."],
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
