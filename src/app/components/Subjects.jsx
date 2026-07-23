import subjects from "../data/subjects";
import Button from "./ui/Button";
import SectionCard from "./SectionCard";
import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

export default function Subjects() {
  return (
    <section className="bg-background py-24" aria-labelledby="subjects-heading">
      <Container>
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