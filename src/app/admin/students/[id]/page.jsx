import { placeholderStudents } from "@/app/data/admin/mockStudents";
import StudentProfileClient from "./StudentProfileClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return placeholderStudents.map((student) => ({
    id: student.id,
  }));
}

export default async function StudentProfilePage({ params }) {
  const { id } = await params;

  const student = placeholderStudents.find(
    (s) => String(s.id) === String(id)
  );

  if (!student) {
    notFound();
  }

  return <StudentProfileClient id={id} />;
}