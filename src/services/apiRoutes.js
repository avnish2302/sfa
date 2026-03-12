import { fetchWithAuth } from "./fetchWithAuth";


// create routes
export async function createRoutes(data) {
  const res = await fetchWithAuth("/api/routes", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
}


// get routes
export async function getRoutes(date, user) {
  const res = await fetchWithAuth(
    `/api/routes?date=${date}&user=${user}`
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}


// approve routes
export async function approveRoutes(data) {
  const res = await fetchWithAuth("/api/routes/approve", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
}

export async function createManagerRoutes(data) {
  const res = await fetchWithAuth("/api/routes/manager", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
}