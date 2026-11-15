import { LIMITS } from '../config/commands.mjs';

// Replies are plain text plus an optional structured card. The UI renders text
// as text; nothing here produces HTML or Markdown that could be interpreted.
export const MODES = Object.freeze({ DETERMINISTIC: 'deterministic', AI: 'ai' });

export function reply(kind, text, extra = {}) {
  return { kind, text, mode: MODES.DETERMINISTIC, ...extra };
}

export function errorReply(text, code = 'bot_error') {
  return reply('error', text, { code });
}

export const truncate = (text, max) => {
  const value = String(text ?? '');
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
};

export function bulletList(items, max = LIMITS.maxListItems) {
  const shown = items.slice(0, max).map((item, i) => `${i + 1}. ${item}`);
  if (items.length > max) shown.push(`…and ${items.length - max} more.`);
  return shown.join('\n');
}

export const needsContextReply = () =>
  reply(
    'follow_up',
    'Which board, class and subject? Send for example: SET icse class 10 physics\nThen try SUBJECTS or CHAPTERS.',
    { needs: 'context' },
  );
