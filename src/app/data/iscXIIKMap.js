// ISC XII K-Map starter module: intuitive grouping before formula memorisation.
export const KMAP_GUIDE = {
  title: "Karnaugh Maps (K-Maps)",
  purpose: "Turn a Boolean truth table into a smaller expression by grouping adjacent 1s (for SOP) or 0s (for POS).",
  coreRules: [
    "A 2-variable K-map has 4 cells; a 3-variable map has 8; a 4-variable map has 16.",
    "Cell order follows Gray-code adjacency, so only one variable changes between neighbouring cells.",
    "Groups must contain 1, 2, 4, 8... cells.",
    "Groups should be as large as possible while staying rectangular and valid.",
    "Wrap-around edges are adjacent: left-right and top-bottom can form groups.",
    "For SOP, group 1s. For POS, group 0s.",
    "Overlapping groups are allowed when they produce a simpler result."
  ],
  workflow: [
    "1. Start from the truth table or canonical SOP/POS.",
    "2. Put each minterm/maxterm into the correct Gray-code cell.",
    "3. Circle the largest useful groups of 1s (SOP) or 0s (POS).",
    "4. For each group, keep only variables that remain constant inside that group.",
    "5. OR the SOP group terms together, or AND the POS group terms together.",
    "6. Verify the result against the original truth table."
  ],
  examTraps: [
    "Do not group diagonal cells; diagonal cells are not adjacent.",
    "Do not make groups with 3, 5, 6 or 7 cells.",
    "Do not ignore wrap-around adjacency.",
    "Do not switch variable order after placing cells.",
    "A group may overlap another group if that gives a simpler expression."
  ],
  starterExamples: [
    { id: "KM-01", variables: "A,B", minterms: "Σm(1,3)", result: "B", idea: "Both selected cells share B=1 while A changes." },
    { id: "KM-02", variables: "A,B,C", minterms: "Σm(1,3,5,7)", result: "C", idea: "All selected cells have C=1." },
    { id: "KM-03", variables: "A,B,C,D", minterms: "Σm(0,1,2,3)", result: "A'B'", idea: "The 4-cell group keeps A=0 and B=0 while C,D vary." }
  ],
  practice: [
    { id: "KM-P-01", difficulty: "easy", question: "Place Σm(1,3) on a 2-variable K-map and simplify.", answer: "B" },
    { id: "KM-P-02", difficulty: "medium", question: "Simplify F(A,B,C)=Σm(1,3,5,7) using a 3-variable K-map.", answer: "C" },
    { id: "KM-P-03", difficulty: "hard", question: "Explain why wrap-around groups are legal in a K-map.", answer: "The map is arranged so edge cells are adjacent in Gray-code order; only one variable changes between adjacent cells." }
  ]
};

export default KMAP_GUIDE;
