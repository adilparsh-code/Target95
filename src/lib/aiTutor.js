// Provider boundary for future OpenAI, Claude, or Gemini integrations.
// Replace this function with a server-side provider call without changing the UI.
export async function getTutorResponse({ action, question }) {
  const topic = question.topic || question.chapter || "this concept";
  const prompt = question.prompt || question.question || "the question";
  const responses = {
    hint: `Start by identifying the key Java concept in ${topic}. Break ${prompt} into the input, processing, and required output before writing your answer.`,
    explanation: question.explanation || `The answer depends on applying ${topic} carefully. Read each condition or statement in order and verify the final result.`,
    steps: `1. Identify what the question asks.\n2. List the values or rules involved.\n3. Apply ${topic} one step at a time.\n4. Check that the final answer addresses every requirement.`,
    mistakes: `Common mistakes: skipping a condition, mixing up syntax, and not checking edge cases. For ${topic}, trace the answer before finalising it.`,
    concepts: `Key concepts: ${topic}, ${question.chapter || "Java fundamentals"}, and clear input-process-output reasoning.`,
    similar: `Try a similar question that changes one input or condition while still using ${topic}. This builds transfer skills without memorising one answer.`,
    analysis: `Difficulty: ${question.difficulty || "Medium"}. Allow about ${question.estimatedTime || 3} minutes, then review the concept if you are still unsure.`,
  };
  return responses[action] || responses.explanation;
}
