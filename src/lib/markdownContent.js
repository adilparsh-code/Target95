import fs from "fs";
import path from "path";

/**
 * Registry mapping chapter slugs to Markdown filenames.
 */
const chapterRegistry = {
  introduction: "Introduction_to_Java_Class9.md",
  "introduction-to-java": "Introduction_to_Java_Class9_Theory.md",
  constructor: "Constructor_Class9.md",
};

function readMarkdownFile(slug) {
  if (!slug || typeof slug !== "string") return null;
  const filename = chapterRegistry[slug];
  if (!filename) return null;

  try {
    const filePath = path.join(process.cwd(), "docs", "02_Academic", filename);
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

function splitTopLevelSections(markdown) {
  const sections = [];
  let current = null;

  for (const line of markdown.split("\n")) {
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

function splitSubsections(lines) {
  const subsections = [];
  let current = { heading: null, lines: [] };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (current.lines.length > 0 || current.heading) subsections.push(current);
      current = { heading: line.slice(4).trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }

  if (current.lines.length > 0 || current.heading) subsections.push(current);
  return subsections;
}

function normalizeHeading(heading) {
  return String(heading || "")
    .replace(/^\d+(?:\.\d+)*[.)]?\s*/, "")
    .trim()
    .toLowerCase();
}

function extractListItems(lines) {
  const items = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const match =
      trimmed.match(/^[-*]\s+(.+)$/) ||
      trimmed.match(/^\d+[.)]\s+(.+)$/) ||
      trimmed.match(/^[⭐❌✅]\s*(.+)$/);
    if (match) items.push(match[1].trim());
  }
  return items;
}

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

  if (inBlock && current.length) blocks.push(current.join("\n").trim());
  return blocks;
}

function extractParagraphs(lines) {
  const paragraphs = [];
  let current = [];
  let inCode = false;

  const flush = () => {
    if (current.length) {
      paragraphs.push(current.join(" ").trim());
      current = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      flush();
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (!trimmed) {
      flush();
      continue;
    }
    if (
      trimmed.startsWith("-") ||
      trimmed.startsWith("*") ||
      /^\d+[.)]\s/.test(trimmed) ||
      trimmed.startsWith("|")
    ) {
      flush();
      continue;
    }
    current.push(trimmed);
  }

  flush();
  return paragraphs;
}

function parseDefinitions(lines) {
  const definitions = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("|") || trimmed.startsWith("---")) continue;
    const match = trimmed.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (match) definitions.push(`${match[1].trim()}: ${match[2].trim()}`);
  }
  return definitions;
}

function parseKeyTerms(lines) {
  const terms = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.includes("---")) continue;
    const cells = trimmed.split("|").map((cell) => cell.trim()).filter(Boolean);
    if (cells.length >= 2 && !/^term$/i.test(cells[0])) terms.push(cells[0]);
  }
  return terms;
}

function parseMcqs(lines) {
  const mcqs = [];
  let current = null;
  let options = [];

  const flush = () => {
    if (!current) return;
    const answerIndex = options.findIndex((option) => /✓|\*\*?correct\*\*/i.test(option));
    mcqs.push({
      id: current.id,
      question: current.question,
      options: options.map((option) =>
        option.replace(/^[-*]\s+[A-D][.)]\s*/i, "").replace(/\s*✓\s*$/, "").trim()
      ),
      answer: answerIndex >= 0 ? answerIndex : 0,
      explanation: current.explanation || "",
    });
    current = null;
    options = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const questionMatch = trimmed.match(/^(\d+)\.\s+\*\*(.+?)\*\*\s*$/);
    if (questionMatch) {
      flush();
      current = { id: `md-mcq-${questionMatch[1]}`, question: questionMatch[2], explanation: "" };
      continue;
    }

    if (current && /^[-*]\s+[A-D][.)]\s+/i.test(trimmed)) {
      options.push(trimmed);
      continue;
    }

    if (current && options.length && !trimmed.startsWith("-") && !trimmed.startsWith("*")) {
      current.explanation = trimmed;
    }
  }

  flush();
  return mcqs;
}

function parseProgrammingQuestions(lines) {
  const result = { easy: [], medium: [], hard: [] };

  for (const subsection of splitSubsections(lines)) {
    const heading = normalizeHeading(subsection.heading);
    const level = heading.includes("basic") || heading.includes("easy")
      ? "easy"
      : heading.includes("intermediate") || heading.includes("medium")
        ? "medium"
        : heading.includes("advanced") || heading.includes("hard")
          ? "hard"
          : null;
    if (!level) continue;

    const blocks = subsection.lines.join("\n").split(/\n(?=\d+\.\s+\*\*)/);
    for (const block of blocks) {
      const blockLines = block.split("\n");
      const match = blockLines[0]?.match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);
      if (!match) continue;
      const code = extractCodeBlocks(blockLines)[0] || "";
      const outputLine = blockLines.find((line) => line.includes("**Output:**"));
      result[level].push({
        id: `md-prog-${level}-${result[level].length + 1}`,
        question: match[1].trim(),
        solution: code,
        output: outputLine ? outputLine.replace(/\*\*Output:\*\*\s*/, "").trim() : "",
        explanation: extractParagraphs(blockLines).join("\n"),
      });
    }
  }

  return result;
}

function parseQuestionList(lines, prefix) {
  const questions = [];
  const blocks = lines.join("\n").split(/\n(?=\d+\.\s+\*\*)/);

  for (const block of blocks) {
    const blockLines = block.split("\n");
    const match = blockLines[0]?.match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);
    if (!match) continue;
    const code = extractCodeBlocks(blockLines)[0];
    const answerLine = blockLines.find((line) => line.includes("**Answer:**"));
    const explanationLine = blockLines.find((line) => line.includes("**Explanation:**"));
    questions.push({
      id: `md-${prefix}-${questions.length + 1}`,
      question: match[1].trim() + (code ? `\n\n\`\`\`java\n${code}\n\`\`\`` : ""),
      answer: answerLine ? answerLine.replace(/\*\*Answer:\*\*\s*/, "").trim() : "",
      explanation: explanationLine ? explanationLine.replace(/\*\*Explanation:\*\*\s*/, "").trim() : "",
    });
  }
  return questions;
}

function parseRevisionNotes(lines) {
  return splitSubsections(lines)
    .filter((section) => section.heading)
    .map((section) => ({
      title: section.heading,
      content: section.lines.filter((line) => line.trim()).map((line) => line.trim()).join("\n"),
    }))
    .filter((note) => note.content);
}

function parsePracticeQuestions(lines) {
  const sections = [];
  for (const subsection of splitSubsections(lines)) {
    if (!subsection.heading) continue;
    const marks = Number(subsection.heading.match(/\((\d+)\s*marks?/i)?.[1] || 2);
    const questions = [];
    for (const block of subsection.lines.join("\n").split(/\n(?=\d+\.\s+\*\*)/)) {
      const blockLines = block.split("\n");
      const match = blockLines[0]?.match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);
      if (!match) continue;
      questions.push({
        id: `md-practice-${sections.length + 1}-${questions.length + 1}`,
        question: match[1].trim(),
        answer: blockLines.find((line) => line.includes("**Answer:**"))?.replace(/\*\*Answer:\*\*\s*/, "").trim() || "",
        code: extractCodeBlocks(blockLines)[0] || "",
      });
    }
    if (questions.length) sections.push({ title: subsection.heading, marks, questions });
  }
  return sections.length
    ? { title: "Practice Questions", totalMarks: sections.reduce((sum, section) => sum + section.marks, 0), timeLimit: "30 minutes", sections }
    : null;
}

function parseMarkdownContent(markdown) {
  if (!markdown) return null;

  const content = {
    learningObjectives: null,
    theoryNotes: null,
    definitions: null,
    examples: { basic: [], intermediate: [], advanced: [] },
    mcqs: null,
    programmingQuestions: null,
    outputBasedQuestions: null,
    previousYearQuestions: null,
    revisionNotes: null,
    practiceTest: null,
    diagrams: null,
    keyTerms: null,
  };

  for (const section of splitTopLevelSections(markdown)) {
    const heading = normalizeHeading(section.heading);
    const subsections = splitSubsections(section.body);

    if (heading === "learning objectives") {
      content.learningObjectives = extractListItems(section.body);
      continue;
    }

    if (heading === "theory" || heading === "introduction" || heading === "overview") {
      const paragraphs = [];
      const importantPoints = [];
      const examTips = [];

      for (const subsection of subsections) {
        const subHeading = normalizeHeading(subsection.heading);
        const subParagraphs = extractParagraphs(subsection.lines);
        if (subHeading === "important notes" || subHeading === "important points") {
          importantPoints.push(...extractListItems(subsection.lines));
        } else if (subHeading === "exam tips") {
          examTips.push(...extractListItems(subsection.lines));
        } else if (subParagraphs.length) {
          paragraphs.push(...subParagraphs);
        }
      }

      const bodyParagraphs = extractParagraphs(section.body);
      paragraphs.push(...bodyParagraphs);

      if (paragraphs.length || importantPoints.length || examTips.length) {
        content.theoryNotes = {
          beginnerExplanation: [...new Set(paragraphs)].join("\n\n"),
          importantPoints,
          examTips,
        };
      }
      continue;
    }

    if (heading === "definitions") {
      const definitions = parseDefinitions(section.body);
      content.definitions = definitions.length ? definitions : null;
      continue;
    }

    if (heading === "key terms" || heading === "key terms glossary") {
      const terms = parseKeyTerms(section.body);
      content.keyTerms = terms.length ? terms : null;
      continue;
    }

    if (heading === "worked examples" || heading === "examples") {
      const examples = { basic: [], intermediate: [], advanced: [] };
      const exampleSections = subsections.filter((sub) => normalizeHeading(sub.heading).includes("example"));
      const sourceSections = exampleSections.length ? exampleSections : [{ heading: "Example", lines: section.body }];

      sourceSections.forEach((subsection, index) => {
        const codeBlocks = extractCodeBlocks(subsection.lines);
        if (!codeBlocks.length) return;
        const level = index < 3 ? "basic" : index < 5 ? "intermediate" : "advanced";
        codeBlocks.forEach((code, codeIndex) => {
          const paragraphs = extractParagraphs(subsection.lines);
          examples[level].push({
            title: subsection.heading || paragraphs[0] || `Example ${index + 1}`,
            code,
            output: "",
            explanation: paragraphs,
          });
        });
      });
      content.examples = examples.basic.length || examples.intermediate.length || examples.advanced.length ? examples : null;
      continue;
    }

    if (heading === "diagrams") {
      const diagrams = extractCodeBlocks(section.body);
      content.diagrams = diagrams.length ? diagrams : null;
      continue;
    }

    if (heading === "practice questions") {
      content.practiceTest = parsePracticeQuestions(section.body);
      continue;
    }

    if (heading === "mcqs") {
      const mcqs = parseMcqs(section.body);
      content.mcqs = mcqs.length ? mcqs : null;
      continue;
    }

    if (heading === "programming questions") {
      const programming = parseProgrammingQuestions(section.body);
      const hasProgramming = Object.values(programming).some((items) => items.length);
      content.programmingQuestions = hasProgramming ? programming : null;
      continue;
    }

    if (heading === "output questions") {
      const output = parseQuestionList(section.body, "output");
      content.outputBasedQuestions = output.length ? output : null;
      continue;
    }

    if (heading === "previous year questions") {
      const pyqs = parseQuestionList(section.body, "pyq");
      content.previousYearQuestions = pyqs.length ? pyqs : null;
      continue;
    }

    if (heading === "revision notes") {
      const notes = parseRevisionNotes(section.body);
      content.revisionNotes = notes.length ? notes : null;
      continue;
    }
  }

  return content;
}

export function getMarkdownChapterContent(slug) {
  const markdown = readMarkdownFile(slug);
  if (!markdown) return null;
  return { content: parseMarkdownContent(markdown), source: chapterRegistry[slug] };
}

export function getMarkdownChapterSlugs() {
  return Object.keys(chapterRegistry);
}

export function hasMarkdownChapter(slug) {
  return typeof slug === "string" && slug in chapterRegistry;
}
