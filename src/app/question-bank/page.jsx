import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import QuestionBank from "../components/QuestionBank";

export default function QuestionBankPage() {
  return <ProtectedRoute><main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><QuestionBank /><Footer /></main></ProtectedRoute>;
}
