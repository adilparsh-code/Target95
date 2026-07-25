"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";

const entityLabels = { subjects: "Subject", chapters: "Chapter", topics: "Topic", questions: "Question" };
const blankQuestion = { title: "", subject: "", chapter: "", topic: "", board: "ICSE", class: "ICSE X", type: "mcq", difficulty: "Easy", tags: [], explanation: "", marks: 1, estimatedTime: 2, status: "draft", statement: "", constraints: "", sampleInput: "", sampleOutput: "", algorithm: "", javaSolution: "", dryRun: "", timeComplexity: "", spaceComplexity: "", commonMistakes: "" };
const blankContent = { name: "", slug: "", description: "", board: "ICSE", class: "ICSE X", status: "draft", order: 0, subject: "", chapter: "" };

function Field({ label, children }) { return <label className="block space-y-1"><span className="text-sm font-medium text-gray-700">{label}</span>{children}</label>; }
const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export default function ContentEditor({ entity, item, isOpen, onClose, onSave }) {
  const [form, setForm] = useState(entity === "questions" ? blankQuestion : blankContent);
  const [saving, setSaving] = useState(false);
  const isQuestion = entity === "questions";

  useEffect(() => setForm(item ? { ...(isQuestion ? blankQuestion : blankContent), ...item } : (isQuestion ? blankQuestion : blankContent)), [item, isOpen, isQuestion]);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try { await onSave({ ...form, tags: Array.isArray(form.tags) ? form.tags : form.tags.split(",").map((tag) => tag.trim()).filter(Boolean), order: Number(form.order), marks: Number(form.marks), estimatedTime: Number(form.estimatedTime) }); onClose(); }
    finally { setSaving(false); }
  };

  return <Modal isOpen={isOpen} onClose={onClose} title={`${item ? "Edit" : "Create"} ${entityLabels[entity]}`} size="2xl"><form onSubmit={submit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-2">
    {isQuestion ? <>
      <Field label="Title"><input required value={form.title} onChange={(event) => update("title", event.target.value)} className={inputClass} /></Field>
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Subject"><input required value={form.subject} onChange={(event) => update("subject", event.target.value)} className={inputClass} /></Field><Field label="Chapter"><input required value={form.chapter} onChange={(event) => update("chapter", event.target.value)} className={inputClass} /></Field></div>
      <div className="grid gap-4 sm:grid-cols-3"><Field label="Topic"><input required value={form.topic} onChange={(event) => update("topic", event.target.value)} className={inputClass} /></Field><Field label="Board"><select value={form.board} onChange={(event) => update("board", event.target.value)} className={inputClass}><option>ICSE</option><option>ISC</option></select></Field><Field label="Question type"><select value={form.type} onChange={(event) => update("type", event.target.value)} className={inputClass}><option value="mcq">MCQ</option><option value="theory">Theory</option><option value="programming">Programming</option></select></Field></div>
      <Field label="Statement"><textarea required value={form.statement} onChange={(event) => update("statement", event.target.value)} rows={4} className={inputClass} /></Field>
      <div className="grid gap-4 sm:grid-cols-3"><Field label="Difficulty"><select value={form.difficulty} onChange={(event) => update("difficulty", event.target.value)} className={inputClass}><option>Easy</option><option>Medium</option><option>Hard</option></select></Field><Field label="Marks"><input type="number" min="1" value={form.marks} onChange={(event) => update("marks", event.target.value)} className={inputClass} /></Field><Field label="Estimated minutes"><input type="number" min="1" value={form.estimatedTime} onChange={(event) => update("estimatedTime", event.target.value)} className={inputClass} /></Field></div>
      <Field label="Tags (comma separated)"><input value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags} onChange={(event) => update("tags", event.target.value)} className={inputClass} /></Field><Field label="Explanation"><textarea value={form.explanation} onChange={(event) => update("explanation", event.target.value)} rows={3} className={inputClass} /></Field>
      {form.type === "programming" && <div className="space-y-4 rounded-xl border border-blue-100 bg-blue-50 p-4"><p className="font-semibold text-blue-900">Programming details</p><Field label="Constraints"><textarea value={form.constraints} onChange={(event) => update("constraints", event.target.value)} className={inputClass} /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Sample input"><textarea value={form.sampleInput} onChange={(event) => update("sampleInput", event.target.value)} className={inputClass} /></Field><Field label="Sample output"><textarea value={form.sampleOutput} onChange={(event) => update("sampleOutput", event.target.value)} className={inputClass} /></Field></div><Field label="Algorithm"><textarea value={form.algorithm} onChange={(event) => update("algorithm", event.target.value)} className={inputClass} /></Field><Field label="Java solution"><textarea value={form.javaSolution} onChange={(event) => update("javaSolution", event.target.value)} rows={7} className={`${inputClass} font-mono`} /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Dry run"><textarea value={form.dryRun} onChange={(event) => update("dryRun", event.target.value)} className={inputClass} /></Field><Field label="Common mistakes"><textarea value={form.commonMistakes} onChange={(event) => update("commonMistakes", event.target.value)} className={inputClass} /></Field></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Time complexity"><input value={form.timeComplexity} onChange={(event) => update("timeComplexity", event.target.value)} className={inputClass} /></Field><Field label="Space complexity"><input value={form.spaceComplexity} onChange={(event) => update("spaceComplexity", event.target.value)} className={inputClass} /></Field></div></div>}
    </> : <><Field label="Name"><input required value={form.name} onChange={(event) => update("name", event.target.value)} className={inputClass} /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Slug"><input value={form.slug} onChange={(event) => update("slug", event.target.value)} className={inputClass} /></Field><Field label="Display order"><input type="number" min="0" value={form.order} onChange={(event) => update("order", event.target.value)} className={inputClass} /></Field></div><Field label="Description"><textarea value={form.description} onChange={(event) => update("description", event.target.value)} rows={3} className={inputClass} /></Field></>}
    <Field label="Status"><select value={form.status} onChange={(event) => update("status", event.target.value)} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></Field>
    <div className="flex justify-end gap-3 border-t border-gray-100 pt-4"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
  </form></Modal>;
}
