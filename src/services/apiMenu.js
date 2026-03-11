import { fetchWithAuth } from "./fetchWithAuth";

export async function saveMenu({ checkinId, items }) {
  const res = await fetchWithAuth("/api/menu", {
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