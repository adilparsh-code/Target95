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
    await requireBlogAdmin(request);
    const body = await request.json();
    const id = String(body?.id || "").trim();
    if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });

    const allowedFields = ["title", "excerpt", "content", "seoTitle", "metaDescription", "keywords", "editorNotes"];
    const updates = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }
    if (!Object.keys(updates).length) return NextResponse.json({ ok: false, error: "No editable fields supplied" }, { status: 400 });

    updates.updatedAt = FieldValue.serverTimestamp();
    await getAdminDb().collection("blog_articles").doc(id).update(updates);
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    if (error?.code === "auth/id-token-expired" || error?.code === "auth/argument-error") return authErrorResponse(error);
    return authErrorResponse(error);
  }
}
