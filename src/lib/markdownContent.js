import fs from "fs";
import path from "path";

/**
 * Registry mapping chapter slugs to Markdown filenames.
 * Add future chapters here — the same parser handles them.
 */
const chapterRegistry = {
  introduction: "Introduction_to_Java_Class9.md",
  "introduction-to-java": "Introduction_to_Java_Class9_Theory.md",
  // Ensure all dynamic routes built during SSG are registered here:
  constructor: "Constructor_Class9.md",
  // "introduction-to-oop": "Introduction_to_OOP_Class9.md",
  // "objects-and-classes": "Objects_and_Classes_Class9.md",
  // arrays: "Arrays_Class10.md",
  // strings: "Strings_Class10.md",
};

/**
 * Read the raw Markdown source for a chapter slug safely.
 * @param {string} slug
 * @returns {string|null}
 */
function readMarkdownFile(slug) {
  // 1. Guard against invalid or missing slugs
  if (!slug || typeof slug !== "string") return null;

  const filename = chapterRegistry[slug];
  if (!filename || typeof filename !== "string") return null;

  try {
    // 2. Resolve absolute path safely for Next.js prerendering / SSG environment
    const academicDir = path.join(process.cwd(), "docs", "02_Academic");
    const filePath = path.join(academicDir, filename);

    // 3. Verify file existence before reading to prevent read errors
    if (!fs.existsSync(filePath)) {
      console.warn(`[Markdown Loader] File not found: ${filePath}`);
      return null;
    }

    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`[Markdown Loader] Failed to read chapter "${slug}":`, error);
    return null;
  }
}

/**
 * Split Markdown into top-level sections by `## ` headings.
 * @param {string} markdown
 * @returns {Array<{heading: string, body: string[]}>}
 */
function splitTopLevelSections(markdown) {
  const lines = markdown.split("\n");
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.slice(3).trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);

  return sections;
}

/**
 * Split a section body into subsections by `### ` headings.
 * @param {string[]} bodyLines
 * @returns {Array<{heading: string|null, lines: string[]}>}
 */
function splitSubsections(bodyLines) {
  const subsections = [];
  let current = { heading: null, lines: [] };

  for (const line of bodyLines) {
    if (line.startsWith("### ")) {
      if (current.lines.length > 0 || current.heading) {
        subsections.push(current);
      }
      current = { heading: line.slice(4).trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.length > 0 || current.heading) {
    subsections.push(current);
  }

  return subsections;
}

/**
 * Extract bullet list items from lines.
 * Handles `- item`, `* item`, and numbered `1. item` lists.
 * @param {string[]} lines
 * @returns {string[]}
 */
function extractListItems(lines) {
  const items = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const match =
      trimmed.match(/^[-*]\s+(.+)$/) ||
      trimmed.match(/^\d+\.\s+(.+)$/) ||
      trimmed.match(/^[⭐❌]\s*(.+)$/);
    if (match) {
      items.push(match[1].trim());
    }
  }
  return items;
}

/**
 * Extract code blocks from lines.
 * @param {string[]} lines
 * @returns {string[]}
 */
function extractCodeBlocks(lines) {
  const blocks = [];
  let inBlock = false;
  let current = [];

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inBlock) {
        blocks.push(current.join("\n").trim());
        current = [];
        inBlock = false;
      } else {
        inBlock = true;
      }
    } else if (inBlock) {
      current.push(line);
    }
  }
  if (inBlock && current.length > 0) {
    blocks.push(current.join("\n").trim());
  }

  return blocks;
}

/**
 * Extract plain text paragraphs (non-empty, non-list, non-code lines).
 * @param {string[]} lines
 * @returns {string[]}
 */
function extractParagraphs(lines) {
  const paragraphs = [];
  let current = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current.length > 0) {
        paragraphs.push(current.join(" ").trim());
        current = [];
      }
      continue;
    }
    if (
      trimmed.startsWith("```") ||
      trimmed.startsWith("-") ||
      trimmed.startsWith("*") ||
      /^\d+\.\s/.test(trimmed)
    ) {
      if (current.length > 0) {
        paragraphs.push(current.join(" ").trim());
        current = [];
      }
      continue;
    }
    current.push(trimmed);
  }
  if (current.length > 0) {
    paragraphs.push(current.join(" ").trim());
  }

  return paragraphs;
}

/**
 * Parse definitions from `### Definition` subsections.
 * Format: `**Term:** Definition text`
 * @param {string[]} lines
 * @returns {string[]}
 */
function parseDefinitions(lines) {
  const definitions = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (match) {
      definitions.push(`${match[1]}: ${match[2]}`);
    } else if (trimmed && !trimmed.startsWith("```")) {
      definitions.push(trimmed);
    }
  }
  return definitions;
}

/**
 * Parse MCQs from the `## MCQs` section.
 * @param {string[]} lines
 * @returns {Array<{id: string, question: string, options: string[], answer: number, explanation: string}>}
 */
function parseMcqs(lines) {
  const mcqs = [];
  let current = null;
  let optionLines = [];
  let questionLines = [];

  const flush = () => {
    if (!current) return;
    const options = optionLines.map((l) =>
      l.replace(/^[-*]\s+[A-D]\)\s*/, "").replace(/\s*✓\s*$/, "").trim()
    );
    const answerIndex = optionLines.findIndex((l) => l.includes("✓"));
    mcqs.push({
      id: current.id,
      question: questionLines
        .join(" ")
        .replace(/^\d+\.\s*\*\*/, "")
        .replace(/\*\*\s*$/, "")
        .trim(),
      options,
      answer: answerIndex >= 0 ? answerIndex : 0,
      explanation: current.explanation || "",
    });
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const questionMatch = trimmed.match(/^(\d+)\.\s+\*\*(.+?)\*\*\s*$/);
    if (questionMatch) {
      flush();
      current = { id: `md-mcq-${questionMatch[1]}`, explanation: "" };
      questionLines = [questionMatch[2]];
      optionLines = [];
      continue;
    }

    const optionMatch = trimmed.match(/^[-*]\s+[A-D]\)\s+/);
    if (optionMatch && current) {
      optionLines.push(trimmed);
      continue;
    }

    if (
      current &&
      optionLines.length > 0 &&
      !trimmed.startsWith("-") &&
      !trimmed.startsWith("*")
    ) {
      current.explanation = trimmed;
    }
  }
  flush();

  return mcqs;
}

/**
 * Parse programming questions from the `## Programming Questions` section.
 * @param {string[]} lines
 * @returns {{easy: Array, medium: Array, hard: Array}}
 */
function parseProgrammingQuestions(lines) {
  const result = { easy: [], medium: [], hard: [] };
  const subsections = splitSubsections(lines);

  for (const subsection of subsections) {
    const heading = subsection.heading?.toLowerCase() || "";
    let level = null;
    if (heading.includes("basic")) level = "easy";
    else if (heading.includes("intermediate")) level = "medium";
    else if (heading.includes("advanced")) level = "hard";
    if (!level) continue;

    const body = subsection.lines.join("\n");
    const questionBlocks = body.split(/\n(?=\d+\.\s+\*\*)/);

    for (const block of questionBlocks) {
      const blockLines = block.split("\n");
      const questionMatch = blockLines[0]?.match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);
      if (!questionMatch) continue;

      const codeBlocks = extractCodeBlocks(blockLines);
      const paragraphs = extractParagraphs(blockLines);
      const outputMatch = blockLines.find((l) => l.includes("**Output:**"));

      result[level].push({
        id: `md-prog-${level}-${result[level].length + 1}`,
        question: questionMatch[1].trim(),
        solution: codeBlocks[0] || "",
        output: outputMatch ? outputMatch.replace(/\*\*Output:\*\*\s*/, "").trim() : "",
        explanation: paragraphs.filter((p) => p !== questionMatch[1].trim()).join("\n"),
      });
    }
  }

  return result;
}

/**
 * Parse output questions from the `## Output Questions` section.
 * @param {string[]} lines
 * @returns {Array<{id: string, question: string, answer: string, explanation: string}>}
 */
function parseOutputQuestions(lines) {
  const questions = [];
  const body = lines.join("\n");
  const blocks = body.split(/\n(?=\d+\.\s+\*\*)/);

  for (const block of blocks) {
    const blockLines = block.split("\n");
    const questionMatch = blockLines[0]?.match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);
    if (!questionMatch) continue;

    const codeBlocks = extractCodeBlocks(blockLines);
    const answerMatch = blockLines.find((l) => l.includes("**Answer:**"));
    const explanationMatch = blockLines.find((l) => l.includes("**Explanation:**"));

    questions.push({
      id: `md-output-${questions.length + 1}`,
      question:
        questionMatch[1].trim() +
        (codeBlocks[0] ? `\n\`\`\`java\n${codeBlocks[0]}\n\`\`\`` : ""),
      answer: answerMatch ? answerMatch.replace(/\*\*Answer:\*\*\s*/, "").trim() : "",
      explanation: explanationMatch
        ? explanationMatch.replace(/\*\*Explanation:\*\*\s*/, "").trim()
        : "",
    });
  }

  return questions;
}

/**
 * Parse previous year questions from the `## Previous Year Questions` section.
 * @param {string[]} lines
 * @returns {Array<{id: string, question: string, answer: string, explanation: string}>}
 */
function parsePreviousYearQuestions(lines) {
  const questions = [];
  const body = lines.join("\n");
  const blocks = body.split(/\n(?=\d+\.\s+\*\*)/);

  for (const block of blocks) {
    const blockLines = block.split("\n");
    const questionMatch = blockLines[0]?.match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);
    if (!questionMatch) continue;

    const codeBlocks = extractCodeBlocks(blockLines);
    const answerMatch = blockLines.find((l) => l.includes("**Answer:**"));
    const explanationMatch = blockLines.find((l) => l.includes("**Explanation:**"));

    questions.push({
      id: `md-pyq-${questions.length + 1}`,
      question:
        questionMatch[1].trim() +
        (codeBlocks[0] ? `\n\`\`\`java\n${codeBlocks[0]}\n\`\`\`` : ""),
      answer: answerMatch ? answerMatch.replace(/\*\*Answer:\*\*\s*/, "").trim() : "",
      explanation: explanationMatch
        ? explanationMatch.replace(/\*\*Explanation:\*\*\s*/, "").trim()
        : "",
    });
  }

  return questions;
}

/**
 * Parse revision notes from the `## Revision Notes` section.
 * @param {string[]} lines
 * @returns {Array<{title: string, content: string}>}
 */
function parseRevisionNotes(lines) {
  const notes = [];
  const subsections = splitSubsections(lines);

  for (const subsection of subsections) {
    if (!subsection.heading) continue;
    const content = subsection.lines
      .filter((l) => l.trim())
      .map((l) => l.trim())
      .join("\n");
    if (content) {
      notes.push({ title: subsection.heading, content });
    }
  }

  return notes;
}

/**
 * Parse practice questions into a practiceTest shape.
 * @param {string[]} lines
 * @returns {Object|null}
 */
function parsePracticeQuestions(lines) {
  const subsections = splitSubsections(lines);
  const sections = [];

  for (const subsection of subsections) {
    if (!subsection.heading) continue;
    const heading = subsection.heading;
    const marksMatch = heading.match(/\((\d+)\s*marks?/i);
    const marks = marksMatch ? parseInt(marksMatch[1], 10) : 2;

    const body = subsection.lines.join("\n");
    const questionBlocks = body.split(/\n(?=\d+\.\s+\*\*)/);
    const questions = [];

    for (const block of questionBlocks) {
      const blockLines = block.split("\n");
      const questionMatch = blockLines[0]?.match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);
      if (!questionMatch) continue;

      const answerMatch = blockLines.find((l) => l.includes("**Answer:**"));
      const codeBlocks = extractCodeBlocks(blockLines);

      questions.push({
        id: `md-practice-${sections.length + 1}-${questions.length + 1}`,
        question: questionMatch[1].trim(),
        answer: answerMatch ? answerMatch.replace(/\*\*Answer:\*\*\s*/, "").trim() : "",
        code: codeBlocks[0] || "",
      });
    }

    if (questions.length > 0) {
      sections.push({ title: heading, marks, questions });
    }
  }

  if (sections.length === 0) return null;

  return {
    title: "Practice Questions",
    totalMarks: sections.reduce((sum, s) => sum + s.marks, 0),
    timeLimit: "30 minutes",
    sections,
  };
}

/**
 * Parse raw Markdown text into normalized structure.
 * @param {string} markdown - Raw Markdown source
 * @returns {Object} Normalized content object
 */
function parseMarkdownContent(markdown) {
  if (!markdown) return null;

  const sections = splitTopLevelSections(markdown);
  const content = {
    theoryNotes: null,
    definitions: [],
    examples: { basic: [], intermediate: [], advanced: [] },
    mcqs: [],
    programmingQuestions: { easy: [], medium: [], hard: [] },
    outputBasedQuestions: [],
    previousYearQuestions: [],
    revisionNotes: [],
    practiceTest: null,
    diagrams: [],
    keyTerms: [],
  };

  for (const section of sections) {
    const heading = section.heading.toLowerCase();

    if (heading === "learning objectives") {
      content.learningObjectives = extractListItems(section.body);
    } else if (
      /^\d+\./.test(section.heading) ||
      /^[a-z0-9 ]+$/.test(section.heading)
    ) {
      const subsections = splitSubsections(section.body);
      const theoryParagraphs = [];
      const importantPoints = [];
      const examTips = [];

      for (const sub of subsections) {
        const subHeading = sub.heading?.toLowerCase() || "";
        if (subHeading === "theory") {
          theoryParagraphs.push(...extractParagraphs(sub.lines));
        } else if (subHeading === "important notes") {
          importantPoints.push(...extractListItems(sub.lines));
        } else if (subHeading === "exam tips") {
          examTips.push(...extractListItems(sub.lines));
        } else if (subHeading === "definition") {
          content.definitions.push(...parseDefinitions(sub.lines));
        } else if (subHeading === "example") {
          const codeBlocks = extractCodeBlocks(sub.lines);
          const paragraphs = extractParagraphs(sub.lines);
          const level =
            content.examples.basic.length < 3
              ? "basic"
              : content.examples.intermediate.length < 2
              ? "intermediate"
              : "advanced";

          codeBlocks.forEach((code) => {
            content.examples[level].push({
              title:
                paragraphs[0] ||
                `Example ${content.examples[level].length + 1}`,
              code,
              output: "",
              explanation: paragraphs.slice(1),
            });
          });
        }
      }

      if (
        theoryParagraphs.length > 0 ||
        importantPoints.length > 0 ||
        examTips.length > 0
      ) {
        if (content.theoryNotes) {
          content.theoryNotes.beginnerExplanation = [
            content.theoryNotes.beginnerExplanation,
            ...theoryParagraphs,
          ]
            .filter(Boolean)
            .join("\n\n");
          content.theoryNotes.importantPoints = [
            ...content.theoryNotes.importantPoints,
            ...importantPoints,
          ];
          content.theoryNotes.examTips = [
            ...content.theoryNotes.examTips,
            ...examTips,
          ];
        } else {
          content.theoryNotes = {
            beginnerExplanation: theoryParagraphs.join("\n\n"),
            importantPoints,
            examTips,
          };
        }
      }
    } else if (heading === "diagrams") {
      const subsections = splitSubsections(section.body);
      for (const sub of subsections) {
        const codeBlocks = extractCodeBlocks(sub.lines);
        if (codeBlocks.length > 0) {
          content.diagrams.push(...codeBlocks);
        }
      }
      const topLevelCode = extractCodeBlocks(section.body);
      if (topLevelCode.length > 0) {
        content.diagrams.push(...topLevelCode);
      }
    } else if (heading === "mcqs") {
      content.mcqs = parseMcqs(section.body);
    } else if (heading === "programming questions") {
      content.programmingQuestions = parseProgrammingQuestions(section.body);
    } else if (heading === "output questions") {
      content.outputBasedQuestions = parseOutputQuestions(section.body);
    } else if (heading === "previous year questions") {
      content.previousYearQuestions = parsePreviousYearQuestions(section.body);
    } else if (heading === "revision notes") {
      content.revisionNotes = parseRevisionNotes(section.body);

      const bodyText = section.body.join("\n");
      const glossaryMatch = bodyText.match(
        /\*\*Key Terms Glossary:\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n---|\n##)/
      );
      if (glossaryMatch) {
        content.keyTerms = extractListItems(
          glossaryMatch[1].split("\n")
        ).map((term) => term.replace(/\*\*/g, "").trim());
      }

      if (!content.keyTerms || content.keyTerms.length === 0) {
        const keyTermsSection = splitSubsections(section.body).find((sub) =>
          sub.heading?.toLowerCase().includes("key terms")
        );
        if (keyTermsSection) {
          content.keyTerms = extractListItems(keyTermsSection.lines);
        }
      }
    } else if (heading === "practice questions") {
      content.practiceTest = parsePracticeQuestions(section.body);
    }
  }

  // Clean up empty fields to null
  if (content.definitions.length === 0) content.definitions = null;
  if (content.diagrams.length === 0) content.diagrams = null;
  if (content.keyTerms.length === 0) content.keyTerms = null;
  if (content.mcqs.length === 0) content.mcqs = null;
  if (content.outputBasedQuestions.length === 0) content.outputBasedQuestions = null;
  if (content.previousYearQuestions.length === 0) content.previousYearQuestions = null;
  if (content.revisionNotes.length === 0) content.revisionNotes = null;
  if (
    content.examples.basic.length === 0 &&
    content.examples.intermediate.length === 0 &&
    content.examples.advanced.length === 0
  ) {
    content.examples = null;
  }
  if (
    content.programmingQuestions.easy.length === 0 &&
    content.programmingQuestions.medium.length === 0 &&
    content.programmingQuestions.hard.length === 0
  ) {
    content.programmingQuestions = null;
  }

  return content;
}

/**
 * Get the parsed Markdown content for a chapter slug.
 * Returns null if the slug is not registered or the file is missing.
 *
 * @param {string} slug
 * @returns {Object|null} { content, source }
 */
export function getMarkdownChapterContent(slug) {
  const markdown = readMarkdownFile(slug);
  if (!markdown) return null;

  return {
    content: parseMarkdownContent(markdown),
    source: chapterRegistry[slug],
  };
}

/**
 * Get all registered Markdown chapter slugs.
 * @returns {string[]}
 */
export function getMarkdownChapterSlugs() {
  return Object.keys(chapterRegistry);
}

/**
 * Check if a slug has a registered Markdown chapter.
 * @param {string} slug
 * @returns {boolean}
 */
export function hasMarkdownChapter(slug) {
  return typeof slug === "string" && slug in chapterRegistry;
}