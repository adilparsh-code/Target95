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
    <section className="bg-white py-20">

      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {stats.map((item, index) => (

            <div
              key={index}
              className="text-center"
            >

              <h2 className="text-5xl font-extrabold text-blue-600">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}