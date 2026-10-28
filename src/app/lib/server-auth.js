import { getAdminAuth, getAdminDb } from "@/app/lib/firebase-admin";
import { hasActiveProfile } from "@/lib/accountStatus.mjs";

export async function getVerifiedSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return null;

  try {
    const decodedToken = await getAdminAuth().verifySessionCookie(session, true);
    if (decodedToken.email_verified !== true) return null;
    // Same fail-closed account-status check as firestore.rules: a session is
    // only honoured while users/{uid} is active, independent of Auth state.
    if (!(await hasActiveProfile(getAdminDb(), decodedToken.uid))) return null;
    return decodedToken;
  } catch {
    return null;
  }
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
