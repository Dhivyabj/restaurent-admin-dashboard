import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if backend runs elsewhere
});

// Menu APIs
export const getMenu = (filters) => api.get("/menu", { params: filters });
export const searchMenu = (query) => api.get(`/menu/search?q=${query}`);
export const getMenuItem = (id) => api.get(`/menu/${id}`);
export const createMenuItem = (data) => api.post("/menu", data);
export const updateMenuItem = (id, data) => api.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);
export const toggleAvailability = (id) => api.patch(`/menu/${id}/availability`);

// Order APIs
export const getOrders = (params) => api.get("/orders", { params });
export const getOrder = (id) => api.get(`/orders/${id}`);
export const createOrder = (data) => api.post("/orders", data);
export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/${id}/status`, { status });

export default api;