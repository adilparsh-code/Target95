import { reply, truncate } from '../core/response-formatter.mjs';

const problemText = (p) =>
  [
    `#${p.number} ${p.title} (${[p.difficulty, p.topic].filter(Boolean).join(', ')})`,
    p.question,
    p.constraints && `Constraints: ${p.constraints}`,
    `Example input:\n${p.sampleInput}`,
    `Example output:\n${p.sampleOutput}`,
  ]
    .filter(Boolean)
    .join('\n');

export function handlePractice({ args, deps }) {
  const problems = deps.programming.search(args.topic, 3);
  if (!problems.length) {
    const topics = deps.programming.topics().slice(0, 8).join(', ');
    return reply('info', `I have no Java practice problem for "${truncate(args.topic, 60)}". Topics I have: ${topics}.`);
  }
  const body = problems.map(problemText).join('\n\n');
  return reply('practice', `${body}\n\nSend HINT <number> or SOLUTION <number>. I never run your code — try it yourself first.`, {
    quickReplies: problems.slice(0, 1).map((p) => `HINT ${p.number}`),
  });
}

export function handleHint({ args, deps }) {
  const p = deps.programming.byNumber(args.number);
  if (!p) return reply('info', `There is no practice problem #${args.number}.`);
  return reply('hint', p.hint ? `Hint for #${p.number}: ${p.hint}` : `No hint is stored for #${p.number}.`);
}

export function handleSolution({ args, deps }) {
  const p = deps.programming.byNumber(args.number);
  if (!p) return reply('info', `There is no practice problem #${args.number}.`);
  if (!p.solution) return reply('info', `No sample solution is stored for #${p.number}.`);
  return reply('solution', `Sample solution for #${p.number} ${p.title}:\n${p.solution}\n\n${p.explanation}`.trim(), { format: 'code' });
}
