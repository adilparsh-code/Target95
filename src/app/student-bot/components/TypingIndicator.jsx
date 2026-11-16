export default function TypingIndicator() {
  return (
    <div role="status" aria-label="Assistant is typing" className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm dark:bg-slate-800">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-slate-400 motion-reduce:animate-none" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  );
}
