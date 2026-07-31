import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed from real API response (GET /api/admin/branches or /api/branches).

export interface BranchStaff {
  id: string;
  branchId: string;
  name: string;
  designation?: string | null; // confirmed — was wrongly guessed as "position"
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  // Note: no "phone" or "updatedAt" field appeared in the real response.
  // If your backend does have them, they were just omitted from this
  // response — otherwise remove from any UI assuming they exist.
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  mobile?: string | null;
  email?: string | null;
  latitude: number;
  longitude: number;
  googleMapsUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  staffMembers: BranchStaff[];
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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

// ─── Normalizer ─────────────────────────────────────────────────────────────
// Backend list-response shape is still unconfirmed. This defensively handles
// several common shapes so the UI never crashes on an unexpected wrapper.
// TODO: replace this with a direct mapping once a real Postman response for
// GET /api/admin/branches (list) is available.

function normalizePaginated<T>(raw: any): PaginatedResponse<T> {
  if (Array.isArray(raw)) {
    return {
      items: raw,
      total: raw.length,
      page: 1,
      limit: raw.length,
      totalPages: 1,
    };
  }

  const items =
    raw?.items ??
    raw?.branches ??
    raw?.data ??
    raw?.results ??
    raw?.records ??
    [];

  const pagination = raw?.pagination ?? raw;

  return {
    items: Array.isArray(items) ? items : [],
    total: pagination?.total ?? pagination?.totalCount ?? items.length ?? 0,
    page: pagination?.page ?? 1,
    limit: pagination?.limit ?? items.length ?? 0,
    totalPages: pagination?.totalPages ?? pagination?.pages ?? 1,
  };
}

// ─── Public Endpoints ───────────────────────────────────────────────────────

export const getPublicBranches = async (): Promise<Branch[]> => {
  const res = await api.get<ApiResponse<Branch[]>>("/branches");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

export const getPublicBranch = async (id: string): Promise<Branch> => {
  const res = await api.get<ApiResponse<Branch>>(`/branches/${id}`);
  return res.data.data;
};

// ─── Admin: Branches ────────────────────────────────────────────────────────

interface ListBranchesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
}

export const getAdminBranches = async (
  params: ListBranchesParams = {}
): Promise<PaginatedResponse<Branch>> => {
  const res = await api.get<ApiResponse<any>>("/admin/branches", { params });
  return normalizePaginated<Branch>(res.data.data);
};

export const getAdminBranch = async (id: string): Promise<Branch> => {
  const res = await api.get<ApiResponse<Branch>>(`/admin/branches/${id}`);
  return res.data.data;
};

export interface CreateBranchPayload {
  name: string;
  address: string;
  phone: string;
  mobile?: string;
  email?: string;
  latitude: number;
  longitude: number;
  googleMapsUrl?: string;
  displayOrder?: number;
}

export const createBranch = async (payload: CreateBranchPayload): Promise<Branch> => {
  const res = await api.post<ApiResponse<Branch>>("/admin/branches", payload);
  return res.data.data;
};

export const updateBranch = async (
  id: string,
  updates: Partial<CreateBranchPayload>
): Promise<Branch> => {
  const res = await api.put<ApiResponse<Branch>>(`/admin/branches/${id}`, updates);
  return res.data.data;
};

export const toggleBranchStatus = async (
  id: string,
  isActive: boolean
): Promise<Branch> => {
  const res = await api.patch<ApiResponse<Branch>>(`/admin/branches/${id}/status`, {
    isActive,
  });
  return res.data.data;
};

export const reorderBranches = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/branches/reorder", { order });
};

export const deleteBranch = async (id: string): Promise<void> => {
  await api.delete(`/admin/branches/${id}`);
};

// ─── Admin: Nested Staff ────────────────────────────────────────────────────

export const getBranchStaff = async (branchId: string): Promise<BranchStaff[]> => {
  const res = await api.get<ApiResponse<BranchStaff[]>>(
    `/admin/branches/${branchId}/staff`
  );
  return Array.isArray(res.data.data) ? res.data.data : [];
};

export const getBranchStaffMember = async (
  branchId: string,
  staffId: string
): Promise<BranchStaff> => {
  const res = await api.get<ApiResponse<BranchStaff>>(
    `/admin/branches/${branchId}/staff/${staffId}`
  );
  return res.data.data;
};

export interface CreateStaffPayload {
  name: string;
  designation?: string;
  displayOrder?: number;
}

export const addBranchStaff = async (
  branchId: string,
  payload: CreateStaffPayload
): Promise<BranchStaff> => {
  const res = await api.post<ApiResponse<BranchStaff>>(
    `/admin/branches/${branchId}/staff`,
    payload
  );
  return res.data.data;
};

export const updateBranchStaff = async (
  branchId: string,
  staffId: string,
  updates: Partial<CreateStaffPayload>
): Promise<BranchStaff> => {
  const res = await api.put<ApiResponse<BranchStaff>>(
    `/admin/branches/${branchId}/staff/${staffId}`,
    updates
  );
  return res.data.data;
};

export const toggleBranchStaffStatus = async (
  branchId: string,
  staffId: string,
  isActive: boolean
): Promise<BranchStaff> => {
  const res = await api.patch<ApiResponse<BranchStaff>>(
    `/admin/branches/${branchId}/staff/${staffId}/status`,
    { isActive }
  );
  return res.data.data;
};

export const reorderBranchStaff = async (
  branchId: string,
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch(`/admin/branches/${branchId}/staff/reorder`, { order });
};

export const deleteBranchStaff = async (
  branchId: string,
  staffId: string
): Promise<void> => {
  await api.delete(`/admin/branches/${branchId}/staff/${staffId}`);
};