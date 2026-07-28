// Question Bank Index - Target95 ICSE Computer Applications
// Complete Java Question Bank with 19 chapters

import chapter1 from "./01-introduction";
import chapter2 from "./02-variables-data-types";
import chapter3 from "./03-operators";
import chapter4 from "./04-if-else";
import chapter5 from "./05-loops";
import chapter6 from "./06-methods";
import chapter7 from "./07-arrays";
import chapter8 from "./08-strings";
import chapter9 from "./09-constructors";
import chapter10 from "./10-encapsulation";
import chapter11 from "./11-inheritance";
import chapter12 from "./12-polymorphism";
import chapter13 from "./13-library-classes";
import chapter14 from "./14-recursion";
import chapter15 from "./15-searching-sorting";
import chapter16 from "./16-exception-handling";
import chapter17 from "./17-input-output";
import chapter18 from "./18-packages-access-modifiers";
import chapter19 from "./19-oop-concepts";

const questionBank = {
  chapters: [
    chapter1, chapter2, chapter3, chapter4, chapter5,
    chapter6, chapter7, chapter8, chapter9, chapter10,
    chapter11, chapter12, chapter13, chapter14, chapter15,
    chapter16, chapter17, chapter18, chapter19
  ],
  
  getChapterById: (id) => {
    return questionBank.chapters.find(ch => ch.id === id);
  },
  
  getChapterBySlug: (slug) => {
    return questionBank.chapters.find(ch => ch.slug === slug);
  },
  
  getAllChapters: () => {
    return questionBank.chapters;
  },
  
  getTotalQuestions: () => {
    let total = 0;
    for (const ch of questionBank.chapters) {
      total += (ch.mcqs || []).length;
      total += (ch.assertionReasons || []).length;
      total += (ch.trueFalse || []).length;
      total += (ch.fillBlanks || []).length;
      total += (ch.outputQuestions || []).length;
      total += (ch.errorFinding || []).length;
      total += (ch.programmingQuestions || []).length;
      total += (ch.debuggingQuestions || []).length;
      total += (ch.caseBasedQuestions || []).length;
      total += (ch.vivaQuestions || []).length;
    }
    return total;
  }
};

export default questionBank;
