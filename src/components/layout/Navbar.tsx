"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageFallback } from "../ui/ImageFallback";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative h-14 w-auto flex items-center justify-start">
            <ImageFallback
              src="/images/sevenstarlogo.png"
              alt="Seven Star Security Logo"
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              fallbackText="sevenstarlogo.png"
            />
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors relative py-1 inline-flex items-center nav-heartbeat-item ${
                  isActive
                    ? "text-[#004E24] active-nav"
                    : "text-[#3F4940] hover:text-[#004E24]"
                }`}
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: isActive ? 700 : 500,
                  fontStyle: "normal",
                  fontSize: "14px",
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

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            className="bg-[#c8102e] hover:bg-[#a60d25] text-white font-bold text-xs uppercase px-6 py-3 rounded-xs shadow-sm hover:shadow-md transition-all duration-200 tracking-wider"
          >
            GET A QUOTE
          </a>
        </div>

        {/* Mobile Menu Button */}
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
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 shadow-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors ${isActive ? "text-[#004E24]" : "text-[#3F4940]"
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
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-[#c8102e] text-white font-bold text-xs uppercase py-3 rounded-xs tracking-wider"
            >
              GET A QUOTE
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
