import { addSpark } from "../api/spark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppDispatchContext } from "../context/AppContext";

export function useAddSpark() {
  const queryClient = useQueryClient();
  const dispatch = useContext(AppDispatchContext);

  const addNewSpark = useMutation({
    mutationFn: addSpark,
    onMutate: async (newData) => {
      const uid = crypto.randomUUID();
      await queryClient.cancelQueries({ queryKey: ["sparks"] });
      const oldCache = queryClient.getQueryData(["sparks"]);
      queryClient.setQueryData(["sparks"], (oldData) => [
        ...(oldData ?? []),
        newData,
      ]);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { type: "loading", title: "Creating...", id: uid },
      });

      return { oldCache, uid };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["sparks"] });
      if (context?.uid) {
        dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: context.uid });
      }

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          id: crypto.randomUUID(),
          type: "success",
          title: "Success",
          message: "Spark added successfully.",
        },
      });
    },
    onError: (error, newData, context) => {
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

  return addNewSpark;
}
