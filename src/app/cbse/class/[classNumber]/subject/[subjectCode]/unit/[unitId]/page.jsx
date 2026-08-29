import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, FlaskConical, Target, CheckCircle, PlayCircle, FileText, Brain } from 'lucide-react';
import { getCBSECurriculum } from '@/app/data/cbse';

// Removed generateStaticParams to reduce memory usage during build - this page will be rendered on-demand

export default async function CBSEUnitPage({ params }) {
  const resolvedParams = await params;
  const classNumber = Number(resolvedParams?.classNumber);
  const subjectCode = String(resolvedParams?.subjectCode || '');
  const unitId = String(resolvedParams?.unitId || '');
  const subject = getCBSECurriculum(classNumber, subjectCode);

  if (!subject) notFound();

  const units = [
    ...(subject.parts?.partA?.units || []),
    ...(subject.parts?.partB?.units || []),
  ];
  const unitIndex = units.findIndex(item => item.id === unitId);
  const unit = units.find((item) => item.id === unitId);
  if (!unit) notFound();

  const hasNextUnit = unitIndex < units.length - 1;
  const hasPrevUnit = unitIndex > 0;
  const nextUnit = hasNextUnit ? units[unitIndex + 1] : null;
  const prevUnit = hasPrevUnit ? units[unitIndex - 1] : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href={`/cbse/class/${classNumber}/subject/${subjectCode}`} 
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {subject.name}
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 text-white shadow-2xl mb-8">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                CBSE Class {classNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                {subject.name}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                Unit {unitIndex + 1} of {units.length}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Unit {unit.code}: {unit.name}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">Master the concepts with our comprehensive learning outcomes, theory topics, and hands-on practical activities.</p>
            
            {/* Unit Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{unit.theory?.length || 0}</p>
                <p className="text-blue-100 text-sm flex items-center gap-1.5 mt-1">
                  <BookOpen className="w-4 h-4" /> Theory Topics
                </p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{unit.practicalActivities?.length || 0}</p>
                <p className="text-blue-100 text-sm flex items-center gap-1.5 mt-1">
                  <FlaskConical className="w-4 h-4" /> Practical Activities
                </p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-bold">{unit.learningOutcomes?.length || 0}</p>
                <p className="text-blue-100 text-sm flex items-center gap-1.5 mt-1">
                  <Target className="w-4 h-4" /> Learning Outcomes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Outcomes Section */}
        {unit.learningOutcomes?.length ? (
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Learning Outcomes</h2>
                <p className="text-gray-600">What you'll be able to do after completing this unit</p>
              </div>
            </div>
            <ul className="grid md:grid-cols-2 gap-4">
              {unit.learningOutcomes.map((item, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Content Grid - Theory & Practical */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          {/* Theory Topics */}
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Theory Topics</h2>
                <p className="text-gray-600">{unit.theory?.length || 0} topics to master</p>
              </div>
            </div>
            <ol className="space-y-3">
              {(unit.theory || []).map((item, index) => (
                <li key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                  <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm text-sm font-bold text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 group-hover:text-blue-800">{item}</span>
                </li>
              ))}
              {(!unit.theory || unit.theory.length === 0) && (
                <li className="text-gray-500 text-center py-8">No theory topics available</li>
              )}
            </ol>
          </section>

          {/* Practical Activities */}
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Practical Activities</h2>
                <p className="text-gray-600">{unit.practicalActivities?.length || 0} hands-on exercises</p>
              </div>
            </div>
            <ol className="space-y-3">
              {(unit.practicalActivities || []).map((item, index) => (
                <li key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors group">
                  <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm text-sm font-bold text-gray-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 group-hover:text-purple-800">{item}</span>
                </li>
              ))}
              {(!unit.practicalActivities || unit.practicalActivities.length === 0) && (
                <li className="text-gray-500 text-center py-8">No practical activities available</li>
              )}
            </ol>
          </section>
        </div>

        {/* Chapters Section */}
        {unit.chapters?.length ? (
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Related Chapters</h2>
                <p className="text-gray-600">Chapters covered in this unit</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {unit.chapters.map((chapter) => (
                <div key={chapter.number} className="flex items-center gap-4 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Brain className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">Chapter {chapter.number}</p>
                    <p className="font-semibold text-gray-900">{chapter.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Unit Navigation */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {hasPrevUnit ? (
              <Link 
                href={`/cbse/class/${classNumber}/subject/${subjectCode}/unit/${prevUnit.id}`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous: Unit {prevUnit.code}
              </Link>
            ) : <div className="w-full md:w-auto"></div>}
            
            <Link 
              href="/study"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <PlayCircle className="w-5 h-5" />
              Start Learning Now
            </Link>

            {hasNextUnit ? (
              <Link 
                href={`/cbse/class/${classNumber}/subject/${subjectCode}/unit/${nextUnit.id}`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-xl transition-colors"
              >
                Next: Unit {nextUnit.code}
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            ) : <div className="w-full md:w-auto"></div>}
          </div>
        </section>
      </div>
    </main>
  );
}