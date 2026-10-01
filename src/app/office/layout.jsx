import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export const metadata = { title: 'Microsoft Office 2026 Learning Hub', description: 'Practical Word, Excel and PowerPoint lessons, guided tasks and knowledge checks for every learner.' };
export default function OfficeLayout({ children }) {
  return <><Navbar /><div className="h-20 sm:h-24 lg:h-28" /><main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"><div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div></main><Footer /></>;
}
