import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed from real API response (GET /api/vigilance or /api/admin/vigilance).

export interface VigilanceImage {
  id: string;
  imageUrl: string;
  cloudinaryId: string;
  caption?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
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

// ─── Public Endpoint ────────────────────────────────────────────────────────
// Confirmed: GET /api/vigilance -> active images, displayOrder ASC

export const getPublicVigilanceImages = async (): Promise<VigilanceImage[]> => {
  const res = await api.get<ApiResponse<VigilanceImage[]>>("/vigilance");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

// ─── Admin Endpoints ────────────────────────────────────────────────────────
// Confirmed routes per README:
//   GET    /api/admin/vigilance            (paginated: status filter)
//   GET    /api/admin/vigilance/:id
//   POST   /api/admin/vigilance            (Max 3 active enforced)
//   PUT    /api/admin/vigilance/:id        (replace image/caption/order)
//   PATCH  /api/admin/vigilance/:id/status (Max 3 check on enable)
//   PATCH  /api/admin/vigilance/reorder    (Prisma $transaction)
//   DELETE /api/admin/vigilance/:id

interface ListVigilanceParams {
  page?: number;
  limit?: number;
  status?: "active" | "inactive" | "all";
}

export const getAdminVigilanceImages = async (
  params: ListVigilanceParams = {}
): Promise<PaginatedResponse<VigilanceImage>> => {
  const res = await api.get<RawListResponse<VigilanceImage>>("/admin/vigilance", {
    params,
  });
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getAdminVigilanceImage = async (id: string): Promise<VigilanceImage> => {
  const res = await api.get<ApiResponse<VigilanceImage>>(`/admin/vigilance/${id}`);
  return res.data.data;
};

// Confirmed business rule: max 3 active images enforced by backend.
// This throws client-side too, so the UI can give immediate feedback
// before even hitting the network — but the backend is the real guard.
export const createVigilanceImage = async (
  file: File,
  caption?: string,
  displayOrder?: number,
  currentActiveCount?: number
): Promise<VigilanceImage> => {
  if (currentActiveCount !== undefined && currentActiveCount >= 3) {
    throw new Error("Maximum of 3 active Vigilance images allowed. Disable one first.");
  }

  const formData = new FormData();
  formData.append("file", file);
  if (caption) formData.append("caption", caption);
  if (displayOrder !== undefined) formData.append("displayOrder", String(displayOrder));

  const res = await api.post<ApiResponse<VigilanceImage>>(
    "/admin/vigilance",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data.data;
};

export const updateVigilanceImage = async (
  id: string,
  updates: { file?: File; caption?: string; displayOrder?: number }
): Promise<VigilanceImage> => {
  const formData = new FormData();
  if (updates.file) formData.append("file", updates.file);
  if (updates.caption !== undefined) formData.append("caption", updates.caption);
  if (updates.displayOrder !== undefined)
    formData.append("displayOrder", String(updates.displayOrder));

  const res = await api.put<ApiResponse<VigilanceImage>>(
    `/admin/vigilance/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data.data;
};

// Confirmed business rule: enabling checks max-3 too (per README:
// "Enable/Disable status (Max 3 check)")
export const toggleVigilanceStatus = async (
  id: string,
  isActive: boolean
): Promise<VigilanceImage> => {
  const res = await api.patch<ApiResponse<VigilanceImage>>(
    `/admin/vigilance/${id}/status`,
    { isActive }
  );
  return res.data.data;
};

export const reorderVigilanceImages = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/vigilance/reorder", { order });
};

export const deleteVigilanceImage = async (id: string): Promise<void> => {
  await api.delete(`/admin/vigilance/${id}`);
};