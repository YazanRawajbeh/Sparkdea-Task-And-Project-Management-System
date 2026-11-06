import { deleteSpark } from "../api/spark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppDispatchContext } from "../context/AppContext";

export function useDeleteSpark() {
  const queryClient = useQueryClient();
  const dispatch = useContext(AppDispatchContext);

  const toDeleteSpark = useMutation({
    mutationFn: deleteSpark,
    onMutate: async (id) => {
      const uid = crypto.randomUUID();
      await queryClient.cancelQueries({ queryKey: ["sparks"] });
      const oldCache = queryClient.getQueryData(["sparks"]) || [];
      const newCache = oldCache.filter((ele) => ele.id !== id);
      queryClient.setQueryData(["sparks"], [...newCache]);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { type: "loading", title: "Deleting...", id: uid },
      });

      return { oldCache, uid };
    },
    onSuccess: (data, id, context) => {
      if (context?.uid) {
        dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: context.uid });
      }
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          id: crypto.randomUUID(),
          type: "success",
          title: "Success",
          message: "Spark deleted successfully.",
        },
      });
    },
    onError: (error, id, context) => {
      if (context?.uid) {
        dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: context.uid });
      }
      if (context?.oldCache) {
        queryClient.setQueryData(["sparks"], context.oldCache);
      }
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          id: crypto.randomUUID(),
          type: "error",
          title: "Error",
          message: error.message,
        },
      });
    },
  });

  return toDeleteSpark;
}
