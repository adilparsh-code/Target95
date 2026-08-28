"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentProfile from "../components/student/StudentProfile";

export default function ProfilePage() { return <ProtectedRoute><main className="min-h-screen bg-slate-50 text-slate-900"><Navbar /><section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8"><div className="mb-6 rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 text-white shadow-xl sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Student profile</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Your Target95+ Profile</h1><p className="mt-3 text-slate-300">Keep your academic preferences and learning identity up to date.</p></div><StudentProfile /></section><Footer /></main></ProtectedRoute>; }
