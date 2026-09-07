/**
 * Chapter Content Normalization Layer
 * Maps studyData, rich chapter-content, authored Markdown and question-bank
 * data into the unified schema used by ChapterContentEngine.
 */

export function getChapterContent(chapter, content = null, questions = null) {
  const sd = chapter?.studyData || {};

  return {
    learningObjectives: normalizeList(sd.learningObjectives) || normalizeList(content?.learningObjectives),
    theory: normalizeTheory(sd, content),
    definitions: normalizeList(sd.definitions) || normalizeList(content?.definitions),
    keyTerms: normalizeKeyTerms(sd, content),
    examples: normalizeExamples(sd.examples, content?.examples),
    diagrams: normalizeDiagrams(sd.diagrams, content),
    practice: normalizePractice(content?.practiceTest || content?.practice),
    mcqs: normalizeMcqs(questions?.mcqs, content?.mcqs),
    output: normalizeOutput(
      questions?.outputQuestions,
      questions?.outputBasedQuestions,
      content?.outputBasedQuestions,
      sd.outputBasedQuestions
    ),
    programming: normalizeProgramming(questions?.programmingQuestions, content?.programmingQuestions),
    pyqs: normalizePyqs(content?.previousYearQuestions),
    revisionNotes: normalizeRevisionNotes(
      content?.revisionNotes,
      sd.quickRevision || content?.quickRevision || content?.memoryTricks
    ),
  };
}

export function hasSectionContent(section) {
  if (!section) return false;
  if (Array.isArray(section)) return section.length > 0;
  if (typeof section === "object") return Object.keys(section).length > 0;
  return !!section;
}

function normalizeList(data) {
  if (!data) return null;
  if (Array.isArray(data)) return data.length > 0 ? data : null;
  if (typeof data === "string" && data.trim()) return [data];
  return null;
}

function normalizeKeyTerms(sd, content) {
  const explicit = normalizeList(sd.keyTerms) || normalizeList(content?.keyTerms);
  if (explicit) return explicit;

  // Authored Markdown stores terminology in its section tables. The Markdown
  // parser exposes those sections, so only derive terms from explicitly named
  // terminology sections rather than guessing from unrelated tables.
  if (Array.isArray(content?.sections)) {
    const terms = [];
    content.sections.forEach((section) => {
      const heading = String(section.heading || "").toLowerCase();
      if (!heading.includes("key term") && !heading.includes("terminology")) return;
      if (Array.isArray(section.keyTerms)) terms.push(...section.keyTerms);
    });
    if (terms.length) return terms;
  }
  return null;
}

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

function normalizeTheory(sd, content) {
  const sections = [];

  // Rich chapter-content contract.
  const theory = content?.theoryNotes;
  if (theory) {
    if (theory.beginnerExplanation) sections.push({ type: "paragraph", text: theory.beginnerExplanation });
    if (theory.importantPoints?.length) sections.push({ type: "list", title: "Important Points", items: theory.importantPoints });
    if (theory.memoryTricks?.length) sections.push({ type: "list", title: "Memory Tricks", items: theory.memoryTricks });
    if (theory.examTips?.length) sections.push({ type: "list", title: "Exam Tips", items: theory.examTips });
  }

  // Authored Markdown parser shape: theory is an array of real paragraphs.
  if (Array.isArray(content?.theory)) {
    content.theory.forEach((text) => {
      if (typeof text === "string" && text.trim()) sections.push({ type: "paragraph", text: text.trim() });
    });
  } else if (typeof content?.theory === "string" && content.theory.trim()) {
    sections.push({ type: "paragraph", text: content.theory });
  }

  // Preserve authored supporting material instead of replacing it with filler.
  const supportingLists = [
    ["Important Notes", content?.importantNotes],
    ["Common Mistakes", content?.commonMistakes],
    ["Exam Tips", content?.examTips],
  ];
  supportingLists.forEach(([title, items]) => {
    if (Array.isArray(items) && items.length) sections.push({ type: "list", title, items });
  });

  if (content?.introduction?.description) sections.push({ type: "paragraph", text: content.introduction.description });

  if (sections.length) return sections;
  if (sd.concepts?.length) return sd.concepts.map((concept) => ({ type: "paragraph", text: concept }));
  return null;
}

function normalizeExamples(sdExamples, contentExamples) {
  const examples = [];

  if (Array.isArray(contentExamples)) {
    contentExamples.forEach((ex, index) => {
      if (!ex || typeof ex !== "object") return;
      examples.push({
        title: ex.title || `Example ${index + 1}`,
        code: ex.code || "",
        output: ex.output || "",
        explanation: ex.explanation || ex.text || "",
        level: ex.level,
      });
    });
  } else if (contentExamples && typeof contentExamples === "object") {
    ["basic", "intermediate", "advanced"].forEach((level) => {
      if (!Array.isArray(contentExamples[level])) return;
      contentExamples[level].forEach((ex, index) => {
        examples.push({
          title: ex.title || `${level[0].toUpperCase()}${level.slice(1)} Example ${index + 1}`,
          code: ex.code,
          output: ex.output,
          explanation: ex.explanation,
          level,
        });
      });
    });
  }

  if (Array.isArray(sdExamples)) {
    sdExamples.forEach((ex, index) => {
      if (!ex || typeof ex !== "object") return;
      examples.push({
        title: ex.title || `Example ${index + 1}`,
        code: ex.code,
        output: ex.output,
        explanation: ex.explanation || ex.text,
      });
    });
  }

  return examples.length ? examples : null;
}

function normalizePractice(practiceTest) {
  if (!practiceTest) return null;
  return {
    title: practiceTest.title,
    totalMarks: practiceTest.totalMarks,
    timeLimit: practiceTest.timeLimit,
    sections: practiceTest.sections || [],
  };
}

function normalizeMcqs(questionBankMcqs, contentMcqs) {
  const mcqs = [];
  if (questionBankMcqs?.length) {
    questionBankMcqs.forEach((q) => mcqs.push({ id: q.id, question: q.question, options: q.options, answer: q.correctAnswer, explanation: q.explanation, difficulty: q.difficulty, marks: q.marks }));
  }
  if (contentMcqs?.length) {
    contentMcqs.forEach((q) => mcqs.push({ id: q.id, question: q.question, options: q.options, answer: q.answer, explanation: q.explanation }));
  }
  return mcqs.length ? mcqs : null;
}

function normalizeProgramming(questionBankProgramming, contentProgramming) {
  const programming = [];
  if (questionBankProgramming?.length) {
    questionBankProgramming.forEach((q) => programming.push({
      id: q.id, question: q.problemStatement, solution: q.solution, explanation: q.solutionExplanation,
      output: q.output, difficulty: q.difficulty, marks: q.marks, input: q.input, constraints: q.constraints, logic: q.logic,
    }));
  }
  if (contentProgramming) {
    ["easy", "medium", "hard"].forEach((level) => {
      if (!Array.isArray(contentProgramming[level])) return;
      contentProgramming[level].forEach((q) => programming.push({ id: q.id, question: q.question, solution: q.solution, output: q.output, difficulty: level }));
    });
  }
  return programming.length ? programming : null;
}

function normalizePyqs(previousYearQuestions) {
  if (!previousYearQuestions?.length) return null;
  return previousYearQuestions.map((q) => ({ id: q.id, question: q.question, answer: q.answer, explanation: q.explanation }));
}

function normalizeOutput(questionBankOutput, contentOutput, richContentOutput, studyDataOutput) {
  const output = [];
  [questionBankOutput, contentOutput, richContentOutput].forEach((items) => {
    if (!items?.length) return;
    items.forEach((q) => output.push({
      id: q.id, question: q.question || q.prompt, answer: q.answer, explanation: q.explanation,
      difficulty: q.difficulty, marks: q.marks, estimatedTime: q.estimatedTime,
    }));
  });
  if (studyDataOutput?.length) {
    studyDataOutput.forEach((q, idx) => output.push({
      id: `study-output-${idx}`,
      question: typeof q === "string" ? q : q.question || q.prompt || "",
      answer: typeof q === "string" ? "" : q.answer,
      explanation: typeof q === "string" ? "" : q.explanation,
      difficulty: "Medium",
      marks: 2,
    }));
  }
  return output.length ? output : null;
}

function normalizeRevisionNotes(contentRevisionNotes, quickRevision) {
  const notes = [];
  if (contentRevisionNotes?.length) {
    contentRevisionNotes.forEach((note) => notes.push({ title: note.title, content: note.content }));
  }
  if (quickRevision?.length) {
    quickRevision.forEach((item) => notes.push({ title: "Quick Revision", content: item }));
  }
  return notes.length ? notes : null;
}
