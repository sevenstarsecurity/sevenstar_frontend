"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  Edit2,
  Trash2,
  Globe,
  RotateCw,
  X,
  Building,
  Loader2,
  Briefcase,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";
import {
  getAdminBranches,
  createBranch,
  updateBranch,
  deleteBranch,
  Branch,
  CreateBranchPayload,
} from "@/services/branches";

export const AdminBranches: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]); // always initialized as array
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // Form State
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

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

  const loadBranches = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getAdminBranches({ limit: 50 });
      // Defensive: no matter what the backend returns, never let state become non-array
      const items = Array.isArray(res?.items) ? res.items : [];
      setBranches(items);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to load branches."
      );
      setBranches([]); // guarantee array on failure too
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const resetForm = () => {
    setBranchName("");
    setAddress("");
    setPhone("");
    setMobile("");
    setEmail("");
    setLatitude("");
    setLongitude("");
    setGoogleMapsUrl("");
  };

  const handleEdit = (branch: Branch) => {
    setSelectedBranch(branch);
    setBranchName(branch.name ?? "");
    setAddress(branch.address ?? "");
    setPhone(branch.phone ?? "");
    setMobile(branch.mobile ?? "");
    setEmail(branch.email ?? "");
    setLatitude(branch.latitude != null ? String(branch.latitude) : "");
    setLongitude(branch.longitude != null ? String(branch.longitude) : "");
    setGoogleMapsUrl(branch.googleMapsUrl ?? "");
    setShowAddModal(true);
  };

  const handleCreateNew = () => {
    setSelectedBranch(null);
    resetForm();
    setShowAddModal(true);
  };

  const handleDelete = async (branch: Branch) => {
    if (!confirm(`Delete "${branch.name}"? This will remove all its staff too.`)) return;
    try {
      await deleteBranch(branch.id);
      setBranches((prev) => (prev ?? []).filter((b) => b.id !== branch.id));
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to delete branch.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    const payload: CreateBranchPayload = {
      name: branchName.trim(),
      address: address.trim(),
      phone: phone.trim(),
      mobile: mobile.trim() || undefined,
      email: email.trim() || undefined,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      googleMapsUrl: googleMapsUrl.trim() || undefined,
    };

    try {
      if (selectedBranch) {
        const updated = await updateBranch(selectedBranch.id, payload);
        setBranches((prev) =>
          (prev ?? []).map((b) => (b.id === updated.id ? updated : b))
        );
      } else {
        const created = await createBranch(payload);
        setBranches((prev) => [...(prev ?? []), created]);
      }
      setShowAddModal(false);
      resetForm();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to save branch.");
    } finally {
      setIsSaving(false);
    }
  };

  // Guarded everywhere `branches` is read, in case state is ever undefined/null
  const safeBranches = branches ?? [];
  const activeCount = safeBranches.filter((b) => b.isActive).length;
  const totalStaff = safeBranches.reduce(
    (sum, b) => sum + (b.staffMembers?.length || 0),
    0
  );

  return (
    <div className="min-h-screen w-full flex bg-[#141518] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* LEFT SIDEBAR NAVIGATION */}
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
              const isActive = item.name === "Branches";
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

      {/* CENTER & MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <span>Dashboard</span> &gt; <span className="text-[#0b4226] font-bold">Branches</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search entries..."
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

        <main className="p-6 md:p-8 space-y-6 flex-1 max-w-[1600px] w-full mx-auto relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Administrative Branches
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage organizational structure and tactical training facility coordinates.
              </p>
            </div>

            <button
              onClick={handleCreateNew}
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>REGISTER NEW BRANCH</span>
            </button>
          </div>

          {error && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: BRANCH CARDS LIST */}
            <div className="lg:col-span-8 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-semibold">Loading branches...</span>
                </div>
              ) : safeBranches.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm font-semibold">
                  No branches yet. Register your first one.
                </div>
              ) : (
                safeBranches.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col md:flex-row items-stretch justify-between gap-5 hover:border-gray-300 transition-all"
                  >
                    <div className="w-full md:w-56 h-36 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200">
                      <ImageFallback
                        src="/images/our story.jpg"
                        alt={branch.name}
                        className="w-full h-full object-cover object-center"
                        fallbackText={branch.name}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-gray-900 tracking-tight">
                            {branch.name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-xs text-[9px] font-extrabold uppercase tracking-wider ${
                              branch.isActive
                                ? "bg-[#d4af37] text-white"
                                : "bg-gray-300 text-gray-700"
                            }`}
                          >
                            {branch.isActive ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 mt-1 flex items-start gap-1.5 font-normal">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>{branch.address}</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                            COMMUNICATION
                          </span>
                          <span className="text-xs font-bold text-gray-800 mt-0.5 block">
                            {branch.phone}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                            STAFF MEMBERS
                          </span>
                          <span className="text-xs font-bold text-gray-800 mt-0.5 block">
                            {branch.staffMembers?.length ?? 0} Personnel
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-5 flex-shrink-0">
                      <div className="flex items-center gap-3 text-gray-400">
                        <button
                          onClick={() => handleEdit(branch)}
                          className="p-1 hover:text-gray-700 transition-colors cursor-pointer"
                          title="Edit Branch"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(branch)}
                          className="p-1 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Branch"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleEdit(branch)}
                        className="text-[10px] font-bold text-[#0b4226] hover:underline uppercase tracking-wider cursor-pointer"
                      >
                        VIEW FULL PROFILE
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT COLUMN: WIDGETS */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-[#18191c] text-white rounded-md p-5 shadow-sm space-y-4 border border-[#26282e]">
                <h3 className="text-[10px] font-bold text-[#86efac] tracking-widest uppercase">
                  SYSTEM OVERVIEW
                </h3>

                <div>
                  <p className="text-xs text-gray-400 font-semibold">
                    Total Operational Units
                  </p>
                  <p className="text-3xl font-extrabold text-white mt-1">
                    {safeBranches.length}
                  </p>
                </div>

                <div className="w-full bg-[#26282e] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#22c55e] h-full"
                    style={{
                      width: safeBranches.length
                        ? `${(activeCount / safeBranches.length) * 100}%`
                        : "0%",
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      ACTIVE
                    </span>
                    <span className="text-xl font-bold text-[#4ade80] mt-0.5 block">
                      {String(activeCount).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      TOTAL STAFF
                    </span>
                    <span className="text-xl font-bold text-[#4ade80] mt-0.5 block">
                      {String(totalStaff).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-md overflow-hidden shadow-xs">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    GLOBAL DEPLOYMENT
                  </h3>
                  <Globe className="w-4 h-4 text-[#0b4226]" />
                </div>

                <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                  <ImageFallback
                    src="/images/nepalmap.jpg"
                    alt="Global Deployment Map"
                    className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-90"
                    fallbackText="Map"
                  />
                  <div className="absolute top-3 left-3 bg-[#081f14]/90 border border-[#22c55e]/40 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#4ade80] uppercase tracking-widest shadow-md">
                    LOC_SYNC: ACTIVE
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-md p-4 space-y-3 shadow-xs">
                <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  SYSTEM LOGS
                </h3>
                <div className="space-y-2.5">
                  <div className="bg-[#f0fdf4] border-l-2 border-l-[#22c55e] p-3 rounded-xs flex items-start gap-3">
                    <RotateCw className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-snug">
                        Branch data synced with backend
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 font-medium">
                        Just now
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateNew}
            aria-label="Add Branch"
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#0b4226] hover:bg-[#072c19] text-white shadow-xl flex items-center justify-center border border-[#22c55e]/40 transition-all transform hover:scale-105 z-40 cursor-pointer"
          >
            <Plus className="w-6 h-6" />
          </button>
        </main>
      </div>

      {/* REGISTER / EDIT BRANCH MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Building className="w-5 h-5 text-[#4ade80]" />
                <span>{selectedBranch ? "Edit Branch Profile" : "Register New Branch"}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  BRANCH NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="e.g. Central Command HQ"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  PHYSICAL ADDRESS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 1221 Security Plaza, Kathmandu"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    PHONE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 1 4XXXXXX"
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    MOBILE
                  </label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="branch@company.com"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    LATITUDE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="40.7128"
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    LONGITUDE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="-74.006"
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  GOOGLE MAPS URL
                </label>
                <input
                  type="text"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? "SAVING..." : "SAVE BRANCH"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};