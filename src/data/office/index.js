import word from './word.json';
import excel from './excel.json';
import powerpoint from './powerpoint.json';

export const officeApps = [
  { id: 'word', name: 'Word', description: 'Write, format and create professional documents.', chapters: word, accent: 'text-blue-700 dark:text-blue-300' },
  { id: 'excel', name: 'Excel', description: 'Work with data, formulas, functions, tables and charts.', chapters: excel, accent: 'text-emerald-700 dark:text-emerald-300' },
  { id: 'powerpoint', name: 'PowerPoint', description: 'Create clear presentations with purposeful visuals.', chapters: powerpoint, accent: 'text-orange-700 dark:text-orange-300' },
];
export const getOfficeApp = (id) => officeApps.find((app) => app.id === id);
export const officeChapterKey = (appId, chapterId) => `office-${appId}-${chapterId}`;
export function searchOfficeContent(query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return officeApps.flatMap((app) => app.chapters.filter((chapter) => {
    const text = [app.name, chapter.title, chapter.description, ...chapter.steps, ...chapter.concepts].join(' ').toLowerCase();
    return terms.every((term) => text.includes(term));
  }).map((chapter) => ({ id: officeChapterKey(app.id, chapter.id), title: `${app.name}: ${chapter.title}`, description: chapter.description, href: `/office/${app.id}/${chapter.id}`, type: 'chapter' })));
}
export function canCompleteOfficeChapter(chapter, { checks, independent, challengeDone, answers }) {
  return chapter.guidedPractical.checklist.every((_, index) => checks[index]) && independent && challengeDone && chapter.mcqs.every((question) => answers[question.id] === question.answer);
}
