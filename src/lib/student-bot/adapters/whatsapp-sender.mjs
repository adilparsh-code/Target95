// Sends one plain-text WhatsApp message through the Cloud API. `fetchImpl` is
// injectable so tests never touch the network. Errors carry only the HTTP
// status: never the access token, the recipient number or the message body.
const DEFAULT_GRAPH_VERSION = 'v21.0';
const GRAPH_VERSION = /^v\d{1,2}\.\d{1,2}$/;
const SEND_TIMEOUT_MS = 8000;

export class WhatsappSendError extends Error {
  constructor(status) {
    super(`WhatsApp send failed (${status})`);
    this.name = 'WhatsappSendError';
    this.status = status;
  }
}

export function createWhatsappSender({ accessToken, phoneNumberId, graphVersion, fetchImpl = globalThis.fetch } = {}) {
  if (!accessToken || !phoneNumberId || !/^\d{5,25}$/.test(String(phoneNumberId))) return null;
  const version = GRAPH_VERSION.test(String(graphVersion ?? '')) ? graphVersion : DEFAULT_GRAPH_VERSION;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  return async function sendText(to, body) {
    const response = await fetchImpl(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', to, type: 'text', text: { preview_url: false, body } }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
    if (!response.ok) throw new WhatsappSendError(response.status);
  };
}
