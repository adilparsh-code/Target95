import { INTENTS, LIMITS } from '../config/commands.mjs';

const clean = (text) => text.normalize('NFC').trim().replace(/\s+/g, ' ');
const strip = (text) => text.replace(/[?!.,;:]+$/g, '').trim();

// "quiz electricity 10" -> { topic: 'electricity', count: 10 }
function splitCount(rest) {
  if (/^\d{1,2}$/.test(rest.trim())) return { topic: '', count: Number(rest.trim()) };
  const match = rest.match(/^(.*?)(?:\s+(\d{1,2}))?(?:\s+questions?)?$/i);
  const topic = strip(match?.[1] ?? rest);
  const count = match?.[2] ? Number(match[2]) : null;
  return { topic, count };
}

const RULES = [
  [INTENTS.HELP, /^(help|menu|commands|hi|hello|hey|start|\?)$/i],
  [INTENTS.HELP, /^(what can you do|how do i use (this|you))$/i],
  [INTENTS.SUBJECTS, /^(?:show |list |my |all )*subjects?$/i],
  [INTENTS.PROGRESS, /^(my progress|progress|my results|how am i doing|show my progress)$/i],
  [INTENTS.REVISION, /^(revision|revise|what should i (revise|revisit)|my revision|revision plan)$/i],
];

export function routeIntent(input) {
  if (typeof input !== 'string') return { intent: INTENTS.UNKNOWN, args: {} };
  const text = strip(clean(input));
  if (!text) return { intent: INTENTS.UNKNOWN, args: {} };

  for (const [intent, pattern] of RULES) {
    if (pattern.test(text)) return { intent, args: {} };
  }

  let m;
  if ((m = text.match(/^(?:set|use|switch to|choose)\s+(.+)$/i))) {
    return { intent: INTENTS.SET_CONTEXT, args: { text: m[1] } };
  }
  if ((m = text.match(/^(?:show |list |all |published )*chapters?(?:\s+(?:of|in|for))?\s*(.*)$/i))) {
    return { intent: INTENTS.CHAPTERS, args: { topic: m[1] } };
  }
  if ((m = text.match(/^(?:explain|teach me|teach|learn|summary of|summarise|summarize|tell me about|what is|what are)\s+(.+)$/i))) {
    return { intent: INTENTS.EXPLAIN, args: { topic: strip(m[1]) } };
  }
  if ((m = text.match(/^(?:start (?:a )?quiz(?: on| for)?|quiz me on|quiz me|test me on|test me|quiz)\s*(.*)$/i))) {
    const { topic, count } = splitCount(m[1] || '');
    return { intent: INTENTS.QUIZ, args: { topic, count } };
  }
  if ((m = text.match(/^hint\s+(\d{1,3})$/i))) {
    return { intent: INTENTS.HINT, args: { number: Number(m[1]) } };
  }
  if ((m = text.match(/^(?:solution|answer|show solution)\s+(\d{1,3})$/i))) {
    return { intent: INTENTS.SOLUTION, args: { number: Number(m[1]) } };
  }
  if ((m = text.match(/^(?:practice|practise|programming practice|give me (?:a )?(?:java )?(?:programming )?(?:problem|question)s?(?: on| about)?)\s*(.*)$/i))) {
    return { intent: INTENTS.PRACTICE, args: { topic: strip(m[1] || '') } };
  }
  return { intent: INTENTS.UNKNOWN, args: {} };
}

export const isValidQuizSize = (count) => LIMITS.quizSizes.includes(count);
