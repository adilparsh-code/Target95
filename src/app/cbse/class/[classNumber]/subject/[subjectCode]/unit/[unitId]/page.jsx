import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, FlaskConical, Target, CheckCircle, PlayCircle, FileText, Brain } from 'lucide-react';
import { getCBSECurriculum } from '@/app/data/cbse';

export default async function CBSEUnitPage({ params }) {
  const resolvedParams = await params;
  const classNumber = Number(resolvedParams?.classNumber);
  const subjectCode = String(resolvedParams?.subjectCode || '');
  const unitId = String(resolvedParams?.unitId || '');
  const subject = getCBSECurriculum(classNumber, subjectCode);
  if (!subject) notFound();

  const units = [...(subject.parts?.partA?.units || []), ...(subject.parts?.partB?.units || [])];
  const unitIndex = units.findIndex(item => item.id === unitId);
  const unit = units.find(item => item.id === unitId);
  if (!unit) notFound();

  const hasNextUnit = unitIndex < units.length - 1;
  const hasPrevUnit = unitIndex > 0;
  const nextUnit = hasNextUnit ? units[unitIndex + 1] : null;
  const prevUnit = hasPrevUnit ? units[unitIndex - 1] : null;
  const subjectRoute = `/cbse/class/${classNumber}/subject/${subjectCode}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-6"><Link href={subjectRoute} className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"><ArrowLeft className="w-4 h-4" />Back to {subject.name}</Link></nav>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 text-white shadow-2xl mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4"><span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold">CBSE Class {classNumber}</span><span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold">{subject.name}</span><span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold">Unit {unitIndex + 1} of {units.length}</span></div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Unit {unit.code}: {unit.name}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">Master the concepts with syllabus-aligned theory, learning outcomes and practical activities.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4"><div className="bg-white/15 rounded-2xl p-4 border border-white/20"><p className="text-3xl font-bold">{unit.theory?.length || 0}</p><p className="text-blue-100 text-sm"><BookOpen className="w-4 h-4 inline mr-1" />Theory Topics</p></div><div className="bg-white/15 rounded-2xl p-4 border border-white/20"><p className="text-3xl font-bold">{unit.practicalActivities?.length || 0}</p><p className="text-blue-100 text-sm"><FlaskConical className="w-4 h-4 inline mr-1" />Practical Activities</p></div><div className="bg-white/15 rounded-2xl p-4 border border-white/20"><p className="text-3xl font-bold">{unit.learningOutcomes?.length || 0}</p><p className="text-blue-100 text-sm"><Target className="w-4 h-4 inline mr-1" />Learning Outcomes</p></div></div>
          </div>
        </div>
        {unit.learningOutcomes?.length ? <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8"><div className="flex items-center gap-3 mb-6"><Target className="w-6 h-6 text-blue-600" /><h2 className="text-2xl font-bold text-gray-900">Learning Outcomes</h2></div><ul className="grid md:grid-cols-2 gap-4">{unit.learningOutcomes.map((item,index)=><li key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl"><CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" /><span className="text-gray-700">{item}</span></li>)}</ul></section> : null}
        <div className="grid gap-8 md:grid-cols-2 mb-8"><section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"><div className="flex items-center gap-3 mb-6"><BookOpen className="w-6 h-6 text-blue-600" /><h2 className="text-2xl font-bold text-gray-900">Theory Topics</h2></div><ol className="space-y-3">{(unit.theory || []).map((item,index)=><li key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"><span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm text-sm font-bold text-gray-600">{index+1}</span><span className="text-gray-700">{item}</span></li>)}{!unit.theory?.length && <li className="text-gray-500 text-center py-8">No theory topics available</li>}</ol></section><section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"><div className="flex items-center gap-3 mb-6"><FlaskConical className="w-6 h-6 text-purple-600" /><h2 className="text-2xl font-bold text-gray-900">Practical Activities</h2></div><ol className="space-y-3">{(unit.practicalActivities || []).map((item,index)=><li key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"><span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm text-sm font-bold text-gray-600">{index+1}</span><span className="text-gray-700">{item}</span></li>)}{!unit.practicalActivities?.length && <li className="text-gray-500 text-center py-8">No practical activities available</li>}</ol></section></div>
        {unit.chapters?.length ? <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8"><div className="flex items-center gap-3 mb-6"><FileText className="w-6 h-6 text-amber-600" /><h2 className="text-2xl font-bold text-gray-900">Related Chapters</h2></div><div className="grid gap-4 sm:grid-cols-2">{unit.chapters.map(chapter=><div key={chapter.number} className="flex items-center gap-4 p-5 bg-amber-50 rounded-2xl"><Brain className="w-6 h-6 text-amber-600" /><div><p className="text-xs font-bold text-amber-600 uppercase">Chapter {chapter.number}</p><p className="font-semibold text-gray-900">{chapter.title}</p></div></div>)}</div></section> : null}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"><div className="flex flex-col md:flex-row items-center justify-between gap-4">{hasPrevUnit ? <Link href={`${subjectRoute}/unit/${prevUnit.id}`} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl"><ArrowLeft className="w-5 h-5" />Previous: Unit {prevUnit.code}</Link> : <div />}{hasNextUnit ? <Link href={`${subjectRoute}/unit/${nextUnit.id}`} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 font-semibold rounded-xl">Next: Unit {nextUnit.code}<ArrowLeft className="w-5 h-5 rotate-180" /></Link> : <Link href={subjectRoute} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl"><PlayCircle className="w-5 h-5" />Back to Subject</Link>}</div></section>
      </div>
    </main>
  );
}
