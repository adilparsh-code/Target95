import javaQuestions from '../../../app/data/programming/java/questions.js';

// Java practice source. Only fields present in the data are ever shown; there is
// no hints field, so the stored `algorithm` text is the hint. Student code is
// never executed.
const norm = (text) => String(text ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function createProgrammingAdapter(source = javaQuestions) {
  const items = (Array.isArray(source) ? source : []).filter(
    (q) => q && Number.isInteger(q.id) && q.title && q.question && String(q.language || 'Java') === 'Java',
  );
  const view = (q) => ({
    number: q.id,
    title: q.title,
    topic: q.topic || '',
    chapter: q.chapter || '',
    difficulty: q.difficulty || '',
    question: q.question,
    constraints: q.constraints || '',
    sampleInput: q.sampleInput ?? '',
    sampleOutput: q.sampleOutput ?? '',
  });

  return {
    count: () => items.length,
    topics: () => [...new Set(items.map((q) => q.topic).filter(Boolean))],
    search(topic, limit = 5) {
      const t = norm(topic);
      const pool = t
        ? items.filter((q) => [q.topic, q.chapter, q.title, ...(q.tags || [])].some((f) => norm(f).includes(t)))
        : items;
      return pool.slice(0, limit).map(view);
    },
    byNumber(number) {
      const q = items.find((item) => item.id === number);
      return q ? { ...view(q), hint: q.algorithm || '', solution: q.code || '', explanation: q.explanation || '' } : null;
    },
  };
}
