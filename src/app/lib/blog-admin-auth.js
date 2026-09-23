import crypto from "node:crypto";
import { getAdminAuth } from "./firebase-admin";

function getAllowedEmails() {
  return (process.env.BLOG_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireBlogAdmin(request) {
  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = header.slice(7).trim();
  if (!token) throw new Error("Unauthorized");

  const decoded = await getAdminAuth().verifyIdToken(token);
  const email = String(decoded.email || "").toLowerCase();
  const allowed = getAllowedEmails();

  if (!decoded.email_verified || !email || !allowed.includes(email)) {
    throw new Error("Forbidden");
  }

  return decoded;
}

export function authErrorResponse(error) {
  const message = error?.message === "Forbidden" ? "Forbidden" : "Unauthorized";
  return Response.json({ ok: false, error: message }, { status: message === "Forbidden" ? 403 : 401 });
}


function constantTimeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function isAuthorizedCronRequest(request) {
  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) return false;
  const token = header.slice(7).trim();
  if (!token) return false;
  const secrets = [process.env.BLOG_CRON_SECRET, process.env.CRON_SECRET].filter(Boolean);
  return secrets.some((secret) => constantTimeEqual(token, secret));
}
