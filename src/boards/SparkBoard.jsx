import { SparkCardInput } from "../sparkComponent/SparkCardInput";
import { SparkCard } from "../sparkComponent/SparkCard";
import { BoardHeader } from "./BoardHeader";
import { useQuery } from "@tanstack/react-query";
import { getSpark } from "../api/spark";
import { useLoadingNotfication } from "../hooks/useLoadingNotification";
import { useState } from "react";
import { Icon } from "../icon/Icon";
import { Outlet } from "react-router";

export function SparkBoard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sparks"],
    queryFn: getSpark,
    staleTime: 1000 * 60 * 1,
  });

  const [mode, setMode] = useState("TO_BE_PLANNED");

  useLoadingNotfication(isLoading, isError);

  const filteredData = data?.filter((spark) =>
    mode === "TO_BE_PLANNED" ? !spark.inPlanning : spark.inPlanning,
  );

  return (
    <>
      <section className="bg-[#6b72800e] border-2 border-dashed border-gray-300/80 shadow-xs flex-1 h-full min-h-0 w-[92%] max-w-7xl mx-auto rounded-2xl p-4 sm:p-6 flex flex-col overflow-hidden">
        <BoardHeader type={"SPARK"} count={filteredData?.length || 0}>
          <button
            type="button"
            onClick={() =>
              setMode((prev) =>
                prev === "TO_BE_PLANNED" ? "PLANNED" : "TO_BE_PLANNED",
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border border-gray-200/80 bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 shadow-xs"
          >
            <span
              className={`transition-transform duration-300 inline-flex ${mode === "PLANNED" ? "rotate-180" : "rotate-0"}`}
            >
              <Icon name="SWAP" />
            </span>
            <span
              className={`transition-colors duration-200 ${mode === "PLANNED" ? "text-blue-600 font-semibold" : ""}`}
            >
              {mode === "TO_BE_PLANNED" ? "To be planned" : "Planned"}
            </span>
          </button>
        </BoardHeader>

        <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr pb-2">
            {mode === "TO_BE_PLANNED" && <SparkCardInput />}

            {isLoading ? (
              <p className="text-xs text-gray-400 col-span-full text-center p-4">
                Loading...
              </p>
            ) : isError ? (
              <p className="text-xs text-red-400 col-span-full text-center p-4">
                {error.message}
              </p>
            ) : (
              filteredData?.map((spark) => (
                <SparkCard key={spark.id} spark={spark} />
              ))
            )}
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}
