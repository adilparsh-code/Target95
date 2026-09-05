import { NextResponse } from "next/server";

const protectedPrefixes = [
  "/admin",
  "/analytics",
  "/bookmarks",
  "/dashboard",
  "/daily-challenge",
  "/ai-tutor",
  "/mock-test",
  "/my-learning",
  "/practice/session",
  "/profile",
  "/rewards",
  "/settings",
  "/teacher",
];

const authPages = new Set(["/login", "/register", "/forgot-password"]);

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // A valid session cookie is not treated as proof of a role here. Role
  // authorization remains enforced by Firebase/ProtectedRoute until the
  // server-side role-claims migration is completed.
  if (authPages.has(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
