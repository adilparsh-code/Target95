/**
 * Chapter Content Normalization Layer
 * Maps various data sources (studyData, chapter-content, question-bank)
 * into a unified schema for the ChapterContentEngine.
 *
 * Every chapter automatically renders sections from structured data.
 * Future chapters work without creating new React components.
 */

/**
 * Normalize a chapter's content into a unified section schema.
 * Each section returns null if no data exists, so the engine
 * only renders sections that have content.
 *
 * @param {Object} chapter - Chapter object with studyData
 * @param {Object} content - Optional rich content from chapter-content
 * @param {Object} questions - Optional question bank data
 * @returns {Object} Normalized sections
 */
export function getChapterContent(chapter, content = null, questions = null) {
  const sd = chapter?.studyData || {};

  return {
    learningObjectives: normalizeList(sd.learningObjectives) || normalizeList(content?.learningObjectives),
    theory: normalizeTheory(sd, content),
    definitions: normalizeList(sd.definitions) || normalizeList(content?.definitions),
    keyTerms: normalizeList(sd.keyTerms) || normalizeList(content?.keyTerms),
    examples: normalizeExamples(sd.examples, content?.examples),
    diagrams: normalizeList(sd.diagrams) || normalizeList(content?.diagrams),
    practice: normalizePractice(content?.practiceTest || content?.practice),
    mcqs: normalizeMcqs(questions?.mcqs, content?.mcqs),
    output: normalizeOutput(questions?.outputQuestions, content?.outputBasedQuestions, sd.outputBasedQuestions),
    programming: normalizeProgramming(questions?.programmingQuestions, content?.programmingQuestions),
    pyqs: normalizePyqs(content?.previousYearQuestions),
    revisionNotes: normalizeRevisionNotes(content?.revisionNotes, sd.quickRevision || content?.memoryTricks),
  };
}

/**
 * Check if a chapter has any content for a given section.
 * Used to filter which sections render.
 */
export function hasSectionContent(section) {
  if (!section) return false;
  if (Array.isArray(section)) return section.length > 0;
  if (typeof section === "object") {
    return Object.keys(section).length > 0;
  }
  return !!section;
}

/**
 * Normalize a list of strings/objects.
 * Handles both array and single-value formats.
 */
function normalizeList(data) {
  if (!data) return null;
  if (Array.isArray(data)) return data.length > 0 ? data : null;
  if (typeof data === "string" && data.trim()) return [data];
  return null;
}

/**
 * Normalize theory content from multiple sources.
 * Prefers rich content from chapter-content, falls back to studyData.
 */
function normalizeTheory(sd, content) {
  // Rich theory from chapter-content
  if (content?.theoryNotes) {
    const theory = content.theoryNotes;
    const sections = [];

    if (theory.beginnerExplanation) {
      sections.push({ type: "paragraph", text: theory.beginnerExplanation });
    }
    if (theory.importantPoints?.length) {
      sections.push({ type: "list", title: "Important Points", items: theory.importantPoints });
    }
    if (theory.memoryTricks?.length) {
      sections.push({ type: "list", title: "Memory Tricks", items: theory.memoryTricks });
    }
    if (theory.examTips?.length) {
      sections.push({ type: "list", title: "Exam Tips", items: theory.examTips });
    }

    if (sections.length > 0) return sections;
  }

  // Also support legacy/simple rich-content shapes.
  if (typeof content?.theory === "string" && content.theory.trim()) {
    return [{ type: "paragraph", text: content.theory }];
  }
  if (content?.introduction?.description) {
    return [{ type: "paragraph", text: content.introduction.description }];
  }
  // Fallback to studyData concepts
  if (sd.concepts?.length) {
    return sd.concepts.map((concept) => ({ type: "paragraph", text: concept }));
  }

  return null;
}

/**
 * Normalize examples from multiple sources.
 * Handles both the studyData format and the chapter-content format.
 */
function normalizeExamples(sdExamples, contentExamples) {
  const examples = [];

  // From chapter-content (rich format with basic/intermediate/advanced)
  if (contentExamples) {
    const levels = ["basic", "intermediate", "advanced"];
    levels.forEach((level) => {
      if (contentExamples[level]?.length) {
        contentExamples[level].forEach((ex) => {
          examples.push({
            title: ex.title,
            code: ex.code,
            output: ex.output,
            explanation: ex.explanation,
            level,
          });
        });
      }
    });
  }

  // From studyData (simple format)
  if (sdExamples?.length) {
    sdExamples.forEach((ex) => {
      examples.push({
        title: ex.title,
        code: ex.code,
        output: ex.output,
        explanation: ex.explanation,
      });
    });
  }

  return examples.length > 0 ? examples : null;
}

/**
 * Normalize practice test content.
 */
function normalizePractice(practiceTest) {
  if (!practiceTest) return null;
  return {
    title: practiceTest.title,
    totalMarks: practiceTest.totalMarks,
    timeLimit: practiceTest.timeLimit,
    sections: practiceTest.sections || [],
  };
}

/**
 * Normalize MCQs from question-bank or chapter-content.
 */
function normalizeMcqs(questionBankMcqs, contentMcqs) {
  const mcqs = [];

  // From question-bank (preferred)
  if (questionBankMcqs?.length) {
    questionBankMcqs.forEach((q) => {
      mcqs.push({
        id: q.id,
        question: q.question,
        options: q.options,
        answer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        marks: q.marks,
      });
    });
  }

  // From chapter-content
  if (contentMcqs?.length) {
    contentMcqs.forEach((q) => {
      mcqs.push({
        id: q.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
      });
    });
  }

  return mcqs.length > 0 ? mcqs : null;
}

/**
 * Normalize programming questions from question-bank or chapter-content.
 */
function normalizeProgramming(questionBankProgramming, contentProgramming) {
  const programming = [];

  // From question-bank (preferred)
  if (questionBankProgramming?.length) {
    questionBankProgramming.forEach((q) => {
      programming.push({
        id: q.id,
        question: q.problemStatement,
        solution: q.solution,
        explanation: q.solutionExplanation,
        output: q.output,
        difficulty: q.difficulty,
        marks: q.marks,
        input: q.input,
        constraints: q.constraints,
        logic: q.logic,
      });
    });
  }

  // From chapter-content (grouped by difficulty)
  if (contentProgramming) {
    const levels = ["easy", "medium", "hard"];
    levels.forEach((level) => {
      if (contentProgramming[level]?.length) {
        contentProgramming[level].forEach((q) => {
          programming.push({
            id: q.id,
            question: q.question,
            solution: q.solution,
            output: q.output,
            difficulty: level,
          });
        });
      }
    });
  }

  return programming.length > 0 ? programming : null;
}

/**
 * Normalize previous year questions.
 */
function normalizePyqs(previousYearQuestions) {
  if (!previousYearQuestions?.length) return null;
  return previousYearQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
    explanation: q.explanation,
  }));
}

/**
 * Normalize output-based questions from question-bank, chapter-content, or studyData.
 */
function normalizeOutput(questionBankOutput, contentOutput, richContentOutput, studyDataOutput) {
  const output = [];

  // From question-bank (preferred)
  if (questionBankOutput?.length) {
    questionBankOutput.forEach((q) => {
      output.push({
        id: q.id,
        question: q.question || q.prompt,
        answer: q.answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        marks: q.marks,
        estimatedTime: q.estimatedTime,
      });
    });
  }

  // From chapter-content
  if (contentOutput?.length) {
    contentOutput.forEach((q) => {
      output.push({
        id: q.id,
        question: q.question || q.prompt,
        answer: q.answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        marks: q.marks,
      });
    });
  }

  // From studyData
  if (studyDataOutput?.length) {
    studyDataOutput.forEach((q, idx) => {
      output.push({
        id: `study-output-${idx}`,
        question: typeof q === "string" ? q : q.question || q.prompt || "",
        answer: typeof q === "string" ? "" : q.answer,
        explanation: typeof q === "string" ? "" : q.explanation,
        difficulty: "Medium",
        marks: 2,
      });
    });
  }

  return output.length > 0 ? output : null;
}

/**
 * Normalize revision notes from chapter-content or studyData.
 */
function normalizeRevisionNotes(contentRevisionNotes, quickRevision) {
  const notes = [];

  // From chapter-content (rich format)
  if (contentRevisionNotes?.length) {
    contentRevisionNotes.forEach((note) => {
      notes.push({
        title: note.title,
        content: note.content,
      });
    });
  }

  // From studyData quickRevision
  if (quickRevision?.length) {
    quickRevision.forEach((item) => {
      notes.push({
        title: "Quick Revision",
        content: item,
      });
    });
  }

  return notes.length > 0 ? notes : null;
}