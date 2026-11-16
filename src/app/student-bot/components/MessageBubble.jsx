const time = (ts) => (ts ? new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "");

// Text is always rendered as a React text node (escaped). There is no HTML or
// Markdown interpretation anywhere in the chat.
export default function MessageBubble({ message, children }) {
  const mine = message.role === "user";
  const isError = message.kind === "error";
  const tone = mine
    ? "ml-auto rounded-br-sm bg-[#d9fdd3] text-slate-900 dark:bg-emerald-800 dark:text-emerald-50"
    : isError
      ? "mr-auto rounded-bl-sm border border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
      : "mr-auto rounded-bl-sm bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100";
  return (
    <div className={`max-w-[88%] rounded-2xl px-3 py-2 shadow-sm sm:max-w-[75%] ${tone}`}>
      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.text}</p>
      {children}
      <p className="mt-1 flex items-center justify-end gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        {message.mode === "deterministic" && <span>from course content</span>}
        <time dateTime={message.ts ? new Date(message.ts).toISOString() : undefined}>{time(message.ts)}</time>
      </p>
    </div>
  );
}
