import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  cloudinaryId?: string | null;
  displayOrder: number;
  isActive: boolean;
  showOnHomepage: boolean;
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

interface ListClientsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
}

// ─── Public Endpoint ────────────────────────────────────────────────────────

export const getPublicClients = async (): Promise<Client[]> => {
  const res = await api.get<ApiResponse<Client[]>>("/clients");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

// ─── Admin Endpoints ────────────────────────────────────────────────────────

export const getAdminClients = async (
  params: ListClientsParams = {}
): Promise<PaginatedResponse<Client>> => {
  const res = await api.get<RawListResponse<Client>>("/admin/clients", {
    params,
  });
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getAdminClient = async (id: string): Promise<Client> => {
  const res = await api.get<ApiResponse<Client>>(`/admin/clients/${id}`);
  return res.data.data;
};

export const createClient = async (
  name: string,
  file: File,
  displayOrder?: number,
  isActive = true,
  showOnHomepage = true
): Promise<Client> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);
  if (displayOrder !== undefined) formData.append("displayOrder", String(displayOrder));
  formData.append("isActive", String(isActive));
  formData.append("showOnHomepage", String(showOnHomepage));

  const res = await api.post<ApiResponse<Client>>("/admin/clients", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateClient = async (
  id: string,
  updates: {
    name?: string;
    file?: File;
    displayOrder?: number;
    isActive?: boolean;
    showOnHomepage?: boolean;
  }
): Promise<Client> => {
  const formData = new FormData();
  if (updates.name !== undefined) formData.append("name", updates.name);
  if (updates.file) formData.append("file", updates.file);
  if (updates.displayOrder !== undefined)
    formData.append("displayOrder", String(updates.displayOrder));
  if (updates.isActive !== undefined) formData.append("isActive", String(updates.isActive));
  if (updates.showOnHomepage !== undefined)
    formData.append("showOnHomepage", String(updates.showOnHomepage));

  const res = await api.put<ApiResponse<Client>>(`/admin/clients/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const toggleClientStatus = async (
  id: string,
  isActive: boolean
): Promise<Client> => {
  const res = await api.patch<ApiResponse<Client>>(`/admin/clients/${id}/status`, {
    isActive,
  });
  return res.data.data;
};

export const reorderClients = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/clients/reorder", { order });
};

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`/admin/clients/${id}`);
};
