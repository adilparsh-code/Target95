import Container from "./ui/Container";

const stats = [
  {
    number: "10K+",
    title: "Practice Questions",
  },
  {
    number: "500+",
    title: "Java Programs",
  },
  {
    number: "24×7",
    title: "AI Tutor",
  },
  {
    number: "95%",
    title: "Success Goal",
  },
];

export default function Stats() {
  return (
    <section className="relative bg-white py-20 md:py-24" aria-label="Platform highlights">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-8 md:gap-12 md:grid-cols-4">
          {stats.map((item, index) => (
            <div key={item.title} className="relative text-center">
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              )}
              <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {item.number}
              </h2>
              <p className="mt-2 text-gray-500 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}