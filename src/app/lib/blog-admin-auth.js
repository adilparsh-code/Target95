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
