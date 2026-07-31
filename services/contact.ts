import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed from real API response (GET /api/admin/contact / submissions).

export type ContactStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  details: string;
  status: ContactStatus;
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
// POST /api/contact -> creates a new submission (status defaults to "NEW")

export interface SubmitContactPayload {
  name: string;
  email: string;
  phone: string;
  sector: string;
  details: string;
}

export const submitContactForm = async (
  payload: SubmitContactPayload
): Promise<ContactSubmission> => {
  const res = await api.post<ApiResponse<ContactSubmission>>("/contact", payload);
  return res.data.data;
};

// ─── Admin Endpoints ────────────────────────────────────────────────────────
// GET    /api/admin/contact                 (paginated: status filter, search)
// GET    /api/admin/contact/:id
// PUT    /api/admin/contact/:id              (update submission fields/status)
// DELETE /api/admin/contact/:id
// POST   /api/admin/contact/bulk-status      (bulk update status)

interface ListSubmissionsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ContactStatus | "all";
  sector?: string;
}

export const getSubmissions = async (
  params: ListSubmissionsParams = {}
): Promise<PaginatedResponse<ContactSubmission>> => {
  const res = await api.get<RawListResponse<ContactSubmission>>("/admin/contact", {
    params,
  });
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getSubmission = async (id: string): Promise<ContactSubmission> => {
  const res = await api.get<ApiResponse<ContactSubmission>>(`/admin/contact/${id}`);
  return res.data.data;
};

export interface UpdateSubmissionPayload {
  name?: string;
  email?: string;
  phone?: string;
  sector?: string;
  details?: string;
  status?: ContactStatus;
}

export const updateSubmission = async (
  id: string,
  updates: UpdateSubmissionPayload
): Promise<ContactSubmission> => {
  const res = await api.put<ApiResponse<ContactSubmission>>(
    `/admin/contact/${id}`,
    updates
  );
  return res.data.data;
};

export const deleteSubmission = async (id: string): Promise<void> => {
  await api.delete(`/admin/contact/${id}`);
};

export const bulkUpdateStatus = async (
  ids: string[],
  status: ContactStatus
): Promise<void> => {
  await api.post("/admin/contact/bulk-status", { ids, status });
};