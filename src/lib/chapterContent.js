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

    diagrams: normalizeDiagrams(chapter?.slug, sd.diagrams, content),

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

import icseJavaVisualRegistry from "../app/data/chapter-content/visuals/icseJavaVisualRegistry";

/* -------------------------------------------------------------------------- */
/* Diagrams                                                                  */
/* -------------------------------------------------------------------------- */

function normalizeDiagrams(chapterSlug, sdDiagrams, content) {
  const explicit =
    normalizeList(sdDiagrams) ||
    normalizeList(content?.diagrams);

  if (explicit) return explicit;

  const registryVisuals = Array.isArray(icseJavaVisualRegistry)
    ? icseJavaVisualRegistry
        .filter((visual) => visual?.chapterSlug === chapterSlug && visual?.path)
        .map((visual) => ({
          id: visual.id,
          type: "image",
          title: visual.title,
          explanation: visual.purpose || "Use this visual to connect the concept with the Java program flow.",
          src: visual.path,
          alt: visual.alt || visual.title,
          caption: visual.caption || "",
        }))
    : [];

  if (registryVisuals.length) return registryVisuals;

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

  // Treat a long beginner explanation as authored teaching prose, not one
  // giant paragraph. Blank lines become natural reading beats.
  if (theory?.beginnerExplanation) {
    splitTeachingParagraphs(theory.beginnerExplanation).forEach((text) => {
      sections.push({ type: "paragraph", text });
    });
  }

  if (theory) {
    addUniqueListSection(sections, "Important Points", theory.importantPoints);
    addUniqueListSection(sections, "Memory Tricks", theory.memoryTricks);
    addUniqueListSection(sections, "Exam Tips", theory.examTips);
  }

  if (Array.isArray(content?.theory)) {
    content.theory.forEach((text) => {
      splitTeachingParagraphs(text).forEach((paragraph) => {
        sections.push({ type: "paragraph", text: paragraph });
      });
    });
  } else if (typeof content?.theory === "string" && content.theory.trim()) {
    splitTeachingParagraphs(content.theory).forEach((paragraph) => {
      sections.push({ type: "paragraph", text: paragraph });
    });
  }

  const supportingLists = [
    ["Important Notes", content?.importantNotes],
    ["Common Mistakes", content?.commonMistakes],
    ["Exam Tips", content?.examTips],
  ];

  supportingLists.forEach(([title, items]) => {
    addUniqueListSection(sections, title, items);
  });

  if (content?.introduction?.description) {
    splitTeachingParagraphs(content.introduction.description).forEach((text) => {
      sections.push({ type: "paragraph", text });
    });
  }

  if (sections.length) return sections;

  if (Array.isArray(sd.concepts) && sd.concepts.length) {
    return sd.concepts.flatMap((concept) =>
      splitTeachingParagraphs(concept).map((text) => ({
        type: "paragraph",
        text,
      }))
    );
  }

  return null;
}

function splitTeachingParagraphs(value) {
  return normalizeText(value)
    .split(/\\n\\s*\\n+/)
    .map((part) => part.replace(/\\s+/g, " ").trim())
    .filter(Boolean);
}

function addUniqueListSection(target, title, items) {
  if (!Array.isArray(items) || !items.length) return;

  const seen = new Set();
  const cleaned = items
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  if (cleaned.length) {
    target.push({
      type: "list",
      title,
      items: cleaned,
    });
  }
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
