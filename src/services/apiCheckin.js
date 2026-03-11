import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = "/api/checkin";

export async function createCheckin(data) {
  const res = await fetchWithAuth(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
}

export async function getActiveCheckin() {
  const res = await fetchWithAuth(`${API_URL}/active`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}