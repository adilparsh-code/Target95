"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AdminCard from "@/app/components/admin/AdminCard";
import SectionTitle from "@/app/components/admin/SectionTitle";
import StatusBadge from "@/app/components/admin/StatusBadge";
import EmptyState from "@/app/components/admin/EmptyState";
import ProgressCard from "@/app/components/admin/students/ProgressCard";
import { placeholderStudents, studentPerformanceData } from "@/app/data/admin/mockStudents";

export default function StudentProfilePage() {
  const params = useParams();
  const student = placeholderStudents.find((s) => s.id === params.id);

  const [activeTab, setActiveTab] = useState("overview");

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <AdminCard>
          <EmptyState icon="👨‍🎓" title="Student not found" description="The student you're looking for doesn't exist." />
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
    { id: "progress", label: "Chapter Progress" },
    { id: "tests", label: "Test History" },
    { id: "attendance", label: "Attendance" },
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
        Back to Students
      </button>

      {/* Profile Header */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
            {getInitials(student.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <StatusBadge status={student.status} size="md" />
            </div>
            <p className="text-sm text-gray-500">{student.email} · {student.phone}</p>
            <p className="text-sm text-gray-500">{student.school} · {student.city}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>Class {student.class} · {student.grade}</span>
              <span>Joined {student.joined}</span>
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
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Questions Solved</p>
          <p className="text-2xl font-bold text-gray-900">{student.questionsSolved}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg. Score</p>
          <p className={`text-2xl font-bold ${getScoreColor(student.avgScore)}`}>{student.avgScore}%</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tests Attempted</p>
          <p className="text-2xl font-bold text-gray-900">{student.testsAttempted}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Attendance</p>
          <p className={`text-2xl font-bold ${student.attendance >= 80 ? "text-emerald-600" : student.attendance >= 60 ? "text-blue-600" : "text-amber-600"}`}>
            {student.attendance}%
          </p>
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
          {/* Performance Chart Placeholder */}
          <AdminCard>
            <SectionTitle title="Performance Trend" subtitle="Monthly average scores" />
            <div className="space-y-2 mt-4">
              {studentPerformanceData.monthlyScores.map((item) => (
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

          {/* Progress Cards */}
          <div className="space-y-4">
            <ProgressCard
              title="Questions Solved"
              value={student.questionsSolved}
              maxValue={500}
              icon="❓"
              color="blue"
              subtitle="Target: 500 questions"
            />
            <ProgressCard
              title="Tests Completed"
              value={student.testsAttempted}
              maxValue={20}
              icon="📋"
              color="emerald"
              subtitle="Target: 20 tests"
            />
            <ProgressCard
              title="Attendance"
              value={student.attendance}
              maxValue={100}
              icon="📅"
              color="amber"
              subtitle="Overall attendance rate"
            />
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <AdminCard>
          <SectionTitle title="Chapter Progress" subtitle="Completion percentage per chapter" />
          <div className="space-y-3 mt-4">
            {studentPerformanceData.chapterProgress.map((item) => (
              <div key={item.chapter} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-48 truncate">{item.chapter}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getBarColor(item.completed)}`}
                    style={{ width: `${item.completed}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getScoreColor(item.completed)} w-12 text-right`}>
                  {item.completed}%
                </span>
              </div>
            ))}
          </div>
        </AdminCard>
      )}

      {activeTab === "tests" && (
        <AdminCard>
          <SectionTitle title="Test History" subtitle="Recent mock test attempts" />
          {studentPerformanceData.testHistory.length === 0 ? (
            <EmptyState icon="📋" title="No tests attempted" description="This student hasn't attempted any tests yet." />
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Test</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {studentPerformanceData.testHistory.map((test) => {
                    const pct = Math.round((test.score / test.maxMarks) * 100);
                    return (
                      <tr key={test.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{test.title}</td>
                        <td className="px-4 py-3">
                          <span className={`font-medium ${getScoreColor(pct)}`}>{test.score}/{test.maxMarks} ({pct}%)</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{test.date}</td>
                        <td className="px-4 py-3"><StatusBadge status={test.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      )}

      {activeTab === "attendance" && (
        <AdminCard>
          <EmptyState
            icon="📅"
            title="Attendance Tracking"
            description="Attendance tracking will be available in a future update. This placeholder shows where attendance data will appear."
            action={
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Configure Attendance
              </button>
            }
          />
        </AdminCard>
      )}
    </div>
  );
}