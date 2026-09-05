import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, FlaskConical, GraduationCap, ArrowLeft, Clock, Users, Trophy } from 'lucide-react';
import { getCBSECurriculum } from '@/app/data/cbse';

const subjectsByClass = {
  9: ['402'],
  10: ['402'],
  11: ['083', '065', '802'],
  12: ['083', '065', '802'],
};

export default async function CBSESubjectPage({ params }) {
  const resolvedParams = await params;
  const classNumber = Number(resolvedParams?.classNumber);
  const subjectCode = String(resolvedParams?.subjectCode || '');

  if (![9, 10, 11, 12].includes(classNumber) || !subjectsByClass[classNumber].includes(subjectCode)) {
    notFound();
  }

  const subject = getCBSECurriculum(classNumber, subjectCode);
  if (!subject) notFound();

  const units = [
    ...(subject.parts?.partA?.units || []),
    ...(subject.parts?.partB?.units || []),
  ];

  const totalTheoryTopics = units.reduce((sum, unit) => sum + (unit.theory?.length || 0), 0);
  const totalPracticalActivities = units.reduce((sum, unit) => sum + (unit.practicalActivities?.length || 0), 0);
  const subjectRoute = `/cbse/class/${classNumber}/subject/${subjectCode}`;
  const mockTestRoute = `/mock-test?board=CBSE&class=${classNumber}&subjectCode=${encodeURIComponent(subjectCode)}&subject=${encodeURIComponent(subject.name)}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6">
          <Link href={`/cbse/class/${classNumber}`} className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md">
            <ArrowLeft className="w-4 h-4" /> Back to Class {classNumber}
          </Link>
        </nav>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 text-white shadow-2xl mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold"><GraduationCap className="w-4 h-4" />CBSE Class {classNumber}</span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">Code {subject.code}</span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold"><Clock className="w-4 h-4" />2026-27 Session</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{subject.name}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">Syllabus-aligned learning, practice questions, and mock tests designed to help you master every concept.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"><p className="text-3xl font-bold">{units.length}</p><p className="text-blue-100 text-sm">Total Units</p></div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"><p className="text-3xl font-bold">{totalTheoryTopics}</p><p className="text-blue-100 text-sm">Theory Topics</p></div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"><p className="text-3xl font-bold">{totalPracticalActivities}</p><p className="text-blue-100 text-sm">Practical Activities</p></div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"><p className="text-3xl font-bold">#1</p><p className="text-blue-100 text-sm">Most Popular</p></div>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-bold text-gray-900">Course Units</h2><p className="text-gray-600 hidden md:block">Click on any unit to start learning</p></div>
          <div className="grid gap-6 md:grid-cols-2">
            {units.map((unit, index) => (
              <Link key={unit.id} href={`${subjectRoute}/unit/${unit.id}`} className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3"><span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl text-lg font-bold shadow-lg">{unit.code}</span><div><h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{unit.name}</h3><p className="text-sm text-gray-500">Unit {index + 1} of {units.length}</p></div></div>
                  <div className="flex gap-2">{unit.theory?.length > 0 && <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold"><BookOpen className="w-3 h-3" />{unit.theory.length}</span>}{unit.practicalActivities?.length > 0 && <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-xs font-semibold"><FlaskConical className="w-3 h-3" />{unit.practicalActivities.length}</span>}</div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between"><div className="flex gap-4 text-sm text-gray-600">{unit.theory?.length > 0 && <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-blue-500" />{unit.theory.length} theory topics</span>}{unit.practicalActivities?.length > 0 && <span className="flex items-center gap-1.5"><FlaskConical className="w-4 h-4 text-purple-500" />{unit.practicalActivities.length} practicals</span>}</div><span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:gap-2 transition-all">Start Learning <ArrowLeft className="w-4 h-4 rotate-180" /></span></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 hover:shadow-lg transition-shadow"><Trophy className="w-10 h-10 text-amber-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Mock Tests</h3><p className="text-gray-600 mb-4">Test your knowledge with full-length mock exams designed according to CBSE pattern.</p><Link href={mockTestRoute} className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:underline">Take a test <ArrowLeft className="w-4 h-4 rotate-180" /></Link></div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-shadow"><Users className="w-10 h-10 text-emerald-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">AI Tutor</h3><p className="text-gray-600 mb-4">Get personalized help with difficult concepts from our AI-powered tutor.</p><Link href="/ai-tutor" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:underline">Get help <ArrowLeft className="w-4 h-4 rotate-180" /></Link></div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-shadow"><BookOpen className="w-10 h-10 text-pink-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Study Notes</h3><p className="text-gray-600 mb-4">Open notes for this selected CBSE subject only.</p><Link href={subjectRoute} className="inline-flex items-center gap-2 text-pink-700 font-semibold hover:underline">View subject <ArrowLeft className="w-4 h-4 rotate-180" /></Link></div>
          </div>
        </section>
      </div>
    </main>
  );
}
