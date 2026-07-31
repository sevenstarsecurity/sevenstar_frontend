"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Shield,
  LayoutGrid,
  Users,
  FileText,
  Image as ImageIcon,
  MapPin,
  Send,
  Wrench,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  Trash2,
  X,
  Loader2,
  Briefcase,
  Mail,
  Phone,
  Building2,
  Eye,
  CheckSquare,
  Square,
} from "lucide-react";
import {
  ContactSubmission,
  ContactStatus,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
  bulkUpdateStatus,
} from "@/services/contact";

const navItems = [
  { name: "Overview", icon: LayoutGrid, href: "/admin/dashboard" },
  { name: "Team", icon: Users, href: "/admin/team" },
  { name: "Blog", icon: FileText, href: "#" },
  { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
  { name: "Branches", icon: MapPin, href: "/admin/branches" },
  { name: "Clients", icon: Briefcase, href: "/admin/clients" },
  { name: "Submissions", icon: Send, href: "/admin/submissions" },
  { name: "Services", icon: Wrench, href: "#" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

const STATUS_OPTIONS: (ContactStatus | "all")[] = [
  "all",
  "NEW",
  "IN_PROGRESS",
  "RESOLVED",
  "ARCHIVED",
];

const STATUS_STYLES: Record<ContactStatus, string> = {
  NEW: "bg-blue-50 text-blue-600 border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ARCHIVED: "bg-gray-100 text-gray-500 border-gray-200",
};

const STATUS_LABELS: Record<ContactStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  ARCHIVED: "Archived",
};

/** Demo seed so the page still renders something if the API is offline. */
const SEED_SUBMISSIONS: ContactSubmission[] = [
  {
    id: "seed-1",
    name: "Mr. Emeka Obi",
    email: "emeka@edu.com",
    phone: "+234-805-777-8888",
    sector: "EDUCATION",
    details: "Interested in campus security solutions for our university.",
    status: "NEW",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    name: "Dr. Sarah Okonkwo",
    email: "sarah@hospital.com",
    phone: "+234-803-222-1111",
    sector: "HEALTHCARE",
    details: "Looking for security guards and personnel for our new hospital wing.",
    status: "ARCHIVED",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-3",
    name: "First Bank Ops",
    email: "ops@firstbank.com",
    phone: "+234-901-444-2222",
    sector: "BANKING",
    details: "Requesting a quote for branch security coverage.",
    status: "IN_PROGRESS",
    createdAt: new Date().toISOString(),
  },
];

export const AdminSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingSeed, setUsingSeed] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">("all");

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkSaving, setBulkSaving] = useState(false);

  const [viewing, setViewing] = useState<ContactSubmission | null>(null);
  const [statusSavingId, setStatusSavingId] = useState<string | null>(null);

  const loadSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getSubmissions({ limit: 100, status: "all" });
      const items = Array.isArray(res.items) ? res.items : [];
      setSubmissions(items);
      setUsingSeed(false);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response
          ?.data?.message ||
        (err as { message?: string })?.message ||
        "Failed to load submissions.";
      setError(message);
      setSubmissions(SEED_SUBMISSIONS);
      setUsingSeed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const filteredSubmissions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return submissions
      .filter((s) => (statusFilter === "all" ? true : s.status === statusFilter))
      .filter((s) =>
        q
          ? s.name.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q) ||
            s.sector.toLowerCase().includes(q)
          : true
      )
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [submissions, search, statusFilter]);

  const allVisibleSelected =
    filteredSubmissions.length > 0 &&
    filteredSubmissions.every((s) => selectedIds.has(s.id));

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (allVisibleSelected) {
        const next = new Set(prev);
        filteredSubmissions.forEach((s) => next.delete(s.id));
        return next;
      }
      const next = new Set(prev);
      filteredSubmissions.forEach((s) => next.add(s.id));
      return next;
    });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleStatusChange = async (submission: ContactSubmission, status: ContactStatus) => {
    setStatusSavingId(submission.id);
    setError("");
    try {
      if (usingSeed) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === submission.id ? { ...s, status } : s))
        );
        return;
      }
      const updated = await updateSubmission(submission.id, { status });
      setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } catch (err: unknown) {
      setError((err as { message?: string })?.message || "Failed to update status.");
    } finally {
      setStatusSavingId(null);
    }
  };

  const handleDelete = async (submission: ContactSubmission) => {
    if (!confirm(`Delete submission from "${submission.name}"? This cannot be undone.`))
      return;
    try {
      if (usingSeed) {
        setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
        return;
      }
      await deleteSubmission(submission.id);
      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(submission.id);
        return next;
      });
    } catch (err: unknown) {
      setError((err as { message?: string })?.message || "Failed to delete submission.");
    }
  };

  const handleBulkStatus = async (status: ContactStatus) => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);

    setBulkSaving(true);
    setError("");
    try {
      if (usingSeed) {
        setSubmissions((prev) =>
          prev.map((s) => (ids.includes(s.id) ? { ...s, status } : s))
        );
      } else {
        await bulkUpdateStatus(ids, status);
        setSubmissions((prev) =>
          prev.map((s) => (ids.includes(s.id) ? { ...s, status } : s))
        );
      }
      setSelectedIds(new Set());
    } catch (err: unknown) {
      setError(
        (err as { message?: string })?.message || "Failed to bulk update status."
      );
    } finally {
      setBulkSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#18191c] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      <aside className="w-60 bg-[#141518] border-r border-[#26282e] flex flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-[#26282e]">
            <div className="w-9 h-9 rounded-lg bg-[#0b4226] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base tracking-wider uppercase leading-none font-['Public_Sans']">
                SHIELD<span className="text-[#4ade80]">CMS</span>
              </h1>
              <p className="text-[10px] font-semibold text-[#86efac] tracking-widest uppercase mt-0.5">
                Admin Terminal
              </p>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.name === "Submissions";
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-[#0b4226] text-white shadow-sm"
                      : "text-gray-400 hover:bg-[#1e2025] hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#26282e]">
          <Link
            href="/admin/login"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-[#1e2025] rounded-md text-sm font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>MAIN CONSOLE</span> &gt;{" "}
              <span className="text-gray-800">SUBMISSIONS</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-700 cursor-pointer">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight shrink-0">
              Contact Submissions
            </h1>

            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:justify-end">
              <div className="relative w-full sm:max-w-md lg:max-w-lg">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or sector"
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ContactStatus | "all")}
                className="shrink-0 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "all" ? "All Statuses" : STATUS_LABELS[opt]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && !usingSeed && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-md px-4 py-3">
              {error}
            </div>
          )}

          {usingSeed && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-md px-4 py-3">
              Showing demo submission data — connect the contact API to manage live records.
            </div>
          )}

          {/* Bulk action bar */}
          {selectedIds.size > 0 && (
            <div className="bg-[#0b4226] text-white rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold">
                {selectedIds.size} submission{selectedIds.size > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"] as ContactStatus[]).map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={bulkSaving}
                      onClick={() => handleBulkStatus(status)}
                      className="text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 disabled:opacity-50 px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {bulkSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                      Mark {STATUS_LABELS[status]}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Submissions table */}
          <section className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="px-6 py-16 text-center text-sm text-gray-400 font-medium">
                No submissions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="w-10 px-4 py-3">
                        <button
                          type="button"
                          onClick={toggleSelectAll}
                          aria-label="Select all"
                          className="text-gray-400 hover:text-gray-700 cursor-pointer"
                        >
                          {allVisibleSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#0b4226]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Sector
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Received
                      </th>
                      <th className="text-right px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="px-4 py-3 align-top">
                          <button
                            type="button"
                            onClick={() => toggleSelect(s.id)}
                            aria-label={`Select ${s.name}`}
                            className="text-gray-400 hover:text-gray-700 cursor-pointer"
                          >
                            {selectedIds.has(s.id) ? (
                              <CheckSquare className="w-4 h-4 text-[#0b4226]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <p className="font-bold text-gray-900">{s.name}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[200px]">{s.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <Phone className="w-3 h-3" />
                            <span>{s.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                            <Building2 className="w-3.5 h-3.5 text-gray-400" />
                            {s.sector}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <select
                            value={s.status}
                            disabled={statusSavingId === s.id}
                            onChange={(e) =>
                              handleStatusChange(s, e.target.value as ContactStatus)
                            }
                            className={`text-xs font-bold uppercase tracking-wider border rounded-md px-2 py-1 cursor-pointer focus:outline-none disabled:opacity-50 ${STATUS_STYLES[s.status]}`}
                          >
                            {(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"] as ContactStatus[]).map(
                              (opt) => (
                                <option key={opt} value={opt}>
                                  {STATUS_LABELS[opt]}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-gray-500">
                          {new Date(s.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setViewing(s)}
                              className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-[#0b4226] cursor-pointer transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(s)}
                              className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* View submission modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Submission Details</h3>
              <button
                type="button"
                onClick={() => setViewing(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-900">{viewing.name}</p>
                <span
                  className={`text-xs font-bold uppercase tracking-wider border rounded-md px-2 py-1 ${STATUS_STYLES[viewing.status]}`}
                >
                  {STATUS_LABELS[viewing.status]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-gray-800">{viewing.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm text-gray-800">{viewing.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Sector
                  </p>
                  <p className="text-sm text-gray-800">{viewing.sector}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Received
                  </p>
                  <p className="text-sm text-gray-800">
                    {new Date(viewing.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Message
                </p>
                <p className="text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-3 leading-relaxed">
                  {viewing.details}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setViewing(null)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#1a1c1e] hover:bg-black text-white rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};