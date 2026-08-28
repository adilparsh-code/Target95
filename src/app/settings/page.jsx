"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentSettings from "../components/student/StudentSettings";

export default function SettingsPage() { return <ProtectedRoute><main className="min-h-screen bg-slate-50 text-slate-900"><Navbar /><section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8"><div className="mb-6 rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Preferences</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Settings</h1><p className="mt-3 text-slate-300">Control your learning, notifications, appearance and account preferences.</p></div><StudentSettings /></section><Footer /></main></ProtectedRoute>; }
