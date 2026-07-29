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
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

interface TeamMember {
  id: string;
  name: string;
  ref: string;
  avatar: string;
  role: string;
  department: string;
  deptBadgeStyle: string;
  branch: string;
  active: boolean;
}

export const AdminTeam: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Team");
  const [showConfigPanel, setShowConfigPanel] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Form State for Right Panel
  const [fullName, setFullName] = useState("");
  const [officialRole, setOfficialRole] = useState("");
  const [formDept, setFormDept] = useState("Operations");
  const [formBranch, setFormBranch] = useState("NYC Headquarters");
  const [bio, setBio] = useState("");
  const [displayPriority, setDisplayPriority] = useState("10");
  const [visibleOnPortal, setVisibleOnPortal] = useState(false);
  const [operationalStatus, setOperationalStatus] = useState(true);

  // Initial Team Members Data matching image
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sgt. Marcus Thorne",
      ref: "4829-SCMS",
      avatar: "/images/majorganesh.png",
      role: "HEAD OF OPERATIONS",
      department: "OPERATIONS",
      deptBadgeStyle: "bg-[#0b4226] text-white",
      branch: "Headquarters - NYC",
      active: true,
    },
    {
      id: "2",
      name: "Dr. Elena Vance",
      ref: "1992-SCMS",
      avatar: "/images/girl typing.jpg",
      role: "SURVEILLANCE LEAD",
      department: "SURVEILLANCE",
      deptBadgeStyle: "bg-[#0b4226] text-white",
      branch: "Chicago Hub",
      active: true,
    },
    {
      id: "3",
      name: "Simon Jenkins",
      ref: "3341-SCMS",
      avatar: "/images/ramesh.png",
      role: "LOGISTICS COORDINATOR",
      department: "ADMINISTRATION",
      deptBadgeStyle: "bg-[#6b7280] text-white",
      branch: "London Office",
      active: false,
    },
  ]);

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

  const toggleMemberActive = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  const handleEditMember = (member: TeamMember) => {
    setFullName(member.name);
    setOfficialRole(member.role);
    setOperationalStatus(member.active);
    setShowConfigPanel(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#18191c] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* LEFT SIDEBAR NAVIGATION (Dark Palette matching image) */}
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
              const isActive = item.name === "Team";
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
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>MAIN CONSOLE</span> &gt; <span className="text-gray-800">TEAM MEMBERS</span>
            </nav>
          </div>

          {/* Right Section: Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative w-64">
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
        <div className="bg-[#e6f4ea] border-b border-emerald-200/60 px-6 py-1.5 flex items-center gap-2 text-[11px] font-bold text-[#0b4226] tracking-wider uppercase">
          <Shield className="w-3.5 h-3.5 text-[#0b4226]" />
          <span>OPERATIONAL COMMAND STATUS: NOMINAL</span>
        </div>

        {/* MAIN BODY AREA */}
        <main className="p-6 space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          {/* TOP PAGE HEADLINE & ACTION */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Team Members
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage security personnel, administrative staff, and field agents.
              </p>
            </div>

            <button
              onClick={() => {
                setFullName("");
                setOfficialRole("");
                setShowConfigPanel(true);
              }}
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Team Member</span>
            </button>
          </div>

          {/* FILTERS & SEARCH BAR CARD */}
          <div className="bg-white border border-gray-200/90 rounded-md p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Department Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  DEPARTMENT
                </label>
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="appearance-none bg-[#f8fafc] border border-gray-300 rounded px-3 py-1.5 pr-8 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0b4226] cursor-pointer"
                  >
                    <option>All Departments</option>
                    <option>Operations</option>
                    <option>Surveillance</option>
                    <option>Administration</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Branch Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  BRANCH
                </label>
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="appearance-none bg-[#f8fafc] border border-gray-300 rounded px-3 py-1.5 pr-8 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0b4226] cursor-pointer"
                  >
                    <option>All Branches</option>
                    <option>NYC Headquarters</option>
                    <option>Chicago Hub</option>
                    <option>London Office</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Search Input */}
              <div className="space-y-1 flex-1 min-w-[200px]">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  SEARCH MEMBER
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Name or Role..."
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                  <Filter className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Refresh & Download Quick Buttons */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                aria-label="Refresh"
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                aria-label="Download"
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TEAM MEMBERS TABLE CONTAINER */}
          <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4 w-10 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#0b4226]" />
                    </th>
                    <th className="py-3 px-4">MEMBER</th>
                    <th className="py-3 px-4">ROLE</th>
                    <th className="py-3 px-4">DEPARTMENT</th>
                    <th className="py-3 px-4">BRANCH</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-4 text-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#0b4226]" />
                      </td>
                      {/* Avatar & Name */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 border border-gray-300 flex-shrink-0">
                            <ImageFallback
                              src={member.avatar}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              fallbackText={member.name[0]}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm leading-snug">
                              {member.name}
                            </p>
                            <p className="text-[10px] font-mono text-gray-400 font-semibold uppercase tracking-wider">
                              REF: {member.ref}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-4 font-bold text-gray-800 uppercase text-[11px] tracking-wider">
                        {member.role}
                      </td>

                      {/* Department Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-xs text-[10px] font-extrabold tracking-wide uppercase ${member.deptBadgeStyle}`}
                        >
                          {member.department}
                        </span>
                      </td>

                      {/* Branch */}
                      <td className="py-4 px-4 font-semibold text-gray-700">
                        {member.branch}
                      </td>

                      {/* Status Toggle Switch */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleMemberActive(member.id)}
                            className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                              member.active ? "bg-[#0b4226]" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                member.active ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span
                            className={`text-[10px] font-bold tracking-wider uppercase ${
                              member.active ? "text-[#0b4226]" : "text-gray-400"
                            }`}
                          >
                            {member.active ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleEditMember(member)}
                          className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-bold text-gray-500 tracking-wider uppercase">
              <span>SYSTEM RESULT: SHOWING 1 TO 10 OF 42 RECORDS</span>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white rounded text-gray-600 disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {[1, 2, 3].map((page) => (
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
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white rounded text-gray-600"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* RIGHT SIDE PANEL - MEMBER CONFIGURATION DRAWER (Fixed matching image 100%) */}
      {showConfigPanel && (
        <div className="w-[420px] bg-white border-l border-gray-200 flex flex-col justify-between h-screen sticky top-0 shadow-xl z-30 flex-shrink-0 overflow-y-auto">
          <div>
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
              <div>
                <h3 className="text-base font-bold text-gray-900 tracking-tight">
                  Member Configuration
                </h3>
                <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-0.5">
                  IDENTITY &amp; TERMINAL ACCESS RIGHTS
                </p>
              </div>
              <button
                onClick={() => setShowConfigPanel(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-5 space-y-5">
              {/* Profile Identity Upload Box */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  PROFILE IDENTITY
                </span>
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-[#18191c] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>FACIAL RECOGNITION SCAN</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  </div>
                  <div className="p-6 bg-white border-2 border-dashed border-gray-200 m-3 rounded flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="w-7 h-7 text-gray-400 mb-2" />
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                      UPLOAD DOSSIER PHOTO
                    </span>
                    <span className="text-[10px] text-gray-400 mt-1">
                      JPG, PNG up to 2MB (400×400 Opt.)
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Legal Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                  FULL LEGAL NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Thorne"
                  className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              {/* Official Role Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                  OFFICIAL ROLE TITLE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={officialRole}
                  onChange={(e) => setOfficialRole(e.target.value)}
                  placeholder="e.g. Surveillance Analyst"
                  className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              {/* Department & Assigned Branch Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                    DEPARTMENT
                  </label>
                  <div className="relative">
                    <select
                      value={formDept}
                      onChange={(e) => setFormDept(e.target.value)}
                      className="w-full appearance-none bg-[#f4f6f8] border border-gray-300 rounded p-2 pr-7 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0b4226] cursor-pointer"
                    >
                      <option>Operations</option>
                      <option>Surveillance</option>
                      <option>Administration</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                    ASSIGNED BRANCH
                  </label>
                  <div className="relative">
                    <select
                      value={formBranch}
                      onChange={(e) => setFormBranch(e.target.value)}
                      className="w-full appearance-none bg-[#f4f6f8] border border-gray-300 rounded p-2 pr-7 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0b4226] cursor-pointer"
                    >
                      <option>NYC Headquarters</option>
                      <option>Chicago Hub</option>
                      <option>London Office</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Professional Biography */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                  PROFESSIONAL BIOGRAPHY
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief summary of experience and credentials..."
                  className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] h-20 resize-none"
                />
              </div>

              {/* Display Priority & Visible Checkbox */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="space-y-1.5 w-1/3">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                    DISPLAY PRIORITY
                  </label>
                  <input
                    type="text"
                    value={displayPriority}
                    onChange={(e) => setDisplayPriority(e.target.value)}
                    className="w-full bg-[#f4f6f8] border border-gray-300 rounded p-2 text-xs font-bold text-gray-800 text-center focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-4">
                  <input
                    type="checkbox"
                    checked={visibleOnPortal}
                    onChange={(e) => setVisibleOnPortal(e.target.checked)}
                    className="w-4 h-4 text-[#0b4226] border-gray-300 rounded focus:ring-[#0b4226]"
                  />
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    VISIBLE ON PORTAL
                  </span>
                </label>
              </div>

              {/* Operational Status Feature Box */}
              <div className="bg-[#e6f4ea]/60 border border-emerald-300/80 rounded p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#0b4226] text-white flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 uppercase tracking-wider leading-none">
                      OPERATIONAL STATUS
                    </p>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                      ENABLE SYSTEM CREDENTIALS
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
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
            <button
              onClick={() => setShowConfigPanel(false)}
              className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={() => setShowConfigPanel(false)}
              className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-colors cursor-pointer"
            >
              EXECUTE UPDATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
