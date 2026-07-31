import axios from "axios";
import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Leader {
  id: string;
  type: "LEADER";
  name: string;
  role: string;
  message: string | null;
  imageUrl: string;
  cloudinaryId: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
  statusCode: number;
}

// ─── Plain axios instance for public calls ─────────────────────────────────
// IMPORTANT: this does NOT use the shared `api` instance, because `api` has
// an interceptor that redirects to /login on 401 (see auth.ts). Public pages
// have no logged-in admin, so a 401 there should just fail quietly instead
// of hijacking the visitor to the admin login screen.

const publicApi = axios.create({
  baseURL: api.defaults.baseURL,
});

// ─── List endpoint (admin, authenticated) ──────────────────────────────────

export interface ListLeadersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
}

export const getLeaders = async (
  params: ListLeadersParams = {}
): Promise<PaginatedResponse<Leader>> => {
  const res = await api.get<ApiResponse<Leader[]>>("/admin/leadership", { params });
  const items = Array.isArray(res.data.data) ? res.data.data : [];
  const meta = res.data.meta;

  return {
    items,
    total: meta?.total ?? items.length,
    page: meta?.page ?? 1,
    limit: meta?.limit ?? items.length,
    totalPages: meta?.totalPages ?? 1,
  };
};

export const getAdminLeaders = getLeaders;

// ─── Public list endpoint (unauthenticated, for the client site) ──────────
// Tries a true public route first (/leadership), matching the pattern used
// by branches.ts (/branches) and vigilance.ts (/vigilance). If that route
// doesn't exist yet on the backend (404), falls back to the admin route on
// a plain axios instance so a 401 fails silently instead of redirecting
// the visitor to /login.

export const getPublicLeaders = async (): Promise<Leader[]> => {
  try {
    const res = await publicApi.get<ApiResponse<Leader[]>>("/leadership");
    return Array.isArray(res.data.data) ? res.data.data : [];
  } catch (err: any) {
    // If there's genuinely no public route (404), try the admin route
    // without triggering the login-redirect interceptor.
    if (err?.response?.status === 404) {
      try {
        const fallbackRes = await publicApi.get<ApiResponse<Leader[]>>(
          "/admin/leadership"
        );
        return Array.isArray(fallbackRes.data.data) ? fallbackRes.data.data : [];
      } catch {
        return [];
      }
    }
    return [];
  }
};

export const getLeaderById = async (id: string): Promise<Leader> => {
  const res = await api.get<ApiResponse<Leader>>(`/admin/leadership/${id}`);
  return res.data.data;
};
export const getAdminLeader = getLeaderById;

export const getPublicLeader = async (id: string): Promise<Leader | null> => {
  try {
    const res = await publicApi.get<ApiResponse<Leader>>(`/leadership/${id}`);
    return res.data.data;
  } catch {
    return null;
  }
};

// ─── Create / Update / Delete (admin, authenticated) ───────────────────────

// The backend accepts multipart/form-data directly on this route — the
// image file goes under the field name "file" (confirmed via Postman).
// It uploads to Cloudinary server-side and returns imageUrl + cloudinaryId
// in the response.

export interface CreateLeaderPayload {
  name: string;
  role: string;
  message: string;
  displayOrder?: number;
  isActive?: boolean;
  image?: File;
}

export const createLeader = async (
  payload: CreateLeaderPayload
): Promise<Leader> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("role", payload.role);
  formData.append("message", payload.message);
  if (payload.displayOrder !== undefined) {
    formData.append("displayOrder", String(payload.displayOrder));
  }
  if (payload.isActive !== undefined) {
    formData.append("isActive", String(payload.isActive));
  }
  if (payload.image) {
    formData.append("file", payload.image);
  }

  const res = await api.post<ApiResponse<Leader>>("/admin/leadership", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateLeader = async (
  id: string,
  updates: Partial<CreateLeaderPayload>
): Promise<Leader> => {
  const formData = new FormData();
  if (updates.name !== undefined) formData.append("name", updates.name);
  if (updates.role !== undefined) formData.append("role", updates.role);
  if (updates.message !== undefined) formData.append("message", updates.message);
  if (updates.displayOrder !== undefined) {
    formData.append("displayOrder", String(updates.displayOrder));
  }
  if (updates.isActive !== undefined) {
    formData.append("isActive", String(updates.isActive));
  }
  if (updates.image) {
    formData.append("file", updates.image);
  }

  const res = await api.put<ApiResponse<Leader>>(`/admin/leadership/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const toggleLeaderStatus = async (
  id: string,
  isActive: boolean
): Promise<Leader> => {
  const res = await api.patch<ApiResponse<Leader>>(`/admin/leadership/${id}/status`, {
    isActive,
  });
  return res.data.data;
};

export const reorderLeaders = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/leadership/reorder", { order });
};

export const deleteLeader = async (id: string): Promise<void> => {
  await api.delete(`/admin/leadership/${id}`);
};