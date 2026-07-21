"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mockTeacherData from "../data/teacher/mockTeacherData";

export default function TeacherDashboardPage() {
  const data = useMemo(() => mockTeacherData, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  const filteredStudents = useMemo(() => {
    return data.students.filter((s) => {
      if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedClass !== "all" && s.class !== selectedClass) return false;
      return true;
    });
  }, [data.students, searchTerm, selectedClass]);

  const classes = useMemo(() => {
    return [...new Set(data.students.map((s) => s.class))];
  }, [data.students]);

  const getStatusColor = (status) => {
    const colors = {
      Excellent: "bg-green-100 text-green-700",
      Good: "bg-blue-100 text-blue-700",
      Average: "bg-yellow-100 text-yellow-700",
      "Needs Help": "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getPriorityColor = (p) => {
    if (p === "High") return "text-red-600";
    if (p === "Medium") return "text-yellow-600";
    return "text-gray-600";
  };

  const getNotificationIcon = (type) => {
    const icons = { alert: "🔴", warning: "⚠️", success: "✅", info: "ℹ️", reminder: "📅" };
    return icons[type] || "🔔";
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Teacher Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Welcome, Teacher 👨‍🏫</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
            Monitor student performance, track weak topics, and manage your classroom analytics.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-700">👥 Total Students</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{data.totalStudents}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-700">✅ Active Students</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{data.activeStudents}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-700">📊 Today's Attendance</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">{data.todayAttendance}%</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-700">📝 Assignment Status</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">{data.assignmentSubmitted}/{data.assignmentTotal}</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Test Performance */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">📈 Test Performance</h2>
              <div className="mt-4 space-y-3">
                {data.testPerformance.map((test, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 shrink-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{test.name}</p>
                    </div>
                    <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${test.avgScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12 text-right">{test.avgScore}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">⚠️ Weak Topics</h2>
              <p className="mt-1 text-sm text-gray-700">Topics where students need additional support.</p>
              <div className="mt-4 space-y-3">
                {data.weakTopics.map((topic, idx) => (
                  <div key={idx} className="rounded-2xl border border-red-100 bg-red-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">{topic.topic}</p>
                      <span className="text-xs font-bold text-red-600">{topic.avgScore}% avg</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-red-200">
                        <div className="h-full rounded-full bg-red-500" style={{ width: `${topic.avgScore}%` }} />
                      </div>
                      <span className="text-xs text-gray-700">{topic.studentsStruggling} students</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Table */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-gray-900">📋 Student Overview</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search students..."
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600"
                  />
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none"
                  >
                    <option value="all">All Classes</option>
                    {classes.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 font-semibold text-gray-700">Name</th>
                      <th className="pb-3 font-semibold text-gray-700">Class</th>
                      <th className="pb-3 font-semibold text-gray-700">Attendance</th>
                      <th className="pb-3 font-semibold text-gray-700">Avg Score</th>
                      <th className="pb-3 font-semibold text-gray-700">Assignments</th>
                      <th className="pb-3 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="py-3 font-semibold text-gray-900">{student.name}</td>
                        <td className="py-3 text-gray-700">{student.class}</td>
                        <td className="py-3 text-gray-700">{student.attendance}%</td>
                        <td className="py-3 text-gray-700">{student.avgScore}%</td>
                        <td className="py-3 text-gray-700">{student.assignmentsDone}/12</td>
                        <td className="py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredStudents.length === 0 && (
                <p className="mt-4 text-center text-sm text-gray-700">No students match your search.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">🏆 Top Performers</h2>
              <div className="mt-4 space-y-3">
                {data.topPerformers.map((performer, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-3">
                    <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{performer.name}</p>
                      <p className="text-xs text-gray-700">{performer.class}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">{performer.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">🔔 Notifications</h2>
              <div className="mt-4 space-y-3">
                {data.notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-3">
                    <span className="mt-0.5">{getNotificationIcon(n.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{n.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">📅 Upcoming Tasks</h2>
              <div className="mt-4 space-y-3">
                {data.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between rounded-2xl border border-gray-200 bg-slate-50 p-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-700 mt-1">Due: {task.due}</p>
                    </div>
                    <span className={`text-xs font-bold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">📆 Calendar</h2>
              <div className="mt-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
                <p className="mt-1 text-lg text-gray-700">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric" })}
                </p>
                <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-3">
                  <p className="text-sm font-semibold text-blue-700">Today's Schedule</p>
                  <p className="mt-1 text-xs text-gray-700">10:00 AM - ICSE 10 Java Class</p>
                  <p className="text-xs text-gray-700">12:00 PM - ISC 12 Revision</p>
                  <p className="text-xs text-gray-700">2:00 PM - Doubt Session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}