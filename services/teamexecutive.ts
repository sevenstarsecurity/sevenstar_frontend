import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Executive {
  id: string;
  type: "EXECUTIVE";
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

// ─── List endpoint (works for both public + authenticated admin calls) ────
// The backend uses ONE route for executives — /executives — for reading.
// Admin auth is handled via the Bearer token attached in api.ts, not via a
// separate /admin/* path. There is no /admin/executives route.

export interface ListExecutivesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
}

export const getExecutives = async (
  params: ListExecutivesParams = {}
): Promise<PaginatedResponse<Executive>> => {
  const res = await api.get<ApiResponse<Executive[]>>("/admin/executive", { params });
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

// Kept as an alias so existing imports (getAdminExecutives) don't break.
export const getAdminExecutives = getExecutives;
export const getPublicExecutives = async (): Promise<Executive[]> => {
  const res = await getExecutives();
  return res.items;
};

export const getExecutiveById = async (id: string): Promise<Executive> => {
  const res = await api.get<ApiResponse<Executive>>(`/admin/executive/${id}`);
  return res.data.data;
};
export const getAdminExecutive = getExecutiveById;
export const getPublicExecutive = getExecutiveById;

// ─── Create / Update / Delete ──────────────────────────────────────────────

// The backend accepts multipart/form-data directly on this route — the
// image file goes under the field name "file" (confirmed via Postman on the
// matching /admin/leadership route). It uploads to Cloudinary server-side
// and returns imageUrl + cloudinaryId in the response.

export interface CreateExecutivePayload {
  name: string;
  role: string;
  message: string;
  displayOrder?: number;
  isActive?: boolean;
  image?: File;
}

export const createExecutive = async (
  payload: CreateExecutivePayload
): Promise<Executive> => {
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

  const res = await api.post<ApiResponse<Executive>>("/admin/executive", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateExecutive = async (
  id: string,
  updates: Partial<CreateExecutivePayload>
): Promise<Executive> => {
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

  const res = await api.put<ApiResponse<Executive>>(`/admin/executive/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const toggleExecutiveStatus = async (
  id: string,
  isActive: boolean
): Promise<Executive> => {
  const res = await api.patch<ApiResponse<Executive>>(`/admin/executive/${id}/status`, {
    isActive,
  });
  return res.data.data;
};

export const reorderExecutives = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/executive/reorder", { order });
};

export const deleteExecutive = async (id: string): Promise<void> => {
  await api.delete(`/admin/executive/${id}`);
};