import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed exact shape from GET /social-media (public) and /admin/social-media (admin):
// { success, message, data: [{ id, platform, url, displayOrder, isActive, updatedAt }], meta: {...}, statusCode }

export type SocialPlatform =
  | "FACEBOOK"
  | "INSTAGRAM"
  | "LINKEDIN"
  | "YOUTUBE"
  | "TIKTOK"
  | "TWITTER";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  displayOrder: number;
  isActive: boolean;
  updatedAt: string;
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

// ─── Public Endpoint (no auth) ─────────────────────────────────────────────
// Returns active social links, sorted by displayOrder.

export const getPublicSocialLinks = async (): Promise<SocialLink[]> => {
  const res = await api.get<RawListResponse<SocialLink>>("/social-media", {
    public: true,
  });
  const items = Array.isArray(res.data.data) ? res.data.data : [];
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
};

// ─── Admin Endpoints ────────────────────────────────────────────────────────

interface ListSocialLinksParams {
  page?: number;
  limit?: number;
  status?: "active" | "inactive" | "all";
}

export const getAdminSocialLinks = async (
  params: ListSocialLinksParams = {}
): Promise<PaginatedResponse<SocialLink>> => {
  const res = await api.get<RawListResponse<SocialLink>>("/admin/social-media", {
    params,
  });
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getAdminSocialLink = async (id: string): Promise<SocialLink> => {
  const res = await api.get<ApiResponse<SocialLink>>(`/admin/social-media/${id}`);
  return res.data.data;
};

export const createSocialLink = async (payload: {
  platform: SocialPlatform;
  url: string;
  displayOrder?: number;
  isActive?: boolean;
}): Promise<SocialLink> => {
  const res = await api.post<ApiResponse<SocialLink>>("/admin/social-media", payload);
  return res.data.data;
};

export const updateSocialLink = async (
  id: string,
  updates: Partial<{
    platform: SocialPlatform;
    url: string;
    displayOrder: number;
    isActive: boolean;
  }>
): Promise<SocialLink> => {
  const res = await api.put<ApiResponse<SocialLink>>(`/admin/social-media/${id}`, updates);
  return res.data.data;
};

export const toggleSocialLinkStatus = async (
  id: string,
  isActive: boolean
): Promise<SocialLink> => {
  const res = await api.patch<ApiResponse<SocialLink>>(`/admin/social-media/${id}/status`, {
    isActive,
  });
  return res.data.data;
};

export const reorderSocialLinks = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/social-media/reorder", { order });
};

export const deleteSocialLink = async (id: string): Promise<void> => {
  await api.delete(`/admin/social-media/${id}`);
};