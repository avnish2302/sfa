import { useQuery } from "@tanstack/react-query";
import { getShops } from "../services/apiShops";

export function useShops() {
  return useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    staleTime: 1000 * 60 * 10,
  });
}