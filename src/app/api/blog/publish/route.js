import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "../../../lib/firebase-admin";

export const runtime = "nodejs";

function authorized(request) {
  const secret = process.env.BLOG_CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const id = body?.id;
  if (!id) return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });
  const ref = getAdminDb().collection("blog_articles").doc(id);
  const snap = await ref.get();
  if (!snap.exists) return NextResponse.json({ ok: false, error: "Article not found" }, { status: 404 });
  const article = snap.data();
  if (article.status !== "review") return NextResponse.json({ ok: false, error: "Only review articles can be published" }, { status: 409 });
  await ref.update({ status: "published", publishedAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return NextResponse.json({ ok: true, id, status: "published" });
}
