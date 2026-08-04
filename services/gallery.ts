import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  imageUrl: string;
  cloudinaryId: string;
  caption?: string | null;
  displayOrder: number;
  createdAt: string;
}

// Confirmed exact shape from GET /gallery/videos:
// { success, message, data: [{ id, youtubeUrl, title, createdAt }], statusCode }
// No isActive, no updatedAt on the public list response.
export interface GalleryVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  createdAt: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface GalleryStats {
  totalImages: number;
  totalVideos: number;
  cloudinaryStorageUsed: string;
  newestUpload: string;
  oldestUpload: string;
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
  data: unknown; // admin list shape not yet confirmed — could be T[] or a wrapper object
  meta?: PaginationMeta;
  statusCode: number;
}

interface PlainArrayResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  statusCode: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

// Defensive extractor for responses whose exact shape isn't confirmed yet
// (currently used for images and admin lists). Handles a plain array OR a
// nested wrapper object (e.g. { members: [...] }, { images: [...] }).
function extractArray<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    for (const key of ["items", "images", "videos", "members", "results"]) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
}

function extractMeta(raw: unknown): PaginationMeta | undefined {
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if (obj.pagination && typeof obj.pagination === "object") {
      return obj.pagination as PaginationMeta;
    }
  }
  return undefined;
}

// ─── Public Endpoints (no auth — must not send a token or redirect on 401) ─

export const getPublicGalleryImages = async (): Promise<GalleryImage[]> => {
  const res = await api.get<RawListResponse<GalleryImage>>("/gallery", {
    public: true,
  });
  return extractArray<GalleryImage>(res.data.data);
};

export const getPublicGalleryVideos = async (p0: { _t: number; }): Promise<GalleryVideo[]> => {
  // Confirmed shape: data is a plain array.
  const res = await api.get<PlainArrayResponse<GalleryVideo>>("/gallery/videos", {
    public: true,
  });
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
  const items = extractArray<GalleryImage>(res.data.data);
  const meta = res.data.meta ?? extractMeta(res.data.data);

  return {
    items,
    meta: meta ?? {
      page: 1,
      limit: items.length,
      total: items.length,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
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

  // Don't set Content-Type manually — let axios/browser generate the
  // multipart boundary. Forcing "multipart/form-data" with no boundary
  // produces a body the backend can't parse.
  const res = await api.post<ApiResponse<GalleryImage>>(
    "/admin/gallery/images",
    formData
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

  const res = await api.post<RawListResponse<GalleryImage>>(
    "/admin/gallery/images/bulk",
    formData
  );
  return extractArray<GalleryImage>(res.data.data);
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

  // IMPORTANT: don't manually set Content-Type for FormData bodies.
  // The browser/axios needs to generate the multipart boundary itself
  // (e.g. "multipart/form-data; boundary=----WebKitFormBoundary...").
  // Hardcoding "multipart/form-data" with no boundary produces a body
  // the server can't parse — this was the source of the save failing.
  const res = await api.put<ApiResponse<GalleryImage>>(
    `/admin/gallery/images/${id}`,
    formData
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
  const items = extractArray<GalleryVideo>(res.data.data);
  const meta = res.data.meta ?? extractMeta(res.data.data);

  return {
    items,
    meta: meta ?? {
      page: 1,
      limit: items.length,
      total: items.length,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
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

// ─── Helper: convert a watch URL to an embeddable URL ──────────────────────
// YouTube blocks watch?v= URLs inside <iframe>; embeds require /embed/VIDEO_ID.
// Use this in your component when rendering: <iframe src={getYoutubeEmbedUrl(video.youtubeUrl)} />
export const getYoutubeEmbedUrl = (youtubeUrl: string): string => {
  try {
    const url = new URL(youtubeUrl);
    let videoId: string | null = null;

    if (url.hostname.includes("youtu.be")) {
      videoId = url.pathname.slice(1);
    } else if (url.hostname.includes("youtube.com")) {
      videoId = url.searchParams.get("v");
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : youtubeUrl;
  } catch {
    return youtubeUrl;
  }
};