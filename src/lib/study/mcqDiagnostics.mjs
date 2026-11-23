/**
 * MCQ answer-key diagnostics. DEVELOPER-FACING (CLI / tests) only.
 * Teacher/admin dashboard diagnostics are a separate, not-yet-built Phase 2 item.
 *
 * Students never see an MCQ whose key cannot be resolved (normalizeMcqs in
 * lib/chapterContent.js withholds it). That protects students but hides the
 * problem, so these helpers list every such question with source and reason.
 *
 * An MCQ is recognised by its STRUCTURE (an `options` array plus question
 * text), never by the presence of an answer property. A question that has
 * options but no answer property at all is exactly the case that must be
 * reported, so it must not be skipped.
 */
import { resolveBankMcqAnswer, resolveMcqAnswer } from "./mcqAnswers.mjs";

const QUESTION_TEXT_FIELDS = ["question", "assertion", "prompt"];

/** Contracts: how an authored source stores the correct option. */
export const ANSWER_CONTRACTS = {
  /** chapter-content + Markdown: option index, or text equal to exactly one option. */
  INDEX_OR_TEXT: "index-or-text",
  /** question-bank: `correctAnswer` is an option letter (A, B, ...); `answer` may be an index. */
  LETTER_OR_INDEX: "letter-or-index",
};

const hasOwn = (node, key) => Object.prototype.hasOwnProperty.call(node, key);

/** Options array with at least one entry plus non-blank question text. */
export function isMcqShaped(node) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return false;
  if (!Array.isArray(node.options) || node.options.length === 0) return false;
  return QUESTION_TEXT_FIELDS.some((field) => typeof node[field] === "string" && node[field].trim() !== "");
}

/**
 * Validate one MCQ-shaped node. Returns { valid, reason }.
 * Reasons: missing answer property, empty/null key, invalid key, out-of-range,
 * ambiguous, fewer than 2 options.
 */
export function checkAnswerKey(node, contract = ANSWER_CONTRACTS.INDEX_OR_TEXT) {
  const options = node.options;
  if (options.length < 2) return { valid: false, reason: "fewer than 2 options" };

  if (contract === ANSWER_CONTRACTS.LETTER_OR_INDEX) {
    // Same resolver the question-bank normalizer uses: one definition of a valid bank key.
    const bank = resolveBankMcqAnswer(node, options.length);
    return { valid: bank.valid, reason: bank.reason };
  }

  if (!hasOwn(node, "answer") && !hasOwn(node, "correctAnswer")) {
    return { valid: false, reason: "missing answer key (no answer or correctAnswer property)" };
  }
  const raw = node.correctAnswer ?? node.answer;
  if (raw === null || raw === undefined || (typeof raw === "string" && raw.trim() === "")) {
    return { valid: false, reason: "empty answer key (null, undefined or blank)" };
  }

  const resolved = resolveMcqAnswer(raw, options);
  return { valid: resolved.valid, reason: resolved.reason };
}

/**
 * Walk any content object and report MCQ-shaped items with unusable keys.
 * `skipped` lists `options` arrays that were NOT treated as MCQs (no question
 * text) so nothing is silently ignored.
 */
export function collectInvalidMcqs(data, source, { contract = ANSWER_CONTRACTS.INDEX_OR_TEXT } = {}) {
  const problems = [];
  const skipped = [];
  let checked = 0;

  const visit = (node, trail) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach((item, index) => visit(item, `${trail}[${index}]`));
      return;
    }
    if (isMcqShaped(node)) {
      checked += 1;
      const result = checkAnswerKey(node, contract);
      if (!result.valid) problems.push({ source, id: node.id ?? null, path: trail, reason: result.reason });
    } else if (Array.isArray(node.options) && node.options.length) {
      skipped.push({ source, id: node.id ?? null, path: trail, reason: "options without question text" });
    }
    for (const key of Object.keys(node)) visit(node[key], trail ? `${trail}.${key}` : key);
  };

  visit(data, "");
  return { source, checked, problems, skipped };
}

/** Same report for Markdown-parsed MCQs (parseMarkdownMcqs output). */
export function collectInvalidMarkdownMcqs(parsed, source) {
  const mcqs = Array.isArray(parsed?.mcqs) ? parsed.mcqs : [];
  return {
    source,
    checked: mcqs.length,
    problems: mcqs
      .filter((q) => !q.valid)
      .map((q) => ({ source, id: q.id, path: "mcqs", reason: q.error || "invalid" })),
    skipped: [],
  };
}

export function formatMcqReport(results, { exclusions = [] } = {}) {
  const lines = [];
  let checked = 0;
  let invalid = 0;
  let skipped = 0;
  for (const result of results) {
    checked += result.checked;
    invalid += result.problems.length;
    skipped += (result.skipped || []).length;
    lines.push(`  scanned  ${result.source}: ${result.checked} MCQs, ${result.problems.length} invalid`);
  }
  const notScanned = results.flatMap((r) => r.notScanned || []);
  const unreferenced = results.flatMap((r) => r.unreferenced || []);
  const caveats = results.flatMap((r) => r.caveats || []);
  const problemLines = results.flatMap((r) =>
    r.problems.map((p) => `  INVALID ${p.source} :: ${p.id ?? "(no id)"} (${p.path}) - ${p.reason}`)
  );
  const skippedLines = results.flatMap((r) =>
    (r.skipped || []).map((p) => `  SKIPPED ${p.source} :: ${p.id ?? "(no id)"} (${p.path}) - ${p.reason}`)
  );
  return [
    "MCQ answer-key check (developer-facing; not a teacher/admin dashboard).",
    `Summary: ${checked} MCQs checked, ${invalid} invalid, ${skipped} options-arrays skipped.`,
    "Sources scanned:",
    ...lines,
    ...(notScanned.length || exclusions.length
      ? [
          "NOT scanned (coverage is limited to the sources above, not repo-wide):",
          ...notScanned.map((e) => `  - ${e}`),
          ...exclusions.map((e) => `  - ${e}`),
        ]
      : []),
    ...(unreferenced.length
      ? [
          "Unreferenced files (informational only; they do not affect the exit code):",
          ...unreferenced.map((u) => `  ${u.file}: ${u.checked} MCQs, ${u.invalid} invalid keys${u.loadError ? ` (load error: ${u.loadError})` : ""}`),
        ]
      : []),
    ...caveats.map((c) => `  CAVEAT ${c}`),
    ...problemLines,
    ...skippedLines,
    invalid ? "Invalid questions are withheld from students until the key is fixed." : "All scanned keys resolve.",
  ].join("\n");
}
