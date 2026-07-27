"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentProfile from "../components/student/StudentProfile";

export default function ProfilePage() { return <ProtectedRoute><main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><StudentProfile /><Footer /></main></ProtectedRoute>; }
