import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --------------------------------------------------------------------------
// Response interceptor
//
// IMPORTANT: Only redirect to /login when a PROTECTED route returns 401
// (i.e. the stored token has expired / been revoked).
//
// We must NEVER redirect when the request itself was an auth endpoint
// (login, register, forgot-password …).  If we did, a wrong-password
// login attempt would cause a hard page reload before the catch block in
// Login.jsx could show the Swal error alert.
// --------------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";

    // Auth routes that are allowed to return 401 without triggering logout
    const isAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/forgot-password") ||
      requestUrl.includes("/auth/reset-password") ||
      requestUrl.includes("/auth/logout");

    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Token is expired or invalid — clear everything and send to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Always propagate the error so individual catch blocks can handle it
    return Promise.reject(error);
  },
);

// --------------------------------------------------------------------------
// Auth API
// --------------------------------------------------------------------------
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  changePassword: (data) => api.put("/users/change-password", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.post("/auth/reset-password", data),
  logout: () => api.post("/auth/logout"),
};

// --------------------------------------------------------------------------
// User API
// --------------------------------------------------------------------------
export const userAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  changePassword: (data) => api.put("/users/change-password", data),
};

// --------------------------------------------------------------------------
// Contact API
// --------------------------------------------------------------------------
export const contactAPI = {
  submit: (data) => api.post("/contact/submit", data),
  getMessages: () => api.get("/contact/messages"),
  updateStatus: (id, status) => api.put(`/contact/messages/${id}`, { status }),
  deleteMessage: (id) => api.delete(`/contact/messages/${id}`),
};

// --------------------------------------------------------------------------
// Appointment API
// --------------------------------------------------------------------------
export const appointmentAPI = {
  getSlots: (doctor, date) =>
    api.get(
      `/appointments/slots?doctor=${encodeURIComponent(doctor)}&date=${date}`,
    ),
  book: (data) => api.post("/appointments/book", data),
  getMyAppointments: () => api.get("/appointments/my"),
  cancelAppointment: (id) => api.put(`/appointments/${id}/cancel`),
};

// --------------------------------------------------------------------------
// Admin axios instance — uses adminToken, completely separate from user auth
// --------------------------------------------------------------------------
const adminApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !url.includes("/admin/login")
    ) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

export const adminAPI = {
  login: (data) => adminApi.post("/admin/login", data),
  getStats: () => adminApi.get("/admin/stats"),
  getUsers: () => adminApi.get("/admin/users"),
  toggleUserStatus: (id) => adminApi.put(`/admin/users/${id}/toggle-status`),
  deleteUser: (id) => adminApi.delete(`/admin/users/${id}`),
  getAppointments: (params) => adminApi.get("/admin/appointments", { params }),
  updateAppointmentStatus: (id, status) =>
    adminApi.put(`/admin/appointments/${id}/status`, { status }),
  getMessages: (params) => adminApi.get("/admin/messages", { params }),
  updateMessageStatus: (id, status) =>
    adminApi.put(`/admin/messages/${id}/status`, { status }),
  deleteMessage: (id) => adminApi.delete(`/admin/messages/${id}`),
};

export default api;
