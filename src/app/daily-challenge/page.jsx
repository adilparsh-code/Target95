"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import DailyChallenge from "../components/gamification/DailyChallenge";

export default function DailyChallengePage() { return <ProtectedRoute><main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><DailyChallenge /><Footer /></main></ProtectedRoute>; }
