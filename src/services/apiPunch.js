import { fetchWithAuth } from "./fetchWithAuth";

export async function punchIn(data) {
  const payload = {
    own_vehicle: data.ownVehicle,
    vehicle_type: data.vehicleType,
    odometer_reading: data.odometerReading,
  };

  const res = await fetchWithAuth("/api/punch/in", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
}

export async function getPunchSummary() {
  const res = await fetchWithAuth("/api/punch/summary");

  if (!res.ok) throw new Error("Failed to fetch summary");

  return res.json();
}

export async function punchOut(data) {
  const res = await fetchWithAuth("/api/punch/out", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
}