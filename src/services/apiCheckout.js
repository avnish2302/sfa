import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = "/api/checkout";

export async function getCheckinSummary(checkinId) {
  const res = await fetchWithAuth(`${API_URL}/summary/${checkinId}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function checkout(checkinId) {
  const res = await fetchWithAuth(`${API_URL}/${checkinId}`, {
    method: "POST",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}