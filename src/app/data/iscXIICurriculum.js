// ISC XII Java: question-design standard for board-level learning and practice.
export const ISC_XII_JAVA_STANDARD = {
  philosophy: "Use precise ISC-level concepts, fresh questions, application, tracing, debugging and programming rather than trivia or artificial difficulty.",
  tiers: [
    { id: "foundation", title: "Foundation", purpose: "Check precise definitions, syntax and core concepts." },
    { id: "application", title: "Application", purpose: "Apply concepts to a short code fragment, scenario or design." },
    { id: "board", title: "Board-style", purpose: "Combine concepts in ISC-style reasoning, output, debugging and programming tasks." },
    { id: "challenge", title: "Challenge", purpose: "Require multi-step reasoning without becoming trick-question territory." },
  ],
  requiredQuestionTypes: [
    "Concept definition with a precise example",
    "Differentiate two commonly confused concepts",
    "Predict output and justify it",
    "Trace execution step-by-step",
    "Find and explain a compile-time or logical error",
    "Modify a given program to satisfy a requirement",
    "Write a complete ISC-style Java program",
    "Reason about edge cases and boundary conditions",
    "Explain why a particular construct behaves the way it does",
  ],
  qualityRules: [
    "Do not recycle Class X/XI questions by only renaming variables.",
    "Every answer must be technically correct and explain the reasoning when reasoning is part of the skill.",
    "Avoid obscure Java features outside the mapped ISC curriculum.",
    "Use realistic marks and difficulty labels.",
    "Include code-tracing and debugging alongside direct theory.",
    "Keep challenge questions difficult because of reasoning, not because of ambiguous wording.",
  ],
};

export default ISC_XII_JAVA_STANDARD;
