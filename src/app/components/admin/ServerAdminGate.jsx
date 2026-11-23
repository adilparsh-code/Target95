import { NextRequest } from "next/server";
import { headers as nextHeaders } from "next/headers";
import { requireAdmin } from "@/app/lib/server-auth";
import AdminAccessDenied from "./AdminAccessDenied";

/**
 * Server-side RBAC gate for /admin/*.
 *
 * ProtectedRoute (client-side) is convenience UX only — this gate re-checks
 * the verified session cookie on the server for every admin page render, so a
 * non-admin (or unsigned) visitor can never receive admin UI markup.
 */
export default async function ServerAdminGate({ children }) {
  const headerList = await nextHeaders();
  const cookie = headerList.get("cookie") || "";
  const session = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("session="));

  // NextRequest provides the cookies API consumed by requireAdmin().
  // A native Web Request has no request.cookies property.
  const request = new NextRequest("http://local", {
    headers: { cookie: session || "" },
  });
  const admin = await requireAdmin(request);

  if (!admin) {
    return <AdminAccessDenied />;
  }

  return children;
}
