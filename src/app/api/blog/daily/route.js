import { NextResponse } from "next/server";
import { BLOG_CATEGORIES, upsertTopic } from "../../../lib/blog";

export const runtime = "nodejs";

const EDITORIAL_QUEUE = [
  ["ai-technology", "AI should be your study partner, not your answer machine"],
  ["school-coding", "The Java mistakes students make when they understand the syntax but not the logic"],
  ["programming", "How to debug a program when you do not know where the error is"],
  ["school-subjects", "How to revise a difficult chapter without reading it five times"],
  ["development", "What I learned while building Target95 with AI-assisted development"],
  ["education-board-updates", "How students should verify an important board announcement before acting on it"],
  ["opportunities", "How to evaluate a scholarship or competition before trusting the information"],
  ["trending-explainers", "What an AI agent actually does, explained for school students"],
];

function authorized(request) {
  const secret = process.env.BLOG_CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const today = new Date().toISOString().slice(0, 10);
  const category = request.nextUrl.searchParams.get("category");
  const candidates = category ? EDITORIAL_QUEUE.filter(([itemCategory]) => itemCategory === category) : EDITORIAL_QUEUE;
  const results = [];
  for (const [itemCategory, title] of candidates) {
    if (!BLOG_CATEGORIES.includes(itemCategory)) continue;
    const id = await upsertTopic({ title, category: itemCategory, source: "target95-editorial-queue", runDate: today, status: "idea", editorialPriority: itemCategory === "development" || itemCategory === "school-coding" ? "high" : "normal" });
    results.push({ id, category: itemCategory, title });
  }
  return NextResponse.json({ ok: true, runDate: today, queued: results.length, strategy: "quality-first", topics: results });
}
