import Container from "./ui/Container";

const stats = [
  {
    number: "10K+",
    title: "Students Learning",
    icon: "🎓",
  },
  {
    number: "5000+",
    title: "Questions Available",
    icon: "📝",
  },
  {
    number: "12",
    title: "Subjects",
    icon: "📚",
  },
  {
    number: "200+",
    title: "Practice Tests",
    icon: "🏆",
  },
];

export default function Stats() {
  return (
    <section className="relative bg-white py-16 md:py-20" aria-label="Platform highlights">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-white pointer-events-none" />

      <Container className="relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Quick Stats
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Join thousands of students already learning with Target95+
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-8 md:grid-cols-4">
          {stats.map((item, index) => (
            <div key={item.title} className="relative text-center group">
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              )}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-700">
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