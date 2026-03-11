import { fetchWithAuth } from "./fetchWithAuth";

export async function saveAssetAssignment({ checkinId, items }) {
  const res = await fetchWithAuth("/api/asset-assignment", {
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