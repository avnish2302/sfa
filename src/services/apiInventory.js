export async function saveOwnInventory({ checkinId, items }) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/inventory/own", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      checkin_id: checkinId,
      items,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}