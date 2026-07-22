<<<<<<< HEAD
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <span className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold border border-blue-100 shadow-sm">
          AI Powered Learning Platform
        </span>

        <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
          Learn Computer Science
          <br />
          Smarter with AI
        </h1>

        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
          Practice Previous Year Questions,
          Solve Java Programs,
          Learn with AI and Score Higher in ICSE & ISC Exams.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button text="Start Learning" type="primary" />
          <Button text="Explore Questions" type="secondary" />
        </div>
      </div>
    </section>
=======
import Button from "./ui/Button";
import Container from "./ui/Container";

export default function Hero() {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          AI Powered Learning Platform
        </span>

        <h1 className="mt-8 text-6xl font-extrabold text-gray-900 leading-tight">
          Learn Computer Science
          <br />
          Smarter with AI
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-gray-600">
          Practice Previous Year Questions,
          Solve Java Programs,
          Learn with AI and Score Higher in ICSE & ISC Exams.
        </p>

        <div className="mt-10 flex gap-5">
          <Button>Start Learning</Button>
          <Button variant="secondary">Explore Questions</Button>
        </div>
      </section>
    </Container>
>>>>>>> 49ef4e8 (feat: improve Target95 UI, responsive design and admin module)
  );
}