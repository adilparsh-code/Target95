import { NextResponse } from "next/server";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";

export const runtime = "nodejs";

const ATTEMPT_ID = /^[A-Za-z0-9]{10,40}$/;

/**
 * GET /api/mock-tests/attempts/[id]
 * Re-delivers the questions of the signed-in student's own in-progress attempt so a draft can
 * resume without the client holding any question bank. Same key-free payload as the start call.
 * 404 for unknown/foreign attempts, 409 once submitted, 410 if the questions no longer resolve.
 */
export async function GET(request, { params }) {
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
    return NextResponse.json({ ok: false, error: "Sign in to continue this test." }, { status: 401 });
  }

  const { id } = await params;
  if (!ATTEMPT_ID.test(String(id || ""))) {
    return NextResponse.json({ ok: false, error: "Invalid attempt id." }, { status: 400 });
  }

  try {
    const { getAttemptForResume } = await import("@/lib/mocktestService");
    const { status, body } = await getAttemptForResume({ db: getAdminDb(), uid: session.uid, attemptId: id });
    return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Mock test attempt resume failed:", error);
    return NextResponse.json({ ok: false, error: "Unable to load this test right now." }, { status: 500 });
  }
}
