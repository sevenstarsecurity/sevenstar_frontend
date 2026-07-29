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
  Radio,
  ClipboardList,
  Server,
  MoreVertical,
  RotateCw,
  FileSpreadsheet,
  AlertTriangle,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");

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

  const recentSubmissions = [
    {
      id: "#SH-9921",
      originator: "Directorate North",
      type: "Operational Audit",
      status: "VERIFIED",
      badgeStyle: "bg-[#e6f4ea] text-[#137333]",
      highlight: false,
    },
    {
      id: "#SH-9918",
      originator: "Field Unit 7",
      type: "Incident Report",
      status: "PENDING",
      badgeStyle: "bg-[#fef7e0] text-[#b06000]",
      highlight: false,
    },
    {
      id: "#SH-9915",
      originator: "HQ Logistics",
      type: "Requisition",
      status: "VERIFIED",
      badgeStyle: "bg-[#e6f4ea] text-[#137333]",
      highlight: false,
    },
    {
      id: "#SH-9912",
      originator: "Security Branch East",
      type: "Emergency Alert",
      status: "ESCALATED",
      badgeStyle: "bg-[#c8102e] text-white",
      highlight: true,
    },
    {
      id: "#SH-9910",
      originator: "Sub-Branch Omega",
      type: "Weekly Recap",
      status: "VERIFIED",
      badgeStyle: "bg-[#e6f4ea] text-[#137333]",
      highlight: false,
    },
  ];

  const activityLogs = [
    {
      title: "Branch East Escalation",
      desc: "Emergency alert logged for Section B-4.",
      time: "12 MINUTES AGO",
      active: true,
    },
    {
      title: "User Authenticated",
      desc: "Admin [ID: 882] logged in via Secure Tunnel.",
      time: "45 MINUTES AGO",
      active: false,
    },
    {
      title: "Backup Completed",
      desc: "Weekly database snapshot successful.",
      time: "3 HOURS AGO",
      active: false,
    },
    {
      title: "Configuration Change",
      desc: "Encryption protocols updated to v4.2.",
      time: "5 HOURS AGO",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#f4f6f3] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Top Brand Logo */}
          <div className="p-6 flex items-center gap-3 border-b border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-[#0b4226] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-base tracking-wider uppercase leading-none font-['Public_Sans']">
                SHIELD<span className="text-[#0b4226]">CMS</span>
              </h1>
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mt-0.5">
                ADMIN TERMINAL
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md font-semibold text-sm transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0b4226] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <Link
            href="/admin/login"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-md text-sm font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* TOP HEADER BAR */}
        <header className="bg-[#0b4226] text-white px-8 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-20">
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-emerald-300/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terminal..."
              className="w-full bg-[#06331b] border border-emerald-700/50 rounded-md pl-10 pr-4 py-1.5 text-xs text-white placeholder:text-emerald-200/50 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
            />
          </div>

          {/* Top Right Action Icons */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="relative p-1.5 rounded-full hover:bg-emerald-800/60 transition-colors cursor-pointer text-emerald-100"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-600 flex items-center justify-center text-white cursor-pointer hover:bg-emerald-700 transition-colors">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="p-6 md:p-8 space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          {/* 1. WELCOME BANNER CARD */}
          <div className="bg-white border border-gray-200/90 rounded-md p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4">
              {/* Emblem Logo Container */}
              <div className="w-14 h-14 rounded-lg bg-[#0b4226]/5 border border-[#0b4226]/20 flex items-center justify-center p-2 flex-shrink-0">
                <ImageFallback
                  src="/images/Trusted By Badge.png"
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
                  Systems are operational. Last security audit passed 4 hours ago.
                </p>
              </div>
            </div>

            {/* Right Metadata Info */}
            <div className="text-left md:text-right font-mono space-y-0.5 self-end md:self-auto">
              <p className="text-xs font-bold text-[#0b4226]">
                UTC: 2024-05-24 14:32:01
              </p>
              <p className="text-[11px] font-semibold text-gray-400">
                NODE: AMS-01-SHIELD
              </p>
            </div>
          </div>

          {/* 2. STAT CARDS GRID (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  ACTIVE SESSIONS
                </span>
                <Radio className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">1,284</p>
                <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <span>↗</span> +12% from avg
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  PENDING REVIEWS
                </span>
                <ClipboardList className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">42</p>
                <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                  <span>!</span> High Priority
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  SECURITY EVENTS
                </span>
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">0</p>
                <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <span>✓</span> All clear
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200/90 rounded-md p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  BRANCH UPTIME
                </span>
                <Server className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">99.98%</p>
                <p className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1">
                  <span>↻</span> Stable
                </p>
              </div>
            </div>
          </div>

          {/* 3. MIDDLE SPLIT SECTION: RECENT SUBMISSIONS TABLE & TERMINAL ACTIVITY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT TABLE: RECENT SUBMISSIONS (lg:col-span-8) */}
            <div className="lg:col-span-8 bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 tracking-tight">
                  Recent Submissions
                </h3>
                <a
                  href="#archive"
                  className="text-[11px] font-bold tracking-wider text-[#0b4226] hover:underline uppercase"
                >
                  VIEW FULL ARCHIVE
                </a>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4">REF ID</th>
                      <th className="py-3 px-4">ORIGINATOR</th>
                      <th className="py-3 px-4">TYPE</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                    {recentSubmissions.map((row) => (
                      <tr
                        key={row.id}
                        className={`hover:bg-gray-50/50 transition-colors ${
                          row.highlight
                            ? "border-l-2 border-l-[#c8102e] bg-red-50/20"
                            : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 font-mono font-medium text-gray-600">
                          {row.id}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">
                          {row.originator}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">
                          {row.type}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${row.badgeStyle}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            aria-label="Actions"
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
            </div>

            {/* RIGHT PANEL: TERMINAL ACTIVITY (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden flex flex-col justify-between">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900 tracking-tight">
                  Terminal Activity
                </h3>
              </div>

              {/* Activity Timeline List */}
              <div className="p-5 space-y-5">
                {activityLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 relative">
                    {/* Circle Dot Indicator */}
                    <div className="mt-1 flex-shrink-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full block ${
                          log.active ? "bg-[#0b4226]" : "bg-gray-300"
                        }`}
                      />
                    </div>

                    <div className="space-y-0.5 text-xs">
                      <h4 className="font-bold text-gray-900 leading-tight">
                        {log.title}
                      </h4>
                      <p className="text-gray-500 leading-normal text-[11px]">
                        {log.desc}
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider pt-0.5">
                        {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Button Box */}
              <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                <button className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors w-full cursor-pointer">
                  Show All Logs
                </button>
              </div>
            </div>
          </div>

          {/* 4. BOTTOM ADMINISTRATIVE COMMAND CENTER (4 Buttons) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              ADMINISTRATIVE COMMAND CENTER
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <button className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs">
                <Shield className="w-4 h-4 text-[#9e7628]" />
                <span>GENERATE SECURITY REPORT</span>
              </button>

              <button className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs">
                <ClipboardList className="w-4 h-4 text-[#9e7628]" />
                <span>DEPLOY FIELD UNIT</span>
              </button>

              <button className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs">
                <Radio className="w-4 h-4 text-[#9e7628]" />
                <span>BROADCAST DIRECTIVE</span>
              </button>

              <button className="border-2 border-[#9e7628] text-[#78591c] hover:bg-[#faf6ed] bg-white rounded-none py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs">
                <RotateCw className="w-4 h-4 text-[#9e7628]" />
                <span>RE-SYNC NODES</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
