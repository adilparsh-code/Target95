import { COMMAND_HELP, INTENTS } from '../config/commands.mjs';
import { bulletList, needsContextReply, reply } from '../core/response-formatter.mjs';

export function handleHelp({ deps }) {
  const lines = COMMAND_HELP.map((c) => `• ${c.command} — ${c.description}`).join('\n');
  const ai = deps.ai.isConfigured() ? 'AI explanations are enabled.' : 'AI is not configured, so my answers come straight from published BoardPrep content (deterministic).';
  return reply('help', `Hi! I'm the Target95 study assistant.\n${lines}\n\n${ai}`, { quickReplies: ['SUBJECTS', 'CHAPTERS', 'MY PROGRESS'] });
}

export function handleSetContext({ args, deps }) {
  const result = deps.boardprep.resolveContext(args.text || '');
  if (!result.ok) {
    const hint = {
      board_not_found: 'I could not find that board. Try icse, isc or cbse.',
      class_not_found: 'I could not find that class for the board.',
      subject_not_found: 'I could not find that subject. Send SET <board> class <n> and then SUBJECTS to see valid ones.',
    }[result.code];
    return reply('follow_up', hint || 'I could not understand that. Example: SET icse class 10 physics', { code: result.code });
  }
  return reply('context_set', `Okay — ${result.context.board.toUpperCase()}, ${result.subject.title}. Try CHAPTERS.`, {
    context: result.context,
    quickReplies: ['CHAPTERS', 'QUIZ', 'EXPLAIN'],
  });
}

export function handleSubjects({ context, deps }) {
  const verified = deps.boardprep.verifyContext(context);
  if (!verified.ok) return needsContextReply();
  const subjects = deps.boardprep.listSubjects(verified.context);
  if (!subjects.length) return reply('info', 'No subjects are listed for that class yet.');
  const titles = subjects.map((s) => `${s.title} (${s.slug})`);
  return reply('subjects', `Subjects for ${verified.context.board.toUpperCase()} ${verified.context.classSlug}:\n${bulletList(titles)}\n\nChoose one with SET ${verified.context.board} ${verified.context.classSlug.replace('class-', 'class ')} <subject>.`);
}

export function handleChapters({ context, deps }) {
  const verified = deps.boardprep.verifyContext(context);
  if (!verified.ok || !verified.context.subjectSlug) return needsContextReply();
  const chapters = deps.boardprep.listChapters(verified.context);
  if (!chapters.length) {
    return reply('info', `No chapters are published yet for ${verified.subject.title}. I will not guess at content that is not there.`);
  }
  const lines = chapters.map((c) => `${c.title}${c.syllabusStatus === 'unverified' ? ' (syllabus alignment not yet verified)' : ''}`);
  return reply('chapters', `Published chapters — ${verified.subject.title}:\n${bulletList(lines)}`, { intent: INTENTS.CHAPTERS });
}
