export async function saveCollection({ checkinId, data }) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      checkin_id: checkinId,
      ...data,
    }),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
}