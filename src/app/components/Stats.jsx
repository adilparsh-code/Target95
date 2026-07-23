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
    <section className="bg-background py-20" aria-label="Platform highlights">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.title} className="text-center">
              <h2 className="text-5xl font-extrabold text-primary">{item.number}</h2>
              <p className="mt-3 text-muted-foreground">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}