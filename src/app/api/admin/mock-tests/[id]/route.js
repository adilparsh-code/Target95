import { adminGuard, serverError, toMillis } from "@/app/api/admin/_helpers";
import { validateMockTest } from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

/**
 * GET    /api/admin/mock-tests/[id] — test detail incl. real attempt records
 * PATCH  /api/admin/mock-tests/[id] — update / publish / archive
 * DELETE /api/admin/mock-tests/[id] — permanently remove the test
 * All operations require a verified admin session (requireAdmin).
 */
export async function GET(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    const doc = await guard.adminDb.collection("mockTests").doc(id).get();
    if (!doc.exists) {
      return Response.json({ success: false, error: "Mock test not found." }, { status: 404 });
    }

    const attemptsSnap = await guard.adminDb
      .collection("mockTestResults")
      .where("mockTestId", "==", id)
      .limit(200)
      .get()
      .catch(() => null);

    const attempts = attemptsSnap
      ? attemptsSnap.docs.map((d) => {
          const a = d.data();
          return {
            id: d.id,
            userId: a.userId || "",
            percentage: Number(a.percentage) || 0,
            correctCount: Number(a.correctCount) || 0,
            totalQuestions: Number(a.totalQuestions) || 0,
            timeTaken: Number(a.timeTaken) || 0,
            completedAt: toMillis(a.completedAt) || toMillis(a.createdAt),
          };
        })
      : [];

    const scored = attempts.filter((a) => a.totalQuestions > 0);
    const stats = {
      attempts: attempts.length,
      averageScore:
        scored.length > 0
          ? Math.round(scored.reduce((sum, a) => sum + a.percentage, 0) / scored.length)
          : 0,
      bestScore: scored.reduce((max, a) => Math.max(max, a.percentage), 0),
      lowestScore: scored.length > 0 ? scored.reduce((min, a) => Math.min(min, a.percentage), 100) : 0,
    };

    return Response.json({
      success: true,
      test: { id: doc.id, ...doc.data() },
      attempts: attempts.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0)),
      stats,
    });
  } catch (error) {
    console.error("Admin mock test detail error:", error);
    return serverError();
  }
}

export async function PATCH(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    const ref = guard.adminDb.collection("mockTests").doc(id);
    const existing = await ref.get();
    if (!existing.exists) {
      return Response.json({ success: false, error: "Mock test not found." }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    const merged = { ...existing.data(), ...(body && typeof body === "object" ? body : {}) };
    const result = validateMockTest(merged, { partial: true });
    if (!result.ok) {
      return Response.json({ success: false, errors: result.errors }, { status: 400 });
    }

    const payload = { ...result.data, updatedAt: new Date().toISOString() };
    await ref.update(payload);
    return Response.json({ success: true, test: { id, ...existing.data(), ...payload } });
  } catch (error) {
    console.error("Admin mock test update error:", error);
    return serverError();
  }
}

export async function DELETE(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    await guard.adminDb.collection("mockTests").doc(id).delete();
    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin mock test delete error:", error);
    return serverError();
  }
}
