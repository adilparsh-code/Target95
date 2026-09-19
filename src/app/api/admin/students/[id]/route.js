import { adminGuard, serverError, toMillis } from "../../_helpers";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/students/[id]
 * Full student record for the admin profile view: profile + progress +
 * practice results + mock test results. Admin-only via requireAdmin.
 */
export async function GET(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    if (!id || typeof id !== "string" || id.length > 128) {
      return Response.json({ success: false, error: "Invalid student id." }, { status: 400 });
    }

    const adminDb = guard.adminDb;

    const userDoc = await adminDb.collection("users").doc(id).get();
    if (!userDoc.exists) {
      return Response.json({ success: false, error: "Student not found." }, { status: 404 });
    }
    const userData = userDoc.data() || {};

    const [progressSnap, resultsSnap, mockResultsSnap] = await Promise.all([
      adminDb.collection("progress").where("userId", "==", id).limit(500).get(),
      adminDb.collection("results").where("userId", "==", id).orderBy("completedAt", "desc").limit(50).get(),
      adminDb.collection("mockTestResults").where("userId", "==", id).limit(50).get(),
    ]);

    const progress = progressSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const chaptersVisited = progress.length;
    const questionsSolved = progress.reduce((sum, p) => sum + (Number(p.questionsSolved) || 0), 0);
    const correctAnswers = progress.reduce((sum, p) => sum + (Number(p.correctAnswers) || 0), 0);
    const accuracy = questionsSolved > 0 ? Math.round((correctAnswers / questionsSolved) * 100) : 0;

    const results = resultsSnap.docs.map((d) => {
      const data = d.data();
      const total = Number(data.totalQuestions) || 0;
      const correct = Number(data.correctAnswers) || 0;
      return {
        id: d.id,
        score: Number(data.score) || correct,
        totalQuestions: total,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
        timeTaken: Number(data.timeTaken) || 0,
        completedAt: toMillis(data.completedAt),
      };
    });

    const mockResults = mockResultsSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || data.testTitle || "Mock test",
        percentage: Number(data.percentage) || 0,
        correctCount: Number(data.correctCount) || 0,
        totalQuestions: Number(data.totalQuestions) || 0,
        timeTaken: Number(data.timeTaken) || 0,
        completedAt: toMillis(data.completedAt) || toMillis(data.createdAt),
      };
    });

    const bestScore = results.reduce((max, r) => Math.max(max, r.percentage), 0);

    return Response.json({
      success: true,
      student: {
        id,
        uid: id,
        fullName: userData.fullName || userData.name || "",
        email: userData.email || "",
        class: userData.class || "",
        grade: userData.board || userData.grade || "",
        school: userData.school || "",
        city: userData.city || "",
        role: userData.role || "student",
        status: userData.status || "active",
        disabled: userData.disabled === true,
        createdAt: toMillis(userData.createdAt),
        lastActiveAt: toMillis(userData.lastActiveAt) || toMillis(userData.updatedAt),
      },
      progress: {
        chaptersVisited,
        questionsSolved,
        accuracy,
        bestScore,
        perChapter: progress
          .map((p) => ({
            chapterId: p.chapterId || p.chapter || "Unknown",
            chapterName: p.chapterName || p.chapterTitle || p.chapterId || "Chapter",
            questionsSolved: Number(p.questionsSolved) || 0,
            accuracy: Number(p.accuracy) || 0,
            lastVisited: toMillis(p.lastVisited),
          }))
          .sort((a, b) => (b.lastVisited || 0) - (a.lastVisited || 0))
          .slice(0, 20),
      },
      testResults: results,
      mockResults,
    });
  } catch (error) {
    console.error("Admin student detail error:", error);
    return serverError();
  }
}
