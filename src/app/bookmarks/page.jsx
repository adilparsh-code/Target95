import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookmarksList from "../components/BookmarksList";
import questions from "../data/questions";

export default function BookmarksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <BookmarksList questions={questions} />
      <Footer />
    </main>
  );
}