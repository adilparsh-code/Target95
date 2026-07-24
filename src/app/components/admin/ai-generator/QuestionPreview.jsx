"use client";

import { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import QuestionToolbar from "./QuestionToolbar";
import { QuestionGeneratorService } from "../../../services/QuestionGeneratorService";

export default function QuestionPreview({ questions, onReset }) {
  const [editingId, setEditingId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (question) => {
    setEditingId(question.id);
    setEditedQuestion({ ...question });
  };

  const handleSaveEdit = async () => {
    if (editedQuestion) {
      try {
        await QuestionGeneratorService.updateQuestion(editingId, editedQuestion);
        setEditingId(null);
        setEditedQuestion(null);
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedQuestion(null);
  };

  const handleDelete = async (id) => {
    try {
      await QuestionGeneratorService.deleteQuestion(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleRegenerate = async (question) => {
    // Regenerate logic would go here
    console.log("Regenerate question:", question);
  };

  const handleDuplicate = async (question) => {
    try {
      const newQuestion = {
        ...question,
        id: undefined,
        createdAt: new Date(),
      };
      await QuestionGeneratorService.saveQuestions([newQuestion]);
      window.location.reload();
    } catch (error) {
      console.error("Error duplicating question:", error);
    }
  };

  const handleCopy = async (question) => {
    try {
      const textToCopy = `Question: ${question.question}\n\nAnswer: ${question.answer}\n\nExplanation: ${question.explanation}`;
      await navigator.clipboard.writeText(textToCopy);
      alert("Question copied to clipboard!");
    } catch (error) {
      console.error("Error copying question:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await QuestionGeneratorService.approveQuestion(id);
      alert("Question approved successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error approving question:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await QuestionGeneratorService.updateQuestion(id, { 
        status: "Draft",
        updatedAt: new Date().toISOString()
      });
      alert("Question rejected and moved to drafts!");
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting question:", error);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await QuestionGeneratorService.saveQuestions(questions);
      alert("All questions saved successfully!");
      onReset();
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("Error saving questions. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Preview Generated Questions</h2>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onReset}>
            Generate New
          </Button>
          <Button onClick={handleSaveAll} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save All to Database"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id || index} className="p-6">
            {editingId === question.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <textarea
                    value={editedQuestion.question}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                    <textarea
                      value={editedQuestion.answer}
                      onChange={(e) => setEditedQuestion({ ...editedQuestion, answer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
                    <textarea
                      value={editedQuestion.explanation}
                      onChange={(e) => setEditedQuestion({ ...editedQuestion, explanation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="secondary" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {question.type}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {question.difficulty}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {question.subject}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {index + 1}. {question.question}
                    </h3>
                  </div>
                  <QuestionToolbar
                    onEdit={() => handleEdit(question)}
                    onDelete={() => handleDelete(question.id)}
                    onRegenerate={() => handleRegenerate(question)}
                    onDuplicate={() => handleDuplicate(question)}
                    onCopy={() => handleCopy(question)}
                    onApprove={() => handleApprove(question.id)}
                    onReject={() => handleReject(question.id)}
                  />
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Correct Answer: </span>
                    <span className="text-sm text-gray-900">{question.answer}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Explanation: </span>
                    <span className="text-sm text-gray-900">{question.explanation}</span>
                  </div>
                  <div className="flex flex-wrap gap-6 mt-3 pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Chapter:</span> {question.chapter}
                    </span>
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Marks:</span> {question.estimatedMarks || question.marks}
                    </span>
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Time:</span> {question.estimatedTime} mins
                    </span>
                    {question.bloomsLevel && (
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Bloom's:</span> {question.bloomsLevel}
                      </span>
                    )}
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span> {question.status}
                    </span>
                  </div>
                  {question.tags && question.tags.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Tags: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {question.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}