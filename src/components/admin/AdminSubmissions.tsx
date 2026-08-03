"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  User,
  Trash2,
  X,
  Loader2,
  Mail,
  Phone,
  Building2,
  Eye,
  CheckSquare,
  Square,
  Calendar,
  Send,
  CheckCircle,
} from "lucide-react";
import {
  ContactSubmission,
  ContactStatus,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
  bulkUpdateStatus,
} from "@/services/contact";
import { AdminSidebar } from "./AdminSidebar";

const STATUS_OPTIONS: (ContactStatus | "all")[] = [
  "all",
  "NEW",
  "IN_PROGRESS",
  "RESOLVED",
  "ARCHIVED",
];

const STATUS_STYLES: Record<ContactStatus, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-800 border-amber-200",
  RESOLVED: "bg-emerald-50 text-emerald-800 border-emerald-200",
  ARCHIVED: "bg-gray-100 text-gray-700 border-gray-200",
};

const STATUS_LABELS: Record<ContactStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  ARCHIVED: "Archived",
};

/** Demo seed data if API is offline */
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
        if (viewing?.id === submission.id) {
          setViewing((prev) => (prev ? { ...prev, status } : null));
        }
        return;
      }
      const updated = await updateSubmission(submission.id, { status });
      setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      if (viewing?.id === submission.id) {
        setViewing(updated);
      }
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
        if (viewing?.id === submission.id) setViewing(null);
        return;
      }
      await deleteSubmission(submission.id);
      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
      if (viewing?.id === submission.id) setViewing(null);
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
      setError((err as { message?: string })?.message || "Failed to bulk update status.");
    } finally {
      setBulkSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4f6f3] text-gray-900 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* Unified Light Sidebar */}
      <AdminSidebar currentPath="/admin/submissions" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP WHITE HEADER BAR */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-xs relative lg:sticky lg:top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 truncate">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
              <span className="hidden xs:inline">MAIN CONSOLE &gt; </span>
              <span className="text-[#0b4226] font-bold">SUBMISSIONS</span>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              aria-label="Notifications"
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-700 cursor-pointer">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Contact & Quote Submissions
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage inquiries and security requests submitted by clients.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email, or sector..."
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-xs font-medium text-gray-800 placeholder:text-gray-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0b4226]"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ContactStatus | "all")}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0b4226] cursor-pointer"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "all" ? "All Statuses" : STATUS_LABELS[opt]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Banner Messages */}
          {error && !usingSeed && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {usingSeed && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-lg px-4 py-3">
              Showing demo submission data — live submissions will automatically appear here when submitted.
            </div>
          )}

          {/* Bulk Selection Action Bar */}
          {selectedIds.size > 0 && (
            <div className="bg-[#0b4226] text-white rounded-lg px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
              <span className="text-xs font-bold tracking-wide">
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
                      className="text-xs font-extrabold uppercase tracking-wider bg-white/10 hover:bg-white/20 disabled:opacity-50 px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
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

          {/* Table & Cards Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
            {loading ? (
              <div className="p-12 flex flex-col items-center justify-center text-gray-500 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#0b4226]" />
                <span className="text-xs font-bold uppercase tracking-wider">Loading Submissions...</span>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center text-gray-500 space-y-2">
                <Send className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="text-sm font-bold text-gray-800">No submissions found</p>
                <p className="text-xs text-gray-500">Try adjusting your search query or status filter.</p>
              </div>
            ) : (
              <>
                {/* MOBILE CARDS VIEW (< md) */}
                <div className="block md:hidden divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => {
                    const isSelected = selectedIds.has(submission.id);
                    const isSaving = statusSavingId === submission.id;

                    return (
                      <div
                        key={submission.id}
                        className={`p-4 space-y-3 transition-colors ${
                          isSelected ? "bg-emerald-50/50" : "hover:bg-gray-50/70"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => toggleSelect(submission.id)}
                              className="text-gray-400 hover:text-[#0b4226] cursor-pointer shrink-0"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-[#0b4226]" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                            <div>
                              <p className="font-bold text-gray-900 text-sm leading-snug">
                                {submission.name}
                              </p>
                              <span className="inline-flex items-center gap-1 mt-1 bg-gray-100 text-gray-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-gray-200">
                                <Building2 className="w-3 h-3 text-gray-500" />
                                {submission.sector}
                              </span>
                            </div>
                          </div>

                          <select
                            value={submission.status}
                            disabled={isSaving}
                            onChange={(e) =>
                              handleStatusChange(
                                submission,
                                e.target.value as ContactStatus
                              )
                            }
                            className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-1 rounded-md border shadow-2xs focus:outline-none cursor-pointer shrink-0 ${
                              STATUS_STYLES[submission.status]
                            }`}
                          >
                            {(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"] as ContactStatus[]).map(
                              (st) => (
                                <option key={st} value={st}>
                                  {STATUS_LABELS[st]}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        {/* Contact details */}
                        <div className="text-xs text-gray-600 space-y-1">
                          <a
                            href={`mailto:${submission.email}`}
                            className="flex items-center gap-1.5 text-emerald-800 hover:underline font-semibold"
                          >
                            <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate">{submission.email}</span>
                          </a>
                          {submission.phone && (
                            <a
                              href={`tel:${submission.phone}`}
                              className="flex items-center gap-1.5 text-gray-600 hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span>{submission.phone}</span>
                            </a>
                          )}
                        </div>

                        {/* Details quote box */}
                        {submission.details && (
                          <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100 line-clamp-2">
                            {submission.details}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px]">
                          <span className="text-gray-400 font-semibold">
                            {new Date(submission.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setViewing(submission)}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#0b4226] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(submission)}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* DESKTOP TABLE VIEW (>= md) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-extrabold text-gray-600 uppercase tracking-wider">
                        <th className="py-3.5 px-4 w-10 text-center">
                          <button
                            type="button"
                            onClick={toggleSelectAll}
                            className="text-gray-400 hover:text-[#0b4226] cursor-pointer"
                          >
                            {allVisibleSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#0b4226]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </th>
                        <th className="py-3.5 px-4">Contact Person</th>
                        <th className="py-3.5 px-4">Sector</th>
                        <th className="py-3.5 px-4">Details</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-700 font-medium">
                      {filteredSubmissions.map((submission) => {
                        const isSelected = selectedIds.has(submission.id);
                        const isSaving = statusSavingId === submission.id;

                        return (
                          <tr
                            key={submission.id}
                            className={`hover:bg-emerald-50/40 transition-colors ${
                              isSelected ? "bg-emerald-50/60" : ""
                            }`}
                          >
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => toggleSelect(submission.id)}
                                className="text-gray-400 hover:text-[#0b4226] cursor-pointer"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-4 h-4 text-[#0b4226]" />
                                ) : (
                                  <Square className="w-4 h-4" />
                                )}
                              </button>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-bold text-gray-900 text-sm">{submission.name}</div>
                              <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-gray-400" />
                                  {submission.email}
                                </span>
                                {submission.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-gray-400" />
                                    {submission.phone}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-gray-200">
                                <Building2 className="w-3 h-3 text-gray-500" />
                                {submission.sector}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 max-w-xs">
                              <p className="line-clamp-2 text-gray-600 leading-relaxed text-xs">
                                {submission.details}
                              </p>
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={submission.status}
                                disabled={isSaving}
                                onChange={(e) =>
                                  handleStatusChange(
                                    submission,
                                    e.target.value as ContactStatus
                                  )
                                }
                                className={`text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md border shadow-2xs focus:outline-none cursor-pointer ${
                                  STATUS_STYLES[submission.status]
                                }`}
                              >
                                {(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"] as ContactStatus[]).map(
                                  (st) => (
                                    <option key={st} value={st}>
                                      {STATUS_LABELS[st]}
                                    </option>
                                  )
                                )}
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                              {new Date(submission.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setViewing(submission)}
                                  className="p-1.5 text-gray-500 hover:text-[#0b4226] hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(submission)}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                  title="Delete Submission"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Submission Detail Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#0b4226] text-white p-4 sm:p-5 flex items-center justify-between sticky top-0 z-10">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
                  Submission Details
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-0.5">{viewing.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewing(null)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs border-b border-gray-100 pb-4">
                <div>
                  <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${viewing.email}`}
                    className="font-semibold text-emerald-800 hover:underline flex items-center gap-1.5 truncate"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{viewing.email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">
                    Phone Number
                  </span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    {viewing.phone || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">
                    Sector
                  </span>
                  <span className="font-extrabold text-gray-800 uppercase bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                    {viewing.sector}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">
                    Submitted Date
                  </span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    {new Date(viewing.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">
                  Message & Request Details
                </span>
                <p className="text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg p-3.5 sm:p-4 leading-relaxed whitespace-pre-wrap">
                  {viewing.details}
                </p>
              </div>

              {/* Status Selector in Modal */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-600">Update Status:</span>
                <select
                  value={viewing.status}
                  onChange={(e) =>
                    handleStatusChange(viewing, e.target.value as ContactStatus)
                  }
                  className={`text-xs font-extrabold uppercase px-3 py-1.5 rounded-md border cursor-pointer ${
                    STATUS_STYLES[viewing.status]
                  }`}
                >
                  {(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"] as ContactStatus[]).map(
                    (st) => (
                      <option key={st} value={st}>
                        {STATUS_LABELS[st]}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 sm:px-6 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDelete(viewing)}
                className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center justify-center gap-1 px-3 py-2 hover:bg-red-50 rounded-md transition-colors w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4" />
                Delete Record
              </button>
              <button
                type="button"
                onClick={() => setViewing(null)}
                className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-md transition-colors w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};