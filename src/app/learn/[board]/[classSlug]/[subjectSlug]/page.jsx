import Link from 'next/link';
import { getChapterQuestionCounts, getSubject, getPublishedChapters } from '@/lib/boardprepCurriculum.mjs';
import { getSubjectChapterSequence } from '@/lib/boardprepChapterNav.mjs';
import { notFound } from 'next/navigation';

export default async function SubjectPage({ params }) {
  const { board, classSlug, subjectSlug } = await params;
  const subject = getSubject(board, classSlug, subjectSlug);
  if (!subject) notFound();

  const chapters = getPublishedChapters(board, classSlug, subjectSlug);
  const sequence = getSubjectChapterSequence(board, classSlug, subjectSlug);
  const counts = getChapterQuestionCounts(board, classSlug, subjectSlug);
  const totalQuestions = chapters.reduce((total, chapter) => total + (counts.get(chapter.slug) || 0), 0);

  const groups = [];
  for (const chapter of sequence) {
    let group = groups.find((item) => item.id === chapter.groupId);
    if (!group) {
      group = { id: chapter.groupId, title: chapter.groupTitle, chapters: [] };
      groups.push(group);
    }
    group.chapters.push(chapter);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href={`/learn/${board}/${classSlug}`} className="text-sm font-medium text-slate-600">
          ← Subjects
        </Link>
        <h1 className="mt-6 text-4xl font-bold">{subject.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{subject.description}</p>

        {chapters.length > 0 && (
          <p className="mt-4 text-sm font-semibold text-blue-700">
            {chapters.length} published chapter{chapters.length === 1 ? '' : 's'} · {totalQuestions} practice question
            {totalQuestions === 1 ? '' : 's'}
          </p>
        )}

        <section className="mt-8 space-y-8">
          {groups.map((group) => (
            <div key={group.id}>
              <h2 className="text-lg font-bold text-slate-800">{group.title}</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {group.chapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/learn/${board}/${classSlug}/${subjectSlug}/${chapter.slug}`}
                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <h3 className="font-bold">{chapter.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{chapter.blurb}</p>
                    <p className="mt-3 text-xs font-semibold text-blue-700">
                      {counts.get(chapter.slug) || 0} practice question{(counts.get(chapter.slug) || 0) === 1 ? '' : 's'} →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {!chapters.length && (
            <p className="text-slate-600">Content for this registered subject has not been published yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
