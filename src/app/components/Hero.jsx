import Button from "./ui/Button";
import Container from "./ui/Container";

export default function Hero() {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <span className="bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-semibold">
          AI Powered Learning Platform
        </span>

        <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
          Learn Computer Science
          <br />
          Smarter with AI
        </h1>

        <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground">
          Practice Previous Year Questions,
          Solve Java Programs,
          Learn with AI and Score Higher in ICSE & ISC Exams.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <Button>Start Learning</Button>
          <Button variant="secondary">Explore Questions</Button>
        </div>
      </section>
    </Container>
  );
}