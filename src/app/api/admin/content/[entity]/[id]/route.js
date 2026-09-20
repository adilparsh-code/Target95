import { adminGuard, serverError } from "@/app/api/admin/_helpers";
import { validateContentEntity } from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

/** Whitelisted content entities — anything else is rejected. */
const ENTITIES = new Set(["subjects", "chapters", "topics"]);

/**
 * PATCH  /api/admin/content/[entity]/[id] — update (rename, publish, archive…)
 * DELETE /api/admin/content/[entity]/[id] — permanently remove the document
 * All operations require a verified admin session (requireAdmin).
 */
export async function PATCH(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { entity, id } = await params;
    if (!ENTITIES.has(entity)) {
      return Response.json({ success: false, error: "Unknown content entity." }, { status: 400 });
    }

    const ref = guard.adminDb.collection(entity).doc(id);
    const existing = await ref.get();
    if (!existing.exists) {
      return Response.json({ success: false, error: `${entity.slice(0, -1)} not found.` }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    const merged = { ...existing.data(), ...(body && typeof body === "object" ? body : {}) };
    const result = validateContentEntity(merged, { partial: true });
    if (!result.ok) {
      return Response.json({ success: false, errors: result.errors }, { status: 400 });
    }

    const payload = { ...result.data, updatedAt: new Date().toISOString() };
    await ref.update(payload);
    return Response.json({ success: true, item: { id, ...existing.data(), ...payload } });
  } catch (error) {
    console.error("Admin content update error:", error);
    return serverError();
  }
}

export async function DELETE(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { entity, id } = await params;
    if (!ENTITIES.has(entity)) {
      return Response.json({ success: false, error: "Unknown content entity." }, { status: 400 });
    }
    await guard.adminDb.collection(entity).doc(id).delete();
    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin content delete error:", error);
    return serverError();
  }
}
