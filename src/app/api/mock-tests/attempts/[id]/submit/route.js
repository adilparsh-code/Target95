import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";
import { buildResultDocument, gradeAttempt } from "@/lib/mocktestAttempts";

export const runtime = "nodejs";

const ATTEMPT_ID = /^[A-Za-z0-9]{10,40}$/;

/**
 * POST /api/mock-tests/attempts/[id]/submit
 * Body: { answers: { [questionId]: string } }
 *
 * Grades the attempt on the server and writes results/{attemptId} with the
 * Admin SDK. Any score, mark, userId or role field in the body is ignored.
 * The attempt is read from the signed-in user's own path, so one student can
 * never submit (or overwrite) another student's attempt, and each attempt can
 * be submitted once.
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

  const db = getAdminDb();
  const attemptRef = db.collection("users").doc(session.uid).collection("mockAttempts").doc(id);
  const resultRef = db.collection("results").doc(id);

  try {
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(attemptRef);
      if (!snap.exists) return { status: 404, error: "Attempt not found." };
      const attempt = snap.data();
      if (attempt.userId !== session.uid) return { status: 404, error: "Attempt not found." };
      if (attempt.status !== "in_progress") return { status: 409, error: "This attempt was already submitted." };

      const graded = gradeAttempt(attempt, body?.answers);
      const doc = buildResultDocument({ uid: session.uid, attemptId: id, graded });
      tx.create(resultRef, { ...doc, createdAt: FieldValue.serverTimestamp() });
      tx.update(attemptRef, { status: "submitted", submittedAt: FieldValue.serverTimestamp() });
      return { status: 200, doc };
    });

    if (result.status !== 200) {
      return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
    }
    return NextResponse.json({ ok: true, result: { id, ...result.doc } });
  } catch (error) {
    console.error("Mock test submission failed:", error);
    return NextResponse.json({ ok: false, error: "Unable to save the result right now." }, { status: 500 });
  }
}
