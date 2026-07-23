import features from "../data/features";
import SectionCard from "./SectionCard";
import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

export default function Features() {
  return (
    <section className="bg-background py-20" aria-labelledby="features-heading">
      <Container>
        <SectionTitle
          id="features-heading"
          title="Why Choose Target 95+"
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