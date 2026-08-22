// ISC XII K-Map module: concept-first, exam-ready and truth-table connected.
export const KMAP_GUIDE = {
  title: "Karnaugh Maps (K-Maps)",
  purpose: "A K-map rearranges truth-table outputs so adjacent cells differ in only one variable. Grouping those cells removes variables that change and produces a simpler Boolean expression.",
  variableRule: "2 variables → 4 cells; 3 variables → 8 cells; 4 variables → 16 cells.",
  grayCode: ["00", "01", "11", "10"],
  coreRules: [
    "Use Gray-code order, not ordinary binary order.",
    "Groups contain 1, 2, 4, 8... cells only.",
    "Make groups rectangular and as large as possible.",
    "Cover every required 1 for SOP or 0 for POS.",
    "Wrap-around and valid overlap are allowed.",
    "Diagonal cells are not adjacent.",
    "Keep variable order fixed throughout the map."
  ],
  workflow: [
    "Start from the truth table or canonical SOP/POS.",
    "Fix variable order and Gray-code labels.",
    "Place minterms/maxterms into cells.",
    "Make the largest useful power-of-two groups.",
    "Keep variables that stay constant; eliminate variables that change.",
    "Write the simplified SOP or POS expression.",
    "Verify the result against the original function."
  ],
  sopRule: "SOP groups 1s: constant 1 stays uncomplemented; constant 0 stays complemented.",
  posRule: "POS groups 0s: constant 0 stays uncomplemented in the sum; constant 1 stays complemented.",
  groupSizes: [1, 2, 4, 8, 16],
  examples: [
    { expression: "F(A,B)=Σm(1,3)", variables: 2, result: "B", reason: "B stays 1 while A changes." },
    { expression: "F(A,B,C)=Σm(1,3,5,7)", variables: 3, result: "C", reason: "C stays 1 in all four selected cells." },
    { expression: "F(A,B,C,D)=Σm(0,1,2,3)", variables: 4, result: "A'B'", reason: "The four-cell group keeps A=0 and B=0; C and D change." },
    { expression: "F(A,B,C,D)=Σm(0,2,8,10)", variables: 4, result: "B'D'", reason: "The selected cells form a wrap-around group where B=0 and D=0." },
    { expression: "F(A,B,C)=ΠM(0,2,4,6)", variables: 3, result: "C", reason: "Group the four zeros; C remains 0, giving POS result C." }
  ],
  specialPatterns: [
    "Wrap-around: first and last rows/columns are adjacent.",
    "Corner grouping: all four corners can form a valid group in a 4-variable map.",
    "Overlap: reuse a cell when it creates a larger or necessary group.",
    "Don't-care X: use it as 0 or 1 only when it simplifies a useful grouping."
  ],
  examTraps: [
    "Do not use 00,01,10,11 as K-map order; use 00,01,11,10.",
    "A group of 3 is invalid.",
    "Diagonal cells are not adjacent.",
    "Do not ignore wrap-around.",
    "Canonical SOP/POS is not the same as minimal K-map form."
  ],
  practice: [
    { id: "KM-P-01", difficulty: "easy", question: "Place Σm(1,3) on a 2-variable K-map and simplify.", answer: "B" },
    { id: "KM-P-02", difficulty: "medium", question: "Simplify F(A,B,C)=Σm(1,3,5,7).", answer: "C" },
    { id: "KM-P-03", difficulty: "medium", question: "Simplify F(A,B,C,D)=Σm(0,1,2,3).", answer: "A'B'" },
    { id: "KM-P-04", difficulty: "hard", question: "Simplify F(A,B,C,D)=Σm(0,2,8,10) and identify the wrap-around group.", answer: "B'D'" },
    { id: "KM-P-05", difficulty: "advanced", question: "For F=ΠM(0,2,4,6), simplify using a POS K-map.", answer: "C" }
  ]
};

export default KMAP_GUIDE;
