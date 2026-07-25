"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfileAvatar({ name = "U", size = "large", onUpload }) {
  const [preview, setPreview] = useState(null);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = size === "large" ? "w-20 h-20 text-2xl" : "w-14 h-14 text-lg";
  const badgeSize = size === "large" ? "w-7 h-7 text-xs" : "w-5 h-5 text-[10px]";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target?.result);
        onUpload?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative inline-block group">
      <div
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md overflow-hidden relative`}
      >
        {preview ? (
          <Image src={preview} alt="Profile" fill className="object-cover" sizes="80px" />
        ) : (
          initials
        )}
      </div>
      <label
        htmlFor="avatar-upload"
        className={`absolute -bottom-1 -right-1 ${badgeSize} bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors`}
        aria-label="Upload profile photo"
      >
        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}