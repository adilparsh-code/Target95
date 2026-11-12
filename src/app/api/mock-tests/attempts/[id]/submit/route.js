import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";

export const runtime = "nodejs";

const ATTEMPT_ID = /^[A-Za-z0-9]{10,40}$/;

/**
 * POST /api/mock-tests/attempts/[id]/submit
 * Body: { answers: { [questionId]: string } }
 *
 * Grades the attempt on the server and writes results/{attemptId} with the Admin SDK. Any
 * score, mark, userId or role field in the body is ignored. The attempt is read from the
 * signed-in user's own path, so one student can never submit another student's attempt.
 *
 * Submitting is idempotent: the first call grades and stores the result; any later call (for
 * example a retry after a lost response) returns that stored result with `replay: true` and
 * never grades or writes again. The response includes `reveal` (correct answers and
 * explanations), which is sent only after grading and is never stored.
 */
export async function POST(request, { params }) {
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

  const { id } = await params;
  if (!ATTEMPT_ID.test(String(id || ""))) {
    return NextResponse.json({ ok: false, error: "Invalid attempt id." }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const { submitAttempt } = await import("@/lib/mocktestService");
    const { status, body: payload } = await submitAttempt({
      db: getAdminDb(),
      uid: session.uid,
      attemptId: id,
      answers: body?.answers,
      serverTimestamp: () => FieldValue.serverTimestamp(),
    });
    return NextResponse.json(payload, { status, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Mock test submission failed:", error);
    return NextResponse.json({ ok: false, error: "Unable to save the result right now." }, { status: 500 });
  }
}
