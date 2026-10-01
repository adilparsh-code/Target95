import { notFound } from 'next/navigation';
import { getOfficeApp, officeApps } from '@/data/office';
import OfficeCatalog from '../../components/office/OfficeCatalog';
export function generateStaticParams() { return officeApps.map(({ id }) => ({ appId: id })); }
export async function generateMetadata({ params }) { const app = getOfficeApp((await params).appId); return { title: app ? `${app.name} 2026 Lessons` : 'Office lessons' }; }
export default async function AppPage({ params }) { const app = getOfficeApp((await params).appId); if (!app) notFound(); return <OfficeCatalog appId={app.id} />; }
