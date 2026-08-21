// ISC XII Boolean Algebra — word-problem translation and practice
export const BOOLEAN_WORD_PROBLEMS = {
  method: [
    "1. Read the story once without writing equations. Identify the decision the system must make.",
    "2. Name each condition with one Boolean variable and keep the names tied to the story.",
    "3. Translate keywords: AND=both, OR=at least one, NOT=opposite/not, XOR=exactly one, XNOR=same.",
    "4. Write the original Boolean expression before simplifying it.",
    "5. Test the expression against one realistic case and one edge case.",
    "6. Convert to a truth table or K-Map when verification or minimisation is required.",
    "7. State the final answer in plain English as well as Boolean notation."
  ],
  keywordDecoder: [
    { phrase: "both / all", operator: "AND (·)", example: "A and B → AB" },
    { phrase: "either / at least one", operator: "OR (+)", example: "A or B → A+B" },
    { phrase: "not / inactive / disabled", operator: "NOT (')", example: "not A → A'" },
    { phrase: "exactly one / but not both", operator: "XOR (⊕)", example: "A⊕B = A'B + AB'" },
    { phrase: "both are the same", operator: "XNOR", example: "A⊙B" },
    { phrase: "only when / only if", operator: "Requirement condition", example: "A only when B → AB" },
    { phrase: "unless", operator: "Usually a complemented blocker", example: "A unless B → AB'" },
    { phrase: "override", operator: "Independent OR path", example: "normal_condition + O" }
  ],
  workedExamples: [
    { id: "WP-01", level: "starter", story: "A machine starts only when the main switch M is ON and the safety switch S is ON.", variableMap: ["M = main switch ON", "S = safety switch ON"], expression: "F = MS", explanation: "'And' means both conditions must be true.", testCase: "M=1,S=1 → F=1; any 0 makes F=0.", examTip: "Look for both, all, together and simultaneously." },
    { id: "WP-02", level: "starter", story: "An alarm rings if door sensor D is open or window sensor W is open.", variableMap: ["D = door open", "W = window open"], expression: "F = D + W", explanation: "At least one trigger is enough, so OR is used.", testCase: "D=0,W=1 → F=1; D=1,W=0 → F=1.", examTip: "At least one usually means OR." },
    { id: "WP-03", level: "intermediate", story: "A classroom projector is allowed when teacher T is present and either key K is inserted or administrator override O is active.", variableMap: ["T = teacher present", "K = key inserted", "O = admin override"], expression: "F = T(K + O)", explanation: "Teacher presence is compulsory, while K and O are alternatives.", testCase: "T=1,K=0,O=1 → F=1; T=0 always gives F=0.", examTip: "Separate compulsory conditions from alternatives before writing the expression." },
    { id: "WP-04", level: "intermediate", story: "A warning LED turns on when exactly one of sensors A and B detects motion.", variableMap: ["A = sensor A detects motion", "B = sensor B detects motion"], expression: "F = A⊕B = A'B + AB'", explanation: "Exactly one means one input is 1 and the other is 0.", testCase: "10 and 01 → 1; 00 and 11 → 0.", examTip: "Do not confuse exactly one with at least one." },
    { id: "WP-05", level: "advanced", story: "A cooling fan runs when temperature H is high unless maintenance mode M is active, but emergency override E can force it on.", variableMap: ["H = temperature high", "M = maintenance mode active", "E = emergency override"], expression: "F = E + HM'", explanation: "Emergency override is an independent OR path; normal operation needs H and NOT M.", testCase: "E=0,H=1,M=0 → F=1; E=1 always gives F=1.", examTip: "Unless often introduces a complemented blocker; override often creates an OR path." }
  ],
  practice: [
    { id: "WP-P01", difficulty: "easy", marks: 2, story: "A light turns on when switches A and B are both ON.", ask: "Write the Boolean expression.", answer: "F=AB" },
    { id: "WP-P02", difficulty: "easy", marks: 2, story: "A buzzer sounds if sensor X or sensor Y is active.", ask: "Write the Boolean expression and identify the gate.", answer: "F=X+Y; OR gate." },
    { id: "WP-P03", difficulty: "easy", marks: 2, story: "A lock opens only when key K is present and authorised-user signal U is true.", ask: "Translate the statement.", answer: "F=KU" },
    { id: "WP-P04", difficulty: "medium", marks: 3, story: "A heater runs when temperature L is low and either timer T is enabled or manual switch M is ON.", ask: "Write the Boolean expression.", answer: "F=L(T+M)" },
    { id: "WP-P05", difficulty: "medium", marks: 3, story: "A warning light is ON when exactly one of A and B is active.", ask: "Write the expression using XOR and using only AND, OR, NOT.", answer: "F=A⊕B=A'B+AB'" },
    { id: "WP-P06", difficulty: "medium", marks: 4, story: "A server accepts a request when user U is authenticated and either request I is internal or admin override O is active.", ask: "Write the expression and explain the parentheses.", answer: "F=U(I+O)" },
    { id: "WP-P07", difficulty: "hard", marks: 5, story: "A safety motor runs if emergency E is ON, or normal enable N is ON while guard G is closed and maintenance M is OFF.", ask: "Translate the story.", answer: "F=E+NGM'" },
    { id: "WP-P08", difficulty: "hard", marks: 5, story: "An exam system grants access when registered R, valid ID I, and either fee-cleared F or principal override P are true, while suspension S is not active.", ask: "Write the complete Boolean condition.", answer: "Access = RI(F+P)S'" },
    { id: "WP-P09", difficulty: "hard", marks: 5, story: "A digital alarm activates when exactly one of sensors A and B is high, unless reset R is active. Emergency override E always activates it.", ask: "Build the Boolean expression.", answer: "F=E+(A⊕B)R' = E+(A'B+AB')R'" },
    { id: "WP-P10", difficulty: "advanced", marks: 6, story: "A machine operates automatically when Auto A is enabled and either S1 or S2 is active, but fault F blocks normal operation. Service override O can still start it.", ask: "Translate the story.", answer: "M=O+A(S1+S2)F'" }
  ],
  commonMistakes: [
    "Choosing OR just because the sentence contains the word 'or' without checking whether it means exactly one.",
    "Forgetting parentheses in mixed AND/OR conditions.",
    "Changing a variable's meaning halfway through a question.",
    "Simplifying before writing the original translation.",
    "Ignoring NOT conditions such as inactive, disabled, closed or unless."
  ],
  challengeSet: [
    "Translate a word problem into Boolean variables only.",
    "Translate and build its truth table.",
    "Translate → canonical SOP → K-Map → minimal expression.",
    "Translate the same story into a gate-level circuit.",
    "Given a Boolean expression, write a matching real-world story."
  ]
};

export default BOOLEAN_WORD_PROBLEMS;
