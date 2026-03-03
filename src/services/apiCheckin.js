export async function createCheckin(shopId) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/checkin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(shopId),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}