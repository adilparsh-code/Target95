const chapter = {
  id: "operators",
  title: "Operators",
  slug: "operators",
  subject: "Java Programming",
  difficulty: "Beginner",
  estimatedTime: 65,
  topics: ["arithmetic", "relational", "logical", "assignment", "increment/decrement", "conditional operator", "precedence"],
  introduction: {
    description: "Operators are symbols that tell Java to perform an operation on one or more operands. They are used to calculate values, compare data and form conditions.",
    realLifeExamples: ["Calculating a total bill uses arithmetic operators.", "Checking whether marks are at least 40 uses a relational operator.", "Checking two conditions together uses a logical operator."]
  },
  theoryNotes: {
    beginnerExplanation: "An operator works on operands. In a + b, a and b are operands and + is the operator.",
    importantPoints: [
      "Arithmetic operators include +, -, *, / and %.",
      "Relational operators compare values and produce a boolean result.",
      "Logical operators &&, || and ! combine or negate boolean expressions.",
      "Assignment operators include = and compound forms such as += and -=.",
      "++ increases a value by one and -- decreases it by one.",
      "The conditional operator has the form condition ? value1 : value2.",
      "Integer division discards the fractional part.",
      "Parentheses can be used to make the intended order of evaluation clear."
    ],
    syntax: ["int r = a % b;", "boolean ok = marks >= 40 && attendance >= 75;", "max = a > b ? a : b;"]
  },
  examples: [
    { title: "Arithmetic and remainder", code: "int a = 17;\nint b = 5;\nSystem.out.println(a / b);\nSystem.out.println(a % b);", explanation: "Integer division gives 3 and the remainder operator gives 2." },
    { title: "Precedence", code: "int x = 2 + 3 * 4;\nSystem.out.println(x);", explanation: "Multiplication is evaluated before addition, so the result is 14." },
    { title: "Conditional operator", code: "int a = 18, b = 12;\nint max = a > b ? a : b;", explanation: "max receives the larger value, 18." }
  ],
  commonMistakes: ["Using = instead of == in a comparison.", "Forgetting that % gives the remainder.", "Assuming integer division keeps decimal places.", "Ignoring operator precedence in a complex expression."],
  practiceQuestions: [
    { id: "OP-01", type: "output", question: "Find the output: System.out.println(17 / 5);", answer: "3" },
    { id: "OP-02", type: "output", question: "Find the output: System.out.println(17 % 5);", answer: "2" },
    { id: "OP-03", type: "conceptual", question: "Differentiate between = and == in Java.", answer: "= assigns a value; == compares two values for equality." },
    { id: "OP-04", type: "programming", question: "Write an expression to store the larger of a and b in max using the conditional operator.", answer: "int max = a > b ? a : b;" }
  ],
  summary: "Use arithmetic for calculations, relational and logical operators for conditions, assignment operators for updates, and precedence or parentheses to control evaluation."
};

export default chapter;
