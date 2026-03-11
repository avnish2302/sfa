import { fetchWithAuth } from "./fetchWithAuth";

export async function savePromotions({ checkinId, data }) {
  const res = await fetchWithAuth("/api/promotions", {
    method: "POST",
    body: JSON.stringify({
      checkin_id: checkinId,
      ...data,
    }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
}