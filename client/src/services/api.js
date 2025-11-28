import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export async function fetchProducts({ page = 1, limit = 20, category = 'all', priceMin, priceMax, q, sort = 'newest' } = {}) {
  const params = { page, limit };
  if (category && category !== 'all') params.category = category;
  if (priceMin !== undefined) params.priceMin = priceMin;
  if (priceMax !== undefined) params.priceMax = priceMax;
  if (q) params.q = q;
  if (sort) params.sort = sort;
  const res = await API.get('/products', { params });
  return res.data;
}

export async function fetchCategories() {
  const res = await API.get('/products/categories/list');
  return res.data.categories;
}

export async function fetchProductById(id) {
  try {
    const res = await API.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching product:', err);
    return null;
  }
}

