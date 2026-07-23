import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import HowItsWorks from "./components/HowItsWorks";
import Footer from "./components/Footer";
import Subjects from "./components/Subjects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItsWorks />
      <Subjects />
      <Footer />
    </main>
  );
}