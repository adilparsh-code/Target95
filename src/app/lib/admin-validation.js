/**
 * Server-side validation helpers for admin CRUD APIs.
 *
 * Every admin mutation goes through these validators before it reaches
 * Firestore. They sanitize strings, whitelist enum values and enforce the
 * question schema defined in src/lib/firestore/collections.js.
 */

/** Strip angle brackets / control chars, trim, cap length. */
export function cleanString(value, { maxLength = 2000, allowNewlines = true } = {}) {
  if (value == null) return "";
  let out = String(value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  if (!allowNewlines) out = out.replace(/[\r\n]+/g, " ");
  return out.trim().slice(0, maxLength);
}

export function cleanEnum(value, allowed, fallback) {
  const raw = String(value ?? "").trim().toLowerCase();
  return allowed.includes(raw) ? raw : fallback;
}

export function toInt(value, { min = 0, max = 100000, fallback = 0 } = {}) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

export function cleanStringArray(value, { maxItems = 20, maxLength = 40 } = {}) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanString(item, { maxLength, allowNewlines: false }))
    .filter(Boolean)
    .slice(0, maxItems);
}

export const QUESTION_TYPES = [
  "mcq",
  "theory",
  "programming",
  "output",
  "assertion-reason",
  "case-study",
  "short-answer",
  "long-answer",
  "fill-in-the-blanks",
  "true-false",
  "match-the-following",
];

export const DIFFICULTIES = ["easy", "medium", "hard"];
export const STATUSES = ["draft", "published", "archived"];
export const BOARDS = ["ICSE", "ISC", "CBSE"];
export const CLASSES = ["9", "10", "11", "12"];

/** Normalize a question type that may arrive in legacy label form. */
export function normalizeQuestionType(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  const direct = QUESTION_TYPES.includes(raw) ? raw : null;
  if (direct) return direct;
  const aliases = {
    mcq: "mcq",
    "multiple choice": "mcq",
    theory: "theory",
    programming: "programming",
    output: "output",
    "output prediction": "output",
    "output based questions": "output",
    "assertion reason": "assertion-reason",
    "assertion-reason": "assertion-reason",
    "case study": "case-study",
    "case study questions": "case-study",
    "short answer": "short-answer",
    "long answer": "long-answer",
    "fill in the blanks": "fill-in-the-blanks",
    "true false": "true-false",
    "true/false": "true-false",
    "match the following": "match-the-following",
    debugging: "programming",
    "debugging questions": "programming",
    "dry run": "output",
    "dry run questions": "output",
  };
  return aliases[raw] || null;
}

export function normalizeDifficulty(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  return DIFFICULTIES.includes(raw) ? raw : null;
}

export function normalizeStatus(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  return STATUSES.includes(raw) ? raw : null;
}

/**
 * Validate + sanitize a question payload.
 * @returns {{ ok: true, data: object } | { ok: false, errors: string[] }}
 */
export function validateQuestion(input, { partial = false } = {}) {
  const errors = [];
  const src = input && typeof input === "object" ? input : {};
  const data = {};

  const has = (key) => Object.prototype.hasOwnProperty.call(src, key);

  if (!partial || has("title")) {
    const title = cleanString(src.title, { maxLength: 200, allowNewlines: false });
    if (!title) errors.push("Title is required.");
    else data.title = title;
  }

  // Accept both `question` (client form) and `statement` (CMS editor).
  if (!partial || has("question") || has("statement")) {
    const question = cleanString(src.question ?? src.statement, { maxLength: 4000 });
    if (!question) errors.push("Question content is required.");
    else data.question = question;
  }

  if (!partial || has("answer") || has("correctAnswer") || has("solution")) {
    const answer = cleanString(src.answer ?? src.correctAnswer ?? src.solution, { maxLength: 4000 });
    if (!answer) errors.push("Answer / solution is required.");
    else data.answer = answer;
  }

  if (!partial || has("subject") || has("subjectId")) {
    const subject = cleanString(src.subject ?? src.subjectId, { maxLength: 80, allowNewlines: false });
    if (!subject) errors.push("Subject is required.");
    else data.subject = subject;
  }

  if (!partial || has("chapter") || has("chapterId")) {
    const chapter = cleanString(src.chapter ?? src.chapterId, { maxLength: 120, allowNewlines: false });
    if (!chapter) errors.push("Chapter is required.");
    else data.chapter = chapter;
  }

  if (has("topic") || !partial) {
    data.topic = cleanString(src.topic, { maxLength: 120, allowNewlines: false });
  }

  if (has("board") || !partial) {
    const board = String(src.board ?? "ICSE").trim().toUpperCase();
    data.board = BOARDS.includes(board) ? board : "ICSE";
  }

  if (has("class") || has("classLevel") || !partial) {
    const cls = String(src.class ?? src.classLevel ?? "10").trim();
    data.class = CLASSES.includes(cls) ? cls : "10";
  }

  if (has("type") || has("questionType") || !partial) {
    const type = normalizeQuestionType(src.type ?? src.questionType);
    if (!type) errors.push("Invalid question type.");
    else data.type = type;
  }

  if (has("difficulty") || !partial) {
    const difficulty = normalizeDifficulty(src.difficulty);
    if (!difficulty) errors.push("Difficulty must be easy, medium or hard.");
    else data.difficulty = difficulty;
  }

  if (has("status") || !partial) {
    data.status = normalizeStatus(src.status) || "draft";
  }

  if (has("explanation") || !partial) {
    data.explanation = cleanString(src.explanation, { maxLength: 4000 });
  }

  if (has("tags") || !partial) {
    let tags = src.tags;
    if (typeof tags === "string") {
      tags = tags.split(",").map((t) => t.trim());
    }
    data.tags = cleanStringArray(tags);
  }

  if (has("marks") || !partial) {
    data.marks = toInt(src.marks, { min: 1, max: 100, fallback: 1 });
  }

  if (has("estimatedTime") || !partial) {
    data.estimatedTime = toInt(src.estimatedTime, { min: 1, max: 300, fallback: 5 });
  }

  if (data.type === "mcq") {
    if (!partial || has("options")) {
      let options = src.options;
      if (!Array.isArray(options)) options = [];
      data.options = cleanStringArray(options, { maxItems: 6, maxLength: 300 });
      if (data.options.length < 2) errors.push("MCQ questions need at least 2 options.");
    }
    if (!partial || has("answer") || has("correctAnswer")) {
      if (data.answer && Array.isArray(data.options) && data.options.length > 0 && !data.options.includes(data.answer)) {
        errors.push("The correct answer must be one of the provided options.");
      }
    }
  }

  if (data.type === "programming" && (has("code") || has("expectedOutput") || !partial)) {
    if (has("code")) data.code = cleanString(src.code, { maxLength: 8000 });
    if (has("expectedOutput")) data.expectedOutput = cleanString(src.expectedOutput, { maxLength: 2000 });
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data };
}

/** Validate + sanitize a generic content entity (subject / chapter / topic). */
export function validateContentEntity(input, { partial = false } = {}) {
  const errors = [];
  const src = input && typeof input === "object" ? input : {};
  const data = {};
  const has = (key) => Object.prototype.hasOwnProperty.call(src, key);

  if (!partial || has("name") || has("title")) {
    const name = cleanString(src.name ?? src.title, { maxLength: 160, allowNewlines: false });
    if (!name) errors.push("Name is required.");
    else data.name = name;
  }

  if (has("description") || !partial) {
    data.description = cleanString(src.description, { maxLength: 2000 });
  }

  if (has("slug") || !partial) {
    const slug = cleanString(src.slug, { maxLength: 120, allowNewlines: false })
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (slug) data.slug = slug;
    else if (!partial) data.slug = "";
  }

  if (has("board") || !partial) {
    const board = String(src.board ?? "ICSE").trim().toUpperCase();
    data.board = BOARDS.includes(board) ? board : "ICSE";
  }

  if (has("class") || !partial) {
    const cls = String(src.class ?? "10").trim();
    data.class = CLASSES.includes(cls) ? cls : "10";
  }

  if (has("status") || !partial) {
    data.status = normalizeStatus(src.status) || "draft";
  }

  if (has("order") || !partial) {
    data.order = toInt(src.order, { min: 0, max: 1000, fallback: 0 });
  }

  if (has("subject") || has("subjectId")) {
    data.subject = cleanString(src.subject ?? src.subjectId, { maxLength: 80, allowNewlines: false });
  }

  if (has("chapter") || has("chapterId")) {
    data.chapter = cleanString(src.chapter ?? src.chapterId, { maxLength: 120, allowNewlines: false });
  }

  if (has("icon") || !partial) {
    data.icon = cleanString(src.icon, { maxLength: 8, allowNewlines: false });
  }

  if (has("color") || !partial) {
    data.color = cleanString(src.color, { maxLength: 20, allowNewlines: false, });
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data };
}

/**
 * Validate + sanitize an AI-generated question (different shape: no title,
 * status uses Draft/Approved/Published).
 */
export function validateGeneratedQuestion(input) {
  const errors = [];
  const src = input && typeof input === "object" ? input : {};

  const question = cleanString(src.question, { maxLength: 4000 });
  if (!question) errors.push("Question content is required.");

  const answer = cleanString(src.answer, { maxLength: 4000 });
  if (!answer) errors.push("Answer is required.");

  const subject = cleanString(src.subject, { maxLength: 80, allowNewlines: false });
  if (!subject) errors.push("Subject is required.");

  const chapter = cleanString(src.chapter, { maxLength: 120, allowNewlines: false });
  if (!chapter) errors.push("Chapter is required.");

  const statusRaw = String(src.status || "Draft").trim().toLowerCase();
  const status = ["draft", "approved", "published", "rejected"].includes(statusRaw)
    ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1)
    : "Draft";

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      question,
      answer,
      explanation: cleanString(src.explanation, { maxLength: 4000 }),
      subject,
      chapter,
      board: BOARDS.includes(String(src.board || "").trim().toUpperCase())
        ? String(src.board).trim().toUpperCase()
        : "ICSE",
      class: CLASSES.includes(String(src.class ?? "").trim()) ? String(src.class).trim() : "10",
      questionType: cleanString(src.questionType || src.type, { maxLength: 60, allowNewlines: false }) || "MCQ",
      difficulty: normalizeDifficulty(src.difficulty) || "medium",
      marks: toInt(src.marks, { min: 1, max: 100, fallback: 2 }),
      estimatedTime: toInt(src.estimatedTime, { min: 1, max: 300, fallback: 5 }),
      bloomsLevel: cleanString(src.bloomsLevel, { maxLength: 40, allowNewlines: false }),
      tags: cleanStringArray(src.tags),
      status,
    },
  };
}

/** Validate + sanitize a mock test payload. */
export function validateMockTest(input, { partial = false } = {}) {
  const errors = [];
  const src = input && typeof input === "object" ? input : {};
  const data = {};
  const has = (key) => Object.prototype.hasOwnProperty.call(src, key);

  if (!partial || has("title") || has("name")) {
    const title = cleanString(src.title ?? src.name, { maxLength: 200, allowNewlines: false });
    if (!title) errors.push("Test title is required.");
    else data.title = title;
  }

  if (has("description") || !partial) {
    data.description = cleanString(src.description, { maxLength: 1000 });
  }

  if (has("subject") || has("subjectId") || !partial) {
    const subject = cleanString(src.subject ?? src.subjectId, { maxLength: 80, allowNewlines: false });
    if (!subject) errors.push("Subject is required.");
    else data.subject = subject;
  }

  if (has("class") || !partial) {
    const cls = String(src.class ?? "10").trim();
    data.class = CLASSES.includes(cls) ? cls : "10";
  }

  if (has("board") || !partial) {
    const board = String(src.board ?? "ICSE").trim().toUpperCase();
    data.board = BOARDS.includes(board) ? board : "ICSE";
  }

  if (has("chapter") || !partial) {
    data.chapter = cleanString(src.chapter, { maxLength: 120, allowNewlines: false }) || "all";
  }

  if (has("difficulty") || !partial) {
    const raw = String(src.difficulty ?? "all").trim().toLowerCase();
    data.difficulty = ["all", ...DIFFICULTIES].includes(raw) ? raw : "all";
  }

  if (has("type") || !partial) {
    const raw = String(src.type ?? "mixed").trim().toLowerCase();
    data.type = ["mixed", ...QUESTION_TYPES].includes(raw) ? raw : "mixed";
  }

  if (has("questions") || has("questionCount") || !partial) {
    data.questionCount = toInt(src.questions ?? src.questionCount, { min: 1, max: 100, fallback: 10 });
  }

  if (has("duration") || !partial) {
    const unit = String(src.durationUnit ?? "min").trim().toLowerCase();
    const safeUnit = ["min", "hour"].includes(unit) ? unit : "min";
    const duration = toInt(src.duration, { min: 1, max: 720, fallback: 30 });
    data.duration = safeUnit === "hour" ? duration * 60 : duration;
    data.durationUnit = "min";
  }

  if (has("passingScore") || !partial) {
    data.passingScore = toInt(src.passingScore, { min: 0, max: 1000, fallback: 0 });
  }

  if (has("maxMarks") || !partial) {
    data.maxMarks = toInt(src.maxMarks, { min: 1, max: 1000, fallback: 100 });
  }

  if (has("scheduledDate") || !partial) {
    const raw = cleanString(src.scheduledDate, { maxLength: 32, allowNewlines: false });
    data.scheduledDate = raw && !Number.isNaN(new Date(raw).getTime()) ? raw : null;
  }

  if (has("instructions") || !partial) {
    data.instructions = cleanString(src.instructions, { maxLength: 2000 });
  }

  if (has("status") || !partial) {
    const raw = String(src.status ?? "draft").trim().toLowerCase();
    data.status = ["draft", "published", "archived", "pending"].includes(raw) ? raw : "draft";
  }

  if (has("isActive") || !partial) {
    data.isActive = src.isActive !== false;
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data };
}
