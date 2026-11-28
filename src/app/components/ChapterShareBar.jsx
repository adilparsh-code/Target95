"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { buildSharePost, buildWhatsappShareUrl, parseChannelUrl } from "../../lib/whatsappChannel.mjs";
import WhatsAppChannelLink from "./WhatsAppChannelLink";

// End-of-chapter bar: share the chapter on WhatsApp, copy a ready-made post
// (paste it into your WhatsApp Channel or a group), or follow the Channel.
// Nothing about the reader is collected, and no tracking parameters are added.
const COPIED_RESET_MS = 2500;

export default function ChapterShareBar({ title }) {
  const [pageUrl, setPageUrl] = useState("");
  const [status, setStatus] = useState("");

  // The address is only known in the browser. Query and hash are dropped later
  // by buildSharePost so study state never ends up in a shared link.
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!status) return undefined;
    const timer = setTimeout(() => setStatus(""), COPIED_RESET_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const channelUrl = parseChannelUrl(process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL);
  const post = buildSharePost({ title, pageUrl, channelUrl });
  const shareHref = buildWhatsappShareUrl(post);
  if (!shareHref) return null;

  const copyPost = async () => {
    try {
      await navigator.clipboard.writeText(post);
      setStatus("Post copied");
    } catch {
      setStatus("Copy is not available in this browser");
    }
  };

  const buttonClass =
    "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <section aria-label="Share this chapter" className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
      <h2 className="text-sm font-bold text-slate-900 dark:text-white">Found this useful?</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Send it to a classmate on WhatsApp.</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a href={shareHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span>Share on WhatsApp</span>
          <span className="sr-only"> (opens WhatsApp in a new tab)</span>
        </a>
        <button type="button" onClick={copyPost} className={buttonClass}>
          {status === "Post copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          <span>Copy post</span>
        </button>
        <WhatsAppChannelLink className={`${buttonClass} text-emerald-700 dark:text-emerald-300`}>Follow our Channel</WhatsAppChannelLink>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-[1.25rem] text-xs font-medium text-emerald-700 dark:text-emerald-300">
        {status}
      </p>
    </section>
  );
}
