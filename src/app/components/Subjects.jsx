import subjects from "../data/subjects";
import Button from "./Button";

export default function Subjects() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-extrabold text-center text-gray-900">
          Explore Subjects
        </h2>

        <p className="text-center text-gray-600 text-lg mt-4">
          Start learning chapter-wise with AI-powered explanations and
          practice questions.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {subjects.map((subject, index) => (

            <div
              key={index}
              className="bg-slate-50 rounded-2xl shadow-md p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-6xl">
                {subject.icon}
              </div>

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                {subject.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {subject.questions} Practice Questions
              </p>

              <div className="mt-6">
                <Button
                  text="Start Learning"
                  type="primary"
                />
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Coming Soon
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}