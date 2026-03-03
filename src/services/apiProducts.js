export async function getProducts() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}


export async function getCategories() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/products/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}