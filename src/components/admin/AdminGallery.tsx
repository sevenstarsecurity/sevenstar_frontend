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
  Star,
  Upload,
  X,
  Filter,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

interface AssetItem {
  id: string;
  title: string;
  category: string;
  image: string;
  featured?: boolean;
}

export const AdminGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<AssetItem | null>(null);

  // Upload Form State
  const [assetTitle, setAssetTitle] = useState("");
  const [assetCategory, setAssetCategory] = useState("TEAM & OPERATIONS");
  const [isFeatured, setIsFeatured] = useState(false);

  const categories = [
    { name: "ALL", count: 482 },
    { name: "TEAM & OPERATIONS", count: 124 },
    { name: "TRAINING & DRILLS", count: 86 },
    { name: "CLIENT SITES", count: 156 },
    { name: "EVENTS", count: 42 },
    { name: "AWARDS", count: 24 },
  ];

  const assets: AssetItem[] = [
    {
      id: "1",
      title: "Museum Gallery Management Control Room",
      category: "TEAM & OPERATIONS",
      image: "/images/meeting.png",
      featured: true,
    },
    {
      id: "2",
      title: "Security Access Turnstile System",
      category: "CLIENT SITES",
      image: "/images/s3training.jpg",
      featured: false,
    },
    {
      id: "3",
      title: "Vertex Global HQ Guard Unit",
      category: "TEAM & OPERATIONS",
      image: "/images/our story.jpg",
      featured: false,
    },
    {
      id: "4",
      title: "Data Center Infrastructure Racks",
      category: "CLIENT SITES",
      image: "/images/Security Operations Background.png",
      featured: true,
    },
    {
      id: "5",
      title: "Aerial Logistics Compound Fleet",
      category: "TRAINING & DRILLS",
      image: "/images/confidence.png",
      featured: false,
    },
  ];

  const filteredAssets =
    activeCategory === "ALL"
      ? assets
      : assets.filter((a) => a.category === activeCategory);

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
              const isActive = item.name === "Gallery";
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
          {/* Search Input */}
          <div className="relative max-w-lg w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search visual library..."
              className="w-full bg-[#f4f6f8] border border-gray-200 rounded-md pl-10 pr-4 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
            />
          </div>

          {/* Right Section: Notifications & Admin Profile */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-700 overflow-hidden">
                <ImageFallback
                  src="/images/ramesh.png"
                  alt="Admin Root"
                  className="w-full h-full object-cover"
                  fallbackText="AR"
                />
              </div>
              <span className="text-xs font-bold text-gray-900 tracking-tight">
                Admin_Root
              </span>
            </div>
          </div>
        </header>

        {/* MAIN WORKSPACE BODY */}
        <main className="p-6 md:p-8 space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          {/* TOP HEADLINE & UPLOAD BUTTON */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-['Public_Sans']">
              VISUAL ASSET LIBRARY
            </h1>

            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <ImageIcon className="w-4 h-4" />
              <span>+ UPLOAD ASSETS</span>
            </button>
          </div>

          {/* CATEGORY FILTER TABS BAR */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all flex-shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#0b4226] text-white shadow-xs"
                      : "bg-[#e2e8f0]/80 text-gray-700 hover:bg-gray-300/80"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? "bg-[#06331b] text-[#4ade80]" : "bg-gray-300/70 text-gray-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* VISUAL ASSETS GRID (Monochrome Black & White Aesthetic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setPreviewImage(asset)}
                className="group bg-gray-900 rounded-sm overflow-hidden shadow-md relative aspect-[4/3] cursor-pointer border border-gray-200/50"
              >
                {/* Black and White Filtered Image */}
                <ImageFallback
                  src={asset.image}
                  alt={asset.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  fallbackText={asset.title}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Featured Gold Badge (Top Right) */}
                {asset.featured && (
                  <div className="absolute top-3 right-3 bg-[#d4af37] text-black font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-xs flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span>FEATURED</span>
                  </div>
                )}

                {/* Caption / Title Info (Bottom) */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[10px] font-bold text-[#86efac] tracking-widest uppercase block">
                    {asset.category}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight mt-0.5 group-hover:text-[#4ade80] transition-colors">
                    {asset.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* UPLOAD ASSET MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#4ade80]" />
                <span>Upload Visual Assets</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowUploadModal(false);
              }}
              className="p-6 space-y-4"
            >
              {/* Dropzone */}
              <div className="border-2 border-dashed border-gray-300 rounded p-6 bg-[#f8fafc] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/60 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  Drag &amp; Drop Files or Browse
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  High-Resolution JPG, PNG, WEBP (Up to 10MB)
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  ASSET TITLE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={assetTitle}
                  onChange={(e) => setAssetTitle(e.target.value)}
                  placeholder="e.g. Tactical Ops Training Drill"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  CATEGORY TAG
                </label>
                <select
                  value={assetCategory}
                  onChange={(e) => setAssetCategory(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] cursor-pointer"
                >
                  <option>TEAM &amp; OPERATIONS</option>
                  <option>TRAINING &amp; DRILLS</option>
                  <option>CLIENT SITES</option>
                  <option>EVENTS</option>
                  <option>AWARDS</option>
                </select>
              </div>

              {/* Featured Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#0b4226] border-gray-300 rounded focus:ring-[#0b4226]"
                />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  SET AS FEATURED ASSET
                </span>
              </label>

              {/* Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer"
                >
                  UPLOAD TO LIBRARY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-black rounded-lg overflow-hidden border border-gray-800">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-[16/10] w-full">
              <ImageFallback
                src={previewImage.image}
                alt={previewImage.title}
                className="w-full h-full object-contain"
                fallbackText={previewImage.title}
              />
            </div>
            <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#4ade80] uppercase tracking-wider block">
                  {previewImage.category}
                </span>
                <h4 className="text-base font-bold">{previewImage.title}</h4>
              </div>
              {previewImage.featured && (
                <span className="bg-[#d4af37] text-black font-extrabold text-xs px-3 py-1 rounded">
                  ★ FEATURED
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
