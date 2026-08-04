"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageFallback } from "../ui/ImageFallback";
import {
  Shield,
  LayoutGrid,
  Users,
  Image as ImageIcon,
  MapPin,
  Briefcase,
  Send,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { name: "Overview", icon: LayoutGrid, href: "/admin/dashboard" },
  { name: "Team", icon: Users, href: "/admin/team" },
  { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
  { name: "Branches", icon: MapPin, href: "/admin/branches" },
  { name: "Clients", icon: Briefcase, href: "/admin/clients" },
  { name: "Submissions", icon: Send, href: "/admin/submissions" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

interface AdminSidebarProps {
  currentPath?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPath }) => {
  const pathname = usePathname();
  const activePath = currentPath || pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full min-h-screen bg-white border-r border-gray-200 w-60">
      <div>
        {/* Sidebar Brand Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 group" title="Go to Website Homepage">
            <ImageFallback
              src="/images/sevenstarlogo.png"
              alt="Seven Star Security Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              fallbackText="Seven Star Security"
            />
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
            aria-label="Close Mobile Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              activePath === item.href ||
              (item.href !== "/admin/dashboard" && activePath?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-bold text-xs tracking-wide uppercase transition-all duration-150 cursor-pointer ${isActive
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

      {/* Logout Link */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-3.5 py-2.5 text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs font-bold uppercase tracking-wide transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header Strip with Hamburger Button */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#0b4226] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <Link href="/" className="flex items-center gap-2.5" title="Go to Website Homepage">
          <ImageFallback
            src="/images/sevenstarlogo.png"
            alt="Seven Star Security Logo"
            className="h-8 w-auto object-contain bg-white/95 px-2 py-0.5 rounded shadow-sm"
            fallbackText="Seven Star Security"
          />
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-md focus:outline-none"
          aria-label="Toggle Mobile Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block sticky top-0 h-screen overflow-y-auto flex-shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative z-10 w-64 max-w-[80vw]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
