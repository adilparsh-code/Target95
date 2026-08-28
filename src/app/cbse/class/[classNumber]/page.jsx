import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, GraduationCap, BookOpen, Clock, Users, Rocket, Brain, FileText } from 'lucide-react';
import { getCBSECurriculum } from '@/app/data/cbse';
import { cbseCurriculum2026_27 } from '@/app/data/cbse/curriculum-2026-27.js';

export async function generateStaticParams() {
  const paths = [];
  Object.entries(cbseCurriculum2026_27.classes).forEach(([classNumber]) => {
    paths.push({ classNumber: String(classNumber) });
  });
  return paths;
}

const CLASS_SUBJECT_MAP = {
  9: ['402'],
  10: ['402'],
  11: ['083', '065', '802'],
  12: ['083', '065', '802'],
};

const subjectIcons = {
  '083': <BookOpen className="w-8 h-8" />, // Computer Science
  '065': <Brain className="w-8 h-8" />, // Biology
  '802': <FileText className="w-8 h-8" />, // Informatics Practices
  '402': <Rocket className="w-8 h-8" />, // Information Technology
};

const subjectGradients = {
  '083': 'from-blue-500 to-indigo-600',
  '065': 'from-emerald-500 to-teal-600',
  '802': 'from-amber-500 to-orange-600',
  '402': 'from-pink-500 to-rose-600',
};

export default async function CBSEClassPage({ params }) {
  const resolvedParams = await params;
  const classNumber = Number(resolvedParams?.classNumber);

  if (![9, 10, 11, 12].includes(classNumber)) {
    notFound();
  }

  const subjectCodes = CLASS_SUBJECT_MAP[classNumber] || [];
  const subjects = subjectCodes
    .map((code) => getCBSECurriculum(classNumber, code))
    .filter(Boolean);

  // Calculate overall stats
  const totalUnits = subjects.reduce((sum, subject) => {
    const units = [...(subject.parts?.partA?.units || []), ...(subject.parts?.partB?.units || [])];
    return sum + units.length;
  }, 0);
  
  const totalTheoryTopics = subjects.reduce((sum, subject) => {
    const units = [...(subject.parts?.partA?.units || []), ...(subject.parts?.partB?.units || [])];
    return sum + units.reduce((s, unit) => s + (unit.theory?.length || 0), 0);
  }, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <Link 
            href="/cbse" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to CBSE Dashboard
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 text-white shadow-2xl mb-8">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                <GraduationCap className="w-4 h-4" />
                CBSE Curriculum
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                <Clock className="w-4 h-4" />
                2026-27 Session
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Class {classNumber}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">Choose a subject to access the complete syllabus, practice questions, and mock tests aligned with the latest CBSE guidelines.</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{subjects.length}</p>
                <p className="text-blue-100 text-sm">Active Subjects</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{totalUnits}</p>
                <p className="text-blue-100 text-sm">Total Units</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{totalTheoryTopics}</p>
                <p className="text-blue-100 text-sm">Theory Topics</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-blue-100 text-sm">CBSE Aligned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Available Subjects</h2>
            <p className="text-gray-600 hidden md:block">Select a subject to begin your learning journey</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const units = [...(subject.parts?.partA?.units || []), ...(subject.parts?.partB?.units || [])];
              const unitCount = units.length;
              const theoryCount = units.reduce((sum, unit) => sum + (unit.theory?.length || 0), 0);
              
              return (
                <Link
                  key={`${classNumber}-${subject.code}`}
                  href={`/cbse/class/${classNumber}/subject/${encodeURIComponent(subject.code)}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <div className={`bg-gradient-to-r ${subjectGradients[subject.code] || 'from-blue-500 to-indigo-600'} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      {subjectIcons[subject.code] || <BookOpen className="w-10 h-10" />}
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                        Code {subject.code}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold">{subject.name}</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{unitCount}</p>
                        <p className="text-xs text-gray-500">Units</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{theoryCount}</p>
                        <p className="text-xs text-gray-500">Topics</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">✓</p>
                        <p className="text-xs text-gray-500">Updated</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-gray-600 text-sm">View complete syllabus</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:gap-2 transition-all">
                        Start <ArrowLeft className="w-4 h-4 rotate-180" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Study Materials</h3>
              <p className="text-gray-600 mb-4">Access comprehensive notes, video lectures, and revision guides for all subjects.</p>
              <Link href="/study" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline">
                Explore <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 hover:shadow-lg transition-shadow">
              <FileText className="w-10 h-10 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Tests</h3>
              <p className="text-gray-600 mb-4">Chapter-wise and unit-wise tests to assess your understanding and track progress.</p>
              <Link href="/mock-test" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:underline">
                Practice now <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-shadow">
              <Users className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Tutor Support</h3>
              <p className="text-gray-600 mb-4">Get instant help with doubts and personalized learning recommendations.</p>
              <Link href="/ai-tutor" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:underline">
                Get help <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}