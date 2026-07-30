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

// ─── List endpoint ──────────────────────────────────────────────────────────
// Same pattern as executives: ONE route (/leadership), auth via Bearer token,
// no separate /admin/* path.

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
export const getPublicLeaders = async (): Promise<Leader[]> => {
  const res = await getLeaders();
  return res.items;
};

export const getLeaderById = async (id: string): Promise<Leader> => {
  const res = await api.get<ApiResponse<Leader>>(`/admin/leadership/${id}`);
  return res.data.data;
};
export const getAdminLeader = getLeaderById;
export const getPublicLeader = getLeaderById;

// ─── Create / Update / Delete ──────────────────────────────────────────────

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