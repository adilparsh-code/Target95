import { MessageCircle } from "lucide-react";
import { parseChannelUrl } from "../../lib/whatsappChannel.mjs";

// "Follow our WhatsApp Channel" link. Renders nothing until a valid Channel URL
// is configured, so the site never shows an empty or broken button.
// NEXT_PUBLIC_* is inlined at build time, so redeploy after changing it.
export default function WhatsAppChannelLink({ className = "", children = "WhatsApp Channel" }) {
  const channelUrl = parseChannelUrl(process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL);
  if (!channelUrl) return null;

  return (
    <a
      href={channelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span>{children}</span>
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
