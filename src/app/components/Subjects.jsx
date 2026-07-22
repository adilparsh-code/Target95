import subjects from "../data/subjects";
import Button from "./ui/Button";
import SectionCard from "./SectionCard";
import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

export default function Subjects() {
  return (
<<<<<<< HEAD
    <section className="relative bg-white py-20 md:py-28" aria-labelledby="subjects-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-white pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <h2 id="subjects-heading" className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Explore Subjects
        </h2>

        <p className="mt-4 text-center text-lg text-gray-500 max-w-2xl mx-auto">
          Start learning chapter-wise with AI-powered explanations and practice questions.
        </p>
=======
    <section className="bg-white py-24" aria-labelledby="subjects-heading">
      <Container>
        <SectionTitle
          id="subjects-heading"
          title="Explore Subjects"
          subtitle="Start learning chapter-wise with AI-powered explanations and practice questions."
          className="text-center"
        />
>>>>>>> 49ef4e8 (feat: improve Target95 UI, responsive design and admin module)

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {subjects.map((subject) => (
            <SectionCard key={subject.title} icon={subject.icon} title={subject.title} accent="bg-white">
              <div className="mt-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 border border-blue-100">
                {subject.questions} Practice Questions
              </div>
              <div className="mt-6">
                <Button>Start Learning</Button>
              </div>
              <p className="mt-4 text-sm text-gray-400">Coming Soon</p>
            </SectionCard>
          ))}
        </div>
      </Container>
    </section>
  );
}