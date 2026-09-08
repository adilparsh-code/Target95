import { NextResponse } from "next/server";
import { createArticle, getTopic, slugify } from "../../../lib/blog";

export const runtime = "nodejs";

function authorized(request) {
  const secret = process.env.BLOG_CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

const schema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    excerpt: { type: "string" },
    seoTitle: { type: "string" },
    metaDescription: { type: "string" },
    keywords: { type: "array", items: { type: "string" } },
    content: { type: "string" },
    editorNotes: { type: "array", items: { type: "string" } },
  },
  required: ["title", "excerpt", "seoTitle", "metaDescription", "keywords", "content", "editorNotes"],
};

async function generateDraft(topic) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const model = process.env.BLOG_AI_MODEL || "gpt-5.6-luna";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{
            type: "input_text",
            text: `You are the AI editorial assistant for Target95, a school-learning platform.

Editorial pillars:
- Curriculum & Learning: teach a concept clearly and connect naturally to Target95 learning/practice.
- Building Target95: use only supplied facts; never invent private events, metrics, user stories, bugs, dates or personal experiences.
- Student Problems: address practical confusion and give actionable steps.

Hard rules:
1. Never invent board notices, dates, deadlines, eligibility, fees, statistics, policies, product claims or current events.
2. For time-sensitive topics, give general verification guidance instead of pretending to know the latest facts.
3. Do not copy or imitate another publisher.
4. For programming, explain logic clearly. Never claim code was tested unless explicitly supplied as tested.
5. Never manufacture personal experience; use editorNotes to tell the human editor where a real Target95 example should be added.
6. This is always a DRAFT. Human review is mandatory before publication.
7. Use Markdown headings and avoid padded SEO filler.
8. Return only the requested JSON structure.`,
          }],
        },
        {
          role: "user",
          content: [{
            type: "input_text",
            text: `Create a first draft from this curated Target95 topic.\n\nTitle: ${topic.title}\nCategory: ${topic.category}\nPillar: ${topic.pillar || "student-problems"}\n\nThe editor will add tested examples, personal experience and verified current-source details before publishing.`,
          }],
        },
      ],
      text: { format: { type: "json_schema", name: "target95_blog_draft", strict: true, schema } },
      store: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI provider error (${response.status}): ${errorText.slice(0, 500)}`);
  }

  const result = await response.json();
  const text = result.output_text || "";
  if (!text) throw new Error("AI returned no draft text.");
  return JSON.parse(text);
}

export async function POST(request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const topicId = String(body?.topicId || "").trim();
    if (!topicId) return NextResponse.json({ ok: false, error: "topicId is required" }, { status: 400 });

    const topic = await getTopic(topicId);
    if (!topic) return NextResponse.json({ ok: false, error: "Topic not found" }, { status: 404 });
    if (topic.status === "published") return NextResponse.json({ ok: false, error: "Published topics cannot be regenerated" }, { status: 409 });

    const article = await generateDraft(topic);
    const articleId = await createArticle({
      ...article,
      slug: slugify(article.title),
      category: topic.category,
      pillar: topic.pillar || "student-problems",
      topicId,
      source: "target95-ai-editorial-assistant",
      status: "review",
      needsHumanReview: true,
      aiModel: process.env.BLOG_AI_MODEL || "gpt-5.6-luna",
    });

    return NextResponse.json({ ok: true, articleId, status: "review", needsHumanReview: true, message: "Draft generated. Human editorial review is required before publication." });
  } catch (error) {
    console.error("Blog draft generation failed:", error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Draft generation failed" }, { status: 500 });
  }
}
