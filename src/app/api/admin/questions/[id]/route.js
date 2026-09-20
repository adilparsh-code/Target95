import { adminGuard, serverError } from "@/app/api/admin/_helpers";
import { validateQuestion } from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

/**
 * GET    /api/admin/questions/[id] — fetch a single question (preview)
 * PATCH  /api/admin/questions/[id] — update fields / change status (archive, publish, draft)
 * DELETE /api/admin/questions/[id] — permanently remove the question
 * All operations require a verified admin session (requireAdmin).
 */
export async function GET(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    const doc = await guard.adminDb.collection("questions").doc(id).get();
    if (!doc.exists) {
      return Response.json({ success: false, error: "Question not found." }, { status: 404 });
    }
    return Response.json({ success: true, question: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error("Admin question get error:", error);
    return serverError();
  }
}

export async function PATCH(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    const ref = guard.adminDb.collection("questions").doc(id);
    const existing = await ref.get();
    if (!existing.exists) {
      return Response.json({ success: false, error: "Question not found." }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    // Merge the patch onto the stored doc so partial validation sees complete data.
    const merged = { ...existing.data(), ...(body && typeof body === "object" ? body : {}) };
    const result = validateQuestion(merged, { partial: true });
    if (!result.ok) {
      return Response.json({ success: false, errors: result.errors }, { status: 400 });
    }

    const payload = { ...result.data, updatedAt: new Date().toISOString() };
    await ref.update(payload);
    return Response.json({ success: true, question: { id, ...existing.data(), ...payload } });
  } catch (error) {
    console.error("Admin question update error:", error);
    return serverError();
  }
}

export async function DELETE(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    await guard.adminDb.collection("questions").doc(id).delete();
    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin question delete error:", error);
    return serverError();
  }
}
