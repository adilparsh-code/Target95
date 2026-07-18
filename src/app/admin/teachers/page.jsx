"use client";

import DataTable from "@/app/components/admin/DataTable";
import SectionTitle from "@/app/components/admin/SectionTitle";
import StatusBadge from "@/app/components/admin/StatusBadge";
import DashboardCard from "@/app/components/admin/DashboardCard";

const placeholderTeachers = [
  { id: "T001", name: "Mrs. Priya Singh", email: "priya.singh@target95.com", subjects: "Java, Python", students: 45, status: "active", joined: "2026-01-10" },
  { id: "T002", name: "Mr. Amit Verma", email: "amit.verma@target95.com", subjects: "Java, Data Structures", students: 38, status: "active", joined: "2026-02-15" },
  { id: "T003", name: "Ms. Neha Gupta", email: "neha.gupta@target95.com", subjects: "Computer Science", students: 52, status: "active", joined: "2026-01-20" },
  { id: "T004", name: "Mr. Rajesh Kumar", email: "rajesh.kumar@target95.com", subjects: "Java, Web Dev", students: 29, status: "active", joined: "2026-03-01" },
  { id: "T005", name: "Mrs. Anjali Mehta", email: "anjali.mehta@target95.com", subjects: "Computer Science", students: 41, status: "inactive", joined: "2026-04-10" },
  { id: "T006", name: "Mr. Suresh Reddy", email: "suresh.reddy@target95.com", subjects: "Java, Algorithms", students: 33, status: "pending", joined: "2026-06-01" },
  { id: "T007", name: "Ms. Deepika Nair", email: "deepika.nair@target95.com", subjects: "Python, Java", students: 27, status: "active", joined: "2026-03-15" },
  { id: "T008", name: "Mr. Vikram Joshi", email: "vikram.joshi@target95.com", subjects: "Computer Science", students: 19, status: "pending", joined: "2026-06-20" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "subjects", label: "Subjects" },
  { key: "students", label: "Students" },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={val} /> },
  { key: "joined", label: "Joined" },
];

export default function AdminTeachersPage() {
  const teachers = placeholderTeachers;
  const activeTeachers = teachers.filter((t) => t.status === "active");
  const totalStudents = teachers.reduce((sum, t) => sum + t.students, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Teachers" value={teachers.length} icon="👩‍🏫" color="cyan" />
        <DashboardCard title="Active Teachers" value={activeTeachers.length} icon="✅" color="emerald" />
        <DashboardCard title="Total Students" value={totalStudents} icon="👨‍🎓" color="violet" />
        <DashboardCard title="Pending Approval" value={teachers.filter((t) => t.status === "pending").length} icon="⏳" color="amber" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle title="Teachers" subtitle="Manage teacher accounts and assignments" />
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            + Add Teacher
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={teachers}
        searchPlaceholder="Search teachers by name, email, subject..."
        onRowClick={(row) => console.log("View teacher:", row.id)}
      />
    </div>
  );
}