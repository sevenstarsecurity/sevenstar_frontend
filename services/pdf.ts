import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// Confirmed exact shape from GET /admin/pdfs:
// { success, message, data: [{ id, title, description, fileUrl, displayOrder, isActive, createdAt, updatedAt }], meta: {...}, statusCode }

export interface PdfDocument {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
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

export interface PdfStats {
  total: number;
  active: number;
  inactive: number;
  // Add/adjust fields to match your actual /admin/pdfs/stats response shape
  [key: string]: unknown;
}

// ─── Public Endpoints (no auth) ────────────────────────────────────────────
// Confirmed: GET /api/pdfs (public list, no auth required)

export const getPublicPdfDocuments = async (
  params: ListPdfsParams = {}
): Promise<PaginatedResponse<PdfDocument>> => {
  const res = await api.get<RawListResponse<PdfDocument>>("/pdfs", {
    params,
    public: true,
  } as any);
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

// ─── Admin Endpoints ────────────────────────────────────────────────────────
// Confirmed exact routes from the API client collection:
//   GET    /admin/pdfs                        (List PDF Documents, paginated)
//   GET    /admin/pdfs/stats                  (Get PDF Stats)
//   POST   /admin/pdfs                        (Upload PDF)
//   GET    /admin/pdfs/{pdfId}                (Get PDF Document)
//   PUT    /admin/pdfs/{pdfId}                (Update PDF)
//   PATCH  /admin/pdfs/{pdfId}/status         (Toggle PDF Status — requires { isActive } in body)
//   PUT    /admin/pdfs/reorder                (Reorder PDFs)
//   DELETE /admin/pdfs/{pdfId}                (Delete PDF)

interface ListPdfsParams {
  page?: number;
  limit?: number;
}

export const listPdfDocuments = async (
  params: ListPdfsParams = {}
): Promise<PaginatedResponse<PdfDocument>> => {
  const res = await api.get<RawListResponse<PdfDocument>>("/admin/pdfs", {
    params,
  });
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getPdfStats = async (): Promise<PdfStats> => {
  const res = await api.get<ApiResponse<PdfStats>>("/admin/pdfs/stats");
  return res.data.data;
};

export interface UploadPdfPayload {
  title: string;
  description?: string;
  fileUrl: string; // link to the PDF (e.g. Google Drive share link), not a file blob
  displayOrder?: number;
  isActive?: boolean;
}

export const uploadPdf = async (
  payload: UploadPdfPayload
): Promise<PdfDocument> => {
  const res = await api.post<ApiResponse<PdfDocument>>("/admin/pdfs", payload);
  return res.data.data;
};

export const getPdfDocument = async (id: string): Promise<PdfDocument> => {
  const res = await api.get<ApiResponse<PdfDocument>>(`/admin/pdfs/${id}`);
  return res.data.data;
};

export interface UpdatePdfPayload {
  title?: string;
  description?: string;
  fileUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export const updatePdf = async (
  id: string,
  payload: UpdatePdfPayload
): Promise<PdfDocument> => {
  const res = await api.put<ApiResponse<PdfDocument>>(`/admin/pdfs/${id}`, payload);
  return res.data.data;
};

// ── FIXED ───────────────────────────────────────────────────────────────
// The backend's /status route validates the body and requires `isActive`
// to be present (non-optional). Previously this function sent no body at
// all, which caused: "isActive: Invalid input: expected nonoptional,
// received undefined". Now the caller must pass the new boolean value.
export const togglePdfStatus = async (
  id: string,
  isActive: boolean
): Promise<PdfDocument> => {
  // NOTE: caller must pass the NEW desired value, e.g. togglePdfStatus(doc.id, !doc.isActive)
  const res = await api.patch<ApiResponse<PdfDocument>>(
    `/admin/pdfs/${id}/status`,
    { isActive }
  );
  return res.data.data;
};

export interface ReorderPdfsPayload {
  /** Ordered list of PDF ids with their new display order. */
  order: Array<{ id: string; displayOrder: number }>;
}

export const reorderPdfs = async (payload: ReorderPdfsPayload): Promise<void> => {
  await api.put("/admin/pdfs/reorder", payload);
};

export const deletePdf = async (id: string): Promise<void> => {
  await api.delete(`/admin/pdfs/${id}`);
};

// ─── Convenience helper ─────────────────────────────────────────────────────

export const getActivePdfDocuments = async (
  params: ListPdfsParams = {}
): Promise<PdfDocument[]> => {
  const { items } = await listPdfDocuments(params);
  return items
    .filter((doc) => doc.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};