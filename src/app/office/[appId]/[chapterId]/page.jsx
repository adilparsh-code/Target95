import { notFound } from 'next/navigation';
import { getOfficeApp, officeApps } from '@/data/office';
import OfficeLesson from '../../../components/office/OfficeLesson';
export function generateStaticParams() { return officeApps.flatMap((app) => app.chapters.map((chapter) => ({ appId: app.id, chapterId: chapter.id }))); }
export async function generateMetadata({ params }) { const { appId, chapterId } = await params; const app = getOfficeApp(appId); const chapter = app?.chapters.find((item) => item.id === chapterId); return { title: chapter ? `${chapter.title} — ${app.name}` : 'Office lesson' }; }
export default async function LessonPage({ params }) { const { appId, chapterId } = await params; const app = getOfficeApp(appId); const chapter = app?.chapters.find((item) => item.id === chapterId); if (!chapter) notFound(); return <OfficeLesson key={`${appId}/${chapterId}`} appId={appId} chapter={chapter} />; }
