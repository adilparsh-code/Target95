import { createHmac, timingSafeEqual } from 'node:crypto';

// Meta signs every webhook POST with HMAC-SHA256 of the RAW request body, keyed
// with the app secret, and sends it as `X-Hub-Signature-256: sha256=<hex>`.
// Anything that does not verify is rejected before the body is parsed.
const SIGNATURE = /^sha256=([0-9a-f]{64})$/i;

export function verifyMetaSignature({ rawBody, signatureHeader, appSecret }) {
  if (typeof rawBody !== 'string' || typeof appSecret !== 'string' || !appSecret) return false;
  const match = SIGNATURE.exec(String(signatureHeader ?? '').trim());
  if (!match) return false;
  const expected = createHmac('sha256', appSecret).update(rawBody, 'utf8').digest();
  const received = Buffer.from(match[1], 'hex');
  return received.length === expected.length && timingSafeEqual(received, expected);
}

// Constant-time string comparison for the webhook verify token.
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || !a || !b) return false;
  const left = createHmac('sha256', 'cmp').update(a).digest();
  const right = createHmac('sha256', 'cmp').update(b).digest();
  return timingSafeEqual(left, right);
}
