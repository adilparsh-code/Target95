export const ISC_XI_CHAPTER_ENHANCEMENTS = {
  "xi-system-of-numeration": {
    overview: "Number systems represent values using different bases. For ISC XI, you should be able to convert between decimal, binary, octal and hexadecimal, perform binary arithmetic, and use 1's and 2's complement confidently.",
    sections: [
      { title: "Positional number systems", points: ["Decimal uses base 10 and place values 10^0, 10^1, 10^2, ... .", "Binary uses base 2 and only the digits 0 and 1.", "Octal uses base 8; hexadecimal uses base 16 with A-F representing 10-15.", "The value of a digit is digit × base^position, counted from the right starting at position 0."], example: "101101₂ = 1×2^5 + 0×2^4 + 1×2^3 + 1×2^2 + 0×2^1 + 1×2^0 = 45₁₀." },
      { title: "Binary ↔ octal and hexadecimal", points: ["For binary to octal, group bits in sets of 3 from the right.", "For binary to hexadecimal, group bits in sets of 4 from the right.", "Pad the leftmost group with zeroes when necessary; padding does not change the value."], example: "11010110₂ → 1101 0110 → D6₁₆; and 11 010 110 → 326₈." },
      { title: "1's complement", points: ["1's complement is formed by changing every 0 to 1 and every 1 to 0.", "For an 8-bit value, keep exactly 8 bits while taking the complement.", "Example: 00101101 → 11010010."], example: "1's complement of 01010110₂ is 10101001₂." },
      { title: "2's complement", points: ["Start with the binary value and form its 1's complement.", "Add 1 to the 1's complement, keeping the fixed bit width.", "For 8-bit signed representation, the most significant bit indicates a negative value when it is 1.", "Example for −13: +13 = 00001101 → 1's complement 11110010 → +1 = 11110011."], example: "8-bit 2's complement of +18: 00010010 → 11101101 → 11101110 for −18." },
      { title: "Binary subtraction using 2's complement", points: ["Write the minuend and subtrahend using the same number of bits.", "Take the 2's complement of the subtrahend.", "Add it to the minuend.", "If an end carry occurs, discard it for a positive result in fixed-width arithmetic.", "If there is no end carry, interpret the result using 2's complement."], example: "7 − 3 (4-bit): 0111 + 1101 = 1 0100 → discard carry → 0100₂ = 4." },
      { title: "Exam traps", points: ["Do not confuse 1's complement with 2's complement: 2's complement = 1's complement + 1.", "Never mix bit widths while adding complements.", "Do not discard an end carry before completing the binary addition.", "For conversions, show place values or grouping so the working can be reproduced in an examination."] }
    ],
    quickPractice: [
      { question: "Convert 101011₂ to decimal.", answer: "43₁₀" },
      { question: "Find the 1's complement of 00110110₂.", answer: "11001001₂" },
      { question: "Find the 8-bit 2's complement of 25.", answer: "11100111₂" },
      { question: "Use 8-bit 2's complement to calculate 18 − 7.", answer: "00001011₂" }
    ]
  },

  "xi-encodings": {
    overview: "Understand how characters are represented and encoded so that text can be stored, exchanged and displayed consistently.",
    sections: [
      { title: "Character sets and encodings", points: ["A character set defines characters and their code points.", "An encoding defines how code points are represented as bytes or code units.", "Classic ASCII uses 7 bits and provides 128 code points."] },
      { title: "Unicode and UTF", points: ["Unicode provides a common repertoire for scripts and symbols.", "UTF-8 is a variable-length Unicode encoding and preserves ASCII compatibility.", "UTF-16 uses 16-bit code units and can represent characters outside the Basic Multilingual Plane with surrogate pairs."], example: "The key distinction: Unicode is the character repertoire; UTF-8/UTF-16 are encodings." },
      { title: "Exam traps", points: ["Do not call UTF-8 the same thing as Unicode.", "Do not assume every character occupies one byte in UTF-8.", "ASCII is a subset of Unicode code points in modern Unicode usage."] }
    ],
    quickPractice: [{ question: "Why is Unicode useful for multilingual applications?", answer: "It provides a common character repertoire that can represent many writing systems and symbols." }]
  },

  "xi-propositional-logic-hardware": {
    overview: "Connect propositional logic, truth tables and logic gates to binary arithmetic hardware such as half adders and full adders.",
    sections: [
      { title: "Propositions and truth tables", points: ["A proposition has a definite truth value: true or false.", "NOT reverses a truth value; AND requires both inputs true; OR requires at least one true input.", "XOR is true when inputs differ. For n Boolean inputs, a complete truth table has 2^n rows."], example: "A AND (NOT B) is true only for A=1 and B=0." },
      { title: "Logic gates", points: ["AND, OR and NOT implement basic Boolean operations.", "NAND and NOR are universal gates: any Boolean circuit can be built from either family.", "XOR and XNOR are especially useful for comparing bits and building arithmetic circuits."] },
      { title: "Half adder and full adder", points: ["A half adder adds A and B and produces Sum and Carry.", "A full adder adds A, B and carry-in, producing Sum and Carry-out.", "Binary carry is the bridge between arithmetic rules and gate-level hardware."], example: "Half-adder: Sum = A XOR B; Carry = A AND B." },
      { title: "Exam traps", points: ["Do not confuse XOR with OR.", "A full adder has a carry-in; a half adder does not.", "Always include all 2^n combinations when constructing a complete truth table."] }
    ],
    quickPractice: [{ question: "How many rows are required for four Boolean inputs?", answer: "16" }, { question: "State the half-adder equations.", answer: "Sum = A XOR B; Carry = A AND B." }]
  },

  "xi-oop-java": {
    overview: "Learn Java as an object-oriented language: model entities as classes, create objects, expose behaviour through methods and control access to state.",
    sections: [
      { title: "Class, object and interface", points: ["A class defines a user-defined type with state and behaviour.", "An object is an instance of a class created at runtime.", "A useful interface exposes behaviour without requiring the user to know implementation details."] },
      { title: "JVM, compilation and execution", points: ["javac compiles Java source into bytecode stored in class files.", "The JVM executes bytecode, allowing the same compiled program to run on systems with a compatible JVM.", "Compilation errors stop class generation; runtime errors occur while the program executes."], example: "Source.java → javac → Source.class (bytecode) → JVM → execution." },
      { title: "Exceptions", points: ["An exception represents an abnormal condition during execution.", "try encloses risky code; catch handles a matching exception; finally is used for cleanup that should run after the try/catch flow.", "throw explicitly raises an exception; throws declares exceptions that a method may pass to its caller."] },
      { title: "Exam traps", points: ["Do not describe bytecode as native machine code for one specific processor.", "Do not confuse compile-time errors with exceptions raised during execution.", "A catch block must match or be compatible with the thrown exception type."] }
    ],
    quickPractice: [{ question: "What is the role of the JVM?", answer: "It provides the runtime environment that executes Java bytecode." }, { question: "Differentiate throw and throws.", answer: "throw explicitly throws an exception; throws declares exceptions that a method may propagate." }]
  },

  "xi-objects": {
    overview: "Trace object creation, references, instance state and member access accurately.",
    sections: [
      { title: "Objects and references", points: ["A reference variable identifies an object; it is not the object itself.", "new creates an object and returns a reference to it.", "Two references can point to the same object, so a change through one reference is visible through the other."] },
      { title: "Member access and null", points: ["The dot operator accesses members through a reference.", "A null reference identifies no object and cannot be dereferenced safely.", "Use explicit reference checks when a value may be null."], example: "Student a = new Student(); Student b = a; changes through b affect the same Student object." }
    ],
    quickPractice: [{ question: "What happens if an instance member is accessed through null?", answer: "A NullPointerException occurs at runtime." }]
  },

  "xi-primitive-wrapper-casting": {
    overview: "Use primitive types, their wrapper classes and Java's automatic and explicit type conversion correctly.",
    sections: [
      { title: "Primitive and wrapper types", points: ["Java primitive types include byte, short, int, long, float, double, char and boolean.", "Each primitive numeric/character/boolean type has a corresponding wrapper class such as Integer, Double, Character and Boolean.", "Wrapper objects can participate where object references are required."] },
      { title: "Widening and narrowing", points: ["Widening conversions generally move to a type with a wider range and can be implicit.", "Narrowing conversions may lose information and normally require an explicit cast.", "Autoboxing converts a primitive to its wrapper; unboxing converts a wrapper to its primitive."], example: "int n = 10; double d = n; int m = (int) 10.8; Integer boxed = n; int unboxed = boxed;" },
      { title: "Exam traps", points: ["A cast does not magically preserve lost fractional or out-of-range information.", "Do not confuse parsing a String with numeric casting.", "Unboxing null can cause NullPointerException."] }
    ],
    quickPractice: [{ question: "Which is widening: int→double or double→int?", answer: "int→double." }]
  },

  "xi-variables-expressions": {
    overview: "Evaluate Java expressions by respecting types, precedence, associativity and assignment semantics.",
    sections: [
      { title: "Variables and constants", points: ["A variable names a value and has a declared type.", "final can create a named constant whose value cannot be reassigned after initialization.", "The left-hand side of assignment denotes the destination; the right-hand side supplies the value."], example: "int i = 4; i = i + 2; leaves i equal to 6." },
      { title: "Operators and evaluation", points: ["Arithmetic, relational, logical and assignment operators form expressions.", "Parentheses make intended precedence explicit.", "Integer division produces an integer result when both operands are integral types."] }
    ],
    quickPractice: [{ question: "What is 7/2 when both operands are int?", answer: "3" }, { question: "What is the difference between = and ==?", answer: "= assigns a value; == tests equality." }]
  },

  "xi-statements-scope": {
    overview: "Master conditional statements, loops, control-flow statements and variable scope.",
    sections: [
      { title: "Selection", points: ["Use if/else for conditions and switch when selecting among cases.", "The ternary operator is a compact expression form for a two-way choice.", "Conditions are evaluated before the controlled statement or block executes."] },
      { title: "Iteration and control", points: ["for, while and do-while repeat work with different test timing.", "break exits the nearest loop or switch; continue skips to the next loop iteration.", "Nested loops require careful tracing of each iteration."], example: "do-while executes its body at least once because its condition is checked after the body." },
      { title: "Scope and visibility", points: ["A block can introduce a local scope.", "Method parameters and local variables are visible within their allowed method/block scope.", "Class-level fields have class/instance scope and may be hidden by local names; use this when needed to refer to the current object's field."] }
    ],
    quickPractice: [{ question: "Which loop guarantees at least one execution?", answer: "do-while." }]
  },

  "xi-methods-constructors": {
    overview: "Use methods and constructors as abstractions for reusable operations and object initialization.",
    sections: [
      { title: "Methods", points: ["A method has a return type, name, formal parameters and a body.", "Arguments are supplied at the call site and matched to formal parameters.", "Java passes arguments by value; for object variables the copied value is the object reference."], example: "int square(int n) { return n*n; }" },
      { title: "Static, this and constructors", points: ["Static members belong to the class rather than one particular object.", "this refers to the current object and is useful for disambiguating fields from parameters.", "A constructor initializes a newly created object and may be overloaded with different parameter lists.", "this() can chain one constructor to another and must appear as the first constructor statement."] },
      { title: "Algorithmic problem solving", points: ["Methods should separate a problem into clear, testable operations.", "Number problems and mathematical algorithms should show inputs, processing, outputs and boundary cases."] }
    ],
    quickPractice: [{ question: "What is the purpose of this?", answer: "It refers to the current object." }, { question: "Where must this() appear in a constructor?", answer: "As the first statement." }]
  },

  "xi-arrays-strings": {
    overview: "Use one-dimensional and multi-dimensional arrays and the String class for structured-data algorithms.",
    sections: [
      { title: "Arrays", points: ["An array stores elements of one declared type and uses zero-based indexing.", "For int[][] a, a.length is the number of rows and a[i].length is the number of columns in row i.", "Common algorithms include maximum/minimum, searching and sorting."], example: "For a 3×4 matrix, valid row indices are 0..2 and column indices are 0..3." },
      { title: "Sorting and searching", points: ["Bubble, selection and insertion sort should be traceable by hand.", "Linear search scans sequentially; binary search requires sorted data and repeatedly halves the search range.", "Always state the condition that determines whether a search succeeds."] },
      { title: "Strings", points: ["String is a Java library class for text.", "Core operations include length, charAt, substring, concatenation, replacement and indexOf.", "String values are immutable, so operations produce a resulting String rather than changing the original characters in place."] },
      { title: "Exam traps", points: ["Do not use a.length as the number of columns in every rectangular matrix.", "Array indices start at zero.", "Do not apply binary search to unsorted data without first sorting it."] }
    ],
    quickPractice: [{ question: "What gives the number of columns in the first row of int[][] a?", answer: "a[0].length" }, { question: "What prerequisite does binary search need?", answer: "The data must be sorted according to the search order." }]
  },

  "xi-text-file-handling": {
    overview: "Practise standard input, tokenisation and safe text-file processing while understanding input/output exceptions.",
    sections: [
      { title: "Scanner and tokens", points: ["Scanner reads tokens or values from an input stream.", "Whitespace commonly separates tokens; nextInt, nextDouble and nextLine read different forms of input.", "Mixing token methods and nextLine requires awareness of the remaining line separator."] },
      { title: "Text files", points: ["Reading a text file means opening a stream, processing characters/lines and closing the resource.", "Writing follows the same resource lifecycle: open, write, flush/close.", "File operations can fail, so exception handling is part of robust I/O code."], example: "Use try-with-resources when supported by the project style so resources are closed automatically." },
      { title: "Exam traps", points: ["Do not assume every input token is numeric.", "Always consider end-of-file and I/O failure conditions.", "Keep parsing, validation and business logic separate where possible."] }
    ],
    quickPractice: [{ question: "What is a token?", answer: "A meaningful continuous sequence of input characters separated by delimiters such as whitespace." }]
  },

  "xi-python": {
    overview: "Where the Target95 XI pathway includes Python as a supplemental programming foundation, use it to reinforce algorithmic thinking rather than replace the ISC Java core.",
    sections: [
      { title: "Python foundations", points: ["Variables are created by assignment and Python infers the runtime type.", "Use if/elif/else for selection and for/while for iteration.", "Lists store ordered collections and support indexing from zero."] },
      { title: "Algorithmic practice", points: ["Translate the same small algorithm between Java and Python to focus on logic rather than syntax.", "Trace inputs, state changes and outputs before coding."] }
    ],
    quickPractice: [{ question: "Write the Python expression for the first three elements of list a.", answer: "a[0:3]" }]
  },

  "xi-trends-ethics": {
    overview: "Understand major computing trends and evaluate their social, legal, privacy and ethical implications.",
    sections: [
      { title: "Emerging technologies", points: ["Artificial Intelligence uses computational methods to perform tasks associated with intelligent behaviour.", "IoT connects physical devices and sensors to networks and services.", "VR and AR create or augment digital experiences in different ways."] },
      { title: "Cyber safety and privacy", points: ["Cyber security aims to protect systems, networks and information.", "Phishing tricks users into revealing information or taking unsafe actions; spam is unsolicited bulk communication.", "Privacy concerns how personal data is collected, used, stored and shared."] },
      { title: "Intellectual property and open source", points: ["Copyright protects original expression; patents protect qualifying inventions under applicable law.", "Software licences define permitted use, modification and distribution.", "Open-source licences vary; always follow the licence terms rather than assuming all open-source software has identical permissions."], example: "Ethical analysis should consider multiple viewpoints, legal rights, user impact and responsible technology use." }
    ],
    quickPractice: [{ question: "How is phishing different from ordinary spam?", answer: "Phishing is typically deceptive communication designed to obtain information or induce an unsafe action; spam is broadly unsolicited bulk communication." }]
  }
};

export default ISC_XI_CHAPTER_ENHANCEMENTS;
