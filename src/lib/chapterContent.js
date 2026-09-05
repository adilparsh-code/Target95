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
    diagrams: normalizeDiagrams(sd.diagrams, content),
    practice: normalizePractice(content?.practiceTest || content?.practice),
    mcqs: normalizeMcqs(questions?.mcqs, content?.mcqs),
    output: normalizeOutput(questions?.outputQuestions, questions?.outputBasedQuestions, sd.outputBasedQuestions),
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
 * Normalize diagrams and automatically promote rich memory-model diagrams
 * into the visual section when a chapter has not supplied a dedicated list.
 */
function normalizeDiagrams(sdDiagrams, content) {
  const explicit = normalizeList(sdDiagrams) || normalizeList(content?.diagrams);
  if (explicit) return explicit;

  const memoryModel = content?.theoryNotes?.memoryModel;
  if (memoryModel?.diagram) {
    return [{
      type: "memory-model",
      title: memoryModel.heading || "Concept visual",
      diagram: memoryModel.diagram,
      explanation: memoryModel.explanation || "Visualise the structure before tracing the code.",
      examNote: memoryModel.examNote || "",
    }];
  }

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
