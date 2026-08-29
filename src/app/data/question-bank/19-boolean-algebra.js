/**
 * ISC Class XI — Boolean Algebra practice bank.
 * Focus: board-style MCQ, tracing, debugging, and programming logic.
 */

const booleanAlgebraQuestions = [
  {
    id: "isc-xi-boolean-mcq-001",
    type: "mcq",
    difficulty: "Medium",
    marks: 1,
    topic: "Boolean identities",
    question: "Which expression is equivalent to A + AB?",
    options: ["A", "B", "AB", "A + B"],
    answer: "A",
    explanation: "By absorption, A + AB = A(1 + B) = A."
  },
  {
    id: "isc-xi-boolean-mcq-002",
    type: "mcq",
    difficulty: "Medium",
    marks: 1,
    topic: "De Morgan's laws",
    question: "The complement of (A + B)' is:",
    options: ["A + B", "A' + B'", "AB", "A'B'"],
    answer: "A + B",
    explanation: "Double complementation gives ((A + B)')' = A + B."
  },
  {
    id: "isc-xi-boolean-trace-001",
    type: "output",
    difficulty: "Hard",
    marks: 3,
    topic: "Boolean expression evaluation",
    question: "For A=1, B=0 and C=1, evaluate F = (A + B') (A' + C).",
    answer: "1",
    explanation: "B'=1, so (A+B')=1. A'=0, hence (A'+C)=1. Therefore F=1×1=1."
  },
  {
    id: "isc-xi-boolean-debug-001",
    type: "debugging",
    difficulty: "Hard",
    marks: 3,
    topic: "Truth-table reasoning",
    question: "A student claims that F = A + A'B simplifies to B. Identify the mistake and give the correct simplification.",
    answer: "The claim is incorrect; F simplifies to A + B.",
    explanation: "Using X + X'Y = X + Y, A + A'B = A + B. A counterexample is A=1, B=0: F=1, whereas B=0."
  },
  {
    id: "isc-xi-boolean-case-001",
    type: "case-study",
    difficulty: "Hard",
    marks: 5,
    topic: "Logic design",
    question: "A security system opens when a valid card C is present and either a correct PIN P or supervisor override S is active. Write the Boolean expression, simplify any redundant term, and state the condition for opening.",
    answer: "F = C(P + S). The system opens only when C=1 and at least one of P or S is 1.",
    explanation: "The card condition is mandatory, so it ANDs with the alternative PIN/override condition. The expression is already minimal unless additional circuit constraints are imposed."
  },
  {
    id: "isc-xi-boolean-programming-001",
    type: "programming",
    difficulty: "Hard",
    marks: 5,
    topic: "Boolean decision logic",
    question: "Write a Java program that accepts three Boolean values A, B and C and prints the value of F = (A && !B) || (!A && C). Also test the program for A=true, B=false, C=false.",
    answer: "For the test case, F=true.",
    explanation: "A && !B is true because A=true and !B=true. The second term is false, so the OR result is true."
  }
];

export default booleanAlgebraQuestions;
