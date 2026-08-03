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

interface ApiPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

// Shape used by /admin/executive (list):
// { success, message, data: [ {...}, {...} ], meta: {...}, statusCode }
interface ApiListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: ApiPagination;
  statusCode: number;
}

// Shape used by /executive (public list) — data is an OBJECT with a
// nested "members" array + "pagination", NOT a bare array like admin.
// { success, message, data: { members: [...], pagination: {...} }, statusCode }
interface PublicListResponse<T> {
  success: boolean;
  message: string;
  data: {
    members: T[];
    pagination: ApiPagination;
  };
  statusCode: number;
}

// ─── Admin endpoint (auth required) ────────────────────────────────────────

export interface ListExecutivesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
}

export const getAdminExecutives = async (
  params: ListExecutivesParams = {}
): Promise<PaginatedResponse<Executive>> => {
  const res = await api.get<ApiListResponse<Executive>>("/admin/executive", { params });
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

// Back-compat alias
export const getExecutives = getAdminExecutives;

export const getAdminExecutive = async (id: string): Promise<Executive> => {
  const res = await api.get<{ success: boolean; message: string; data: Executive; statusCode: number }>(
    `/admin/executive/${id}`
  );
  return res.data.data;
};
export const getExecutiveById = getAdminExecutive;

// ─── Public endpoint (no auth) ─────────────────────────────────────────────
// Confirmed exact shape from GET /api/executive:
// {
//   success: true,
//   message: "Executives retrieved",
//   data: {
//     members: [ {...}, {...} ],
//     pagination: { page, limit, total, totalPages, hasNextPage, hasPrevPage }
//   },
//   statusCode: 200
// }

export const getPublicExecutives = async (): Promise<Executive[]> => {
  const res = await api.get<PublicListResponse<Executive>>("/executive", {
    public: true,
  });
  return Array.isArray(res.data.data?.members) ? res.data.data.members : [];
};

export const getPublicExecutive = async (id: string): Promise<Executive> => {
  const res = await api.get<{ success: boolean; message: string; data: Executive; statusCode: number }>(
    `/executive/${id}`,
    { public: true }
  );
  return res.data.data;
};

// ─── Create / Update / Delete (admin-only, always authenticated) ──────────

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

  const res = await api.post<{ success: boolean; message: string; data: Executive; statusCode: number }>(
    "/admin/executive",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
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

  const res = await api.put<{ success: boolean; message: string; data: Executive; statusCode: number }>(
    `/admin/executive/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data.data;
};

export const toggleExecutiveStatus = async (
  id: string,
  isActive: boolean
): Promise<Executive> => {
  const res = await api.patch<{ success: boolean; message: string; data: Executive; statusCode: number }>(
    `/admin/executive/${id}/status`,
    { isActive }
  );
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