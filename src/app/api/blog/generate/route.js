import { NextResponse } from "next/server";
import { createArticle } from "../../../lib/blog";

export const runtime = "nodejs";

function authorized(request) {
  const secret = process.env.BLOG_CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function extractJson(text) {
  const cleaned = String(text || "").replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(cleaned);
}

export async function POST(request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const topic = body?.topic;
  if (!topic?.title || !topic?.category) {
    return NextResponse.json({ ok: false, error: "topic.title and topic.category are required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "OPENAI_API_KEY is not configured" }, { status: 500 });
  }

  const model = process.env.BLOG_AI_MODEL || "gpt-5.6-luna";
  const prompt = `You are the Target95 educational blog writer for Indian school students.

Topic: ${topic.title}
Category: ${topic.category}

Create a genuinely useful, original article. Use clear student-friendly language, useful headings, examples where appropriate, and concise explanations. Do not invent dates, board notices, deadlines, eligibility rules, fees, statistics, quotes, or current events. If the topic requires current verification, explicitly keep the article as a draft for human review rather than guessing. Do not copy source text.

Return ONLY valid JSON with exactly these fields:
{
  "title": "...",
  "excerpt": "...",
  "content": "Markdown article content...",
  "seoTitle": "...",
  "metaDescription": "...",
  "keywords": ["...", "..."]
}`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, input: prompt }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ ok: false, error: `AI provider error: ${errorText.slice(0, 500)}` }, { status: 502 });
  }

  const result = await response.json();
  const text = result.output_text || result.output?.flatMap((item) => item.content || []).map((part) => part.text || "").join("") || "";

  let article;
  try {
    article = extractJson(text);
  } catch {
    return NextResponse.json({ ok: false, error: "AI returned invalid article JSON" }, { status: 502 });
  }

  const articleId = await createArticle({
    ...article,
    category: topic.category,
    topicId: topic.id || null,
    source: "target95-ai-writer",
    status: "review",
    aiModel: model,
  });

  return NextResponse.json({ ok: true, articleId, status: "review", article });
}
