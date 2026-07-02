import javaChapters from "../data/javaChapters";
import Link from "next/link";


export default function JavaPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-16">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center text-blue-700">
          Java Programming
        </h1>

        <p className="text-center text-gray-600 mt-4 text-lg">
          Select a chapter to start practicing.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">

          {javaChapters.map((chapter) => (

            <div
              key={chapter.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >

              <div className="text-4xl">
                📘
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {chapter.title}
              </h2>

              <p className="mt-2 text-gray-600">
  {chapter.questions} Practice Questions
</p>

<span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
  {chapter.difficulty}
</span>

<div className="mt-6">
 <Link
  href={`/java/${chapter.slug}`}
  className="inline-block mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
>
  Open Chapter →
</Link>

</div>

              

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}