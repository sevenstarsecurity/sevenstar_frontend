"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth"; // adjust path to wherever your auth.ts lives

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before clearing previous error so user sees inline validation
    if (!email.trim()) {
      setErrorMsg("Please enter your Administrator ID.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your Security Clearance Key.");
      return;
    }

    // Clear error and start loading together so they render in one pass
    setErrorMsg("");
    setIsLoading(true);

    // Persist the "stay logged in" preference BEFORE authenticating, because
    // login() → setSession() reads it to decide localStorage vs sessionStorage.
    if (typeof window !== "undefined") {
      localStorage.setItem("stayLoggedIn", String(stayLoggedIn));
    }

    try {
      const data = await login(email.trim(), password);

      setIsSuccess(true);

      // brief pause so the success UI is visible, then redirect
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 600);
    } catch (err: any) {
      // Extract the most meaningful error message from the API response
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Invalid email or password. Please try again.";

      // Update both states together so they render in a single pass —
      // this prevents the message from flashing and then disappearing.
      setIsLoading(false);
      setErrorMsg(message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#081f14] overflow-y-auto lg:overflow-hidden select-none">
      {/* LEFT PANEL - GREEN OVERLAY WITH BUILDING BACKGROUND */}
      <div className="lg:w-1/2 relative min-h-65 sm:min-h-80 lg:min-h-0 lg:h-screen flex flex-col justify-between p-5 sm:p-8 lg:p-12 overflow-hidden shrink-0">
        {/* Background Building Image */}
        <div className="absolute inset-0 z-0">
          <ImageFallback
            src="/images/our story.webp"
            alt="Seven Star Security Headquarters"
            className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1] scale-105"
            fallbackText="our story.webp"
          />
          {/* Green Color Tint & Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0e4828]/95 via-[#0b3820]/90 to-[#041a0e]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#06331b]/80" />
        </div>

        {/* Top Left Header Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Link href="/" title="Go to Website Homepage" className="group cursor-pointer">
            <ImageFallback
              src="/images/sevenstarbg.webp"
              alt="Seven Star Security Logo"
              className="h-10 sm:h-12 w-auto object-contain bg-white/95 px-2.5 py-1 rounded-md shadow-md transition-transform duration-300 group-hover:scale-105"
              fallbackText="Seven Star Security"
            />
          </Link>
        </div>

        {/* Middle Hero Content */}
        <div className="relative z-10 my-auto py-4 sm:py-6 max-w-lg">
          <h2 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
            Securing Assets.
            <br />
            Protecting Futures.
          </h2>

          {/* Accent Line */}
          <div className="w-10 sm:w-12 h-1 bg-[#22c55e] my-3 sm:my-4 rounded-full" />

          <p className="text-[11px] sm:text-xs lg:text-sm text-[#d1fae5]/90 leading-relaxed font-normal">
            Operational Headquarters: Kathmandu, Nepal.
            <br className="hidden sm:block" />
            Monitoring 1,400+ active zones across the region with institutional discipline.
          </p>
        </div>

        {/* Bottom Status Metadata Bar */}
        <div className="relative z-10 pt-3 sm:pt-4 border-t border-emerald-800/40 grid grid-cols-2 gap-4 max-w-md">
          <div>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#86efac]/70 uppercase tracking-widest block mb-1">
              SYSTEM STATUS
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-[#d1fae5]">
                All Nodes Operational
              </span>
            </div>
          </div>

          <div>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#86efac]/70 uppercase tracking-widest block mb-1">
              ENCRYPTION
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#d1fae5]">
              AES-256 Validated
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN CARD & FORM */}
      <div className="lg:w-1/2 bg-white flex flex-col justify-between p-5 sm:p-8 lg:p-10 min-h-screen lg:min-h-0 lg:h-screen overflow-y-auto lg:overflow-hidden">
        {/* Spacer */}
        <div className="hidden lg:block h-2" />

        {/* Form Container Box */}
        <div className="my-auto max-w-md w-full mx-auto py-4 lg:py-0">
          {/* Card Frame */}
          <div className="bg-white border border-gray-200/90 rounded-sm shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] p-5 sm:p-8">
            {/* Header */}
            <div className="mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                Identity Verification
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-normal">
                Accessing Restricted Secure Environment
              </p>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-5 sm:p-6 text-center space-y-3">
                <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-[#0b4226] mx-auto animate-bounce" />
                <h3 className="text-sm sm:text-base font-bold text-[#0b4226]">
                  Access Granted
                </h3>
                <p className="text-xs text-emerald-800">
                  Redirecting to Seven Star Security Command Dashboard...
                </p>
                <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-[#0b4226] h-full animate-[pulse_1s_infinite] w-3/4" />
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                {errorMsg && (
                  <div className="p-3 text-xs bg-red-50 border border-red-300 text-red-700 rounded flex items-start gap-2 animate-[fadeIn_0.2s_ease-in]">
                    <span className="shrink-0 font-bold text-red-500 mt-0.5">⚠</span>
                    <span className="break-words">{errorMsg}</span>
                  </div>
                )}


                {/* Field 1: Administrator ID (email) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block"
                  >
                    ADMINISTRATOR ID <span className="text-red-500">*</span>
                  </label>
                  {/*
                    suppressHydrationWarning: some browser extensions (password
                    managers, form-fill tools) inject their own attributes
                    (e.g. data-v-xxxxx) into this wrapper before React hydrates,
                    which causes a false-positive hydration mismatch. This tells
                    React to ignore attribute differences on this node only.
                  */}
                  <div
                    className="relative flex items-center"
                    suppressHydrationWarning
                  >
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your admin email"
                      disabled={isLoading}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] focus:border-[#0b4226] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Field 2: Security Clearance Key (password) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block"
                  >
                    SECURITY CLEARANCE KEY <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="relative flex items-center"
                    suppressHydrationWarning
                  >
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="w-full pl-10 pr-10 py-2.5 sm:py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] focus:border-[#0b4226] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                      aria-label="Toggle password visibility"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox & Forgot Reset Link */}
                <div className="flex items-center justify-between pt-0.5 flex-wrap gap-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={stayLoggedIn}
                      onChange={(e) => setStayLoggedIn(e.target.checked)}
                      className="w-4 h-4 text-[#0b4226] border-gray-300 rounded focus:ring-[#0b4226] accent-[#0b4226]"
                    />
                    <span className="text-xs text-gray-600">Stay logged in</span>
                  </label>

                  <a
                    href="#reset"
                    className="text-xs font-semibold text-[#0b4226] hover:underline transition-colors"
                  >

                  </a>
                </div>

                {/* Submit Authenticate Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0b4226] hover:bg-[#072c19] active:bg-[#051f12] text-white font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      VERIFYING...
                    </span>
                  ) : (
                    <>
                      <span>AUTHENTICATE</span>
                      <Shield className="w-4 h-4 fill-white/20" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Additional Info & Disclaimer Below Card */}
        </div>

        {/* Footer Link back to website */}
        <div className="pt-3 text-center">
          <Link
            href="/"
            className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Return to Seven Star Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};