import { NextResponse } from "next/server";
import { claimTopicForGeneration } from "../../../lib/blog";
import { runPipelineForTopic } from "../../../lib/blog-pipeline";
import { isAuthorizedCronRequest } from "../../../lib/blog-admin-auth";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const topicId = String(body?.topicId || "").trim();
    if (!topicId) return NextResponse.json({ ok: false, error: "topicId is required" }, { status: 400 });

    const topic = await claimTopicForGeneration({ topicId });
    const result = await runPipelineForTopic(topic);
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Generation failed" }, { status: 500 });
  }
}
