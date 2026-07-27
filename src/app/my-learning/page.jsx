"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import PersonalizedLearning from "../components/learning/PersonalizedLearning";

export default function MyLearningPage() { return <ProtectedRoute><main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><PersonalizedLearning /><Footer /></main></ProtectedRoute>; }
