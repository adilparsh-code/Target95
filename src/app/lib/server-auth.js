import { getAdminAuth, getAdminDb } from "./firebase-admin.js";
import { verifyActiveSession } from "../../lib/accountStatus.mjs";

export async function getVerifiedSession(request) {
  // checkRevoked session + verified email + active users/{uid} profile
  // (the same fail-closed invariant firestore.rules enforces).
  return verifyActiveSession(request.cookies.get("session")?.value, {
    auth: getAdminAuth(),
    adminDb: getAdminDb(),
  });
}

export async function requireAdmin(request) {
  const decodedToken = await getVerifiedSession(request);
  if (!decodedToken || decodedToken.admin !== true) return null;
  return decodedToken;
}

export async function requireRole(request, roles = []) {
  const decodedToken = await getVerifiedSession(request);
  if (!decodedToken) return null;
  const allowed = new Set(roles);
  const role = decodedToken.admin === true ? "admin" : decodedToken.role || "student";
  return allowed.has(role) ? decodedToken : null;
}
