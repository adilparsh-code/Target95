import Button from "./Button";
export default function Hero() {
  return (
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

  <Button
    text="Start Learning"
    type="primary"
  />

  <Button
    text="Explore Questions"
    type="secondary"
  />

</div>
    </section>
  );
}