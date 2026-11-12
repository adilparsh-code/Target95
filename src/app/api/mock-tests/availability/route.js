import { NextResponse } from "next/server";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { normalizeAttemptConfig } from "@/lib/mocktestAttempts";

export const runtime = "nodejs";

/**
 * GET /api/mock-tests/availability?category=&difficulty=&type=&chapter=
 * Counts only (no question text): how many questions match the filters and which chapters
 * have questions. Lets the setup screen reflect content-engine questions without shipping
 * the question bank to the browser.
 */
export async function GET(request) {
  let session;
  try {
    session = await getVerifiedSession(request);
  } catch (error) {
    console.error("Session validation failed:", error);
    return NextResponse.json({ ok: false, error: "Session validation is temporarily unavailable." }, { status: 503 });
  }
  if (!session) return NextResponse.json({ ok: false, error: "Sign in to build a mock test." }, { status: 401 });

  const params = Object.fromEntries(new URL(request.url).searchParams);
  const config = normalizeAttemptConfig(params);
  // Loaded after authentication so the content catalog is only read for signed-in requests.
  const { getAvailability } = await import("@/lib/mocktestContent");
  const { count, chapters, contentEnabled } = getAvailability(config);
  return NextResponse.json({ ok: true, count, chapters, contentEnabled }, { headers: { "Cache-Control": "no-store" } });
}
