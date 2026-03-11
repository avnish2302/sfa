import { fetchWithAuth } from "./fetchWithAuth";

export async function saveOwnInventory({ checkinId, items }) {
  const res = await fetchWithAuth("/api/inventory/own", {
    method: "POST",
    body: JSON.stringify({
      checkin_id: checkinId,
      items,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function saveCompetitorInventory({ checkinId, items }) {
  const res = await fetchWithAuth("/api/inventory/competitor", {
    method: "POST",
    body: JSON.stringify({
      checkin_id: checkinId,
      items,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}