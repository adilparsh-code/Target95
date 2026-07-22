 "use client";

import { useState, useMemo } from "react";
import {
  pdfCards,
  cheatSheets,
  revisionNotes,
  formulaSheets,
  programmingNotes,
  studyCategories,
  studyTags,
} from "../../data/studyMaterialData";
import { SearchInput } from "../ui/FilterBar";
import Tabs from "../ui/Tabs";
import Modal from "../ui/Modal";

function NoteCard({ item, icon, children }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">{icon || item.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
            {children}
          </div>
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={item.title} size="md">
        <div className="space-y-3">
          {Object.entries(item).map(([key, val]) => {
            if (key === "id" || key === "icon") return null;
            return (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <span className="font-semibold text-gray-900">{String(val)}</span>
              </div>
            );
          })}
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Download Resource
          </button>
        </div>
      </Modal>
    </>
  );
}

export default function NotesLibrary() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("pdfs");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredPDFs = useMemo(() => {
    return pdfCards.filter((pdf) => {
      if (search && !pdf.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory !== "All" && pdf.category !== selectedCategory) return false;
      return true;
    });
  }, [search, selectedCategory]);

  const filteredCheatSheets = useMemo(() => {
    return cheatSheets.filter((cs) => {
      if (search && !cs.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search]);

  const tabs = [
    { id: "pdfs", label: "📄 PDF Notes", badge: pdfCards.length },
    { id: "cheatsheets", label: "⚡ Cheat Sheets", badge: cheatSheets.length },
    { id: "revision", label: "📝 Revision Notes", badge: revisionNotes.length },
    { id: "formulas", label: "📐 Formula Sheets", badge: formulaSheets.length },
    { id: "programming", label: "💻 Programming", badge: programmingNotes.length },
  ];

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Study Material</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Professional Notes Library 📚</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
          Browse PDF notes, cheat sheets, revision notes, formula sheets, and programming examples.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search study materials..." />
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none focus:border-blue-600"
            >
              {studyCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Tag:</span>
            <div className="flex flex-wrap gap-1.5">
              {studyTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? "All" : tag)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    selectedTag === tag ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="pdfs" onChange={setActiveTab} />

      {/* PDF Notes Tab */}
      {activeTab === "pdfs" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPDFs.map((pdf) => (
            <NoteCard key={pdf.id} item={pdf}>
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-700">
                <span>{pdf.pages} pages</span>
                <span>{pdf.size}</span>
                <span>⬇️ {pdf.downloads}</span>
              </div>
            </NoteCard>
          ))}
        </div>
      )}

      {/* Cheat Sheets Tab */}
      {activeTab === "cheatsheets" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCheatSheets.map((cs) => (
            <NoteCard key={cs.id} item={cs}>
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-700">
                <span>{cs.items} items</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  cs.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                  cs.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>{cs.difficulty}</span>
              </div>
            </NoteCard>
          ))}
        </div>
      )}

      {/* Revision Notes Tab */}
      {activeTab === "revision" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {revisionNotes.map((rn) => (
            <NoteCard key={rn.id} item={rn}>
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-700">
                <span>{rn.topics} topics</span>
                <span>⏱️ {rn.time}</span>
              </div>
            </NoteCard>
          ))}
        </div>
      )}

      {/* Formula Sheets Tab */}
      {activeTab === "formulas" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {formulaSheets.map((fs) => (
            <NoteCard key={fs.id} item={fs}>
              <div className="mt-1 text-xs text-gray-700">
                {fs.formulas} formulas
              </div>
            </NoteCard>
          ))}
        </div>
      )}

      {/* Programming Notes Tab */}
      {activeTab === "programming" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programmingNotes.map((pn) => (
            <NoteCard key={pn.id} item={pn}>
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-700">
                <span>{pn.examples} examples</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  pn.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                  pn.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>{pn.difficulty}</span>
              </div>
            </NoteCard>
          ))}
        </div>
      )}
    </section>
  );
}