import Link from 'next/link';
import { ArrowLeft, GraduationCap, BookOpen, Clock, Award, TrendingUp, Users } from 'lucide-react';
import { getAllCBSE2026_27Classes } from '../data/cbse';

export const metadata = {
  title: 'CBSE Curriculum 2026–27 | Target95',
  description:
    'Access CBSE class-wise syllabus, unit blueprints, practice questions, and mock tests for 2026-27.',
};

const classGradients = {
  9: 'from-blue-500 to-indigo-600',
  10: 'from-emerald-500 to-teal-600',
  11: 'from-amber-500 to-orange-600',
  12: 'from-pink-500 to-rose-600',
};

const classIcons = {
  9: <GraduationCap className="w-12 h-12" />,
  10: <Award className="w-12 h-12" />,
  11: <TrendingUp className="w-12 h-12" />,
  12: <BookOpen className="w-12 h-12" />,
};

export default function CBSEHomePage() {
  const classes = getAllCBSE2026_27Classes() || [];

  // Calculate overall platform stats
  const totalClasses = classes.length;
  const totalSubjects = classes.reduce((sum, item) => sum + (Array.isArray(item?.subjects) ? item.subjects.length : 0), 0);
  const totalStudents = "50K+"; // Platform stat
  const successRate = "94%"; // Platform stat

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Navigation */}
        <nav className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 text-white shadow-2xl mb-8">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                <GraduationCap className="w-4 h-4" />
                Central Board of Secondary Education
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                <Clock className="w-4 h-4" />
                2026-27 Academic Session
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">CBSE Curriculum</h1>
            <p className="text-xl text-blue-100 max-w-3xl mb-8">
              Access the latest CBSE curriculum with comprehensive study materials, practice questions, and mock tests. 
              Track your progress, master every concept, and excel in your board exams.
            </p>
            
            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{totalClasses}</p>
                <p className="text-blue-100 text-sm">Classes Covered</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{totalSubjects}</p>
                <p className="text-blue-100 text-sm">Subjects Available</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{totalStudents}</p>
                <p className="text-blue-100 text-sm">Active Students</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{successRate}</p>
                <p className="text-blue-100 text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Select Your Class</h2>
            <p className="text-gray-600 hidden md:block">Choose your class to access personalized learning materials</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {classes.map((item) => {
              const classNumber = item?.classNumber;
              const classId = item?.classId || `class-${classNumber}`;
              const subjects = Array.isArray(item?.subjects) ? item.subjects : [];
              const gradient = classGradients[classNumber] || 'from-blue-500 to-indigo-600';
              const icon = classIcons[classNumber] || <BookOpen className="w-12 h-12" />;

              return (
                <Link
                  key={classId}
                  href={`/cbse/class/${encodeURIComponent(classNumber)}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      {icon}
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                        CBSE
                      </span>
                    </div>
                    <h3 className="mt-4 text-3xl font-bold">Class {classNumber}</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">{subjects.length} subject{subjects.length === 1 ? '' : 's'}</span>
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-gray-600 text-sm">Start learning</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:gap-2 transition-all">
                        Enter <ArrowLeft className="w-4 h-4 rotate-180" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Target95 for CBSE?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Comprehensive Content</h3>
              <p className="text-gray-600 text-center">Complete syllabus coverage with detailed notes, video explanations, and practice materials for every topic.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-amber-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Mock Tests & Assessments</h3>
              <p className="text-gray-600 text-center">Practice with board-style question papers, mock tests, and get instant feedback on your performance.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-emerald-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">AI-Powered Learning</h3>
              <p className="text-gray-600 text-center">Get personalized recommendations and doubt-clearing support from our AI tutor 24/7.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}