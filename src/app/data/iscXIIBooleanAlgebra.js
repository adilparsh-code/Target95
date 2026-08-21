/**
 * ISC Class XII — Boolean Algebra flagship learning module.
 * The goal is to teach the reasoning behind Boolean algebra, not formula memorisation.
 */

export const ISC_XII_BOOLEAN_ALGEBRA = {
  id: "xii-boolean-algebra",
  title: "Boolean Algebra",
  tagline: "Stop memorising laws. Learn to SEE why the answer is true.",
  learningPath: [
    { id: "why", title: "Why Boolean Algebra?", goal: "Connect 0/1 logic to switches, gates and computer decisions." },
    { id: "language", title: "Learn the Language", goal: "Variables, literals, complements, AND, OR and NOT." },
    { id: "laws", title: "Master the Laws", goal: "Learn each law through patterns, not isolated definitions." },
    { id: "truth", title: "Think in Truth Tables", goal: "Use truth tables to test, discover and verify identities." },
    { id: "simplify", title: "Simplify Step-by-Step", goal: "Turn long expressions into short, exam-ready forms." },
    { id: "nand-nor", title: "Think Like a Circuit", goal: "Translate expressions into gates and universal-gate designs." },
    { id: "exam", title: "Exam Mode", goal: "Solve ICSE/ISC-style simplification and implementation problems under time pressure." },
  ],

  mentalModels: [
    {
      title: "Boolean algebra is logic with arithmetic rules",
      explanation: "The symbols look like algebra, but the values are only 0 and 1. The fastest way to learn is to keep asking: what logic does this expression represent?",
      example: "A + B means A OR B; AB means A AND B; A' means NOT A.",
    },
    {
      title: "Every law is a pattern",
      explanation: "Instead of memorising X + 0 = X, see it as 'OR with false changes nothing'. The meaning helps you reconstruct the rule even after you forget the wording.",
      example: "X + 0 = X and X·1 = X are the same identity pattern under OR/AND roles.",
    },
    {
      title: "Simplification is controlled rewriting",
      explanation: "Never jump randomly between laws. Mark the exact sub-expression that changes, name the law, and continue until the expression becomes simpler.",
      example: "A + AB → A(1 + B) → A·1 → A.",
    },
  ],

  lawDeck: [
    { name: "Identity", rules: ["A + 0 = A", "A·1 = A"], intuition: "Adding false or ANDing with true changes nothing." },
    { name: "Null / Dominance", rules: ["A + 1 = 1", "A·0 = 0"], intuition: "True dominates OR; false dominates AND." },
    { name: "Idempotent", rules: ["A + A = A", "A·A = A"], intuition: "Repeating the same condition adds no new information." },
    { name: "Complement", rules: ["A + A' = 1", "A·A' = 0"], intuition: "A condition or its opposite covers everything; both together are impossible." },
    { name: "Involution", rules: ["(A')' = A"], intuition: "NOT of NOT returns the original condition." },
    { name: "Commutative", rules: ["A + B = B + A", "AB = BA"], intuition: "Order does not matter for OR or AND." },
    { name: "Associative", rules: ["A + (B + C) = (A + B) + C", "A(BC) = (AB)C"], intuition: "Grouping can change, but order stays the same." },
    { name: "Distributive", rules: ["A(B + C) = AB + AC", "A + BC = (A + B)(A + C)"], intuition: "AND distributes over OR, and in Boolean algebra OR has its dual distributive form too." },
    { name: "Absorption", rules: ["A + AB = A", "A(A + B) = A"], intuition: "A stronger condition already contains the weaker branch." },
    { name: "De Morgan", rules: ["(A + B)' = A'B'", "(AB)' = A' + B'"], intuition: "When NOT crosses a bracket, OR/AND swap and each variable is complemented." },
  ],

  workedExamples: [
    {
      id: "BA-01",
      level: "foundation",
      title: "Make a long expression disappear",
      expression: "A + AB",
      steps: [
        { line: "A + AB", reason: "Factor A", law: "Distributive" },
        { line: "A(1 + B)", reason: "A + B over Boolean values always includes 1 when A is factored", law: "Boolean complement / dominance" },
        { line: "A·1", reason: "1 dominates OR", law: "Simplification" },
        { line: "A", reason: "Multiplying by 1 changes nothing", law: "Identity" },
      ],
      examTip: "When you see A + AX or A(A + X), test Absorption early." },
    {
      id: "BA-02",
      level: "foundation",
      title: "De Morgan without fear",
      expression: "(A + B + C)'",
      steps: [
        { line: "(A + B + C)'", reason: "NOT enters the bracket", law: "De Morgan" },
        { line: "A'B'C'", reason: "OR becomes AND and every literal is complemented", law: "De Morgan" },
      ],
      examTip: "Use the 'change the operator + flip every literal' rule as your mental shortcut." },
    {
      id: "BA-03",
      level: "advanced",
      title: "A two-route proof",
      expression: "A + A'B",
      steps: [
        { line: "A + A'B", reason: "Use X + YZ = (X + Y)(X + Z)", law: "Distributive" },
        { line: "(A + A')(A + B)", reason: "Expand using the dual distributive form", law: "Distributive" },
        { line: "1(A + B)", reason: "Complement", law: "A + A' = 1" },
        { line: "A + B", reason: "Identity", law: "1·X = X" },
      ],
      examTip: "This pattern is common in simplification questions because it rewards recognising the dual distributive law." },
  ],

  visualRules: [
    { pattern: "A + AB", meaning: "A is already enough to make the whole expression true.", memory: "The bigger term AB cannot add a case that A did not already cover." },
    { pattern: "A + A'", meaning: "A and not-A cover every possible input.", memory: "Either way, one of them is 1." },
    { pattern: "AA'", meaning: "A and not-A can never both be 1.", memory: "Opposites cannot happen together." },
  ],

  truthTableChallenges: [
    { id: "TT-01", expression: "A + A'", prompt: "Complete the truth table, then infer the simplified result." , answer: "1" },
    { id: "TT-02", expression: "AB + AB'", prompt: "Complete the table before simplifying. Look for the common factor." , answer: "A" },
    { id: "TT-03", expression: "(A + B)'", prompt: "Build the table first, then compare it with A'B'." , answer: "A'B'" },
  ],

  outputTracing: [
    {
      id: "OUT-BA-01",
      question: "For A=1, B=0, what is the value of A' + AB?",
      answer: "0",
      explanation: "A'=0 and AB=0, so 0+0=0." },
    {
      id: "OUT-BA-02",
      question: "If A=0 and B=1, evaluate (A+B)' + AB.",
      answer: "0",
      explanation: "A+B=1, so its complement is 0; AB=0." },
  ],

  mcqs: [
    {
      id: "BA-MCQ-01",
      difficulty: "easy",
      question: "Which expression is always 1?",
      options: ["A) A·A'", "B) A + A'", "C) A·0", "D) A + 0"],
      answer: "B",
      explanation: "A and its complement cover every possible Boolean input." },
    {
      id: "BA-MCQ-02",
      difficulty: "medium",
      question: "Which simplification is correct? A + AB",
      options: ["A) B", "B) AB", "C) A", "D) A+B"],
      answer: "C",
      explanation: "By absorption, A + AB = A." },
    {
      id: "BA-MCQ-03",
      difficulty: "medium",
      question: "The complement of AB is:",
      options: ["A) A'B'", "B) A'+B'", "C) AB'", "D) A+B"],
      answer: "B",
      explanation: "By De Morgan, (AB)' = A' + B'." },
    {
      id: "BA-MCQ-04",
      difficulty: "hard",
      question: "Which form is equivalent to A + BC?",
      options: ["A) (A+B)(A+C)", "B) AB+AC", "C) A(B+C)", "D) (A+B)+C"],
      answer: "A",
      explanation: "This is the dual distributive identity: A + BC = (A+B)(A+C)." },
  ],

  practice: [
    { id: "BA-P-01", difficulty: "easy", type: "simplify", question: "Simplify A + A·0.", answer: "A", marks: 2 },
    { id: "BA-P-02", difficulty: "easy", type: "simplify", question: "Simplify A + A'.", answer: "1", marks: 2 },
    { id: "BA-P-03", difficulty: "medium", type: "simplify", question: "Simplify AB + AB'.", answer: "A", marks: 3 },
    { id: "BA-P-04", difficulty: "medium", type: "simplify", question: "Simplify A + A'B.", answer: "A + B", marks: 4 },
    { id: "BA-P-05", difficulty: "hard", type: "prove", question: "Prove using Boolean algebra that (A+B)(A+C) = A+BC.", answer: "Expand → A + AC + AB + BC → A + BC using absorption.", marks: 5 },
    { id: "BA-P-06", difficulty: "hard", type: "design", question: "Express XOR using only AND, OR and NOT.", answer: "A'B + AB'", marks: 4 },
  ],

  debugging: [
    {
      id: "BA-DBG-01",
      buggySteps: ["(A+B)' = A' + B'", "Therefore A' + B' is the answer."],
      task: "Find the mistake and correct it.",
      answer: "De Morgan changes OR to AND: (A+B)' = A'B'." },
    {
      id: "BA-DBG-02",
      buggySteps: ["A + AB", "= AB + AB", "= AB"],
      task: "Find the first invalid transformation.",
      answer: "The first step is invalid. Use absorption or factor A: A(1+B)=A." },
  ],

  examStrategy: [
    "Step 1: Identify the largest obvious pattern before expanding anything.",
    "Step 2: Circle complements and repeated literals.",
    "Step 3: Prefer absorption/complement/De Morgan before heavy expansion.",
    "Step 4: After every major rewrite, ask whether the expression actually became simpler.",
    "Step 5: In a proof question, write the law used at each meaningful step.",
    "Step 6: If stuck, build a truth table to verify the identity before trying another algebraic route.",
  ],

  masteryChecks: [
    { id: "M-01", title: "Law Recognition", success: "Identify the correct law in 8/10 examples." },
    { id: "M-02", title: "One-Line Simplification", success: "Simplify common expressions in under 30 seconds." },
    { id: "M-03", title: "Proof Mode", success: "Complete a 5-mark derivation with named laws and no unexplained jumps." },
    { id: "M-04", title: "Circuit Thinking", success: "Translate between a Boolean expression and its gate structure." },
  ],
};

export default ISC_XII_BOOLEAN_ALGEBRA;
