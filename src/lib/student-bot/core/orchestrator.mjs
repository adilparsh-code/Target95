import { INTENTS } from '../config/commands.mjs';
import { routeIntent } from './intent-router.mjs';
import { errorReply, reply } from './response-formatter.mjs';
import { handleChapters, handleHelp, handleSetContext, handleSubjects } from '../handlers/catalog.mjs';
import { handleExplain } from '../handlers/explain.mjs';
import { handleQuiz } from '../handlers/quiz.mjs';
import { handleHint, handlePractice, handleSolution } from '../handlers/practice.mjs';
import { handleProgress, handleRevision } from '../handlers/progress.mjs';

const HANDLERS = {
  [INTENTS.HELP]: handleHelp,
  [INTENTS.SET_CONTEXT]: handleSetContext,
  [INTENTS.SUBJECTS]: handleSubjects,
  [INTENTS.CHAPTERS]: handleChapters,
  [INTENTS.EXPLAIN]: handleExplain,
  [INTENTS.QUIZ]: handleQuiz,
  [INTENTS.PRACTICE]: handlePractice,
  [INTENTS.HINT]: handleHint,
  [INTENTS.SOLUTION]: handleSolution,
  [INTENTS.PROGRESS]: handleProgress,
  [INTENTS.REVISION]: handleRevision,
};

// `uid` comes only from the verified server session. `context` has already been
// shape-validated; handlers re-verify it against the curriculum.
export async function handleMessage({ message, context, uid, deps }) {
  const { intent, args } = routeIntent(message);
  const handler = HANDLERS[intent];
  if (!handler) {
    return reply('unknown', "I didn't understand that. Send HELP to see what I can do.", { quickReplies: ['HELP'] });
  }
  try {
    return await handler({ args, context, uid, deps });
  } catch (error) {
    deps.logger?.error?.('student-bot handler failed', { intent, name: error?.name });
    return errorReply('Something went wrong on my side. Please try again.', 'handler_failed');
  }
}
