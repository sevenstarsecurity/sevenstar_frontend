"use client";

import React, { useState } from "react";
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
  AlertTriangle,
  X,
  Phone,
  Building,
  CheckCircle2,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

interface BranchItem {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  address: string;
  phone: string;
  activeStaff: string;
  image: string;
}

export const AdminBranches: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchItem | null>(null);

  // Form State
  const [branchName, setBranchName] = useState("");
  const [branchType, setBranchType] = useState("Field Unit");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [staffCount, setStaffCount] = useState("");

  const branches: BranchItem[] = [
    {
      id: "1",
      name: "Central Command HQ",
      badge: "HQ",
      badgeColor: "bg-[#d4af37] text-white",
      address: "1221 Security Plaza, District 4, Metro City",
      phone: "+1 (555) 900-1000",
      activeStaff: "142 Personnel",
      image: "/images/our story.jpg",
    },
    {
      id: "2",
      name: "Blackwood Tactical Range",
      badge: "TRAINING CENTER",
      badgeColor: "bg-[#d4af37] text-white",
      address: "44 Route 9, Sector B-1, Outskirts",
      phone: "+1 (555) 441-2092",
      activeStaff: "38 Personnel",
      image: "/images/s3training.jpg",
    },
    {
      id: "3",
      name: "Eastside Operations Hub",
      address: "808 Commerce Way, Suite 210, East District",
      phone: "+1 (555) 772-9100",
      activeStaff: "22 Personnel",
      image: "/images/meeting.png",
    },
  ];

  const navItems = [
    { name: "Overview", icon: LayoutGrid, href: "/admin/dashboard" },
    { name: "Team", icon: Users, href: "/admin/team" },
    { name: "Blog", icon: FileText, href: "#" },
    { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
    { name: "Branches", icon: MapPin, href: "/admin/branches" },
    { name: "Submissions", icon: Send, href: "#" },
    { name: "Services", icon: Wrench, href: "#" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const handleEdit = (branch: BranchItem) => {
    setSelectedBranch(branch);
    setBranchName(branch.name);
    setAddress(branch.address);
    setPhone(branch.phone);
    setStaffCount(branch.activeStaff);
    setShowAddModal(true);
  };

  const handleCreateNew = () => {
    setSelectedBranch(null);
    setBranchName("");
    setAddress("");
    setPhone("");
    setStaffCount("");
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#141518] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-60 bg-[#141518] border-r border-[#26282e] flex flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Top Brand Logo */}
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

          {/* Navigation Links */}
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

        {/* Bottom Logout Button */}
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
        {/* TOP WHITE HEADER BAR */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <span>Dashboard</span> &gt; <span className="text-[#0b4226] font-bold">Branches</span>
            </nav>
          </div>

          {/* Right Section: Search & Profile */}
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

        {/* MAIN WORKSPACE BODY */}
        <main className="p-6 md:p-8 space-y-6 flex-1 max-w-[1600px] w-full mx-auto relative">
          {/* TOP HEADLINE & CTA BUTTON */}
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

          {/* MAIN SPLIT GRID: LEFT CARDS & RIGHT STAT WIDGETS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: BRANCH CARDS LIST (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col md:flex-row items-stretch justify-between gap-5 hover:border-gray-300 transition-all"
                >
                  {/* Branch Thumbnail Image */}
                  <div className="w-full md:w-56 h-36 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200">
                    <ImageFallback
                      src={branch.image}
                      alt={branch.name}
                      className="w-full h-full object-cover object-center"
                      fallbackText={branch.name}
                    />
                  </div>

                  {/* Branch Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-gray-900 tracking-tight">
                          {branch.name}
                        </h3>
                        {branch.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-xs text-[9px] font-extrabold uppercase tracking-wider ${branch.badgeColor}`}
                          >
                            {branch.badge}
                          </span>
                        )}
                      </div>

                      {/* Location Address */}
                      <p className="text-xs text-gray-500 mt-1 flex items-start gap-1.5 font-normal">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </p>
                    </div>

                    {/* Metadata Grid */}
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
                          ACTIVE STAFF
                        </span>
                        <span className="text-xs font-bold text-gray-800 mt-0.5 block">
                          {branch.activeStaff}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions & Profile Link */}
                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-5 flex-shrink-0">
                    {/* Action Icons */}
                    <div className="flex items-center gap-3 text-gray-400">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="p-1 hover:text-gray-700 transition-colors cursor-pointer"
                        title="Edit Branch"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Branch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* View Profile Link */}
                    <button
                      onClick={() => handleEdit(branch)}
                      className="text-[10px] font-bold text-[#0b4226] hover:underline uppercase tracking-wider cursor-pointer"
                    >
                      VIEW FULL PROFILE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: SYSTEM OVERVIEW, MAP & LOGS WIDGETS (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-5">
              {/* WIDGET 1: SYSTEM OVERVIEW (Dark Theme) */}
              <div className="bg-[#18191c] text-white rounded-md p-5 shadow-sm space-y-4 border border-[#26282e]">
                <h3 className="text-[10px] font-bold text-[#86efac] tracking-widest uppercase">
                  SYSTEM OVERVIEW
                </h3>

                <div>
                  <p className="text-xs text-gray-400 font-semibold">
                    Total Operational Units
                  </p>
                  <p className="text-3xl font-extrabold text-white mt-1">12</p>
                </div>

                {/* Green Progress Bar */}
                <div className="w-full bg-[#26282e] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#22c55e] h-full w-[70%]" />
                </div>

                {/* Sub Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      ACTIVE HQ
                    </span>
                    <span className="text-xl font-bold text-[#4ade80] mt-0.5 block">
                      02
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      FIELD UNITS
                    </span>
                    <span className="text-xl font-bold text-[#4ade80] mt-0.5 block">
                      08
                    </span>
                  </div>
                </div>
              </div>

              {/* WIDGET 2: GLOBAL DEPLOYMENT MAP */}
              <div className="bg-white border border-gray-200/90 rounded-md overflow-hidden shadow-xs">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    GLOBAL DEPLOYMENT
                  </h3>
                  <Globe className="w-4 h-4 text-[#0b4226]" />
                </div>

                {/* Embedded Map Visual */}
                <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                  <ImageFallback
                    src="/images/nepalmap.jpg"
                    alt="Global Deployment Map"
                    className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-90"
                    fallbackText="Map"
                  />
                  {/* Status Overlay Tag */}
                  <div className="absolute top-3 left-3 bg-[#081f14]/90 border border-[#22c55e]/40 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#4ade80] uppercase tracking-widest shadow-md">
                    LOC_SYNC: ACTIVE
                  </div>

                  {/* Pulsing Radar Nodes on Map */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#22c55e] animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] relative" />
                  </div>
                  <div className="absolute top-1/2 left-1/3 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#22c55e] animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] relative" />
                  </div>
                  <div className="absolute bottom-1/3 right-1/3 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#22c55e] animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] relative" />
                  </div>
                </div>
              </div>

              {/* WIDGET 3: SYSTEM LOGS */}
              <div className="bg-white border border-gray-200/90 rounded-md p-4 space-y-3 shadow-xs">
                <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  SYSTEM LOGS
                </h3>

                <div className="space-y-2.5">
                  {/* Log 1 */}
                  <div className="bg-[#f0fdf4] border-l-2 border-l-[#22c55e] p-3 rounded-xs flex items-start gap-3">
                    <RotateCw className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-snug">
                        Branch #04 Sync Completed
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 font-medium">
                        02 mins ago
                      </p>
                    </div>
                  </div>

                  {/* Log 2 */}
                  <div className="bg-[#fffbeb] border-l-2 border-l-[#f59e0b] p-3 rounded-xs flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-[#d97706] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-snug">
                        Power Outage @ Sector B-1
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 font-medium">
                        14 mins ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING ACTION BUTTON (Bottom Right) */}
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
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between">
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

            {/* Modal Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddModal(false);
              }}
              className="p-6 space-y-4"
            >
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    FACILITY TYPE
                  </label>
                  <select
                    value={branchType}
                    onChange={(e) => setBranchType(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] cursor-pointer"
                  >
                    <option>Headquarters (HQ)</option>
                    <option>Training Center</option>
                    <option>Field Unit</option>
                    <option>Regional Hub</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    ACTIVE PERSONNEL
                  </label>
                  <input
                    type="text"
                    value={staffCount}
                    onChange={(e) => setStaffCount(e.target.value)}
                    placeholder="e.g. 50 Personnel"
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>
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

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  COMMUNICATION PHONE
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +977 1 4XXXXXX"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              {/* Modal Buttons */}
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
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer"
                >
                  SAVE BRANCH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
