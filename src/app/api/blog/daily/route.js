import { NextResponse } from "next/server";
import { BLOG_CATEGORIES, EDITORIAL_QUEUE, seedTopicIfMissing } from "../../../lib/blog";
import { isAuthorizedCronRequest } from "../../../lib/blog-admin-auth";

export const runtime = "nodejs";

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
