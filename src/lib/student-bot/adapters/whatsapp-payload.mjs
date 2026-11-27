// Reads a WhatsApp Cloud API webhook payload into plain inbound messages.
// Defensive by design: unknown shapes yield no messages rather than throwing,
// and only text messages sent to OUR configured phone number id are returned.
export const MAX_MESSAGES_PER_PAYLOAD = 20;
const PHONE = /^\d{6,15}$/;
const MESSAGE_ID = /^[A-Za-z0-9=_.:-]{8,200}$/;

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export function parseInboundMessages(payload, { phoneNumberId } = {}) {
  const messages = [];
  if (!isObject(payload) || payload.object !== 'whatsapp_business_account' || !Array.isArray(payload.entry)) return messages;

  for (const entry of payload.entry) {
    for (const change of Array.isArray(entry?.changes) ? entry.changes : []) {
      const value = change?.value;
      if (change?.field !== 'messages' || !isObject(value) || !Array.isArray(value.messages)) continue;
      // Reject traffic addressed to some other number on the same app.
      if (phoneNumberId && value.metadata?.phone_number_id !== phoneNumberId) continue;

      for (const message of value.messages) {
        if (messages.length >= MAX_MESSAGES_PER_PAYLOAD) return messages;
        if (!isObject(message) || !PHONE.test(String(message.from ?? '')) || !MESSAGE_ID.test(String(message.id ?? ''))) continue;
        const isText = message.type === 'text' && typeof message.text?.body === 'string';
        messages.push({
          id: String(message.id),
          from: String(message.from),
          kind: isText ? 'text' : 'unsupported',
          text: isText ? message.text.body : '',
        });
      }
    }
  }
  return messages;
}
