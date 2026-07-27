"use client";

export default function MotivationPanel({ messages }) { return <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6"><h2 className="text-xl font-bold text-gray-900">Keep your momentum</h2><ul className="mt-4 space-y-3">{messages.map((message) => <li key={message} className="rounded-xl bg-white/80 p-3 text-sm font-medium text-gray-700">{message}</li>)}</ul></section>; }
