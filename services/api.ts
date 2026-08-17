import axios from "axios";

// Allow individual requests to opt out of auth behavior.
declare module "axios" {
  export interface AxiosRequestConfig {
    public?: boolean;           // true = don't attach token AND don't redirect on 401
    skipAuthRedirect?: boolean; // true = don't redirect on 401 (token may still be attached)
    _retry?: boolean;           // true = this request already went through a refresh retry
  }
}

// ─── Session storage (single source of truth) ───────────────────────────────
// These keys are the ONLY ones the rest of the app should use. The old
// `services/api.ts` used `token`/`user`, which never matched what
// `services/auth.ts` wrote, so tokens were silently never attached on routes
// that didn't import auth.ts. Everything now reads/writes the same keys.

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const ADMIN_KEY = "admin";
export const STAY_LOGGED_IN_KEY = "stayLoggedIn";

// Pick the storage backend based on the "stay logged in" preference.
//   stayLoggedIn === "true"  → localStorage  (survives browser restarts, until token expiry)
//   anything else            → sessionStorage (survives page refreshes in this tab, until token expiry)
export function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STAY_LOGGED_IN_KEY) === "true"
    ? localStorage
    : sessionStorage;
}

export function getAccessToken(): string | null {
  const storage = getStorage();
  return storage ? storage.getItem(ACCESS_TOKEN_KEY) : null;
}

export function getRefreshToken(): string | null {
  const storage = getStorage();
  return storage ? storage.getItem(REFRESH_TOKEN_KEY) : null;
}

export function getStoredAdmin(): unknown {
  const storage = getStorage();
  if (!storage) return null;
  const raw = storage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession(accessToken: string, refreshToken: string, admin?: unknown): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if (admin !== undefined) {
    storage.setItem(ADMIN_KEY, JSON.stringify(admin));
  }
}

// Clear session from BOTH backends so a stale token in the "wrong" storage can
// never resurrect a logged-out session.
export function clearSession(): void {
  if (typeof window === "undefined") return;
  [localStorage, sessionStorage].forEach((storage) => {
    storage.removeItem(ACCESS_TOKEN_KEY);
    storage.removeItem(REFRESH_TOKEN_KEY);
    storage.removeItem(ADMIN_KEY);
  });
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the bearer token to every outgoing request, UNLESS marked public.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && !config.public) {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ─── 401 auto-refresh ────────────────────────────────────────────────────────
// When a request comes back 401 (access token expired/revoked), transparently
// try to mint a fresh access token from the refresh token, retry the original
// request, and keep the user logged in. Only if the refresh itself fails
// (refresh token also expired) do we clear the session and bounce to login.

let isRefreshing = false;
let pendingQueue: Array<(token: string) => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const config = error?.config;
    const skip = config?.skipAuthRedirect || config?.public;
    const isAuthEndpoint = config?.url?.includes("/auth/");

    if (
      status === 401 &&
      typeof window !== "undefined" &&
      !skip &&
      !isAuthEndpoint &&
      !config?._retry
    ) {
      if (isRefreshing) {
        // Queue this request until the in-flight refresh completes.
        return new Promise((resolve) => {
          pendingQueue.push((token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(api(config));
          });
        });
      }

      config._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");

        const res = await api.post<{
          success: boolean;
          message: string;
          data: { accessToken: string; refreshToken?: string };
        }>("/auth/refresh", { refreshToken });

        if (!res.data.success || !res.data.data?.accessToken) {
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

        pendingQueue.forEach((cb) => cb(accessToken));
        pendingQueue = [];
        config.headers.Authorization = `Bearer ${accessToken}`;
        return api(config);
      } catch (refreshError) {
        pendingQueue = [];
        clearSession();
        window.location.href = "/netbus";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
