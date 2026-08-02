import axios from "axios";

// Allow individual requests to opt out of auth behavior.
declare module "axios" {
  export interface AxiosRequestConfig {
    public?: boolean;           // true = don't attach token AND don't redirect on 401
    skipAuthRedirect?: boolean; // true = don't redirect on 401 (token may still be attached)
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the bearer token to every outgoing request, UNLESS marked public
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && !config.public) {
    const token = localStorage.getItem("token"); // matches key used in services/auth.ts
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auto-logout on 401 so stale/expired tokens don't leave the user stuck on
// a broken admin page. Requests marked `public: true` or `skipAuthRedirect: true`
// opt out — used for calls that hit a shared /admin/* route but are actually
// public reads (e.g. public site pages fetching executives, leadership, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const skip = error?.config?.skipAuthRedirect || error?.config?.public;

    if (status === 401 && typeof window !== "undefined" && !skip) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/admin"; // adjust to your actual login route
    }
    return Promise.reject(error);
  }
);

export default api;