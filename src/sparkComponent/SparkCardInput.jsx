import { useEffect, useState } from "react";
import { Icon } from "../icon/Icon";
import { useAddSpark } from "../hooks/useAddSpark";
import { useContext } from "react";
import { AppDispatchContext } from "../context/AppContext";

export function SparkCardInput() {
  const [content, setContent] = useState("");
  const addNewSpark = useAddSpark();
  const dispatch = useContext(AppDispatchContext);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    addNewSpark.mutate(
      {
        text: trimmed,
        date: new Date().toISOString().split("T")[0],
        inPlanning: false,
      },
      { onSuccess: () => setContent("") },
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 sm:p-5 border border-blue-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] bg-gradient-to-b from-white to-blue-50/25 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs tracking-wide">
          <Icon name="SPARK" />
          <span>New Spark</span>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">
          Quick Idea
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What's your spark idea?"
        rows={3}
        className="w-full resize-none text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none leading-relaxed"
      />

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
        <span className="text-[11px] text-gray-400">Press Enter ↵</span>
        <button
          type="submit"
          disabled={!content.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#2563EB] text-white hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
        >
          <Icon name="PLUS" />
          <span>New Spark</span>
        </button>
      </div>
    </form>
  );
}
