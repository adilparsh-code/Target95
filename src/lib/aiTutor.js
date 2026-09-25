/**
 * In-question tutor bridge.
 *
 * The real tutor runs server-side at POST /api/ai-tutor (OpenAI Responses API,
 * session + plan gated). This module never invents an answer:
 *
 *  - status "ok"      -> real AI reply, source "ai"
 *  - status anything else -> clearly-labelled deterministic study guidance
 *    built only from the question's own stored solution text, source "fallback",
 *    plus the server's honest reason so the UI can explain what happened.
 *
 * A signed-in student therefore always gets help, and is never told that a
 * canned template came from an AI.
 */

const ACTION_REQUESTS = {
  hint: "Give a short hint that starts the student on the right track. Do not give the full answer.",
  explanation: "Explain why the correct answer is correct, in simple exam-oriented language.",
  steps: "Give the step-by-step method a student should write in the answer sheet.",
  mistakes: "List the mistakes students usually make on this type of question and how to avoid them.",
  concepts: "List the key concepts tested by this question.",
  similar: "Suggest one similar question the student can practise next, and say what to change.",
  analysis: "Analyse the difficulty of this question and suggest a sensible time budget.",
};

function buildFallback(question, action) {
  const topic = question?.topic || question?.chapter || "this concept";
  const prompt = question?.prompt || question?.question || "the question";
  const storedAnswer = question?.explanation || question?.answer || question?.correctAnswer;

  const lines = [];

  if (action === "hint") {
    lines.push(
      `Start by identifying the main idea in ${topic}.`,
      `Re-read ${prompt} and list what is given and what is asked.`,
      "Then apply the rule or syntax for this chapter one step at a time."
    );
  } else if (action === "steps") {
    lines.push(
      "1. Read the question twice and underline what must be produced.",
      "2. Write down every given value, keyword or condition.",
      `3. Apply the ${topic} rule to each value in order.`,
      "4. Write the final answer in the format the question asks for.",
      "5. Re-check the answer against the question one more time."
    );
  } else if (action === "mistakes") {
    lines.push(
      "Common mistakes: skipping a condition, mixing up syntax, and not checking edge cases.",
      `For ${topic}, trace the answer on paper before writing it.`,
      "Check the output format — an exam often needs an exact label or spacing."
    );
  } else if (action === "concepts") {
    lines.push(
      `Key concepts: ${topic}, reading the question carefully, and input-process-output reasoning.`,
      "Revisit the chapter notes for this topic, then attempt a similar question."
    );
  } else if (action === "similar") {
    lines.push(
      `Take this question and change one value or one condition while keeping the same ${topic} idea.`,
      "Solving that variation is what builds transfer, not memorising one answer."
    );
  } else if (action === "analysis") {
    lines.push(
      `Difficulty: ${question?.difficulty || "Medium"}.`,
      `Suggested time: about ${question?.estimatedTime || 3} minutes.`,
      "If you run out of time, write the steps you have done — partial credit is common."
    );
  } else if (storedAnswer) {
    lines.push(String(storedAnswer));
  } else {
    lines.push(
      `This question tests ${topic}.`,
      "Open the chapter notes for this topic and attempt it again before revealing the answer."
    );
  }

  return lines.join("\n");
}

function formatAiReply(aiResponse) {
  if (!aiResponse) return "";
  if (typeof aiResponse === "string") return aiResponse;

  const parts = [];
  if (aiResponse.explanation) parts.push(String(aiResponse.explanation));
  if (Array.isArray(aiResponse.stepByStep) && aiResponse.stepByStep.length) {
    parts.push(aiResponse.stepByStep.map((step, i) => `${i + 1}. ${step}`).join("\n"));
  }
  if (aiResponse.example) parts.push(`Example: ${aiResponse.example}`);
  if (Array.isArray(aiResponse.keyPoints) && aiResponse.keyPoints.length) {
    parts.push(`Key points:\n- ${aiResponse.keyPoints.join("\n- ")}`);
  }
  if (Array.isArray(aiResponse.relatedTopics) && aiResponse.relatedTopics.length) {
    parts.push(`Related topics: ${aiResponse.relatedTopics.join(", ")}`);
  }

  return parts.join("\n\n").trim();
}

/**
 * Ask the tutor about a question.
 *
 * @returns {Promise<{status: string, source: "ai" | "fallback", text: string,
 *   error: string, requiresSignIn: boolean, signInHref: string | null}>}
 */
export async function getTutorResponse({ action, question, context = {} }) {
  const fallbackText = buildFallback(question, action);
  const instruction = ACTION_REQUESTS[action] || ACTION_REQUESTS.explanation;
  const questionText = question?.prompt || question?.question || question?.title || "";

  const fallback = (status, error, extra = {}) => ({
    status,
    source: "fallback",
    text: fallbackText,
    error,
    requiresSignIn: false,
    signInHref: null,
    ...extra,
  });

  if (!questionText.trim()) {
    return fallback("no_question", "There is no question text to send to the tutor.");
  }

  try {
    const response = await fetch("/api/ai-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: `${questionText}\n\n${instruction}`,
        subject: context.subject || question?.subject || "",
        chapter: context.chapter || question?.chapter || "",
        difficulty: context.difficulty || question?.difficulty || "",
        questionType: context.questionType || question?.type || "",
      }),
    });

    const payload = await response.json().catch(() => null);

    if (response.ok && payload?.ok) {
      const text = formatAiReply(payload.response);
      if (text) {
        return {
          status: "ok",
          source: "ai",
          text,
          error: "",
          requiresSignIn: false,
          signInHref: null,
        };
      }
    }

    if (response.status === 401) {
      return fallback("unauthenticated", "", {
        requiresSignIn: true,
        signInHref: `/login?next=${encodeURIComponent("/question-bank")}`,
        error: "Sign in to ask the AI Tutor about this question.",
      });
    }

    const reason =
      payload?.error ||
      (response.status === 429
        ? "You have used your AI Tutor limit for this hour. Please try again later."
        : "The AI Tutor is not available right now.");

    return fallback(payload?.status || "ai_error", reason);
  } catch {
    return fallback("offline", "The AI Tutor could not be reached. Showing study guidance instead.");
  }
}
