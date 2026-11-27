// Turns a bot reply into WhatsApp-sized plain-text messages. WhatsApp accepts at
// most 4096 characters per text message; shorter chunks read better on a phone.
// Output is plain text only: nothing is added that WhatsApp could render as a
// link preview, and no HTML or Markdown is generated here.
export const MAX_CHUNK_CHARS = 1200;
export const MAX_CHUNKS = 4;

const MORE_NOTE = '\n\n(Reply with a more specific request to see the rest.)';

function splitLong(line, max) {
  const parts = [];
  let rest = line;
  while (rest.length > max) {
    const cut = rest.lastIndexOf(' ', max);
    const at = cut > max / 2 ? cut : max;
    parts.push(rest.slice(0, at).trimEnd());
    rest = rest.slice(at).trimStart();
  }
  if (rest) parts.push(rest);
  return parts;
}

export function splitForWhatsApp(text, { max = MAX_CHUNK_CHARS, maxChunks = MAX_CHUNKS } = {}) {
  const clean = String(text ?? '').replace(/\r\n?/g, '\n').trim();
  if (!clean) return [];
  const chunks = [];
  let current = '';
  for (const line of clean.split('\n').flatMap((l) => (l.length > max ? splitLong(l, max) : [l]))) {
    const next = current ? `${current}\n${line}` : line;
    if (next.length > max && current) {
      chunks.push(current);
      current = line;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);
  if (chunks.length <= maxChunks) return chunks;
  const kept = chunks.slice(0, maxChunks);
  kept[maxChunks - 1] = `${kept[maxChunks - 1].slice(0, max - MORE_NOTE.length).trimEnd()}${MORE_NOTE}`;
  return kept;
}

// `reply` is the orchestrator's { kind, text, quickReplies? } shape. Quick
// replies become a plain "Try: A | B" line because WhatsApp buttons need an
// extra interactive-message integration that is not built yet.
export function formatReplyForWhatsApp(reply) {
  const base = String(reply?.text ?? '').trim();
  const quick = Array.isArray(reply?.quickReplies) && reply.quickReplies.length
    ? `\n\nTry: ${reply.quickReplies.map(String).join(' | ')}`
    : '';
  return splitForWhatsApp(`${base}${quick}`);
}
