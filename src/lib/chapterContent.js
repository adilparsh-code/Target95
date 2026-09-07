
/**
 * Chapter Content Normalization Layer
 *
 * Maps studyData, rich chapter-content, authored Markdown and question-bank
 * data into the unified schema used by ChapterContentEngine.
 *
 * The normalizer is intentionally defensive because legacy and authored
 * chapter sources may use slightly different shapes.
 *
 * IMPORTANT:
 * - Missing academic content remains missing.
 * - Generic filler text must never be introduced here.
 * - Renderers should receive predictable data shapes.
 */

export function getChapterContent(
  chapter,
  content = null,
  questions = null
) {
  const sd =
    chapter?.studyData &&
    typeof chapter.studyData === "object"
      ? chapter.studyData
      : {};

  return {
    learningObjectives:
      normalizeList(sd.learningObjectives) ||
      normalizeList(content?.learningObjectives),

    theory: normalizeTheory(sd, content),

    definitions:
      normalizeList(sd.definitions) ||
      normalizeList(content?.definitions),

    keyTerms: normalizeKeyTerms(sd, content),

    examples: normalizeExamples(
      sd.examples,
      content?.examples
    ),

    diagrams: normalizeDiagrams(
      sd.diagrams,
      content
    ),

    practice: normalizePractice(
      content?.practiceTest ||
        content?.practice
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

/**
 * Checks whether a normalized section actually contains usable content.
 */
export function hasSectionContent(section) {
  if (section === null || section === undefined) {
    return false;
  }

  if (Array.isArray(section)) {
    return section.length > 0;
  }

  if (typeof section === "object") {
    return Object.keys(section).length > 0;
  }

  if (typeof section === "string") {
    return section.trim().length > 0;
  }

  return Boolean(section);
}

/* -------------------------------------------------------------------------- */
/* Generic helpers                                                            */
/* -------------------------------------------------------------------------- */

function normalizeList(data) {
  if (data === null || data === undefined) {
    return null;
  }

  if (Array.isArray(data)) {
    const cleaned = data
      .filter((item) => {
        if (typeof item === "string") {
          return item.trim().length > 0;
        }

        return (
          item !== null &&
          item !== undefined
        );
      })
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        return item;
      });

    return cleaned.length > 0 ? cleaned : null;
  }

  if (
    typeof data === "string" &&
    data.trim().length > 0
  ) {
    return [data.trim()];
  }

  return null;
}

function normalizeText(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return String(value);
}

/**
 * Safely convert a value to a readable string.
 *
 * Prevents JSON.stringify() from causing a secondary runtime error when
 * malformed/circular objects are encountered.
 */
function safeStringify(value) {
  try {
    const result = JSON.stringify(value);

    return result === undefined
      ? String(value)
      : result;
  } catch {
    return String(value);
  }
}

/**
 * IMPORTANT:
 *
 * Explanation can historically be:
 *   - string
 *   - array
 *   - object
 *   - number
 *   - missing
 *
 * Renderers should ALWAYS receive an array of strings.
 */
function normalizeExplanation(explanation) {
  if (
    explanation === null ||
    explanation === undefined ||
    explanation === ""
  ) {
    return [];
  }

  if (Array.isArray(explanation)) {
    return explanation
      .filter(
        (item) =>
          item !== null &&
          item !== undefined
      )
      .flatMap((item) =>
        normalizeExplanation(item)
      )
      .filter(Boolean);
  }

  if (typeof explanation === "string") {
    const text = explanation.trim();

    return text ? [text] : [];
  }

  if (
    typeof explanation === "number" ||
    typeof explanation === "boolean"
  ) {
    return [String(explanation)];
  }

  if (typeof explanation === "object") {
    const text =
      explanation.text ??
      explanation.description ??
      explanation.explanation ??
      explanation.content;

    if (text !== null && text !== undefined) {
      return normalizeExplanation(text);
    }

    return [safeStringify(explanation)];
  }

  return [String(explanation)];
}

/* -------------------------------------------------------------------------- */
/* Key terms                                                                  */
/* -------------------------------------------------------------------------- */

function normalizeKeyTerms(sd, content) {
  const explicit =
    normalizeList(sd?.keyTerms) ||
    normalizeList(content?.keyTerms);

  if (explicit) {
    return explicit;
  }

  if (Array.isArray(content?.sections)) {
    const terms = [];

    content.sections.forEach((section) => {
      if (
        !section ||
        typeof section !== "object"
      ) {
        return;
      }

      const heading = String(
        section.heading || ""
      ).toLowerCase();

      if (
        !heading.includes("key term") &&
        !heading.includes("terminology")
      ) {
        return;
      }

      if (Array.isArray(section.keyTerms)) {
        terms.push(...section.keyTerms);
      }
    });

    return terms.length
      ? terms
      : null;
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Diagrams                                                                   */
/* -------------------------------------------------------------------------- */

function normalizeDiagrams(
  sdDiagrams,
  content
) {
  const explicit =
    normalizeList(sdDiagrams) ||
    normalizeList(content?.diagrams);

  if (explicit) {
    return explicit;
  }

  const memoryModel =
    content?.theoryNotes?.memoryModel;

  if (
    memoryModel &&
    typeof memoryModel === "object" &&
    memoryModel.diagram
  ) {
    return [
      {
        type: "memory-model",
        title:
          normalizeText(
            memoryModel.heading
          ) || "Concept visual",

        diagram:
          memoryModel.diagram,

        explanation:
          normalizeText(
            memoryModel.explanation
          ) ||
          "Visualise the structure before tracing the code.",

        examNote:
          normalizeText(
            memoryModel.examNote
          ),
      },
    ];
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Theory                                                                     */
/* -------------------------------------------------------------------------- */

function normalizeTheory(
  sd,
  content
) {
  const sections = [];

  const theory =
    content?.theoryNotes;

  if (
    theory &&
    typeof theory === "object"
  ) {
    if (theory.beginnerExplanation) {
      const text = normalizeText(
        theory.beginnerExplanation
      );

      if (text) {
        sections.push({
          type: "paragraph",
          text,
        });
      }
    }

    if (
      Array.isArray(
        theory.importantPoints
      ) &&
      theory.importantPoints.length
    ) {
      sections.push({
        type: "list",
        title: "Important Points",
        items: theory.importantPoints,
      });
    }

    if (
      Array.isArray(
        theory.memoryTricks
      ) &&
      theory.memoryTricks.length
    ) {
      sections.push({
        type: "list",
        title: "Memory Tricks",
        items: theory.memoryTricks,
      });
    }

    if (
      Array.isArray(theory.examTips) &&
      theory.examTips.length
    ) {
      sections.push({
        type: "list",
        title: "Exam Tips",
        items: theory.examTips,
      });
    }
  }

  if (Array.isArray(content?.theory)) {
    content.theory.forEach((text) => {
      const normalized = normalizeText(text);

      if (normalized) {
        sections.push({
          type: "paragraph",
          text: normalized,
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
    [
      "Important Notes",
      content?.importantNotes,
    ],
    [
      "Common Mistakes",
      content?.commonMistakes,
    ],
    [
      "Exam Tips",
      content?.examTips,
    ],
  ];

  supportingLists.forEach(
    ([title, items]) => {
      if (
        Array.isArray(items) &&
        items.length
      ) {
        sections.push({
          type: "list",
          title,
          items,
        });
      }
    }
  );

  const introduction =
    content?.introduction;

  if (
    introduction &&
    typeof introduction === "object" &&
    introduction.description
  ) {
    const text = normalizeText(
      introduction.description
    );

    if (text) {
      sections.push({
        type: "paragraph",
        text,
      });
    }
  }

  if (sections.length) {
    return sections;
  }

  if (
    Array.isArray(sd?.concepts) &&
    sd.concepts.length
  ) {
    const concepts = sd.concepts
      .map((concept) =>
        normalizeText(concept)
      )
      .filter(Boolean);

    return concepts.length
      ? concepts.map((text) => ({
          type: "paragraph",
          text,
        }))
      : null;
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Examples                                                                    */
/* -------------------------------------------------------------------------- */

function normalizeExample(
  ex,
  index,
  level = null
) {
  if (
    !ex ||
    typeof ex !== "object"
  ) {
    return null;
  }

  const fallbackTitle = level
    ? `${level.charAt(0).toUpperCase()}${level.slice(
        1
      )} Example ${index + 1}`
    : `Example ${index + 1}`;

  return {
    id:
      ex.id ??
      ex.slug ??
      `example-${level || "default"}-${index}`,

    title:
      normalizeText(ex.title) ||
      fallbackTitle,

    code:
      typeof ex.code === "string"
        ? ex.code
        : ex.code != null
          ? String(ex.code)
          : "",

    output:
      ex.output !== undefined &&
      ex.output !== null
        ? ex.output
        : "",

    /**
     * ALWAYS an array.
     *
     * This prevents:
     * example.explanation.map is not a function
     */
    explanation:
      normalizeExplanation(
        ex.explanation ??
          ex.text
      ),

    level:
      normalizeText(
        ex.level || level || ""
      ) || undefined,
  };
}

function normalizeExamples(
  sdExamples,
  contentExamples
) {
  const examples = [];

  /* Rich chapter-content array */
  if (Array.isArray(contentExamples)) {
    contentExamples.forEach(
      (ex, index) => {
        const normalized =
          normalizeExample(
            ex,
            index
          );

        if (normalized) {
          examples.push(normalized);
        }
      }
    );
  }

  /* Rich chapter-content level-based structure */
  else if (
    contentExamples &&
    typeof contentExamples ===
      "object"
  ) {
    [
      "basic",
      "intermediate",
      "advanced",
    ].forEach((level) => {
      const levelExamples =
        contentExamples[level];

      if (
        !Array.isArray(
          levelExamples
        )
      ) {
        return;
      }

      levelExamples.forEach(
        (ex, index) => {
          const normalized =
            normalizeExample(
              ex,
              index,
              level
            );

          if (normalized) {
            examples.push(
              normalized
            );
          }
        }
      );
    });
  }

  /* Legacy studyData examples */
  if (Array.isArray(sdExamples)) {
    sdExamples.forEach(
      (ex, index) => {
        const normalized =
          normalizeExample(
            ex,
            index
          );

        if (normalized) {
          examples.push(normalized);
        }
      }
    );
  }

  return examples.length
    ? examples
    : null;
}

/* -------------------------------------------------------------------------- */
/* Practice                                                                    */
/* -------------------------------------------------------------------------- */

function normalizePractice(
  practiceTest
) {
  if (
    !practiceTest ||
    typeof practiceTest !== "object"
  ) {
    return null;
  }

  const sections = Array.isArray(
    practiceTest.sections
  )
    ? practiceTest.sections
    : [];

  return {
    title:
      normalizeText(
        practiceTest.title
      ) || "Practice Test",

    totalMarks:
      practiceTest.totalMarks,

    timeLimit:
      practiceTest.timeLimit,

    sections,
  };
}

/* -------------------------------------------------------------------------- */
/* MCQs                                                                        */
/* -------------------------------------------------------------------------- */

function normalizeMcqs(
  questionBankMcqs,
  contentMcqs
) {
  const mcqs = [];

  const addMcqs = (items) => {
    if (!Array.isArray(items)) {
      return;
    }

    items.forEach((q, index) => {
      if (
        !q ||
        typeof q !== "object"
      ) {
        return;
      }

      mcqs.push({
        id:
          q.id ??
          `mcq-${mcqs.length}-${index}`,

        question:
          normalizeText(
            q.question
          ),

        options:
          Array.isArray(q.options)
            ? q.options
            : [],

        answer:
          q.correctAnswer ??
          q.answer,

        explanation:
          normalizeExplanation(
            q.explanation
          ),

        difficulty:
          q.difficulty,

        marks:
          q.marks,
      });
    });
  };

  addMcqs(questionBankMcqs);
  addMcqs(contentMcqs);

  return mcqs.length
    ? mcqs
    : null;
}

/* -------------------------------------------------------------------------- */
/* Programming                                                                 */
/* -------------------------------------------------------------------------- */

function normalizeProgramming(
  questionBankProgramming,
  contentProgramming
) {
  const programming = [];

  if (
    Array.isArray(
      questionBankProgramming
    )
  ) {
    questionBankProgramming.forEach(
      (q, index) => {
        if (
          !q ||
          typeof q !== "object"
        ) {
          return;
        }

        programming.push({
          id:
            q.id ??
            `programming-${programming.length}-${index}`,

          question:
            normalizeText(
              q.problemStatement ||
                q.question
            ),

          solution:
            q.solution,

          explanation:
            normalizeExplanation(
              q.solutionExplanation
            ),

          output:
            q.output,

          difficulty:
            q.difficulty,

          marks:
            q.marks,

          input:
            q.input,

          constraints:
            q.constraints,

          logic:
            q.logic,
        });
      }
    );
  }

  if (
    contentProgramming &&
    typeof contentProgramming ===
      "object"
  ) {
    [
      "easy",
      "medium",
      "hard",
    ].forEach((level) => {
      const questions =
        contentProgramming[level];

      if (
        !Array.isArray(questions)
      ) {
        return;
      }

      questions.forEach(
        (q, index) => {
          if (
            !q ||
            typeof q !== "object"
          ) {
            return;
          }

          programming.push({
            id:
              q.id ??
              `programming-${level}-${index}`,

            question:
              normalizeText(
                q.question ||
                  q.problemStatement
              ),

            solution:
              q.solution,

            output:
              q.output,

            difficulty:
              q.difficulty ||
              level,

            explanation:
              normalizeExplanation(
                q.explanation ||
                  q.solutionExplanation
              ),
          });
        }
      );
    });
  }

  return programming.length
    ? programming
    : null;
}

/* -------------------------------------------------------------------------- */
/* PYQs                                                                        */
/* -------------------------------------------------------------------------- */

function normalizePyqs(
  previousYearQuestions
) {
  if (
    !Array.isArray(
      previousYearQuestions
    )
  ) {
    return null;
  }

  const pyqs =
    previousYearQuestions
      .filter(
        (q) =>
          q &&
          typeof q === "object"
      )
      .map((q, index) => ({
        id:
          q.id ??
          `pyq-${index}`,

        question:
          normalizeText(
            q.question
          ),

        answer:
          q.answer,

        explanation:
          normalizeExplanation(
            q.explanation
          ),
      }))
      .filter(
        (q) => q.question
      );

  return pyqs.length
    ? pyqs
    : null;
}

/* -------------------------------------------------------------------------- */
/* Output-based questions                                                      */
/* -------------------------------------------------------------------------- */

function normalizeOutput(
  questionBankOutput,
  contentOutput,
  richContentOutput,
  studyDataOutput
) {
  const output = [];

  const addOutput = (items) => {
    if (!Array.isArray(items)) {
      return;
    }

    items.forEach(
      (q, index) => {
        if (
          !q ||
          typeof q !== "object"
        ) {
          return;
        }

        output.push({
          id:
            q.id ??
            `output-${output.length}-${index}`,

          question:
            normalizeText(
              q.question ||
                q.prompt
            ),

          answer:
            q.answer,

          explanation:
            normalizeExplanation(
              q.explanation
            ),

          difficulty:
            q.difficulty,

          marks:
            q.marks,

          estimatedTime:
            q.estimatedTime,
        });
      }
    );
  };

  addOutput(questionBankOutput);
  addOutput(contentOutput);
  addOutput(richContentOutput);

  if (Array.isArray(studyDataOutput)) {
    studyDataOutput.forEach(
      (q, index) => {
        const isString =
          typeof q === "string";

        if (
          !isString &&
          (!q ||
            typeof q !== "object")
        ) {
          return;
        }

        output.push({
          id:
            q?.id ??
            `study-output-${index}`,

          question:
            isString
              ? q.trim()
              : normalizeText(
                  q.question ||
                    q.prompt
                ),

          answer:
            isString
              ? ""
              : q.answer,

          explanation:
            isString
              ? []
              : normalizeExplanation(
                  q.explanation
                ),

          difficulty:
            isString
              ? "Medium"
              : q.difficulty ||
                "Medium",

          marks:
            isString
              ? 2
              : q.marks ?? 2,
        });
      }
    );
  }

  const validOutput = output.filter(
    (item) => item.question
  );

  return validOutput.length
    ? validOutput
    : null;
}

/* -------------------------------------------------------------------------- */
/* Revision notes                                                              */
/* -------------------------------------------------------------------------- */

function normalizeRevisionNotes(
  contentRevisionNotes,
  quickRevision
) {
  const notes = [];

  if (
    Array.isArray(
      contentRevisionNotes
    )
  ) {
    contentRevisionNotes.forEach(
      (note, index) => {
        if (
          !note ||
          typeof note !== "object"
        ) {
          return;
        }

        const content =
          normalizeText(
            note.content
          );

        if (!content) {
          return;
        }

        notes.push({
          id:
            note.id ??
            `revision-note-${index}`,

          title:
            normalizeText(
              note.title
            ) || "Revision Note",

          content,
        });
      }
    );
  }

  if (Array.isArray(quickRevision)) {
    quickRevision.forEach(
      (item, index) => {
        const content =
          normalizeText(item);

        if (!content) {
          return;
        }

        notes.push({
          id:
            `quick-revision-${index}`,

          title:
            "Quick Revision",

          content,
        });
      }
    );
  }

  return notes.length
    ? notes
    : null;
}

