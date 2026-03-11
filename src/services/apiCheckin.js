export async function createCheckin(data) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.message)
  return result
}


const API_URL = "http://localhost:5000/api/checkin"


export async function getActiveCheckin() {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/active`, {
    headers: {Authorization: `Bearer ${token}`}
  })
  const data = await res.json();
  if (!res.ok) throw new Error(data.message)
  return data
}