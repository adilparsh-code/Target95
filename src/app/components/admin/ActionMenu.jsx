"use client";

import { useState, useRef, useEffect } from "react";

/**
 * Reusable dropdown action menu with keyboard navigation.
 * @param {Object} props
 * @param {Array} props.actions - Array of action items [{ label, icon?, onClick?, variant? }]
 * @param {string} props.variant - Button variant: "dots" | "icon"
 * @param {string} props.className - Additional classes for the button
 */
export default function ActionMenu({ actions = [], variant = "dots", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < actions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : actions.length - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && actions[focusedIndex]) {
          actions[focusedIndex].onClick?.();
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }
        }}
        className={`p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
        aria-label="Open action menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {variant === "dots" ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div
            className="absolute right-0 top-full mt-1 z-20 w-44 bg-white rounded-xl border border-gray-200 shadow-lg py-1 overflow-hidden"
            role="menu"
            onKeyDown={handleKeyDown}
          >
            {actions.map((action, idx) => (
              action.divider ? (
                <div key={idx} className="border-t border-gray-100 my-1" />
              ) : (
                <button
                  key={idx}
                  onClick={() => {
                    action.onClick?.();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                    focusedIndex === idx ? "bg-gray-50" : ""
                  } ${
                    action.variant === "danger"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  role="menuitem"
                  tabIndex={-1}
                >
                  {action.icon && <span className="w-4 h-4 flex items-center justify-center">{action.icon}</span>}
                  {action.label}
                </button>
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
}