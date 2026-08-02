import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed exact shape from GET /admin/newsletter:
// { success, message, data: [{ id, email, unsubscribeToken, isSubscribed, subscribedAt, unsubscribedAt }], meta: {...}, statusCode }

export interface NewsletterSubscriber {
  id: string;
  email: string;
  unsubscribeToken: string;
  isSubscribed: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

interface RawListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
  statusCode: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribedCount: number;
  // Add/adjust fields to match your actual /admin/newsletter/stats response shape
  [key: string]: unknown;
}

// ─── Public Endpoints (no auth) ────────────────────────────────────────────
// Confirmed: POST /api/newsletter/subscribe

export const subscribeToNewsletter = async (email: string): Promise<NewsletterSubscriber> => {
  const res = await api.post<ApiResponse<NewsletterSubscriber>>(
    "/newsletter/subscribe",
    { email },
    { public: true }
  );
  return res.data.data;
};

// Confirmed URL: POST /api/newsletter/unsubscribe
// NOTE: only the path was confirmed — if unsubscribe fails, check whether the
// backend expects the token in the body as { token } (current assumption) or
// as a query param like ?token=... instead.
export const unsubscribeFromNewsletter = async (token: string): Promise<void> => {
  await api.post(
    "/newsletter/unsubscribe",
    { token },
    { public: true }
  );
};

// Confirmed: GET /api/newsletter/verify?token=VERIFY_TOKEN
export const verifyNewsletterSubscription = async (token: string): Promise<void> => {
  await api.get(
    "/newsletter/verify",
    {
      params: { token },
      public: true,
    }
  );
};

// ─── Admin Endpoints ────────────────────────────────────────────────────────
// Confirmed exact routes from the API client collection:
//   GET    /admin/newsletter                 (list, paginated)
//   DELETE /admin/newsletter/{subscriberId}
//   GET    /admin/newsletter/export
//   GET    /admin/newsletter/stats

interface ListSubscribersParams {
  page?: number;
  limit?: number;
  status?: "subscribed" | "unsubscribed" | "all";
  search?: string;
}

export const getAdminSubscribers = async (
  params: ListSubscribersParams = {}
): Promise<PaginatedResponse<NewsletterSubscriber>> => {
  const res = await api.get<RawListResponse<NewsletterSubscriber>>(
    "/admin/newsletter",
    { params }
  );
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getAdminSubscriber = async (id: string): Promise<NewsletterSubscriber> => {
  const res = await api.get<ApiResponse<NewsletterSubscriber>>(
    `/admin/newsletter/${id}`
  );
  return res.data.data;
};

export const deleteAdminSubscriber = async (id: string): Promise<void> => {
  await api.delete(`/admin/newsletter/${id}`);
};

// Triggers a file download (CSV/XLSX depending on backend). Returns raw blob
// so the caller can create an object URL and trigger a download.
export const exportAdminSubscribers = async (
  params: ListSubscribersParams = {}
): Promise<Blob> => {
  const res = await api.get("/admin/newsletter/export", {
    params,
    responseType: "blob",
  });
  return res.data as Blob;
};

export const getAdminNewsletterStats = async (): Promise<NewsletterStats> => {
  const res = await api.get<ApiResponse<NewsletterStats>>("/admin/newsletter/stats");
  return res.data.data;
};