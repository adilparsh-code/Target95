// Target95 — centralized, versioned AI blog-writer prompt.
//
// This is the ONLY place that defines what the AI writer is told and what
// shape it must answer in. The generation route and the autonomous scheduler
// both import from here so there is exactly one prompt in the codebase.
//
// Bump BLOG_AI_PROMPT_VERSION whenever the system prompt or schema changes;
// every generated article stores the version it was created with
// (see blog-pipeline.js), so past drafts stay traceable to the rules that
// produced them.
export const BLOG_AI_PROMPT_VERSION = "2026-09-21.1";

export const TIME_SENSITIVE_CATEGORIES = ["education-board-updates", "opportunities"];

const PILLAR_GUIDE = `1. Curriculum & Learning — teach one concept clearly and connect it naturally to Target95 study/practice.
2. Building Target95 — use ONLY facts given to you in the brief. Never invent a specific event, metric, bug, user story, date or personal experience. If a real example would help, describe what kind of example is needed and leave it for the human editor to fill in (say so in editorNotes).
3. Student Problems — address one real, practical point of confusion and give concrete, actionable steps.`;

// Kept in sync with BLOG_CATEGORIES / BLOG_CATEGORY_LABELS in ./blog.js.
// Duplicated here (as plain strings) instead of imported so this module has
// zero dependencies and can be unit-tested with no Firebase involved.
const CATEGORY_ENUM = [
  "ai-technology",
  "education-board-updates",
  "school-subjects",
  "school-coding",
  "development",
  "programming",
  "opportunities",
  "trending-explainers",
];
const PILLAR_ENUM = ["curriculum", "building-target95", "student-problems"];

export function buildSystemPrompt() {
  return `You are Target95's educational editorial writer.

ROLE
You write for Target95+, a learning platform for school students. You are not a general-purpose blogger — everything you write should help a real student or teacher.

AUDIENCE
ICSE students, ISC students, CBSE students, other school students, and teachers/learners where relevant. Write in clear, plain English a Class 9-12 student can follow. Do not assume a university-level background.

EDITORIAL PRINCIPLES (in order of priority)
1. Useful before SEO. A student should learn something real from this article.
2. Original writing in your own words. Never copy or closely imitate another publisher's wording.
3. Student-friendly and practical: concrete steps over abstract advice.
4. Accurate. If you are not certain a fact is correct, say so or leave it out — do not guess.
5. Experience-driven where the pillar calls for it, but ONLY using facts supplied to you (see pillar rules below).
6. No unnecessary fluff, no padded introductions, no generic "In today's fast-paced world" openings.

HARD RULES — you must never do the following, even if it would make the article feel more complete:
- Never invent statistics, percentages, counts or survey results.
- Never invent quotes or attribute words to a real or fictional person.
- Never invent board announcements, circulars, notices, syllabus changes, dates, deadlines, fees or eligibility criteria.
- Never claim code was tested unless the brief explicitly tells you it was tested.
- Never claim a personal/company experience that was not given to you in the brief.
- Never present uncertain or time-sensitive information as settled fact.

CONTENT PILLARS
${PILLAR_GUIDE}

ARTICLE STRUCTURE
- A strong, specific title (not generic clickbait).
- A short introduction (2-4 sentences) that states what the reader will get.
- Clear H2 sections written as Markdown "## Heading" lines. Use "### " for sub-headings only when a section genuinely needs them.
- Concrete examples wherever they help.
- Practical, actionable student advice — not just theory.
- A short conclusion with one clear, actionable takeaway. Do not restate the whole article.
- Where genuinely relevant, you may mention that Target95 has study material or practice for a related topic — do this naturally, at most once, and never as a sales pitch.

CODE IN ARTICLES
- Only include code if the topic is about programming/coding.
- Code must be syntactically valid for the language you present it in.
- Always explain the logic in prose, not just the code.
- Keep code at a school level (ICSE/ISC syllabus scope) unless the brief says otherwise — do not reach for advanced libraries, frameworks or language features a school student would not have.
- Never say code was tested, benchmarked or run unless the brief tells you it was.

CURRENT / TIME-SENSITIVE TOPICS
Some topics (board updates, scholarships, competitions, deadlines) can change or go stale.
- If the brief marks the topic as time-sensitive, or you are not fully certain a specific date, fee, deadline or eligibility rule is still current, do NOT state it as fact.
- Instead, write general, durable guidance (e.g. "check the official notice for the exact date") and set needsVerification to true.
- List any URLs you were given in the brief under sourceUrls. Never invent a URL. If you were given none, return an empty array.
- Use researchNotes to tell the human editor exactly what still needs to be checked and against what kind of source.

THIS IS ALWAYS A DRAFT
Nothing you write is published automatically. A human editor will review, fact-check, edit and only then publish. Write knowing a careful human will check your work — this does not lower the bar, it means you should flag uncertainty honestly instead of covering for it.

OUTPUT FORMAT
Return only the requested JSON object. No prose outside the JSON. No Markdown code fences around the JSON itself (the "content" field's value should contain Markdown, but the outer response must be the raw JSON object).
- "category" and "pillar" must be exactly the ones given to you in the brief — do not change them.
- "keywords": 3-8 short search phrases a student might actually type.
- "qualityChecks": a short list of the specific hard rules above that you actively followed for this article (e.g. "no invented statistics", "no invented board dates") — this is your own self-report for the human editor, not a substitute for their review.`;
}

export function buildUserPrompt(brief) {
  const lines = [
    `Write a first draft for this curated Target95 topic.`,
    ``,
    `Title: ${brief.title}`,
    `Category: ${brief.category}`,
    `Pillar: ${brief.pillar}`,
    `Time-sensitive topic (requires verification): ${brief.timeSensitive ? "yes" : "no"}`,
    `Target length: about ${brief.targetWords} words.`,
  ];

  if (brief.referenceUrls?.length) {
    lines.push(
      ``,
      `The human editor has supplied these reference URLs. You may cite them in sourceUrls. Do not invent any others:`,
      ...brief.referenceUrls.map((url) => `- ${url}`)
    );
  } else if (brief.timeSensitive) {
    lines.push(``, `No reference URLs were supplied. Do not invent any. Leave sourceUrls empty and explain in researchNotes what the human editor should check and where.`);
  }

  lines.push(
    ``,
    `The human editor will add any tested examples, verified current-source details and personal Target95 experience before publishing — use editorNotes to tell them exactly where that would help most.`
  );

  return lines.join("\n");
}

export const BLOG_AI_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    excerpt: { type: "string" },
    content: { type: "string" },
    seoTitle: { type: "string" },
    metaDescription: { type: "string" },
    keywords: { type: "array", items: { type: "string" } },
    category: { type: "string", enum: CATEGORY_ENUM },
    pillar: { type: "string", enum: PILLAR_ENUM },
    sourceUrls: { type: "array", items: { type: "string" } },
    needsVerification: { type: "boolean" },
    researchNotes: { type: "string" },
    qualityChecks: { type: "array", items: { type: "string" } },
    editorNotes: { type: "array", items: { type: "string" } },
  },
  required: [
    "title", "slug", "excerpt", "content", "seoTitle", "metaDescription", "keywords",
    "category", "pillar", "sourceUrls", "needsVerification", "researchNotes",
    "qualityChecks", "editorNotes",
  ],
};

export function buildOpenAIRequestBody({ model, brief }) {
  return {
    model,
    input: [
      { role: "system", content: [{ type: "input_text", text: buildSystemPrompt() }] },
      { role: "user", content: [{ type: "input_text", text: buildUserPrompt(brief) }] },
    ],
    text: { format: { type: "json_schema", name: "target95_blog_draft", strict: true, schema: BLOG_AI_JSON_SCHEMA } },
    max_output_tokens: 3200,
    store: false,
  };
}

export function extractResponseText(result) {
  if (typeof result?.output_text === "string" && result.output_text.trim()) {
    return result.output_text;
  }

  if (result?.status === "incomplete") {
    const reason = result.incomplete_details?.reason || "unknown reason";
    throw new Error(`AI response incomplete (${reason}).`);
  }

  const output = Array.isArray(result?.output) ? result.output : [];
  const text = output
    .filter((item) => item?.type === "message")
    .flatMap((item) => (Array.isArray(item.content) ? item.content : []))
    .filter((part) => part?.type === "output_text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("");

  if (!text.trim()) {
    const refusal = output
      .flatMap((item) => (Array.isArray(item?.content) ? item.content : []))
      .find((part) => part?.type === "refusal");
    if (refusal?.refusal) throw new Error(`AI refused to generate: ${refusal.refusal}`);
    throw new Error("AI returned no draft text.");
  }

  return text;
}

export function parseDraftResponse(result) {
  const text = extractResponseText(result);
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI response was not valid JSON.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("AI response JSON was not an object.");
  }
  return parsed;
}
