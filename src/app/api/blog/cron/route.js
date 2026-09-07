
import { NextResponse } from "next/server";
import {
  BLOG_CATEGORIES,
  upsertTopic,
  type BlogCategory,
} from "../../../lib/blog";

export const runtime = "nodejs";

const DAILY_TOPIC_POOL: ReadonlyArray<
  readonly [BlogCategory, string]
> = [
  ["ai-technology", "How students can use AI responsibly for learning"],
  [
    "education-board-updates",
    "What students should check before an important board update",
  ],
  [
    "school-subjects",
    "A practical revision method for difficult school chapters",
  ],
  ["school-coding", "Common Java mistakes school students should avoid"],
  ["development", "A beginner-friendly guide to GitHub for students"],
  [
    "programming",
    "How to improve programming problem-solving step by step",
  ],
  [
    "opportunities",
    "How students can find genuine scholarships and competitions",
  ],
  [
    "trending-explainers",
    "A simple framework for understanding a trending technology topic",
  ],
];

function authorized(request: Request): boolean {
  const secret = process.env.BLOG_CRON_SECRET;

  if (!secret) {
    return false;
  }

  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const results: Array<{
    id: string;
    category: BlogCategory;
    title: string;
  }> = [];

  for (const [category, title] of DAILY_TOPIC_POOL) {
    if (!BLOG_CATEGORIES.includes(category)) {
      continue;
    }

    try {
      const id = await upsertTopic({
        title,
        category,
        source: "target95-editorial-seed",
        runDate: today,
        status: "idea",
      });

      results.push({
        id,
        category,
        title,
      });
    } catch (error) {
      console.error(
        `Failed to queue topic "${title}" for category "${category}"`,
        error,
      );
    }
  }

  return NextResponse.json({
    ok: true,
    runDate: today,
    queued: results.length,
    message:
      "Daily editorial topics queued. AI drafting can consume blog_topics with status=idea.",
    topics: results,
  });
}

