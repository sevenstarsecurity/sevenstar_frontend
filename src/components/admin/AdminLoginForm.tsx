"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

import { useRouter } from "next/navigation";

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!adminId.trim()) {
      setErrorMsg("Please enter your Administrator ID.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your Security Clearance Key.");
      return;
    }

    setIsLoading(true);

    // Simulate authentication process and redirect to Admin Dashboard
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 600);
    }, 800);
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#081f14] overflow-y-auto lg:overflow-hidden select-none">
      {/* LEFT PANEL - GREEN OVERLAY WITH BUILDING BACKGROUND */}
      <div className="lg:w-1/2 relative min-h-[380px] lg:h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden flex-shrink-0">
        {/* Background Building Image */}
        <div className="absolute inset-0 z-0">
          <ImageFallback
            src="/images/our story.jpg"
            alt="Seven Star Security Headquarters"
            className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1] scale-105"
            fallbackText="our story.jpg"
          />
          {/* Green Color Tint & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e4828]/95 via-[#0b3820]/90 to-[#041a0e]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#06331b]/80" />
        </div>

        {/* Top Left Header Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#14532d] border border-[#22c55e]/30 flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-[#4ade80] fill-[#4ade80]/20" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-wider text-base leading-tight uppercase font-['Public_Sans']">
              SHIELD<span className="text-[#4ade80]">CMS</span>
            </h1>
            <p className="text-[10px] font-semibold text-[#86efac] tracking-widest uppercase">
              Admin Terminal
            </p>
          </div>
        </div>

        {/* Middle Hero Content */}
        <div className="relative z-10 my-auto py-6 max-w-lg">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
            Securing Assets.
            <br />
            Protecting Futures.
          </h2>

          {/* Accent Line */}
          <div className="w-12 h-1 bg-[#22c55e] my-4 rounded-full" />

          <p className="text-xs sm:text-sm text-[#d1fae5]/90 leading-relaxed font-normal">
            Operational Headquarters: Kathmandu, Nepal.
            <br />
            Monitoring 1,400+ active zones across the region with institutional discipline.
          </p>
        </div>

        {/* Bottom Status Metadata Bar */}
        <div className="relative z-10 pt-4 border-t border-emerald-800/40 grid grid-cols-2 gap-4 max-w-md">
          <div>
            <span className="text-[10px] font-bold text-[#86efac]/70 uppercase tracking-widest block mb-1">
              SYSTEM STATUS
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-xs font-semibold text-[#d1fae5]">
                All Nodes Operational
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#86efac]/70 uppercase tracking-widest block mb-1">
              ENCRYPTION
            </span>
            <span className="text-xs font-semibold text-[#d1fae5]">
              AES-256 Validated
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN CARD & FORM */}
      <div className="lg:w-1/2 bg-white flex flex-col justify-between p-6 sm:p-8 lg:p-10 min-h-screen lg:min-h-0 lg:h-screen overflow-y-auto lg:overflow-hidden">
        {/* Spacer */}
        <div className="hidden lg:block h-2" />

        {/* Form Container Box */}
        <div className="my-auto max-w-md w-full mx-auto">
          {/* Card Frame */}
          <div className="bg-white border border-gray-200/90 rounded-sm shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Identity Verification
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-normal">
                Accessing Restricted Secure Environment
              </p>
            </div>

            {/* Simulated Success State */}
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-6 text-center space-y-3">
                <ShieldCheck className="w-10 h-10 text-[#0b4226] mx-auto animate-bounce" />
                <h3 className="text-base font-bold text-[#0b4226]">
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
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {errorMsg && (
                  <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded">
                    {errorMsg}
                  </div>
                )}

                {/* Field 1: Administrator ID */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="adminId"
                    className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block"
                  >
                    ADMINISTRATOR ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input
                      id="adminId"
                      type="text"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      placeholder="Enter your unique ID"
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] focus:border-[#0b4226] transition-all"
                    />
                  </div>
                </div>

                {/* Field 2: Security Clearance Key */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block"
                  >
                    SECURITY CLEARANCE KEY <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0b4226] focus:border-[#0b4226] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                      aria-label="Toggle password visibility"
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
                <div className="flex items-center justify-between pt-0.5">
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
                    Reset Key
                  </a>
                </div>

                {/* Submit Authenticate Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0b4226] hover:bg-[#072c19] text-white font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 cursor-pointer"
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
          <div className="mt-6 text-center space-y-3.5">
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
              This system is strictly for the use of authorized Seven Star Security
              personnel. Unauthorized access attempts are monitored and recorded.
            </p>

            {/* Links */}
            <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-gray-500 tracking-wider uppercase">
              <a href="#terms" className="hover:text-gray-800 transition-colors">
                SYSTEM TERMS
              </a>
              <a href="#audit" className="hover:text-gray-800 transition-colors">
                AUDIT LOGS
              </a>
            </div>

            {/* IP & Session Info */}
            <div className="pt-1">
              <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
                IP RECORDED: 192.168.1.104 &nbsp;|&nbsp; SESSION: X-7792
              </p>
            </div>
          </div>
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
