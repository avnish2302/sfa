export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token");

  const res = await fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}