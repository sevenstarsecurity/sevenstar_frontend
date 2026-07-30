import api from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface DashboardOverview {
  clients: {
    total: number;
    active: number;
    inactive: number;
  };
  leadership: {
    totalLeaders: number;
    activeLeaders: number;
    totalExecutives: number;
    activeExecutives: number;
  };
  branches: {
    total: number;
    active: number;
    inactive: number;
    totalStaff: number;
    activeStaff: number;
  };
  gallery: {
    totalImages: number;
    totalVideos: number;
  };
  vigilance: {
    totalImages: number;
    activeImages: number;
  };
  newsletter: {
    totalSubscribers: number;
    activeSubscribers: number;
    unsubscribed: number;
    todaySubscribers: number;
  };
  contact: {
    totalSubmissions: number;
    newSubmissions: number;
    readSubmissions: number;
    archivedSubmissions: number;
  };
  social: {
    totalPlatforms: number;
    activePlatforms: number;
  };
}

export interface MonthlyCountPoint {
  month: string; // "2026-07"
  label: string; // "Jul 2026"
  count: number;
}

export interface DailyCountPoint {
  date: string; // "2026-07-30"
  count: number;
}

export interface DashboardCharts {
  contactsPerMonth: MonthlyCountPoint[];
  subscribersPerMonth: MonthlyCountPoint[];
  galleryUploadsPerMonth: MonthlyCountPoint[];
  activityPerDay: DailyCountPoint[];
}

export interface ActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  requestMethod: string;
  createdAt: string;
}

export interface RecentActivity {
  logs: ActivityLog[];
  totalToday: number;
  totalThisWeek: number;
}

export interface SystemHealth {
  database: {
    status: string; // e.g. "operational" | "degraded"
    latencyMs: number;
  };
  cloudinary: {
    status: string;
    cloudName: string;
  };
  server: {
    uptimeSeconds: number;
    uptimeFormatted: string;
    nodeVersion: string;
    environment: string;
  };
  application: {
    version: string;
    name: string;
  };
}

export interface QuickActions {
  pendingContacts: number;
  inactiveClients: number;
  inactiveBranches: number;
  inactiveSocialLinks: number;
  newsletterExportAvailable: boolean;
  activeSubscribersForExport: number;
  backupEnabled: boolean;
  lastBackupAt: string | null;
}

export interface DashboardStorage {
  cloudinary: {
    totalImages: number;
    usedBytes: number;
    usedFormatted: string;
    cloudName: string;
  };
}

export interface Dashboard {
  overview: DashboardOverview;
  charts: DashboardCharts;
  recentActivity: RecentActivity;
  systemHealth: SystemHealth;
  quickActions: QuickActions;
  storage: DashboardStorage;
  generatedAt: string;
  cached: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

// ─── Admin: Dashboard ───────────────────────────────────────────────────────

export const getDashboard = async (): Promise<Dashboard> => {
  const res = await api.get<ApiResponse<Dashboard>>("/admin/dashboard");

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to fetch dashboard");
  }

  return res.data.data;
};