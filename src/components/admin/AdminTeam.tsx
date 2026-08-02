"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "./AdminSidebar";
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
  Plus,
  RotateCw,
  Download,
  Filter,
  MoreVertical,
  ChevronDown,
  Upload,
  X,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Briefcase,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

import {
  Executive,
  getAdminExecutives,
  createExecutive,
  updateExecutive,
  toggleExecutiveStatus,
  deleteExecutive,
} from "@/services/teamexecutive";

import {
  Leader,
  getAdminLeaders,
  createLeader,
  updateLeader,
  toggleLeaderStatus,
  deleteLeader,
} from "@/services/leadership";


// ─── Shared types ───────────────────────────────────────────────────────────

type SectionKey = "Team" | "Leadership";
type Person = Executive | Leader;

const navItems = [
  { name: "Overview", icon: LayoutGrid, href: "/admin/dashboard" },
  { name: "Team", icon: Users, href: "/admin/team" },
  { name: "Blog", icon: FileText, href: "#" },
  { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
  { name: "Branches", icon: MapPin, href: "/admin/branches" },
  { name: "Clients", icon: Briefcase, href: "/admin/clients" },
  { name: "Submissions", icon: Send, href: "#" },
  { name: "Services", icon: Wrench, href: "#" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export const AdminTeam: React.FC = () => {
  // ─── Section switch: Team (Executives) vs Leadership ──────────────────────
  const [activeSection, setActiveSection] = useState<SectionKey>("Team");

  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Data state ─────────────────────────────────────────────────────────
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentList: Person[] = activeSection === "Team" ? executives : leaders;

  // ─── Form state (shared shape for both Executive & Leader) ────────────────
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [officialRole, setOfficialRole] = useState("");
  const [message, setMessage] = useState("");
  const [displayPriority, setDisplayPriority] = useState("10");
  const [operationalStatus, setOperationalStatus] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // ─── Fetch data whenever section changes ───────────────────────────────────

  const loadExecutives = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminExecutives();
      setExecutives(res.items);
    } catch (err: any) {
      setError(err?.message || "Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const loadLeaders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminLeaders();
      setLeaders(res.items);
    } catch (err: any) {
      setError(err?.message || "Failed to load leadership");
    } finally {
      setLoading(false);
    }
  };

  const refreshCurrentSection = () => {
    if (activeSection === "Team") loadExecutives();
    else loadLeaders();
  };

  useEffect(() => {
    refreshCurrentSection();
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  // ─── Panel helpers ─────────────────────────────────────────────────────────

  const resetForm = () => {
    setEditingId(null);
    setFullName("");
    setOfficialRole("");
    setMessage("");
    setDisplayPriority("10");
    setOperationalStatus(true);
    setImageFile(null);
  };

  const openAddPanel = () => {
    resetForm();
    setShowConfigPanel(true);
  };

  const openEditPanel = (person: Person) => {
    setEditingId(person.id);
    setFullName(person.name);
    setOfficialRole(person.role);
    setDisplayPriority(String(person.displayOrder));
    setOperationalStatus(person.isActive);
    setImageFile(null);
    setShowConfigPanel(true);
  };

  // ─── CRUD handlers (dispatch to the right API module by section) ──────────

  const toggleActive = async (person: Person) => {
    try {
      if (activeSection === "Team") {
        const updated = await toggleExecutiveStatus(person.id, !person.isActive);
        setExecutives((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const updated = await toggleLeaderStatus(person.id, !person.isActive);
        setLeaders((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      }
    } catch (err: any) {
      setError(err?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this person? This cannot be undone.")) return;
    try {
      if (activeSection === "Team") {
        await deleteExecutive(id);
        setExecutives((prev) => prev.filter((p) => p.id !== id));
      } else {
        await deleteLeader(id);
        setLeaders((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err: any) {
      setError(err?.message || "Failed to delete");
    }
  };

  const handleSave = async () => {
    if (!fullName.trim() || !officialRole.trim()) {
      setError("Name and role are required.");
      return;
    }

    // A brand new record must have a photo.
    if (!editingId && !imageFile) {
      setError("Please upload a photo.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      name: fullName.trim(),
      role: officialRole.trim(),
      message: message.trim(),
      displayOrder: Number(displayPriority) || 0,
      isActive: operationalStatus,
      image: imageFile || undefined,
    };

    try {
      if (activeSection === "Team") {
        if (editingId) {
          const updated = await updateExecutive(editingId, payload);
          setExecutives((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        } else {
          const created = await createExecutive(payload);
          setExecutives((prev) => [created, ...prev]);
        }
      } else {
        if (editingId) {
          const updated = await updateLeader(editingId, payload);
          setLeaders((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        } else {
          const created = await createLeader(payload);
          setLeaders((prev) => [created, ...prev]);
        }
      }
      setShowConfigPanel(false);
      resetForm();
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // ─── Filtering (client side, by name/role) ─────────────────────────────────

  const filteredList = currentList.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q);
  });

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
  const pagedList = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const sectionLabel = activeSection === "Team" ? "TEAM MEMBERS" : "LEADERSHIP";
  const addButtonLabel = activeSection === "Team" ? "Add Team Member" : "Add Leader";

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4f6f3] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* LEFT SIDEBAR NAVIGATION */}
      <AdminSidebar currentPath="/admin/team" />

      {/* CENTER & MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        {/* TOP WHITE HEADER BAR */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-xs relative lg:sticky lg:top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 truncate">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
              <span className="hidden xs:inline">MAIN CONSOLE &gt; </span>
              <span className="text-gray-800">{sectionLabel}</span>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="relative w-36 sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Global search..."
                className="w-full bg-[#f4f6f8] border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
              />
            </div>
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

        {/* STATUS BANNER STRIP */}
        <div className="bg-[#e6f4ea] border-b border-emerald-200/60 px-4 sm:px-6 py-1.5 flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-[#0b4226] tracking-wider uppercase overflow-hidden">
          <Shield className="w-3.5 h-3.5 text-[#0b4226] shrink-0" />
          <span className="truncate">OPERATIONAL COMMAND STATUS: NOMINAL</span>
        </div>

        {/* MAIN BODY AREA */}
        <main className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          {/* SECTION TABS: Team / Leadership */}
          <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar">
            {(["Team", "Leadership"] as SectionKey[]).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeSection === section
                    ? "border-[#0b4226] text-[#0b4226]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {section === "Team" ? "Team Members" : "Leadership"}
              </button>
            ))}
          </div>

          {/* TOP PAGE HEADLINE & ACTION */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                {activeSection === "Team" ? "Team Members" : "Leadership"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {activeSection === "Team"
                  ? "Manage security personnel, administrative staff, and field agents."
                  : "Manage executive leadership profiles shown on the public site."}
              </p>
            </div>

            <button
              onClick={openAddPanel}
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{addButtonLabel}</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-md px-4 py-3">
              {error}
            </div>
          )}

          {/* FILTERS & SEARCH BAR CARD */}
          <div className="bg-white border border-gray-200/90 rounded-md p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-xs">
            <div className="space-y-1 flex-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                SEARCH {activeSection === "Team" ? "MEMBER" : "LEADER"}
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Name or Role..."
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
                <Filter className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end self-end sm:self-auto pt-1 sm:pt-0">
              <button
                aria-label="Refresh"
                onClick={refreshCurrentSection}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <button
                aria-label="Download"
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TEAM / LEADERSHIP CONTAINER */}
          <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
            {/* MOBILE CARD VIEW (VISIBLE ON SMALL SCREENS < md) */}
            <div className="block md:hidden divide-y divide-gray-200">
              {loading && (
                <div className="py-10 text-center text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                  Loading {activeSection === "Team" ? "team members" : "leadership"}...
                </div>
              )}

              {!loading && pagedList.length === 0 && (
                <div className="py-10 text-center text-gray-400 font-semibold text-xs">
                  No {activeSection === "Team" ? "team members" : "leaders"} found.
                </div>
              )}

              {!loading &&
                pagedList.map((person) => (
                  <div key={person.id} className="p-4 space-y-3 hover:bg-gray-50/70 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200 border border-gray-300 flex-shrink-0">
                          <ImageFallback
                            src={person.imageUrl}
                            alt={person.name}
                            className="w-full h-full object-cover"
                            fallbackText={person.name[0]}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm leading-snug">
                            {person.name}
                          </p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-emerald-50 text-[#0b4226] text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                            {person.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase tracking-wider shrink-0 bg-gray-100 px-2 py-1 rounded">
                        ORD: {person.displayOrder}
                      </span>
                    </div>

                    {person.message && (
                      <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100 italic">
                        &quot;{person.message}&quot;
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      {/* Active Toggle */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleActive(person)}
                          className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                            person.isActive ? "bg-[#0b4226]" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              person.isActive ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[10px] font-bold tracking-wider uppercase ${
                            person.isActive ? "text-[#0b4226]" : "text-gray-400"
                          }`}
                        >
                          {person.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditPanel(person)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(person.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* DESKTOP TABLE VIEW (VISIBLE ON MEDIUM SCREENS >= md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4 w-10 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#0b4226]" />
                    </th>
                    <th className="py-3 px-4">NAME</th>
                    <th className="py-3 px-4">ROLE</th>
                    <th className="py-3 px-4">MESSAGE</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {loading && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-400">
                        <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                        Loading {activeSection === "Team" ? "team members" : "leadership"}...
                      </td>
                    </tr>
                  )}

                  {!loading && pagedList.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-400 font-semibold">
                        No {activeSection === "Team" ? "team members" : "leaders"} found.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    pagedList.map((person) => (
                      <tr key={person.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-4 px-4 text-center">
                          <input type="checkbox" className="rounded border-gray-300 text-[#0b4226]" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 border border-gray-300 flex-shrink-0">
                              <ImageFallback
                                src={person.imageUrl}
                                alt={person.name}
                                className="w-full h-full object-cover"
                                fallbackText={person.name[0]}
                              />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm leading-snug">
                                {person.name}
                              </p>
                              <p className="text-[10px] font-mono text-gray-400 font-semibold uppercase tracking-wider">
                                ORDER: {person.displayOrder}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 font-bold text-gray-800 uppercase text-[11px] tracking-wider">
                          {person.role}
                        </td>

                        <td className="py-4 px-4 text-gray-600 max-w-[280px] truncate">
                          {person.message}
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleActive(person)}
                              className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                                person.isActive ? "bg-[#0b4226]" : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                  person.isActive ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </button>
                            <span
                              className={`text-[10px] font-bold tracking-wider uppercase ${
                                person.isActive ? "text-[#0b4226]" : "text-gray-400"
                              }`}
                            >
                              {person.isActive ? "ACTIVE" : "INACTIVE"}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditPanel(person)}
                              className="text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#0b4226] cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(person.id)}
                              className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-red-600 cursor-pointer"
                            >
                              Delete
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors cursor-pointer">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-bold text-gray-500 tracking-wider uppercase">
              <span className="text-center sm:text-left">
                SYSTEM RESULT: SHOWING{" "}
                {filteredList.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} TO{" "}
                {Math.min(currentPage * pageSize, filteredList.length)} OF {filteredList.length}{" "}
                RECORDS
              </span>
              <div className="flex items-center gap-1 flex-wrap justify-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white rounded text-gray-600 disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 flex items-center justify-center rounded border font-bold text-xs ${
                      currentPage === page
                        ? "bg-[#0b4226] text-white border-[#0b4226]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white rounded text-gray-600 disabled:opacity-40"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* RIGHT SIDE PANEL - CONFIGURATION DRAWER (OVERLAY SLIDE-OVER) */}
      {showConfigPanel && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => {
              setShowConfigPanel(false);
              resetForm();
            }}
          />

          {/* Drawer Sidebar */}
          <div className="relative z-10 w-full sm:w-[450px] max-w-full bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-20">
                <div>
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    {editingId ? "Edit" : "New"}{" "}
                    {activeSection === "Team" ? "Team Member" : "Leader"}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-0.5">
                    IDENTITY &amp; PROFILE DETAILS
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowConfigPanel(false);
                    resetForm();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Fields */}
              <div className="p-5 space-y-5">
                {/* Profile Photo Upload Box */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    PROFILE PHOTO
                  </span>
                  <div className="border border-gray-300 rounded overflow-hidden">
                    <div className="bg-[#18191c] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-2 flex items-center justify-between">
                      <span>PORTRAIT UPLOAD</span>
                      <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                    </div>
                    <label className="p-6 bg-white border-2 border-dashed border-gray-200 m-3 rounded flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-7 h-7 text-gray-400 mb-2" />
                      <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                        {imageFile ? imageFile.name : "UPLOAD PHOTO"}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-1">
                        JPG, PNG up to 2MB (400×400 Opt.)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                    FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chief James O. Adebayo"
                    className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>

                {/* Role Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                    ROLE TITLE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={officialRole}
                    onChange={(e) => setOfficialRole(e.target.value)}
                    placeholder="e.g. Chairman"
                    className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>

                {/* Message / Bio */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                    MESSAGE
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Short statement or bio shown on the public site..."
                    className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] h-20 resize-none"
                  />
                </div>

                {/* Display Priority */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="space-y-1.5 w-1/3">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                      DISPLAY ORDER
                    </label>
                    <input
                      type="text"
                      value={displayPriority}
                      onChange={(e) => setDisplayPriority(e.target.value)}
                      className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2 text-xs font-bold text-gray-800 text-center focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                    />
                  </div>
                </div>

                {/* Active Status Toggle */}
                <div className="bg-[#e6f4ea]/60 border border-emerald-300/80 rounded p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#0b4226] text-white flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-900 uppercase tracking-wider leading-none">
                        ACTIVE STATUS
                      </p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                        VISIBLE ON PUBLIC SITE
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOperationalStatus(!operationalStatus)}
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                      operationalStatus ? "bg-[#0b4226]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        operationalStatus ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3 sticky bottom-0 z-20">
              <button
                onClick={() => {
                  setShowConfigPanel(false);
                  resetForm();
                }}
                className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {editingId ? "SAVE CHANGES" : "CREATE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};