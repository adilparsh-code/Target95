export default function HowItsWorks() {
  return (
    <section className="py-24 bg-slate-100">

      <h2 className="text-5xl font-extrabold text-center text-gray-900">
        How It Works
      </h2>

      <p className="text-center text-gray-600 mt-4 text-lg">
        Learn step by step with our AI-powered platform.
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mt-20">

        <div className="bg-white rounded-2xl shadow p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="text-5xl">📘</div>

          <h3 className="mt-5 text-2xl font-bold text-gray-900">
            Choose Chapter
          </h3>

          <p className="mt-3 text-gray-600">
            Select your ICSE chapter to begin learning.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="text-5xl">📝</div>

          <h3 className="mt-5 text-2xl font-bold text-gray-900">
            Practice Questions
          </h3>

          <p className="mt-3 text-gray-600">
            Solve chapter-wise previous year questions.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="text-5xl">🤖</div>

          <h3 className="mt-5 text-2xl font-bold text-gray-900">
            Learn with AI
          </h3>

          <p className="mt-3 text-gray-600">
            Get instant explanations whenever you&apos;re stuck.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="text-5xl">🏆</div>

          <h3 className="mt-5 text-2xl font-bold text-gray-900">
            Track Progress
          </h3>

          <p className="mt-3 text-gray-600">
            Monitor your performance and improve every day.
          </p>

        </div>

      </div>

    </section>
  );
}
