// ISC XII K-Map module: concept-first, exam-ready and truth-table connected.
export const KMAP_GUIDE = {
  title: "Karnaugh Maps (K-Maps)",
  bigIdea: "A K-map rearranges truth-table outputs so adjacent cells differ in only one variable. Grouping those cells removes variables that change and produces a simpler Boolean expression.",
  purpose: "A K-map rearranges truth-table outputs so adjacent cells differ in only one variable. Grouping those cells removes variables that change and produces a simpler Boolean expression.",
  variableRule: "2 variables → 4 cells; 3 variables → 8 cells; 4 variables → 16 cells.",
  grayCode: ["00", "01", "11", "10"],
  maps: {
    twoVariable: {
      columns: ["B=0", "B=1"],
      rows: ["A=0", "A=1"],
      cells: [
        { row: "A=0", col: "B=0", index: 0 },
        { row: "A=0", col: "B=1", index: 1 },
        { row: "A=1", col: "B=0", index: 2 },
        { row: "A=1", col: "B=1", index: 3 }
      ],
      example: { expression: "F(A,B)=Σm(1,3)", result: "B", selected: [1, 3] }
    },
    threeVariable: {
      columns: ["BC=00", "BC=01", "BC=11", "BC=10"],
      rows: ["A=0", "A=1"],
      cells: [
        { row: "A=0", col: "00", index: 0 },
        { row: "A=0", col: "01", index: 1 },
        { row: "A=0", col: "11", index: 3 },
        { row: "A=0", col: "10", index: 2 },
        { row: "A=1", col: "00", index: 4 },
        { row: "A=1", col: "01", index: 5 },
        { row: "A=1", col: "11", index: 7 },
        { row: "A=1", col: "10", index: 6 }
      ],
      example: { expression: "F(A,B,C)=Σm(1,3,5,7)", result: "C", selected: [1, 3, 5, 7] }
    },
    fourVariable: {
      columns: ["CD=00", "CD=01", "CD=11", "CD=10"],
      rows: ["AB=00", "AB=01", "AB=11", "AB=10"],
      cells: [
        { row: "AB=00", col: "00", index: 0 },
        { row: "AB=00", col: "01", index: 1 },
        { row: "AB=00", col: "11", index: 3 },
        { row: "AB=00", col: "10", index: 2 },
        { row: "AB=01", col: "00", index: 4 },
        { row: "AB=01", col: "01", index: 5 },
        { row: "AB=01", col: "11", index: 7 },
        { row: "AB=01", col: "10", index: 6 },
        { row: "AB=11", col: "00", index: 12 },
        { row: "AB=11", col: "01", index: 13 },
        { row: "AB=11", col: "11", index: 15 },
        { row: "AB=11", col: "10", index: 14 },
        { row: "AB=10", col: "00", index: 8 },
        { row: "AB=10", col: "01", index: 9 },
        { row: "AB=10", col: "11", index: 11 },
        { row: "AB=10", col: "10", index: 10 }
      ],
      example: { expression: "F(A,B,C,D)=Σm(0,1,2,3)", result: "A'B'", selected: [0, 1, 2, 3] }
    }
  },
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
    { title: "Wrap-around", rule: "First and last rows/columns are adjacent — treat the map as if it wraps top-to-bottom and left-to-right." },
    { title: "Corner grouping", rule: "All four corners of a 4-variable K-map can form a valid group of four." },
    { title: "Overlap", rule: "A cell can be reused in more than one group when it helps form a larger or necessary group." },
    { title: "Don't-care (X)", rule: "Treat a don't-care cell as 0 or 1 — whichever helps form a larger, valid group." }
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
