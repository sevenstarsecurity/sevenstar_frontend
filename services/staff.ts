// services/staff.ts
import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Staff {
  id: string;
  name: string;
  role: string;
  displayOrder: number;
  isActive: boolean;
  imageUrl?: string | null;
  createdAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface CreateStaffPayload {
  name: string;
  role: string;
  displayOrder?: number;
  image?: File; // sent to the API under the field name "file"
}

// ─── Staff (flat, top-level resource) ──────────────────────────────────────
// Confirmed from Postman (POST /admin/staff, multipart/form-data):
// fields are exactly "file" (image), "name", "role", "displayOrder".
// No "message", no "isActive" in the create body — status is handled
// separately via the dedicated /status endpoint below, same pattern as
// branches/executives/leadership in this codebase.

export const getAdminStaff = async (): Promise<Staff[]> => {
  const res = await api.get<ApiResponse<Staff[]>>("/admin/staff");
  return Array.isArray(res.data.data) ? res.data.data : [];
};

export const getStaffMember = async (staffId: string): Promise<Staff> => {
  const res = await api.get<ApiResponse<Staff>>(`/admin/staff/${staffId}`);
  return res.data.data;
};

export const createStaff = async (
  payload: CreateStaffPayload
): Promise<Staff> => {
  const formData = new FormData();
  if (payload.image) formData.append("file", payload.image); // key is "file"
  formData.append("name", payload.name);
  formData.append("role", payload.role);
  if (payload.displayOrder !== undefined) formData.append("displayOrder", String(payload.displayOrder));

  const res = await api.post<ApiResponse<Staff>>("/admin/staff", formData, {
    headers: { "Content-Type": undefined },
  });
  return res.data.data;
};

export const updateStaff = async (
  staffId: string,
  updates: Partial<CreateStaffPayload>
): Promise<Staff> => {
  const formData = new FormData();
  if (updates.image) formData.append("file", updates.image); // key is "file"
  if (updates.name !== undefined) formData.append("name", updates.name);
  if (updates.role !== undefined) formData.append("role", updates.role);
  if (updates.displayOrder !== undefined) formData.append("displayOrder", String(updates.displayOrder));

  const res = await api.put<ApiResponse<Staff>>(`/admin/staff/${staffId}`, formData, {
    headers: { "Content-Type": undefined },
  });
  return res.data.data;
};

export const toggleStaffStatus = async (
  staffId: string,
  isActive: boolean
): Promise<Staff> => {
  const res = await api.patch<ApiResponse<Staff>>(
    `/admin/staff/${staffId}/status`,
    { isActive }
  );
  return res.data.data;
};

export const reorderStaff = async (
  order: { id: string; displayOrder: number }[]
): Promise<void> => {
  await api.patch(`/admin/staff/reorder`, { order });
};

export const deleteStaff = async (staffId: string): Promise<void> => {
  await api.delete(`/admin/staff/${staffId}`);
};