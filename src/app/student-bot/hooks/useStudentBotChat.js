"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  apiErrorText,
  clearHistory,
  createMessage,
  formatQuizResult,
  loadHistory,
  saveHistory,
} from "@/lib/student-bot/ui/chat-state.mjs";

const CHAT_URL = "/api/student-bot/chat";
const safeStorage = () => {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
};

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  return { response, data };
}

export function useStudentBotChat(uid) {
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState({});
  const [hydrated, setHydrated] = useState(false);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!uid) return;
    const stored = loadHistory(safeStorage(), uid);
    setMessages(stored.messages);
    setContext(stored.context);
    setHydrated(true);
  }, [uid]);

  useEffect(() => {
    if (hydrated && uid) saveHistory(safeStorage(), uid, { messages, context });
  }, [hydrated, uid, messages, context]);

  const append = useCallback((message) => setMessages((prev) => [...prev, message]), []);

  const send = useCallback(
    async (text) => {
      const value = String(text ?? "").trim();
      if (!value || inFlight.current) return;
      inFlight.current = true;
      setSending(true);
      append(createMessage({ role: "user", text: value }));
      try {
        const { response, data } = await postJson(CHAT_URL, { message: value, context });
        if (response.ok && data?.ok && data.reply) {
          const { reply } = data;
          if (reply.context) setContext(reply.context);
          append(createMessage({ role: "bot", text: reply.text, kind: reply.kind, card: reply.card ?? null, mode: reply.mode }));
        } else {
          append(createMessage({ role: "bot", kind: "error", text: apiErrorText(response.status, data) }));
        }
      } catch {
        append(createMessage({ role: "bot", kind: "error", text: "I could not reach the server. Check your connection and try again." }));
      } finally {
        inFlight.current = false;
        setSending(false);
      }
    },
    [append, context],
  );

  const submitQuiz = useCallback(
    async (attemptId, answers) => {
      // One submission per attempt from the UI; the server enforces it too.
      if (submitted[attemptId]) return;
      setSubmitted((prev) => ({ ...prev, [attemptId]: true }));
      try {
        const { response, data } = await postJson(`/api/student-bot/quiz/${encodeURIComponent(attemptId)}/submit`, { answers });
        if (response.ok && data?.ok) {
          append(createMessage({ role: "bot", kind: "quiz_result", text: formatQuizResult(data.result) }));
        } else {
          if (response.status !== 409) setSubmitted((prev) => ({ ...prev, [attemptId]: false }));
          append(createMessage({ role: "bot", kind: "error", text: response.status === 409 ? "This quiz was already submitted." : apiErrorText(response.status, data) }));
        }
      } catch {
        setSubmitted((prev) => ({ ...prev, [attemptId]: false }));
        append(createMessage({ role: "bot", kind: "error", text: "I could not submit that quiz. Please try again." }));
      }
    },
    [append, submitted],
  );

  const reset = useCallback(() => {
    setMessages([]);
    setContext({});
    setSubmitted({});
    clearHistory(safeStorage(), uid);
  }, [uid]);

  return { messages, context, sending, submitted, hydrated, send, submitQuiz, reset };
}
