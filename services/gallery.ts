import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────
// All fields below are confirmed from a real API response
// (GET /api/admin/gallery/images).

export interface GalleryImage {
  id: string;
  imageUrl: string;      // confirmed — was wrongly guessed as "url"
  cloudinaryId: string;  // confirmed — was wrongly guessed as "publicId"
  caption?: string | null;
  displayOrder: number;
  createdAt: string;
  // Note: no "isActive" or "updatedAt" field appeared in the real response.
  // If your backend does have them, they were just omitted from this list
  // response — otherwise remove from any UI assuming they exist.
}

export interface GalleryVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  createdAt: string;
  updatedAt?: string;
  // isActive not yet confirmed for videos either — same caveat as above
  isActive?: boolean;
}

export interface GalleryStats {
  totalImages: number;
  totalVideos: number;
  cloudinaryStorageUsed: string;
  newestUpload: string;
  oldestUpload: string;
}

// Confirmed exact wrapper shape: top-level "data" is a plain array,
// and pagination info lives in a separate top-level "meta" object.
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

// ─── Public Endpoints ───────────────────────────────────────────────────────

export const getPublicGalleryImages = async (): Promise<GalleryImage[]> => {
  const res = await api.get<ApiResponse<GalleryImage[]>>("/gallery");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

export const getPublicGalleryVideos = async (): Promise<GalleryVideo[]> => {
  const res = await api.get<ApiResponse<GalleryVideo[]>>("/gallery/videos");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

// ─── Admin: Images ──────────────────────────────────────────────────────────

interface ListImagesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getAdminGalleryImages = async (
  params: ListImagesParams = {}
): Promise<PaginatedResponse<GalleryImage>> => {
  const res = await api.get<RawListResponse<GalleryImage>>("/admin/gallery/images", {
    params,
  });
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getAdminGalleryImage = async (id: string): Promise<GalleryImage> => {
  const res = await api.get<ApiResponse<GalleryImage>>(`/admin/gallery/images/${id}`);
  return res.data.data;
};

export const uploadGalleryImage = async (
  file: File,
  caption?: string,
  displayOrder?: number
): Promise<GalleryImage> => {
  const formData = new FormData();
  formData.append("file", file);
  if (caption) formData.append("caption", caption);
  if (displayOrder !== undefined) formData.append("displayOrder", String(displayOrder));

  const res = await api.post<ApiResponse<GalleryImage>>(
    "/admin/gallery/images",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data.data;
};

export const bulkUploadGalleryImages = async (
  files: File[]
): Promise<GalleryImage[]> => {
  if (files.length > 50) {
    throw new Error("Bulk upload supports a maximum of 50 images.");
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await api.post<ApiResponse<GalleryImage[]>>(
    "/admin/gallery/images/bulk",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return Array.isArray(res.data.data) ? res.data.data : [];
};

export const updateGalleryImage = async (
  id: string,
  updates: { file?: File; caption?: string; displayOrder?: number }
): Promise<GalleryImage> => {
  const formData = new FormData();
  if (updates.file) formData.append("file", updates.file);
  if (updates.caption !== undefined) formData.append("caption", updates.caption);
  if (updates.displayOrder !== undefined)
    formData.append("displayOrder", String(updates.displayOrder));

  const res = await api.put<ApiResponse<GalleryImage>>(
    `/admin/gallery/images/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data.data;
};

export const reorderGalleryImages = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch("/admin/gallery/images/reorder", { order });
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  await api.delete(`/admin/gallery/images/${id}`);
};

export const bulkDeleteGalleryImages = async (ids: string[]): Promise<void> => {
  await api.post("/admin/gallery/images/bulk-delete", { ids });
};

// ─── Admin: Videos ──────────────────────────────────────────────────────────

interface ListVideosParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getAdminGalleryVideos = async (
  params: ListVideosParams = {}
): Promise<PaginatedResponse<GalleryVideo>> => {
  const res = await api.get<RawListResponse<GalleryVideo>>("/admin/gallery/videos", {
    params,
  });
  return {
    items: Array.isArray(res.data.data) ? res.data.data : [],
    meta: res.data.meta,
  };
};

export const getAdminGalleryVideo = async (id: string): Promise<GalleryVideo> => {
  const res = await api.get<ApiResponse<GalleryVideo>>(`/admin/gallery/videos/${id}`);
  return res.data.data;
};

const YOUTUBE_URL_PATTERN = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i;

export const addGalleryVideo = async (
  title: string,
  youtubeUrl: string
): Promise<GalleryVideo> => {
  if (!YOUTUBE_URL_PATTERN.test(youtubeUrl)) {
    throw new Error("Video URL must be a youtube.com or youtu.be link.");
  }

  const res = await api.post<ApiResponse<GalleryVideo>>("/admin/gallery/videos", {
    youtubeUrl,
    title,
  });
  return res.data.data;
};

export const updateGalleryVideo = async (
  id: string,
  updates: { title?: string; youtubeUrl?: string }
): Promise<GalleryVideo> => {
  const res = await api.put<ApiResponse<GalleryVideo>>(
    `/admin/gallery/videos/${id}`,
    updates
  );
  return res.data.data;
};

export const deleteGalleryVideo = async (id: string): Promise<void> => {
  await api.delete(`/admin/gallery/videos/${id}`);
};

// ─── Admin: Stats ───────────────────────────────────────────────────────────

export const getGalleryStats = async (): Promise<GalleryStats> => {
  const res = await api.get<ApiResponse<GalleryStats>>("/admin/gallery/stats");
  return res.data.data;
};