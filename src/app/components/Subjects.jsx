import subjects from "../data/subjects";
import Button from "./ui/Button";
import SectionCard from "./SectionCard";
import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

export default function Subjects() {
  return (
    <section className="relative bg-white py-20 md:py-28" aria-labelledby="subjects-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-white pointer-events-none" />

      <Container className="relative">
        <SectionTitle
          id="subjects-heading"
          title="Explore Subjects"
          subtitle="Start learning chapter-wise with AI-powered explanations and practice questions."
          className="text-center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {subjects.map((subject) => (
            <SectionCard key={subject.title} icon={subject.icon} title={subject.title} accent="bg-card">
              <div className="mt-4 inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
                {subject.questions} Practice Questions
              </div>
              <div className="mt-6">
                <Button>Start Learning</Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Coming Soon</p>
            </SectionCard>
          ))}
        </div>
      </Container>
    </section>
  );
}