import { adminGuard, serverError, sanitizeQueryParam } from "@/app/api/admin/_helpers";
import { validateGeneratedQuestion, normalizeStatus } from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

/**
 * GET  /api/admin/generated-questions — list AI-generated questions
 * POST /api/admin/generated-questions — persist a batch of generated questions
 * All operations require a verified admin session (requireAdmin).
 */
export async function GET(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { searchParams } = new URL(request.url);
    const search = sanitizeQueryParam(searchParams.get("q") || "", { maxLength: 120 }).toLowerCase();
    const status = normalizeStatus(searchParams.get("status"));

    const snap = await guard.adminDb.collection("generatedQuestions").limit(1000).get();
    let questions = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (search) {
      questions = questions.filter((q) =>
        [q.question, q.subject, q.chapter, q.questionType]
          .map((v) => String(v || "").toLowerCase())
          .some((v) => v.includes(search))
      );
    }
    if (status) questions = questions.filter((q) => String(q.status || "Draft").toLowerCase() === status);

    return Response.json({ success: true, questions, total: questions.length });
  } catch (error) {
    console.error("Admin generated questions list error:", error);
    return serverError();
  }
}

export async function POST(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json().catch(() => null);
    const batch = Array.isArray(body) ? body : body?.questions;
    if (!Array.isArray(batch) || batch.length === 0) {
      return Response.json({ success: false, error: "No questions provided." }, { status: 400 });
    }
    if (batch.length > 50) {
      return Response.json({ success: false, error: "Maximum 50 questions per batch." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const collection = guard.adminDb.collection("generatedQuestions");
    const savedIds = [];

    for (const raw of batch) {
      const result = validateGeneratedQuestion(raw);
      if (!result.ok) {
        return Response.json({ success: false, errors: result.errors }, { status: 400 });
      }
      const doc = await collection.add({
        ...result.data,
        createdAt: now,
        updatedAt: now,
        createdBy: guard.admin.uid || "admin",
      });
      savedIds.push(doc.id);
    }

    return Response.json({ success: true, savedIds }, { status: 201 });
  } catch (error) {
    console.error("Admin generated questions create error:", error);
    return serverError();
  }
}
