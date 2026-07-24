"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function CollapsibleSection({ title, children, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="flex items-center text-xl font-bold text-gray-900">
          {Icon && <Icon className="mr-3 h-6 w-6 text-blue-500" />}
          {title}
        </h2>
        <ChevronDownIcon
          className={`h-6 w-6 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}