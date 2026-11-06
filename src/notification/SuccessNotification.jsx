export function SuccessNotification({
  title = "Operation Successful",
  message = "Action has been completed successfully.",
  onClose,
}) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 p-3 sm:p-3.5 bg-white border border-emerald-200/80 rounded-2xl shadow-xs hover:shadow-sm transition-all select-none max-w-sm w-full"
    >
      {/* Icon Badge */}
      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/70 shadow-2xs">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900 leading-tight truncate">
          {title}
        </p>
        {message && (
          <p className="text-[11px] text-gray-500 font-normal mt-0.5 leading-snug line-clamp-2">
            {message}
          </p>
        )}
      </div>

      {/* Optional Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Close notification"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
