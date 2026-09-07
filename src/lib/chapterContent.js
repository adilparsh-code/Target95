/**
 * Chapter Content Normalization Layer
 * Maps studyData, rich chapter-content, authored Markdown and question-bank
 * data into the unified schema used by ChapterContentEngine.
 *
 * The normalizer is intentionally defensive because legacy and authored
 * chapter sources may use slightly different shapes.
 */

export function getChapterContent(chapter, content = null, questions = null) {
  const sd = chapter?.studyData || {};

  return {
    learningObjectives:
      normalizeList(sd.learningObjectives) ||
      normalizeList(content?.learningObjectives),

    theory: normalizeTheory(sd, content),

    definitions:
      normalizeList(sd.definitions) ||
      normalizeList(content?.definitions),

    keyTerms: normalizeKeyTerms(sd, content),

    examples: normalizeExamples(sd.examples, content?.examples),

    diagrams: normalizeDiagrams(sd.diagrams, content),

    practice: normalizePractice(
      content?.practiceTest || content?.practice
    ),

    mcqs: normalizeMcqs(
      questions?.mcqs,
      content?.mcqs
    ),

    output: normalizeOutput(
      questions?.outputQuestions,
      questions?.outputBasedQuestions,
      content?.outputBasedQuestions,
      sd.outputBasedQuestions
    ),

    programming: normalizeProgramming(
      questions?.programmingQuestions,
      content?.programmingQuestions
    ),

    pyqs: normalizePyqs(
      content?.previousYearQuestions
    ),

    revisionNotes: normalizeRevisionNotes(
      content?.revisionNotes,
      sd.quickRevision ||
        content?.quickRevision ||
        content?.memoryTricks
    ),
  };
}

export function hasSectionContent(section) {
  if (!section) return false;

  if (Array.isArray(section)) {
    return section.length > 0;
  }

  if (typeof section === "object") {
    return Object.keys(section).length > 0;
  }

  return Boolean(section);
}

/* -------------------------------------------------------------------------- */
/* Generic helpers                                                            */
/* -------------------------------------------------------------------------- */

function normalizeList(data) {
  if (!data) return null;

  if (Array.isArray(data)) {
    const cleaned = data.filter((item) => {
      if (typeof item === "string") return item.trim().length > 0;
      return item !== null && item !== undefined;
    });

    return cleaned.length ? cleaned : null;
  }

  if (typeof data === "string" && data.trim()) {
    return [data.trim()];
  }

  return null;
}

function normalizeText(value) {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") {
    return value.trim();
  }

  return String(value);
}

/**
 * IMPORTANT:
 * Explanation can historically be:
 *   - string
 *   - array
 *   - object
 *   - missing
 *
 * Renderers should always receive an array.
 */
function normalizeExplanation(explanation) {
  if (!explanation) return [];

  if (Array.isArray(explanation)) {
    return explanation
      .filter((item) => item !== null && item !== undefined)
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (typeof item === "object") {
          return (
            item.text ||
            item.description ||
            item.explanation ||
            JSON.stringify(item)
          );
        }

        return String(item);
      })
      .filter(Boolean);
  }

  if (typeof explanation === "string") {
    return explanation.trim() ? [explanation.trim()] : [];
  }

  if (typeof explanation === "object") {
    const text =
      explanation.text ||
      explanation.description ||
      explanation.explanation;

    if (text) {
      return Array.isArray(text)
        ? normalizeExplanation(text)
        : [String(text)];
    }

    return [JSON.stringify(explanation)];
  }

  return [String(explanation)];
}

/* -------------------------------------------------------------------------- */
/* Key terms                                                                 */
/* -------------------------------------------------------------------------- */

function normalizeKeyTerms(sd, content) {
  const explicit =
    normalizeList(sd.keyTerms) ||
    normalizeList(content?.keyTerms);

  if (explicit) return explicit;

  if (Array.isArray(content?.sections)) {
    const terms = [];

    content.sections.forEach((section) => {
      const heading = String(section?.heading || "").toLowerCase();

      if (
        !heading.includes("key term") &&
        !heading.includes("terminology")
      ) {
        return;
      }

      if (Array.isArray(section?.keyTerms)) {
        terms.push(...section.keyTerms);
      }
    });

    if (terms.length) {
      return terms;
    }
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Diagrams                                                                  */
/* -------------------------------------------------------------------------- */

function normalizeDiagrams(sdDiagrams, content) {
  const explicit =
    normalizeList(sdDiagrams) ||
    normalizeList(content?.diagrams);

  if (explicit) return explicit;

  const memoryModel = content?.theoryNotes?.memoryModel;

  if (memoryModel?.diagram) {
    return [
      {
        type: "memory-model",
        title: memoryModel.heading || "Concept visual",
        diagram: memoryModel.diagram,
        explanation:
          memoryModel.explanation ||
          "Visualise the structure before tracing the code.",
        examNote: memoryModel.examNote || "",
      },
    ];
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Theory                                                                    */
/* -------------------------------------------------------------------------- */

function normalizeTheory(sd, content) {
  const sections = [];

  const theory = content?.theoryNotes;

  if (theory) {
    if (theory.beginnerExplanation) {
      sections.push({
        type: "paragraph",
        text: normalizeText(theory.beginnerExplanation),
      });
    }

    if (Array.isArray(theory.importantPoints) && theory.importantPoints.length) {
      sections.push({
        type: "list",
        title: "Important Points",
        items: theory.importantPoints,
      });
    }

    if (Array.isArray(theory.memoryTricks) && theory.memoryTricks.length) {
      sections.push({
        type: "list",
        title: "Memory Tricks",
        items: theory.memoryTricks,
      });
    }

    if (Array.isArray(theory.examTips) && theory.examTips.length) {
      sections.push({
        type: "list",
        title: "Exam Tips",
        items: theory.examTips,
      });
    }
  }

  if (Array.isArray(content?.theory)) {
    content.theory.forEach((text) => {
      if (typeof text === "string" && text.trim()) {
        sections.push({
          type: "paragraph",
          text: text.trim(),
        });
      }
    });
  } else if (
    typeof content?.theory === "string" &&
    content.theory.trim()
  ) {
    sections.push({
      type: "paragraph",
      text: content.theory.trim(),
    });
  }

  const supportingLists = [
    ["Important Notes", content?.importantNotes],
    ["Common Mistakes", content?.commonMistakes],
    ["Exam Tips", content?.examTips],
  ];

  supportingLists.forEach(([title, items]) => {
    if (Array.isArray(items) && items.length) {
      sections.push({
        type: "list",
        title,
        items,
      });
    }
  });

  if (content?.introduction?.description) {
    sections.push({
      type: "paragraph",
      text: normalizeText(content.introduction.description),
    });
  }

  if (sections.length) {
    return sections;
  }

  if (Array.isArray(sd.concepts) && sd.concepts.length) {
    return sd.concepts.map((concept) => ({
      type: "paragraph",
      text: normalizeText(concept),
    }));
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Examples                                                                   */
/* -------------------------------------------------------------------------- */

function normalizeExample(ex, index, level = null) {
  if (!ex || typeof ex !== "object") {
    return null;
  }

  return {
    title:
      ex.title ||
      `${level ? `${level[0].toUpperCase()}${level.slice(1)} ` : ""}Example ${
        index + 1
      }`,

    code: ex.code || "",

    output:
      ex.output !== undefined && ex.output !== null
        ? ex.output
        : "",

    /**
     * ALWAYS an array.
     * This prevents:
     * example.explanation.map is not a function
     */
    explanation: normalizeExplanation(
      ex.explanation ?? ex.text
    ),

    level: ex.level || level || undefined,
  };
}

function normalizeExamples(sdExamples, contentExamples) {
  const examples = [];

  /* Rich chapter-content array */
  if (Array.isArray(contentExamples)) {
    contentExamples.forEach((ex, index) => {
      const normalized = normalizeExample(ex, index);

      if (normalized) {
        examples.push(normalized);
      }
    });
  }

  /* Rich chapter-content level-based structure */
  else if (
    contentExamples &&
    typeof contentExamples === "object"
  ) {
    ["basic", "intermediate", "advanced"].forEach((level) => {
      const levelExamples = contentExamples[level];

      if (!Array.isArray(levelExamples)) return;

      levelExamples.forEach((ex, index) => {
        const normalized = normalizeExample(
          ex,
          index,
          level
        );

        if (normalized) {
          examples.push(normalized);
        }
      });
    });
  }

  /* Legacy studyData examples */
  if (Array.isArray(sdExamples)) {
    sdExamples.forEach((ex, index) => {
      const normalized = normalizeExample(ex, index);

      if (normalized) {
        examples.push(normalized);
      }
    });
  }

  return examples.length ? examples : null;
}

/* -------------------------------------------------------------------------- */
/* Practice                                                                   */
/* -------------------------------------------------------------------------- */

function normalizePractice(practiceTest) {
  if (!practiceTest || typeof practiceTest !== "object") {
    return null;
  }

  return {
    title: practiceTest.title || "Practice Test",
    totalMarks: practiceTest.totalMarks,
    timeLimit: practiceTest.timeLimit,
    sections: Array.isArray(practiceTest.sections)
      ? practiceTest.sections
      : [],
  };
}

/* -------------------------------------------------------------------------- */
/* MCQs                                                                       */
/* -------------------------------------------------------------------------- */

function normalizeMcqs(questionBankMcqs, contentMcqs) {
  const mcqs = [];

  if (Array.isArray(questionBankMcqs)) {
    questionBankMcqs.forEach((q) => {
      if (!q || typeof q !== "object") return;

      mcqs.push({
        id: q.id,
        question: q.question,
        options: Array.isArray(q.options) ? q.options : [],
        answer: q.correctAnswer,
        explanation: normalizeExplanation(q.explanation),
        difficulty: q.difficulty,
        marks: q.marks,
      });
    });
  }

  if (Array.isArray(contentMcqs)) {
    contentMcqs.forEach((q) => {
      if (!q || typeof q !== "object") return;

      mcqs.push({
        id: q.id,
        question: q.question,
        options: Array.isArray(q.options) ? q.options : [],
        answer: q.answer,
        explanation: normalizeExplanation(q.explanation),
        difficulty: q.difficulty,
        marks: q.marks,
      });
    });
  }

  return mcqs.length ? mcqs : null;
}

/* -------------------------------------------------------------------------- */
/* Programming                                                                */
/* -------------------------------------------------------------------------- */

function normalizeProgramming(
  questionBankProgramming,
  contentProgramming
) {
  const programming = [];

  if (Array.isArray(questionBankProgramming)) {
    questionBankProgramming.forEach((q) => {
      if (!q || typeof q !== "object") return;

      programming.push({
        id: q.id,
        question: q.problemStatement || q.question || "",
        solution: q.solution,
        explanation: normalizeExplanation(q.solutionExplanation),
        output: q.output,
        difficulty: q.difficulty,
        marks: q.marks,
        input: q.input,
        constraints: q.constraints,
        logic: q.logic,
      });
    });
  }

  if (
    contentProgramming &&
    typeof contentProgramming === "object"
  ) {
    ["easy", "medium", "hard"].forEach((level) => {
      const questions = contentProgramming[level];

      if (!Array.isArray(questions)) return;

      questions.forEach((q) => {
        if (!q || typeof q !== "object") return;

        programming.push({
          id: q.id,
          question: q.question || q.problemStatement || "",
          solution: q.solution,
          output: q.output,
          difficulty: level,
          explanation: normalizeExplanation(
            q.explanation || q.solutionExplanation
          ),
        });
      });
    });
  }

  return programming.length ? programming : null;
}

/* -------------------------------------------------------------------------- */
/* PYQs                                                                       */
/* -------------------------------------------------------------------------- */

function normalizePyqs(previousYearQuestions) {
  if (!Array.isArray(previousYearQuestions)) {
    return null;
  }

  const pyqs = previousYearQuestions
    .filter((q) => q && typeof q === "object")
    .map((q) => ({
      id: q.id,
      question: q.question,
      answer: q.answer,
      explanation: normalizeExplanation(q.explanation),
    }));

  return pyqs.length ? pyqs : null;
}

/* -------------------------------------------------------------------------- */
/* Output-based questions                                                     */
/* -------------------------------------------------------------------------- */

function normalizeOutput(
  questionBankOutput,
  contentOutput,
  richContentOutput,
  studyDataOutput
) {
  const output = [];

  [
    questionBankOutput,
    contentOutput,
    richContentOutput,
  ].forEach((items) => {
    if (!Array.isArray(items)) return;

    items.forEach((q) => {
      if (!q || typeof q !== "object") return;

      output.push({
        id: q.id,
        question: q.question || q.prompt || "",
        answer: q.answer,
        explanation: normalizeExplanation(q.explanation),
        difficulty: q.difficulty,
        marks: q.marks,
        estimatedTime: q.estimatedTime,
      });
    });
  });

  if (Array.isArray(studyDataOutput)) {
    studyDataOutput.forEach((q, idx) => {
      const isString = typeof q === "string";

      output.push({
        id:
          q?.id ||
          `study-output-${idx}`,

        question: isString
          ? q
          : q?.question || q?.prompt || "",

        answer: isString ? "" : q?.answer,

        explanation: isString
          ? []
          : normalizeExplanation(q?.explanation),

        difficulty: isString
          ? "Medium"
          : q?.difficulty || "Medium",

        marks: isString
          ? 2
          : q?.marks ?? 2,
      });
    });
  }

  return output.length ? output : null;
}

/* -------------------------------------------------------------------------- */
/* Revision notes                                                             */
/* -------------------------------------------------------------------------- */

function normalizeRevisionNotes(
  contentRevisionNotes,
  quickRevision
) {
  const notes = [];

  if (Array.isArray(contentRevisionNotes)) {
    contentRevisionNotes.forEach((note) => {
      if (!note || typeof note !== "object") return;

      notes.push({
        title: note.title || "Revision Note",
        content: note.content || "",
      });
    });
  }

  if (Array.isArray(quickRevision)) {
    quickRevision.forEach((item) => {
      notes.push({
        title: "Quick Revision",
        content: item,
      });
    });
  }

  return notes.length ? notes : null;
}
