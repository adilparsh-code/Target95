import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";

export const runtime = "nodejs";

/**
 * POST /api/mock-tests/attempts
 * Starts a server-tracked mock test attempt. The server chooses the question ids (legacy
 * questions plus, when enabled for the category, content-engine questions) and records the
 * start time. The response carries the questions the student may see BEFORE submitting:
 * text and options only, never answers or explanations.
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

  try {
    const { startAttempt } = await import("@/lib/mocktestService");
    const { status, body: payload } = await startAttempt({
      db: getAdminDb(),
      uid: session.uid,
      rawConfig: body?.config,
      serverTimestamp: () => FieldValue.serverTimestamp(),
    });
    return NextResponse.json(payload, { status, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Mock test attempt start failed:", error);
    return NextResponse.json({ ok: false, error: "Unable to start the test right now." }, { status: 500 });
  }
}
