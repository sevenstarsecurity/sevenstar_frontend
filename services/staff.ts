import axios from "axios";
import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Staff {
  id: string;
  type?: "STAFF";
  name: string;
  role: string;
  message?: string | null;
  imageUrl: string;
  cloudinaryId?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
  statusCode: number;
}

interface PublicListResponse<T> {
  success: boolean;
  message: string;
  data: T[] | { members: T[]; pagination?: ApiMeta };
  statusCode: number;
}

// ─── Plain axios instance for public calls ─────────────────────────────────
const publicApi = axios.create({
  baseURL: api.defaults.baseURL,
});

// ─── Admin List Endpoint (authenticated) ───────────────────────────────────

export interface ListStaffParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
}

export const getAdminStaff = async (
  params: ListStaffParams = {}
): Promise<PaginatedResponse<Staff>> => {
  try {
    const res = await api.get<any>("/admin/staff", { params });
    const rawData = res.data?.data;
    const items = Array.isArray(rawData)
      ? rawData
      : Array.isArray(rawData?.members)
      ? rawData.members
      : Array.isArray(rawData?.items)
      ? rawData.items
      : [];
    const meta = res.data?.meta || rawData?.pagination;

    return {
      items,
      total: meta?.total ?? items.length,
      page: meta?.page ?? 1,
      limit: meta?.limit ?? items.length,
      totalPages: meta?.totalPages ?? 1,
    };
  } catch (err: any) {
    if (err?.response?.status === 404) {
      try {
        const fallbackRes = await api.get<any>("/admin/staffs", { params });
        const rawData = fallbackRes.data?.data;
        const items = Array.isArray(rawData)
          ? rawData
          : Array.isArray(rawData?.items)
          ? rawData.items
          : [];
        return {
          items,
          total: items.length,
          page: 1,
          limit: items.length,
          totalPages: 1,
        };
      } catch {
        return { items: [], total: 0, page: 1, limit: 10, totalPages: 1 };
      }
    }
    throw err;
  }
};

export const getStaff = getAdminStaff;

export const getAdminStaffById = async (id: string): Promise<Staff> => {
  const res = await api.get<ApiResponse<Staff>>(`/admin/staff/${id}`);
  return res.data.data;
};

// ─── Public List Endpoint (unauthenticated) ────────────────────────────────

export const getPublicStaff = async (): Promise<Staff[]> => {
  try {
    const res = await publicApi.get<PublicListResponse<Staff>>("/staff");
    const raw = res.data?.data;
    if (Array.isArray(raw)) return raw;
    if (raw && Array.isArray((raw as any).members)) return (raw as any).members;
    return [];
  } catch (err: any) {
    if (err?.response?.status === 404) {
      try {
        const fallbackRes = await publicApi.get<ApiResponse<Staff[]>>("/admin/staff");
        return Array.isArray(fallbackRes.data?.data) ? fallbackRes.data.data : [];
      } catch {
        return [];
      }
    }
    return [];
  }
};

// ─── Create / Update / Delete ─────────────────────────────────────────────

export interface CreateStaffPayload {
  name: string;
  role: string;
  message?: string;
  displayOrder?: number;
  isActive?: boolean;
  image?: File;
}

export const createStaff = async (
  payload: CreateStaffPayload
): Promise<Staff> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("role", payload.role);
  if (payload.message !== undefined) formData.append("message", payload.message);
  if (payload.displayOrder !== undefined) {
    formData.append("displayOrder", String(payload.displayOrder));
  }
  if (payload.isActive !== undefined) {
    formData.append("isActive", String(payload.isActive));
  }
  if (payload.image) {
    formData.append("file", payload.image);
  }

  const res = await api.post<ApiResponse<Staff>>("/admin/staff", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateStaff = async (
  id: string,
  updates: Partial<CreateStaffPayload>
): Promise<Staff> => {
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

  const res = await api.put<ApiResponse<Staff>>(`/admin/staff/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const toggleStaffStatus = async (
  id: string,
  isActive: boolean
): Promise<Staff> => {
  const res = await api.patch<ApiResponse<Staff>>(`/admin/staff/${id}/status`, {
    isActive,
  });
  return res.data.data;
};

export const reorderStaff = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/staff/reorder", { order });
};

export const deleteStaff = async (id: string): Promise<void> => {
  await api.delete(`/admin/staff/${id}`);
};
