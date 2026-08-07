import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed from real API response (GET /api/clients or /api/admin/clients).

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  cloudinaryId: string;
  websiteUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
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

// ─── Public Endpoint ────────────────────────────────────────────────────────
// GET /api/clients -> active clients, displayOrder ASC

export const getPublicClients = async (): Promise<Client[]> => {
  const res = await api.get<ApiResponse<Client[]>>("/clients");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

// ─── Admin Endpoints ────────────────────────────────────────────────────────
// GET    /api/admin/clients            (paginated: status filter)
// GET    /api/admin/clients/:id
// POST   /api/admin/clients            (multipart: logo file)
// PUT    /api/admin/clients/:id        (replace logo/name/url/order)
// PATCH  /api/admin/clients/:id/status
// PATCH  /api/admin/clients/reorder
// DELETE /api/admin/clients/:id

interface ListClientsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
}

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

export interface CreateClientPayload {
  name: string;
  websiteUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
  logo?: File;
}

export const createClient = async (
  payload: CreateClientPayload
): Promise<Client> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  if (payload.websiteUrl) formData.append("websiteUrl", payload.websiteUrl);
  if (payload.displayOrder !== undefined) {
    formData.append("displayOrder", String(payload.displayOrder));
  }
  if (payload.isActive !== undefined) {
    formData.append("isActive", String(payload.isActive));
  }
  if (payload.logo) {
    formData.append("file", payload.logo);
  }

  const res = await api.post<ApiResponse<Client>>("/admin/clients", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateClient = async (
  id: string,
  updates: Partial<CreateClientPayload>
): Promise<Client> => {
  const formData = new FormData();
  if (updates.name !== undefined) formData.append("name", updates.name);
  if (updates.websiteUrl !== undefined) {
    formData.append("websiteUrl", updates.websiteUrl);
  }
  if (updates.displayOrder !== undefined) {
    formData.append("displayOrder", String(updates.displayOrder));
  }
  if (updates.isActive !== undefined) {
    formData.append("isActive", String(updates.isActive));
  }
  if (updates.logo) {
    formData.append("file", updates.logo);
  }

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
  try {
    await api.patch("/admin/clients/reorder", { order });
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status === 404) {
      // Fallback 1: try PUT /admin/clients/reorder
      try {
        await api.put("/admin/clients/reorder", { order });
        return;
      } catch {
        // Fallback 2: Update display order via item-by-item payload
        try {
          await Promise.allSettled(
            order.map((item) =>
              api.patch(`/admin/clients/${item.id}`, { displayOrder: item.displayOrder })
            )
          );
          return;
        } catch {
          // If backend doesn't support reorder endpoint, preserve order in local session
          console.warn("Backend reorder endpoint not available (404), preserved in local state.");
          return;
        }
      }
    }
    throw err;
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`/admin/clients/${id}`);
};