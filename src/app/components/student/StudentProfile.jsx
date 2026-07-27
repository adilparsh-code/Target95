"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useStudentProfile from "@/app/hooks/useStudentProfile";
import Button from "../ui/Button";

const statItems = [
  ["Current streak", "currentStreak", "days"], ["Questions solved", "totalQuestionsSolved", ""], ["Accuracy", "accuracy", "%"],
  ["Mock tests", "mockTestsAttempted", ""], ["Bookmarks", "bookmarkedQuestions", ""],
];

export default function StudentProfile() {
  const { user, joinDate, stats } = useStudentProfile();
  const { updateStudentProfile } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName || "", board: user?.board || "ICSE", studentClass: user?.studentClass || "Class 10" });
  const [message, setMessage] = useState("");

  const saveProfile = async (event) => {
    event.preventDefault();
    const result = await updateStudentProfile(form);
    setMessage(result.success ? "Profile updated." : result.message);
  };

  const initials = (user?.fullName || user?.email || "T").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    <header className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">{user?.avatarUrl ? <img src={user.avatarUrl} alt="Profile avatar" className="h-full w-full rounded-full object-cover" /> : initials}</div><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Student profile</p><h1 className="mt-2 text-3xl font-bold text-gray-900">{user?.fullName || "Your learning profile"}</h1><p className="mt-1 break-all text-sm text-gray-600">{user?.email}</p></div></div></header>
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Learning statistics">{statItems.map(([label, key, suffix]) => <article key={key} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-gray-600">{label}</p><p className="mt-2 text-3xl font-bold text-gray-900">{stats[key]}{suffix && <span className="ml-1 text-base">{suffix}</span>}</p></article>)}</section>
    <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"><form onSubmit={saveProfile} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-gray-900">Profile details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Name" value={form.fullName} onChange={(value) => setForm((current) => ({ ...current, fullName: value }))} /><Field label="Email" value={user?.email || ""} disabled /><Field label="Board" value={form.board} onChange={(value) => setForm((current) => ({ ...current, board: value }))} options={["ICSE", "ISC"]} /><Field label="Class" value={form.studentClass} onChange={(value) => setForm((current) => ({ ...current, studentClass: value }))} options={["Class 9", "Class 10", "Class 11", "Class 12"]} /></div>{message ? <p className="mt-4 text-sm text-blue-700">{message}</p> : null}<Button type="submit" className="mt-6">Save profile</Button></form><aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-gray-900">Academic summary</h2><dl className="mt-5 space-y-4 text-sm"><Info label="Board" value={user?.board || "ICSE"} /><Info label="Class" value={user?.studentClass || "Class 10"} /><Info label="Joined" value={joinDate ? joinDate.toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "Recently"} /><Info label="Learning focus" value="Computer Science" /></dl></aside></section>
  </div>;
}

function Field({ label, value, onChange, options, disabled = false }) { return <label className="text-sm font-semibold text-gray-700"><span className="mb-2 block">{label}</span>{options ? <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-normal text-gray-900"><>{options.map((option) => <option key={option}>{option}</option>)}</></select> : <input value={value} disabled={disabled} onChange={(event) => onChange?.(event.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-normal text-gray-900 disabled:bg-gray-100" />}</label>; }
function Info({ label, value }) { return <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"><dt className="text-gray-600">{label}</dt><dd className="text-right font-semibold text-gray-900">{value}</dd></div>; }
