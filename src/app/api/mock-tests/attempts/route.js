import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";
import { normalizeAttemptConfig, selectAttemptQuestionIds } from "@/lib/mocktestAttempts";

export const runtime = "nodejs";

/**
 * POST /api/mock-tests/attempts
 * Starts a server-tracked mock test attempt. The server chooses the question
 * ids and records the start time; the client only receives the ids to render.
 * Stored at users/{uid}/mockAttempts/{attemptId}, writable only by the Admin SDK.
 */
export async function POST(request) {
  let session;
  try {
    session = await getVerifiedSession(request);
  } catch (error) {
    console.error("Session validation failed:", error);
    return NextResponse.json(
      { ok: false, status: "unavailable", error: "Session validation is temporarily unavailable." },
      { status: 503 }
    );
  }
  if (!session) {
    return NextResponse.json({ ok: false, error: "Sign in to save mock test results." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const config = normalizeAttemptConfig(body?.config);
  const questionIds = selectAttemptQuestionIds(config);
  if (!questionIds.length) {
    return NextResponse.json({ ok: false, error: "No questions are available for this test." }, { status: 404 });
  }

  try {
    const ref = getAdminDb().collection("users").doc(session.uid).collection("mockAttempts").doc();
    const startedAtMs = Date.now();
    await ref.set({
      userId: session.uid,
      config,
      questionIds,
      startedAtMs,
      status: "in_progress",
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true, attemptId: ref.id, questionIds, duration: config.duration, startedAtMs });
  } catch (error) {
    console.error("Mock test attempt start failed:", error);
    return NextResponse.json({ ok: false, error: "Unable to start the test right now." }, { status: 500 });
  }
}
