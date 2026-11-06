export function LoadingNotification({
  title = "Loading...",
  message = "Please wait while we process your request.",
}) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 p-3 sm:p-3.5 bg-white border border-blue-200/80 rounded-2xl shadow-xs hover:shadow-sm transition-all select-none max-w-sm w-full relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-100 overflow-hidden">
        <div className="w-full h-full bg-blue-600 origin-left animate-pulse" />
      </div>

      {/* Modern Spinner Badge */}
      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/70 shadow-2xs relative">
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-semibold text-gray-900 leading-tight truncate">
            {title}
          </p>
          <span className="flex gap-0.5">
            <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" />
          </span>
        </div>
        {message && (
          <p className="text-[11px] text-gray-500 font-normal mt-0.5 leading-snug line-clamp-2">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
