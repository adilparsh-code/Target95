import { NextResponse } from "next/server";

const protectedPrefixes = [
  "/admin",
  "/analytics",
  "/bookmarks",
  "/dashboard",
  "/student/dashboard",
  "/daily-challenge",
  "/ai-tutor",
  "/mock-test",
  "/my-learning",
  "/practice",
  "/profile",
  "/rewards",
  "/settings",
  "/teacher",
];

const authPages = new Set(["/login", "/register", "/forgot-password"]);
const canonicalOrigin = "https://target95.web.app";

function noindex(response) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return noindex(NextResponse.redirect(loginUrl));
  }

  // A valid session cookie is not treated as proof of a role here. Role
  // authorization remains enforced by Firebase/ProtectedRoute until the
  // server-side role-claims migration is completed.
  if (authPages.has(pathname) && session) {
    return noindex(NextResponse.redirect(new URL("/dashboard", request.url)));
  }

  const response = NextResponse.next();
  if (isProtected || authPages.has(pathname)) return noindex(response);

  // Public pages receive a query-free HTTP canonical. The lowercase Java
  // aliases redirect before this can be indexed, while their /Java targets
  // retain their explicit route metadata.
  response.headers.set("Link", `<${canonicalOrigin}${pathname}>; rel=\"canonical\"`);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
