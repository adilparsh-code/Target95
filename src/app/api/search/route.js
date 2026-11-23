import { NextResponse } from "next/server";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";
import { searchTarget95Content } from "@/lib/web-engine/internalSources";
import { createSearchPostHandler } from "@/lib/web-engine/searchApi.mjs";
import { createSearchRateLimiter } from "@/lib/web-engine/searchRateLimit.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handleSearchPost = createSearchPostHandler({
  getSession: getVerifiedSession,
  isRateLimited: (uid) => createSearchRateLimiter({ db: getAdminDb() })(uid),
  search: searchTarget95Content,
});

export async function POST(request) {
  const result = await handleSearchPost(request);
  return NextResponse.json(result.body, {
    status: result.status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      Vary: "Cookie",
    },
  });
}
