"use client";

export default function SaveBar({ onSave, onReset, hasChanges = false, isSaving = false, saveLabel = "Save Changes" }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {hasChanges && (
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Unsaved changes
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            disabled={!hasChanges}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              hasChanges
                ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
                : "text-gray-400 bg-gray-50 cursor-not-allowed"
            }`}
          >
            Reset
          </button>
        )}
        <button
          onClick={onSave}
          disabled={isSaving}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all shadow-sm ${
            isSaving
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          }`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : (
            saveLabel
          )}
        </button>
      </div>
    </div>
  );
}