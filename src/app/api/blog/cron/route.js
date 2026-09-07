import { NextResponse } from "next/server";
import { BLOG_CATEGORIES, upsertTopic } from "../../../lib/blog";

export const runtime = "nodejs";

const DAILY_TOPIC_POOL = [
  ["ai-technology", "How students can use AI responsibly for learning"],
  ["education-board-updates", "What students should check before an important board update"],
  ["school-subjects", "A practical revision method for difficult school chapters"],
  ["school-coding", "Common Java mistakes school students should avoid"],
  ["development", "A beginner-friendly guide to GitHub for students"],
  ["programming", "How to improve programming problem-solving step by step"],
  ["opportunities", "How students can find genuine scholarships and competitions"],
  ["trending-explainers", "A simple framework for understanding a trending technology topic"],
];

function authorized(request) {
  const secret = process.env.BLOG_CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().slice(0, 10);
  const results = [];

  for (const [category, title] of DAILY_TOPIC_POOL) {
    if (!BLOG_CATEGORIES.includes(category)) continue;
    const id = await upsertTopic({
      title,
      category,
      source: "target95-editorial-seed",
      runDate: today,
      status: "idea",
    });
    results.push({ id, category, title });
  }

  return NextResponse.json({
    ok: true,
    runDate: today,
    queued: results.length,
    message: "Daily editorial topics queued. AI drafting can consume blog_topics with status=idea.",
    topics: results,
  });
}
