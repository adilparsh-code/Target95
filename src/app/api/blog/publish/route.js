import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "../../../lib/firebase-admin";
import { requireBlogAdmin } from "../../../lib/blog-admin-auth";

export const runtime = "nodejs";

function cronAuthorized(request) {
  const secret = process.env.BLOG_CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(request) {
  try {
    // Keep server automation compatible while allowing the human admin dashboard to publish.
    if (!cronAuthorized(request)) await requireBlogAdmin(request);

    const body = await request.json();
    const id = String(body?.id || "").trim();
    if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });

    const ref = getAdminDb().collection("blog_articles").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ ok: false, error: "Article not found" }, { status: 404 });

    const article = snap.data();
    if (article.status !== "review") {
      return NextResponse.json({ ok: false, error: "Only review articles can be published" }, { status: 409 });
    }

    await ref.update({
      status: "published",
      publishedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true, id, status: "published" });
  } catch (error) {
    const status = error?.message === "Forbidden" ? 403 : 401;
    return NextResponse.json({ ok: false, error: status === 403 ? "Forbidden" : "Unauthorized" }, { status });
  }
}
