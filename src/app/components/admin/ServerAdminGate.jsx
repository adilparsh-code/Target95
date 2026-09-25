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

  const request = new Request("http://local", {
    // Rebuild the cookie header with the original name. requireAdmin() reads
    // request.cookies.get("session"), so passing only the raw token would make
    // every server-side admin check fail (and would also make the gate diverge
    // from the API authorization path).
    headers: { cookie: session || "" },
  });
  const admin = await requireAdmin(request);

  if (!admin) {
    return <AdminAccessDenied />;
  }

  return children;
}
