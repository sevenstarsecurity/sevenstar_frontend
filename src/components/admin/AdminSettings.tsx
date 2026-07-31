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
  ChevronUp,
  ChevronDown,
  Upload,
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
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";
import { changePassword, logout, extractAuthErrorMessage } from "@/services/auth"; // adjust path to match your project

type SettingsTab = "general" | "change-password";

export const AdminSettings: React.FC = () => {
  // Top-level tab switcher
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  // Accordion states
  const [openBrand, setOpenBrand] = useState(true);
  const [openContact, setOpenContact] = useState(true);
  const [openSocial, setOpenSocial] = useState(false);
  const [openSeo, setOpenSeo] = useState(false);

  // Form states
  const [siteTitle, setSiteTitle] = useState("ShieldCMS Protective Services");
  const [hqAddress, setHqAddress] = useState("");
  const [supportEmail, setSupportEmail] = useState("admin@shieldcms.example");
  const [mainOfficeLine, setMainOfficeLine] = useState("+1 (555) 000-1234");
  const [emergencyPhone, setEmergencyPhone] = useState("1-800-SHIELD-911");

  // Social states
  const [facebook, setFacebook] = useState("https://facebook.com/shieldcms");
  const [twitter, setTwitter] = useState("https://x.com/shieldcms");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/shieldcms");
  const [instagram, setInstagram] = useState("https://instagram.com/shieldcms");

  // SEO states
  const [metaTitle, setMetaTitle] = useState("Seven Star Security - Elite Protection Services");
  const [metaDescription, setMetaDescription] = useState(
    "Safeguarding assets, ensuring operational continuity, and providing peace of mind across Nepal."
  );

  const [hasChanges, setHasChanges] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

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
    if (passwordForm.newPassword.length < 8)
      return "New password must be at least 8 characters long.";
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
        window.location.href = "/admin/login";
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
    { name: "Gallery", icon: ImageIcon, href: "#" },
    { name: "Branches", icon: MapPin, href: "/admin/branches" },
    { name: "Submissions", icon: Send, href: "#" },
    { name: "Services", icon: Wrench, href: "#" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const settingsTabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: "general", label: "General Settings", icon: <SlidersHorizontal className="w-4 h-4" /> },
    { id: "change-password", label: "Change Password", icon: <Lock className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    setHasChanges(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
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
              const isActive = item.name === "Settings";
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
          <button
            onClick={async () => {
              await logout();
              window.location.href = "/admin/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-[#1e2025] rounded-md text-sm font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* CENTER & MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        {/* TOP WHITE HEADER BAR */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span className="font-bold text-gray-900">Security Firm CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600">Admin Site Settings</span>
          </div>

          {/* Right Section: Search & Profile */}
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search system settings..."
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

        {/* MAIN BODY CONTAINER */}
        <main className="p-6 md:p-8 space-y-6 flex-1 max-w-[1200px] w-full mx-auto pb-24">
          {/* HEADLINE */}
          <div>
            <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              <span>Dashboard</span> &gt; <span className="text-[#0b4226] font-bold">System Settings</span>
            </nav>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Admin Site Settings
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Configure the global identity, contact protocols, and search visibility for the ShieldCMS public interface.
            </p>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex items-center gap-1 border-b border-gray-200">
            {settingsTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px cursor-pointer ${
                    isActive
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

          {/* ==================== GENERAL SETTINGS TAB ==================== */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* ACCORDION CARD 1: GENERAL BRAND IDENTITY */}
              <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenBrand(!openBrand)}
                  className="w-full bg-[#f8fafc] p-4 px-6 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-4 h-4 text-[#0b4226]" />
                    <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                      GENERAL BRAND IDENTITY
                    </span>
                  </div>
                  {openBrand ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {openBrand && (
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-6 space-y-2">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                        Agency Logo
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-8 bg-[#f8fafc] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/60 transition-colors min-h-[160px]">
                        <div className="w-32 h-10 mb-3 flex items-center justify-center">
                          <ImageFallback
                            src="/images/sevennobg.png"
                            alt="ShieldCMS Logo"
                            className="max-h-full w-auto object-contain"
                            fallbackText="ShieldCMS"
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          Upload SVG or PNG (2MB max)
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                          Site Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={siteTitle}
                          onChange={(e) => {
                            setSiteTitle(e.target.value);
                            setHasChanges(true);
                          }}
                          className="w-full bg-white border border-gray-400 rounded p-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                          Site Favicon
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#081f14] rounded-md flex items-center justify-center border border-[#0b4226]">
                            <Shield className="w-6 h-6 text-[#4ade80]" />
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs transition-colors cursor-pointer"
                          >
                            Replace Icon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ACCORDION CARD 2: CONTACT INFO (HQ DATA) */}
              <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenContact(!openContact)}
                  className="w-full bg-[#f8fafc] p-4 px-6 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#0b4226]" />
                    <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                      CONTACT INFO (HQ DATA)
                    </span>
                  </div>
                  {openContact ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {openContact && (
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-6 space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                          HQ Address
                        </label>
                        <textarea
                          value={hqAddress}
                          onChange={(e) => {
                            setHqAddress(e.target.value);
                            setHasChanges(true);
                          }}
                          placeholder="Full street address, City, State, ZIP"
                          className="w-full bg-white border border-gray-400 rounded p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] h-28 resize-none"
                        />
                      </div>

                      <div className="lg:col-span-6 space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                            Primary Support Email
                          </label>
                          <input
                            type="email"
                            value={supportEmail}
                            onChange={(e) => {
                              setSupportEmail(e.target.value);
                              setHasChanges(true);
                            }}
                            className="w-full bg-white border border-gray-400 rounded p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                            Main Office Line
                          </label>
                          <input
                            type="text"
                            value={mainOfficeLine}
                            onChange={(e) => {
                              setMainOfficeLine(e.target.value);
                              setHasChanges(true);
                            }}
                            className="w-full bg-white border border-gray-400 rounded p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#fcf2f2] border-l-4 border-l-red-600 p-5 rounded-xs space-y-3">
                      <div className="flex items-center gap-2 text-red-700 text-xs font-extrabold uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>24/7 RAPID RESPONSE PROTOCOL</span>
                      </div>

                      <div className="space-y-1 max-w-md">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                          Emergency Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={emergencyPhone}
                          onChange={(e) => {
                            setEmergencyPhone(e.target.value);
                            setHasChanges(true);
                          }}
                          className="w-full bg-white border-2 border-red-500 rounded p-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <p className="text-[11px] text-gray-500 font-medium">
                        This number is prioritized in the client portal header and mobile quick-action menus.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ACCORDION CARD 3: SOCIAL CONNECTIVITY */}
              <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenSocial(!openSocial)}
                  className="w-full bg-[#f8fafc] p-4 px-6 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Share2 className="w-4 h-4 text-[#0b4226]" />
                    <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                      SOCIAL CONNECTIVITY
                    </span>
                  </div>
                  {openSocial ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {openSocial && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                        Facebook Page URL
                      </label>
                      <input
                        type="text"
                        value={facebook}
                        onChange={(e) => {
                          setFacebook(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                        Twitter / X Profile URL
                      </label>
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => {
                          setTwitter(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                        LinkedIn Company Page
                      </label>
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => {
                          setLinkedin(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => {
                          setInstagram(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ACCORDION CARD 4: SEO & META DEFAULTS */}
              <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenSeo(!openSeo)}
                  className="w-full bg-[#f8fafc] p-4 px-6 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#0b4226]" />
                    <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                      SEO &amp; META DEFAULTS
                    </span>
                  </div>
                  {openSeo ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {openSeo && (
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                        Default Meta Title
                      </label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => {
                          setMetaTitle(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                        Default Meta Description
                      </label>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => {
                          setMetaDescription(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full bg-white border border-gray-300 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0b4226] h-20 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== CHANGE PASSWORD TAB ==================== */}
          {activeTab === "change-password" && (
            <div className="bg-white border border-gray-200/90 rounded-md shadow-xs overflow-hidden">
              <div className="bg-[#f8fafc] p-4 px-6 border-b border-gray-200 flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#0b4226]" />
                <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  CHANGE PASSWORD
                </span>
              </div>

              <div className="p-6 max-w-lg">
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
                        placeholder="At least 8 characters"
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
                      className="bg-[#0b4226] hover:bg-[#072c19] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-sm shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
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

        {/* STICKY BOTTOM SAVE CHANGES BANNER — only shows on General Settings tab */}
        {activeTab === "general" && (
          <div className="bg-white border-t border-gray-200 p-4 px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-30 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-xs font-semibold text-gray-700">
                {savedSuccess
                  ? "All settings saved successfully!"
                  : "Unsaved changes detected in 'General Identity'"}
              </span>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto">
              <button
                onClick={() => setHasChanges(false)}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-sm shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>SAVE CHANGES</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};