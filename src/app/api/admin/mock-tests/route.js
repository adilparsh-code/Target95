import { adminGuard, serverError, sanitizeQueryParam, toMillis } from "@/app/api/admin/_helpers";
import { validateMockTest, normalizeStatus } from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

/**
 * GET  /api/admin/mock-tests — list persisted mock tests with real attempt stats
 * POST /api/admin/mock-tests — create a validated mock test
 * All operations require a verified admin session (requireAdmin).
 */
export async function GET(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { searchParams } = new URL(request.url);
    const search = sanitizeQueryParam(searchParams.get("q") || "", { maxLength: 120 }).toLowerCase();
    const status = normalizeStatus(searchParams.get("status"));

    const [testsSnap, attemptsSnap] = await Promise.all([
      guard.adminDb.collection("mockTests").orderBy("createdAt", "desc").limit(500).get().catch(() => null),
      guard.adminDb.collection("mockTestResults").limit(2000).get().catch(() => null),
    ]);

    const attempts = attemptsSnap ? attemptsSnap.docs.map((d) => d.data()) : [];
    const attemptsByTest = new Map();
    attempts.forEach((attempt) => {
      const key = attempt.mockTestId || attempt.testId;
      if (!key) return;
      const entry = attemptsByTest.get(key) || { count: 0, total: 0, best: 0, worst: 101 };
      entry.count += 1;
      const pct = Number(attempt.percentage) || 0;
      entry.total += pct;
      entry.best = Math.max(entry.best, pct);
      entry.worst = Math.min(entry.worst, pct);
      attemptsByTest.set(key, entry);
    });

    let tests = testsSnap
      ? testsSnap.docs.map((d) => {
          const data = d.data();
          const stats = attemptsByTest.get(d.id);
          return {
            id: d.id,
            ...data,
            attempts: stats?.count || 0,
            avgScore: stats && stats.count > 0 ? Math.round(stats.total / stats.count) : 0,
            highestScore: stats?.best || 0,
            lowestScore: stats && stats.worst <= 100 ? stats.worst : 0,
            createdAt: toMillis(data.createdAt),
            updatedAt: toMillis(data.updatedAt),
          };
        })
      : [];

    if (search) {
      tests = tests.filter((t) =>
        [t.title, t.description, t.subject, t.class, t.board]
          .map((v) => String(v || "").toLowerCase())
          .some((v) => v.includes(search))
      );
    }
    if (status) tests = tests.filter((t) => String(t.status || "draft").toLowerCase() === status);

    const published = tests.filter((t) => t.status === "published");
    const scored = attempts.filter((a) => Number(a.percentage) >= 0);
    const stats = {
      totalTests: tests.length,
      totalAttempts: attempts.length,
      publishedCount: published.length,
      draftCount: tests.filter((t) => t.status === "draft").length,
      averageScore:
        scored.length > 0
          ? Math.round(scored.reduce((sum, a) => sum + (Number(a.percentage) || 0), 0) / scored.length)
          : 0,
    };

    return Response.json({ success: true, tests, stats, total: tests.length });
  } catch (error) {
    console.error("Admin mock tests list error:", error);
    return serverError();
  }
}

export async function POST(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json().catch(() => null);
    const result = validateMockTest(body);
    if (!result.ok) {
      return Response.json({ success: false, errors: result.errors }, { status: 400 });
    }

    const now = new Date().toISOString();
    const doc = await guard.adminDb.collection("mockTests").add({
      ...result.data,
      createdAt: now,
      updatedAt: now,
      createdBy: guard.admin.uid || "admin",
    });

    return Response.json({ success: true, test: { id: doc.id, ...result.data } }, { status: 201 });
  } catch (error) {
    console.error("Admin mock test create error:", error);
    return serverError();
  }
}
