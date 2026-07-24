"use client";

import { useState } from "react";
import Card from "../../ui/Card";
import QuestionToolbar from "./QuestionToolbar";

export default function GeneratedQuestionCard({ question, onDelete, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState({ ...question });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onUpdate(editedQuestion);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedQuestion({ ...question });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-5 flex-1">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <textarea
                value={editedQuestion.question}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <textarea
                value={editedQuestion.answer}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, answer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={2}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {question.type || question.questionType}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  {question.difficulty}
                </span>
                {question.bloomsLevel && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    {question.bloomsLevel}
                  </span>
                )}
              </div>
              <QuestionToolbar
                onEdit={handleEdit}
                onDelete={onDelete}
                onRegenerate={() => {}}
                onDuplicate={() => {}}
              />
            </div>
            
            <h3 className="text-base font-medium text-gray-900 mb-3 line-clamp-3">
              {question.question}
            </h3>
            
            {isExpanded && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Answer: </span>
                  <span className="text-gray-900">{question.answer}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Explanation: </span>
                  <span className="text-gray-900">{question.explanation}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200">
                  <span className="text-gray-600">
                    <span className="font-medium">Subject:</span> {question.subject}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Chapter:</span> {question.chapter}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Board:</span> {question.board}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Class:</span> {question.class}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Marks:</span> {question.estimatedMarks || question.marks}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Time:</span> {question.estimatedTime} mins
                  </span>
                  {question.bloomsLevel && (
                    <span className="text-gray-600">
                      <span className="font-medium">Bloom's:</span> {question.bloomsLevel}
                    </span>
                  )}
                  <span className="text-gray-600">
                    <span className="font-medium">Status:</span> {question.status}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Created:</span> {formatDate(question.createdAt)}
                  </span>
                </div>
                {question.tags && question.tags.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="font-medium text-gray-700">Tags: </span>
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
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </>
        )}
      </div>
    </Card>
  );
}