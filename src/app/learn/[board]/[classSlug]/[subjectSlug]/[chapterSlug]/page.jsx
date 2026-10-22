import Link from 'next/link';
import { getChapter } from '@/lib/boardprepCurriculum.mjs';
import { getChapterBreadcrumbs, getChapterNeighbours } from '@/lib/boardprepChapterNav.mjs';
import { notFound } from 'next/navigation';

import AssessmentPanel from '@/app/components/boardprep/AssessmentPanel';
import ChapterBlock from '@/app/components/boardprep/ChapterBlock';
import ChapterBreadcrumbs from '@/app/components/boardprep/ChapterBreadcrumbs';
import ChapterPager from '@/app/components/boardprep/ChapterPager';
import PracticeCard from '@/app/components/boardprep/PracticeCard';

export default async function ChapterPage({ params }) {
  const { board, classSlug, subjectSlug, chapterSlug } = await params;
  const chapter = getChapter(board, classSlug, subjectSlug, chapterSlug);
  if (!chapter) notFound();

  const subjectHref = `/learn/${board}/${classSlug}/${subjectSlug}`;
  const breadcrumbs = getChapterBreadcrumbs(board, classSlug, subjectSlug, chapterSlug);
  const { previous, next, position, total } = getChapterNeighbours(board, classSlug, subjectSlug, chapterSlug);
  const chapterHref = (item) => `${subjectHref}/${item.slug}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <ChapterBreadcrumbs trail={breadcrumbs} />

        <h1 className="mt-6 text-4xl font-bold">{chapter.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{chapter.tagline}</p>

        {chapter.learningOutcomes?.length > 0 && (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold">Learning outcomes</h2>
            <p className="mt-1 text-sm text-slate-600">After studying this chapter you should be able to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {chapter.learningOutcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
        )}

        {chapter.overview && (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold">Overview</h2>
            <p className="mt-3 text-slate-700">{chapter.overview.intro}</p>
            {chapter.overview.facts?.length > 0 && (
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {chapter.overview.facts.map((fact) => (
                  <div key={fact.label} className="rounded-xl bg-slate-50 p-3">
                    <dt className="text-sm font-semibold text-slate-500">{fact.label}</dt>
                    <dd className="mt-1 text-sm text-slate-800">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        )}

        <section className="mt-8 space-y-6">
          {chapter.learn?.map((lesson) => (
            <article key={lesson.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold">{lesson.title}</h2>
              {lesson.blocks?.map((block, index) => (
                <div key={index} className="mt-4 text-slate-700">
                  <ChapterBlock block={block} />
                </div>
              ))}
            </article>
          ))}
        </section>

        {chapter.figures?.length > 0 && (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold">Figures to know</h2>
            <p className="mt-2 text-sm text-slate-600">
              Study each labelled structure. Draw and label these diagrams from memory for revision.
            </p>
            <div className="mt-5 space-y-4">
              {chapter.figures.map((figure) => (
                <figure key={figure.caption} className="rounded-xl border border-slate-200 p-4">
                  <figcaption className="font-semibold text-slate-800">{figure.caption}</figcaption>
                  {figure.description && <p className="mt-2 text-sm text-slate-600">{figure.description}</p>}
                  {figure.labels?.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {figure.labels.map((label) => (
                        <li key={label} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200">
                          {label}
                        </li>
                      ))}
                    </ul>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {chapter.keyPoints?.length > 0 && (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold">Key points</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {chapter.keyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {chapter.examFocus?.length > 0 && (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold">Exam focus</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {chapter.examFocus.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {chapter.vocabulary?.length > 0 && (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold">Vocabulary</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {chapter.vocabulary.map((item) => (
                <div key={item.word} className="rounded-xl bg-slate-50 p-3">
                  <dt className="font-semibold text-slate-800">{item.word}</dt>
                  <dd className="mt-1 text-sm text-slate-600">{item.meaning}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {chapter.assessment && <AssessmentPanel assessment={chapter.assessment} />}

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold">Practice</h2>
          <div className="mt-5 space-y-4">
            {chapter.questions?.map((question, index) => (
              <PracticeCard key={question.id} question={question} number={index + 1} />
            ))}
          </div>
        </section>

        <ChapterPager
          previous={previous ? { title: previous.title, href: chapterHref(previous) } : null}
          next={next ? { title: next.title, href: chapterHref(next) } : null}
          position={position}
          total={total}
        />

        <p className="mt-6 text-center text-sm">
          <Link href={subjectHref} className="font-medium text-slate-600 hover:text-blue-700">
            ← All {chapter.kind === 'geography' ? 'geography' : 'subject'} chapters
          </Link>
        </p>
      </div>
    </main>
  );
}
