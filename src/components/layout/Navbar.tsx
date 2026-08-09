"use client";

import { Menu, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { getPublicPdfDocuments, PdfDocument } from "@/services/pdf"; // adjust path to match your project

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // ── Portfolio PDF (fetched from the public PDF documents API) ──────────
  // No static fallback anymore — if there's no active PDF, the button
  // simply doesn't render.
  const [portfolioPdfUrl, setPortfolioPdfUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadPortfolioPdf = async () => {
      try {
        const res = await getPublicPdfDocuments({ page: 1, limit: 50 });
        const active = res.items
          .filter((doc: PdfDocument) => doc.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        if (!cancelled) {
          setPortfolioPdfUrl(active.length > 0 ? active[0].fileUrl : null);
        }
      } catch (err) {
        // Non-blocking — if the fetch fails, just don't show the button.
        if (!cancelled) setPortfolioPdfUrl(null);
      } finally {
        if (!cancelled) setIsLoadingPdf(false);
      }
    };

    loadPortfolioPdf();
    return () => {
      cancelled = true;
    };
  }, []);

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "TRAINING", href: "/training" },
    { name: "BRANCHES", href: "/branches" },
    { name: "GALLERY", href: "/gallery" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/contact" },
  ];

  const isItemActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (href === "/about") return pathname === "/about" || pathname.startsWith("/team");
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Show the button only once we know whether there's an active PDF,
  // and only if one actually exists.
  const showPortfolioButton = !isLoadingPdf && !!portfolioPdfUrl;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-8 xl:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="relative h-11 sm:h-14 w-auto flex items-center justify-start">
            <ImageFallback
              src="/images/sevenstarlogo.webp"
              alt="Seven Star Security Logo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              fallbackText="sevenstarlogo.webp"
            />
          </div>
        </Link>

        {/* Desktop Navigation Menu - full nav only from xl up, where 8 items + CTA comfortably fit */}
        <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-7">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors relative py-1 inline-flex items-center whitespace-nowrap nav-heartbeat-item ${isActive
                  ? "text-[#004E24] active-nav font-bold"
                  : "text-[#3F4940] hover:text-[#004E24] font-medium"
                  }`}
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: isActive ? 700 : 500,
                  fontStyle: "normal",
                  fontSize: "13px",
                  lineHeight: "19.6px",
                  letterSpacing: "0.7px",
                  verticalAlign: "middle",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Compact nav for tablet / iPad Pro landscape range (lg to xl): tighter spacing, smaller type */}
        <nav className="hidden lg:flex xl:hidden items-center space-x-4">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors relative py-1 inline-flex items-center whitespace-nowrap nav-heartbeat-item ${isActive
                  ? "text-[#004E24] active-nav font-bold"
                  : "text-[#3F4940] hover:text-[#004E24] font-medium"
                  }`}
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: isActive ? 700 : 500,
                  fontStyle: "normal",
                  fontSize: "11px",
                  lineHeight: "16px",
                  letterSpacing: "0.4px",
                  verticalAlign: "middle",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button - shown from lg up, sized down for the tablet range */}
        {showPortfolioButton && (
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href={portfolioPdfUrl!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#c8102e] hover:bg-[#a60d25] text-white font-bold uppercase rounded-xs shadow-sm hover:shadow-md transition-all duration-200 tracking-wider whitespace-nowrap text-[10px] px-4 py-2.5 xl:text-xs xl:px-6 xl:py-3 inline-flex items-center gap-1.5"
            >
              Portfolio Download
            </a>
          </div>
        )}

        {/* Mobile / Tablet Menu Button - visible below lg (covers phones and iPad Pro portrait @ 1024px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#3F4940] hover:text-[#004E24] p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors ${isActive ? "text-[#004E24] font-bold" : "text-[#3F4940] font-medium"
                  }`}
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: isActive ? 700 : 500,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "19.6px",
                  letterSpacing: "0.7px",
                }}
              >
                {item.name}
              </Link>
            );
          })}
          {showPortfolioButton && (
            <div className="pt-2">
              <a
                href={portfolioPdfUrl!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 text-center bg-[#c8102e] text-white font-bold text-xs uppercase py-3 rounded-xs tracking-wider"
              >
                Portfolio Download
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};