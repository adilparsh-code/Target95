"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentSettings from "../components/student/StudentSettings";

export default function SettingsPage() { return <ProtectedRoute><main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><StudentSettings /><Footer /></main></ProtectedRoute>; }
