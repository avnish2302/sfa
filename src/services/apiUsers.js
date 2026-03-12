import { fetchWithAuth } from "./fetchWithAuth";

export default async function getSalesmen() {
  const res = await fetchWithAuth("/api/users/salesmen");
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}