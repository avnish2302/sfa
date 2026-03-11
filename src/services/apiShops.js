import { fetchWithAuth } from "./fetchWithAuth";

export async function getShops() {
  const res = await fetchWithAuth("/api/shops");

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}