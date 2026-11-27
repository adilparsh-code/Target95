import { handleWhatsappVerify, handleWhatsappWebhook } from "@/lib/student-bot/core/whatsapp-api.mjs";
import { getWhatsappConfig, getWhatsappContext } from "@/lib/student-bot/whatsapp-wiring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Meta's subscription handshake. Needs no Firebase, only the verify token.
export async function GET(request) {
  return handleWhatsappVerify(request, { config: getWhatsappConfig() });
}

// Inbound WhatsApp messages. Authenticity comes from Meta's HMAC signature, not
// from a browser session, so this route is intentionally outside the proxy's
// page-session gate (the proxy does not run for /api).
export async function POST(request) {
  let context;
  try {
    context = getWhatsappContext();
  } catch (error) {
    console.error("student-bot whatsapp unavailable", { name: error?.name });
    return Response.json({ ok: false, code: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  return handleWhatsappWebhook(request, context);
}
