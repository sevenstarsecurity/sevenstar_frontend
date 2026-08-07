// auth.ts
import api from "./api";

export interface Admin {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
}

export interface LoginData {
  admin: Admin;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const ADMIN_KEY = "admin";

// ---- Token/session storage helpers ----

export function setSession(data: LoginData): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
}

export function clearSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredAdmin(): Admin | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

// ---- Auth API calls ----

export async function login(email: string, password: string): Promise<LoginData> {
  const res = await api.post<ApiResponse<LoginData>>("/auth/login", {
    email,
    password,
  });

  if (!res.data.success) {
    throw new Error(res.data.message || "Login failed");
  }

  setSession(res.data.data);
  return res.data.data;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // ignore network errors on logout
  } finally {
    clearSession();
  }
}

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const res = await api.post<ApiResponse<{ accessToken: string; refreshToken?: string }>>(
    "/auth/refresh",
    { refreshToken }
  );

  if (!res.data.success) {
    clearSession();
    throw new Error(res.data.message || "Session expired");
  }

  const { accessToken, refreshToken: newRefreshToken } = res.data.data;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (newRefreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
  }

  return accessToken;
}

// ---- Change Password ----

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ValidationErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<void> {
  const res = await api.post<ApiResponse<null>>("/auth/change-password", payload);

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to change password");
  }
}

// Reads a readable message off any auth-related API error, including
// field-level validation errors shaped like:
// { success: false, message: "Validation Failed", errors: { confirmPassword: ["..."] } }
export function extractAuthErrorMessage(err: any, fallback: string): string {
  const data = err?.response?.data as ValidationErrorResponse | undefined;

  if (data?.errors && typeof data.errors === "object") {
    const fieldMessages = Object.values(data.errors).flat().filter(Boolean);
    if (fieldMessages.length > 0) {
      return fieldMessages.join(" ");
    }
  }

  return data?.message || err?.message || fallback;
}

// ---- Axios interceptors: attach token + auto-refresh on 401 ----

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<(token: string) => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for auth endpoints (e.g. login with wrong credentials)
    const isAuthEndpoint = originalRequest.url?.includes("/auth/");
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // queue this request until refresh completes
        return new Promise((resolve) => {
          pendingQueue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        pendingQueue.forEach((cb) => cb(newToken));
        pendingQueue = [];
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        pendingQueue = [];
        clearSession();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);