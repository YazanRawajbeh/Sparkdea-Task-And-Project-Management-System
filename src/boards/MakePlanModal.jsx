import { useState } from "react";
import { Icon } from "../icon/Icon";
import { useNavigate, useSearchParams } from "react-router";

import { useCreatePlan } from "../hooks/useCreatePlan";

export function MakePlanModal() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const searchParam = useSearchParams();
  const sparkId = searchParam[0].get("sparkId");

  let toCreatePlan = useCreatePlan();
  const handleClose = () => navigate("/spark");

  const handleDone = () => {
    if (!name.trim()) return;
    toCreatePlan.mutate({
      id: sparkId,
      name,
      date: new Date().toISOString().split("T")[0],
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Icon name="PLAN" />
            </span>
            <h2 className="text-base font-bold text-gray-800">
              Make it a plan!
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <Icon name="DELETE" />
          </button>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-600">Plan name</label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDone()}
            placeholder="e.g. Mobile App Redesign"
            className="w-full text-sm text-gray-800 placeholder-gray-400 border border-gray-200/90 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-1.5 rounded-xl text-xs font-medium text-gray-600 border border-gray-200/80 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDone}
            disabled={!name.trim()}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#2563EB] text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
