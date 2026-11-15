import { needsContextReply, reply, truncate } from '../core/response-formatter.mjs';

const MAX_LESSON_CHARS = 260;
const MAX_TOTAL_CHARS = 2400;

function firstText(blocks = []) {
  for (const block of blocks) {
    if (block?.type === 'paragraph' && block.text) return block.text;
    if (block?.type === 'terms' && block.items?.[0]) return `${block.items[0].term}: ${block.items[0].meaning}`;
    if (block?.type === 'bullets' && block.items?.[0]) return block.items[0];
    if (block?.text) return block.text;
  }
  return '';
}

export function summariseChapter(chapter) {
  const parts = [chapter.title];
  if (chapter.tagline) parts.push(chapter.tagline);
  if (typeof chapter.overview === 'string' && chapter.overview) parts.push(truncate(chapter.overview, 500));
  const points = Array.isArray(chapter.keyPoints) ? chapter.keyPoints.slice(0, 5) : [];
  if (points.length) parts.push(`Key points:\n${points.map((p) => `• ${p}`).join('\n')}`);
  const lessons = Array.isArray(chapter.learn) ? chapter.learn.slice(0, 5) : [];
  if (lessons.length) {
    parts.push(
      `Lessons:\n${lessons
        .map((l) => `• ${l.title}${firstText(l.blocks) ? ` — ${truncate(firstText(l.blocks), MAX_LESSON_CHARS)}` : ''}`)
        .join('\n')}`,
    );
  }
  return truncate(parts.join('\n\n'), MAX_TOTAL_CHARS);
}

export function handleExplain({ args, context, deps }) {
  const verified = deps.boardprep.verifyContext(context);
  if (!verified.ok || !verified.context.subjectSlug) return needsContextReply();
  if (!args.topic) return reply('follow_up', 'Which chapter? Send CHAPTERS to see the list, then EXPLAIN <chapter>.');

  const found = deps.boardprep.findChapter(verified.context, args.topic);
  if (found.status === 'none') {
    return reply('info', `I could not find a published chapter matching "${truncate(args.topic, 60)}". Send CHAPTERS to see what is available.`);
  }
  if (found.status === 'ambiguous') {
    return reply('follow_up', `That matches several chapters:\n${found.matches.map((c) => `• ${c.title}`).join('\n')}\nPlease be more specific.`);
  }
  const loaded = deps.boardprep.loadChapter(verified.context, found.matches[0].slug);
  if (!loaded.ok) {
    return reply('info', 'That chapter is not available right now.', { code: loaded.code });
  }
  const note = found.matches[0].syllabusStatus === 'unverified' ? '\n\nNote: this chapter\'s syllabus alignment has not been verified yet.' : '';
  return reply('explain', `${summariseChapter(loaded.chapter)}${note}`, {
    chapter: { slug: found.matches[0].slug, title: loaded.chapter.title },
    quickReplies: [`QUIZ ${found.matches[0].slug}`],
  });
}
