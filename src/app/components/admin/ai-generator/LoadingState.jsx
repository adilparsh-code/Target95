"use client";

import Card from "../../ui/Card";
import { CardSkeleton } from "../../ui/LoadingSkeleton";

export default function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Generating Questions...</h3>
          <p className="text-sm text-gray-500 mt-1">Our AI is creating your custom questions</p>
        </div>
      </div>
      
      <CardSkeleton rows={3} />
    </div>
  );
}