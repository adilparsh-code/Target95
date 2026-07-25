"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AdminCard from "@/app/components/admin/AdminCard";
import SectionTitle from "@/app/components/admin/SectionTitle";
import StatusBadge from "@/app/components/admin/StatusBadge";
import EmptyState from "@/app/components/admin/EmptyState";
import { placeholderTeachers } from "@/app/data/admin/mockTeachers";

export default function TeacherProfilePage() {
  const params = useParams();
  const teacher = placeholderTeachers.find((t) => t.id === params.id);

  const [activeTab, setActiveTab] = useState("overview");

  if (!teacher) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <AdminCard>
          <EmptyState icon="👩‍🏫" title="Teacher not found" description="The teacher you're looking for doesn't exist." />
        </AdminCard>
      </div>
    );
  }

  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  const getBarColor = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-rose-500";
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "performance", label: "Performance" },
    { id: "students", label: "Students" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Teachers
      </button>

      {/* Profile Header */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
            {getInitials(teacher.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{teacher.name}</h1>
              <StatusBadge status={teacher.status} size="md" />
            </div>
            <p className="text-sm text-gray-500">{teacher.email} · {teacher.phone}</p>
            <p className="text-sm text-gray-500">{teacher.school} · {teacher.city}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>💼 {teacher.experience} years experience</span>
              <span>📅 Joined {teacher.joined}</span>
              <span>🎓 {teacher.qualification}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              ✉️ Message
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
              ✏️ Edit
            </button>
          </div>
        </div>
      </AdminCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AdminCard>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Students</p>
          <p className="text-2xl font-bold text-gray-900">{teacher.students}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Classes</p>
          <p className="text-2xl font-bold text-gray-900">{teacher.classes}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg. Score</p>
          <p className={`text-2xl font-bold ${getScoreColor(teacher.avgScore)}`}>{teacher.avgScore}%</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Specialization</p>
          <p className="text-sm font-bold text-gray-900 truncate">{teacher.specialization}</p>
        </AdminCard>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bio & Achievements */}
          <AdminCard>
            <SectionTitle title="About" subtitle="Teacher biography and achievements" />
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Biography</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{teacher.bio}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Achievements</h4>
                {teacher.achievements.length > 0 ? (
                  <ul className="space-y-1">
                    {teacher.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500">🏆</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No achievements listed yet.</p>
                )}
              </div>
            </div>
          </AdminCard>

          {/* Subjects & Details */}
          <AdminCard>
            <SectionTitle title="Details" subtitle="Teaching subjects and qualifications" />
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Qualification</h4>
                <p className="text-sm text-gray-600">{teacher.qualification}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">School</h4>
                <p className="text-sm text-gray-600">{teacher.school}, {teacher.city}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Specialization</h4>
                <p className="text-sm text-gray-600">{teacher.specialization}</p>
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {activeTab === "performance" && (
        <AdminCard>
          <SectionTitle title="Performance Trend" subtitle="Monthly average scores" />
          <div className="space-y-2 mt-4">
            {teacher.performance.map((item) => (
              <div key={item.month} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-8">{item.month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getBarColor(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <span className={`text-xs font-medium ${getScoreColor(item.score)} w-8 text-right`}>
                  {item.score}%
                </span>
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      {activeTab === "students" && (
        <AdminCard>
          <EmptyState
            icon="👨‍🎓"
            title="Student List"
            description="Student list for this teacher will be available in a future update."
            action={
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                View All Students
              </button>
            }
          />
        </AdminCard>
      )}

      {activeTab === "activity" && (
        <AdminCard>
          <EmptyState
            icon="📊"
            title="Activity Log"
            description="Teacher activity tracking will be available in a future update."
            action={
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Configure Activity Tracking
              </button>
            }
          />
        </AdminCard>
      )}
    </div>
  );
}