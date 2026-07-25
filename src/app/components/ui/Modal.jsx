"use client";

import { useEffect, useRef } from "react";

/**
 * Modal — Accessible modal dialog with overlay.
 * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Called when modal should close
 * @param {string} title - Modal title
 * @param {string} size - sm | md | lg | xl | full
 */

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full mx-4",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showClose = true,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={dialogRef}
        className={`w-full ${sizeClasses[size] || sizeClasses.md} rounded-3xl border border-border bg-card shadow-xl animate-fade-in`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            {showClose && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}