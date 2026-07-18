import BookmarksList from "../components/BookmarksList";
import questions from "../data/questions";

export default function BookmarksPage() {
  return <BookmarksList questions={questions} />;
}
