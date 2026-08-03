"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "./AdminSidebar";
import {
  Shield,
  LayoutGrid,
  Users,
  User,
  FileText,
  Image as ImageIcon,
  MapPin,
  Send,
  Wrench,
  Settings,
  LogOut,
  Search,
  Bell,
  Upload,
  X,
  Loader2,
  Trash2,
  Edit2,
  GripVertical,
  Eye,
  EyeOff,
  ShieldAlert,
  Briefcase,
  Video,
  PlayCircle,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";
import {
  getAdminGalleryImages,
  uploadGalleryImage,
  bulkUploadGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryStats,
  getAdminGalleryVideos,
  addGalleryVideo,
  deleteGalleryVideo,
  getYoutubeEmbedUrl,
  GalleryImage,
  GalleryStats,
  GalleryVideo,
} from "@/services/gallery";
import {
  getAdminVigilanceImages,
  createVigilanceImage,
  updateVigilanceImage,
  deleteVigilanceImage,
  toggleVigilanceStatus,
  VigilanceImage,
} from "@/services/vigilance";

type TabKey = "gallery" | "videos" | "vigilance";

export const AdminGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("gallery");

  // ── Gallery State ──────────────────────────────────────────────────────
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [stats, setStats] = useState<GalleryStats | null>(null);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryError, setGalleryError] = useState("");
  const [search, setSearch] = useState("");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");

  // Gallery Edit modal state (separate from upload — edits an existing image)
  const [showEditImageModal, setShowEditImageModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editDisplayOrder, setEditDisplayOrder] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [isSavingEditImage, setIsSavingEditImage] = useState(false);
  const [editImageError, setEditImageError] = useState("");

  // ── Videos State ─────────────────────────────────────────────────────────
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [isSavingVideo, setIsSavingVideo] = useState(false);
  const [videosError, setVideosError] = useState("");

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<GalleryVideo | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // ── Vigilance State ─────────────────────────────────────────────────────
  const [vigilanceImages, setVigilanceImages] = useState<VigilanceImage[]>([]);
  const [isLoadingVigilance, setIsLoadingVigilance] = useState(true);
  const [isUploadingVigilance, setIsUploadingVigilance] = useState(false);
  const [vigilanceError, setVigilanceError] = useState("");

  const [showVigilanceModal, setShowVigilanceModal] = useState(false);
  const [previewVigilance, setPreviewVigilance] = useState<VigilanceImage | null>(null);
  const [vigilanceFile, setVigilanceFile] = useState<File | null>(null);
  const [vigilanceCaption, setVigilanceCaption] = useState("");
  const [vigilanceDisplayOrder, setVigilanceDisplayOrder] = useState("");

  // Vigilance Edit modal state (separate from upload — edits an existing image)
  const [showEditVigilanceModal, setShowEditVigilanceModal] = useState(false);
  const [editingVigilance, setEditingVigilance] = useState<VigilanceImage | null>(null);
  const [editVigilanceCaption, setEditVigilanceCaption] = useState("");
  const [editVigilanceDisplayOrder, setEditVigilanceDisplayOrder] = useState("");
  const [editVigilanceFile, setEditVigilanceFile] = useState<File | null>(null);
  const [isSavingEditVigilance, setIsSavingEditVigilance] = useState(false);
  const [editVigilanceError, setEditVigilanceError] = useState("");

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

  // ── Gallery Loaders ─────────────────────────────────────────────────────

  const loadImages = async (searchTerm = "") => {
    setIsLoadingGallery(true);
    setGalleryError("");
    try {
      const res = await getAdminGalleryImages({
        limit: 60,
        search: searchTerm || undefined,
      });
      setImages(res.items ?? []);
    } catch (err: any) {
      setGalleryError(
        err?.response?.data?.message || err?.message || "Failed to load gallery."
      );
      setImages([]);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const loadStats = async () => {
    try {
      const s = await getGalleryStats();
      setStats(s);
    } catch {
      // non-critical
    }
  };

  useEffect(() => {
    loadImages();
    loadStats();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadImages(search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // ── Video Loaders ────────────────────────────────────────────────────────

  const loadVideos = async () => {
    setIsLoadingVideos(true);
    setVideosError("");
    try {
      const res = await getAdminGalleryVideos({ limit: 60 });
      setVideos(res.items ?? []);
    } catch (err: any) {
      setVideosError(
        err?.response?.data?.message || err?.message || "Failed to load videos."
      );
      setVideos([]);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (activeTab === "videos" && videos.length === 0) {
      loadVideos();
    }
  }, [activeTab]);

  // ── Vigilance Loaders ───────────────────────────────────────────────────

  const loadVigilance = async () => {
    setIsLoadingVigilance(true);
    setVigilanceError("");
    try {
      const res = await getAdminVigilanceImages({ limit: 20 });
      setVigilanceImages(res.items ?? []);
    } catch (err: any) {
      setVigilanceError(
        err?.response?.data?.message || err?.message || "Failed to load vigilance images."
      );
      setVigilanceImages([]);
    } finally {
      setIsLoadingVigilance(false);
    }
  };

  useEffect(() => {
    if (activeTab === "vigilance" && vigilanceImages.length === 0) {
      loadVigilance();
    }
  }, [activeTab]);

  // ── Gallery Handlers ─────────────────────────────────────────────────────

  const resetGalleryForm = () => {
    setSelectedFiles([]);
    setCaption("");
    setDisplayOrder("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(e.target.files ?? []));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setGalleryError("Please select at least one image file.");
      return;
    }

    setIsUploadingGallery(true);
    setGalleryError("");

    try {
      if (selectedFiles.length === 1) {
        const uploaded = await uploadGalleryImage(
          selectedFiles[0],
          caption || undefined,
          displayOrder ? Number(displayOrder) : undefined
        );
        setImages((prev) => [uploaded, ...(prev ?? [])]);
      } else {
        const uploaded = await bulkUploadGalleryImages(selectedFiles);
        setImages((prev) => [...uploaded, ...(prev ?? [])]);
      }
      await loadStats();
      setShowUploadModal(false);
      resetGalleryForm();
    } catch (err: any) {
      setGalleryError(err?.response?.data?.message || err?.message || "Upload failed.");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    try {
      await deleteGalleryImage(image.id);
      setImages((prev) => (prev ?? []).filter((img) => img.id !== image.id));
      setPreviewImage(null);
      await loadStats();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to delete image.");
    }
  };

  const handleUpdateCaption = async (image: GalleryImage, newCaption: string) => {
    try {
      const updated = await updateGalleryImage(image.id, { caption: newCaption });
      setImages((prev) =>
        (prev ?? []).map((img) => (img.id === updated.id ? updated : img))
      );
      setPreviewImage(updated);
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to update caption.");
    }
  };

  // Open the Edit modal for a gallery image, pre-filled with its current values
  const handleOpenEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setEditCaption(image.caption || "");
    setEditDisplayOrder(image.displayOrder != null ? String(image.displayOrder) : "");
    setEditImageFile(null);
    setEditImageError("");
    setShowEditImageModal(true);
  };

  const resetEditImageForm = () => {
    setEditingImage(null);
    setEditCaption("");
    setEditDisplayOrder("");
    setEditImageFile(null);
    setEditImageError("");
  };

  const handleEditImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditImageFile(e.target.files?.[0] ?? null);
  };

  // Saves caption, displayOrder, and (optionally) a replacement image file
  const handleEditImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    setIsSavingEditImage(true);
    setEditImageError("");

    try {
      const updated = await updateGalleryImage(editingImage.id, {
        caption: editCaption || undefined,
        displayOrder: editDisplayOrder ? Number(editDisplayOrder) : undefined,
        image: editImageFile || undefined,
      });
      setImages((prev) =>
        (prev ?? []).map((img) => (img.id === updated.id ? updated : img))
      );
      if (previewImage?.id === updated.id) setPreviewImage(updated);
      await loadStats();
      setShowEditImageModal(false);
      resetEditImageForm();
    } catch (err: any) {
      setEditImageError(
        err?.response?.data?.message || err?.message || "Failed to save changes."
      );
    } finally {
      setIsSavingEditImage(false);
    }
  };

  // ── Video Handlers ───────────────────────────────────────────────────────

  const resetVideoForm = () => {
    setVideoTitle("");
    setVideoUrl("");
  };

  const handleAddVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) {
      setVideosError("Please provide both a title and a YouTube URL.");
      return;
    }

    setIsSavingVideo(true);
    setVideosError("");

    try {
      const created = await addGalleryVideo(videoTitle.trim(), videoUrl.trim());
      setVideos((prev) => [created, ...(prev ?? [])]);
      await loadStats();
      setShowVideoModal(false);
      resetVideoForm();
    } catch (err: any) {
      setVideosError(err?.response?.data?.message || err?.message || "Failed to add video.");
    } finally {
      setIsSavingVideo(false);
    }
  };

  const handleDeleteVideo = async (video: GalleryVideo) => {
    if (!confirm("Delete this video? This cannot be undone.")) return;
    try {
      await deleteGalleryVideo(video.id);
      setVideos((prev) => (prev ?? []).filter((v) => v.id !== video.id));
      setPreviewVideo(null);
      await loadStats();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to delete video.");
    }
  };

  // ── Vigilance Handlers ───────────────────────────────────────────────────

  const activeVigilanceCount = (vigilanceImages ?? []).filter((v) => v.isActive).length;

  const resetVigilanceForm = () => {
    setVigilanceFile(null);
    setVigilanceCaption("");
    setVigilanceDisplayOrder("");
  };

  const handleVigilanceFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVigilanceFile(e.target.files?.[0] ?? null);
  };

  const handleVigilanceUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vigilanceFile) {
      setVigilanceError("Please select an image file.");
      return;
    }

    setIsUploadingVigilance(true);
    setVigilanceError("");

    try {
      const created = await createVigilanceImage(
        vigilanceFile,
        vigilanceCaption || undefined,
        vigilanceDisplayOrder ? Number(vigilanceDisplayOrder) : undefined,
        activeVigilanceCount
      );
      setVigilanceImages((prev) => [created, ...(prev ?? [])]);
      setShowVigilanceModal(false);
      resetVigilanceForm();
    } catch (err: any) {
      setVigilanceError(
        err?.response?.data?.message || err?.message || "Upload failed."
      );
    } finally {
      setIsUploadingVigilance(false);
    }
  };

  const handleToggleVigilanceStatus = async (image: VigilanceImage) => {
    try {
      const updated = await toggleVigilanceStatus(image.id, !image.isActive);
      setVigilanceImages((prev) =>
        (prev ?? []).map((img) => (img.id === updated.id ? updated : img))
      );
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update status. Max 3 active images may be enforced."
      );
    }
  };

  const handleDeleteVigilance = async (image: VigilanceImage) => {
    if (!confirm("Delete this vigilance image? This cannot be undone.")) return;
    try {
      await deleteVigilanceImage(image.id);
      setVigilanceImages((prev) => (prev ?? []).filter((img) => img.id !== image.id));
      setPreviewVigilance(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to delete image.");
    }
  };

  const handleUpdateVigilanceCaption = async (
    image: VigilanceImage,
    newCaption: string
  ) => {
    try {
      const updated = await updateVigilanceImage(image.id, { caption: newCaption });
      setVigilanceImages((prev) =>
        (prev ?? []).map((img) => (img.id === updated.id ? updated : img))
      );
      setPreviewVigilance(updated);
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to update caption.");
    }
  };

  // Open the Edit modal for a vigilance image, pre-filled with its current values
  const handleOpenEditVigilance = (image: VigilanceImage) => {
    setEditingVigilance(image);
    setEditVigilanceCaption(image.caption || "");
    setEditVigilanceDisplayOrder(
      image.displayOrder != null ? String(image.displayOrder) : ""
    );
    setEditVigilanceFile(null);
    setEditVigilanceError("");
    setShowEditVigilanceModal(true);
  };

  const resetEditVigilanceForm = () => {
    setEditingVigilance(null);
    setEditVigilanceCaption("");
    setEditVigilanceDisplayOrder("");
    setEditVigilanceFile(null);
    setEditVigilanceError("");
  };

  const handleEditVigilanceFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditVigilanceFile(e.target.files?.[0] ?? null);
  };

  // Saves caption, displayOrder, and (optionally) a replacement image file
  const handleEditVigilanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVigilance) return;

    setIsSavingEditVigilance(true);
    setEditVigilanceError("");

    try {
      const updated = await updateVigilanceImage(editingVigilance.id, {
        caption: editVigilanceCaption || undefined,
        displayOrder: editVigilanceDisplayOrder
          ? Number(editVigilanceDisplayOrder)
          : undefined,
        image: editVigilanceFile || undefined,
      });
      setVigilanceImages((prev) =>
        (prev ?? []).map((img) => (img.id === updated.id ? updated : img))
      );
      if (previewVigilance?.id === updated.id) setPreviewVigilance(updated);
      setShowEditVigilanceModal(false);
      resetEditVigilanceForm();
    } catch (err: any) {
      setEditVigilanceError(
        err?.response?.data?.message || err?.message || "Failed to save changes."
      );
    } finally {
      setIsSavingEditVigilance(false);
    }
  };

  const safeImages = images ?? [];
  const safeVideos = videos ?? [];
  const safeVigilance = vigilanceImages ?? [];

  // Live preview thumbnail while typing a URL in the Add Video modal
  const previewEmbedUrl = videoUrl.trim() ? getYoutubeEmbedUrl(videoUrl.trim()) : "";

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4f6f3] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* LEFT SIDEBAR NAVIGATION */}
      <AdminSidebar currentPath="/admin/gallery" />

      {/* CENTER & MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        {/* TOP WHITE HEADER BAR */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-xs relative lg:sticky lg:top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 truncate">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
              <span className="hidden xs:inline">MAIN CONSOLE &gt; </span>
              <span className="text-gray-800">GALLERY</span>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0 flex-1 sm:flex-none justify-end">
            <div className="relative w-full sm:w-64 max-w-[240px] sm:max-w-none">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search visual library..."
                disabled={activeTab !== "gallery"}
                className="w-full bg-[#f4f6f8] border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] disabled:opacity-50"
              />
            </div>
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

        <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-1 max-w-[1600px] w-full mx-auto">
          {/* TOP HEADLINE & ACTIONS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-['Public_Sans']">
                VISUAL ASSET LIBRARY
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage high-resolution gallery photography, video streams, and vigilance assets.
              </p>
            </div>

            {activeTab === "gallery" && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <ImageIcon className="w-4 h-4" />
                <span>+ UPLOAD ASSETS</span>
              </button>
            )}

            {activeTab === "videos" && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <Video className="w-4 h-4" />
                <span>+ ADD VIDEO</span>
              </button>
            )}

            {activeTab === "vigilance" && (
              <button
                onClick={() => setShowVigilanceModal(true)}
                disabled={activeVigilanceCount >= 3}
                className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                title={
                  activeVigilanceCount >= 3
                    ? "Max 3 active vigilance images reached"
                    : ""
                }
              >
                <ShieldAlert className="w-4 h-4" />
                <span>+ ADD VIGILANCE IMAGE</span>
              </button>
            )}
          </div>

          {/* TAB SWITCHER */}
          <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "gallery"
                  ? "border-[#0b4226] text-[#0b4226]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "videos"
                  ? "border-[#0b4226] text-[#0b4226]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Video className="w-4 h-4" />
              Videos
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-gray-100 text-gray-600">
                {safeVideos.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("vigilance")}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "vigilance"
                  ? "border-[#0b4226] text-[#0b4226]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Vigilance in Action
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${
                  activeVigilanceCount >= 3
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {activeVigilanceCount}/3 active
              </span>
            </button>
          </div>

          {/* ═══════════════ GALLERY TAB ═══════════════ */}
          {activeTab === "gallery" && (
            <>
              {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white border border-gray-200/90 rounded-md p-3.5 sm:p-4 shadow-xs">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      Total Images
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-gray-900">
                      {stats.totalImages}
                    </span>
                  </div>
                  <div className="bg-white border border-gray-200/90 rounded-md p-3.5 sm:p-4 shadow-xs">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      Total Videos
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-gray-900">
                      {stats.totalVideos}
                    </span>
                  </div>
                  <div className="bg-white border border-gray-200/90 rounded-md p-3.5 sm:p-4 shadow-xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      Storage
                    </span>
                    <span className="text-xs font-bold text-gray-900 truncate block">
                      {stats.cloudinaryStorageUsed}
                    </span>
                  </div>
                  <div className="bg-white border border-gray-200/90 rounded-md p-3.5 sm:p-4 shadow-xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      Newest Upload
                    </span>
                    <span className="text-xs font-bold text-gray-900 truncate block">
                      {new Date(stats.newestUpload).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {galleryError && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {galleryError}
                </div>
              )}

              {isLoadingGallery ? (
                <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-semibold">Loading gallery...</span>
                </div>
              ) : safeImages.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm font-semibold">
                  No images yet. Upload your first one.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {safeImages.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => setPreviewImage(image)}
                      className="group bg-gray-900 rounded-sm overflow-hidden shadow-md relative aspect-[4/3] cursor-pointer border border-gray-200/50"
                    >
                      <ImageFallback
                        src={image.imageUrl}
                        alt={image.caption || "Gallery image"}
                        className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                        fallbackText={image.caption || "Image"}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="bg-black/60 text-white text-[9px] font-bold px-2 py-1 rounded-xs flex items-center gap-1">
                          <GripVertical className="w-3 h-3" />
                          #{image.displayOrder}
                        </span>
                      </div>

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditImage(image);
                          }}
                          className="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-xs"
                          title="Edit image"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image);
                          }}
                          className="bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-xs"
                          title="Delete image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <h3 className="text-sm font-bold text-white leading-tight group-hover:text-[#4ade80] transition-colors">
                          {image.caption || "Untitled"}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ═══════════════ VIDEOS TAB ═══════════════ */}
          {activeTab === "videos" && (
            <>
              {videosError && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {videosError}
                </div>
              )}

              {isLoadingVideos ? (
                <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-semibold">Loading videos...</span>
                </div>
              ) : safeVideos.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm font-semibold">
                  No videos yet. Add your first one.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {safeVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setPreviewVideo(video)}
                      className="group bg-gray-900 rounded-sm overflow-hidden shadow-md relative aspect-video cursor-pointer border border-gray-200/50"
                    >
                      <iframe
                        src={getYoutubeEmbedUrl(video.youtubeUrl)}
                        className="w-full h-full pointer-events-none"
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity pointer-events-none" />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVideo(video);
                        }}
                        className="absolute top-3 left-3 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
                        <h3 className="text-sm font-bold text-white leading-tight drop-shadow">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ═══════════════ VIGILANCE TAB ═══════════════ */}
          {activeTab === "vigilance" && (
            <>
              <div className="p-3 text-xs bg-blue-50 border border-blue-200 text-blue-700 rounded flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>
                  Maximum of 3 active images allowed at once. Disable one before
                  enabling another.
                </span>
              </div>

              {vigilanceError && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {vigilanceError}
                </div>
              )}

              {isLoadingVigilance ? (
                <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-semibold">
                    Loading vigilance images...
                  </span>
                </div>
              ) : safeVigilance.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm font-semibold">
                  No vigilance images yet. Add your first one.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {safeVigilance.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => setPreviewVigilance(image)}
                      className="group bg-gray-900 rounded-sm overflow-hidden shadow-md relative aspect-[4/3] cursor-pointer border border-gray-200/50"
                    >
                      <ImageFallback
                        src={image.imageUrl}
                        alt={image.caption || "Vigilance image"}
                        className="w-full h-full object-cover contrast-125 brightness-95 group-hover:scale-105 transition-all duration-500"
                        fallbackText={image.caption || "Image"}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span
                          className={`text-[9px] font-extrabold px-2 py-1 rounded-xs uppercase tracking-wider ${
                            image.isActive
                              ? "bg-[#22c55e] text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {image.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditVigilance(image);
                          }}
                          className="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-xs"
                          title="Edit image"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleVigilanceStatus(image);
                          }}
                          className="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-xs"
                          title={image.isActive ? "Disable" : "Enable"}
                        >
                          {image.isActive ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVigilance(image);
                          }}
                          className="bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-xs"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <span className="text-[10px] font-bold text-[#86efac] tracking-widest uppercase block">
                          Order #{image.displayOrder}
                        </span>
                        <h3 className="text-sm font-bold text-white leading-tight group-hover:text-[#4ade80] transition-colors">
                          {image.caption || "Untitled"}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* GALLERY UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#4ade80]" />
                <span>Upload Visual Assets</span>
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  resetGalleryForm();
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-4 sm:p-6 space-y-4">
              {galleryError && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {galleryError}
                </div>
              )}

              <label className="border-2 border-dashed border-gray-300 rounded p-6 bg-[#f8fafc] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/60 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} file(s) selected`
                    : "Click to Browse Files"}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  JPG, PNG, WEBP (Up to 5MB each, up to 50 for bulk)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>

              {selectedFiles.length <= 1 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    CAPTION
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Tactical Ops Training Drill"
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>
              )}

              {selectedFiles.length <= 1 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    DISPLAY ORDER
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    placeholder="Leave blank to auto-assign"
                    className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  />
                </div>
              )}

              {selectedFiles.length > 1 && (
                <p className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded p-2.5">
                  Bulk upload selected — caption and display order will be set to
                  defaults. Edit individual images afterward if needed.
                </p>
              )}

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    resetGalleryForm();
                  }}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isUploadingGallery}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isUploadingGallery ? "UPLOADING..." : "UPLOAD TO LIBRARY"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY EDIT MODAL — caption, display order, and optional image replacement */}
      {showEditImageModal && editingImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#4ade80]" />
                <span>Edit Image</span>
              </h3>
              <button
                onClick={() => {
                  setShowEditImageModal(false);
                  resetEditImageForm();
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditImageSubmit} className="p-4 sm:p-6 space-y-4">
              {editImageError && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {editImageError}
                </div>
              )}

              {/* Current image preview */}
              <div className="aspect-[4/3] w-full rounded overflow-hidden bg-gray-900 border border-gray-200">
                <ImageFallback
                  src={
                    editImageFile
                      ? URL.createObjectURL(editImageFile)
                      : editingImage.imageUrl
                  }
                  alt={editingImage.caption || "Current image"}
                  className="w-full h-full object-cover"
                  fallbackText={editingImage.caption || "Image"}
                />
              </div>

              <label className="border-2 border-dashed border-gray-300 rounded p-4 bg-[#f8fafc] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/60 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-1.5" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  {editImageFile ? editImageFile.name : "Replace Image (optional)"}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  JPG, PNG, WEBP (Up to 5MB) — leave blank to keep current image
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleEditImageFileSelect}
                  className="hidden"
                />
              </label>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  CAPTION
                </label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  placeholder="e.g. Tactical Ops Training Drill"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  DISPLAY ORDER
                </label>
                <input
                  type="number"
                  value={editDisplayOrder}
                  onChange={(e) => setEditDisplayOrder(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditImageModal(false);
                    resetEditImageForm();
                  }}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSavingEditImage}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSavingEditImage ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY PREVIEW MODAL */}
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
                src={previewImage.imageUrl}
                alt={previewImage.caption || "Preview"}
                className="w-full h-full object-contain"
                fallbackText={previewImage.caption || "Image"}
              />
            </div>
            <div className="p-4 bg-gray-900 text-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-[#4ade80] uppercase tracking-wider block">
                  Order #{previewImage.displayOrder}
                </span>
                <p className="text-sm sm:text-base font-bold text-white truncate mt-1">
                  {previewImage.caption || "Untitled"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenEditImage(previewImage)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  EDIT
                </button>
                <button
                  onClick={() => handleDeleteImage(previewImage)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold px-3 py-2 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Video className="w-5 h-5 text-[#4ade80]" />
                <span>Add Video</span>
              </h3>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  resetVideoForm();
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideoSubmit} className="p-4 sm:p-6 space-y-4">
              {videosError && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {videosError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  TITLE
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g. Security Best Practices Guide"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  YOUTUBE URL
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
                <p className="text-[10px] text-gray-400">
                  Accepts youtube.com or youtu.be links.
                </p>
              </div>

              {previewEmbedUrl && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                    PREVIEW
                  </label>
                  <div className="aspect-video w-full bg-black rounded overflow-hidden border border-gray-200">
                    <iframe
                      src={previewEmbedUrl}
                      className="w-full h-full"
                      title="Video preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    resetVideoForm();
                  }}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSavingVideo}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSavingVideo ? "SAVING..." : "ADD VIDEO"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIDEO PREVIEW MODAL */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-black rounded-lg overflow-hidden border border-gray-800">
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={getYoutubeEmbedUrl(previewVideo.youtubeUrl)}
                className="w-full h-full"
                title={previewVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            <div className="p-4 bg-gray-900 text-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">{previewVideo.title}</h3>
                <span className="text-xs text-gray-400">
                  Added {new Date(previewVideo.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleDeleteVideo(previewVideo)}
                className="flex-shrink-0 flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold px-3 py-2 rounded transition-colors w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4" />
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIGILANCE UPLOAD MODAL */}
      {showVigilanceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#4ade80]" />
                <span>Add Vigilance Image</span>
              </h3>
              <button
                onClick={() => {
                  setShowVigilanceModal(false);
                  resetVigilanceForm();
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVigilanceUploadSubmit} className="p-4 sm:p-6 space-y-4">
              {vigilanceError && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {vigilanceError}
                </div>
              )}

              <label className="border-2 border-dashed border-gray-300 rounded p-6 bg-[#f8fafc] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/60 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  {vigilanceFile ? vigilanceFile.name : "Click to Browse File"}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  JPG, PNG, WEBP (Up to 5MB)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleVigilanceFileSelect}
                  className="hidden"
                />
              </label>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  CAPTION
                </label>
                <input
                  type="text"
                  value={vigilanceCaption}
                  onChange={(e) => setVigilanceCaption(e.target.value)}
                  placeholder="e.g. 24/7 Monitoring"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  DISPLAY ORDER
                </label>
                <input
                  type="number"
                  value={vigilanceDisplayOrder}
                  onChange={(e) => setVigilanceDisplayOrder(e.target.value)}
                  placeholder="Leave blank to auto-assign"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowVigilanceModal(false);
                    resetVigilanceForm();
                  }}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isUploadingVigilance}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isUploadingVigilance ? "SAVING..." : "SAVE IMAGE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIGILANCE EDIT MODAL — caption, display order, and optional image replacement */}
      {showEditVigilanceModal && editingVigilance && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0b4226] text-white p-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#4ade80]" />
                <span>Edit Vigilance Image</span>
              </h3>
              <button
                onClick={() => {
                  setShowEditVigilanceModal(false);
                  resetEditVigilanceForm();
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditVigilanceSubmit} className="p-4 sm:p-6 space-y-4">
              {editVigilanceError && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {editVigilanceError}
                </div>
              )}

              {/* Current image preview */}
              <div className="aspect-[4/3] w-full rounded overflow-hidden bg-gray-900 border border-gray-200">
                <ImageFallback
                  src={
                    editVigilanceFile
                      ? URL.createObjectURL(editVigilanceFile)
                      : editingVigilance.imageUrl
                  }
                  alt={editingVigilance.caption || "Current image"}
                  className="w-full h-full object-cover"
                  fallbackText={editingVigilance.caption || "Image"}
                />
              </div>

              <label className="border-2 border-dashed border-gray-300 rounded p-4 bg-[#f8fafc] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/60 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-1.5" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  {editVigilanceFile ? editVigilanceFile.name : "Replace Image (optional)"}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  JPG, PNG, WEBP (Up to 5MB) — leave blank to keep current image
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleEditVigilanceFileSelect}
                  className="hidden"
                />
              </label>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  CAPTION
                </label>
                <input
                  type="text"
                  value={editVigilanceCaption}
                  onChange={(e) => setEditVigilanceCaption(e.target.value)}
                  placeholder="e.g. 24/7 Monitoring"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  DISPLAY ORDER
                </label>
                <input
                  type="number"
                  value={editVigilanceDisplayOrder}
                  onChange={(e) => setEditVigilanceDisplayOrder(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditVigilanceModal(false);
                    resetEditVigilanceForm();
                  }}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSavingEditVigilance}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSavingEditVigilance ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIGILANCE PREVIEW MODAL */}
      {previewVigilance && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-black rounded-lg overflow-hidden border border-gray-800">
            <button
              onClick={() => setPreviewVigilance(null)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-[16/10] w-full">
              <ImageFallback
                src={previewVigilance.imageUrl}
                alt={previewVigilance.caption || "Preview"}
                className="w-full h-full object-contain"
                fallbackText={previewVigilance.caption || "Image"}
              />
            </div>
            <div className="p-4 bg-gray-900 text-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-xs uppercase tracking-wider ${
                      previewVigilance.isActive
                        ? "bg-[#22c55e] text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {previewVigilance.isActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                  <span className="text-xs font-bold text-[#4ade80] uppercase tracking-wider">
                    Order #{previewVigilance.displayOrder}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-white truncate mt-1">
                  {previewVigilance.caption || "Untitled"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto flex-wrap">
                <button
                  onClick={() => handleOpenEditVigilance(previewVigilance)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  EDIT
                </button>
                <button
                  onClick={() => handleToggleVigilanceStatus(previewVigilance)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded transition-colors"
                >
                  {previewVigilance.isActive ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {previewVigilance.isActive ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => handleDeleteVigilance(previewVigilance)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold px-3 py-2 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};