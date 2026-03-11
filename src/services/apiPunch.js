export async function punchIn(data) {
  const token = localStorage.getItem("token")
  const payload = {
    own_vehicle: data.ownVehicle,
    vehicle_type: data.vehicleType,
    odometer_reading: data.odometerReading,
  }
  const res = await fetch("http://localhost:5000/api/punch/in", {
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    body: JSON.stringify(payload)
  })
/*
 res means response object returned by the server.
 When fetch() sends a request, the server replies with a HTTP response. example HTTP/1.1 2021 Created.
 The entire metadata is stored inside res. res looks like,
  res = { ok : true, 
          status : 201, headers : {...}, 
          body : ReadableStream, 
          json : function()
        }
*/
  const result = await res.json()
  if (!res.ok) throw new Error(result.message)
  return result
}




export async function getPunchSummary() {
  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:5000/api/punch/summary", {
    headers: {Authorization: `Bearer ${token}`}
  })
  if (!res.ok) throw new Error("Failed to fetch summary")
  return res.json()
}


export async function punchOut(data) {
  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:5000/api/punch/out", {
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.message)
  return result
}