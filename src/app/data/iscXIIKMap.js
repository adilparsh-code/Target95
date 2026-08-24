// ISC XII K-Map module: concept-first, exam-ready and truth-table connected.

export const KMAP_GUIDE = {
  title: "Karnaugh Maps (K-Maps)",
  purpose: "A K-map rearranges truth-table outputs so adjacent cells differ in only one variable. Grouping those cells removes the variables that change and produces a simpler Boolean expression.",
  bigIdea: "K-Map = visual simplification. You are not guessing an expression; you are finding which variables stay constant inside a group.",
  variableRule: "2 variables → 4 cells; 3 variables → 8 cells; 4 variables → 16 cells.",
  grayCode: ["00", "01", "11", "10"],
  coreRules: [
    "Cell order follows Gray code, not normal binary order: 00, 01, 11, 10.",
    "A valid group contains 1, 2, 4, 8... cells only.",
    "Make groups rectangular and as large as possible.",
    "Every required 1 (SOP) or 0 (POS) must be covered at least once.",
    "Wrap-around is valid: left edge touches right edge, and top edge touches bottom edge.",
    "Diagonal cells are not adjacent.",
    "Overlapping groups are allowed when they remove more variables or are needed for coverage.",
    "For SOP, group 1s and keep variables that stay constant; for POS, group 0s and keep variables that stay constant with the POS rule.",
    "Do not change variable order after placing minterms/maxterms."
  ],
  workflow: [
    "1. Start from the truth table or canonical SOP/POS.",
    "2. Fix the variable order and use Gray-code row/column labels.",
    "3. Place every required minterm/maxterm into its cell.",
    "4. Circle the largest useful groups in powers of two.",
    "5. For each group, cross out variables that change; keep only constants.",
    "6. Write the SOP result by OR-ing product terms, or POS result by AND-ing sum terms.",
    "7. Check uncovered required cells and verify the simplified expression against the original function."
  ],
  sopRule: "SOP: group 1s. A variable that stays 1 becomes uncomplemented; a variable that stays 0 becomes complemented. Variables that change disappear.",
  posRule: "POS: group 0s. A variable that stays 0 appears uncomplemented inside the sum; a variable that stays 1 appears complemented. Variables that change disappear.",
  groupSizes: [1, 2, 4, 8, 16],
  maps: {
    twoVariable: {
      variables: ["A", "B"],
      columns: ["0", "1"],
      rows: ["0", "1"],
      cells: [
        { row: "0", col: "0", index: 0 }, { row: "0", col: "1", index: 1 },
        { row: "1", col: "0", index: 2 }, { row: "1", col: "1", index: 3 }
      ],
      example: {
        expression: "F(A,B)=Σm(1,3)",
        selected: [1,3],
        group: [1,3],
        result: "B",
        reason: "In both selected cells B=1. A changes, so A disappears."
      }
    },
    threeVariable: {
      variables: ["A", "B", "C"],
      columns: ["BC=00", "01", "11", "10"],
      rows: ["A=0", "A=1"],
      cells: [
        { row: "A=0", col: "00", index: 0 }, { row: "A=0", col: "01", index: 1 }, { row: "A=0", col: "11", index: 3 }, { row: "A=0", col: "10", index: 2 },
        { row: "A=1", col: "00", index: 4 }, { row: "A=1", col: "01", index: 5 }, { row: "A=1", col: "11", index: 7 }, { row: "A=1", col: "10", index: 6 }
      ],
      example: {
        expression: "F(A,B,C)=Σm(1,3,5,7)",
        selected: [1,3,5,7],
        groups: [[1,3,5,7]],
        result: "C",
        reason: "The four cells form a group and C=1 everywhere. A and B change, so both disappear."
      }
    },
    fourVariable: {
      variables: ["A", "B", "C", "D"],
      columns: ["CD=00", "01", "11", "10"],
      rows: ["AB=00", "01", "11", "10"],
      cells: [
        { row: "00", col: "00", index: 0 }, { row: "00", col: "01", index: 1 }, { row: "00", col: "11", index: 3 }, { row: "00", col: "10", index: 2 },
        { row: "01", col: "00", index: 4 }, { row: "01", col: "01", index: 5 }, { row: "01", col: "11", index: 7 }, { row: "01", col: "10", index: 6 },
        { row: "11", col: "00", index: 12 }, { row: "11", col: "01", index: 13 }, { row: "11", col: "11", index: 15 }, { row: "11", col: "10", index: 14 },
        { row: "10", col: "00", index: 8 }, { row: "10", col: "01", index: 9 }, { row: "10", col: "11", index: 11 }, { row: "10", col: "10", index: 10 }
      ],
      example: {
        expression: "F(A,B,C,D)=Σm(0,1,2,3)",
        selected: [0,1,2,3],
        groups: [[0,1,2,3]],
        result: "A'B'",
        reason: "The entire AB=00 row is selected; C and D vary, so only A=0 and B=0 remain."
      }
    }
  },
  specialPatterns: [
    { title: "Wrap-around grouping", rule: "The first and last column are adjacent, and the first and last row are adjacent.", example: "In a 4-column K-map, columns 00 and 10 are neighbours because they differ in one Gray-code bit." },
    { title: "Corner grouping", rule: "All four corners can form a valid group of four in a 4-variable map.", example: "The corners are adjacent through both horizontal and vertical wrap-around." },
    { title: "Overlap", rule: "A cell may belong to more than one group when that creates larger groups or covers isolated terms efficiently.", example: "A middle group can overlap an edge group to eliminate another variable." },
    { title: "Don’t-care", rule: "X may be used as 0 or 1 when allowed, whichever produces a simpler result. Never include an X merely because it is there.", example: "Use an X to enlarge a useful group, not to create an invalid group." }
  ],
  posExample: {
    expression: "F(A,B,C)=ΠM(0,2,4,6)",
    zeros: [0,2,4,6],
    result: "C",
    reason: "Group the four 0s. They all have C=0; for POS that constant appears as C in the sum term, giving F=C."
  },
  conversionExamples: [
    { expression: "Σm(1,3,5,7)", mapType: "SOP", group: "4 cells", simplified: "C", lesson: "A group of 4 removes two changing variables." },
    { expression: "Σm(0,1,2,3)", mapType: "SOP", group: "4 cells across the Gray-code row", simplified: "A'B'", lesson: "Choose the largest rectangle before making smaller groups." },
    { expression: "ΠM(0,2,4,6)", mapType: "POS", group: "4 zeros", simplified: "C", lesson: "POS groups zeros; keep the variable that remains 0." }
  ],
  examTraps: [
    "Normal binary order 00,01,10,11 is NOT the K-map column order. Use Gray code 00,01,11,10.",
    "A group of 3 is invalid; groups must be powers of two.",
    "Diagonal cells are not adjacent.",
    "Do not forget wrap-around adjacency.",
    "Do not stop at the first valid group; try to make groups larger.",
    "In SOP keep constant variables with their truth-table polarity; in POS the sign rule is different.",
    "Canonical SOP/POS and minimal K-map SOP/POS are not the same thing."
  ],
  starterExamples: [
    { id: "KM-01", variables: "A,B", minterms: "Σm(1,3)", result: "B", idea: "Both selected cells share B=1 while A changes." },
    { id: "KM-02", variables: "A,B,C", minterms: "Σm(1,3,5,7)", result: "C", idea: "All selected cells have C=1." },
    { id: "KM-03", variables: "A,B,C,D", minterms: "Σm(0,1,2,3)", result: "A'B'", idea: "The 4-cell group keeps A=0 and B=0 while C,D vary." }
  ],
  practice: [
    { id: "KM-P-01", difficulty: "easy", question: "Place Σm(1,3) on a 2-variable K-map and simplify.", answer: "B" },
    { id: "KM-P-02", difficulty: "medium", question: "Simplify F(A,B,C)=Σm(1,3,5,7) using a 3-variable K-map.", answer: "C" },
    { id: "KM-P-03", difficulty: "medium", question: "Simplify F(A,B,C,D)=Σm(0,1,2,3).", answer: "A'B'" },
    { id: "KM-P-04", difficulty: "hard", question: "Simplify F(A,B,C,D)=Σm(0,2,8,10) and identify the wrap-around group.", answer: "B'D'" },
    { id: "KM-P-05", difficulty: "hard", question: "Explain why Σm(1,3,5,7) becomes C in a 3-variable map.", answer: "All four selected cells have C=1; A and B vary and disappear." },
    { id: "KM-P-06", difficulty: "advanced", question: "For F=ΠM(0,2,4,6), simplify using a POS K-map.", answer: "C" }
  ]
};

export default KMAP_GUIDE;
