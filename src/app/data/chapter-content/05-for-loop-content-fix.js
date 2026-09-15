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

const chapter05ContentFix = {
  ...chapter05AuditFix,
  outputBasedQuestions: correctedOutputBasedQuestions,
};

export default chapter05ContentFix;
