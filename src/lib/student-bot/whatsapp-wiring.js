import { createWhatsappSender } from "./adapters/whatsapp-sender.mjs";
import { getRouteContext } from "./wiring";

// Real dependencies for the WhatsApp webhook route. Everything here is read
// from the server environment; nothing is public (no NEXT_PUBLIC_*).
//
// NOT wired yet, on purpose (needs the owner's decision and approval, see
// docs/student-bot/WHATSAPP_PLAN.md): `identity` (phone number -> student uid),
// `sessions` (per-student board/class/subject) and `dedupe` (message ids). With
// them missing, inbound messages get a 503 and nothing is processed or sent.
export function getWhatsappConfig(env = process.env) {
  return {
    appSecret: env.WHATSAPP_APP_SECRET || "",
    verifyToken: env.WHATSAPP_VERIFY_TOKEN || "",
    phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID || "",
  };
}

export function getWhatsappContext(env = process.env) {
  const config = getWhatsappConfig(env);
  const base = getRouteContext(); // throws if Firebase Admin is not configured
  return {
    config,
    deps: base.deps,
    sendText:
      createWhatsappSender({
        accessToken: env.WHATSAPP_ACCESS_TOKEN,
        phoneNumberId: config.phoneNumberId,
        graphVersion: env.WHATSAPP_GRAPH_VERSION,
      }) || undefined,
    identity: undefined,
    sessions: undefined,
    dedupe: undefined,
  };
}
