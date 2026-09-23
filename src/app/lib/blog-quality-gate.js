// Target95 quality gate for AI-generated blog drafts.
import { TIME_SENSITIVE_CATEGORIES } from "./blog-ai-prompt";

export const DEFAULT_MIN_CONTENT_WORDS = 350;

function wordCount(text) {
  const fence = String.fromCharCode(96) + String.fromCharCode(96) + String.fromCharCode(96);
  return String(text || "")
    .replace(new RegExp(fence + "[\\s\\S]*?" + fence, "g"), " ")
    .replace(/[#*_>~]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function normalizeTitle(title) {
  return String(title || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function findEmptySections(content) {
  const lines = String(content || "").split("\n");
  const problems = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!/^#{2,3}\s+\S/.test(line)) continue;
    let j = i + 1;
    while (j < lines.length && !lines[j].trim()) j += 1;
    if (j >= lines.length || /^#{2,3}\s+/.test(lines[j].trim())) problems.push(line);
  }
  return problems;
}

function findMalformedCode(content) {
  const fence = String.fromCharCode(96) + String.fromCharCode(96) + String.fromCharCode(96);
  const text = String(content || "");
  const problems = [];
  if ((text.match(new RegExp(fence, "g")) || []).length % 2) problems.push("Unclosed code fence.");
  const blocks = text.matchAll(new RegExp(fence + "([a-zA-Z0-9+-]*)\\n([\\s\\S]*?)" + fence, "g"));
  for (const match of blocks) {
    const lang = match[1].trim();
    if (!/^(java|python|py|c|cpp|c\+\+)?$/i.test(lang)) continue;
    const code = match[2];
    if ((code.match(/[{(]/g) || []).length !== (code.match(/[})]/g) || []).length) {
      problems.push("Unbalanced braces/parens in a " + (lang || "code") + " block.");
    }
  }
  return problems;
}

export function runQualityChecks(draft, { topic, existingSlugs = new Set(), existingTitles = new Set(), minWords = DEFAULT_MIN_CONTENT_WORDS, slugify }) {
  const blocking = [];
  const warnings = [];
  const title = String(draft?.title || "").trim();
  const excerpt = String(draft?.excerpt || "").trim();
  const content = String(draft?.content || "").trim();
  const keywords = Array.isArray(draft?.keywords) ? draft.keywords.filter((k) => typeof k === "string" && k.trim()) : [];

  if (title.length < 8 || title.length > 140) blocking.push({ id: "title", message: "Title length (" + title.length + ") must be between 8 and 140 characters." });
  if (excerpt.length < 10 || excerpt.length > 320) blocking.push({ id: "excerpt", message: "Excerpt is missing or an unreasonable length." });
  if (!content) blocking.push({ id: "content", message: "Content is empty." });

  const words = wordCount(content);
  if (words < minWords) blocking.push({ id: "min-length", message: "Content is only ~" + words + " words; minimum useful length is " + minWords + "." });
  if (!draft?.seoTitle) warnings.push({ id: "seo-title", message: "seoTitle missing; falling back to title." });
  if (!draft?.metaDescription) warnings.push({ id: "meta-description", message: "metaDescription missing; falling back to excerpt." });
  if (draft?.metaDescription?.length > 165) warnings.push({ id: "meta-description-length", message: "metaDescription is longer than about 160 characters." });
  if (keywords.length < 3) blocking.push({ id: "keywords", message: "At least 3 keywords are required." });

  if (topic?.category && draft?.category && draft.category !== topic.category) warnings.push({ id: "category-mismatch", message: "Topic category is authoritative." });
  if (topic?.pillar && draft?.pillar && draft.pillar !== topic.pillar) warnings.push({ id: "pillar-mismatch", message: "Topic pillar is authoritative." });

  const slug = typeof slugify === "function" ? slugify(title) : "";
  if (!slug) blocking.push({ id: "slug", message: "Title did not produce a usable slug." });
  else if (existingSlugs.has(slug)) warnings.push({ id: "slug-collision", message: "Slug already exists; save logic will add a suffix." });

  if (normalizeTitle(title) && existingTitles.has(normalizeTitle(title))) blocking.push({ id: "duplicate-title", message: "An article with this exact title already exists." });

  const emptySections = findEmptySections(content);
  if (emptySections.length) blocking.push({ id: "empty-sections", message: "Heading(s) with no body text: " + emptySections.slice(0, 3).join("; ") });

  const codeProblems = findMalformedCode(content);
  if (codeProblems.length) blocking.push({ id: "malformed-code", message: codeProblems.join(" ") });

  const category = topic?.category || draft?.category;
  const mustVerify = TIME_SENSITIVE_CATEGORIES.includes(category) || topic?.requiresVerification === true;
  let needsVerification = Boolean(draft?.needsVerification);
  if (mustVerify && !needsVerification) {
    needsVerification = true;
    warnings.push({ id: "forced-verification", message: "This category requires human verification." });
  }

  const sourceUrls = Array.isArray(draft?.sourceUrls) ? draft.sourceUrls.filter((u) => typeof u === "string" && u.trim()) : [];
  if (mustVerify && !sourceUrls.length) warnings.push({ id: "no-sources", message: "No source URLs supplied; editor must verify manually." });

  const suspiciousPattern = /\b(20\d{2}[-/]\d{1,2}[-/]\d{1,2}|deadline|last date|registration fee|₹\s?\d|as per the (latest|new|recent)|will be held on|\d{1,3}%\s+of\s+students)\b/i;
  if (suspiciousPattern.test(content) && !mustVerify) warnings.push({ id: "possible-current-claim", message: "Content contains a date/fee/statistic-like claim that should be double-checked." });

  return { ok: blocking.length === 0, blocking, warnings, normalized: { slug, needsVerification, sourceUrls, keywords } };
}
