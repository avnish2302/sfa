export async function getShops() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/shops", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch shops");

  return res.json();
}