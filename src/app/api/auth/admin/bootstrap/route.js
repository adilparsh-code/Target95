import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/app/lib/firebase-admin";

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
}

export async function POST(request) {
  const expectedSecret = process.env.TARGET95_ADMIN_BOOTSTRAP_SECRET;
  const expectedEmail = process.env.TARGET95_ADMIN_EMAIL?.trim().toLowerCase();

  if (!expectedSecret || !expectedEmail) return unauthorized();

  const providedSecret = request.headers.get("x-target95-bootstrap-secret") || "";
  if (!providedSecret || providedSecret !== expectedSecret) return unauthorized();

  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email || email !== expectedEmail) return unauthorized();

    const auth = getAdminAuth();
    const user = await auth.getUserByEmail(email);

    await auth.setCustomUserClaims(user.uid, { admin: true, role: "admin" });
    await getAdminDb().collection("users").doc(user.uid).set(
      { uid: user.uid, email, role: "admin", updatedAt: new Date() },
      { merge: true }
    );

    await auth.revokeRefreshTokens(user.uid);

    return NextResponse.json({ success: true, message: "Admin claims configured. Sign in again to receive the new claims." });
  } catch (error) {
    console.error("Admin bootstrap failed:", error);
    return NextResponse.json({ success: false, error: "Unable to configure admin account." }, { status: 500 });
  }
}
