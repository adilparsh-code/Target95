import AdminCard from "../AdminCard";

export default function AboutPage() {
  const contributors = [
    { name: "Adil Parshionikar", role: "Lead Developer", avatar: "AP" },
    { name: "Target95 Team", role: "Product Design", avatar: "T95" },
  ];

  const techStack = [
    { name: "Next.js 15", description: "React framework with App Router" },
    { name: "React 19", description: "UI component library" },
    { name: "Tailwind CSS v4", description: "Utility-first CSS framework" },
    { name: "Geist Font", description: "Typography system by Vercel" },
  ];

  return (
    <div className="space-y-6">
      {/* Brand Info */}
      <AdminCard>
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl font-bold text-white">T95</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Target95+</h2>
          <p className="text-sm text-gray-500 mt-1">AI-Powered Learning Platform for ICSE & ISC Computer Science</p>
          <p className="text-xs text-gray-400 mt-1">Version 2.5.1</p>
        </div>
      </AdminCard>

      {/* Description */}
      <AdminCard>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Target95+ is a comprehensive learning platform designed specifically for ICSE and ISC Computer Science students.
            It provides interactive question banks, mock tests, study notes, and performance analytics to help students
            achieve a 95%+ score in their board examinations.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            The platform features an AI-powered tutor, personalized learning paths, detailed progress tracking,
            and a collaborative environment where teachers can create content and monitor student performance.
          </p>
        </div>
      </AdminCard>

      {/* Tech Stack */}
      <AdminCard>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Technology Stack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 mt-1 bg-blue-500 rounded-full shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                  <p className="text-xs text-gray-500">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminCard>

      {/* Contributors */}
      <AdminCard>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Contributors</h3>
          <div className="flex flex-wrap gap-4">
            {contributors.map((person) => (
              <div key={person.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {person.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminCard>

      {/* Links */}
      <AdminCard>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Links</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              📄 Documentation
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              🐛 Report a Bug
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              💡 Request a Feature
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              📧 Contact Support
            </a>
          </div>
        </div>
      </AdminCard>

      <p className="text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Target95+. All rights reserved.
      </p>
    </div>
  );
}