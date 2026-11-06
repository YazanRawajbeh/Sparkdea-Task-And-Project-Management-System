import { useMutation } from "@tanstack/react-query";
import { makeAPlan } from "../api/plan";

export function useMakeAPlan() {
  return useMutation({
    mutationKey: ["plans"],
    mutationFn: makeAPlan,
    onSuccess: () => {},
  });
}
