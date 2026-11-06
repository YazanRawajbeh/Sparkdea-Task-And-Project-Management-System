export function ErrorNotification({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  onClose,
}) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 p-3 sm:p-3.5 bg-white border border-rose-200/80 rounded-2xl shadow-xs hover:shadow-sm transition-all select-none max-w-sm w-full"
    >
      {/* Icon Badge */}
      <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/70 shadow-2xs">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900 leading-tight truncate">
          {title}
        </p>
        {message && (
          <p className="text-[11px] text-rose-600/90 font-normal mt-0.5 leading-snug line-clamp-2">
            {message}
          </p>
        )}
      </div>

      {/* Optional Retry Button */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-2 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Retry
        </button>
      )}

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
