import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "../../../../lib/firebase-admin";
import { authErrorResponse, requireBlogAdmin } from "../../../../lib/blog-admin-auth";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    await requireBlogAdmin(request);
    const snapshot = await getAdminDb().collection("blog_articles").orderBy("updatedAt", "desc").limit(100).get();
    const articles = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        publishedAt: data.publishedAt?.toDate?.()?.toISOString() || null,
      };
    });
    return NextResponse.json({ ok: true, articles });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function PATCH(request) {
  try {
    const admin = await requireBlogAdmin(request);
    const body = await request.json();
    const id = String(body?.id || "").trim();
    if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });

    const allowedFields = ["title", "excerpt", "content", "seoTitle", "metaDescription", "keywords", "editorNotes", "sourceUrls", "needsVerification", "researchNotes"];
    const updates = {};
    for (const field of allowedFields) if (body[field] !== undefined) updates[field] = body[field];
    if (!Object.keys(updates).length) return NextResponse.json({ ok: false, error: "No editable fields supplied" }, { status: 400 });

    if (updates.keywords !== undefined) {
      if (!Array.isArray(updates.keywords)) return NextResponse.json({ ok: false, error: "keywords must be an array" }, { status: 400 });
      updates.keywords = updates.keywords.map((item) => String(item).trim()).filter(Boolean).slice(0, 20);
    }
    if (updates.editorNotes !== undefined) {
      if (!Array.isArray(updates.editorNotes)) return NextResponse.json({ ok: false, error: "editorNotes must be an array" }, { status: 400 });
      updates.editorNotes = updates.editorNotes.map((item) => String(item).trim()).filter(Boolean).slice(0, 20);
    }

    updates.updatedAt = FieldValue.serverTimestamp();
    updates.lastEditedBy = admin.uid;
    await getAdminDb().collection("blog_articles").doc(id).update(updates);
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function POST(request) {
  try {
    const admin = await requireBlogAdmin(request);
    const body = await request.json();
    const id = String(body?.id || "").trim();
    const action = String(body?.action || "").trim();
    if (!id || action !== "request_changes") return NextResponse.json({ ok: false, error: "id and action=request_changes are required" }, { status: 400 });

    const ref = getAdminDb().collection("blog_articles").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ ok: false, error: "Article not found" }, { status: 404 });

    await ref.update({
      status: "draft",
      reviewNotes: String(body?.reviewNotes || "").trim(),
      lastReviewedBy: admin.uid,
      lastReviewedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true, id, status: "draft" });
  } catch (error) {
    return authErrorResponse(error);
  }
}
