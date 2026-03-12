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

export async function getPromotions(checkinId) {
  const res = await fetchWithAuth(`/api/promotions/${checkinId}`);

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}