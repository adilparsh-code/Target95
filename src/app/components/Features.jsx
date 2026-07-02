import features from "../data/features";

export default function Features() {
  return (
    <section className="bg-white py-20">

      <h2 className="text-5xl font-extrabold text-center text-gray-900">
        Why Choose Target 95+
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-7xl mx-auto px-6">

        {features.map((feature, index) => (

          <div
            key={index}
            className="bg-blue-50 p-8 rounded-2xl shadow"
          >

            <h3 className="text-2xl font-bold">
              {feature.icon} {feature.title}
            </h3>

            <p className="mt-4 text-gray-600">
              {feature.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}