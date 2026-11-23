import "server-only";

import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";
import { searchTarget95Content } from "@/lib/web-engine/internalSources";
import { createSearchPostHandler } from "@/lib/web-engine/searchRouteHandler.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createSearchPostHandler({
  getSession: getVerifiedSession,
  getDb: getAdminDb,
  search: searchTarget95Content,
});
