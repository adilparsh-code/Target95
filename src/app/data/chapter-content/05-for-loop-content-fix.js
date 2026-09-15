import chapter05AuditFix from "./05-for-loop-audit-fix";

const correctedOutputBasedQuestions = (chapter05AuditFix.outputBasedQuestions || []).map((item) =>
  item?.id === "for-ob-29"
    ? {
        ...item,
        answer: "3413",
        explanation:
          "The inner loop multiplies term by i exactly i times, so term becomes i^i. Therefore the sum is 1^1 + 2^2 + 3^3 + 4^4 + 5^5 = 1 + 4 + 27 + 256 + 3125 = 3413.",
      }
    : item
);

const correctedChapterSummary = {
  ...(chapter05AuditFix.chapterSummary || {}),
  keyPoints: [
    "A for loop combines initialization, condition checking and iteration in one control statement.",
    "Initialization runs once; the condition is checked before every iteration; the update runs after the loop body.",
    "Use < or <= carefully because boundary conditions commonly cause off-by-one errors.",
    "The loop control variable should move toward the termination condition to avoid an infinite loop.",
    "Nested for loops are useful for patterns, tables and two-dimensional data; the inner loop runs for each outer iteration.",
    "An accumulator such as sum or product must be given the correct initial value before the loop starts.",
    "Variables declared in the for-loop initialization normally have scope limited to that loop.",
    "break terminates the loop, while continue skips the remaining body of the current iteration and proceeds with the next loop cycle.",
  ],
};

const chapter05ContentFix = {
  ...chapter05AuditFix,
  outputBasedQuestions: correctedOutputBasedQuestions,
  chapterSummary: correctedChapterSummary,
};

export default chapter05ContentFix;
