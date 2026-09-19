import { adminGuard, serverError, toMillis } from "../_helpers";

export const dynamic = "force-dynamic";

const ACTIVE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function countBy(list, key) {
  return list.reduce((acc, item) => {
    const value = item[key];
    if (value == null) return acc;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

/**
 * GET /api/admin/overview
 * Aggregated platform metrics for the admin overview. Aggregate counts only —
 * no individual student data is exposed beyond statistics.
 */
export async function GET(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const adminDb = guard.adminDb;

    const [usersSnap, questionsSnap, resultsSnap, mockTestsSnap, subjectsSnap, chaptersSnap] =
      await Promise.all([
        adminDb.collection("users").limit(2000).get(),
        adminDb.collection("questions").limit(2000).get(),
        adminDb.collection("results").orderBy("completedAt", "desc").limit(500).get(),
        adminDb.collection("mockTests").limit(500).get(),
        adminDb.collection("subjects").limit(200).get(),
        adminDb.collection("chapters").limit(500).get(),
      ]);

    const users = usersSnap.docs.map((d) => d.data());
    const students = users.filter((u) => (u.role || "student") === "student");
    const now = Date.now();
    const activeStudents = students.filter((s) => {
      const last = toMillis(s.lastActiveAt) || toMillis(s.updatedAt) || toMillis(s.createdAt);
      return last && now - last <= ACTIVE_WINDOW_MS;
    }).length;

    const results = resultsSnap.docs.map((d) => d.data());
    const questionsAnswered = results.reduce((sum, r) => sum + (Number(r.totalQuestions) || 0), 0);
    const correctAnswers = results.reduce((sum, r) => sum + (Number(r.correctAnswers) || 0), 0);
    const averageScore = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;

    const questions = questionsSnap.docs.map((d) => d.data());
    const tests = mockTestsSnap.docs.map((d) => d.data());

    return Response.json({
      success: true,
      overview: {
        totalStudents: students.length,
        activeStudents,
        totalTeachers: users.filter((u) => u.role === "teacher").length,
        questionsAnswered,
        averageScore,
        testsAttempted: results.length,
        content: {
          questions: questionsSnap.size,
          subjects: subjectsSnap.size,
          chapters: chaptersSnap.size,
          mockTests: tests.filter((t) => t.isActive !== false).length,
        },
        questionDifficulty: {
          easy: questions.filter((q) => String(q.difficulty || "").toLowerCase() === "easy").length,
          medium: questions.filter((q) => String(q.difficulty || "").toLowerCase() === "medium").length,
          hard: questions.filter((q) => String(q.difficulty || "").toLowerCase() === "hard").length,
        },
        studentsByClass: countBy(students, "class"),
        recentActivity: results.slice(0, 8).map((r) => ({
          completedAt: toMillis(r.completedAt),
          score: Number(r.score) || 0,
          totalQuestions: Number(r.totalQuestions) || 0,
        })),
      },
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return serverError();
  }
}
