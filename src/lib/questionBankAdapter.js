/**
 * Target95+ — ISC Class XII Computer Science (Paper 868)
 * Section A Master Study Content: Boolean Algebra, Logic Gates & K-Maps
 * Standard: CISCE Examination Syllabus Comprehensive Coverage
 */

export const iscXIIBooleanAlgebraStudyData = {
  id: "isc-xii-sec-a-boolean-kmap",
  title: "Boolean Algebra, Logic Gates & Karnaugh Maps (K-Maps)",
  standard: "ISC Class XII (Paper 868 - Section A)",
  readingTimeMinutes: 45,

  // ==========================================
  // SECTION 1: PROPOSITIONAL LOGIC & WFF
  // ==========================================
  propositionalLogic: {
    title: "Propositional Logic & Well-Formed Formulae (WFF)",
    theory: `A **proposition** (or statement) is a declarative sentence that is either **True (1)** or **False (0)**, but never both simultaneously.

* **Well-Formed Formula (WFF):** An expression composed of propositional variables (p, q, r...), logical connectives, and parentheses that follows strict syntactic grammar.
* **Truth Values:** Denoted as T/F or binary 1/0.

### Logical Connectives & Truth Table Definitions
1. **Conjunction (AND - ∧ / ·):** Evaluates to 1 if and only if both propositions are 1.
2. **Disjunction (OR - ∨ / +):** Evaluates to 1 if at least one proposition is 1.
3. **Negation (NOT - ¬ / ~ / '):** Inverts the truth value ($¬1 = 0$, $¬0 = 1$).
4. **Conditional / Implication ($p \\rightarrow q$):** Equivalent to $¬p \\lor q$. Evaluates to False *only* when $p$ (Hypothesis) is True and $q$ (Conclusion) is False.
5. **Biconditional / Equivalence ($p \\leftrightarrow q$):** Equivalent to $(p \\rightarrow q) \\land (q \\rightarrow p)$. Evaluates to True when both $p$ and $q$ share identical truth values.

### Derived Conditional Propositions
* **Original Implication:** $p \\rightarrow q$
* **Converse:** $q \\rightarrow p$
* **Inverse:** $¬p \\rightarrow ¬q$
* **Contrapositive:** $¬q \\rightarrow ¬p$
*(Key ISC Principle: An implication is always logically equivalent to its Contrapositive: $p \\rightarrow q \\equiv ¬q \\rightarrow ¬p$. The converse is equivalent to the inverse).*

### Classification of Formulae
* **Tautology (Valid Formula):** True under every possible truth assignment (e.g., $p \\lor ¬p$).
* **Contradiction / Fallacy (Unsatisfiable Formula):** False under every possible truth assignment (e.g., $p \\land ¬p$).
* **Contingency (Satisfiable Formula):** True for at least one assignment and False for at least one assignment.`,
    truthTableSample: `
| p | q | ¬p | p ∧ q | p ∨ q | p → q | q → p (Converse) | ¬p → ¬q (Inverse) | ¬q → ¬p (Contrapositive) | p ↔ q |
|---|---|----|-------|-------|-------|------------------|-------------------|--------------------------|-------|
| 0 | 0 | 1  |   0   |   0   |   1   |        1         |         1         |            1             |   1   |
| 0 | 1 | 1  |   0   |   1   |   1   |        0         |         0         |            1             |   0   |
| 1 | 0 | 0  |   0   |   1   |   0   |        1         |         1         |            0             |   0   |
| 1 | 1 | 0  |   1   |   1   |   1   |        1         |         1         |            1             |   1   |`
  },

  // ==========================================
  // SECTION 2: BOOLEAN LAWS & THEOREMS
  // ==========================================
  booleanTheorems: {
    title: "Boolean Laws, Theorems & Principle of Duality",
    theory: `### Principle of Duality
Any valid Boolean identity remains valid if:
1. Every **AND (·)** operator is swapped with **OR (+)**.
2. Every **OR (+)** operator is swapped with **AND (·)**.
3. Every **0** is swapped with **1**, and every **1** with **0**.
*(Note: Do NOT complement variables when obtaining the dual).*

### Standard Boolean Laws Table
| Law Name | AND Form (·) | OR Form (+) |
|---|---|---|
| **Identity Law** | $A \\cdot 1 = A$ | $A + 0 = A$ |
| **Null / Dominance Law** | $A \\cdot 0 = 0$ | $A + 1 = 1$ |
| **Idempotent Law** | $A \\cdot A = A$ | $A + A = A$ |
| **Complementarity Law** | $A \\cdot A' = 0$ | $A + A' = 1$ |
| **Involution Law** | $(A')' = A$ | $(A')' = A$ |
| **Commutative Law** | $A \\cdot B = B \\cdot A$ | $A + B = B + A$ |
| **Associative Law** | $A(BC) = (AB)C$ | $A + (B + C) = (A + B) + C$ |
| **Distributive Law** | $A + (B \\cdot C) = (A + B)(A + C)$ | $A \\cdot (B + C) = AB + AC$ |
| **Absorption Law** | $A(A + B) = A$ | $A + AB = A$ |
| **Redundant Literal Law** | $A + A'B = A + B$ | $A(A' + B) = AB$ |
| **De Morgan's Laws** | $(A \\cdot B)' = A' + B'$ | $(A + B)' = A' \\cdot B'$ |`,
    consensusTheorem: `### Consensus Theorem (ISC Advanced)
* **SOP Form:** $AB + A'C + BC = AB + A'C$
* **POS Form:** $(A + B)(A' + C)(B + C) = (A + B)(A' + C)$
* **Elimination Rule:** The redundant term ($BC$) consists of the variables associated with the complemented variable pair ($A$ and $A'$).`
  },

  // ==========================================
  // SECTION 3: CANONICAL FORMS (SOP & POS)
  // ==========================================
  canonicalForms: {
    title: "Minterms, Maxterms, Canonical & Cardinal Notation",
    theory: `### Minterms (Product Terms - SOP)
* Represents binary combinations where output evaluates to **1**.
* Variable is unprimed if its value is **1** ($A$), primed if its value is **0** ($A'$).
* Symbol: lowercase $m_i$.
* Shorthand / Cardinal SOP: $F(A, B, C) = \\sum m(1, 4, 5, 7)$.

### Maxterms (Sum Terms - POS)
* Represents binary combinations where output evaluates to **0**.
* Variable is unprimed if its value is **0** ($A$), primed if its value is **1** ($A'$).
* Symbol: uppercase $M_i$.
* Shorthand / Cardinal POS: $F(A, B, C) = \\prod M(0, 2, 3, 6)$.

### Conversion Principle
$\\sum m(list) = \\prod M(remaining\\ indices)$
For a 3-variable system ($2^3 = 8$ total combinations, $0$ to $7$):
If $F(A, B, C) = \\sum m(1, 3, 5, 7)$, then $F(A, B, C) = \\prod M(0, 2, 4, 6)$.`
  },

  // ==========================================
  // SECTION 4: KARNAUGH MAPS (K-MAPS)
  // ==========================================
  karnaughMaps: {
    title: "Karnaugh Maps (2, 3, 4 Variables) & Reduction Rules",
    theory: `A K-Map is a graphical representation organizing truth tables into adjacent cells ordered by **Gray Code** ($00, 01, 11, 10$) so that adjacent cells differ by exactly one bit.

### Step-by-Step Reduction Rules
1. **Group Sizes:** Must be powers of $2$ ($1, 2, 4, 8, 16$).
2. **Cell Priority:** Hexadecimal ($16$) > Octet ($8$) > Quad ($4$) > Pair ($2$) > Single cell ($1$).
3. **Wrap-Around Adjacency:** Leftmost column is adjacent to rightmost column. Top row is adjacent to bottom row.
4. **Corner Adjacency (Quad of 4 Corners):** Cells $m_0, m_2, m_8, m_{10}$ form a valid quad reducing to $B'D'$.
5. **Redundant Groups:** If all 1s (or 0s) in a group are already covered by other independent valid groups, drop the redundant group.

### 4-Variable K-Map Layout (Standard ISC Cell Indices)
\`\`\`
       CD=00   CD=01   CD=11   CD=10
AB=00 |   0   |   1   |   3   |   2   |
AB=01 |   4   |   5   |   7   |   6   |
AB=11 |  12   |  13   |  15   |  14   |
AB=10 |   8   |   9   |  11   |  10   |
\`\`\`

### Worked Reduction Example (SOP)
* **Function:** $F(A, B, C, D) = \\sum m(0, 2, 4, 5, 6, 7, 8, 10, 14, 15)$
* **Grouping Breakdown:**
  * **Quad 1 (Corners: 0, 2, 8, 10):** Rows $AB=00, 10$ ($B'$ constant) & Cols $CD=00, 10$ ($D'$ constant) $\\rightarrow \\mathbf{B'D'}$
  * **Quad 2 (Middle Row: 4, 5, 6, 7):** Row $AB=01$ ($A'B$ constant) & all Cols $\\rightarrow \\mathbf{A'B}$
  * **Quad 3 (Wrap Column: 2, 6, 14, 10):** All Rows & Col $CD=10$ ($CD'$ constant) $\\rightarrow \\mathbf{CD'}$
  * **Pair (14, 15):** Covered by Quad 3 and Quad ($7, 6, 15, 14$) $\\rightarrow \\mathbf{BC}$
* **Minimized SOP Expression:** $\\mathbf{F = B'D' + A'B + CD' + BC}$`
  },

  // ==========================================
  // SECTION 5: LOGIC GATES & COMBINATIONAL CIRCUITS
  // ==========================================
  combinationalCircuits: {
    title: "Universal Logic Gates, Adders & Multiplexers",
    theory: `### Universal Logic Gates
* **NAND & NOR:** Any Boolean logic circuit can be designed exclusively using either NAND gates only or NOR gates only.
* **NAND Realization:**
  * **NOT(A):** $A \\text{ NAND } A = (A \\cdot A)' = A'$
  * **AND(A, B):** $(A \\text{ NAND } B) \\text{ NAND } (A \\text{ NAND } B) = AB$
  * **OR(A, B):** $(A \\text{ NAND } A) \\text{ NAND } (B \\text{ NAND } B) = A' \\text{ NAND } B' = (A'B')' = A + B$

### Half Adder & Full Adder
* **Half Adder:** Adds two 1-bit binary numbers ($A, B$).
  * $\\text{Sum} (S) = A \\oplus B = A'B + AB'$
  * $\\text{Carry} (C) = A \\cdot B$
* **Full Adder:** Adds three 1-bit binary inputs ($A, B, C_{in}$).
  * $\\text{Sum} (S) = A \\oplus B \\oplus C_{in}$
  * $\\text{Carry Out} (C_{out}) = AB + BC_{in} + AC_{in} = AB + C_{in}(A \\oplus B)$

### Multiplexers (Data Selectors)
* **$2^n$-to-1 Multiplexer:** Has $2^n$ data inputs, $n$ selection control lines, and $1$ single output.
* **4-to-1 MUX Equations:**
  $$Y = S_1'S_0'I_0 + S_1'S_0I_1 + S_1S_0'I_2 + S_1S_0I_3$$`,
    circuitAsciiDiagram: `
HALF ADDER CIRCUIT SCHEMATIC:
       A ──────┬───────────────[ XOR ]──────> SUM (A ⊕ B)
               │                 │
       B ───┬──┼─────────────────┘
            │  │
            │  └───────────────[ AND ]──────> CARRY (A · B)
            └────────────────────┘
`
  },

  // ==========================================
  // SECTION 6: 15 COMPREHENSIVE MCQs
  // ==========================================
  mcqs: [
    {
      id: "ISC-BA-MCQ-001",
      difficulty: "easy",
      topic: "Propositional Logic",
      question: "The conditional statement p → q is logically equivalent to which of the following expressions?",
      options: ["A) p ∧ ¬q", "B) ¬p ∨ q", "C) ¬p ∧ q", "D) p ∨ ¬q"],
      correctAnswer: "B",
      explanation: "By conditional elimination law, p → q is logically equivalent to (¬p ∨ q).",
      hint: "Evaluate when an implication becomes False (when p is True and q is False).",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-002",
      difficulty: "easy",
      topic: "Propositional Logic",
      question: "What is the contrapositive of the proposition: 'If a triangle is equilateral (p), then it is equiangular (q)'?",
      options: [
        "A) If a triangle is not equilateral, then it is not equiangular.",
        "B) If a triangle is equiangular, then it is equilateral.",
        "C) If a triangle is not equiangular, then it is not equilateral.",
        "D) A triangle is equilateral if and only if it is equiangular."
      ],
      correctAnswer: "C",
      explanation: "The contrapositive of p → q is ¬q → ¬p (If not equiangular, then not equilateral).",
      hint: "Swap the hypothesis and conclusion, then negate both.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-003",
      difficulty: "medium",
      topic: "Boolean Algebra",
      question: "What is the dual of the Boolean expression: A + A'B = A + B?",
      options: [
        "A) A · (A' + B) = A · B",
        "B) A' · (A + B') = A' · B'",
        "C) A · (A + B) = A · B",
        "D) A' + (A · B') = A' + B'"
      ],
      correctAnswer: "A",
      explanation: "To find the dual, change OR (+) to AND (·) and AND to OR without complementing the variables: A · (A' + B) = A · B.",
      hint: "Swap + with · and 0 with 1. Do NOT complement variables.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-004",
      difficulty: "medium",
      topic: "Boolean Algebra",
      question: "The Boolean expression X + X'Y reduces algebraically to:",
      options: ["A) X", "B) Y", "C) X + Y", "D) XY"],
      correctAnswer: "C",
      explanation: "By Distributive Law: X + X'Y = (X + X')(X + Y) = 1 · (X + Y) = X + Y.",
      hint: "Distribute X over (X'Y).",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-005",
      difficulty: "medium",
      topic: "Canonical Forms",
      question: "In a 3-variable Boolean system with variables A, B, and C, what is the maxterm M5?",
      options: ["A) A · B' · C", "B) A' + B + C'", "C) A + B' + C", "D) A' · B · C'"],
      correctAnswer: "B",
      explanation: "Binary 5 = 101. In POS maxterm notation, 1 is primed and 0 is unprimed with OR (+) connectives: A' + B + C'.",
      hint: "5 in binary is 101. For maxterms: 1 means primed, 0 means unprimed.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-006",
      difficulty: "hard",
      topic: "Canonical Forms",
      question: "If F(A, B, C) = Σm(0, 2, 4, 6), what is the equivalent cardinal POS representation?",
      options: [
        "A) ΠM(0, 2, 4, 6)",
        "B) ΠM(1, 3, 5, 7)",
        "C) Σm(1, 3, 5, 7)",
        "D) ΠM(1, 2, 3, 5)"
      ],
      correctAnswer: "B",
      explanation: "Total 3-variable space has indices 0-7. The complementary maxterms are the missing minterms: 1, 3, 5, 7.",
      hint: "POS consists of all index numbers absent from the SOP form.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-007",
      difficulty: "medium",
      topic: "K-Maps",
      question: "Why does the sequence of rows and columns in a Karnaugh map follow Gray code (00, 01, 11, 10)?",
      options: [
        "A) It is faster to calculate in binary",
        "B) Adjacent cells differ by only one binary variable bit",
        "C) It allows direct conversion to Hexadecimal",
        "D) It ensures all terms are minterms"
      ],
      correctAnswer: "B",
      explanation: "Gray code guarantees unit Hamming distance (1-bit change) between physically adjacent cells, allowing algebraic cancellation ($A + A' = 1$).",
      hint: "Look at the difference in bits between 01 and 11.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-008",
      difficulty: "hard",
      topic: "K-Maps",
      question: "In a 4-variable K-Map (A,B,C,D), what term is obtained by grouping the four corner cells (m0, m2, m8, m10)?",
      options: ["A) A'C'", "B) B'D'", "C) BD", "D) A'D'"],
      correctAnswer: "B",
      explanation: "m0(0000), m2(0010), m8(1000), m10(1010). A and C change from 0 to 1, while B=0 (B') and D=0 (D') remain constant.",
      hint: "Check which variable polarities remain invariant across all four corners.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-009",
      difficulty: "easy",
      topic: "Logic Gates",
      question: "Which of the following gate pairs are designated as Universal Gates?",
      options: [
        "A) AND and OR",
        "B) NAND and NOR",
        "C) XOR and XNOR",
        "D) NOT and AND"
      ],
      correctAnswer: "B",
      explanation: "NAND and NOR can individually implement all three basic Boolean functions (AND, OR, NOT) without any other gate type.",
      hint: "These gates can recreate AND, OR, and NOT entirely on their own.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-010",
      difficulty: "medium",
      topic: "Combinational Circuits",
      question: "What are the Boolean outputs of a Half Adder with inputs A and B?",
      options: [
        "A) Sum = A + B, Carry = AB",
        "B) Sum = A ⊕ B, Carry = A + B",
        "C) Sum = A ⊕ B, Carry = AB",
        "D) Sum = AB, Carry = A ⊕ B"
      ],
      correctAnswer: "C",
      explanation: "In binary addition: 0+0=0, 0+1=1, 1+0=1, 1+1=0 (Carry 1). Sum is modeled by XOR ($A \\oplus B$) and Carry by AND ($AB$).",
      hint: "Sum is odd-parity XOR, carry occurs only when both bits are 1.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-011",
      difficulty: "hard",
      topic: "Combinational Circuits",
      question: "How many 2-to-1 Multiplexers are required to construct an 8-to-1 Multiplexer?",
      options: ["A) 4", "B) 6", "C) 7", "D) 8"],
      correctAnswer: "C",
      explanation: "Stage 1: 4 MUXes (taking 8 inputs to 4 lines). Stage 2: 2 MUXes (4 lines to 2 lines). Stage 3: 1 MUX (2 lines to 1 output). Total = 4 + 2 + 1 = 7.",
      hint: "Use tree hierarchy: 4 + 2 + 1.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-012",
      difficulty: "medium",
      topic: "Combinational Circuits",
      question: "An encoder with 8 input lines will produce how many binary output lines?",
      options: ["A) 2", "B) 3", "C) 4", "D) 8"],
      correctAnswer: "B",
      explanation: "An encoder converts $2^n$ inputs into $n$ coded outputs. Here $2^3 = 8$, so output lines $n = 3$ (Octal to Binary).",
      hint: "Formula: 2^n inputs produce n outputs.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-013",
      difficulty: "hard",
      topic: "Boolean Algebra",
      question: "According to Consensus Theorem, what is the reduced form of AB + A'C + BC?",
      options: ["A) AB + BC", "B) A'C + BC", "C) AB + A'C", "D) (A + B)(A' + C)"],
      correctAnswer: "C",
      explanation: "Variable A appears uncomplemented in AB and complemented in A'C. The third term BC is the consensus term and is redundant.",
      hint: "The consensus term contains the non-complemented partner variables.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-014",
      difficulty: "medium",
      topic: "Propositional Logic",
      question: "A proposition that is neither a tautology nor a contradiction is called a:",
      options: ["A) Fallacy", "B) Contingency", "C) Valid formula", "D) Dual"],
      correctAnswer: "B",
      explanation: "A proposition whose truth table contains both True and False outcomes depending on variable values is a contingency.",
      hint: "It depends on the condition.",
      marks: 1
    },
    {
      id: "ISC-BA-MCQ-015",
      difficulty: "hard",
      topic: "Logic Gates",
      question: "How many two-input NAND gates are required to construct an XOR gate?",
      options: ["A) 3", "B) 4", "C) 5", "D) 6"],
      correctAnswer: "B",
      explanation: "An XOR gate ($A'B + AB'$) requires exactly 4 NAND gates connected in a 3-tier structure.",
      hint: "Draw NAND(A, B) feeding into two parallel NAND gates.",
      marks: 1
    }
  ],

  // ==========================================
  // SECTION 7: LOGIC TRACING & OUTPUT DRILLS
  // ==========================================
  outputQuestions: [
    {
      id: "ISC-OUT-001",
      topic: "Truth Table Evaluation",
      question: "Evaluate the truth value of the compound proposition: ((p → q) ∧ ¬q) → ¬p when p = 1 and q = 0.",
      correctAnswer: "1 (True)",
      stepByStepTracing: [
        "Step 1: Evaluate (p → q) = (1 → 0) = 0",
        "Step 2: Evaluate ¬q = ¬0 = 1",
        "Step 3: Evaluate ((p → q) ∧ ¬q) = (0 ∧ 1) = 0",
        "Step 4: Evaluate ¬p = ¬1 = 0",
        "Step 5: Evaluate 0 → 0 = 1",
        "Final Result: 1 (This proposition is Modus Tollens, a valid tautology)."
      ]
    },
    {
      id: "ISC-OUT-002",
      topic: "K-Map Group Reduction",
      question: "Determine the simplified sum-of-products term for an octet group consisting of cells m0, m1, m2, m3, m4, m5, m6, m7 in a 4-variable K-Map (A, B, C, D).",
      correctAnswer: "A'",
      stepByStepTracing: [
        "Step 1: The octet covers Row 00 (AB=00) and Row 01 (AB=01) across all columns 00, 01, 11, 10.",
        "Step 2: Compare Row indices (00 vs 01): A is constant at 0 (A'), B changes (0 → 1, eliminated).",
        "Step 3: Across all 4 columns, variables C and D both change through all combinations (eliminated).",
        "Final Term: A'"
      ]
    }
  ],

  // ==========================================
  // SECTION 8: ISC BOARD PYQ BANK (WITH SOLUTIONS)
  // ==========================================
  boardPyqs: [
    {
      id: "ISC-PYQ-2024",
      year: "ISC 2024",
      marks: 5,
      question: "Given the Boolean function: F(A, B, C, D) = Σm(0, 1, 2, 4, 5, 8, 9, 10, 12, 13). Reduce it using a 4-variable Karnaugh Map, showing groups and algebraic terms.",
      solution: `**K-Map Cell Placement (4x4 Grid):**
* Cells with 1s: m0, m1, m2, m4, m5, m8, m9, m10, m12, m13.
* Cells with 0s: m3, m6, m7, m11, m14, m15.

**Group Formations:**
1. **Octet (m0, m1, m4, m5, m12, m13, m8, m9):**
   * Covers all rows (AB = 00, 01, 11, 10) and first two columns (CD = 00, 01).
   * All AB variables cancel out.
   * In CD (00 and 01): C remains 0 ($C'$), D changes ($0 \\rightarrow 1$).
   * **Term 1 = C'**
2. **Quad Corners/Edges (m0, m2, m8, m10):**
   * Rows $AB = 00, 10$ ($B'$ is constant 0).
   * Columns $CD = 00, 10$ ($D'$ is constant 0).
   * **Term 2 = B'D'**

**Final Minimized Function:**
$$\\mathbf{F(A, B, C, D) = C' + B'D'}$$`
    },
    {
      id: "ISC-PYQ-2023",
      year: "ISC 2023",
      marks: 3,
      question: "State and prove De Morgan's Second Law algebraically: (A + B)' = A' · B'.",
      solution: `**Statement:** The complement of a logical sum (OR) is equal to the logical product (AND) of the individual complements.

**Algebraic Proof using Complementarity Axioms:**
To prove $(A + B)' = A'B'$, we must demonstrate two conditions:
1. **$(A + B) + (A'B') = 1$** (Additive Identity)
   $$\\begin{aligned}
   (A + B) + A'B' &= ((A + B) + A') \\cdot ((A + B) + B') \\quad \\text{[Distributive Law]} \\\\
   &= (A + A' + B) \\cdot (A + B + B') \\\\
   &= (1 + B) \\cdot (A + 1) \\quad \\text{[Complementarity: } A + A' = 1 \\text{]} \\\\
   &= 1 \\cdot 1 = 1 \\quad \\text{[Null Law]}
   \\end{aligned}$$
2. **$(A + B) \\cdot (A'B') = 0$** (Multiplicative Identity)
   $$\\begin{aligned}
   (A + B) \\cdot (A'B') &= A(A'B') + B(A'B') \\quad \\text{[Distributive Law]} \\\\
   &= (AA')B' + A'(BB') \\\\
   &= 0 \\cdot B' + A' \\cdot 0 \\quad \\text{[Complementarity: } AA' = 0 \\text{]} \\\\
   &= 0 + 0 = 0
   \\end{aligned}$$
Since both conditions hold, $(A + B)' = A'B'$ is proven.`
    },
    {
      id: "ISC-PYQ-2020",
      year: "ISC 2020",
      marks: 4,
      question: "Draw the logic circuit diagram of a 4-to-1 Multiplexer and write its characteristic Boolean function table.",
      solution: `**Boolean Expression:**
$$Y = S_1'S_0'I_0 + S_1'S_0I_1 + S_1S_0'I_2 + S_1S_0I_3$$

**Function Table:**
| Select Line $S_1$ | Select Line $S_0$ | Output $Y$ | Selected Input Line |
|---|---|---|---|
| 0 | 0 | $I_0$ | Input 0 |
| 0 | 1 | $I_1$ | Input 1 |
| 1 | 0 | $I_2$ | Input 2 |
| 1 | 1 | $I_3$ | Input 3 |

**Circuit Logic:**
1. Two NOT gates invert $S_1$ and $S_0$ to generate $S_1'$ and $S_0'$.
2. Four 3-input AND gates generate the minterm products ($S_1'S_0'I_0$, $S_1'S_0I_1$, $S_1S_0'I_2$, $S_1S_0I_3$).
3. One 4-input OR gate combines the outputs of all 4 AND gates to produce output $Y$.`
    }
  ]
};

export default iscXIIBooleanAlgebraStudyData;
