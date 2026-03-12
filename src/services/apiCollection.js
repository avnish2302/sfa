import { fetchWithAuth } from "./fetchWithAuth";

export async function saveCollection({ checkinId, data }) {
  const res = await fetchWithAuth("/api/collection", {
    method: "POST",
    body: JSON.stringify({
      checkin_id: checkinId,
      ...data,
    }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
}

export async function getCollection(checkinId){
  const res = await fetchWithAuth(`/api/collection/${checkinId}`)
  const data = await res.json()

  if(!res.ok) throw new Error(data.message)

  return data
}