// ISC XII Boolean Algebra flagship module: truth-table-first learning, gates, canonical forms and K-Map bridge.

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
  { term: "Minterm", meaning: "A product term containing every variable exactly once.", example: "A'BC" },
  { term: "Maxterm", meaning: "A sum term containing every variable exactly once.", example: "A+B'+C" },
  { term: "Canonical SOP", meaning: "Sum of minterms; every product term contains every variable exactly once.", example: "F = Σm(1,3,5)" },
  { term: "Canonical POS", meaning: "Product of maxterms; every sum term contains every variable exactly once.", example: "F = ΠM(0,2,4)" },
  { term: "SOP", meaning: "Sum of Products: OR of AND terms.", example: "AB + AC'" },
  { term: "POS", meaning: "Product of Sums: AND of OR terms.", example: "(A+B)(A+C')" },
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

export const GATE_CONVERSIONS = [
  { from: "Boolean expression", to: "Logic circuit", steps: ["Read NOT/complements first", "Build AND terms", "Combine terms with OR", "Verify with truth table"], example: "F=A'B+AC → NOT A → AND gates → OR gate" },
  { from: "Logic circuit", to: "Boolean expression", steps: ["Name each gate output", "Write each gate equation", "Substitute intermediate outputs", "Simplify if required"], example: "AND output X=AB; OR with C → F=AB+C" },
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
  "1. Count variables. With n variables, prepare 2^n rows.",
  "2. Write input combinations systematically.",
  "3. Create intermediate-operation columns before the final output.",
  "4. Evaluate complements and operations in the correct order.",
  "5. Compare the final output column with the target expression.",
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
  mintermConstruction: ["1 → uncomplemented variable.", "0 → complemented variable.", "AND the literals together."],
  maxtermConstruction: ["0 → uncomplemented variable.", "1 → complemented variable.", "OR the literals together."],
  notation: ["Σm(...) lists F=1 row indices and names canonical SOP.", "ΠM(...) lists F=0 row indices and names canonical POS.", "For n variables, valid indices run from 0 to 2^n−1."],
  workedExamples: [
    { id: "MM-01", truthRow: "A=1, B=0, F=1", minterm: "m2 = AB'", why: "10₂ = 2." },
    { id: "MM-02", truthRow: "A=1, B=0, C=1, F=1", minterm: "m5 = AB'C", why: "101₂ = 5." },
    { id: "MM-03", truthRow: "A=1, B=0, C=1, F=0", maxterm: "M5 = A' + B + C'", why: "The maxterm evaluates to 0 on row 101." },
  ],
  conversionWorkflow: ["Truth table → F=1 rows → minterms → OR → canonical SOP → Σm.", "Truth table → F=0 rows → maxterms → AND → canonical POS → ΠM.", "Cross-check the complementary row sets."],
  examTraps: ["Minterm: 0 means complemented; 1 means uncomplemented.", "Maxterm: 0 means uncomplemented; 1 means complemented.", "Keep variable order fixed.", "Canonical means every term contains every variable exactly once."],
};

const booleanAlgebra = {
  id: "xii-boolean-algebra",
  title: "Boolean Algebra",
  tagline: "Stop memorising laws. Learn to SEE why the answer is true.",
  learningPath: [
    { id: "why", title: "Why Boolean Algebra?", goal: "Connect 0/1 logic to switches, gates and computer decisions." },
    { id: "language", title: "Learn the Language", goal: "Variables, literals, complements, constants and operators." },
    { id: "truth", title: "Master Truth Tables", goal: "Build, read and verify every input/output combination." },
    { id: "gates", title: "Logic Gates & Conversion", goal: "Move between truth tables, Boolean expressions and circuits." },
    { id: "laws", title: "Master the Laws", goal: "Learn each law through patterns, truth tables and intuition." },
    { id: "simplify", title: "Simplify Step-by-Step", goal: "Turn long expressions into short exam-ready forms." },
    { id: "canonical", title: "Minterms & Maxterms", goal: "Move from truth tables to canonical SOP/POS forms." },
    { id: "kmap", title: "K-Map", goal: "Group adjacent cells to reach minimal expressions." },
    { id: "exam", title: "Exam Mode", goal: "Solve ISC-style problems under time pressure." },
  ],
  mentalModels: [
    { title: "Logic with arithmetic symbols", explanation: "The values are only 0 and 1. Ask what logic the expression represents.", example: "A+B = OR, AB = AND, A' = NOT." },
    { title: "Every law is a pattern", explanation: "Meaning lets you reconstruct rules instead of memorising isolated formulas.", example: "A+0=A because OR with false changes nothing." },
    { title: "Simplification is controlled rewriting", explanation: "Rewrite one sub-expression at a time and identify the law.", example: "A+AB → A(1+B) → A." },
  ],
  terminology: BOOLEAN_TERMINOLOGY,
  gateTable: BOOLEAN_GATE_TABLE,
  gateConversions: GATE_CONVERSIONS,
  universalGateDesigns: UNIVERSAL_GATE_DESIGNS,
  notTruthTable: BOOLEAN_NOT_TRUTH_TABLE,
  truthTables: BOOLEAN_TRUTH_TABLES,
  truthTableMethod: TRUTH_TABLE_METHOD,
  truthTableChallenges: TRUTH_TABLE_CHALLENGES_XII,
  mintermMaxtermGuide: MINTERM_MAXTERM_GUIDE,
  kMapGuide: "Use the dedicated K-Map module for 2-, 3- and 4-variable maps, grouping, wrap-around and don’t-care cases.",
  lawDeck: [
    { name: "Identity", rules: ["A + 0 = A", "A·1 = A"], intuition: "False changes OR nothing; true changes AND nothing." },
    { name: "Null / Dominance", rules: ["A + 1 = 1", "A·0 = 0"], intuition: "True dominates OR; false dominates AND." },
    { name: "Idempotent", rules: ["A + A = A", "A·A = A"], intuition: "Repeating the same condition does not change it." },
    { name: "Complement", rules: ["A + A' = 1", "A·A' = 0"], intuition: "A and NOT A cannot both be true, and one is always true." },
    { name: "Involution", rules: ["(A')' = A"], intuition: "Negating twice returns the original value." },
    { name: "Commutative", rules: ["A+B=B+A", "AB=BA"], intuition: "Order does not matter for AND or OR." },
    { name: "Associative", rules: ["A+(B+C)=(A+B)+C", "A(BC)=(AB)C"], intuition: "Grouping does not change repeated AND/OR." },
    { name: "Distributive", rules: ["A(B+C)=AB+AC", "A+BC=(A+B)(A+C)"], intuition: "Boolean algebra has both product-over-sum and sum-over-product distribution patterns." },
    { name: "Absorption", rules: ["A+AB=A", "A(A+B)=A"], intuition: "A stronger condition already contains the weaker A condition." },
    { name: "De Morgan", rules: ["(A+B)'=A'B'", "(AB)'=A'+B'"], intuition: "Negating a group flips the operator and complements every literal." },
  ],
  workedExamples: [
    { id: "LAW-01", level: "foundation", title: "Absorption", expression: "A + AB", steps: [{ line: "A + AB", law: "Factorisation", reason: "A(1+B)" }, { line: "A(1+B)", law: "Null/Dominance", reason: "1+B=1" }, { line: "A", law: "Identity", reason: "A·1=A" }], examTip: "Look for a shorter term that already covers a longer term." },
    { id: "LAW-02", level: "exam", title: "Complement", expression: "A + A'B", steps: [{ line: "A + A'B", law: "Distributive", reason: "(A+A')(A+B)" }, { line: "(A+A')(A+B)", law: "Complement", reason: "A+A'=1" }, { line: "A+B", law: "Identity", reason: "1·(A+B)=A+B" }], examTip: "Do not jump steps; show the law that justifies each transformation." },
  ],
  mcqs: [
    { id: "BA-MCQ-01", question: "Which gate gives 1 only when both inputs are 1?", options: ["OR", "AND", "XOR", "NOR"], answer: "AND", explanation: "AND is true only when all inputs are true." },
    { id: "BA-MCQ-02", question: "For three Boolean variables, how many truth-table rows are required?", options: ["6", "8", "9", "16"], answer: "8", explanation: "2³ = 8." },
    { id: "BA-MCQ-03", question: "Which notation represents canonical SOP?", options: ["ΠM", "Σm", "Πm", "ΣM"], answer: "Σm", explanation: "Canonical SOP is the sum of minterms." },
    { id: "BA-MCQ-04", question: "Which gates are universal?", options: ["AND/OR", "XOR/XNOR", "NAND/NOR", "NOT/XOR"], answer: "NAND/NOR", explanation: "Any Boolean function can be constructed using NAND only or NOR only." },
  ],
  outputTracing: [
    { id: "BA-OUT-01", question: "For A=1,B=0, evaluate Y=A+B and Y=AB.", answer: "A+B=1; AB=0." },
    { id: "BA-OUT-02", question: "For A=0,B=1,C=1, evaluate F=A'B+AC.", answer: "1·1 + 0·1 = 1." },
  ],
  debugging: [
    { id: "BA-DBG-01", mistake: "A+A'=0", correction: "A+A'=1", why: "A and its complement cover every possible input." },
    { id: "BA-DBG-02", mistake: "(A+B)'=A'+B'", correction: "(A+B)'=A'B'", why: "De Morgan changes OR to AND while complementing each literal." },
  ],
  masteryChecks: [
    { id: "truth", title: "Truth Tables", success: "Build and verify a complete table." },
    { id: "laws", title: "Boolean Laws", success: "Explain and apply the correct law." },
    { id: "canonical", title: "Canonical Forms", success: "Convert truth table ↔ Σm/ΠM." },
    { id: "kmap", title: "K-Map", success: "Find a minimal expression." },
    { id: "implementation", title: "Implementation", success: "Translate expression ↔ gate circuit." },
  ],
};

export default booleanAlgebra;
