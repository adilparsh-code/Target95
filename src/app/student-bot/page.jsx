"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import StudentBotApp from "./StudentBotApp";

// Client-side gate is UX only; every API call is authorised again on the server.
const STUDENT_ONLY = ["student"];

export default function StudentBotPage() {
  return (
    <ProtectedRoute allowedRoles={STUDENT_ONLY}>
      <StudentBotApp />
    </ProtectedRoute>
  );
}
