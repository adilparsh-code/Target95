import Link from "next/link";
import javaChapters from "../data/javaChapters";

export default function JavaPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Java Practice</p>
          <h1 className="mt-3 text-5xl font-bold text-blue-700">Java Programming</h1>
          <p className="mt-4 text-lg text-gray-600">Select a chapter to start practicing with focused questions and progress tracking.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {javaChapters.map((chapter) => (
            <article key={chapter.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-4xl" aria-hidden="true">📘</div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">{chapter.title}</h2>
              <p className="mt-2 text-gray-600">{chapter.questions} Practice Questions</p>

              <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {chapter.difficulty}
              </span>

              <div className="mt-6">
                <Link
                  href={`/java/${chapter.slug}`}
                  className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
                >
                  Open Chapter →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}