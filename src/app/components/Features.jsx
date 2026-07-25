import features from "../data/features";
import SectionCard from "./SectionCard";
import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

export default function Features() {
  return (
    <section className="relative bg-white py-20 md:py-28" aria-labelledby="features-heading">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white pointer-events-none" />

      <Container className="relative">
        <SectionTitle
          id="features-heading"
          title="Why Choose Target 95+"
          subtitle="Everything you need to master ICSE & ISC Computer Science"
          className="text-center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <SectionCard
              key={feature.title}
              title={`${feature.icon} ${feature.title}`}
              description={feature.description}
              accent="bg-card"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}