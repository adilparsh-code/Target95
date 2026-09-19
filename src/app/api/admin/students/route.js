import { adminGuard, serverError, toMillis, sanitizeQueryParam, safeNumber } from "../_helpers";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/students?q=&class=&status=&limit=
 * Returns the admin-visible student directory. Fields are limited to what
 * admins need for management — never passwords, tokens or provider data.
 */
export async function GET(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const adminDb = guard.adminDb;
    const { searchParams } = new URL(request.url);

    const search = sanitizeQueryParam(searchParams.get("q") || "", { maxLength: 120 });
    const classFilter = sanitizeQueryParam(searchParams.get("class") || "", { maxLength: 4, pattern: /^\d{1,2}$/ });
    const statusFilter = sanitizeQueryParam(searchParams.get("status") || "", { maxLength: 12, pattern: /^[a-zA-Z]+$/ });
    const limit = Math.min(Math.max(safeNumber(searchParams.get("limit"), 100), 1), 500);

    const snap = await adminDb.collection("users").limit(1000).get();
    const now = Date.now();
    const ACTIVE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

    let students = snap.docs
      .map((docSnap) => {
        const data = docSnap.data();
        const role = data.role || "student";
        const lastActive = toMillis(data.lastActiveAt) || toMillis(data.updatedAt) || toMillis(data.createdAt);
        return {
          id: docSnap.id,
          uid: docSnap.id,
          fullName: data.fullName || data.name || "",
          email: data.email || "",
          class: data.class || "",
          grade: data.board || data.grade || "",
          school: data.school || "",
          city: data.city || "",
          role,
          status: data.status || "active",
          disabled: data.disabled === true,
          createdAt: toMillis(data.createdAt),
          lastActiveAt: lastActive,
          isActiveStudent: role === "student" && !data.disabled && lastActive && now - lastActive <= ACTIVE_WINDOW_MS,
          // Aggregated progress pulled from per-user counters when present.
          questionsSolved: Number(data.questionsSolved) || 0,
          averageScore: Number(data.averageScore) || 0,
          testsAttempted: Number(data.testsAttempted) || 0,
        };
      })
      // Only directory members relevant to admin management.
      .filter((s) => s.role === "student" || s.role === "admin" || s.role === "teacher");

    if (classFilter) students = students.filter((s) => String(s.class) === classFilter);
    if (statusFilter) students = students.filter((s) => s.status === statusFilter || (statusFilter === "inactive" && s.disabled));
    if (search) {
      const q = search.toLowerCase();
      students = students.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.school.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    students.sort((a, b) => (b.lastActiveAt || 0) - (a.lastActiveAt || 0));

    return Response.json({
      success: true,
      students: students.slice(0, limit),
      total: students.length,
    });
  } catch (error) {
    console.error("Admin students error:", error);
    return serverError();
  }
}
