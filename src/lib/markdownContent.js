import fs from "fs";
import path from "path";

/**
 * Registry mapping chapter slugs to Markdown filenames.
 *
 * Keep this mapping pointed at files that actually exist in the repository.
 * The Introduction to Java chapter previously referenced a non-existent
 * `Introduction_to_Java_Class9_Theory.md`, which made the study page fall
 * through to an empty rich-content registry entry.
 */
const chapterRegistry = {
  introduction: "Introduction_to_Java_Class9.md",
  "introduction-to-java": "Introduction_to_Java_Class9.md",
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
    let difficulty = "medium";
    if (heading.includes("easy")) difficulty = "easy";
    if (heading.includes("hard") || heading.includes("difficult")) difficulty = "hard";

    const blocks = extractCodeBlocks(subsection.lines);
    if (!blocks.length) continue;
    blocks.forEach((code, index) => {
      result[difficulty].push({
        id: `md-programming-${difficulty}-${index + 1}`,
        title: `${difficulty[0].toUpperCase()}${difficulty.slice(1)} Programming Practice`,
        code,
      });
    });
  }

  return result;
}

function parseMarkdownContent(markdown) {
  const sections = splitTopLevelSections(markdown);
  const content = {
    title: "",
    intro: "",
    learningObjectives: [],
    sections: [],
    theory: [],
    examples: [],
    definitions: [],
    keyTerms: [],
    importantNotes: [],
    commonMistakes: [],
    examTips: [],
    quickRevision: [],
    mcqs: [],
    programmingQuestions: { easy: [], medium: [], hard: [] },
  };

  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) content.title = titleMatch[1].trim();

  const objectiveSection = sections.find((section) => normalizeHeading(section.heading).includes("learning objectives"));
  if (objectiveSection) content.learningObjectives = extractListItems(objectiveSection.body);

  const examplePattern = /###\s+example\s*([\s\S]*?)(?=###\s+|##\s+|$)/gi;
  let exampleMatch;
  while ((exampleMatch = examplePattern.exec(markdown))) {
    const body = exampleMatch[1].trim();
    if (body) content.examples.push({ title: "Example", text: body, code: extractCodeBlocks(body.split("\n"))[0] || "" });
  }

  for (const section of sections) {
    const normalized = normalizeHeading(section.heading);
    const body = section.body;
    const paragraphs = extractParagraphs(body);
    const lists = extractListItems(body);
    const codes = extractCodeBlocks(body);
    const definitions = parseDefinitions(body);

    if (normalized.includes("evolution") || normalized.includes("theory") || normalized.includes("feature") || normalized.includes("architecture") || normalized.includes("life cycle")) {
      content.theory.push(...paragraphs);
    }
    if (normalized.includes("important notes")) content.importantNotes.push(...lists);
    if (normalized.includes("common mistakes")) content.commonMistakes.push(...lists);
    if (normalized.includes("exam tips")) content.examTips.push(...lists);
    if (normalized.includes("quick revision")) content.quickRevision.push(...lists);
    if (normalized.includes("definition")) content.definitions.push(...definitions);

    if (codes.length) {
      codes.forEach((code, index) => {
        content.examples.push({ title: `${section.heading} Example ${index + 1}`, text: "", code });
      });
    }

    content.sections.push({
      heading: section.heading,
      paragraphs,
      bullets: lists,
      definitions,
      codeBlocks: codes,
    });
  }

  content.mcqs = parseMcqs(markdown.split("\n"));
  content.programmingQuestions = parseProgrammingQuestions(markdown.split("\n"));

  const introSection = sections.find((section) => normalizeHeading(section.heading).includes("evolution"));
  content.intro = introSection ? extractParagraphs(introSection.body).slice(0, 2).join(" ") : content.theory.slice(0, 2).join(" ");

  return content;
}

export function getMarkdownChapterContent(slug) {
  const markdown = readMarkdownFile(slug);
  if (!markdown) return null;
  return { content: parseMarkdownContent(markdown), source: chapterRegistry[slug] };
}

export default getMarkdownChapterContent;
