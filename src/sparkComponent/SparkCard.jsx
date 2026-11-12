import { Icon } from "../icon/Icon";
import { useDeleteSpark } from "../hooks/useDeleteSpark";
import { useNavigate } from "react-router";

export function SparkCard({ spark }) {
  const { inPlanning } = spark;

  let toDeleteSpark = useDeleteSpark();

  const nav = useNavigate();

  return (
    <article className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] group">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
            <Icon name="SPARK" />
            <span>Spark</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-normal text-gray-400">
            {spark.date}
          </span>
        </div>

        <p className="text-sm text-gray-800 leading-relaxed font-normal whitespace-pre-wrap break-words">
          {spark.text}
        </p>
      </div>

      <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-end">
        {/* Make it plan Button */}
        <button
          type="button"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${inPlanning
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200/70"
            }`}
          title="Convert spark to plan"
          onClick={() => nav(`/spark/initiate-plan?sparkId=${spark.id}`)}
          disabled={inPlanning}
        >
          <Icon name={inPlanning ? "CHECK" : "PLAN"} />
          <span>{inPlanning ? "Go to the plan board" : "Make it plan"}</span>
        </button>
        {/* Delete Button */}
        <button
          type="button"
          className="flex items-center ml-1 gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200/70"
          onClick={() => toDeleteSpark.mutate(spark.id)}
        >
          <Icon name={"DELETE"} />
          <span>Delete it</span>
        </button>
      </div>
    </article>
  );
}
