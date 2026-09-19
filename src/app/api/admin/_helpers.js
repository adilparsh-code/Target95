import { NextResponse } from "next/server";
import { getAdminDb } from "@/app/lib/firebase-admin";

/**
 * Shared helpers for admin-only API routes.
 * All admin data flows through requireAdmin() — the client-side role check is
 * convenience only; authorization is enforced here on the server.
 */

export function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ success: false, error: "Admin access required." }, { status: 403 });
}

export function serverError() {
  return NextResponse.json({ success: false, error: "Unable to load admin data." }, { status: 500 });
}

/**
 * Guard a route handler: resolves the verified admin session or returns a
 * 401/403 response. Usage:
 *   const guard = await adminGuard(request);
 *   if (!guard.ok) return guard.response;
 *   const { adminDb } = guard;
 */
export async function adminGuard(request) {
  const { requireAdmin } = await import("@/app/lib/server-auth");
  const admin = await requireAdmin(request);
  if (!admin) {
    const session = request.cookies.get("session")?.value;
    if (!session) return { ok: false, response: unauthorized() };
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
