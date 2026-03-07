const API_URL = "http://localhost:5000/api/checkout";

export async function getCheckinSummary(checkinId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/summary/${checkinId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function checkout(checkinId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${checkinId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}