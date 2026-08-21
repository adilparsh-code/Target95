// ISC XII Boolean Algebra flagship module: truth-table-first learning and exam terminology.

const truth2 = (rows) => rows;

export const BOOLEAN_TRUTH_TABLES = {
  AND: truth2([{ A: 0, B: 0, Y: 0 }, { A: 0, B: 1, Y: 0 }, { A: 1, B: 0, Y: 0 }, { A: 1, B: 1, Y: 1 }]),
  OR: truth2([{ A: 0, B: 0, Y: 0 }, { A: 0, B: 1, Y: 1 }, { A: 1, B: 0, Y: 1 }, { A: 1, B: 1, Y: 1 }]),
  XOR: truth2([{ A: 0, B: 0, Y: 0 }, { A: 0, B: 1, Y: 1 }, { A: 1, B: 0, Y: 1 }, { A: 1, B: 1, Y: 0 }]),
  NAND: truth2([{ A: 0, B: 0, Y: 1 }, { A: 0, B: 1, Y: 1 }, { A: 1, B: 0, Y: 1 }, { A: 1, B: 1, Y: 0 }]),
  NOR: truth2([{ A: 0, B: 0, Y: 1 }, { A: 0, B: 1, Y: 0 }, { A: 1, B: 0, Y: 0 }, { A: 1, B: 1, Y: 0 }]),
  XNOR: truth2([{ A: 0, B: 0, Y: 1 }, { A: 0, B: 1, Y: 0 }, { A: 1, B: 0, Y: 0 }, { A: 1, B: 1, Y: 1 }]),
};

export const BOOLEAN_NOT_TRUTH_TABLE = [{ A: 0, Y: 1 }, { A: 1, Y: 0 }];

export const BOOLEAN_TERMINOLOGY = [
  { term: "Boolean variable", meaning: "A symbol whose value can be only 0 or 1.", example: "A, B, C" },
  { term: "Constant", meaning: "A fixed Boolean value that is always 0 or always 1.", example: "0, 1" },
  { term: "Literal", meaning: "A variable or its complement.", example: "A or A'" },
  { term: "Complement", meaning: "The NOT form of a Boolean variable.", example: "A'" },
  { term: "Boolean expression", meaning: "A combination of variables, constants and Boolean operators.", example: "A + A'B" },
  { term: "Boolean function", meaning: "A rule that maps Boolean inputs to a Boolean output.", example: "F(A,B)=A+B" },
  { term: "Truth table", meaning: "A complete table showing the output for every possible input combination.", example: "2 inputs → 4 rows; 3 inputs → 8 rows" },
  { term: "Minterm", meaning: "A product (AND) term containing every variable exactly once, complemented or uncomplemented.", example: "A'BC" },
  { term: "Maxterm", meaning: "A sum (OR) term containing every variable exactly once, complemented or uncomplemented.", example: "A+B'+C" },
  { term: "Canonical SOP", meaning: "Sum of minterms; every product term contains every variable exactly once.", example: "F = Σm(1,3,5)" },
  { term: "Canonical POS", meaning: "Product of maxterms; every sum term contains every variable exactly once.", example: "F = ΠM(0,2,4)" },
  { term: "SOP", meaning: "Sum of Products: OR of AND terms.", example: "AB + AC'" },
  { term: "POS", meaning: "Product of Sums: AND of OR terms.", example: "(A+B)(A+C')" },
  { term: "Truth-table equivalence", meaning: "Two expressions are equivalent when their output columns match for every input row.", example: "A+AB ≡ A" },
  { term: "Universal gate", meaning: "A gate from which any Boolean function can be built.", example: "NAND or NOR" },
  { term: "Don't-care condition", meaning: "An input combination whose output may be treated as 0 or 1 for simplification, where permitted.", example: "X entries" },
];

export const BOOLEAN_GATE_TABLE = [
  { gate: "AND", notation: "A·B", plain: "1 only when BOTH are 1", mental: "Both must be ON" },
  { gate: "OR", notation: "A+B", plain: "1 when AT LEAST ONE is 1", mental: "Either path can turn it ON" },
  { gate: "NOT", notation: "A'", plain: "Flips 0↔1", mental: "Opposite of A" },
  { gate: "XOR", notation: "A⊕B", plain: "1 when inputs are DIFFERENT", mental: "Exactly one is ON" },
  { gate: "XNOR", notation: "A⊙B", plain: "1 when inputs are the SAME", mental: "Agreement detector" },
  { gate: "NAND", notation: "(AB)'", plain: "NOT of AND", mental: "AND result flipped" },
  { gate: "NOR", notation: "(A+B)'", plain: "NOT of OR", mental: "OR result flipped" },
];

export const TRUTH_TABLE_METHOD = [
  "1. Count variables. With n variables, prepare 2^n rows.",
  "2. Write input combinations systematically: for 2 variables use 00, 01, 10, 11; for 3 use 000 through 111.",
  "3. Create one column per intermediate operation instead of jumping to the final answer.",
  "4. Evaluate complements first, then grouped AND/OR operations according to the expression.",
  "5. Compare the final output column with the claimed identity or target expression.",
];

export const TRUTH_TABLE_CHALLENGES_XII = [
  { id: "TT-XII-01", expression: "A + A'", task: "Complete all rows and explain why the final column is always 1.", answer: "1 for every row." },
  { id: "TT-XII-02", expression: "AB + AB'", task: "Create the intermediate columns AB and AB', then simplify from the final column.", answer: "Equivalent to A." },
  { id: "TT-XII-03", expression: "(A+B)'", task: "Compare the final column with A'B' row by row.", answer: "The columns match, proving De Morgan's law." },
  { id: "TT-XII-04", expression: "A⊕B", task: "Use the table to describe XOR in plain English.", answer: "XOR is 1 exactly when the two inputs are different." },
];

export const MINTERM_MAXTERM_GUIDE = {
  coreRule: "A minterm corresponds to a truth-table row where F=1. A maxterm corresponds to a truth-table row where F=0.",
  variableOrder: "Always fix an order first, e.g. A, B, C. Treat ABC as a binary number to get the row index.",
  mintermConstruction: [
    "For a row with 1 in a variable position, write that variable uncomplemented.",
    "For a row with 0 in a variable position, write that variable complemented.",
    "AND the literals together to form the minterm.",
  ],
  maxtermConstruction: [
    "For a row with 0 in a variable position, write that variable uncomplemented.",
    "For a row with 1 in a variable position, write that variable complemented.",
    "OR the literals together to form the maxterm.",
  ],
  notation: [
    "Σm(...) lists the indices of rows where F=1 and names the canonical SOP.",
    "ΠM(...) lists the indices of rows where F=0 and names the canonical POS.",
    "For n variables, valid indices run from 0 to 2^n−1.",
  ],
  workedExamples: [
    { id: "MM-01", variables: "A, B", truthRow: "A=1, B=0, F=1", minterm: "m2 = AB'", why: "10₂ = 2; 1→A and 0→B'." },
    { id: "MM-02", variables: "A, B, C", truthRow: "A=1, B=0, C=1, F=1", minterm: "m5 = AB'C", why: "101₂ = 5; 1→A, 0→B', 1→C." },
    { id: "MM-03", variables: "A, B, C", truthRow: "A=1, B=0, C=1, F=0", maxterm: "M5 = A' + B + C'", why: "For a maxterm, 1→complement and 0→uncomplemented; the sum is 0 exactly on row 101." },
  ],
  conversionWorkflow: [
    "Truth table → mark all F=1 rows → write each row's minterm → OR them → canonical SOP → Σm(index list).",
    "Truth table → mark all F=0 rows → write each row's maxterm → AND them → canonical POS → ΠM(index list).",
    "Cross-check: SOP uses 1-rows; POS uses 0-rows. Their index sets are complements within 0…2^n−1.",
  ],
  examTraps: [
    "Minterm: 0 means complemented, 1 means uncomplemented.",
    "Maxterm: 0 means uncomplemented, 1 means complemented.",
    "Do not change variable order midway; row index depends on the chosen order.",
    "Canonical means every term contains every variable exactly once; a reduced SOP/POS is not necessarily canonical.",
  ],
  practice: [
    { id: "MM-P-01", question: "For A=0,B=1,C=1 and F=1, write the minterm and index.", answer: "A'BC = m3." },
    { id: "MM-P-02", question: "For A=0,B=1,C=1 and F=0, write the maxterm and index.", answer: "A + B' + C' = M3." },
    { id: "MM-P-03", question: "A function is 1 at rows 1, 2 and 7 of a 3-variable table. Write canonical SOP notation.", answer: "F = Σm(1,2,7)." },
    { id: "MM-P-04", question: "A function is 0 at rows 0, 3 and 5. Write canonical POS notation.", answer: "F = ΠM(0,3,5)." },
    { id: "MM-P-05", question: "For F=Σm(1,2,6,7), identify the zero rows for the equivalent canonical POS.", answer: "F = ΠM(0,3,4,5)." },
  ],
};

const booleanAlgebra = {
  id: "xii-boolean-algebra",
  title: "Boolean Algebra",
  tagline: "Stop memorising laws. Learn to SEE why the answer is true.",
  learningPath: [
    { id: "why", title: "Why Boolean Algebra?", goal: "Connect 0/1 logic to switches, gates and computer decisions." },
    { id: "language", title: "Learn the Language", goal: "Variables, literals, complements, constants and operators." },
    { id: "truth", title: "Master Truth Tables", goal: "Build, read and verify every input/output combination." },
    { id: "laws", title: "Master the Laws", goal: "Learn each law through patterns, truth tables and intuition." },
    { id: "simplify", title: "Simplify Step-by-Step", goal: "Turn long expressions into short, exam-ready forms." },
    { id: "canonical", title: "Minterms & Maxterms", goal: "Move from truth tables to minterms, maxterms, Σm, ΠM and canonical SOP/POS forms." },
    { id: "nand-nor", title: "Think Like a Circuit", goal: "Translate expressions into gates and universal-gate designs." },
    { id: "exam", title: "Exam Mode", goal: "Solve ISC-style simplification and implementation problems under time pressure." },
  ],
  mentalModels: [
    { title: "Boolean algebra is logic with arithmetic rules", explanation: "The symbols look like algebra, but the values are only 0 and 1. Ask what logic an expression represents.", example: "A + B = A OR B; AB = A AND B; A' = NOT A." },
    { title: "Every law is a pattern", explanation: "Meaning lets you reconstruct a rule instead of memorising isolated formulas.", example: "A + 0 = A because OR with false changes nothing." },
    { title: "Simplification is controlled rewriting", explanation: "Change one meaningful sub-expression at a time and name the law.", example: "A + AB → A(1+B) → A·1 → A." },
  ],
  terminology: BOOLEAN_TERMINOLOGY,
  gateTable: BOOLEAN_GATE_TABLE,
  notTruthTable: BOOLEAN_NOT_TRUTH_TABLE,
  truthTables: BOOLEAN_TRUTH_TABLES,
  truthTableMethod: TRUTH_TABLE_METHOD,
  truthTableChallenges: TRUTH_TABLE_CHALLENGES_XII,
  mintermMaxtermGuide: MINTERM_MAXTERM_GUIDE,
  lawDeck: [
    { name: "Identity", rules: ["A + 0 = A", "A·1 = A"], intuition: "Adding false or ANDing with true changes nothing." },
    { name: "Null / Dominance", rules: ["A + 1 = 1", "A·0 = 0"], intuition: "True dominates OR; false dominates AND." },
    { name: "Idempotent", rules: ["A + A = A", "A·A = A"], intuition: "Repeating the same condition adds no new information." },
    { name: "Complement", rules: ["A + A' = 1", "A·A' = 0"], intuition: "A condition or its opposite covers everything; both together are impossible." },
    { name: "Involution", rules: ["(A')' = A"], intuition: "NOT of NOT returns the original condition." },
    { name: "Commutative", rules: ["A + B = B + A", "AB = BA"], intuition: "Order does not matter for OR or AND." },
    { name: "Associative", rules: ["A + (B + C) = (A + B) + C", "A(BC) = (AB)C"], intuition: "Grouping can change, but order stays the same." },
    { name: "Distributive", rules: ["A(B + C) = AB + AC", "A + BC = (A + B)(A + C)"], intuition: "Boolean algebra has both distributive forms." },
    { name: "Absorption", rules: ["A + AB = A", "A(A + B) = A"], intuition: "A stronger condition already contains the weaker branch." },
    { name: "De Morgan", rules: ["(A + B)' = A'B'", "(AB)' = A' + B'"], intuition: "NOT crosses a bracket: operator swaps and every literal flips." },
  ],
  workedExamples: [
    { id: "BA-01", level: "foundation", title: "Make a long expression disappear", expression: "A + AB", steps: [{ line: "A + AB", law: "Distributive", reason: "Factor A" }, { line: "A(1 + B)", law: "Dominance", reason: "1 + B = 1" }, { line: "A·1", law: "Identity", reason: "Factored form" }, { line: "A", law: "Identity", reason: "A·1 = A" }], examTip: "When you see A + AX or A(A + X), test Absorption early." },
    { id: "BA-02", level: "foundation", title: "De Morgan without fear", expression: "(A + B + C)'", steps: [{ line: "(A+B+C)'", law: "De Morgan", reason: "NOT enters the bracket" }, { line: "A'B'C'", law: "De Morgan", reason: "OR becomes AND; every literal complements" }], examTip: "Change the operator and flip every literal." },
    { id: "BA-03", level: "advanced", title: "A two-route proof", expression: "A + A'B", steps: [{ line: "A + A'B", law: "Distributive", reason: "Use X+YZ=(X+Y)(X+Z)" }, { line: "(A+A')(A+B)", law: "Distributive", reason: "Dual form" }, { line: "1(A+B)", law: "Complement", reason: "A+A'=1" }, { line: "A+B", law: "Identity", reason: "1·X=X" }], examTip: "Recognise the dual distributive law before expanding randomly." },
  ],
  outputTracing: [
    { id: "OUT-BA-01", question: "For A=1, B=0, what is A' + AB?", answer: "0", explanation: "A'=0 and AB=0, so 0+0=0." },
    { id: "OUT-BA-02", question: "If A=0 and B=1, evaluate (A+B)' + AB.", answer: "0", explanation: "A+B=1, complement=0; AB=0." },
  ],
  mcqs: [
    { id: "BA-MCQ-01", difficulty: "easy", question: "Which expression is always 1?", options: ["A) A·A'", "B) A + A'", "C) A·0", "D) A + 0"], answer: "B", explanation: "A and its complement cover every possible Boolean input." },
    { id: "BA-MCQ-02", difficulty: "medium", question: "Simplify A + AB.", options: ["A) B", "B) AB", "C) A", "D) A+B"], answer: "C", explanation: "Absorption: A+AB=A." },
    { id: "BA-MCQ-03", difficulty: "medium", question: "The complement of AB is:", options: ["A) A'B'", "B) A'+B'", "C) AB'", "D) A+B"], answer: "B", explanation: "De Morgan: (AB)'=A'+B'." },
    { id: "BA-MCQ-04", difficulty: "hard", question: "Which is equivalent to A + BC?", options: ["A) (A+B)(A+C)", "B) AB+AC", "C) A(B+C)", "D) A+B+C"], answer: "A", explanation: "Dual distributive identity: A+BC=(A+B)(A+C)." },
  ],
  practice: [
    { id: "BA-P-01", difficulty: "easy", type: "simplify", question: "Simplify A + A·0.", answer: "A", marks: 2 },
    { id: "BA-P-02", difficulty: "easy", type: "simplify", question: "Simplify A + A'.", answer: "1", marks: 2 },
    { id: "BA-P-03", difficulty: "medium", type: "simplify", question: "Simplify AB + AB'.", answer: "A", marks: 3 },
    { id: "BA-P-04", difficulty: "medium", type: "simplify", question: "Simplify A + A'B.", answer: "A+B", marks: 4 },
    { id: "BA-P-05", difficulty: "hard", type: "prove", question: "Prove (A+B)(A+C)=A+BC.", answer: "Expand to A+AC+AB+BC and use absorption to reduce to A+BC.", marks: 5 },
    { id: "BA-P-06", difficulty: "hard", type: "design", question: "Express XOR using only AND, OR and NOT.", answer: "A'B + AB'", marks: 4 },
  ],
  debugging: [
    { id: "BA-DBG-01", buggySteps: ["(A+B)' = A'+B'"], task: "Find the mistake and correct it.", answer: "De Morgan changes OR to AND: (A+B)' = A'B'." },
    { id: "BA-DBG-02", buggySteps: ["A + AB", "= AB + AB", "= AB"], task: "Find the first invalid transformation.", answer: "The first step is invalid. Use absorption or factor A: A(1+B)=A." },
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
    { id: "M-02", title: "Truth-table Construction", success: "Build a complete 2- and 3-variable table without missing a row." },
    { id: "M-03", title: "Canonical Forms", success: "Convert a truth table to Σm/ΠM and canonical SOP/POS correctly." },
    { id: "M-04", title: "Proof Mode", success: "Complete a 5-mark derivation with named laws and no unexplained jumps." },
    { id: "M-05", title: "Circuit Thinking", success: "Translate between a Boolean expression and its gate structure." },
  ],
};

export default booleanAlgebra;
