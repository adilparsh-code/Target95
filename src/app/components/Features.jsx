import features from "../data/features";
import SectionCard from "./SectionCard";

export default function Features() {
  return (
    <section className="bg-white py-20" aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="features-heading" className="text-center text-5xl font-extrabold text-gray-900">
          Why Choose Target 95+
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <SectionCard
              key={feature.title}
              title={`${feature.icon} ${feature.title}`}
              description={feature.description}
              accent="bg-blue-50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}