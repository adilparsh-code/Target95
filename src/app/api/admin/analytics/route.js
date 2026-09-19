import { adminGuard, serverError, toMillis } from "../_helpers";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/analytics
 * Platform-wide academic analytics: subject/chapter performance, accuracy
 * trends and test statistics. Admin-only via requireAdmin.
 */
export async function GET(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const adminDb = guard.adminDb;

    const [progressSnap, resultsSnap, mockResultsSnap] = await Promise.all([
      adminDb.collection("progress").limit(2000).get(),
      adminDb.collection("results").orderBy("completedAt", "desc").limit(500).get(),
      adminDb.collection("mockTestResults").limit(500).get(),
    ]);

    // --- Chapter performance (from per-user progress docs) ---
    const chapterMap = new Map();
    progressSnap.docs.forEach((docSnap) => {
      const p = docSnap.data();
      const key = p.chapterId || p.chapter || "Unknown";
      const entry = chapterMap.get(key) || {
        chapterId: key,
        chapterName: p.chapterName || p.chapterTitle || key,
        questionsSolved: 0,
        correctAnswers: 0,
        learners: 0,
      };
      entry.questionsSolved += Number(p.questionsSolved) || 0;
      entry.correctAnswers += Number(p.correctAnswers) || 0;
      entry.learners += 1;
      chapterMap.set(key, entry);
    });
    const chapterPerformance = Array.from(chapterMap.values())
      .map((c) => ({
        ...c,
        accuracy: c.questionsSolved > 0 ? Math.round((c.correctAnswers / c.questionsSolved) * 100) : 0,
      }))
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 20);

    // --- Test result trends ---
    const results = resultsSnap.docs.map((d) => {
      const data = d.data();
      const total = Number(data.totalQuestions) || 0;
      const correct = Number(data.correctAnswers) || 0;
      return {
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
        completedAt: toMillis(data.completedAt),
      };
    });
    const averageScore =
      results.length > 0
        ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
        : 0;

    // --- Weekly accuracy trend (last 8 weeks) ---
    const WEEK = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const weeks = Array.from({ length: 8 }, (_, i) => {
      const end = now - i * WEEK;
      const inWeek = results.filter((r) => r.completedAt && r.completedAt > end - WEEK && r.completedAt <= end);
      return {
        label: i === 0 ? "This week" : `${i}w ago`,
        attempts: inWeek.length,
        accuracy:
          inWeek.length > 0
            ? Math.round(inWeek.reduce((sum, r) => sum + r.percentage, 0) / inWeek.length)
            : 0,
      };
    }).reverse();

    const mockResults = mockResultsSnap.docs.map((d) => Number(d.data().percentage) || 0);

    return Response.json({
      success: true,
      analytics: {
        totalAttempts: results.length + mockResults.length,
        averageScore,
        strongChapters: chapterPerformance.slice(0, 5),
        weakChapters: [...chapterPerformance].reverse().slice(0, 5),
        weeklyTrend: weeks,
        mockTestAverage:
          mockResults.length > 0
            ? Math.round(mockResults.reduce((a, b) => a + b, 0) / mockResults.length)
            : 0,
        mockTestAttempts: mockResults.length,
      },
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return serverError();
  }
}
