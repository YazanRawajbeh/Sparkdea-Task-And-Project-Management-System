import { useEffect, useContext } from "react";
import { AppDispatchContext } from "../context/AppContext";

export function useLoadingNotfication(isLoading, isError) {
  let dispatch = useContext(AppDispatchContext);

  useEffect(() => {
    if (isLoading) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { type: "loading", id: "INITIAL_LOADING" },
      });
    } else if (isError) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { type: "error", id: "ERORR" },
      });
    } else {
      dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: "INITIAL_LOADING" });
    }

    return () => {
      dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: "INITIAL_LOADING" });
      dispatch({ type: "CLOSE_NOTIFICATION", idToDelete: "ERORR" });
    };
  }, [isError, isLoading, dispatch]);
}
