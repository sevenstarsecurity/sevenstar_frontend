// auth.ts
import api, {
  ACCESS_TOKEN_KEY,
  clearSession,
  getAccessToken,
  getRefreshToken,
  getStoredAdmin,
  getStorage,
  REFRESH_TOKEN_KEY,
  setSession,
  STAY_LOGGED_IN_KEY,
} from "./api";

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

// ---- Token/session storage helpers (delegated to services/api.ts) ----
// services/api.ts is the single source of truth for session persistence and
// owns the request/response interceptors (token attach + 401 auto-refresh).

export function setSessionFromLogin(data: LoginData): void {
  setSession(data.accessToken, data.refreshToken, data.admin);
}

export { clearSession, getAccessToken, getRefreshToken, getStoredAdmin };

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

  setSessionFromLogin(res.data.data);
  return res.data.data;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // ignore network errors on logout
  } finally {
    clearSession();
    // Reset the "stay logged in" preference so the next login starts clean
    // (defaults to session-only) instead of inheriting a stale true/false.
    localStorage.removeItem(STAY_LOGGED_IN_KEY);
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
  const storage = getStorage();
  if (storage) {
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (newRefreshToken) {
      storage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
    }
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

// Re-export the key constants so callers can read/write session if needed.
export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, STAY_LOGGED_IN_KEY };
