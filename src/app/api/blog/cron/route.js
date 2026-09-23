import { NextResponse } from "next/server";
import { EDITORIAL_QUEUE, EDITORIAL_TOPIC_POOL, BLOG_CATEGORIES, seedTopicIfMissing } from "../../../lib/blog";
import { isAuthorizedCronRequest } from "../../../lib/blog-admin-auth";

export const runtime = "nodejs";

export async function GET(request) {
  if (!isAuthorizedCronRequest(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const pool = [...EDITORIAL_TOPIC_POOL, ...EDITORIAL_QUEUE];
  const results = [];
  for (const topic of pool) {
    if (!BLOG_CATEGORIES.includes(topic.category)) continue;
    const id = await seedTopicIfMissing({ ...topic, source: "target95-editorial-pool" });
    if (id) results.push({ id, ...topic });
  }

  return NextResponse.json({
    ok: true,
    queued: results.length,
    message: "Curated editorial ideas queued without resetting existing topic state. Nothing is published automatically.",
    topics: results,
  });
}
