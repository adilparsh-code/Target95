"use client";

import { useState } from "react";

/**
 * Tabs — Reusable tabbed interface.
 * @param {Array} tabs - Array of { id, label, icon?, badge?, disabled? }
 * @param {string} defaultTab - Initial active tab id
 * @param {function} onChange - Called with active tab id
 * @param {'horizontal'|'vertical'} orientation
 */

export default function Tabs({
  tabs = [],
  defaultTab,
  onChange,
  orientation = "horizontal",
  className = "",
  children,
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  const isHorizontal = orientation === "horizontal";

  return (
    <div className={className}>
      <div
        className={`flex ${
          isHorizontal ? "flex-row overflow-x-auto" : "flex-col"
        } gap-1 border-b border-border`}
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold transition border-b-2 -mb-px ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              } ${tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
              {tab.label}
              {tab.badge != null && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="pt-4">
        {children
          ? children
          : tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <div key={tab.id} role="tabpanel">
                    {tab.content}
                  </div>
                )
            )}
      </div>
    </div>
  );
}