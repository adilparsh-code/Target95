import { handleChatRequest } from "@/lib/student-bot/core/api.mjs";
import { withRouteContext } from "@/lib/student-bot/wiring";

export const runtime = "nodejs";

export async function POST(request) {
  return withRouteContext((context) => handleChatRequest(request, context));
}
