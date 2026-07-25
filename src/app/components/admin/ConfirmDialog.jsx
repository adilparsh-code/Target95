"use client";

/**
 * Accessible confirmation dialog (UI only, no CRUD logic).
 * @param {Object} props
 * @param {boolean} props.isOpen - Dialog visibility
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Dialog message
 * @param {string} props.confirmLabel - Confirm button label (default "Confirm")
 * @param {string} props.cancelLabel - Cancel button label (default "Cancel")
 * @param {'danger'|'primary'} props.variant - Visual variant (default "primary")
 * @param {Function} props.onConfirm - Confirm handler
 * @param {Function} props.onCancel - Cancel handler
 */
export default function ConfirmDialog({
  isOpen = false,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const confirmColors =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          variant === "danger" ? "bg-red-100" : "bg-blue-100"
        }`}>
          {variant === "danger" ? (
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-900 text-center mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          {message}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${confirmColors}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}