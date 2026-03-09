import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveCheckin } from "../services/apiCheckin";

export default function useActiveCheckin() {
  const queryClient = useQueryClient();

  const { data: activeCheckin } = useQuery({
    queryKey: ["activeCheckin"],
    queryFn: getActiveCheckin,
  });

  const startCheckin = ({ checkinId, shopId }) => {
    queryClient.setQueryData(["activeCheckin"], {
      id: checkinId,
      shop_id: shopId,
    });
  };

  const clearCheckin = () => {
    queryClient.setQueryData(["activeCheckin"], null);
  };

  return {
    checkinId: activeCheckin?.id || null,
    shopId: activeCheckin?.shop_id || null,
    startCheckin,
    clearCheckin,
  };
}