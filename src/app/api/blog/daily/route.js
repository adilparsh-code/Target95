import { NextResponse } from "next/server";
import { BLOG_CATEGORIES, EDITORIAL_QUEUE, seedTopicIfMissing } from "../../../lib/blog";
import { isAuthorizedCronRequest } from "../../../lib/blog-admin-auth";

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
  const secret = process.env.BLOG_CRON_SECRET || process.env.CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request) {
  if (!isAuthorizedCronRequest(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().slice(0, 10);
  const category = request.nextUrl.searchParams.get("category");
  const candidates = category ? EDITORIAL_QUEUE.filter((item) => item.category === category) : EDITORIAL_QUEUE;
  const results = [];

  for (const item of candidates) {
    if (!BLOG_CATEGORIES.includes(item.category)) continue;
    const id = await seedTopicIfMissing({
      ...item,
      source: "target95-editorial-queue",
      runDate: today,
      editorialPriority: item.category === "development" || item.category === "school-coding" ? "high" : "normal",
    });
    if (id) results.push({ id, ...item });
  }

  return NextResponse.json({ ok: true, runDate: today, queued: results.length, strategy: "quality-first", topics: results });
}
