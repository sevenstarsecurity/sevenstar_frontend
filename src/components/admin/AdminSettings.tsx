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
  ChevronUp,
  ChevronDown,
  Upload,
  Download,
  Phone,
  Mail,
  AlertTriangle,
  Save,
  Share2,
  Globe,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  SlidersHorizontal,
  Briefcase,
  Plus,
  Trash2,
  Loader2,
  X,
  ArrowUp,
  ArrowDown,
  Pencil,
  ExternalLink,
  FileStack,
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { ImageFallback } from "../ui/ImageFallback";
import { changePassword, logout, extractAuthErrorMessage } from "@/services/auth"; // adjust path to match your project
import {
  getAdminSocialLinks,
  createSocialLink,
  updateSocialLink,
  toggleSocialLinkStatus,
  deleteSocialLink,
  SocialLink,
  SocialPlatform,
} from "@/services/socialmedia";
import {
  getAdminSubscribers,
  deleteAdminSubscriber,
  exportAdminSubscribers,
  getAdminNewsletterStats,
  NewsletterSubscriber,
  NewsletterStats,
} from "@/services/newsletter"; // adjust path to match your project
import {
  listPdfDocuments,
  getPdfStats,
  uploadPdf,
  updatePdf,
  togglePdfStatus,
  reorderPdfs,
  deletePdf,
  PdfDocument,
  PdfStats,
} from "@/services/pdf"; // adjust path to match your project

type SettingsTab = "pdf-documents" | "social-media" | "newsletter" | "change-password";

const PLATFORM_OPTIONS: SocialPlatform[] = [
  "FACEBOOK",
  "INSTAGRAM",
  "LINKEDIN",
  "YOUTUBE",
  "TIKTOK",
  "TWITTER",
];

const PLATFORM_ICONS: Record<SocialPlatform, React.ReactNode> = {
  FACEBOOK: <FaFacebook className="w-4 h-4" />,
  INSTAGRAM: <FaInstagram className="w-4 h-4" />,
  LINKEDIN: <FaLinkedin className="w-4 h-4" />,
  YOUTUBE: <FaYoutube className="w-4 h-4" />,
  TIKTOK: <Share2 className="w-4 h-4" />, // no dedicated TikTok icon available
  TWITTER: <FaTwitter className="w-4 h-4" />,
};

const EMPTY_PDF_FORM = {
  title: "",
  description: "",
  fileUrl: "",
  isActive: true,
};

export const AdminSettings: React.FC = () => {
  // Top-level tab switcher
  const [activeTab, setActiveTab] = useState<SettingsTab>("pdf-documents");

  // ── PDF Documents State ─────────────────────────────────────────────────
  const [pdfDocs, setPdfDocs] = useState<PdfDocument[]>([]);
  const [pdfStats, setPdfStats] = useState<PdfStats | null>(null);
  const [isLoadingPdfs, setIsLoadingPdfs] = useState(true);
  const [pdfError, setPdfError] = useState("");
  const [pdfSuccess, setPdfSuccess] = useState("");
  const [savingPdfId, setSavingPdfId] = useState<string | null>(null);

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [editingPdf, setEditingPdf] = useState<PdfDocument | null>(null);
  const [pdfForm, setPdfForm] = useState(EMPTY_PDF_FORM);
  const [isSavingPdfForm, setIsSavingPdfForm] = useState(false);
  const [pdfFormError, setPdfFormError] = useState("");

  const showPdfSuccess = (message: string) => {
    setPdfSuccess(message);
    setTimeout(() => setPdfSuccess(""), 3000);
  };

  const loadPdfDocuments = async () => {
    setIsLoadingPdfs(true);
    setPdfError("");
    try {
      const res = await listPdfDocuments({ page: 1, limit: 50 });
      const sorted = [...(res.items ?? [])].sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
      setPdfDocs(sorted);
    } catch (err: any) {
      setPdfError(
        err?.response?.data?.message || err?.message || "Failed to load PDF documents."
      );
      setPdfDocs([]);
    } finally {
      setIsLoadingPdfs(false);
    }
  };

  const loadPdfStats = async () => {
    try {
      const stats = await getPdfStats();
      setPdfStats(stats);
    } catch (err) {
      // Non-blocking — stats card just won't render numbers
      setPdfStats(null);
    }
  };

  useEffect(() => {
    if (activeTab === "pdf-documents") {
      loadPdfDocuments();
      loadPdfStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const openAddPdfModal = () => {
    setEditingPdf(null);
    setPdfForm(EMPTY_PDF_FORM);
    setPdfFormError("");
    setShowPdfModal(true);
  };

  const openEditPdfModal = (doc: PdfDocument) => {
    setEditingPdf(doc);
    setPdfForm({
      title: doc.title,
      description: doc.description ?? "",
      fileUrl: doc.fileUrl,
      isActive: doc.isActive,
    });
    setPdfFormError("");
    setShowPdfModal(true);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
    setEditingPdf(null);
    setPdfForm(EMPTY_PDF_FORM);
    setPdfFormError("");
  };

  const handlePdfFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfForm.title.trim()) {
      setPdfFormError("Please enter a title.");
      return;
    }
    if (!pdfForm.fileUrl.trim()) {
      setPdfFormError("Please enter a file URL.");
      return;
    }

    setIsSavingPdfForm(true);
    setPdfFormError("");

    try {
      if (editingPdf) {
        const updated = await updatePdf(editingPdf.id, {
          title: pdfForm.title.trim(),
          description: pdfForm.description.trim(),
          fileUrl: pdfForm.fileUrl.trim(),
          isActive: pdfForm.isActive,
        });
        setPdfDocs((prev) =>
          prev
            .map((d) => (d.id === updated.id ? updated : d))
            .sort((a, b) => a.displayOrder - b.displayOrder)
        );
        showPdfSuccess(`"${updated.title}" updated successfully.`);
      } else {
        const created = await uploadPdf({
          title: pdfForm.title.trim(),
          description: pdfForm.description.trim(),
          fileUrl: pdfForm.fileUrl.trim(),
          displayOrder: pdfDocs.length + 1,
          isActive: pdfForm.isActive,
        });
        setPdfDocs((prev) =>
          [...prev, created].sort((a, b) => a.displayOrder - b.displayOrder)
        );
        showPdfSuccess(`"${created.title}" uploaded successfully.`);
      }
      closePdfModal();
      loadPdfStats();
    } catch (err: any) {
      setPdfFormError(
        err?.response?.data?.message || err?.message || "Failed to save PDF document."
      );
    } finally {
      setIsSavingPdfForm(false);
    }
  };

  // ── FIXED: now passes the new boolean value the backend requires ───────
  const handleTogglePdfStatus = async (doc: PdfDocument) => {
    setSavingPdfId(doc.id);
    try {
      const updated = await togglePdfStatus(doc.id, !doc.isActive);
      setPdfDocs((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      showPdfSuccess(
        `"${updated.title}" ${updated.isActive ? "activated" : "deactivated"} successfully.`
      );
      loadPdfStats();
    } catch (err: any) {
      setPdfError(err?.response?.data?.message || err?.message || "Failed to update status.");
    } finally {
      setSavingPdfId(null);
    }
  };

  const handleDeletePdf = async (doc: PdfDocument) => {
    if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;
    setSavingPdfId(doc.id);
    try {
      await deletePdf(doc.id);
      setPdfDocs((prev) => prev.filter((d) => d.id !== doc.id));
      showPdfSuccess(`"${doc.title}" deleted successfully.`);
      loadPdfStats();
    } catch (err: any) {
      setPdfError(err?.response?.data?.message || err?.message || "Failed to delete PDF.");
    } finally {
      setSavingPdfId(null);
    }
  };

  const handleMovePdf = async (doc: PdfDocument, direction: "up" | "down") => {
    const index = pdfDocs.findIndex((d) => d.id === doc.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= pdfDocs.length) return;

    const reordered = [...pdfDocs];
    [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];

    // Optimistically update local order numbers
    const withNewOrder = reordered.map((d, i) => ({ ...d, displayOrder: i + 1 }));
    setPdfDocs(withNewOrder);
    setSavingPdfId(doc.id);

    try {
      await reorderPdfs({
        order: withNewOrder.map((d) => ({ id: d.id, displayOrder: d.displayOrder })),
      });
      showPdfSuccess("PDF order updated successfully.");
    } catch (err: any) {
      setPdfError(err?.response?.data?.message || err?.message || "Failed to reorder PDFs.");
      // Roll back on failure
      loadPdfDocuments();
    } finally {
      setSavingPdfId(null);
    }
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  // ── Social Media State ──────────────────────────────────────────────────
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoadingSocial, setIsLoadingSocial] = useState(true);
  const [socialError, setSocialError] = useState("");
  const [socialSuccess, setSocialSuccess] = useState("");
  const [savingLinkId, setSavingLinkId] = useState<string | null>(null);

  const showSocialSuccess = (message: string) => {
    setSocialSuccess(message);
    setTimeout(() => setSocialSuccess(""), 3000);
  };

  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>("FACEBOOK");
  const [newUrl, setNewUrl] = useState("");
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [addSocialError, setAddSocialError] = useState("");

  const loadSocialLinks = async () => {
    setIsLoadingSocial(true);
    setSocialError("");
    try {
      const res = await getAdminSocialLinks({ limit: 20 });
      const sorted = [...(res.items ?? [])].sort((a, b) => a.displayOrder - b.displayOrder);
      setSocialLinks(sorted);
    } catch (err: any) {
      setSocialError(
        err?.response?.data?.message || err?.message || "Failed to load social links."
      );
      setSocialLinks([]);
    } finally {
      setIsLoadingSocial(false);
    }
  };

  useEffect(() => {
    if (activeTab === "social-media" && socialLinks.length === 0) {
      loadSocialLinks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleUpdateLinkUrl = async (link: SocialLink, newUrlValue: string) => {
    if (newUrlValue === link.url) return;
    setSavingLinkId(link.id);
    try {
      const updated = await updateSocialLink(link.id, { url: newUrlValue });
      setSocialLinks((prev) =>
        prev.map((l) => (l.id === updated.id ? updated : l))
      );
      showSocialSuccess(`${updated.platform} link updated successfully.`);
    } catch (err: any) {
      setSocialError(err?.response?.data?.message || err?.message || "Failed to update URL.");
    } finally {
      setSavingLinkId(null);
    }
  };

  const handleToggleLinkStatus = async (link: SocialLink) => {
    setSavingLinkId(link.id);
    try {
      const updated = await toggleSocialLinkStatus(link.id, !link.isActive);
      setSocialLinks((prev) =>
        prev.map((l) => (l.id === updated.id ? updated : l))
      );
      showSocialSuccess(
        `${updated.platform} link ${updated.isActive ? "activated" : "deactivated"} successfully.`
      );
    } catch (err: any) {
      setSocialError(err?.response?.data?.message || err?.message || "Failed to update status.");
    } finally {
      setSavingLinkId(null);
    }
  };

  const handleDeleteLink = async (link: SocialLink) => {
    if (!confirm(`Remove the ${link.platform} link? This cannot be undone.`)) return;
    setSavingLinkId(link.id);
    try {
      await deleteSocialLink(link.id);
      setSocialLinks((prev) => prev.filter((l) => l.id !== link.id));
      showSocialSuccess(`${link.platform} link deleted successfully.`);
    } catch (err: any) {
      setSocialError(err?.response?.data?.message || err?.message || "Failed to delete link.");
    } finally {
      setSavingLinkId(null);
    }
  };

  const resetAddSocialForm = () => {
    setNewPlatform("FACEBOOK");
    setNewUrl("");
    setAddSocialError("");
  };

  const handleAddSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) {
      setAddSocialError("Please enter a URL.");
      return;
    }

    setIsCreatingLink(true);
    setAddSocialError("");

    try {
      const created = await createSocialLink({
        platform: newPlatform,
        url: newUrl.trim(),
        displayOrder: socialLinks.length + 1,
        isActive: true,
      });
      setSocialLinks((prev) =>
        [...prev, created].sort((a, b) => a.displayOrder - b.displayOrder)
      );
      setShowAddSocialModal(false);
      resetAddSocialForm();
      showSocialSuccess(`${created.platform} link added successfully.`);
    } catch (err: any) {
      setAddSocialError(
        err?.response?.data?.message || err?.message || "Failed to add social link."
      );
    } finally {
      setIsCreatingLink(false);
    }
  };

  // ── Newsletter State ────────────────────────────────────────────────────
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [newsletterStats, setNewsletterStats] = useState<NewsletterStats | null>(null);
  const [isLoadingNewsletter, setIsLoadingNewsletter] = useState(true);
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");
  const [deletingSubscriberId, setDeletingSubscriberId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const [subSearch, setSubSearch] = useState("");
  const [subSearchInput, setSubSearchInput] = useState("");
  const [subStatus, setSubStatus] = useState<"all" | "subscribed" | "unsubscribed">("all");
  const [subPage, setSubPage] = useState(1);
  const [subMeta, setSubMeta] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null>(null);

  const showNewsletterSuccess = (message: string) => {
    setNewsletterSuccess(message);
    setTimeout(() => setNewsletterSuccess(""), 3000);
  };

  const loadSubscribers = async () => {
    setIsLoadingNewsletter(true);
    setNewsletterError("");
    try {
      const res = await getAdminSubscribers({
        page: subPage,
        limit: 10,
        status: subStatus,
        search: subSearch || undefined,
      });
      setSubscribers(res.items);
      setSubMeta(res.meta);
    } catch (err: any) {
      setNewsletterError(
        err?.response?.data?.message || err?.message || "Failed to load subscribers."
      );
      setSubscribers([]);
      setSubMeta(null);
    } finally {
      setIsLoadingNewsletter(false);
    }
  };

  const loadNewsletterStats = async () => {
    try {
      const stats = await getAdminNewsletterStats();
      setNewsletterStats(stats);
    } catch (err) {
      // Non-blocking — stats card just won't render numbers
      setNewsletterStats(null);
    }
  };

  useEffect(() => {
    if (activeTab === "newsletter") {
      loadSubscribers();
      loadNewsletterStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, subPage, subStatus, subSearch]);

  const handleSubSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubPage(1);
    setSubSearch(subSearchInput.trim());
  };

  const handleDeleteSubscriber = async (subscriber: NewsletterSubscriber) => {
    if (
      !confirm(
        `Remove ${subscriber.email} from the subscriber list? This cannot be undone.`
      )
    )
      return;
    setDeletingSubscriberId(subscriber.id);
    try {
      await deleteAdminSubscriber(subscriber.id);
      setSubscribers((prev) => prev.filter((s) => s.id !== subscriber.id));
      showNewsletterSuccess(`${subscriber.email} removed successfully.`);
      loadNewsletterStats();
    } catch (err: any) {
      setNewsletterError(
        err?.response?.data?.message || err?.message || "Failed to delete subscriber."
      );
    } finally {
      setDeletingSubscriberId(null);
    }
  };

  const handleExportSubscribers = async () => {
    setIsExporting(true);
    setNewsletterError("");
    try {
      const blob = await exportAdminSubscribers({
        status: subStatus,
        search: subSearch || undefined,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `newsletter-subscribers-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setNewsletterError(
        err?.response?.data?.message || err?.message || "Failed to export subscribers."
      );
    } finally {
      setIsExporting(false);
    }
  };
  // ---- Change Password state ----
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwSubmitting, setPwSubmitting] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  const handlePasswordFieldChange =
    (field: keyof typeof passwordForm) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (pwError) setPwError(null);
        if (pwSuccess) setPwSuccess(false);
      };

  const validatePasswordForm = (): string | null => {
    if (!passwordForm.currentPassword) return "Please enter your current password.";
    if (!passwordForm.newPassword) return "Please enter a new password.";
    if (passwordForm.newPassword.length < 12)
      return "New password must be at least 12 characters long.";
    if (passwordForm.newPassword === passwordForm.currentPassword)
      return "New password must be different from current password.";
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      return "New password and confirmation do not match.";
    return null;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validatePasswordForm();
    if (validationError) {
      setPwError(validationError);
      return;
    }

    try {
      setPwSubmitting(true);
      setPwError(null);

      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      setPwSuccess(true);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });

      setTimeout(async () => {
        await logout();
        window.location.href = "/netbus";
      }, 1800);
    } catch (err: any) {
      setPwError(
        extractAuthErrorMessage(err, "Failed to change password. Please try again.")
      );
    } finally {
      setPwSubmitting(false);
    }
  };

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

  const settingsTabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: "pdf-documents", label: "PDF Documents", icon: <FileStack className="w-4 h-4" /> },
    { id: "social-media", label: "Social Media", icon: <Share2 className="w-4 h-4" /> },
    { id: "newsletter", label: "Newsletter", icon: <Mail className="w-4 h-4" /> },
    { id: "change-password", label: "Change Password", icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4f6f3] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      {/* CENTER & MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        {/* TOP WHITE HEADER BAR */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-xs relative lg:sticky lg:top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 text-xs uppercase tracking-wider">
            <span className="font-bold text-gray-900 truncate">Security Firm CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 truncate">Admin Site Settings</span>
          </div>

        </header>


        {/* MAIN BODY CONTAINER */}
        <main className="p-4 sm:p-6 md:p-8 space-y-6 flex-1 max-w-[1200px] w-full mx-auto pb-24">
          {/* HEADLINE */}
          <div>
            <nav className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              <span>Dashboard</span> &gt; <span className="text-[#0b4226] font-bold">System Settings</span>
            </nav>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Admin Site Settings
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Configure PDF resources, social connectivity, newsletter subscribers, and account security for the Seven Star Security public interface.
            </p>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {settingsTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px cursor-pointer whitespace-nowrap flex-shrink-0 ${isActive
                    ? "border-[#0b4226] text-[#0b4226]"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ==================== PDF DOCUMENTS TAB ==================== */}
          {activeTab === "pdf-documents" && (
            <div className="space-y-6">
              {/* STATS ROW */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-white border border-gray-200/90 rounded-md shadow-xs p-3 sm:p-5">
                  <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Total
                  </span>
                  <span className="text-lg sm:text-2xl font-extrabold text-gray-900">
                    {pdfStats?.total ?? pdfDocs.length ?? "—"}
                  </span>
                </div>
                <div className="bg-white border border-gray-200/90 rounded-md shadow-xs p-3 sm:p-5">
                  <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Active
                  </span>
                  <span className="text-lg sm:text-2xl font-extrabold text-[#0b4226]">
                    {pdfStats?.active ?? pdfDocs.filter((d) => d.isActive).length ?? "—"}
                  </span>
                </div>
                <div className="bg-white border border-gray-200/90 rounded-md shadow-xs p-3 sm:p-5">
                  <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Inactive
                  </span>
                  <span className="text-lg sm:text-2xl font-extrabold text-red-600">
                    {pdfStats?.inactive ?? pdfDocs.filter((d) => !d.isActive).length ?? "—"}
                  </span>
                </div>
              </div>

              {/* PDF DOCUMENTS CARD */}
              <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
                <div className="bg-[#f8fafc] p-4 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileStack className="w-4 h-4 text-[#0b4226] shrink-0" />
                    <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                      PDF DOCUMENTS
                    </span>
                  </div>
                  <button
                    onClick={openAddPdfModal}
                    className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-sm shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Upload PDF
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Manage brochures, certificates, and other downloadable PDF resources shown on the public site.
                  </p>

                  {pdfSuccess && (
                    <div className="p-2.5 text-xs bg-green-50 border border-green-200 text-green-700 rounded flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{pdfSuccess}</span>
                    </div>
                  )}

                  {pdfError && (
                    <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                      {pdfError}
                    </div>
                  )}

                  {isLoadingPdfs ? (
                    <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-semibold">Loading PDF documents...</span>
                    </div>
                  ) : pdfDocs.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm font-semibold">
                      No PDF documents yet. Upload your first one.
                    </div>
                  ) : (
                    /* ── RESPONSIVE LIST: stacks cleanly on mobile ────────────── */
                    <div className="space-y-3">
                      {pdfDocs.map((doc, index) => {
                        const isSaving = savingPdfId === doc.id;
                        return (
                          <div
                            key={doc.id}
                            className="border border-gray-200 rounded-md p-3 sm:p-4 bg-[#fafbfa] flex flex-col gap-3"
                          >
                            {/* Row 1: icon + title/description */}
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-md bg-[#0b4226]/10 text-[#0b4226] flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-gray-900 break-words">
                                    {doc.title}
                                  </span>
                                  <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#0b4226] shrink-0 mt-0.5"
                                    title="Open file"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                                {doc.description && (
                                  <p className="text-xs text-gray-500 mt-0.5 break-words line-clamp-2">
                                    {doc.description}
                                  </p>
                                )}
                                <span className="text-[10px] text-gray-400 font-medium mt-1 block">
                                  Order #{doc.displayOrder} · Updated {formatDate(doc.updatedAt)}
                                </span>
                              </div>
                            </div>

                            {/* Row 2: all actions — wraps cleanly, full-width on mobile */}
                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200/70 flex-wrap sm:flex-nowrap">
                              {/* Reorder controls */}
                              <div className="flex items-center gap-0.5 shrink-0 order-2 sm:order-1">
                                <button
                                  onClick={() => handleMovePdf(doc, "up")}
                                  disabled={index === 0 || isSaving}
                                  className="text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed p-2 sm:p-1.5 rounded transition-colors"
                                  title="Move up"
                                >
                                  <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleMovePdf(doc, "down")}
                                  disabled={index === pdfDocs.length - 1 || isSaving}
                                  className="text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed p-2 sm:p-1.5 rounded transition-colors"
                                  title="Move down"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Status + edit + delete */}
                              <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end order-1 sm:order-2">
                                <button
                                  onClick={() => handleTogglePdfStatus(doc)}
                                  disabled={isSaving}
                                  className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-2 sm:py-1.5 rounded-xs transition-colors disabled:opacity-60 flex-1 sm:flex-none text-center ${doc.isActive
                                    ? "bg-[#22c55e]/10 text-[#16803c] hover:bg-[#22c55e]/20"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                                  title={doc.isActive ? "Active — click to disable" : "Inactive — click to enable"}
                                >
                                  {isSaving ? (
                                    <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                                  ) : doc.isActive ? (
                                    "ACTIVE"
                                  ) : (
                                    "INACTIVE"
                                  )}
                                </button>

                                <button
                                  onClick={() => openEditPdfModal(doc)}
                                  disabled={isSaving}
                                  className="text-gray-400 hover:text-[#0b4226] p-2 sm:p-1.5 rounded transition-colors disabled:opacity-60 shrink-0"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => handleDeletePdf(doc)}
                                  disabled={isSaving}
                                  className="text-gray-400 hover:text-red-600 p-2 sm:p-1.5 rounded transition-colors disabled:opacity-60 shrink-0"
                                  title="Delete"
                                >
                                  {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== SOCIAL MEDIA TAB ==================== */}
          {activeTab === "social-media" && (
            <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
              <div className="bg-[#f8fafc] p-4 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Share2 className="w-4 h-4 text-[#0b4226]" />
                  <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                    SOCIAL CONNECTIVITY
                  </span>
                </div>
                <button
                  onClick={() => setShowAddSocialModal(true)}
                  className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-sm shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Link
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage the social platform links shown across the public site footer and contact sections.
                </p>

                {socialSuccess && (
                  <div className="p-2.5 text-xs bg-green-50 border border-green-200 text-green-700 rounded flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{socialSuccess}</span>
                  </div>
                )}

                {socialError && (
                  <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                    {socialError}
                  </div>
                )}

                {isLoadingSocial ? (
                  <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-semibold">Loading social links...</span>
                  </div>
                ) : socialLinks.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm font-semibold">
                    No social links yet. Add your first one.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {socialLinks.map((link) => (
                      <div
                        key={link.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 border border-gray-200 rounded-md p-3 bg-[#fafbfa]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-md bg-[#0b4226]/10 text-[#0b4226] flex items-center justify-center flex-shrink-0">
                            {PLATFORM_ICONS[link.platform]}
                          </div>

                          <div className="flex-1 min-w-0 sm:hidden">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                              {link.platform}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="hidden sm:block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                            {link.platform}
                          </span>
                          <input
                            type="text"
                            defaultValue={link.url}
                            disabled={savingLinkId === link.id}
                            onBlur={(e) => handleUpdateLinkUrl(link, e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] disabled:opacity-60"
                          />
                        </div>

                        <div className="flex items-center gap-2 justify-end sm:justify-start">
                          <button
                            onClick={() => handleToggleLinkStatus(link)}
                            disabled={savingLinkId === link.id}
                            className={`flex-shrink-0 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-2 sm:py-1.5 rounded-xs transition-colors disabled:opacity-60 ${link.isActive
                              ? "bg-[#22c55e]/10 text-[#16803c] hover:bg-[#22c55e]/20"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            title={link.isActive ? "Active — click to disable" : "Inactive — click to enable"}
                          >
                            {link.isActive ? "ACTIVE" : "INACTIVE"}
                          </button>

                          <button
                            onClick={() => handleDeleteLink(link)}
                            disabled={savingLinkId === link.id}
                            className="flex-shrink-0 text-gray-400 hover:text-red-600 p-2 sm:p-1.5 rounded transition-colors disabled:opacity-60"
                            title="Delete"
                          >
                            {savingLinkId === link.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== NEWSLETTER TAB ==================== */}
          {activeTab === "newsletter" && (
            <div className="space-y-6">
              {/* STATS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200/90 rounded-md shadow-xs p-5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Total Subscribers
                  </span>
                  <span className="text-2xl font-extrabold text-gray-900">
                    {newsletterStats?.totalSubscribers ?? subMeta?.total ?? "—"}
                  </span>
                </div>
                <div className="bg-white border border-gray-200/90 rounded-md shadow-xs p-5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Active
                  </span>
                  <span className="text-2xl font-extrabold text-[#0b4226]">
                    {newsletterStats?.activeSubscribers ?? "—"}
                  </span>
                </div>
                <div className="bg-white border border-gray-200/90 rounded-md shadow-xs p-5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Unsubscribed
                  </span>
                  <span className="text-2xl font-extrabold text-red-600">
                    {newsletterStats?.unsubscribedCount ?? "—"}
                  </span>
                </div>
              </div>

              {/* SUBSCRIBERS TABLE CARD */}
              <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
                <div className="bg-[#f8fafc] p-4 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#0b4226]" />
                    <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                      NEWSLETTER SUBSCRIBERS
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <form onSubmit={handleSubSearchSubmit} className="relative flex-1 sm:flex-none min-w-[140px]">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={subSearchInput}
                        onChange={(e) => setSubSearchInput(e.target.value)}
                        placeholder="Search email..."
                        className="bg-white border border-gray-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] w-full sm:w-48"
                      />
                    </form>

                    <select
                      value={subStatus}
                      onChange={(e) => {
                        setSubStatus(e.target.value as typeof subStatus);
                        setSubPage(1);
                      }}
                      className="bg-white border border-gray-300 rounded-md px-2.5 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                    >
                      <option value="all">All</option>
                      <option value="subscribed">Subscribed</option>
                      <option value="unsubscribed">Unsubscribed</option>
                    </select>

                    <button
                      onClick={handleExportSubscribers}
                      disabled={isExporting}
                      className="flex items-center gap-1.5 bg-[#0b4226] hover:bg-[#072c19] disabled:opacity-60 text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-sm shadow-xs transition-colors cursor-pointer"
                    >
                      {isExporting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      Export
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Manage users who have opted into your public newsletter, and export the list for campaigns.
                  </p>

                  {newsletterSuccess && (
                    <div className="p-2.5 text-xs bg-green-50 border border-green-200 text-green-700 rounded flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{newsletterSuccess}</span>
                    </div>
                  )}

                  {newsletterError && (
                    <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                      {newsletterError}
                    </div>
                  )}

                  {isLoadingNewsletter ? (
                    <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-semibold">Loading subscribers...</span>
                    </div>
                  ) : subscribers.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm font-semibold">
                      No subscribers found.
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                        <table className="w-full text-left min-w-[480px]">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pb-2 pr-4">
                                Email
                              </th>
                              <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pb-2 pr-4">
                                Status
                              </th>
                              <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pb-2 pr-4">
                                Subscribed
                              </th>
                              <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pb-2 text-right">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {subscribers.map((sub) => (
                              <tr
                                key={sub.id}
                                className="border-b border-gray-100 hover:bg-[#fafbfa] transition-colors"
                              >
                                <td className="py-3 pr-4 text-sm text-gray-900 font-medium">
                                  {sub.email}
                                </td>
                                <td className="py-3 pr-4">
                                  <span
                                    className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xs ${sub.isSubscribed
                                      ? "bg-[#22c55e]/10 text-[#16803c]"
                                      : "bg-gray-100 text-gray-500"
                                      }`}
                                  >
                                    {sub.isSubscribed ? "Subscribed" : "Unsubscribed"}
                                  </span>
                                </td>
                                <td className="py-3 pr-4 text-xs text-gray-600">
                                  {formatDate(sub.subscribedAt)}
                                </td>

                                <td className="py-3 text-right">
                                  <button
                                    onClick={() => handleDeleteSubscriber(sub)}
                                    disabled={deletingSubscriberId === sub.id}
                                    className="text-gray-400 hover:text-red-600 p-1.5 rounded transition-colors disabled:opacity-60 cursor-pointer"
                                    title="Delete subscriber"
                                  >
                                    {deletingSubscriberId === sub.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* PAGINATION */}
                      {subMeta && subMeta.totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                          <span className="text-xs text-gray-500 font-medium">
                            Page {subMeta.page} of {subMeta.totalPages} · {subMeta.total} total
                          </span>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => setSubPage((p) => Math.max(1, p - 1))}
                              disabled={!subMeta.hasPrevPage}
                              className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                              Prev
                            </button>
                            <button
                              onClick={() => setSubPage((p) => p + 1)}
                              disabled={!subMeta.hasNextPage}
                              className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== CHANGE PASSWORD TAB ==================== */}
          {activeTab === "change-password" && (
            <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
              <div className="bg-[#f8fafc] p-4 sm:px-6 border-b border-gray-200 flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#0b4226]" />
                <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  CHANGE PASSWORD
                </span>
              </div>

              <div className="p-4 sm:p-6 max-w-lg">
                <p className="text-xs sm:text-sm text-gray-500 mb-6">
                  Update your admin account password. You&apos;ll need to sign in again after changing it.
                </p>

                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  {/* Current Password */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showCurrentPw ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordFieldChange("currentPassword")}
                        disabled={pwSubmitting}
                        autoComplete="current-password"
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-400 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] disabled:bg-gray-50"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showCurrentPw ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showNewPw ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={handlePasswordFieldChange("newPassword")}
                        disabled={pwSubmitting}
                        autoComplete="new-password"
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-400 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] disabled:bg-gray-50"
                        placeholder="At least 12 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showNewPw ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirmPw ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordFieldChange("confirmPassword")}
                        disabled={pwSubmitting}
                        autoComplete="new-password"
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-400 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] disabled:bg-gray-50"
                        placeholder="Re-enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showConfirmPw ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {pwError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2.5">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{pwError}</span>
                    </div>
                  )}

                  {pwSuccess && (
                    <div className="flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2.5">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Password changed successfully. Redirecting to login...</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={pwSubmitting}
                      className="w-full sm:w-auto bg-[#0b4226] hover:bg-[#072c19] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-sm shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{pwSubmitting ? "Updating..." : "Update Password"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD / EDIT PDF MODAL */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white border border-gray-200 rounded-t-md sm:rounded-md shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="bg-[#0b4226] text-white p-4 px-5 sm:px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <FileStack className="w-5 h-5 text-[#4ade80] flex-shrink-0" />
                <span>{editingPdf ? "Edit PDF Document" : "Upload PDF Document"}</span>
              </h3>
              <button
                onClick={closePdfModal}
                className="text-white/80 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePdfFormSubmit} className="p-4 sm:p-6 space-y-4">
              {pdfFormError && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {pdfFormError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  TITLE
                </label>
                <input
                  type="text"
                  value={pdfForm.title}
                  onChange={(e) => setPdfForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Company Brochure"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  DESCRIPTION
                </label>
                <textarea
                  value={pdfForm.description}
                  onChange={(e) =>
                    setPdfForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Brief description of this document"
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] h-20 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  FILE URL
                </label>
                <input
                  type="text"
                  value={pdfForm.fileUrl}
                  onChange={(e) => setPdfForm((prev) => ({ ...prev, fileUrl: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
                <p className="text-[10px] text-gray-400">
                  Paste a shareable link (e.g. Google Drive) to the PDF file.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="pdf-is-active"
                  type="checkbox"
                  checked={pdfForm.isActive}
                  onChange={(e) =>
                    setPdfForm((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                  className="w-4 h-4 accent-[#0b4226]"
                />
                <label
                  htmlFor="pdf-is-active"
                  className="text-xs font-semibold text-gray-700 cursor-pointer"
                >
                  Visible on public site (active)
                </label>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={closePdfModal}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSavingPdfForm}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSavingPdfForm
                    ? "SAVING..."
                    : editingPdf
                      ? "SAVE CHANGES"
                      : "UPLOAD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SOCIAL LINK MODAL */}
      {showAddSocialModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white border border-gray-200 rounded-t-md sm:rounded-md shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="bg-[#0b4226] text-white p-4 px-5 sm:px-6 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#4ade80] flex-shrink-0" />
                <span>Add Social Link</span>
              </h3>
              <button
                onClick={() => {
                  setShowAddSocialModal(false);
                  resetAddSocialForm();
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSocialSubmit} className="p-4 sm:p-6 space-y-4">
              {addSocialError && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                  {addSocialError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  PLATFORM
                </label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as SocialPlatform)}
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                >
                  {PLATFORM_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block">
                  URL
                </label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#f8fafc] border border-gray-300 rounded p-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSocialModal(false);
                    resetAddSocialForm();
                  }}
                  className="flex-1 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isCreatingLink}
                  className="flex-1 py-2.5 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isCreatingLink ? "SAVING..." : "ADD LINK"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};