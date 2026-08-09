"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Shield,
  LayoutGrid,
  Users,
  FileText,
  Image as ImageIcon,
  MapPin,
  Send,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  ClipboardList,
  MoreVertical,
  RotateCw,
  FileSpreadsheet,
  AlertTriangle,
  Loader2,
  Building2,
  Mail,
  MessageSquare,
  Eye,
  Share2,
  Video,
  Crown,
  Briefcase,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ImageFallback } from "../ui/ImageFallback";
import { getDashboard, Dashboard, ActivityLog } from "@/services/dashboard";
import { AdminSidebar } from "./AdminSidebar";

const ACTION_LABELS: Record<string, string> = {
  UPLOAD_IMAGE: "Image Uploaded",
  LOGIN: "Admin Logged In",
  LEADER_CREATE: "Leader Created",
  LEADER_UPDATE: "Leader Updated",
  LEADER_DELETE: "Leader Deleted",
  EXECUTIVE_CREATE: "Executive Created",
  EXECUTIVE_UPDATE: "Executive Updated",
  EXECUTIVE_DELETE: "Executive Deleted",
  VIGILANCE_DELETE: "Vigilance Image Removed",
  DELETE_IMAGE: "Image Deleted",
  BRANCH_CREATE: "Branch Created",
  BRANCH_DELETE: "Branch Removed",
  GALLERY_IMAGE_CREATE: "Gallery Image Added",
  GALLERY_VIDEO_CREATE: "Gallery Video Added",
};

// Builds a short "Entity · id" description for an activity log row.
// Guards against logs missing `entity`/`entityId` (e.g. LOGIN events).
const describeLog = (log: ActivityLog): string => {
  const entity = log.entity ?? "";
  const readableEntity = entity ? entity.replace(/([a-z])([A-Z])/g, "$1 $2") : "";

  const entityId = log.entityId ?? "";
  if (!entityId) return readableEntity || "—";

  const shortId = entityId.length > 24 ? `${entityId.slice(0, 24)}…` : entityId;
  return readableEntity ? `${readableEntity} · ${shortId}` : shortId;
};

const timeAgo = (iso: string): string => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "JUST NOW";
  if (mins < 60) return `${mins} MINUTE${mins === 1 ? "" : "S"} AGO`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} HOUR${hours === 1 ? "" : "S"} AGO`;
  const days = Math.floor(hours / 24);
  return `${days} DAY${days === 1 ? "" : "S"} AGO`;
};

export const AdminDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const loadDashboard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Close dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: wire up to real auth/logout endpoint
    window.location.href = "/admin/login";
  };

  const handleReadAllNotifications = () => {
    setNotificationsRead(true);
  };

  const overview = dashboard?.overview;
  const logs = dashboard?.recentActivity.logs ?? [];
  const health = dashboard?.systemHealth;
  const quickActions = dashboard?.quickActions;
  const notifications = logs.slice(0, 6);
  const hasUnread = !notificationsRead && !!quickActions && quickActions.pendingContacts > 0;

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4f6f3] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      <AdminSidebar currentPath="/admin/dashboard" />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* TOP HEADER BAR */}
        <header className="bg-[#0b4226] text-white px-8 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-20">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-emerald-300/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terminal..."
              className="w-full bg-[#06331b] border border-emerald-700/50 rounded-md pl-10 pr-4 py-1.5 text-xs text-white placeholder:text-emerald-200/50 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => loadDashboard(true)}
              aria-label="Refresh"
              className="p-1.5 rounded-full hover:bg-emerald-800/60 transition-colors cursor-pointer text-emerald-100"
            >
              <RotateCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>

            {/* NOTIFICATIONS */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((v) => !v)}
                aria-label="Notifications"
                className="relative p-1.5 rounded-full hover:bg-emerald-800/60 transition-colors cursor-pointer text-emerald-100"
              >
                <Bell className="w-5 h-5" />
                {hasUnread && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 overflow-hidden z-30">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900">Notifications</h4>
                    <button
                      onClick={handleReadAllNotifications}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                    {notifications.length === 0 && (
                      <div className="px-4 py-6 text-center text-xs text-gray-400">
                        No notifications.
                      </div>
                    )}
                    {notifications.map((log) => (
                      <div key={log.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                        <p className="text-xs font-bold text-gray-900">
                          {ACTION_LABELS[log.action] || log.action}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{describeLog(log)}</p>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">
                          {timeAgo(log.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-600 flex items-center justify-center text-white cursor-pointer hover:bg-emerald-700 transition-colors"
              >
                <User className="w-4 h-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 overflow-hidden z-30">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">Administrator</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Seven Star Security Admin</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="p-6 md:p-8 space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading dashboard...
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-md px-5 py-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {error}
              </span>
              <button
                onClick={() => loadDashboard()}
                className="text-xs font-bold uppercase tracking-wider underline"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && dashboard && overview && (
            <>
              {/* WELCOME BANNER */}
              <div className="bg-white border border-gray-200/90 rounded-md p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#0b4226]/5 border border-[#0b4226]/20 flex items-center justify-center p-2 flex-shrink-0">
                    <ImageFallback
                      src="/images/Trusted By Badge.webp"
                      alt="Seven Star Security Emblem"
                      className="w-full h-full object-contain"
                      fallbackText="Emblem"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                      Welcome back, Administrator
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5 font-normal">
                      Database status:{" "}
                      <span
                        className={`font-bold ${health?.database.status === "operational"
                            ? "text-emerald-600"
                            : "text-amber-600"
                          }`}
                      >
                        {health?.database.status.toUpperCase()}
                      </span>{" "}
                      · {health?.database.latencyMs}ms latency
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right font-mono space-y-0.5 self-end md:self-auto">
                  <p className="text-xs font-bold text-[#0b4226]">
                    GENERATED: {new Date(dashboard.generatedAt).toLocaleString()}
                  </p>
                  <p className="text-[11px] font-semibold text-gray-400">
                    UPTIME: {health?.server.uptimeFormatted} · v{health?.application.version}
                  </p>
                </div>
              </div>

              {/* STAT CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      ACTIVE CLIENTS
                    </span>
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.clients.active}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">
                      of {overview.clients.total} total
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      PENDING CONTACTS
                    </span>
                    <ClipboardList className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.contact.newSubmissions}
                    </p>
                    <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                      {overview.contact.newSubmissions > 0 ? (
                        <>
                          <span>!</span> Needs review
                        </>
                      ) : (
                        <span className="text-emerald-600">All caught up</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      NEWSLETTER SUBSCRIBERS
                    </span>
                    <Mail className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.newsletter.activeSubscribers}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">
                      +{overview.newsletter.todaySubscribers} today
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      BRANCHES ACTIVE
                    </span>
                    <Building2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.branches.active}/{overview.branches.total}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1">
                      <span>↻</span> {overview.branches.activeStaff} staff active
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      LEADERSHIP &amp; TEAM
                    </span>
                    <Crown className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.leadership.activeLeaders + overview.leadership.activeExecutives}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">
                      {overview.leadership.activeLeaders} leaders ·{" "}
                      {overview.leadership.activeExecutives} executives
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      GALLERY MEDIA
                    </span>
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.gallery.totalImages + overview.gallery.totalVideos}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> {overview.gallery.totalImages}
                      <Video className="w-3 h-3 ml-1" /> {overview.gallery.totalVideos}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      VIGILANCE IMAGES
                    </span>
                    <Eye className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.vigilance.activeImages}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">
                      of {overview.vigilance.totalImages} total
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                      SOCIAL PLATFORMS
                    </span>
                    <Share2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">
                      {overview.social.activePlatforms}/{overview.social.totalPlatforms}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">Active links</p>
                  </div>
                </div>
              </div>

              {/* CHARTS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-4">
                    Contact Submissions — Last 12 Months
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={dashboard.charts.contactsPerMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eef1ee" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        tickFormatter={(v: string) => v.split(" ")[0]}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #e5e7eb" }}
                        labelFormatter={(label) => label}
                      />
                      <Bar dataKey="count" fill="#0b4226" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-4">
                    Newsletter Signups — Last 12 Months
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={dashboard.charts.subscribersPerMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eef1ee" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        tickFormatter={(v: string) => v.split(" ")[0]}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #e5e7eb" }} />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#0b4226"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#0b4226" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-4">
                    Gallery Uploads — Last 12 Months
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={dashboard.charts.galleryUploadsPerMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eef1ee" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        tickFormatter={(v: string) => v.split(" ")[0]}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #e5e7eb" }} />
                      <Bar dataKey="count" fill="#9e7628" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-4">
                    Admin Activity — Last 30 Days
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={dashboard.charts.activityPerDay}>
                      <defs>
                        <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0b4226" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#0b4226" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eef1ee" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 9, fill: "#9ca3af" }}
                        tickFormatter={(v: string) => v.slice(8)}
                        axisLine={false}
                        tickLine={false}
                        interval={4}
                      />
                      <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #e5e7eb" }} />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#0b4226"
                        strokeWidth={2}
                        fill="url(#activityFill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* MIDDLE SPLIT SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 tracking-tight">
                      Recent Activity
                    </h3>
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                      {dashboard.recentActivity.totalToday} today ·{" "}
                      {dashboard.recentActivity.totalThisWeek} this week
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          <th className="py-3 px-4">ADMIN</th>
                          <th className="py-3 px-4">ACTION</th>
                          <th className="py-3 px-4">DETAIL</th>
                          <th className="py-3 px-4">TIME</th>
                          <th className="py-3 px-4 text-right">METHOD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                        {logs.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-10 text-center text-gray-400">
                              No recent activity.
                            </td>
                          </tr>
                        )}
                        {logs.slice(0, 8).map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-gray-900">
                              {log.adminName}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-[#e6f4ea] text-[#137333]">
                                {ACTION_LABELS[log.action] || log.action}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-gray-600 max-w-[240px] truncate">
                              {describeLog(log)}
                            </td>
                            <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                              {timeAgo(log.createdAt)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span className="text-[10px] font-bold text-gray-400 uppercase">
                                {log.requestMethod}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden flex flex-col justify-between">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 tracking-tight">
                      Terminal Activity
                    </h3>
                  </div>

                  <div className="p-5 space-y-5 flex-1">
                    {logs.slice(0, 5).map((log, idx) => (
                      <div key={log.id} className="flex items-start gap-3.5 relative">
                        <div className="mt-1 flex-shrink-0">
                          <span
                            className={`w-2.5 h-2.5 rounded-full block ${idx === 0 ? "bg-[#0b4226]" : "bg-gray-300"
                              }`}
                          />
                        </div>

                        <div className="space-y-0.5 text-xs">
                          <h4 className="font-bold text-gray-900 leading-tight">
                            {ACTION_LABELS[log.action] || log.action}
                          </h4>
                          <p className="text-gray-500 leading-normal text-[11px]">
                            {describeLog(log)}
                          </p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider pt-0.5">
                            {timeAgo(log.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                    <button className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors w-full cursor-pointer">
                      Show All Logs
                    </button>
                  </div>
                </div>
              </div>

              {/* SYSTEM HEALTH + QUICK ACTIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-white border border-gray-200/90 rounded-md shadow-xs p-5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    System Health
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Database
                      </p>
                      <p
                        className={`font-bold mt-0.5 ${health?.database.status === "operational"
                            ? "text-emerald-600"
                            : "text-amber-600"
                          }`}
                      >
                        {health?.database.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Cloudinary
                      </p>
                      <p className="font-bold mt-0.5 text-emerald-600">
                        {health?.cloudinary.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Node
                      </p>
                      <p className="font-bold mt-0.5 text-gray-800">
                        {health?.server.nodeVersion}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Storage Used
                      </p>
                      <p className="font-bold mt-0.5 text-gray-800">
                        {dashboard.storage.cloudinary.totalImages} images ·{" "}
                        {dashboard.storage.cloudinary.usedFormatted}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-gray-200/90 rounded-md shadow-xs p-5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Pending contacts</span>
                      <span className="font-bold text-gray-900">
                        {quickActions?.pendingContacts}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Inactive branches</span>
                      <span className="font-bold text-gray-900">
                        {quickActions?.inactiveBranches}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Backup enabled</span>
                      <span
                        className={`font-bold ${quickActions?.backupEnabled ? "text-emerald-600" : "text-red-600"
                          }`}
                      >
                        {quickActions?.backupEnabled ? "YES" : "NO"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADMINISTRATIVE COMMAND CENTER
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  ADMINISTRATIVE COMMAND CENTER
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <button className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs">
                    <Shield className="w-4 h-4 text-[#9e7628]" />
                    <span>GENERATE SECURITY REPORT</span>
                  </button>

                  <button
                    disabled={!quickActions?.newsletterExportAvailable}
                    className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-[#9e7628]" />
                    <span>
                      EXPORT SUBSCRIBERS ({quickActions?.activeSubscribersForExport})
                    </span>
                  </button>

                  <button className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs">
                    <MessageSquare className="w-4 h-4 text-[#9e7628]" />
                    <span>REVIEW CONTACTS ({overview.contact.newSubmissions})</span>
                  </button>

                  <button
                    onClick={() => loadDashboard(true)}
                    className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <RotateCw className={`w-4 h-4 text-[#9e7628] ${refreshing ? "animate-spin" : ""}`} />
                    <span>RE-SYNC DASHBOARD</span>
                  </button>
                </div>
              </div> */}
            </>
          )}
        </main>
      </div>
    </div>
  );
};