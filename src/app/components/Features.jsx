import features from "../data/features";
import SectionCard from "./SectionCard";

export default function Features() {
  return (
    <section className="relative bg-white py-20 md:py-28" aria-labelledby="features-heading">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <h2 id="features-heading" className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Why Choose Target 95+
        </h2>
        <p className="mt-4 text-center text-lg text-gray-500 max-w-2xl mx-auto">
          Everything you need to master ICSE & ISC Computer Science
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <SectionCard
              key={feature.title}
              title={`${feature.icon} ${feature.title}`}
              description={feature.description}
              accent="bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
}