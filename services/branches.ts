import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed from real API response (GET /api/admin/branch-staff).

export interface BranchStaff {
  id: string;
  branchId: string;
  name: string;
  designation?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Present on the staff-list endpoint response — a lightweight reference
  // back to the parent branch. May not be present on every endpoint that
  // returns BranchStaff, hence optional.
  branch?: {
    id: string;
    name: string;
  };
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

// ─── Normalizer ─────────────────────────────────────────────────────────────
// Backend list-response shape is still unconfirmed for /admin/branches
// itself (as opposed to the nested staff endpoint, which is now confirmed
// below). This defensively handles several common shapes so the UI never
// crashes on an unexpected wrapper.
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

// Confirmed: GET /api/branch-staff (public, no auth)
export const getPublicBranchStaff = async (): Promise<BranchStaff[]> => {
  const res = await api.get<ApiResponse<BranchStaff[]>>("/branch-staff");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

// The admin branches list endpoint (GET /admin/branches) does not return
// populated `staffMembers` per branch — staff now live in a separate flat
// resource (/admin/branch-staff), so branch.staffMembers is unreliable for
// counts. This computes a { branchId: count } map from the confirmed-working
// public staff endpoint instead, so the branch cards can show real numbers.
export const getBranchStaffCounts = async (): Promise<Record<string, number>> => {
  const staff = await getPublicBranchStaff();
  return staff.reduce((counts: Record<string, number>, s) => {
    counts[s.branchId] = (counts[s.branchId] ?? 0) + 1;
    return counts;
  }, {});
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

// ─── Admin: Branch Staff ────────────────────────────────────────────────────
// IMPORTANT: this is a FLAT resource, not nested under /admin/branches/:id.
// Confirmed shape (GET /api/admin/branch-staff):
// { success, message, data: BranchStaff[], meta: {page, limit, total,
//   totalPages, hasNextPage, hasPrevPage}, statusCode }
// Each item includes branchId, and an embedded `branch: { id, name }`.
//
// The create/update/status/delete/reorder paths below follow the same flat
// pattern and are inferred from the confirmed GET route + your app's other
// flat-resource conventions (e.g. /admin/branches/:id, /admin/branches/reorder).
// They have NOT been individually confirmed against Postman yet — verify
// each against your backend's actual route list before relying on them.

export interface ListBranchStaffParams {
  branchId?: string;
  page?: number;
  limit?: number;
}

export const getBranchStaff = async (
  branchId: string,
  params: Omit<ListBranchStaffParams, "branchId"> = {}
): Promise<PaginatedResponse<BranchStaff>> => {
  const res = await api.get<ApiResponse<BranchStaff[]>>("/admin/branch-staff", {
    params: { branchId, ...params },
  });
  const rawItems = Array.isArray(res.data.data) ? res.data.data : [];

  // FALLBACK: it's unconfirmed whether the backend actually filters by the
  // `branchId` query param — if it ignores it (returns everyone) or matches
  // on a different key (silently returns nothing), the UI would show either
  // every branch's staff or zero staff. Guard both cases by filtering
  // client-side on branchId whenever the response contains items that
  // don't all belong to the requested branch, or contains none at all.
  const allMatchRequestedBranch =
    rawItems.length > 0 && rawItems.every((s) => s.branchId === branchId);

  const items = allMatchRequestedBranch
    ? rawItems
    : rawItems.filter((s) => s.branchId === branchId);

  // meta (total/page/etc.) only makes sense when the server actually did
  // the filtering; if we had to filter client-side, recompute from what we
  // kept instead of trusting server-reported pagination counts.
  const meta = allMatchRequestedBranch ? res.data.meta : undefined;

  return {
    items,
    total: meta?.total ?? items.length,
    page: meta?.page ?? 1,
    limit: meta?.limit ?? items.length,
    totalPages: meta?.totalPages ?? 1,
  };
};

export const getBranchStaffMember = async (
  branchId: string,
  staffId: string
): Promise<BranchStaff> => {
  const res = await api.get<ApiResponse<BranchStaff>>(`/admin/branch-staff/${staffId}`);
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
  const res = await api.post<ApiResponse<BranchStaff>>("/admin/branch-staff", {
    branchId,
    ...payload,
  });
  return res.data.data;
};

export const updateBranchStaff = async (
  branchId: string,
  staffId: string,
  updates: Partial<CreateStaffPayload>
): Promise<BranchStaff> => {
  const res = await api.put<ApiResponse<BranchStaff>>(
    `/admin/branch-staff/${staffId}`,
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
    `/admin/branch-staff/${staffId}/status`,
    { isActive }
  );
  return res.data.data;
};

export const reorderBranchStaff = async (
  branchId: string,
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/branch-staff/reorder", { branchId, order });
};

export const deleteBranchStaff = async (
  branchId: string,
  staffId: string
): Promise<void> => {
  await api.delete(`/admin/branch-staff/${staffId}`);
};