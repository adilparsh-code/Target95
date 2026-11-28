import { getAdminAuth, getAdminDb } from "@/app/lib/firebase-admin";
import { hasActiveProfile, verifyActiveSession } from "@/lib/accountStatus.mjs";

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

function jsonResponse(body, init = {}) {
  const response = new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  return response;
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse({ success: false, error: "Invalid request." }, { status: 400 });
    }

    const body = await request.json();
    const idToken = typeof body?.idToken === "string" ? body.idToken.trim() : "";

    if (!idToken || idToken.length > 12000) {
      return jsonResponse({ success: false, error: "Invalid token." }, { status: 401 });
    }

    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(idToken, true);

    if (decodedToken.email_verified !== true) {
      return jsonResponse({ success: false, error: "Email verification required." }, { status: 403 });
    }

    if (!(await hasActiveProfile(getAdminDb(), decodedToken.uid))) {
      return jsonResponse({ success: false, error: "This account is not active." }, { status: 403 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_IN,
    });

    const response = jsonResponse({ success: true });
    response.headers.set("Set-Cookie", "session=" + sessionCookie + "; HttpOnly; Path=/" + (process.env.NODE_ENV === "production" ? "; Secure; SameSite=Strict" : ""));
    return response;
  } catch (error) {
    console.error("Session creation failed:", error);
    return jsonResponse({ success: false, error: "Unable to create a secure session." }, { status: 401 });
  }
}

export async function GET(request) {
  const sessionCookie = request.cookies?.get?.("session")?.value ?? "";
  if (!sessionCookie) {
    const response = jsonResponse({ authenticated: false }, { status: 401 });
    response.headers.set("Set-Cookie", "session=; Path=/; Max-Age=0");
    return response;
  }

  let decodedToken;
  try {
    decodedToken = await verifyActiveSession(sessionCookie, { auth: getAdminAuth(), adminDb: getAdminDb() });
  } catch (error) {
    console.error("Session validation failed:", error);
    const response = jsonResponse({ error: "Session validation is temporarily unavailable." }, { status: 503 });
    return response;
  }
  if (!decodedToken) {
    const response = jsonResponse({ authenticated: false }, { status: 401 });
    response.headers.set("Set-Cookie", "session=; Path=/; Max-Age=0");
    return response;
  }

  const isAdmin = decodedToken.admin === true;
  const role = isAdmin ? "admin" : decodedToken.role || "student";

  return jsonResponse({
    authenticated: true,
    user: {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      emailVerified: true,
      role,
      isAdmin,
    },
  });
}

export async function DELETE(request) {
  const cookieHeader = request.headers ? request.headers.get : undefined;
  const cookieHeader3 =
    typeof cookieHeader === 'function'
      ? cookieHeader.call(request.headers, "cookie") ?? ""
      : "";
  const sessionCookie =
    typeof cookieHeader3 === 'string'
      ? cookieHeader3.split(";").map((c) => c.trim()).find((c) => c.startsWith("session="))?.slice("session=".length)
      : undefined;
  const response = jsonResponse({ success: true });
  response.headers.set("Set-Cookie", "session=; Path=/; Max-Age=0");

  if (sessionCookie) {
    try {
      const decodedToken = await getAdminAuth().verifySessionCookie(sessionCookie, false);
      await getAdminAuth().revokeRefreshTokens(decodedToken.uid);
    } catch (error) {
      console.warn("Could not revoke session token during logout:", error);
    }
  }

  return response;
}
