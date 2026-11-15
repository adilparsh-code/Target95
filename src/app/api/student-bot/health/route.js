import { handleHealthRequest } from "@/lib/student-bot/core/api.mjs";
import { aiAdapter } from "@/lib/student-bot/wiring";

export const runtime = "nodejs";

export async function GET() {
  // Health reports configuration only; it does not touch Firebase or the session.
  return handleHealthRequest({ deps: { ai: aiAdapter } });
}
