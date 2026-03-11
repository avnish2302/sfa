import { fetchWithAuth } from "./fetchWithAuth";

export async function getCurrentUser() {
  const res = await fetchWithAuth("/api/auth/me");

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}