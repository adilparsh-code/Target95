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
    <section className="bg-white py-20" aria-label="Platform highlights">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.title} className="text-center">
              <h2 className="text-5xl font-extrabold text-blue-600">{item.number}</h2>
              <p className="mt-3 text-gray-600">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}