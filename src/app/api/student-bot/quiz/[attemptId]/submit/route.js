import { handleQuizSubmitRequest } from "@/lib/student-bot/core/api.mjs";
import { withRouteContext } from "@/lib/student-bot/wiring";

export const runtime = "nodejs";

export async function POST(request, { params }) {
  const { attemptId } = await params;
  return withRouteContext((context) => handleQuizSubmitRequest(request, attemptId, context));
}
