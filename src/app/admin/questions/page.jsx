"use client";
import { useState, useEffect } from "react";
import { mockQuestions } from "../../data/mockQuestions";
import AdminLayout from "../../components/admin/AdminLayout";
import QuestionCard from "../../components/admin/QuestionCard";
import SearchBox from "../../components/admin/SearchBox";
import FilterDropdown from "../../components/admin/FilterDropdown";
import Pagination from "../../components/admin/Pagination";
import LoadingSkeleton from "../../components/admin/LoadingSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { PlusCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const ITEMS_PER_PAGE = 10;

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [chapterFilter, setChapterFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setQuestions(mockQuestions);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredQuestions = questions
    .filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((q) => subjectFilter === "all" || q.subject === subjectFilter)
    .filter((q) => chapterFilter === "all" || q.chapter === chapterFilter)
    .filter(
      (q) => difficultyFilter === "all" || q.difficulty === difficultyFilter
    )
    .filter((q) => typeFilter === "all" || q.questionType === typeFilter);

  const sortedQuestions = filteredQuestions.sort((a, b) => {
    if (sortOrder === "newest") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    if (sortOrder === "difficulty-asc")
      return (
        ["Easy", "Medium", "Hard"].indexOf(a.difficulty) -
        ["Easy", "Medium", "Hard"].indexOf(b.difficulty)
      );
    if (sortOrder === "difficulty-desc")
      return (
        ["Easy", "Medium", "Hard"].indexOf(b.difficulty) -
        ["Easy", "Medium", "Hard"].indexOf(a.difficulty)
      );
    return 0;
  });

  const paginatedQuestions = sortedQuestions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedQuestions.length / ITEMS_PER_PAGE);

  const subjects = ["all", ...new Set(mockQuestions.map((q) => q.subject))];
  const chapters = ["all", ...new Set(mockQuestions.map((q) => q.chapter))];
  const difficulties = ["all", "Easy", "Medium", "Hard"];
  const types = ["all", ...new Set(mockQuestions.map((q) => q.questionType))];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-6 mt-6">
          {[...Array(5)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return <ErrorState message={error} />;
    }

    if (paginatedQuestions.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 mt-6">
        {paginatedQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Question Bank</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Question
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <SearchBox onSearch={handleSearch} />
            <FilterDropdown
              options={subjects}
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              title="Subject"
            />
            <FilterDropdown
              options={chapters}
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
              title="Chapter"
            />
            <FilterDropdown
              options={difficulties}
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              title="Difficulty"
            />
            <FilterDropdown
              options={types}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              title="Type"
            />
          </div>
          <div className="flex justify-end mb-4">
            <FilterDropdown
              options={[
                { value: "newest", label: "Newest" },
                { value: "oldest", label: "Oldest" },
                { value: "difficulty-asc", label: "Difficulty (Asc)" },
                { value: "difficulty-desc", label: "Difficulty (Desc)" },
              ]}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              title="Sort by"
            />
          </div>
        </div>

        {renderContent()}

        {!loading && !error && totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}