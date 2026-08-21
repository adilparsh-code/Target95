"use client";

import React from "react";

export default function HomeVisualLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-px w-[min(80vw,900px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
    </div>
  );
}
