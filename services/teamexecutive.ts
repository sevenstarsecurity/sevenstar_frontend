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

// The actual shape: { success, message, data: { members: [...], pagination: {...} }, statusCode }
interface ApiResponse<T> {
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
  const res = await api.get<ApiResponse<Executive>>("/admin/executive", { params });
  const items = res.data.data?.members ?? [];
  const pagination = res.data.data?.pagination;

  return {
    items,
    total: pagination?.total ?? items.length,
    page: pagination?.page ?? 1,
    limit: pagination?.limit ?? items.length,
    totalPages: pagination?.totalPages ?? 1,
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

export const getPublicExecutives = async (): Promise<Executive[]> => {
  const res = await api.get<ApiResponse<Executive>>("/executive", {
    public: true,
  });
  return res.data.data?.members ?? [];
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