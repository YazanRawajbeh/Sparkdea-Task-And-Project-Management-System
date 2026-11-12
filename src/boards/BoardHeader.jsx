import { Icon } from "../icon/Icon";

export function BoardHeader({ type, count, children }) {
  return (
    <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200/60 shrink-0">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
          <Icon name={type} />
        </span>
        <h2 className="text-base sm:text-lg font-bold text-gray-800">
          {type} Space
        </h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200/70 text-gray-700 font-semibold">
          {count}
        </span>
      </div>
      {children}
    </div>
  );
}
