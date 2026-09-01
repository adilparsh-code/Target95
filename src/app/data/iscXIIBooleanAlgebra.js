// ISC XII Boolean Algebra flagship module: truth-table-first learning, gates, canonical forms and K-Map bridge.

const truth2 = (rows) => rows;

export const BOOLEAN_TRUTH_TABLES = {
  AND: truth2([
    { A: 0, B: 0, Y: 0 }, { A: 0, B: 1, Y: 0 }, { A: 1, B: 0, Y: 0 }, { A: 1, B: 1, Y: 1 },
  ]),
  OR: truth2([
    { A: 0, B: 0, Y: 0 }, { A: 0, B: 1, Y: 1 }, { A: 1, B: 0, Y: 1 }, { A: 1, B: 1, Y: 1 },
  ]),
  XOR: truth2([
    { A: 0, B: 0, Y: 0 }, { A: 0, B: 1, Y: 1 }, { A: 1, B: 0, Y: 1 }, { A: 1, B: 1, Y: 0 },
  ]),
  NAND: truth2([
    { A: 0, B: 0, Y: 1 }, { A: 0, B: 1, Y: 1 }, { A: 1, B: 0, Y: 1 }, { A: 1, B: 1, Y: 0 },
  ]),
  NOR: truth2([
    { A: 0, B: 0, Y: 1 }, { A: 0, B: 1, Y: 0 }, { A: 1, B: 0, Y: 0 }, { A: 1, B: 1, Y: 0 },
  ]),
  XNOR: truth2([
    { A: 0, B: 0, Y: 1 }, { A: 0, B: 1, Y: 0 }, { A: 1, B: 0, Y: 0 }, { A: 1, B: 1, Y: 1 },
  ]),
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

export const GATE_CONVERSIONS = [
  { from: "Boolean expression", to: "Logic circuit", steps: ["Read NOT/complements first", "Build AND terms", "Combine terms with OR", "Verify with truth table"], example: "F=A'B+AC → NOT A → AND gates → OR gate" },
  { from: "Logic circuit", to: "Boolean expression", steps: ["Name each gate output", "Write each gate equation", "Substitute intermediate outputs", "Simplify if required"], example: "AND output X=AB; OR with C → F=X+C=AB+C" },
  { from: "NAND", to: "NOT", steps: ["Tie both NAND inputs to A"], example: "NAND(A,A)=A'" },
  { from: "NOR", to: "NOT", steps: ["Tie both NOR inputs to A"], example: "NOR(A,A)=A'" },
  { from: "NAND", to: "AND", steps: ["First NAND gives (AB)'", "Second NAND inverts it"], example: "NAND(NAND(A,B),NAND(A,B))=AB" },
  { from: "NOR", to: "OR", steps: ["First NOR gives (A+B)'", "Second NOR inverts it"], example: "NOR(NOR(A,B),NOR(A,B))=A+B" },
];

export const UNIVERSAL_GATE_DESIGNS = [
  { gate: "NAND", builds: ["NOT: A NAND A", "AND: NAND output fed to NAND inverter", "OR: De Morgan using inverted inputs"] },
  { gate: "NOR", builds: ["NOT: A NOR A", "OR: NOR output fed to NOR inverter", "AND: De Morgan using inverted inputs"] },
];

export const TRUTH_TABLE_METHOD = [
  "1. Count variables: n variables require 2^n rows.",
  "2. List input combinations systematically.",
  "3. Create intermediate columns for each operation.",
  "4. Evaluate complements first, then grouped AND/OR operations.",
  "5. Compare the final output column with the target expression or identity.",
];

export const TRUTH_TABLE_CHALLENGES_XII = [
  { id: "TT-XII-01", expression: "A + A'", task: "Complete all rows and explain why the final column is always 1.", answer: "1 for every row." },
  { id: "TT-XII-02", expression: "AB + AB'", task: "Create intermediate columns AB and AB', then simplify from the final column.", answer: "Equivalent to A." },
  { id: "TT-XII-03", expression: "(A+B)'", task: "Compare the final column with A'B' row by row.", answer: "The columns match, proving De Morgan's law." },
  { id: "TT-XII-04", expression: "A⊕B", task: "Use the table to describe XOR in plain English.", answer: "XOR is 1 exactly when the two inputs are different." },
];

export const MINTERM_MAXTERM_GUIDE = {
  coreRule: "A minterm corresponds to a truth-table row where F=1. A maxterm corresponds to a truth-table row where F=0.",
  variableOrder: "Always fix an order first, e.g. A, B, C. Treat ABC as a binary number to get the row index.",
  mintermConstruction: ["1 means uncomplemented; 0 means complemented.", "AND the literals together to form the minterm."],
  maxtermConstruction: ["0 means uncomplemented; 1 means complemented.", "OR the literals together to form the maxterm."],
  notation: ["Σm(...) lists F=1 row indices and names canonical SOP.", "ΠM(...) lists F=0 row indices and names canonical POS."],
  practice: [
    { id: "MM-P-01", question: "For A=0,B=1,C=1 and F=1, write the minterm and index.", answer: "A'BC = m3." },
    { id: "MM-P-02", question: "For A=0,B=1,C=1 and F=0, write the maxterm and index.", answer: "A + B' + C' = M3." },
    { id: "MM-P-03", question: "A function is 1 at rows 1, 2 and 7 of a 3-variable table. Write canonical SOP notation.", answer: "F = Σm(1,2,7)." },
    { id: "MM-P-04", question: "A function is 0 at rows 0, 3 and 5. Write canonical POS notation.", answer: "F = ΠM(0,3,5)." },
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
    { id: "gates", title: "Logic Gates & Conversion", goal: "Move confidently between truth tables, Boolean expressions and gate circuits." },
    { id: "laws", title: "Master the Laws", goal: "Learn each law through patterns, truth tables and intuition." },
    { id: "simplify", title: "Simplify Step-by-Step", goal: "Turn long expressions into short, exam-ready forms." },
    { id: "canonical", title: "Minterms & Maxterms", goal: "Move from truth tables to canonical SOP/POS forms." },
    { id: "kmap", title: "K-Map", goal: "Group adjacent cells to turn canonical forms into minimal expressions." },
    { id: "exam", title: "Exam Mode", goal: "Solve ISC-style simplification and implementation problems under time pressure." },
  ],
  mentalModels: [
    { title: "Boolean algebra is logic with arithmetic rules", explanation: "The symbols look like algebra, but the values are only 0 and 1. Ask what logic an expression represents.", example: "A + B = A OR B; AB = A AND B; A' = NOT A." },
    { title: "Every law is a pattern", explanation: "Meaning lets you reconstruct a rule instead of memorising isolated formulas.", example: "A + 0 = A because OR with false changes nothing." },
    { title: "Simplification is controlled rewriting", explanation: "Change one meaningful sub-expression at a time and name the law.", example: "A + AB → A(1+B) → A·1 → A." },
  ],
  terminology: BOOLEAN_TERMINOLOGY,
  gateConversions: GATE_CONVERSIONS,
  universalGateDesigns: UNIVERSAL_GATE_DESIGNS,
  notTruthTable: BOOLEAN_NOT_TRUTH_TABLE,
  truthTables: BOOLEAN_TRUTH_TABLES,
  truthTableMethod: TRUTH_TABLE_METHOD,
  truthTableChallenges: TRUTH_TABLE_CHALLENGES_XII,
  mintermMaxtermGuide: MINTERM_MAXTERM_GUIDE,
  kMapGuide: "See iscXIIKMap module: start with truth table/canonical form, then group adjacent cells and verify.",
  lawDeck: [
    { name: "Identity", rules: ["A + 0 = A", "A·1 = A"], intuition: "Adding false or ANDing with true changes nothing." },
    { name: "Null / Dominance", rules: ["A + 1 = 1", "A·0 = 0"], intuition: "True dominates OR; false dominates AND." },
    { name: "Idempotent", rules: ["A + A = A", "A·A = A"], intuition: "Repeating the same condition does not change it." },
    { name: "Complement", rules: ["A + A' = 1", "A·A' = 0"], intuition: "A condition or its opposite is always true; both together are impossible." },
    { name: "Involution", rules: ["(A')' = A"], intuition: "Negating twice returns the original value." },
    { name: "Commutative", rules: ["A+B = B+A", "AB = BA"], intuition: "Order of operands does not matter for AND/OR." },
    { name: "Associative", rules: ["A+(B+C)=(A+B)+C", "A(BC)=(AB)C"], intuition: "Grouping does not change the result." },
    { name: "Distributive", rules: ["A(B+C)=AB+AC", "A+BC=(A+B)(A+C)"], intuition: "AND distributes over OR; Boolean OR also has its dual distributive form." },
    { name: "Absorption", rules: ["A+AB=A", "A(A+B)=A"], intuition: "The simpler condition already includes the more specific one." },
    { name: "De Morgan", rules: ["(A+B)'=A'B'", "(AB)'=A'+B'"], intuition: "Negating a combined condition swaps AND/OR and negates each input." },
  ],
  simplificationExamples: [
    { id: "SIM-XII-01", expression: "A+AB", steps: ["Factor A: A(1+B)", "Use 1+B=1", "Use A·1=A"], answer: "A" },
    { id: "SIM-XII-02", expression: "A+A'B", steps: ["Use X+YZ=(X+Y)(X+Z): (A+A')(A+B)", "A+A'=1", "Use 1·(A+B)=A+B"], answer: "A+B" },
    { id: "SIM-XII-03", expression: "(A+B)(A+B')", steps: ["Use (X+Y)(X+Z)=X+YZ", "A+BB'", "A+0"], answer: "A" },
  ],
  boardPractice: [
    { id: "BA-XII-01", level: "board", type: "simplification", question: "Simplify A + A'B.", answer: "A + B", marks: 2 },
    { id: "BA-XII-02", level: "board", type: "truth-table", question: "Verify (A+B)' = A'B' using a complete truth table.", answer: "Both final output columns match for all four input combinations.", marks: 4 },
    { id: "BA-XII-03", level: "board", type: "implementation", question: "Show how to implement NOT and AND using NAND gates only.", answer: "NOT A = A NAND A; AND = NAND the first NAND output with itself.", marks: 4 },
    { id: "BA-XII-04", level: "board", type: "canonical", question: "For F(A,B,C)=1 at rows 1,3,5,7, write canonical SOP notation.", answer: "F=Σm(1,3,5,7).", marks: 3 },
    { id: "BA-XII-05", level: "challenge", type: "reasoning", question: "Explain why two Boolean expressions with identical truth-table output columns are equivalent.", answer: "They produce the same output for every possible input combination, so they define the same Boolean function.", marks: 3 },
  ],
  examChecklist: [
    "Fix variable order before converting rows to minterm/maxterm indices.",
    "For simplification, write one law per meaningful step.",
    "For truth tables, include intermediate columns when asked to verify an identity.",
    "For universal-gate questions, show the inverter stage explicitly.",
    "Re-check the final expression against the original for at least one or two boundary rows."
  ],
};

export default booleanAlgebra;
