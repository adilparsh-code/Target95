// WhatsApp Channel + share helpers. Pure functions, no browser or Node APIs, so
// they run in components, server code and tests alike.
//
// Privacy by design (the audience is mostly under 18): nothing here collects or
// stores anything about the reader, and shared links carry no tracking
// parameters. The Channel link is public and not a secret.
const CHANNEL_HOSTS = new Set(["whatsapp.com", "www.whatsapp.com"]);
const CHANNEL_ID = /^[A-Za-z0-9]{10,40}$/;
const MAX_TITLE_CHARS = 120;
const MAX_SHARE_TEXT_CHARS = 1000;

// Accepts only https://whatsapp.com/channel/<id>. Any query string or hash
// (WhatsApp adds `?mode=...` to shared links) is dropped. Anything else is
// rejected, never "fixed", so a typo or a look-alike domain cannot be linked.
export function parseChannelUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
  if (!CHANNEL_HOSTS.has(url.hostname.toLowerCase())) return null;
  const match = /^\/channel\/([^/]+)\/?$/.exec(url.pathname);
  if (!match || !CHANNEL_ID.test(match[1])) return null;
  return `https://whatsapp.com/channel/${match[1]}`;
}

// A page URL for sharing: http(s) only, path kept, query and hash removed so
// study state such as ?board=... or ?chapter=... is never leaked.
export function cleanPageUrl(value) {
  if (typeof value !== "string") return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if ((url.protocol !== "https:" && url.protocol !== "http:") || url.username || url.password) return null;
  return `${url.origin}${url.pathname}`;
}

const cleanTitle = (title) =>
  String(title ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_TITLE_CHARS);

// Plain text for a WhatsApp message or a Channel post. Returns "" when there is
// nothing meaningful to share.
export function buildSharePost({ title, pageUrl, channelUrl } = {}) {
  const safeTitle = cleanTitle(title);
  const page = cleanPageUrl(pageUrl);
  if (!safeTitle || !page) return "";
  const lines = [`📘 ${safeTitle}`, "", "Read the full chapter on Target95+:", page];
  const channel = parseChannelUrl(channelUrl);
  if (channel) lines.push("", "Follow our WhatsApp Channel for daily lessons:", channel);
  return lines.join("\n").slice(0, MAX_SHARE_TEXT_CHARS);
}

export function buildWhatsappShareUrl(text) {
  const body = String(text ?? "").trim();
  if (!body) return null;
  return `https://wa.me/?text=${encodeURIComponent(body.slice(0, MAX_SHARE_TEXT_CHARS))}`;
}
