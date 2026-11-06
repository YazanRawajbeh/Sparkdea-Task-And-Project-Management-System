import { useMutation } from "@tanstack/react-query";
import { makeIsPlanned } from "../api/spark";
import { AppDispatchContext } from "../context/AppContext";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useMakeIsPlanned() {
  let dispatch = useContext(AppDispatchContext);
  let queryClient = useQueryClient();

  return useMutation({
    mutationFn: makeIsPlanned,
    onMutate: async (id) => {
      const uid = crypto.randomUUID();
      await queryClient.cancelQueries({ queryKey: ["sparks"] });
      let oldData = queryClient.getQueryData(["sparks"]) || [];
      const newCache = oldData.map((spark) =>
        spark.id === id ? { ...spark, inPlanning: true } : spark,
      );
      queryClient.setQueryData(["sparks"], newCache);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { type: "loading", title: "Adding to plan...", id: uid },
      });

      return { oldData, uid };
    },
    onSuccess: (data, id, context) => {
      queryClient.invalidateQueries({ queryKey: ["sparks"] });
      dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: context.uid });

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          id: crypto.randomUUID(),
          type: "success",
          title: "Success",
          message: "Spark moved to plan successfully.",
        },
      });
    },
    onError: (error, id, context) => {
      if (context?.oldData) {
        queryClient.setQueryData(["sparks"], context.oldData);
      }
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          id: crypto.randomUUID(),
          type: "error",
          title: "Error",
          message: "Failed to mark spark as in planning.",
        },
      });
      dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: context.uid });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sparks"] });
    },
  });
}
