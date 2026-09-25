import { NextResponse } from "next/server";
import { isAuthorizedCronRequest } from "../../../lib/blog-admin-auth";
import { runEditorialPipeline } from "../../../lib/blog-pipeline";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function GET(request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const maxTopics = Math.max(1, Math.min(5, Number(process.env.BLOG_MAX_ARTICLES_PER_RUN) || 1));
  try {
    const { seededTopics, results } = await runEditorialPipeline({ maxTopics });
    return NextResponse.json({
      ok: true,
      seededTopics: seededTopics.length,
      attempted: results.length,
      succeeded: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
      results,
      message: 'Every succeeded item was saved with status "review" only. Nothing is published automatically.',
    });
  } catch (error) {
    console.error("Blog scheduler run failed:", error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Scheduler run failed" }, { status: 500 });
  }
}
