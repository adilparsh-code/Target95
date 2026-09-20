import { adminGuard, serverError } from "@/app/api/admin/_helpers";
import { validateGeneratedQuestion } from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = ["Draft", "Approved", "Published", "Rejected"];

/**
 * PATCH  /api/admin/generated-questions/[id] — update fields / review status
 * DELETE /api/admin/generated-questions/[id] — remove a generated question
 * All operations require a verified admin session (requireAdmin).
 */
export async function PATCH(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    const ref = guard.adminDb.collection("generatedQuestions").doc(id);
    const existing = await ref.get();
    if (!existing.exists) {
      return Response.json({ success: false, error: "Question not found." }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ success: false, error: "Invalid payload." }, { status: 400 });
    }

    // Status-only review actions (approve / publish / reject).
    const updates = {};
    if (body.status !== undefined) {
      const status = String(body.status);
      if (!ALLOWED_STATUSES.includes(status)) {
        return Response.json(
          { success: false, error: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}.` },
          { status: 400 }
        );
      }
      updates.status = status;
    }

    // Full edits validate the merged document.
    if (body.question !== undefined || body.answer !== undefined || body.explanation !== undefined) {
      const merged = { ...existing.data(), ...body };
      const result = validateGeneratedQuestion(merged);
      if (!result.ok) {
        return Response.json({ success: false, errors: result.errors }, { status: 400 });
      }
      Object.assign(updates, result.data);
    }

    if (Object.keys(updates).length === 0) {
      return Response.json({ success: false, error: "No valid fields to update." }, { status: 400 });
    }

    updates.updatedAt = new Date().toISOString();
    await ref.update(updates);
    return Response.json({ success: true, question: { id, ...existing.data(), ...updates } });
  } catch (error) {
    console.error("Admin generated question update error:", error);
    return serverError();
  }
}

export async function DELETE(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    await guard.adminDb.collection("generatedQuestions").doc(id).delete();
    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin generated question delete error:", error);
    return serverError();
  }
}
