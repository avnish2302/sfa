import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export function useUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}