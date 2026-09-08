import { NextResponse } from "next/server";
import { EDITORIAL_TOPIC_POOL, BLOG_CATEGORIES, upsertTopic } from "../../../lib/blog";

export const runtime = "nodejs";

function authorized(request) {
  const secret = process.env.BLOG_CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const start = (week * 2) % EDITORIAL_TOPIC_POOL.length;
  const selected = [
    EDITORIAL_TOPIC_POOL[start],
    EDITORIAL_TOPIC_POOL[(start + 1) % EDITORIAL_TOPIC_POOL.length],
  ];
  const results = [];

  for (const topic of selected) {
    if (!BLOG_CATEGORIES.includes(topic.category)) continue;
    const id = await upsertTopic({
      ...topic,
      source: "target95-editorial-pool",
      runWeek: week,
      status: "idea",
    });
    results.push({ id, ...topic });
  }

  return NextResponse.json({
    ok: true,
    queued: results.length,
    message: "Curated editorial ideas queued. Nothing is published automatically.",
    topics: results,
  });
}
