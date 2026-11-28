import { getAdminDb } from "@/app/lib/firebase-admin";

/**
 * Shared helpers for admin-only API routes.
 * All admin data flows through requireAdmin() — the client-side role check is
 * convenience only; authorization is enforced here on the server.
 */

function jsonResponse(body, init = {}) {
  const response = new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  return response;
}

export function unauthorized() {
  return jsonResponse({ success: false, error: "Unauthorized." }, { status: 401 });
}

export function forbidden() {
  return jsonResponse({ success: false, error: "Admin access required." }, { status: 403 });
}

export function serverError() {
  return jsonResponse({ success: false, error: "Unable to load admin data." }, { status: 500 });
}

/**
 * Guard a route handler: resolves the verified admin session or returns a
 * 401/403 response, or 503 when session validation is unavailable. Usage:
 *   const guard = await adminGuard(request);
 *   if (!guard.ok) return guard.response;
 *   const { adminDb } = guard;
 */
export async function adminGuard(request) {
  const { requireAdmin } = await import("@/app/lib/server-auth");
  let admin;
  try {
    admin = await requireAdmin(request);
  } catch (error) {
    console.error("Admin session validation failed:", error);
    return {
      ok: false,
      response: jsonResponse({ success: false, error: "Session validation is temporarily unavailable." }, { status: 503 }),
    };
  }
  if (!admin) {
    const sessionCookie = request.cookies?.get?.("session")?.value ?? "";
    if (!sessionCookie) {
      const response = jsonResponse({ success: false, error: "Unauthorized." }, { status: 401 });
      return { ok: false, response };
    }
    return { ok: false, response: forbidden() };
  }
  return { ok: true, adminDb: getAdminDb(), admin };
}

/** Firestore Timestamps / ISO strings -> epoch ms (best effort). */
export function toMillis(value) {
  if (!value) return null;
  if (typeof value?.toMillis === "function") return value.toMillis();
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? null : ms;
}

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Strip fields that must never leave the server (defense in depth). */
export function stripSensitiveFields(doc) {
  if (!doc || typeof doc !== "object") return doc;
  const { password, passwordHash, tokens, providerData, ...rest } = doc;
  return rest;
}

/** Basic input validation for query params. */
export function sanitizeQueryParam(value, { maxLength = 120, pattern = null } = {}) {
  const raw = typeof value === "string" ? value.trim().slice(0, maxLength) : "";
  if (!raw) return "";
  if (pattern && !pattern.test(raw)) return "";
  return raw;
}
