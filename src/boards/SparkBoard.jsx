import { SparkCardInput } from "../sparkComponent/SparkCardInput";
import { SparkCard } from "../sparkComponent/SparkCard";
import { BoardHeader } from "./BoardHeader";
import { useQuery } from "@tanstack/react-query";
import { getSpark } from "../api/spark";
import { useLoadingNotfication } from "../hooks/useLoadingNotification";

export function SparkBoard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sparks"],
    queryFn: getSpark,
    staleTime: 1000 * 60 * 1,
  });

  useLoadingNotfication(isLoading, isError);

  return (
    <section className="bg-[#6b72800e] border-2 border-dashed border-gray-300/80 shadow-xs flex-1 h-full min-h-0 w-[92%] max-w-7xl mx-auto rounded-2xl p-4 sm:p-6 flex flex-col overflow-hidden">
      <BoardHeader type={"SPARK"} count={data?.length || 0} />

      <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr pb-2">
          <SparkCardInput />

          {isLoading ? (
            <p className="text-xs text-gray-400 col-span-full text-center p-4">
              Loading...
            </p>
          ) : isError ? (
            <p className="text-xs text-red-400 col-span-full text-center p-4">
              {error.message}
            </p>
          ) : (
            data?.map((spark) => <SparkCard key={spark.id} spark={spark} />)
          )}
        </div>
      </div>
    </section>
  );
}
