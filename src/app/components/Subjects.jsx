import subjects from "../data/subjects";
import Button from "./Button";
import SectionCard from "./SectionCard";

export default function Subjects() {
  return (
    <section className="bg-white py-24" aria-labelledby="subjects-heading">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="subjects-heading" className="text-center text-5xl font-extrabold text-gray-900">
          Explore Subjects
        </h2>

        <p className="mt-4 text-center text-lg text-gray-600">
          Start learning chapter-wise with AI-powered explanations and practice questions.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {subjects.map((subject) => (
            <SectionCard key={subject.title} icon={subject.icon} title={subject.title} accent="bg-slate-50">
              <p className="mt-3 text-gray-600">{subject.questions} Practice Questions</p>
              <div className="mt-6">
                <Button text="Start Learning" type="primary" />
              </div>
              <p className="mt-4 text-sm text-gray-500">Coming Soon</p>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}