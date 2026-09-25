import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "../../../lib/firebase-admin";
import { authErrorResponse, requireBlogAdmin } from "../../../lib/blog-admin-auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    // Publishing is intentionally human-admin-only. AI/cron credentials cannot publish. 
    await requireBlogAdmin(request);

    const body = await request.json();
    const id = String(body?.id || "").trim();
    if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });

    const ref = getAdminDb().collection("blog_articles").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ ok: false, error: "Article not found" }, { status: 404 });

    const article = snap.data();
    if (article.status !== "review") return NextResponse.json({ ok: false, error: "Only review articles can be published" }, { status: 409 });
    if (article.needsHumanReview !== true) return NextResponse.json({ ok: false, error: "Human review flag is missing" }, { status: 409 });
    if (article.needsVerification === true) return NextResponse.json({ ok: false, error: "Article requires source verification before publishing" }, { status: 409 });

    await ref.update({
      status: "published",
      publishedAt: FieldValue.serverTimestamp(),
      publishedBy: admin.uid,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true, id, status: "published" });
  } catch (error) {
    return authErrorResponse(error);
  }
}
