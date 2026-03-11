import { fetchWithAuth } from "./fetchWithAuth";

export async function getProducts() {
  const res = await fetchWithAuth("/api/products");

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function getCategories() {
  const res = await fetchWithAuth("/api/products/categories");

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}