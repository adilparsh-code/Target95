import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import SubjectGrid from "@/components/dashboard/SubjectGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import StatsCards from "@/components/dashboard/StatsCards";
import UpcomingMockTests from "@/components/dashboard/UpcomingMockTests";

export const metadata = {
  title: "Student Dashboard | Target95+",
  description: "Track your progress, bookmarks, and next learning steps on Target95+.",
};

const mockUser = {
  name: "Alex Johnson",
  email: "alex@student.com",
};

const mockStats = {
  questionsSolvedToday: 7,
  currentStreak: 15,
  chapterCompletion: 68,
  dailyGoal: {
    current: 7,
    target: 10,
    progress: 70,
  },
  weeklyGoal: {
    current: 5,
    target: 7,
    progress: 71,
  },
};

const lastChapter = {
  name: "Control Flow Statements",
  subject: "Java Programming",
  progress: 45,
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader user={mockUser} isLoading={false} />
        
        <div className="mt-6">
          <WelcomeCard user={mockUser} stats={mockStats} />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ContinueLearning lastChapter={lastChapter} isLoading={false} />
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
        </div>

        <div className="mt-6">
          <ProgressOverview stats={mockStats} />
        </div>

        <div className="mt-6">
          <StatsCards />
        </div>

        <div className="mt-6">
          <SubjectGrid />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <UpcomingMockTests />
        </div>
      </div>
      <Footer />
    </main>
  );
}