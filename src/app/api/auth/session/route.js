import { NextResponse } from "next/server";
import { getAdminAuth } from "@/app/lib/firebase-admin";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60;
const SESSION_EXPIRES_IN = SESSION_MAX_AGE * 1000;

function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  };
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
    }

    const body = await request.json();
    const idToken = typeof body?.idToken === "string" ? body.idToken.trim() : "";

    if (!idToken || idToken.length > 12000) {
      return NextResponse.json({ success: false, error: "Invalid token." }, { status: 401 });
    }

    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(idToken, true);

    if (decodedToken.email_verified !== true) {
      return NextResponse.json({ success: false, error: "Email verification required." }, { status: 403 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_IN,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("session", sessionCookie, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Session creation failed:", error);
    return NextResponse.json({ success: false, error: "Unable to create a secure session." }, { status: 401 });
  }
}

export async function GET(request) {
  try {
    const session = request.cookies.get("session")?.value;
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifySessionCookie(session, true);

    if (decodedToken.email_verified !== true) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email || "",
        emailVerified: true,
        role: decodedToken.role || "student",
      },
    });
  } catch (error) {
    console.error("Session validation failed:", error);
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete("session");
    return response;
  }
}

export async function DELETE(request) {
  const session = request.cookies.get("session")?.value;
  const response = NextResponse.json({ success: true });
  response.cookies.delete("session");

  if (session) {
    try {
      const decodedToken = await getAdminAuth().verifySessionCookie(session, false);
      await getAdminAuth().revokeRefreshTokens(decodedToken.uid);
    } catch (error) {
      // Cookie deletion is still sufficient if the session is already invalid/expired.
      console.warn("Could not revoke session token during logout:", error);
    }
  }

  return response;
}
