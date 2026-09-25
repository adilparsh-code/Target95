import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookmarksList from "../components/BookmarksList";
import ProtectedRoute from "../components/ProtectedRoute";

export default function BookmarksPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="h-20 sm:h-24 lg:h-28"></div>
        <BookmarksList />
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
